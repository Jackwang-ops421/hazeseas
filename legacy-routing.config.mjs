/**
 * Project-specific legacy URL migration rules for hazeseashub.wiki.
 *
 * These are HISTORICAL redirects only. They are NOT template rules.
 * For a new website, reset this file to:
 *
 *   export const legacyRedirects = [];
 *
 * Never generate new pages, nav items, sitemap entries, or MDX files
 * from legacy redirect source URLs.
 */
export const legacyRedirects = [
  // ── Old codes URLs ──────────────────────────────────────────────
  { source: "/codes/haze-seas-codes",             destination: "/codes",      permanent: true },
  { source: "/es/codes/haze-seas-codes",          destination: "/es/codes",   permanent: true },
  { source: "/pt-br/codes/haze-seas-codes",       destination: "/pt-br/codes",permanent: true },
  { source: "/pt-BR/codes/haze-seas-codes",       destination: "/pt-br/codes",permanent: true },
  { source: "/ru/codes/haze-seas-codes",          destination: "/ru/codes",   permanent: true },

  // ── /ja is NOT a current locale — redirect only ────────────────
  { source: "/ja",                                destination: "/",           permanent: true },
  { source: "/ja/codes/haze-seas-codes",          destination: "/codes",      permanent: true },

  // ── Old category URLs that no longer exist ─────────────────────
  { source: "/official/:path*",                   destination: "/community",          permanent: true },
  { source: "/official-links/:path*",             destination: "/community",          permanent: true },
  { source: "/progression/:path*",                destination: "/guide",              permanent: true },
  { source: "/tiers/:path*",                      destination: "/tier-list",          permanent: true },
  { source: "/maps/:path*",                       destination: "/guide",              permanent: true },
  { source: "/materials/:path*",                  destination: "/items",              permanent: true },
  { source: "/styles/:path*",                     destination: "/guide",              permanent: true },
  { source: "/skills/:path*",                     destination: "/guide",              permanent: true },
  { source: "/weapons/:path*",                    destination: "/items",              permanent: true },
  { source: "/races/:path*",                      destination: "/guide",              permanent: true },

  // ── /ja + old category combinations ────────────────────────────
  { source: "/ja/official/:path*",                destination: "/community",          permanent: true },
  { source: "/ja/official-links/:path*",          destination: "/community",          permanent: true },
  { source: "/ja/progression/:path*",             destination: "/guide",              permanent: true },
  { source: "/ja/tiers/:path*",                   destination: "/tier-list",          permanent: true },
  { source: "/ja/maps/:path*",                    destination: "/guide",              permanent: true },
  { source: "/ja/materials/:path*",               destination: "/items",              permanent: true },
  { source: "/ja/styles/:path*",                  destination: "/guide",              permanent: true },
  { source: "/ja/skills/:path*",                  destination: "/guide",              permanent: true },
  { source: "/ja/weapons/:path*",                 destination: "/items",              permanent: true },
  { source: "/ja/races/:path*",                   destination: "/guide",              permanent: true },
];
