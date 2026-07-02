"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { LATEST_UPDATES } from "@/data/home";
import { Badge } from "@/components/ui/badge";

export function LatestUpdates() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? LATEST_UPDATES : LATEST_UPDATES.slice(0, 6);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Latest Updates</h2>
        <p className="mt-2 text-sm text-white/50">
          Discover the newest Haze Seas guides, resources, and content updates.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((item) => (
          <Link
            key={item.href + item.title}
            href={item.href}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/50 hover:-translate-y-1 hover:bg-slate-900/80"
          >
            <div className="mb-3 flex items-center justify-between">
              <Badge
                variant="outline"
                className="border-white/10 bg-white/5 text-xs font-medium text-white/60"
              >
                {item.category}
              </Badge>
              <span className="text-xs text-white/30">{item.date}</span>
            </div>
            <h3 className="font-bold text-white group-hover:text-[hsl(var(--nav-theme-light))]">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-5 text-white/50">{item.description}</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
              Read more <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {!showAll && LATEST_UPDATES.length > 6 && (
        <div className="text-center pt-2">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            Show More Updates <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}
