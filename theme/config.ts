import { tex } from "@mdit/plugin-tex";
import MarkdownIt from "markdown-it";
import type { MarkdownOptions } from "vitepress";
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
