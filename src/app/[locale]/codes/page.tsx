import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { JsonLd, Breadcrumbs } from "@/components/site";
import { SITE_URL } from "@/site-data/site.config";
import { buildAlternates } from "@/i18n/locale-path";
import { routing, LOCALE_PREFIXES, type Locale } from "@/i18n/routing";
import { CodesClient } from "./codes-client";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lLoc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "codes.meta" });
  const path = "/codes";
  const alternates = buildAlternates(path);
  const languages: Record<string, string> = {};
  for (const [k, v] of Object.entries(alternates)) languages[k] = v;
  const pathWithLocale = lLoc === routing.defaultLocale ? "/codes" : `${LOCALE_PREFIXES[lLoc]}/codes`;
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

// Static locale map (webpack cannot resolve dynamic template literal imports)
const localeMap: Record<string, () => Promise<{ default: unknown }>> = {
  en: () => import("@/locales/en.json"),
  es: () => import("@/locales/es.json"),
  "pt-BR": () => import("@/locales/pt-BR.json"),
  ru: () => import("@/locales/ru.json"),
};

export default async function CodesPage({ params }: Props) {
  const { locale } = await params;
  await getMessages({ locale });
  const lLoc = locale as Locale;
  const pageUrl = locale === routing.defaultLocale ? `${SITE_URL}/codes` : `${SITE_URL}${LOCALE_PREFIXES[lLoc]}/codes`;

  const loader = localeMap[locale as keyof typeof localeMap];
  const localeData = loader
    ? (await loader()).default as { codes: { meta: Record<string, unknown>; active: unknown[]; copyButton: Record<string, string>; redemption: Record<string, unknown>; troubleshooting: Record<string, unknown>; expired: Record<string, unknown>; faq: unknown[]; sidebarCodes: unknown[]; officialSources: Record<string, unknown>; relatedGuides: Record<string, unknown> } }
    : { codes: { meta: {}, active: [], copyButton: {}, redemption: {}, troubleshooting: {}, expired: {}, faq: [], sidebarCodes: [], officialSources: {}, relatedGuides: {} } };
  const codes = localeData.codes as {
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