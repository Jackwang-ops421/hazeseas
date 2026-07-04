import { Shield, CheckCircle, Gamepad2, Ban } from "lucide-react";
import { STATS } from "@/data/home";

const ICONS = [Gamepad2, Shield, CheckCircle, Ban];

export function StatsStrip() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat, i) => {
        const Icon = ICONS[i] || Shield;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/30 hover:bg-card/80 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-[hsl(var(--nav-theme))]/30 dark:hover:bg-slate-900/80 sm:flex-col sm:gap-2 sm:p-6 sm:text-center"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme))]/10 dark:bg-white/5 sm:mb-1">
              <Icon className="h-5 w-5 text-[hsl(var(--nav-theme))] dark:text-[hsl(var(--nav-theme-light))]" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-foreground dark:text-white sm:text-xl">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground dark:text-white/40">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
