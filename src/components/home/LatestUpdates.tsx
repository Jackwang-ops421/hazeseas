"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Gift, BookOpen, Compass, Skull, Map, Zap, Users, Sword, Package, Link2, Sparkles } from "lucide-react";
import { LATEST_UPDATES } from "@/data/home";
import { Badge } from "@/components/ui/badge";

const cardClass =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/50 hover:-translate-y-1 hover:bg-slate-900/80";

const CATEGORY_COLORS: Record<string, string> = {
  codes: "from-emerald-500/20 to-emerald-900/20",
  official: "from-blue-500/20 to-blue-900/20",
  guide: "from-purple-500/20 to-purple-900/20",
  fruits: "from-amber-500/20 to-amber-900/20",
  skills: "from-rose-500/20 to-rose-900/20",
  races: "from-cyan-500/20 to-cyan-900/20",
  bosses: "from-red-500/20 to-red-900/20",
  maps: "from-sky-500/20 to-sky-900/20",
  weapons: "from-orange-500/20 to-orange-900/20",
  materials: "from-teal-500/20 to-teal-900/20",
  updates: "from-indigo-500/20 to-indigo-900/20",
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  codes: Gift,
  official: Link2,
  guide: BookOpen,
  fruits: Compass,
  skills: Zap,
  races: Users,
  bosses: Skull,
  maps: Map,
  weapons: Sword,
  materials: Package,
  updates: Sparkles,
};

export function LatestUpdates() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? LATEST_UPDATES : LATEST_UPDATES.slice(0, 6);

  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Latest Updates</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Discover the newest Haze Seas guides, resources, and content updates.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((item) => {
          const Icon = CATEGORY_ICONS[item.category] || Sparkles;
          const gradient = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.updates;
          return (
            <Link key={item.href + item.title} href={item.href} className={cardClass}>
              <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${gradient}`}>
                <Icon className="h-10 w-10 text-white/70" />
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <Badge
                    variant="outline"
                    className="border-white/10 bg-white/5 text-[10px] font-semibold uppercase tracking-wider text-white/60"
                  >
                    {item.category}
                  </Badge>
                  <span className="shrink-0 text-xs text-white/30">{item.date}</span>
                </div>
                <h3 className="font-bold text-white group-hover:text-[hsl(var(--nav-theme-light))]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-white/50">{item.description}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                  Read more <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {!showAll && LATEST_UPDATES.length > 6 && (
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
