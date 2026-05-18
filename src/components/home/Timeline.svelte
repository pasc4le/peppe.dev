<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import moment from "moment";

  interface Props {
    entry: CollectionEntry<"education"> | CollectionEntry<"experience">;
    subtitle: string;
    type?: string;
    startDate: Date;
    endDate?: Date;
  }

  let { entry, subtitle, type, startDate, endDate }: Props = $props();

  const fmt = (d: Date) => moment(d).format("MMM Y");
</script>

<div class="relative pl-8 timeline-item">
  <!-- dot -->
  <div
    class="absolute left-[9px] top-0 w-3 h-3 rounded-full bg-bblack-300 dark:bg-bblack-600 ring-2 ring-white dark:ring-bblack-950 z-10"
  ></div>

  <!-- content -->
  <div class="pb-5">
    <div class="flex items-baseline">
      <h3 class="font-sans font-medium text-sm">
        {entry.data.title}
      </h3>
      <span
        class="ml-auto text-xs text-bblack-300 dark:text-bblack-600 shrink-0"
      >
        {fmt(startDate)} &mdash; {endDate ? fmt(endDate) : "Present"}
      </span>
    </div>
    <p
      class="text-xs text-bblack-400 dark:text-bblack-500 flex items-center gap-1"
    >
      {subtitle}
      {#if type}
        <span
          class="text-[0.625rem] rounded-full border-1 border-bblack-100 dark:border-bblack-700 dark:text-bblack-400 px-1 leading-normal"
        >
          {type}
        </span>
      {/if}
    </p>
    <div class="mt-1 text-sm text-bblack-600 dark:text-bblack-400">
      <slot />
    </div>
  </div>
</div>

<style>
  .timeline-item::before {
    content: "";
    position: absolute;
    left: 14.5px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: repeating-linear-gradient(
      to bottom,
      var(--color-bblack-800) 0,
      var(--color-bblack-800) 3px,
      transparent 3px,
      transparent 6px
    );
  }

  :global(.dark) .timeline-item::before {
    background: repeating-linear-gradient(
      to bottom,
      var(--color-bblack-700) 0,
      var(--color-bblack-700) 3px,
      transparent 3px,
      transparent 6px
    );
  }

  /* last item: line stops at the dot's center */
  .timeline-item:last-child::before {
    bottom: auto;
    height: 0.375rem;
  }
</style>
