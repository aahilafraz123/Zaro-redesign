#!/usr/bin/env node
// Turn one or more hero video clips (played in order) into a scroll-scrub image sequence.
//
//   node scripts/make-frames.mjs clip-1.mp4 clip-2.mp4 [--frames 288] [--out public/frames/hero]
//
// Writes public/frames/hero/d-0001.webp… (desktop, 2400w), m-0001.webp… (mobile, 1200w)
// and manifest.json, which the hero picks up automatically.

import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import ffmpeg from "@ffmpeg-installer/ffmpeg";

const args = process.argv.slice(2);
const fi = args.indexOf("--frames");
const target = fi >= 0 ? Number(args.splice(fi, 2)[1]) : 288;
const oi = args.indexOf("--out");
const outArg = oi >= 0 ? args.splice(oi, 2)[1] : "public/frames/hero";
const clips = args.map((p) => resolve(p));
if (!clips.length) {
  console.error("Usage: node scripts/make-frames.mjs clip-1.mp4 [clip-2.mp4 …] [--frames 288]");
  process.exit(1);
}

const run = (a) => execFileSync(ffmpeg.path, ["-hide_banner", "-loglevel", "error", "-y", ...a], { stdio: "inherit" });
const duration = (file) => {
  const out = spawnSync(ffmpeg.path, ["-hide_banner", "-i", file], { encoding: "utf8" }).stderr;
  const m = out.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
  if (!m) throw new Error(`Could not read duration of ${file}`);
  return +m[1] * 3600 + +m[2] * 60 + +m[3];
};

const work = mkdtempSync(join(tmpdir(), "zaro-frames-"));
const outDir = resolve(outArg);
mkdirSync(outDir, { recursive: true });
// Clear only frames this script made before, never anything else in the folder.
for (const f of readdirSync(outDir)) if (/^[dm]-\d{4}\.webp$|^manifest\.json$/.test(f)) rmSync(join(outDir, f));

// 1. Join clips into one continuous 4K stream (upscale the clips first for crisp frames).
const joined = join(work, "joined.mp4");
const inputs = clips.flatMap((c) => ["-i", c]);
const filter =
  clips.map((_, i) => `[${i}:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,setsar=1,fps=24[v${i}]`).join(";") +
  `;${clips.map((_, i) => `[v${i}]`).join("")}concat=n=${clips.length}:v=1:a=0[out]`;
run([...inputs, "-filter_complex", filter, "-map", "[out]", "-c:v", "libx264", "-crf", "12", "-pix_fmt", "yuv420p", joined]);

// 2. Sample evenly to the target frame count.
const fps = (target / duration(joined)).toFixed(4);
const stills = join(work, "stills");
mkdirSync(stills);
run(["-i", joined, "-vf", `fps=${fps}`, "-q:v", "2", join(stills, "f-%04d.jpg")]);
const files = readdirSync(stills).filter((f) => f.endsWith(".jpg")).sort();

// 3. Compress to WebP at two sizes.
files.forEach((f, i) => {
  const n = String(i + 1).padStart(4, "0");
  const src = join(stills, f);
  execFileSync("cwebp", ["-quiet", "-q", "80", "-resize", "2400", "0", src, "-o", join(outDir, `d-${n}.webp`)]);
  execFileSync("cwebp", ["-quiet", "-q", "74", "-resize", "1200", "0", src, "-o", join(outDir, `m-${n}.webp`)]);
});

writeFileSync(
  join(outDir, "manifest.json"),
  JSON.stringify({ count: files.length, pattern: "d-%04d.webp", mobilePattern: "m-%04d.webp", width: 2400, height: 1350 }, null, 2),
);
rmSync(work, { recursive: true, force: true });
console.log(`Wrote ${files.length} frames to ${outDir}`);
