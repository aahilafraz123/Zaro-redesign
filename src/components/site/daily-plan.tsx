"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RECOMMENDATIONS } from "@/lib/content";
import { Reveal, SectionHeading } from "./reveal";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type Node = {
  msg: string;
  time: string;
  options?: { label: string; next: string; primary?: boolean }[];
  outcome?: string;
};

const FLOW: Record<string, Node> = {
  start: {
    time: "8:00 AM",
    msg: "Good morning. Time for your omega-3. Did you take it with breakfast?",
    options: [
      { label: "Yes, done", next: "done", primary: true },
      { label: "Not yet", next: "why" },
    ],
  },
  why: {
    time: "8:01 AM",
    msg: "No problem. What got in the way today?",
    options: [
      { label: "I forgot", next: "forgot" },
      { label: "I ran out", next: "ranout" },
      { label: "Upset stomach", next: "stomach" },
    ],
  },
  done: {
    time: "8:01 AM",
    msg: "Nice. That’s 12 days in a row. Your omega-3 index gets rechecked on your next Source panel.",
    outcome: "Habit logged",
  },
  forgot: {
    time: "8:02 AM",
    msg: "Got it. I’ll move this reminder to 8:30, right after you usually finish breakfast.",
    outcome: "Blocker found: timing",
  },
  ranout: {
    time: "8:02 AM",
    msg: "Here’s the exact dose to look for: 2g combined EPA/DHA. Want a reminder when you’re back from the store?",
    outcome: "Blocker found: supply",
  },
  stomach: {
    time: "8:02 AM",
    msg: "Try taking it with your largest meal instead. If it keeps happening, we’ll flag it for your next review.",
    outcome: "Blocker found: tolerance",
  },
};

function Conversation() {
  const [path, setPath] = useState<string[]>(["start"]);
  const current = FLOW[path[path.length - 1]];

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {path.map((id, i) => {
            const n = FLOW[id];
            const answer = path[i + 1]
              ? n.options?.find((o) => o.next === path[i + 1])?.label
              : undefined;
            return (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                className="space-y-2"
              >
                <div className="rounded-2xl rounded-tl-md bg-white p-4 shadow-[0_8px_24px_-16px_rgba(28,26,23,0.3)]">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                      <span className="size-2 rounded-full bg-teal" /> Zaro
                    </p>
                    <span className="font-mono text-[10px] text-ink-3">{n.time}</span>
                  </div>
                  <p className="mt-1.5 text-[15px] leading-snug text-ink-2">{n.msg}</p>
                  {n.outcome && (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-teal-mist px-2.5 py-1 font-mono text-[10px] tracking-wider text-teal-night uppercase">
                      {n.outcome}
                    </p>
                  )}
                </div>
                {answer && (
                  <div className="flex justify-end">
                    <span className="rounded-2xl rounded-tr-md bg-teal px-4 py-2 text-[14px] font-semibold text-white">{answer}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-4 min-h-[44px]">
        {current.options ? (
          <div className="flex flex-wrap gap-2">
            {current.options.map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => setPath((p) => [...p, o.next])}
                className={cn(
                  "rounded-full px-4 py-2.5 text-[14px] font-semibold transition-all duration-300 active:scale-[0.97]",
                  o.primary ? "bg-teal text-white hover:bg-teal-deep" : "border border-line bg-white text-ink hover:border-ink/30",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPath(["start"])}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-ink/30"
          >
            <RotateCcw className="size-3.5" /> Try another answer
          </button>
        )}
      </div>
      <p className="mt-auto pt-6 font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">
        Tap an answer to see how Zaro adapts
      </p>
    </div>
  );
}

const LOOP = ["Test", "Understand", "Act daily", "Improve", "Retest"];

export function DailyPlan() {
  return (
    <section className="relative overflow-hidden bg-sand py-28 md:py-44">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Your daily plan"
          title="Most tests hand you a report."
          accent="Zaro follows up."
          body="Every recommendation is tied to a specific marker in your blood. Then Zaro checks in, and when something gets skipped, it asks why and adjusts until the habit sticks."
        />

        <div className="mt-16 grid items-start gap-5 md:mt-24 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[28px] border border-line/70 bg-white p-6 md:p-8">
              <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">Built from your markers</p>
              <h3 className="mt-3 font-display text-[28px] leading-tight text-ink">
                Advice that points to a number, <span className="accent">not a trend piece.</span>
              </h3>
              <Tabs defaultValue="Supplements" className="mt-6">
                <TabsList className="h-11 w-full rounded-full bg-sand p-1">
                  {Object.keys(RECOMMENDATIONS).map((k) => (
                    <TabsTrigger
                      key={k}
                      value={k}
                      className="h-full flex-1 rounded-full text-[14px] font-semibold text-ink-2 data-[state=active]:bg-white data-[state=active]:text-ink data-[state=active]:shadow-sm"
                    >
                      {k}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {Object.entries(RECOMMENDATIONS).map(([k, items]) => (
                  <TabsContent key={k} value={k} className="mt-4">
                    <ul className="space-y-2.5">
                      {items.map((it, i) => (
                        <motion.li
                          key={it.title}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.5, ease }}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-line/70 bg-sand/60 p-4"
                        >
                          <span className="text-[15px] font-semibold text-ink">{it.title}</span>
                          <span
                            className={cn(
                              "shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wide",
                              it.tone === "coral" ? "bg-coral/15 text-[#b4574f]" : "bg-sage/15 text-sage",
                            )}
                          >
                            {it.marker}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </TabsContent>
                ))}
              </Tabs>
              <p className="mt-5 text-[13px] text-ink-3">Updated after every panel, ranked by impact.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-[28px] bg-teal-night p-6 text-white md:p-8">
              <p className="font-mono text-[11px] tracking-[0.16em] text-teal-soft uppercase">Try it</p>
              <h3 className="mt-3 font-display text-[28px] leading-tight">
                Reminders that ask why, <span className="italic text-teal-soft">not just when.</span>
              </h3>
              <div className="mt-6 flex-1 rounded-3xl bg-[#e9efee] p-4 text-ink md:p-5">
                <Conversation />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 md:mt-20">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            {LOOP.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span className={cn("rounded-full px-5 py-2.5 text-[15px] font-semibold", i === 2 ? "bg-teal text-white" : "bg-white text-ink")}>
                  {s}
                </span>
                {i < LOOP.length - 1 && <ArrowRight className="size-4 text-ink-3" />}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-[15px] text-ink-2">
            The gap between knowing and doing is where health fails. Zaro lives in that gap.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
