<script setup lang="ts">
import { initColorMode, colorMode } from "@/client/color-mode";
import Header from "@/components/Header.vue";
import SideNav from "@/components/SideNav.vue";
import Footer from "@/components/Footer.vue";
import type { ThemeConfig } from "@/config";
import { computed, onMounted, ref, watch } from "vue";
import { useData, useRouter } from "vitepress";
import { Icon } from "@iconify/vue";

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

onMounted(initColorMode);
const color_mode_class = computed(() => {
  return colorMode.value == "auto" ? null : `color-mode-${colorMode.value}`;
});

/* Layouts whose body is one big card fill the screen width in portrait mode;
   the article list keeps its padding, its items being separate cards */
const full_bleed = computed(() => frontmatter.value.layout !== "ArticleList");

/* Portrait only: the sidebar is a drawer toggled by a floating button */
const { route } = useRouter();
const sideOpen = ref(false);
watch(
  () => route.path,
  () => (sideOpen.value = false)
);
</script>

<template>
  <div class="rt-layout bg" :class="[color_mode_class, { academic: is_academic }]" :style="layoutStyle">
    <Header></Header>
    <main class="max-width-30cm" :class="{ 'full-bleed': full_bleed }">
      <article>
        <slot name="article"></slot>
      </article>
      <div class="side-backdrop" :class="{ open: sideOpen }" @click="sideOpen = false"></div>
      <nav :class="{ open: sideOpen }">
        <slot name="sidebar">
          <SideNav></SideNav>
        </slot>
      </nav>
      <button
        class="side-toggle"
        type="button"
        :aria-label="sideOpen ? '关闭侧栏' : '打开侧栏'"
        :aria-expanded="sideOpen"
        @click="sideOpen = !sideOpen"
      >
        <Icon :icon="sideOpen ? 'mdi:close' : 'mdi:table-of-contents'" width="1.5em" />
      </button>
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
  container-type: scroll-state;
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

.rt-layout.color-mode-light {
  color-scheme: light;
}

.rt-layout.color-mode-dark {
  color-scheme: dark;
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
  margin-bottom: var(--item-gap);
  min-height: calc(100vh - var(--top-panel-height) - var(--footer-height) - var(--item-gap));
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

.side-backdrop,
.side-toggle {
  display: none;
}

@media (orientation: portrait) {
  main {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--item-gap);
  }

  /* No padding and no margin around the body: it goes edge to edge, right
     below the header and right above the footer, and stretches to the full
     height so that no page background shows through anywhere */
  main.full-bleed {
    padding: 0;
    margin-bottom: 0;
    align-items: stretch;
    /* No bottom margin left to account for */
    min-height: calc(100vh - var(--top-panel-height) - var(--footer-height));
  }

  main.full-bleed > article > :deep(*) {
    flex-grow: 1;
  }

  /* The sidebar turns into a drawer sliding in from the right */
  nav {
    position: fixed;
    z-index: 20;
    top: var(--top-panel-height);
    bottom: 0;
    right: 0;
    width: min(20rem, 85vw);
    padding: var(--item-gap) 0;
    gap: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    background-color: rgba(from var(--card-bg-color) r g b / 1);
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.3);
    transform: translateX(100%);
    visibility: hidden;
    transition:
      transform 0.3s,
      visibility 0.3s;
  }

  nav.open {
    transform: translateX(0);
    visibility: visible;
  }

  /* Inside the drawer the sections are plain blocks of a single list,
     not standalone cards */
  nav :deep(.side-card) {
    padding: var(--item-gap);
    text-align: start;
    background-color: transparent;
    box-shadow: none;
    border-right: none;
    border-radius: 0;
  }

  nav :deep(.side-card:not(:first-child)) {
    border-top: 1px solid color-mix(in srgb, var(--text-color) 15%, transparent);
  }

  /* The drawer itself scrolls, so the TOC needs no scroll box of its own */
  nav :deep(.toc) {
    max-height: none;
    overflow: visible;
  }

  .side-backdrop {
    display: block;
    position: fixed;
    z-index: 15;
    inset: var(--top-panel-height) 0 0 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.3s,
      visibility 0.3s;
  }

  .side-backdrop.open {
    opacity: 1;
    visibility: visible;
  }

  /* The academic page shows the sidebar content inline in portrait mode,
     so there is nothing left for the drawer to hold */
  .rt-layout.academic nav,
  .rt-layout.academic .side-backdrop,
  .rt-layout.academic .side-toggle {
    display: none;
  }

  .side-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 25;
    right: var(--item-gap);
    bottom: var(--item-gap);
    width: 3rem;
    height: 3rem;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    color: inherit;
    font: inherit;
    background-color: rgba(from var(--card-bg-color) r g b / 1);
    box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.3);
  }
}

@media print {
  .side-backdrop,
  .side-toggle {
    display: none;
  }
}

:deep(a) {
  text-decoration: none;
  color: var(--text-color);
}
</style>
