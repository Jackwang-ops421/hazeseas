// ============================================================
// Adsterra 广告 Key 配置 — 换网站只改这个文件
// ============================================================
// Key 为空字符串或 "0" 时，对应广告位不渲染

export const AD_KEYS: Record<string, { key: string; width: number; height: number }> = {
  "banner-468x60":    { key: "53d7adae004c9b5419f141b57b8c97a7", width: 468, height: 60 },
  "banner-300x250":   { key: "d9c27e4ce5d63032f93850903afc20fe", width: 300, height: 250 },
  "banner-160x300":   { key: "2fb5e8dda822f3b029902c3b92f93e18", width: 160, height: 300 },
  "banner-160x600":   { key: "86b60e49e8c913b7ad69ace817169961", width: 160, height: 600 },
  "banner-320x50":    { key: "4b5debaa601cbf49f6285b3a8e82e8de", width: 320, height: 50 },
  "banner-728x90":    { key: "b1839d1fa30e2a436a6810a49f9636da", width: 728, height: 90 },
};

export const NATIVE_BANNER_KEY = "2b6dba9fa8419e4c82a4fc67b6c736c9";