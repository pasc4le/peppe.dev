export const prerender = false;

import { getProjectDetails, type ProjectDetails } from "@/lib/projects";
import { getCollection } from "astro:content";

export async function GET() {
  const projects = await getCollection("projects");
  const details: Record<string, ProjectDetails> = {};

  for (const project of projects) {
    const result = await getProjectDetails(project.data);
    if (result) details[project.id] = result;
  }

  return new Response(JSON.stringify(details), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
