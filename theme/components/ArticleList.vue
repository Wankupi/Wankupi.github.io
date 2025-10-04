<script setup lang="ts">
import ArticleItemCard from "@/components/ArticleItemCard.vue";
import { data } from "@/data/posts.data";
import { ref } from "vue";

const maxShow = ref<number>(5);
const step = 5;
</script>

<template>
  <ArticleItemCard
    v-for="page in data.slice(0, maxShow)"
    :page="page"
    :key="page.url"
  ></ArticleItemCard>
  <div class="left">
    <button v-if="maxShow < data.length" @click="maxShow += step" class="button">Show More</button>
    <button v-if="maxShow < data.length" @click="maxShow = data.length" class="button">
      Show All
    </button>
  </div>
</template>

<style>
.left {
  display: flex;
  justify-items: left;
  column-gap: 1em;
}
</style>
