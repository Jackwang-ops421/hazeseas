"use client";

import { useEffect, useRef } from "react";

interface NativeBannerAdProps {
  className?: string;
}

const NATIVE_BANNER_KEY = "2b6dba9fa8419e4c82a4fc67b6c736c9";

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
