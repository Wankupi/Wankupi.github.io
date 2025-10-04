<script setup>
import { useData } from 'vitepress'
import { defineAsyncComponent } from 'vue'
import NotFound from '@/layouts/NotFound.vue'

const { page, frontmatter } = useData()

let AcademicIndex = defineAsyncComponent(() => import('@/layouts/IndexLayout.vue'))
let BlogBaseLayout = defineAsyncComponent(() => import('@/layouts/BlogBaseLayout.vue'))
let ArticleCard = defineAsyncComponent(() => import('@/components/ArticleCard.vue'))
let ArticleList = defineAsyncComponent(() => import('@/components/ArticleList.vue'))
</script>

<template>
  <NotFound v-if="page.value === null" />
  <AcademicIndex v-else-if="frontmatter.layout === 'Index'" />
  <template v-else>
    <BlogBaseLayout>
      <template #article>
        <ArticleList v-if="frontmatter.layout === 'ArticleList'" />
        <ArticleCard v-else />
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
