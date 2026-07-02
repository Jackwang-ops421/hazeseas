"use client";

import Link from "next/link";
import {
  HeroSection,
  ResourceCards,
  LatestUpdates,
  CodesSection,
  OfficialLinksSection,
  StepGuideSection,
  TopicGridSection,
  ProgressionSection,
  StatsStrip,
  FaqAccordion,
  FinalCTA,
} from "@/components/home";
import {
  FRUIT_CARDS,
  SKILL_STEPS,
  BEGINNER_STEPS,
  PROGRESSION_CARDS,
} from "@/data/home";
import { Badge } from "@/components/ui/badge";
import { Skull, Zap, Sword } from "lucide-react";

export default function HomePageClient() {
  const skillCards = SKILL_STEPS.map((s, i) => ({
    title: s.label,
    href: "/skills/haze-seas-fighting-styles",
    badge: ["Unlock", "Compare", "Tips", "Progression"][i] || "Guide",
  }));

  return (
    <div className="space-y-16">
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
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Haze Seas Fighting Styles Guide</h2>
          <p className="mt-2 text-sm text-white/50">
            Compare fighting style unlock intent, skill planning, and combat progression without inventing unverified stats.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/50 hover:-translate-y-1 hover:bg-slate-900/80"
            >
              <div className="mb-3">
                <Badge
                  variant="outline"
                  className="border-[hsl(var(--nav-theme))]/40 bg-[hsl(var(--nav-theme))]/10 text-xs font-semibold text-[hsl(var(--nav-theme-light))]"
                >
                  {card.badge}
                </Badge>
              </div>
              <h3 className="font-bold text-white group-hover:text-[hsl(var(--nav-theme-light))]">
                {card.title}
              </h3>
              <div className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                Explore →
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/skills/haze-seas-fighting-styles"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme-light))] hover:underline"
        >
          Read Fighting Styles Guide →
        </Link>
      </section>

      {/* 9. Boss / Map / Progression Section */}
      <ProgressionSection />

      {/* 10. Stats / Trust Strip */}
      <StatsStrip />

      {/* 11. FAQ */}
      <FaqAccordion />

      {/* 12. Final CTA */}
      <FinalCTA />
    </div>
  );
}
