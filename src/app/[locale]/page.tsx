import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { JsonLd } from "@/components/site";
import { routing, type Locale } from "@/i18n/routing";
import en from "@/locales/en.json";
import HomePageClient from "./HomePageClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hazeseashub.wiki";

type Messages = typeof en;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await getMessages({ locale })) as Messages;
  return {
    title: messages.home.meta.title,
    description: messages.home.meta.description,
    alternates: { canonical: locale === "en" ? "/" : `/${locale}`, languages: { en: "/" } },
    openGraph: { title: messages.home.meta.title, description: messages.home.meta.description, url: siteUrl, siteName: "Haze Seas Wiki", images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630, alt: "Haze Seas Wiki" }] },
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await getMessages({ locale })) as Messages;
  const webSite = { "@context": "https://schema.org", "@type": "WebSite", name: "Haze Seas Wiki", url: siteUrl, description: messages.home.meta.description };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: messages.home.faq.items.map((item: { question: string; answer: string }) => ({
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
