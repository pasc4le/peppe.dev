import type { CollectionEntry } from "astro:content";
import * as github from "./github.ts";
import { db, eq, ProjectDetailsCache } from "astro:db";

export interface ProjectDetails {
  latest: {
    version: string;
    url?: string;
  };
}

type Project = CollectionEntry<"projects">;

const getThresholdDate = (delta: number = 43_200_000 /* 12h */) => {
  return +Date.now() - delta;
};

export async function getCache(
  project: Project,
): Promise<ProjectDetails | undefined> {
  const result = await db
    .select()
    .from(ProjectDetailsCache)
    .where(eq(ProjectDetailsCache.id, project.id))
    .limit(1);
  if (result.length == 0) return undefined;

  const cache = result[0];
  if (+cache.ts < getThresholdDate()) return undefined;

  return cache.data as ProjectDetails;
}

export async function setCache(project: Project, details: ProjectDetails) {
  const cache = {
    data: details,
    ts: new Date(),
  };

  await db
    .insert(ProjectDetailsCache)
    .values({
      id: project.id,
      ...cache,
    })
    .onConflictDoUpdate({
      target: ProjectDetailsCache.id,
      set: cache,
    });
}

export async function getSourceDetails(
  project: Project,
): Promise<ProjectDetails | undefined> {
  switch (project.data.repoProvider) {
    case "github":
      return github.getRepo(project.data.repoOwner, project.data.repoName);
  }

  return undefined;
}

export async function getProjectDetails(
  project: Project,
): Promise<ProjectDetails | undefined> {
  const cache = await getCache(project);
  if (cache) return cache;

  const details = await getSourceDetails(project);

  if (details) await setCache(project, details);

  return details;
}
