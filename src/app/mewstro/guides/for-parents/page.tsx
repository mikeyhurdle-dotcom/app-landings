import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "For Parents: What Mewstro Is",
  description: "A quick overview of Mewstro for parents of music students. What it does, how it works, and why it's safe.",
};

export default function ForParentsPage() {
  return (
    <div className="py-20 px-6 bg-[#FFFBF7]">
      <div className="mx-auto max-w-2xl">
        <Link href="/mewstro/guides" className="text-sm text-[#2D8B7E] hover:underline mb-6 inline-block">
          ← All guides
        </Link>

        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-3">For parents: what Mewstro is</h1>
        <p className="text-lg text-[#6B7280] mb-12">
          Your child&apos;s music teacher uses Mewstro. Here&apos;s what
          that actually means for you.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">The short version</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Mewstro is an app that helps your child track their music
              practice. They tap a button when they start a session and
              another one when they stop. The app tracks how often they
              practise and builds a daily streak, and it has an animated
              cat mascot who celebrates their sessions. Their teacher can
              see how much they&apos;ve been practising between lessons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Does it cost anything?</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Honestly, not a thing. If your child&apos;s teacher uses
              Mewstro, it&apos;s included in their subscription. Your
              child enters the teacher&apos;s invite code during setup
              and gets the full app at no cost. There&apos;s no card to
              enter and no hidden charges along the way.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Is it safe for children?</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed mb-3">
              Yes. Mewstro is rated 4+ on the App Store. Here&apos;s the
              honest picture of what&apos;s in the app and what
              isn&apos;t.
            </p>
            <ul className="text-[#5A4E42] text-sm leading-relaxed space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-[#2D8B7E] mt-0.5">✓</span>
                <span><strong>Ad-free, always.</strong> There are no banner ads, video ads, or sponsored content anywhere in the app, and that isn&apos;t going to change.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2D8B7E] mt-0.5">✓</span>
                <span><strong>Your child&apos;s data stays private.</strong> I don&apos;t sell it, share it with advertisers, or use it for anything other than showing your child their progress and their teacher the studio-level view.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2D8B7E] mt-0.5">✓</span>
                <span><strong>Nothing social in the app.</strong> Teachers can see practice activity, but they can&apos;t message students through Mewstro. There&apos;s no chat, no DMs, and no social feed.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2D8B7E] mt-0.5">✓</span>
                <span><strong>Teachers see practice, not personal details.</strong> What a teacher sees is weekly practice minutes and the display name. Not email addresses, not private notes, not anything else.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2D8B7E] mt-0.5">✓</span>
                <span><strong>Data export and account deletion.</strong> You can export all practice data as a CSV file, and delete the account at any time from Settings or by emailing us.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">What does their teacher see?</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              The teacher has a web dashboard that shows each
              student&apos;s weekly practice minutes, which instruments
              they played, their streak length, and any Milestone Moment
              recordings the student chose to save. The studio
              leaderboard ranks students by weekly minutes, and
              it&apos;s meant as a gentle motivator rather than a
              competition.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">How to set it up</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              If your child is old enough to manage it themselves, they can
              follow the <Link href="/mewstro/guides/getting-started" className="text-[#2D8B7E] hover:underline">getting started guide</Link>.
              For younger children, you might want to set up the account for
              them — you&apos;ll need an email address (yours is fine) and the
              invite code from their teacher.
            </p>
            <p className="text-[#5A4E42] text-sm leading-relaxed mt-3">
              The whole thing takes about two minutes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Questions?</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              If you have any questions about Mewstro, privacy, or how your
              child&apos;s data is handled, get in touch at{" "}
              <a href="mailto:support@mewstro.com" className="text-[#2D8B7E] hover:underline">
                support@mewstro.com
              </a>{" "}
              or visit our{" "}
              <Link href="/mewstro/privacy" className="text-[#2D8B7E] hover:underline">
                privacy policy
              </Link>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[#E8DFD3]">
          <div className="flex items-center gap-4">
            <Image
              src="/mewstro/app-icon.png"
              alt="Mewstro"
              width={48}
              height={48}
              className="rounded-xl"
            />
            <div>
              <p className="text-sm font-bold text-[#1A1A2E]">Ready to download?</p>
              <Link href="/mewstro" className="text-sm text-[#2D8B7E] hover:underline">
                Get Mewstro from the App Store →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
