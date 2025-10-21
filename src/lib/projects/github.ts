import { GITHUB_API_TOKEN } from "astro:env/server";
import type { ProjectDetails } from ".";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

export async function getRepo(
  owner: string,
  repo: string,
): Promise<ProjectDetails> {
  const latestRelease = await octokit.repos
    .getLatestRelease({
      owner,
      repo,
    })
    .catch(console.info);
  const info = await octokit.repos
    .get({
      owner,
      repo,
    })
    .catch(console.info);

  const isPrivate = info ? info.data.private : false;

  const latest: {
    version: string;
    url?: string;
  } = {
    version: "Unreleased",
  };

  if (latestRelease) {
    latest.version = latestRelease.data.tag_name;

    if (!isPrivate) latest.url = latestRelease.data.html_url;
  }

  return {
    latest,
  };
}
