import { WEARABLES } from "@/lib/content";
import { SectionHeading } from "./reveal";

function Row({ items, reverse = false, duration = "60s" }: { items: string[]; reverse?: boolean; duration?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <ul
        className={`flex shrink-0 items-center gap-4 pr-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {doubled.map((w, i) => (
          <li
            key={`${w}-${i}`}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center gap-3 rounded-full border border-line/70 bg-white px-6 py-3.5 font-display text-[20px] whitespace-nowrap text-ink md:text-[24px]"
          >
            <span className="size-2 rounded-full bg-teal/70" />
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Wearables() {
  const half = Math.ceil(WEARABLES.length / 2);
  return (
    <section className="relative overflow-hidden bg-sand py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Works with 300+ devices"
          title="Your wearable already knows a lot."
          accent="Zaro reads it all."
          body="Sleep, HRV, activity and continuous glucose sync next to your lab results, so your score reflects how you actually live, not just one morning at the lab."
        />
      </div>
      <div className="mt-14 space-y-4 md:mt-20">
        <Row items={WEARABLES.slice(0, half)} duration="55s" />
        <Row items={WEARABLES.slice(half)} reverse duration="65s" />
      </div>
    </section>
  );
}
