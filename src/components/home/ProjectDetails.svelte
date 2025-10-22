<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { detailsStore } from "./ProjectDetails.store";
  import Icon from "@iconify/svelte";
  import moment from "moment";

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
  {#if project.data.private}
    <span
      class="text-xs rounded-full border-1 border-bblack-100 dark:border-bblack-700 dark:text-bblack-400 px-1 ignore-click"
    >
      Private
    </span>
  {:else if details.latest.version != "Unreleased"}
    <a
      href={project.data.releaseHref ?? details.latest?.url ?? "#"}
      class="text-xs ignore-click link"
    >
      {details.latest.version}
    </a>
  {/if}
  {#if project.data.override_creationDate || details.activity.createdAt}
    <span class="text-xs dark:text-bblack-400">
      {moment(
        project.data.override_creationDate ?? details.activity.createdAt,
      ).format("MMM Y")}
    </span>
  {/if}
  <a href={project.data?.repoHref ?? "#"} class="opacity-80 hover:opacity-100">
    <Icon
      icon={platformIconMapper[project.data.repoProvider]}
      class="ignore-click"
    />
  </a>
{/if}
