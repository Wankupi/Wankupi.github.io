<script setup lang="ts">
import Header from "@/components/Header.vue";
import SideNav from "@/components/SideNav.vue";
import Footer from "@/components/Footer.vue";
import type { ThemeConfig } from "@/config";
import { computed } from "vue";
import { useData } from "vitepress";

defineProps<{
  is_academic: boolean;
}>();

const { theme, frontmatter } = useData();

const layoutStyle = computed<Record<string, string>>(() => {
  const config = (theme.value ?? {}) as ThemeConfig;
  const bg = (frontmatter.value.background as string)?.trim()
    || config.background?.trim()
    || "#eee";

  return {
    "--theme-color": config.themeColor ?? "skyblue",
    "--layout-bg": bg,
  };
});
</script>

<template>
  <div class="rt-layout bg" :style="layoutStyle">
    <Header></Header>
    <main class="max-width-30cm">
      <article>
        <slot name="article"></slot>
      </article>
      <slot name="sidebar">
        <SideNav></SideNav>
      </slot>
    </main>
    <Footer></Footer>
  </div>
</template>

<style scoped>
.rt-layout {
  --text-title-color: var(--text-color);
  --card-bg-color: white;
  --text-color: black;
  --nav-hover-bg: color-mix(in srgb, var(--text-color) 8%, transparent);
  --nav-hover-color: var(--text-color);
  --theme-color: skyblue;
  --layout-bg: #eee;
}

.rt-layout {
  position: relative;
}
.rt-layout.bg::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: var(--layout-bg);
  background-size: cover;
  background-position: center center;
}

.max-width-30cm {
  max-width: 30cm;
}

main {
  margin-left: auto;
  margin-right: auto;
  margin-top: var(--top-panel-height);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 18rem;
  align-items: start;
  min-height: calc(100vh - var(--top-panel-height) - var(--footer-height));
}

main > :nth-child(2) {
  grid-column: 2;
}

@media (orientation: portrait) {
  main {
    grid-template-columns: minmax(0, 1fr);
  }

  main > :nth-child(2) {
    grid-column: 1;
    grid-row: 2;
    width: auto;
    margin-right: 0;
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
