<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import { useData, useRouter, withBase } from "vitepress";
import { indexLoading, loadIndex, searchQuery } from "@/client/search";

const { theme, frontmatter } = useData();
const router = useRouter();
const input = useTemplateRef<HTMLInputElement>("input");

// Focused; a non-empty query keeps the box expanded after blur.
const open = ref(false);
const expanded = computed(() => open.value || searchQuery.value !== "");
const onListPage = computed(() => frontmatter.value.layout === "ArticleList");

async function expand() {
  open.value = true;
  loadIndex();
  await nextTick();
  input.value?.focus();
}

function collapse() {
  searchQuery.value = "";
  open.value = false;
  input.value?.blur();
}

// Searching from any other page jumps to the article list.
let navigating = false;
function onInput() {
  if (onListPage.value || navigating) return;
  navigating = true;
  router.go(withBase(theme.value.search.page)).finally(() => (navigating = false));
}

function onGlobalKeydown(e: KeyboardEvent) {
  if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
  const target = e.target as HTMLElement | null;
  if (target?.closest("input, textarea, select, [contenteditable]")) return;
  e.preventDefault();
  expand();
}

onMounted(() => window.addEventListener("keydown", onGlobalKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onGlobalKeydown));
</script>

<template>
  <div class="search" :class="{ expanded }">
    <button
      class="search-toggle"
      type="button"
      aria-label="搜索文章"
      title="搜索文章 (/)"
      :aria-expanded="expanded"
      @click="expand"
    >
      <Icon :icon="indexLoading ? 'mdi:loading' : 'mdi:magnify'" :class="{ spin: indexLoading }" width="1em" />
    </button>
    <input
      ref="input"
      v-model="searchQuery"
      type="search"
      class="search-input"
      placeholder="搜索文章…"
      aria-label="搜索文章"
      :tabindex="expanded ? 0 : -1"
      @input="onInput"
      @blur="open = false"
      @keydown.esc="collapse"
    />
    <button v-if="searchQuery" class="search-clear" type="button" aria-label="清除搜索" @click="collapse">
      <Icon icon="mdi:close-circle" width="1em" />
    </button>
  </div>
</template>

<style scoped>
.search {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 999px;
  transition:
    border-color 0.2s,
    background-color 0.2s,
    box-shadow 0.2s;
}

.search.expanded {
  border-color: color-mix(in srgb, var(--text-color) 20%, transparent);
  background-color: color-mix(in srgb, var(--text-color) 5%, transparent);
}

.search.expanded:focus-within {
  border-color: var(--theme-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-color) 25%, transparent);
}

.search-toggle,
.search-clear {
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.search-toggle {
  padding: 0.25em 0.625em;
  border-radius: 0.375em;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.search:not(.expanded) .search-toggle:hover {
  background-color: var(--theme-color);
  color: #fff;
}

.search.expanded .search-toggle {
  padding-right: 0.25em;
  opacity: 0.6;
}

.search-input {
  width: 0;
  min-width: 0;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: 1.75em;
  transition: width 0.25s ease;
}

.search.expanded .search-input {
  width: 12rem;
}

.search-input::-webkit-search-cancel-button {
  appearance: none;
}

.search-clear {
  padding: 0 0.5em 0 0.25em;
  opacity: 0.5;
}

.search-clear:hover {
  opacity: 1;
  color: var(--theme-color);
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Too narrow to squeeze in next to the brand: the open box covers the bar */
@media (orientation: portrait) {
  .search.expanded {
    position: absolute;
    left: 1rem;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    background-color: rgba(from var(--card-bg-color) r g b / 1);
  }

  .search.expanded .search-input {
    flex: 1;
    width: auto;
  }
}
</style>
