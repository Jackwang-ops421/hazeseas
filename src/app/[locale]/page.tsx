import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { JsonLd } from "@/components/site";
import { siteConfig, SITE_URL } from "@/site-data/site.config";
import { faqItems } from "@/site-data/home.config";
import { createPageMetadata } from "@/i18n/seo";
import { routing, type Locale } from "@/i18n/routing";
import HomePageClient from "./HomePageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({
    locale: locale as Locale,
    pathname: "/",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    availableLocales: routing.locales as readonly Locale[],
  });
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: SITE_URL,
    description: siteConfig.seo.description,
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={webSite} />
      <JsonLd data={faqPage} />
      <HomePageClient />
    </main>
  );
}
