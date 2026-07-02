import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
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
      {
        source: "/beginner-guide",
        destination: "/guide/haze-seas-beginner-guide",
        permanent: true,
      },
      {
        source: "/release-date-and-updates",
        destination: "/guide/haze-seas-release-date-and-updates",
        permanent: true,
      },
      {
        source: "/fruit-tier-list",
        destination: "/tier-list/haze-seas-fruit-tier-list",
        permanent: true,
      },
      {
        source: "/fighting-styles",
        destination: "/skills/haze-seas-fighting-styles",
        permanent: true,
      },
      {
        source: "/swords-and-weapons",
        destination: "/weapons/haze-seas-swords-and-weapons",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));
