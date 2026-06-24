import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Studio resources shared with the signed-in student. Mirrors the iOS
 * StudioResourceService exactly — same RPC, same DTO fields. SECURITY
 * DEFINER grants access to the rows the student is entitled to see.
 */

export type Resource = {
  id: string;
  studio_id: string;
  type: "link" | "embed" | "document";
  title: string;
  description: string | null;
  url: string | null;
  storage_path: string | null;
  audience: "studio" | "instrument" | "student";
  created_at: string;
  studio_name: string;
  teacher_name: string;
};

/** `mewstro_get_my_resources()` — resources the student is entitled to. */
export async function getMyResources(
  supabase: SupabaseClient,
): Promise<Resource[]> {
  const { data, error } = await supabase.rpc("mewstro_get_my_resources");
  if (error) throw new Error(error.message);
  return (data as Resource[] | null) ?? [];
}
