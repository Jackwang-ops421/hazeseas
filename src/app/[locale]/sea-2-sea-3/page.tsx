import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, Breadcrumbs } from "@/components/site";
import { SITE_URL } from "@/site-data/site.config";
import { buildAlternates, localizedPath } from "@/i18n/locale-path";
import { routing, LOCALE_PREFIXES, type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lLoc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "sea2sea3.meta" });
  const path = "/sea-2-sea-3";
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

export default async function Sea2Sea3Page({ params }: Props) {
  const { locale } = await params;
  const lLoc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "sea2sea3" });
  const path = "/sea-2-sea-3";
  const pathWithLocale = lLoc === routing.defaultLocale ? path : `${LOCALE_PREFIXES[lLoc]}${path}`;
  const pageUrl = `${SITE_URL}${pathWithLocale}`;

  const tableH = t.raw("tableH") as string[];
  const tableRows = t.raw("tableRows") as string[][];

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
      { "@type": "ListItem", position: 1, name: "Home", item: pageUrl.replace(/\/sea-2-sea-3.*$/, "") || pageUrl },
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
        <p className="mt-4 text-sm text-muted-foreground">{t("lastChecked")}</p>

        <p className="mt-6 text-base leading-7 text-muted-foreground">{t("intro")}</p>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>{tableH.map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className="border-t border-border">
                  {row.map((cell, j) => <td key={j} className="px-4 py-3">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-2xl font-bold text-foreground">{t("sea2.h2")}</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-base text-muted-foreground">
          {(t.raw("sea2.steps") as string[]).map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <Link
          href={localizedPath(locale, t("sea2.ctaHref"))}
          className="mt-4 inline-flex items-center gap-1 rounded-lg bg-[hsl(var(--nav-theme))] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-110"
        >
          {t("sea2.cta")}
        </Link>

        <h2 className="mt-10 text-2xl font-bold text-foreground">{t("sea3.h2")}</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-base text-muted-foreground">
          {(t.raw("sea3.steps") as string[]).map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <Link
          href={localizedPath(locale, t("sea3.ctaHref"))}
          className="mt-4 inline-flex items-center gap-1 rounded-lg bg-[hsl(var(--nav-theme))] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-110"
        >
          {t("sea3.cta")}
        </Link>

        <div className="mt-10 rounded-2xl border border-[hsl(var(--nav-theme-light))] bg-[hsl(var(--nav-theme))]/5 p-5">
          <p className="text-sm leading-6 text-muted-foreground">{t("updateNote")}</p>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Official Sources</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="https://trello.com/b/nn8bpTB0/haze-seas-official-trello" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">Official Haze Seas Trello</a></li>
            <li><a href="https://www.roblox.com/games/6918802270/Haze-Seas" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">Official Roblox Game</a></li>
          </ul>
        </div>
      </article>
    </main>
  );
}