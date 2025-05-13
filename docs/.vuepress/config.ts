import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import theme from "theme-kupi";
import { getDirname, path } from "vuepress/utils";
import Components from "unplugin-vue-components/vite";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      plugins: [
        Components({
          dts: ".vuepress/components.d.ts",
          deep: true,
          dirs: ["../theme", ".vuepress"],
          extensions: ["vue"],
        }),
      ],
    },
  }),
  theme: theme,
  title: "Wankupi's Blog",
  public: path.resolve(__dirname, "../../public"),
  dest: path.resolve(__dirname, "../../dist"),
  pagePatterns: ["**/*.md", "**/*.html", "**/*.pdf"],
  head: [["link", { rel: "icon", href: "/static/images/icon.png" }]],
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
});
