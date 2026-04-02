import { smashd } from "@/config/brands";
import {
  HeroSection,
  FeatureGrid,
  PricingTable,
  TestimonialSection,
  ScreenshotCarousel,
  FaqSection,
} from "@/components/shared";
import { SmashdJsonLd, FaqJsonLd } from "@/components/shared/JsonLd";
import type { Feature, PricingTier, Testimonial, Screenshot } from "@/components/shared";

const features: Feature[] = [
  {
    icon: "\uD83C\uDFC6",
    title: "Americano Tournaments",
    description:
      "Run Americano-format tournaments for 8-16 players with rotating partners, automatic round generation, and fair pairing algorithms.",
  },
  {
    icon: "\uD83D\uDCCA",
    title: "Live Scoring",
    description:
      "Submit scores courtside in real-time. Fixed-point system (24 per match) auto-calculates opponent scores and updates leaderboards instantly.",
  },
  {
    icon: "\uD83E\uDD47",
    title: "Leaderboards",
    description:
      "Individual cumulative points across all rounds. See who's climbing and who's chasing. Real-time updates via Supabase Realtime.",
  },
  {
    icon: "\uD83D\uDCF1",
    title: "QR Code Join",
    description:
      "Players join tournaments instantly via QR code or share code. No account needed to start playing — ghost profiles are created automatically.",
  },
  {
    icon: "\uD83C\uDFBE",
    title: "Club Directory",
    description:
      "Find padel clubs near you, explore their courts, and see upcoming tournaments. Clubs get their own public profile page.",
  },
  {
    icon: "\uD83D\uDC64",
    title: "Player Profiles",
    description:
      "Track your tournament history, win rate, and match stats. Share your profile with a public link — your padel CV.",
  },
];

const pricingTiers: PricingTier[] = [
  {
    name: "Player",
    price: "Free",
    description: "Join tournaments and track your results.",
    features: [
      "Join unlimited tournaments",
      "Live scoring",
      "Player profile & stats",
      "Tournament history",
      "Club directory access",
    ],
    cta: "Download Free",
  },
  {
    name: "Organiser",
    price: "Free",
    description: "Create and manage tournaments for your community.",
    features: [
      "Everything in Player",
      "Create unlimited tournaments",
      "QR code player joining",
      "Score management & overrides",
      "Export results",
      "Tournament templates",
    ],
    highlighted: true,
    cta: "Start Organising",
  },
  {
    name: "Club",
    price: "Coming Soon",
    description: "Branded club experience with advanced features.",
    features: [
      "Everything in Organiser",
      "Custom club page",
      "Recurring tournaments",
      "Member management",
      "Analytics dashboard",
      "Priority support",
    ],
    cta: "Join Waitlist",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "We used to manage tournaments with a whiteboard and a spreadsheet. SMASHD has completely changed how we run our weekly Americano.",
    author: "Coming Soon",
    role: "Club Organiser",
  },
  {
    quote:
      "The live leaderboard creates such a buzz courtside. Everyone's checking their phone between games.",
    author: "Coming Soon",
    role: "Padel Player",
  },
  {
    quote:
      "Being able to share my player profile and tournament results is brilliant. It's like Strava but for padel.",
    author: "Coming Soon",
    role: "Padel Player",
  },
];

const screenshots: Screenshot[] = [
  {
    src: "/smashd/screens/home-feed.png",
    alt: "Home feed with tournament activity",
    caption: "Your tournament feed",
  },
  {
    src: "/smashd/screens/live-scoring.png",
    alt: "Live scoring courtside",
    caption: "Score matches courtside",
  },
  {
    src: "/smashd/screens/leaderboard.png",
    alt: "Tournament results and MVP",
    caption: "Results & MVP podium",
  },
  {
    src: "/smashd/screens/player-stats.png",
    alt: "Player stats and rating progression",
    caption: "Track your form & rating",
  },
  {
    src: "/smashd/screens/player-profile.png",
    alt: "Player profile with level and insights",
    caption: "Your padel CV",
  },
  {
    src: "/smashd/screens/club-directory.png",
    alt: "Discover events and clubs",
    caption: "Find events near you",
  },
];

