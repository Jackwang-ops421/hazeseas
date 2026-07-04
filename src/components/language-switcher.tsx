"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  "pt-BR": "Português (BR)",
  es: "Español",
  ru: "Русский",
};

export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  if (!routing.locales.includes(locale as Locale)) return null;
  if (routing.locales.length <= 1) return null;

  const handleSwitch = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    let newPath = pathname;

    // Remove current locale prefix if present
    if (locale !== routing.defaultLocale) {
      const prefix = "/" + locale;
      newPath = pathname.startsWith(prefix) ? pathname.slice(prefix.length) || "/" : pathname;
    }

    // Add new locale prefix (defaultLocale has no prefix)
    if (nextLocale !== routing.defaultLocale) {
      newPath = "/" + nextLocale + (newPath === "/" ? "" : newPath);
    }

    // Set NEXT_LOCALE cookie so middleware does not redirect back
    document.cookie = "NEXT_LOCALE=" + nextLocale + "; path=/; max-age=" + (60 * 60 * 24 * 365) + "; SameSite=Lax";

    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-[hsl(var(--nav-theme))]/50 hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/30 dark:hover:text-white"
        >
          <Globe className="h-3.5 w-3.5" />
          {LOCALE_LABELS[locale] ?? locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleSwitch(loc as Locale)}
            className="flex items-center justify-between gap-3"
          >
            <span className="text-foreground">{LOCALE_LABELS[loc] ?? loc}</span>
            {loc === locale && <Check className="h-4 w-4 text-[hsl(var(--nav-theme))]" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
