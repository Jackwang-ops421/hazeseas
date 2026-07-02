import Link from "next/link";
import { Skull, Map as MapIcon, Package, ChevronRight } from "lucide-react";
import { PROGRESSION_CARDS } from "@/data/home";

const ICON_MAP: Record<string, React.ElementType> = {
  Skull,
  Map: MapIcon,
  Package,
};

export function ProgressionSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Haze Seas Bosses, Maps and Progression</h2>
        <p className="mt-2 text-sm text-white/50">
          Plan where to go next by connecting maps, boss routes, weapons, materials, and beginner progression.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRESSION_CARDS.map((card) => {
          const iconKey = card.title.split(" ")[0];
          const Icon = ICON_MAP[iconKey] || Skull;
          return (
            <Link
              key={card.href + card.title}
              href={card.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/50 hover:-translate-y-1 hover:bg-slate-900/80"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                <Icon className="h-6 w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-bold text-white group-hover:text-[hsl(var(--nav-theme-light))]">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-5 text-white/50">{card.description}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                Explore <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
