import type { Metadata } from "next";
import { smashd } from "@/config/brands";
import { Navbar, Footer } from "@/components/shared";

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
    <div style={{ backgroundColor: smashd.colors.background }} className="min-h-screen flex flex-col">
      <Navbar brand={smashd} />
      <main className="flex-1">{children}</main>
      <Footer brand={smashd} />
    </div>
  );
}
