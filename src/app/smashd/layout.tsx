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
  openGraph: {
    title: "SMASHD — The Community Hub for Padel",
    description: smashd.description,
    siteName: "SMASHD",
    type: "website",
  },
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
