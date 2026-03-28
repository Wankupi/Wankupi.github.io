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
  console.log("Updating TOC...");
  const root =
    document.querySelector("#article") ||
    document.querySelector("article") ||
    document.querySelector(".markdown-body");
  if (!root) {
    headers.value = [];
    return;
  }
  const nodes = Array.from(root.querySelectorAll("h2, h3, h4"));
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

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }
}
</script>

<template>
  <SideCard>
    <h3>目录 TOC</h3>
    <nav v-if="headers.length" class="toc">
      <ul>
        <li v-for="h in headers" :key="h.id" :class="`level-${h.level}`">
          <a :href="`#${h.id}`" @click.prevent="scrollTo(h.id)">{{ h.text }}</a>
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
.level-3 {
  padding-left: 1rem;
  font-size: 0.95em;
}
.level-4 {
  padding-left: 2rem;
  font-size: 0.9em;
}
.toc-empty {
  color: var(--text-color);
  font-size: 1rem;
  text-align: start;
}
</style>
