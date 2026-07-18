"use client";

import { useState, useEffect } from "react";
import { AD_KEYS } from "@/ads-config";

type BannerType = keyof typeof AD_KEYS;

export interface AdBannerProps {
  type: BannerType;
  /** 显式传空字符串或 "0" 可关闭该广告位（不渲染）。不传则用 config 里的 key。 */
  adKey?: string | null;
  className?: string;
}

export default function AdBanner({ type, adKey, className = "" }: AdBannerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 实际 key：不传 → 用 config 默认值；传空/0 → null（不渲染）
  const effectiveKey = adKey === undefined || adKey === null ? AD_KEYS[type]?.key : adKey;

  if (!effectiveKey || effectiveKey === "0" || !mounted) return null;

  const size = AD_KEYS[type];
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