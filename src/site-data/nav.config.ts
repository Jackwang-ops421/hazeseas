/**
 * Navigation configuration — drives Header nav items and footer columns.
 *
 * Rules:
 * - nav items with showInNav=false are hidden everywhere
 * - primary items appear in the top nav bar (max 5)
 * - secondary items appear in the "More" dropdown
 * - href must point to an existing MDX listing page or static route
 * - category must match a content/ directory name
 */

import {
  Gift, BookOpen, Compass, Skull, Map, Link as LinkIcon,
  Zap, Users, Sword, Package, Trophy,
} from "lucide-react";

export interface NavItem {
  /** Display label */
  label: string;
  /** URL path, e.g. "/guide" or "/codes/haze-seas-codes" */
  href: string;
  /** Lucide icon name */
  icon?: string;
  /** Show in header nav (true) or only in footer (false) */
  showInNav: boolean;
  /** Appear in the "More" dropdown even if showInNav=true */
  isSecondary?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Codes", href: "/codes", icon: "Gift", showInNav: true },
  { label: "Guide", href: "/guide", icon: "BookOpen", showInNav: true },
  { label: "Fruits", href: "/fruits", icon: "Compass", showInNav: true },
  { label: "Bosses", href: "/bosses", icon: "Skull", showInNav: true },
  { label: "Maps", href: "/maps", icon: "Map", showInNav: true },
  // Secondary — appear in "More" dropdown
  { label: "Official Links", href: "/official-links", icon: "Link", showInNav: true, isSecondary: true },
  { label: "Fighting Styles", href: "/skills", icon: "Zap", showInNav: true, isSecondary: true },
  { label: "Races", href: "/races", icon: "Users", showInNav: true, isSecondary: true },
  { label: "Weapons", href: "/weapons", icon: "Sword", showInNav: true, isSecondary: true },
  { label: "Materials", href: "/materials", icon: "Package", showInNav: true, isSecondary: true },
  { label: "Tier List", href: "/tier-list", icon: "Trophy", showInNav: false },
];

/** Nav items shown as primary (top bar), not secondary */
export const PRIMARY_NAV = NAV_ITEMS.filter((i) => i.showInNav && !i.isSecondary);

/** Nav items shown in the "More" dropdown */
export const SECONDARY_NAV = NAV_ITEMS.filter((i) => i.showInNav && i.isSecondary);

/** Nav items hidden from header but available in footer */
export const FOOTER_ONLY_NAV = NAV_ITEMS.filter((i) => !i.showInNav);

/** Footer link columns — label + href pairs */
export interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Guides",
    links: [
      { label: "Codes", href: "/codes" },
      { label: "Beginner Guide", href: "/guide" },
      { label: "Fruit Tier List", href: "/fruits" },
      { label: "Boss Guide", href: "/bosses" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Official Links", href: "/official-links" },
      { label: "Maps", href: "/maps" },
      { label: "Fighting Styles", href: "/skills" },
      { label: "Races", href: "/races" },
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
];

/** More Wikis button shown in header */
export const MORE_WIKIS_BUTTON = {
  label: "More Wikis",
  href: "#",
  ariaLabel: "More wikis coming soon",
};

/** Icon map — add every icon name referenced in NAV_ITEMS */
export const NAV_ICON_MAP: Record<string, React.ElementType> = {
  Gift,
  BookOpen,
  Compass,
  Skull,
  Map,
  Link: LinkIcon,
  Zap,
  Users,
  Sword,
  Package,
  Trophy,
};
