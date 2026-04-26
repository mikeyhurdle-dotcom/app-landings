// First-touch UTM + referrer capture.
//
// Problem: URL-only UTM reading loses attribution if a visitor arrives via
// utm_source=google&utm_medium=cpc, browses a few pages, then applies.
// By the time they hit the form, window.location.search is clean.
//
// Solution: when a page loads WITH utm params, persist them in a first-party
// cookie. On every subsequent read (including the form submit), read the
// cookie first, fall back to URL. Never overwrite — first-touch wins.

const COOKIE_NAME = "mewstro_first_touch";
const TTL_DAYS = 90;

export interface FirstTouchUtm {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  first_landing_page?: string;
  first_landing_at?: string;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const prefix = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";");
  for (const raw of parts) {
    const part = raw.trim();
    if (part.startsWith(prefix)) {
      return decodeURIComponent(part.slice(prefix.length));
    }
  }
  return null;
}

function writeCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}; ${expires}; path=/; SameSite=Lax`;
}

export function getFirstTouchUtm(): FirstTouchUtm | null {
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FirstTouchUtm;
  } catch {
    return null;
  }
}

// Call on every page mount. If any utm_* param is present in the URL AND
// there's no existing cookie, snapshot first-touch. Otherwise no-op.
export function captureFirstTouchUtm(): void {
  if (typeof window === "undefined") return;
  if (getFirstTouchUtm()) return; // never overwrite

  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get("utm_source") ?? "";
  const utm_medium = params.get("utm_medium") ?? "";
  const utm_campaign = params.get("utm_campaign") ?? "";
  const utm_content = params.get("utm_content") ?? "";
  const utm_term = params.get("utm_term") ?? "";

  // Don't set a cookie for visitors with no UTM signal — we'd just be
  // persisting a blank referrer. Only snapshot when at least one utm_* is set
  // OR the referrer is a meaningful external source.
  const hasUtm = Boolean(
    utm_source || utm_medium || utm_campaign || utm_content || utm_term,
  );
  const referrer =
    typeof document !== "undefined" ? document.referrer || "" : "";
  const externalReferrer =
    referrer &&
    (() => {
      try {
        return new URL(referrer).host !== window.location.host;
      } catch {
        return false;
      }
    })();

  if (!hasUtm && !externalReferrer) return;

  const snapshot: FirstTouchUtm = {
    utm_source: utm_source || undefined,
    utm_medium: utm_medium || undefined,
    utm_campaign: utm_campaign || undefined,
    utm_content: utm_content || undefined,
    utm_term: utm_term || undefined,
    referrer: referrer || undefined,
    first_landing_page: window.location.pathname,
    first_landing_at: new Date().toISOString(),
  };

  writeCookie(COOKIE_NAME, JSON.stringify(snapshot), TTL_DAYS);
}

// Merge helper: prefer current URL utm_* (most recent intent), fall back to
// first-touch cookie for anything missing. Referrer + first_landing_* always
// come from cookie (URL has no equivalent).
export function resolveAttribution(current: {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}): FirstTouchUtm {
  const first = getFirstTouchUtm() ?? {};
  return {
    utm_source: current.utm_source || first.utm_source,
    utm_medium: current.utm_medium || first.utm_medium,
    utm_campaign: current.utm_campaign || first.utm_campaign,
    utm_content: current.utm_content || first.utm_content,
    utm_term: current.utm_term || first.utm_term,
    referrer: first.referrer,
    first_landing_page: first.first_landing_page,
    first_landing_at: first.first_landing_at,
  };
}
