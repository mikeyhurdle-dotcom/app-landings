// Tealium iQ client-side helpers for the app-landings site.
//
// Setup: see Docs in this repo. Account/profile published in Tealium iQ;
// env vars NEXT_PUBLIC_TEALIUM_ACCOUNT / _PROFILE / _ENVIRONMENT select which
// utag.js gets loaded by TealiumScript.
//
// The GA4 tag template in TiQ maps UDO variables (brand, page_type,
// event_name, utm_*, studio_size_tier, …) onto GA4 event params, so new
// events can be added here without a code change in most cases.

export type Brand = "mewstro" | "bouldy" | "purrouette" | "spindl" | "teacher" | "root";

export type PageType =
  | "landing"
  | "apply"
  | "story"
  | "pricing"
  | "privacy"
  | "support"
  | "dashboard"
  | "login"
  | "other";

export interface UtagData {
  brand?: Brand;
  page_type?: PageType;
  event_name?: string;
  tealium_event?: string;
  [key: string]: unknown;
}

// Canonical teacher-pipeline events. Mark the *_succeeded ones as GA4 key events.
export type TeacherEvent =
  | "teacher_landing_viewed"
  | "teacher_apply_started"
  | "teacher_apply_submitted"
  | "teacher_apply_succeeded"
  | "teacher_apply_failed"
  | "teacher_login_attempted"
  | "teacher_login_succeeded"
  | "teacher_dashboard_viewed";

export type BrandEvent =
  | "cta_clicked"
  | "app_store_clicked"
  | "faq_expanded"
  | "pricing_viewed";

export type TrackedEvent = TeacherEvent | BrandEvent | (string & {});

interface Utag {
  view: (data: UtagData) => void;
  link: (data: UtagData) => void;
}

// ---------- Consent ----------
// GDPR / UK PECR compliant: non-essential tracking requires explicit opt-in.
// Default is "pending" (equivalent to denied for gating purposes) until the
// ConsentBanner captures a decision. Marketing/analytics tag fires are gated
// by both this helper AND by TiQ load-rules reading utag_data.consent_status.

const CONSENT_KEY = "tealium_consent";

export type ConsentStatus = "granted" | "denied" | "pending";

export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return "pending";
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    if (v === "granted") return "granted";
    if (v === "denied") return "denied";
    return "pending";
  } catch {
    return "pending";
  }
}

export function hasConsentDecision(): boolean {
  const s = getConsentStatus();
  return s === "granted" || s === "denied";
}

function readConsent(): boolean {
  return getConsentStatus() === "granted";
}

export function setTealiumConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch {
    // ignore
  }
  // Expose consent state to utag_data so TiQ load-rules can gate tags without
  // a round-trip. Marketing tags should be configured to only fire when
  // utag_data.consent_status === "granted".
  try {
    const w = window as unknown as { utag_data?: Record<string, unknown> };
    if (!w.utag_data) w.utag_data = {};
    w.utag_data.consent_status = granted ? "granted" : "denied";
  } catch {
    // ignore
  }
  if (granted) {
    flushQueue();
  } else {
    // User denied — discard anything queued during the pending window.
    queue.length = 0;
  }
}

// ---------- Pre-load queue ----------
// utag.js loads afterInteractive, so calls made during early hydration get
// queued and flushed once window.utag is available.

type QueuedCall = { type: "view" | "link"; data: UtagData };
const queue: QueuedCall[] = [];
let flushTimer: ReturnType<typeof setInterval> | null = null;
let flushDeadline: ReturnType<typeof setTimeout> | null = null;

function getUtag(): Utag | undefined {
  if (typeof window === "undefined") return undefined;
  const u = (window as unknown as { utag?: Partial<Utag> }).utag;
  if (!u || typeof u.view !== "function" || typeof u.link !== "function") {
    return undefined;
  }
  return u as Utag;
}

function flushQueue(): void {
  if (!readConsent()) return;
  const u = getUtag();
  if (!u) return;
  while (queue.length) {
    const call = queue.shift();
    if (!call) break;
    try {
      if (call.type === "view") u.view(call.data);
      else u.link(call.data);
    } catch (err) {
      // Analytics must never break the page.
      // eslint-disable-next-line no-console
      console.warn("[tealium] dispatch failed", err);
    }
  }
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
  if (flushDeadline) {
    clearTimeout(flushDeadline);
    flushDeadline = null;
  }
}

function enqueue(call: QueuedCall): void {
  if (typeof window === "undefined") return;
  if (!readConsent()) return;
  queue.push(call);
  if (getUtag()) {
    flushQueue();
    return;
  }
  if (flushTimer) return;
  flushTimer = setInterval(flushQueue, 100);
  // Stop polling after 10s so we don't leak if utag.js never loads
  // (network block, ad blocker, consent not granted upstream, etc.).
  flushDeadline = setTimeout(() => {
    if (flushTimer) {
      clearInterval(flushTimer);
      flushTimer = null;
    }
    queue.length = 0;
  }, 10_000);
}

// ---------- Public API ----------

export function trackView(data: UtagData = {}): void {
  enqueue({ type: "view", data });
}

export function trackLink(
  eventName: TrackedEvent,
  data: UtagData = {},
): void {
  enqueue({
    type: "link",
    data: { ...data, event_name: eventName, tealium_event: eventName },
  });
}

// ---------- Pathname → data layer helpers ----------

const BRAND_SEGMENTS: readonly Brand[] = [
  "mewstro",
  "bouldy",
  "purrouette",
  "spindl",
  "teacher",
];

export function brandFromPathname(pathname: string): Brand {
  const seg = pathname.split("/").filter(Boolean)[0];
  return (BRAND_SEGMENTS as readonly string[]).includes(seg)
    ? (seg as Brand)
    : "root";
}

export function pageTypeFromPathname(pathname: string): PageType {
  if (pathname === "/") return "landing";
  if (pathname.endsWith("/apply") || pathname.endsWith("/teachers/apply")) {
    return "apply";
  }
  if (pathname.endsWith("/story")) return "story";
  if (pathname.endsWith("/privacy")) return "privacy";
  if (pathname.endsWith("/support")) return "support";
  if (pathname === "/teacher/login") return "login";
  if (pathname.startsWith("/teacher")) return "dashboard";
  return "other";
}

// ---------- Small value helpers for GA4 dimensions ----------

export function studioSizeTier(count: number | undefined): string | undefined {
  if (typeof count !== "number" || !Number.isFinite(count)) return undefined;
  if (count <= 10) return "0-10";
  if (count <= 25) return "11-25";
  if (count <= 50) return "26-50";
  return "51+";
}
