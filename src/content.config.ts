import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{mdx,md}", base: "./src/projects" }),
  schema: z.object({
    title: z.string(),
    repoProvider: z.enum(["github"]),
    repoOwner: z.string(),
    repoName: z.string(),
    href: z.string().optional(),
    releaseHref: z.string().optional(),

    sortOrder: z.number(),
    archived: z.boolean().optional().default(false),
  }),
});

export const collections = {
  projects,
};
