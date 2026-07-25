import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for supported locales.
 *
 * To add a new language you must update:
 *   1. SUPPORTED_LOCALES array below.
 *   2. LOCALE_PREFIXES mapping.
 *   3. LOCALE_META entry.
 *   4. The static imports + `messagesMap` in `src/i18n/request.ts`.
 *   5. The matching JSON file in `src/locales/<locale>.json`.
 */

export const SUPPORTED_LOCALES = [
  "en",
  "es",
  "pt-BR",
  "ru",
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Public URL prefix for each locale. English has no prefix. */
export const LOCALE_PREFIXES: Record<Locale, string> = {
  en: "",
  es: "/es",
  "pt-BR": "/pt-br",
  ru: "/ru",
};

/** SEO metadata for each locale */
export const LOCALE_META: Record<Locale, { label: string; htmlLang: string; hreflang: string; openGraphLocale: string }> = {
  en: { label: "English", htmlLang: "en", hreflang: "en", openGraphLocale: "en_US" },
  es: { label: "Español", htmlLang: "es", hreflang: "es", openGraphLocale: "es_ES" },
  "pt-BR": { label: "Português (Brasil)", htmlLang: "pt-BR", hreflang: "pt-BR", openGraphLocale: "pt_BR" },
  ru: { label: "Русский", htmlLang: "ru", hreflang: "ru", openGraphLocale: "ru_RU" },
};

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "pt-BR": "/pt-br",
    },
  },
  localeDetection: false,
  alternateLinks: false,
});
