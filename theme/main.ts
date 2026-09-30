import type { Theme } from "vitepress";
import ViteLayout from "@/layouts/ViteLayout.vue";
import { defineAsyncComponent } from "vue";
import { configureSearch, type MiniSearchConfig } from "@/client/search";

export interface ThemeOptions {
  /** The `search.options.miniSearch` given in the site config. */
  miniSearch?: MiniSearchConfig;
}

export const createTheme = ({ miniSearch = {} }: ThemeOptions = {}): Theme => {
  configureSearch(miniSearch);
  return {
    Layout: ViteLayout,
    enhanceApp({ app, router, siteData }) {
      app.component(
        "EduCard",
        defineAsyncComponent(() => import("@/components/Academic/EduCard.vue"))
      );
      app.component(
        "PublicationCard",
        defineAsyncComponent(() => import("@/components/Academic/PublicationCard.vue"))
      );
      app.component(
        "IconLink",
        defineAsyncComponent(() => import("@/components/Academic/IconLink.vue"))
      );
      app.component(
        "Tags",
        defineAsyncComponent(() => import("@/components/Academic/Tags.vue"))
      );
    },
  };
};
