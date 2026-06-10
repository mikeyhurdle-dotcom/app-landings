"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/practice/supabase/client";
import { setLeaderboardOptIn } from "@/lib/practice/studio";
import { formatMinutes } from "@/lib/practice/duration";
import type { LeaderboardEntry } from "@/app/practice/(app)/leaderboard/page";
import { primaryButtonClass } from "./AuthShell";

/** Medal / rank badge — same convention as the iOS LeaderboardView. */
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-xl">🥇</span>;
  if (rank === 2) return <span className="text-xl">🥈</span>;
  if (rank === 3) return <span className="text-xl">🥉</span>;
  return (
    <span className="text-sm font-bold text-mewstro-dim">{rank}</span>
  );
}

export function LeaderboardRankings({
  userId,
  studioName,
  entries,
  fetchError,
}: {
  userId: string;
  studioName: string;
  entries: LeaderboardEntry[];
  fetchError: string | null;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const maxMinutes = entries[0]?.weekly_minutes ?? 1;

  async function hideMe() {
    setBusy(true);
    setError(null);
    try {
      await setLeaderboardOptIn(createClient(), userId, false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  }

  return (
    <main className="flex flex-col px-6 pt-10">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <p className="mt-1 text-sm text-mewstro-dim">{studioName} · This Week</p>

      {fetchError && (
        <p className="mt-6 text-sm text-red-600" role="alert">
          {fetchError}
        </p>
      )}

      {!fetchError && entries.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-sm text-mewstro-dim">
            No one has practiced yet this week
          </p>
          <p className="mt-1 text-base font-bold text-mewstro-primary">
            Be the first!
          </p>
        </div>
      )}

      <ul className="mt-6 flex flex-col gap-2">
        {entries.map((entry) => {
          const isMe = entry.id === userId;
          const ratio =
            maxMinutes > 0 ? entry.weekly_minutes / maxMinutes : 0;
          return (
            <li
              key={entry.id}
              className={`flex items-center gap-3 rounded-2xl p-4 ${
                isMe
                  ? "border border-mewstro-accent/30 bg-mewstro-accent/10"
                  : "border border-[#E8DFD3] bg-mewstro-surface"
              }`}
            >
              <span className="flex w-8 shrink-0 justify-center">
                <RankBadge rank={entry.rank} />
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm ${
                    isMe ? "font-bold" : "font-medium"
                  }`}
                >
                  {entry.display_name}
                  {isMe && (
                    <span className="ml-1 text-xs font-semibold text-mewstro-accent">
                      you
                    </span>
                  )}
                </p>
                <div className="mt-1.5 h-2 overflow-hidden rounded bg-[#F0E8DC]">
                  <div
                    className={`h-full rounded ${
                      isMe ? "bg-mewstro-primary" : "bg-mewstro-secondary/50"
                    }`}
                    style={{ width: `${Math.max(2, ratio * 100)}%` }}
                  />
                </div>
              </div>
              <span className="shrink-0 text-sm font-semibold">
                {formatMinutes(entry.weekly_minutes)}
              </span>
            </li>
          );
        })}
      </ul>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        disabled={busy}
        onClick={hideMe}
        className="mt-8 py-2 text-sm font-semibold text-mewstro-dim"
      >
        Hide me from the leaderboard
      </button>
    </main>
  );
}

/**
 * Hidden state for opted-out members — re-opting in must always be
 * reachable (the iOS 1.0.4 / HOBTRAC-118 lesson).
 */
export function LeaderboardHidden({
  userId,
  studioName,
}: {
  userId: string;
  studioName: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function showMe() {
    setBusy(true);
    setError(null);
    try {
      await setLeaderboardOptIn(createClient(), userId, true);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  }

  return (
    <main className="flex flex-col items-center px-6 pt-14 text-center">
      <p className="text-5xl">🙈</p>
      <h1 className="mt-4 text-2xl font-bold">You&apos;re hidden</h1>
      <p className="mt-2 text-sm text-mewstro-dim">
        You&apos;re part of {studioName}, but classmates can&apos;t see you on
        the leaderboard. Your teacher still sees your practice activity.
      </p>
      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <button
        type="button"
        disabled={busy}
        onClick={showMe}
        className={`mt-8 ${primaryButtonClass}`}
      >
        Show me on the leaderboard
      </button>
    </main>
  );
}
