import { getLenis } from "./lenis";

/*
 * Staged hero. Three scenes, one scroll gesture between each:
 *   s0  the drop (still, gently floating)
 *   s1  inside the blood (an ambient loop, always moving)
 *   s2  the score ring (still, with a slow glow)
 * Transitions are real video clips played at a fixed speed, forward or reversed, so the motion is
 * identical every time instead of following the scroll wheel. After s2, the next scroll releases
 * the page; scrolling back to the top re-enters the hero at s2.
 */

type Clip = "t1" | "t1r" | "loop" | "t2" | "t2r";
type State = "s0" | "t1" | "s1" | "t2" | "s2";

const GESTURE_GAP = 220; // ms of wheel silence that ends one gesture (absorbs trackpad inertia)

export function initHero(section: HTMLElement) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  const size = window.matchMedia("(max-width: 820px)").matches ? "m" : "d";
  const src = (name: string) => `${base}hero/${name}-${size}.mp4`;

  const layers = new Map<string, HTMLElement>();
  section.querySelectorAll<HTMLElement>("[data-layer]").forEach((el) => layers.set(el.dataset.layer!, el));
  const vids = {} as Record<Clip, HTMLVideoElement>;
  section.querySelectorAll<HTMLVideoElement>("video[data-layer]").forEach((v) => (vids[v.dataset.layer as Clip] = v));
  const beats = [...section.querySelectorAll<HTMLElement>("[data-on]")];
  const dots = [...section.querySelectorAll<HTMLElement>("[data-dot]")];

  let state: State = "s0";
  let busy = false;
  let released = window.scrollY > 4 || !!location.hash;

  const setState = (s: State) => {
    state = s;
    section.dataset.state = s;
    beats.forEach((b) => b.classList.toggle("show", b.dataset.on!.split(" ").includes(s)));
    const stage = s === "s0" || s === "t1" ? 0 : s === "s1" ? 1 : 2;
    dots.forEach((d, i) => d.classList.toggle("on", i === stage));
  };

  const show = (name: string) => layers.forEach((el, k) => el.classList.toggle("on", k === name));

  if (reduce) {
    setState("s0");
    show("s0");
    return;
  }

  // Load the first transition now, the rest once the page is idle.
  (Object.keys(vids) as Clip[]).forEach((name, i) => {
    const v = vids[name];
    const attach = () => {
      v.src = src(name);
      v.preload = "auto";
      v.load();
    };
    if (i === 0) attach();
    else (window.requestIdleCallback ?? ((fn: () => void) => setTimeout(fn, 600)))(attach);
  });

  const ready = (v: HTMLVideoElement) =>
    v.readyState >= 3
      ? Promise.resolve()
      : new Promise<void>((res) => {
          const done = () => res();
          v.addEventListener("canplay", done, { once: true });
          setTimeout(done, 2500);
        });

  // Resolve once the first frame of playback is actually on screen, so layer swaps never flash black.
  // Falls back to a short timeout: hidden tabs never paint, and a stage must never get stuck.
  const painted = (v: HTMLVideoElement) =>
    new Promise<void>((res) => {
      setTimeout(res, 300);
      if ("requestVideoFrameCallback" in v) v.requestVideoFrameCallback(() => res());
      else v.addEventListener("playing", () => res(), { once: true });
    });

  const finished = (v: HTMLVideoElement) =>
    new Promise<void>((res) => {
      v.addEventListener("ended", () => res(), { once: true });
      const ms = Number.isFinite(v.duration) ? v.duration * 1000 + 600 : 4000;
      setTimeout(res, ms);
    });

  const play = async (name: Clip) => {
    const v = vids[name];
    await ready(v);
    v.currentTime = 0;
    const frame = painted(v);
    await v.play().catch(() => {});
    await frame;
    show(name);
    if (!v.loop) await finished(v);
  };

  const startLoop = async () => {
    const v = vids.loop;
    if (v.error) return show("s1"); // loop missing or broken: hold on the still of this scene
    await ready(v);
    if (v.readyState < 2) return show("s1");
    v.currentTime = 0;
    const frame = painted(v);
    await v.play().catch(() => {});
    await frame;
    show("loop");
  };

  const lock = () => {
    released = false;
    getLenis()?.stop();
  };

  const release = (scroll = true) => {
    released = true;
    const lenis = getLenis();
    lenis?.start();
    if (scroll) {
      const next = section.nextElementSibling as HTMLElement | null;
      if (lenis && next) lenis.scrollTo(next, { offset: -48, duration: 1.1 });
      else next?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const step = async (dir: 1 | -1) => {
    if (busy) return;
    busy = true;
    try {
      if (dir > 0) {
        if (state === "s0") {
          setState("t1");
          await play("t1");
          await startLoop();
          setState("s1");
        } else if (state === "s1") {
          setState("t2");
          await play("t2");
          vids.loop.pause();
          setState("s2");
        } else if (state === "s2") {
          release();
        }
      } else {
        if (state === "s2") {
          setState("t2");
          await play("t2r");
          await startLoop();
          setState("s1");
        } else if (state === "s1") {
          setState("t1");
          await play("t1r");
          vids.loop.pause();
          show("s0");
          setState("s0");
        }
      }
    } finally {
      busy = false;
    }
  };

  // ----- Input: one gesture = one step -----
  let lastWheel = 0;
  let usedGesture = false;

  window.addEventListener(
    "wheel",
    (e) => {
      const now = performance.now();
      const newGesture = now - lastWheel > GESTURE_GAP;
      lastWheel = now;
      if (newGesture) usedGesture = false;

      if (released) {
        // Back at the very top and scrolling up: re-enter the hero at the score.
        if (window.scrollY <= 2 && e.deltaY < 0 && newGesture) {
          e.preventDefault();
          lock();
          usedGesture = true;
        }
        return;
      }

      e.preventDefault();
      if (usedGesture || busy || Math.abs(e.deltaY) < 3) return;
      usedGesture = true;
      step(e.deltaY > 0 ? 1 : -1);
    },
    { passive: false },
  );

  let touchY: number | null = null;
  window.addEventListener("touchstart", (e) => (touchY = e.touches[0].clientY), { passive: true });
  window.addEventListener(
    "touchmove",
    (e) => {
      if (!released) e.preventDefault();
    },
    { passive: false },
  );
  window.addEventListener("touchend", (e) => {
    if (touchY === null) return;
    const dy = touchY - e.changedTouches[0].clientY;
    touchY = null;
    if (Math.abs(dy) < 36) return;
    if (released) {
      if (window.scrollY <= 2 && dy < 0) lock();
      return;
    }
    step(dy > 0 ? 1 : -1);
  });

  window.addEventListener("keydown", (e) => {
    if (released || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    const down = ["ArrowDown", "PageDown"].includes(e.key) || (e.key === " " && !e.shiftKey);
    const up = ["ArrowUp", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey);
    if (!down && !up) return;
    e.preventDefault();
    step(down ? 1 : -1);
  });

  // Any in-page link (nav, "See how it works", skip) releases the hero first.
  window.addEventListener(
    "click",
    (e) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!a || released) return;
      const id = a.hash.slice(1);
      if (!id || id === "top" || !document.getElementById(id)) return;
      if (state !== "s2") {
        vids.loop.pause();
        show("s2");
        setState("s2");
      }
      release(false);
    },
    true,
  );

  // ----- Start -----
  setState(released ? "s2" : "s0");
  show(released ? "s2" : "s0");
  if (!released) lock();
}
