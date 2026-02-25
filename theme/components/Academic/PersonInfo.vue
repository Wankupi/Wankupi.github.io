<script setup lang="ts">
import { usePageFrontmatter } from "@/client/utils";

const frontmatter = usePageFrontmatter<{
  EnglishName: string;
  ChineseName: string;
  photo: string | null;
  cv: string;
  github: string;
  emails: string[];
  location: string[];
}>();

import { Icon } from "@iconify/vue";
import { withBase } from "vitepress";
const icon_size = "1.5em";
</script>

<template>
  <div class="person_info">
    <div class="square border-round">
      <img v-if="frontmatter.photo" :src="withBase(frontmatter.photo)" />
    </div>
    <h2>{{ frontmatter.EnglishName }}</h2>
    <h2>{{ frontmatter.ChineseName }}</h2>
    <div class="links">
      <a :href="frontmatter.cv">
        <Icon icon="academicons:cv-square" :width="icon_size" />
      </a>
      <a :href="`https://github.com/${frontmatter.github}`" target="_blank">
        <Icon icon="mdi:github" :width="icon_size" />
      </a>
      <a href="./Article">
        <Icon icon="mdi:book-open-variant" :width="icon_size" />
      </a>
    </div>
    <div class="info">
      <div v-for="location in frontmatter.location" :key="location">
        <Icon icon="tdesign:location-filled" :width="icon_size" />
        <span>{{ location }}</span>
      </div>
      <div v-for="email in frontmatter.emails" :key="email">
        <Icon icon="mdi:email-outline" :width="icon_size" />
        <a :href="`mailto:${email}`" target="_blank">{{ email }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.square > img {
  width: 100%;
}

.links {
  text-align: center;
  display: flex;
  column-gap: 0.5em;
  justify-content: center;
}

.info {
  margin-top: 0.5em;
  display: table;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  div {
    display: table-row;
    * {
      display: table-cell;
      vertical-align: top;
      text-align: left;
    }
    *:first-child {
      padding-right: 0.5em;
    }
  }
}
</style>
