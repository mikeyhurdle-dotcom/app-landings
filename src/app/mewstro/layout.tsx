import type { Metadata } from "next";
import { mewstro } from "@/config/brands";
import { Navbar, Footer } from "@/components/shared";

export const metadata: Metadata = {
  title: {
    default: "Mewstro — Your Practice Companion",
    template: "%s | Mewstro",
  },
  description: mewstro.description,
  openGraph: {
    title: "Mewstro — Your Practice Companion",
    description: mewstro.description,
    siteName: "Mewstro",
    type: "website",
  },
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
