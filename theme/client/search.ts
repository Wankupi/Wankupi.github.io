import localSearchIndex from "@localSearchIndex";
import type MiniSearch from "minisearch";
import type { DefaultTheme } from "vitepress";
import { markRaw, ref, shallowRef } from "vue";

export type MiniSearchConfig = NonNullable<DefaultTheme.LocalSearchOptions["miniSearch"]>;

// The site's miniSearch options (via createTheme): loading the index needs the
// same options it was built with, including functions like tokenize.
let miniSearchConfig: MiniSearchConfig = {};
export const configureSearch = (config: MiniSearchConfig) => {
  miniSearchConfig = config;
};

// Shared by the header search box (writes) and the article list (reads).
export const searchQuery = ref<string>("");

// Full-text index built by VitePress (themeConfig.search), loaded on demand.
let indexData = localSearchIndex;
export const searchIndex = shallowRef<MiniSearch | null>(null);
export const indexLoading = ref<boolean>(false);
let indexPromise: Promise<void> | null = null;

export const loadIndex = (locale = "root") =>
  (indexPromise ??= (async () => {
    indexLoading.value = true;
    try {
      const [{ default: MiniSearch }, mod] = await Promise.all([
        import("minisearch"),
        indexData[locale]?.()
      ]);
      if (!mod) return;
      const { options, searchOptions } = miniSearchConfig;
      searchIndex.value = markRaw(
        MiniSearch.loadJSON(mod.default, {
          // VitePress builds the index with these fields, then applies options.
          fields: ["title", "titles", "text"],
          storeFields: ["title", "titles"],
          ...options,
          searchOptions
        })
      );
    } catch (e) {
      indexPromise = null;
      throw e;
    } finally {
      indexLoading.value = false;
    }
  })());

if (import.meta.hot) {
  import.meta.hot.accept("@localSearchIndex", (m) => {
    if (!m) return;
    indexData = m.default;
    indexPromise = null;
    if (searchIndex.value) loadIndex();
  });
}
