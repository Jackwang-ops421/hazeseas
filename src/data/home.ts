export interface NavItem {
  label: string;
  href: string;
  icon?: string; // lucide icon name
}

export interface ResourceCard {
  title: string;
  href: string;
  description: string;
  icon: string; // lucide icon name
}

export interface LatestUpdate {
  title: string;
  href: string;
  category: string;
  date: string;
  description: string;
}

export interface CodeStep {
  label: string;
  detail: string;
}

export interface OfficialLink {
  title: string;
  description: string;
  href: string;
  external: boolean;
  ariaLabel?: string;
}

export interface BeginnerStep {
  label: string;
  detail: string;
}

export interface TopicCard {
  title: string;
  href: string;
  badge: string;
  description?: string;
}

export interface ProgressionCard {
  title: string;
  href: string;
  description: string;
}

export interface Stats {
  value: string;
  label: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// ─── Nav ───────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Codes", href: "/codes/haze-seas-codes", icon: "Gift" },
  { label: "Guide", href: "/guide", icon: "BookOpen" },
  { label: "Fruits", href: "/fruits", icon: "Compass" },
  { label: "Bosses", href: "/bosses/haze-seas-boss-guide", icon: "Skull" },
  { label: "Maps", href: "/maps/haze-seas-map-guide", icon: "Map" },
];

export const MORE_ITEMS: NavItem[] = [
  { label: "Official Links", href: "/official-links", icon: "Link" },
  { label: "Fighting Styles", href: "/skills/haze-seas-fighting-styles", icon: "Zap" },
  { label: "Races", href: "/races/haze-seas-race-guide", icon: "Users" },
  { label: "Weapons", href: "/weapons/haze-seas-swords-and-weapons", icon: "Sword" },
  { label: "Materials", href: "/materials", icon: "Package" },
];

export const MORE_WIKIS = {
  label: "More Wikis",
  href: "#",
  ariaLabel: "More wikis coming soon",
};

// ─── Hero ─────────────────────────────────────────────────────────
export const HERO = {
  badge: "Roblox Adventure Wiki",
  title: "Haze Seas Wiki",
  description:
    "Haze Seas Hub is a fan-made Roblox guide hub for Haze Seas codes, fruits, races, bosses, maps, fighting styles, weapons, materials, and beginner progression.",
  primaryCta: { label: "Get Free Codes", href: "/codes/haze-seas-codes" },
  secondaryCta: { label: "Play on Roblox", href: "https://www.roblox.com/games/6918802270/HAZE-PIECE" },
  stats: [
    { value: "Guide Hub", label: "Site Type" },
    { value: "Codes", label: "Popular Search" },
    { value: "Fruits", label: "Key Topic" },
    { value: "Fan-made", label: "Source Note" },
  ],
};

// ─── Resource Cards ────────────────────────────────────────────────
export const RESOURCE_CARDS: ResourceCard[] = [
  {
    title: "Codes",
    href: "/codes/haze-seas-codes",
    description: "Active codes, redemption steps, and expired code notes.",
    icon: "Code2",
  },
  {
    title: "Official Links",
    href: "/official-links",
    description: "Roblox, community, Trello-style resources, and update sources.",
    icon: "Link",
  },
  {
    title: "Beginner Guide",
    href: "/guide/haze-seas-beginner-guide",
    description: "First steps, early priorities, and progression basics.",
    icon: "BookOpen",
  },
  {
    title: "Fruits",
    href: "/fruits",
    description: "Fruit guides, tier list links, and player decision routes.",
    icon: "Compass",
  },
  {
    title: "Fighting Styles",
    href: "/skills/haze-seas-fighting-styles",
    description: "Style unlocks, combat choices, and skill progression.",
    icon: "Zap",
  },
  {
    title: "Races",
    href: "/races/haze-seas-race-guide",
    description: "Race overview, reroll intent, and beginner-friendly picks.",
    icon: "Users",
  },
  {
    title: "Bosses",
    href: "/bosses/haze-seas-boss-guide",
    description: "Boss routes, fight tips, and drop-table structure.",
    icon: "Skull",
  },
  {
    title: "Maps",
    href: "/maps/haze-seas-map-guide",
    description: "Island routes, progression paths, and location planning.",
    icon: "Map",
  },
];

