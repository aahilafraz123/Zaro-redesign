# Zaro, minimal edition

A separate, black-and-white take on the Zaro site, built from scratch to present as an alternative.
It shares nothing with the main Next.js build in the repo root.

- **Stack:** Astro, plain CSS, GSAP ScrollTrigger, Lenis.
- **Live:** https://aahilafraz123.github.io/Zaro-redesign/minimal/
- **Palette:** black, white, greys, and one muted blood red (`#b5162b`) used sparingly.

## Hero: scroll-scrubbed footage

The hero plays an image sequence tied to scroll position (`src/scripts/hero.ts`).
Until real footage exists it draws the same shot in code (drop → inside the blood → score ring).

To swap in AI footage (e.g. Higgsfield clips):

```bash
npm install
node scripts/make-frames.mjs path/to/clip-1.mp4 path/to/clip-2.mp4 --frames 160
```

This writes `public/frames/hero/` (desktop and mobile WebP frames plus `manifest.json`).
The hero detects the manifest and switches to the frames automatically.

## Develop

```bash
npm install
npm run dev
```
