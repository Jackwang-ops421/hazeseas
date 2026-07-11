/**
 * Navigation configuration — categories derived from `keywords.json`
 * (see `shiyi_dev_module_0621/hazeseaskyeword.json`) and must match
 * `content/en/` subdirectory names (Part 5 G2).
 *
 * Update this list when keywords.json categories change.
 */

import {
  Gift, BookOpen, Compass, Skull, Link as LinkIcon,
  Zap, Package, Trophy,
} from "lucide-react";

// ─── Category slugs (mirror keywords.json categories and content/en/ subdirs) ─

const CATEGORIES = [
  "codes",
  "guide",
  "fruits",
  "tier-list",
  "bosses",
  "haki",
  "items",
  "community",
] as const;

// ─── Label / icon helpers ───────────────────────────────────────────────────

function navLabel(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function navIcon(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes("code")) return "Gift";
  if (s.includes("guide")) return "BookOpen";
  if (s.includes("fruit")) return "Compass";
  if (s.includes("tier")) return "Trophy";
  if (s.includes("boss")) return "Skull";
  if (s.includes("haki")) return "Zap";
  if (s.includes("item")) return "Package";
  if (s.includes("community") || s.includes("official")) return "Link";
  return "BookOpen";
}

// ─── Nav Items ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  showInNav: boolean;
  isSecondary?: boolean;
}

export const NAV_ITEMS: NavItem[] = CATEGORIES.map((slug, i) => ({
  label: navLabel(slug),
  href: `/${slug}`,
  icon: navIcon(slug),
  showInNav: true,
  ...(i >= 5 ? { isSecondary: true } : {}),
}));

/** Nav items shown as primary (top bar), not secondary */
export const PRIMARY_NAV = NAV_ITEMS.filter((i) => i.showInNav && !i.isSecondary);

/** Nav items shown in the "More" dropdown */
export const SECONDARY_NAV = NAV_ITEMS.filter((i) => i.showInNav && i.isSecondary);

/** Nav items hidden from header but available in footer */
export const FOOTER_ONLY_NAV = NAV_ITEMS.filter((i) => !i.showInNav);

// ─── Footer ─────────────────────────────────────────────────────────────────

export interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Guides",
    links: CATEGORIES.slice(0, 4).map((slug) => ({
      label: navLabel(slug),
      href: `/${slug}`,
    })),
  },
  {
    title: "Resources",
    links: CATEGORIES.slice(4, 8).map((slug) => ({
      label: navLabel(slug),
      href: `/${slug}`,
    })),
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
];

// ─── More Wikis button ──────────────────────────────────────────────────────

export const MORE_WIKIS_BUTTON = {
  label: "More Wikis",
  href: "#",
  ariaLabel: "More wikis coming soon",
};

// ─── Icon map ───────────────────────────────────────────────────────────────

export const NAV_ICON_MAP: Record<string, React.ElementType> = {
  Gift,
  BookOpen,
  Compass,
  Skull,
  Link: LinkIcon,
  Zap,
  Package,
  Trophy,
};