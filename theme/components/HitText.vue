<script setup lang="ts">
import { splitSegments, type SearchTerms } from "@/client/highlight";
import { computed } from "vue";

const { text, terms } = defineProps<{ text: string; terms?: SearchTerms | null }>();
const segments = computed(() => (terms ? splitSegments(text, terms) : [{ text }]));
</script>

<template>
  <template v-for="(seg, i) in segments" :key="i">
    <mark v-if="seg.kind" :class="`hit-${seg.kind}`">{{ seg.text }}</mark>
    <template v-else>{{ seg.text }}</template>
  </template>
</template>

<style scoped>
mark {
  color: inherit;
  border-radius: 0.2em;
  padding: 0 0.1em;
}

mark.hit-exact {
  background-color: var(--hit-exact-bg);
}

mark.hit-fuzzy {
  background-color: var(--hit-fuzzy-bg);
  text-decoration: underline wavy var(--hit-fuzzy-line);
  text-underline-offset: 0.2em;
}
</style>