function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Create a Tournament",
      description:
        "Set up an Americano tournament in seconds. Choose the number of rounds, points per match, and invite players.",
    },
    {
      number: "2",
      title: "Players Join via QR",
      description:
        "Share a code or QR — players join instantly. No app download required to get started.",
    },
    {
      number: "3",
      title: "Score Live",
      description:
        "One player per match submits the score. Opponent points are auto-calculated. Leaderboard updates in real-time.",
    },
    {
      number: "4",
      title: "Celebrate & Share",
      description:
        "See final standings, share results, and grow your player profile with every tournament.",
    },
  ];

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: smashd.colors.surface }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: smashd.colors.text }}
          >
            How It Works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full text-2xl font-bold mb-4"
                style={{
                  backgroundColor: smashd.colors.primary,
                  color: smashd.colors.primaryForeground,
                }}
              >
                {step.number}
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: smashd.colors.text }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: smashd.colors.textDim }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "What is an Americano tournament?",
    answer:
      "Americano is a padel format where 8-16 players rotate partners each round. Each match has a fixed total of 24 points (if you score 14, your opponent gets 10). Individual points are cumulated across all rounds to determine the final leaderboard.",
  },
  {
    question: "Is SMASHD free?",
    answer:
      "Yes! SMASHD is completely free for both players and organisers. Join unlimited tournaments, submit live scores, and track your stats at no cost.",
  },
  {
    question: "Do players need to download the app to join?",
    answer:
      "Players can join a tournament via QR code or share code. Organisers can create ghost profiles for players who don't have an account yet — they can claim their profile later.",
  },
  {
    question: "How does live scoring work?",
    answer:
      "One player per match enters their team's score courtside. The opponent's score is auto-calculated (24 minus your score). The leaderboard updates in real-time for everyone.",
  },
  {
    question: "Can I use SMASHD for my padel club?",
    answer:
      "Yes! Club features are coming soon, including custom club pages, recurring tournaments, member management, and analytics. Players can already discover clubs and events in the Discover tab.",
  },
];

export default function SmashdPage() {
  return (
    <>
      <SmashdJsonLd />
      <FaqJsonLd faqs={faqs} />
      <HeroSection brand={smashd} />
      <FeatureGrid
        brand={smashd}
        features={features}
        title="Built for the court"
        subtitle="Everything you need to run, play, and grow your padel community."
      />
      <ScreenshotCarousel
        brand={smashd}
        screenshots={screenshots}
        title="See it in action"
        subtitle="From tournament creation to final standings — all from your phone."
      />
      <HowItWorksSection />
      <PricingTable brand={smashd} tiers={pricingTiers} />
      <TestimonialSection brand={smashd} testimonials={testimonials} />
      <FaqSection brand={smashd} faqs={faqs} />

      {/* Final CTA */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: smashd.colors.surface }}
      >
        <div className="mx-auto max-w-2xl px-6">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: smashd.colors.text }}
          >
            Ready to level up your padel?
          </h2>
          <p
            className="mt-4 text-lg"
            style={{ color: smashd.colors.textDim }}
          >
            Download SMASHD and run your first tournament today.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href={smashd.links.appStore}
              className="inline-block rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
              style={{
                backgroundColor: smashd.colors.primary,
                color: smashd.colors.primaryForeground,
              }}
            >
              Download on the App Store
            </a>
            {smashd.links.playStore && (
              <a
                href={smashd.links.playStore}
                className="inline-block rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
                style={{
                  backgroundColor: smashd.colors.secondary,
                  color: "#FFFFFF",
                }}
              >
                Get on Google Play
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
