import type { Metadata } from "next";
import { spindl } from "@/config/brands";
import { PrivacyPolicy } from "@/components/shared";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Spindl handles your reading data, account info, and analytics. Plain English, no dark patterns.",
  alternates: { canonical: "/spindl/privacy" },
};

const sections = [
  {
    title: "The short version",
    content:
      "Spindl is a reading tracker. Your books, sessions, journal entries, and shelves live in your account on a Supabase database in the EU. They sync to your devices and nowhere else. I don't sell, share, or train AI on any of it.",
  },
  {
    title: "What gets stored",
    content:
      "Account: an Apple ID or Google sign-in token, plus the email tied to it. Reading data: books on your shelves, reading sessions you log, journal entries you write, streaks, achievements. Optional: book covers you upload, which sit in a public Spindl storage bucket so the app can render them.",
  },
  {
    title: "What doesn't get stored",
    content:
      "No location. No contacts. No browsing history. No social graph. Spindl has no concept of friends or followers. There is no in-app advertising network and no third-party trackers in the iOS app.",
  },
  {
    title: "Analytics",
    content:
      "I use TelemetryDeck for anonymous, privacy-first usage analytics — things like 'a session was logged' or 'the app was opened today.' No IP addresses, no advertising IDs, no cross-app tracking. You can find TelemetryDeck's privacy policy at telemetrydeck.com/privacy.",
  },
  {
    title: "Book data",
    content:
      "Book metadata (titles, authors, covers, page counts, ISBNs) is fetched from the Open Library API and Google Books API. These lookups happen from your device. The free Open Library service is operated by the Internet Archive.",
  },
  {
    title: "Subscriptions",
    content:
      "Premium subscriptions are processed by Apple via StoreKit. I never see your card details. Apple shares anonymous subscription status (active/lapsed) with the app so it knows what to unlock.",
  },
  {
    title: "Your rights",
    content:
      "You can export everything to CSV, PDF, or markdown from inside the app. You can delete your account from Settings, which permanently removes your data from the Spindl database within 30 days. You can email mikey@spindlapp.com any time and I'll personally reply.",
  },
  {
    title: "If Spindl shuts down",
    content:
      "If I ever have to close Spindl down, I'll ship a full export tool first — for free and paid users both — before anything goes offline. That's a hard commitment.",
  },
  {
    title: "Contact",
    content:
      "Questions, complaints, or anything that feels off — mikey@spindlapp.com. Spindl is operated by Stormlight Archive Ltd, a UK company.",
  },
];

export default function SpindlPrivacyPage() {
  return (
    <div className="px-6 py-20">
      <PrivacyPolicy brand={spindl} sections={sections} />
    </div>
  );
}
