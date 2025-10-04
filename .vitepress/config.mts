import { defineConfig } from "vitepress";
import { use_math_converter } from "./math";
import { RssPlugin, type RSSOptions } from "vitepress-plugin-rss";

const baseUrl = "/";
const title = "Wankupi's Website";

const rssOptions: RSSOptions = {
  baseUrl: baseUrl,
  title: title,
  copyright: "",
  icon: false,
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: title,
  description: "",
  base: baseUrl,
  srcDir: "docs",
  outDir: "dist",
  srcExclude: ["**/template.html"],
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  vite: {
    resolve: {
      alias: {
        "@": "/home/wkp/website/new-blog/theme",
      },
    },
    // plugins: [RssPlugin(rssOptions)],
  },
  markdown: {
    math: false,
    config(md) {
      use_math_converter(md);
    },
  },
});
