<script setup lang="ts">
import { type Page } from "#posts-data";
import ArtMeta from "./ArtMeta.vue";
import HitText from "./HitText.vue";
import { withHighlight, type SearchMatch } from "@/client/highlight";
import { Icon } from "@iconify/vue";
import { withBase } from "vitepress";
import { computed } from "vue";
const { page, match } = defineProps<{ page: Page; match?: SearchMatch }>();

const maxChips = 3;
const link = (anchor?: string) => withHighlight(withBase(page.url), match, anchor);
const sections = computed(() => match?.sections ?? []);
</script>
<template>
  <div class="list-card">
    <h3 class="art-title">
      <a :href="link()"><HitText :text="page.title" :terms="match" /></a>
    </h3>
    <ArtMeta :page="page"></ArtMeta>
    <div class="art-outline">{{ page.excerpt }}</div>
    <div v-if="sections.length" class="body-hits">
      <Icon icon="mdi:text-search" class="body-hits-icon"></Icon>
      <span>正文 {{ sections.length }} 处命中：</span>
      <a v-for="s in sections.slice(0, maxChips)" :key="s.anchor" :href="link(s.anchor)" class="hit-chip">
        <HitText :text="s.title || '开头'" :terms="match" />
      </a>
      <span v-if="sections.length > maxChips">等</span>
    </div>
    <a :href="link(sections[0]?.anchor)" class="center button" :class="{ 'has-hits': sections.length }">
      阅读全文<span class="more-arrow">&Gt;</span>
    </a>
  </div>
</template>

<style scoped>
.list-card {
  padding: 0.5rem;
  transition-duration: 0.5s;
  border-radius: var(--card-radius);
  background-color: var(--card-bg-color);
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
  border-left: var(--theme-color) 3px solid;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
}

.list-card:hover {
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.5);
}

.art-title {
  font-size: 1.3em;
  font-family: var(--font-serif);
  text-align: center;
}

a {
  text-decoration: none;
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

.body-hits {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25em 0.5em;
  margin-top: 0.5em;
  font-size: 0.9em;
  color: gray;
}

.body-hits-icon {
  color: var(--theme-color);
}

.hit-chip {
  padding: 0 0.6em;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--theme-color) 50%, transparent);
  color: var(--text-color);
  transition: background-color 0.2s;
}

.hit-chip:hover {
  background-color: color-mix(in srgb, var(--theme-color) 15%, transparent);
}

/* Body hits: the arrow is highlighted like a matched word */
.button.has-hits .more-arrow {
  padding: 0 0.15em;
  margin-left: 0.1em;
  border-radius: 0.2em;
  background-color: var(--hit-exact-bg);
  font-weight: bold;
}

.button.has-hits:hover .more-arrow {
  background-color: transparent;
}
</style>
<style scoped>
.button {
  border: var(--theme-color) solid 2px;
  border-radius: 0.5em;
  line-height: 2em;
  padding: 0 1.5em;
  transition-duration: 0.3s;
}

.button:hover {
  background-color: var(--theme-color);
  color: var(--text-color);
}
</style>
