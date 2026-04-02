import type { Metadata } from "next";
import { smashd } from "@/config/brands";
import { PrivacyPolicy } from "@/components/shared";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const sections = [
  {
    title: "Introduction",
    content:
      "SMASHD (\"we\", \"our\", \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application and website.",
  },
  {
    title: "Information We Collect",
    content:
      "When you create an account, we collect your email address and display name via Google OAuth or email/password registration through Supabase Auth.\n\nWhen you participate in tournaments, we collect match scores, tournament results, and player statistics.\n\nWe store player profiles including display name, profile photo (if provided), and tournament history.\n\nWe use privacy-first analytics to understand app usage patterns. We do not track individual users for advertising purposes.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your data is used to provide the app's core functionality — running tournaments, calculating leaderboards, maintaining player profiles, and powering club directories.\n\nTournament results and player profiles may be publicly visible if you choose to make them public.\n\nWe never sell, rent, or share your personal data with third parties for marketing purposes.",
  },
  {
    title: "Data Storage & Security",
    content:
      "All data is stored in Supabase (EU West region) with row-level security enabled. Data is encrypted in transit using TLS and at rest.\n\nAuthentication is handled by Supabase Auth with PKCE flow for enhanced security.\n\nWe do not store any payment information — all future purchases will be handled by the respective app stores.",
  },
  {
    title: "Your Rights",
    content:
      "You can view and export your tournament data at any time through the app.\n\nYou can delete your account and all associated data by contacting us at support@playsmashd.com or through the app's Settings page.\n\nIf you are located in the EU, you have additional rights under GDPR including the right to access, rectification, erasure, and data portability.\n\nWe maintain a consent audit log for GDPR compliance.",
  },
  {
    title: "Ghost Profiles",
    content:
      "Tournament organisers may create \"ghost profiles\" for players who don't yet have an account. These profiles contain only the display name provided by the organiser. Ghost profiles can be claimed by creating an account with the same details.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the \"Last updated\" date.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at:\n\nEmail: support@playsmashd.com",
  },
];

export default function SmashdPrivacyPage() {
  return (
    <div
      className="py-20 px-6"
      style={{ backgroundColor: smashd.colors.background }}
    >
      <PrivacyPolicy brand={smashd} sections={sections} />
    </div>
  );
}
