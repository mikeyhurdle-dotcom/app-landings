"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/practice/supabase/client";
import {
  lookupStudio,
  joinStudio,
  setLeaderboardOptIn,
  NO_STUDIO_FOUND_ERROR,
  type StudioLookupResult,
} from "@/lib/practice/studio";
import { inputClass, primaryButtonClass } from "./AuthShell";

/**
 * Invite-code → confirm → join → leaderboard-privacy explainer.
 * A web port of the iOS StudioPickerSheet, with its copy verbatim.
 */
export function StudioJoinFlow({
  userId,
  initialCode = "",
  profileDisplayName,
  showNameOverride = false,
  skipLabel,
  onSkip,
  onDone,
}: {
  userId: string;
  initialCode?: string;
  /** Used as p_display_name when no override is entered. */
  profileDisplayName?: string | null;
  /** Show the optional leaderboard display-name field (iOS parity). */
  showNameOverride?: boolean;
  skipLabel?: string;
  onSkip?: () => void;
  onDone: (joined: boolean) => void;
}) {
  const [inviteCode, setInviteCode] = useState(initialCode);
  const [nameOverride, setNameOverride] = useState("");
  const [foundStudio, setFoundStudio] = useState<StudioLookupResult | null>(
    null,
  );
  const [joinedStudio, setJoinedStudio] = useState<StudioLookupResult | null>(
    null,
  );
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleLookup() {
    const trimmed = inviteCode.trim();
    if (!trimmed) return;
    setBusy(true);
    setError(null);
    setFoundStudio(null);

    try {
      const studio = await lookupStudio(createClient(), trimmed);
      if (studio) {
        setFoundStudio(studio);
      } else {
        setError(NO_STUDIO_FOUND_ERROR);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
    setBusy(false);
  }

  async function handleJoin() {
    setBusy(true);
    setError(null);

    try {
      const displayName = nameOverride.trim() || profileDisplayName || "";
      await joinStudio(createClient(), inviteCode, displayName);
      setJoinedStudio(foundStudio);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
    setBusy(false);
  }

  async function handleFinish() {
    // Membership rows default to opted_in = true — only write on change,
    // matching StudioPickerSheet.finishOnboarding.
    if (showOnLeaderboard) {
      onDone(true);
      return;
    }

    setBusy(true);
    setError(null);
    try {
      await setLeaderboardOptIn(createClient(), userId, false);
      onDone(true);
    } catch (e) {
      // Non-fatal — they're in the studio either way.
      setError(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  }

  // Step 3: welcome + leaderboard privacy explainer (HOBTRAC-118).
  if (joinedStudio) {
    return (
      <div className="flex flex-col items-center text-center">
        <Image
          src="/mewstro/mascot-celebrating.png"
          alt="Mewstro celebrating"
          width={120}
          height={120}
          priority
        />
        <h1 className="mt-5 text-2xl font-bold">You&apos;re in!</h1>
        <p className="mt-2 text-sm text-mewstro-dim">
          Welcome to {joinedStudio.studio_name}.
        </p>

        <div className="mt-8 w-full rounded-2xl border border-[#E8DFD3] bg-mewstro-surface p-4 text-left">
          <label className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold">
              Show me on the leaderboard
            </span>
            <input
              type="checkbox"
              checked={showOnLeaderboard}
              onChange={(e) => setShowOnLeaderboard(e.target.checked)}
              className="h-6 w-6 accent-mewstro-primary"
            />
          </label>
          <p className="mt-3 text-xs leading-relaxed text-mewstro-dim">
            Your teacher always sees your practice activity. This toggle only
            controls whether classmates see you on the studio leaderboard. You
            can change this anytime from the Leaderboard screen.
          </p>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          disabled={busy}
          onClick={handleFinish}
          className={`mt-6 ${primaryButtonClass}`}
        >
          Got it
        </button>
      </div>
    );
  }

  // Steps 1 + 2: lookup, then confirm.
  return (
    <div className="flex flex-col">
      <label
        htmlFor="invite-code"
        className="text-xs font-semibold uppercase tracking-wide text-mewstro-dim"
      >
        Invite code
      </label>
      <input
        id="invite-code"
        type="text"
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        placeholder="Invite code"
        className={`mt-2 ${inputClass} uppercase`}
        value={inviteCode}
        onChange={(e) => {
          setInviteCode(e.target.value.toUpperCase());
          setFoundStudio(null);
        }}
      />
      <p className="mt-2 text-xs text-mewstro-dim">
        Enter the code your teacher gave you (e.g. ELLIE-2026).
      </p>

      {foundStudio && (
        <div className="mt-6 rounded-2xl bg-mewstro-primary/10 p-5 text-center">
          <p className="text-base font-semibold">
            Join {foundStudio.teacher_name}&apos;s Studio?
          </p>
          <p className="mt-1 text-sm text-mewstro-dim">
            {foundStudio.studio_name}
          </p>
        </div>
      )}

      {foundStudio && showNameOverride && (
        <div className="mt-4">
          <input
            type="text"
            autoCapitalize="words"
            placeholder="Display name (optional)"
            className={inputClass}
            value={nameOverride}
            onChange={(e) => setNameOverride(e.target.value)}
          />
          <p className="mt-2 text-xs text-mewstro-dim">
            Leave blank to use your profile name on the leaderboard.
          </p>
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {foundStudio ? (
        <button
          type="button"
          disabled={busy}
          onClick={handleJoin}
          className={`mt-6 ${primaryButtonClass}`}
        >
          Join Studio
        </button>
      ) : (
        <button
          type="button"
          disabled={busy || !inviteCode.trim()}
          onClick={handleLookup}
          className={`mt-6 ${primaryButtonClass}`}
        >
          Find Studio
        </button>
      )}

      {onSkip && (
        <button
          type="button"
          disabled={busy}
          onClick={onSkip}
          className="mt-4 py-2 text-sm font-semibold text-mewstro-dim"
        >
          {skipLabel ?? "Skip for now"}
        </button>
      )}
    </div>
  );
}
