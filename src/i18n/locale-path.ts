import { DEFAULT_LOCALE, LOCALE_PREFIXES, type Locale } from "./routing";

export function normalizeInternalPath(value: string): string {
  const pathname = value.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (withLeadingSlash === "/") return "/";
  return withLeadingSlash.replace(/\/+$/, "");
}

export function localizedPath(locale: Locale | string, pathname: string): string {
  const normalized = normalizeInternalPath(pathname);
  const prefix = LOCALE_PREFIXES[locale as Locale];
  if (normalized === "/") return prefix || "/";
  return `${prefix}${normalized}`;
}

/** Build alternate-language URLs for hreflang. */
export function buildAlternates(pathname: string): Record<string, string> {
  const { rest } = stripLocale(pathname);
  const alternates: Record<string, string> = {};
  for (const loc of (Object.keys(LOCALE_PREFIXES) as Locale[])) {
    alternates[loc] = `${LOCALE_PREFIXES[loc]}${rest}`;
  }
  alternates["x-default"] = rest;
  return alternates;
}

export function stripLocale(pathname: string): { locale: Locale; rest: string } {
  const normalized = normalizeInternalPath(pathname);
  const locales = (Object.keys(LOCALE_PREFIXES) as Locale[])
    .filter((locale) => locale !== DEFAULT_LOCALE)
    .sort((a, b) => LOCALE_PREFIXES[b].length - LOCALE_PREFIXES[a].length);

  for (const locale of locales) {
    const prefix = LOCALE_PREFIXES[locale];
    if (normalized === prefix) return { locale, rest: "/" };
    if (normalized.startsWith(`${prefix}/`)) {
      return { locale, rest: normalized.slice(prefix.length) || "/" };
    }
  }
  return { locale: DEFAULT_LOCALE, rest: normalized };
}
