import Link from "next/link";
import { ExternalLink, Globe, MessageCircle, Youtube, Kanban } from "lucide-react";
import { officialLinksSection } from "@/site-data/home.config";

const ICON_MAP: Record<string, React.ElementType> = {
  "Roblox Game Page": Globe,
  "Official Discord": MessageCircle,
  "Official YouTube": Youtube,
  "Trello Board": Kanban,
};

const cardClass =
  "group flex items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/50 hover:-translate-y-1 hover:bg-card/80 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-[hsl(var(--nav-theme))]/50 dark:hover:bg-slate-900/80 sm:p-5";

export function OfficialLinksSection() {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-white sm:text-3xl">{officialLinksSection.title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground dark:text-white/50">{officialLinksSection.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {officialLinksSection.links.map((link) => {
          const Icon = ICON_MAP[link.title] || ExternalLink;
          return (
            <Link
              key={link.href + link.title}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              aria-label={link.ariaLabel}
              className={cardClass}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme))]/10 dark:bg-[hsl(var(--nav-theme))]/15">
                <Icon className="h-5 w-5 text-[hsl(var(--nav-theme))] dark:text-[hsl(var(--nav-theme-light))]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground group-hover:text-[hsl(var(--nav-theme))] dark:text-white dark:group-hover:text-[hsl(var(--nav-theme-light))]">{link.title}</h3>
                <p className="mt-1 text-sm leading-5 text-muted-foreground dark:text-white/50">{link.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground/50 transition group-hover:translate-x-0.5 group-hover:text-[hsl(var(--nav-theme))] dark:text-white/30 dark:group-hover:text-[hsl(var(--nav-theme-light))]" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
