/**
 * Homepage configuration — drives Hero, Resource Cards, Codes Section,
 * Official Links, Beginner Steps, FAQ, Final CTA, and footer tagline.
 *
 * All free-form copy comes from here so components stay game-agnostic.
 */

import { FooterColumn, FOOTER_COLUMNS, MORE_WIKIS_BUTTON } from "./nav.config";

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
  note: string;
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

export const resourceModules: ResourceModule[] = [
  {
    title: "Haze Seas Codes",
    href: "/codes",
    description: "Active codes, expired code notes, redemption steps, and update reminders.",
    icon: "Code2",
  },
  {
    title: "Fruit Tier List",
    href: "/fruits",
    description: "Compare fruits by grinding, boss fights, mobility, and beginner comfort.",
    icon: "Compass",
  },
  {
    title: "Beginner Guide",
    href: "/guide",
    description: "Start Haze Seas with codes, early routes, fruit decisions, and safe progression steps.",
    icon: "BookOpen",
  },
  {
    title: "Leveling Guide",
    href: "/guide#leveling",
    description: "Plan progression around farming sessions, maps, bosses, upgrades, and update checks.",
    icon: "TrendingUp",
  },
  {
    title: "Boss Guide",
    href: "/bosses",
    description: "Use boss pages for route planning, fight preparation, and verified drop tracking.",
    icon: "Skull",
  },
  {
    title: "Map Guide",
    href: "/maps",
    description: "Understand island routes, locations, progression paths, and where to go next.",
    icon: "Map",
  },
  {
    title: "Fighting Styles",
    href: "/skills",
    description: "Compare fighting style unlock intent, combat flow, and progression value.",
    icon: "Zap",
  },
  {
    title: "Races",
    href: "/races",
    description: "Learn race reroll intent, beginner notes, and how to avoid wasting race spins.",
    icon: "Users",
  },
];

// ─── Codes Section ───────────────────────────────────────────────────────────

export const codesSection = {
  title: "Haze Seas Codes",
  description:
    "Haze Seas codes are one of the fastest things to check before you start playing. They can give useful rewards such as money, gems, race spins, or EXP boosts, depending on the current update.",
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
  {
    code: "RELEASE",
    status: "Active",
    reward: "60 minutes of double EXP",
    note: "Use before a grinding session.",
  },
  {
    code: "FREECASH",
    status: "Active",
    reward: "50,000 Money",
    note: "Useful for early purchases and progression.",
  },
  {
    code: "FREEGEMS",
    status: "Active",
    reward: "50 Gems",
    note: "Use gems carefully before committing to upgrades or rerolls.",
  },
  {
    code: "PATCH",
    status: "Active",
    reward: "25 Gems and 15 minutes of double EXP",
    note: "Best redeemed when you are ready to play.",
  },
  {
    code: "SUBSCRIBETOHAZEYT",
    status: "Active",
    reward: "50,000 Money",
    note: "Enter exactly as shown.",
  },
  {
    code: "HAZESEAS2026",
    status: "Active",
    reward: "10 Race Spins",
    note: "Useful if you are planning race rerolls.",
  },
  {
    code: "GROUPONLY",
    status: "Active",
    reward: "10,000 Cash",
    note: "Requires joining the Roblox group.",
  },
];

export const expiredCodes = [
  "GEAR5TH",
  "WOW325KMLG",
  "GOGOGAGA",
  "XMAS2023",
  "VALENTINES2024",
  "NEXT300KCOOL",
  "NEXTAT350KLIKES",
  "LETSGO375KHAZE",
  "425KNEXTCODE123",
  "LETSGET450K2024",
];

// ─── Official Links ──────────────────────────────────────────────────────────

