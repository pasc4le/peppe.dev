import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{mdx,md}", base: "./src/contents/projects" }),
  schema: z.object({
    title: z.string(),
    repoProvider: z.enum(["github"]),
    repoOwner: z.string(),
    repoName: z.string(),
    href: z.string().optional(),
    releaseHref: z.string().optional(),
    archived: z.boolean().optional().default(false),
  }),
});

const awards = defineCollection({
  loader: glob({ pattern: "**/*.{mdx,md}", base: "./src/contents/awards" }),
  schema: z.object({
    title: z.string(),
    href: z.string().optional(),
    date: z.coerce.date(),
  }),
});

export const collections = {
  projects,
  awards,
};
