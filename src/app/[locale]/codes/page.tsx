import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { JsonLd, Breadcrumbs } from "@/components/site";
import { SITE_URL } from "@/site-data/site.config";
import { buildAlternates } from "@/i18n/locale-path";
import { routing } from "@/i18n/routing";
import { CodesClient } from "./codes-client";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "codes.meta" });
  const path = "/codes";
  const alternates = buildAlternates(path);
  const languages: Record<string, string> = {};
  for (const [k, v] of Object.entries(alternates)) languages[k] = v;
  const pathWithLocale = locale === routing.defaultLocale ? path : `/${locale.toLowerCase()}${path}`;
  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: { canonical: `${SITE_URL}${pathWithLocale}`, languages },
    robots: { index: true, follow: true },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}${pathWithLocale}`,
      siteName: "Haze Seas Wiki",
    },
  };
}

export default async function CodesPage({ params }: Props) {
  const { locale } = await params;
  await getMessages({ locale });
  const pageUrl = `${SITE_URL}${locale === routing.defaultLocale ? "/codes" : `/${locale.toLowerCase()}/codes`}`;

  const codes = (await import(`@/locales/${locale}.json`)).default.codes as {
    meta: { h1: string; lastUpdated: string; intro: string; verificationNotice: string; breadcrumb: string };
    active: Array<{ code: string; reward: string; status: string; badgeVariant: string; note?: string }>;
    copyButton: { ariaLabelTemplate: string; successLabel: string };
    redemption: { h2: string; robloxLinkLabel: string; robloxUrl: string; steps: string[] };
    troubleshooting: { h2: string; items: Array<{ title: string; body: string }> };
    expired: { h2: string; codes: string[] };
    faq: Array<{ question: string; answer: string }>;
    sidebarCodes: Array<{ code: string; reward: string }>;
    officialSources: { h2: string; items: Array<{ label: string; url: string }> };
    relatedGuides: { h2: string; items: Array<{ title: string; description: string; href: string }> };
  };

  return (
    <CodesClient
      locale={locale}
      pageUrl={pageUrl}
      codes={codes}
    />
  );
}