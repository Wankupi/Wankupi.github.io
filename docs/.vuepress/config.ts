import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import theme from "theme-kupi";

import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  bundler: viteBundler(),
  theme: theme,
  title: "Wankupi's Blog",
  public: path.resolve(__dirname, "../../public"),
  dest: path.resolve(__dirname, "../../dist"),
});
