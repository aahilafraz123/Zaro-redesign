import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * Scroll-scrubbed hero. Two sources share one canvas:
 *  - FrameSource: a pre-rendered image sequence (Higgsfield video cut into WebP frames).
 *  - DrawnSource: the same shot drawn in code, used until frames exist or if they fail to load.
 * Scroll progress (0..1) picks the frame; nothing animates on its own.
 */

type Source = {
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, p: number) => void;
  onFrame?: () => void;
};

type Manifest = { count: number; pattern: string; width: number; height: number; mobilePattern?: string };

const RED = [181, 22, 43];
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Deterministic pseudo-random so the shot looks identical every visit.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ---------- Image sequence ---------- */

async function frameSource(base: string): Promise<Source | null> {
  try {
    const res = await fetch(`${base}frames/hero/manifest.json`);
    if (!res.ok) return null;
    const m = (await res.json()) as Manifest;
    if (!m.count) return null; // no footage yet: keep the drawn version
    const small = window.matchMedia("(max-width: 820px)").matches && m.mobilePattern;
    const pattern = small ? m.mobilePattern! : m.pattern;
    const url = (i: number) => `${base}frames/hero/${pattern.replace("%04d", String(i + 1).padStart(4, "0"))}`;
    const frames: (HTMLImageElement | null)[] = new Array(m.count).fill(null);
    let onFrame: () => void = () => {};

    // Decode before use, so drawing a frame never stalls the scroll on image decoding.
    const load = async (i: number) => {
      if (frames[i]) return;
      const img = new Image();
      img.src = url(i);
      try {
        await img.decode();
        frames[i] = img;
        onFrame();
      } catch {
        /* skip a frame that fails; neighbours cover it */
      }
    };

    // Coarse to fine: every 8th frame first so the whole scroll is usable fast, then fill in.
    const order: number[] = [];
    const seen = new Set<number>();
    for (const step of [8, 4, 2, 1])
      for (let i = 0; i < m.count; i += step) if (!seen.has(i)) (seen.add(i), order.push(i));
    const queue = order.slice();
    const worker = async () => {
      while (queue.length) await load(queue.shift()!);
    };
    await Promise.all([0, 1, 2, 3].map(load));
    Promise.all(Array.from({ length: 8 }, worker));

    const nearest = (i: number) => {
      for (let d = 0; d < m.count; d++) {
        if (frames[i - d]) return frames[i - d];
        if (frames[i + d]) return frames[i + d];
      }
      return null;
    };

    // Geometry is the same for every frame, so compute it once per canvas size.
    let geo = { w: 0, h: 0, x: 0, y: 0, iw: 0, ih: 0, portrait: false };
    const layout = (w: number, h: number, nw: number, nh: number) => {
      if (geo.w === w && geo.h === h) return geo;
      const portrait = h > w;
      // Landscape: cover the screen. Portrait phones: keep the whole ring in view.
      const s = portrait ? Math.max((w / nw) * 1.35, (h / nh) * 0.5) : Math.max(w / nw, h / nh);
      const iw = nw * s;
      const ih = nh * s;
      geo = { w, h, x: (w - iw) / 2, y: (h - ih) / 2, iw, ih, portrait };
      return geo;
    };

    return {
      set onFrame(fn: () => void) {
        onFrame = fn;
      },
      draw(ctx, w, h, p) {
        // One frame per source frame of footage, so no blending is needed (blending ghosts fast motion).
        const i0 = Math.round(p * (m.count - 1));
        const a = frames[i0] ?? nearest(i0);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);
        if (!a) return;
        const g = layout(w, h, a.naturalWidth, a.naturalHeight);
        ctx.drawImage(a, g.x, g.y, g.iw, g.ih);
        if (g.portrait && g.ih < h) {
          const edge = g.ih * 0.22;
          for (const [y0, y1] of [[g.y, g.y + edge], [g.y + g.ih, g.y + g.ih - edge]]) {
            const grad = ctx.createLinearGradient(0, y0, 0, y1);
            grad.addColorStop(0, "#000");
            grad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = grad;
            ctx.fillRect(0, Math.min(y0, y1), w, edge);
          }
        }
      },
    } as Source;
  } catch {
    return null;
  }
}

/* ---------- Drawn fallback: drop → inside → score ring ---------- */

