import type { Theme, App, Page } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import { get_file_create_and_modify_time } from "./server/file_time.ts";

const __dirname = getDirname(import.meta.url);
const theme: Theme = {
  name: "theme-kupi",
  templateDev: path.resolve(__dirname, "templates", "ssr.html"),
  templateBuild: path.resolve(__dirname, "templates", "ssr.html"),
  clientConfigFile: path.resolve(__dirname, "client.ts"),
  plugins: [],
  onInitialized: (app: App) => {},
  extendsPage: (page: Page) => {
    const { path, frontmatter = {} } = page;
    if (frontmatter.permalink) return;
    if (path.endsWith(".html")) page.path = path.slice(0, -5);
    page.path = decodeURIComponent(page.path);

    if (!page.path.startsWith("/Article")) return;
    // make sure time
    const [create_time, modify_time] = get_file_create_and_modify_time(
      page.filePath
    );
    const now = new Date();
    page.frontmatter.date = create_time || now;
    page.frontmatter.lastUpdated = modify_time || now;
    page.date = page.frontmatter.date.toISOString();
  },
  define: (app: App) => {
    return {
      __ALL_PAGES__: app.pages
        .filter((page) => page.path.startsWith("/Article"))
        .sort((a, b) => {
          return (
            new Date(b.frontmatter.date!).getTime() -
            new Date(a.frontmatter.date!).getTime()
          );
        }),
    };
  },
};

const my_theme = (options: App) => {
  return theme;
};

export default my_theme;
