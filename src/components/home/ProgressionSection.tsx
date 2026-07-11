import Link from "next/link";
import { Skull, Zap, Package, ChevronRight } from "lucide-react";
import { progressionCards } from "@/site-data/home.config";

const ICON_MAP: Record<string, React.ElementType> = {
  Boss: Skull, Haki: Zap, Items: Package,
};

const cardClass =
  "group flex flex-col overflow-hidden rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/50 hover:-translate-y-1 hover:bg-card/80 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-[hsl(var(--nav-theme))]/50 dark:hover:bg-slate-900/80 sm:p-5";

export function ProgressionSection() {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-white sm:text-3xl">Haze Seas Bosses, Haki and Progression</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground dark:text-white/50">
          Find progression-critical bosses, train Armament and Observation Haki, and track the weapons, accessories, and upgrade materials your build needs.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {progressionCards.map((card) => {
          const iconKey = card.title.split(" ")[0];
          const Icon = ICON_MAP[iconKey] || Skull;
          return (
            <Link key={card.href + card.title} href={card.href} className={cardClass}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme))]/10 dark:bg-[hsl(var(--nav-theme))]/15">
                <Icon className="h-5 w-5 text-[hsl(var(--nav-theme))] dark:text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-bold text-foreground group-hover:text-[hsl(var(--nav-theme))] dark:text-white dark:group-hover:text-[hsl(var(--nav-theme-light))]">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-5 text-muted-foreground dark:text-white/50">{card.description}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[hsl(var(--nav-theme))] dark:text-[hsl(var(--nav-theme-light))]">
                Explore <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/bosses" className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme))] hover:underline dark:text-[hsl(var(--nav-theme-light))]">
          View Boss Guide <ChevronRight className="h-4 w-4" />
        </Link>
        <Link href="/haki" className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme))] hover:underline dark:text-[hsl(var(--nav-theme-light))]">
          View Haki Guide <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
