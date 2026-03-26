<script lang="ts" setup>
import type { Page } from "#posts-data";
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const { page } = defineProps<{
  page: Page;
}>();

const cnt_read = ref<number>(0);
const cnt_comment = ref<number>(0);
</script>

<template>
  <div class="art-meta">
    <div>
      <Icon icon="material-symbols:folder" class="art-icon"></Icon>
      <span>{{ page.url.split("/")[2] }}</span>
    </div>
    <div v-if="page.date">
      <Icon icon="uiw:date" class="art-icon"></Icon>
      <span>{{ new Date(page.date).toDateString() }}</span>
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

.art-icon {
  vertical-align: middle;
}
</style>
