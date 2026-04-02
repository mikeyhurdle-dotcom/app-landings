import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Mewstro pages
    {
      url: "https://mewstro.app",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://mewstro.app/privacy",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://mewstro.app/support",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    // SMASHD pages
    {
      url: "https://getsmashd.app",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://getsmashd.app/privacy",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://getsmashd.app/support",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
