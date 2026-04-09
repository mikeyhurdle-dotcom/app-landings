import type { Metadata } from "next";
import { mewstro } from "@/config/brands";

export const metadata: Metadata = {
  title: "Pricing — Mewstro",
  description:
    "Mewstro is free forever for teachers. Students get a free tier with an optional £4.99 one-time Pro upgrade. No ads, no data sales, no subscriptions required.",
};

const teacherFeatures = [
  "Full studio dashboard with live leaderboard of your students' weekly practice",
  "See each student's weekly minutes, streak, and last-active timestamp",
  "Lesson notes — link a Google Doc once, notes appear in-app next to sessions",
  "Weekly digest email summarising your whole studio",
  "Unlimited students in your studio",
  "One shareable invite code — students type it during onboarding to join",
  "Zero feature locks. Zero upgrade nags. Forever.",
];

const freeTier = {
  name: "Free",
  price: "£0",
  period: "forever",
  tagline: "Everything you need to build a practice habit.",
  features: [
    "Practice timer with task types",
    "Session logging with mood, focus, notes",
    "Manual entry (practice away from phone)",
    "Up to 3 instruments",
    "7-day practice history",
    "Heatmap calendar + activity rings",
    "Streak tracking",
    "Repertoire — learning / polishing / mastered",
    "Weekly planner",
    "Achievements (all of them)",
    "Mewstro mascot (4 basic moods)",
    "1 Home Screen widget (Streak)",
    "Metronome",
    "Audio recording (7-day retention)",
    "1 Milestone video per piece",
    "Your studio leaderboard",
    "Lesson notes from your teacher",
    "No ads. No data sales.",
  ],
  highlighted: false,
};

const proTier = {
  name: "Mewstro Pro",
  price: "£4.99",
  period: "one-time, yours forever",
  tagline: "Unlock everything. Pay once. No subscription.",
  features: [
    "Everything in Free, plus:",
    "Unlimited instruments",
    "Full practice history (not just 7 days)",
    "All 4 Home Screen widgets + Lock Screen widgets",
    "Apple Watch app with standalone timer",
    "Haptic metronome on Apple Watch",
    "Premium themes (Nocturne + Encore)",
    "CSV data export",
    "Full mascot — all 9 moods, confetti, floating notes",
    "30-day recording retention (up from 7)",
    "Unlimited Milestone videos",
    "Milestone comparison (this month vs last month)",
  ],
  highlighted: true,
};

const socialPassTier = {
  name: "Social Pass",
  price: "£1.99",
  period: "per month",
  tagline: "Optional subscription for the social layer.",
  features: [
    "Everything in Pro, plus:",
    "Join multiple teachers' studios",
    "Cross-studio leaderboards",
    "Shareable practice cards (Instagram / Twitter)",
    "Weekly summary email for you",
    "Community-wide challenges",
  ],
  highlighted: false,
};

const competitors = [
  { name: "Mewstro", student: "Free + £4.99 once", teacher: "£0 forever", highlight: true },
  { name: "Tonara", student: "~£5–10 / mo", teacher: "£8–19 / mo per teacher", highlight: false },
  { name: "Modacity", student: "~£4 / mo or ~£32 / yr", teacher: "No teacher tier", highlight: false },
  { name: "Yousician", student: "£12–17 / mo", teacher: "N/A (learning app)", highlight: false },
  { name: "Andante", student: "£8 one-time", teacher: "No teacher tier", highlight: false },
];

const commitments = [
  {
    title: "Teachers will never pay",
    body: "Hard-coded in the brand guide. If this ever changes, assume Mikey has been replaced by aliens.",
  },
  {
    title: "No ads. Ever.",
    body: "Not banner ads. Not interstitials. Not 'sponsored practice tips'. Never.",
  },
  {
    title: "No data sales",
    body: "Your practice data is yours. We don't sell it, share it, or train ML models on it.",
  },
  {
    title: "No dark patterns",
    body: "No fake free trials that auto-convert. No hidden consent. Students see what they get before they pay.",
  },
  {
    title: "If Mewstro dies, you get your data",
    body: "We'll ship a full CSV export tool for every user — free or paid — before shutting anything down.",
  },
];

