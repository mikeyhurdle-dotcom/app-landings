# Teacher Repertoire Editing + Bidirectional Repertoire Sync (E2) — Design Spec

**Date:** 2026-06-22
**Source:** Josh feedback (HOBTRAC-219, item E). Mikey decided: teachers get **full edit** of a student's repertoire; conflict resolution is **last-write-wins (LWW)**.
**Repos:** `mewstro-web` (teacher dashboard, Next.js) + `Mewstro` (iOS, SwiftUI) + Supabase `nspgvdytqsvnmbitbmey`.
**Status:** SPEC — not yet planned/built. This is live-student-data work; treat with care.

## Why this isn't a dashboard form
Investigation of the current repertoire sync (2026-06-22):
- **iOS pull (`SyncService.pullRepertoire`) never updates existing rows.** It only overwrites a local piece when `dto.createdAt > local.createdAt` — but `createdAt` is immutable and identical for a given id, so that branch is dead. New remote rows ARE inserted (so teacher *add* works); existing-row edits never propagate.
- **iOS push (`SyncService.pushRepertoire`) clobbers.** Plain `upsert` (overwrite-all-by-id) → the student's next sync overwrites any teacher edit with local values.
- **Deletes don't propagate** — pull never removes local rows; there are no tombstones.

So teacher **add** works today; teacher **edit/delete** requires a real bidirectional LWW sync upgrade. That upgrade touches the repertoire sync every student depends on — **the dominant risk is corrupting/losing student repertoire data**, so the test matrix below is part of the deliverable, not optional.

## Conflict model (decided)
**Last-write-wins on `updated_at`.** Whoever saved most recently wins. A student can unknowingly overwrite a teacher's change and vice versa — accepted tradeoff for the pilot. Made safe-enough by the fact that `syncAll` pulls *before* it pushes (see "Why LWW is correct here").

---

## Data model changes — `mewstro_repertoire`
1. `updated_at timestamptz not null default now()`.
2. `deleted_at timestamptz null` — **soft-delete tombstone** so teacher deletes can travel to the student (a hard delete can't propagate through a pull).
3. **BEFORE UPDATE trigger** sets `updated_at = now()` on every update, regardless of writer (student via RLS, teacher via service-role). App code must NOT rely on setting it manually.
4. Backfill: `update mewstro_repertoire set updated_at = created_at where updated_at is null` (one-time, in the migration before the NOT NULL/trigger if needed).
5. RLS: students keep owner-only read/write on their rows (unchanged). Teacher writes go through the **service-role** dashboard client (RLS bypassed), exactly like assignments.

## iOS changes (`Mewstro`)
1. **Model + DTO:** add `updatedAt: Date` and `deletedAt: Date?` to the `Repertoire` `@Model` and `RepertoireDTO` (snake_case `updated_at`/`deleted_at`).
2. **`pullRepertoire` — replace the `createdAt` guard with LWW + tombstones:**
   - Remote row with `deleted_at != null` → delete the local row if present (skip if absent).
   - Else if a local row exists → apply remote fields **iff `remote.updated_at > local.updated_at`**, and copy `updated_at`. Apply **all editable fields** — including `targetBPM`/`currentBPM`, which the current code omits.
   - Else (no local, not deleted) → insert.
3. **`pushRepertoire`:** include `updated_at` in the DTO. Local edits MUST bump `local.updatedAt = .now` at every local mutation site (add/edit) so the pushed timestamp is fresh and wins over an older remote.
4. **Local edit sites** (`AddRepertoireSheet`, repertoire detail/edit, status changes, BPM updates) set `updatedAt = .now`.
5. **All repertoire reads filter out tombstoned rows** (`deletedAt == nil`): Repertoire tab, repertoire pickers (practice session, assignment), stats. Audit every `FetchDescriptor<Repertoire>`.

### Why LWW is correct here
`SyncService.syncAll` runs **pull before push**. So the student pulls the teacher's latest first (LWW merge updates local if the teacher's edit is newer), *then* pushes — pushing the teacher's values back rather than clobbering them. If the student's local edit is newer, pull leaves it, push sends it. Residual race: a local edit made *between* a device's pull and push (or fully offline) can still win/lose by timestamp — acceptable for the pilot; document it.

## Web (teacher dashboard) changes (`mewstro-web`)
1. **Reads filter tombstones:** `getStudentDetail` (and any repertoire read) add `.is("deleted_at", null)`.
2. **Teacher repertoire CRUD** on the student page (`/teacher/students/[studentId]`):
   - **Add** a piece (already possible via sync, but expose it here for parity).
   - **Edit** teaching-relevant fields: `title`, `artist`, `status` (learning/polishing/mastered/archived — verbatim from iOS), `targetBPM`, `targetCompletionDate`, `instrumentType`.
   - **Delete** = set `deleted_at = now()` (soft delete).
   - **Do NOT let the teacher edit derived/progress fields:** `totalPracticeMinutes` (derived from sessions) and `currentBPM` (the student's own progress). Note this boundary in the UI.
   - Writes via service-role; the DB trigger stamps `updated_at`. New server actions + UI (inline edit or a small sheet), idempotency not required (edits are naturally idempotent; deletes are setting a flag).

## Acceptance criteria
- Teacher add/edit/delete on the dashboard persists and is reflected on the student's iOS app after a sync (add appears; edits apply; deletes remove).
- Student edits still work and propagate as before (no regression).
- Concurrent teacher+student edits resolve by LWW (`updated_at`); neither silently loses data *except* the documented timestamp race.
- Tombstoned pieces disappear from every repertoire surface (iOS tabs/pickers/stats + dashboard).
- Backfill leaves all existing pieces intact with `updated_at = created_at`.

## Test matrix (part of the deliverable — this is live student data)
1. Student-only add/edit/delete still works end-to-end (regression).
2. Teacher add → student pulls → appears.
3. Teacher edit (title, status, targetBPM) → student pulls → applies.
4. Teacher delete → student pulls → row removed; gone from pickers/stats.
5. Student edits piece, then teacher edits same piece later → teacher wins (newer updated_at).
6. Teacher edits, then student edits same piece later → student wins.
7. Offline student edits then syncs after a teacher edit → LWW by timestamp; no crash, no duplicate.
8. Tombstone filtering verified on: Repertoire tab, practice-session repertoire picker, assignment flows, student dashboard, stats counts.

## Known debt / out of scope
- LWW residual race (edit between pull/push) is accepted, not solved (would need server-side conditional writes or per-field merge).
- Per-field merge / teacher-authoritative fields explicitly NOT done (Mikey chose LWW).
- Realtime (instant propagation) out of scope — relies on the existing sync cadence (`.task`, scenePhase, pull-to-refresh).
- Same placeholder-teacher-identity debt as assignments applies to any teacher attribution.
