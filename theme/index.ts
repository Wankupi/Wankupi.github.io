import type { Theme, App, Page } from "vuepress";
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);
const theme: Theme = {
  name: "theme-kupi",
  templateBuild: path.resolve(__dirname, "templates", "ssr.html"),
  clientConfigFile: path.resolve(__dirname, "client.ts"),
  plugins: [],
  onInitialized: (app: App) => {
    console.log("onInitialized");
    for (const page of app.pages) {
      console.log(page.path);
    }
  },
  extendsPage: (page: Page) => {
    const { path, frontmatter = {} } = page;
    if (frontmatter.permalink) return;
    if (path.endsWith(".html")) page.path = path.slice(0, -5);
    page.path = decodeURIComponent(page.path);
  },
  define: (app: App) => {
    return {
      __ALL_PAGES__: app.pages,
    };
  },
};

const my_theme = (options: App) => {
  return theme;
};

export default my_theme;
