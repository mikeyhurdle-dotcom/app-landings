"use client";

import { useEffect } from "react";
import { getConsentStatus } from "@/lib/tealium";

const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

// Microsoft Clarity — heatmaps + session replay. Free, no sampling caps.
// Gated on the same consent flag as Tealium-fired analytics so behaviour
// stays consistent for the visitor: Accept = full tracking, Reject = none.
//
// Loaded client-side after consent is granted (either already-stored or
// captured live via the ConsentBanner), so we don't ship the script for
// non-consenting visitors.

declare global {
  interface Window {
    clarity?: {
      (...args: unknown[]): void;
      q?: unknown[];
    };
  }
}

function injectClarity(projectId: string): void {
  if (typeof window === "undefined") return;
  if (window.clarity) return; // already loaded
  // Standard Clarity install snippet, ported to a function so we can call
  // it after consent rather than on first paint.
  const c = window as Window & {
    clarity?: { (...args: unknown[]): void; q?: unknown[] };
  };
  const queue: unknown[] = [];
  const stub = function (...args: unknown[]) {
    queue.push(args);
  } as { (...args: unknown[]): void; q?: unknown[] };
  stub.q = queue;
  c.clarity = stub;
  const t = document.createElement("script");
  t.async = true;
  t.src = `https://www.clarity.ms/tag/${projectId}`;
  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(t, first);
}

export function ClarityScript() {
  useEffect(() => {
    if (!PROJECT_ID) return;
    if (getConsentStatus() === "granted") {
      injectClarity(PROJECT_ID);
      return;
    }
    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<{ granted: boolean }>).detail;
      if (detail?.granted) injectClarity(PROJECT_ID);
    };
    window.addEventListener("tealium:consent-changed", onConsent);
    return () => {
      window.removeEventListener("tealium:consent-changed", onConsent);
    };
  }, []);
  return null;
}
