import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recording Milestone Moments",
  description: "How to capture short audio and video clips of your practice breakthroughs in Mewstro.",
};

function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div className="my-4 rounded-2xl border-2 border-dashed border-[#E8DFD3] bg-[#FAF6EF] p-8 text-center text-sm text-[#6B7280]">
      📱 Screenshot: {label}
    </div>
  );
}

export default function MilestoneMomentsPage() {
  return (
    <div className="py-20 px-6 bg-[#FFFBF7]">
      <div className="mx-auto max-w-2xl">
        <Link href="/mewstro/guides" className="text-sm text-[#2D8B7E] hover:underline mb-6 inline-block">
          ← All guides
        </Link>

        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-3">Recording Milestone Moments</h1>
        <p className="text-lg text-[#6B7280] mb-12">
          That bar you&apos;ve been struggling with for weeks? When it
          finally clicks, capture it. You&apos;ll want to hear it back
          later.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">What&apos;s a Milestone Moment?</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              It&apos;s a short recording, up to 30 seconds, that you
              capture during or after a practice session. Think of it
              like a progress photo, but for your playing. Record
              yourself nailing a tricky passage today, then listen back
              in a month and hear how far you&apos;ve come.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">How to record one</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed mb-3">
              During a practice session (or straight after stopping the timer):
            </p>
            <ol className="text-[#5A4E42] text-sm leading-relaxed list-decimal list-inside space-y-2 ml-1">
              <li>Tap the <strong>Record</strong> button on the session screen</li>
              <li>Play the passage you want to capture. Recording stops automatically after 30 seconds, or you can tap stop earlier</li>
              <li>Preview the clip and tap <strong>Save</strong></li>
              <li>Optionally add a title like &ldquo;First clean run of Clair de Lune bar 12-16&rdquo;</li>
            </ol>
            <ScreenshotPlaceholder label="Recording a Milestone Moment" />
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Where to find your recordings</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Open any past session from your Calendar or Repertoire
              tab and you&apos;ll see your Milestone Moments attached.
              Tap to replay them. If you recorded milestones for a
              specific piece, they also show up on that piece&apos;s
              detail page in Repertoire, so you can see your progress
              on each piece over time.
            </p>
            <ScreenshotPlaceholder label="Milestone Moments gallery on a repertoire piece" />
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Free vs Premium</h2>
            <div className="rounded-xl border border-[#E8DFD3] bg-white p-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold text-[#1A1A2E] mb-2">Free</p>
                  <ul className="text-[#5A4E42] space-y-1">
                    <li>7-day recording retention</li>
                    <li>1 milestone per piece</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-[#2D8B7E] mb-2">Premium</p>
                  <ul className="text-[#5A4E42] space-y-1">
                    <li>30-day recording retention</li>
                    <li>Unlimited milestones</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Tips</h2>
            <ul className="text-[#5A4E42] text-sm leading-relaxed list-disc list-inside space-y-2 ml-1">
              <li>Record the same passage every week or two, the comparison is where the magic is</li>
              <li>Don&apos;t wait for perfection. Capture the first clean run, not the hundredth</li>
              <li>If your teacher uses Mewstro, they can see your milestones in their dashboard, which makes for a great conversation starter in lessons</li>
            </ul>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[#E8DFD3]">
          <p className="text-sm text-[#6B7280] mb-3">Next up:</p>
          <Link
            href="/mewstro/guides/teacher-setup"
            className="text-[#2D8B7E] font-semibold hover:underline"
          >
            For teachers: setting up your studio →
          </Link>
        </div>
      </div>
    </div>
  );
}
