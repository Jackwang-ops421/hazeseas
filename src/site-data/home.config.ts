/**
 * Homepage configuration — drives Hero, Resource Cards, Codes Section,
 * Official Links, Beginner Steps, FAQ, Final CTA, and footer tagline.
 *
 * All free-form copy comes from here so components stay game-agnostic.
 */

import { FooterColumn, FOOTER_COLUMNS, MORE_WIKIS_BUTTON } from "./nav.config";
import enJson from "@/locales/en.json";

// ─── Types ───────────────────────────────────────────────────────────────────

export type SourceStatus = "official" | "verified" | "community" | "video" | "pending" | "unverified";

export interface HeroConfig {
  badge: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; external?: boolean };
  tertiaryCta?: { label: string; href: string };
  /** YouTube video ID for the hero trailer. Empty string = no trailer. */
  trailerVideoId: string;
  stats: Array<{ value: string; label: string }>;
}

export interface ResourceModule {
  title: string;
  href: string;
  description: string;
  icon: string;
}

export interface CodeStep {
  label: string;
  detail: string;
}

export interface ActiveCode {
  code: string;
  status: string;
  reward: string;
  note?: string;
}

export interface OfficialLink {
  title: string;
  description: string;
  href: string;
  external: boolean;
  ariaLabel: string;
}

export interface BeginnerStep {
  label: string;
  detail: string;
}

