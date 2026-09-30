<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onContentUpdated } from "vitepress";
import { computed, onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import { readHighlight, termKind, termRegex, type SearchTerms } from "@/client/highlight";
import HitText from "./HitText.vue";

// Highlights the words passed from a search result (?hl= / ?hlf=) inside
// #article, using the CSS Custom Highlight API so the DOM stays untouched.

const NAMES = { exact: "search-hit-exact", fuzzy: "search-hit-fuzzy", current: "search-hit-current" };

let supported = false;
const terms = ref<SearchTerms | null>(null);
const ranges = shallowRef<Range[]>([]);
const current = ref(-1);
const shownTerms = computed(() =>
  terms.value ? [...new Set([...terms.value.exact, ...terms.value.fuzzy])].slice(0, 4) : []
);

let observer: MutationObserver | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
let lastKey = "";

function clearHighlights() {
  for (const name of Object.values(NAMES)) CSS.highlights.delete(name);
}

function setCurrent(i: number, scroll: boolean) {
  current.value = i;
  const range = ranges.value[i];
  if (!range) return CSS.highlights.delete(NAMES.current);
  const h = new Highlight(range);
  h.priority = 1;
  CSS.highlights.set(NAMES.current, h);
  if (scroll) {
    const rect = range.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + rect.top - window.innerHeight / 3, behavior: "smooth" });
  }
}

function collect() {
  const root = document.getElementById("article");
  const re = terms.value && termRegex(terms.value);
  const found: Range[] = [];
  const byKind = { exact: [] as Range[], fuzzy: [] as Range[] };
  if (root && re && terms.value) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) =>
        n.parentElement?.closest("script, style") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
      for (const m of node.data.matchAll(re)) {
        const range = new Range();
        range.setStart(node, m.index);
        range.setEnd(node, m.index + m[0].length);
        byKind[termKind(terms.value, m[0])].push(range);
        found.push(range);
      }
    }
  }
  CSS.highlights.set(NAMES.exact, new Highlight(...byKind.exact));
  CSS.highlights.set(NAMES.fuzzy, new Highlight(...byKind.fuzzy));
  ranges.value = found;
  setCurrent(Math.min(Math.max(current.value, 0), found.length - 1), false);
}

// Index of the first match after the element the URL hash points to.
function firstAfterHash(): number {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (!target) return -1;
  return ranges.value.findIndex(
    (r) => target.compareDocumentPosition(r.startContainer) & Node.DOCUMENT_POSITION_FOLLOWING
  );
}

function init() {
  if (!supported) return;
  const key = location.pathname + location.search;
  if (key === lastKey) return;
  lastKey = key;
  terms.value = readHighlight(location.search);
  current.value = -1;
  if (!terms.value) {
    ranges.value = [];
    return clearHighlights();
  }
  collect();
  if (!ranges.value.length) return;
  // With a hash the browser already scrolls to that section; otherwise go to the first hit.
  const after = firstAfterHash();
  if (after >= 0) setCurrent(after, false);
  else if (!location.hash) setCurrent(0, true);
}

function step(delta: number) {
  const n = ranges.value.length;
  if (n) setCurrent((current.value + delta + n) % n, true);
}

function close() {
  terms.value = null;
  ranges.value = [];
  clearHighlights();
  const url = new URL(location.href);
  url.searchParams.delete("hl");
  url.searchParams.delete("hlf");
  history.replaceState(history.state, "", url.toString());
  lastKey = location.pathname + location.search;
}

onMounted(() => {
  supported = typeof CSS !== "undefined" && "highlights" in CSS;
  if (!supported) return;
  // highlight.js and MathJax rewrite parts of the article after load, which
  // detaches existing ranges; recollect once the DOM settles.
  observer = new MutationObserver(() => {
    if (!terms.value) return;
    clearTimeout(timer);
    timer = setTimeout(collect, 100);
  });
  const root = document.getElementById("article");
  if (root) observer.observe(root, { childList: true, subtree: true, characterData: true });
  init();
});

onContentUpdated(init);

onBeforeUnmount(() => {
  observer?.disconnect();
  clearTimeout(timer);
  if (supported) clearHighlights();
});
</script>

<template>
  <div v-if="terms" class="hl-bar" role="status">
    <Icon icon="mdi:text-search" class="hl-icon"></Icon>
    <span class="hl-terms">
      <HitText v-for="t in shownTerms" :key="t" :text="t" :terms="terms" />
    </span>
    <span class="hl-count">
      {{ ranges.length ? `${current + 1} / ${ranges.length}` : "正文中未找到" }}
    </span>
    <button type="button" aria-label="上一处" :disabled="!ranges.length" @click="step(-1)">
      <Icon icon="mdi:chevron-up" width="1.2em" />
    </button>
    <button type="button" aria-label="下一处" :disabled="!ranges.length" @click="step(1)">
      <Icon icon="mdi:chevron-down" width="1.2em" />
    </button>
    <button type="button" aria-label="取消高亮" @click="close">
      <Icon icon="mdi:close" width="1.1em" />
    </button>
  </div>
</template>

<style>
::highlight(search-hit-exact) {
  background-color: var(--hit-exact-bg);
  color: inherit;
}

::highlight(search-hit-fuzzy) {
  background-color: var(--hit-fuzzy-bg);
  color: inherit;
  text-decoration: underline wavy var(--hit-fuzzy-line);
}

::highlight(search-hit-current) {
  background-color: var(--hit-current-bg);
  color: inherit;
}
</style>

<style scoped>
.hl-bar {
  position: fixed;
  z-index: 12;
  top: calc(var(--top-panel-height) + 0.75rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5em;
  max-width: calc(100vw - 2rem);
  padding: 0.25em 0.5em 0.25em 0.9em;
  border-radius: 999px;
  background-color: rgba(from var(--card-bg-color) r g b / 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  font-size: 0.9em;
  white-space: nowrap;
}

.hl-icon {
  color: var(--theme-color);
  flex-shrink: 0;
}

.hl-terms {
  display: flex;
  gap: 0.3em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hl-terms :deep(mark) {
  padding: 0 0.25em;
}

.hl-count {
  color: gray;
  font-variant-numeric: tabular-nums;
}

.hl-bar button {
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  padding: 0.2em;
  border-radius: 50%;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.hl-bar button:hover:not(:disabled) {
  background-color: var(--theme-color);
  color: #fff;
}

.hl-bar button:disabled {
  opacity: 0.4;
  cursor: default;
}

@media print {
  .hl-bar {
    display: none;
  }
}
</style>
