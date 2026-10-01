import { getLenis } from "./lenis";

/*
 * Hero intro, played in one go. The page opens on the drop (s0). The first scroll plays the whole
 * film without stopping: the drop dives into the blood (t1), the cells gather into the score ring (t2),
 * the score lands (s2), and the page glides on into the next section. Another scroll mid-film hurries
 * it along. After that the hero is an ordinary section resting on the score, and scrolling up past the
 * top rewinds the film back to the drop, ready to play again.
 */

type Clip = "t1" | "t2" | "t1r" | "t2r";
type State = "s0" | "t1" | "t2" | "s2" | "rewind";

const RATE = 1.25; // clip speed for the intro
const REWIND = 1.8; // clip speed for the rewind, which is a quick way home rather than a story
const HURRY = 2.4; // clip speed once the reader scrolls again mid-film
const HOLD_S2 = 450; // ms for the score to land before the page moves on
const HOLD_HURRIED = 150;
const GESTURE_GAP = 250; // ms of wheel silence that ends one gesture (absorbs trackpad inertia)

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

  const setState = (s: State) => {
    section.dataset.state = s;
    beats.forEach((b) => b.classList.toggle("show", b.dataset.on!.split(" ").includes(s)));
  };
  const show = (name: string) => layers.forEach((el, k) => el.classList.toggle("on", k === name));

  if (reduce) {
    setState("s0");
    show("s0");
    return;
  }

  // Load the first clip straight away, the rest once the page is idle.
  (["t1", "t2", "t2r", "t1r"] as Clip[]).forEach((name, i) => {
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
          v.addEventListener("canplay", () => res(), { once: true });
          setTimeout(res, 2500);
        });

  // Resolve once the clip's first frame is on screen, so layer swaps never flash black.
  const painted = (v: HTMLVideoElement) =>
    new Promise<void>((res) => {
      setTimeout(res, 300);
      if (typeof v.requestVideoFrameCallback === "function") v.requestVideoFrameCallback(() => res());
      else v.addEventListener("playing", () => res(), { once: true });
    });

  const finished = (v: HTMLVideoElement) =>
    new Promise<void>((res) => {
      v.addEventListener("ended", () => res(), { once: true });
      // Hidden tabs may never fire `ended`; the film must never get stuck.
      setTimeout(res, (v.duration / v.playbackRate) * 1000 + 600);
    });

  // intro: resting on the drop, waiting for the first scroll. playing / rewinding: the film owns the
  // page. done: the hero is an ordinary section resting on the score.
  type Phase = "intro" | "playing" | "rewinding" | "done";
  let phase: Phase = "intro";
  let speed = RATE;
  let hurry = false;
  let current: HTMLVideoElement | null = null;
  let wake: (() => void) | null = null;
  const filming = () => phase === "playing" || phase === "rewinding";

  const hold = (ms: number) =>
    new Promise<void>((res) => {
      const t = setTimeout(done, hurry ? HOLD_HURRIED : ms);
      function done() {
        clearTimeout(t);
        wake = null;
        res();
      }
      wake = done;
    });

  const speedUp = () => {
    if (hurry) return;
    hurry = true;
    if (current) current.playbackRate = HURRY;
    const w = wake;
    if (w) setTimeout(w, HOLD_HURRIED);
  };

  const play = async (name: Clip) => {
    const v = vids[name];
    await ready(v);
    if (v.readyState < 2 || !filming()) return; // clip unavailable: the caller crossfades to the next still
    v.currentTime = 0;
    v.playbackRate = hurry ? HURRY : speed;
    current = v;
    const frame = painted(v);
    await v.play().catch(() => {});
    await frame;
    if (!filming()) return;
    show(name);
    await finished(v);
    current = null;
  };

  const lenis = () => getLenis();

  const lock = () => lenis()?.stop();

  const release = (scroll: boolean) => {
    phase = "done";
    const l = lenis();
    l?.start();
    if (!scroll) return;
    // The section after the hero (Astro leaves the hero's own <script> tag in between).
    let next = section.nextElementSibling as HTMLElement | null;
    while (next && (next.tagName === "SCRIPT" || next.tagName === "STYLE")) next = next.nextElementSibling as HTMLElement | null;
    if (!next) return;
    const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    if (l) l.scrollTo(next, { duration: 1.6, easing: easeInOut });
    else next.scrollIntoView({ behavior: "smooth" });
  };

  const intro = async () => {
    if (phase !== "intro") return;
    phase = "playing";
    speed = RATE;
    hurry = false;
    setState("t1");
    await play("t1");
    if (phase !== "playing") return;
    // Straight on: t1 holds its last frame (the first frame of t2) until t2 is on screen.
    setState("t2");
    await play("t2");
    if (phase !== "playing") return;
    show("s2");
    setState("s2");
    await hold(HOLD_S2);
    if (phase !== "playing") return;
    release(true);
  };

  // Back at the top and still scrolling up: run the film backwards to the drop.
  const rewind = async () => {
    if (phase !== "done") return;
    phase = "rewinding";
    speed = REWIND;
    hurry = false;
    lock();
    setState("rewind");
    await play("t2r");
    if (phase !== "rewinding") return;
    await play("t1r");
    if (phase !== "rewinding") return;
    show("s0");
    setState("s0");
    phase = "intro";
  };

  // Jump straight to the end of the story (nav links, Skip intro, a restored scroll position).
  const skip = () => {
    if (phase === "done") return;
    phase = "done";
    Object.values(vids).forEach((v) => v.pause());
    wake?.();
    show("s2");
    setState("s2");
    release(false);
  };

  // ----- Input -----
  // intro: a scroll down starts the film. playing / rewinding: the page is held; a fresh scroll hurries
  // the film. done: scrolling is the page's own, except scrolling up at the very top, which rewinds.
  const atTop = () => window.scrollY <= 2;

  let lastWheel = 0;
  window.addEventListener(
    "wheel",
    (e) => {
      const now = performance.now();
      const fresh = now - lastWheel > GESTURE_GAP;
      lastWheel = now;
      if (phase === "done") {
        if (e.deltaY < -2 && atTop()) {
          e.preventDefault();
          rewind();
        }
        return;
      }
      e.preventDefault();
      // Any downward movement starts the film: trackpad swipes open with tiny deltas, so waiting for a
      // big first event (or a fresh gesture) would swallow the whole swipe.
      if (phase === "intro" && e.deltaY > 0) intro();
      else if (filming() && fresh) speedUp();
    },
    { passive: false },
  );

  let touchY: number | null = null;
  window.addEventListener(
    "touchstart",
    (e) => {
      touchY = e.touches[0].clientY;
      if (filming()) speedUp();
    },
    { passive: true },
  );
  window.addEventListener("touchmove", (e) => phase !== "done" && e.preventDefault(), { passive: false });
  window.addEventListener("touchend", (e) => {
    if (touchY === null) return;
    const dy = touchY - e.changedTouches[0].clientY;
    touchY = null;
    if (phase === "intro" && dy > 30) intro();
    else if (phase === "done" && dy < -30 && atTop()) rewind();
  });

  window.addEventListener("keydown", (e) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    const down = ["ArrowDown", "PageDown", "End"].includes(e.key) || (e.key === " " && !e.shiftKey);
    const up = ["ArrowUp", "PageUp", "Home"].includes(e.key) || (e.key === " " && e.shiftKey);
    if (!down && !up) return;
    if (phase === "done") {
      if (up && atTop()) {
        e.preventDefault();
        rewind();
      }
      return;
    }
    e.preventDefault();
    if (phase === "intro" && down) intro();
    else if (filming()) speedUp();
  });

  // Any in-page link (nav, "See how it works", Skip intro) ends the film and lets the link scroll.
  window.addEventListener(
    "click",
    (e) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!a || phase === "done") return;
      const id = a.hash.slice(1);
      if (id && id !== "top" && document.getElementById(id)) skip();
    },
    true,
  );

  // The browser restored a scroll position after load: don't trap the reader mid-page.
  window.addEventListener("scroll", () => phase === "intro" && window.scrollY > 4 && skip(), { passive: true });

  // ----- Start -----
  // Opened mid-page, or from a link to a section further down: rest on the score; scrolling up to the
  // top can rewind it. A hash left over from an earlier click doesn't count on a reload or back/forward,
  // where the browser restores the old scroll position instead (the scroll listener above catches that).
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const revisit = nav?.type === "reload" || nav?.type === "back_forward";
  const linked = !revisit && location.hash ? document.getElementById(location.hash.slice(1)) : null;
  if (window.scrollY > 4 || (linked && linked !== section)) {
    phase = "done";
    setState("s2");
    show("s2");
    return;
  }
  if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
  setState("s0");
  show("s0");
  lock();
}
