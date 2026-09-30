<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  title: string;
  time: string;
  description?: string;
  icon?: string;
  link?: string;
}>();
</script>

<template>
  <div class="edu-item">
    <Icon class="bullet" :icon="icon || 'material-symbols:school'" width="1.05em"></Icon>
    <div class="body">
      <div class="head">
        <span class="title">
          <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">{{ title }}</a>
          <template v-else>{{ title }}</template>
        </span>
        <span class="time">{{ time }}</span>
      </div>
      <div v-if="description" class="description">{{ description }}</div>
      <div v-if="$slots.default" class="details"><slot></slot></div>
    </div>
  </div>
</template>

<style scoped>
.edu-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  margin: 0.2rem 0 0.75rem;
  line-height: 1.5;
}

.bullet {
  flex: none;
  /* align with the first line of the title */
  margin-top: 0.22em;
  color: var(--theme-color);
}

.body {
  flex: 1;
  min-width: 0;
}

.head {
  display: flex;
  align-items: baseline;
  gap: 0.25rem 0.75rem;
  flex-wrap: wrap;
}

.title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
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
  font-size: 0.88rem;
  font-variant-numeric: tabular-nums;
  color: color-mix(in srgb, var(--text-color) 60%, transparent);
  white-space: nowrap;
}

.description {
  font-size: 0.92rem;
  font-style: italic;
  color: color-mix(in srgb, var(--text-color) 85%, transparent);
}

.details {
  font-size: 0.92rem;
  color: color-mix(in srgb, var(--text-color) 78%, transparent);
}

.details :deep(p) {
  margin: 0;
}
</style>
