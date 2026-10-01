"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import BlurText from "@/components/BlurText";
import { LINKS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".cta-video",
          { scale: 1.25 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-teal-night py-32 text-white md:py-48">
      <video
        className="cta-video absolute inset-0 h-full w-full object-cover object-[50%_30%] opacity-25 mix-blend-luminosity"
        src={LINKS.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
      />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,59,59,0.35),rgba(12,59,59,0.92)_70%)]" />

      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <h2 className="display text-[clamp(2.75rem,7vw,6rem)]">
          <BlurText as="span" text="Start knowing" delay={80} direction="bottom" className="justify-center" />
          <BlurText as="span" text="your body." delay={80} direction="bottom" className="justify-center" wordClassName="italic text-teal-soft" />
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-[18px] leading-relaxed text-white/80">
          Choose a panel, get your blood drawn this week, and get answers that explain what’s happening
          inside you.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={LINKS.getStarted}
            className="group inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-[16px] font-semibold text-teal-night transition-colors hover:bg-teal-mist"
          >
            Get started from $149
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a href="#panels" className="inline-flex h-14 items-center rounded-full px-7 text-[16px] font-semibold text-white transition-colors hover:bg-white/10">
            Compare panels
          </a>
        </div>
      </div>
    </section>
  );
}
