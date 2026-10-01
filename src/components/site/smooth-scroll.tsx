"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New page: start at the top (or at the hash target) and re-measure scroll triggers.
  useEffect(() => {
    const lenis = lenisRef.current;
    const hash = window.location.hash;
    lenis?.scrollTo(0, { immediate: true, force: true });
    // Wait for the new page's pinned sections to be measured before jumping to a hash target.
    const id = window.setTimeout(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { immediate: true, offset: -80, force: true });
      else target.scrollIntoView();
    }, 200);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
