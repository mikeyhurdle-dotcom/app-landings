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
      "Music practice tracker with animated cat mascot. Track sessions, build streaks, earn achievements, and master your craft.",
    url: "https://mewstro.com",
    applicationCategory: "MusicApplication",
    operatingSystem: "iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    image: "https://mewstro.com/mewstro/app-icon.png",
    author: {
      "@type": "Organization",
      name: "Mewstro",
      url: "https://mewstro.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SpindlJsonLd() {
  const data: SoftwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Spindl — Reading Tracker & Journal",
    description:
      "A native iOS reading tracker and journal. Track books across four shelves, log reading sessions, keep an honest per-book journal, and watch Spindl the hedgehog react to your streak. No Amazon, no algorithmic feed.",
    url: "https://spindlapp.com",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
    image: "https://spindlapp.com/spindl/app-icon.png",
    author: {
      "@type": "Organization",
      name: "Spindl",
      url: "https://spindlapp.com",
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
