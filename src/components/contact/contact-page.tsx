"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Clock, FileText, ShieldCheck } from "lucide-react";
import BlurText from "@/components/BlurText";
import { Reveal } from "@/components/site/reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const field =
  "mt-2 w-full rounded-2xl border border-line bg-white px-5 py-3.5 text-[16px] text-ink placeholder:text-ink-3 outline-none transition-colors focus:border-teal focus:ring-4 focus:ring-teal/10";

const ASIDE = [
  { icon: Clock, t: "Replies in 2–5 business days", d: "A real person on the Zaro team reads every message." },
  { icon: FileText, t: "Questions about results?", d: "Include your order email so we can find the right panel quickly." },
  { icon: ShieldCheck, t: "Keep health details light", d: "Please don't include lab values or personal medical history here." },
];

export function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <section className="relative overflow-hidden bg-white pt-36 pb-16 md:pt-44 md:pb-20">
        <div aria-hidden className="pointer-events-none absolute top-[-30%] left-1/2 h-[700px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(194,229,229,0.5),transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl px-5">
          <p className="eyebrow">Get in touch</p>
          <h1 className="display mt-6 max-w-5xl text-[clamp(2.75rem,6.4vw,5.5rem)] text-ink">
            <BlurText as="span" text="We are" delay={70} direction="bottom" />
            <BlurText as="span" text="here to help." delay={70} direction="bottom" wordClassName="accent" />
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-ink-2">
              Have a question about your results, your order, or how Zaro works? Send us a message and our team will
              get back to you within two to five business days.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <div className="rounded-[32px] bg-white p-7 shadow-[0_40px_80px_-50px_rgba(12,59,59,0.35)] md:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <span className="grid size-14 place-items-center rounded-full bg-teal-mist text-teal">
                      <Check className="size-7" />
                    </span>
                    <h2 className="font-display mt-6 text-[28px] text-ink">Message sent</h2>
                    <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-ink-2">
                      Thanks for reaching out. We&apos;ll reply within two to five business days.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-8 text-[15px] font-semibold text-teal hover:text-teal-night"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="space-y-6"
                  >
                    <label className="block text-[14px] font-medium text-ink">
                      Name <span className="text-teal">*</span>
                      <input required name="name" type="text" autoComplete="name" className={field} />
                    </label>
                    <label className="block text-[14px] font-medium text-ink">
                      Email <span className="text-teal">*</span>
                      <input required name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} />
                    </label>
                    <label className="block text-[14px] font-medium text-ink">
                      How can we help? <span className="text-teal">*</span>
                      <textarea
                        required
                        name="message"
                        rows={6}
                        placeholder="Share your question about your results, your order, or how Zaro works."
                        className={`${field} resize-none rounded-3xl`}
                      />
                    </label>
                    <button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-teal-night sm:w-auto"
                    >
                      Send message
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-4 lg:pt-4">
              {ASIDE.map(({ icon: Icon, t, d }) => (
                <div key={t} className="flex gap-4 rounded-3xl border border-line/70 bg-white/60 p-6">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal-mist text-teal">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold text-ink">{t}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{d}</p>
                  </div>
                </div>
              ))}
              <p className="px-2 pt-2 text-[15px] text-ink-2">
                Looking for quick answers first?{" "}
                <Link href="/#faq" className="font-semibold text-teal hover:text-teal-night">
                  Read the FAQ
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
