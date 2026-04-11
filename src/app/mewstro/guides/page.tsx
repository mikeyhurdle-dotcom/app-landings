import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Learn how to get the most out of Mewstro. Step-by-step guides for students, teachers, and parents.",
};

const guides = [
  {
    slug: "getting-started",
    title: "Getting started",
    description: "Download, sign up, and log your first practice session in under two minutes.",
    icon: "🚀",
  },
  {
    slug: "practice-timer",
    title: "Using the practice timer",
    description: "How to start sessions, pick instruments and task types, and add manual entries.",
    icon: "⏱",
  },
  {
    slug: "streaks",
    title: "Building streaks",
    description: "How streaks work, what the calendar heatmap shows, and how to keep your streak alive.",
    icon: "🔥",
  },
  {
    slug: "milestone-moments",
    title: "Recording Milestone Moments",
    description: "Capture a short clip when something clicks and track your progress over time.",
    icon: "🎥",
  },
  {
    slug: "teacher-setup",
    title: "For teachers: setting up your studio",
    description: "How to create your studio, invite students, and use the teacher dashboard.",
    icon: "🎓",
  },
  {
    slug: "for-parents",
    title: "For parents: what Mewstro is",
    description: "A quick overview for parents of students using Mewstro with their teacher.",
    icon: "👋",
  },
];

export default function GuidesPage() {
  return (
    <div className="py-20 px-6 bg-[#FFFBF7]">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <Image
            src="/mewstro/mascot-conducting.png"
            alt="Mewstro conducting"
            width={100}
            height={100}
            className="mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A2E]">
            How to use Mewstro
          </h1>
          <p className="mt-4 text-lg text-[#6B7280] max-w-xl mx-auto">
            Whether you&apos;re a student, teacher, or parent, these guides
            will get you up and running.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/mewstro/guides/${guide.slug}`}
              className="group rounded-2xl bg-white border border-[#E8DFD3] p-6 hover:border-[#2D8B7E] hover:shadow-md transition-all"
            >
              <span className="text-2xl">{guide.icon}</span>
              <h2 className="mt-3 text-lg font-bold text-[#1A1A2E] group-hover:text-[#2D8B7E] transition-colors">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm text-[#5A4E42] leading-relaxed">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
