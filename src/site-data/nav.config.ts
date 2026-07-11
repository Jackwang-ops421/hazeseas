/**
 * Navigation configuration — driven by `en.json` home.explore.modules.
 *
 * Rules:
 * - First 5 modules → primary nav bar
 * - Modules 6+ → "More" dropdown
 * - Footer guides/resources columns derived from same module list
 * - Legal column is static (always the same 4 links)
 * - Icons inferred from displayType, fallback to a default
 */

import {
  Gift, BookOpen, Compass, Skull, Link as LinkIcon,
  Zap, Package, Trophy, Map,
} from "lucide-react";
import enJson from "@/locales/en.json";

// ─── Derive from en.json ────────────────────────────────────────────────────

interface ModuleItem {
  order: number;
  name: string;
  description?: string;
  href: string;
  displayType: string;
  highlights?: unknown[];
}

const allModules: ModuleItem[] = (
  enJson.home.explore?.modules ?? []
) as ModuleItem[];

/** Strip game name prefix, keep only the functional label */
function shortLabel(name: string): string {
  return name
    .replace(/^Haze\s+Seas\s+/i, "") // remove game prefix
    .replace(/^[A-Z][a-z]+\s+Seas\s+/i, "");
}

/** Pick a lucide icon name based on displayType */
function iconFor(displayType: string, label: string): string {
  const map: Record<string, string> = {
    "code-cards": "Gift",
    "step-by-step": "BookOpen",
    "tier-grid": "Trophy",
    "card-list": "Zap",
  };
  if (map[displayType]) return map[displayType];
  // fallback heuristics from known labels
  if (/code/i.test(label)) return "Gift";
  if (/guide|beginner/i.test(label)) return "BookOpen";
  if (/fruit/i.test(label)) return "Compass";
  if (/tier/i.test(label)) return "Trophy";
  if (/boss/i.test(label)) return "Skull";
  if (/haki/i.test(label)) return "Zap";
  if (/sea|map/i.test(label)) return "Map";
  if (/trello|discord|community|official/i.test(label)) return "Link";
  if (/item|material/i.test(label)) return "Package";
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

export const NAV_ITEMS: NavItem[] = allModules.map((m, i) => ({
  label: shortLabel(m.name),
  href: m.href,
  icon: iconFor(m.displayType, m.name),
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
    links: allModules.slice(0, 4).map((m) => ({
      label: shortLabel(m.name),
      href: m.href,
    })),
  },
  {
    title: "Resources",
    links: allModules.slice(4, 8).map((m) => ({
      label: shortLabel(m.name),
      href: m.href,
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
  Map,
  Skull,
  Link: LinkIcon,
  Zap,
  Package,
  Trophy,
};
