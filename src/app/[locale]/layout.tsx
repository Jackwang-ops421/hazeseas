import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/site";
import { routing } from "@/i18n/routing";
import { siteConfig, SITE_URL } from "@/site-data/site.config";
import { PRIMARY_NAV } from "@/site-data/nav.config";
import { getHeaderNavDropdowns } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const image = `${SITE_URL}/images/og-image.png`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: siteConfig.seo.title, template: "%s" },
    description: siteConfig.seo.description,
    openGraph: {
      type: "website",
      locale,
      url: SITE_URL,
      siteName: siteConfig.siteName,
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();

  const categoryLabels: Record<string, string> = Object.fromEntries(
    PRIMARY_NAV.map((item) => [item.href.replace(/^\//, ""), item.label]),
  );
  const headerDropdowns = getHeaderNavDropdowns(
    PRIMARY_NAV.map((item) => item.href.replace(/^\//, "")),
    locale,
    categoryLabels,
  );

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    url: SITE_URL,
    logo: `${SITE_URL}/android-chrome-512x512.png`,
    image: `${SITE_URL}/images/og-image.png`,
  };

  return (
    <html lang={locale} className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={organization} />
            <SiteHeader locale={locale} dropdownData={headerDropdowns} />
            {children}
            <SiteFooter locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
