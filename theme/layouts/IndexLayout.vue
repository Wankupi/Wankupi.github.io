<script setup lang="ts">
import BaseLayout from './BaseLayout.vue';
import { inject } from 'vue';
import { all_pages_key } from '../client/keys';
import ArticleItemCard from '../components/ArticleItemCard.vue';

const all_pages = inject(all_pages_key)!;

</script>

<template>
    <BaseLayout>
        <template #article>
            <ArticleItemCard :page="page" v-for:="page in all_pages"></ArticleItemCard>
        </template>
    </BaseLayout>
</template>
