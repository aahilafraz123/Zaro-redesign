"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, Clock, IdCard, MapPin } from "lucide-react";
import { STEPS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { ScoreRing } from "./score-ring";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ease = [0.16, 1, 0.3, 1] as const;

function ScreenChoose() {
  const rows = [
    { n: "Surface", p: "$149", q: "Has something gone wrong?" },
    { n: "Signal", p: "$249", q: "Is something developing?", on: true },
    { n: "Source", p: "$399", q: "What’s the root cause?" },
  ];
  return (
    <div className="flex h-full flex-col">
      <p className="text-[13px] text-ink-3">New order</p>
      <p className="mt-1 font-display text-[22px] leading-tight text-ink">Choose your panel</p>
      <div className="mt-5 space-y-2.5">
        {rows.map((r) => (
          <div
            key={r.n}
            className={cn(
              "flex items-center justify-between rounded-2xl border p-3.5",
              r.on ? "border-teal bg-teal-mist" : "border-line bg-white",
            )}
          >
            <div>
              <p className="text-[14px] font-semibold text-ink">{r.n}</p>
              <p className="text-[12px] text-ink-3">{r.q}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[12px] text-ink-2">{r.p}</span>
              <span className={cn("grid size-5 place-items-center rounded-full border", r.on ? "border-teal bg-teal" : "border-line")}>
                {r.on && <Check className="size-3 text-white" strokeWidth={3} />}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-2xl bg-sand p-3 text-[12px] text-ink-2">
        <MapPin className="size-4 text-teal" />
        Quest center available near 94107
      </div>
      <div className="mt-auto rounded-full bg-teal py-3 text-center text-[14px] font-semibold text-white">
        Pay with FSA/HSA or card
      </div>
    </div>
  );
}

function ScreenDraw() {
  return (
    <div className="flex h-full flex-col">
      <p className="text-[13px] text-ink-3">Your appointment</p>
      <p className="mt-1 font-display text-[22px] leading-tight text-ink">Quest Diagnostics</p>
      <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-white">
        <div className="relative h-28 bg-[linear-gradient(135deg,#ebf9f9,#f7f5f2)]">
          <svg viewBox="0 0 300 112" className="absolute inset-0 h-full w-full" aria-hidden>
            <path d="M0 80 C60 60 90 96 150 70 S250 40 300 58" stroke="#c2e5e5" strokeWidth="10" fill="none" />
            <path d="M40 0 L90 112 M210 0 L180 112" stroke="#e0ddd8" strokeWidth="6" />
          </svg>
          <span className="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-teal text-white shadow-lg">
            <MapPin className="size-4" />
          </span>
        </div>
        <div className="p-3.5">
          <p className="text-[14px] font-semibold text-ink">Tue, 8:10 AM</p>
          <p className="text-[12px] text-ink-3">0.8 mi away · walk-ins welcome</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2.5 text-[13px] text-ink-2">
        <li className="flex items-center gap-2.5"><Clock className="size-4 text-teal" /> Fast for 8–10 hours</li>
        <li className="flex items-center gap-2.5"><IdCard className="size-4 text-teal" /> Bring a photo ID</li>
        <li className="flex items-center gap-2.5"><Check className="size-4 text-teal" /> Draw takes 5–10 minutes</li>
      </ul>
    </div>
  );
}

function ScreenResults() {
  const rows = [
    { k: "ApoB", v: "82", u: "mg/dL", s: "Optimal", c: "#5c8c6e", x: 34 },
    { k: "HbA1c", v: "5.4", u: "%", s: "Normal", c: "#5c8c6e", x: 44 },
    { k: "Vitamin D", v: "24", u: "ng/mL", s: "Low", c: "#e08b84", x: 18 },
    { k: "hs-CRP", v: "0.6", u: "mg/L", s: "Optimal", c: "#5c8c6e", x: 26 },
    { k: "Ferritin", v: "41", u: "ng/mL", s: "Normal", c: "#5c8c6e", x: 52 },
  ];
  return (
    <div className="flex h-full flex-col">
      <p className="text-[13px] text-ink-3">Results are in</p>
      <p className="mt-1 font-display text-[22px] leading-tight text-ink">97 markers, explained</p>
      <ul className="mt-5 divide-y divide-line rounded-2xl border border-line bg-white px-3.5">
        {rows.map((r) => (
          <li key={r.k} className="py-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-semibold text-ink">{r.k}</span>
              <span className="text-[12px] font-semibold" style={{ color: r.c }}>{r.s}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="relative h-1.5 flex-1 rounded-full bg-[linear-gradient(90deg,#f3d6d3,#dcebe2_30%,#dcebe2_70%,#f3d6d3)]">
                <span className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full ring-2 ring-white" style={{ left: `${r.x}%`, background: r.c }} />
              </div>
              <span className="w-16 text-right font-mono text-[11px] text-ink-2">{r.v} {r.u}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] leading-relaxed text-ink-3">Tap any marker to see what it means and what to do next.</p>
    </div>
  );
}

function ScreenPlan() {
  const todo = [
    { t: "Vitamin D3, 5,000 IU", d: true },
    { t: "10-minute walk after lunch", d: true },
    { t: "Omega-3 with dinner", d: false },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-4 rounded-2xl bg-sand p-4">
        <ScoreRing value={78} size={72} stroke={6} delay={0}>
          <span className="font-display text-[24px] font-light">78</span>
        </ScoreRing>
        <div>
          <p className="text-[12px] text-ink-3">Zaro Score</p>
          <p className="text-[18px] font-semibold text-sage">Strong</p>
          <p className="font-mono text-[11px] text-ink-3">+4 since last panel</p>
        </div>
      </div>
      <p className="mt-5 text-[13px] font-semibold text-ink">Today</p>
      <ul className="mt-2 space-y-2">
        {todo.map((x) => (
          <li key={x.t} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3 text-[13px] text-ink">
            <span className={cn("grid size-5 place-items-center rounded-full border", x.d ? "border-teal bg-teal" : "border-line")}>
              {x.d && <Check className="size-3 text-white" strokeWidth={3} />}
            </span>
            <span className={x.d ? "text-ink-3 line-through" : ""}>{x.t}</span>
          </li>
        ))}
      </ul>
      <p className="mt-auto rounded-2xl bg-teal-mist p-3 text-[12px] leading-relaxed text-teal-night">
        Retest in 3–6 months to see your trend.
      </p>
    </div>
  );
}

const SCREENS = [ScreenChoose, ScreenDraw, ScreenResults, ScreenPlan];

function Phone({ active, className }: { active: number; className?: string }) {
  const Screen = SCREENS[active];
  return (
    <div className={cn("relative mx-auto w-[300px] md:w-[330px]", className)}>
      <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(6,148,148,0.18),transparent)] blur-2xl" />
      <div className="rounded-[52px] bg-ink p-[10px] shadow-[0_50px_100px_-30px_rgba(12,59,59,0.55)]">
        <div className="relative h-[600px] overflow-hidden rounded-[42px] bg-white md:h-[650px]">
          <div className="flex items-center justify-between px-7 pt-4 text-[12px] font-semibold text-ink">
            <span>9:41</span>
            <span className="h-6 w-24 rounded-full bg-ink" />
            <span className="font-mono text-[11px]">5G</span>
          </div>
          <div className="relative h-[calc(100%-44px)] px-5 pt-5 pb-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="h-full"
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease }}
              >
                <Screen />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: true,
          onUpdate: (self) => setActive(Math.min(3, Math.floor(self.progress * 4))),
        });
        gsap.fromTo(
          ".how-progress",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "+=240%", scrub: true } },
        );
        return () => st.kill();
      });
    },
    { scope: root },
  );

  return (
    <section id="how" className="relative bg-sand">
      {/* desktop: pinned story */}
      <div ref={root} className="relative hidden h-screen items-center lg:flex">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[1.1fr_1fr] items-center gap-16 px-8">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="display mt-5 text-[clamp(2.5rem,4.4vw,4rem)] text-ink">
              From order to answers <span className="accent">in about a week.</span>
            </h2>
            <div className="relative mt-12 pl-8">
              <div className="absolute top-2 bottom-2 left-[5px] w-px bg-line" />
              <div className="how-progress absolute top-2 bottom-2 left-[5px] w-px origin-top bg-teal" />
              <ol className="space-y-7">
                {STEPS.map((s, i) => (
                  <li key={s.n} className="relative">
                    <span
                      className={cn(
                        "absolute top-1.5 -left-8 size-[11px] rounded-full border-2 transition-colors duration-500",
                        i <= active ? "border-teal bg-teal" : "border-line bg-sand",
                      )}
                    />
                    <div className={cn("transition-opacity duration-500", i === active ? "opacity-100" : "opacity-40")}>
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-[24px] text-ink">{s.title}</h3>
                        <span className="font-mono text-[11px] tracking-wider text-teal uppercase">{s.note}</span>
                      </div>
                      <div
                        className={cn(
                          "grid transition-all duration-500 ease-out",
                          i === active ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <p className="max-w-md overflow-hidden text-[16px] leading-relaxed text-ink-2">{s.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <Phone active={active} />
        </div>
      </div>

      {/* mobile + tablet: stacked */}
      <div className="px-5 py-24 lg:hidden">
        <Reveal>
          <p className="eyebrow text-center">How it works</p>
          <h2 className="display mx-auto mt-5 max-w-xl text-center text-[clamp(2.25rem,8vw,3.25rem)] text-ink">
            From order to answers <span className="accent">in about a week.</span>
          </h2>
        </Reveal>
        <ol className="mx-auto mt-14 max-w-md space-y-16">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <Reveal>
                <p className="font-mono text-[11px] tracking-wider text-teal uppercase">
                  {s.n} · {s.note}
                </p>
                <h3 className="mt-2 font-display text-[26px] text-ink">{s.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{s.body}</p>
                <Phone active={i} className="mt-8 scale-[0.92]" />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
