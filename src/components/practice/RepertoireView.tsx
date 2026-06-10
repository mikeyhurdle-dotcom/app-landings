"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/practice/supabase/client";
import {
  REPERTOIRE_STATUSES,
  type RepertoirePiece,
  type SessionForTotals,
  addPiece,
  updatePiece,
  minutesByPiece,
  statusLabel,
} from "@/lib/practice/repertoire";
import { INSTRUMENTS, instrumentName } from "@/lib/practice/instruments";
import { formatMinutes } from "@/lib/practice/duration";
import { inputClass, primaryButtonClass } from "./AuthShell";

const STATUS_CHIP: Record<string, string> = {
  learning: "bg-mewstro-secondary/20 text-[#8a5a00]",
  polishing: "bg-mewstro-primary/15 text-mewstro-primary",
  mastered: "bg-mewstro-accent/15 text-mewstro-accent",
  archived: "bg-[#E8DFD3] text-mewstro-dim",
};

export function RepertoireView({
  userId,
  initialPieces,
  sessions,
}: {
  userId: string;
  initialPieces: RepertoirePiece[];
  sessions: SessionForTotals[];
}) {
  const [pieces, setPieces] = useState(initialPieces);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totals = useMemo(() => minutesByPiece(sessions), [sessions]);

  const active = pieces.filter((p) => p.status !== "archived");
  const archived = pieces.filter((p) => p.status === "archived");

  async function handleStatusChange(piece: RepertoirePiece, status: string) {
    setError(null);
    const prev = pieces;
    setPieces((list) =>
      list.map((p) => (p.id === piece.id ? { ...p, status } : p)),
    );
    try {
      await updatePiece(createClient(), piece.id, { status });
    } catch (e) {
      setPieces(prev);
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <main className="flex flex-col px-6 pt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Repertoire</h1>
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="rounded-full bg-mewstro-primary px-4 py-2 text-sm font-semibold text-white"
        >
          {showAdd ? "Close" : "Add piece"}
        </button>
      </div>
      <p className="mt-1 text-sm text-mewstro-dim">
        Every piece you&apos;re working on, and where your practice time goes.
      </p>

      {showAdd && (
        <AddPieceForm
          userId={userId}
          onAdded={(piece) => {
            setPieces((list) => [piece, ...list]);
            setShowAdd(false);
          }}
        />
      )}

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {active.length === 0 && !showAdd && (
        <div className="mt-12 text-center">
          <p className="text-base font-semibold">No pieces yet</p>
          <p className="mt-1 text-sm text-mewstro-dim">
            Add the piece you&apos;re working on and every timer session you
            log against it counts towards its total.
          </p>
        </div>
      )}

      <ul className="mt-6 flex flex-col gap-3">
        {active.map((piece) => (
          <PieceCard
            key={piece.id}
            piece={piece}
            minutes={totals.get(piece.id) ?? 0}
            editing={editingId === piece.id}
            onToggleEdit={() =>
              setEditingId(editingId === piece.id ? null : piece.id)
            }
            onStatusChange={(s) => handleStatusChange(piece, s)}
          />
        ))}
      </ul>

      {archived.length > 0 && (
        <details className="mt-8">
          <summary className="cursor-pointer text-sm font-semibold text-mewstro-dim">
            Archived ({archived.length})
          </summary>
          <ul className="mt-3 flex flex-col gap-3">
            {archived.map((piece) => (
              <PieceCard
                key={piece.id}
                piece={piece}
                minutes={totals.get(piece.id) ?? 0}
                editing={editingId === piece.id}
                onToggleEdit={() =>
                  setEditingId(editingId === piece.id ? null : piece.id)
                }
                onStatusChange={(s) => handleStatusChange(piece, s)}
              />
            ))}
          </ul>
        </details>
      )}
    </main>
  );
}

function PieceCard({
  piece,
  minutes,
  editing,
  onToggleEdit,
  onStatusChange,
}: {
  piece: RepertoirePiece;
  minutes: number;
  editing: boolean;
  onToggleEdit: () => void;
  onStatusChange: (status: string) => void;
}) {
  return (
    <li className="rounded-2xl border border-[#E8DFD3] bg-mewstro-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{piece.title}</p>
          {piece.artist && (
            <p className="truncate text-xs text-mewstro-dim">{piece.artist}</p>
          )}
          <p className="mt-2 text-xs text-mewstro-dim">
            {instrumentName(piece.instrument_type)} ·{" "}
            <span className="font-semibold text-mewstro-text">
              {formatMinutes(minutes)}
            </span>{" "}
            practised
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleEdit}
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            STATUS_CHIP[piece.status] ?? STATUS_CHIP.learning
          }`}
        >
          {statusLabel(piece.status)}
        </button>
      </div>

      {editing && (
        <div className="mt-3 flex flex-wrap gap-2">
          {REPERTOIRE_STATUSES.map((s) => (
            <button
              key={s.key}
              type="button"
              disabled={s.key === piece.status}
              onClick={() => {
                onStatusChange(s.key);
                onToggleEdit();
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                s.key === piece.status
                  ? "bg-mewstro-primary text-white"
                  : "border border-[#E8DFD3] bg-mewstro-surface"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </li>
  );
}

function AddPieceForm({
  userId,
  onAdded,
}: {
  userId: string;
  onAdded: (piece: RepertoirePiece) => void;
}) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [instrument, setInstrument] = useState("piano");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    setError(null);

    try {
      const piece = await addPiece(createClient(), {
        userId,
        title,
        artist,
        instrumentType: instrument,
      });
      onAdded(piece);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
    setBusy(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col gap-3 rounded-2xl border border-[#E8DFD3] bg-mewstro-surface p-4"
    >
      <input
        type="text"
        required
        placeholder="Piece title"
        className={inputClass}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Composer / artist (optional)"
        className={inputClass}
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <select
        className={inputClass}
        value={instrument}
        onChange={(e) => setInstrument(e.target.value)}
      >
        {INSTRUMENTS.map((i) => (
          <option key={i.key} value={i.key}>
            {i.name}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || !title.trim()}
        className={primaryButtonClass}
      >
        Add to repertoire
      </button>
    </form>
  );
}
