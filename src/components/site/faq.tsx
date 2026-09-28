import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ, LINKS } from "@/lib/content";
import { Reveal } from "./reveal";

export function Faq() {
  return (
    <section id="faq" className="relative bg-sand py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-5 text-[clamp(2.25rem,4.4vw,3.75rem)] text-ink">
              Before you <span className="accent">book.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-ink-2">
              The things people ask most before their first panel.
            </p>
            <a href={LINKS.faq} className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal hover:text-teal-deep">
              All FAQs <ArrowRight className="size-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible defaultValue="item-0" className="rounded-[28px] bg-white px-6 md:px-8">
            {FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-[17px] font-semibold text-ink hover:no-underline md:text-[18px]">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[16px] leading-relaxed text-ink-2">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
