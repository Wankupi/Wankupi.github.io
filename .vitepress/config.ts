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
  lang: "zh-CN",
  themeConfig: {
    background: `linear-gradient(135deg,
color-mix(in srgb, skyblue 10%, light-dark(white, #292929)) 0%,
light-dark(white, #292929) 50%,
color-mix(in srgb, pink 10%, light-dark(white, #292929)) 100%)`,
    themeColor: "#1772d0",
    nav: {
      brand: { text: "Wankupi's Website", link: "/" },
      items: [
        { text: "Home", link: "/", icon: "material-symbols:home" },
        { text: "Blog", link: "/blog", icon: "fa7-solid:blog" }
      ]
    },
    contacts: [
      {
        icon: "mdi:email",
        href: "mailto:kunpengwang@sjtu.edu.cn",
        title: "email"
      },
      {
        icon: "mdi:github",
        href: "https://github.com/Wankupi",
        title: "github"
      },
      {
        icon: "academicons:orcid",
        href: "https://orcid.org/0009-0007-3720-6319",
        title: "orcid",
        color: "#a6ce39"
      },
      {
        icon: "simple-icons:qq",
        href: "https://wpa.qq.com/msgrd?v=3&uin=2893353848&site=qq&menu=yes",
        title: "qq"
      },
      {
        title: "bilibili",
        icon: "streamline-ultimate:bilibili-logo-bold",
        href: "https://space.bilibili.com/488096454"
      },
      {
        title: "Zhihu",
        icon: "simple-icons:zhihu",
        href: "https://www.zhihu.com/people/Wankupi"
      },
      {
        title: "Netease Cloud Music",
        icon: "ri:netease-cloud-music-fill",
        href: "https://music.163.com/#/user/home?id=552180677"
      }
    ]
  }
});
