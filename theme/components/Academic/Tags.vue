<script setup lang="ts">
defineProps<{
  items: string[];
}>();
</script>

<template>
  <span class="tags-wrap">
    <span v-for="item in items" :key="item" class="tag">{{ item }}</span>
  </span>
</template>

<style scoped>
.tags-wrap {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  padding: 0.12rem 0.55rem;
  border-radius: 0.45rem;
  font-size: 0.85rem;
  font-family: var(--font-mono);
  color: color-mix(in srgb, var(--theme-color) 78%, var(--text-color));
  background: color-mix(in srgb, var(--theme-color) 12%, var(--card-bg-color));
  border: 1px solid color-mix(in srgb, var(--theme-color) 18%, transparent);
  white-space: nowrap;
}
</style>
