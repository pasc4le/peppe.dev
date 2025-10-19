export const prerender = false;

import { getProjectDetails } from "@/lib/projects";
import { getEntry } from "astro:content";

export async function GET({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;
  const project = await getEntry("projects", id);

  if (!project) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const details = await getProjectDetails(project.data);

  return new Response(JSON.stringify(details), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
