<script setup lang="ts">
import { onContentUpdated } from "vitepress";
import SideCard from "./SideCard.vue";
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

interface HeaderItem {
  id: string;
  text: string;
  level: number;
}

const headers = ref<HeaderItem[]>([]);
const activeId = ref<string>("");
let observer: IntersectionObserver | null = null;
const visible = new Map<string, boolean>();

function pickActive() {
  const first = headers.value.find((h) => visible.get(h.id));
  if (first) activeId.value = first.id;
}

function setupObserver() {
  observer?.disconnect();
  visible.clear();
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        visible.set((entry.target as HTMLElement).id, entry.isIntersecting);
      }
      pickActive();
    },
    { rootMargin: "0px 0px -70% 0px", threshold: 0 }
  );
  for (const h of headers.value) {
    const el = document.getElementById(h.id);
    if (el) observer.observe(el);
  }
}

function updateTOC() {
  const root = document.querySelector("#article");
  if (!root) {
    headers.value = [];
    return;
  }
  const nodes = Array.from(root.querySelectorAll("h1, h2, h3, h4"));
  headers.value = nodes
    .map((el) => {
      const id = (el as HTMLElement).id || "";
      return { id, text: el.textContent?.trim() || "", level: Number(el.tagName.slice(1)) };
    })
    .filter((h) => h.id && h.text);
  const first_header = headers.value[0];
  if (first_header) activeId.value = first_header.id;
  nextTick(setupObserver);
}

onMounted(() => {
  updateTOC();
  onContentUpdated(updateTOC);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <SideCard>
    <h3>目录 TOC</h3>
    <nav v-if="headers.length" class="toc">
      <ul>
        <li v-for="h in headers" :key="h.id" :class="`level-${h.level}`">
          <a :href="`#${h.id}`" :class="{ active: h.id === activeId }">{{ h.text }}</a>
        </li>
      </ul>
    </nav>
    <div v-else class="toc-empty">暂无目录</div>
  </SideCard>
</template>

<style scoped>
.toc ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.toc li {
  text-align: start;
}
.toc a {
  color: var(--text-color);
  text-decoration: none;
}

.toc a::before {
  content: "# ";
  opacity: 0.55;
  font-size: 0.85em;
}

.toc a:hover {
  text-decoration: underline;
}
.toc a.active {
  color: var(--theme-color);
  font-weight: 600;
}
.toc a.active::before {
  opacity: 1;
}
.toc {
  --indent: 0.5em;
}
.level-2 {
  padding-left: var(--indent);
  font-size: 0.95em;
}
.level-3 {
  padding-left: calc(2 * var(--indent));
  font-size: 0.9em;
}
.level-4 {
  padding-left: calc(3 * var(--indent));
  font-size: 0.8em;
}
.toc-empty {
  color: var(--text-color);
  font-size: 1rem;
  text-align: start;
}
</style>
