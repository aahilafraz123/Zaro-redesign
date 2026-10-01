# Zaro, minimal edition

A separate, black-and-white take on the Zaro site, built from scratch to present as an alternative.
It shares nothing with the main Next.js build in the repo root.

- **Stack:** Astro, plain CSS, GSAP ScrollTrigger, Lenis, HTML video.
- **Live:** https://aahilafraz123.github.io/Zaro-redesign/minimal/
- **Palette:** black, white, greys, and one muted blood red (`#b5162b`) used sparingly.

## Hero: staged footage

The hero plays as one film: the first scroll runs the drop diving into the blood and the cells gathering
into the score ring without stopping, then the page glides on into the next section
(`src/scripts/hero.ts`). Scrolling again mid-film hurries it; afterwards the hero is a normal section
resting on the score, and scrolling up past the top rewinds the film to the drop. The next section arrives black and brightens
to white as it scrolls in, with the hero's bottom edge fading to match.
Footage was generated with Higgsfield (Kling 3.0 Pro) and upscaled to 4K with Topaz.

To rebuild the media from the 4K masters:

```bash
npm install
node scripts/make-hero-video.mjs drop-to-cells-4k.mp4 cells-to-ring-4k.mp4
```

This writes `public/hero/`: the two transitions, forward and reversed, at 2560 and 1280 wide, plus the opening and
closing stills at 3840 and 1920 wide. Add `--stills-only` to redo just the stills.

## Develop

```bash
npm install
npm run dev
```
