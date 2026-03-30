<template>
  <div class="card" id="article">
    <Content />
  </div>
  <!-- <div class="card" id="Comment"></div> -->
</template>

<script setup lang="ts">
import { nextTick, onMounted } from "vue";

const loadMathJax = () => {
  if ("MathJax" in window) {
    window.MathJax.typesetPromise();
    return;
  }
  var MathJax = {
    startup: {
      elements: ["#Comment", "#article"],
      typeset: true,
      output: "chtml"
    },
    tex: {
      inlineMath: [["\\(", "\\)"]]
    },
    options: { enableMenu: false }
  };
  window.MathJax = MathJax;
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
  script.async = true;
  script.onload = () => {
    window.MathJax.typesetPromise();
  };
  document.head.appendChild(script);
};

const loadComment = () => {
  if (document.getElementById("Comment") === null) return;
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js";
  script.async = true;
  script.onload = () => {
    new Valine({
      el: "#Comment",
      app_id: "0fXMSbCD7SIxO3z7u5j1VjkL-gzGzoHsz",
      app_key: "eIi8ECHYotfQqPB4AQRI6nfi",
      placeholder: "写下你的精彩评论！",
      lang: "zh-CN",
      visitor: true,
      recordIP: true,
      requiredFields: ["nick", "mail"]
    });
  };
  document.head.appendChild(script);
};

onMounted(async () => {
  loadMathJax();
  loadComment();
  const hljs = (
    await import("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@latest/build/es/highlight.min.js")
  ).default;
  nextTick(() => {
    document.querySelectorAll("#article pre code").forEach(async (e) => {
      const match = e.className.match(/language-([^\s]+)/);
      if (match) {
        const lang = match[1];
        if (!hljs.getLanguage(lang)) {
          try {
            const langModule = (
              await import(
                `https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@latest/build/es/languages/${lang}.min.js`
              )
            ).default;
            hljs.registerLanguage(lang, langModule);
          } catch (err) {
            console.warn(`Failed to load highlight.js language: ${lang}`, err);
          }
        }
      }
      hljs.highlightElement(e);
    });
  });
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href =
    "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@latest/build/styles/atom-one-dark.min.css";
  document.head.appendChild(style);
});
</script>

<style scoped lang="scss">
.card {
  display: block;
  position: relative;
  padding: 2em;
  background-color: var(--card-bg-color);
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.5);
  overflow-x: auto;
  border-radius: var(--card-radius);
}

@media (orientation: portrait) {
  .card {
    padding: 1em;
  }
}

.card#article {
  text-indent: 2em;
  line-height: 1.5;
  word-break: break-all;
  tab-size: 4;

  :deep() {
    h1,
    h2,
    h3,
    h4 {
      font-family: var(--font-serif);
      text-align: left;
      text-indent: 0;
      letter-spacing: 0.01em;
      margin-top: 0.5rem;
      // margin-bottom: 0.5rem;
      transition: color 0.2s;
      &:hover {
        color: var(--theme-color);
      }
    }

    h1::before,
    h2::before,
    h3::before,
    h4::before {
      color: var(--theme-color);
      font-family: var(--font-mono);
      font-size: 0.8em;
      margin-right: 0.3rem;
    }

    h1::before {
      content: "#";
    }
    h2::before {
      content: "##";
    }
    h3::before {
      content: "###";
    }
    h4::before {
      content: "####";
    }

    ul,
    ol {
      padding-left: 1.5em;
      text-indent: 0;
    }

    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 20em;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }

    a {
      color: var(--theme-color);
      text-decoration: underline;
    }
    a.header-anchor {
      text-decoration: none;
      color: inherit;
    }

    pre {
      text-indent: 0;
    }
    pre > code {
      display: block;
      padding: 0.5em;
      border-radius: 0.5em;
      overflow-x: auto;
    }
    pre > code:not(.hljs) {
      background-color: #212121;
      color: #eff;
    }

    :not(pre) > code {
      padding: 2px 5px;
      border-radius: 3px;
      background: color-mix(in srgb, var(--theme-color) 8%, transparent);
      color: var(--theme-color);
    }

    p {
      margin: 0.3em 0;
    }

    blockquote {
      text-indent: 0;
      margin: 1em 0;
      padding: 0.5em 1em;
      border-left: 3px solid var(--theme-color);
      background: color-mix(in srgb, var(--theme-color) 5%, transparent);
      border-radius: 0 0.3em 0.3em 0;
    }

    table {
      text-indent: 0;
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
    }
    th,
    td {
      border: 1px solid #ddd;
      padding: 0.5em 0.8em;
      text-align: left;
    }
    th {
      background: color-mix(in srgb, var(--theme-color) 10%, transparent);
    }
    hr {
      border: none;
      border-top: 2px solid color-mix(in srgb, var(--theme-color) 30%, transparent);
      margin: 1.5em 0;
    }

    .vp-adaptive-theme[class^="language-"] {
      .lang,
      .copy {
        display: none;
      }
    }
  }
}
</style>
