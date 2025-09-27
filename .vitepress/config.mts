import { defineConfig } from "vitepress";
import { use_math_converter } from "./math";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wankupi's Blog",
  description: "A VitePress Site",
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
    plugins: [],
  },
  markdown: {
    math: false,
    config(md) {
      use_math_converter(md);
    },
  },
});
