# Zaro Redesign

A redesign concept for the [zarohealth.com](https://zarohealth.com) landing page.

**Live preview:** https://aahilafraz123.github.io/Zaro-redesign/

The goal: keep Zaro's brand (teal `#069494`, warm sand, Inclusive Sans / Quicksand / DM Mono,
the face film, the score and panel modules) and make the page instantly clear. A visitor should
know in five seconds what Zaro is, what they get, and what it costs.

- [`research/strategy.md`](research/strategy.md): what Zaro is, what the current page does well,
  what holds it back, positioning, page architecture and the psychology behind each section.
- [`research/subpages.md`](research/subpages.md): every fact pulled from the live site
  (panels, biomarkers, prices, FAQ, process), which all copy on the redesign is sourced from.

## Page structure

Nav → Hero (3D layered stage) → The problem (scroll-scrubbed) → How it works (pinned phone story)
→ Zaro Score bento → Daily plan (interactive reminder demo) → Panels + coverage → Two paths
→ Wearables → FSA/HSA → Labs, privacy, medical director → FAQ → Final CTA → Footer.

## Stack

Next.js (static export), Tailwind CSS v4, shadcn/ui (Tabs, Accordion), React Bits text animations
(BlurText, ScrollReveal, CountUp) via the shadcn registry, GSAP ScrollTrigger, Motion, Lenis.

## Run it

```bash
npm install
npm run dev
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/pages.yml`.

## Dev tooling

Project-scoped MCP servers live in `.mcp.json` (shadcn, Chrome DevTools). The `gpt-taste`
design skill is checked in under `.agents/skills/gpt-taste`.
