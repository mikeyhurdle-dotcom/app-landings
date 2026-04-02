"use client";

import { useState } from "react";
import type { Brand } from "@/config/brands";

export function SupportForm({ brand }: { brand: Brand }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-2xl">
      {submitted ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{
            backgroundColor: brand.colors.surface,
            border: `1px solid ${brand.colors.textDim}15`,
          }}
        >
          <div className="text-4xl mb-4">&#10003;</div>
          <h3
            className="text-xl font-bold"
            style={{ color: brand.colors.text }}
          >
            Message sent!
          </h3>
          <p className="mt-2 text-sm" style={{ color: brand.colors.textDim }}>
            We&apos;ll get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2"
              style={{ color: brand.colors.text }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-shadow focus:ring-2"
              style={{
                backgroundColor: brand.colors.surface,
                color: brand.colors.text,
                border: `1px solid ${brand.colors.textDim}33`,
                // @ts-expect-error CSS custom property for ring color
                "--tw-ring-color": brand.colors.primary,
              }}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: brand.colors.text }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-shadow focus:ring-2"
              style={{
                backgroundColor: brand.colors.surface,
                color: brand.colors.text,
                border: `1px solid ${brand.colors.textDim}33`,
              }}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2"
              style={{ color: brand.colors.text }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 resize-none"
              style={{
                backgroundColor: brand.colors.surface,
                color: brand.colors.text,
                border: `1px solid ${brand.colors.textDim}33`,
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: brand.colors.primary,
              color: brand.colors.primaryForeground,
            }}
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
