import type { Metadata } from "next";
import { JsonLd, Breadcrumbs } from "@/components/site";
import { SITE_URL } from "@/site-data/site.config";
import { buildAlternates } from "@/i18n/locale-path";
import { routing, LOCALE_PREFIXES, type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { localizedPath } from "@/i18n/locale-path";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lLoc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "trelloDiscord.meta" });
  const path = "/trello-discord";
  const pathWithLocale = lLoc === routing.defaultLocale ? path : `${LOCALE_PREFIXES[lLoc]}${path}`;
  const alternates = buildAlternates(path);
  const languages: Record<string, string> = {};
  for (const [k, v] of Object.entries(alternates)) languages[k] = v;
  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: { canonical: `${SITE_URL}${pathWithLocale}`, languages },
    robots: { index: true, follow: true },
    openGraph: { title: t("title"), description: t("description"), url: `${SITE_URL}${pathWithLocale}`, siteName: "Haze Seas Wiki" },
  };
}

export default async function TrelloDiscordPage({ params }: Props) {
  const { locale } = await params;
  const lLoc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "trelloDiscord" });
  const path = "/trello-discord";
  const pathWithLocale = lLoc === routing.defaultLocale ? path : `${LOCALE_PREFIXES[lLoc]}${path}`;
  const pageUrl = `${SITE_URL}${pathWithLocale}`;

  const links = t.raw("links") as Array<{ title: string; description: string; href: string; badge: string }>;
  const usage = t.raw("usage") as Array<{ label: string; value: string }>;

  const webPageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("meta.h1"),
    description: t("meta.description"),
    url: pageUrl,
    inLanguage: locale,
  };
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: pageUrl.replace(/\/trello-discord.*$/, "") || pageUrl },
      { "@type": "ListItem", position: 2, name: t("meta.h1"), item: pageUrl },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={webPageData} />
      <JsonLd data={breadcrumbData} />
      <Breadcrumbs items={[{ label: "Home", href: localizedPath(locale, "/") }, { label: t("meta.h1") }]} />

      <article className="rounded-3xl border border-border bg-card/70 p-6 sm:p-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{t("meta.h1")}</h1>

        <div className="mt-4 text-sm text-muted-foreground">{t("lastChecked")}</div>

        <p className="mt-6 text-base leading-7 text-muted-foreground">{t("intro1")}</p>
        <p className="mt-4 text-base leading-7 text-muted-foreground">{t("intro2")}</p>

        <h2 className="mt-10 text-2xl font-bold text-foreground">{t("meta.h1").includes("Discord") ? "Official Resources" : "Official Resources"}</h2>
        <div className="mt-4 grid gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground">{link.title}</h3>
                  <span className="rounded-full bg-[hsl(var(--nav-theme))]/10 px-2 py-0.5 text-xs font-semibold text-[hsl(var(--nav-theme))]">{link.badge}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
              </div>
              <span className="shrink-0 text-[hsl(var(--nav-theme))]">↗</span>
            </a>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-bold text-foreground">{t("whichH2")}</h2>
        <ul className="mt-4 space-y-1.5 text-base text-muted-foreground">
          {usage.map((item, i) => (
            <li key={i}><span className="font-medium text-foreground">{item.label}</span> — {item.value}</li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-[hsl(var(--nav-theme-light))] bg-[hsl(var(--nav-theme))]/5 p-5">
          <h2 className="text-lg font-bold text-foreground">{t("safetyH2")}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("safety")}</p>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Official Sources</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="https://www.roblox.com/games/6918802270/Haze-Seas" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">Official Roblox Game</a></li>
            <li><a href="https://trello.com/b/nn8bpTB0/haze-seas-official-trello" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">Official Haze Seas Trello</a></li>
            <li><a href="https://discord.com/invite/hazeseas" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">Official Haze Studios Discord</a></li>
            <li><a href="https://www.youtube.com/@RealHazeStudios" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">Official Haze Studios YouTube</a></li>
          </ul>
        </div>
      </article>
    </main>
  );
}