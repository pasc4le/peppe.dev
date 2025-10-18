<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import Icon from "@iconify/svelte";

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
  <div class="flex justify-center">
    <h3 class="font-mono tracking-tight">
      {project.data.title}
    </h3>

    <Icon icon="mdi:chevron-right" class="ml-auto" />
  </div>
  {#if open}
    <div class="mt-2">
      <slot />
    </div>
  {/if}
</div>
