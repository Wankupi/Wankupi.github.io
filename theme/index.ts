import type { Theme, App, Page } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import { get_file_create_and_modify_time } from "./server/file_time.ts";
import { iconPlugin } from "@vuepress/plugin-icon";

const __dirname = getDirname(import.meta.url);
const theme: Theme = {
  name: "theme-kupi",
  templateDev: path.resolve(__dirname, "templates", "ssr.html"),
  templateBuild: path.resolve(__dirname, "templates", "ssr.html"),
  clientConfigFile: path.resolve(__dirname, "client.ts"),
  extendsPage: (page: Page) => {
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
        .filter((page) => page.path.startsWith("/Article/"))
        .sort((a, b) => {
          return (
            new Date(b.frontmatter.date!).getTime() -
            new Date(a.frontmatter.date!).getTime()
          );
        }),
    };
  },
  alias: {
    "@": path.resolve(__dirname),
  },
  plugins: [iconPlugin({})],
};

const my_theme = (/*options: App*/) => {
  return theme;
};

export default my_theme;
