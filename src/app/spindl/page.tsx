import Link from "next/link";
import Image from "next/image";
import { spindl } from "@/config/brands";
import { SpindlJsonLd } from "@/components/shared/JsonLd";

const TERRACOTTA = spindl.colors.primary;
const ESPRESSO = spindl.colors.text;
const WALNUT = spindl.colors.textDim;
const CREAM = spindl.colors.background;
const PAPER = spindl.colors.surface;
const GOLD = spindl.colors.accent;

const SERIF = "var(--font-lora)";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: GOLD }}
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: TERRACOTTA }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div className="animate-fade-up">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                backgroundColor: `${TERRACOTTA}1a`,
                color: TERRACOTTA,
              }}
            >
              iOS reading tracker · coming soon
            </span>
            <h1
              className="mt-6 text-5xl leading-[1.02] tracking-tight md:text-7xl"
              style={{ color: ESPRESSO, fontFamily: SERIF, fontWeight: 500 }}
            >
              A reading tracker that takes{" "}
              <span style={{ color: TERRACOTTA, fontStyle: "italic" }}>
                books
              </span>{" "}
              seriously.
            </h1>
            <p
              className="mt-7 max-w-xl text-lg leading-relaxed md:text-xl"
              style={{ color: WALNUT }}
            >
              Four shelves you actually use. A running journal for every
              book. A hedgehog who notices when you&apos;ve kept your
              streak. Built quietly, by one person, for the people who
              still keep a notes app full of underlined passages.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#waitlist"
                className="inline-block rounded-full px-7 py-3.5 text-base font-semibold transition-transform hover:scale-[1.02]"
                style={{
                  backgroundColor: TERRACOTTA,
                  color: spindl.colors.primaryForeground,
                }}
              >
                Notify me at launch
              </a>
              <Link
                href="#why"
                className="inline-block rounded-full px-7 py-3.5 text-base font-semibold transition-colors"
                style={{
                  border: `1px solid ${WALNUT}33`,
                  color: ESPRESSO,
                  backgroundColor: PAPER,
                }}
              >
                Why this exists
              </Link>
            </div>
            <p className="mt-6 text-sm" style={{ color: WALNUT }}>
              Free forever for the basics. £2.99/mo for the bits that take
              real work to make.
            </p>
          </div>

          <div className="relative">
            <div
              className="relative rounded-3xl p-6 shadow-2xl"
              style={{
                backgroundColor: PAPER,
                border: `1px solid ${WALNUT}1f`,
              }}
            >
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: `${WALNUT}1f` }}>
                <div>
                  <p className="text-xs uppercase tracking-wider" style={{ color: WALNUT }}>
                    Currently reading
                  </p>
                  <p
                    className="mt-1 text-lg"
                    style={{ color: ESPRESSO, fontFamily: SERIF, fontWeight: 600 }}
                  >
                    The Way of Kings
                  </p>
                  <p className="text-xs italic" style={{ color: WALNUT }}>
                    Brandon Sanderson
                  </p>
                </div>
                <div
                  className="rounded-lg px-3 py-1.5 text-center"
                  style={{ backgroundColor: `${GOLD}33` }}
                >
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: WALNUT }}>
                    Streak
                  </p>
                  <p className="font-mono text-base font-bold" style={{ color: TERRACOTTA }}>
                    47d
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs" style={{ color: WALNUT }}>
                  <span>Page 612 / 1007</span>
                  <span>61%</span>
                </div>
                <div
                  className="mt-2 h-2 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: `${WALNUT}1f` }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: "61%", backgroundColor: TERRACOTTA }}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <MiniStat label="This session" value="34p" />
                <MiniStat label="Pace" value="42 p/h" />
                <MiniStat label="Est. finish" value="May 12" accent />
              </div>

              <div
                className="mt-5 rounded-xl p-4 text-sm italic leading-relaxed"
                style={{
                  backgroundColor: `${GOLD}1a`,
                  color: ESPRESSO,
                  borderLeft: `3px solid ${TERRACOTTA}`,
                }}
              >
                &ldquo;Bridge Four crossing a chasm in the storm. First
                time I&apos;ve actually felt the wind.&rdquo;
                <p className="mt-2 not-italic text-xs" style={{ color: WALNUT }}>
                  Journal · today
                </p>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-6 hidden md:block">
              <Image
                src="/spindl/mascot-reading.png"
                alt="Spindl the hedgehog reading a book"
                width={140}
                height={140}
                priority
                className="drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-lg px-3 py-2"
      style={{
        backgroundColor: CREAM,
        border: `1px solid ${WALNUT}1f`,
      }}
    >
      <p className="text-[10px] uppercase tracking-wider" style={{ color: WALNUT }}>
        {label}
      </p>
      <p
        className="mt-0.5 text-sm font-semibold"
        style={{ color: accent ? TERRACOTTA : ESPRESSO }}
      >
        {value}
      </p>
    </div>
  );
}

