"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Subsection {
  title: string;
  body: string;
}

interface HomeArticleSectionProps {
  sectionKey: string;
  title: string;
  description: string;
  body: string;
  subsections: Subsection[];
  ctaLabel: string;
  ctaHref: string;
}

export function HomeArticleSection({
  title,
  description,
  body,
  subsections,
  ctaLabel,
  ctaHref,
}: HomeArticleSectionProps) {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground dark:text-white/50">{description}</p>
      </div>

      {/* Body paragraphs */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-5 text-sm leading-7 text-muted-foreground dark:border-white/10 dark:bg-slate-900/60 dark:text-white/50">
        {body.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Subsections */}
      <div className="space-y-4">
        {subsections.map((sub) => (
          <div
            key={sub.title}
            className="rounded-lg border border-border bg-card p-4 dark:border-white/10 dark:bg-slate-900/40"
          >
            <h3 className="font-bold text-foreground dark:text-white">{sub.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground dark:text-white/50">{sub.body}</p>
          </div>
        ))}
      </div>

      <Link
        href={ctaHref}
        className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme))] hover:underline dark:text-[hsl(var(--nav-theme-light))]"
      >
        {ctaLabel} <ChevronRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
