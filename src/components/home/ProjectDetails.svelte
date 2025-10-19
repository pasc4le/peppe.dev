<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { detailsStore } from "./ProjectDetails.store";
  import Icon from "@iconify/svelte";

  const platformIconMapper = {
    github: "mdi:github",
    npm: "mdi:npm",
    ghcr: "mdi:github",
    docker: "mdi:docker",
  };

  const { project }: { project: CollectionEntry<"projects"> } = $props();
  let details = $derived(
    project.id in $detailsStore ? $detailsStore[project.id] : undefined,
  );
</script>

{#if details}
  {#if details.private}
    <span
      class="text-xs rounded-full border-1 border-bblack-100 px-1 ignore-click"
    >
      Private
    </span>
  {:else}
    <a href={details.latest?.url ?? "#"} class="link text-xs ignore-click">
      {details.latest.version}
    </a>
  {/if}
  <a href={!details.private ? project.data?.href : "#"}>
    <Icon
      icon={platformIconMapper[project.data.repoProvider]}
      class="ignore-click"
    />
  </a>
{/if}
