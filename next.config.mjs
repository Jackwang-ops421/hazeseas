import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import { remarkBr } from "./src/lib/remark-br.mjs";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkBr],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  allowedDevOrigins: ["*.preview.same-app.com"],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "source.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "ext.same-assets.com", pathname: "/**" },
      { protocol: "https", hostname: "ugc.same-assets.com", pathname: "/**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      // Legacy article shortcuts
      { source: "/beginner-guide", destination: "/guide/haze-seas-beginner-guide", permanent: true },
      { source: "/release-date-and-updates", destination: "/guide/haze-seas-release-date-and-updates", permanent: true },
      { source: "/fruit-tier-list", destination: "/tier-list/haze-seas-fruit-tier-list", permanent: true },
      { source: "/fighting-styles", destination: "/skills/haze-seas-fighting-styles", permanent: true },
      { source: "/swords-and-weapons", destination: "/weapons/haze-seas-swords-and-weapons", permanent: true },
      // Directory consolidation
      { source: "/styles", destination: "/skills", permanent: true },
      { source: "/styles/:slug", destination: "/skills/:slug", permanent: true },
      { source: "/tiers", destination: "/tier-list", permanent: true },
      { source: "/tiers/:slug", destination: "/tier-list/:slug", permanent: true },
      { source: "/official", destination: "/official-links", permanent: true },
      { source: "/official/:slug", destination: "/official-links/:slug", permanent: true },
      { source: "/progression", destination: "/guide", permanent: true },
      { source: "/progression/:slug", destination: "/guide/:slug", permanent: true },
      { source: "/codes/haze-seas-codes", destination: "/codes", permanent: true },
      // Locale canonicalization
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      { source: "/pt-BR", destination: "/pt-br", permanent: true },
      { source: "/pt-BR/:path*", destination: "/pt-br/:path*", permanent: true },
      // Multi-locale codes redirects
      { source: "/es/codes/haze-seas-codes", destination: "/es/codes", permanent: true },
      { source: "/pt-br/codes/haze-seas-codes", destination: "/pt-br/codes", permanent: true },
      { source: "/pt-BR/codes/haze-seas-codes", destination: "/pt-br/codes", permanent: true },
      { source: "/ru/codes/haze-seas-codes", destination: "/ru/codes", permanent: true },
      // Legacy catch-all redirects for removed categories
      { source: "/maps", destination: "/guide", permanent: true },
      { source: "/maps/:slug", destination: "/guide/:slug", permanent: true },
      { source: "/skills", destination: "/guide", permanent: true },
      { source: "/skills/:slug", destination: "/guide/:slug", permanent: true },
      { source: "/races", destination: "/guide", permanent: true },
      { source: "/races/:slug", destination: "/guide/:slug", permanent: true },
      { source: "/weapons", destination: "/items", permanent: true },
      { source: "/weapons/:slug", destination: "/items/:slug", permanent: true },
      { source: "/materials", destination: "/items", permanent: true },
      { source: "/materials/:slug", destination: "/items/:slug", permanent: true },
      { source: "/official-links", destination: "/community", permanent: true },
      { source: "/official-links/:slug", destination: "/community/:slug", permanent: true },
      // Locale canonicalization: /en/* -> /* (en has no prefix), /pt-BR/* -> /pt-br/*
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      { source: "/pt-BR/:path*", destination: "/pt-br/:path*", permanent: true },
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));