export const officialLinksSection = {
  title: "Haze Seas Official Links",
  description:
    "Use verified Haze Seas resource links to avoid fake mirrors, unsafe script pages, and outdated community posts.",
  links: [
    {
      title: "Roblox Game Page",
      description: "Verified game access link.",
      href: "https://www.roblox.com/games/6918802270/Haze-Seas",
      external: true,
      ariaLabel: "Play Haze Seas on Roblox",
    },
    {
      title: "Official Discord",
      description: "Official Haze Studios community with code drops and updates.",
      href: "https://discord.com/invite/hazeseas",
      external: true,
      ariaLabel: "Official Haze Seas Discord",
    },
    {
      title: "Official YouTube",
      description: "Official Haze Studios channel with trailers and showcases.",
      href: "https://www.youtube.com/@RealHazeStudios",
      external: true,
      ariaLabel: "Official Haze Studios YouTube",
    },
    {
      title: "Trello Board",
      description: "Official Haze Seas resource board with game updates and guides.",
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
    detail: "A beginner fruit choice should be easy to use, comfortable for farming, and helpful in common fights.",
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
    title: "Map Guide",
    href: "/maps",
    description: "Use the map guide to understand where each route leads. Map content should help players avoid getting lost.",
  },
  {
    title: "Materials and Drops",
    href: "/materials",
    description: "Use materials pages to track upgrade goals. If a material source is not verified, mark it as unconfirmed.",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const faqItems: FAQItem[] = [
  {
    question: "What is Haze Seas Hub?",
    answer: "Haze Seas Hub is a fan-made guide website for Haze Seas players. It organizes codes, beginner guides, fruits, bosses, maps, races, fighting styles, weapons, materials, and official resource links in one place.",
  },
  {
    question: "Is Haze Seas Hub official?",
    answer: "No. Haze Seas Hub is not affiliated with Roblox, Haze Seas, or the game developers. It is an unofficial fan-made resource site that links to verified official resources when available.",
  },
  {
    question: "Where can I find Haze Seas codes?",
    answer: "Use the Haze Seas Codes page for active codes, expired codes, and redemption steps. If a code fails, rejoin a newer server and check the official community links before assuming the code is expired.",
  },
  {
    question: "What is the best fruit in Haze Seas?",
    answer: "The best fruit depends on your goal. For beginners, compare fruits by grinding comfort, boss usefulness, mobility, and ease of use instead of rarity alone.",
  },
  {
    question: "How should beginners start Haze Seas?",
    answer: "Beginners should redeem active codes, learn the first route, choose a simple fruit path, understand maps, and avoid chasing bosses or materials without a clear progression goal.",
  },
  {
    question: "Where do I find bosses and map routes?",
    answer: "Use the Boss Guide and Map Guide together. Boss pages help with fight planning, while map pages help you understand routes, islands, and where to go next.",
  },
  {
    question: "Does this site provide scripts or hacks?",
    answer: "No. Haze Seas Hub does not provide scripts, hacks, exploits, auto farm tools, injectors, or cheating tools. The site only provides safe guide content and official resource links.",
  },
  {
    question: "What should be updated first on this wiki?",
    answer: "Codes should be updated first because they expire often. After that, update fruits, beginner progression, bosses, maps, materials, and official links whenever the game changes.",
  },
];

// ─── Final CTA ───────────────────────────────────────────────────────────────

export const finalCtaConfig: FinalCtaConfig = {
  title: "Ready to Explore Haze Seas?",
  description: "Start with verified codes, beginner progression, fruits, maps, bosses, and official resource links.",
  primary: { label: "Get Codes", href: "/codes" },
  secondary: { label: "Start Beginner Guide", href: "/guide" },
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export const footerConfig = {
  tagline: "Your fan-made resource hub for Haze Seas codes, fruits, races, bosses, maps, fighting styles, weapons, materials, and beginner guides.",
  columns: FOOTER_COLUMNS,
  bottom:
    "© 2026 Haze Seas Hub. Not affiliated with Roblox Corporation or the Haze Seas developers. Unofficial fan-made resource website.",
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
    description: "Fruits are one of the most important Haze Seas decisions because they affect how comfortable your farming, fighting, and progression feel.",
    body: "A fruit should not be judged only by rarity. For most players, the better question is whether the fruit is useful for your current goal.\n\nWhen comparing fruits, use four simple checks: grinding speed, boss fight usefulness, mobility, and ease of use.",
    subsections: [
      {
        title: "Beginner Fruit Picks",
        body: "Beginner-friendly fruits should be simple to use and helpful in common fights. This section should link players to safe starter recommendations without inventing exact damage numbers.",
      },
      {
        title: "Grinding Fruits",
        body: "Grinding fruits should help players clear enemies more smoothly. The page should focus on comfort, range, cooldown feel, and farming rhythm instead of unverified damage rankings.",
      },
      {
        title: "Boss Fight Fruits",
        body: "Boss-focused fruits should be evaluated by how well they help players survive, move, and keep pressure during longer fights. Do not claim exact boss performance unless the data is verified.",
      },
      {
        title: "Fruit Tier List",
        body: "The tier list should explain why a fruit is placed in a tier. Avoid unsupported claims such as exact drop rates, hidden multipliers, or guaranteed best choices.",
      },
    ],
    ctaLabel: "Read Full Fruit Guide",
    ctaHref: "/fruits",
  },
  // Section 8: Fighting Styles article
  {
    type: "article",
    title: "Haze Seas Fighting Styles Guide",
    description: "Fighting styles are part of long-term combat planning in Haze Seas.",
    body: "A good fighting style guide should help players understand unlock intent, combat use, and progression value without inventing hidden stats.\n\nFor homepage content, keep the section simple. Explain that fighting styles should be compared by ease of use, skill flow, movement, and how well they match the player's current build.",
    subsections: [
      {
        title: "Unlock Path",
        body: "Players need to know how to start working toward a style and whether it is realistic for their current stage.",
      },
      {
        title: "Combat Flow",
        body: "A style should feel comfortable in normal fights. Mention skill rhythm, movement, and ease of use, but do not invent cooldowns or exact damage.",
      },
      {
        title: "Progression Value",
        body: "Some styles may be better for early progression, while others may become more useful later. If the page lacks verified details, keep the explanation general and link to the full guide.",
      },
    ],
    ctaLabel: "Read Fighting Styles Guide",
    ctaHref: "/skills",
  },
  // Section 9: Bosses/Maps/Progression
  {
    type: "progression",
    title: "Haze Seas Bosses, Maps and Progression",
    description: "Bosses, maps, materials, and weapons should be connected on the homepage because players usually search for them together.",
  },
  // Section 10: Races article
  {
    type: "article",
    title: "Haze Seas Races Guide",
    description: "Races matter because players often use race spins and rerolls early.",
    body: "The homepage should help users understand how to think about races without promising exact best choices or hidden values.\n\nA race guide should not tell players to reroll endlessly just because a race is rare. Instead, it should explain whether a race supports the player's current build, combat style, and progression goal.",
    subsections: [
      {
        title: "Do not reroll blindly",
        body: "Race spins are limited. Players should check what each race is useful for before spending rerolls.",
      },
      {
        title: "Match race to build",
        body: "A race is more valuable when it supports the way the player actually fights or farms.",
      },
      {
        title: "Update after patches",
        body: "Race value can shift after balance changes. If race data is uncertain, mark it as pending verification.",
      },
    ],
    ctaLabel: "Read Race Guide",
    ctaHref: "/races",
  },
];
