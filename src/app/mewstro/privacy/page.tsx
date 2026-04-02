import type { Metadata } from "next";
import { mewstro } from "@/config/brands";
import { PrivacyPolicy } from "@/components/shared";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const sections = [
  {
    title: "Introduction",
    content:
      "Mewstro (\"we\", \"our\", \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.",
  },
  {
    title: "Information We Collect",
    content:
      "Practice session data (duration, instrument, task type) is stored locally on your device using Apple's SwiftData framework and synced via iCloud if you choose to enable it.\n\nIf you create an account, we collect your email address and display name via Apple Sign-In, Google Sign-In, or email/password registration through Supabase Auth.\n\nWe do not collect any analytics data beyond what Apple provides through App Store Connect. We use os_log for debugging, which stays on your device.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your practice data is used solely to provide the app's functionality — tracking sessions, calculating streaks, displaying progress, and powering widgets.\n\nIf you join a teacher's studio, your practice summary (not detailed session data) is shared with your teacher.\n\nWe never sell, rent, or share your personal data with third parties for marketing purposes.",
  },
  {
    title: "Data Storage & Security",
    content:
      "Local data is stored in SwiftData on your device. Cloud sync uses Apple's CloudKit, which encrypts data in transit and at rest.\n\nAccount data is stored in Supabase (EU region) with row-level security enabled.\n\nWe do not store any payment information — all purchases are handled by Apple through StoreKit.",
  },
  {
    title: "Your Rights",
    content:
      "You can export all your practice data as CSV files from the app at any time.\n\nYou can delete your account and all associated data by contacting us at support@mewstro.app or through the app's Settings page.\n\nIf you are located in the EU, you have additional rights under GDPR including the right to access, rectification, erasure, and data portability.",
  },
  {
    title: "Children's Privacy",
    content:
      "Mewstro is rated 4+ and is suitable for all ages. We do not knowingly collect personal information from children under 13 without parental consent. If you are a parent or guardian and believe we have collected information from your child, please contact us.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the \"Last updated\" date.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at:\n\nEmail: support@mewstro.app",
  },
];

export default function MewstroPrivacyPage() {
  return (
    <div
      className="py-20 px-6"
      style={{ backgroundColor: mewstro.colors.background }}
    >
      <PrivacyPolicy brand={mewstro} sections={sections} />
    </div>
  );
}
