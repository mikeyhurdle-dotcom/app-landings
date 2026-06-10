import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Teacher assignments for the signed-in student. Mirrors the iOS
 * AssignmentService exactly — same RPCs, same DTO fields. The server
 * filters out completed assignments, so the active list is authoritative.
 */

export type Assignment = {
  id: string;
  studio_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  created_at: string;
  teacher_name: string;
  studio_name: string;
};

/** `mewstro_get_my_assignments()` — active assignments, authed as the student. */
export async function getMyAssignments(
  supabase: SupabaseClient,
): Promise<Assignment[]> {
  const { data, error } = await supabase.rpc("mewstro_get_my_assignments");
  if (error) throw new Error(error.message);
  return (data as Assignment[] | null) ?? [];
}

// Verbatim iOS copy — AssignmentService.markComplete.
export const MARK_COMPLETE_FAILED_ERROR =
  "Couldn't mark complete. Try again in a moment.";

/**
 * `mewstro_mark_assignment_complete` — same RPC the iOS app calls.
 * Idempotent server-side (ON CONFLICT DO NOTHING).
 */
export async function markAssignmentComplete(
  supabase: SupabaseClient,
  assignmentId: string,
): Promise<void> {
  const { error } = await supabase.rpc("mewstro_mark_assignment_complete", {
    p_assignment_id: assignmentId,
  });
  if (error) throw new Error(MARK_COMPLETE_FAILED_ERROR);
}
