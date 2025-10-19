<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import ProjectDetails from "./ProjectDetails.svelte";

  export let project: CollectionEntry<"projects">;

  const platformIconMapper = {
    github: "mdi:github",
    npm: "mdi:npm",
    ghcr: "mdi:github",
    docker: "mdi:docker",
  };

  let open: boolean = false;
</script>

<div
  class="py-1 my-1 border-b-1 border-bblack-100 dark:border-bblack-800 cursor-pointer"
  on:click={() => (open = !open)}
  on:keyup={(e) => e.key == "Enter" && (open = !open)}
  role="button"
  tabindex="0"
>
  <div class="flex items-center">
    <h3 class="font-sans font-medium">
      {project.data.title}
    </h3>

    <div class="ml-auto">
      <ProjectDetails {project} />
    </div>
  </div>
  {#if open}
    <div class="mt-2">
      <slot />
    </div>
  {/if}
</div>
