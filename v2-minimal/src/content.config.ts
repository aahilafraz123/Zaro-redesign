import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const journal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    topic: z.enum(["Testing basics", "Heart", "Cost", "Inside Zaro"]),
    glyph: z.string(),
    caption: z.string(),
    measuredIn: z.enum(["Surface", "Signal", "Source"]).optional(),
    // Only set when a clinician has actually reviewed the article.
    reviewer: z.string().optional(),
    disclaimer: z.string().optional(),
  }),
});

export const collections = { journal };
