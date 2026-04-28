import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting started · Mewstro Teacher",
  robots: { index: false, follow: false },
};

export default function HelpGettingStartedPage() {
  return (
    <>
      <h1>Getting started</h1>
      <p className="text-[#6B7280]">
        Everything your students share with you, in one place.
      </p>

      <h2>How to log in</h2>
      <ol className="list-decimal pl-6 space-y-1">
        <li>
          Go to{" "}
          <a href="https://studio.mewstro.com">studio.mewstro.com</a>.
        </li>
        <li>Enter the password I sent you on iMessage.</li>
        <li>You&apos;ll land on your studio dashboard.</li>
      </ol>
      <p>
        The login lasts 30 days, so on your own laptop you should rarely have to
        re-enter it. On a shared device, sign out from the link in the top
        right.
      </p>

      <h2>The four numbers at the top</h2>
      <ul className="list-disc pl-6">
        <li>
          <strong>Students</strong> — everyone who&apos;s used your invite code.
        </li>
        <li>
          <strong>Active this week</strong> — how many of them have practised
          in the last 7 days.
        </li>
        <li>
          <strong>Total minutes</strong> — across the whole studio, last 30
          days.
        </li>
        <li>
          <strong>Average per student</strong> — total minutes ÷ student count.
          A quick gut-check on whether the studio as a whole is moving.
        </li>
      </ul>

      <h2>Your students</h2>
      <p>
        The table shows one row per student. The column on the right is a
        rough engagement label based on streak and weekly minutes:
      </p>
      <ul className="list-disc pl-6">
        <li>
          🔥 <strong>On fire</strong> — 7+ day streak and 2+ hours this week.
        </li>
        <li>
          ✅ <strong>On track</strong> — 3+ day streak and an hour this week.
        </li>
        <li>
          🌱 <strong>Active</strong> — practised at least a little this week.
        </li>
        <li>
          💤 <strong>Quiet</strong> — no streak and nothing this week. A good
          one to mention at the next lesson.
        </li>
        <li>
          📉 <strong>Slipping</strong> — used to be active, isn&apos;t now.
          Worth a gentle nudge.
        </li>
      </ul>
      <p>
        Click a student&apos;s name to see their last 90 days, repertoire, and
        any milestone clips they&apos;ve shared.
      </p>

      <h2>Sharing your invite code</h2>
      <p>
        Your code is shown in the box at the top of the dashboard. Read it out
        in the lesson, write it on a sticky note, or send it in a WhatsApp
        message — whatever works. Students type it in the Mewstro app when
        they sign up. Once they do, they show up here.
      </p>
      <p>
        If a student says they joined but they&apos;re not appearing, see the{" "}
        <a href="/teacher/help/faq">FAQ</a>.
      </p>

      <h2>Assignments</h2>
      <p>
        Use the assignments section to set a practice goal — for one student
        or the whole studio. They&apos;ll see it in the app once they&apos;ve
        joined. The completion bar updates as students log practice that
        matches the goal.
      </p>

      <h2>Two things this dashboard is <em>not</em> (yet)</h2>
      <ul className="list-disc pl-6">
        <li>
          A way to manage your own subscription. For now, anything to do with
          your account: email me directly.
        </li>
        <li>
          A way to message students. The dashboard is read-only for student
          activity. Lessons and WhatsApp are still the right place for
          conversations.
        </li>
      </ul>
      <p>
        Both of these are on the roadmap. If they&apos;re blocking you, tell
        me and I&apos;ll prioritise.
      </p>
    </>
  );
}
