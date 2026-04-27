import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import { spindl } from "@/config/brands";
import { Navbar, Footer } from "@/components/shared";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Spindl — A Reading Tracker for People Who Finish Books",
    template: "%s | Spindl",
  },
  description: spindl.description,
  keywords: [
    "reading tracker",
    "book tracker",
    "reading journal",
    "Goodreads alternative",
    "iOS reading app",
    "reading log",
    "book journal",
    "reading streak",
    "reading habit",
    "indie reading app",
    "Open Library",
    "ISBN scanner",
  ],
  authors: [{ name: "Spindl" }],
  creator: "Spindl",
  publisher: "Spindl",
  metadataBase: new URL("https://spindlapp.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Spindl — A Reading Tracker for People Who Finish Books",
    description: spindl.description,
    url: "https://spindlapp.com",
    siteName: "Spindl",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spindl — A Reading Tracker for People Who Finish Books",
    description: spindl.description,
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
  category: "Books",
};

export default function SpindlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${lora.variable} ${inter.variable} min-h-screen flex flex-col`}
      style={{
        backgroundColor: spindl.colors.background,
        fontFamily: "var(--font-inter)",
      }}
    >
      <Navbar brand={spindl} />
      <main className="flex-1">{children}</main>
      <Footer brand={spindl} />
    </div>
  );
}
