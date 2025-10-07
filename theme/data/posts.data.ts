import {
  createContentLoader,
  createMarkdownRenderer,
  defineLoader,
  type SiteConfig
} from "vitepress";
import fs from "fs-extra";
import matter from "gray-matter";
import path from "node:path";
import { normalizePath } from "vite";

export interface Page {
  title: string;
  url: string;
  date: number;
  excerpt: string | undefined;
  frontmatter?: { [key: string]: any };
}
declare const data: Page[];
export { data };

const cache = new Map<string, { data: any; timestamp: number }>();

const config: SiteConfig = (global as any).VITEPRESS_CONFIG;
if (!config) throw "undefine global";

export default defineLoader({
  watch: normalizePath(path.resolve(config.srcDir, "Article/**/*.md")),
  async load(watchedFiles) {
    const md = await createMarkdownRenderer(
      config.srcDir,
      config.markdown,
      config.site.base,
      config.logger
    );
    async function processFile(file: string): Promise<Page | null> {
      const timestamp = fs.statSync(file).mtimeMs;
      const cached = cache.get(file);
      if (cached && timestamp === cached.timestamp) return cached.data;

      const src = fs.readFileSync(file, "utf-8");

      const { data: frontmatter, excerpt } = matter(src);

      const url =
        "/" +
        normalizePath(path.relative(config.srcDir, file))
          .replace(/(^|\/)index\.md$/, "$1")
          .replace(/\.md$/, config.cleanUrls ? "" : ".html");

      const data: Page = {
        title: frontmatter.title,
        frontmatter: frontmatter,
        excerpt: excerpt,
        url: url,
        date: timestamp
      };

      cache.set(file, { data, timestamp });
      return data;
    }
    let raw = await Promise.all(watchedFiles.map(processFile));
    let res = raw.filter((x) => x != null);
    res.sort((a, b) => b.date - a.date);
    return res;
  }
});
