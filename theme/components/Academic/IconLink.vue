<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  icon: string;
  href?: string;
  title?: string;
}>();
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    class="icon-link"
    :href="href"
    :title="title"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
  >
    <Icon class="icon" :icon="icon" width="1.05em"></Icon>
    <slot></slot>
  </component>
</template>

<style scoped>
/* Plain inline flow, so the text sits on the same baseline as the words
   around it; inline-flex would center it on the icon instead */
.icon-link {
  white-space: nowrap;
}

.icon {
  display: inline-block;
  margin-right: 0.25em;
  vertical-align: -0.15em;
}
</style>
