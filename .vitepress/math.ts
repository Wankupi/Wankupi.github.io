import { tex } from "@mdit/plugin-tex";
import MarkdownIt from "markdown-it";

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
      }">\\${"(["[Number(displayMode)]}${content}\\${
        ")]"[Number(displayMode)]
      }</span>`;
    },
  });
}