function Shelves() {
  const buckets = [
    {
      title: "Currently Reading",
      blurb: "What you&apos;re in. Track pages, time, and streak per book.",
      count: "3",
    },
    {
      title: "Want to Read",
      blurb: "The pile. ISBN-scan a cover and it&apos;s on the shelf.",
      count: "47",
    },
    {
      title: "Finished",
      blurb: "Your year, on a wall. Honest counts, no quotas.",
      count: "23",
    },
    {
      title: "Did Not Finish",
      blurb: "Some books aren&apos;t for you. That&apos;s allowed here.",
      count: "5",
    },
  ];

  return (
    <section id="features" className="px-6 py-24" style={{ backgroundColor: PAPER }}>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: WALNUT }}>
            Four shelves
          </p>
          <h2
            className="mt-3 text-4xl md:text-5xl"
            style={{ color: ESPRESSO, fontFamily: SERIF, fontWeight: 500 }}
          >
            Four shelves.{" "}
            <span style={{ color: TERRACOTTA, fontStyle: "italic" }}>
              That&apos;s it.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: WALNUT }}>
            Books move between four shelves you&apos;ll actually use, not
            fifteen generic categories. ISBN-scan a cover with the camera
            and the metadata fills in from Open Library — the open,
            community-run book database.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {buckets.map((b) => (
            <div
              key={b.title}
              className="group relative overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1"
              style={{
                backgroundColor: CREAM,
                border: `1px solid ${WALNUT}22`,
              }}
            >
              <p
                className="font-mono text-3xl font-bold"
                style={{ color: TERRACOTTA }}
              >
                {b.count}
              </p>
              <h3
                className="mt-3 text-lg"
                style={{ color: ESPRESSO, fontFamily: SERIF, fontWeight: 600 }}
              >
                {b.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: WALNUT }}
                dangerouslySetInnerHTML={{ __html: b.blurb }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal() {
  return (
    <section className="px-6 py-24" style={{ backgroundColor: CREAM }}>
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: WALNUT }}>
            Per-book journal
          </p>
          <h2
            className="mt-3 text-4xl md:text-5xl"
            style={{ color: ESPRESSO, fontFamily: SERIF, fontWeight: 500 }}
          >
            A real journal for{" "}
            <span style={{ fontStyle: "italic", color: TERRACOTTA }}>
              every book.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: WALNUT }}>
            Every book gets a running thread. The line that knocked you
            sideways on page 47. The slow patch you almost quit at. The
            bit you read aloud to someone. Tag entries —
            <em> plot twist, great writing, slow section, made me cry</em>{" "}
            — and the patterns surface across your shelf.
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: WALNUT }}>
            Export the lot to PDF or markdown when you&apos;re done.
            It&apos;s yours.
          </p>
        </div>

        <div
          className="relative rounded-3xl p-7 shadow-xl"
          style={{
            backgroundColor: PAPER,
            border: `1px solid ${WALNUT}1f`,
          }}
        >
          <div className="space-y-5">
            <JournalEntry
              date="Apr 27"
              tag="great writing"
              text="&ldquo;The first step in becoming honest with yourself is admitting how much you've been lying.&rdquo; Underlined twice."
            />
            <JournalEntry
              date="Apr 22"
              tag="slow section"
              text="Shallan&apos;s flashbacks landing better the second time round. First read I almost skimmed them."
            />
            <JournalEntry
              date="Apr 18"
              tag="plot twist"
              text="Did not see Szeth coming back like that. Re-read the chapter twice."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalEntry({
  date,
  tag,
  text,
}: {
  date: string;
  tag: string;
  text: string;
}) {
  return (
    <div className="border-l-2 pl-4" style={{ borderColor: TERRACOTTA }}>
      <div className="flex items-center gap-3 text-xs">
        <span style={{ color: WALNUT }}>{date}</span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            backgroundColor: `${GOLD}33`,
            color: ESPRESSO,
          }}
        >
          {tag}
        </span>
      </div>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: ESPRESSO }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

