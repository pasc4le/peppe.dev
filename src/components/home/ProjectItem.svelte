<script lang="ts">
  import type { CollectionEntry } from "astro:content";

  export let project: CollectionEntry<"projects">;

  let open: boolean = false;
</script>

<div
  class="py-1 my-1 border-b-1 border-bblack-100 dark:border-bblack-800 cursor-pointer"
  on:click={() => (open = !open)}
  on:keyup={(e) => e.key == "Enter" && (open = !open)}
  role="button"
  tabindex="0"
>
  <h3 class="font-medium font-mono">
    {project.data.title}
  </h3>
  {#if open}
    <slot />
  {/if}
</div>
