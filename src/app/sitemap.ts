import type { MetadataRoute } from "next";
import { navItems, siteConfig } from "@/constants/site";
import { workCategories } from "@/constants/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...navItems.map((item) => ({
      url: `${siteConfig.url}${item.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...workCategories.map((category) => ({
      url: `${siteConfig.url}/work/${category.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
