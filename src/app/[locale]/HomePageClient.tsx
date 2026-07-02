"use client";

import {
  HeroSection,
  ResourceCards,
  LatestUpdates,
  CodesSection,
  OfficialLinksSection,
  StepGuideSection,
  TopicGridSection,
  ProgressionSection,
  FaqAccordion,
  FinalCTA,
} from "@/components/home";
import {
  FRUIT_CARDS,
  SKILL_STEPS,
} from "@/data/home";

export default function HomePageClient() {
  const skillCards = SKILL_STEPS.map((s, i) => ({
    title: s.label,
    href: "/skills/haze-seas-fighting-styles",
    badge: ["Unlock", "Compare", "Tips", "Progression"][i] || "Guide",
  }));

  return (
    <div className="space-y-12 md:space-y-16">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Resources / Explore Cards */}
      <ResourceCards />

      {/* 3. Latest Updates */}
      <LatestUpdates />

      {/* 4. Codes Section */}
      <CodesSection />

      {/* 5. Official Links Section */}
      <OfficialLinksSection />

      {/* 6. Beginner Guide Section */}
      <StepGuideSection />

      {/* 7. Fruit / Tier List Section */}
      <TopicGridSection
        title="Haze Seas Fruits Guide"
        description="Fruits are one of the most searched Haze Seas topics. Use this section to connect fruit guides, tier list pages, and beginner decision routes."
        cards={FRUIT_CARDS}
        ctaLabel="Read Full Fruit Guide"
        ctaHref="/fruits"
      />

      {/* 8. Fighting Styles / Skills Section */}
      <TopicGridSection
        title="Haze Seas Fighting Styles Guide"
        description="Compare fighting style unlock intent, skill planning, and combat progression without inventing unverified stats."
        cards={skillCards}
        ctaLabel="Read Fighting Styles Guide"
        ctaHref="/skills/haze-seas-fighting-styles"
      />

      {/* 9. Boss / Map / Progression Section */}
      <ProgressionSection />

      {/* 10. FAQ */}
      <FaqAccordion />

      {/* 11. Final CTA */}
      <FinalCTA />
    </div>
  );
}
