<script setup lang="ts">
import type { Page } from "vuepress";

const { page } = defineProps<{
    page: Page
}>();

function get_excerpt(content: string): string {
    if (content.startsWith("---\n")) {
        content = content.substring(content.indexOf("---\n", 3) + 3);
        content = content.substring(content.indexOf("---\n", 3) + 3);
    }
    content = content.substring(0, content.indexOf("<!-- more -->"));
    return content;
}

function date_to_string(date: Date | string): string {
    if (typeof date === "string")
        date = new Date(date);
    return date.toLocaleString();
}

function get_type(page: Page): string {
    return decodeURIComponent(page.path.split("/")[2]);
}

</script>
<template>
    <div class="card">
        <h3 class="art-title">
            <a :href="page.path">{{ page.title }}</a>
        </h3>
        <header class="art-meta">
            <span class="art-type">{{ get_type(page) }}</span>
            <span class="art-date" v-if="page.frontmatter.date">
                {{ date_to_string(page.frontmatter.date) }}
            </span>
            <span class="art-read" v-if="page.data.read_count">{{ page.data.read_count }}</span>
            <span class="art-comment" v-if="page.data.comment_count">{{ page.data.comment_count }}</span>
        </header>
        <div class="art-outline">{{ page.frontmatter["excerpt"] || get_excerpt(page.content) }}</div>
        <a :href="page.path" target="_self" class="center button">阅读全文&gt;&gt;</a>
    </div>
</template>

<style lang="css" scoped>
.card {
    margin-bottom: var(--item-gap);
    padding: .5rem;
    transition-duration: 0.5s;
    border-radius: 0.3em;
    background-color: var(--card-bg-color);
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
    border-left: skyblue 3px solid;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
}

.card:hover {
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.5);
}

.art-title {
    font-size: 1.3em;
    text-align: center;
}

a {
    text-decoration: none;
    color: var(--text-title-color);
}

.button {
    border: #777 solid 2px;
    line-height: 2em;
    padding: 0 1.5em;
    transition-duration: 0.3s;
}

.button:hover {
    background-color: #dadada;
    color: var(--text-title-color);
}

.center {
    display: block;
    text-align: center;
    margin: 0.5em auto;
    width: fit-content;
}


.card .art-meta {
    text-align: center;
    color: grey;
}

.art-meta>* {
    margin-left: 1em;
}

.art-meta>*:empty {
    display: none;
}

.art-meta>*::before {
    content: " ";
    display: inline-block;
    width: 1em;
    height: 1em;
    background-size: 100% 100%;
    margin-right: 0.1em;
}

.art-outline {
    text-indent: 2em;
}

.art-type {
    width: 10em;
}

.art-type::before {
    background-image: url("/static/images/art/art-type.png");
}

.art-date::before {
    background-image: url("/static/images/art/art-date.png");
}

.art-read::before {
    background-image: url("/static/images/art/art-read.png");
}

.art-comment::before {
    background-image: url("/static/images/art/art-comment.png");
}
</style>