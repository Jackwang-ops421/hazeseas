"use client";

import { useEffect, useRef } from "react";

interface NativeBannerAdProps {
  adKey?: string | null;
  className?: string;
}

export default function NativeBannerAd({ adKey, className = "" }: NativeBannerAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adKey || adKey === "0") return;

    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = `https://pl30309990.effectivecpmnetwork.com/${adKey}/invoke.js`;
    containerRef.current?.appendChild(script);
  }, [adKey]);

  if (!adKey || adKey === "0") return null;

  return (
    <div
      ref={containerRef}
      id={`container-${adKey}`}
      className={className}
    />
  );
}
