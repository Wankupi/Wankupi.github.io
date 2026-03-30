<script setup lang="ts">
import { onContentUpdated } from "vitepress";
import SideCard from "./SideCard.vue";
import { ref, onMounted } from "vue";

interface HeaderItem {
  id: string;
  text: string;
  level: number;
}

const headers = ref<HeaderItem[]>([]);

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
}

onMounted(() => {
  updateTOC();
  onContentUpdated(updateTOC);
});
</script>

<template>
  <SideCard>
    <h3>目录 TOC</h3>
    <nav v-if="headers.length" class="toc">
      <ul>
        <li v-for="h in headers" :key="h.id" :class="`level-${h.level}`">
          <a :href="`#${h.id}`">{{ h.text }}</a>
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
