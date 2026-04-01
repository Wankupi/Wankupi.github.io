import {
  createContentLoader,
  createMarkdownRenderer,
  defineLoader,
  type SiteConfig
} from "vitepress";
import fs from "fs-extra";
import matter from "gray-matter";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { normalizePath } from "vite";

export interface Page {
  title: string;
  url: string;
  updated_at: number;
  created_at: number;
  excerpt: string | undefined;
  frontmatter?: { [key: string]: any };
}
declare const data: Page[];
export { data };

type MemoryCacheEntry = {
  data: Page;
  mtimeMs: number;
  size: number;
};

type PersistentCacheEntry = {
  createdAt: number;
  lastCommitAt: number;
  mtimeMs: number;
  size: number;
};

const cache = new Map<string, MemoryCacheEntry>();
const persistentCache = new Map<string, PersistentCacheEntry>();
let persistentCacheLoaded = false;
let persistentCacheDirty = false;

const config: SiteConfig = (global as any).VITEPRESS_CONFIG;
if (!config) throw "undefine global";

const persistentCacheFile = path.resolve(config.srcDir, "../theme/data/.posts-cache.json");

function loadPersistentCache(): void {
  if (persistentCacheLoaded) return;
  persistentCacheLoaded = true;
  if (!fs.existsSync(persistentCacheFile)) return;
  try {
    const raw = fs.readJsonSync(persistentCacheFile) as Record<string, PersistentCacheEntry>;
    for (const [key, value] of Object.entries(raw)) {
      if (
        value &&
        Number.isFinite(value.createdAt) &&
        Number.isFinite(value.lastCommitAt) &&
        Number.isFinite(value.mtimeMs) &&
        Number.isFinite(value.size)
      ) {
        persistentCache.set(key, value);
      }
    }
  } catch {
    // Ignore invalid cache content and rebuild on this run.
  }
}

function savePersistentCache(): void {
  if (!persistentCacheDirty) return;
  fs.ensureDirSync(path.dirname(persistentCacheFile));
  const serializable = Object.fromEntries(persistentCache.entries());
  const tmpFile = `${persistentCacheFile}.tmp`;
  fs.writeJsonSync(tmpFile, serializable, { spaces: 2 });
  fs.moveSync(tmpFile, persistentCacheFile, { overwrite: true });
  persistentCacheDirty = false;
}

function getFileCreatedFallback(stats: fs.Stats): number {
  if (stats.birthtimeMs > 0) return stats.birthtimeMs;
  if (stats.ctimeMs > 0) return stats.ctimeMs;
  return stats.mtimeMs;
}

function runGitTimestamp(args: string[], cwd: string): number | null {
  try {
    const output = execFileSync("git", args, {
      cwd,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    if (!output) return null;
    const values = output
      .split(/\r?\n/)
      .map((line) => Number.parseInt(line.trim(), 10))
      .filter((value) => Number.isFinite(value) && value > 0)
      .map((seconds) => seconds * 1000);
    if (values.length === 0) return null;
    return Math.min(...values);
  } catch {
    return null;
  }
}

function resolveTimes(file: string, stats: fs.Stats, cacheKey: string): {
  createdAt: number;
  lastCommitAt: number;
} {
  const cached = persistentCache.get(cacheKey);
  if (cached && cached.mtimeMs === stats.mtimeMs && cached.size === stats.size) {
    return { createdAt: cached.createdAt, lastCommitAt: cached.lastCommitAt };
  }

  const cwd = path.dirname(file);
  const gitPath = path.basename(file);
  const createdFallback = getFileCreatedFallback(stats);
  const lastCommitFallback = stats.mtimeMs;

  const firstCommitAt = runGitTimestamp(
    ["log", "--diff-filter=A", "--follow", "--format=%ct", "--", gitPath],
    cwd
  );
  const lastCommitAtRaw = runGitTimestamp(
    ["log", "-1", "--format=%ct", "--", gitPath],
    cwd
  );

  const createdAt = firstCommitAt ?? createdFallback;
  const lastCommitAt = lastCommitAtRaw ?? lastCommitFallback;

  persistentCache.set(cacheKey, {
    createdAt,
    lastCommitAt,
    mtimeMs: stats.mtimeMs,
    size: stats.size
  });
  persistentCacheDirty = true;

  return { createdAt, lastCommitAt };
}

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
        created_at: createdAt
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
