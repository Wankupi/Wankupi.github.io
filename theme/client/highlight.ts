// Search-term highlighting, shared by the article list (result titles) and
// the article page (terms passed along as ?hl= / ?hlf=).

export interface SearchTerms {
  /** Words matched as typed, or as a prefix of what was typed. Lowercase. */
  exact: string[];
  /** Words matched only through typo tolerance. Lowercase. */
  fuzzy: string[];
}

export interface SectionHit {
  anchor: string;
  title?: string;
}

export interface SearchMatch extends SearchTerms {
  /** Body sections that matched, best first. */
  sections: SectionHit[];
}

export type HitKind = "exact" | "fuzzy";

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function termRegex(terms: SearchTerms): RegExp | null {
  const all = [...new Set([...terms.exact, ...terms.fuzzy])]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  return all.length ? new RegExp(all.map(escapeRegExp).join("|"), "giu") : null;
}

export function termKind(terms: SearchTerms, matched: string): HitKind {
  const m = matched.toLowerCase();
  return !terms.exact.includes(m) && terms.fuzzy.includes(m) ? "fuzzy" : "exact";
}

export function splitSegments(text: string, terms: SearchTerms): { text: string; kind?: HitKind }[] {
  const re = termRegex(terms);
  if (!re) return [{ text }];
  const out: { text: string; kind?: HitKind }[] = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > last) out.push({ text: text.slice(last, m.index) });
    out.push({ text: m[0], kind: termKind(terms, m[0]) });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

export function withHighlight(url: string, terms?: SearchTerms, anchor?: string): string {
  const params = new URLSearchParams();
  if (terms?.exact.length) params.set("hl", terms.exact.join(" "));
  if (terms?.fuzzy.length) params.set("hlf", terms.fuzzy.join(" "));
  const qs = params.toString();
  return url + (qs ? `?${qs}` : "") + (anchor ? `#${anchor}` : "");
}

export function readHighlight(search: string): SearchTerms | null {
  const params = new URLSearchParams(search);
  const split = (v: string | null) => (v ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  const terms = { exact: split(params.get("hl")), fuzzy: split(params.get("hlf")) };
  return terms.exact.length || terms.fuzzy.length ? terms : null;
}
