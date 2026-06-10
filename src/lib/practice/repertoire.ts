import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Repertoire (pieces) — mirrors the iOS model exactly:
 * - table `mewstro_repertoire`, RepertoireDTO field shape
 * - statuses from RepertoireStatus: learning / polishing / mastered / archived
 * - time-per-piece is DERIVED from practice sessions (like iOS
 *   RepertoireDetailView), never from the stored total_practice_minutes
 *   column — a derived number can't diverge between platforms.
 */

export const REPERTOIRE_STATUSES = [
  { key: "learning", label: "Learning" },
  { key: "polishing", label: "Polishing" },
  { key: "mastered", label: "Mastered" },
  { key: "archived", label: "Archived" },
] as const;

export type RepertoireStatus = (typeof REPERTOIRE_STATUSES)[number]["key"];

export type RepertoirePiece = {
  id: string;
  user_id: string;
  title: string;
  artist: string | null;
  status: string;
  total_practice_minutes: number;
  instrument_type: string;
  target_completion_date: string | null;
  target_bpm: number | null;
  current_bpm: number | null;
  created_at: string;
};

export function statusLabel(key: string): string {
  return REPERTOIRE_STATUSES.find((s) => s.key === key)?.label ?? key;
}

export async function fetchRepertoire(
  supabase: SupabaseClient,
  userId: string,
): Promise<RepertoirePiece[]> {
  const { data, error } = await supabase
    .from("mewstro_repertoire")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as RepertoirePiece[] | null) ?? [];
}

/** Create a piece — client UUID, full iOS DTO shape, upsert (retry-safe). */
export async function addPiece(
  supabase: SupabaseClient,
  input: {
    userId: string;
    title: string;
    artist?: string;
    instrumentType: string;
  },
): Promise<RepertoirePiece> {
  const row: RepertoirePiece = {
    id: crypto.randomUUID(),
    user_id: input.userId,
    title: input.title.trim(),
    artist: input.artist?.trim() ? input.artist.trim() : null,
    status: "learning",
    total_practice_minutes: 0,
    instrument_type: input.instrumentType,
    target_completion_date: null,
    target_bpm: null,
    current_bpm: null,
    created_at: new Date().toISOString(),
  };
  const { error } = await supabase
    .from("mewstro_repertoire")
    .upsert(row, { onConflict: "id" });
  if (error) throw new Error(error.message);
  return row;
}

export async function updatePiece(
  supabase: SupabaseClient,
  pieceId: string,
  changes: Partial<Pick<RepertoirePiece, "title" | "artist" | "status">>,
): Promise<void> {
  const { error } = await supabase
    .from("mewstro_repertoire")
    .update(changes)
    .eq("id", pieceId);
  if (error) throw new Error(error.message);
}

// ---------------------------------------------------------------------------
// Time per piece — derived from sessions, mirroring iOS RepertoireDetailView
// (`linkedSessions.reduce(0) { $0 + $1.durationMinutes }`).
// ---------------------------------------------------------------------------

export type SessionForTotals = {
  repertoire_id: string | null;
  duration_minutes: number;
};

/** Map of repertoire_id → total minutes practised against that piece. */
export function minutesByPiece(
  sessions: SessionForTotals[],
): Map<string, number> {
  const totals = new Map<string, number>();
  for (const s of sessions) {
    if (!s.repertoire_id) continue;
    totals.set(
      s.repertoire_id,
      (totals.get(s.repertoire_id) ?? 0) + s.duration_minutes,
    );
  }
  return totals;
}
