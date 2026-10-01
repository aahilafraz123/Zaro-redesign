import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
if (!reduce) {
  const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -48 } });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Reveal on enter.
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { rootMargin: "0px 0px -12% 0px" },
);
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

// Nav follows the section underneath it: dark on black sections, light on white ones.
const sections = [...document.querySelectorAll<HTMLElement>("main > *, body > footer")];
const setNav = () => {
  const under = sections.find((s) => {
    const r = s.getBoundingClientRect();
    return r.top <= 24 && r.bottom > 24;
  });
  document.body.classList.toggle("on-light", !!under && !under.classList.contains("dark"));
};
window.addEventListener("scroll", setNav, { passive: true });
setNav();

// The blind spot: dots fill from 15 to 112 as you scroll, with a counter in sync.
const grid = document.querySelector<HTMLElement>("[data-dots]");
const count = document.querySelector<HTMLElement>("[data-count]");
if (grid && count) {
  const dots = [...grid.children] as HTMLElement[];
  const base = dots.filter((d) => d.classList.contains("base")).length;
  const paint = (p: number) => {
    const n = Math.round(base + (dots.length - base) * p);
    dots.forEach((d, i) => {
      d.classList.toggle("on", i < n);
      d.classList.toggle("last", i === n - 1 && n === dots.length);
    });
    count.textContent = String(n);
  };
  if (reduce) paint(1);
  else
    ScrollTrigger.create({
      trigger: grid,
      start: "top 80%",
      end: "bottom 35%",
      onUpdate: (self) => paint(self.progress),
    });
}
