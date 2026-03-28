<script setup>
import { useData } from "vitepress";
import { computed, defineAsyncComponent } from "vue";
import NotFound from "@/layouts/NotFound.vue";
import BlogBaseLayout from "@/layouts/BlogBaseLayout.vue";
import SideNav from "@/components/SideNav.vue";

const { page, frontmatter } = useData();

let AcademicLayout = defineAsyncComponent(() => import("@/layouts/AcademicLayout.vue"));
let ArticleCard = defineAsyncComponent(() => import("@/components/ArticleCard.vue"));
let ArticleList = defineAsyncComponent(() => import("@/components/ArticleList.vue"));
let PersonInfo = defineAsyncComponent(() => import("@/components/Academic/PersonInfo.vue"));
let TableOfContent = defineAsyncComponent(() => import("@/components/TableOfContent.vue"));

let is_academic = computed(() => frontmatter.value.layout === "Academic");
</script>

<template>
  <NotFound v-if="page.isNotFound" />
  <template v-else>
    <BlogBaseLayout :is_academic="is_academic">
      <template #article>
        <AcademicLayout v-if="is_academic" />
        <ArticleList v-else-if="frontmatter.layout === 'ArticleList'" />
        <ArticleCard v-else />
      </template>
      <template v-if="is_academic" #sidebar>
        <PersonInfo />
      </template>
      <template v-else #sidebar>
        <SideNav>
          <template v-if="frontmatter.layout != 'ArticleList'" #bottom>
            <TableOfContent />
          </template>
        </SideNav>
      </template>
    </BlogBaseLayout>
  </template>
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
