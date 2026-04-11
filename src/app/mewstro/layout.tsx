import type { Metadata } from "next";
import { mewstro } from "@/config/brands";
import { Navbar, Footer } from "@/components/shared";

export const metadata: Metadata = {
  title: {
    default: "Mewstro — Your Practice Companion",
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
    title: "Mewstro — Your Practice Companion",
    description: mewstro.description,
    url: "https://mewstro.com",
    siteName: "Mewstro",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/mewstro/mascot.png",
        width: 512,
        height: 512,
        alt: "Mewstro — animated cat conductor music practice companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mewstro — Your Practice Companion",
    description: mewstro.description,
    images: ["/mewstro/mascot.png"],
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
