import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { getArticleLocales } from "@/lib/content";
import { SUPPORTED_LOCALES, LOCALE_PREFIXES, DEFAULT_LOCALE, LOCALE_META, type Locale } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hazeseashub.wiki";

/** Static hub pages with full 4-language support */
const FULLY_TRANSLATED = new Set(["/", "/codes", "/trello-discord", "/sea-2-sea-3"]);

/** English-only static pages */
const EN_ONLY = new Set(["/about", "/privacy-policy", "/terms-of-service", "/copyright"]);

/** Content types served as static hubs — skip in dynamic category/article scans */
const STATIC_HUB_TYPES = new Set(["codes"]);

/** Build alternates.languages only for locales that actually have the page */
function buildAlternates(pathname: string, availableLocales: readonly Locale[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const loc of availableLocales) {
    result[LOCALE_META[loc].hreflang] = `${SITE_URL}${LOCALE_PREFIXES[loc]}${pathname}`;
  }
  if (availableLocales.includes(DEFAULT_LOCALE)) {
    result["x-default"] = `${SITE_URL}${pathname}`;
  }
  return result;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];
  const contentRoot = path.join(process.cwd(), "content");

  // ─── 1. Static hub pages (4 locales each) ─────────────────────────────
  for (const hubPath of FULLY_TRANSLATED) {
    for (const loc of SUPPORTED_LOCALES) {
      const locPath = hubPath === "/"
        ? (LOCALE_PREFIXES[loc] || "/")
        : `${LOCALE_PREFIXES[loc]}${hubPath}`;
      urls.push({
        url: `${SITE_URL}${locPath}`,
        changeFrequency: hubPath === "/" ? "daily" as const : "weekly" as const,
        priority: hubPath === "/" ? 1 : 0.8,
        alternates: { languages: buildAlternates(hubPath, SUPPORTED_LOCALES) },
      });
    }
  }

  // ─── 2. English-only legal pages ──────────────────────────────────────
  for (const legalPath of EN_ONLY) {
    urls.push({
      url: `${SITE_URL}${legalPath}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    });
  }

  // ─── 3. Dynamic category pages — per-locale scan ──────────────────────
  for (const loc of SUPPORTED_LOCALES) {
    const locDir = path.join(contentRoot, loc);
    if (!fs.existsSync(locDir)) continue;
    const categories = fs.readdirSync(locDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
    for (const cat of categories) {
      if (STATIC_HUB_TYPES.has(cat)) continue;
      const catDir = path.join(locDir, cat);
      const hasFiles = fs.readdirSync(catDir, { withFileTypes: true })
        .some((f) => f.isFile() && f.name.endsWith(".mdx"));
      if (!hasFiles) continue;
      const catPath = `/${cat}`;
      const availableLocales = SUPPORTED_LOCALES.filter((l) => {
        const d = path.join(contentRoot, l, cat);
        return fs.existsSync(d) && fs.readdirSync(d, { withFileTypes: true })
          .some((f) => f.isFile() && f.name.endsWith(".mdx"));
      });
      urls.push({
        url: `${SITE_URL}${LOCALE_PREFIXES[loc]}${catPath}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: { languages: buildAlternates(catPath, availableLocales) },
      });
    }
  }

  // ─── 4. Dynamic article pages — per-locale scan, dedup by article key ─
  const seenKeys = new Set<string>();
  for (const loc of SUPPORTED_LOCALES) {
    const locPaths = await getAllContentPaths(loc);
    for (const item of locPaths) {
      if (STATIC_HUB_TYPES.has(item.contentType)) continue;
      const articlePath = `/${item.contentType}/${item.slug.join("/")}`;
      const key = `${item.contentType}/${item.slug.join("/")}`;
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);

      const availableLocales = getArticleLocales(item.contentType, item.slug);
      if (availableLocales.length === 0) continue;

      for (const availLoc of availableLocales) {
        urls.push({
          url: `${SITE_URL}${LOCALE_PREFIXES[availLoc]}${articlePath}`,
          changeFrequency: "weekly" as const,
          priority: 0.6,
          alternates: { languages: buildAlternates(articlePath, availableLocales) },
        });
      }
    }
  }

  return urls;
}