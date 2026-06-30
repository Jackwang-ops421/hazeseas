import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { CONTENT_TYPES } from "@/config/navigation";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hazeseashub.wiki";

  // Static paths that always exist (content-type listing roots + legal pages)
  const contentRoots = CONTENT_TYPES.map((ct) => `/${ct}`);
  const legalPaths = ["/privacy-policy", "/terms-of-service", "/copyright", "/about"];
  const staticPaths = ["/", ...contentRoots, ...legalPaths];

  // Dynamic paths: scan actual MDX content files
  const contentPaths = await getAllContentPaths("en");
  const dynamicPaths = contentPaths.map((item) => `/${[item.contentType, ...item.slug].join("/")}`);

  const paths = [...staticPaths, ...dynamicPaths];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}${locale === "en" ? "" : `/${locale}`}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : 0.7,
    })),
  );
}
