"use client";

import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { type HeroConfig } from "@/site-data/home.config";
import { TrailerButton } from "@/components/site/Trailer";

function GiftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 2.5 2.5v5" />
      <path d="M16.5 8v-2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1-2.5 2.5h-5" />
    </svg>
  );
}

export function HeroSection({ data }: { data: HeroConfig }) {
  return (
    <section className="relative overflow-hidden px-6 pb-8 pt-8 text-center sm:pb-10 sm:pt-10 lg:pb-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 hidden h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[hsl(var(--nav-theme))]/10 blur-3xl dark:block" />
      </div>

      <div className="relative mx-auto max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-[hsl(var(--nav-theme))] dark:border-white/10 dark:bg-white/5 dark:text-[hsl(var(--nav-theme-light))]">
          {data.badge}
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {data.title}
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground dark:text-white/60 sm:text-lg">
          {data.description}
        </p>

        <div className="flex flex-col justify-center gap-3 pt-1 sm:flex-row">
          <Link
            href={data.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--nav-theme))] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[hsl(var(--nav-theme))]/25 transition hover:brightness-110"
          >
            <GiftIcon className="h-4 w-4" />
            {data.primaryCta.label} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={data.secondaryCta.href}
            target={data.secondaryCta.external ? "_blank" : undefined}
            rel={data.secondaryCta.external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground transition hover:border-[hsl(var(--nav-theme))]/50 hover:bg-muted/80 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10"
          >
            {data.secondaryCta.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stats row */}
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
          {data.stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-4 text-center dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-lg font-bold text-[hsl(var(--nav-theme))] dark:text-[hsl(var(--nav-theme-light))] sm:text-xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground dark:text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trailer */}
        {data.trailerVideoId && (
          <div className="relative mx-auto max-w-md pt-2 sm:max-w-lg">
            <div className="overflow-hidden rounded-lg border border-border shadow-xl dark:border-white/10 dark:shadow-2xl dark:shadow-black/50">
              <TrailerButton videoId={data.trailerVideoId} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
