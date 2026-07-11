import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { CONTENT_TYPES } from "@/config/navigation";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hazeseashub.wiki";

  // Static paths - no 404 links
  const staticPaths = [
    "/",
    "/codes",
    "/guide",
    "/fruits",
    "/tier-list",
    "/bosses",
    "/items",
    "/haki",
    "/community",
    "/privacy-policy",
    "/terms-of-service",
    "/copyright",
    "/about",
  ];

  // Dynamic paths: scan actual MDX content files
  const contentPaths = await getAllContentPaths("en");
  const dynamicPaths = contentPaths.map((item) => `/${[item.contentType, ...item.slug].join("/")}`);

  // Deduplicate - prefer static over dynamic if same URL
  const allPaths = [...new Set([...staticPaths, ...dynamicPaths])];

  return routing.locales.flatMap((locale) =>
    allPaths.map((path) => ({
      url: `${siteUrl}${locale === "en" ? "" : `/${locale}`}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : path.startsWith("/codes") || path.startsWith("/guide") ? 0.8 : 0.6,
    })),
  );
}
