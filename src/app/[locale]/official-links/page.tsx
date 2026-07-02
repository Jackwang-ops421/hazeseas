import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { JsonLd, Breadcrumbs } from "@/components/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hazeseashub.wiki";

export const metadata: Metadata = {
  title: "Haze Seas Official Links - Roblox, Community and Update Resources",
  description:
    "Find Haze Seas official and community-accessible resources, including Roblox game links, community pages, update channels, and player guide references.",
  alternates: {
    canonical: "/official-links",
  },
  openGraph: {
    title: "Haze Seas Official Links - Roblox, Community and Update Resources",
    description:
      "Find Haze Seas official and community-accessible resources, including Roblox game links, community pages, update channels, and player guide references.",
    url: `${siteUrl}/official-links`,
    siteName: "Haze Seas Hub",
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630, alt: "Haze Seas Hub" }],
  },
};

export default function OfficialLinksPage() {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Official Links", item: `${siteUrl}/official-links` },
    ],
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Haze Seas Official Links",
    description:
      "Find Haze Seas official and community-accessible resources, including Roblox game links, community pages, update channels, and player guide references.",
    author: { "@type": "Organization", name: "Haze Seas Hub Team" },
    publisher: { "@type": "Organization", name: "Haze Seas Hub" },
    dateModified: "2026-07-02",
    mainEntityOfPage: `${siteUrl}/official-links`,
  };

  const externalLink = (href: string, text: string) => (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-[hsl(var(--nav-theme))] hover:underline"
    >
      {text} <ExternalLink className="h-4 w-4" />
    </a>
  );

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbData} />
      <JsonLd data={articleData} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Official Links" }]} />

      <article className="rounded-3xl border border-border bg-card/70 p-6 sm:p-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Haze Seas Official Links</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: 2026-07-02 · Author: Haze Seas Hub Team · Type: Fan-made guide</p>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          This page organizes official and community-accessible Haze Seas resources for players. Haze Seas Hub is a fan-made guide site and is not the official game website.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-5">
          <h2 className="text-xl font-bold text-foreground">Roblox Game Page</h2>
          <p className="mt-2 text-muted-foreground">
            {externalLink("https://www.roblox.com/games/6918802270/HAZE-PIECE", "Haze Piece / Haze Seas on Roblox")} — the official Roblox experience page.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5">
          <h2 className="text-xl font-bold text-foreground">Community Resources</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>{externalLink("https://discord.com/invite/hazeseas", "Official Haze Studios Discord")}</li>
            <li>{externalLink("https://www.youtube.com/@RealHazeStudios", "Official Haze Studios YouTube")}</li>
            <li>{externalLink("https://x.com/RealHazeStudios", "Haze Studios on X / Twitter")}</li>
            <li>{externalLink("https://trello.com/b/nn8bpTB0/haze-seas-official-trello", "Haze Seas Trello Board")}</li>
          </ul>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5">
          <h2 className="text-xl font-bold text-foreground">Update Sources</h2>
          <p className="mt-2 text-muted-foreground">
            For the latest codes, patch notes, and rework showcases, check the official Discord announcements and the official YouTube channel first. The Roblox event page also lists major release milestones.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-[hsl(var(--nav-theme-light))] bg-[hsl(var(--nav-theme))]/10 p-5">
          <h2 className="text-xl font-bold text-foreground">Safety Note</h2>
          <p className="mt-2 text-muted-foreground">
            Never share your Roblox password or account credentials. Haze Seas Hub only links to official or widely recognized community resources. If a link looks unofficial, verify it in the official Discord before clicking.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-5">
          <h2 className="text-xl font-bold text-foreground">Related Haze Seas Guides</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Link href="/codes/haze-seas-codes" className="block rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
              <h3 className="font-bold text-foreground">Haze Seas Codes</h3>
              <p className="mt-1 text-sm text-muted-foreground">Active codes and redemption steps.</p>
            </Link>
            <Link href="/guide/haze-seas-release-date-and-updates" className="block rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
              <h3 className="font-bold text-foreground">Release Date and Updates</h3>
              <p className="mt-1 text-sm text-muted-foreground">Update notes and new content reminders.</p>
            </Link>
            <Link href="/guide/haze-seas-beginner-guide" className="block rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
              <h3 className="font-bold text-foreground">Beginner Guide</h3>
              <p className="mt-1 text-sm text-muted-foreground">Start your Haze Seas journey.</p>
            </Link>
            <Link href="/maps/haze-seas-map-guide" className="block rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
              <h3 className="font-bold text-foreground">Map Guide</h3>
              <p className="mt-1 text-sm text-muted-foreground">Islands, routes, and progression.</p>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