function drawnSource(): Source {
  const r = rng(7);
  const cells = Array.from({ length: 80 }, () => ({
    x: r() * 2 - 1,
    y: r() * 2 - 1,
    z: r() * 3,
    rot: r() * Math.PI,
    tilt: 0.45 + r() * 0.55,
  }));
  const dust = Array.from({ length: 160 }, () => ({ x: r() * 2 - 1, y: r() * 2 - 1, z: r() * 3 }));
  const P = 240;
  const ring = Array.from({ length: P }, (_, i) => ({
    sx: r() * 2 - 1,
    sy: r() * 2 - 1,
    a: -Math.PI / 2 + (i / P) * Math.PI * 2,
    j: (r() - 0.5) * 0.06,
    lit: i / P <= 0.78,
  }));

  let minDim = 1;
  function drop(ctx: CanvasRenderingContext2D, cx: number, cy: number, rad: number, alpha: number) {
    ctx.save();
    ctx.globalAlpha = alpha;
    // soft glow
    const glow = ctx.createRadialGradient(cx, cy, rad * 0.4, cx, cy, rad * 3.2);
    glow.addColorStop(0, `rgba(${RED},0.22)`);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(cx - rad * 4, cy - rad * 4, rad * 8, rad * 8);
    // teardrop body
    ctx.beginPath();
    ctx.moveTo(cx, cy - rad * 1.55);
    ctx.bezierCurveTo(cx + rad * 0.35, cy - rad * 0.95, cx + rad, cy - rad * 0.45, cx + rad, cy + rad * 0.15);
    ctx.arc(cx, cy + rad * 0.15, rad, 0, Math.PI, false);
    ctx.bezierCurveTo(cx - rad, cy - rad * 0.45, cx - rad * 0.35, cy - rad * 0.95, cx, cy - rad * 1.55);
    ctx.closePath();
    const body = ctx.createRadialGradient(cx - rad * 0.35, cy - rad * 0.2, rad * 0.05, cx, cy + rad * 0.1, rad * 1.25);
    body.addColorStop(0, "#e35a69");
    body.addColorStop(0.35, "#b5162b");
    body.addColorStop(0.85, "#4d0710");
    body.addColorStop(1, "#22030a");
    ctx.fillStyle = body;
    ctx.fill();
    // rim light
    ctx.lineWidth = Math.max(1, rad * 0.02);
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.stroke();
    // specular highlight (fades once the drop is larger than the frame)
    ctx.globalAlpha = alpha * (1 - range(rad, minDim * 0.2, minDim * 0.7));
    ctx.beginPath();
    ctx.ellipse(cx - rad * 0.38, cy - rad * 0.22, rad * 0.16, rad * 0.3, -0.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + rad * 0.45, cy + rad * 0.55, rad * 0.08, rad * 0.05, 0.6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fill();
    ctx.restore();
  }

  function cell(ctx: CanvasRenderingContext2D, x: number, y: number, rad: number, rot: number, tilt: number, a: number) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(1, tilt);
    const g = ctx.createRadialGradient(0, 0, rad * 0.1, 0, 0, rad);
    g.addColorStop(0, "#1b0b0e");
    g.addColorStop(0.45, "#2a1013");
    g.addColorStop(0.8, "#7c2531");
    g.addColorStop(1, "rgba(124,37,49,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  return {
    draw(ctx, w, h, p) {
      const min = Math.min(w, h);
      const max = Math.max(w, h);
      minDim = min;
      const cx = w / 2;
      const cy = h * 0.56;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      // Phase B background (inside the drop)
      const inB = range(p, 0.3, 0.42) * (1 - range(p, 0.72, 0.86));
      if (inB > 0) {
        const bg = ctx.createRadialGradient(cx, h / 2, 0, cx, h / 2, max * 0.75);
        bg.addColorStop(0, `rgba(58,8,14,${inB})`);
        bg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);
      }

      // Phase B: cells and plasma dust, depth-sorted, camera pushing forward
      const cellA = range(p, 0.3, 0.44) * (1 - range(p, 0.7, 0.82));
      if (cellA > 0) {
        const cz = range(p, 0.28, 0.82) * 2.4;
        const proj = (o: { x: number; y: number; z: number }) => {
          const d = ((((o.z - cz) % 3) + 3) % 3) + 0.08;
          return { d, s: 1 / d };
        };
        for (const o of dust) {
          const { d, s } = proj(o);
          const a = clamp(1 - d / 3) * 0.35 * cellA;
          ctx.fillStyle = `rgba(255,255,255,${a})`;
          ctx.fillRect(cx + o.x * w * 0.6 * s, h / 2 + o.y * h * 0.6 * s, 1.5, 1.5);
        }
        const sorted = cells.map((c) => ({ c, ...proj(c) })).sort((a, b) => b.d - a.d);
        for (const { c, d, s } of sorted) {
          const near = range(d, 0.08, 0.45);
          const far = 1 - range(d, 1.8, 3);
          cell(ctx, cx + c.x * w * 0.55 * s, h / 2 + c.y * h * 0.55 * s, min * 0.07 * s, c.rot + cz * 0.2, c.tilt, near * far * cellA);
        }
      }

      // Phase A: the drop, pushing in until it fills the frame
      const dropA = 1 - range(p, 0.3, 0.4);
      if (dropA > 0) {
        const t = range(p, 0.08, 0.4);
        const r0 = min * 0.065;
        const rad = r0 * Math.exp(Math.log((max * 1.4) / r0) * easeInOut(t) * 1.0);
        drop(ctx, cx, lerp(cy, h / 2, t), rad, dropA);
        // As the camera enters the drop, sink into dark crimson rather than a flat red frame.
        const sink = range(t, 0.3, 0.85);
        if (sink > 0) {
          const v = ctx.createRadialGradient(cx, h / 2, 0, cx, h / 2, max * 0.8);
          v.addColorStop(0, `rgba(0,0,0,${0.55 * sink})`);
          v.addColorStop(1, `rgba(0,0,0,${0.92 * sink})`);
          ctx.fillStyle = v;
          ctx.fillRect(0, 0, w, h);
        }
      }

      // Phase C: particles gather into the score ring (78% lit, one red point at the end)
      const ringT = easeInOut(range(p, 0.68, 0.94));
      if (ringT > 0) {
        const R = min * 0.27;
        const lead = Math.floor(ring.length * 0.78);
        ring.forEach((q, i) => {
          const tx = cx + Math.cos(q.a) * R * (1 + q.j * (1 - ringT));
          const ty = h / 2 + Math.sin(q.a) * R * (1 + q.j * (1 - ringT));
          const sx = cx + q.sx * w * 0.6;
          const sy = h / 2 + q.sy * h * 0.6;
          const spin = (1 - ringT) * 0.9;
          const x = lerp(sx, tx, ringT) + Math.cos(q.a + spin) * 20 * (1 - ringT);
          const y = lerp(sy, ty, ringT) + Math.sin(q.a + spin) * 20 * (1 - ringT);
          const a = range(p, 0.68, 0.78);
          if (i === lead) {
            ctx.fillStyle = `rgba(${RED},${a})`;
            ctx.beginPath();
            ctx.arc(x, y, Math.max(3, min * 0.006) * (0.6 + ringT * 0.6), 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = q.lit ? `rgba(245,245,247,${0.9 * a})` : `rgba(245,245,247,${0.16 * a})`;
            ctx.fillRect(x - 1, y - 1, 2, 2);
          }
        });
      }
    },
  };
}

/* ---------- Wiring ---------- */

export async function initHero(section: HTMLElement) {
  const canvas = section.querySelector<HTMLCanvasElement>("canvas")!;
  const ctx = canvas.getContext("2d", { alpha: false })!;
  const beats = [...section.querySelectorAll<HTMLElement>("[data-beat]")];
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let source: Source = drawnSource();
  let progress = 0;
  let w = 0;
  let h = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    render();
  };

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      render();
    });
  };

  const render = () => {
    ctx.imageSmoothingQuality = "high";
    source.draw(ctx, w, h, progress);
    for (const b of beats) {
      const [a, z] = b.dataset.beat!.split(",").map(Number);
      const fade = 0.035;
      const fadeIn = a <= 0 ? 1 : range(progress, a, a + fade);
      const fadeOut = z >= 1 ? 1 : 1 - range(progress, z - fade, z);
      const o = fadeIn * fadeOut;
      b.style.opacity = String(o);
      b.style.transform = `translate3d(0, ${(1 - o) * 18}px, 0)`;
      b.style.pointerEvents = o > 0.6 ? "auto" : "none";
    }
  };

  window.addEventListener("resize", resize);
  resize();

  frameSource(base).then((s) => {
    if (s) {
      source = s;
      // Repaint when a frame that is on screen finishes loading.
      s.onFrame = schedule;
      section.dataset.source = "frames";
      schedule();
    }
  });

  if (reduce) {
    progress = 0.05;
    render();
    return;
  }

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      progress = self.progress;
      schedule();
    },
  });
}
