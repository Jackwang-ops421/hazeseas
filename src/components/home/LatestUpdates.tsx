"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Gift, BookOpen, Compass, Skull, Map, Zap, Users, Sword, Package, Link2, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type LatestUpdateItem } from "@/lib/content";

const CATEGORY_COLORS: Record<string, string> = {
  codes: "from-emerald-500/20 to-emerald-900/20",
  official: "from-blue-500/20 to-blue-900/20",
  guide: "from-purple-500/20 to-purple-900/20",
  fruits: "from-amber-500/20 to-amber-900/20",
  skills: "from-rose-500/20 to-rose-900/20",
  styles: "from-rose-500/20 to-rose-900/20",
  races: "from-cyan-500/20 to-cyan-900/20",
  bosses: "from-red-500/20 to-red-900/20",
  maps: "from-sky-500/20 to-sky-900/20",
  weapons: "from-orange-500/20 to-orange-900/20",
  materials: "from-teal-500/20 to-teal-900/20",
  updates: "from-indigo-500/20 to-indigo-900/20",
  leveling: "from-violet-500/20 to-violet-900/20",
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  codes: Gift,
  official: Link2,
  guide: BookOpen,
  fruits: Compass,
  skills: Zap,
  styles: Zap,
  races: Users,
  bosses: Skull,
  maps: Map,
  weapons: Sword,
  materials: Package,
  updates: Sparkles,
  leveling: TrendingUp,
};

const cardClass =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/50 hover:-translate-y-1 hover:bg-slate-900/80";

interface LatestUpdatesProps {
  /** If not provided, fetches from MDX automatically via getLatestUpdates */
  items?: LatestUpdateItem[];
}

export function LatestUpdates({ items: propItems }: LatestUpdatesProps) {
  const [showAll, setShowAll] = useState(false);
  // When items prop is not provided, this component should be used as a client
  // wrapper — the actual data fetching happens server-side via getLatestUpdates
  // and passed as prop. For the template, we support both patterns.
  const items = propItems ?? [];
  const displayed = showAll ? items : items.slice(0, 6);

  if (items.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Latest Updates</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Discover the newest Haze Seas guides, resources, and content updates.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayed.map((item) => {
          const Icon = CATEGORY_ICONS[item.category] || Sparkles;
          const gradient = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.updates;
          return (
            <Link key={item.href + item.title} href={item.href} className={cardClass}>
              <div className={`flex h-28 items-center justify-center bg-gradient-to-br ${gradient}`}>
                <Icon className="h-9 w-9 text-white/70" />
              </div>
              <div className="flex flex-col p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Badge variant="outline" className="border-white/10 bg-white/5 text-[10px] font-semibold uppercase tracking-wider text-white/60">
                    {item.category}
                  </Badge>
                  <span className="shrink-0 text-xs text-white/30">{item.date}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-[hsl(var(--nav-theme-light))] line-clamp-2">
                  {item.title}
                </h3>
                <p className="mt-1.5 flex-1 text-xs leading-5 text-white/50 line-clamp-3">{item.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                  Read more <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {!showAll && items.length > 6 && (
        <div className="pt-2 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            Show More Updates <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}
