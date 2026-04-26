"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  brandFromPathname,
  getConsentStatus,
  hasConsentDecision,
  setTealiumConsent,
  trackLink,
} from "@/lib/tealium";

// GDPR / UK PECR compliant consent banner.
//
// Shows on first visit if no decision has been made. Hides once the user
// clicks Accept or Reject. Can be re-opened by adding `?cookies=1` to any
// URL (linked from Privacy page "Cookie preferences").

const DECISION_EVENT = "mewstro:open-cookie-preferences";

export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(DECISION_EVENT));
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid SSR/hydration mismatch — localStorage is client-only.
  useEffect(() => {
    setMounted(true);
    if (!hasConsentDecision()) {
      setVisible(true);
    }
    // ?cookies=1 query param re-opens the banner
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("cookies") === "1") setVisible(true);
    } catch {
      // ignore
    }
    const onOpen = () => setVisible(true);
    window.addEventListener(DECISION_EVENT, onOpen);
    return () => window.removeEventListener(DECISION_EVENT, onOpen);
  }, []);

  const decide = (granted: boolean) => {
    setTealiumConsent(granted);
    trackLink("consent_decision", {
      consent_status: granted ? "granted" : "denied",
      brand:
        typeof window !== "undefined"
          ? brandFromPathname(window.location.pathname)
          : "root",
    });
    setVisible(false);
  };

  // Avoid flashing banner during hydration; wait for mount.
  if (!mounted || !visible) return null;

  // Don't tie to any one brand's palette — this renders across the whole site.
  const statusAtMount = getConsentStatus();
  const isChangingDecision = statusAtMount !== "pending";

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-[#E8DFD3] bg-white p-5 shadow-2xl md:inset-x-auto md:left-1/2 md:-translate-x-1/2"
    >
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-sm font-semibold text-[#1A1A2E]">
            {isChangingDecision
              ? "Update your cookie preferences"
              : "Cookies on this site"}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#5A4E42]">
            We use a small number of cookies to understand how the site is
            used and to help us improve it. Nothing is shared with
            advertisers. You can change your mind any time from the footer.{" "}
            <Link
              href="/mewstro/privacy"
              className="font-semibold text-[#1A1A2E] underline decoration-dotted underline-offset-2 hover:text-black"
            >
              Privacy policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => decide(false)}
            className="rounded-full border border-[#E8DFD3] bg-white px-5 py-2.5 text-sm font-semibold text-[#1A1A2E] transition-colors hover:bg-[#FAF6EF]"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="rounded-full bg-[#1A1A2E] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
