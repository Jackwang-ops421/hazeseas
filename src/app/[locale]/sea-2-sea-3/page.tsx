import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, Breadcrumbs } from "@/components/site";
import { siteConfig, SITE_URL } from "@/site-data/site.config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  title: "Haze Seas Sea 2 & Sea 3 — Unlock Guide",
  description: "Unlock Sea 2 at Level 2200 with the Poneglyph Scroll, then reach Sea 3 at Level 4200 through the Gatekeeper's Red Emperor trial and exact NPC route.",
  alternates: { canonical: "https://hazeseashub.wiki/sea-2-sea-3" },
  openGraph: {
    title: "Haze Seas Sea 2 & Sea 3 — Unlock Guide",
    description: "Unlock Sea 2 at Level 2200 with the Poneglyph Scroll, then reach Sea 3 at Level 4200 through the Gatekeeper's Red Emperor trial and exact NPC route.",
    url: `${siteUrl}/sea-2-sea-3`,
    siteName: siteConfig.siteName,
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630, alt: siteConfig.siteName }],
  },
  robots: { index: true, follow: true },
};

const SEA_TABLE = [
  { sea: "Sea 1", level: "Available from the start", npc: "Starter Island", objective: "Reach Level 2200 to begin the Sea 2 quest" },
  { sea: "Sea 2", level: "Level 2200", npc: "Dimensional Sailor at the Starter Island docks", objective: "Bring the Poneglyph Scroll from the central cave at Rocky Pillars" },
  { sea: "Sea 3", level: "Level 4200", npc: "Gatekeeper inside the main building at Flower Capital", objective: "Defeat the Red Emperor solo, return to the Gatekeeper, and choose Yes" },
];

const SEA2_STEPS = [
  "Reach Level 2200.",
  "Go to the docks on Starter Island and speak to the Dimensional Sailor.",
  "Sail to Rocky Pillars.",
  "Enter the central cave and complete the cutscene.",
  "Collect the Poneglyph Scroll.",
  "Return to the Dimensional Sailor and give him the Poneglyph Scroll.",
  "Speak to the Dimensional Sailor again to travel to Sea 2.",
];

const SEA3_STEPS = [
  "Reach Level 4200 in Sea 2.",
  "Travel to Flower Capital.",
  "Enter the main building and speak to the Gatekeeper.",
  "Accept the Sea 3 challenge.",
  "Defeat the Red Emperor in the solo trial.",
  "Return to the Gatekeeper after the victory cutscene.",
  "Choose Yes to travel to the Land of the Gods in Sea 3.",
];

export default function Sea2Sea3Page() {
  const pageUrl = `${siteUrl}/sea-2-sea-3`;
  const webPageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Haze Seas Sea 2 & Sea 3 — Unlock Guide",
    description: "Unlock Sea 2 at Level 2200 with the Poneglyph Scroll, then reach Sea 3 at Level 4200 through the Gatekeeper's Red Emperor trial and exact NPC route.",
    url: pageUrl,
  };
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Haze Seas Sea 2 and Sea 3", item: pageUrl },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={webPageData} />
      <JsonLd data={breadcrumbData} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Haze Seas Sea 2 and Sea 3" }]} />

      <article className="rounded-3xl border border-border bg-card/70 p-6 sm:p-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Haze Seas Sea 2 and Sea 3 Guide</h1>

        <p className="mt-4 text-sm text-muted-foreground">Progression checked July 11, 2026</p>

        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Haze Seas has three seas. Sea 2 unlocks at Level 2200 after the Dimensional Sailor quest, while Sea 3 unlocks at Level 4200 after the Gatekeeper's solo Red Emperor trial.
        </p>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Sea</th>
                <th className="px-4 py-3 font-semibold">Level Requirement</th>
                <th className="px-4 py-3 font-semibold">Starting NPC</th>
                <th className="px-4 py-3 font-semibold">Required Objective</th>
              </tr>
            </thead>
            <tbody>
              {SEA_TABLE.map((row) => (
                <tr key={row.sea} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{row.sea}</td>
                  <td className="px-4 py-3">{row.level}</td>
                  <td className="px-4 py-3">{row.npc}</td>
                  <td className="px-4 py-3">{row.objective}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-2xl font-bold text-foreground">How to unlock Sea 2 in Haze Seas</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-base text-muted-foreground">
          {SEA2_STEPS.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <Link
          href="/guide/haze-seas-second-sea"
          className="mt-4 inline-flex items-center gap-1 rounded-lg bg-[hsl(var(--nav-theme))] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-110"
        >
          Read the Full Sea 2 Guide
        </Link>

        <h2 className="mt-10 text-2xl font-bold text-foreground">How to unlock Sea 3 in Haze Seas</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-base text-muted-foreground">
          {SEA3_STEPS.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <Link
          href="/guide/haze-seas-sea-3"
          className="mt-4 inline-flex items-center gap-1 rounded-lg bg-[hsl(var(--nav-theme))] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-110"
        >
          Read the Full Sea 3 Guide
        </Link>

        <div className="mt-10 rounded-2xl border border-[hsl(var(--nav-theme-light))] bg-[hsl(var(--nav-theme))]/5 p-5">
          <p className="text-sm leading-6 text-muted-foreground">
            Progression requirements can change after an update. Recheck the official Trello and Roblox game page if an NPC or level requirement no longer matches the live game.
          </p>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Official Sources</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="https://trello.com/b/nn8bpTB0/haze-seas-official-trello" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">
                Official Haze Seas Trello
              </a>
            </li>
            <li>
              <a href="https://www.roblox.com/games/6918802270/Haze-Seas" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">
                Official Roblox Game
              </a>
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
}