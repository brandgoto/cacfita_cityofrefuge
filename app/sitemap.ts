import type { MetadataRoute } from "next";
import { site } from "@/lib/site-data";

const pages = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/events", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/visit", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/connect", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/ads", priority: 0.6, changeFrequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${site.domain}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
