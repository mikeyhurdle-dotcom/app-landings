import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Mewstro",
  description:
    "Mewstro is built for music teachers and their students. Teachers pay a simple monthly fee and every student in their studio gets full access included. Solo learners can subscribe directly. 30-day teacher trial, 7-day solo trial, no dark patterns.",
};

const teacherTiers = [
  {
    name: "Studio",
    price: "£14.99",
    period: "/ month",
    annual: "or £149/year · saves £30",
    description: "Up to 25 students in your studio.",
    features: [
      "Full teacher dashboard",
      "See every student's practice at a glance",
      "Studio leaderboard, ranked by weekly minutes",
      "Practice heatmap and trends per student",
      "Milestone Moment videos from your students",
      "One invite code — students redeem it in the app",
      "Every enrolled student gets full Mewstro, free",
      "Lesson notes integration (link a Google Doc)",
      "Weekly studio digest email",
      "Email support",
    ],
    highlighted: false,
    cta: "Start 30-day free trial",
  },
  {
    name: "Studio Unlimited",
    price: "£24.99",
    period: "/ month",
    annual: "or £249/year · saves £50",
    description: "Unlimited students. For full-time teaching studios.",
    features: [
      "Everything in Studio",
      "Unlimited students",
      "Priority email support",
      "Early access to new features",
      "Feature requests get higher priority",
    ],
    highlighted: true,
    cta: "Start 30-day free trial",
  },
];

const soloTiers = [
  {
    name: "Free",
    price: "£0",
    period: "",
    description: "Everything you need to build a basic practice habit.",
    features: [
      "Practice timer",
      "Manual session entry",
      "1 instrument",
      "7-day practice history",
      "Daily streak counter",
      "Metronome (iPhone)",
      "Mewstro the mascot (basic moods)",
      "No ads, ever",
    ],
  },
  {
    name: "Premium",
    price: "£6.99",
    period: "/ month",
    annual: "or £59.99/year · saves 28%",
    description: "Everything Mewstro can do, for solo learners.",
    features: [
      "7-day free trial on first open",
      "Unlimited instruments",
      "Full practice history",
      "Milestone Moment videos",
      "Repertoire with BPM tracking",
      "Weekly planner",
      "Full stats — heatmap, trends",
      "All 4 widgets + Lock Screen widgets",
      "Apple Watch app + haptic metronome",
      "Siri Shortcuts",
      "Full mascot (all 9 moods)",
      "CSV data export",
    ],
  },
];

const competitors = [
  {
    name: "Mewstro",
    student: "Free or £6.99/mo",
    teacher: "£14.99 / £24.99 per month",
    notes: "30-day trial · Ellie Moorhouse's Studio currently piloting",
    highlight: true,
  },
  {
    name: "Tonara (shut down 2023)",
    student: "~£5–10/mo",
    teacher: "£8–19/mo per teacher",
    notes: "Closest comparable, raised $10.5M, couldn't sustain it",
    highlight: false,
  },
  {
    name: "Practice Space",
    student: "£9.99/mo",
    teacher: "£9.99/mo",
    notes: "US-focused, no native iOS Milestones",
    highlight: false,
  },
  {
    name: "Better Practice",
    student: "£9.99/mo",
    teacher: "~£10/mo",
    notes: "Similar shape, smaller community layer",
    highlight: false,
  },
  {
    name: "Modacity",
    student: "£3.99/mo",
    teacher: "—",
    notes: "Solo-only, no teacher tier",
    highlight: false,
  },
];

const commitments = [
  {
    title: "No ads. Ever.",
    body: "Not banners, not interstitials, not sponsored practice tips. The subscription is how Mewstro pays for itself.",
  },
  {
    title: "No data sales",
    body: "Your students' practice data stays private. We don't sell it, share it with music schools, or train ML models on it.",
  },
  {
    title: "No dark patterns",
    body: "The 30-day teacher trial ends with a clear reminder email seven days before the first charge. No silent auto-renewal. Cancel any time from your dashboard.",
  },
  {
    title: "Every student covered",
    body: "One teacher subscription covers every student in their studio (up to the tier cap). Students never pay. Parents never pay.",
  },
  {
    title: "If Mewstro ever shuts down, you get your data",
    body: "We'll publish a full CSV export tool for every user, free or paid, before anything goes offline.",
  },
];

