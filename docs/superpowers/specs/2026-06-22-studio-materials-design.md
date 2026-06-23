# Studio Materials (Studio Resources) — Design Spec

**Date:** 2026-06-22
**Source:** Josh feedback (HOBTRAC-219, "Studio Assets / Studio Materials"). The original Studio Teaching Loop spec (2026-06-21) sketched this as §3; this is the dedicated design.
**Repos:** `mewstro-web` (teacher dashboard + `/practice` student web portal) + `Mewstro` (iOS) + Supabase `nspgvdytqsvnmbitbmey`.
**Status:** SPEC — not yet planned/built.

## Scope (decided)
- **Media:** web **links**, **YouTube/Vimeo embeds**, and **PDF document upload** (no direct video upload — teachers host video on YouTube/Vimeo, keeping egress cost + IP off us).
- **Student surfaces:** **iOS app** AND the **`/practice` web student portal**.
- **Audience targeting:** **studio-wide**, **per-instrument**, and **per-named-student** (one targeting mechanism, no separate tag array).
- **PDF cap:** **25 MB, PDF-only** — chiefly to avoid mobile/web render jank (memory, slow load); also stays under Supabase Free's 50 MB per-file limit. Enforced client-side (reject before upload) and validated server-side.

## Reuses existing patterns (low novel risk)
- **Delivery** mirrors **assignments**: a SECURITY DEFINER RPC (`mewstro_get_my_resources`) + iOS delivery card + web-portal list — exactly like `mewstro_get_my_assignments` / `AssignmentsCard` / the portal assignments list.
- **Document storage** mirrors **milestones**: a private bucket + an entitlement-based Storage RLS read policy + short-lived signed URLs minted by the entitled client (see `milestones_studio_read` policy + `AppConstants.milestoneSignedURLLifetimeSeconds`).
- **Teacher CRUD + scope guard** mirrors the repertoire/assignment dashboard work: service-role writes gated by `studentInStudio()` / studio resolution.
- **Soft-delete** (`deleted_at`) mirrors repertoire, so deletes propagate cleanly to all reads.

## Data model — `mewstro_studio_resources`
| column | type | notes |
|---|---|---|
| `id` | uuid pk | |
| `studio_id` | uuid not null | the owning studio |
| `created_by` | uuid | teacher (placeholder-teacher-id debt as elsewhere) |
| `type` | text not null | `link` \| `embed` \| `document` |
| `title` | text not null | |
| `description` | text null | |
| `url` | text null | for `link` / `embed` (required when type≠document) |
| `storage_path` | text null | for `document` (required when type=document) |
| `audience` | text not null | `studio` \| `instrument` \| `student` |
| `audience_instrument` | text null | instrument string when `audience=instrument` |
| `audience_student_user_id` | uuid null | student when `audience=student` |
| `created_at`/`updated_at` | timestamptz | `updated_at` via BEFORE-UPDATE trigger (reuse `set_updated_at`) |
| `deleted_at` | timestamptz null | soft-delete tombstone |

Indexes: `(studio_id)`, `(audience_student_user_id)`. RLS: students read via the RPC (SECURITY DEFINER) only; direct table writes are service-role (dashboard). A check constraint enforces the url/storage_path/audience_* presence rules.

## Delivery RPC — `mewstro_get_my_resources()`
SECURITY DEFINER, `search_path=public`, granted to `authenticated`. Returns non-deleted resources for studios the caller belongs to (`mewstro_leaderboard_memberships`) where:
- `audience='studio'`, OR
- `audience='instrument'` AND `audience_instrument` is in the caller's instruments (from `mewstro_user_profiles.instruments` or the membership's instrument data — confirm the source of a user's instruments at plan time), OR
- `audience='student'` AND `audience_student_user_id = auth.uid()`.
Order: newest first. Returns `type, title, description, url, storage_path, audience, created_at` (+ studio/teacher name for display).

## Documents (PDF) — storage + access
- Private bucket **`studio-resources`**.
- **Storage RLS SELECT policy** `studio_resources_read` (mirror `milestones_studio_read`): allow reading an object iff a non-deleted `mewstro_studio_resources` row references that `storage_path` AND the caller is entitled by the same audience rules as the RPC. So an entitled student's authed client can `createSignedUrl` (short lifetime, e.g. 300s) and download; nobody else can.
- Teacher upload: dashboard (service-role) uploads the file to `studio-resources/<studio_id>/<uuid>.pdf` and inserts the row with that `storage_path`. Enforce `application/pdf` + ≤25 MB server-side; reject otherwise.
- **IP attestation:** a required checkbox on the document-upload form ("I have the right to share this material"). Store nothing extra beyond gating the upload (attestation is a UI gate for the pilot).

## Teacher dashboard (web)
- New route **`/teacher/materials`**: list current materials (grouped or filterable by audience), with add / edit / delete. Add form: type picker (link/embed/document), title, description, audience selector (studio / pick instrument / pick student), and either a URL field or a PDF file input (with the 25 MB + PDF-only guard + IP checkbox). Delete = soft-delete.
- **Per-student**: an "Add material for this student" action on `/teacher/students/[studentId]` that pre-sets `audience=student`.
- All writes go through service-role helpers gated by `getActiveStudioName()` + (for student-targeted) `studentInStudio()`. Add a nav entry to the teacher home.

## Student surfaces
- **iOS:** a new "From your teacher" / "Materials" view (lives alongside the studio views; reachable from the Practice tab or Settings — decide placement at plan time, mirroring how `AssignmentHistoryView` was added to Settings). Calls `mewstro_get_my_resources` via `SupabaseRestClient.callRPC`. `link`/`embed` open externally (SFSafariViewController); `document` fetches a signed URL on tap and opens the PDF (lazy, like milestones). Filter by `deleted_at` is server-side (RPC excludes deleted).
- **Web portal (`/practice`):** a materials list page mirroring the iOS view, using a portal-side read (anon key + the same entitlement, via the RPC or an RLS-scoped query). Links/embeds open in a new tab; PDFs via signed URL.

## Acceptance criteria
- Teacher can create link/embed/document materials targeted at the whole studio, an instrument, or a named student; edit + soft-delete them.
- A student sees exactly the materials targeting them (studio ∪ their-instrument ∪ them) on iOS and the web portal; deleted ones disappear.
- PDFs: only entitled students can fetch them (RLS verified); >25 MB or non-PDF uploads are rejected; IP attestation required.
- Cross-studio isolation holds (a teacher can only target their own studio's students; a student only sees their studios' materials).
- Embeds/links open externally; no direct video upload exists.

## Build phases (one spec → sequenced plan)
1. DB: table + trigger + `deleted_at` + check constraint + indexes; `mewstro_get_my_resources` RPC; `studio-resources` bucket + storage RLS.
2. Teacher web CRUD — links/embeds first, then PDF upload (bucket wired).
3. Student iOS view (RPC + card + signed-URL PDF open).
4. Student web-portal view.

## Out of scope / known debt
- Direct video upload (intentional — YouTube/Vimeo embeds only).
- Moderation/reporting beyond delete; teacher-identity placeholder debt (as elsewhere).
- Realtime; relies on existing fetch cadence.
- Per-instrument targeting assumes single-instrument tags; combined-instrument (HOBTRAC-211) interplay handled when 211 lands (a combined student matches each constituent instrument).
- Cost: PDFs are MB-scale (fine on Free's 1 GB bucket for the pilot); embeds are free. Revisit only if document volume grows.
