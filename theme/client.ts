import { defineClientConfig } from "vuepress/client";
import NotFound from "./layouts/NotFound.vue";
import { defineAsyncComponent, provide } from "vue";
import { all_pages_key } from "./client/keys";
import type { Page } from "vuepress";

declare const __ALL_PAGES__: Page[];

export default defineClientConfig({
  layouts: {
    NotFound: NotFound,
    Layout: defineAsyncComponent(() => import("@/layouts/DefaultLayout.vue")),
    ArticleList: defineAsyncComponent(
      () => import("@/layouts/ArticleListLayout.vue")
    ),
    Index: defineAsyncComponent(() => import("@/layouts/IndexLayout.vue")),
  },
  setup: () => {
    provide(all_pages_key, __ALL_PAGES__);
  },
});