function YearlyReport() {
  return (
    <section className="px-6 py-24" style={{ backgroundColor: PAPER }}>
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em]" style={{ color: WALNUT }}>
              Yearly report
            </p>
            <h2
              className="mt-3 text-4xl md:text-5xl"
              style={{ color: ESPRESSO, fontFamily: SERIF, fontWeight: 500 }}
            >
              A proper{" "}
              <span style={{ color: TERRACOTTA, fontStyle: "italic" }}>
                year in books.
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: WALNUT }}>
              December rolls around and Spindl hands you a real PDF.
              Books read, total pages, longest streak, your three
              favourite passages, the patterns in what you actually
              picked up. Designed to be printed, not just shared on
              Instagram.
            </p>
          </div>

          <div
            className="relative rounded-3xl p-8 md:p-10"
            style={{
              backgroundColor: CREAM,
              border: `1px solid ${WALNUT}22`,
            }}
          >
            <div className="text-center">
              <p
                className="text-xs uppercase tracking-[0.22em]"
                style={{ color: WALNUT }}
              >
                Spindl · 2026
              </p>
              <p
                className="mt-3 text-6xl"
                style={{
                  color: TERRACOTTA,
                  fontFamily: SERIF,
                  fontWeight: 500,
                  fontVariantNumeric: "lining-nums",
                }}
              >
                23
              </p>
              <p className="mt-1 text-sm" style={{ color: WALNUT }}>
                books finished
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 text-left">
                <ReportStat label="Pages" value="9,481" />
                <ReportStat label="Streak" value="62d" />
                <ReportStat label="Avg / book" value="412p" />
              </div>

              <p
                className="mt-8 italic text-sm leading-relaxed"
                style={{ color: ESPRESSO, fontFamily: SERIF }}
              >
                &ldquo;Most read genre: epic fantasy. Most surprising:
                three books of poetry in March.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider" style={{ color: WALNUT }}>
        {label}
      </p>
      <p
        className="mt-1 text-lg"
        style={{ color: ESPRESSO, fontFamily: SERIF, fontWeight: 600 }}
      >
        {value}
      </p>
    </div>
  );
}

