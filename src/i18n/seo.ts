import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALE_META, type Locale } from "./routing";
import { localizedPath, normalizeInternalPath } from "./locale-path";
import { SITE_URL, siteConfig } from "@/site-data/site.config";

export function localizedUrl(locale: Locale, pathname: string): string {
  return `${SITE_URL}${localizedPath(locale, pathname)}`;
}

export function languageAlternates(
  pathname: string,
  availableLocales: readonly Locale[],
): Record<string, string> {
  const normalized = normalizeInternalPath(pathname);
  const result: Record<string, string> = {};
  for (const locale of availableLocales) {
    result[LOCALE_META[locale].hreflang] = localizedUrl(locale, normalized);
  }
  if (availableLocales.includes(DEFAULT_LOCALE)) {
    result["x-default"] = localizedUrl(DEFAULT_LOCALE, normalized);
  }
  return result;
}

export function createPageMetadata(input: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  availableLocales: readonly Locale[];
  type?: "website" | "article";
  imagePath?: string;
}): Metadata {
  const {
    locale,
    pathname,
    title,
    description,
    availableLocales,
    type = "website",
    imagePath = "/images/og-image.png",
  } = input;

  const canonical = localizedUrl(locale, pathname);
  const image = imagePath.startsWith("http") ? imagePath : `${SITE_URL}${imagePath}`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: languageAlternates(pathname, availableLocales),
    },
    robots: { index: true, follow: true },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: siteConfig.siteName,
      locale: LOCALE_META[locale].openGraphLocale,
      alternateLocale: availableLocales
        .filter((item) => item !== locale)
        .map((item) => LOCALE_META[item].openGraphLocale),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}