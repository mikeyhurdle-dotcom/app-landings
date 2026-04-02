import type { Metadata } from "next";
import { mewstro } from "@/config/brands";
import { SupportForm } from "@/components/shared";

export const metadata: Metadata = {
  title: "Support",
};

export default function MewstroSupportPage() {
  return (
    <div
      className="py-20 px-6"
      style={{ backgroundColor: mewstro.colors.background }}
    >
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ color: mewstro.colors.text }}
        >
          How can we help?
        </h1>
        <p
          className="mt-4 text-lg"
          style={{ color: mewstro.colors.textDim }}
        >
          Got a question, found a bug, or just want to say hello? We&apos;d love
          to hear from you.
        </p>
      </div>
      <SupportForm brand={mewstro} />
    </div>
  );
}
