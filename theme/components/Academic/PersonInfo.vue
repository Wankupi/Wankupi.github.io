<script setup lang="ts">
import { usePageFrontmatter } from 'vuepress/client';


const frontmatter = usePageFrontmatter<{
    EnglishName: string,
    ChineseName: string,
    photo: string | null
    cv: string,
    github: string,
    emails: string[] | string
}>();

</script>

<template>
    <div class="person_info">
        <div class="square border-round">
            <img v-if="frontmatter.photo" :src="frontmatter.photo">
        </div>
        <h1>{{ frontmatter.EnglishName }}</h1>
        <h2>{{ frontmatter.ChineseName }}</h2>
    </div>
</template>

<style scoped>
.person_info {
    text-align: center;
    padding: 1em;
}

.square {
    width: 100%;
    aspect-ratio: 1/1;
    overflow: hidden;
}

.border-round {
    border-radius: 10%;
}

.square>img {
    width: 100%;
}
</style>