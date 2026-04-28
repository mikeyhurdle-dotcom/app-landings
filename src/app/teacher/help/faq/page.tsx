import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ · Mewstro Teacher",
  robots: { index: false, follow: false },
};

export default function HelpFaqPage() {
  return (
    <>
      <h1>FAQ</h1>
      <p className="text-[#6B7280]">
        The things teachers ask most. If yours isn&apos;t here, drop me a
        message — I&apos;ll add it.
      </p>

      <h2>A student told me they joined, but they&apos;re not on the dashboard</h2>
      <p>
        Most likely they redeemed the App Store offer code (which gives them
        the paid app for free) but didn&apos;t enter your studio invite code in
        the app. Those are two different things:
      </p>
      <ul className="list-disc pl-6">
        <li>
          The <strong>offer code</strong> (one of the long codes I gave you,
          e.g. <code>EMCASYEAR</code>) unlocks the full app for them.
        </li>
        <li>
          The <strong>invite code</strong> (your short one,{" "}
          <code>EMCAS</code>) joins them to your studio so you can see
          their practice.
        </li>
      </ul>
      <p>
        Ask them to open Mewstro → Settings → My Studio and type{" "}
        <code>EMCAS</code>. They&apos;ll appear here within seconds.
      </p>

      <h2>How do I create an assignment?</h2>
      <p>
        Scroll to the Assignments section on your dashboard, hit{" "}
        <strong>New assignment</strong>, give it a title (&ldquo;Hanon
        exercise 1, 10 minutes a day for a week&rdquo;), pick which students
        it&apos;s for, and save. Students see it in the app the next time they
        open it.
      </p>

      <h2>What does &ldquo;Slipping&rdquo; mean? Should I worry?</h2>
      <p>
        It means a student used to have a practice streak going and has
        dropped off. It&apos;s a soft signal — not a problem, just worth
        mentioning at the next lesson. Sometimes life happens. Sometimes
        they&apos;ve switched to practising on a different instrument and just
        haven&apos;t logged it. Asking is usually enough.
      </p>

      <h2>Can I see what my student is practising right now?</h2>
      <p>
        Not in real time, no. The dashboard updates each time a student
        finishes a session, usually within a few seconds. Click into a
        student&apos;s name to see their full history, repertoire, and any
        milestone recordings they&apos;ve shared.
      </p>

      <h2>How do I cancel or change my subscription?</h2>
      <p>
        For the pilot, your subscription is on me — there&apos;s nothing to
        cancel. Once we open Mewstro to other teachers, you&apos;ll be able to
        manage billing from here. In the meantime, anything to do with your
        account: just email me directly.
      </p>

      <h2>Can I have a teacher account on the iOS app too?</h2>
      <p>
        Not yet. The iOS app is built for students; this dashboard is built
        for you. The plan is to add a teacher view to the app once a few more
        teachers are on board and we know what it should actually do.
      </p>

      <h2>One of my students wants to keep their practice private. Is that fine?</h2>
      <p>
        Absolutely. Joining your studio is opt-in on their side. If a student
        leaves, they disappear from this dashboard but keep all their data and
        the full app. Nothing pushy.
      </p>

      <h2>Can I add another teacher from EM:CAS to this dashboard?</h2>
      <p>
        Right now the dashboard is one teacher per studio. Multi-teacher
        studios are on the roadmap — tell me who you&apos;d add and I&apos;ll
        prioritise it for the next iteration.
      </p>

      <h2>Where do my milestone videos and practice recordings live?</h2>
      <p>
        Inside the iPhone Files app under{" "}
        <strong>Browse → On My iPhone → Mewstro</strong>. By default the files
        are saved with their internal IDs as filenames. If a student wants
        readable names like <code>Clair-de-Lune-2026-04-29.mp4</code> instead,
        they can flip on{" "}
        <em>Settings → Files → Save practice files to my iPhone Files app</em>{" "}
        in the Mewstro app — existing files get renamed in place, and future
        ones save with the readable name automatically.
      </p>
      <p>
        One caveat: deleting Mewstro from the phone deletes the folder too, so
        AirDrop or copy anything you want to keep before uninstalling.
      </p>

      <h2>What happens to my students if I cancel after the pilot?</h2>
      <p>
        Their app keeps working in free mode (timer, basic features). They
        keep all their practice history. The studio dashboard goes away after
        a 30-day grace period so you can come back if you change your mind.
      </p>
    </>
  );
}
