import { STATS } from "@/data/home";

export function StatsStrip() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-center"
        >
          <p className="text-2xl font-black text-white">{stat.value}</p>
          <p className="text-xs text-white/40">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
