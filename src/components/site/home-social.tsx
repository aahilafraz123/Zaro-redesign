"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { POSTS, RENA, postUrl } from "@/lib/content";
import { PostCover } from "./post-cover";
import { Reveal } from "./reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function PartnerBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".partner-photo",
          { scale: 1.18, yPercent: -6 },
          {
            scale: 1,
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Link
            href="/dr-rena-malik"
            className="group grid overflow-hidden rounded-[36px] bg-teal-night text-white md:grid-cols-[0.85fr_1.15fr]"
          >
            <div className="relative min-h-[360px] overflow-hidden bg-teal-night md:min-h-[480px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={RENA.headshot}
                alt={`${RENA.name}, ${RENA.title}`}
                loading="lazy"
                className="partner-photo absolute inset-y-0 left-0 h-full w-[calc(100%+2px)] max-w-none object-cover object-[50%_22%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,59,59,0)_60%,rgba(12,59,59,0.6))] max-md:bg-[linear-gradient(180deg,rgba(12,59,59,0)_55%,rgba(12,59,59,0.85))]" />
            </div>
            <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <div aria-hidden className="absolute -top-24 -right-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(6,148,148,0.5),transparent)]" />
              <p className="relative font-mono text-[11px] tracking-[0.2em] text-teal-soft uppercase">New partnership</p>
              <h2 className="display relative mt-5 text-[clamp(2.25rem,4.4vw,3.75rem)]">
                Zaro × <span className="italic text-teal-soft">Dr. Rena Malik</span>
              </h2>
              <p className="relative mt-5 max-w-md text-[17px] leading-relaxed text-white/80">
                The board-certified urologist behind 550M+ YouTube views is partnering with Zaro to make hormone
                and men’s health testing simple to understand.
              </p>
              <ul className="relative mt-8 flex flex-wrap gap-x-8 gap-y-4">
                {RENA.stats.slice(0, 2).map((s) => (
                  <li key={s.k}>
                    <p className="display text-[32px] leading-none">{s.k}</p>
                    <p className="mt-1 text-[13px] text-white/60">{s.v}</p>
                  </li>
                ))}
              </ul>
              <span className="relative mt-10 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-teal-night transition-colors group-hover:bg-teal-mist">
                Meet Dr. Malik
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function JournalTeaser() {
  const posts = POSTS.slice(0, 3);
  return (
    <section className="bg-white py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow">From the journal</p>
            <h2 className="display mt-5 text-[clamp(2.25rem,4.6vw,4rem)] text-ink">
              Learn before <span className="accent">you test.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal hover:text-teal-deep">
              Read the journal <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <a
                href={postUrl(p.slug)}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-line/70 bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_rgba(12,59,59,0.45)]"
              >
                <PostCover post={p} className="aspect-[16/11]" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[20px] leading-snug text-ink group-hover:text-teal-night">{p.title}</h3>
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-teal">
                    Read <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
