import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building Streaks",
  description: "How practice streaks work in Mewstro, what the calendar heatmap shows, and tips for staying consistent.",
};

function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div className="my-4 rounded-2xl border-2 border-dashed border-[#E8DFD3] bg-[#FAF6EF] p-8 text-center text-sm text-[#6B7280]">
      📱 Screenshot: {label}
    </div>
  );
}

export default function StreaksPage() {
  return (
    <div className="py-20 px-6 bg-[#FFFBF7]">
      <div className="mx-auto max-w-2xl">
        <Link href="/mewstro/guides" className="text-sm text-[#2D8B7E] hover:underline mb-6 inline-block">
          ← All guides
        </Link>

        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-3">Building streaks</h1>
        <p className="text-lg text-[#6B7280] mb-12">
          Streaks are the simplest way to build consistency. Here&apos;s how they work.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">What counts as a streak day?</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Any day you log at least one practice session — timed or manual —
              counts. It doesn&apos;t matter if it&apos;s five minutes or five
              hours. The point is showing up. Your streak number shows on the
              Practice tab, right under Mewstro.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">The calendar heatmap</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Open the Calendar tab and you&apos;ll see your last 90 days as a
              grid. Each day you practised is filled in green — the more you
              practised, the darker the square. Days you missed stay empty.
              It&apos;s a quick visual scan of how consistent you&apos;ve been.
            </p>
            <ScreenshotPlaceholder label="Calendar heatmap with 90-day view" />
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Activity rings</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Below the heatmap you&apos;ll see three rings — daily, weekly,
              and monthly. These fill up as you hit your practice goals. You
              set your daily goal during onboarding (you can change it any time
              in Settings &gt; Goals). The weekly and monthly rings are
              calculated from your daily target.
            </p>
            <ScreenshotPlaceholder label="Activity rings on Calendar tab" />
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">What happens if you miss a day?</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Your streak resets to zero. Mewstro doesn&apos;t guilt you about
              it — the cat just falls asleep. When you come back, you start
              building again from day one. If you genuinely did practise but
              forgot to log it, you can add a manual entry for a past date to
              save your streak.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Streak badges</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Hit certain milestones and you&apos;ll unlock streak badges — 3
              days, 7 days, 14 days, 30 days, and beyond. These show up in your
              Achievements and Mewstro celebrates each one. They&apos;re yours
              to keep even if your streak breaks later.
            </p>
            <ScreenshotPlaceholder label="Streak badge unlock with Mewstro celebrating" />
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Tips for keeping it going</h2>
            <ul className="text-[#5A4E42] text-sm leading-relaxed list-disc list-inside space-y-2 ml-1">
              <li>Turn on daily reminders in Settings — Mewstro will nudge you at the time you choose</li>
              <li>Put the Mewstro widget on your home screen so your streak is always visible</li>
              <li>Even a short session counts — five minutes of scales is better than zero minutes</li>
              <li>If you&apos;re on Apple Watch, start a quick session from your wrist when you&apos;re near your instrument</li>
            </ul>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[#E8DFD3]">
          <p className="text-sm text-[#6B7280] mb-3">Next up:</p>
          <Link
            href="/mewstro/guides/milestone-moments"
            className="text-[#2D8B7E] font-semibold hover:underline"
          >
            Recording Milestone Moments →
          </Link>
        </div>
      </div>
    </div>
  );
}
