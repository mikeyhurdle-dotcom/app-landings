import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "The story behind Mewstro",
  description:
    "Mewstro began as a spreadsheet. Then a piano teacher said: 'Other students would want this.' Read the story of a 40-year-old learner who built the practice app his teacher inspired.",
};

const evolution = [
  {
    name: "Spreadsheet",
    year: "2024",
    description:
      "A Google Sheet. Manual timing, weekly copy-paste, printed weekly planners. The tool that shaped every habit that followed.",
  },
  {
    name: "Skald",
    year: "2025",
    description:
      "First code version. Nordic metal vibes because I love that music. Built for me, on my own keyboard, for my own practice sessions.",
  },
  {
    name: "Maestro",
    year: "2025",
    description:
      "A softer green-themed variant I built for Ellie. That's when she said the thing that changed everything: 'Other students would want this.'",
  },
  {
    name: "Mewstro",
    year: "2026",
    description:
      "Added the cat mascot and the personality. Your companion on the piano bench — celebrating streaks, gently noticing when you haven't practised in a while.",
  },
];

export default function MewstroStoryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FFFBF7] px-6 py-20 md:py-28">
        <div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#F4845F] opacity-20 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2D8B7E]">
            The story behind Mewstro
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#1A1A2E] md:text-6xl">
            Started piano at 40. Built the app my teacher inspired.
          </h1>
          <p className="mt-8 text-lg text-[#5A4E42] md:text-xl">
            I&apos;m Mikey — started piano just before my 40th birthday, got
            obsessive about structured practice, built elaborate spreadsheets.
            My piano teacher Ellie suggested I turn them into an app for her
            other students. That&apos;s Mewstro.
          </p>
        </div>
      </section>

      {/* Evolution timeline */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-[#6B7280]">
              How it evolved
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#1A1A2E] md:text-4xl">
              From a spreadsheet to a cat with a baton
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4">
            {evolution.map((step, idx) => (
              <div
                key={step.name}
                className="relative rounded-2xl border border-[#E8DFD3] bg-[#FFFBF7] p-6"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-bold text-[#1A1A2E]">
                    {step.name}
                  </h3>
                  <span className="text-xs font-medium text-[#6B7280]">
                    {step.year}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#5A4E42]">
                  {step.description}
                </p>
                <div className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-[#2D8B7E] text-xs font-bold text-white">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full narrative */}
      <section className="bg-[#FFFBF7] px-6 py-20">
        <article className="prose-mewstro mx-auto max-w-3xl text-[17px] leading-[1.75] text-[#2B2B2E]">
          <p>
            Music came to me through my dad. He&apos;s always played the guitar
            — picked it up and put it down over the years around the chaos of
            raising three kids, driving us to hockey and cricket matches across
            the country, and holding down a job. Now he&apos;s retired, he&apos;s
            found his community: folk circles in local pubs where they take
            turns playing. That image stuck with me. I&apos;d wanted to
            properly learn an instrument for as long as I could remember, but
            like my dad before me, life kept getting in the way.
          </p>
          <p className="mt-6">
            Just before my 40th birthday, I decided enough was enough. I
            bought a keyboard and started teaching myself piano.
          </p>
          <p className="mt-6">
            The online world for learning music is extraordinary and
            overwhelming in equal measure. I devoured David Bennett&apos;s
            music theory videos — I vividly remember being on a ferry to
            Islay with my wife Harriet in my parents&apos; campervan, no piano
            in reach, and finding a complete unlock in being able to keep
            learning remotely. We don&apos;t even drink whisky, so Islay was a
            strange choice for a holiday, but David Bennett made the journey
            feel productive.
          </p>
          <p className="mt-6">
            I tried a lot of things in that first year. Piano Superhuman for a
            brief moment — it wasn&apos;t for me because I wanted to
            understand the music rather than hack my way to playing it. I
            subscribed to Matthew Cawood&apos;s newsletter and bought his
            sight-reading practice guides — his practice framework became the
            foundation for my own. I followed Jazer, who taught me to
            practise with intent. I probably Googled &ldquo;how to practise
            piano&rdquo; a hundred times and stitched together my own approach
            from everything I read.
          </p>
          <p className="mt-6">
            Pianote gave me real structure, and it&apos;s what got me my first
            big win. One of my original goals when I took up piano was to play
            a Ludovico Einaudi piece — I&apos;d seen him in concert on
            London&apos;s Embankment and the music felt impossibly beautiful
            and impossibly out of reach. Pianote had a simplified beginner
            version of &ldquo;Experience.&rdquo; When I could finally play it,
            something shifted. That piece is one I&apos;ll play for the rest of
            my life, from memory. I played it yesterday on the public piano at
            Amsterdam Airport. I played it again this morning at Oxford train
            station while waiting for a delayed train.
          </p>
          <blockquote className="mt-8 rounded-2xl border-l-4 border-[#2D8B7E] bg-white p-6 text-lg italic text-[#1A1A2E]">
            If I see a piano in public, I have to try and play it. It&apos;s
            the same rule I have at home — seeing the piano means sitting
            down for five minutes, even when I&apos;m busy.{" "}
            <strong className="not-italic">
              Music for me is about presence, not performance.
            </strong>
          </blockquote>
          <p className="mt-8">
            Whilst Pianote gave me structure, I missed human connection. Friends
            had given me a Music Teacher&apos;s voucher for my 40th and I
            finally used it. My first teacher was wonderful — a guitarist
            primarily, with a deep love for music that rubbed off on me. We
            talked theory as much as we played. But we both realised my
            learning pace was going to outrun his piano skills. We parted
            amicably. My first music teacher breakup. Nobody warns you how
            strange that feels.
          </p>
          <p className="mt-6">
            Around that time, I discovered Matthew Cawood&apos;s work on
            deliberate practice, which reshaped how I approached the piano. I
            started sitting down with real intent. I built a spreadsheet to
            track what I practised, how long, what went well, what I was
            working towards. I printed weekly planners. I upgraded to a
            weighted-key keyboard — an absolute game-changer that I should
            have bought from day one.
          </p>
          <p className="mt-6">
            I did taster sessions with several piano teachers, looking for the
            right fit. Shared passion got you through the door, but I needed
            someone who could push me whilst understanding how I learn. I can
            be a bit of a front-seat learner — obsessive, opinionated about
            what should work for me. I needed a teacher who could handle that.
          </p>
          <p className="mt-6">
            James Hawker was that teacher. He let me be me and gave me the
            structure I needed. He ran me through mock grades up to Grade 4. I
            never officially sat the exams — I didn&apos;t need the
            certificate, but the grade structure gave me purpose.
          </p>
          <p className="mt-6">
            Eventually I wanted more. More direction, and the urge to try
            singing as a second instrument. I tried two new teachers — Auris
            and Ellie. Auris was a jazz pianist specialist; we focused on
            improv. Ellie was different. She embraced my structure. She helped
            me prioritise. She made my spreadsheet-driven approach feel like
            an asset, not a quirk.
          </p>
          <p className="mt-6 text-lg font-semibold text-[#1A1A2E]">
            Here&apos;s where Mewstro actually began.
          </p>
          <p className="mt-6">
            I thought it would be fun to turn my spreadsheet into an app —
            automating the manual timing, removing the weekly copy-paste of
            practice data, making the whole thing feel less like admin. I
            started building. The first version I called Skald. I love metal
            music and gave it a Nordic vibe. It was for me.
          </p>
          <p className="mt-6">
            When I showed it to Ellie, I built her a softer version in her own
            style and a second theme in calmer greens which I called Maestro.
            And that&apos;s when Ellie said the thing that changed everything:
          </p>
          <blockquote className="mt-8 rounded-2xl border-l-4 border-[#2D8B7E] bg-white p-6 text-lg italic text-[#1A1A2E]">
            Other students would want this. Other teachers would want this.
            You could add a leaderboard for my students.
          </blockquote>
          <p className="mt-8">
            That was the moment it went from being a personal tool to a real
            product. I added personality. &ldquo;Maestro&rdquo; felt too
            serious, too formal — and everyone loves cats. Mewstro was born.
          </p>
          <p className="mt-6">
            I&apos;m now working towards Grade 7 with Ellie over the next
            couple of years — though I&apos;ll admit practice has taken a
            slight back seat whilst I&apos;ve been building this app.
            Ellie&apos;s using Mewstro with her students. My piano teacher
            became my first customer, my co-creator, and my reason for
            building this thing in the first place.
          </p>
          <p className="mt-8 text-lg font-semibold text-[#1A1A2E]">
            That&apos;s the Mewstro story. Built by someone who knows exactly
            what it feels like to want to practise more, to want structure, to
            want a teacher who gets you, and to want a tool that treats music
            practice like the joy it actually is.
          </p>
        </article>
      </section>

      {/* Ellie quote slot — reserved, honest placeholder until she records */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#E8DFD3] bg-[#FAF6EF] p-8 md:p-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Image
              src="/mewstro/mascot-conducting.png"
              alt=""
              width={72}
              height={72}
            />
            <p className="text-xs uppercase tracking-wider text-[#6B7280]">
              From our founding teacher
            </p>
            <p className="text-base italic text-[#5A4E42]">
              A word from Ellie Moorhouse will live here once she&apos;s had
              her founding-pilot fortnight with Mewstro. Until then, we&apos;d
              rather leave the space honest than fill it with something
              manufactured.
            </p>
          </div>
        </div>
      </section>

      {/* Dual CTA — self-fork */}
      <section className="bg-[#FFFBF7] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1A1A2E] md:text-4xl">
              Where next?
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[#E8DFD3] bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-[#2D8B7E]">
                I&apos;m a music teacher
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[#1A1A2E]">
                Apply for a Founding Studio slot
              </h3>
              <p className="mt-3 text-sm text-[#5A4E42]">
                Five founding studios, 50% off for life, direct line to me.
                Applications reviewed personally.
              </p>
              <Link
                href="/mewstro/teachers/apply"
                className="mt-6 inline-block rounded-full bg-[#2D8B7E] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Apply to be a Founding Studio
              </Link>
            </div>
            <div className="rounded-3xl border border-[#E8DFD3] bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-[#F4845F]">
                I&apos;m learning an instrument
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[#1A1A2E]">
                Get Mewstro on your phone
              </h3>
              <p className="mt-3 text-sm text-[#5A4E42]">
                Free to start. Solo Premium unlocks everything after a 7-day
                trial.
              </p>
              <Link
                href="/mewstro/app"
                className="mt-6 inline-block rounded-full border border-[#1A1A2E] bg-white px-6 py-3 text-sm font-semibold text-[#1A1A2E] transition-colors hover:bg-[#FAF6EF]"
              >
                See Mewstro for solo learners
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
