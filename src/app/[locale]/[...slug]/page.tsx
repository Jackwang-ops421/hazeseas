import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Swords } from "lucide-react";
import { getMessages } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { getAllContent, getAllContentPaths, getContent, getDynamicNavigation, type ContentItem } from "@/lib/content";
import { Breadcrumbs, JsonLd, WikiSidebar, localizeHref } from "@/components/site";
import { MobileTOC, SidebarTOC } from "@/components/table-of-contents";
import { CONTENT_TYPES } from "@/config/navigation";
import { routing, type Locale } from "@/i18n/routing";
import en from "@/locales/en.json";
import { ArticleLayout } from "@/components/article-layout";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hazeseashub.wiki";
type Messages = typeof en;

function languageAlternates(pathname: string) {
  return Object.fromEntries(routing.locales.map((locale) => [locale, locale === "en" ? pathname : `/${locale}${pathname}`]));
}

export async function generateStaticParams() {
  const paths = await getAllContentPaths("en");
  const listingPages = CONTENT_TYPES.map((ct) => ({ slug: [ct] }));
  return [...listingPages, ...paths.map((item) => ({ slug: [item.contentType, ...item.slug] }))];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string[] }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const messages = (await getMessages({ locale })) as Messages;
  if (slug.length === 1 && CONTENT_TYPES.includes(slug[0])) {
    const ct = slug[0];
    const ctTitle = ct.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const ctMessages = (messages as unknown as Record<string, Record<string, string>>)[ct];
    const title = ctMessages?.overviewTitle || `${ctTitle} — Haze Seas Wiki`;
    const description = ctMessages?.overviewDescription || `Browse all ${ctTitle.toLowerCase()} guides and resources for Haze Seas Wiki.`;
    return { title, description, alternates: { canonical: `/${ct}`, languages: languageAlternates(`/${ct}`) }, openGraph: { title, description, url: `${siteUrl}/${ct}`, siteName: "Haze Seas Wiki", images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630, alt: "Haze Seas Wiki" }] } };
  }
  const [contentType, ...articleSlug] = slug;
  const item = await getContent(contentType, articleSlug, locale as Locale);
  if (!item) return { title: "Not Found" };
  const pathname = `/${contentType}/${articleSlug.join("/")}`;
  const image = item.metadata.image?.startsWith("http") ? item.metadata.image : `${siteUrl}${item.metadata.image ?? "/images/hero.webp"}`;
  return { title: `${item.metadata.title} — Haze Seas Wiki`, description: item.metadata.description, alternates: { canonical: pathname, languages: languageAlternates(pathname) }, openGraph: { type: "article", title: item.metadata.title, description: item.metadata.description, url: `${siteUrl}${pathname}`, images: [image] }, twitter: { card: "summary_large_image", images: [image] } };
}

export default async function SlugPage({ params }: { params: Promise<{ locale: Locale; slug: string[] }> }) {
  const { locale, slug } = await params;
  const navGroups = getDynamicNavigation(locale);
  if (slug.length === 1) return <NavigationPage locale={locale} contentType={slug[0]} navGroups={navGroups} />;
  return <DetailPage locale={locale} contentType={slug[0]} slug={slug.slice(1)} navGroups={navGroups} />;
}

async function NavigationPage({ locale, contentType, navGroups }: { locale: Locale; contentType: string; navGroups: import("@/lib/content").NavGroup[] }) {
  if (!CONTENT_TYPES.includes(contentType)) notFound();
  const messages = (await getMessages({ locale })) as Messages;
  const items = await getAllContent(contentType, locale as Locale);
  const listData = { "@context": "https://schema.org", "@type": "ItemList", name: `${contentType} — Haze Seas Wiki`, itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, url: `${siteUrl}/${contentType}/${item.slug}`, name: item.metadata.title })) };

  const sectionTitle = (messages as unknown as Record<string, Record<string, string>>)[contentType]?.overviewTitle
    || contentType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const sectionDesc = (messages as unknown as Record<string, Record<string, string>>)[contentType]?.overviewDescription || "";

  return <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><JsonLd data={listData} /><div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]"><article><Breadcrumbs items={[{ label: messages.shared.home, href: localizeHref("/", locale) }, { label: sectionTitle }]} /><h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{sectionTitle}</h1>{sectionDesc && <p className="mt-5 text-lg leading-8 text-muted-foreground">{sectionDesc}</p>}{items.length > 0 && <><div className="mt-10 grid gap-4 sm:grid-cols-2">{items.map((item) => <Link key={`/${contentType}/${item.slug}`} href={localizeHref(`/${contentType}/${item.slug}`, locale)} className="group rounded-2xl border border-border bg-card/70 p-5 transition hover:-translate-y-0.5 hover:border-[hsl(var(--nav-theme-light))]"><div className="mb-4 flex items-center justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-muted text-[hsl(var(--nav-theme))]"><Swords className="h-5 w-5" /></span>{item.metadata.badge && <Badge variant="secondary">{item.metadata.badge}</Badge>}</div><h3 className="text-lg font-bold text-foreground group-hover:text-[hsl(var(--nav-theme))]">{item.metadata.title}</h3><p className="mt-2 min-h-[3rem] text-sm leading-6 text-muted-foreground">{item.metadata.description}</p><span className="mt-4 inline-flex items-center text-sm font-semibold text-[hsl(var(--nav-theme))]">{messages.shared.readMore}<ChevronRight className="ml-1 h-4 w-4" /></span></Link>)}</div></>}{items.length === 0 && <p className="mt-8 text-muted-foreground">{messages.shared.noGuidesAvailable}</p>}</article><WikiSidebar locale={locale} navGroups={navGroups} currentPath={`/${contentType}`} /></div></main>;
}

