<script setup lang="ts">
import BaseLayout from './BaseLayout.vue';
import ArticleCard from '@/components/ArticleCard.vue';
</script>

<template>
    <BaseLayout>
        <template #article>
            <ArticleCard />
        </template>
    </BaseLayout>
</template>
