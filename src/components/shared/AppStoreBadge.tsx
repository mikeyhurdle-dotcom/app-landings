"use client";

import type { Brand } from "@/config/brands";
import { trackLink } from "@/lib/tealium";

export function AppStoreBadge({
  brand,
  platform,
}: {
  brand: Brand;
  platform: "ios" | "android";
}) {
  const href =
    platform === "ios" ? brand.links.appStore : "#";

  const handleClick = () => {
    trackLink("app_store_clicked", {
      brand: brand.id,
      platform,
      target_url: href,
      source_page:
        typeof window !== "undefined" ? window.location.pathname : "",
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="inline-flex items-center gap-3 rounded-xl px-5 py-3 transition-transform hover:scale-105"
      style={{
        backgroundColor: "#000000",
        color: "#FFFFFF",
      }}
    >
      {platform === "ios" ? (
        <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
          <path d="M16.52 12.46c-.03-2.87 2.34-4.24 2.45-4.31-1.33-1.95-3.41-2.22-4.15-2.25-1.76-.18-3.45 1.04-4.34 1.04-.9 0-2.28-1.02-3.75-.99-1.93.03-3.71 1.12-4.71 2.85-2.01 3.49-.51 8.66 1.44 11.49.96 1.39 2.1 2.95 3.6 2.89 1.45-.06 1.99-.93 3.74-.93 1.74 0 2.24.93 3.76.9 1.56-.03 2.54-1.41 3.49-2.81 1.1-1.61 1.55-3.17 1.58-3.25-.03-.01-3.03-1.16-3.06-4.63h-.05zM13.69 3.96c.8-.97 1.34-2.3 1.19-3.64-1.15.05-2.55.77-3.37 1.73-.74.85-1.38 2.22-1.21 3.53 1.28.1 2.59-.65 3.39-1.62z" />
        </svg>
      ) : (
        <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor">
          <path d="M1.43.48C1.16.77 1 1.24 1 1.84v18.32c0 .6.16 1.07.43 1.36l.07.07L11.02 12v-.24L1.5.42 1.43.48zM14.19 15.2L11.02 12v-.24l3.17-3.17.07.04 3.76 2.13c1.07.61 1.07 1.6 0 2.21l-3.76 2.14-.07.04v.05zM14.26 15.16L11.02 12 1.5 21.52c.35.37.93.42 1.59.05l11.17-6.41zM14.26 8.84L3.09.43C2.43.06 1.85.11 1.5.48L11.02 12l3.24-3.16z" />
        </svg>
      )}
      <div className="text-left">
        <div className="text-[10px] leading-tight">
          {platform === "ios" ? "Download on the" : "Get it on"}
        </div>
        <div className="text-base font-semibold leading-tight">
          {platform === "ios" ? "App Store" : "Google Play"}
        </div>
      </div>
    </a>
  );
}
