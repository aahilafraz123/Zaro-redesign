import { FlaskConical, Lock, Stethoscope } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const LABS = [
  { name: "Quest Diagnostics", status: "Available now", detail: "2,250+ patient service centers", live: true },
  { name: "Labcorp", status: "Coming soon", detail: "", live: false },
  { name: "BioReference", status: "Coming soon", detail: "", live: false },
];

export function Trust() {
  return (
    <section className="relative bg-white py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Built on clinical ground"
          title="The labs your doctor uses."
          accent="The privacy you’d expect."
        />

        <div className="mt-16 grid gap-5 md:mt-20 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <div className="card-soft h-full rounded-[28px] p-7 md:p-9">
              <FlaskConical className="size-6 text-teal" />
              <h3 className="mt-5 font-display text-[26px] text-ink">CLIA-certified labs</h3>
              <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-2">
                Every panel is processed at Quest Diagnostics on the same clinical-grade instruments behind
                your physician-ordered tests.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                {LABS.map((l) => (
                  <li key={l.name} className="rounded-2xl bg-white p-4">
                    <p className="text-[15px] font-semibold text-ink">{l.name}</p>
                    <p className={`mt-1 flex items-center gap-1.5 text-[12px] font-semibold ${l.live ? "text-teal" : "text-ink-3"}`}>
                      <span className={`size-1.5 rounded-full ${l.live ? "bg-teal" : "bg-ink-3/50"}`} />
                      {l.status}
                    </p>
                    {l.detail && <p className="mt-1 font-mono text-[11px] text-ink-3">{l.detail}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-[28px] bg-teal-night p-7 text-white md:p-9">
              <Lock className="size-6 text-teal-soft" />
              <h3 className="mt-5 font-display text-[26px]">Your data is yours</h3>
              <ul className="mt-5 space-y-3 text-[15px] text-white/85">
                <li>Encrypted at rest and in transit</li>
                <li>Never sold, never shared with insurers</li>
                <li>Export or delete it any time</li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="md:col-span-3" delay={0.12}>
            <figure className="card-soft grid items-center gap-6 rounded-[28px] p-7 md:grid-cols-[auto_1fr] md:gap-10 md:p-9">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-full bg-teal-mist">
                  <Stethoscope className="size-6 text-teal" />
                </span>
                <figcaption>
                  <p className="text-[16px] font-semibold text-ink">Rajesh, MD</p>
                  <p className="text-[13px] text-ink-3">Medical Director · Board-certified, Family Medicine</p>
                </figcaption>
              </div>
              <blockquote className="font-display text-[clamp(1.25rem,2.2vw,1.6rem)] leading-snug font-light text-ink">
                “The same compounding that builds wealth builds health. Zaro is the account statement nobody
                gave you.”
              </blockquote>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
