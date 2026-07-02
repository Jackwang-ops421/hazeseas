import Link from "next/link";
import { FOOTER, HERO } from "@/data/home";

export function Footer({ locale }: { locale: string }) {
  const lp = (href: string) => (locale === "en" ? href : `/${locale}${href}`);

  return (
    <footer className="border-t border-white/10 bg-black/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={lp("/")} className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-[hsl(var(--nav-theme))] text-sm font-black text-white">
                HS
              </span>
              <span className="text-sm font-bold tracking-wide text-white">{HERO.title}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">{FOOTER.tagline}</p>
          </div>

          {/* Link columns */}
          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={lp(link.href)}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-5 text-white/30">{FOOTER.bottom}</p>
        </div>
      </div>
    </footer>
  );
}
