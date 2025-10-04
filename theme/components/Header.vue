<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { withBase } from "vitepress";
</script>

<template>
  <header class="top-panel">
    <a :href="withBase('/Article')">
      <Icon icon="material-symbols:home" width="1.5em"></Icon>
      <span>Wankupi's Blog</span>
    </a>
    <a :href="withBase('/about')" title="关于"><span>关于</span></a>
  </header>
</template>

<style>
.top-panel {
  display: flex;
  position: fixed;
  justify-content: space-evenly;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: var(--top-panel-height);
  z-index: 10;
  background-color: var(--card-bg-color);
  transition-duration: 0.4s;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
}

.top-panel > a {
  display: flex;
  align-items: center;
}

@media print {
  .top-panel {
    display: none;
  }
}
</style>
