"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  after,
  body,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  after?: string;
  body?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-4xl ${className ?? ""}`}>
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-5">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)] text-ink">
          {title}
          {accent && <span className="accent"> {accent}</span>}
          {after && <> {after}</>}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.12}>
          <p
            className={`mt-6 text-[17px] leading-relaxed text-ink-2 md:text-lg ${centered ? "mx-auto max-w-2xl" : "max-w-xl"}`}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
