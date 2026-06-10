import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/practice/supabase/server";
import { fetchDisplayName, fetchMembership } from "@/lib/practice/studio";
import { JoinPageFlow } from "@/components/practice/JoinPageFlow";

export const metadata: Metadata = { title: "Join a Studio" };

export default async function JoinPage({
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
  const [membership, displayName] = await Promise.all([
    fetchMembership(supabase, user.id),
    fetchDisplayName(supabase, user.id),
  ]);

  if (membership) {
    return (
      <main className="flex flex-col items-center px-6 pt-14 text-center">
        <h1 className="text-2xl font-bold">
          You&apos;re already in {membership.studio_name}
        </h1>
        <p className="mt-2 text-sm text-mewstro-dim">
          One studio at a time keeps the leaderboard fair.
        </p>
        <Link
          href="/practice/leaderboard"
          className="mt-8 w-full rounded-2xl bg-mewstro-primary px-6 py-4 text-base font-semibold text-white shadow-sm"
        >
          See the leaderboard
        </Link>
      </main>
    );
  }

  return (
    <main className="px-6 pt-14">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Join a Studio</h1>
        <p className="mt-2 text-sm text-mewstro-dim">
          Enter your teacher&apos;s invite code to join the studio leaderboard.
        </p>
      </div>
      <JoinPageFlow
        userId={user.id}
        initialCode={code ?? ""}
        profileDisplayName={displayName}
      />
    </main>
  );
}
