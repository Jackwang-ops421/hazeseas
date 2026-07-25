"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Globe, Check } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { stripLocale, localizedPath } from "@/i18n/locale-path";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  "pt-BR": "Português (BR)",
  es: "Español",
  ru: "Русский",
};

function toLocale(value: string): Locale | null {
  return (routing.locales as readonly string[]).includes(value)
    ? (value as Locale)
    : null;
}

export function LanguageSwitcher({ locale, pathname }: { locale: string; pathname: string }) {
  const { locale: current, rest } = stripLocale(pathname);
  const cur = toLocale(current);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (!cur) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-[hsl(var(--nav-theme))]/50 hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white/80"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Globe className="h-3.5 w-3.5" />
        {LOCALE_LABELS[current] ?? current}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[160px] rounded-lg border border-border bg-popover shadow-2xl dark:border-white/10 dark:bg-[#0f0f14]">
          <ul className="p-1">
            {routing.locales.map((loc) => {
              const isCurrent = loc === current;
              const targetPath = localizedPath(loc as Locale, rest);
              return (
                <li key={loc}>
                  <Link
                    href={targetPath}
                    hrefLang={loc}
                    aria-current={isCurrent ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted dark:hover:bg-white/5"
                  >
                    <span>{LOCALE_LABELS[loc] ?? loc}</span>
                    {isCurrent && <Check className="h-4 w-4 text-[hsl(var(--nav-theme))]" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}