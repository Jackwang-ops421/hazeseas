"use client";

import { useEffect, useRef } from "react";
import { NATIVE_BANNER_KEY } from "@/ads-config";

interface NativeBannerAdProps {
  /** 显式传空字符串或 "0" 可关闭该广告位。不传则用 config 里的默认 key。 */
  adKey?: string | null;
  className?: string;
}

export default function NativeBannerAd({ adKey = NATIVE_BANNER_KEY, className = "" }: NativeBannerAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectiveKey = adKey === undefined || adKey === null ? NATIVE_BANNER_KEY : adKey;

  useEffect(() => {
    if (!effectiveKey || effectiveKey === "0") return;
    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = `https://pl30309990.effectivecpmnetwork.com/${effectiveKey}/invoke.js`;
    containerRef.current?.appendChild(script);
  }, [effectiveKey]);

  if (!effectiveKey || effectiveKey === "0") return null;

  return (
    <div
      ref={containerRef}
      id={`container-${effectiveKey}`}
      className={className}
    />
  );
}