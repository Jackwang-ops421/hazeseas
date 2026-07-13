import Link from "next/link";
import { Globe, Check } from "lucide-react";
import { routing } from "@/i18n/routing";
import { stripLocale } from "@/i18n/locale-path";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  "pt-BR": "Português (BR)",
  es: "Español",
  ru: "Русский",
};

/**
 * Language switcher — receives pathname from Header (client) and renders
 * real <Link> elements with localized equivalent URLs.
 */
export function LanguageSwitcher({ locale, pathname }: { locale: string; pathname: string }) {
  const { locale: current, rest } = stripLocale(pathname);

  if (!routing.locales.includes(current as (typeof routing.locales)[number])) return null;

  return (
    <div className="relative group">
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-[hsl(var(--nav-theme))]/50 hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white/80"
        aria-haspopup="true"
      >
        <Globe className="h-3.5 w-3.5" />
        {LOCALE_LABELS[current] ?? current}
      </button>
      <div className="invisible absolute right-0 top-full z-50 mt-2 min-w-[160px] rounded-lg border border-border bg-popover opacity-0 shadow-2xl transition-opacity group-hover:visible group-hover:opacity-100 dark:border-white/10 dark:bg-[#0f0f14]">
        <ul className="p-1">
          {routing.locales.map((loc) => {
            const isCurrent = loc === current;
            const targetPath = loc === routing.defaultLocale ? rest : `/${loc.toLowerCase()}${rest === "/" ? "" : rest}`;
            return (
              <li key={loc}>
                <Link
                  href={targetPath}
                  hrefLang={loc}
                  aria-current={isCurrent ? "true" : undefined}
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
    </div>
  );
}