function Principles() {
  const principles = [
    {
      title: "Independent, on purpose",
      body: "Spindl is built outside the big platforms. No corporate ties, no affiliate links in your shelf, no hidden data pipes. Just an app you pay for, that does what it says.",
    },
    {
      title: "Your shelf is yours",
      body: "Export to CSV, PDF, or markdown whenever you want. If Spindl ever shuts down, you walk away with everything intact. That&apos;s a hard commitment.",
    },
    {
      title: "Reading is private here",
      body: "There&apos;s no feed of what your friends are rating, no algorithm picking what you should read next, no leaderboard. Reading is between you and the book.",
    },
    {
      title: "No ads, ever",
      body: "Free tier stays free. Premium subscribers fund the work. That&apos;s the whole business model — nothing else slipping in.",
    },
    {
      title: "Open Library, by choice",
      body: "Book metadata comes from Open Library — the open, community-run book database run by the Internet Archive. Free, independent, well-loved by librarians.",
    },
    {
      title: "Built by one person",
      body: "Hi, I&apos;m Mikey. I made Spindl because my reading deserved better tools than I could find. If something annoys you, you can email me.",
    },
  ];

  return (
    <section id="why" className="px-6 py-24" style={{ backgroundColor: CREAM }}>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: WALNUT }}>
            What never changes
          </p>
          <h2
            className="mt-3 text-4xl md:text-5xl"
            style={{ color: ESPRESSO, fontFamily: SERIF, fontWeight: 500 }}
          >
            Six things I&apos;ve{" "}
            <span style={{ color: TERRACOTTA, fontStyle: "italic" }}>
              promised myself.
            </span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 stagger-children">
          {principles.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: PAPER,
                border: `1px solid ${WALNUT}22`,
              }}
            >
              <h3
                className="text-lg"
                style={{
                  color: TERRACOTTA,
                  fontFamily: SERIF,
                  fontWeight: 600,
                }}
              >
                {p.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: WALNUT }}
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderNote() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: PAPER }}>
      <div
        className="mx-auto max-w-3xl rounded-3xl p-8 md:p-12"
        style={{
          backgroundColor: CREAM,
          border: `1px solid ${WALNUT}22`,
        }}
      >
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <Image
            src="/spindl/mascot-celebrating.png"
            alt=""
            width={108}
            height={108}
            className="flex-shrink-0"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.18em]" style={{ color: WALNUT }}>
              Why Spindl exists
            </p>
            <h2
              className="mt-2 text-2xl md:text-3xl"
              style={{
                color: ESPRESSO,
                fontFamily: SERIF,
                fontWeight: 500,
              }}
            >
              It started as a spreadsheet.
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: WALNUT }}
            >
              I&apos;m Mikey. A few years ago I started keeping a
              spreadsheet of what I was reading, what I thought of it,
              and the lines I wanted to remember. It got out of hand.
              The columns multiplied, the formulas got fussy, and
              eventually the spreadsheet started doing things a
              spreadsheet really shouldn&apos;t.
            </p>
            <p
              className="mt-3 text-base leading-relaxed"
              style={{ color: WALNUT }}
            >
              Spindl is the app that spreadsheet wanted to grow up
              into. The hedgehog came later. He stayed because
              he&apos;s good company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24" style={{ backgroundColor: CREAM }}>
      <div className="mx-auto max-w-5xl">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: WALNUT }}>
            Pricing
          </p>
          <h2
            className="mt-3 text-4xl md:text-5xl"
            style={{ color: ESPRESSO, fontFamily: SERIF, fontWeight: 500 }}
          >
            Free for the basics.{" "}
            <span style={{ color: TERRACOTTA, fontStyle: "italic" }}>
              £2.99 for the rest.
            </span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div
            className="rounded-3xl p-8"
            style={{
              backgroundColor: PAPER,
              border: `1px solid ${WALNUT}22`,
            }}
          >
            <h3
              className="text-2xl"
              style={{ color: ESPRESSO, fontFamily: SERIF, fontWeight: 600 }}
            >
              Free
            </h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span
                className="text-5xl"
                style={{ color: ESPRESSO, fontFamily: SERIF, fontWeight: 500 }}
              >
                £0
              </span>
              <span className="text-sm" style={{ color: WALNUT }}>
                forever
              </span>
            </div>
            <ul className="mt-6 space-y-2 text-sm" style={{ color: WALNUT }}>
              <li>Four shelves, ISBN scanning</li>
              <li>Reading sessions, pages, time</li>
              <li>Per-book journal</li>
              <li>Streaks &amp; basic stats</li>
              <li>Spindl in all his moods</li>
            </ul>
          </div>

          <div
            className="rounded-3xl p-8 shadow-2xl"
            style={{
              backgroundColor: TERRACOTTA,
              color: spindl.colors.primaryForeground,
            }}
          >
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: spindl.colors.primaryForeground,
                color: TERRACOTTA,
              }}
            >
              Premium
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <span
                className="text-5xl"
                style={{ fontFamily: SERIF, fontWeight: 500 }}
              >
                £2.99
              </span>
              <span className="text-sm opacity-80">/ month</span>
            </div>
            <p className="mt-1 text-xs opacity-80">
              or £19.99/year — saves you £15.89
            </p>
            <ul className="mt-6 space-y-2 text-sm opacity-95">
              <li>Yearly reading report PDF</li>
              <li>Journal export (PDF + markdown)</li>
              <li>Custom shelves</li>
              <li>Reading speed tracking</li>
              <li>Advanced stats &amp; genre breakdowns</li>
              <li>Spindl theme variants</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section
      id="waitlist"
      className="px-6 py-24 text-center"
      style={{ backgroundColor: PAPER }}
    >
      <div className="mx-auto max-w-2xl">
        <h2
          className="text-4xl md:text-5xl"
          style={{ color: ESPRESSO, fontFamily: SERIF, fontWeight: 500 }}
        >
          Spindl ships when it&apos;s{" "}
          <span style={{ color: TERRACOTTA, fontStyle: "italic" }}>
            ready.
          </span>
        </h2>
        <p
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
          style={{ color: WALNUT }}
        >
          Drop your email and you&apos;ll hear from me on launch day.
          That&apos;s it. No drip campaign, no &ldquo;tips for better
          reading.&rdquo; One email when there&apos;s a TestFlight, one
          when it&apos;s on the App Store.
        </p>
        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          action="#"
          method="post"
          aria-label="Spindl launch waitlist"
        >
          <input
            type="email"
            required
            placeholder="you@yourdomain.com"
            className="flex-1 rounded-full px-5 py-3 text-sm outline-none focus:ring-2"
            style={{
              backgroundColor: CREAM,
              color: ESPRESSO,
              border: `1px solid ${WALNUT}33`,
            }}
          />
          <button
            type="submit"
            className="rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: TERRACOTTA,
              color: spindl.colors.primaryForeground,
            }}
          >
            Notify me
          </button>
        </form>
        <p className="mt-4 text-xs" style={{ color: WALNUT }}>
          Stored in Supabase. Used for one launch email. Not sold,
          not shared, not added to a newsletter.
        </p>
      </div>
    </section>
  );
}

export default function SpindlHomePage() {
  return (
    <>
      <SpindlJsonLd />
      <Hero />
      <Shelves />
      <Journal />
      <YearlyReport />
      <Principles />
      <FounderNote />
      <Pricing />
      <FinalCta />
    </>
  );
}
