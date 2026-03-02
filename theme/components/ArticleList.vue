<script setup lang="ts">
import ArticleItemCard from "@/components/ArticleItemCard.vue";
import { data } from "#posts-data";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vitepress";

const pageSize = 10;
const router = useRouter();

const current_page_num = ref<number>(1);

const totalPages = computed<number>(() => Math.max(1, Math.ceil(data.length / pageSize)));
const pagedData = computed(() => {
  const start = (current_page_num.value - 1) * pageSize;
  return data.slice(start, start + pageSize);
});

const syncCurrentPageFromUrl = () => {
  const pageParam = new URLSearchParams(window.location.search).get("page");
  const parsedPage = Number(pageParam);
  if (!Number.isInteger(parsedPage)) {
    current_page_num.value = 1;
    return;
  }
  current_page_num.value = Math.min(totalPages.value, Math.max(1, parsedPage));
};

onMounted(() => {
  syncCurrentPageFromUrl();
  window.addEventListener("popstate", syncCurrentPageFromUrl);
});

onBeforeUnmount(() => {
  window.removeEventListener("popstate", syncCurrentPageFromUrl);
});

const goToPage = (page: number) => {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("page", String(page));
  current_page_num.value = page;
  router.go(nextUrl.toString());
};
</script>

<template>
  <ArticleItemCard v-for="page in pagedData" :page="page" :key="page.url"></ArticleItemCard>
  <div class="left">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      class="button"
      :disabled="page === current_page_num"
    >
      {{ page }}
    </button>
  </div>
</template>

<style scoped>
.left {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(2.5rem, max-content));
  justify-content: center;
  justify-items: center;
  gap: 1em;
}

.left .button {
  width: 3rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
