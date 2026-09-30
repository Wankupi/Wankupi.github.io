<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  title: string;
  authors?: string;
  venue: string;
  link?: string;
  code?: string;
}>();
</script>

<template>
  <div class="pub-item">
    <Icon class="bullet" icon="material-symbols:article-rounded" width="1.05em"></Icon>
    <div class="body">
      <div class="title">
        <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">{{ title }}</a>
        <template v-else>{{ title }}</template>
      </div>
      <div v-if="$slots.authors || authors" class="authors">
        <slot name="authors">{{ authors }}</slot>
      </div>
      <div class="meta">
        <span class="venue">{{ venue }}</span>
        <span v-if="link || code" class="actions">
          <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">[Paper]</a>
          <a v-if="code" :href="code" target="_blank" rel="noopener noreferrer">[Code]</a>
        </span>
      </div>
      <div v-if="$slots.default" class="details"><slot></slot></div>
    </div>
  </div>
</template>

<style scoped>
.pub-item {
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

.authors {
  font-size: 0.92rem;
  color: color-mix(in srgb, var(--text-color) 86%, transparent);
}

.authors :deep(p) {
  margin: 0;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 0.4rem;
  font-size: 0.92rem;
}

.venue {
  font-style: italic;
  color: color-mix(in srgb, var(--text-color) 85%, transparent);
}

.actions {
  display: inline-flex;
  gap: 0.35rem;
  margin-left: 0.2rem;
}

.actions a {
  color: var(--theme-color);
  text-decoration: none;
}

.actions a:hover {
  text-decoration: underline;
}

.details {
  font-size: 0.92rem;
  color: color-mix(in srgb, var(--text-color) 78%, transparent);
}

.details :deep(p) {
  margin: 0;
}
</style>
