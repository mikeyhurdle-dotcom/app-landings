"use client";

import { useState } from "react";
import { createClient } from "@/lib/practice/supabase/client";
import type { Resource } from "@/lib/practice/resources";

const AUDIENCE_LABEL: Record<Resource["audience"], string> = {
  studio: "Studio",
  instrument: "Instrument",
  student: "For you",
};

const TYPE_ICON: Record<Resource["type"], React.ReactNode> = {
  link: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  embed: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  document: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
};

/**
 * Renders the list of studio resources for the signed-in student.
 * link/embed → open url in a new tab.
 * document → create a 5-minute signed URL via the browser Supabase client
 *             and open it in a new tab.
 */
export function MaterialsList({ resources }: { resources: Resource[] }) {
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function openDocument(resource: Resource) {
    if (!resource.storage_path) return;
    setBusyId(resource.id);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: storageError } = await supabase.storage
        .from("studio-resources")
        .createSignedUrl(resource.storage_path, 300);
      if (storageError || !data?.signedUrl) {
        throw new Error(storageError?.message ?? "Could not open document");
      }
      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
    setBusyId(null);
  }

  if (resources.length === 0) {
    return (
      <div className="mt-10 text-center">
        <p className="text-base font-semibold">No materials yet</p>
        <p className="mt-1 text-sm text-mewstro-dim">
          When your teacher shares links, videos, or documents they&apos;ll
          appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {error && (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <ul className="flex flex-col gap-3">
        {resources.map((r) => {
          const isDoc = r.type === "document";
          const isLinkable = !isDoc && r.url;
          const isBusy = busyId === r.id;

          const content = (
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-mewstro-primary">
                {TYPE_ICON[r.type]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{r.title}</p>
                {r.description && (
                  <p className="mt-1 whitespace-pre-line text-sm text-mewstro-dim">
                    {r.description}
                  </p>
                )}
                <p className="mt-2 text-xs font-semibold text-mewstro-secondary">
                  {AUDIENCE_LABEL[r.audience]}
                </p>
              </div>
              {isDoc && (
                <span className="shrink-0 self-center text-xs font-semibold text-mewstro-dim">
                  {isBusy ? "Opening…" : "PDF"}
                </span>
              )}
            </div>
          );

          if (isLinkable) {
            return (
              <li key={r.id}>
                <a
                  href={r.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-[#E8DFD3] bg-mewstro-surface p-4 transition-opacity active:opacity-70"
                >
                  {content}
                </a>
              </li>
            );
          }

          if (isDoc) {
            return (
              <li key={r.id}>
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => openDocument(r)}
                  className="w-full rounded-2xl border border-[#E8DFD3] bg-mewstro-surface p-4 text-left transition-opacity active:opacity-70 disabled:opacity-50"
                >
                  {content}
                </button>
              </li>
            );
          }

          // embed with no url (shouldn't happen; render as non-interactive card)
          return (
            <li
              key={r.id}
              className="rounded-2xl border border-[#E8DFD3] bg-mewstro-surface p-4"
            >
              {content}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
