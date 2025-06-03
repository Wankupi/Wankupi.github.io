import type { Plugin } from "vuepress";
import { tex } from "@mdit/plugin-tex";

export const math_converter: Plugin = {
  name: "kupi-plugin-math-converter",
  extendsMarkdown: (md) => {
    md.use(tex, {
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
  },
};
