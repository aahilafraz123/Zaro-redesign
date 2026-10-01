import type { CollectionEntry } from "astro:content";

// Paths that respect the GitHub Pages base (/Zaro-redesign/minimal/) and trailing slashes.
export const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
export const url = (path = "") => `${base}${path.replace(/^\//, "")}`;

export const BUY = "https://zarohealth.com/pricing";

// Everything a journal entry hands to <Cover />.
export const coverProps = (d: CollectionEntry<"journal">["data"]) => ({
  glyph: d.glyph,
  caption: d.caption,
  topic: d.topic,
  image: d.cover,
  imageTone: d.coverTone,
  focus: d.coverFocus,
});

export const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
