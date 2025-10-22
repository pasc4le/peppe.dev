import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{mdx,md}", base: "./src/contents/projects" }),
  schema: z.object({
    title: z.string(),
    repoProvider: z.enum(["github"]),
    repoOwner: z.string(),
    repoName: z.string(),
    repoHref: z.string().optional(),
    releaseHref: z.string().optional(),
    archiveHref: z.string().optional(),
    private: z.boolean().optional().default(false),
    archived: z.boolean().optional().default(false),

    override_creationDate: z.date().optional(),
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
