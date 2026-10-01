import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// One smooth-scroll instance shared by every script on the page (the hero pauses and resumes it).
let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  if (lenis || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return lenis;
  lenis = new Lenis({ lerp: 0.13, anchors: { offset: -48 } });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}
