"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/data/home";

export function FaqAccordion() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Frequently Asked Questions</h2>
        <p className="mt-2 text-sm text-white/50">
          Everything you need to know about Haze Seas Hub.
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue="item-0" className="rounded-2xl border border-white/10 bg-slate-900/60">
        {FAQS.map((faq, index) => (
          <AccordionItem key={faq.question} value={`item-${index}`} className="border-white/10 px-5">
            <AccordionTrigger className="text-left text-white hover:text-[hsl(var(--nav-theme-light))]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="leading-7 text-white/50">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
