import { defineClientConfig } from "vuepress/client";
import Layout from "./layouts/Layout.vue";
import NotFound from "./layouts/NotFound.vue";

declare const __ALL_PAGES__: string;

export default defineClientConfig({
  layouts: {
    Layout,
    NotFound,
  },
  setup: () => {
    console.log("client setup");
    console.log("all pages", __ALL_PAGES__);
  }
});
