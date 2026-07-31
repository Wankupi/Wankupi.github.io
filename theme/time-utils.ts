// ── Shared persistent cache for git-based page times ─────────────────
// Used by both posts.data.ts (content loader) and page-times.ts (page hook).
import fs from "fs-extra";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const _moduleDir = path.dirname(fileURLToPath(import.meta.url));
const _cacheFile = path.resolve(_moduleDir, "data/.posts-cache.json");

export type PersistentCacheEntry = {
  createdAt: number;
  lastCommitAt: number;
  mtimeMs: number;
  size: number;
};

const _persistentCache = new Map<string, PersistentCacheEntry>();
let _cacheLoaded = false;
let _cacheDirty = false;

export function loadPersistentCache(): void {
  if (_cacheLoaded) return;
  _cacheLoaded = true;
  if (!fs.existsSync(_cacheFile)) return;
  try {
    const raw = fs.readJsonSync(_cacheFile) as Record<string, PersistentCacheEntry>;
    for (const [key, value] of Object.entries(raw)) {
      if (
        value &&
        Number.isFinite(value.createdAt) &&
        Number.isFinite(value.lastCommitAt) &&
        Number.isFinite(value.mtimeMs) &&
        Number.isFinite(value.size)
      ) {
        _persistentCache.set(key, value);
      }
    }
  } catch {
    // Ignore invalid cache content and rebuild on this run.
  }
}

export function savePersistentCache(): void {
  if (!_cacheDirty) return;
  fs.ensureDirSync(path.dirname(_cacheFile));
  const tmp = `${_cacheFile}.tmp`;
  fs.writeJsonSync(tmp, Object.fromEntries(_persistentCache), { spaces: 2 });
  fs.moveSync(tmp, _cacheFile, { overwrite: true });
  _cacheDirty = false;
}

export function getFileCreatedFallback(stats: fs.Stats): number {
  if (stats.birthtimeMs > 0) return stats.birthtimeMs;
  if (stats.ctimeMs > 0) return stats.ctimeMs;
  return stats.mtimeMs;
}

export function runGitTimestamp(args: string[], cwd: string): number | null {
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
      .filter((v) => Number.isFinite(v) && v > 0)
      .map((s) => s * 1000);
    if (values.length === 0) return null;
    return Math.min(...values);
  } catch {
    return null;
  }
}

export function resolveTimes(
  file: string,
  stats: fs.Stats,
  cacheKey: string
): { createdAt: number; lastCommitAt: number } {
  loadPersistentCache();

  const cached = _persistentCache.get(cacheKey);
  if (cached && cached.mtimeMs === stats.mtimeMs && cached.size === stats.size) {
    return { createdAt: cached.createdAt, lastCommitAt: cached.lastCommitAt };
  }

  const cwd = path.dirname(file);
  const gitPath = path.basename(file);
  const createdFallback = getFileCreatedFallback(stats);
  const lastCommitFallback = stats.mtimeMs;

  const createdAt = runGitTimestamp(
    ["log", "--diff-filter=A", "--follow", "--format=%ct", "--", gitPath],
    cwd
  ) ?? createdFallback;

  const lastCommitAt = runGitTimestamp(
    ["log", "-1", "--format=%ct", "--", gitPath],
    cwd
  ) ?? lastCommitFallback;

  _persistentCache.set(cacheKey, {
    createdAt: createdAt,
    lastCommitAt: lastCommitAt,
    mtimeMs: stats.mtimeMs,
    size: stats.size
  });
  _cacheDirty = true;

  return { createdAt, lastCommitAt };
}