// ─── Latest Updates ────────────────────────────────────────────────
export const LATEST_UPDATES: LatestUpdate[] = [
  {
    title: "Haze Seas Codes: Latest Rewards and Redemption Guide",
    href: "/codes/haze-seas-codes",
    category: "codes",
    date: "Jul 2, 2026",
    description: "Check active Haze Seas codes, redemption steps, expired code notes, and update reminders.",
  },
  {
    title: "Haze Seas Official Links: Roblox, Discord and Update Resources",
    href: "/official-links",
    category: "official",
    date: "Jul 2, 2026",
    description: "Find verified Haze Seas resource links and avoid fake mirrors or unsafe script pages.",
  },
  {
    title: "Haze Seas Beginner Guide: Start, Leveling and Progression Tips",
    href: "/guide/haze-seas-beginner-guide",
    category: "guide",
    date: "Jul 2, 2026",
    description: "Start Haze Seas with beginner-friendly priorities, early progression tips, and practical routes.",
  },
  {
    title: "Haze Seas Fruit Tier List: Best Fruits for Grinding and Bosses",
    href: "/tier-list/haze-seas-fruit-tier-list",
    category: "fruits",
    date: "Jul 2, 2026",
    description: "Compare fruit usefulness by grinding, boss fights, and beginner-friendly choices.",
  },
  {
    title: "Haze Seas Fighting Styles Guide: Unlocks, Skills and Progression",
    href: "/skills/haze-seas-fighting-styles",
    category: "skills",
    date: "Jul 2, 2026",
    description: "Learn how fighting styles fit into combat planning, unlock paths, and progression.",
  },
  {
    title: "Haze Seas Race Guide: Best Races, Rerolls and Player Tips",
    href: "/races/haze-seas-race-guide",
    category: "races",
    date: "Jul 2, 2026",
    description: "Compare race guide notes, reroll intent, and beginner-friendly race choices.",
  },
  {
    title: "Haze Seas Boss Guide: Boss Routes, Fight Tips and Drops",
    href: "/bosses/haze-seas-boss-guide",
    category: "bosses",
    date: "Jul 2, 2026",
    description: "Organize boss routes, fight tips, drops, and related progression pages.",
  },
  {
    title: "Haze Seas Map Guide: Islands, Routes and Progression",
    href: "/maps/haze-seas-map-guide",
    category: "maps",
    date: "Jul 2, 2026",
    description: "Navigate islands, routes, and progression paths with a player-friendly map hub.",
  },
  {
    title: "Haze Seas Swords and Weapons Guide",
    href: "/weapons/haze-seas-swords-and-weapons",
    category: "weapons",
    date: "Jul 2, 2026",
    description: "Organize swords and weapons by unlock intent, progression use, and guide links.",
  },
  {
    title: "Haze Seas Materials Guide: Farming, Drops and Upgrade Resources",
    href: "/materials",
    category: "materials",
    date: "Jul 2, 2026",
    description: "Structure Haze Seas material farming, drop sources, and upgrade planning.",
  },
  {
    title: "Haze Seas Release Date and Updates",
    href: "/guide/haze-seas-release-date-and-updates",
    category: "updates",
    date: "Jul 2, 2026",
    description: "Follow release information, update notes, new content reminders, and important changes.",
  },
  {
    title: "Haze Seas Fruits Hub",
    href: "/fruits",
    category: "fruits",
    date: "Jul 2, 2026",
    description: "Explore fruit guides, tier list links, grinding recommendations, and related resources.",
  },
];

// ─── Codes Section ────────────────────────────────────────────────
export const CODES_SECTION = {
  title: "Haze Seas Codes",
  description:
    "Redeem active Haze Seas codes for free rewards when verified codes are available. Always check the latest update notes before assuming a code still works.",
  expiredNote: "Expired codes will be listed here after verification.",
  cta: { label: "View Full Codes Guide", href: "/codes/haze-seas-codes" },
  steps: [
    {
      label: "Open the game",
      detail: "Launch Haze Seas from the verified Roblox experience page.",
    },
    {
      label: "Find the Codes menu",
      detail: "Open the in-game codes or rewards menu if available.",
    },
    {
      label: "Enter the code",
      detail: "Paste the code exactly as shown, including capitalization.",
    },
    {
      label: "Redeem the reward",
      detail: "Press the redeem button and rejoin a newer server if a fresh code does not work.",
    },
  ] as CodeStep[],
};

// Verified active codes from Roblox game description
export const VERIFIED_CODES: Array<{ code: string; reward: string }> = [
  { code: "GEAR5TH", reward: "EXP code shown in the Roblox game description" },
  { code: "WOW325KMLG", reward: "+3 Race Spins, +15 Gems, Stat Refund" },
];

