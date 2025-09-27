<script setup>
import { useData } from "vitepress";
import { defineAsyncComponent } from "vue";
import NotFound from "@/layouts/NotFound.vue";

const { page, frontmatter } = useData();

let AcademicIndex = defineAsyncComponent(() =>
  import("@/layouts/IndexLayout.vue")
);
let BlogPage = defineAsyncComponent(() =>
  import("@/layouts/DefaultLayout.vue")
);
let ArticleList = defineAsyncComponent(() =>
  import("@/layouts/ArticleListLayout.vue")
);
</script>

<template>
  <NotFound v-if="page.value === null" />
  <AcademicIndex v-else-if="frontmatter.layout === 'Index'" />
  <ArticleList v-else-if="frontmatter.layout === 'ArticleList'" />
  <BlogPage v-else />
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  padding: 0;
}
</style>
