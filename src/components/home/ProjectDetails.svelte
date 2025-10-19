<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { detailsStore } from "./ProjectDetails.store";
  import Icon from "@iconify/svelte";

  const { project }: { project: CollectionEntry<"projects"> } = $props();
  let details = $derived(
    project.id in $detailsStore ? $detailsStore[project.id] : undefined,
  );
</script>

{#if details}
  <p>{details.private}</p>
{/if}
