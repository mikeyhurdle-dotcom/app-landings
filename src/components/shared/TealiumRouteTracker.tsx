"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  brandFromPathname,
  pageTypeFromPathname,
  trackView,
} from "@/lib/tealium";
import { captureFirstTouchUtm } from "@/lib/utm";

function TealiumRouteTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // utag.js auto-fires on first load from the seeded utag_data; skip that one
  // so GA4 doesn't double-count the initial page view.
  const hasHandledInitial = useRef(false);

  useEffect(() => {
    // First-touch UTM cookie: snapshot on every route (including initial)
    // so that attribution survives multi-page browse before conversion.
    captureFirstTouchUtm();

    if (!hasHandledInitial.current) {
      hasHandledInitial.current = true;
      return;
    }
    if (!pathname) return;
    trackView({
      brand: brandFromPathname(pathname),
      page_type: pageTypeFromPathname(pathname),
      page_path: pathname,
      page_url:
        typeof window !== "undefined" ? window.location.href : pathname,
      utm_source: searchParams?.get("utm_source") ?? "",
      utm_medium: searchParams?.get("utm_medium") ?? "",
      utm_campaign: searchParams?.get("utm_campaign") ?? "",
      utm_content: searchParams?.get("utm_content") ?? "",
      utm_term: searchParams?.get("utm_term") ?? "",
    });
  }, [pathname, searchParams]);

  return null;
}

export function TealiumRouteTracker() {
  // useSearchParams requires a Suspense boundary in Next 16.
  return (
    <Suspense fallback={null}>
      <TealiumRouteTrackerInner />
    </Suspense>
  );
}
