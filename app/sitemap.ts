import type { MetadataRoute } from "next";
import { site } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/events", "/visit", "/connect", "/ads"].map((path) => ({ url: `${site.domain}${path}`, lastModified: new Date(), changeFrequency: path === "/events" ? "weekly" : "monthly", priority: path === "" ? 1 : path === "/ads" ? 0.7 : 0.8 }));
}
