<script setup lang="ts">
import { usePageFrontmatter } from 'vuepress/client';


const frontmatter = usePageFrontmatter<{
    EnglishName: string,
    ChineseName: string,
    photo: string | null
    cv: string,
    github: string,
    emails: string[],
    location: string[]
}>();

</script>

<template>
    <div class="person_info">
        <div class="square border-round">
            <img v-if="frontmatter.photo" :src="frontmatter.photo">
        </div>
        <h2>{{ frontmatter.EnglishName }}</h2>
        <h2>{{ frontmatter.ChineseName }}</h2>
        <div class="info">
            <a :href="frontmatter.cv">
                <VPIcon icon="academicons:cv-square" size="1.2em" />
            </a>
            <a :href="`https://github.com/${frontmatter.github}`" target="_blank">
                <VPIcon icon="mdi:github" size="1.2em" />
            </a>
        </div>
        <div v-for="location in frontmatter.location" :key="location" class="info">
            <VPIcon icon="tdesign:location-filled" size="1.2em"></VPIcon>
            <span>{{ location }}</span>
        </div>
        <div v-for="email in frontmatter.emails" :key="email" class="info">
            <VPIcon icon="mdi:email-outline" size="1.2em" />
            <a :href="`mailto:${email}`" target="_blank">{{ email }}</a>
        </div>
    </div>
</template>

<style scoped>
.person_info {
    text-align: center;
    padding: 1em;
}

a {
    color: black;
}

.square {
    margin: 1em;
    aspect-ratio: 1/1;
    overflow: hidden;
}

.border-round {
    border-radius: 10%;
}

.square>img {
    width: 100%;
}

.info {
    margin-top: 0.5em;
    display: grid;
    grid-template-columns: 1.5em 1fr;
}
</style>