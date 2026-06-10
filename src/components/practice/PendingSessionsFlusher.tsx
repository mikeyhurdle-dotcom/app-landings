"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/practice/supabase/client";
import { flushPendingSessions, insertSession } from "@/lib/practice/sessions";

/**
 * Retries queued practice sessions on load and whenever the tab comes
 * back to life (`online` / `visibilitychange`) — the "never lose a
 * logged practice" guarantee.
 */
export function PendingSessionsFlusher() {
  useEffect(() => {
    let busy = false;

    async function flush() {
      if (busy) return;
      busy = true;
      try {
        const supabase = createClient();
        await flushPendingSessions(localStorage, (row) =>
          insertSession(supabase, row),
        );
      } finally {
        busy = false;
      }
    }

    flush();

    const onVisible = () => {
      if (document.visibilityState === "visible") flush();
    };
    window.addEventListener("online", flush);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("online", flush);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return null;
}
