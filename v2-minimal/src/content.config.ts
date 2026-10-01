import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const journal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/journal" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    topic: z.enum(["Testing basics", "Heart", "Cost", "Inside Zaro"]),
    glyph: z.string(),
    caption: z.string(),
    // Optional photo behind the cover; the glyph and caption sit on top of it.
    cover: image().optional(),
    coverAlt: z.string().optional(),
    coverTone: z.enum(["dark", "light"]).default("dark"),
    // CSS object-position, so the subject survives each card's crop.
    coverFocus: z.string().default("50% 50%"),
    measuredIn: z.enum(["Surface", "Signal", "Source"]).optional(),
    // Only set when a clinician has actually reviewed the article.
    reviewer: z.string().optional(),
    disclaimer: z.string().optional(),
  }),
});

export const collections = { journal };
