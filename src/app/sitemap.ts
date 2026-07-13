import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/i18n/locale-path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hazeseashub.wiki";

  const enDir = path.join(process.cwd(), "content", "en");
  const categoryDirs = fs.existsSync(enDir)
    ? fs.readdirSync(enDir, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => `/${e.name}`)
    : [];

  const legalPaths = ["/privacy-policy", "/terms-of-service", "/copyright", "/about"];
  const staticHubs = ["/", "/codes", "/trello-discord", "/sea-2-sea-3"];

  // Fully translated static pages (included in all locales)
  const fullyTranslated = new Set([
    "/",
    "/codes",
    "/trello-discord",
    "/sea-2-sea-3",
    ...legalPaths,
  ]);

  // Generate URLs: one entry per (path x locale)
  const urls: MetadataRoute.Sitemap = [];

  for (const path of [...staticHubs, ...categoryDirs, ...legalPaths]) {
    for (const locale of routing.locales) {
      const localizedUrl = `${siteUrl}${localizedPath(locale, path)}`;
      const alternates: Record<string, string> = {};
      for (const altLoc of routing.locales) {
        alternates[altLoc] = `${siteUrl}${localizedPath(altLoc, path)}`;
      }
      alternates["x-default"] = `${siteUrl}${localizedPath(routing.defaultLocale, path)}`;

      const isFullyTranslated = fullyTranslated.has(path);
      const priority = path === "/" ? 1 : isFullyTranslated ? 0.8 : 0.6;
      const changeFrequency = path === "/" ? "daily" as const : "weekly" as const;

      urls.push({
        url: localizedUrl,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: { languages: alternates },
      });
    }
  }

  // Add dynamic MDX article paths per locale
  const contentPaths = await getAllContentPaths("en");
  for (const item of contentPaths) {
    const itemPath = `/${item.contentType}/${item.slug.join("/")}`;
    for (const locale of routing.locales) {
      urls.push({
        url: `${siteUrl}${localizedPath(locale, itemPath)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      });
    }
  }

  return urls;
}