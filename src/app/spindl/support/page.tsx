import type { Metadata } from "next";
import { spindl } from "@/config/brands";
import { SupportForm } from "@/components/shared";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Spindl. Send a message and Mikey will personally reply.",
  alternates: { canonical: "/spindl/support" },
};

const SERIF = "var(--font-fraunces)";

export default function SpindlSupportPage() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p
          className="text-xs uppercase tracking-[0.18em]"
          style={{ color: spindl.colors.textDim }}
        >
          Support
        </p>
        <h1
          className="mt-3 text-4xl md:text-5xl"
          style={{
            color: spindl.colors.text,
            fontFamily: SERIF,
            fontWeight: 500,
          }}
        >
          Get in touch.
        </h1>
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ color: spindl.colors.textDim }}
        >
          Spindl is built by one person. Drop a note below, or email{" "}
          <a
            href="mailto:mikey@spindlapp.com"
            style={{ color: spindl.colors.primary }}
            className="font-semibold underline decoration-dotted underline-offset-4"
          >
            mikey@spindlapp.com
          </a>{" "}
          directly. I read everything and reply within a day or two.
        </p>
      </div>
      <div className="mt-12">
        <SupportForm brand={spindl} />
      </div>
    </div>
  );
}
