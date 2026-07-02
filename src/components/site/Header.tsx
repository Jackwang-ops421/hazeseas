"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  NAV_ITEMS,
  MORE_ITEMS,
  HERO,
} from "@/data/home";

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close more dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === `/${locale}`;
    return pathname.startsWith(`/${locale}${href}`) || pathname.startsWith(href);
  };

  const localizedHref = (href: string) =>
    locale === "en" ? href : `/${locale}${href}`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={localizedHref("/")}
            className="flex items-center gap-2.5 shrink-0"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-[hsl(var(--nav-theme)] text-sm font-black text-primary-foreground">
              HS
            </span>
            <span className="text-sm font-bold tracking-wide text-white">
              {HERO.title}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={localizedHref(item.href)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-[hsl(var(--nav-theme-light)) bg-white/5"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white hover:bg-white/5"
              >
                More <ChevronDown className={`h-4 w-4 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-white/10 bg-[#0f0f14] p-2 shadow-xl">
                  {MORE_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={localizedHref(item.href)}
                      onClick={() => setMoreOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
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
            {/* EN button */}
            <Link
              href={locale === "en" ? "/" : `/${locale}`}
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              <Globe className="h-3.5 w-3.5" />
              {locale.toUpperCase()}
            </Link>

            {/* Mobile hamburger */}
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
      {mobileOpen && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={localizedHref(item.href)}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-white/5 text-[hsl(var(--nav-theme-light))"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-3 mt-3">
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
                        ? "bg-white/5 text-[hsl(var(--nav-theme-light))"
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
      )}
    </header>
  );
}
