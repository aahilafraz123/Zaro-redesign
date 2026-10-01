# Zaro, minimal edition

A separate, black-and-white take on the Zaro site, built from scratch to present as an alternative.
It shares nothing with the main Next.js build in the repo root.

- **Stack:** Astro, plain CSS, GSAP ScrollTrigger, Lenis, HTML video.
- **Live:** https://aahilafraz123.github.io/Zaro-redesign/minimal/
- **Palette:** black, white, greys, and one muted blood red (`#b5162b`) used sparingly.

## Hero: staged footage

The hero is three scenes (the drop, inside the blood, the score ring). One scroll gesture moves one
step; each transition is a short video clip played forward or reversed at a fixed speed, and the middle
scene runs a seamless ambient loop (`src/scripts/hero.ts`). Footage was generated with Higgsfield
(Kling 3.0 Pro) and upscaled to 4K with Topaz.

To rebuild the media from new clips:

```bash
npm install
node scripts/make-hero-video.mjs drop-to-cells.mp4 cells-to-ring.mp4 cells-loop.mp4
```

This writes `public/hero/`: forward and reversed transitions at 2560 and 1280 wide, the loop, and a
still for each scene (used as posters and for reduced motion).

## Develop

```bash
npm install
npm run dev
```
