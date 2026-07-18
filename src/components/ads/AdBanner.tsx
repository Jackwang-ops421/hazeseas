"use client";

import { useState, useEffect } from "react";

type BannerType =
  | "banner-320x50"
  | "banner-300x250"
  | "banner-468x60"
  | "banner-728x90"
  | "sidebar-160x600"
  | "sidebar-160x300";

const BANNER_SIZES: Record<BannerType, { width: number; height: number }> = {
  "banner-320x50": { width: 320, height: 50 },
  "banner-300x250": { width: 300, height: 250 },
  "banner-468x60": { width: 468, height: 60 },
  "banner-728x90": { width: 728, height: 90 },
  "sidebar-160x600": { width: 160, height: 600 },
  "sidebar-160x300": { width: 160, height: 300 },
};

export interface AdBannerProps {
  type: BannerType;
  className?: string;
}

export default function AdBanner({ type, className = "" }: AdBannerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const size = BANNER_SIZES[type];
  if (!size) return null;

  return (
    <div className={`flex justify-center ${className}`}>
      <iframe
        src={`/ads/${type}.html`}
        width={size.width}
        height={size.height}
        scrolling="no"
        style={{ border: "none", display: "block" }}
      />
    </div>
  );
}
