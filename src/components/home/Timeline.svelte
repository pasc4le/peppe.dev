<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import moment from "moment";

  interface Props {
    entry: CollectionEntry<"education"> | CollectionEntry<"experience">;
    subtitle: string;
    startDate: Date;
    endDate?: Date;
  }

  let { entry, subtitle, startDate, endDate }: Props = $props();

  const fmt = (d: Date) => moment(d).format("MMM Y");
</script>

<div class="relative pl-6 pb-4 timeline-item">
  <!-- dot -->
  <div
    class="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-bblack-300 dark:bg-bblack-600 ring-2 ring-white dark:ring-bblack-950"
  ></div>

  <!-- content -->
  <div>
    <h3 class="font-sans font-medium text-sm">
      {entry.data.title}
    </h3>
    <p class="text-xs text-bblack-400 dark:text-bblack-500">
      {subtitle}
    </p>
    <p class="text-xs text-bblack-300 dark:text-bblack-600 mt-0.5">
      {fmt(startDate)} &mdash; {endDate ? fmt(endDate) : "Present"}
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
    left: 4.5px;
    top: 14px;
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

  .timeline-item:last-child::before {
    display: none;
  }
</style>
