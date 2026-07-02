import Link from "next/link";
import { ChevronRight, ExternalLink, Play } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { NAVIGATION_CONFIG } from "@/config/navigation";
import type { NavGroup } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { CollapsibleNavGroup } from "@/components/collapsible-nav-group";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ClientThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export function localizeHref(href: string, locale: string) {
  if (locale === "en") return href;
  return `/${locale}${href === "/" ? "" : href}`;
}

export async function SiteHeader({ locale }: { locale: string }) {
  return <Header locale={locale} />;
}

export async function SiteFooter({ locale }: { locale: string }) {
  return <Footer locale={locale} />;
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
      {/* Wiki Navigation */}
      <section className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">{t("wikiNavigation")}</h3>
        <div className="space-y-4">
          {navGroups.map((group) => (
            <CollapsibleNavGroup
              key={group.slug}
              title={group.title}
              icon={
                <span className="grid h-4 w-4 place-items-center rounded text-[10px] font-bold text-[hsl(var(--nav-theme)]">
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
                          ? "bg-[hsl(var(--nav-theme)/0.15] font-semibold text-[hsl(var(--nav-theme))"
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

      {/* Active Codes */}
      <section className="rounded-2xl border border-border bg-card/60 p-5">
        <h3 className="mb-3 text-sm font-bold text-foreground">{t("activeCodes")}</h3>
        <div className="space-y-3 text-sm">
          {/* Placeholder - real codes come from content/en/codes MDX */}
          <div className="rounded-xl bg-muted p-3">
            <p className="text-xs text-muted-foreground">Codes will be listed here after verification.</p>
          </div>
          <Link
            href={localizeHref("/codes", locale)}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme))]"
          >
            {t("viewAllCodes")} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </aside>
  );
}

export function TrailerCard({ videoId }: { videoId: string }) {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border shadow-lg transition-all duration-200">
      <div className="relative aspect-video w-full">
        <img
          src="/images/hero-trailer-thumbnail.jpg"
          alt="Haze Seas Official Trailer"
          className="size-full object-cover transition-all duration-200 group-hover:brightness-80"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md transition-transform duration-200 group-hover:scale-105 sm:size-24">
          <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md transition-transform duration-200 group-hover:scale-110 sm:size-16">
            <Play
              className="size-6 fill-white text-white sm:size-7"
              style={{ filter: "drop-shadow(rgba(0,0,0,0.07) 0 4px 3px) drop-shadow(rgba(0,0,0,0.06) 0 2px 2px)" }}
            />
          </div>
        </div>
      </div>
      <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[11px] text-white">YouTube</span>
    </div>
  );
}

export function TrailerDialog({ videoId }: { videoId: string }) {
  return (
    <dialog
      id="trailer-dialog"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-200"
      onClick={(e) => {
        const d = document.getElementById("trailer-dialog") as HTMLDialogElement;
        if (e.target === d) {
          d.close();
          d.classList.add("opacity-0", "pointer-events-none");
          d.classList.remove("opacity-100", "pointer-events-auto");
        }
      }}
    >
      <div className="relative mx-4 w-full max-w-4xl">
        <iframe
          id="trailer-iframe"
          className="aspect-video w-full rounded-xl"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <button
          className="absolute -top-10 right-0 text-sm font-medium text-white/80 hover:text-white"
          onClick={() => {
            const d = document.getElementById("trailer-dialog") as HTMLDialogElement;
            d.close();
            d.classList.add("opacity-0", "pointer-events-none");
            d.classList.remove("opacity-100", "pointer-events-auto");
          }}
        >
          ✕ Close
        </button>
      </div>
    </dialog>
  );
}

export function TrailerButton({ videoId }: { videoId: string }) {
  return (
    <>
      <button
        type="button"
        className="w-full"
        aria-haspopup="dialog"
        onClick={() => {
          const d = document.getElementById("trailer-dialog") as HTMLDialogElement;
          const f = document.getElementById("trailer-iframe") as HTMLIFrameElement;
          if (f) f.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
          if (d) {
            d.showModal();
            d.classList.remove("opacity-0", "pointer-events-none");
            d.classList.add("opacity-100", "pointer-events-auto");
          }
        }}
      >
        <TrailerCard videoId={videoId} />
      </button>
      <TrailerDialog videoId={videoId} />
    </>
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
