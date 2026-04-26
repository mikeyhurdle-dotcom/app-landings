import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { TealiumScript } from "@/components/shared/TealiumScript";
import { TealiumRouteTracker } from "@/components/shared/TealiumRouteTracker";
import { ConsentBanner } from "@/components/shared/ConsentBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App Landings",
  description: "Mewstro — Your Practice Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <TealiumScript />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <TealiumRouteTracker />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
