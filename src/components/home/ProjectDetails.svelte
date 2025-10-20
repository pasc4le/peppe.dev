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
      class="text-xs rounded-full border-1 border-bblack-100 dark:border-bblack-700 dark:text-bblack-400 px-1 ignore-click"
    >
      Private
    </span>
  {:else}
    <a
      href={project.data.releaseHref ?? details.latest?.url ?? "#"}
      class={[
        "text-xs ignore-click",
        details.latest.version == "Unreleased" ? "text-bblack-500" : "link",
      ]}
    >
      {details.latest.version}
    </a>
  {/if}
  <a href={!details.private ? project.data?.repoHref : "#"}>
    <Icon
      icon={platformIconMapper[project.data.repoProvider]}
      class="ignore-click"
    />
  </a>
{/if}
