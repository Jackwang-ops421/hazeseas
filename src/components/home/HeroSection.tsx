"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TrailerButton } from "@/components/site";
import { HERO } from "@/data/home";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black via-slate-950 to-black py-14 px-6 lg:py-20 lg:px-12">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-[hsl(var(--nav-theme))]/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-purple-900/15 blur-3xl" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* Left: Text */}
        <div className="space-y-5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
            {HERO.badge}
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {HERO.title}
          </h1>

          <p className="mx-auto max-w-lg text-sm leading-7 text-white/60 lg:mx-0">
            {HERO.description}
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Link
              href={HERO.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--nav-theme))] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[hsl(var(--nav-theme))]/20 transition hover:brightness-110"
            >
              {HERO.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={HERO.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              {HERO.secondaryCta.label}
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-4 lg:grid-cols-2">
            {HERO.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-sm font-bold text-white">{stat.value}</p>
                <p className="text-[11px] text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Media card */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
            <TrailerButton videoId="uLhv4-5NRCc" />
          </div>
          <div className="absolute -bottom-3 -right-3 rounded-xl border border-white/10 bg-[hsl(var(--nav-theme))]/20 px-3 py-1.5 backdrop-blur-sm">
            <p className="text-xs font-semibold text-[hsl(var(--nav-theme-light))]">Official Trailer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
