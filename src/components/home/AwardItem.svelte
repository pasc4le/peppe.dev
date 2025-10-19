<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import moment from "moment";

  export let award: CollectionEntry<"awards">;

  let open: boolean = false;

  const openProject = (e: MouseEvent | KeyboardEvent) => {
    if (
      e.target &&
      !(e.target as HTMLElement)?.classList.contains("ignore-click")
    )
      open = !open;
  };

  const date = moment(award.data.date);
  console.log(date);
</script>

<div
  class="py-1 my-1 border-b-1 border-bblack-100 dark:border-bblack-800 cursor-pointer select-none"
  on:click={openProject}
  on:keyup={(e) => e.key == "Enter" && openProject(e)}
  role="button"
  tabindex="0"
>
  <div class="flex items-center">
    <h3 class="font-sans font-medium">
      {award.data.title}
    </h3>
    <span class="ml-auto opacity-70 text-sm">
      {date.format("Do MMM Y")}
    </span>
  </div>
  {#if open}
    <div class="mt-2">
      <slot />
    </div>
  {/if}
</div>
