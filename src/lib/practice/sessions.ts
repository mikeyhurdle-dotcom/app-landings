import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Practice-session writes. Field parity with the iOS push path
 * (SyncService.pushSession → PracticeSessionDTO) is critical so iOS
 * pull-sync ingests web-logged rows cleanly: client-generated `id`,
 * ISO-8601 timestamps, instrument keys ("piano"), task display names
 * ("Sight Reading").
 */

export type PracticeSessionRow = {
  id: string;
  user_id: string;
  session_date: string;
  duration_minutes: number;
  task_type: string;
  instrument_type: string;
  notes: string | null;
  repertoire_id: string | null;
  created_at: string;
};

export function buildSession(input: {
  userId: string;
  sessionDate: Date;
  durationMinutes: number;
  taskType: string;
  instrumentType: string;
  notes?: string;
  repertoireId?: string | null;
}): PracticeSessionRow {
  return {
    id: crypto.randomUUID(),
    user_id: input.userId,
    session_date: input.sessionDate.toISOString(),
    duration_minutes: input.durationMinutes,
    task_type: input.taskType,
    instrument_type: input.instrumentType,
    notes: input.notes?.trim() ? input.notes.trim() : null,
    repertoire_id: input.repertoireId ?? null,
    created_at: new Date().toISOString(),
  };
}

export async function insertSession(
  supabase: SupabaseClient,
  row: PracticeSessionRow,
): Promise<void> {
  // Upsert on the client-generated id — retries can never duplicate.
  const { error } = await supabase
    .from("mewstro_practice_sessions")
    .upsert(row, { onConflict: "id" });
  if (error) throw new Error(error.message);
}

// ---------------------------------------------------------------------------
// Pending queue — a student must NEVER lose a logged practice. Failed
// inserts are parked in localStorage and retried on load / visibility /
// online events. Storage is injectable so the queue is unit-testable.
// ---------------------------------------------------------------------------

export const PENDING_SESSIONS_KEY = "mewstro-pending-sessions";

type StringStore = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function readPendingSessions(store: StringStore): PracticeSessionRow[] {
  try {
    const raw = store.getItem(PENDING_SESSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writePendingSessions(
  store: StringStore,
  sessions: PracticeSessionRow[],
): void {
  if (sessions.length === 0) {
    store.removeItem(PENDING_SESSIONS_KEY);
  } else {
    store.setItem(PENDING_SESSIONS_KEY, JSON.stringify(sessions));
  }
}

export function queuePendingSession(
  store: StringStore,
  row: PracticeSessionRow,
): void {
  const pending = readPendingSessions(store);
  if (!pending.some((p) => p.id === row.id)) {
    pending.push(row);
  }
  writePendingSessions(store, pending);
}

/**
 * Attempt every queued session; keep only the ones that still fail.
 * Returns the number successfully saved.
 */
export async function flushPendingSessions(
  store: StringStore,
  insert: (row: PracticeSessionRow) => Promise<void>,
): Promise<number> {
  const pending = readPendingSessions(store);
  if (pending.length === 0) return 0;

  const stillPending: PracticeSessionRow[] = [];
  let saved = 0;

  for (const row of pending) {
    try {
      await insert(row);
      saved += 1;
    } catch {
      stillPending.push(row);
    }
  }

  writePendingSessions(store, stillPending);
  return saved;
}

/**
 * Save a session, falling back to the pending queue on failure.
 * Returns true when it reached Supabase, false when it was queued.
 */
export async function saveSessionOrQueue(
  supabase: SupabaseClient,
  store: StringStore,
  row: PracticeSessionRow,
): Promise<boolean> {
  try {
    await insertSession(supabase, row);
    return true;
  } catch {
    queuePendingSession(store, row);
    return false;
  }
}
