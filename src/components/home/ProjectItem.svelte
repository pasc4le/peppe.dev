<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import ProjectDetails from "./ProjectDetails.svelte";

  export let project: CollectionEntry<"projects">;

  let open: boolean = false;

  const openProject = (e: MouseEvent | KeyboardEvent) => {
    console.log((e.target as HTMLElement)?.tagName);

    if (
      e.target &&
      !(e.target as HTMLElement)?.classList.contains("ignore-click")
    )
      open = !open;
  };
</script>

<div
  class="py-1 my-1 border-b-1 border-bblack-100 dark:border-bblack-800 cursor-pointer select-none"
>
  <div
    class="flex items-center"
    on:click={openProject}
    on:keyup={(e) => e.key == "Enter" && openProject(e)}
    role="button"
    tabindex="0"
  >
    <h3 class="font-sans font-medium">
      {project.data.title}
    </h3>

    <div class="ml-auto flex gap-1 items-center">
      <ProjectDetails {project} />
    </div>
  </div>
  {#if open}
    <div class="my-2">
      <slot />
    </div>
  {/if}
</div>
