"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Watch } from "lucide-react";
import CountUp from "@/components/CountUp";
import { ScoreRing } from "./score-ring";
import { Reveal, SectionHeading } from "./reveal";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const BANDS = [
  { name: "Critical", range: "<40", from: 0, to: 40, c: "#e08b84" },
  { name: "At-Risk", range: "40–59", from: 40, to: 60, c: "#e9b08a" },
  { name: "Moderate", range: "60–74", from: 60, to: 75, c: "#d9c38a" },
  { name: "Strong", range: "75–89", from: 75, to: 90, c: "#8fb4a0" },
  { name: "Optimal", range: "90–100", from: 90, to: 100, c: "#5c8c6e" },
];

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <Reveal className={cn("col-span-12", className)}>
      <div className="card-soft group relative h-full overflow-hidden rounded-[28px] p-6 transition-transform duration-700 ease-out hover:-translate-y-1 md:p-8">
        {children}
      </div>
    </Reveal>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">{children}</p>;
}

function Trend() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const pts = [62, 67, 72, 75, 78];
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  const W = 640, H = 200, pad = 24;
  const x = (i: number) => pad + (i * (W - pad * 2)) / (pts.length - 1);
  const y = (v: number) => H - pad - ((v - 55) / 30) * (H - pad * 2);
  const line = pts.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  const area = `${line} L${x(pts.length - 1)},${H - pad} L${x(0)},${H - pad} Z`;
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H + 24}`} className="mt-6 w-full" role="img" aria-label="Sample score trend from 62 in January to 78 in May">
      <defs>
        <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#069494" stopOpacity="0.22" />
          <stop offset="1" stopColor="#069494" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[60, 70, 80].map((g) => (
        <line key={g} x1={pad} x2={W - pad} y1={y(g)} y2={y(g)} stroke="#e0ddd8" strokeDasharray="3 5" />
      ))}
      <motion.path d={area} fill="url(#trendFill)" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : undefined} transition={{ duration: 1.2, delay: 0.8 }} />
      <motion.path
        d={line}
        fill="none"
        stroke="#069494"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.6, ease }}
      />
      {pts.map((v, i) => (
        <motion.g key={i} initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 0.3 + i * 0.25, duration: 0.5 }}>
          <circle cx={x(i)} cy={y(v)} r="5" fill="#fff" stroke="#069494" strokeWidth="2.5" />
          <text x={x(i)} y={y(v) - 14} textAnchor="middle" className="fill-ink font-mono text-[13px]">{v}</text>
          <text x={x(i)} y={H + 16} textAnchor="middle" className="fill-ink-3 font-mono text-[12px]">{months[i]}</text>
        </motion.g>
      ))}
    </svg>
  );
}

function Bar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">{label}</span>
        <span className="font-display text-[22px] text-ink">{value}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/[0.06]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : undefined}
          transition={{ duration: 1.4, delay, ease }}
        />
      </div>
    </div>
  );
}

export function ScoreBento() {
  return (
    <section id="score" className="relative bg-white py-28 md:py-44">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="The Zaro Score"
          title="One number for"
          accent="your whole health story."
          body="Zaro turns your bloodwork, your wearable and a quick weekly check-in into a score from 0 to 100. It tells you where you stand today, how you compare with people your age, and whether you’re getting better."
        />

        <div className="mt-16 grid grid-flow-dense grid-cols-12 gap-4 md:mt-24 md:gap-5">
          {/* A: score, 7 cols x 2 rows */}
          <Card className="md:col-span-7 md:row-span-2">
            <Label>Your score</Label>
            <div className="mt-6 flex flex-col items-center gap-8 md:mt-10">
              <ScoreRing value={78} size={220} stroke={12} color="#069494">
                <div>
                  <p className="display text-[72px] leading-none text-ink">
                    <CountUp to={78} duration={1.6} />
                  </p>
                  <p className="mt-1 font-mono text-[12px] text-ink-3">/ 100</p>
                  <p className="mt-1 text-[16px] font-semibold text-sage">Strong</p>
                </div>
              </ScoreRing>

              <div className="w-full">
                <div className="relative flex h-2.5 gap-1">
                  {BANDS.map((b) => (
                    <div key={b.name} className="h-full rounded-full" style={{ width: `${b.to - b.from}%`, background: b.c, opacity: b.name === "Strong" ? 1 : 0.45 }} />
                  ))}
                  <motion.span
                    className="absolute -top-1.5 size-5 -translate-x-1/2 rounded-full border-[3px] border-white bg-teal shadow-md"
                    initial={{ left: "0%" }}
                    whileInView={{ left: "78%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, delay: 0.3, ease }}
                  />
                </div>
                <div className="mt-3 grid grid-cols-5 text-center">
                  {BANDS.map((b) => (
                    <div key={b.name}>
                      <p className={cn("text-[12px] font-semibold", b.name === "Strong" ? "text-ink" : "text-ink-3")}>{b.name}</p>
                      <p className="font-mono text-[10px] text-ink-3">{b.range}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-teal/20 bg-teal-mist/70 px-4 py-3.5">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.14em] text-teal-night/70 uppercase">Biggest lever right now</p>
                  <p className="mt-0.5 text-[15px] font-semibold text-teal-night">Bring vitamin D into range</p>
                </div>
                <span className="shrink-0 rounded-full bg-teal px-3 py-1.5 font-mono text-[12px] font-medium text-white">+4 pts</span>
              </div>

              <div className="grid w-full grid-cols-3 gap-2 text-center">
                {[
                  { k: "Bloodwork", v: "Clinical foundation" },
                  { k: "Wearable", v: "Daily performance" },
                  { k: "Check-ins", v: "Lifestyle" },
                ].map((p) => (
                  <div key={p.k} className="rounded-2xl bg-white/80 px-2 py-3">
                    <p className="text-[13px] font-semibold text-ink">{p.k}</p>
                    <p className="text-[11px] text-ink-3">{p.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* B: ages, 5 cols */}
          <Card className="md:col-span-5">
            <div className="flex items-start justify-between">
              <Label>Two ages, one clock</Label>
              <span className="rounded-full bg-teal-mist px-2.5 py-1 font-mono text-[10px] text-teal-night">With Source</span>
            </div>
            <p className="mt-3 text-[15px] text-ink-2">
              Your birthday says <span className="font-semibold text-ink">38</span>. Your blood says:
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center">
                <ScoreRing value={33} max={38} size={104} stroke={7} color="#5c8c6e">
                  <span className="display text-[34px] text-ink">33</span>
                </ScoreRing>
                <p className="mt-3 text-[14px] font-semibold text-ink">Biological age</p>
                <p className="font-mono text-[11px] text-sage">5 yrs younger</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ScoreRing value={38} max={41} size={104} stroke={7} color="#e08b84" delay={0.4}>
                  <span className="display text-[34px] text-ink">41</span>
                </ScoreRing>
                <p className="mt-3 text-[14px] font-semibold text-ink">Heart age</p>
                <p className="font-mono text-[11px] text-coral">3 yrs older</p>
              </div>
            </div>
          </Card>

          {/* C: percentile, 5 cols */}
          <Card className="md:col-span-5">
            <Label>How you compare</Label>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="display text-[64px] leading-none text-ink">
                <CountUp to={72} duration={1.4} />
                <span className="text-[32px]">nd</span>
              </span>
              <span className="font-mono text-[11px] tracking-wider text-ink-3 uppercase">percentile</span>
            </p>
            <p className="mt-2 text-[15px] text-ink-2">Healthier than 72% of people aged 35–40.</p>
            <div className="mt-6 space-y-4">
              <Bar label="Age group average" value={61} color="#c8c5c0" delay={0.2} />
              <Bar label="You" value={78} color="#069494" delay={0.4} />
            </div>
          </Card>

          {/* D: trend, 8 cols */}
          <Card className="md:col-span-8">
            <div className="flex items-start justify-between">
              <div>
                <Label>Score over time</Label>
                <p className="mt-2 font-display text-[24px] text-ink">You can watch it move.</p>
              </div>
              <span className="rounded-full bg-sage/10 px-3 py-1.5 font-mono text-[11px] text-sage">+16 pts in 5 months</span>
            </div>
            <Trend />
          </Card>

          {/* E: wearables, 4 cols */}
          <Card className="md:col-span-4">
            <div className="flex items-center gap-2">
              <Watch className="size-4 text-sage" />
              <Label>Wearable signals</Label>
            </div>
            <p className="mt-2 flex items-center gap-2 text-[14px] text-ink-2">
              Synced from Apple Health
              <span className="relative inline-block size-1.5 rounded-full bg-sage text-sage pulse-dot" />
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {[
                { k: "VO2 max", v: 44, u: "" },
                { k: "HRV", v: 58, u: "ms" },
                { k: "Sleep", v: 7.4, u: "h" },
                { k: "Steps", v: 9412, u: "", sep: "," },
              ].map((m) => (
                <div key={m.k} className="rounded-2xl bg-white p-3.5">
                  <p className="font-mono text-[10px] tracking-wider text-ink-3 uppercase">{m.k}</p>
                  <p className="mt-1 font-display text-[24px] text-ink">
                    <CountUp to={m.v} duration={1.4} separator={m.sep} />
                    {m.u && <span className="ml-1 text-[12px] text-ink-3">{m.u}</span>}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[10px] tracking-wider text-ink-3 uppercase">Sleep, last 7 nights</p>
                <p className="font-mono text-[10px] text-sage">+38 min</p>
              </div>
              <div className="mt-3 flex h-16 items-end gap-1.5">
                {[6.2, 6.8, 6.5, 7.1, 7.6, 7.9, 7.4].map((h, i) => (
                  <motion.span
                    key={i}
                    className={cn("flex-1 rounded-md", i === 6 ? "bg-teal" : "bg-sage-soft/60")}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${((h - 5) / 3) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.06, ease }}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        <p className="mt-8 text-center font-mono text-[11px] tracking-[0.12em] text-ink-3 uppercase">
          Sample output. No wearable? Your score adapts to the data you have.
        </p>
      </div>
    </section>
  );
}
