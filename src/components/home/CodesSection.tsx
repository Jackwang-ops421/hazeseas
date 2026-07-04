"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  codesSection,
  codeSteps,
  activeCodes,
  expiredCodes,
} from "@/site-data/home.config";

const cardClass =
  "rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition-all duration-200 hover:border-[hsl(var(--nav-theme))]/30 hover:bg-slate-900/80 sm:p-5";

export function CodesSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const [copyFailed, setCopyFailed] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(code);
      setCopyFailed(null);
      setTimeout(() => setCopied(null), 1500);
    }).catch(() => {
      setCopyFailed(code);
      setCopied(null);
      setTimeout(() => setCopyFailed(null), 1500);
    });
  };

  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{codesSection.title}</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">{codesSection.description}</p>
        <p className="mt-2 text-xs leading-5 text-white/30">{codesSection.note}</p>
      </div>

      {/* Active code cards */}
      <div className="space-y-3">
        {activeCodes.length > 0 ? activeCodes.map(({ code, status, reward, note }) => (
          <div
            key={code}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <code className="rounded-lg bg-[hsl(var(--nav-theme))]/20 px-4 py-1.5 font-mono text-sm font-bold text-[hsl(var(--nav-theme-light))]">
                  {code}
                </code>
                <Badge className="border-none bg-emerald-500/15 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                  {status}
                </Badge>
              </div>
              <span className="text-sm font-semibold text-white">{reward}</span>
              <span className="text-xs text-white/40">{note}</span>
            </div>
            <button
              onClick={() => handleCopy(code)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 sm:shrink-0"
              aria-label={`Copy code ${code}`}
            >
              {copied === code ? (
                <><Check className="h-4 w-4 text-emerald-400" />Copied!</>
              ) : copyFailed === code ? (
                <><Copy className="h-4 w-4" />Copy failed</>
              ) : (
                <><Copy className="h-4 w-4" />Copy</>
              )}
            </button>
          </div>
        )) : (
          <div className={cardClass}>
            <p className="text-sm text-white/50">No active Haze Seas codes at this time.</p>
          </div>
        )}
      </div>

      {/* Redeem steps */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {codeSteps.map((step, i) => (
          <div key={step.label} className={cardClass}>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[hsl(var(--nav-theme))]/15 text-sm font-bold text-[hsl(var(--nav-theme-light))]">
              {i + 1}
            </span>
            <h3 className="mt-4 font-bold text-white">{step.label}</h3>
            <p className="mt-2 text-sm leading-5 text-white/50">{step.detail}</p>
          </div>
        ))}
      </div>

      {/* Expired codes */}
      {expiredCodes.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">Expired Codes</p>
          <p className="mb-3 text-xs text-white/30">Expired codes are kept here so players do not waste time testing old milestone codes.</p>
          <div className="flex flex-wrap gap-2">
            {expiredCodes.map((code) => (
              <code key={code} className="rounded-lg bg-white/5 px-3 py-1 font-mono text-xs text-white/30">
                {code}
              </code>
            ))}
          </div>
        </div>
      )}

      <Link href={codesSection.cta.href} className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme-light))] hover:underline">
        {codesSection.cta.label} <ChevronRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
