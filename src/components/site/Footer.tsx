import Link from "next/link";
import { footerConfig } from "@/site-data/home.config";
import { siteConfig } from "@/site-data/site.config";
import { localizedPath } from "@/i18n/locale-path";
import { routing, type Locale } from "@/i18n/routing";

const LEGAL = new Set(["/about", "/privacy-policy", "/terms-of-service", "/copyright"]);

function toLocale(value: string): Locale | null {
  return (routing.locales as readonly string[]).includes(value) ? (value as Locale) : null;
}

function localize(locale: string, href: string): string {
  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return href;
  if (LEGAL.has(href)) return href;
  const loc = toLocale(locale) ?? routing.defaultLocale as Locale;
  return localizedPath(loc, href);
}

export function Footer({ locale }: { locale: string }) {
  const lp = (href: string) => localize(locale, href);

  return (
    <footer className="border-t border-border bg-muted dark:border-white/10 dark:bg-black/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={lp("/")} className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-[hsl(var(--nav-theme))] text-sm font-black text-white">
                {siteConfig.logoInitials}
              </span>
              <span className="text-sm font-bold tracking-wide text-foreground dark:text-white">{siteConfig.siteName}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground dark:text-white/50">{footerConfig.tagline}</p>
          </div>

          {/* Link columns */}
          {footerConfig.columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 dark:text-white/30">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={lp(link.href)}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:text-white/60 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6 dark:border-white/10">
          <p className="text-xs leading-5 text-muted-foreground/60 dark:text-white/30">{footerConfig.bottom}</p>
          {siteConfig.disclaimer && (
            <p className="mt-2 text-xs leading-5 text-muted-foreground/40 dark:text-white/20">{siteConfig.disclaimer}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
