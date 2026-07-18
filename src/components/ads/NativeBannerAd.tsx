"use client";

import { useEffect, useRef } from "react";
import { NATIVE_BANNER_KEY } from "@/ads-config";

interface NativeBannerAdProps {
  className?: string;
}

export default function NativeBannerAd({ className = "" }: NativeBannerAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = `https://pl30309990.effectivecpmnetwork.com/${NATIVE_BANNER_KEY}/invoke.js`;
    containerRef.current?.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      id={`container-${NATIVE_BANNER_KEY}`}
      className={className}
    />
  );
}
