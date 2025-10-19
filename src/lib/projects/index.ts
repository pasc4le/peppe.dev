import type { CollectionEntry } from "astro:content";
import * as github from "./github.ts";

export interface ProjectDetails {
  private: boolean;
  latest: {
    version: string;
    url?: string;
  };
}

export async function getProjectDetails(
  project: CollectionEntry<"projects">["data"],
): Promise<ProjectDetails | undefined> {
  switch (project.repoProvider) {
    case "github":
      return github.getRepo(project.repoOwner, project.repoName);
  }

  return undefined;
}
