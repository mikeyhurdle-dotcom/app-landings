import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Using the Practice Timer",
  description: "How to start sessions, choose task types, switch instruments, and add manual entries in Mewstro.",
};

function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div className="my-4 rounded-2xl border-2 border-dashed border-[#E8DFD3] bg-[#FAF6EF] p-8 text-center text-sm text-[#6B7280]">
      📱 Screenshot: {label}
    </div>
  );
}

export default function PracticeTimerPage() {
  return (
    <div className="py-20 px-6 bg-[#FFFBF7]">
      <div className="mx-auto max-w-2xl">
        <Link href="/mewstro/guides" className="text-sm text-[#2D8B7E] hover:underline mb-6 inline-block">
          ← All guides
        </Link>

        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-3">Using the practice timer</h1>
        <p className="text-lg text-[#6B7280] mb-12">
          The timer is the heart of Mewstro. Here&apos;s everything it can do.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Starting a session</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Open the app and tap <strong>Start</strong> on the Practice tab.
              The timer starts counting immediately. You&apos;ll see your
              instrument and task type at the top — these help you track
              what kind of practice you did.
            </p>
            <ScreenshotPlaceholder label="Practice tab with Start button" />
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Task types</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed mb-3">
              Before you start (or during a session), pick what you&apos;re working on:
            </p>
            <ul className="text-[#5A4E42] text-sm leading-relaxed list-disc list-inside space-y-1 ml-1">
              <li><strong>Scales &amp; arpeggios</strong> — warm-ups, finger exercises</li>
              <li><strong>Sight-reading</strong> — playing something for the first time</li>
              <li><strong>Repertoire</strong> — pieces you&apos;re learning or polishing</li>
              <li><strong>Technique</strong> — specific skills like dynamics, pedalling, bowing</li>
              <li><strong>Theory</strong> — reading, writing, or listening exercises</li>
              <li><strong>Free practice</strong> — improvising, noodling, just playing</li>
            </ul>
            <p className="text-[#5A4E42] text-sm leading-relaxed mt-3">
              This isn&apos;t just a label — your teacher can see what you&apos;ve
              been focusing on, and it helps you spot patterns in your own practice.
            </p>
            <ScreenshotPlaceholder label="Task type picker" />
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Switching instruments</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              If you play more than one instrument, tap the instrument name at
              the top of the timer to switch. Each session is logged against one
              instrument. Free accounts can track one instrument; Premium
              unlocks unlimited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Finishing a session</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Tap <strong>Stop</strong> when you&apos;re done. Mewstro saves
              the session, updates your streak, and the mascot celebrates. You
              can add an optional note about what you worked on — this is
              private to you unless you share it.
            </p>
            <ScreenshotPlaceholder label="Session complete screen with Mewstro celebrating" />
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">Adding a session manually</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Forgot to start the timer? Tap <strong>Manual Entry</strong> on
              the Practice tab. Pick the date, how long you practised, your
              instrument, and the task type. It counts towards your streak and
              shows up on your calendar just like a timed session.
            </p>
            <ScreenshotPlaceholder label="Manual entry form" />
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">The metronome</h2>
            <p className="text-[#5A4E42] text-sm leading-relaxed">
              Tap the metronome icon on the Practice tab to open it. Set your
              BPM, tap play, and you&apos;ve got a steady beat. On Apple Watch,
              the metronome is haptic — you feel the beat on your wrist instead
              of hearing it, so it doesn&apos;t interfere with your playing.
            </p>
            <ScreenshotPlaceholder label="Metronome view" />
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[#E8DFD3]">
          <p className="text-sm text-[#6B7280] mb-3">Next up:</p>
          <Link
            href="/mewstro/guides/streaks"
            className="text-[#2D8B7E] font-semibold hover:underline"
          >
            Building streaks →
          </Link>
        </div>
      </div>
    </div>
  );
}
