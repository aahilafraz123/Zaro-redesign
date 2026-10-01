#!/usr/bin/env node
// Build the staged hero's media from the Higgsfield clips.
//
//   node scripts/make-hero-video.mjs <drop-to-cells.mp4> <cells-to-ring.mp4> [cells-loop.mp4]
//
// Writes public/hero/:
//   t1-{d,m}.mp4 / t1r-{d,m}.mp4   stage 1 → 2 transition, forward and reversed
//   t2-{d,m}.mp4 / t2r-{d,m}.mp4   stage 2 → 3 transition, forward and reversed
//   loop-{d,m}.mp4                 stage 2 ambient loop (optional input)
//   s0/s1/s2-{d,m}.webp            still of each stage (posters, reduced motion)

import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import ffmpeg from "@ffmpeg-installer/ffmpeg";

const [t1, t2, loop] = process.argv.slice(2).map((p) => resolve(p));
if (!t1 || !t2) {
  console.error("Usage: node scripts/make-hero-video.mjs drop-to-cells.mp4 cells-to-ring.mp4 [cells-loop.mp4]");
  process.exit(1);
}

const out = resolve("public/hero");
mkdirSync(out, { recursive: true });
const work = mkdtempSync(join(tmpdir(), "zaro-hero-"));
const run = (a) => execFileSync(ffmpeg.path, ["-hide_banner", "-loglevel", "error", "-y", ...a], { stdio: "inherit" });
const duration = (file) => {
  const m = spawnSync(ffmpeg.path, ["-hide_banner", "-i", file], { encoding: "utf8" }).stderr.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
  return +m[1] * 3600 + +m[2] * 60 + +m[3];
};

// The ambient loop is slowed a little for a calmer drift, then its last X seconds are crossfaded into its
// first X seconds, so the final frame flows straight back into the first: a seamless loop.
const LOOP_SLOW = 1.25;
const LOOP_FADE = 1.8;
const loopFilter = (w, h) => {
  const d = duration(loop) * LOOP_SLOW;
  const offset = (d - LOOP_FADE - LOOP_FADE).toFixed(3);
  return (
    `[0:v]${fit(w, h)},setpts=PTS*${LOOP_SLOW},fps=30,split[a][b];` +
    `[a]trim=start=${LOOP_FADE},setpts=PTS-STARTPTS[main];` +
    `[b]trim=end=${LOOP_FADE},setpts=PTS-STARTPTS[head];` +
    `[main][head]xfade=transition=fade:duration=${LOOP_FADE}:offset=${offset},format=yuv420p[out]`
  );
};

const sizes = [
  { tag: "d", w: 2560, h: 1440, crf: "20" },
  { tag: "m", w: 1280, h: 720, crf: "23" },
];
const enc = (crf) => [
  "-an", "-c:v", "libx264", "-preset", "slow", "-crf", crf, "-profile:v", "high",
  "-pix_fmt", "yuv420p", "-g", "12", "-movflags", "+faststart",
];
const fit = (w, h) => `scale=${w}:${h}:force_original_aspect_ratio=increase:flags=lanczos,crop=${w}:${h},setsar=1`;

// Transitions are sped up and re-timed to 60 fps so each plays in about two seconds, smoothly.
const speed = { t1: 3, t2: 2.5, loop: 1 };

for (const s of sizes) {
  for (const [name, src] of [["t1", t1], ["t2", t2], ["loop", loop]]) {
    if (!src) continue;
    if (name === "loop") {
      run(["-i", src, "-filter_complex", loopFilter(s.w, s.h), "-map", "[out]", ...enc(s.crf), join(out, `loop-${s.tag}.mp4`)]);
      continue;
    }
    const vf = fit(s.w, s.h) + `,setpts=PTS/${speed[name]},fps=60`;
    run(["-i", src, "-vf", vf, ...enc(s.crf), join(out, `${name}-${s.tag}.mp4`)]);
    {
      // Scale first, then reverse, to keep memory reasonable.
      const tmp = join(work, `${name}-${s.tag}.mp4`);
      run(["-i", src, "-vf", vf, "-an", "-c:v", "libx264", "-crf", "10", "-pix_fmt", "yuv420p", tmp]);
      run(["-i", tmp, "-vf", "reverse", ...enc(s.crf), join(out, `${name}r-${s.tag}.mp4`)]);
    }
  }
  // Stills: start of the dive, inside the blood, the finished ring.
  const still = (src, at, file) =>
    run([...(at === "end" ? ["-sseof", "-0.05"] : ["-ss", "0"]), "-i", src, "-frames:v", "1", "-vf", fit(s.w, s.h), join(work, file)]);
  still(t1, "start", `s0-${s.tag}.png`);
  still(t1, "end", `s1-${s.tag}.png`);
  still(t2, "end", `s2-${s.tag}.png`);
  for (const f of ["s0", "s1", "s2"])
    execFileSync("cwebp", ["-quiet", "-q", s.tag === "d" ? "82" : "76", join(work, `${f}-${s.tag}.png`), "-o", join(out, `${f}-${s.tag}.webp`)]);
}

rmSync(work, { recursive: true, force: true });
console.log(`Hero media written to ${out}`);
