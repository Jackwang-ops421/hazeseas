"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown, Menu, X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  PRIMARY_NAV,
  SECONDARY_NAV,
  MORE_WIKIS_BUTTON,
  NAV_ICON_MAP,
} from "@/site-data/nav.config";
import { siteConfig } from "@/site-data/site.config";
import { ClientThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lp = (href: string) => (locale === "en" ? href : `/${locale}${href}`);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname === `/${locale}` : pathname.startsWith(`/${locale}${href}`);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl transition-shadow dark:border-white/10 dark:bg-black/80 ${
        scrolled ? "shadow-sm dark:shadow-lg dark:shadow-black/20" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={lp("/")} className="flex items-center gap-2.5 shrink-0">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[hsl(var(--nav-theme))] text-sm font-black text-white shadow-sm">
              {siteConfig.logoInitials}
            </span>
            <div className="hidden leading-tight sm:block">
              <span className="block text-sm font-bold tracking-wide text-foreground dark:text-white">{siteConfig.siteName}</span>
              <span className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground dark:text-white/40">Wiki Hub</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((item) => {
              const Icon = item.icon ? NAV_ICON_MAP[item.icon] : null;
              return (
                <Link
                  key={item.href}
                  href={lp(item.href)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-muted text-[hsl(var(--nav-theme))] dark:bg-white/5 dark:text-[hsl(var(--nav-theme-light))]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              );
            })}

            {/* More dropdown */}
            {SECONDARY_NAV.length > 0 && (
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  More
                  <ChevronDown className={`h-4 w-4 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
                </button>
                {moreOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-border bg-popover p-2 shadow-2xl dark:border-white/10 dark:bg-[#0f0f14]">
                    {SECONDARY_NAV.map((item) => {
                      const Icon = item.icon ? NAV_ICON_MAP[item.icon] : null;
                      return (
                        <Link
                          key={item.href}
                          href={lp(item.href)}
                          onClick={() => setMoreOpen(false)}
                          className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                            isActive(item.href)
                              ? "bg-muted text-[hsl(var(--nav-theme))] dark:bg-white/5 dark:text-[hsl(var(--nav-theme-light))]"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                          }`}
                        >
                          {Icon && <Icon className="h-4 w-4" />}
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ClientThemeToggle label="Toggle theme" />

            <LanguageSwitcher locale={locale} />

            <Link
              href={MORE_WIKIS_BUTTON.href}
              aria-label={MORE_WIKIS_BUTTON.ariaLabel}
              className="hidden items-center gap-1.5 rounded-lg bg-[hsl(var(--nav-theme))] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 lg:inline-flex"
            >
              {MORE_WIKIS_BUTTON.label}
            </Link>

            <button
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted dark:text-white/70 dark:hover:bg-white/5 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-all duration-200 dark:border-white/10 dark:bg-black/95 lg:hidden ${
          mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="space-y-1">
            {PRIMARY_NAV.map((item) => {
              const Icon = item.icon ? NAV_ICON_MAP[item.icon] : null;
              return (
                <Link
                  key={item.href}
                  href={lp(item.href)}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-muted text-[hsl(var(--nav-theme))] dark:bg-white/5 dark:text-[hsl(var(--nav-theme-light))]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              );
            })}
            {SECONDARY_NAV.length > 0 && (
              <>
                <div className="mt-3 border-t border-border pt-3 dark:border-white/10">
                  <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 dark:text-white/30">More</p>
                  {SECONDARY_NAV.map((item) => {
                    const Icon = item.icon ? NAV_ICON_MAP[item.icon] : null;
                    return (
                      <Link
                        key={item.href}
                        href={lp(item.href)}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? "bg-muted text-[hsl(var(--nav-theme))] dark:bg-white/5 dark:text-[hsl(var(--nav-theme-light))]"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                        }`}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
