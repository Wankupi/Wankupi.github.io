import { defineClientConfig } from "vuepress/client";
import Layout from "./layouts/Layout.vue";
import NotFound from "./layouts/NotFound.vue";
import { provide } from "vue";
import { all_pages_key } from "./keys";
import Index from "./layouts/Index.vue";
import type { Page } from "vuepress";

declare const __ALL_PAGES__: Page[];

export default defineClientConfig({
  layouts: {
    Layout,
    NotFound,
    "Index": Index
  },
  setup: () => {
    console.log("client setup");
    console.log("all pages", __ALL_PAGES__);
    provide(all_pages_key, __ALL_PAGES__);
  },
});
