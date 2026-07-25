import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import { legacyRedirects } from "./legacy-routing.config.mjs";
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
      // Template-level locale canonicalization
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      { source: "/pt-BR", destination: "/pt-br", permanent: true },
      { source: "/pt-BR/:path*", destination: "/pt-br/:path*", permanent: true },
      // Project-specific legacy URL migration (see legacy-routing.config.mjs)
      ...legacyRedirects,
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));
