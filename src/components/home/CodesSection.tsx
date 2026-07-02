"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, ChevronRight } from "lucide-react";
import { CODES_SECTION, VERIFIED_CODES } from "@/data/home";
import { Badge } from "@/components/ui/badge";

const cardClass =
  "rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/30 hover:bg-slate-900/80 sm:p-5";

export function CodesSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{CODES_SECTION.title}</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">{CODES_SECTION.description}</p>
      </div>

      {/* Code cards */}
      <div className="space-y-3">
        {VERIFIED_CODES.length > 0 ? (
          VERIFIED_CODES.map(({ code, reward }) => (
            <div
              key={code}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <code className="rounded-lg bg-[hsl(var(--nav-theme))]/20 px-4 py-2 font-mono text-sm font-bold text-[hsl(var(--nav-theme-light))]">
                    {code}
                  </code>
                  <Badge className="border-none bg-emerald-500/15 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                    Active
                  </Badge>
                </div>
                <span className="text-sm text-white/50">{reward}</span>
              </div>
              <button
                onClick={() => handleCopy(code)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 sm:shrink-0"
                aria-label={`Copy code ${code}`}
              >
                {copied === code ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          ))
        ) : (
          <div className={cardClass}>
            <p className="text-sm text-white/50">No verified Haze Seas codes have been added yet.</p>
          </div>
        )}
      </div>

      {/* Expired codes note */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
        <p className="text-xs text-white/40">{CODES_SECTION.expiredNote}</p>
      </div>

      {/* Redeem steps */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CODES_SECTION.steps.map((step, i) => (
          <div key={step.label} className={cardClass}>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[hsl(var(--nav-theme))] text-sm font-bold text-white">
              {i + 1}
            </span>
            <h3 className="mt-4 font-bold text-white">{step.label}</h3>
            <p className="mt-2 text-sm leading-5 text-white/50">{step.detail}</p>
          </div>
        ))}
      </div>

      <Link
        href={CODES_SECTION.cta.href}
        className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme-light))] hover:underline"
      >
        {CODES_SECTION.cta.label} <ChevronRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
