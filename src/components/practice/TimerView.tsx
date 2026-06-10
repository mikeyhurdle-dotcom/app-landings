"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/practice/supabase/client";
import { INSTRUMENTS, taskTypesFor } from "@/lib/practice/instruments";
import { buildSession, saveSessionOrQueue } from "@/lib/practice/sessions";
import {
  type TimerState,
  elapsedMs,
  startTimer,
  pauseTimer,
  resumeTimer,
  finishedMinutes,
  loadTimer,
  persistTimer,
} from "@/lib/practice/timer";
import { formatElapsed, formatMinutes } from "@/lib/practice/duration";
import { ManualEntryForm } from "./ManualEntryForm";
import { inputClass, primaryButtonClass, secondaryButtonClass } from "./AuthShell";

const LAST_INSTRUMENT_KEY = "mewstro-last-instrument";

type Phase =
  | { kind: "setup" }
  | { kind: "running" }
  | { kind: "reflect"; minutes: number }
  | { kind: "saved"; minutes: number; queued: boolean };

export function TimerView({ userId }: { userId: string }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>({ kind: "setup" });
  const [timer, setTimer] = useState<TimerState | null>(null);
  const [instrument, setInstrument] = useState("piano");
  const [taskType, setTaskType] = useState("Repertoire");
  const [notes, setNotes] = useState("");
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [busy, setBusy] = useState(false);
  // Ticker — purely cosmetic; elapsed time always derives from wall clock.
  const [, setTick] = useState(0);
  const restored = useRef(false);

  // Restore a running timer after reload / accidental nav-away.
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    const active = loadTimer(localStorage);
    if (active) {
      setTimer(active);
      setInstrument(active.instrument);
      setTaskType(active.taskType);
      setPhase({ kind: "running" });
    } else {
      const last = localStorage.getItem(LAST_INSTRUMENT_KEY);
      if (last && INSTRUMENTS.some((i) => i.key === last)) {
        setInstrument(last);
        setTaskType(taskTypesFor(last)[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (phase.kind !== "running") return;
    const id = setInterval(() => setTick((t) => t + 1), 500);
    const onVisible = () => setTick((t) => t + 1);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [phase.kind]);

  function update(next: TimerState | null) {
    setTimer(next);
    persistTimer(localStorage, next);
  }

  function handleStart() {
    localStorage.setItem(LAST_INSTRUMENT_KEY, instrument);
    update(startTimer(instrument, taskType, Date.now()));
    setPhase({ kind: "running" });
  }

  function handleFinish() {
    if (!timer) return;
    const minutes = finishedMinutes(timer, Date.now());
    update(pauseTimer(timer, Date.now()));
    setPhase({ kind: "reflect", minutes });
  }

  async function handleSave(minutes: number) {
    setBusy(true);
    const row = buildSession({
      userId,
      sessionDate: new Date(),
      durationMinutes: minutes,
      taskType,
      instrumentType: instrument,
      notes,
    });
    const saved = await saveSessionOrQueue(createClient(), localStorage, row);
    update(null);
    setNotes("");
    setBusy(false);
    setPhase({ kind: "saved", minutes, queued: !saved });
    router.refresh();
  }

  if (phase.kind === "saved") {
    return (
      <main className="flex flex-col items-center px-6 pt-14 text-center">
        <Image
          src="/mewstro/mascot-celebrating.png"
          alt="Mewstro celebrating"
          width={130}
          height={130}
          priority
        />
        <h1 className="mt-5 text-2xl font-bold">
          {formatMinutes(phase.minutes)} in the books!
        </h1>
        <p className="mt-2 text-sm text-mewstro-dim">
          {phase.queued
            ? "We'll save this when you're back online."
            : "Lovely work. Mewstro takes a bow."}
        </p>
        <button
          type="button"
          onClick={() => router.push("/practice")}
          className={`mt-8 ${primaryButtonClass}`}
        >
          Done
        </button>
        <button
          type="button"
          onClick={() => setPhase({ kind: "setup" })}
          className="mt-3 py-2 text-sm font-semibold text-mewstro-dim"
        >
          Start another session
        </button>
      </main>
    );
  }

  if (phase.kind === "reflect") {
    return (
      <main className="flex flex-col px-6 pt-14">
        <h1 className="text-center text-2xl font-bold">
          {formatMinutes(phase.minutes)} of {taskType}
        </h1>
        <p className="mt-2 text-center text-sm text-mewstro-dim">
          Anything worth remembering for next time?
        </p>
        <textarea
          rows={4}
          placeholder="Notes (optional)"
          className={`mt-6 ${inputClass}`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => handleSave(phase.minutes)}
          className={`mt-6 ${primaryButtonClass}`}
        >
          Save session
        </button>
      </main>
    );
  }

  if (phase.kind === "running" && timer) {
    const paused = timer.startedAt === null;
    return (
      <main className="flex flex-col items-center px-6 pt-12 text-center">
        <p className="text-sm font-semibold text-mewstro-dim">
          {INSTRUMENTS.find((i) => i.key === instrument)?.name} · {taskType}
        </p>
        <Image
          src="/mewstro/mascot-conducting.png"
          alt="Mewstro conducting"
          width={110}
          height={110}
          className="mt-6"
          priority
        />
        <div
          className="mt-8 font-mono text-6xl font-bold tabular-nums"
          aria-live="polite"
        >
          {formatElapsed(elapsedMs(timer, Date.now()) / 1000)}
        </div>
        {paused && (
          <p className="mt-2 text-sm font-semibold text-mewstro-secondary">
            Paused
          </p>
        )}
        <div className="mt-10 flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={() =>
              update(
                paused
                  ? resumeTimer(timer, Date.now())
                  : pauseTimer(timer, Date.now()),
              )
            }
            className={secondaryButtonClass}
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            type="button"
            onClick={handleFinish}
            className={primaryButtonClass}
          >
            Finish
          </button>
        </div>
      </main>
    );
  }

  // Setup phase
  return (
    <main className="flex flex-col px-6 pt-10">
      <h1 className="text-2xl font-bold">Practice timer</h1>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-mewstro-dim">
        Instrument
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {INSTRUMENTS.map((i) => (
          <button
            key={i.key}
            type="button"
            onClick={() => {
              setInstrument(i.key);
              setTaskType(taskTypesFor(i.key)[0]);
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              instrument === i.key
                ? "bg-mewstro-primary text-white"
                : "border border-[#E8DFD3] bg-mewstro-surface text-mewstro-text"
            }`}
          >
            {i.name}
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-mewstro-dim">
        What are you working on?
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {taskTypesFor(instrument).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTaskType(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              taskType === t
                ? "bg-mewstro-primary text-white"
                : "border border-[#E8DFD3] bg-mewstro-surface text-mewstro-text"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleStart}
        className={`mt-8 ${primaryButtonClass}`}
      >
        Start practising
      </button>

      <button
        type="button"
        onClick={() => setShowManualEntry((v) => !v)}
        className="mt-6 py-2 text-sm font-semibold text-mewstro-dim"
      >
        {showManualEntry ? "Hide manual entry" : "Practised already? Log a past session"}
      </button>

      {showManualEntry && (
        <ManualEntryForm
          userId={userId}
          onSaved={(minutes, queued) =>
            setPhase({ kind: "saved", minutes, queued })
          }
        />
      )}
    </main>
  );
}
