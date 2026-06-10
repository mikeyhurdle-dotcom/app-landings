import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Studio join + leaderboard membership calls. Mirrors the iOS
 * implementation exactly (StudioPickerSheet.swift / LeaderboardView.swift /
 * SyncService.swift) — same RPCs, same tables, same error copy. Do not
 * invent new backend objects here.
 */

export type StudioLookupResult = {
  studio_id: string;
  teacher_name: string;
  studio_name: string;
};

export type LeaderboardMembership = {
  user_id: string;
  studio_name: string;
  display_name_override: string | null;
  opted_in: boolean;
};

// Verbatim iOS copy — keep in sync with StudioPickerSheet.swift.
export const NO_STUDIO_FOUND_ERROR =
  "No studio found with that code. Check with your teacher and try again.";
export const LOOKUP_FAILED_ERROR =
  "Couldn't look up that code. Please try again.";
export const PRIVACY_SAVE_FAILED_ERROR =
  "Couldn't save your leaderboard choice. You can change it anytime from the Leaderboard screen.";

/** `mewstro_lookup_studio` — returns the matching studio or null. */
export async function lookupStudio(
  supabase: SupabaseClient,
  inviteCode: string,
): Promise<StudioLookupResult | null> {
  const { data, error } = await supabase.rpc("mewstro_lookup_studio", {
    p_invite_code: inviteCode.trim(),
  });
  if (error) throw new Error(LOOKUP_FAILED_ERROR);
  return (data as StudioLookupResult[] | null)?.[0] ?? null;
}

/** `mewstro_join_studio` — joins and creates the leaderboard membership. */
export async function joinStudio(
  supabase: SupabaseClient,
  inviteCode: string,
  displayName: string,
): Promise<void> {
  const { error } = await supabase.rpc("mewstro_join_studio", {
    p_invite_code: inviteCode.trim(),
    p_display_name: displayName.trim(),
  });
  if (error) throw new Error(error.message);
}

/** The student's membership row, or null when studio-less. */
export async function fetchMembership(
  supabase: SupabaseClient,
  userId: string,
): Promise<LeaderboardMembership | null> {
  const { data, error } = await supabase
    .from("mewstro_leaderboard_memberships")
    .select("user_id, studio_name, display_name_override, opted_in")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return (data as LeaderboardMembership[] | null)?.[0] ?? null;
}

/**
 * Leaderboard privacy toggle. Default on the membership row is
 * opted_in = true (HOBTRAC-118 decision) — only written when changed.
 */
export async function setLeaderboardOptIn(
  supabase: SupabaseClient,
  userId: string,
  optedIn: boolean,
): Promise<void> {
  const { error } = await supabase
    .from("mewstro_leaderboard_memberships")
    .update({ opted_in: optedIn })
    .eq("user_id", userId);
  if (error) throw new Error(PRIVACY_SAVE_FAILED_ERROR);
}

/**
 * Save the profile display name and propagate it to any leaderboard
 * membership rows — mirrors SyncService.pushDisplayNameToLeaderboardMemberships
 * (the iOS fix for the "Musician" placeholder).
 */
export async function saveDisplayName(
  supabase: SupabaseClient,
  userId: string,
  displayName: string,
): Promise<void> {
  const name = displayName.trim();
  if (!name) return;

  const { error } = await supabase
    .from("mewstro_user_profiles")
    .upsert({ user_id: userId, display_name: name }, { onConflict: "user_id" });
  if (error) throw new Error(error.message);

  // No-op when the student has no membership rows yet.
  await supabase
    .from("mewstro_leaderboard_memberships")
    .update({ display_name_override: name })
    .eq("user_id", userId);
}

/** The student's profile display name, or null. */
export async function fetchDisplayName(
  supabase: SupabaseClient,
  userId: string,
): Promise<string | null> {
  const { data } = await supabase
    .from("mewstro_user_profiles")
    .select("display_name")
    .eq("user_id", userId);
  return data?.[0]?.display_name ?? null;
}
