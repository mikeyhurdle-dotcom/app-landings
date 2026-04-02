export type Brand = {
  id: "mewstro" | "smashd";
  name: string;
  tagline: string;
  description: string;
  logo: string;
  favicon: string;
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textDim: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  links: {
    appStore: string;
    playStore?: string;
    privacy: string;
    support: string;
  };
  social?: {
    tiktok?: string;
    instagram?: string;
    twitter?: string;
  };
};

export const mewstro: Brand = {
  id: "mewstro",
  name: "Mewstro",
  tagline: "Every practice deserves an encore.",
  description:
    "Practice should feel good. Mewstro makes it feel great. A free music practice app with a living cat mascot who celebrates every session — for any instrument, any level, no ads ever.",
  logo: "/mewstro/mascot.webp",
  favicon: "/mewstro/mascot.webp",
  colors: {
    primary: "#F4845F",
    primaryForeground: "#FFFFFF",
    secondary: "#F9A826",
    accent: "#7C3AED",
    background: "#FFFBF7",
    surface: "#FFFFFF",
    text: "#1A1A2E",
    textDim: "#6B7280",
  },
  fonts: {
    heading: "var(--font-geist-sans)",
    body: "var(--font-geist-sans)",
  },
  links: {
    appStore: "#",
    privacy: "/mewstro/privacy",
    support: "/mewstro/support",
  },
};

export const smashd: Brand = {
  id: "smashd",
  name: "SMASHD",
  tagline: "The Community Hub for Padel",
  description:
    "Run Americano tournaments, track live scores, climb leaderboards, and grow your padel community. The Strava of padel.",
  logo: "/smashd/logo-on-dark.png",
  favicon: "/smashd/logo-on-dark.png",
  colors: {
    primary: "#CCFF00",
    primaryForeground: "#0A0A0F",
    secondary: "#7B2FBE",
    accent: "#00E5CC",
    background: "#0A0A0F",
    surface: "#111118",
    text: "#E8E8F0",
    textDim: "#8888A0",
  },
  fonts: {
    heading: "var(--font-outfit)",
    body: "var(--font-outfit)",
  },
  links: {
    appStore: "#",
    playStore: "#",
    privacy: "/smashd/privacy",
    support: "/smashd/support",
  },
  social: {
    instagram: "https://instagram.com/playsmashd",
    tiktok: "https://tiktok.com/@playsmashd",
  },
};

export const brands: Record<string, Brand> = { mewstro, smashd };
