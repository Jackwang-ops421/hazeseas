"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { JsonLd, Breadcrumbs } from "@/components/site";
import { siteConfig } from "@/site-data/site.config";
import { localizedPath } from "@/i18n/locale-path";

interface CodesContent {
  meta: { h1: string; lastUpdated: string; intro: string; verificationNotice: string; breadcrumb: string };
  active: Array<{ code: string; reward: string; status: string; badgeVariant: string; note?: string }>;
  copyButton: { ariaLabelTemplate: string; successLabel: string };
  redemption: { h2: string; robloxLinkLabel: string; robloxUrl: string; steps: string[] };
  troubleshooting: { h2: string; items: Array<{ title: string; body: string }> };
  expired: { h2: string; codes: string[] };
  faq: Array<{ question: string; answer: string }>;
  sidebarCodes: Array<{ code: string; reward: string }>;
  officialSources: { h2: string; items: Array<{ label: string; url: string }> };
  relatedGuides: { h2: string; items: Array<{ title: string; description: string; href: string }> };
}

interface Props {
  locale: string;
  pageUrl: string;
  codes: CodesContent;
}

function StatusBadge({ variant, label }: { variant: string; label: string }) {
  const styles: Record<string, string> = {
    new: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    active: "bg-[hsl(var(--nav-theme))]/15 text-[hsl(var(--nav-theme))] border-[hsl(var(--nav-theme))]/30",
    conditional: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  };
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${styles[variant] ?? styles.active}`}>{label}</span>;
}

function CodeCard({ item, ariaLabelTemplate, successLabel, labelNew, labelActive, labelConditional }: { item: CodesContent["active"][number]; ariaLabelTemplate: string; successLabel: string; labelNew: string; labelActive: string; labelConditional: string }) {
  const [copied, setCopied] = useState(false);
  const ariaLabel = ariaLabelTemplate.replace("{CODE}", item.code);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* noop */ }
  };
  const badgeLabel = item.status === "New" ? labelNew : item.status === "Active" ? labelActive : labelConditional;
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <code className="rounded-lg bg-muted px-3 py-1.5 font-mono text-sm font-bold text-foreground">{item.code}</code>
        <StatusBadge variant={item.badgeVariant} label={badgeLabel} />
      </div>
      <p className="mt-3 text-sm font-medium text-foreground">{item.reward}</p>
      {item.note && <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={ariaLabel}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-[hsl(var(--nav-theme))]/10 hover:text-[hsl(var(--nav-theme))]"
      >
        {copied ? <><Check className="h-3.5 w-3.5" />{successLabel}</> : <><Copy className="h-3.5 w-3.5" />{successLabel}</>}
      </button>
    </div>
  );
}

export function CodesClient({ locale, pageUrl, codes }: Props) {
  const meta = codes.meta;
  const activeCodes = codes.active;
  const redemption = codes.redemption;
  const troubleshooting = codes.troubleshooting;
  const expired = codes.expired;
  const faq = codes.faq;
  const official = codes.officialSources;
  const related = codes.relatedGuides;

  const labelNew = codes.active[0]?.badgeVariant === "new" ? codes.active.find((c) => c.status === "New")?.status ?? "New" : "New";
  const labelActive = "Active";
  const labelConditional = "Conditional";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: meta.h1, url: pageUrl, inLanguage: locale }} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: pageUrl.replace(/\/codes.*$/, "") || pageUrl }, { "@type": "ListItem", position: 2, name: meta.h1, item: pageUrl }] }} />
      <Breadcrumbs items={[{ label: "Home", href: localizedPath(locale, "/") }, { label: meta.h1 }]} />

      <article className="rounded-3xl border border-border bg-card/70 p-6 sm:p-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{meta.h1}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {meta.lastUpdated} · Author: {siteConfig.siteName} Team</p>

        <p className="mt-6 text-base leading-7 text-muted-foreground">{meta.intro}</p>

        <div className="mt-4 rounded-2xl border border-[hsl(var(--nav-theme-light))] bg-[hsl(var(--nav-theme))]/5 p-4 text-sm leading-6 text-muted-foreground">
          {meta.verificationNotice}
        </div>

        <h2 className="mt-10 text-2xl font-bold text-foreground">{meta.breadcrumb.split(" > ").pop()}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {activeCodes.map((c) => (
            <CodeCard key={c.code} item={c} ariaLabelTemplate={codes.copyButton.ariaLabelTemplate} successLabel={codes.copyButton.successLabel} labelNew={labelNew} labelActive={labelActive} labelConditional={labelConditional} />
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-foreground">{redemption.h2}</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-base text-muted-foreground">
          {redemption.steps.map((step, i) => (
            <li key={i}>
              {i === 0 && (
                <>
                  <a href={redemption.robloxUrl} target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">
                    {redemption.robloxLinkLabel}
                  </a>
                  .
                </>
              )}
              {i > 0 && step}
              {i === 0 && "."}
            </li>
          ))}
        </ol>

        <h2 className="mt-12 text-2xl font-bold text-foreground">{troubleshooting.h2}</h2>
        <div className="mt-4 grid gap-3">
          {troubleshooting.items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-4">
              <h3 className="font-bold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-foreground">{expired.h2}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {expired.codes.map((code) => (
            <code key={code} className="rounded-lg bg-muted px-3 py-1 font-mono text-xs text-muted-foreground line-through">{code}</code>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-foreground">FAQ</h2>
        <div className="mt-4 space-y-3">
          {faq.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-border bg-card p-4">
              <summary className="cursor-pointer font-bold text-foreground">{item.question}</summary>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-foreground">{official.h2}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {official.items.map((src) => (
            <li key={src.url}>
              <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme))] hover:underline">{src.label}</a>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-bold text-foreground">{related.h2}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {related.items.map((r) => (
            <Link key={r.href} href={localizedPath(locale, r.href)} className="rounded-xl border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
              <h3 className="font-bold text-foreground">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
            </Link>
          ))}
        </div>
      </article>
    </main>
  );
}