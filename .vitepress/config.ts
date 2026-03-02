import { defineConfigWithTheme } from "vitepress";
import { use_math_converter } from "./math";
import { RssPlugin, type RSSOptions } from "vitepress-plugin-rss";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { type ThemeConfig } from "theme-kupi/config";

const hostname = "https://www.wankupi.top";
const baseUrl = "/";
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
  description: "Wankupi's Academic Homepage and Blog",
  base: baseUrl,
  srcDir: "docs",
  outDir: "dist",
  srcExclude: ["**/template.html"],
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  head: [["link", { rel: "icon", href: `${baseUrl}favicon.ico` }]],
  vite: {
    resolve: {
      alias: {
        "@": "/home/wkp/website/new-blog/theme"
      }
    },
    plugins: [
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
    math: false,
    config(md) {
      md.set({ highlight: null });
      use_math_converter(md);
    }
  },
  themeConfig: {
    nav: {
      brand: { text: "Wankupi's Blog", link: "/Article" },
      items: [
        { text: "Homepage", link: "/", icon: "mdi:academic-cap" },
        { text: "Wankupi's Blog", link: "/Article", icon: "material-symbols:home" },
        { text: "关于", link: "/about", icon: "mdi:more-horiz" }
      ]
    }
  }
});
