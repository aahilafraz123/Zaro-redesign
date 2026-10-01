import { Hero } from "@/components/site/hero";
import { Problem } from "@/components/site/problem";
import { HowItWorks } from "@/components/site/how-it-works";
import { ScoreBento } from "@/components/site/score-bento";
import { DailyPlan } from "@/components/site/daily-plan";
import { Panels } from "@/components/site/panels";
import { TwoPaths } from "@/components/site/two-paths";
import { Wearables } from "@/components/site/wearables";
import { Value } from "@/components/site/value";
import { Trust } from "@/components/site/trust";
import { Faq } from "@/components/site/faq";
import { FinalCta } from "@/components/site/final-cta";
import { JournalTeaser, PartnerBand } from "@/components/site/home-social";

export default function Home() {
  return (
    <>
      <main className="w-full max-w-full overflow-x-clip">
        <Hero />
        <Problem />
        <HowItWorks />
        <ScoreBento />
        <DailyPlan />
        <PartnerBand />
        <Panels />
        <TwoPaths />
        <Wearables />
        <Value />
        <Trust />
        <JournalTeaser />
        <Faq />
        <FinalCta />
      </main>
    </>
  );
}
