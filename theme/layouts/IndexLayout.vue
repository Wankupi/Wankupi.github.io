<script setup lang="ts">
import PersonInfo from "@/components/Academic/PersonInfo.vue";
import { useData } from "vitepress";
import { computed } from "vue";

const data = useData();
const lastUpdated = computed(() => data.page.value.lastUpdated);
const lastUpdated_str = computed(() =>
  lastUpdated.value ? new Date(lastUpdated.value).toLocaleDateString() : null
);
</script>

<template>
  <div class="rt-wrapper">
    <div class="rt-layout">
      <PersonInfo class="sticky-top"></PersonInfo>
      <div class="main">
        <Content />
        <div class="gray" v-if="lastUpdated">
          Last Updated on {{ lastUpdated_str }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rt-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2em;
}

.rt-layout {
  display: grid;
  grid-template-columns: 16em 1fr;
  align-items: start;

  max-width: 35cm;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  padding: 1em;

  background-color: white;
  border-radius: 3em;

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
}

.sticky-top {
  position: sticky;
  top: 0;
  /* z-index: 1; */
  /* padding: 1em; */
  /* background-color: white; */
  /* border-radius: 3em; */
}

.title {
  text-align: center;
}

.main {
  padding: 2em;
  font-size: 1.1em;
}

.gray {
  color: gray;
}
</style>

<style lang="scss">
.main {
  h1 {
    text-align: center;
  }

  // overflow: hidden;
  h1,
  h2,
  h3,
  h4 {
    font-family: "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto",
      "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    color: #44566c;
    font-weight: 600;
    line-height: 1.3;

    a {
      color: unset;
    }
  }

  a {
    text-decoration: none;
    color: #1890ff;
  }

  li {
    margin-left: 1em;
  }

  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
}
</style>
