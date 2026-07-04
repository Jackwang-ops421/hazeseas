import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { CollapsibleNavGroup } from "@/components/collapsible-nav-group";
import { type NavGroup } from "@/lib/content";

export { TrailerButton, TrailerCard, TrailerDialog } from "./site/Trailer";
export { Header as SiteHeader } from "./site/Header";
export { Footer as SiteFooter } from "./site/Footer";

export function localizeHref(href: string, locale: string) {
  if (locale === "en") return href;
  return `/${locale}${href === "/" ? "" : href}`;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {item.href ? (
            <Link className="hover:text-foreground" href={item.href}>{item.label}</Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export async function WikiSidebar({ locale, navGroups, currentPath }: { locale: string; navGroups: NavGroup[]; currentPath?: string }) {
  const t = await getTranslations({ locale, namespace: "shared" });
  const isActive = (href: string) => currentPath === href;
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-1">
      <section className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">{t("wikiNavigation")}</h3>
        <div className="space-y-4">
          {navGroups.map((group) => (
            <CollapsibleNavGroup
              key={group.slug}
              title={group.title}
              icon={
                <span className="grid h-4 w-4 place-items-center rounded text-[10px] font-bold text-[hsl(var(--nav-theme))]">
                  {group.title[0]}
                </span>
              }
              count={group.count}
              currentPath={currentPath}
            >
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localizeHref(link.href, locale)}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                        isActive(link.href)
                          ? "bg-[hsl(var(--nav-theme)/0.15)] font-semibold text-[hsl(var(--nav-theme))]"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span className="truncate">{link.label}</span>
                      {link.badge && (
                        <Badge variant="secondary" className="ml-auto h-5 border-border px-1.5 text-[10px]">
                          {link.badge}
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleNavGroup>
          ))}
        </div>
      </section>
    </aside>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