export default function MewstroPricingPage() {
  const bg = mewstro.colors.background;
  const surface = mewstro.colors.surface;
  const primary = mewstro.colors.primary;
  const accent = mewstro.colors.accent;
  const text = mewstro.colors.text;
  const textDim = mewstro.colors.textDim;

  return (
    <div style={{ backgroundColor: bg, color: text }} className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-12 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{ color: primary }}
          >
            Pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: text }}>
            Free forever for teachers.
            <br />
            Optional £4.99 upgrade for students.
          </h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto" style={{ color: textDim }}>
            No ads, no subscriptions required, no data sales, no dark patterns.
            The core practice loop is free for every student, for as long as
            they use Mewstro.
          </p>
        </div>
      </section>

      {/* Teachers Hero Card */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <div
            className="rounded-3xl overflow-hidden"
            style={{ backgroundColor: accent }}
          >
            <div className="px-8 md:px-16 py-14">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
                  For music teachers
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
                  £0 forever
                </h2>
                <p className="mt-3 text-lg text-white/90">
                  No credit card. No trial. No upgrade prompt. Teachers are
                  Mewstro's distribution channel, not its customers.
                </p>
                <ul className="mt-8 space-y-3">
                  {teacherFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-white/95 text-base">
                      <span className="text-white text-xl leading-none mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Tiers */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: text }}>
              For students
            </h2>
            <p className="mt-3 text-lg" style={{ color: textDim }}>
              Start with Free. Upgrade if you love it. Never feel locked out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[freeTier, proTier, socialPassTier].map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 flex flex-col ${
                  tier.highlighted ? "shadow-2xl scale-[1.02]" : "shadow-md"
                }`}
                style={{
                  backgroundColor: tier.highlighted ? primary : surface,
                  color: tier.highlighted ? "white" : text,
                  border: tier.highlighted ? "none" : `1px solid ${primary}22`,
                }}
              >
                {tier.highlighted && (
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 self-start"
                    style={{ backgroundColor: "white", color: primary }}
                  >
                    Most popular
                  </div>
                )}

                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{tier.price}</span>
                  <span
                    className="text-sm"
                    style={{
                      color: tier.highlighted ? "rgba(255,255,255,0.8)" : textDim,
                    }}
                  >
                    {tier.period}
                  </span>
                </div>
                <p
                  className="mt-3 text-base"
                  style={{
                    color: tier.highlighted ? "rgba(255,255,255,0.9)" : textDim,
                  }}
                >
                  {tier.tagline}
                </p>

                <ul className="mt-8 space-y-3 flex-1">
                  {tier.features.map((feature, idx) => {
                    const isFirstHeader =
                      idx === 0 && feature.startsWith("Everything in");
                    return (
                      <li
                        key={feature}
                        className={`flex items-start gap-3 text-sm ${
                          isFirstHeader ? "font-semibold pb-2" : ""
                        }`}
                      >
                        <span
                          className="text-lg leading-none mt-0.5"
                          style={{
                            color: tier.highlighted ? "white" : primary,
                          }}
                        >
                          {isFirstHeader ? "↑" : "✓"}
                        </span>
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor comparison */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: text }}>
              How Mewstro compares
            </h2>
            <p className="mt-3 text-base" style={{ color: textDim }}>
              The UK music practice app market at a glance.
            </p>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: surface, border: `1px solid ${primary}22` }}
          >
            <table className="w-full text-left text-sm">
              <thead>
                <tr
                  className="text-xs uppercase tracking-wider"
                  style={{ backgroundColor: `${primary}08`, color: textDim }}
                >
                  <th className="px-6 py-4 font-semibold">App</th>
                  <th className="px-6 py-4 font-semibold">Student price</th>
                  <th className="px-6 py-4 font-semibold">Teacher price</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((comp) => (
                  <tr
                    key={comp.name}
                    className="border-t"
                    style={{
                      borderColor: `${primary}11`,
                      backgroundColor: comp.highlight ? `${primary}08` : "transparent",
                    }}
                  >
                    <td
                      className="px-6 py-4"
                      style={{
                        color: comp.highlight ? primary : text,
                        fontWeight: comp.highlight ? 700 : 500,
                      }}
                    >
                      {comp.name}
                    </td>
                    <td className="px-6 py-4" style={{ color: textDim }}>
                      {comp.student}
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{
                        color: comp.highlight ? primary : textDim,
                        fontWeight: comp.highlight ? 600 : 400,
                      }}
                    >
                      {comp.teacher}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            className="mt-6 text-center text-sm italic"
            style={{ color: textDim }}
          >
            Mewstro is the only practice tracker in the UK market that is free
            for teachers AND a one-time purchase for students.
          </p>
        </div>
      </section>

      {/* Commitments */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: text }}>
              The honest commitments
            </h2>
            <p className="mt-3 text-base" style={{ color: textDim }}>
              Promises baked into the code, not just the marketing page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {commitments.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: surface,
                  border: `1px solid ${primary}22`,
                }}
              >
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: primary }}
                >
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: textDim }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-16 px-6 text-center"
        style={{ backgroundColor: surface }}
      >
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: text }}>
            Every practice deserves an encore.
          </h2>
          <p className="mt-4 text-lg" style={{ color: textDim }}>
            Download Mewstro free and let the cat conductor take it from here.
          </p>
          <a
            href={mewstro.links.appStore}
            className="inline-block mt-8 rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
            style={{
              backgroundColor: primary,
              color: mewstro.colors.primaryForeground,
            }}
          >
            Download on the App Store
          </a>
        </div>
      </section>
    </div>
  );
}
