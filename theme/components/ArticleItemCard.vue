<script setup lang="ts">
import { type Page } from "#posts-data";
import ArtMeta from "./ArtMeta.vue";
import { withBase } from "vitepress";
const { page } = defineProps<{ page: Page }>();
</script>
<template>
  <div class="list-card">
    <h3 class="art-title">
      <a :href="withBase(page.url)">{{ page.title }}</a>
    </h3>
    <ArtMeta :page="page"></ArtMeta>
    <div class="art-outline">{{ page.excerpt }}</div>
    <a :href="withBase(page.url)" class="center button">阅读全文&Gt;</a>
  </div>
</template>

<style lang="css">
.list-card {
  margin-bottom: var(--item-gap);
  padding: 0.5rem;
  transition-duration: 0.5s;
  border-radius: 0.3em;
  background-color: var(--card-bg-color);
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
  border-left: skyblue 3px solid;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
}

.list-card:hover {
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
.center * {
  vertical-align: middle;
}
.art-outline {
  text-indent: 2em;
}
</style>
