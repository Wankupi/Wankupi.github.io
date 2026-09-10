<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps<{
  title: string;
  authors?: string;
  venue: string;
  link?: string;
  code?: string;
  status?: "published" | "accepted" | "under-review";
}>();

const statusText: Record<NonNullable<typeof props.status>, string> = {
  published: "Published",
  accepted: "Accepted",
  "under-review": "Under Review"
};
</script>

<template>
  <article class="pub-card">
    <header class="info-header">
      <div class="title-row">
        <Icon class="title-icon" icon="material-symbols:article-rounded" width="1.1em"></Icon>
        <h3 class="title">
          <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">{{ title }}</a>
          <template v-else>{{ title }}</template>
        </h3>
      </div>
      <p class="venue">
        {{ venue }}<template v-if="status"> · {{ statusText[status] }}</template>
      </p>
    </header>

    <p v-if="$slots.authors || authors" class="authors">
      <slot name="authors">{{ authors }}</slot>
    </p>

    <div class="actions" v-if="link || code">
      <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">Paper</a>
      <a v-if="code" :href="code" target="_blank" rel="noopener noreferrer">Code</a>
    </div>

    <div class="details"><slot></slot></div>
  </article>
</template>

<style scoped>
.pub-card {
  padding: 0.7rem 0.9rem;
  margin: 0.25rem 0 0.55rem;
  border: 1px solid color-mix(in srgb, var(--theme-color) 10%, transparent);
  border-radius: 0.9rem;
  background: var(--card-bg-color);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--text-color) 6%, transparent);
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.pub-card:hover {
  box-shadow: 0 4px 12px color-mix(in srgb, var(--text-color) 10%, transparent);
  border-color: color-mix(in srgb, var(--theme-color) 22%, transparent);
}

.info-header {
  margin-bottom: 0.15rem;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
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

.venue {
  margin: 0.15rem 0 0;
  font-size: 0.84rem;
  color: color-mix(in srgb, var(--text-color) 66%, transparent);
}

.authors {
  margin: 0.15rem 0 0;
  line-height: 1.5;
  font-size: 0.92rem;
  color: color-mix(in srgb, var(--text-color) 86%, transparent);
}

.actions {
  margin-top: 0.3rem;
  display: flex;
  gap: 0.55rem;
  font-size: 0.82rem;
}

.actions a {
  color: var(--theme-color);
  text-decoration: none;
}

.actions a:hover {
  text-decoration: underline;
}

.details {
  margin-top: 0.15rem;
}

@media (orientation: portrait) {
  .pub-card {
    padding: 0.6rem 0.7rem;
    margin: 0.15rem 0 0.45rem;
  }
}
</style>