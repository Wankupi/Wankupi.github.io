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
  const bg = (frontmatter.value.background as string)?.trim() || config.background?.trim();

  return {
    "--theme-color": config.themeColor ?? "skyblue",
    ...(bg ? { "--layout-bg": bg } : {})
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
      <nav>
        <slot name="sidebar">
          <SideNav></SideNav>
        </slot>
      </nav>
    </main>
    <Footer></Footer>
  </div>
</template>

<style>
:root {
  color-scheme: light dark;
  --top-panel-height: 3rem;
  --footer-height: 8rem;
  --item-gap: 1rem;
  --card-radius: 0.3rem;
  --font-serif: "serif";
  --font-mono: "monospace";
  --font-sans: "sans-serif";
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--top-panel-height);
  overflow-y: scroll;
}
</style>

<style scoped>
.rt-layout {
  --text-color: light-dark(black, #e3e3e3);
  --text-title-color: var(--text-color);
  --card-bg-color: light-dark(#ffffffe0, #333333e0);
  /* Below would be overridden by inline CSS */
  --layout-bg: light-dark(#eee, #292929);
  --theme-color: skyblue;
}

.rt-layout {
  font-family: var(--font-sans);
  color: var(--text-color);
}
.rt-layout.bg::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100lvh;
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
  min-height: calc(100vh - var(--top-panel-height) - var(--footer-height));
  padding: var(--item-gap);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 18rem;
  gap: var(--item-gap);
  align-items: start;
}

article {
  display: flex;
  flex-direction: column;
  gap: var(--item-gap);
}

nav {
  position: sticky;
  width: 100%;
  top: calc(var(--top-panel-height) + var(--item-gap));
  display: flex;
  flex-direction: column;
  gap: var(--item-gap);
}

@media (orientation: portrait) {
  main {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--item-gap);
  }

  nav {
    grid-column: 1;
    grid-row: 2;
  }

  nav {
    position: static;
    margin: 0;
  }
}

:deep(a) {
  text-decoration: none;
  color: var(--text-color);
}
</style>
