import Link from "next/link";
import { ExternalLink, Globe, MessageCircle, Youtube, Kanban } from "lucide-react";
import { OFFICIAL_LINKS_SECTION } from "@/data/home";

const ICON_MAP: Record<string, React.ElementType> = {
  "Roblox Game Page": Globe,
  "Official Discord": MessageCircle,
  "Official YouTube": Youtube,
  "Trello Board": Kanban,
};

const cardClass =
  "group flex items-start gap-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/50 hover:-translate-y-1 hover:bg-slate-900/80";

export function OfficialLinksSection() {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{OFFICIAL_LINKS_SECTION.title}</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">{OFFICIAL_LINKS_SECTION.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {OFFICIAL_LINKS_SECTION.links.map((link) => {
          const Icon = ICON_MAP[link.title] || ExternalLink;
          return (
            <Link
              key={link.href + link.title}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "nofollow noopener noreferrer" : undefined}
              aria-label={link.ariaLabel}
              className={cardClass}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white group-hover:text-[hsl(var(--nav-theme-light))]">
                  {link.title}
                </h3>
                <p className="mt-1 text-sm leading-5 text-white/50">{link.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-[hsl(var(--nav-theme-light))]" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