const RELATED_BY_TYPE: Record<string, Array<{ title: string; description: string; href: string }>> = {
  "codes": [
    { title: "Haze Seas Official Links", description: "Official Roblox page and community resources.", href: "/official-links" },
    { title: "Release Date and Updates", description: "Update notes and new content reminders.", href: "/guide/haze-seas-release-date-and-updates" },
    { title: "Beginner Guide", description: "Start your Haze Seas journey.", href: "/guide/haze-seas-beginner-guide" },
    { title: "Fruit Tier List", description: "Compare fruits for grinding and boss fights.", href: "/tier-list/haze-seas-fruit-tier-list" },
  ],
  "guide": [
    { title: "Haze Seas Codes", description: "Active codes and redemption steps.", href: "/codes/haze-seas-codes" },
    { title: "Map Guide", description: "Islands, routes, and progression.", href: "/maps/haze-seas-map-guide" },
    { title: "Race Guide", description: "Compare races and reroll tips.", href: "/races/haze-seas-race-guide" },
    { title: "Fighting Styles", description: "Combat styles and unlock paths.", href: "/skills/haze-seas-fighting-styles" },
  ],
  "tier-list": [
    { title: "Fruits Hub", description: "Fruit guides and tier list links.", href: "/fruits" },
    { title: "Fighting Styles", description: "Combat styles and skill planning.", href: "/skills/haze-seas-fighting-styles" },
    { title: "Boss Guide", description: "Boss routes and fight tips.", href: "/bosses/haze-seas-boss-guide" },
    { title: "Beginner Guide", description: "Start your Haze Seas journey.", href: "/guide/haze-seas-beginner-guide" },
  ],
  "bosses": [
    { title: "Map Guide", description: "Islands, routes, and progression.", href: "/maps/haze-seas-map-guide" },
    { title: "Swords and Weapons", description: "Weapon unlocks and progression.", href: "/weapons/haze-seas-swords-and-weapons" },
    { title: "Materials Guide", description: "Farming routes and drop sources.", href: "/materials" },
    { title: "Fruit Tier List", description: "Compare fruits for grinding and boss fights.", href: "/tier-list/haze-seas-fruit-tier-list" },
  ],
  "official-links": [
    { title: "Haze Seas Codes", description: "Active codes and redemption steps.", href: "/codes/haze-seas-codes" },
    { title: "Release Date and Updates", description: "Update notes and new content.", href: "/guide/haze-seas-release-date-and-updates" },
    { title: "Beginner Guide", description: "Start your Haze Seas journey.", href: "/guide/haze-seas-beginner-guide" },
    { title: "Map Guide", description: "Islands, routes, and progression.", href: "/maps/haze-seas-map-guide" },
  ],
  "weapons": [
    { title: "Materials Guide", description: "Farming routes and drop sources.", href: "/materials" },
    { title: "Boss Guide", description: "Boss routes and fight tips.", href: "/bosses/haze-seas-boss-guide" },
    { title: "Fighting Styles", description: "Combat styles and unlock paths.", href: "/skills/haze-seas-fighting-styles" },
    { title: "Fruit Tier List", description: "Compare fruits for grinding and boss fights.", href: "/tier-list/haze-seas-fruit-tier-list" },
  ],
  "materials": [
    { title: "Boss Guide", description: "Boss routes and fight tips.", href: "/bosses/haze-seas-boss-guide" },
    { title: "Swords and Weapons", description: "Weapon unlocks and progression.", href: "/weapons/haze-seas-swords-and-weapons" },
    { title: "Map Guide", description: "Islands, routes, and progression.", href: "/maps/haze-seas-map-guide" },
    { title: "Beginner Guide", description: "Start your Haze Seas journey.", href: "/guide/haze-seas-beginner-guide" },
  ],
  "skills": [
    { title: "Beginner Guide", description: "Start your Haze Seas journey.", href: "/guide/haze-seas-beginner-guide" },
    { title: "Fruit Tier List", description: "Compare fruits for grinding and boss fights.", href: "/tier-list/haze-seas-fruit-tier-list" },
    { title: "Boss Guide", description: "Boss routes and fight tips.", href: "/bosses/haze-seas-boss-guide" },
    { title: "Official Links", description: "Official Roblox page and community links.", href: "/official-links" },
  ],
  "races": [
    { title: "Beginner Guide", description: "Start your Haze Seas journey.", href: "/guide/haze-seas-beginner-guide" },
    { title: "Fruit Tier List", description: "Compare fruits for grinding and boss fights.", href: "/tier-list/haze-seas-fruit-tier-list" },
    { title: "Fighting Styles", description: "Combat styles and unlock paths.", href: "/skills/haze-seas-fighting-styles" },
    { title: "Map Guide", description: "Islands, routes, and progression.", href: "/maps/haze-seas-map-guide" },
  ],
  "maps": [
    { title: "Beginner Guide", description: "Start your Haze Seas journey.", href: "/guide/haze-seas-beginner-guide" },
    { title: "Boss Guide", description: "Boss routes and fight tips.", href: "/bosses/haze-seas-boss-guide" },
    { title: "Fruit Tier List", description: "Compare fruits for grinding and boss fights.", href: "/tier-list/haze-seas-fruit-tier-list" },
    { title: "Official Links", description: "Official Roblox page and community links.", href: "/official-links" },
  ],
};

