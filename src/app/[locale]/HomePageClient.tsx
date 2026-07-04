"use client";

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

export default function HomePageClient() {
  return (
    <div className="space-y-12 md:space-y-16">
      {/* 1. Hero */}
      <HeroSection data={heroConfig} />

      {/* 2. Resource Cards */}
      <ResourceCards items={resourceModules} />

      {/* 3. Latest Updates — auto-generated from MDX */}
      <LatestUpdates />

      {/* 4+. Body sections driven by config */}
      <HomeSections sections={homeSections} />

      {/* FAQ */}
      <FaqAccordion items={faqItems} />

      {/* Final CTA */}
      <FinalCTA data={finalCtaConfig} />
    </div>
  );
}
