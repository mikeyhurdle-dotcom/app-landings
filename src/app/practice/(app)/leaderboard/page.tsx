import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/practice/supabase/server";
import { fetchMembership } from "@/lib/practice/studio";
import {
  LeaderboardRankings,
  LeaderboardHidden,
} from "@/components/practice/LeaderboardView";

export const metadata: Metadata = { title: "Leaderboard" };

export type LeaderboardEntry = {
  id: string;
  display_name: string;
  weekly_minutes: number;
  rank: number;
};

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/practice/sign-in");

  const membership = await fetchMembership(supabase, user.id).catch(() => null);

  if (!membership) {
    return (
      <main className="flex flex-col items-center px-6 pt-14 text-center">
        <p className="text-5xl">🏆</p>
        <h1 className="mt-4 text-2xl font-bold">Join a Studio</h1>
        <p className="mt-2 text-sm text-mewstro-dim">
          Compete with friends and fellow musicians on a weekly practice
          leaderboard.
        </p>
        <Link
          href="/practice/join"
          className="mt-8 w-full rounded-2xl bg-mewstro-primary px-6 py-4 text-base font-semibold text-white shadow-sm"
        >
          Join a Studio
        </Link>
      </main>
    );
  }

  // Opted-out students get the hidden state with a way back in —
  // the iOS 1.0.4 fix (HOBTRAC-118) made re-opting-in always reachable.
  if (!membership.opted_in) {
    return (
      <LeaderboardHidden
        userId={user.id}
        studioName={membership.studio_name}
      />
    );
  }

  // Server-filtered rankings rendered as-is — privacy is the RPC's job,
  // never re-filtered client-side.
  const { data, error } = await supabase.rpc("mewstro_get_studio_leaderboard", {
    p_studio_name: membership.studio_name,
  });

  return (
    <LeaderboardRankings
      userId={user.id}
      studioName={membership.studio_name}
      entries={(data as LeaderboardEntry[] | null) ?? []}
      fetchError={error ? "Something went wrong loading the leaderboard. Pull down to retry or check back in a moment." : null}
    />
  );
}
