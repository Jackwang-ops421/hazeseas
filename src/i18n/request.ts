import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import ptBR from "@/locales/pt-BR.json";
import ru from "@/locales/ru.json";
import { routing, type Locale } from "./routing";

type Messages = typeof en;

const messagesMap: Record<Locale, Messages> = {
  en,
  es: es as Messages,
  "pt-BR": ptBR as Messages,
  ru: ru as Messages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale: Locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  return { locale, messages: messagesMap[locale] ?? en };
});