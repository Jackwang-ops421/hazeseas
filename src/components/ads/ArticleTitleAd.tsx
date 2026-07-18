"use client";

import AdBanner from "@/components/ads/AdBanner";

export default function ArticleTitleAd() {
  return (
    <div className="sticky top-20 z-20 py-2">
      <div className="mx-auto max-w-4xl">
        <AdBanner type="banner-320x50" />
      </div>
    </div>
  );
}