async function DetailPage({ locale, contentType, slug, navGroups }: { locale: Locale; contentType: string; slug: string[]; navGroups: import("@/lib/content").NavGroup[] }) {
  if (!CONTENT_TYPES.includes(contentType)) notFound();
  const messages = (await getMessages({ locale })) as Messages;
  const item = await getContent(contentType, slug, locale as Locale);
  if (!item) notFound();
  const pathname = `/${contentType}/${slug.join("/")}`;
  const tocLabel = messages.shared.tableOfContents || messages.shared.inThisSection || "Table of Contents";
  const sectionLabel = contentType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const dateModified = item.metadata.lastModified || item.metadata.date;
  const articleData = { "@context": "https://schema.org", "@type": "Article", headline: item.metadata.title, description: item.metadata.description, image: `${siteUrl}${item.metadata.image ?? "/images/hero.webp"}`, datePublished: item.metadata.date, dateModified, mainEntityOfPage: `${siteUrl}${pathname}`, author: { "@type": "Organization", name: "Haze Seas Hub Team" }, publisher: { "@type": "Organization", name: "Haze Seas Hub", logo: { "@type": "ImageObject", url: `${siteUrl}/android-chrome-512x512.png` } } };
  const breadcrumbData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: sectionLabel, item: `${siteUrl}/${contentType}` }, { "@type": "ListItem", position: 3, name: item.metadata.title, item: `${siteUrl}${pathname}` }] };
  const related = RELATED_BY_TYPE[contentType] ?? [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={articleData} />
      <JsonLd data={breadcrumbData} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article>
          <Breadcrumbs items={[{ label: messages.shared.home, href: localizeHref("/", locale) }, { label: sectionLabel, href: localizeHref(`/${contentType}`, locale) }, { label: item.metadata.title }]} />
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{item.metadata.title}</h1>
          <ArticleLayout
            title={item.metadata.title}
            summary={item.metadata.summary ?? item.metadata.description}
            dateModified={dateModified}
            section={sectionLabel}
            sectionHref={`/${contentType}`}
            relatedArticles={related}
            locale={locale}
          >
            <MobileTOC headings={item.headings} label={tocLabel} />
            <item.MDXContent />
          </ArticleLayout>
        </article>
        <aside className="space-y-6">
          <SidebarTOC headings={item.headings} label={tocLabel} currentPathname={pathname} />
          <WikiSidebar locale={locale} navGroups={navGroups} currentPath={pathname} />
        </aside>
      </div>
    </main>
  );
}
