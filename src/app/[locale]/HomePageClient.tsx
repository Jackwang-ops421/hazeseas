"use client";

import { ArrowUp } from "lucide-react";
import {
  HeroSection,
  ResourceCards,
  LatestUpdates,
  CodesSection,
  OfficialLinksSection,
  StepGuideSection,
  ProgressionSection,
  FaqAccordion,
  FinalCTA,
  HomeSections,
} from "@/components/home";
import {
  heroConfig,
  resourceModules,
  homeSections,
  faqItems,
  finalCtaConfig,
} from "@/site-data/home.config";
import NativeBannerAd from "@/components/ads/NativeBannerAd";
import AdBanner from "@/components/ads/AdBanner";

export default function HomePageClient() {
  return (
    <div className="space-y-12 md:space-y-16">
      {/* Sticky 320x50 — top of page, always visible */}
      <div className="sticky top-20 z-20 py-2">
        <div className="mx-auto max-w-4xl px-4">
          <AdBanner type="banner-320x50" />
        </div>
      </div>

      {/* 1. Hero */}
      <HeroSection data={heroConfig} />

      {/* Native Banner Ad — after Hero, before content */}
      <div className="mx-auto max-w-4xl px-4">
        <NativeBannerAd className="min-h-[100px]" />
      </div>

      {/* 2. Resource Cards */}
      <ResourceCards items={resourceModules} />

      {/* 3. Latest Updates — auto-generated from MDX */}
      <LatestUpdates />

      {/* 468x60 — between sections */}
      <div className="mx-auto max-w-4xl px-4">
        <AdBanner type="banner-468x60" />
      </div>

      {/* 4+. Body sections driven by config */}
      <HomeSections sections={homeSections} />

      {/* FAQ */}
      <FaqAccordion items={faqItems} />

      {/* Final CTA */}
      <FinalCTA data={finalCtaConfig} />

      {/* 728x90 — bottom of page */}
      <div className="mx-auto max-w-4xl px-4">
        <AdBanner type="banner-728x90" />
      </div>

      {/* Back to top — matches competitor "More" class behavior */}
      <div className="flex justify-center pb-4">
        <a
          href="#hero"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-semibold text-muted-foreground shadow-sm transition-colors hover:border-[hsl(var(--nav-theme))]/50 hover:text-[hsl(var(--nav-theme))] dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:border-[hsl(var(--nav-theme))]/50 dark:hover:text-[hsl(var(--nav-theme-light))]"
        >
          <ArrowUp className="h-4 w-4" />
          More
        </a>
      </div>
    </div>
  );
}
