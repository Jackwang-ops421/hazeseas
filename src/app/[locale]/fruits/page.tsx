import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, Breadcrumbs } from "@/components/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hazeseashub.wiki";

export const metadata: Metadata = {
  title: "Haze Seas Fruits Hub - Fruit Guides, Tier List and Player Picks",
  description:
    "Explore Haze Seas fruit guides, tier list links, grinding recommendations, and related player resources from one hub page.",
  alternates: {
    canonical: "/fruits",
  },
  openGraph: {
    title: "Haze Seas Fruits Hub - Fruit Guides, Tier List and Player Picks",
    description:
      "Explore Haze Seas fruit guides, tier list links, grinding recommendations, and related player resources from one hub page.",
    url: `${siteUrl}/fruits`,
    siteName: "Haze Seas Hub",
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630, alt: "Haze Seas Hub" }],
  },
};

export default function FruitsHubPage() {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Fruits Hub", item: `${siteUrl}/fruits` },
    ],
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Haze Seas Fruits Hub",
    description:
      "Explore Haze Seas fruit guides, tier list links, grinding recommendations, and related player resources from one hub page.",
    author: { "@type": "Organization", name: "Haze Seas Hub Team" },
    publisher: { "@type": "Organization", name: "Haze Seas Hub" },
    dateModified: "2026-07-02",
    mainEntityOfPage: `${siteUrl}/fruits`,
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbData} />
      <JsonLd data={articleData} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Fruits Hub" }]} />

      <article className="rounded-3xl border border-border bg-card/70 p-6 sm:p-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Haze Seas Fruits Hub</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: 2026-07-02 · Author: Haze Seas Hub Team · Type: Fan-made guide</p>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          This fan-made hub organizes Haze Seas fruit-related guides, tier list links, and player decision pages.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-5">
          <h2 className="text-xl font-bold text-foreground">Quick Links</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Link href="/tier-list/haze-seas-fruit-tier-list" className="block rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
              <h3 className="font-bold text-foreground">Haze Seas Fruit Tier List</h3>
              <p className="mt-1 text-sm text-muted-foreground">Compare fruits for grinding and boss fights.</p>
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5">
          <h2 className="text-xl font-bold text-foreground">How to Use This Hub</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Start with the tier list if you want a quick overview.</li>
            <li>Use the beginner guide if you are still learning fruit basics.</li>
            <li>Check the codes page for any fruit-related rewards or rerolls.</li>
            <li>Specific fruit data will be added only after verification.</li>
          </ul>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5">
          <h2 className="text-xl font-bold text-foreground">Related Haze Seas Guides</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Link href="/skills/haze-seas-fighting-styles" className="block rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
              <h3 className="font-bold text-foreground">Fighting Styles</h3>
              <p className="mt-1 text-sm text-muted-foreground">Compare styles and unlock paths.</p>
            </Link>
            <Link href="/bosses/haze-seas-boss-guide" className="block rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
              <h3 className="font-bold text-foreground">Boss Guide</h3>
              <p className="mt-1 text-sm text-muted-foreground">Routes and fight tips.</p>
            </Link>
            <Link href="/guide/haze-seas-beginner-guide" className="block rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
              <h3 className="font-bold text-foreground">Beginner Guide</h3>
              <p className="mt-1 text-sm text-muted-foreground">Start your journey.</p>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
