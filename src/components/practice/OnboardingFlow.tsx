"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/practice/supabase/client";
import { saveDisplayName } from "@/lib/practice/studio";
import { StudioJoinFlow } from "./StudioJoinFlow";
import { inputClass, primaryButtonClass } from "./AuthShell";

/**
 * First-run flow: display name → join your teacher's studio → Today.
 * Joining is optional — a student without a code still gets the full
 * timer + streak experience.
 */
export function OnboardingFlow({
  userId,
  initialDisplayName,
  next,
}: {
  userId: string;
  initialDisplayName: string;
  next: string;
}) {
  const router = useRouter();
  // The teacher's invite link looks like /practice?code=ABC123 — the code
  // rides along inside `next` through sign-up, so dig it out for prefill.
  const inviteCode =
    new URLSearchParams(next.split("?")[1] ?? "").get("code") ?? "";

  const [step, setStep] = useState<"name" | "join">("name");
  const [name, setName] = useState(initialDisplayName);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function finish() {
    router.push(next);
    router.refresh();
  }

  async function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setError(null);

    try {
      await saveDisplayName(createClient(), userId, name);
      setStep("join");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
    setBusy(false);
  }

  if (step === "name") {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-14">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/mewstro/mascot.png"
            alt="Mewstro the cat"
            width={110}
            height={110}
            priority
          />
          <h1 className="mt-5 text-2xl font-bold">
            What should we call you?
          </h1>
          <p className="mt-2 text-sm text-mewstro-dim">
            Your name shows up to your teacher and on your studio leaderboard.
          </p>
        </div>

        <form onSubmit={handleNameSubmit} className="mt-8 flex flex-col gap-3">
          <input
            type="text"
            required
            autoCapitalize="words"
            placeholder="Your name"
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || !name.trim()}
            className={primaryButtonClass}
          >
            Continue
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-14">
      <div className="mb-8 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Join your teacher&apos;s studio</h1>
        <p className="mt-2 text-sm text-mewstro-dim">
          Got an invite code? Pop it in and you&apos;ll be on the studio
          leaderboard tonight.
        </p>
      </div>
      <StudioJoinFlow
        userId={userId}
        initialCode={inviteCode}
        profileDisplayName={name}
        skipLabel="Skip for now"
        onSkip={finish}
        onDone={finish}
      />
    </main>
  );
}
