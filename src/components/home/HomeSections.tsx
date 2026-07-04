/**
 * HomeSections — renders configurable body sections on the homepage.
 *
 * Each section in homeSections config has a `type` field that maps to a
 * component. This lets the homepage be fully driven by config without
 * hardcoding game-specific section names.
 */

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { StepGuideSection } from "./StepGuideSection";
import { ProgressionSection } from "./ProgressionSection";
import { type HomeSection } from "@/site-data/home.config";

const cardClass =
  "rounded-lg border border-border bg-card p-4 dark:border-white/10 dark:bg-slate-900/40";

interface HomeSectionsProps {
  sections: HomeSection[];
}

function ArticleSection({ section }: { section: HomeSection }) {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-white sm:text-3xl">{section.title}</h2>
        {section.description && (
          <p className="mt-2 text-sm leading-6 text-muted-foreground dark:text-white/50">{section.description}</p>
        )}
      </div>

      {section.body && (
        <div className="space-y-4 rounded-lg border border-border bg-card p-5 text-sm leading-7 text-muted-foreground dark:border-white/10 dark:bg-slate-900/60 dark:text-white/50">
          {section.body.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {section.subsections && (
        <div className="space-y-4">
          {section.subsections.map((sub) => (
            <div key={sub.title} className={cardClass}>
              <h3 className="font-bold text-foreground dark:text-white">{sub.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground dark:text-white/50">{sub.body}</p>
            </div>
          ))}
        </div>
      )}

      {section.ctaLabel && section.ctaHref && (
        <Link
          href={section.ctaHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme))] hover:underline dark:text-[hsl(var(--nav-theme-light))]"
        >
          {section.ctaLabel} <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </section>
  );
}

export function HomeSections({ sections }: HomeSectionsProps) {
  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case "codes":
            // CodesSection is rendered separately before HomeSections
            return null;
          case "official-links":
            // OfficialLinksSection is rendered separately before HomeSections
            return null;
          case "beginner-guide":
            return (
              <StepGuideSection
                key={section.title}
                title={section.title}
                description={section.description}
                ctaLabel={section.ctaLabel}
                ctaHref={section.ctaHref}
                steps={section.data as typeof import("@/site-data/home.config").beginnerSteps | undefined}
              />
            );
          case "article":
            return <ArticleSection key={section.title} section={section} />;
          case "progression":
            return <ProgressionSection key={section.title} />;
          default:
            return null;
        }
      })}
    </>
  );
}
