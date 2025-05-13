<script setup lang="ts">
import BaseLayout from './BlogBaseLayout.vue';
import ArticleCard from '@/components/ArticleCard.vue';
</script>

<template>
    <BaseLayout>
        <template #article>
            <ArticleCard />
        </template>
    </BaseLayout>
</template>
