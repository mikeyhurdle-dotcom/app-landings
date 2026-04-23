import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Getting Started",
  description: "Download Mewstro, create your account, and log your first practice session.",
};

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D8B7E] text-white flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{title}</h3>
        <div className="text-[#5A4E42] text-sm leading-relaxed space-y-3">{children}</div>
      </div>
    </div>
  );
}

function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div className="my-4 rounded-2xl border-2 border-dashed border-[#E8DFD3] bg-[#FAF6EF] p-8 text-center text-sm text-[#6B7280]">
      📱 Screenshot: {label}
    </div>
  );
}

export default function GettingStartedPage() {
  return (
    <div className="py-20 px-6 bg-[#FFFBF7]">
      <div className="mx-auto max-w-2xl">
        <Link href="/mewstro/guides" className="text-sm text-[#2D8B7E] hover:underline mb-6 inline-block">
          ← All guides
        </Link>

        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-3">Getting started</h1>
        <p className="text-lg text-[#6B7280] mb-12">
          From download to your first practice session, this takes about two minutes.
        </p>

        <div className="space-y-10">
          <Step number={1} title="Download Mewstro">
            <p>
              Search for &ldquo;Mewstro&rdquo; on the App Store, or tap the download
              button on <Link href="/mewstro" className="text-[#2D8B7E] hover:underline">mewstro.com</Link>.
              It&apos;s free to download.
            </p>
            <ScreenshotPlaceholder label="App Store listing" />
          </Step>

          <Step number={2} title="Create your account">
            <p>
              Open the app and you&apos;ll see the sign-in screen. You&apos;ve got three options:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-1">
              <li><strong>Sign in with Apple</strong>, the fastest option, one tap</li>
              <li><strong>Sign in with Google</strong>, uses your Google account</li>
              <li><strong>Email and password</strong>, enter any email address</li>
            </ul>
            <p>Pick whichever you prefer, they all work the same way once you&apos;re in.</p>
            <ScreenshotPlaceholder label="Sign-in screen" />
          </Step>

          <Step number={3} title="Choose your instrument">
            <p>
              Mewstro asks which instrument you play. Pick your main one, and
              you can always add more later in Settings. Free accounts get
              one instrument, Premium unlocks unlimited.
            </p>
            <ScreenshotPlaceholder label="Instrument picker in onboarding" />
          </Step>

          <Step number={4} title="Enter an invite code (if your teacher gave you one)">
            <p>
              If your music teacher uses Mewstro, they&apos;ll give you an
              invite code. Tap &ldquo;I have an invite code&rdquo; and paste
              it in. This unlocks everything for free, the full app plus
              your teacher&apos;s studio leaderboard.
            </p>
            <p>
              No code, no worries. Just tap &ldquo;Skip&rdquo; and
              you&apos;ll start on the free tier. You can upgrade to
              Premium any time.
            </p>
            <ScreenshotPlaceholder label="Invite code screen" />
          </Step>

          <Step number={5} title="Start your first session">
            <p>
              You&apos;re in. Tap the big <strong>Start</strong> button on
              the Practice tab, and the timer starts running. Pick what
              you&apos;re working on, scales, sight-reading, repertoire, or
              whatever fits. When you&apos;re done, tap <strong>Stop</strong>{" "}
              and Mewstro saves the session.
            </p>
            <p>
              That&apos;s it. You&apos;ve logged your first practice. Mewstro the
              cat will celebrate with you.
            </p>
            <ScreenshotPlaceholder label="Practice timer running" />
          </Step>
        </div>

        <div className="mt-16 pt-8 border-t border-[#E8DFD3]">
          <p className="text-sm text-[#6B7280] mb-3">Next up:</p>
          <Link
            href="/mewstro/guides/practice-timer"
            className="text-[#2D8B7E] font-semibold hover:underline"
          >
            Using the practice timer →
          </Link>
        </div>
      </div>
    </div>
  );
}
