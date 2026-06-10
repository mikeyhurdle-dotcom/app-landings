import { redirect } from "next/navigation";
import { createClient } from "@/lib/practice/supabase/server";
import { fetchDisplayName, fetchMembership } from "@/lib/practice/studio";
import { getMyAssignments, type Assignment } from "@/lib/practice/assignments";
import { TodayView } from "@/components/practice/TodayView";

export default async function TodayPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/practice/sign-in");

  const { code } = await searchParams;

  const [membership, displayName, sessionsResult] = await Promise.all([
    fetchMembership(supabase, user.id).catch(() => null),
    fetchDisplayName(supabase, user.id).catch(() => null),
    supabase
      .from("mewstro_practice_sessions")
      .select("session_date, duration_minutes")
      .eq("user_id", user.id)
      .order("session_date", { ascending: false })
      .limit(1000),
  ]);

  // A signed-in student following a teacher's invite link goes straight
  // to the join flow with the code carried over.
  if (code && !membership) {
    redirect(`/practice/join?code=${encodeURIComponent(code)}`);
  }

  let assignments: Assignment[] = [];
  if (membership) {
    assignments = await getMyAssignments(supabase).catch(() => []);
  }

  return (
    <TodayView
      displayName={displayName}
      hasStudio={Boolean(membership)}
      sessions={sessionsResult.data ?? []}
      assignments={assignments}
    />
  );
}
