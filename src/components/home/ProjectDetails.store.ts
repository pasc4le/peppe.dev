import type { ProjectDetails } from "@/lib/projects";
import { writable } from "svelte/store";

const createDetailsStore = () => {
  const store = writable<Record<string, ProjectDetails>>({});

  (async () => {
    const data = await fetch("/projects/details.json")
      .then((r) => r.json())
      .catch(console.error);

    if (data) store.set(data);
  })();

  return store;
};

export const detailsStore = createDetailsStore();
