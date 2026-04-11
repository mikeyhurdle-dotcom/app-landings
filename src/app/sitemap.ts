import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Mewstro pages
    {
      url: "https://mewstro.com",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://mewstro.com/privacy",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://mewstro.com/support",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
