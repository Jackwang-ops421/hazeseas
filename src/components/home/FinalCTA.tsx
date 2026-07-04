import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { type FinalCtaConfig } from "@/site-data/home.config";

export function FinalCTA({ data }: { data: FinalCtaConfig }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted via-background to-muted p-8 text-center dark:border-white/10 dark:from-slate-900 dark:via-slate-950 dark:to-black sm:p-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[hsl(var(--nav-theme))]/10 blur-3xl dark:bg-[hsl(var(--nav-theme))]/10" />
      </div>

      <div className="relative mx-auto max-w-2xl space-y-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme))]/10 dark:bg-[hsl(var(--nav-theme))]/20">
          <Play className="h-6 w-6 text-[hsl(var(--nav-theme))] dark:text-[hsl(var(--nav-theme-light))]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-white sm:text-3xl">{data.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground dark:text-white/50">{data.description}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={data.primary.href}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--nav-theme))] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[hsl(var(--nav-theme))]/20 transition hover:brightness-110"
          >
            {data.primary.label} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={data.secondary.href}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:border-[hsl(var(--nav-theme))]/50 hover:bg-muted dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10"
          >
            {data.secondary.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
