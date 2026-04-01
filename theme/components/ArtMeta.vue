<script lang="ts" setup>
import type { Page } from "#posts-data";
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const { page } = defineProps<{
  page: Page;
}>();

const cnt_read = ref<number>(0);
const cnt_comment = ref<number>(0);

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

const dateTimeFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit"
});

function formatDateTime(timestamp?: number): string {
  return timestamp ? dateTimeFormatter.format(new Date(timestamp)) : "";
}
</script>

<template>
  <div class="art-meta">
    <div class="meta-item">
      <Icon icon="material-symbols:folder" class="art-icon"></Icon>
      <span>{{ page.url.split("/")[2] }}</span>
    </div>
    <div v-if="page.created_at" class="meta-item">
      <Icon icon="mdi:calendar-plus-outline" class="art-icon created-icon"></Icon>
      <span class="date-text">
        {{ formatDateTime(page.created_at) }}
      </span>
    </div>
    <div v-if="page.updated_at - page.created_at > 24 * 3600 * 1000" class="meta-item">
      <Icon icon="mdi:update" class="art-icon updated-icon"></Icon>
      <span class="date-text">
        {{ formatDateTime(page.updated_at) }}
      </span>
    </div>
    <div v-if="cnt_read">{{ cnt_read }}</div>
    <div v-if="cnt_comment">{{ cnt_comment }}</div>
  </div>
</template>

<style scoped>
.art-meta {
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  column-gap: 1em;
  color: gray;
}

.meta-item {
  display: inline-flex;
  align-items: center;
}

.art-icon {
  font-size: 1.05em;
  line-height: 1;
}

.updated-icon {
  color: var(--theme-color);
}
</style>
