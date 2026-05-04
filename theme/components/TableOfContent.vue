<script setup lang="ts">
import { onContentUpdated } from "vitepress";
import SideCard from "./SideCard.vue";
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";

interface HeaderItem {
  id: string;
  text: string;
  level: number;
}

interface HeaderNode extends HeaderItem {
  children: HeaderNode[];
}

const headers = ref<HeaderItem[]>([]);
const activeId = ref<string>("");
const navRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
const visible = new Map<string, boolean>();

function buildTree(flat: HeaderItem[]): HeaderNode[] {
  const roots: HeaderNode[] = [];
  const stack: HeaderNode[] = [];

  for (const h of flat) {
    const node: HeaderNode = { ...h, children: [] };
    while (stack.length > 0 && stack[stack.length - 1]!.level >= h.level) {
      stack.pop();
    }
    if (stack.length === 0) {
      roots.push(node);
    } else {
      stack[stack.length - 1]!.children.push(node);
    }
    stack.push(node);
  }
  return roots;
}

const tree = computed(() => buildTree(headers.value));

function pickActive() {
  const first = headers.value.find((h) => visible.get(h.id));
  if (first) activeId.value = first.id;
}

function scrollToActive(id: string) {
  if (!navRef.value) return;
  const el = navRef.value.querySelector(`a[href="#${id}"]`) as HTMLElement | null;
  if (!el) return;

  let offset = 0;
  let cur: HTMLElement | null = el;
  while (cur && cur !== navRef.value) {
    offset += cur.offsetTop;
    cur = cur.offsetParent as HTMLElement | null;
  }

  const containerH = navRef.value.clientHeight;
  const target = offset - containerH / 2 + el.offsetHeight / 2;
  navRef.value.scrollTop = Math.max(0, target);
}

watch(activeId, scrollToActive);

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
  const nodes = Array.from(root.querySelectorAll("h2, h3, h4"));
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
    <nav v-if="tree.length" ref="navRef" class="toc">
      <ul>
        <template v-for="root in tree" :key="root.id">
          <li :class="`level-${root.level}`">
            <a :href="`#${root.id}`" :class="{ active: root.id === activeId }">{{ root.text }}</a>
          </li>
          <template v-for="child in root.children" :key="child.id">
            <li :class="`level-${child.level}`">
              <a :href="`#${child.id}`" :class="{ active: child.id === activeId }">
                {{ child.text }}
              </a>
            </li>
            <li
              v-for="grandchild in child.children"
              :key="grandchild.id"
              :class="`level-${grandchild.level}`"
            >
              <a
                :href="`#${grandchild.id}`"
                :class="{ active: grandchild.id === activeId }"
              >
                {{ grandchild.text }}
              </a>
            </li>
          </template>
        </template>
      </ul>
    </nav>
    <div v-else class="toc-empty">暂无目录</div>
  </SideCard>
</template>

<style scoped>
.toc {
  position: relative;
  max-height: 16em;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--text-color) transparent;
}

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
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
