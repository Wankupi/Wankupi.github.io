import { defineConfigWithTheme } from "vitepress";
import { RssPlugin, type RSSOptions } from "vitepress-plugin-rss";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tsconfigPaths from "vite-tsconfig-paths";
import { type ThemeConfig, markdownConfig } from "theme-kupi/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, "..");

const hostname = process.env["HOSTNAME"] || "https://www.wankupi.top";
const baseUrl = process.env["BASE_URL"] || "/";

const title = "Wankupi's Website";

const rssOptions: RSSOptions = {
  baseUrl: (hostname + baseUrl).replace(/\/+$/, ""), // rss has repeated '//'
  title: title,
  copyright: "",
  author: {
    name: "Kunpeng Wang"
  },
  icon: false,
  favicon: `${hostname}${baseUrl}/favicon.ico`,
  filter(value, index, array) {
    return value.url.startsWith("/Article/");
  }
};

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: title,
  description: "Wankupi's academic page and blogs.",
  base: baseUrl,
  srcDir: "docs",
  outDir: "dist",
  srcExclude: ["**/template.html"],
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  head: [["link", { rel: "icon", href: `${baseUrl}favicon.ico` }]],
  vite: {
    plugins: [
      tsconfigPaths({
        projects: [
          path.resolve(workspaceRoot, "tsconfig.json"),
          path.resolve(workspaceRoot, "theme/tsconfig.json")
        ],
        ignoreConfigErrors: true,
        loose: true
      }),
      RssPlugin(rssOptions),
      viteStaticCopy({
        targets: [
          {
            src: ["**/*.*", "!**/*.md", "!**/.git/**", "!public/**"],
            dest: "",
            overwrite: "error"
          }
        ],
        structured: true
      })
    ]
  },
  markdown: {
    ...markdownConfig
  },
  themeConfig: {
    backgroundImage: "/static/images/background/home-main.jpg",
    themeColor: "#007acc",
    nav: {
      brand: { text: "Wankupi's Website", link: "/" },
      items: [
        { text: "主页", link: "/", icon: "material-symbols:home" },
        { text: "关于", link: "/about", icon: "mdi:more-horiz" },
        { text: "Academic", link: "/about", icon: "mdi:academic-cap" }
      ]
    }
  }
});
