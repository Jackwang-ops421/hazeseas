import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: { absolute: "Haze Seas Codes (July 2026) — Active & Verified" },
    description: "Use the latest Haze Seas codes for free Race Spins, Stat Refunds, Cash, Gems, and 2x EXP. Updated July 11, 2026 for returning Haze Piece players.",
    alternates: { canonical: "https://hazeseashub.wiki/codes" },
    robots: { index: true, follow: true },
  };
}

export default function CodesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}