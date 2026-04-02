import { mewstro } from "@/config/brands";
import {
  HeroSection,
  FeatureGrid,
  PricingTable,
  TestimonialSection,
  ScreenshotCarousel,
} from "@/components/shared";
import type { Feature, PricingTier, Testimonial, Screenshot } from "@/components/shared";

const features: Feature[] = [
  {
    icon: "\u23F1\uFE0F",
    title: "Practice Timer",
    description:
      "Start a focused session with one tap. Track your time by instrument and task type — scales, sight-reading, repertoire, technique, and more.",
  },
  {
    icon: "\uD83D\uDD25",
    title: "Streaks & Heatmaps",
    description:
      "Build daily practice streaks and watch your calendar fill with colour. See exactly when you practised and for how long at a glance.",
  },
  {
    icon: "\u2B55",
    title: "Activity Rings",
    description:
      "Apple Watch-inspired daily, weekly, and monthly rings that close as you hit your goals. A beautiful way to visualise consistency.",
  },
  {
    icon: "\uD83C\uDFB5",
    title: "Repertoire Management",
    description:
      "Organise the pieces you're learning, polishing, or have mastered. Track practice time per piece and set target completion dates.",
  },
  {
    icon: "\uD83D\uDC31",
    title: "Mewstro the Mascot",
    description:
      "Your animated cat conductor reacts to your practice in real time. Watch him warm up, get in the zone, celebrate your achievements, and even fall asleep if you skip a day.",
  },
  {
    icon: "\uD83D\uDCF1",
    title: "Widgets & Watch App",
    description:
      "Home Screen, Lock Screen, and Apple Watch widgets keep you motivated. Start sessions from your wrist — perfect when your phone is on a music stand.",
  },
];

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    description: "Everything you need to start building your practice habit.",
    features: [
      "Practice timer (3 instruments)",
      "Basic session logging",
      "7-day practice history",
      "Basic mascot animations",
      "1 Home Screen widget",
      "Studio leaderboard",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: "$5.99",
    period: "one-time",
    description: "Unlock everything. Pay once, keep forever.",
    features: [
      "Unlimited instruments",
      "Full practice history",
      "All widgets & Watch app",
      "Achievements & badges",
      "Repertoire management",
      "Weekly planner",
      "Themes & data export",
      "Full mascot experience",
    ],
    highlighted: true,
    cta: "Upgrade to Pro",
  },
  {
    name: "Social Pass",
    price: "$1.99",
    period: "/month",
    description: "Practise with friends and compete together.",
    features: [
      "Everything in Pro",
      "Leaderboards",
      "Shareable practice cards",
      "Community challenges",
      "Weekly summary reports",
    ],
    cta: "Join the Community",
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

const testimonials: Testimonial[] = [
  {
    quote:
      "Mewstro has completely transformed my students' practice habits. They actually want to practise now!",
    author: "Coming Soon",
    role: "Piano Teacher",
  },
  {
    quote:
      "The streak feature is addictive in the best way. I've practised every day for 3 months straight.",
    author: "Coming Soon",
    role: "Guitar Student",
  },
  {
    quote:
      "Finally a practice app that's beautiful, simple, and doesn't try to sell me a subscription every 5 minutes.",
    author: "Coming Soon",
    role: "Violin Player",
  },
];

function TeacherSection() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: mewstro.colors.background }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl overflow-hidden" style={{ backgroundColor: mewstro.colors.accent }}>
          <div className="px-8 md:px-16 py-16 md:py-20 text-center md:text-left">
            <div className="max-w-2xl mx-auto md:mx-0">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                For Teachers
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Free for teachers — forever
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl">
                Set up your studio, see how your students practise, and keep everyone motivated. No cost, no catch.
              </p>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Unlimited students",
                  "View practice data",
                  "Studio leaderboard",
                  "Lesson notes",
                  "Practice reminders",
                  "Studio analytics",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="text-white">&#10003;</span>
                    {feature}
                  </div>
                ))}
              </div>
              <a
                href={mewstro.links.appStore}
                className="inline-block mt-10 rounded-full px-8 py-3 text-sm font-semibold bg-white transition-transform hover:scale-105"
                style={{ color: mewstro.colors.accent }}
              >
                Set Up Your Studio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MewstroPage() {
  return (
    <>
      <HeroSection brand={mewstro} />
      <FeatureGrid
        brand={mewstro}
        features={features}
        title="Everything you need to practise better"
        subtitle="From one-tap timers to a living mascot that celebrates every milestone."
      />
      <ScreenshotCarousel
        brand={mewstro}
        screenshots={screenshots}
        title="See it in action"
        subtitle="Beautiful progress tracking that makes practice feel rewarding."
      />
      <PricingTable brand={mewstro} tiers={pricingTiers} />
      <TeacherSection />
      <TestimonialSection brand={mewstro} testimonials={testimonials} />

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
            Ready to meet your new practice companion?
          </h2>
          <p
            className="mt-4 text-lg"
            style={{ color: mewstro.colors.textDim }}
          >
            Download Mewstro free and start building your streak today.
          </p>
          <a
            href={mewstro.links.appStore}
            className="inline-block mt-8 rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
            style={{
              backgroundColor: mewstro.colors.primary,
              color: mewstro.colors.primaryForeground,
            }}
          >
            Download on the App Store
          </a>
        </div>
      </section>
    </>
  );
}
