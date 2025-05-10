<script lang="ts" setup>
import type { Page } from 'vuepress';

const { page } = defineProps<{
    page: Page
}>();

function date_to_string(date: Date | string): string {
    if (typeof date === "string")
        date = new Date(date);
    return date.toLocaleString();
}

</script>

<template>
    <div class="art-meta">
        <span class="art-type">{{ page.path.split('/')[2] }}</span>
        <span class="art-date" v-if="page.frontmatter.date">{{ date_to_string(page.frontmatter.date) }}</span>
        <span class="art-read" v-if="page.frontmatter.art_read">{{ page.frontmatter.art_read }}</span>
        <span class="art-comment" v-if="page.frontmatter.art_comment">{{ page.frontmatter.art_comment }}</span>
    </div>
</template>

<style scoped>

.art-meta {
    
}

</style>