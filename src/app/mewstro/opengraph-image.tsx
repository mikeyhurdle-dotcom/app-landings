import { ImageResponse } from "next/og";

// Dynamic Open Graph image for every /mewstro/* route.
//
// Next App Router serves this as og:image for every page under /mewstro
// unless that page's route has its own `opengraph-image.tsx` override.
// That makes this the launch-fallback social card — no designer needed.
//
// Served at 1200×630 (the OG spec aspect, 1.91:1). Rendered server-side on
// request via @vercel/og; cached aggressively at the edge.

export const runtime = "edge";
export const alt = "Mewstro — Every practice deserves an encore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TEAL = "#2D8B7E";
const CREAM = "#FAF6EF";
const INK = "#1A1A2E";

export default async function Image() {
  // Fetch the mascot from our own public assets. Absolute URL needed by the
  // OG renderer. NEXT_PUBLIC_SITE_URL falls back to the production domain.
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mewstro.com";
  const mascotUrl = `${base}/mewstro/mascot-conducting.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: TEAL,
          backgroundImage: `radial-gradient(circle at 85% 85%, rgba(255,255,255,0.10) 0%, transparent 55%), radial-gradient(circle at 12% 15%, rgba(255,255,255,0.07) 0%, transparent 45%)`,
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        {/* Copy block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "680px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.85,
              marginBottom: "20px",
            }}
          >
            Mewstro
          </div>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            Every practice deserves an encore.
          </div>
          <div
            style={{
              marginTop: "36px",
              fontSize: "30px",
              lineHeight: 1.35,
              fontWeight: 500,
              color: CREAM,
              maxWidth: "620px",
            }}
          >
            A music practice app built with a real piano teacher. For
            musicians, and for the studios teaching them.
          </div>
          <div
            style={{
              marginTop: "48px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "24px",
              fontWeight: 600,
              color: "#FFFFFF",
              opacity: 0.92,
            }}
          >
            <span>mewstro.com</span>
          </div>
        </div>

        {/* Mascot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "440px",
            height: "440px",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mascotUrl}
            alt=""
            width={440}
            height={440}
            style={{
              filter:
                "drop-shadow(0 20px 40px rgba(0,0,0,0.25)) drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
            }}
          />
        </div>

        {/* Accent stripe along the bottom for a subtle brand footprint */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            display: "flex",
            background: `linear-gradient(90deg, ${CREAM} 0%, ${CREAM} 30%, ${INK} 30%, ${INK} 60%, ${TEAL} 60%, ${TEAL} 100%)`,
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
