"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";
import { Logo } from "./logo";
import { Reveal } from "./reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Fsa() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".fsa-card",
          { rotateY: -28, rotateX: 14, y: 60 },
          {
            rotateY: 8,
            rotateX: -4,
            y: -30,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
          },
        );
        gsap.fromTo(
          ".fsa-card-back",
          { rotateY: -18, rotateX: 10, y: 90, x: 30 },
          {
            rotateY: 4,
            rotateX: -2,
            y: 10,
            x: 50,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-teal-mist py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow">FSA / HSA eligible</p>
            <h2 className="display mt-5 text-[clamp(2.25rem,4.6vw,4rem)] text-ink">
              Spend your health dollars <span className="accent">before you’re sick.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2 md:text-lg">
              You’ve been setting aside pre-tax money for years. Most people wait until something goes
              wrong to use it. A small spend on testing today can catch the imbalances that turn into
              the expensive conditions later.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 grid max-w-md grid-cols-2 gap-3">
              {["FSA eligible", "HSA eligible", "No insurance needed", "No doctor visit"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-[15px] font-semibold text-teal-night">
                  <span className="grid size-6 place-items-center rounded-full bg-teal text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] text-ink-3">Pay with your FSA or HSA card at checkout, like any other card.</p>
          </Reveal>
        </div>

        <div className="relative mx-auto h-[300px] w-full max-w-[460px] sm:h-[340px]" style={{ perspective: 1400 }}>
          <div className="fsa-card-back absolute inset-x-6 top-6 aspect-[1.586] rounded-[22px] bg-[linear-gradient(135deg,#8fb4a0,#5c8c6e)] shadow-[0_40px_80px_-30px_rgba(12,59,59,0.5)]" />
          <div
            className="fsa-card relative aspect-[1.586] w-full overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#0c3b3b_0%,#068080_55%,#069494_100%)] p-6 text-white shadow-[0_50px_90px_-30px_rgba(12,59,59,0.7)] sm:p-7"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div aria-hidden className="absolute -top-20 -right-10 size-64 rounded-full bg-white/10 blur-2xl" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.18)_45%,transparent_60%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <Logo mono className="h-5 text-white" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-white/80">FSA · HSA</span>
              </div>
              <div className="h-9 w-12 rounded-md bg-[linear-gradient(135deg,#e8e5e1,#c8c5c0)] opacity-90" />
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-white/70">PRE-TAX HEALTH DOLLARS</p>
                  <p className="mt-1 font-mono text-[16px] tracking-[0.18em]">•••• •••• •••• 2026</p>
                </div>
                <p className="text-[13px] font-semibold text-teal-soft">Eligible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
