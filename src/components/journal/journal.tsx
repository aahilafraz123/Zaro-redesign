"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import BlurText from "@/components/BlurText";
import { PostCover } from "@/components/site/post-cover";
import { VideoEmbed } from "@/components/site/video-embed";
import { Reveal } from "@/components/site/reveal";
import { LINKS, POSTS, RENA, SOCIAL, postUrl, type Post, type Topic } from "@/lib/content";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const TOPICS: ("All" | Topic)[] = ["All", "Testing basics", "Heart", "Cost & FSA/HSA", "Inside Zaro"];

const fmt = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

function MeasuredIn({ panel, dark = false }: { panel: Post["measuredIn"]; dark?: boolean }) {
  if (!panel) return null;
  return (
    <Link
      href="/#panels"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors",
        dark ? "bg-white/15 text-white hover:bg-white/25" : "bg-teal-mist text-teal-night hover:bg-teal-soft",
      )}
    >
      Measured in {panel}
      <ArrowRight className="size-3" />
    </Link>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, ease }}
      className="group relative flex flex-col overflow-hidden rounded-[28px] border border-line/70 bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_rgba(12,59,59,0.45)]"
    >
      <a href={postUrl(post.slug)} className="block overflow-hidden" tabIndex={-1} aria-hidden>
        <PostCover post={post} className="aspect-[16/10]" />
      </a>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="font-mono text-[11px] tracking-wider text-ink-3 uppercase">{fmt(post.date)}</p>
        <h3 className="mt-3 font-display text-[22px] leading-snug text-ink">
          <a href={postUrl(post.slug)} className="after:absolute after:inset-0 hover:text-teal-night">
            {post.title}
          </a>
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{post.excerpt}</p>
        <div className="relative z-10 mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <MeasuredIn panel={post.measuredIn} />
          <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-teal">
            Read <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function Journal() {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("All");
  const [featured, ...rest] = POSTS;
  const list = topic === "All" ? rest : POSTS.filter((p) => p.topic === topic);

  return (
    <main className="w-full max-w-full overflow-x-clip">
      {/* Masthead */}
      <section className="relative overflow-hidden bg-white pt-36 pb-16 md:pt-44 md:pb-20">
        <div aria-hidden className="pointer-events-none absolute top-[-30%] left-1/2 h-[700px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(194,229,229,0.5),transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl px-5">
          <p className="eyebrow">The Zaro Journal</p>
          <h1 className="display mt-6 max-w-5xl text-[clamp(2.75rem,6.4vw,5.5rem)] text-ink">
            <BlurText as="span" text="Learn to read" delay={70} direction="bottom" />
            <BlurText as="span" text="your own biology." delay={70} direction="bottom" wordClassName="accent" />
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-ink-2">
              Practical, science-grounded guides on blood testing, biomarkers, and how to actually use your
              results.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <article className="group relative grid overflow-hidden rounded-[32px] bg-teal-night text-white lg:grid-cols-[1.1fr_1fr]">
              <PostCover post={featured} size="lg" className="min-h-[300px] lg:min-h-[460px]" />
              <div className="flex flex-col p-7 md:p-10">
                <p className="font-mono text-[11px] tracking-[0.16em] text-teal-soft uppercase">
                  Latest · {fmt(featured.date)}
                </p>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.12] font-light">
                  <a href={postUrl(featured.slug)} className="after:absolute after:inset-0">
                    {featured.title}
                  </a>
                </h2>
                <p className="mt-5 text-[16px] leading-relaxed text-white/80">{featured.excerpt}</p>
                <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-8">
                  <span className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-teal-night transition-colors group-hover:bg-teal-mist">
                    Read the article <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Library */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-ink">
                Every guide, <span className="accent">by topic.</span>
              </h2>
            </Reveal>
            <div role="tablist" aria-label="Filter by topic" className="flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={topic === t}
                  onClick={() => setTopic(t)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[14px] font-semibold transition-colors",
                    topic === t ? "text-white" : "bg-white text-ink-2 hover:text-ink",
                  )}
                >
                  {topic === t && (
                    <motion.span layoutId="topic-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.4, ease }} />
                  )}
                  <span className="relative">{t}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className={cn(
              "mt-12 grid gap-5",
              list.length === 1 && "max-w-xl",
              (list.length === 2 || list.length === 4) && "md:grid-cols-2",
              list.length !== 1 && list.length !== 2 && list.length !== 4 && "md:grid-cols-2 lg:grid-cols-3",
            )}
          >
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && <p className="mt-12 text-ink-2">No guides in this topic yet.</p>}
        </div>
      </section>

      {/* Watch */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow">Watch</p>
              <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] text-ink">
                Hormones, explained <span className="accent">by a urologist.</span>
              </h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-2">
                Zaro partners with {RENA.name}, one of the most-followed doctors on YouTube.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/dr-rena-malik"
                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal hover:text-teal-deep"
              >
                Meet {RENA.name} <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {RENA.videos.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.08}>
                <VideoEmbed id={v.id} title={v.title} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="bg-teal-mist py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-ink">
              Compare notes <span className="accent">with people who test.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-2">
              Ask questions, share what moved your score, and see what others are learning about their own
              blood.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group flex items-center justify-between rounded-2xl bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-28px_rgba(12,59,59,0.5)]"
                  >
                    <span>
                      <span className="block text-[16px] font-semibold text-ink">{s.label}</span>
                      <span className="block font-mono text-[12px] text-ink-3">{s.handle}</span>
                    </span>
                    <ArrowUpRight className="size-5 text-teal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24 text-center md:py-32">
        <Reveal className="mx-auto max-w-3xl px-5">
          <h2 className="display text-[clamp(2.25rem,5vw,4rem)] text-ink">
            Reading is step one. <span className="accent">Testing is step two.</span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#panels"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-teal px-8 text-[16px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(6,148,148,0.7)] transition-colors hover:bg-teal-deep"
            >
              Find your panel <ArrowRight className="size-4" />
            </Link>
            <a href={LINKS.getStarted} className="inline-flex h-14 items-center rounded-full px-7 text-[16px] font-semibold text-ink hover:bg-ink/[0.04]">
              See pricing
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
