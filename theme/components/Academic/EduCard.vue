<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";

type CardStatus = "ongoing" | "completed" | "planned";

const props = defineProps<{
  title: string;
  time: string;
  description?: string;
  icon?: string;
  status?: CardStatus;
  tags?: string[];
  link?: string;
  variant?: "default" | "compact";
}>();

const statusText = computed(() => {
  if (!props.status) {
    return null;
  }

  return (
    {
      ongoing: "Ongoing",
      completed: "Completed",
      planned: "Planned"
    } as const
  )[props.status];
});
</script>

<template>
  <article class="show-card" :class="[variant || 'default']">
    <div class="main-info">
      <div class="icon-wrap">
        <Icon :icon="icon || 'material-symbols:school'" width="1.25em"></Icon>
      </div>

      <div class="content-wrap">
        <header class="info-header">
          <div class="title-row">
            <h3 class="title">
              <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">{{ title }}</a>
              <template v-else>{{ title }}</template>
            </h3>
            <span v-if="statusText" class="status" :class="status">{{ statusText }}</span>
            <span class="time">{{ time }}</span>
          </div>
        </header>

        <p v-if="description" class="description">{{ description }}</p>

        <div class="details"><slot></slot></div>

        <div v-if="tags?.length" class="tags">
          <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

      </div>
    </div>
  </article>
</template>

<style scoped>
.show-card {
  padding: 0.85rem 1rem;
  margin: 0.25rem 0 0.55rem;
  border: 1px solid color-mix(in srgb, var(--theme-color) 10%, transparent);
  border-radius: 0.9rem;
  background: var(--card-bg-color);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--text-color) 6%, transparent);
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.show-card:hover {
  box-shadow: 0 4px 12px color-mix(in srgb, var(--text-color) 10%, transparent);
  border-color: color-mix(in srgb, var(--theme-color) 22%, transparent);
}


.show-card.compact {
  padding: 0.65rem 0.8rem;
}

.main-info {
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 0.7rem;
  align-items: start;
}

.icon-wrap {
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  color: var(--theme-color);
  background-color: color-mix(in srgb, var(--theme-color) 16%, var(--card-bg-color));
  border-radius: 0.65rem;
}

.content-wrap {
  min-width: 0;
}

.info-header {
  margin-bottom: 0.25rem;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.title {
  margin: 0;
  line-height: 1.3;
  font-size: 1.05rem;
  font-weight: 700;
  font-family: var(--font-serif);
  color: var(--text-title-color);
}

.title a {
  color: inherit;
  text-decoration: none;
}

.title a:hover {
  color: var(--theme-color);
}

.time {
  margin-left: auto;
  font-size: 0.82rem;
  color: color-mix(in srgb, var(--text-color) 60%, transparent);
  white-space: nowrap;
}

.description {
  margin: 0 0 0.35rem;
  font-size: 0.9rem;
  color: color-mix(in srgb, var(--text-color) 78%, transparent);
}

.status {
  padding: 0.15rem 0.52rem;
  border-radius: 999px;
  font-size: 0.74rem;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: 0.02em;
  border: 1px solid transparent;
}

.status.ongoing {
  color: var(--theme-color);
  background-color: color-mix(in srgb, var(--theme-color) 14%, var(--card-bg-color));
  border-color: color-mix(in srgb, var(--theme-color) 30%, transparent);
}

.status.completed {
  color: color-mix(in srgb, var(--theme-color) 72%, var(--text-color));
  background-color: color-mix(in srgb, var(--theme-color) 12%, var(--card-bg-color));
  border-color: color-mix(in srgb, var(--theme-color) 25%, transparent);
}

.status.planned {
  color: color-mix(in srgb, var(--text-color) 86%, var(--theme-color));
  background-color: color-mix(in srgb, var(--theme-color) 10%, var(--card-bg-color));
  border-color: color-mix(in srgb, var(--theme-color) 22%, transparent);
}

.details {
  margin-top: 0.25rem;
}

.details :deep(ul),
.details :deep(ol) {
  margin: 0.3rem 0 0;
  padding-left: 1rem;
}

.details :deep(li) {
  margin: 0.1rem 0;
}

.tags {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.tag {
  padding: 0.1rem 0.5rem;
  border-radius: 0.45rem;
  font-size: 0.76rem;
  color: color-mix(in srgb, var(--text-color) 80%, transparent);
  background: color-mix(in srgb, var(--theme-color) 9%, var(--card-bg-color));
}


@media (orientation: portrait) {
  .show-card {
    padding: 0.65rem 0.75rem;
    margin: 0.15rem 0 0.45rem;
  }

  .main-info {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }

  .icon-wrap {
    width: 1.75rem;
    height: 1.75rem;
  }
}
</style>
