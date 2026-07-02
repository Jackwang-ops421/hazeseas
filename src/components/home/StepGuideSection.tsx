import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BEGINNER_STEPS } from "@/data/home";

export function StepGuideSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Haze Seas Beginner Guide</h2>
        <p className="mt-2 text-sm text-white/50">
          Learn the basic Haze Seas progression loop before spending time on fruits, races, bosses, weapons, and materials.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BEGINNER_STEPS.map((step, i) => (
          <div
            key={step.label}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[hsl(var(--nav-theme))] text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="font-bold text-white">{step.label}</h3>
            </div>
            <p className="text-sm leading-5 text-white/50">{step.detail}</p>
          </div>
        ))}
      </div>

      <Link
        href="/guide/haze-seas-beginner-guide"
        className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme-light))] hover:underline"
      >
        Read Beginner Guide <ChevronRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
