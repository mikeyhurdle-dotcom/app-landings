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
          Your child&apos;s music teacher uses Mewstro. Here&apos;s what that
          means for you.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">The short version</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Mewstro is an app that helps your child track their music practice.
              They tap a button when they start practising, and another when they
              stop. The app tracks how often they practise, builds daily streaks,
              and has an animated cat mascot who celebrates their sessions.
              Their teacher can see how much they&apos;ve been practising between
              lessons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Does it cost anything?</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              <strong>No.</strong> If your child&apos;s teacher uses Mewstro,
              it&apos;s free for your child. The teacher&apos;s subscription
              covers everyone in their studio. Your child enters an invite code
              during setup and gets the full app at no cost. No card required,
              no hidden charges.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Is it safe for children?</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed mb-3">
              Yes. Mewstro is rated 4+ on the App Store. Here&apos;s what we do
              (and don&apos;t do):
            </p>
            <ul className="text-[#5A4E42] text-sm leading-relaxed space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-[#2D8B7E] mt-0.5">✓</span>
                <span><strong>No ads.</strong> Not now, not ever. There are no banner ads, video ads, or sponsored content anywhere in the app.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2D8B7E] mt-0.5">✓</span>
                <span><strong>No data sales.</strong> Practice data stays private. We don&apos;t sell it, share it with advertisers, or use it for anything other than showing your child their progress.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2D8B7E] mt-0.5">✓</span>
                <span><strong>No messaging.</strong> Teachers can see practice activity, but they can&apos;t message students through Mewstro. There&apos;s no chat, no DMs, no social feed.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2D8B7E] mt-0.5">✓</span>
                <span><strong>No personal data shared.</strong> Teachers see weekly practice minutes and display name. Not email addresses, not private notes, not anything else.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2D8B7E] mt-0.5">✓</span>
                <span><strong>Data export and deletion.</strong> You can export all practice data as a CSV file, and delete the account at any time from Settings or by emailing us.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">What does their teacher see?</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              The teacher has a web dashboard that shows each student&apos;s
              weekly practice minutes, which instruments they played, their
              streak length, and any Milestone Moment recordings the student
              chose to save. The studio leaderboard ranks students by weekly
              minutes — it&apos;s meant to be a gentle motivator, not a
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
