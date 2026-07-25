import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { SUPPORTED_LOCALES, LOCALE_PREFIXES, DEFAULT_LOCALE, LOCALE_META, type Locale } from "@/i18n/routing";

// Pages that have full 4-language translations (static hubs)
const FULLY_TRANSLATED = new Set([
  "/",
  "/codes",
  "/trello-discord",
  "/sea-2-sea-3",
]);

// English-only static pages (legal)
const EN_ONLY = new Set([
  "/about",
  "/privacy-policy",
  "/terms-of-service",
  "/copyright",
]);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hazeseashub.wiki";

/** Build alternates.languages for a path, only for locales that genuinely have the page */
function buildSitemapAlternates(pathname: string, availableLocales: readonly Locale[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const loc of availableLocales) {
    const hreflang = LOCALE_META[loc].hreflang;
    result[hreflang] = `${SITE_URL}${LOCALE_PREFIXES[loc]}${pathname}`;
  }
  if (availableLocales.includes(DEFAULT_LOCALE)) {
    result["x-default"] = `${SITE_URL}${pathname}`;
  }
  return result;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  // 1. Static hub pages (4 locales each)
  const staticHubs = [...FULLY_TRANSLATED];
  for (const hubPath of staticHubs) {
    for (const loc of SUPPORTED_LOCALES) {
      const locPath = hubPath === "/" ? (LOCALE_PREFIXES[loc] || "/") : `${LOCALE_PREFIXES[loc]}${hubPath}`;
      urls.push({
        url: `${SITE_URL}${locPath}`,
        lastModified: new Date(),
        changeFrequency: hubPath === "/" ? "daily" : "weekly",
        priority: hubPath === "/" ? 1 : 0.8,
        alternates: { languages: buildSitemapAlternates(hubPath, SUPPORTED_LOCALES) },
      });
    }
  }

  // 2. English-only legal pages
  for (const legalPath of EN_ONLY) {
    urls.push({
      url: `${SITE_URL}${legalPath}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  // 3. Dynamic category pages — scan actual content/<locale> directories
  const contentRoot = path.join(process.cwd(), "content");
  for (const loc of SUPPORTED_LOCALES) {
    const locDir = path.join(contentRoot, loc);
    if (!fs.existsSync(locDir)) continue;
    const categories = fs.readdirSync(locDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
    for (const cat of categories) {
      const catDir = path.join(locDir, cat);
      const mdxFiles = fs.readdirSync(catDir, { withFileTypes: true })
        .filter((f) => f.isFile() && f.name.endsWith(".mdx"));
      if (mdxFiles.length === 0) continue;
      const catPath = `/${cat}`;
      const availableLocales = SUPPORTED_LOCALES.filter((l) => {
        const d = path.join(contentRoot, l, cat);
        return fs.existsSync(d) && fs.readdirSync(d, { withFileTypes: true }).some((f) => f.isFile() && f.name.endsWith(".mdx"));
      });
      urls.push({
        url: `${SITE_URL}${LOCALE_PREFIXES[loc]}${catPath}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: buildSitemapAlternates(catPath, availableLocales) },
      });
    }
  }

  // 4. Dynamic article pages — only include real MDX per locale
  const allContent = await getAllContentPaths("en");
  for (const item of allContent) {
    for (const loc of SUPPORTED_LOCALES) {
      const articlePath = `/${item.contentType}/${item.slug.join("/")}`;
      const mdxLocDir = path.join(contentRoot, loc, item.contentType);
      const hasFile = fs.existsSync(path.join(mdxLocDir, `${item.slug.join("/")}.mdx`));
      if (hasFile) {
        const availableLocales = SUPPORTED_LOCALES.filter((l) => {
          const d = path.join(contentRoot, l, item.contentType);
          return fs.existsSync(path.join(d, `${item.slug.join("/")}.mdx`));
        });
        urls.push({
          url: `${SITE_URL}${LOCALE_PREFIXES[loc]}${articlePath}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
          alternates: { languages: buildSitemapAlternates(articlePath, availableLocales) },
        });
      }
    }
  }

  return urls;
}