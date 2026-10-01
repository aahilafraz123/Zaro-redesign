"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, BadgeCheck } from "lucide-react";
import BlurText from "@/components/BlurText";
import ScrollReveal from "@/components/ScrollReveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/site/reveal";
import { VideoEmbed } from "@/components/site/video-embed";
import { HORMONE_MAP, LINKS, RENA } from "@/lib/content";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

function PortraitStage() {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useSpring(rx, { stiffness: 60, damping: 18 });
  const my = useSpring(ry, { stiffness: 60, damping: 18 });
  const rotY = useTransform(mx, (v) => v * 5);
  const rotX = useTransform(my, (v) => v * -4);
  const l1x = useTransform(mx, (v) => v * 22);
  const l1y = useTransform(my, (v) => v * 16);
  const l2x = useTransform(mx, (v) => v * -26);
  const l2y = useTransform(my, (v) => v * -18);
  const l3x = useTransform(mx, (v) => v * 30);
  const l3y = useTransform(my, (v) => v * 20);

  return (
    <div
      className="relative mx-auto w-full max-w-[460px]"
      style={{ perspective: 1600 }}
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
    >
      <motion.div style={{ rotateY: rotY, rotateX: rotX, transformStyle: "preserve-3d" }} className="relative">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.3, ease }}
          className="relative aspect-[4/5] overflow-hidden rounded-[36px] bg-sage-soft shadow-[0_60px_120px_-40px_rgba(12,59,59,0.55)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={RENA.headshot}
            alt={`${RENA.name}, ${RENA.title}`}
            className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,59,59,0)_60%,rgba(12,59,59,0.35))]" />
        </motion.div>

        <motion.div style={{ x: l1x, y: l1y, translateZ: 80 }} className="absolute top-[8%] -left-2 sm:-left-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease }}
            className="glass flex items-center gap-2.5 rounded-full py-2.5 pr-4 pl-3"
          >
            <BadgeCheck className="size-5 text-teal" />
            <span className="text-[13px] font-semibold text-ink">Board-certified urologist</span>
          </motion.div>
        </motion.div>

        <motion.div style={{ x: l2x, y: l2y, translateZ: 110 }} className="absolute top-[38%] right-2 sm:-right-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease }}
            className="glass rounded-3xl px-5 py-4"
          >
            <p className="display text-[36px] leading-none text-ink">550M+</p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase">YouTube views</p>
          </motion.div>
        </motion.div>

        <motion.div style={{ x: l3x, y: l3y, translateZ: 140 }} className="absolute -bottom-6 left-4 sm:-left-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease }}
            className="glass w-[240px] rounded-3xl p-4"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[14px] font-semibold text-ink">Free testosterone</span>
              <span className="font-mono text-[10px] text-ink-3">sample</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-[linear-gradient(90deg,#f3d6d3,#dcebe2_30%,#dcebe2_70%,#f3d6d3)]">
              <span className="relative block h-full">
                <span className="absolute top-1/2 left-[46%] size-3 -translate-y-1/2 rounded-full bg-sage ring-2 ring-white" />
              </span>
            </div>
            <p className="mt-2.5 text-[12px] font-semibold text-teal">Measured in Signal</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function PartnerPage() {
  return (
    <main className="w-full max-w-full overflow-x-clip">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-10%] right-[-10%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(closest-side,rgba(143,180,160,0.28),transparent)]" />
          <div className="absolute bottom-[-20%] left-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(194,229,229,0.45),transparent)]" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              Partnership
            </motion.p>
            <h1 className="display mt-6 text-[clamp(2.75rem,6vw,5.25rem)] text-ink">
              <BlurText as="span" text="Zaro ×" delay={80} direction="bottom" />
              <BlurText as="span" text="Dr. Rena Malik" delay={80} direction="bottom" wordClassName="accent" />
            </h1>
            <motion.p
              className="mt-8 max-w-xl text-[18px] leading-relaxed text-ink-2 md:text-[19px]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease }}
            >
              One of the most-followed doctors on the internet is partnering with Zaro, so more people can see
              what’s really happening with their hormones, in their own blood, without a referral.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease }}
            >
              <a
                href="#hormones"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-teal px-8 text-[16px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(6,148,148,0.7)] transition-colors hover:bg-teal-deep"
              >
                See what Zaro measures
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a href="#videos" className="inline-flex h-14 items-center justify-center rounded-full px-7 text-[16px] font-semibold text-ink hover:bg-ink/[0.04]">
                Watch her guides
              </a>
            </motion.div>
          </div>
          <PortraitStage />
        </div>
      </section>

      {/* Reach */}
      <section className="border-y border-line/70 bg-sand">
        <div className="mx-auto grid max-w-6xl gap-px px-5 sm:grid-cols-3">
          {RENA.stats.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.08}>
              <div className="py-10 sm:px-6 sm:py-12">
                <p className="display text-[clamp(2.5rem,5vw,3.75rem)] leading-none text-ink">{s.k}</p>
                <p className="mt-2 text-[15px] text-ink-2">{s.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="flex overflow-hidden border-t border-line/70 py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10" style={{ ["--marquee-duration" as string]: "36s" }}>
            {[...RENA.heardOn, ...RENA.heardOn, ...RENA.heardOn, ...RENA.heardOn].map((n, i) => (
              <li key={i} aria-hidden={i >= RENA.heardOn.length} className="flex items-center gap-10 whitespace-nowrap">
                <span className="font-mono text-[11px] tracking-[0.2em] text-ink-3 uppercase">Heard on</span>
                <span className="font-display text-[22px] text-ink">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Statement */}
      <section className="bg-white py-28 md:py-40">
        <div className="mx-auto max-w-5xl px-5">
          <ScrollReveal
            baseOpacity={0.12}
            enableBlur
            baseRotation={2}
            blurStrength={6}
            containerClassName="!my-0"
            textClassName="display !font-light !text-[clamp(1.9rem,4.4vw,3.5rem)] !leading-[1.18] text-ink"
            rotationEnd="bottom 70%"
            wordAnimationEnd="bottom 55%"
          >
            Low energy, low drive, poor sleep, brain fog. They get waved off as stress or getting older. Many of the clues are measurable in a single blood draw.
          </ScrollReveal>
        </div>
      </section>

      {/* Hormone map */}
      <section id="hormones" className="scroll-mt-24 bg-sand py-28 md:py-40">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">What she talks about. What Zaro measures.</p>
              <h2 className="display mt-5 text-[clamp(2.25rem,4.6vw,4rem)] text-ink">
                From the symptom <span className="accent">to the number.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-2">
                The topics Dr. Malik covers for millions of viewers map to markers in Zaro’s panels. Sex-specific
                hormones are included in Signal and Source.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="For men" className="mt-12">
            <TabsList className="h-12 w-full max-w-sm rounded-full bg-white p-1">
              {Object.keys(HORMONE_MAP).map((k) => (
                <TabsTrigger
                  key={k}
                  value={k}
                  className="h-full flex-1 rounded-full text-[15px] font-semibold text-ink-2 data-[state=active]:bg-ink data-[state=active]:text-white"
                >
                  {k}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(HORMONE_MAP).map(([k, rows]) => (
              <TabsContent key={k} value={k} className="mt-6">
                <ul className="overflow-hidden rounded-[28px] border border-line/70 bg-white">
                  {rows.map((r, i) => (
                    <motion.li
                      key={r.signal}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                      transition={{ delay: i * 0.07, duration: 0.6, ease }}
                      className="grid items-center gap-3 border-line/70 p-6 not-last:border-b md:grid-cols-[1.1fr_auto_1.3fr_auto] md:gap-8 md:px-8"
                    >
                      <p className="font-display text-[20px] leading-snug text-ink">{r.signal}</p>
                      <ArrowRight className="hidden size-4 text-ink-3 md:block" />
                      <p className="text-[15px] text-ink-2">{r.markers}</p>
                      <span
                        className={cn(
                          "w-fit rounded-full px-3 py-1.5 text-[12px] font-semibold",
                          r.panel === "Surface" ? "bg-sand text-ink-2" : "bg-teal text-white",
                        )}
                      >
                        {r.panel}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
          <p className="mt-5 max-w-2xl text-[13px] leading-relaxed text-ink-3">
            Symptoms have many causes. Zaro shows you your numbers in plain language; talk to your doctor about
            what they mean for you.
          </p>
        </div>
      </section>

      {/* Videos */}
      <section id="videos" className="scroll-mt-24 bg-white py-28 md:py-40">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow">Watch</p>
              <h2 className="display mt-5 text-[clamp(2.25rem,4.6vw,4rem)] text-ink">
                Testosterone, <span className="accent">explained.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href={RENA.channels[0].href}
                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal hover:text-teal-deep"
              >
                More on her YouTube channel <ArrowUpRight className="size-4" />
              </a>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[RENA.videos[1], RENA.videos[0], RENA.videos[2]].map((v, i) => (
              <Reveal key={v.id} delay={i * 0.08}>
                <VideoEmbed id={v.id} title={v.title} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-sand py-28 md:py-40">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">About Dr. Malik</p>
            <h2 className="display mt-5 text-[clamp(2.25rem,4.2vw,3.5rem)] text-ink">
              A surgeon who <span className="accent">talks like a person.</span>
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-2">
              Dr. Rena Malik is a board-certified urologist and pelvic surgeon specializing in sexual medicine,
              hormones and bladder health. She is known for evidence-based, straight-talking education on
              topics most people are too embarrassed to ask their doctor about.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {RENA.channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    {c.label} <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="overflow-hidden rounded-[28px] border border-line/70 bg-white">
              {RENA.training.map((t) => (
                <div key={t.k} className="grid gap-1 border-line/70 p-6 not-last:border-b sm:grid-cols-[180px_1fr] md:px-8">
                  <dt className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase sm:pt-1">{t.k}</dt>
                  <dd className="text-[16px] font-semibold text-ink">{t.v}</dd>
                </div>
              ))}
              <div className="grid gap-1 p-6 sm:grid-cols-[180px_1fr] md:px-8">
                <dt className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase sm:pt-1">Recognition</dt>
                <dd className="space-y-1 text-[16px] font-semibold text-ink">
                  {RENA.honors.map((h) => (
                    <p key={h}>{h}</p>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-teal-night py-28 text-white md:py-40">
        <div aria-hidden className="absolute top-[-30%] left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(6,148,148,0.45),transparent)]" />
        <Reveal className="relative mx-auto max-w-4xl px-5 text-center">
          <h2 className="display text-[clamp(2.5rem,6vw,5rem)]">
            Start with <span className="italic text-teal-soft">your hormones.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[18px] leading-relaxed text-white/80">
            Signal includes sex-specific hormones, morning cortisol, free T3 and T4, plus everything in Surface.
            One draw at Quest, results in 5–7 days.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={LINKS.getStarted}
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-[16px] font-semibold text-teal-night transition-colors hover:bg-teal-mist"
            >
              Get Signal for $249
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <Link href="/#panels" className="inline-flex h-14 items-center rounded-full px-7 text-[16px] font-semibold text-white hover:bg-white/10">
              Compare panels
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
