"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Check } from "lucide-react";
import { LINKS, PANELS, SYSTEMS, type Panel } from "@/lib/content";
import { Reveal, SectionHeading } from "./reveal";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function PanelCard({ p, index }: { p: Panel; index: number }) {
  const featured = p.id === "signal";
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 140, damping: 18 });
  const sy = useSpring(ry, { stiffness: 140, damping: 18 });
  const rotateX = useTransform(sy, (v) => v * -5);
  const rotateY = useTransform(sx, (v) => v * 6);
  const glowX = useTransform(sx, (v) => `${50 + v * 40}%`);
  const glowY = useTransform(sy, (v) => `${50 + v * 40}%`);
  const glow = useTransform(
    [glowX, glowY] as never,
    ([x, y]: string[]) =>
      `radial-gradient(420px circle at ${x} ${y}, ${featured ? "rgba(255,255,255,0.16)" : "rgba(6,148,148,0.08)"}, transparent 60%)`,
  );

  return (
    <div className="panel-card h-full" style={{ perspective: 1200 }} data-index={index}>
      <motion.article
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          rx.set(((e.clientX - r.left) / r.width) * 2 - 1);
          ry.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-[32px] p-7 md:p-8",
          featured
            ? "bg-teal text-white shadow-[0_40px_80px_-30px_rgba(6,148,148,0.65)]"
            : "border border-line/70 bg-white text-ink shadow-[0_30px_60px_-40px_rgba(28,26,23,0.35)]",
        )}
      >
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />

        <div className="relative flex h-7 items-center justify-between" style={{ transform: "translateZ(30px)" }}>
          <div className="flex gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 w-6 rounded-full",
                  i <= index ? (featured ? "bg-white" : "bg-teal") : featured ? "bg-white/25" : "bg-line",
                )}
              />
            ))}
          </div>
          {p.badge && (
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[12px] font-semibold",
                featured ? "bg-white/15 text-white" : "bg-teal-mist text-teal-night",
              )}
            >
              {p.badge}
            </span>
          )}
        </div>

        <h3
          className={cn("relative mt-8 min-h-[2.3em] font-display text-[26px] leading-[1.15] font-light lg:min-h-[3.45em] xl:min-h-[2.3em] xl:text-[28px]", featured ? "text-white" : "text-ink")}
          style={{ transform: "translateZ(40px)" }}
        >
          {p.question}
        </h3>

        <div className="relative mt-6 flex items-end justify-between" style={{ transform: "translateZ(30px)" }}>
          <div>
            <p className="text-[18px] font-semibold">{p.name}</p>
            <p className={cn("font-mono text-[11px]", featured ? "text-white/70" : "text-ink-3")}>
              {p.values} markers · {p.systems} systems
            </p>
          </div>
          <div className="text-right">
            <p className="display text-[44px] leading-none">${p.price}</p>
            <p className={cn("mt-1 text-[12px]", featured ? "text-white/70" : "text-ink-3")}>
              <span className="line-through">${p.was}</span> · one-time
            </p>
          </div>
        </div>

        <p className={cn("relative mt-6 text-[15px] leading-relaxed", featured ? "text-white/85" : "text-ink-2")}>{p.summary}</p>

        <ul className="relative mt-6 space-y-2.5">
          {p.adds.map((a) => (
            <li key={a} className="flex gap-2.5 text-[14px] leading-snug">
              <Check className={cn("mt-0.5 size-4 shrink-0", featured ? "text-white" : "text-teal")} strokeWidth={2.5} />
              <span className={featured ? "text-white/90" : "text-ink"}>{a}</span>
            </li>
          ))}
        </ul>

        <p className={cn("relative mt-6 mb-7 border-t pt-4 text-[13px] leading-relaxed", featured ? "border-white/20 text-white/75" : "border-line text-ink-3")}>
          <span className={cn("font-semibold", featured ? "text-white" : "text-ink-2")}>Best if: </span>
          {p.forWho}
        </p>

        <a
          href={LINKS.getStarted}
          className={cn(
            "group relative mt-auto inline-flex h-13 items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-all duration-300",
            featured ? "bg-white text-teal-night hover:bg-teal-mist" : "bg-ink text-white hover:bg-teal-night",
          )}
          style={{ transform: "translateZ(24px)" }}
        >
          Get {p.name} for ${p.price}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </motion.article>
    </div>
  );
}

export function Panels() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".panel-card", {
          y: (i) => 120 + i * 60,
          rotateX: 18,
          opacity: 0,
          transformOrigin: "50% 100%",
          stagger: 0.12,
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: { trigger: ".panel-grid", start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="panels" className="relative bg-white py-28 md:py-44">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Panels"
          title="Three questions."
          accent="Pick how deep you go."
          body="Each panel includes everything in the one before it. Every panel is one blood draw, a one-time price, and FSA/HSA eligible."
        />

        <div className="panel-grid mt-16 grid gap-5 md:mt-20 lg:grid-cols-3" style={{ perspective: 1600 }}>
          {PANELS.map((p, i) => (
            <PanelCard key={p.id} p={p} index={i} />
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-center text-[14px] text-ink-2">
            <span className="font-semibold text-teal">Save $50 on every panel.</span> Intro pricing ends Nov 14, 2026.
          </p>
        </Reveal>

        {/* coverage matrix */}
        <Reveal className="mt-20">
          <div className="rounded-[28px] border border-line/70 bg-sand p-6 md:p-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">Body systems covered</p>
            <div className="mt-5 space-y-5 md:hidden">
              {PANELS.map((p, pi) => {
                const prev = pi === 0 ? 0 : PANELS[pi - 1].systems;
                return (
                  <div key={p.id}>
                    <p className="text-[15px] font-semibold text-ink">
                      {p.name} <span className="font-mono text-[11px] font-normal text-ink-3">· {p.systems} systems</span>
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {SYSTEMS.slice(0, p.systems).map((s, i) => (
                        <li
                          key={s}
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[12px] font-semibold",
                            i >= prev && pi > 0 ? "bg-teal text-white" : "bg-white text-ink-2",
                          )}
                        >
                          {i >= prev && pi > 0 ? `+ ${s}` : s}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <table className="mt-5 hidden w-full border-separate border-spacing-y-2 text-left md:table">
              <thead>
                <tr>
                  <th className="w-28" />
                  {SYSTEMS.map((s) => (
                    <th key={s} scope="col" className="px-1 pb-2 text-center text-[12px] font-semibold text-ink-2">
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PANELS.map((p) => (
                  <tr key={p.id}>
                    <th scope="row" className="pr-3 text-[15px] font-semibold text-ink">{p.name}</th>
                    {SYSTEMS.map((s, i) => {
                      const on = i < p.systems;
                      return (
                        <td key={s} className="text-center">
                          <span
                            className={cn(
                              "mx-auto grid size-7 place-items-center rounded-full",
                              on ? "bg-teal text-white" : "border border-dashed border-line",
                            )}
                            aria-label={on ? "Included" : "Not included"}
                          >
                            {on && <Check className="size-3.5" strokeWidth={3} />}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <a href={LINKS.ourTests} className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-teal hover:text-teal-deep">
              See every biomarker in each panel <ArrowRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
