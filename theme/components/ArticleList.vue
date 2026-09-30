<script setup lang="ts">
import ArticleItemCard from "@/components/ArticleItemCard.vue";
import { indexLoading, loadIndex, searchIndex, searchQuery as query } from "@/client/search";
import type { SearchMatch, SectionHit } from "@/client/highlight";
import { data, type Page } from "#posts-data";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRouter } from "vitepress";

const pageSize = 10;
const router = useRouter();

const current_page_num = ref<number>(1);
const show_hidden = ref<boolean>(false);

const metaText = (page: Page) =>
  [page.title, page.url.split("/")[2], page.frontmatter?.keywords]
    .flat()
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

// Full-text results grouped by article url; sections stay in score order.
const fullTextHits = computed(() => {
  const hits = new Map<
    string,
    {
      score: number;
      exact: Set<string>;
      fuzzy: Set<string>;
      sections: (SectionHit & { titleOnly: boolean })[];
    }
  >();
  const q = query.value.trim();
  if (!q || !searchIndex.value) return hits;
  for (const r of searchIndex.value.search(q)) {
    const [url, anchor = ""] = String(r.id).split("#");
    const fields = new Set(Object.values(r.match).flat());
    let hit = hits.get(url);
    if (!hit) hits.set(url, (hit = { score: 0, exact: new Set(), fuzzy: new Set(), sections: [] }));
    hit.score = Math.max(hit.score, r.score);
    // A word reached from a query term (as tokenized by the index) by exact or
    // prefix match; anything else came through typo tolerance.
    for (const term of r.terms) {
      const exact = r.queryTerms.some((t) => term.startsWith(t));
      (exact ? hit.exact : hit.fuzzy).add(term);
    }
    // Matching only a parent heading is not a hit in this section.
    if (fields.has("text") || fields.has("title"))
      hit.sections.push({ anchor, title: r.title, titleOnly: !fields.has("text") });
  }
  return hits;
});

const filteredData = computed<{ page: Page; match?: SearchMatch }[]>(() => {
  const visible = show_hidden.value ? data : data.filter((page) => !page.hide);
  const terms = query.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return visible.map((page) => ({ page }));
  return visible
    .map((page) => {
      const text = metaText(page);
      const metaHit = terms.every((term) => text.includes(term));
      const hit = fullTextHits.value.get(page.url);
      const match: SearchMatch = {
        exact: [...new Set([...terms, ...(hit?.exact ?? [])])],
        fuzzy: [...(hit?.fuzzy ?? [])],
        // Matching only the article's own h1 is not a body hit.
        sections: (hit?.sections ?? []).filter((s) => !s.titleOnly || s.title !== page.title)
      };
      return { page, match, metaHit, score: hit?.score ?? 0 };
    })
    .filter(({ metaHit, score }) => metaHit || score > 0)
    .sort((a, b) => Number(b.metaHit) - Number(a.metaHit) || b.score - a.score)
    .map(({ page, match }) => ({ page, match }));
});

const totalPages = computed<number>(() => Math.max(1, Math.ceil(filteredData.value.length / pageSize)));
const pagedData = computed(() => {
  const start = (current_page_num.value - 1) * pageSize;
  return filteredData.value.slice(start, start + pageSize);
});

const syncFromUrl = (keepQuery = false) => {
  const params = new URLSearchParams(window.location.search);
  show_hidden.value = params.has("show_hidden");
  // On mount without ?q=, keep what was typed in the header before arriving.
  if (params.has("q") || !keepQuery) query.value = params.get("q") ?? "";
  const pageParam = params.get("page");
  const parsedPage = Number(pageParam);
  if (!Number.isInteger(parsedPage)) {
    current_page_num.value = 1;
    return;
  }
  current_page_num.value = Math.min(totalPages.value, Math.max(1, parsedPage));
};

const onPopState = () => syncFromUrl();

onMounted(() => {
  syncFromUrl(true);
  writeQueryToUrl(query.value);
  window.addEventListener("popstate", onPopState);
});

onBeforeUnmount(() => {
  window.removeEventListener("popstate", onPopState);
  // Don't carry the query to other pages; coming back restores it from ?q=.
  query.value = "";
});

const goToPage = (page: number) => {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("page", String(page));
  current_page_num.value = page;
  router.go(nextUrl.toString());
};

// Mirror the query into ?q= so results survive reloads and back navigation.
const writeQueryToUrl = (q: string) => {
  if (q) loadIndex();
  const nextUrl = new URL(window.location.href);
  if ((nextUrl.searchParams.get("q") ?? "") === q) return;
  if (q) nextUrl.searchParams.set("q", q);
  else nextUrl.searchParams.delete("q");
  nextUrl.searchParams.delete("page");
  current_page_num.value = 1;
  window.history.replaceState(window.history.state, "", nextUrl.toString());
};

watch(query, writeQueryToUrl);
</script>

<template>
  <div v-if="query.trim()" class="search-status">
    <span>
      搜索「<strong>{{ query.trim() }}</strong>」：{{
        indexLoading ? "正在加载全文索引…" : `共 ${filteredData.length} 篇`
      }}
    </span>
    <button type="button" class="search-reset" @click="query = ''">清除</button>
  </div>
  <div v-if="filteredData.length === 0 && !indexLoading" class="search-empty">没有找到相关文章</div>
  <ArticleItemCard
    v-for="{ page, match } in pagedData"
    :page="page"
    :match="match"
    :key="page.url"
  ></ArticleItemCard>
  <div v-if="totalPages > 1" class="left">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      class="button"
      :disabled="page === current_page_num"
    >
      {{ page }}
    </button>
  </div>
</template>

<style scoped>
.search-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  padding: 0.5em 1em;
  border-radius: var(--card-radius);
  background-color: var(--card-bg-color);
  border-left: var(--theme-color) 3px solid;
}

.search-reset {
  border: none;
  background: transparent;
  color: var(--theme-color);
  font: inherit;
  cursor: pointer;
  white-space: nowrap;
}

.search-reset:hover {
  text-decoration: underline;
}

.search-empty {
  text-align: center;
  color: gray;
  padding: 2em 0;
}

.left {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(2.5rem, max-content));
  justify-content: center;
  justify-items: center;
  gap: var(--item-gap);
}

.left .button {
  width: 3rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.button {
  border: var(--theme-color) solid 2px;
  border-radius: 0.5em;
  line-height: 2em;
  padding: 0 1.5em;
  transition-duration: 0.3s;
  background: var(--card-bg-color);
  color: var(--text-color);
}

.button:disabled,
.button:hover {
  background-color: var(--theme-color);
  color: #fff;
}
</style>
