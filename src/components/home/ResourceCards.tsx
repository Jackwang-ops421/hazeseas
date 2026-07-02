import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RESOURCE_CARDS } from "@/data/home";
import {
  Code2, Link2, BookOpen, Compass, Zap, Users, Skull, Map, Sword,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, Link2, BookOpen, Compass, Zap, Users, Skull, Map,
};

export function ResourceCards() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Haze Seas Resources</h2>
        <p className="mt-2 text-sm text-white/50">
          Everything you need to explore Haze Seas: codes, fruits, bosses, maps, races, fighting styles, weapons, materials, and update notes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RESOURCE_CARDS.map((card) => {
          const Icon = ICON_MAP[card.icon] || Link2;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/50 hover:-translate-y-1 hover:bg-slate-900/80"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-bold text-white">{card.title}</h3>
              <p className="mt-1.5 text-sm leading-5 text-white/50">{card.description}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[hsl(var(--nav-theme))]">
                Explore <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
