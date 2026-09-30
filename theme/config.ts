import { tex } from "@mdit/plugin-tex";
import MarkdownIt from "markdown-it";
import type { DefaultTheme, MarkdownOptions } from "vitepress";
import { imageFigurePlugin } from "./markdown-image.ts";

export { transformArticleTimes } from "./page-times.ts";

export interface NavItem {
  text: string;
  link: string;
  icon: string;
}

export interface ContactItem {
  icon: string;
  href: string;
  title: string;
  color?: string;
}

export interface LicenseInfo {
  name: string;
  url: string;
}

export interface ThemeConfig {
  nav: {
    brand: { text: string; link: string };
    items: NavItem[];
  };
  themeColor?: string;
  background?: string;
  contacts?: ContactItem[];
  author?: string;
  license?: LicenseInfo;
  /**
   * VitePress local search. Pass the same `options.miniSearch` to `createTheme`
   * so the client reads the index the way it was built.
   */
  search?: {
    provider: "local";
    /** The ArticleList page that header searches land on. */
    page: string;
    options?: DefaultTheme.LocalSearchOptions;
  };
}

const headingRegex = /<h([1-6])[^>]*\sid="([^"]*)"[^>]*>(.*?)<\/h\1>/gis;

function htmlToText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// For search.options.miniSearch._splitIntoSections: VitePress's default splitter
// only recognizes headings containing a permalink <a href="#...">, which
// markdownConfig disables; split on heading ids instead.
export function* splitIntoSections(_file: string, html: string) {
  const parts = html.split(headingRegex);
  const lead = htmlToText(parts[0]);
  if (lead) yield { anchor: "", titles: [] as string[], text: lead };
  const parentTitles: string[] = [];
  for (let i = 1; i < parts.length; i += 4) {
    const level = Number(parts[i]) - 1;
    parentTitles[level] = htmlToText(parts[i + 2]);
    parentTitles.length = level + 1;
    yield {
      anchor: parts[i + 1],
      titles: parentTitles.filter(Boolean),
      text: htmlToText(parts[i + 3] ?? "")
    };
  }
}

export function use_math_converter(md: MarkdownIt) {
  md.use(tex, {
    allowInlineWithSpace: true,
    render: (content: string, displayMode: boolean) => {
      content = content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
      return `<span v-pre class="math ${
        displayMode ? "display" : "inline"
      }">\\${"(["[Number(displayMode)]}${content}\\${")]"[Number(displayMode)]}</span>`;
    }
  });
}

export let markdownConfig: MarkdownOptions = {
  math: false,
  config(md) {
    md.set({ highlight: null });
    use_math_converter(md);
    imageFigurePlugin(md);
  },
  anchor: {
    permalink(slug, opts, state, index) {
      /* pass */
    }
  }
};
