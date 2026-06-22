"use client";

import { useState } from "react";
import type { RepertoireRow } from "@/lib/teacher-queries";
import {
  updateRepertoirePieceAction,
  deleteRepertoirePieceAction,
  addRepertoirePieceAction,
} from "./repertoire-actions";

const STATUS_OPTIONS = ["learning", "polishing", "mastered", "archived"] as const;
type Status = (typeof STATUS_OPTIONS)[number];

const STATUS_STYLES: Record<Status, string> = {
  learning: "bg-blue-50 text-blue-700 border-blue-200",
  polishing: "bg-[#2D8B7E]/10 text-[#2D8B7E] border-[#2D8B7E]/30",
  mastered: "bg-green-50 text-green-700 border-green-200",
  archived: "bg-gray-50 text-gray-600 border-gray-200",
};

function formatMinutes(mins: number): string {
  if (mins === 0) return "0m";
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

// ─── Inline edit row ─────────────────────────────────────────────────────

function PieceRow({
  piece,
  studentId,
}: {
  piece: RepertoireRow;
  studentId: string;
}) {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);

  // Editable local state mirrors the piece fields the teacher can change.
  const [title, setTitle] = useState(piece.title);
  const [artist, setArtist] = useState(piece.artist ?? "");
  const [status, setStatus] = useState<Status>(piece.status as Status);
  const [targetBpm, setTargetBpm] = useState(
    piece.targetBpm !== null ? String(piece.targetBpm) : "",
  );
  const [targetCompletionDate, setTargetCompletionDate] = useState(
    piece.targetCompletionDate ?? "",
  );
  const [instrumentType, setInstrumentType] = useState(piece.instrumentType);

  async function handleSave(formData: FormData) {
    setBusy(true);
    await updateRepertoirePieceAction(formData);
    setBusy(false);
    setEditing(false);
  }

  async function handleDelete(formData: FormData) {
    if (
      !window.confirm(
        `Delete "${piece.title}" from this student's repertoire? This cannot be undone.`,
      )
    )
      return;
    setBusy(true);
    await deleteRepertoirePieceAction(formData);
    // Page will revalidate; no need to set busy=false (component unmounts)
  }

  if (editing) {
    return (
      <div className="rounded-xl border border-[#2D8B7E]/40 bg-[#F7FDFC] p-4">
        <form action={handleSave} className="space-y-3">
          <input type="hidden" name="pieceId" value={piece.id} />
          <input type="hidden" name="studentId" value={studentId} />

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#6B7280]">
                Title
              </label>
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-[#E8DFD3] bg-white px-3 py-2 text-sm text-[#1A1A2E] focus:border-[#2D8B7E] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#6B7280]">
                Artist / composer
              </label>
              <input
                name="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD3] bg-white px-3 py-2 text-sm text-[#1A1A2E] focus:border-[#2D8B7E] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#6B7280]">
                Status
              </label>
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full rounded-lg border border-[#E8DFD3] bg-white px-3 py-2 text-sm text-[#1A1A2E] focus:border-[#2D8B7E] focus:outline-none"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#6B7280]">
                Target BPM
              </label>
              <input
                name="targetBpm"
                type="number"
                min={1}
                max={300}
                value={targetBpm}
                onChange={(e) => setTargetBpm(e.target.value)}
                placeholder="e.g. 120"
                className="w-full rounded-lg border border-[#E8DFD3] bg-white px-3 py-2 text-sm text-[#1A1A2E] focus:border-[#2D8B7E] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#6B7280]">
                Target date
              </label>
              <input
                name="targetCompletionDate"
                type="date"
                value={targetCompletionDate}
                onChange={(e) => setTargetCompletionDate(e.target.value)}
                className="w-full rounded-lg border border-[#E8DFD3] bg-white px-3 py-2 text-sm text-[#1A1A2E] focus:border-[#2D8B7E] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#6B7280]">
              Instrument
            </label>
            <input
              name="instrumentType"
              value={instrumentType}
              onChange={(e) => setInstrumentType(e.target.value)}
              className="w-full rounded-lg border border-[#E8DFD3] bg-white px-3 py-2 text-sm text-[#1A1A2E] focus:border-[#2D8B7E] focus:outline-none"
            />
          </div>

          {/* Read-only derived fields */}
          <div className="flex gap-4 text-xs text-[#6B7280]">
            <span>
              Total practice:{" "}
              <span className="font-medium text-[#1A1A2E]">
                {formatMinutes(piece.totalPracticeMinutes)}
              </span>
            </span>
            {piece.currentBpm !== null && (
              <span>
                Current BPM:{" "}
                <span className="font-medium text-[#1A1A2E]">
                  {piece.currentBpm}
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => setEditing(false)}
              disabled={busy}
              className="text-sm text-[#6B7280] hover:text-[#1A1A2E] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-[#2D8B7E] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#246F64] disabled:opacity-50"
            >
              {busy ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Read-only display with edit / delete controls
  return (
    <div className="rounded-xl border border-[#E8DFD3] bg-[#FFFBF7] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#1A1A2E] truncate">{piece.title}</p>
          {piece.artist && (
            <p className="text-sm text-[#6B7280] truncate">{piece.artist}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${
              STATUS_STYLES[piece.status as Status] ?? STATUS_STYLES.archived
            }`}
          >
            {piece.status}
          </span>
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg border border-[#E8DFD3] bg-white px-2.5 py-1 text-xs font-medium text-[#2D8B7E] hover:bg-[#2D8B7E]/5 transition-colors"
          >
            Edit
          </button>
          <form action={handleDelete}>
            <input type="hidden" name="pieceId" value={piece.id} />
            <input type="hidden" name="studentId" value={studentId} />
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-[#6B7280]">
        <span>{formatMinutes(piece.totalPracticeMinutes)} total</span>
        {piece.targetBpm && piece.currentBpm ? (
          <span>
            {piece.currentBpm}
            {" / "}
            <span className="text-[#2D8B7E] font-medium">{piece.targetBpm}</span>{" "}
            bpm
          </span>
        ) : null}
      </div>
    </div>
  );
}

// ─── Add piece form ───────────────────────────────────────────────────────

function AddPieceForm({ studentId }: { studentId: string }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleAdd(formData: FormData) {
    setBusy(true);
    await addRepertoirePieceAction(formData);
    setBusy(false);
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[#2D8B7E]/50 px-3 py-2 text-sm font-medium text-[#2D8B7E] hover:bg-[#2D8B7E]/5 transition-colors w-full justify-center"
      >
        <span className="text-base leading-none">+</span> Add a piece
      </button>
    );
  }

  return (
    <div className="mt-3 rounded-xl border border-dashed border-[#2D8B7E]/50 bg-[#F7FDFC] p-4">
      <p className="mb-3 text-sm font-semibold text-[#1A1A2E]">Add a new piece</p>
      <form action={handleAdd} className="space-y-3">
        <input type="hidden" name="studentId" value={studentId} />

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#6B7280]">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              required
              placeholder="e.g. Clair de Lune"
              className="w-full rounded-lg border border-[#E8DFD3] bg-white px-3 py-2 text-sm text-[#1A1A2E] focus:border-[#2D8B7E] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#6B7280]">
              Artist / composer
            </label>
            <input
              name="artist"
              placeholder="e.g. Debussy"
              className="w-full rounded-lg border border-[#E8DFD3] bg-white px-3 py-2 text-sm text-[#1A1A2E] focus:border-[#2D8B7E] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#6B7280]">
              Status
            </label>
            <select
              name="status"
              defaultValue="learning"
              className="w-full rounded-lg border border-[#E8DFD3] bg-white px-3 py-2 text-sm text-[#1A1A2E] focus:border-[#2D8B7E] focus:outline-none"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#6B7280]">
              Target BPM
            </label>
            <input
              name="targetBpm"
              type="number"
              min={1}
              max={300}
              placeholder="e.g. 120"
              className="w-full rounded-lg border border-[#E8DFD3] bg-white px-3 py-2 text-sm text-[#1A1A2E] focus:border-[#2D8B7E] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#6B7280]">
              Target date
            </label>
            <input
              name="targetCompletionDate"
              type="date"
              className="w-full rounded-lg border border-[#E8DFD3] bg-white px-3 py-2 text-sm text-[#1A1A2E] focus:border-[#2D8B7E] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#6B7280]">
            Instrument
          </label>
          <input
            name="instrumentType"
            defaultValue="piano"
            placeholder="e.g. piano, violin"
            className="w-full rounded-lg border border-[#E8DFD3] bg-white px-3 py-2 text-sm text-[#1A1A2E] focus:border-[#2D8B7E] focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={busy}
            className="text-sm text-[#6B7280] hover:text-[#1A1A2E] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-[#2D8B7E] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#246F64] disabled:opacity-50"
          >
            {busy ? "Adding…" : "Add piece"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Main editor export ───────────────────────────────────────────────────

export default function RepertoireEditor({
  studentId,
  repertoire,
}: {
  studentId: string;
  repertoire: RepertoireRow[];
}) {
  return (
    <div>
      {repertoire.length === 0 ? (
        <p className="text-sm text-[#6B7280]">
          No pieces yet. Add one below or the student will see it once they add
          from the Repertoire tab in the app.
        </p>
      ) : (
        <div className="space-y-3">
          {repertoire.map((r) => (
            <PieceRow key={r.id} piece={r} studentId={studentId} />
          ))}
        </div>
      )}
      <AddPieceForm studentId={studentId} />
    </div>
  );
}
