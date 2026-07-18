"use client";

import AdBanner from "@/components/ads/AdBanner";

export default function ArticlePageAds() {
  return (
    <>
      {/* Sticky 320x50 — top of content, always visible */}
      <div className="sticky top-20 z-20 py-2">
        <div className="mx-auto max-w-4xl px-4">
          <AdBanner type="banner-320x50" />
        </div>
      </div>

      {/* 300x250 — in content area */}
      <div className="my-6 flex justify-center">
        <AdBanner type="banner-300x250" />
      </div>

      {/* 728x90 — bottom of content */}
      <div className="mt-8 flex justify-center">
        <AdBanner type="banner-728x90" />
      </div>
    </>
  );
}
