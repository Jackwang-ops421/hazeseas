"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { JsonLd, Breadcrumbs } from "@/components/site";
import { siteConfig, SITE_URL } from "@/site-data/site.config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

// Codes data — sync with 00基础信息.md sidebarCodes + task spec
const activeCodes = [
  { code: "STATREFUND", reward: "1 Stat Refund", status: "New" as const },
  { code: "DRAGONUPD", reward: "5 Race Spins", status: "New" as const },
  { code: "OKUCHI", reward: "5 Race Spins", status: "Active" as const },
  { code: "Sub2XenoTy", reward: "20 minutes of 2x EXP", status: "Active" as const },
  { code: "Sub2CaptainMaui", reward: "20 minutes of 2x EXP", status: "Active" as const },
  { code: "PATCH", reward: "25 Gems and 15 minutes of 2x EXP", status: "Active" as const },
  { code: "RELEASE", reward: "60 minutes of 2x EXP", status: "Active" as const },
  { code: "FREECASH", reward: "50,000 Cash", status: "Active" as const },
  { code: "FREEGEMS", reward: "50 Gems", status: "Active" as const },
  { code: "SUBSCRIBETOHAZEYT", reward: "50,000 Cash", status: "Active" as const },
  { code: "Sub2Nikkolapz", reward: "20 minutes of 2x EXP", status: "Active" as const },
  { code: "Sub2BadiTubes", reward: "20 minutes of 2x EXP", status: "Active" as const },
  { code: "Sub2BrosSiam", reward: "20 minutes of 2x EXP", status: "Active" as const },
  { code: "Sub2BuilderboyTV", reward: "20 minutes of 2x EXP", status: "Active" as const },
  { code: "HAZESEAS2026", reward: "10 Race Spins", status: "Conditional" as const, note: "May work only in newly started servers." },
];

const expiredCodes = [
  "275KNEXTLETSGO", "XMAS2023", "NEXTCODEAT400KLIKES", "NEXT300KCOOL", "NEXTAT350KLIKES",
  "VALENTINES2024", "HAZEPIECE23", "WOW325KMLG", "GOGOGAGA", "LETSGET450K2024",
  "LETSGO375KHAZE", "425KNEXTCODE123", "GROUPONLY",
];

const troubleshooting = [
  { title: "Invalid Code", body: "Check capitalization and remove spaces before or after the code." },
  { title: "Already Redeemed", body: "Each code can normally be used once per Roblox account." },
  { title: "No Reward Appeared", body: "Rejoin a newly started server and try once more. If the code still fails, it may have expired." },
];

const faqItems = [
  { question: "Are Haze Seas and Haze Piece codes the same?", answer: "Haze Seas is the rebuilt version of Haze Piece. Use the current Haze Seas list above; old Haze Piece codes belong in the expired section unless the developers reactivate them." },
  { question: "Are Haze Seas codes case-sensitive?", answer: "Yes. Copy the capitalization exactly and remove any spaces before or after the code." },
  { question: "Why does HAZESEAS2026 fail?", answer: "It may work only in newly started servers or may have expired. Rejoin once and try again; if it still fails, treat it as inactive." },
];

const officialSources = [
  { label: "Official Roblox Game", url: "https://www.roblox.com/games/6918802270/Haze-Seas" },
  { label: "Official Haze Seas Trello", url: "https://trello.com/b/nn8bpTB0/haze-seas-official-trello" },
  { label: "Official Haze Studios Discord", url: "https://discord.com/invite/hazeseas" },
];

const META_TITLE = "Haze Seas Codes (July 2026) — Active & Verified";
const META_DESC = "Use the latest Haze Seas codes for free Race Spins, Stat Refunds, Cash, Gems, and 2x EXP. Updated July 11, 2026 for returning Haze Piece players.";

