import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get in touch · Mewstro Teacher",
  robots: { index: false, follow: false },
};

export default function HelpContactPage() {
  return (
    <>
      <h1>Get in touch</h1>
      <p>
        You&apos;re the first teacher on Mewstro. That means I&apos;d rather
        hear from you too often than not enough — every message helps me
        sharpen the product before the next teacher arrives.
      </p>

      <h2>The quickest way to reach me</h2>
      <ul className="list-disc pl-6">
        <li>
          <strong>WhatsApp / iMessage:</strong> the number I gave you on the
          welcome card. Anything urgent — student can&apos;t join, dashboard
          looks broken — text me here. Reply usually inside an hour during the
          day.
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:mikey@mewstro.com">mikey@mewstro.com</a>. Best for
          longer thoughts, ideas, or things I should think about properly
          rather than fix on the spot.
        </li>
      </ul>

      <h2>What helps me help you faster</h2>
      <p>If something looks wrong, a one-line note and one of these helps a lot:</p>
      <ul className="list-disc pl-6">
        <li>
          A screenshot of what you&apos;re seeing (or what you expected to
          see).
        </li>
        <li>The name of the student involved, if it&apos;s student-specific.</li>
        <li>Roughly what time it happened.</li>
      </ul>
      <p>
        Don&apos;t worry about being technical. &ldquo;Sarah&apos;s minutes
        look wrong&rdquo; is plenty.
      </p>

      <h2>Ideas, feature requests, complaints</h2>
      <p>
        All welcome. Especially complaints — those are the most useful kind of
        message I get. If something annoys you, it&apos;ll annoy the next ten
        teachers too.
      </p>
    </>
  );
}
