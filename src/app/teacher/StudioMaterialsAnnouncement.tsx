"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const DISMISS_KEY = "mewstro:dismissed:studio-materials-announcement";

/**
 * Dismissible "what's new" banner on the teacher dashboard pointing teachers
 * at the new Studio Materials feature. Dismissal is remembered per-browser in
 * localStorage (no backend needed for the pilot). Renders nothing until the
 * client has checked localStorage, to avoid a hydration flash.
 */
export function StudioMaterialsAnnouncement() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) !== "1") setShow(true);
    } catch {
      // localStorage unavailable (private mode etc.) — just show it.
      setShow(true);
    }
  }, []);

  if (!show) return null;

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    setShow(false);
  }

  return (
    <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#2D8B7E]/30 bg-[#2D8B7E]/10 px-4 py-3">
      <span className="text-base leading-none" aria-hidden>
        ✨
      </span>
      <p className="flex-1 text-sm text-[#1A1A2E]">
        <span className="font-semibold">New: Studio Materials</span> — share
        links, videos &amp; PDFs with your students. They&apos;ll see them in the
        practice portal now — and in the app with the next update.{" "}
        <Link
          href="/teacher/materials"
          className="font-semibold text-[#2D8B7E] underline underline-offset-2 hover:text-[#246F64]"
        >
          Check it out →
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="shrink-0 rounded-md px-2 py-1 text-sm text-[#6B7280] hover:bg-[#2D8B7E]/10 hover:text-[#1A1A2E] transition-colors"
      >
        ✕
      </button>
    </div>
  );
}
