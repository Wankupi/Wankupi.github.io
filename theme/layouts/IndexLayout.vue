<script setup lang="ts">
import PersonInfo from '@/components/Academic/PersonInfo.vue';
import ShowCard from '@/components/Academic/ShowCard.vue';
import { usePageFrontmatter } from 'vuepress/client';
import { Content } from 'vuepress/client';

interface EducationInfo {
    title: string;
    location: string;
    date: string;
}

const frontmatter = usePageFrontmatter<{
    lastUpdated: string;
    education: EducationInfo[];
}>();
</script>

<template>
    <div class="rt-wrapper">
        <div class="rt-layout">
            <PersonInfo></PersonInfo>
            <div class="main">
                <Content />
                <ShowCard v-for="(item, index) in frontmatter.education" :key="index" :title="item.title"
                    :detail="item.location" :time="item.date">
                    <template #icon>
                        <VPIcon icon="tdesign:education-filled" color="black" />
                    </template>
                </ShowCard>
                <VPIcon icon="tdesign:education-filled" color="black" />
                <!-- Last Updated on {{ (new Date(frontmatter.lastUpdated!)).toString() }} -->
                <div style="color:gray">{{ frontmatter }}</div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.rt-wrapper {
    width: 100%;
    min-height: 100vh;
    overflow: auto;
    background-color: #f0f2f5;
}

.rt-layout {
    display: grid;
    grid-template-columns: 16em 1fr;

    max-width: 30cm;
    margin: 2em;

    background-color: white;
    border-radius: 3em;
}

.title {
    text-align: center;
}

.main {
    padding: 2em;
}
</style>

<style lang="scss">
.main {

    // overflow: hidden;
    h1,
    h2,
    h3,
    h4 {
        font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        color: #44566c;
        font-weight: 600;
        line-height: 1.3;

        a {
            color: unset;
        }
    }

    a {
        text-decoration: none;
    }
}
</style>
