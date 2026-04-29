<script setup lang="ts">
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { toggleColorMode, colorMode } from "@/client/color-mode";
import { withBase, useData, useRouter } from "vitepress";

const { theme } = useData();
const { route } = useRouter();

const menuOpen = ref(false);

function closeMenu() {
  menuOpen.value = false;
}

watch(() => route.path, closeMenu);
</script>

<template>
  <header class="top-panel" :class="{ 'menu-active': menuOpen }">
    <a :href="withBase(theme.nav.brand.link)" class="brand">
      <span>{{ theme.nav.brand.text }}</span>
    </a>
    <div class="nav-items" :class="{ open: menuOpen }">
      <a
        v-for="item in theme.nav.items"
        :key="item.link"
        :href="withBase(item.link)"
        @click="closeMenu"
      >
        <Icon :icon="item.icon" width="1em"></Icon>
        <span>{{ item.text }}</span>
      </a>
    </div>
    <button
      class="hamburger"
      type="button"
      :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
      @click="menuOpen = !menuOpen"
    >
      <Icon :icon="menuOpen ? 'mdi:close' : 'mdi:menu'" width="1.2em" />
    </button>
    <button class="mode-toggle" type="button" @click="toggleColorMode">
      <Icon
        :icon="
          colorMode === 'dark'
            ? 'mdi:weather-night'
            : colorMode === 'light'
              ? 'mdi:white-balance-sunny'
              : 'mdi:theme-light-dark'
        "
        width="1em"
      />
    </button>
  </header>
</template>

<style scoped>
.top-panel {
  display: flex;
  position: fixed;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: var(--top-panel-height);
  z-index: 10;
  background-color: rgba(from var(--card-bg-color) r g b / 1);
  transition-duration: 0.4s;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
  padding: 0 1.25rem;
  gap: 1.25rem;
}

.brand {
  margin-right: auto;
  display: flex;
  align-items: center;
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.nav-items > a {
  display: flex;
  align-items: center;
  padding: 0.25em 0.625em;
  border-radius: 0.375em;
  transition:
    background-color 0.2s,
    color 0.2s;
  cursor: pointer;
}

.nav-items > a:hover {
  background-color: var(--theme-color);
  color: #fff;
}

.mode-toggle {
  border: none;
  background: transparent;
  font: inherit;
  display: flex;
  align-items: center;
  padding: 0.25em 0.625em;
  border-radius: 0.375em;
  transition:
    background-color 0.2s,
    color 0.2s;
  cursor: pointer;
}

.mode-toggle:hover {
  background-color: var(--theme-color);
  color: #fff;
}

.hamburger {
  display: none;
  border: none;
  background: transparent;
  font: inherit;
  cursor: pointer;
  padding: 0.25em 0.5em;
  border-radius: 0.375em;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.hamburger:hover {
  background-color: var(--theme-color);
  color: #fff;
}

@media (orientation: portrait) {
  .hamburger {
    display: flex;
    align-items: center;
  }

  .nav-items {
    display: none;
    position: fixed;
    top: var(--top-panel-height);
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background-color: rgba(from var(--card-bg-color) r g b / 1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    padding: 0.5rem 0;
  }

  .nav-items.open {
    display: flex;
  }

  .nav-items > a {
    width: 100%;
    padding: 0.75em 1.5em;
    border-radius: 0;
    gap: 0.75em;
  }

  .nav-items > .mode-toggle {
    width: 100%;
    padding: 0.75em 1.5em;
    border-radius: 0;
    justify-content: flex-start;
  }
}

@media print {
  .top-panel {
    display: none;
  }
}
</style>
