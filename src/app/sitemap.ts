import type { MetadataRoute } from "next";

import { primaryNav } from "@/lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://surau-al-fateh-kita.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return primaryNav
    // /admin is a private panel and must never be indexed. Outbound links
    // (external: true) are not routes on this site, so they are skipped too.
    .filter((item) => item.href !== "/admin" && !item.external)
    .map((item) => ({
      url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: item.href === "/" ? 1 : 0.7,
    }));
}
