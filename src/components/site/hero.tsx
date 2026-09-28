"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Check } from "lucide-react";
import BlurText from "@/components/BlurText";
import { ScoreRing } from "./score-ring";
import { LINKS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ease = [0.16, 1, 0.3, 1] as const;

function Layer({
  mx,
  my,
  depth,
  className,
  children,
  delay = 0,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const x = useTransform(mx, (v) => v * depth * 18);
  const y = useTransform(my, (v) => v * depth * 14);
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ x, y, translateZ: depth * 60 }}
      data-depth={depth}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.9 + delay, ease }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });
  const tiltY = useTransform(mx, (v) => v * 4);
  const tiltX = useTransform(my, (v) => v * -3);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
    rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".hero-scene",
          { rotateX: 26, scale: 0.86, y: 0 },
          {
            rotateX: 0,
            scale: 1,
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: stage.current,
              start: "top 92%",
              end: "top 12%",
              scrub: 0.6,
            },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          const speed = Number(el.dataset.speed ?? 1);
          gsap.to(el, {
            yPercent: -40 * speed,
            ease: "none",
            scrollTrigger: { trigger: stage.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
        gsap.to(".hero-copy", {
          opacity: 0,
          y: -60,
          filter: "blur(6px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "40% top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative overflow-hidden bg-white pt-36 pb-24 md:pt-44 md:pb-36">
      {/* ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 h-[900px] w-[1400px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(194,229,229,0.55),rgba(235,249,249,0.3)_45%,transparent_75%)]" />
        <div className="absolute top-[45%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(143,180,160,0.18),transparent)]" />
      </div>

      <div className="hero-copy relative mx-auto max-w-6xl px-5 text-center">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          For a long, healthy life
        </motion.p>

        <h1 className="display mx-auto mt-6 max-w-6xl text-[clamp(2.6rem,6.2vw,5.6rem)] text-ink">
          <BlurText
            as="span"
            text="Know what’s happening"
            delay={70}
            animateBy="words"
            direction="bottom"
            className="justify-center"
            stepDuration={0.4}
          />
          <BlurText
            as="span"
            text="inside your body."
            delay={70}
            animateBy="words"
            direction="bottom"
            className="justify-center"
            wordClassName="accent"
            stepDuration={0.4}
          />
        </h1>

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-[18px] leading-relaxed text-ink-2 md:text-[20px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
        >
          One blood draw. Over 100 lab markers. A single score that shows where you stand, and a
          daily plan that helps you move it.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
        >
          <a
            href="#panels"
            className="group inline-flex h-14 items-center gap-2 rounded-full bg-teal px-8 text-[16px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(6,148,148,0.7)] transition-all duration-300 hover:bg-teal-deep hover:shadow-[0_16px_36px_-10px_rgba(6,148,148,0.8)]"
          >
            Find your panel
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#how"
            className="inline-flex h-14 items-center rounded-full px-7 text-[16px] font-semibold text-ink transition-colors hover:bg-ink/[0.04]"
          >
            See how it works
          </a>
        </motion.div>

        <motion.ul
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-ink-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {["FSA/HSA eligible", "No doctor visit", "Results in 5–7 days"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Check className="size-3.5 text-teal" strokeWidth={2.5} />
              {t}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* 3D layered stage */}
      <div
        ref={stage}
        className="relative mx-auto mt-16 max-w-6xl px-5 md:mt-24"
        style={{ perspective: "1800px" }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div
          className="hero-scene relative mx-auto aspect-[4/5] w-full max-w-5xl sm:aspect-[16/10]"
          style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100%" }}
        >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", rotateY: tiltY, rotateX: tiltX }}
        >
          {/* base plate: the brand face film */}
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-[28px] bg-[#dfe8f5] shadow-[0_60px_120px_-40px_rgba(12,59,59,0.45),0_0_0_1px_rgba(255,255,255,0.7)_inset] md:rounded-[40px]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease }}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
              src={LINKS.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_55%,rgba(12,59,59,0.18))]" />
            <div className="grain absolute inset-0" />
          </motion.div>

          {/* floating layers */}
          <Layer mx={mx} my={my} depth={1.4} delay={0} className="top-[6%] left-[-2%] md:left-[-6%]">
            <div className="glass w-[168px] rounded-3xl p-4 md:w-[230px] md:p-5" data-speed="1.2">
              <p className="font-mono text-[10px] tracking-[0.18em] text-ink-3 uppercase">Zaro Score</p>
              <div className="mt-3 flex items-center gap-3 md:gap-4">
                <ScoreRing value={78} size={64} stroke={6} delay={1.2}>
                  <span className="font-display text-[22px] font-light text-ink">78</span>
                </ScoreRing>
                <div>
                  <p className="text-[15px] font-semibold text-sage md:text-[17px]">Strong</p>
                  <p className="mt-0.5 font-mono text-[10px] text-ink-3 md:text-[11px]">+16 pts in 5 mo</p>
                </div>
              </div>
            </div>
          </Layer>

          <Layer mx={mx} my={my} depth={1.9} delay={0.15} className="top-[10%] right-[-2%] hidden sm:block md:right-[-7%]">
            <div className="glass w-[250px] rounded-3xl p-5" data-speed="1.6">
              <p className="font-mono text-[10px] tracking-[0.18em] text-ink-3 uppercase">Latest results</p>
              <ul className="mt-3 space-y-3">
                {[
                  { k: "ApoB", v: "82 mg/dL", s: "Optimal", c: "bg-sage", w: "38%" },
                  { k: "Vitamin D", v: "24 ng/mL", s: "Low", c: "bg-coral", w: "22%" },
                  { k: "Fasting insulin", v: "9.1 µIU/mL", s: "Watch", c: "bg-[#d9a55b]", w: "58%" },
                ].map((m) => (
                  <li key={m.k}>
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className="font-semibold text-ink">{m.k}</span>
                      <span className="font-mono text-[11px] text-ink-2">{m.v}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="relative h-1.5 flex-1 rounded-full bg-ink/[0.07]">
                        <span className={`absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full ring-2 ring-white ${m.c}`} style={{ left: m.w }} />
                      </div>
                      <span className="w-12 text-right text-[11px] font-semibold text-ink-2">{m.s}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Layer>

          <Layer mx={mx} my={my} depth={2.3} delay={0.3} className="bottom-[7%] left-[3%] md:bottom-[9%] md:left-[-4%]">
            <div className="glass w-[250px] rounded-3xl p-4 md:w-[290px]" data-speed="2">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                  <span className="relative inline-block size-2 rounded-full bg-teal text-teal pulse-dot" />
                  Zaro
                </p>
                <span className="font-mono text-[10px] text-ink-3">8:00 AM</span>
              </div>
              <p className="mt-2 text-[14px] leading-snug text-ink-2">
                Good morning. Time for your omega-3. Did you take it with breakfast?
              </p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full bg-teal px-3.5 py-1.5 text-[12px] font-semibold text-white">Yes, done</span>
                <span className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[12px] font-semibold text-ink-2">Not yet</span>
              </div>
            </div>
          </Layer>

          <Layer mx={mx} my={my} depth={1.6} delay={0.45} className="right-[3%] bottom-[12%] hidden sm:block md:right-[-3%]">
            <div className="glass w-[180px] rounded-3xl p-4 md:w-[210px] md:p-5" data-speed="1.3">
              <p className="font-mono text-[10px] tracking-[0.18em] text-ink-3 uppercase">Biological age</p>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-[40px] leading-none font-light text-ink">33</span>
                <span className="text-[13px] text-ink-3">vs. 38</span>
              </p>
              <p className="mt-2 font-mono text-[11px] font-medium text-sage">5 years younger</p>
            </div>
          </Layer>
        </motion.div>
        </div>
        <p className="mt-6 text-center font-mono text-[11px] tracking-[0.12em] text-ink-3 uppercase">
          Sample results. Yours reflect your own blood.
        </p>
      </div>
    </section>
  );
}
