import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TopicCard {
  title: string;
  href: string;
  badge: string;
}

interface TopicGridSectionProps {
  title: string;
  description: string;
  cards: TopicCard[];
  ctaLabel: string;
  ctaHref: string;
}

const cardClass =
  "group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/50 hover:-translate-y-1 hover:bg-slate-900/80 sm:p-5";

export function TopicGridSection({ title, description, cards, ctaLabel, ctaHref }: TopicGridSectionProps) {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.href + card.title} href={card.href} className={cardClass}>
            <div className="mb-3">
              <Badge
                variant="outline"
                className="border-[hsl(var(--nav-theme))]/40 bg-[hsl(var(--nav-theme))]/10 text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]"
              >
                {card.badge}
              </Badge>
            </div>
            <h3 className="font-bold text-white group-hover:text-[hsl(var(--nav-theme-light))]">
              {card.title}
            </h3>
            <div className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
              Explore <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

      <Link
        href={ctaHref}
        className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme-light))] hover:underline"
      >
        {ctaLabel} <ChevronRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
