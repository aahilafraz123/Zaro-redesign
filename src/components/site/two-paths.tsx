"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Minus, Plus } from "lucide-react";
import { SectionHeading } from "./reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ROWS = [
  ["You act once symptoms appear", "You check before anything goes wrong"],
  ["One annual visit, 12–15 basic markers", "Bloodwork, wearable data and one living score"],
  ["No trend, no continuity", "Trends over time, not one-off snapshots"],
  ["Expensive treatment after the damage", "Small adjustments early, before costs compound"],
];

export function TwoPaths() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".path-old", {
          x: -40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".path-grid", start: "top 80%" },
        });
        gsap.from(".path-new", {
          x: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".path-grid", start: "top 80%" },
        });
        gsap.from(".path-row", {
          y: 16,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".path-grid", start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-white py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          title="Two ways to spend"
          accent="the next ten years."
          body="Disease has usually been building for a decade, quietly visible in bloodwork the whole time. The difference between these paths isn’t luck or genetics. It’s information, early enough to act on."
        />

        <div className="path-grid mt-16 grid gap-5 md:mt-20 md:grid-cols-2">
          <div className="path-old rounded-[28px] border border-line/70 bg-sand p-7 md:p-9">
            <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">The usual way</p>
            <h3 className="mt-3 font-display text-[30px] font-light text-ink-2">React to a crisis</h3>
            <ul className="mt-8 space-y-4">
              {ROWS.map(([a]) => (
                <li key={a} className="path-row flex gap-3 text-[16px] text-ink-2">
                  <Minus className="mt-1 size-4 shrink-0 text-ink-3" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="path-new relative overflow-hidden rounded-[28px] bg-teal-night p-7 text-white md:p-9">
            <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(6,148,148,0.55),transparent)]" />
            <p className="relative font-mono text-[11px] tracking-[0.16em] text-teal-soft uppercase">The Zaro way</p>
            <h3 className="relative mt-3 font-display text-[30px] font-light">Compound your health</h3>
            <ul className="relative mt-8 space-y-4">
              {ROWS.map(([, b]) => (
                <li key={b} className="path-row flex gap-3 text-[16px] text-white/90">
                  <Plus className="mt-1 size-4 shrink-0 text-teal-soft" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
