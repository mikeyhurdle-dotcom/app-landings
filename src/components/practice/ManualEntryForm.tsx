"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/practice/supabase/client";
import { INSTRUMENTS, taskTypesFor } from "@/lib/practice/instruments";
import { buildSession, saveSessionOrQueue } from "@/lib/practice/sessions";
import type { RepertoirePiece } from "@/lib/practice/repertoire";
import { inputClass, primaryButtonClass } from "./AuthShell";

function todayLocalISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Log a past session: date, duration, instrument, notes. No future dates. */
export function ManualEntryForm({
  userId,
  pieces = [],
  onSaved,
}: {
  userId: string;
  pieces?: RepertoirePiece[];
  onSaved: (minutes: number, queued: boolean) => void;
}) {
  const router = useRouter();
  const [date, setDate] = useState(todayLocalISO());
  const [minutes, setMinutes] = useState("30");
  const [instrument, setInstrument] = useState("piano");
  const [taskType, setTaskType] = useState("Repertoire");
  const [repertoireId, setRepertoireId] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const instrumentPieces = pieces.filter(
    (p) => p.instrument_type === instrument,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const duration = parseInt(minutes, 10);
    if (!Number.isFinite(duration) || duration <= 0) {
      setError("Duration needs to be at least a minute.");
      return;
    }
    if (date > todayLocalISO()) {
      setError("That date hasn't happened yet — pick today or earlier.");
      return;
    }

    setBusy(true);
    // Anchor past sessions to local midday so the practice day never
    // shifts across a timezone boundary.
    const sessionDate = new Date(`${date}T12:00:00`);
    const row = buildSession({
      userId,
      sessionDate,
      durationMinutes: duration,
      taskType,
      instrumentType: instrument,
      notes,
      repertoireId:
        taskType === "Repertoire" && repertoireId ? repertoireId : null,
    });
    const saved = await saveSessionOrQueue(createClient(), localStorage, row);
    setBusy(false);
    router.refresh();
    onSaved(duration, !saved);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex flex-col gap-3 rounded-2xl border border-[#E8DFD3] bg-mewstro-surface p-4"
    >
      <label className="text-sm">
        <span className="font-semibold">Date</span>
        <input
          type="date"
          required
          max={todayLocalISO()}
          className={`mt-1 ${inputClass}`}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <label className="text-sm">
        <span className="font-semibold">Minutes practised</span>
        <input
          type="number"
          required
          min={1}
          max={600}
          inputMode="numeric"
          className={`mt-1 ${inputClass}`}
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
      </label>

      <label className="text-sm">
        <span className="font-semibold">Instrument</span>
        <select
          className={`mt-1 ${inputClass}`}
          value={instrument}
          onChange={(e) => {
            setInstrument(e.target.value);
            setTaskType(taskTypesFor(e.target.value)[0]);
            setRepertoireId("");
          }}
        >
          {INSTRUMENTS.map((i) => (
            <option key={i.key} value={i.key}>
              {i.name}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        <span className="font-semibold">What did you work on?</span>
        <select
          className={`mt-1 ${inputClass}`}
          value={taskType}
          onChange={(e) => {
            setTaskType(e.target.value);
            if (e.target.value !== "Repertoire") setRepertoireId("");
          }}
        >
          {taskTypesFor(instrument).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      {taskType === "Repertoire" && instrumentPieces.length > 0 && (
        <label className="text-sm">
          <span className="font-semibold">Which piece? (optional)</span>
          <select
            className={`mt-1 ${inputClass}`}
            value={repertoireId}
            onChange={(e) => setRepertoireId(e.target.value)}
          >
            <option value="">No specific piece</option>
            {instrumentPieces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="text-sm">
        <span className="font-semibold">Notes (optional)</span>
        <textarea
          rows={3}
          className={`mt-1 ${inputClass}`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={busy} className={primaryButtonClass}>
        Log session
      </button>
    </form>
  );
}
