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

const education = defineCollection({
  loader: glob({ pattern: "**/*.{mdx,md}", base: "./src/contents/education" }),
  schema: z.object({
    title: z.string(),
    institution: z.string(),
    location: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.{mdx,md}", base: "./src/contents/experience" }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    type: z.string().optional(),
    location: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
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
  education,
  experience,
  awards,
};
