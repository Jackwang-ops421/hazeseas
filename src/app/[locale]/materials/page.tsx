import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, Breadcrumbs } from "@/components/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hazeseashub.wiki";

export const metadata: Metadata = {
  title: "Haze Seas Materials Guide - Farming, Drops and Upgrade Resources",
  description:
    "A Haze Seas materials hub for farming routes, drop sources, upgrade planning, and related boss or weapon guide links.",
  alternates: {
    canonical: "/materials",
  },
  openGraph: {
    title: "Haze Seas Materials Guide - Farming, Drops and Upgrade Resources",
    description:
      "A Haze Seas materials hub for farming routes, drop sources, upgrade planning, and related boss or weapon guide links.",
    url: `${siteUrl}/materials`,
    siteName: "Haze Seas Hub",
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630, alt: "Haze Seas Hub" }],
  },
};

export default function MaterialsHubPage() {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Materials Guide", item: `${siteUrl}/materials` },
    ],
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Haze Seas Materials Guide",
    description:
      "A Haze Seas materials hub for farming routes, drop sources, upgrade planning, and related boss or weapon guide links.",
    author: { "@type": "Organization", name: "Haze Seas Hub Team" },
    publisher: { "@type": "Organization", name: "Haze Seas Hub" },
    dateModified: "2026-07-02",
    mainEntityOfPage: `${siteUrl}/materials`,
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbData} />
      <JsonLd data={articleData} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Materials Guide" }]} />

      <article className="rounded-3xl border border-border bg-card/70 p-6 sm:p-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Haze Seas Materials Guide</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: 2026-07-02 · Author: Haze Seas Hub Team · Type: Fan-made guide</p>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          This fan-made hub is designed to organize Haze Seas materials, farming routes, drop sources, and upgrade planning.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-5">
          <h2 className="text-xl font-bold text-foreground">Quick Guide</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li><strong>What this page covers:</strong> Material farming routes, drop sources, and upgrade planning structure.</li>
            <li><strong>Best for:</strong> Players who want to plan upgrades and farming routes.</li>
            <li><strong>Related pages:</strong> Boss Guide, Weapons Guide, Map Guide, Beginner Guide.</li>
          </ul>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/70 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Material</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Used For</th>
                <th className="px-4 py-3 font-semibold">Related Boss or Area</th>
                <th className="px-4 py-3 font-semibold">Verification Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="border-t border-border px-4 py-6 text-center text-muted-foreground">
                  Material-specific data should be added only after verification.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5">
          <h2 className="text-xl font-bold text-foreground">Related Haze Seas Guides</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Link href="/bosses/haze-seas-boss-guide" className="block rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
              <h3 className="font-bold text-foreground">Boss Guide</h3>
              <p className="mt-1 text-sm text-muted-foreground">Boss routes and drops.</p>
            </Link>
            <Link href="/weapons/haze-seas-swords-and-weapons" className="block rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
              <h3 className="font-bold text-foreground">Swords and Weapons</h3>
              <p className="mt-1 text-sm text-muted-foreground">Weapon unlocks and progression.</p>
            </Link>
            <Link href="/maps/haze-seas-map-guide" className="block rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
              <h3 className="font-bold text-foreground">Map Guide</h3>
              <p className="mt-1 text-sm text-muted-foreground">Islands and routes.</p>
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
