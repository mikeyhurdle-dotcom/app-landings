import Link from "next/link";

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <nav className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link
          href="/teacher"
          className="text-[#6B7280] hover:text-[#2D8B7E] transition-colors"
        >
          ← Back to dashboard
        </Link>
        <Link
          href="/teacher/help"
          className="text-[#1A1A2E] hover:text-[#2D8B7E] transition-colors"
        >
          Getting started
        </Link>
        <Link
          href="/teacher/help/faq"
          className="text-[#1A1A2E] hover:text-[#2D8B7E] transition-colors"
        >
          FAQ
        </Link>
        <Link
          href="/teacher/help/contact"
          className="text-[#1A1A2E] hover:text-[#2D8B7E] transition-colors"
        >
          Get in touch
        </Link>
      </nav>
      <article className="prose prose-neutral max-w-none [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:my-3 [&_p]:leading-relaxed [&_ul]:my-3 [&_li]:my-1 [&_strong]:font-semibold [&_a]:text-[#2D8B7E] [&_a]:underline">
        {children}
      </article>
    </div>
  );
}
