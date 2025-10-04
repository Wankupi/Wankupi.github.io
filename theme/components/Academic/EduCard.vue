<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps<{
  title: string;
  time: string;
  description?: string;
  icon?: string
}>();
</script>

<template>
  <div class="show-card">
    <div class="main-info">
      <Icon :icon="icon || 'material-symbols:school'" width="1.5em"></Icon>
      <div>
        <div>{{ time }}</div>
        <div class="title">{{ title }}</div>
        <div v-if="description">{{ description }}</div>
        <div><slot></slot></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.show-card {
  padding: 1em;
  margin-bottom: 0.5em;
}

.main-info {
  display: grid;
  grid-template-columns: 2em 1fr;
}

.title {
  font-weight: bold;
}
</style>