export default function CodesHubPage() {
  const pageUrl = `${siteUrl}/codes`;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: META_TITLE, description: META_DESC, url: pageUrl }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })) }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Haze Seas Codes", item: pageUrl }] }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Haze Seas Codes" }]} />

      <article className="rounded-3xl border border-border bg-card/70 p-6 sm:p-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Haze Seas Codes (July 2026)</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: 2026-07-11 · Author: {siteConfig.siteName} Team</p>

        <p className="mt-6 text-base leading-7 text-muted-foreground">Haze Seas codes can grant Race Spins, a Stat Refund, Cash, Gems, and timed 2x EXP. Haze Seas was formerly Haze Piece; enter every code with the exact capitalization shown below.</p>

        <div className="mt-4 rounded-2xl border border-[hsl(var(--nav-theme-light))] bg-[hsl(var(--nav-theme))]/5 p-4 text-sm leading-6 text-muted-foreground">
          Last checked: July 11, 2026. Codes are case-sensitive and can expire without notice. HAZESEAS2026 may work only in newly started servers.
        </div>

        <h2 className="mt-10 text-2xl font-bold text-foreground">Active Haze Seas codes</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {activeCodes.map((c) => (
            <CodeCard key={c.code} item={c} />
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-foreground">How to redeem Haze Seas codes</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-base text-muted-foreground">
          <li>Open Haze Seas on Roblox and load your character.{" "}
            <a href="https://www.roblox.com/games/6918802270/Haze-Seas" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">Open Haze Seas on Roblox</a>.
          </li>
          <li>Press the Menu button at the bottom left of the screen.</li>
          <li>Select the white Treasure Chest or Gift icon.</li>
          <li>Paste the code into the Enter Code field with the exact capitalization shown above.</li>
          <li>Press the green Redeem button to claim the reward.</li>
        </ol>

        <h2 className="mt-12 text-2xl font-bold text-foreground">Why is a Haze Seas code not working?</h2>
        <div className="mt-4 grid gap-3">
          {troubleshooting.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-4">
              <h3 className="font-bold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-foreground">Expired Haze Seas codes</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {expiredCodes.map((code) => (
            <code key={code} className="rounded-lg bg-muted px-3 py-1 font-mono text-xs text-muted-foreground line-through">{code}</code>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-3">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-border bg-card p-4">
              <summary className="cursor-pointer font-bold text-foreground">{item.question}</summary>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-foreground">Official Sources</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {officialSources.map((src) => (
            <li key={src.url}>
              <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">{src.label}</a>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-bold text-foreground">Related internal guides</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link href="/guide/haze-seas-beginner-guide" className="rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]"><h3 className="font-bold text-foreground">Beginner Guide</h3><p className="mt-1 text-sm text-muted-foreground">Start your Haze Seas journey.</p></Link>
          <Link href="/tier-list/haze-seas-fruit-tier-list" className="rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]"><h3 className="font-bold text-foreground">Fruit Tier List</h3><p className="mt-1 text-sm text-muted-foreground">Compare fruits for grinding and boss fights.</p></Link>
          <Link href="/bosses/haze-seas-boss-guide" className="rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]"><h3 className="font-bold text-foreground">Boss Guide</h3><p className="mt-1 text-sm text-muted-foreground">Boss routes and fight tips.</p></Link>
          <Link href="/haki/haze-seas-haki" className="rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]"><h3 className="font-bold text-foreground">Haki Guide</h3><p className="mt-1 text-sm text-muted-foreground">Unlock and upgrade Haki abilities.</p></Link>
        </div>
      </article>
    </main>
  );
}

function StatusBadge({ variant }: { variant: "New" | "Active" | "Conditional" }) {
  const styles = {
    New: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    Active: "bg-[hsl(var(--nav-theme))]/15 text-[hsl(var(--nav-theme))] border-[hsl(var(--nav-theme))]/30",
    Conditional: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  };
  const labels = { New: "New", Active: "Active", Conditional: "Conditional" };
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${styles[variant]}`}>{labels[variant]}</span>;
}

function CodeCard({ item }: { item: { code: string; reward: string; status: "New" | "Active" | "Conditional"; note?: string } }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(item.code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* noop */ }
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <code className="rounded-lg bg-muted px-3 py-1.5 font-mono text-sm font-bold text-foreground">{item.code}</code>
        <StatusBadge variant={item.status} />
      </div>
      <p className="mt-3 text-sm font-medium text-foreground">{item.reward}</p>
      {item.note && <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>}
      <button type="button" onClick={handleCopy} aria-label={`Copy ${item.code} code`} className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-[hsl(var(--nav-theme))]/10 hover:text-[hsl(var(--nav-theme))]">
        {copied ? <><Check className="h-3.5 w-3.5" />Copied</> : <><Copy className="h-3.5 w-3.5" />Copy</>}
      </button>
    </div>
  );
}