function BuiltWithTeachersCard() {
  return (
    <div className="rounded-2xl border border-[#E8DFD3] bg-white p-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#2D8B7E] text-2xl">
          🎹
        </div>
        <div>
          <h3 className="text-lg font-bold">
            Built with music teachers, not for them
          </h3>
          <p className="mt-2 text-sm text-[#5A4E42]">
            Every Mewstro feature has to pass the &ldquo;would a real
            teacher actually use this?&rdquo; test before it ships. The
            product is being shaped in a working music studio with a
            professional teacher — not designed in a spreadsheet. Once
            our founding pilot studio has been using Mewstro in real
            lessons for long enough to have an informed view, a real
            testimonial will live here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MewstroPricingPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF7] text-[#1A1A2E]">
      {/* Hero */}
      <section className="pt-20 pb-12 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#2D8B7E]">
            Pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">
            Built for teachers.{" "}
            <span className="text-[#2D8B7E]">Works for solo learners too.</span>
          </h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-[#6B7280]">
            One teacher subscription covers every student in the studio.
            Solo learners can subscribe directly. No ads, no data sales, no
            dark patterns.
          </p>
        </div>
      </section>

      {/* Teacher tiers (primary) */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-wider text-[#6B7280] mb-2">
              For music teachers
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Pick your tier by studio size
            </h2>
            <p className="mt-3 text-[#6B7280]">
              One decision: do you have more than 25 students?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teacherTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 flex flex-col ${
                  tier.highlighted
                    ? "bg-[#2D8B7E] text-white shadow-2xl scale-[1.02]"
                    : "bg-white shadow-sm border border-[#E8DFD3]"
                }`}
              >
                {tier.highlighted && (
                  <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 bg-white text-[#2D8B7E]">
                    Growing studios
                  </span>
                )}
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{tier.price}</span>
                  <span
                    className={`text-sm ${tier.highlighted ? "text-white/80" : "text-[#6B7280]"}`}
                  >
                    {tier.period}
                  </span>
                </div>
                <p
                  className={`mt-1 text-sm ${tier.highlighted ? "text-white/80" : "text-[#6B7280]"}`}
                >
                  {tier.annual}
                </p>
                <p
                  className={`mt-3 text-base ${tier.highlighted ? "text-white/90" : "text-[#5A4E42]"}`}
                >
                  {tier.description}
                </p>

                <ul className="mt-8 space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span
                        className={`mt-0.5 text-base ${tier.highlighted ? "text-white" : "text-[#2D8B7E]"}`}
                      >
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-8 rounded-xl px-5 py-4 text-center text-sm font-semibold ${
                    tier.highlighted
                      ? "bg-white text-[#2D8B7E]"
                      : "bg-[#2D8B7E] text-white"
                  }`}
                >
                  {tier.cta}
                </div>
                <p
                  className={`mt-3 text-xs text-center ${tier.highlighted ? "text-white/70" : "text-[#6B7280]"}`}
                >
                  Card required at signup. No charge for 30 days.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built with teachers — testimonial slot */}
      {/*
       * This section is structured to host a real teacher testimonial once
       * our founding pilot studio has been using Mewstro for long enough
       * to give one. Do NOT add placeholder quotes, fabricated names, or
       * "Coming Soon" testimonials here (see Phase B rule: every quote on
       * this page has to come from a real teacher who has opted in).
       *
       * To add a real testimonial, replace the <BuiltWithTeachers /> card
       * below with a quote card containing the teacher's words, their
       * first name, their studio name, and ideally a photo.
       */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <BuiltWithTeachersCard />
        </div>
      </section>

      {/* Solo tiers (secondary) */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-wider text-[#6B7280] mb-2">
              No teacher?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              You can still use Mewstro
            </h2>
            <p className="mt-3 text-[#6B7280]">
              Solo learners can download the app for free and unlock
              everything with Premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {soloTiers.map((tier) => (
              <div
                key={tier.name}
                className="rounded-3xl p-8 bg-white shadow-sm border border-[#E8DFD3] flex flex-col"
              >
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className="text-sm text-[#6B7280]">
                      {tier.period}
                    </span>
                  )}
                </div>
                {tier.annual && (
                  <p className="mt-1 text-sm text-[#6B7280]">{tier.annual}</p>
                )}
                <p className="mt-3 text-base text-[#5A4E42]">
                  {tier.description}
                </p>
                <ul className="mt-8 space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="mt-0.5 text-base text-[#2D8B7E]">
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher-invited students callout */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-[#2D8B7E]/5 border border-[#2D8B7E]/20 p-8 md:p-10">
            <h2 className="text-2xl font-bold">
              If your teacher uses Mewstro, it&apos;s already paid for
            </h2>
            <p className="mt-4 text-base text-[#5A4E42]">
              Teacher-invited students get the full Mewstro experience plus
              their studio layer (leaderboard, teacher-set challenges,
              assignment inbox) completely free, for as long as their teacher
              is subscribed. Just ask your teacher for the invite code and
              redeem it during onboarding in the app.
            </p>
            <div className="mt-6 rounded-xl bg-white border border-[#E8DFD3] p-4 text-sm text-[#6B7280]">
              <strong className="text-[#1A1A2E]">How it works:</strong>{" "}
              Your teacher generates a code from their dashboard. You download
              the app, tap &ldquo;I have an invite code&rdquo; during
              onboarding, paste the code, and your account is unlocked. Apple
              handles the redemption — no card, no fuss.
            </div>
          </div>
        </div>
      </section>

      {/* Competitor comparison */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              How Mewstro compares
            </h2>
            <p className="mt-3 text-base text-[#6B7280]">
              Pricing in the music-practice app market.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#E8DFD3] bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF6EF] text-xs uppercase tracking-wider text-[#6B7280]">
                <tr>
                  <th className="px-6 py-4 font-semibold">App</th>
                  <th className="px-6 py-4 font-semibold">Student price</th>
                  <th className="px-6 py-4 font-semibold">Teacher price</th>
                  <th className="px-6 py-4 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFD3]">
                {competitors.map((c) => (
                  <tr
                    key={c.name}
                    className={c.highlight ? "bg-[#2D8B7E]/5" : ""}
                  >
                    <td
                      className={`px-6 py-4 ${
                        c.highlight
                          ? "font-bold text-[#2D8B7E]"
                          : "font-medium text-[#1A1A2E]"
                      }`}
                    >
                      {c.name}
                    </td>
                    <td className="px-6 py-4 text-[#6B7280]">{c.student}</td>
                    <td
                      className={`px-6 py-4 ${
                        c.highlight ? "font-semibold text-[#2D8B7E]" : "text-[#6B7280]"
                      }`}
                    >
                      {c.teacher}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#6B7280]">
                      {c.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              What never changes
            </h2>
            <p className="mt-3 text-base text-[#6B7280]">
              These aren&apos;t marketing promises. They&apos;re baked into the
              product.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {commitments.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl bg-white p-6 border border-[#E8DFD3]"
              >
                <h3 className="text-lg font-bold mb-2 text-[#2D8B7E]">
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#5A4E42]">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 text-center bg-white border-t border-[#E8DFD3]">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to try it with your studio?
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            30 days free. Cancel any time before day 31 and you won&apos;t be
            charged.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/mewstro"
              className="inline-block rounded-full px-8 py-4 text-base font-semibold bg-[#2D8B7E] text-white hover:bg-[#246F64] transition-colors"
            >
              Start your free trial
            </Link>
            <Link
              href="/mewstro"
              className="inline-block rounded-full px-8 py-4 text-base font-semibold border border-[#E8DFD3] text-[#1A1A2E] bg-white hover:bg-[#FAF6EF] transition-colors"
            >
              Learn more about Mewstro
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
