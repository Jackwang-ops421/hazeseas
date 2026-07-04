/**
 * Site-wide configuration — single source of truth for game identity,
 * SEO, official links, and organization details.
 *
 * To switch games, replace this file and the content/ directory.
 */

export interface OfficialLinksConfig {
  game: string;
  event: string;
  community: string;
  discord: string;
  youtube: string;
  x: string;
  trello: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
}

export interface SiteConfig {
  /** Display name of the game, e.g. "Haze Seas" */
  gameName: string;
  /** Full site name shown in header/footer, e.g. "Haze Seas Hub Wiki" */
  siteName: string;
  /** Canonical domain, e.g. "https://hazeseashub.wiki" */
  domain: string;
  /** Platform the game runs on, e.g. "Roblox" */
  platform: string;
  /** Genre label, e.g. "Action RPG" */
  genre: string;
  /** Previous/alternate name of the game */
  officialOldName?: string;
  /** Short description used in SEO and OpenGraph */
  description: string;
  /** Disclaimer shown in footer (e.g. "Not affiliated with X") */
  disclaimer: string;
  /** Initials used in the logo badge, e.g. "HS" */
  logoInitials: string;
  /** Official links */
  officialLinks: OfficialLinksConfig;
  /** SEO metadata */
  seo: SeoConfig;
}

export const siteConfig: SiteConfig = {
  gameName: "Haze Seas",
  siteName: "Haze Seas Hub Wiki",
  domain: "https://hazeseashub.wiki",
  platform: "Roblox",
  genre: "Action RPG",
  officialOldName: "Haze Piece",
  description:
    "Haze Seas Hub Wiki gives Roblox players codes, fruit tier lists, swords, fighting styles, bosses, maps, races, and beginner progression guides.",
  disclaimer:
    "Not affiliated with Roblox Corporation or the Haze Seas developers. Unofficial fan-made resource website.",
  logoInitials: "HS",
  officialLinks: {
    game: "https://www.roblox.com/games/6918802270/HAZE-PIECE",
    event: "https://www.roblox.com/events/4232548068492050700",
    community: "https://www.roblox.com/communities/6602131/HS-Haze-Studios",
    discord: "https://discord.com/invite/hazeseas",
    youtube: "https://www.youtube.com/@RealHazeStudios",
    x: "https://x.com/RealHazeStudios",
    trello: "https://trello.com/b/nn8bpTB0/haze-seas-official-trello",
  },
  seo: {
    title: "Haze Seas Wiki — Codes, Fruits & Beginner Guide",
    description:
      "Haze Seas Hub Wiki gives Roblox players codes, fruit tier lists, swords, fighting styles, bosses, maps, races, and beginner progression guides.",
    keywords: [
      "Haze Seas",
      "Roblox",
      "codes",
      "fruits",
      "tier list",
      "wiki",
      "Trello",
      "Discord",
    ],
  },
};

/** Derived: site URL used in server components */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.domain;
