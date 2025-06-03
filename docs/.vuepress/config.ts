import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import theme from "theme-kupi";
import { getDirname, path } from "vuepress/utils";
import Components from "unplugin-vue-components/vite";
import { math_converter } from "./math";

const __dirname = getDirname(import.meta.url);
const root_url = "/";

export default defineUserConfig({
  base: root_url,
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
  pagePatterns: ["**/*.md", "**/*.html", "!**/template.html"],
  head: [["link", { rel: "icon", href: `${root_url}static/images/icon.png` }]],
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  plugins: [math_converter],
});