export interface ProgressionCard {
  title: string;
  href: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HomeSection {
  /** Unique key used to select which component renders this */
  type: "codes" | "official-links" | "beginner-guide" | "article" | "progression" | "faq" | "final-cta";
  /** Section title */
  title: string;
  /** Section description / intro copy */
  description?: string;
  /** Body text (for article sections) */
  body?: string;
  /** Subsections (for article sections) */
  subsections?: Array<{ title: string; body: string }>;
  /** CTA label + href */
  ctaLabel?: string;
  ctaHref?: string;
  /** Generic data slot — shape depends on `type` */
  data?: unknown;
}

export interface FinalCtaConfig {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export const heroConfig: HeroConfig = {
  badge: "Independent Fan-Made Community Wiki",
  title: "Haze Seas",
  description:
    "Haze Seas is the rebuilt form of Haze Piece, a Roblox pirate action RPG where you explore islands, master Devil Fruits and Haki, collect weapons, and challenge bosses. Use this fan-made wiki to check active codes, compare builds, and plan your route through Sea 1, Sea 2, and Sea 3.",
  primaryCta: { label: "Start the Beginner Guide", href: "/beginner-guide" },
  secondaryCta: {
    label: "Compare Devil Fruits",
    href: "/fruits",
  },
  tertiaryCta: { label: "Check Active Codes", href: "/codes" },
  trailerVideoId: "fI0K5bc29EE",
  stats: [
    { value: "Launched Jun 30, 2026", label: "" },
    { value: "Updated Jul 8, 2026", label: "" },
    { value: "249.7M+ Visits", label: "" },
    { value: "3.4M+ Favorites", label: "" },
    { value: "35 Devil Fruits", label: "" },
  ],
};

// ─── Resource Cards (Homepage Modules) ───────────────────────────────────────

// ─── Derive resourceModules from en.json home.explore.modules ──────────────

function moduleIcon(displayType: string, name: string): string {
  const dt = (displayType ?? "").toLowerCase();
  const nm = (name ?? "").toLowerCase();
  if (dt === "code-cards") return "Code2";
  if (dt === "step-by-step") return "BookOpen";
  if (dt === "tier-grid") return "Trophy";
  if (dt === "card-list") return "Zap";
  // fallbacks by keyword
  if (nm.includes("code")) return "Code2";
  if (nm.includes("guide") || nm.includes("beginner")) return "BookOpen";
  if (nm.includes("tier")) return "Trophy";
  if (nm.includes("fruit")) return "Compass";
  if (nm.includes("boss")) return "Skull";
  if (nm.includes("haki")) return "Zap";
  if (nm.includes("sea") || nm.includes("map")) return "Map";
  if (nm.includes("trello") || nm.includes("discord") || nm.includes("community")) return "Link";
  if (nm.includes("item")) return "Package";
  return "BookOpen";
}

export const resourceModules: ResourceModule[] = (
  (enJson.home.explore?.modules ?? []) as Array<{
    name: string;
    description: string;
    href: string;
    displayType: string;
  }>
).map((m) => ({
  title: m.name,
  href: m.href,
  description: m.description,
  icon: moduleIcon(m.displayType, m.name),
}));

// ─── Codes Section ───────────────────────────────────────────────────────────

export const codesSection = {
  title: "Haze Seas Codes",
  description:
    "Use the latest working Haze Seas codes for Race Spins, Gems, Cash, and timed EXP boosts. Haze Seas was formerly Haze Piece, so this section also serves legacy code searches while clearly separating active and expired entries.",
  note: "Code availability can change after updates. Redeem codes exactly as shown and check the official community links when a code stops working.",
  cta: { label: "View Full Codes Guide", href: "/codes" },
};

export const codeSteps: CodeStep[] = [
  {
    label: "Open the game",
    detail: "Launch Haze Seas from the verified Roblox experience page.",
  },
  {
    label: "Find the Codes menu",
    detail: "Open the Menu button on the left side of the screen, then select the gift box / codes icon.",
  },
  {
    label: "Enter the code",
    detail: "Paste the code exactly as shown, including capitalization.",
  },
  {
    label: "Redeem the reward",
    detail: "Press Redeem and rejoin a newer server if a fresh code does not work.",
  },
];

export const activeCodes: ActiveCode[] = [
  { code: "STATREFUND", status: "New", reward: "1 Stat Refund" },
  { code: "DRAGONUPD", status: "New", reward: "5 Race Spins" },
  { code: "OKUCHI", status: "Active", reward: "5 Race Spins" },
  { code: "Sub2XenoTy", status: "Active", reward: "20 minutes of 2x EXP" },
];

export const expiredCodes: string[] = [];

// ─── Official Links ──────────────────────────────────────────────────────────

export const officialLinksSection = {
  title: "Haze Seas Trello and Discord",
  description:
    "Open the verified Haze Seas Trello, Discord, Roblox experience, and developer channel without relying on fan-made wikis. These official links also help players who still search for the game under its former Haze Piece name.",
  links: [
    {
      title: "Roblox Game",
      description: "The official Haze Seas experience page by Haze Studios, currently labeled RELEASE + UPD 1.",
      href: "https://www.roblox.com/games/6918802270/Haze-Seas",
      external: true,
      ariaLabel: "Play Haze Seas on Roblox",
    },
    {
      title: "Official Discord",
      description: "Developer announcements, hotfixes, codes, Fruit stock updates, player questions, and bug reports.",
      href: "https://discord.com/invite/hazeseas",
      external: true,
      ariaLabel: "Official Haze Seas Discord",
    },
    {
      title: "Haze Studios YouTube",
      description: "Official trailers, showcases, rework previews, and update videos from the developer.",
      href: "https://www.youtube.com/@RealHazeStudios",
      external: true,
      ariaLabel: "Official Haze Studios YouTube",
    },
    {
      title: "Official Trello",
      description: "Game information, codes, controls, chest and mastery systems, sea events, Fruits, Swords, Fighting Styles, Races, NPCs, Bosses, and locations.",
      href: "https://trello.com/b/nn8bpTB0/haze-seas-official-trello",
      external: true,
      ariaLabel: "Official Haze Seas Trello Board",
    },
  ] as OfficialLink[],
};

// ─── Beginner Guide Steps ────────────────────────────────────────────────────

export const beginnerSteps: BeginnerStep[] = [
  {
    label: "Redeem codes first",
    detail: "Check the codes page before starting a long session. Money, gems, race spins, and EXP boosts can make early progress smoother.",
  },
  {
    label: "Learn the first route",
    detail: "Use the map guide to understand where you are, what the next route is, and which pages are useful for your current stage.",
  },
  {
    label: "Choose a simple fruit path",
    detail: "For a first build, choose a Fruit with simple targeting, reliable area attacks, and a movement skill, then keep most of your damage points in one main stat.",
  },
  {
    label: "Farm before chasing bosses",
    detail: "Before farming bosses, check whether you need drops, materials, money, or progression practice.",
  },
  {
    label: "Connect weapons and materials",
    detail: "Check what you want to upgrade, where the required materials come from, and whether a boss or island route helps.",
  },
  {
    label: "Recheck after updates",
    detail: "Haze Seas can change after patches. Codes, fruit balance, routes, bosses, and materials may shift.",
  },
];

// ─── Progression Cards ───────────────────────────────────────────────────────

export const progressionCards: ProgressionCard[] = [
  {
    title: "Boss Guide",
    href: "/bosses",
    description: "Use boss pages to plan what to fight next, what preparation is needed, and whether the fight connects to a material, weapon, or progression goal.",
  },
  {
    title: "Haki Guide",
    href: "/haki",
    description: "Unlock and upgrade Armament, Observation, and Conquerors Haki with trainer location and level requirements.",
  },
  {
    title: "Items and Drops",
    href: "/items",
    description: "Use items pages to track upgrade goals, lava ore, sea beast cores, and accessory locations.",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const faqItems: FAQItem[] = [
  {
    question: "What is Haze Seas?",
    answer: "Haze Seas is a free Roblox Action RPG developed by [HS] Haze Studios and launched as a major rebuild of Haze Piece on June 30, 2026. Players explore islands, master Devil Fruits and Haki, collect weapons, and challenge bosses across three seas.",
  },
  {
    question: "Is Haze Seas free to play?",
    answer: "Yes, Haze Seas is a free-to-play Roblox experience available on PC, Mobile, and Xbox. You can join via the official Roblox page and start playing immediately.",
  },
  {
    question: "How do I redeem codes in Haze Seas?",
    answer: "Open the Roblox game, find the in-game Shop or Codes menu, enter the code exactly as shown, and confirm. Rewards such as EXP boosts, Race Spins, Gems, and Stat Refunds are added to your account instantly.",
  },
  {
    question: "What is the best fruit in Haze Seas?",
    answer: "Dragon, Dough, Gum with Gear 4 or Gear 5, Darkness, Phoenix, Electricity, and Tremor are the most commonly cited S-tier Fruits in Haze Seas for grinding, bosses, and PvP.",
  },
  {
    question: "How do I progress from Sea 1 to Sea 2 and Sea 3?",
    answer: "Reach Level 2200 to unlock Sea 2, then find the Dimensional Sailor at Starter Island docks, collect the Poneglyph Scroll in Rocky Pillars cave, and return it to teleport to Sea 2. For Sea 3, reach Level 4200 and defeat the Red Emperor at Flower Capital.",
  },
  {
    question: "Where do I find active codes for Haze Seas?",
    answer: "The Codes page on this wiki tracks Haze Seas codes from the official Roblox description, official Discord announcements, and official Haze Studios YouTube channel. Always verify codes in-game before relying on them.",
  },
];

// ─── Final CTA ───────────────────────────────────────────────────────────────

export const finalCtaConfig: FinalCtaConfig = {
  title: "Ready to Master Haze Seas?",
  description: "From your first quests and code rewards to Fruit awakenings, Haki training, boss drops, and Sea 3 progression, this fan-made wiki keeps your next objective clear.",
  primary: { label: "Read the Beginner Guide", href: "/beginner-guide" },
  secondary: { label: "Play Haze Seas on Roblox", href: "https://www.roblox.com/games/6918802270/Haze-Seas" },
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export const footerConfig = {
  tagline: "Haze Seas Wiki is an independent, fan-made guide for Haze Seas and returning Haze Piece players. It covers active codes, Devil Fruits, tier lists, Haki, bosses, weapons, and Sea 1–3 progression. It is not affiliated with Haze Studios or Roblox.",
  columns: FOOTER_COLUMNS,
  bottom:
    "© 2026 Haze Seas Hub. Not affiliated with Haze Studios or Roblox Corporation.",
  moreWikis: MORE_WIKIS_BUTTON,
};

// ─── Home page section order ─────────────────────────────────────────────────
//
// The homepage renders sections in this order.
// Each entry references a config block defined above.

export const homeSections: HomeSection[] = [
  // Section 1: Hero — rendered separately by HeroSection, not in HomeSections
  // Section 2: Resource cards — rendered separately by ResourceCards, not here
  // Section 3: Latest Updates — auto-generated from MDX, not in this list
  // Section 4: Codes
  {
    type: "codes",
    title: codesSection.title,
    description: codesSection.description,
  },
  // Section 5: Official Links
  {
    type: "official-links",
    title: officialLinksSection.title,
    description: officialLinksSection.description,
  },
  // Section 6: Beginner Guide
  {
    type: "beginner-guide",
    title: "Haze Seas Beginner Guide",
    description: "The best beginner route in Haze Seas is not to chase every system at once. Start with the basics: redeem codes, learn the first route, understand your combat options, and use the map before farming bosses or materials.",
  },
  // Section 7: Fruits article
  {
    type: "article",
    title: "Haze Seas Fruits Guide",
    description: "Haze Seas currently lists 35 Devil Fruits. World Fruits spawn every 60 minutes and despawn after 20 minutes, and VIP servers allow up to five Fruit spawns.",
    body: "Choose a Fruit for your current goal: quest grinding, boss fights, PvP, or travel.\n\nUse the Fruits database to compare rarity, acquisition, grinding, bossing, PvP, and mobility before replacing your current Fruit.",
    subsections: [
      {
        title: "Beginner Fruit Picks",
        body: "For a first build, prioritize easy targeting, reliable area attacks, and a movement skill. Open the grinding guide before replacing a Fruit that already clears quests consistently.",
      },
      {
        title: "Grinding Fruits",
        body: "Use the grinding guide to compare crowd control, range, mobility, and how easily each Fruit clears grouped quest enemies.",
      },
      {
        title: "Boss Fight Fruits",
        body: "For bosses, prioritize safe range, mobility, survivability, and consistent damage windows rather than rarity alone.",
      },
      {
        title: "Fruit Tier List",
        body: "The Fruit Tier List ranks the current roster for grinding, bosses, PvP, mobility, and ease of use.",
      },
    ],
    ctaLabel: "Read Full Fruit Guide",
    ctaHref: "/fruits",
  },
  // Section 8: Fighting Styles article
  {
    type: "article",
    title: "Haze Seas Fighting Styles Guide",
    description: "Fighting styles are a separate combat path from Fruits and swords. Use the Haki and guide pages to check each trainer, unlock requirement, upgrade path, and build role.",
    body: "",
    subsections: [
      {
        title: "Unlock Path",
        body: "Confirm the trainer, sea, level, currency, and required items before travelling.",
      },
      {
        title: "Combat Flow",
        body: "Compare range, movement, crowd control, combo setup, and mastery requirements with your current build.",
      },
      {
        title: "Progression Value",
        body: "Use the full guide to decide whether to unlock a new style now or save the required currency and materials for a later upgrade.",
      },
    ],
    ctaLabel: "Read Fighting Styles Guide",
    ctaHref: "/haki",
  },
  // Section 9: Bosses/Maps/Progression
  {
    type: "progression",
    title: "Haze Seas Bosses, Haki and Progression",
    description: "Start with the upgrade you want, then follow the required boss, trainer, or material route. The Bosses page covers locations and drops, Haki covers unlock requirements, and Items tracks materials such as Lava Ore and Sea Beast Core.",
  },
  // Section 10: Races article
  {
    type: "article",
    title: "Haze Seas Races Guide",
    description: "Race Spins are limited, so check each race before rerolling. Compare races by PvE value, PvP value, mobility, survivability, and fit with your Fruit, sword, or fighting-style build.",
    body: "",
    subsections: [
      {
        title: "Do not reroll blindly",
        body: "Keep a useful race until you have enough spins and a specific target.",
      },
      {
        title: "Match race to build",
        body: "Prioritize bonuses that support the damage type and movement you use most.",
      },
      {
        title: "Update after patches",
        body: "Recheck the Race Tier List after balance updates before spending saved spins.",
      },
    ],
    ctaLabel: "Read Race Guide",
    ctaHref: "/tier-list/haze-seas-race-tier-list",
  },
];