// ─── Official Links ───────────────────────────────────────────────
export const OFFICIAL_LINKS_SECTION = {
  title: "Haze Seas Official Links",
  description:
    "Use verified Haze Seas resource links to avoid fake mirrors, unsafe script pages, and outdated community posts.",
  links: [
    {
      title: "Roblox Game Page",
      description: "Verified game access link.",
      href: "https://www.roblox.com/games/6918802270/HAZE-PIECE",
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

// ─── Beginner Guide Steps ──────────────────────────────────────────
export const BEGINNER_STEPS = [
  {
    label: "Start with progression",
    detail: "Focus on early routes, basic combat, and unlock priorities before chasing advanced items.",
  },
  {
    label: "Check codes first",
    detail: "Redeem verified codes before long sessions so you do not miss free rewards.",
  },
  {
    label: "Pick a simple fruit path",
    detail: "Use the fruit guide and tier list to understand beginner-friendly choices.",
  },
  {
    label: "Learn maps and bosses",
    detail: "Use map and boss guides together so your farming route has a clear purpose.",
  },
  {
    label: "Track weapons and materials",
    detail: "Keep weapons and materials connected to boss drops and upgrade goals.",
  },
  {
    label: "Review updates",
    detail: "Check update notes when the game changes, because codes, routes, and balance can shift.",
  },
] as BeginnerStep[];

// ─── Fruit / Skill / Progression Sections ───────────────────────────
export const FRUIT_CARDS: TopicCard[] = [
  { title: "Fruit Tier List", href: "/tier-list/haze-seas-fruit-tier-list", badge: "Tier List" },
  { title: "Fruits Hub", href: "/fruits", badge: "Hub" },
  { title: "Beginner Fruit Picks", href: "/tier-list/haze-seas-fruit-tier-list", badge: "Beginner" },
  { title: "Boss Fight Fruits", href: "/tier-list/haze-seas-fruit-tier-list", badge: "Bosses" },
];

export const SKILL_STEPS: BeginnerStep[] = [
  { label: "Unlock Guide", detail: "How to unlock and progress fighting styles." },
  { label: "Style Comparison", detail: "Compare V1 and V2 fighting styles." },
  { label: "Combat Tips", detail: "Combat and skill planning advice." },
  { label: "Skill Progression", detail: "Connect styles with fruits and weapons." },
];

export const PROGRESSION_CARDS: ProgressionCard[] = [
  {
    title: "Boss Guide",
    href: "/bosses/haze-seas-boss-guide",
    description: "Boss routes, fight tips, and drop-table structure.",
  },
  {
    title: "Map Guide",
    href: "/maps/haze-seas-map-guide",
    description: "Island routes, progression paths, and location planning.",
  },
  {
    title: "Materials Guide",
    href: "/materials",
    description: "Farming, drops, and upgrade resources.",
  },
];

// ─── Stats / Trust Strip ─────────────────────────────────────────
export const STATS: Stats[] = [
  { value: "Fan-made", label: "Site Type" },
  { value: "Haze Seas", label: "Game Topic" },
  { value: "Safe Links", label: "Source Policy" },
  { value: "No Scripts", label: "Content Rule" },
];

// ─── FAQ ─────────────────────────────────────────────────────────
export const FAQS: FAQ[] = [
  {
    question: "What is Haze Seas Hub?",
    answer:
      "Haze Seas Hub is a fan-made guide website that organizes Haze Seas codes, guides, fruits, races, bosses, maps, fighting styles, weapons, materials, and update notes for players.",
  },
  {
    question: "Is Haze Seas Hub official?",
    answer:
      "No. Haze Seas Hub is not the official Haze Seas website. It is a fan-made guide hub and should not claim to be affiliated with Roblox or the game developers.",
  },
  {
    question: "Where can I find Haze Seas codes?",
    answer:
      "Use the Haze Seas Codes page on this site. Only verified codes should be listed, and expired codes should be separated from active codes.",
  },
  {
    question: "Does this site provide scripts or hacks?",
    answer:
      "No. This site must not publish scripts, hacks, executors, exploits, auto farm tools, or unsafe downloads.",
  },
  {
    question: "What should be updated first?",
    answer:
      "Codes, official links, fruit tier list, beginner guide, boss guide, map guide, fighting styles, races, weapons, and materials should be updated before adding low-value pages.",
  },
];

// ─── Final CTA ────────────────────────────────────────────────────
export const FINAL_CTA = {
  title: "Ready to Explore Haze Seas?",
  description:
    "Start with verified codes, beginner progression, fruits, maps, bosses, and official resource links.",
  primary: { label: "Get Codes", href: "/codes/haze-seas-codes" },
  secondary: { label: "Start Beginner Guide", href: "/guide/haze-seas-beginner-guide" },
};

// ─── Footer ─────────────────────────────────────────────────────
export const FOOTER = {
  tagline: "Your fan-made resource hub for Haze Seas codes, fruits, races, bosses, maps, fighting styles, weapons, materials, and beginner guides.",
  columns: [
    {
      title: "Guides",
      links: [
        { label: "Codes", href: "/codes/haze-seas-codes" },
        { label: "Beginner Guide", href: "/guide/haze-seas-beginner-guide" },
        { label: "Fruit Tier List", href: "/tier-list/haze-seas-fruit-tier-list" },
        { label: "Boss Guide", href: "/bosses/haze-seas-boss-guide" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Official Links", href: "/official-links" },
        { label: "Maps", href: "/maps/haze-seas-map-guide" },
        { label: "Fighting Styles", href: "/skills/haze-seas-fighting-styles" },
        { label: "Races", href: "/races/haze-seas-race-guide" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "About", href: "/about" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Copyright", href: "/copyright" },
      ],
    },
  ],
  bottom: "© 2026 Haze Seas Hub. Not affiliated with Roblox Corporation or the Haze Seas developers. Unofficial fan-made resource website.",
};
