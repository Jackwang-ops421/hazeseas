/**
 * @deprecated Import from src/site-data/ instead.
 * This file is a backward-compatibility re-export.
 */

export {
  heroConfig,
  resourceModules,
  codesSection,
  codeSteps,
  activeCodes,
  expiredCodes,
  officialLinksSection,
  beginnerSteps,
  progressionCards,
  faqItems,
  finalCtaConfig,
  footerConfig,
  homeSections,
  type HeroConfig,
  type ResourceModule,
  type CodeStep,
  type ActiveCode,
  type OfficialLink,
  type BeginnerStep,
  type ProgressionCard,
  type FAQItem,
  type HomeSection,
  type FinalCtaConfig,
} from "@/site-data/home.config";

export {
  NAV_ITEMS,
  PRIMARY_NAV,
  SECONDARY_NAV,
  FOOTER_ONLY_NAV,
  FOOTER_COLUMNS,
  MORE_WIKIS_BUTTON,
  NAV_ICON_MAP,
  type NavItem,
  type FooterColumn,
} from "@/site-data/nav.config";

// Legacy aliases
import { heroConfig, activeCodes, expiredCodes, faqItems } from "@/site-data/home.config";
import { FOOTER_COLUMNS, MORE_WIKIS_BUTTON } from "@/site-data/nav.config";

/* @deprecated use heroConfig */
export const HERO = heroConfig;

/* @deprecated use activeCodes */
export const VERIFIED_CODES = activeCodes;

/* @deprecated use expiredCodes */
export const EXPIRED_CODES_LEGACY = expiredCodes;

/* @deprecated use faqItems */
export const FAQS = faqItems;

/* @deprecated use FOOTER_COLUMNS */
export const FOOTER = {
  tagline: "Your fan-made resource hub for Haze Seas codes, fruits, races, bosses, maps, fighting styles, weapons, materials, and beginner guides.",
  columns: FOOTER_COLUMNS,
  bottom: "© 2026 Haze Seas Hub. Not affiliated with Roblox Corporation or the Haze Seas developers. Unofficial fan-made resource website.",
};

/* @deprecated use FOOTER_COLUMNS */
export const MORE_ITEMS = [
  { label: "Official Links", href: "/official-links", icon: "Link", showInNav: true, isSecondary: true },
  { label: "Fighting Styles", href: "/skills", icon: "Zap", showInNav: true, isSecondary: true },
  { label: "Races", href: "/races", icon: "Users", showInNav: true, isSecondary: true },
  { label: "Weapons", href: "/weapons", icon: "Sword", showInNav: true, isSecondary: true },
  { label: "Materials", href: "/materials", icon: "Package", showInNav: true, isSecondary: true },
  { label: "Tier List", href: "/tier-list", icon: "Trophy", showInNav: false },
];

/* @deprecated use MORE_WIKIS_BUTTON */
export const MORE_WIKIS = MORE_WIKIS_BUTTON;

/* Stats strip data */
export const STATS = [
  { value: "Fan-made", label: "Site Type" },
  { value: "Haze Seas", label: "Game Topic" },
  { value: "Safe Links", label: "Source Policy" },
  { value: "No Scripts", label: "Content Rule" },
];
