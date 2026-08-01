import type MarkdownIt from "markdown-it";

/**
 * Override markdown-it image renderer so that images with alt text
 * produce a caption rendered as <em> (inline, safe inside <p>).
 *
 *   ![caption](url)        → <img …><em>caption</em>
 *   ![](url)               → <img …>  (unchanged)
 *   ![caption](url "title")→ <img … title="title"><em>caption</em>
 */
export function imageFigurePlugin(md: MarkdownIt): void {
  let defaultRender = md.renderer.rules.image;
  md.renderer.rules.image = (tokens, idx, options, _env, self) => {
    const token = tokens[idx]!;
    const alt = token.content || "";

    // Render <img> with all original attributes preserved
    // (src, title, loading, etc. — including any added by VitePress plugins)
    const imgTag = defaultRender
      ? defaultRender(tokens, idx, options, _env, self)
      : self.renderToken(tokens, idx, options);

    if (!alt) {
      return imgTag;
    }

    // <em> is inline → valid inside the markdown-generated <p>
    return `${imgTag}<em>${alt}</em>`;
  };
}
