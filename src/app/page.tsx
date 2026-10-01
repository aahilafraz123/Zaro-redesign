import { Nav } from "@/components/site/nav";
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
import { FinalCta, Footer } from "@/components/site/final-cta";
import { SmoothScroll } from "@/components/site/smooth-scroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main className="w-full max-w-full overflow-x-clip">
        <Hero />
        <Problem />
        <HowItWorks />
        <ScoreBento />
        <DailyPlan />
        <Panels />
        <TwoPaths />
        <Wearables />
        <Value />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
