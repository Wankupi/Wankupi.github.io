<script setup lang="ts">
import Header from "@/components/Header.vue";
import SideNav from "@/components/SideNav.vue";
import Footer from "@/components/Footer.vue";
import type { ThemeConfig } from "@/config";
import { computed } from "vue";
import { useData, withBase } from "vitepress";

defineProps<{
  is_academic: boolean;
}>();

const { theme } = useData();

const layoutStyle = computed<Record<string, string>>(() => {
  const config = (theme.value ?? {}) as ThemeConfig;
  const backgroundImage = config.backgroundImage?.trim();

  return {
    "--theme-color": config.themeColor ?? "skyblue",
    "--layout-bg-image": backgroundImage ? `url("${withBase(backgroundImage)}")` : "none",
  };
});
</script>

<template>
  <div class="rt-layout" :class="{ bg: !is_academic }" :style="layoutStyle">
    <Header></Header>
    <main :class="{ 'max-width-30cm': !is_academic }">
      <article>
        <slot name="article"></slot>
      </article>
      <slot name="sidebar">
        <SideNav v-show="!is_academic"></SideNav>
      </slot>
    </main>
    <Footer v-show="!is_academic"></Footer>
  </div>
</template>

<style scoped>
.rt-layout {
  --text-title-color: #000;
  --card-bg-color: #fff;
  --text-color: #000;
  --nav-hover-bg: rgba(0, 0, 0, 0.08);
  --nav-hover-color: #333;
  --theme-color: #007acc;
  --layout-bg-image: none;
}

.rt-layout {
  position: relative;
}
.rt-layout:not(.bg) {
  background-color: #eee;
}
.rt-layout.bg::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: var(--layout-bg-image);
}

.max-width-30cm {
  max-width: 30cm;
}

main {
  margin-left: auto;
  margin-right: auto;
  margin-top: var(--top-panel-height);
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: dense;
  align-items: start;
  min-height: calc(100vh - var(--top-panel-height) - var(--footer-height));
}

main > *:nth-child(2) {
  grid-column: 2;
}

@media (orientation: portrait) {
  main {
    grid-template-columns: minmax(0, 1fr);
  }
  main > *:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }
  main > *:nth-child(2) {
    grid-column: 1;
    grid-row: 2;
  }
}

article {
  padding: var(--item-gap);
}
article > *:last-child {
  margin-bottom: 0;
}
</style>

<style>
a {
  text-decoration: none;
  color: var(--text-color);
}

html {
  --top-panel-height: 3rem;
  --footer-height: 8rem;
  --item-gap: 1rem;
  --font-serif: "serif";
  --font-mono: "monospace";
  --font-sans: "sans-serif";
  scroll-behavior: smooth;
  scroll-padding-top: var(--top-panel-height);
}
</style>
