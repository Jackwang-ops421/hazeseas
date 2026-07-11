import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { routing } from "@/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hazeseashub.wiki";

  // Auto-discover content category directories
  const enDir = path.join(process.cwd(), "content", "en");
  const categoryDirs = fs.existsSync(enDir)
    ? fs.readdirSync(enDir, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => `/${e.name}`)
    : [];

  // Static legal + misc pages
  const legalPaths = [
    "/privacy-policy",
    "/terms-of-service",
    "/copyright",
    "/about",
  ];

  const staticPaths = ["/", ...categoryDirs, ...legalPaths];

  // Dynamic paths: scan actual MDX content files
  const contentPaths = await getAllContentPaths("en");
  const dynamicPaths = contentPaths.map((item) => `/${[item.contentType, ...item.slug].join("/")}`);

  // Deduplicate
  const allPaths = [...new Set([...staticPaths, ...dynamicPaths])];

  return routing.locales.flatMap((locale) =>
    allPaths.map((p) => ({
      url: `${siteUrl}${locale === "en" ? "" : `/${locale}`}${p === "/" ? "" : p}`,
      lastModified: new Date(),
      changeFrequency: p === "/" ? ("daily" as const) : ("weekly" as const),
      priority: p === "/" ? 1 : p.startsWith("/codes") || p.startsWith("/guide") ? 0.8 : 0.6,
    })),
  );
}
