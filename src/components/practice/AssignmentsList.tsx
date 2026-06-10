"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/practice/supabase/client";
import {
  type Assignment,
  markAssignmentComplete,
} from "@/lib/practice/assignments";

/**
 * Active assignments with mark-complete. Completion calls the same RPC
 * as iOS (`mewstro_mark_assignment_complete`) and the row leaves the
 * list immediately — the server filters completed assignments out of
 * every later fetch, matching the iOS reconcile behaviour.
 */
export function AssignmentsList({
  initialAssignments,
}: {
  initialAssignments: Assignment[];
}) {
  const router = useRouter();
  const [assignments, setAssignments] = useState(initialAssignments);
  const [completedTitle, setCompletedTitle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function complete(assignment: Assignment) {
    setBusyId(assignment.id);
    setError(null);

    try {
      await markAssignmentComplete(createClient(), assignment.id);
      setAssignments((list) => list.filter((a) => a.id !== assignment.id));
      setCompletedTitle(assignment.title);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
    setBusyId(null);
  }

  if (assignments.length === 0) {
    return (
      <div className="mt-10 text-center">
        {completedTitle ? (
          <>
            <p className="text-4xl">🎉</p>
            <p className="mt-3 text-base font-semibold">All done!</p>
            <p className="mt-1 text-sm text-mewstro-dim">
              Every assignment finished. Your teacher will be delighted.
            </p>
          </>
        ) : (
          <>
            <p className="text-base font-semibold">Nothing assigned right now</p>
            <p className="mt-1 text-sm text-mewstro-dim">
              When your teacher sets something new, it&apos;ll appear here.
              Until then, the stage is yours.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6">
      {completedTitle && (
        <p
          className="mb-4 rounded-xl bg-mewstro-primary/10 px-4 py-3 text-sm font-semibold"
          role="status"
        >
          &ldquo;{completedTitle}&rdquo; done — nice work! 🎵
        </p>
      )}
      {error && (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <ul className="flex flex-col gap-3">
        {assignments.map((a) => (
          <li
            key={a.id}
            className="rounded-2xl border border-[#E8DFD3] bg-mewstro-surface p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold">{a.title}</p>
                {a.description && (
                  <p className="mt-1 whitespace-pre-line text-sm text-mewstro-dim">
                    {a.description}
                  </p>
                )}
                {a.due_date && (
                  <p className="mt-2 text-xs font-semibold text-mewstro-secondary">
                    Due{" "}
                    {new Date(`${a.due_date}T12:00:00`).toLocaleDateString(
                      undefined,
                      { weekday: "long", day: "numeric", month: "long" },
                    )}
                  </p>
                )}
              </div>
              <button
                type="button"
                disabled={busyId === a.id}
                onClick={() => complete(a)}
                className="shrink-0 rounded-full bg-mewstro-primary px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {busyId === a.id ? "Saving…" : "Mark done"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
