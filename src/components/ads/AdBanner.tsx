"use client";

import { useState, useEffect } from "react";
import { AD_KEYS } from "@/ads-config";

type BannerType = keyof typeof AD_KEYS;

interface AdBannerProps {
  type: BannerType;
  className?: string;
}

export default function AdBanner({ type, className = "" }: AdBannerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const size = AD_KEYS[type];
  if (!size) return null;

  return (
    <div className={`flex justify-center ${className}`}>
      <iframe
        src={`/ads/${type}`}
        width={size.width}
        height={size.height}
        scrolling="no"
        style={{ border: "none", display: "block" }}
      />
    </div>
  );
}
