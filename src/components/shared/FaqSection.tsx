"use client";

import { useState } from "react";
import type { Brand } from "@/config/brands";

type Faq = {
  question: string;
  answer: string;
};

function FaqItem({ faq, brand }: { faq: Faq; brand: Brand }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b last:border-b-0"
      style={{ borderColor: `${brand.colors.textDim}22` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span
          className="text-base font-medium pr-4"
          style={{ color: brand.colors.text }}
        >
          {faq.question}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke={brand.colors.textDim}
          strokeWidth="2"
          className={`flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>
      {open && (
        <p
          className="pb-5 text-sm leading-relaxed"
          style={{ color: brand.colors.textDim }}
        >
          {faq.answer}
        </p>
      )}
    </div>
  );
}

export function FaqSection({
  brand,
  faqs,
}: {
  brand: Brand;
  faqs: Faq[];
}) {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: brand.colors.background }}
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ color: brand.colors.text }}
        >
          Frequently Asked Questions
        </h2>
        <div
          className="rounded-2xl px-6 md:px-8"
          style={{
            backgroundColor: brand.colors.surface,
            border: `1px solid ${brand.colors.textDim}15`,
          }}
        >
          {faqs.map((faq) => (
            <FaqItem key={faq.question} faq={faq} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
