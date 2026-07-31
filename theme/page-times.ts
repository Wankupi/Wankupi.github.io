// ── Page time hook (transformPageData) ───────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { PageData, TransformPageContext } from "vitepress";
import { resolveTimes, savePersistentCache } from "./time-utils.ts";

const _moduleDir = path.dirname(fileURLToPath(import.meta.url));
const _repoRoot = path.resolve(_moduleDir, "..");

/**
 * `transformPageData` hook: put the git create/update time of every article
 * into its frontmatter, so article pages can show them without loading the
 * whole post list.
 */
export function transformArticleTimes(pageData: PageData, ctx: TransformPageContext) {
  if (!pageData.relativePath.startsWith("Article/")) return;

  const file = path.resolve(ctx.siteConfig.srcDir, pageData.relativePath);
  const stats = fs.statSync(file);
  const cacheKey = path.relative(_repoRoot, file).split(path.sep).join("/");

  const { createdAt, lastCommitAt } = resolveTimes(file, stats, cacheKey);

  // An explicit date in the markdown frontmatter wins over git history.
  pageData.frontmatter.created_at ??= createdAt;
  pageData.frontmatter.updated_at ??= lastCommitAt;

  savePersistentCache();
}
