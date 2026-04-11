import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Teachers: Setting Up Your Studio",
  description: "How to create your Mewstro studio, invite students, and use the teacher dashboard to track practice.",
};

function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div className="my-4 rounded-2xl border-2 border-dashed border-[#E8DFD3] bg-[#FAF6EF] p-8 text-center text-sm text-[#6B7280]">
      📱 Screenshot: {label}
    </div>
  );
}

export default function TeacherSetupPage() {
  return (
    <div className="py-20 px-6 bg-[#FFFBF7]">
      <div className="mx-auto max-w-2xl">
        <Link href="/mewstro/guides" className="text-sm text-[#2D8B7E] hover:underline mb-6 inline-block">
          ← All guides
        </Link>

        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-3">For teachers: setting up your studio</h1>
        <p className="text-lg text-[#6B7280] mb-12">
          Get your studio on Mewstro and see every student&apos;s practice at a glance.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">How Mewstro works for teachers</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              You subscribe to a Studio plan on the web. Your students download
              the free Mewstro app and enter your invite code. From that point,
              you can see who&apos;s practising, how much, and what they&apos;re
              working on — all from your browser. Your students never pay.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Step 1: Sign up for a Studio plan</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Go to <Link href="/mewstro/pricing" className="text-[#2D8B7E] hover:underline">mewstro.com/pricing</Link> and
              pick the plan that fits your studio size:
            </p>
            <ul className="text-[#5A4E42] text-sm leading-relaxed list-disc list-inside space-y-1 ml-1 mt-3">
              <li><strong>Studio</strong> (£14.99/mo) — up to 25 students</li>
              <li><strong>Studio Unlimited</strong> (£24.99/mo) — unlimited students</li>
            </ul>
            <p className="text-[#5A4E42] text-sm leading-relaxed mt-3">
              Both come with a 30-day free trial. You won&apos;t be charged
              until day 31, and you&apos;ll get a reminder email on day 23.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Step 2: Set up your dashboard</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Once you&apos;ve subscribed, you&apos;ll get access to your teacher
              dashboard. It&apos;s a web app — no download needed, works on your
              laptop, tablet, or phone browser. From here you can see:
            </p>
            <ul className="text-[#5A4E42] text-sm leading-relaxed list-disc list-inside space-y-1 ml-1 mt-3">
              <li>Every student&apos;s practice activity at a glance</li>
              <li>Weekly practice minutes per student</li>
              <li>Your studio leaderboard (ranked by weekly minutes)</li>
              <li>Practice heatmaps and trends for each student</li>
              <li>Milestone Moment recordings your students have captured</li>
            </ul>
            <ScreenshotPlaceholder label="Teacher dashboard overview" />
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Step 3: Invite your students</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Your dashboard gives you an invite code — one code for your whole
              studio. Share it with your students however you normally
              communicate: in a lesson, by text, in an email, or printed on a
              handout (we&apos;ve got a <Link href="/mewstro/guides/getting-started" className="text-[#2D8B7E] hover:underline">one-pager you can print</Link> for this).
            </p>
            <p className="text-[#5A4E42] text-sm leading-relaxed mt-3">
              Students download the Mewstro app (free on the App Store), enter
              your code during onboarding, and they&apos;re in. Full app access,
              no cost to them. The code unlocks everything — practice timer,
              streaks, repertoire, planner, milestones, the lot.
            </p>
            <ScreenshotPlaceholder label="Invite code on teacher dashboard" />
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">What you can see (and what you can&apos;t)</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed mb-3">
              Mewstro is deliberately designed so teachers see practice activity,
              not personal data.
            </p>
            <div className="rounded-xl border border-[#E8DFD3] bg-white p-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold text-[#2D8B7E] mb-2">You can see</p>
                  <ul className="text-[#5A4E42] space-y-1">
                    <li>Weekly practice minutes</li>
                    <li>Which instruments and task types</li>
                    <li>Streak length</li>
                    <li>Milestone Moment recordings</li>
                    <li>Assignment completions</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-[#1A1A2E] mb-2">You can&apos;t see</p>
                  <ul className="text-[#5A4E42] space-y-1">
                    <li>Private session notes</li>
                    <li>Focus ratings</li>
                    <li>Email addresses or personal details</li>
                    <li>Data from other studios</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">The weekly digest</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Every Monday, you&apos;ll get an email summary of your studio&apos;s
              week: who practised, total minutes, top streaks, and who might
              need a nudge. You don&apos;t need to open the dashboard if you
              just want the headline.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[#E8DFD3]">
          <p className="text-sm text-[#6B7280] mb-3">Next up:</p>
          <Link
            href="/mewstro/guides/for-parents"
            className="text-[#2D8B7E] font-semibold hover:underline"
          >
            For parents: what Mewstro is →
          </Link>
        </div>
      </div>
    </div>
  );
}
