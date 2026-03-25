import type { Theme } from "vitepress";
import ViteLayout from "@/layouts/ViteLayout.vue";
import { defineAsyncComponent } from "vue";

const theme: Theme = {
  Layout: ViteLayout,
  enhanceApp({ app, router, siteData }) {
    app.component(
      "EduCard",
      defineAsyncComponent(() => import("@/components/Academic/EduCard.vue"))
    );
    app.component(
      "Tags",
      defineAsyncComponent(() => import("@/components/Academic/Tags.vue"))
    );
  },
};

export default theme;
