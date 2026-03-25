<script setup lang="ts">
import { usePageFrontmatter } from "@/client/utils";
import SideCard from "@/components/SideCard.vue";

const frontmatter = usePageFrontmatter<{
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
    <div class="photo-card" v-if="frontmatter.photo">
      <img :src="withBase(frontmatter.photo)" />
    </div>
    <SideCard>
      <div class="links">
        <a :href="frontmatter.cv">
          <Icon icon="academicons:cv" :width="icon_size" />
        </a>
        /
        <a :href="`https://github.com/${frontmatter.github}`" target="_blank">
          <Icon icon="mdi:github" :width="icon_size" />
        </a>
      </div>
    </SideCard>
    <SideCard>
      <div class="info">
        <div v-for="email in frontmatter.emails" :key="email" class="info-row">
          <Icon icon="mdi:email-outline" :width="icon_size" />
          <a :href="`mailto:${email}`" target="_blank" class="text-item email">{{ email }}</a>
        </div>
        <div v-for="location in frontmatter.location" :key="location" class="info-row">
          <Icon icon="tdesign:location-filled" :width="icon_size" />
          <span class="text-item">{{ location }}</span>
        </div>
      </div>
    </SideCard>
  </div>
</template>

<style lang="scss" scoped>
.person_info {
  position: sticky;
  top: var(--top-panel-height);
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0;
  color: var(--text-color);
  font-family: var(--font-serif);
}

a {
  color: var(--text-color);
  transition: color 0.2s ease;
}

a:hover {
  color: var(--theme-color);
}

.photo-card {
  margin-top: 1rem;
  border-radius: 0.75rem;
  overflow: hidden;
  aspect-ratio: 1/1;
}

.photo-card > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.links {
  display: flex;
  column-gap: 0.7em;
  justify-content: center;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: stretch;
}

.info-row {
  width: 100%;
  display: grid;
  grid-template-columns: 1.3rem minmax(0, 1fr);
  align-items: center;
  column-gap: 0.5rem;
  text-align: left;
}

.text-item {
  min-width: 0;
}

.email {
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;
  display: inline-block;
  font-size: 0.88rem;
}

@media (orientation: portrait) {
  .email {
    font-size: 0.84rem;
  }
  .person_info {
    padding: 0 var(--item-gap) var(--item-gap) var(--item-gap);
  }
  .photo-card {
    max-width: 10em;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
