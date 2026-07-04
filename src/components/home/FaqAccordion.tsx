"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type FAQItem } from "@/site-data/home.config";

export function FaqAccordion({ items }: { items: FAQItem[] }) {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-white sm:text-3xl">Frequently Asked Questions</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground dark:text-white/50">
          Everything you need to know about Haze Seas Hub.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="rounded-lg border border-border bg-card dark:border-white/10 dark:bg-slate-900/60"
      >
        {items.map((faq, index) => (
          <AccordionItem key={faq.question} value={`item-${index}`} className="border-border px-5 dark:border-white/10">
            <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-[hsl(var(--nav-theme))] dark:text-white dark:hover:text-[hsl(var(--nav-theme-light))] sm:text-base">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="leading-7 text-muted-foreground dark:text-white/50">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
