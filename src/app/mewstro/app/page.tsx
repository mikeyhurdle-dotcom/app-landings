import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { mewstro } from "@/config/brands";
import {
  HeroSection,
  FeatureGrid,
  ScreenshotCarousel,
  FaqSection,
} from "@/components/shared";
import { MewstroJsonLd } from "@/components/shared/JsonLd";
import type { Feature, Screenshot } from "@/components/shared";

export const metadata: Metadata = {
  title: "Mewstro for solo learners",
  description:
    "Mewstro is a free music practice app with a living cat mascot who celebrates every session — for any instrument, any level, no ads ever. Premium £6.99/mo unlocks everything.",
};

const features: Feature[] = [
  {
    icon: "⏱️",
    title: "Practice timer",
    description:
      "One-tap sessions, tracked by instrument and task type. Scales, sight-reading, repertoire, technique — log it all without the admin.",
  },
  {
    icon: "🔥",
    title: "Streaks & heatmap",
    description:
      "A consecutive-day streak and a 90-day calendar heatmap so you can see the shape of your practice at a glance.",
  },
  {
    icon: "🎨",
    title: "Mewstro the cat mascot",
    description:
      "Nine moods, confetti, floating notes. Celebrates when you show up, sleeps when you rest — never guilt-trips you.",
  },
  {
    icon: "🎼",
    title: "Repertoire & BPM",
    description:
      "Track every piece you&apos;re learning, from sight-read-through to performance-ready. Log BPM targets as you bring them up.",
  },
  {
    icon: "⌚️",
    title: "Apple Watch + widgets",
    description:
      "Start a session from your Watch. Glance a Lock Screen widget. Full Home Screen widget ecosystem.",
  },
  {
    icon: "📹",
    title: "Milestone Moments",
    description:
      "Catch the moment a tricky passage finally clicks. Save short video clips and watch your progress compound over time.",
  },
];

const screenshots: Screenshot[] = [
  {
    src: "/mewstro/screens/practice-timer.png",
    alt: "Practice timer",
    caption: "Track every session",
  },
  {
    src: "/mewstro/screens/calendar-heatmap.png",
    alt: "Calendar heatmap",
    caption: "Build your streak",
  },
  {
    src: "/mewstro/screens/activity-rings.png",
    alt: "Activity rings",
    caption: "See your progress at a glance",
  },
  {
    src: "/mewstro/screens/achievements.png",
    alt: "Achievement unlock",
    caption: "Earn badges along the way",
  },
  {
    src: "/mewstro/screens/repertoire.png",
    alt: "Repertoire list",
    caption: "Organise your repertoire",
  },
  {
    src: "/mewstro/screens/widgets.png",
    alt: "Widgets",
    caption: "Widgets keep you motivated",
  },
];

const faqs = [
  {
    question: "What does Free include?",
    answer:
      "The practice timer, manual entry, one instrument, a 7-day practice history, streak counter, the metronome, and Mewstro the mascot with basic moods. No ads, ever. If that&apos;s all you need, Free stays Free.",
  },
  {
    question: "What do I get with Premium?",
    answer:
      "Unlimited instruments, full practice history, Milestone Moment videos, repertoire with BPM, weekly planner, all widgets, the Apple Watch app with haptic metronome, Siri Shortcuts, the full nine-mood mascot, themes, and CSV export. £6.99/mo or £59.99/yr (saves 28%). Your first 7 days are free via Apple&apos;s Introductory Offer.",
  },
  {
    question: "Does my teacher use Mewstro?",
    answer:
      "If they do, it&apos;s already paid for. Ask them for your studio&apos;s invite code — tap &lsquo;I have an invite code&rsquo; on first open, paste it in, and your account unlocks. Students never pay when invited by a teacher.",
  },
  {
    question: "What instruments does Mewstro support?",
    answer:
      "Any of them. Piano, guitar, voice, violin, drums, brass, woodwind — Mewstro is instrument-agnostic and lets you track multiple instruments with custom task types.",
  },
  {
    question: "Is my practice data private?",
    answer:
      "Yes. Sessions are stored on your device and synced to your own account. We use TelemetryDeck for privacy-first anonymised usage analytics — no personally identifiable information, no IP tracking, no ads, ever. We never sell your data.",
  },
];

