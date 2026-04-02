import type { Brand } from "@/config/brands";

type SoftwareApplicationJsonLd = {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers?: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    ratingCount: string;
  };
  image?: string;
  author?: {
    "@type": "Organization";
    name: string;
    url: string;
  };
};

export function MewstroJsonLd() {
  const data: SoftwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mewstro — Practice Companion",
    description:
      "Music practice tracker with animated cat mascot. Track sessions, build streaks, earn achievements, and master your craft. Free for teachers.",
    url: "https://mewstro.app",
    applicationCategory: "MusicApplication",
    operatingSystem: "iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    image: "https://mewstro.app/mewstro/mascot.webp",
    author: {
      "@type": "Organization",
      name: "Mewstro",
      url: "https://mewstro.app",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SmashdJsonLd() {
  const data: SoftwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SMASHD — The Community Hub for Padel",
    description:
      "Run Americano padel tournaments, submit live scores courtside, track leaderboards, and grow your padel community. Free for players and organisers.",
    url: "https://getsmashd.app",
    applicationCategory: "SportsApplication",
    operatingSystem: "iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    image: "https://getsmashd.app/smashd/logo-on-dark.png",
    author: {
      "@type": "Organization",
      name: "SMASHD",
      url: "https://getsmashd.app",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
