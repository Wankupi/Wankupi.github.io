<script setup lang="ts">
import BaseLayout from './BlogBaseLayout.vue';
import ArticleItemCard from '@/components/ArticleItemCard.vue';

import { data } from "@/data/posts.data"


</script>

<template>
    <BaseLayout>
        <template #article>
            <ArticleItemCard v-for="page in data" :page="page" :key="page.url"></ArticleItemCard>
        </template>
    </BaseLayout>
</template>
