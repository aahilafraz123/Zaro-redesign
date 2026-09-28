import ScrollReveal from "@/components/ScrollReveal";
import { Reveal } from "./reveal";

export function Problem() {
  return (
    <section className="relative bg-white py-28 md:py-44">
      <div className="mx-auto max-w-5xl px-5">
        <ScrollReveal
          baseOpacity={0.12}
          enableBlur
          baseRotation={2}
          blurStrength={6}
          containerClassName="!my-0"
          textClassName="display !font-light !text-[clamp(1.9rem,4.4vw,3.6rem)] !leading-[1.18] text-ink"
          rotationEnd="bottom 70%"
          wordAnimationEnd="bottom 55%"
        >
          Feeling tired, foggy, or just off? It’s easy to blame your age. More often, something in your blood has drifted, and a routine physical that checks 12 to 15 markers won’t catch it until it’s a diagnosis.
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-3 md:mt-24">
          {[
            { k: "12–15", v: "markers in a typical annual physical" },
            { k: "100+", v: "markers in Zaro’s most complete panel" },
            { k: "10 yrs", v: "Up to a decade of earlier warning from fasting insulin than from HbA1c" },
          ].map((s, i) => (
            <Reveal key={s.k} delay={i * 0.08}>
              <div className="border-t border-line pt-6">
                <p className="display text-[clamp(2.5rem,4vw,3.5rem)] text-ink">{s.k}</p>
                <p className="mt-2 max-w-[16rem] text-[15px] leading-relaxed text-ink-2">{s.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
