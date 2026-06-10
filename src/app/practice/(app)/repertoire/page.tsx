import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/practice/supabase/server";
import { fetchRepertoire } from "@/lib/practice/repertoire";
import { RepertoireView } from "@/components/practice/RepertoireView";

export const metadata: Metadata = { title: "Repertoire" };

export default async function RepertoirePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/practice/sign-in");

  const [pieces, sessionsResult] = await Promise.all([
    fetchRepertoire(supabase, user.id).catch(() => []),
    supabase
      .from("mewstro_practice_sessions")
      .select("repertoire_id, duration_minutes")
      .eq("user_id", user.id)
      .not("repertoire_id", "is", null),
  ]);

  return (
    <RepertoireView
      userId={user.id}
      initialPieces={pieces}
      sessions={sessionsResult.data ?? []}
    />
  );
}