function TeacherEscapeHatch() {
  return (
    <section className="bg-[#FFFBF7] px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#2D8B7E]/20 bg-white p-8 md:p-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#2D8B7E]">
              Does your teacher use Mewstro?
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#1A1A2E]">
              If they do, it&apos;s already paid for.
            </h2>
            <p className="mt-3 text-sm text-[#5A4E42]">
              Teacher-invited students get the full Mewstro experience free
              for as long as their teacher is subscribed. Just ask for the
              studio&apos;s invite code.
            </p>
          </div>
          <Link
            href="/mewstro/teachers/apply"
            className="inline-block whitespace-nowrap rounded-full border border-[#2D8B7E] px-5 py-2.5 text-sm font-semibold text-[#2D8B7E] hover:bg-[#2D8B7E]/5"
          >
            I&apos;m a teacher
          </Link>
        </div>
      </div>
    </section>
  );
}

function SoloPricingBand() {
  return (
    <section
      id="pricing"
      className="py-20"
      style={{ backgroundColor: mewstro.colors.surface }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-[#6B7280]">
            Solo learner pricing
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#1A1A2E] md:text-4xl">
            Free to start. Premium when you&apos;re ready.
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#E8DFD3] bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-[#1A1A2E]">Free</h3>
            <p className="mt-2 text-4xl font-bold text-[#1A1A2E]">£0</p>
            <p className="mt-2 text-sm text-[#5A4E42]">
              Everything you need to start a practice habit.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-[#5A4E42]">
              <li>✓ Practice timer, manual entry</li>
              <li>✓ 1 instrument</li>
              <li>✓ 7-day practice history</li>
              <li>✓ Daily streak counter</li>
              <li>✓ Mewstro (basic moods)</li>
              <li>✓ No ads, ever</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-[#2D8B7E] p-8 text-white shadow-2xl">
            <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-[#2D8B7E]">
              Most popular
            </span>
            <h3 className="mt-4 text-2xl font-bold">Premium</h3>
            <p className="mt-2 text-4xl font-bold">
              £6.99
              <span className="text-base font-normal text-white/80">
                {" "}
                / month
              </span>
            </p>
            <p className="mt-1 text-sm text-white/80">
              or £59.99/year · saves 28%
            </p>
            <p className="mt-3 text-sm text-white/90">
              Everything Mewstro can do. 7-day free trial via Apple.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>✓ Unlimited instruments</li>
              <li>✓ Full practice history</li>
              <li>✓ Milestone Moment videos</li>
              <li>✓ Repertoire with BPM</li>
              <li>✓ Apple Watch + all widgets</li>
              <li>✓ Full mascot (9 moods)</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-[#6B7280]">
          Prefer to pay once or see teacher pricing?{" "}
          <Link
            href="/mewstro/pricing"
            className="font-semibold text-[#2D8B7E] hover:underline"
          >
            See all pricing
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function FounderCard() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#E8DFD3] bg-[#FAF6EF] p-8 md:p-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <Image
            src="/mewstro/mascot.png"
            alt=""
            width={96}
            height={96}
            className="rounded-2xl"
          />
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6B7280]">
              Built by a piano learner
            </p>
            <h2 className="mt-1 text-2xl font-bold text-[#1A1A2E]">
              Started piano at 40. Built the app my teacher inspired.
            </h2>
            <p className="mt-3 text-sm text-[#5A4E42]">
              I&apos;m Mikey. I started piano just before my 40th birthday,
              built elaborate practice spreadsheets, and my teacher Ellie
              suggested I turn them into an app.
            </p>
            <Link
              href="/mewstro/story"
              className="mt-4 inline-block text-sm font-semibold text-[#2D8B7E] hover:underline"
            >
              Read the full story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MewstroSoloPage() {
  return (
    <>
      <MewstroJsonLd />
      <HeroSection brand={mewstro} />
      <FeatureGrid
        brand={mewstro}
        features={features}
        title="Everything you need to practise better"
        subtitle="Practice should feel good. Mewstro makes it feel great — for any instrument, any level."
      />
      <ScreenshotCarousel
        brand={mewstro}
        screenshots={screenshots}
        title="See it in action"
        subtitle="Widgets, Watch, mascot. All in one app."
      />
      <FounderCard />
      <TeacherEscapeHatch />
      <SoloPricingBand />
      <FaqSection brand={mewstro} faqs={faqs} />

      {/* Final CTA */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: mewstro.colors.surface }}
      >
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl font-bold text-[#1A1A2E] md:text-4xl">
            Ready to practise?
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            Download Mewstro free. Upgrade to Premium when you&apos;re ready
            for the full experience.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={mewstro.links.appStore}
              className="inline-block rounded-full bg-[#2D8B7E] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#246F64]"
            >
              Get Mewstro on the App Store
            </a>
            <Link
              href="/mewstro/pricing"
              className="inline-block rounded-full border border-[#E8DFD3] bg-white px-8 py-4 text-base font-semibold text-[#1A1A2E] hover:bg-[#FAF6EF]"
            >
              See all pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
