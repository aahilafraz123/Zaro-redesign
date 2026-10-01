#!/usr/bin/env node
// Build the staged hero's media from the Higgsfield clips.
//
//   node scripts/make-hero-video.mjs <drop-to-cells.mp4> <cells-to-ring.mp4> [--stills-only]
//
// Pass the 4K masters: the stills are taken at full resolution, since each scene rests on its still.
//
// Writes public/hero/:
//   t1-{d,m}.mp4 / t1r-{d,m}.mp4   drop → blood, forward and reversed (the rewind)
//   t2-{d,m}.mp4 / t2r-{d,m}.mp4   blood → ring, forward and reversed
//   s0/s2-{d,m}.webp               the opening and closing frames

import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import ffmpeg from "@ffmpeg-installer/ffmpeg";

const args = process.argv.slice(2);
const stillsOnly = args.includes("--stills-only");
const [t1, t2] = args.filter((a) => !a.startsWith("--")).map((p) => resolve(p));
if (!t1 || !t2) {
  console.error("Usage: node scripts/make-hero-video.mjs drop-to-cells.mp4 cells-to-ring.mp4 [--stills-only]");
  process.exit(1);
}

const out = resolve("public/hero");
mkdirSync(out, { recursive: true });
const work = mkdtempSync(join(tmpdir(), "zaro-hero-"));
const run = (a) => execFileSync(ffmpeg.path, ["-hide_banner", "-loglevel", "error", "-y", ...a], { stdio: "inherit" });
// Video sizes, and the (larger) still sizes: a resting frame is looked at far longer than a moving one.
const sizes = [
  { tag: "d", w: 2560, h: 1440, crf: "20", still: [3840, 2160] },
  { tag: "m", w: 1280, h: 720, crf: "23", still: [1920, 1080] },
];
const enc = (crf) => [
  "-an", "-c:v", "libx264", "-preset", "slow", "-crf", crf, "-profile:v", "high",
  "-pix_fmt", "yuv420p", "-g", "12", "-movflags", "+faststart",
];
const fit = (w, h) => `scale=${w}:${h}:force_original_aspect_ratio=increase:flags=lanczos,crop=${w}:${h},setsar=1`;

// Transitions are sped up and re-timed to 60 fps so each plays in about two seconds, smoothly.
const speed = { t1: 3, t2: 2.5 };

for (const s of sizes) {
  for (const [name, src] of stillsOnly ? [] : [["t1", t1], ["t2", t2]]) {
    const vf = fit(s.w, s.h) + `,setpts=PTS/${speed[name]},fps=60`;
    run(["-i", src, "-vf", vf, ...enc(s.crf), join(out, `${name}-${s.tag}.mp4`)]);
    // Scale first, then reverse, to keep memory reasonable.
    const tmp = join(work, `${name}-${s.tag}.mp4`);
    run(["-i", src, "-vf", vf, "-an", "-c:v", "libx264", "-crf", "10", "-pix_fmt", "yuv420p", tmp]);
    run(["-i", tmp, "-vf", "reverse", ...enc(s.crf), join(out, `${name}r-${s.tag}.mp4`)]);
  }
  // Stills: start of the dive and the finished ring.
  const still = (src, at, file) =>
    run([...(at === "end" ? ["-sseof", "-0.05"] : ["-ss", "0"]), "-i", src, "-frames:v", "1", "-vf", fit(...s.still), join(work, file)]);
  still(t1, "start", `s0-${s.tag}.png`);
  still(t2, "end", `s2-${s.tag}.png`);
  for (const f of ["s0", "s2"])
    execFileSync("cwebp", ["-quiet", "-q", "90", "-sharp_yuv", join(work, `${f}-${s.tag}.png`), "-o", join(out, `${f}-${s.tag}.webp`)]);
}

rmSync(work, { recursive: true, force: true });
console.log(`Hero media written to ${out}`);
