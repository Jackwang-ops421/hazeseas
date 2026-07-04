import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { beginnerSteps } from "@/site-data/home.config";

const cardClass =
  "flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/30 hover:bg-card/80 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-[hsl(var(--nav-theme))]/30 dark:hover:bg-slate-900/80 sm:p-5";

interface StepGuideSectionProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  steps?: typeof beginnerSteps;
}

export function StepGuideSection({
  title = "Haze Seas Beginner Guide",
  description = "The best beginner route in Haze Seas is not to chase every system at once. Start with the basics: redeem codes, learn the first route, understand your combat options, and use the map before farming bosses or materials.",
  ctaLabel = "Read Beginner Guide",
  ctaHref = "/guide",
  steps = beginnerSteps,
}: StepGuideSectionProps) {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground dark:text-white/50">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.label} className={cardClass}>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[hsl(var(--nav-theme))]/10 text-sm font-bold text-[hsl(var(--nav-theme))] dark:bg-[hsl(var(--nav-theme))]/15 dark:text-[hsl(var(--nav-theme-light))]">
                {i + 1}
              </span>
              <h3 className="font-bold text-foreground dark:text-white">{step.label}</h3>
            </div>
            <p className="text-sm leading-5 text-muted-foreground dark:text-white/50">{step.detail}</p>
          </div>
        ))}
      </div>

      <Link href={ctaHref} className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme))] hover:underline dark:text-[hsl(var(--nav-theme-light))]">
        {ctaLabel} <ChevronRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
