"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "./reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Bar heights are proportional to an $800 scale.
const SCALE = 800;
const pct = (v: number) => `${(v / SCALE) * 100}%`;

export function Value() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".value-chart", start: "top 80%", end: "center 55%", scrub: 0.8 },
        });
        tl.from(".value-bar-base", { scaleY: 0, transformOrigin: "50% 100%", ease: "none", stagger: 0.15 })
          .from(".value-bar-range", { scaleY: 0, opacity: 0, transformOrigin: "50% 100%", ease: "none" }, ">-0.1")
          .from(".value-label", { opacity: 0, y: 12, ease: "none", stagger: 0.1 }, "<");
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-teal-mist py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">The math</p>
            <h2 className="display mt-5 text-[clamp(2.25rem,4.6vw,4rem)] text-ink">
              One panel. <span className="accent">Not a stack of lab bills.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2 md:text-lg">
              Without a diagnosis, insurance usually won’t cover these markers. Ordered one by one at
              cash rates, they can run $400–800+ every time you test. Signal bundles them into a single
              draw for $249.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href="#panels"
              className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal hover:text-teal-deep"
            >
              Compare all three panels <ArrowRight className="size-4" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="value-chart rounded-[32px] border border-white bg-white/80 p-6 shadow-[0_40px_80px_-50px_rgba(12,59,59,0.45)] backdrop-blur md:p-9">
            <div className="grid h-[340px] grid-cols-2 items-end gap-6 md:h-[380px] md:gap-10">
              {/* Ordered individually: a range, so the top half is hatched */}
              <div className="flex h-full flex-col justify-end">
                <div className="value-label mb-3">
                  <p className="display text-[clamp(1.9rem,3.6vw,2.75rem)] leading-none text-ink-2">$400–800+</p>
                  <p className="mt-1 font-mono text-[11px] tracking-wider text-ink-3 uppercase">per round</p>
                </div>
                <div className="relative w-full" style={{ height: pct(SCALE) }}>
                  <div
                    className="value-bar-range absolute inset-x-0 rounded-t-2xl border border-dashed border-ink-3/40 bg-[repeating-linear-gradient(135deg,rgba(138,133,128,0.16)_0_8px,transparent_8px_16px)]"
                    style={{ bottom: pct(400), height: pct(400) }}
                  />
                  <div className="value-bar-base absolute inset-x-0 bottom-0 rounded-b-2xl bg-[#d6d2cc]" style={{ height: pct(400) }} />
                </div>
              </div>

              {/* Signal */}
              <div className="flex h-full flex-col justify-end">
                <div className="value-label mb-3">
                  <p className="display text-[clamp(1.9rem,3.6vw,2.75rem)] leading-none text-teal">$249</p>
                  <p className="mt-1 font-mono text-[11px] tracking-wider text-teal-night/70 uppercase">one draw</p>
                </div>
                <div
                  className="value-bar-base w-full rounded-2xl bg-[linear-gradient(180deg,#069494,#068080)] shadow-[0_20px_40px_-16px_rgba(6,148,148,0.6)]"
                  style={{ height: pct(249) }}
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-6 border-t border-line pt-5 md:gap-10">
              <div>
                <p className="text-[15px] font-semibold text-ink">Ordered one by one</p>
                <p className="mt-0.5 text-[13px] text-ink-3">Cash rates, no diagnosis</p>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-ink">Zaro Signal</p>
                <p className="mt-0.5 text-[13px] text-ink-3">97 markers, results in the app</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-14 max-w-6xl px-5 md:mt-16">
        <p className="flex items-center justify-center gap-2.5 text-center text-[16px] font-semibold text-teal-night md:text-[17px]">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-teal text-white">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          And you can pay with pre-tax FSA/HSA dollars.
        </p>
        <p className="mt-3 text-center text-[12px] text-ink-3">
          Range reflects typical diagnostic cash rates for these markers ordered individually without coverage.
        </p>
      </Reveal>
    </section>
  );
}
