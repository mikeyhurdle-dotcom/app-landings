"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    href: "/practice",
    label: "Today",
    icon: (
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z" />
    ),
  },
  {
    href: "/practice/timer",
    label: "Timer",
    icon: (
      <>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2.5M9 2h6" />
      </>
    ),
  },
  {
    href: "/practice/repertoire",
    label: "Pieces",
    icon: (
      <>
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
        <path d="M9 18V5l12-2v13" />
      </>
    ),
  },
  {
    href: "/practice/assignments",
    label: "Assignments",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
  },
  {
    href: "/practice/materials",
    label: "Materials",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </>
    ),
  },
  {
    href: "/practice/leaderboard",
    label: "Leaderboard",
    icon: (
      <>
        <path d="M8 21h8M12 17v4" />
        <path d="M6 3h12v6a6 6 0 0 1-12 0V3Z" />
        <path d="M6 5H3v2a4 4 0 0 0 3 3.87M18 5h3v2a4 4 0 0 1-3 3.87" />
      </>
    ),
  },
];

export function PortalNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-[#E8DFD3] bg-mewstro-surface pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-md items-stretch">
        {TABS.map((tab) => {
          const active =
            tab.href === "/practice"
              ? pathname === "/practice"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                active ? "text-mewstro-primary" : "text-mewstro-dim"
              }`}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {tab.icon}
              </svg>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
