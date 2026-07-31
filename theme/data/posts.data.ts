import {
  defineLoader,
  type SiteConfig
} from "vitepress";
import fs from "fs-extra";
import matter from "gray-matter";
import path from "node:path";
import { normalizePath } from "vite";
import { loadPersistentCache, resolveTimes, savePersistentCache } from "../time-utils.ts";

export interface Page {
  title: string;
  url: string;
  updated_at: number;
  created_at: number;
  excerpt: string | undefined;
  frontmatter?: { [key: string]: any };
  hide: boolean;
}
declare const data: Page[];
export { data };

type MemoryCacheEntry = {
  data: Page;
  mtimeMs: number;
  size: number;
};

const cache = new Map<string, MemoryCacheEntry>();

const config: SiteConfig = (global as any).VITEPRESS_CONFIG;
if (!config) throw "undefine global";

export default defineLoader({
  watch: normalizePath(path.resolve(config.srcDir, "Article/**/*.md")),
  async load(watchedFiles) {
    loadPersistentCache();
    async function processFile(file: string): Promise<Page | null> {
      const stats = fs.statSync(file);
      const cacheKey = normalizePath(path.relative(config.srcDir, file));
      const cached = cache.get(file);
      if (cached && stats.mtimeMs === cached.mtimeMs && stats.size === cached.size) {
        return cached.data;
      }

      const { createdAt, lastCommitAt } = resolveTimes(file, stats, cacheKey);

      const src = fs.readFileSync(file, "utf-8");

      const { data: frontmatter, excerpt, content } = matter(src);

      const url =
        "/" +
        normalizePath(path.relative(config.srcDir, file))
          .replace(/(^|\/)index\.md$/, "$1")
          .replace(/\.md$/, config.cleanUrls ? "" : ".html");

      const data: Page = {
        title: frontmatter.title ?? content.match(/^\s*#\s+(.+)$/m)?.[1] ?? "Untitled",
        frontmatter: frontmatter,
        excerpt: excerpt,
        url: url,
        updated_at: lastCommitAt,
        created_at: createdAt,
        hide: frontmatter.hide === true
      };

      cache.set(file, { data, mtimeMs: stats.mtimeMs, size: stats.size });
      return data;
    }
    let raw = await Promise.all(watchedFiles.map(processFile));
    let res = raw.filter((x) => x != null);
    res.sort((a, b) => b.updated_at - a.updated_at);
    savePersistentCache();
    return res;
  }
});
