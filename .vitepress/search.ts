import type { DefaultTheme } from "vitepress";

// Shared by config.ts (building the index) and theme/index.ts (loading it in
// the browser), so both sides tokenize text identically.

const segmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter("zh-CN", { granularity: "word" })
    : null;

// MiniSearch's default tokenizer splits on whitespace/punctuation only, which
// turns a whole Chinese sentence into one term. Use word segmentation instead.
function tokenize(text: string): string[] {
  if (!segmenter) return text.split(/[\s\p{P}\p{S}]+/u).filter(Boolean);
  const terms: string[] = [];
  for (const { segment, isWordLike } of segmenter.segment(text)) {
    if (isWordLike) terms.push(segment);
  }
  return terms;
}

export const miniSearch = {
  options: { tokenize },
  searchOptions: {
    prefix: true,
    // Typo tolerance only for longer words: on short ones a single edit is
    // already a different word (e.g. "ssh" would match "ssr").
    fuzzy: (term: string) => (term.length >= 5 ? 0.2 : false),
    combineWith: "AND",
    boost: { title: 4, text: 2, titles: 1 }
  }
} satisfies DefaultTheme.LocalSearchOptions["miniSearch"];
