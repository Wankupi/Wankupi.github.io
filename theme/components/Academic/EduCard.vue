<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  title: string;
  time: string;
  description?: string;
  icon?: string;
  tags?: string[];
  link?: string;
  variant?: "default" | "compact";
}>();
</script>

<template>
  <article class="show-card" :class="[variant || 'default']">
    <header class="info-header">
      <div class="title-row">
        <Icon class="title-icon" :icon="icon || 'material-symbols:school'" width="1.1em"></Icon>
        <h3 class="title">
          <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">{{ title }}</a>
          <template v-else>{{ title }}</template>
        </h3>
        <span class="time">{{ time }}</span>
      </div>
    </header>

    <p v-if="description" class="description">{{ description }}</p>

    <div class="details"><slot></slot></div>

    <div v-if="tags?.length" class="tags">
      <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
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

.info-header {
  margin-bottom: 0.15rem;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.title-icon {
  flex: none;
  color: var(--theme-color);
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

.details {
  margin-top: 0.15rem;
  font-size: 0.9rem;
  color: color-mix(in srgb, var(--text-color) 78%, transparent);
}

.details :deep(p) {
  margin: 0;
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
}
</style>
