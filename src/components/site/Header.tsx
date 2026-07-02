"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, MORE_ITEMS, HERO } from "@/data/home";

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === `/${locale}`;
    return pathname.startsWith(`/${locale}${href}`) || pathname.startsWith(href);
  };

  const localizedHref = (href: string) => (locale === "en" ? href : `/${locale}${href}`);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl transition-shadow ${
        scrolled ? "shadow-lg shadow-black/20" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={localizedHref("/")} className="flex items-center gap-2.5 shrink-0">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-[hsl(var(--nav-theme))] text-sm font-black text-white shadow-sm">
              HS
            </span>
            <div className="hidden leading-tight sm:block">
              <span className="block text-sm font-bold tracking-wide text-white">{HERO.title}</span>
              <span className="block text-[10px] font-medium uppercase tracking-widest text-white/40">Wiki Hub</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={localizedHref(item.href)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-white/5 text-[hsl(var(--nav-theme-light))]"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                More
                <ChevronDown className={`h-4 w-4 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/10 bg-[#0f0f14] p-2 shadow-2xl">
                  {MORE_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={localizedHref(item.href)}
                      onClick={() => setMoreOpen(false)}
                      className={`block rounded-xl px-3 py-2.5 text-sm transition-colors ${
                        isActive(item.href)
                          ? "bg-white/5 text-[hsl(var(--nav-theme-light))]"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              href={locale === "en" ? "/" : `/${locale}`}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              <Globe className="h-3.5 w-3.5" />
              {locale.toUpperCase()}
            </Link>

            <button
              className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/5 md:hidden"
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
        className={`overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-xl transition-all duration-200 md:hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={localizedHref(item.href)}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-white/5 text-[hsl(var(--nav-theme-light))]"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/30">
                More
              </p>
              {MORE_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={localizedHref(item.href)}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-white/5 text-[hsl(var(--nav-theme-light))]"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
