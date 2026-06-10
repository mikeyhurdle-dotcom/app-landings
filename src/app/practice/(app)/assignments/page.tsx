import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/practice/supabase/server";
import { fetchMembership } from "@/lib/practice/studio";
import { getMyAssignments } from "@/lib/practice/assignments";
import { AssignmentsList } from "@/components/practice/AssignmentsList";

export const metadata: Metadata = { title: "Assignments" };

export default async function AssignmentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/practice/sign-in");

  const membership = await fetchMembership(supabase, user.id).catch(() => null);

  if (!membership) {
    return (
      <main className="flex flex-col items-center px-6 pt-14 text-center">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <p className="mt-4 text-sm text-mewstro-dim">
          Once you join your teacher&apos;s studio, anything they set for you
          lands right here.
        </p>
        <Link
          href="/practice/join"
          className="mt-8 w-full rounded-2xl bg-mewstro-primary px-6 py-4 text-base font-semibold text-white shadow-sm"
        >
          Join your studio
        </Link>
      </main>
    );
  }

  const assignments = await getMyAssignments(supabase).catch(() => []);

  return (
    <main className="flex flex-col px-6 pt-10">
      <h1 className="text-2xl font-bold">Assignments</h1>
      <p className="mt-1 text-sm text-mewstro-dim">
        Set by {membership.studio_name} — tick them off as you go.
      </p>
      <AssignmentsList initialAssignments={assignments} />
    </main>
  );
}
