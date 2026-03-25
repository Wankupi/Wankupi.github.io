<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";

const data = useData();
const lastUpdated = computed(() => data.page.value.lastUpdated);
const lastUpdated_str = computed(() =>
  lastUpdated.value ? new Date(lastUpdated.value).toLocaleDateString() : null
);
</script>

<template>
  <div class="academic-main">
    <Content />
    <div class="gray" v-if="lastUpdated">Last Updated on {{ lastUpdated_str }}</div>
  </div>
</template>

<style scoped>
.academic-main {
  padding: 2rem;
  border-radius: 1rem;
  background-color: var(--card-bg-color);
  box-shadow: 0 8px 22px color-mix(in srgb, var(--text-color) 12%, transparent);
  font-family: var(--font-serif);
  font-size: 1.15rem;
  text-align: justify;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
}

.title {
  text-align: center;
}

.gray {
  color: color-mix(in srgb, var(--text-color) 60%, transparent);
  margin-top: 1.4rem;
}

@media (orientation: portrait) {
  .academic-main {
    padding: 1.25rem;
  }
}
</style>

<style lang="scss">
.academic-main {
  h1 {
    text-align: center;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-serif);
    color: var(--text-title-color);
    font-weight: 600;
    line-height: 1.5;

    a {
      color: unset;
    }
  }

  a {
    text-decoration: none;
    color: var(--theme-color);
    transition: color 0.2s ease;
  }

  a:hover {
    color: color-mix(in srgb, var(--theme-color) 70%, black);
  }

  li {
    margin-left: 1em;
  }

  p {
    margin-top: 0.65em;
    margin-bottom: 0.65em;
    line-height: 1.68;
  }

  :deep(.edu-grid) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
    gap: 1.25rem;
    margin-top: 1.1rem;
  }

  :deep(.edu-grid .show-card) {
    height: 100%;
  }

  :deep(.edu-grid .show-card .details p) {
    margin: 0;
  }
}

@media (orientation: portrait) {
  .academic-main {
    :deep(.edu-grid) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
