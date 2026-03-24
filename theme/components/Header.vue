<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { withBase, useData } from "vitepress";

const { theme } = useData();
</script>

<template>
  <header class="top-panel">
    <a :href="withBase(theme.nav.brand.link)">
      <span>{{ theme.nav.brand.text }}</span>
    </a>
    <a v-for="item in theme.nav.items" :key="item.link" :href="withBase(item.link)">
      <Icon :icon="item.icon" width="1em"></Icon>
      <span>{{ item.text }}</span>
    </a>
  </header>
</template>

<style>
.top-panel {
  display: flex;
  position: fixed;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: var(--top-panel-height);
  z-index: 10;
  background-color: var(--card-bg-color);
  transition-duration: 0.4s;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
  padding: 0 20px;
  gap: 20px;
}

.top-panel > :first-child {
  margin-right: auto;
}

.top-panel > * {
  display: flex;
  align-items: center;
}

.top-panel > *:not(:first-child) {
  padding: 4px 10px;
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;
}

.top-panel > *:not(:first-child):hover {
  background-color: var(--theme-color);
  color: #fff;
}

@media print {
  .top-panel {
    display: none;
  }
}
</style>
