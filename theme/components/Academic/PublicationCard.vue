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
    <div class="pub-main">
      <div class="icon-wrap">
        <Icon icon="material-symbols:article-rounded" width="1.25em"></Icon>
      </div>

      <div class="content-wrap">
        <header class="info-header">
          <h3 class="title">
            <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">{{ title }}</a>
            <template v-else>{{ title }}</template>
          </h3>

          <div class="meta-row">
            <span v-if="status" class="status" :class="status">{{ statusText[status] }}</span>
            <span class="venue">{{ venue }}</span>
          </div>
        </header>

        <p v-if="$slots.authors || authors" class="authors">
          <slot name="authors">{{ authors }}</slot>
        </p>

        <div class="actions" v-if="link || code">
          <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">Paper</a>
          <a v-if="code" :href="code" target="_blank" rel="noopener noreferrer">Code</a>
        </div>

        <div class="details"><slot></slot></div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.pub-card {
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

.pub-card:hover {
  box-shadow: 0 4px 12px color-mix(in srgb, var(--text-color) 10%, transparent);
  border-color: color-mix(in srgb, var(--theme-color) 22%, transparent);
}

.pub-main {
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

.title {
  margin: 0;
  line-height: 1.35;
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

.meta-row {
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.venue {
  font-size: 0.84rem;
  color: color-mix(in srgb, var(--text-color) 74%, transparent);
}

.year {
  font-size: 0.8rem;
  color: color-mix(in srgb, var(--text-color) 66%, transparent);
}

.authors {
  margin: 0;
  line-height: 1.55;
  font-size: 0.92rem;
  color: color-mix(in srgb, var(--text-color) 86%, transparent);
}

.actions {
  margin-top: 0.42rem;
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

.status {
  padding: 0.15rem 0.52rem;
  border-radius: 999px;
  font-size: 0.72rem;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: 0.02em;
  border: 1px solid transparent;
}

.status.published {
  color: color-mix(in srgb, var(--theme-color) 72%, var(--text-color));
  background-color: color-mix(in srgb, var(--theme-color) 12%, var(--card-bg-color));
  border-color: color-mix(in srgb, var(--theme-color) 25%, transparent);
}

.status.accepted {
  color: var(--theme-color);
  background-color: color-mix(in srgb, var(--theme-color) 14%, var(--card-bg-color));
  border-color: color-mix(in srgb, var(--theme-color) 30%, transparent);
}

.status.under-review {
  color: color-mix(in srgb, var(--text-color) 86%, var(--theme-color));
  background-color: color-mix(in srgb, var(--theme-color) 10%, var(--card-bg-color));
  border-color: color-mix(in srgb, var(--theme-color) 22%, transparent);
}

.details {
  margin-top: 0.25rem;
}

@media (orientation: portrait) {
  .pub-card {
    padding: 0.65rem 0.75rem;
    margin: 0.15rem 0 0.45rem;
  }

  .pub-main {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }

  .icon-wrap {
    width: 1.75rem;
    height: 1.75rem;
  }
}
</style>