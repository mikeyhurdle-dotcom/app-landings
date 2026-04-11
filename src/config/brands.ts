export type Brand = {
  id: "mewstro";
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
    privacy: string;
    support: string;
  };
};

export const mewstro: Brand = {
  id: "mewstro",
  name: "Mewstro",
  tagline: "Every practice deserves an encore.",
  description:
    "Practice should feel good. Mewstro makes it feel great. A free music practice app with a living cat mascot who celebrates every session — for any instrument, any level, no ads ever.",
  logo: "/mewstro/app-icon.png",
  favicon: "/mewstro/app-icon.png",
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
