"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronDown, ChevronRight, Menu, X,
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
import type { NavDropdownGroup } from "@/lib/content";

interface HeaderProps {
  locale: string;
  /** Dropdown bundles keyed by category slug (e.g. "guide", "codes"). */
  dropdownData?: NavDropdownGroup[];
}

export function Header({ locale, dropdownData = [] }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  /** Slug of the currently open primary dropdown, if any */
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Build a quick lookup of dropdown groups by their href prefix (e.g. "/guide")
  const dropdownByPrefix = new Map<string, NavDropdownGroup>();
  for (const g of dropdownData) dropdownByPrefix.set(g.href, g);

  const closeAll = useCallback(() => {
    setMoreOpen(false);
    setOpenDropdown(null);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (moreRef.current && !moreRef.current.contains(target)) {
        setMoreOpen(false);
      }
      if (navRef.current && !navRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeAll]);

  useEffect(() => { closeAll(); setMobileOpen(false); }, [pathname, closeAll]);

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
          <nav ref={navRef} className="hidden items-center gap-1 xl:flex">
            {PRIMARY_NAV.map((item) => {
              const Icon = item.icon ? NAV_ICON_MAP[item.icon] : null;
              const dropdown = dropdownByPrefix.get(item.href);
              const active = isActive(item.href);

              if (!dropdown) {
                // Plain link fallback
                return (
                  <Link
                    key={item.href}
                    href={lp(item.href)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-muted text-[hsl(var(--nav-theme))] dark:bg-white/5 dark:text-[hsl(var(--nav-theme-light))]"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openDropdown === dropdown.slug;
              return (
                <div key={item.href} className="relative">
                  <div
                    className={`flex items-stretch rounded-lg text-sm font-medium transition-colors ${
                      active || isOpen
                        ? "bg-muted text-[hsl(var(--nav-theme))] dark:bg-white/5 dark:text-[hsl(var(--nav-theme-light))]"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    {/* Label navigates to category overview */}
                    <Link
                      href={lp(item.href)}
                      className="flex items-center gap-1.5 rounded-l-lg pl-3 pr-2 py-2"
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.label}
                    </Link>
                    {/* Chevron toggles dropdown */}
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      aria-label={`Show ${item.label} articles`}
                      onClick={() => setOpenDropdown(isOpen ? null : dropdown.slug)}
                      className="flex items-center rounded-r-lg pr-2.5 pl-0.5"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  {isOpen && (
                    <div
                      role="menu"
                      className="absolute left-0 top-full z-40 mt-2 w-72 rounded-2xl border border-border bg-popover p-2 shadow-2xl dark:border-white/10 dark:bg-[#0f0f14]"
                    >
                      <ul className="space-y-0.5">
                        {dropdown.items.map((link) => (
                          <li key={link.href}>
                            <Link
                              role="menuitem"
                              href={lp(link.href)}
                              onClick={() => setOpenDropdown(null)}
                              className={`flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                                isActive(link.href)
                                  ? "bg-muted text-[hsl(var(--nav-theme))] dark:bg-white/5 dark:text-[hsl(var(--nav-theme-light))]"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                              }`}
                            >
                              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--nav-theme))]/70" />
                              <span className="leading-snug">{link.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 border-t border-border pt-2 dark:border-white/10">
                        <Link
                          href={lp(dropdown.readMoreHref)}
                          onClick={() => setOpenDropdown(null)}
                          className="flex items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-[hsl(var(--nav-theme))] hover:bg-muted dark:text-[hsl(var(--nav-theme-light))] dark:hover:bg-white/5"
                        >
                          Read More
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* More dropdown — for items without a dedicated dropdown bundle */}
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

            <LanguageSwitcher locale={locale} pathname={pathname} />

            <Link
              href={MORE_WIKIS_BUTTON.href}
              aria-label={MORE_WIKIS_BUTTON.ariaLabel}
              className="hidden items-center gap-1.5 rounded-lg bg-[hsl(var(--nav-theme))] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 xl:inline-flex"
            >
              {MORE_WIKIS_BUTTON.label}
            </Link>

            <button
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted dark:text-white/70 dark:hover:bg-white/5 xl:hidden"
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
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-all duration-200 dark:border-white/10 dark:bg-black/95 xl:hidden ${
          mobileOpen ? "max-h-[40rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="space-y-1">
            {PRIMARY_NAV.map((item) => {
              const Icon = item.icon ? NAV_ICON_MAP[item.icon] : null;
              const dropdown = dropdownByPrefix.get(item.href);
              const active = isActive(item.href);

              if (!dropdown) {
                return (
                  <Link
                    key={item.href}
                    href={lp(item.href)}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-muted text-[hsl(var(--nav-theme))] dark:bg-white/5 dark:text-[hsl(var(--nav-theme-light))]"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                );
              }

              const mobileKey = `m:${item.href}`;
              return (
                <details key={mobileKey} className="group rounded-xl">
                  <summary
                    className={`flex cursor-pointer list-none items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-muted text-[hsl(var(--nav-theme))] dark:bg-white/5 dark:text-[hsl(var(--nav-theme-light))]"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <Link
                      href={lp(item.href)}
                      onClick={(e) => { e.stopPropagation(); setMobileOpen(false); }}
                      className="flex-1"
                    >
                      {item.label}
                    </Link>
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="mt-1 space-y-1 border-l border-border pl-4 ml-6 dark:border-white/10">
                    {dropdown.items.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={lp(link.href)}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                            isActive(link.href)
                              ? "bg-muted text-[hsl(var(--nav-theme))] dark:bg-white/5 dark:text-[hsl(var(--nav-theme-light))]"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={lp(dropdown.readMoreHref)}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-[hsl(var(--nav-theme))] dark:text-[hsl(var(--nav-theme-light))]"
                      >
                        Read More
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </details>
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
