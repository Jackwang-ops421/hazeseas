import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FINAL_CTA } from "@/data/home";

export function FinalCTA() {
  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-8 text-center">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">{FINAL_CTA.title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/50">{FINAL_CTA.description}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href={FINAL_CTA.primary.href}
          className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--nav-theme))] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[hsl(var(--nav-theme))]/20 transition hover:brightness-110"
        >
          {FINAL_CTA.primary.label} <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={FINAL_CTA.secondary.href}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
        >
          {FINAL_CTA.secondary.label} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
