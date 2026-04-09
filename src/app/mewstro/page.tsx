import Link from "next/link";
import { mewstro } from "@/config/brands";
import {
  HeroSection,
  FeatureGrid,
  ScreenshotCarousel,
  FaqSection,
} from "@/components/shared";
import { MewstroJsonLd, FaqJsonLd } from "@/components/shared/JsonLd";
import type { Feature, Screenshot } from "@/components/shared";

const features: Feature[] = [
  {
    icon: "\uD83C\uDFB5",
    title: "Studio Dashboard",
    description:
      "See every student's practice activity at a glance. Who practised, for how long, what they worked on. Click any student for the full picture.",
  },
  {
    icon: "\uD83C\uDFC6",
    title: "Studio Leaderboard",
    description:
      "A weekly ranking of your students by practice minutes. Tonara's teachers called this the single biggest driver of student practice — we rebuilt it with a cleaner invite flow.",
  },
  {
    icon: "\uD83D\uDCF9",
    title: "Milestone Moments",
    description:
      "Students capture a short video when a tricky passage finally clicks. You see every breakthrough in their detail view, not just the final result.",
  },
  {
    icon: "\u23F1\uFE0F",
    title: "Practice Timer",
    description:
      "Students start focused sessions with one tap, tracked by instrument and task type. Scales, sight-reading, repertoire, technique, and more.",
  },
  {
    icon: "\uD83D\uDD25",
    title: "Streaks & Heatmaps",
    description:
      "Consecutive-day streaks and a 90-day calendar heatmap per student. Fast visual scan of who's consistent and who's slipping.",
  },
  {
    icon: "\uD83D\uDCE8",
    title: "Weekly Digest",
    description:
      "A summary email every week of what your whole studio did. No dashboard login required if you just want the top line.",
  },
];

// Replace these with real app screenshots — drop PNGs into public/mewstro/screens/
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

// Testimonials intentionally omitted for v1 launch. We will not use fabricated
// quotes with placeholder authors — real quotes will be added once Mewstro has
// real users who have opted in to being featured. See Docs/Architecture/
// Outreach-Drafts-Apr2026.md for the honesty rules driving this decision.

function TeacherSection() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: mewstro.colors.background }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl overflow-hidden bg-[#2D8B7E]">
          <div className="px-8 md:px-16 py-16 md:py-20 text-center md:text-left">
            <div className="max-w-2xl mx-auto md:mx-0">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                For music teachers
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                The practice tool your students will actually use
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl">
                See your whole studio&apos;s practice activity in one
                dashboard. Built in partnership with Ellie Moorhouse, a
                working music teacher. 30-day free trial, no card charge
                until day 31.
              </p>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Studio dashboard on the web",
                  "Per-student practice detail",
                  "Studio leaderboard",
                  "Milestone Moment videos",
                  "Weekly digest email",
                  "One invite code per studio",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="text-white">&#10003;</span>
                    {feature}
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/mewstro/pricing"
                  className="inline-block rounded-full px-8 py-3 text-sm font-semibold bg-white text-[#2D8B7E] transition-transform hover:scale-105"
                >
                  See pricing
                </Link>
                <a
                  href={mewstro.links.appStore}
                  className="inline-block rounded-full px-8 py-3 text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  Get the app
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SoloLearnerSection() {
  return (
    <section className="py-16 px-6 bg-[#FFFBF7]">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-wider text-[#6B7280] mb-2">
          No teacher? No problem.
        </p>
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: mewstro.colors.text }}>
          Solo learners welcome too
        </h2>
        <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: mewstro.colors.textDim }}>
          Download Mewstro free and practise at your own pace. Upgrade to
          Premium for £6.99/mo (or £59.99/yr) to unlock Milestone Moments,
          repertoire tracking, planner, Apple Watch, and everything else.
          7-day free trial, no card required up front.
        </p>
        <div className="mt-6">
          <Link
            href="/mewstro/pricing"
            className="text-sm font-semibold text-[#2D8B7E] hover:underline"
          >
            See all pricing options →
          </Link>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "How does teacher pricing work?",
    answer:
      "Teachers pay a simple monthly fee: Studio is £14.99/mo for up to 25 students, Studio Unlimited is £24.99/mo for unlimited students. Every student in your studio gets the full Mewstro experience included. Students never pay. Annual options save roughly 17%. 30-day free trial, card required at signup, no charge until day 31.",
  },
  {
    question: "What do students get?",
    answer:
      "Everything Mewstro can do. Practice timer, streak tracking, repertoire with BPM, weekly planner, Milestone Moment videos, Apple Watch app, Siri Shortcuts, daily reminders, the full mascot experience, CSV export. Plus the community layer only they see: studio leaderboard, teacher-set challenges, and an assignment inbox.",
  },
  {
    question: "What if I'm a solo learner without a teacher?",
    answer:
      "You can still use Mewstro. Download it free, track practice, build streaks, use the metronome. Upgrade to Premium for £6.99/mo (or £59.99/yr — saves 28%) to unlock Milestone Moments, repertoire, planner, Watch app, and everything else. Your first 7 days of Premium are free via Apple's Introductory Offer.",
  },
  {
    question: "What instruments does Mewstro support?",
    answer:
      "Mewstro is instrument-agnostic — piano, guitar, violin, drums, voice, brass, woodwinds, and anything else. You can track multiple instruments with custom task types.",
  },
  {
    question: "How does the invite code work?",
    answer:
      "When a teacher subscribes, they get an invite code from their dashboard. They share it with their students. Students download Mewstro, tap 'I have an invite code' during onboarding, paste the code, and the app unlocks. Apple handles the redemption through StoreKit — no card required on the student's side.",
  },
  {
    question: "Is my practice data private?",
    answer:
      "Yes. Practice data is stored locally on your device and synced to your own Supabase account. We use TelemetryDeck for privacy-first anonymised usage analytics — no personally identifiable information, no IP tracking, no cross-app identifiers, no ads ever. We never sell your data.",
  },
];

export default function MewstroPage() {
  return (
    <>
      <MewstroJsonLd />
      <FaqJsonLd faqs={faqs} />
      <HeroSection brand={mewstro} />
      <TeacherSection />
      <FeatureGrid
        brand={mewstro}
        features={features}
        title="Everything your studio needs in one place"
        subtitle="Built around what actually drives practice: visibility for you, gamification for your students, and a mascot that makes showing up feel good."
      />
      <ScreenshotCarousel
        brand={mewstro}
        screenshots={screenshots}
        title="See it in action"
        subtitle="The dashboard you get, and the app your students use."
      />
      <SoloLearnerSection />
      <FaqSection brand={mewstro} faqs={faqs} />

      {/* Final CTA */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: mewstro.colors.surface }}
      >
        <div className="mx-auto max-w-2xl px-6">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: mewstro.colors.text }}
          >
            Ready to try it with your studio?
          </h2>
          <p
            className="mt-4 text-lg"
            style={{ color: mewstro.colors.textDim }}
          >
            30 days free. See pricing, or start your trial below.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/mewstro/pricing"
              className="inline-block rounded-full px-8 py-4 text-base font-semibold bg-[#2D8B7E] text-white hover:bg-[#246F64] transition-colors"
            >
              See pricing
            </Link>
            <a
              href={mewstro.links.appStore}
              className="inline-block rounded-full px-8 py-4 text-base font-semibold border border-[#E8DFD3] text-[#1A1A2E] bg-white hover:bg-[#FAF6EF] transition-colors"
            >
              Download the app
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
