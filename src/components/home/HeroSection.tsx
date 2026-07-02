"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TrailerButton } from "@/components/site";
import { HERO } from "@/data/home";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-8 pt-8 text-center sm:pb-10 sm:pt-10 lg:pb-12">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[hsl(var(--nav-theme))]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
          {HERO.badge}
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {HERO.title}
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
          {HERO.description}
        </p>

        <div className="flex flex-col justify-center gap-3 pt-1 sm:flex-row">
          <Link
            href={HERO.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--nav-theme))] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[hsl(var(--nav-theme))]/25 transition hover:brightness-110"
          >
            <GiftIcon className="h-4 w-4" />
            {HERO.primaryCta.label} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={HERO.secondaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            {HERO.secondaryCta.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stats row */}
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
          {HERO.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/[0.03] p-4 text-center"
            >
              <p className="text-lg font-bold text-[hsl(var(--nav-theme-light))] sm:text-xl">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trailer card */}
        <div className="relative mx-auto max-w-md pt-2 sm:max-w-lg">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
            <TrailerButton videoId="uLhv4-5NRCc" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GiftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 2.5 2.5v5" />
      <path d="M16.5 8v-2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1-2.5 2.5h-5" />
    </svg>
  );
}
