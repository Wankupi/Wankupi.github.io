import { defineClientConfig } from "vuepress/client";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import NotFound from "./layouts/NotFound.vue";
import { provide } from "vue";
import { all_pages_key } from "./client/keys";
import Index from "./layouts/IndexLayout.vue";
import type { Page } from "vuepress";

declare const __ALL_PAGES__: Page[];

export default defineClientConfig({
  layouts: {
    Layout: DefaultLayout,
    NotFound: NotFound,
    Index: Index,
  },
  setup: () => {
    provide(all_pages_key, __ALL_PAGES__);
  },
});
