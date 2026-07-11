import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { JsonLd, Breadcrumbs } from "@/components/site";
import { siteConfig, SITE_URL } from "@/site-data/site.config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  title: "Haze Seas Trello, Discord & Official Links",
  description: "Open the official Haze Seas Trello, Discord, Roblox game, community, and YouTube channel for codes, updates, bosses, Fruits, and progression help.",
  alternates: { canonical: "https://hazeseashub.wiki/trello-discord" },
  openGraph: {
    title: "Haze Seas Trello, Discord & Official Links",
    description: "Open the official Haze Seas Trello, Discord, Roblox game, community, and YouTube channel for codes, updates, bosses, Fruits, and progression help.",
    url: `${siteUrl}/trello-discord`,
    siteName: siteConfig.siteName,
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630, alt: siteConfig.siteName }],
  },
  robots: { index: true, follow: true },
};

const OFFICIAL_LINKS = [
  {
    title: "Official Roblox Game",
    description: "Launch Haze Seas, view the current game description, and check the latest public update state.",
    href: "https://www.roblox.com/games/6918802270/Haze-Seas",
    badge: "Official",
  },
  {
    title: "Official Trello",
    description: "Check controls, codes, systems, Fruits, swords, fighting styles, races, NPCs, bosses, and locations.",
    href: "https://trello.com/b/nn8bpTB0/haze-seas-official-trello",
    badge: "Official",
  },
  {
    title: "Official Discord",
    description: "Follow announcements, hotfixes, code drops, sneak peeks, and community updates.",
    href: "https://discord.com/invite/hazeseas",
    badge: "Official",
  },
  {
    title: "Official YouTube",
    description: "Watch official trailers, showcases, reworks, and update videos from Haze Studios.",
    href: "https://www.youtube.com/@RealHazeStudios",
    badge: "Official",
  },
  {
    title: "Official Roblox Community",
    description: "Follow the Haze Studios Roblox community and its official event announcements.",
    href: "https://www.roblox.com/communities/6602131/HS-Haze-Studios",
    badge: "Official",
  },
];

const USAGE_GUIDE = [
  { label: "Codes and hotfixes", value: "Official Discord" },
  { label: "Structured game information", value: "Official Trello" },
  { label: "Launch the game", value: "Official Roblox Game" },
  { label: "Trailers and showcases", value: "Official YouTube" },
];

export default function TrelloDiscordPage() {
  const pageUrl = `${siteUrl}/trello-discord`;
  const webPageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Haze Seas Trello, Discord & Official Links",
    description: "Open the official Haze Seas Trello, Discord, Roblox game, community, and YouTube channel for codes, updates, bosses, Fruits, and progression help.",
    url: pageUrl,
  };
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Haze Seas Trello and Discord", item: pageUrl },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={webPageData} />
      <JsonLd data={breadcrumbData} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Haze Seas Trello and Discord" }]} />

      <article className="rounded-3xl border border-border bg-card/70 p-6 sm:p-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Haze Seas Trello, Discord & Official Links</h1>

        <div className="mt-4 text-sm text-muted-foreground">Links checked July 11, 2026</div>

        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Use the links below to open the official Haze Seas resources. Haze Seas was formerly known as Haze Piece, so older posts and bookmarks may still use the previous name.
        </p>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          The Trello is the structured reference for mechanics and locations, while Discord is the fastest source for announcements, hotfixes, and new codes.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-foreground">Official Resources</h2>
        <div className="mt-4 grid gap-3">
          {OFFICIAL_LINKS.map((link) => (
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
              <ExternalLink className="h-5 w-5 shrink-0 text-[hsl(var(--nav-theme))]" />
            </a>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-bold text-foreground">Which Haze Seas link should you use?</h2>
        <ul className="mt-4 space-y-1.5 text-base text-muted-foreground">
          {USAGE_GUIDE.map((item) => (
            <li key={item.label}>
              <span className="font-medium text-foreground">{item.label}</span> — {item.value}
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-[hsl(var(--nav-theme-light))] bg-[hsl(var(--nav-theme))]/5 p-5">
          <h2 className="text-lg font-bold text-foreground">Safety Notice</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Haze Seas Hub is fan-made. Do not enter your Roblox password on any page linked from a private message, and do not trust copied Discord or Trello links that use a different domain.
          </p>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Official Sources</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="https://www.roblox.com/games/6918802270/Haze-Seas" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">
                Official Roblox Game
              </a>
            </li>
            <li>
              <a href="https://trello.com/b/nn8bpTB0/haze-seas-official-trello" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">
                Official Haze Seas Trello
              </a>
            </li>
            <li>
              <a href="https://discord.com/invite/hazeseas" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">
                Official Haze Studios Discord
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@RealHazeStudios" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">
                Official Haze Studios YouTube
              </a>
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
}