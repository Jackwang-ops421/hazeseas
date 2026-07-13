import { routing, type Locale } from "./routing";

/** Build a localized URL path for a given locale and route. */
export function localizedPath(locale: string, path: string): string {
  if (locale === routing.defaultLocale) {
    return path === "/" ? "/" : path;
  }
  // Normalize pt-BR -> pt-br (lowercase prefix used in URLs)
  const prefix = locale.toLowerCase();
  if (path === "/" || path === "") return `/${prefix}`;
  return `/${prefix}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Strip the locale prefix from a pathname (e.g. /es/codes -> /codes). */
export function stripLocale(pathname: string): { locale: Locale; rest: string } {
  for (const loc of routing.locales) {
    if (loc === routing.defaultLocale) continue;
    const prefix = `/${loc.toLowerCase()}`;
    if (pathname === prefix) return { locale: loc, rest: "/" };
    if (pathname.startsWith(`${prefix}/`)) {
      return { locale: loc, rest: pathname.slice(prefix.length) || "/" };
    }
  }
  return { locale: routing.defaultLocale, rest: pathname };
}

/** Build alternate-language URLs for hreflang. Returns null for x-default excluded. */
export function buildAlternates(pathname: string): Record<string, string> {
  const { locale: current, rest } = stripLocale(pathname);
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternates[loc] = localizedPath(loc, rest);
  }
  // x-default points to default locale (en)
  alternates["x-default"] = localizedPath(routing.defaultLocale, rest);
  // Override current locale hreflang with its normalized URL
  if (current !== routing.defaultLocale) {
    alternates[current] = localizedPath(current, rest);
  }
  return alternates;
}