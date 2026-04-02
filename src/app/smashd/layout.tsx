import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import { smashd } from "@/config/brands";
import { Navbar, Footer } from "@/components/shared";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SMASHD — The Community Hub for Padel",
    template: "%s | SMASHD",
  },
  description: smashd.description,
  keywords: [
    "padel",
    "padel app",
    "americano tournament",
    "padel tournament",
    "padel scoring",
    "padel leaderboard",
    "padel club",
    "padel near me",
    "tournament organiser",
    "live scoring",
    "padel community",
  ],
  authors: [{ name: "SMASHD" }],
  creator: "SMASHD",
  publisher: "SMASHD",
  metadataBase: new URL("https://getsmashd.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SMASHD — The Community Hub for Padel",
    description: smashd.description,
    url: "https://getsmashd.app",
    siteName: "SMASHD",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/smashd/logo-on-dark.png",
        width: 512,
        height: 512,
        alt: "SMASHD — the community hub for padel tournaments and live scoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMASHD — The Community Hub for Padel",
    description: smashd.description,
    images: ["/smashd/logo-on-dark.png"],
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
  category: "Sports",
};

export default function SmashdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: smashd.colors.background,
        fontFamily: "var(--font-outfit), system-ui, sans-serif",
      }}
      className={`${outfit.variable} ${spaceMono.variable} min-h-screen flex flex-col`}
    >
      <Navbar brand={smashd} />
      <main className="flex-1">{children}</main>
      <Footer brand={smashd} />
    </div>
  );
}
