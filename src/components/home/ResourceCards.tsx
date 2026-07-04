import Link from "next/link";
import { ChevronRight, Code2, BookOpen, Compass, Skull, Map, Zap, Users, Sword, Package, Trophy, TrendingUp } from "lucide-react";
import { type ResourceModule } from "@/site-data/home.config";

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, BookOpen, Compass, Skull, Map, Zap, Users, Sword, Package, Trophy, TrendingUp,
};

const cardClass =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/50 hover:-translate-y-1 hover:bg-slate-900/80";

export function ResourceCards({ items }: { items: ResourceModule[] }) {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Haze Seas Resources</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Explore Haze Seas guides, resources, and content organized by topic.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((card) => {
          const Icon = ICON_MAP[card.icon] || Code2;
          return (
            <Link key={card.href + card.title} href={card.href} className={cardClass}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme))]/15">
                <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-bold text-white">{card.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-5 text-white/50">{card.description}</p>
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
