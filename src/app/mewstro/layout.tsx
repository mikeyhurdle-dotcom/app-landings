import type { Metadata } from "next";
import { mewstro } from "@/config/brands";
import { Navbar, Footer } from "@/components/shared";

export const metadata: Metadata = {
  title: {
    default: "Mewstro — Every Practice Deserves an Encore",
    template: "%s | Mewstro",
  },
  description: mewstro.description,
  keywords: [
    "practice tracker",
    "music practice",
    "practice log",
    "instrument timer",
    "music journal",
    "practice planner",
    "streak tracker",
    "music practice app",
    "piano practice",
    "guitar practice",
    "violin practice",
  ],
  authors: [{ name: "Mewstro" }],
  creator: "Mewstro",
  publisher: "Mewstro",
  metadataBase: new URL("https://mewstro.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mewstro — Every Practice Deserves an Encore",
    description: mewstro.description,
    url: "https://mewstro.com",
    siteName: "Mewstro",
    locale: "en_GB",
    type: "website",
    // images intentionally omitted — resolved via the file-based
    // `src/app/mewstro/opengraph-image.tsx`, which generates a 1200×630
    // dynamic card at request time. Per-route overrides can be added by
    // dropping an `opengraph-image.tsx` into any sub-route folder.
  },
  twitter: {
    card: "summary_large_image",
    title: "Mewstro — Every Practice Deserves an Encore",
    description: mewstro.description,
    // images intentionally omitted — same reasoning; Next auto-uses the
    // OG image for twitter:image when `card: summary_large_image`.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Music",
};

export default function MewstroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: mewstro.colors.background }} className="min-h-screen flex flex-col">
      <Navbar brand={mewstro} />
      <main className="flex-1">{children}</main>
      <Footer brand={mewstro} />
    </div>
  );
}
