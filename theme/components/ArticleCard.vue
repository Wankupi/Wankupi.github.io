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
  // import("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/styles/default.min.css");
  const hljs = (
    await import("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/es/highlight.min.js")
  ).default;
  const cpp = (
    await import("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/es/languages/cpp.min.js")
  ).default;
  hljs.registerLanguage("cpp", cpp);
  nextTick(() => {
    document.querySelectorAll("#article pre code").forEach((e) => {
      hljs.highlightElement(e);
    });
  });
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href =
    "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/styles/default.min.css";
  document.head.appendChild(style);
});
</script>

<style>
.card {
  display: block;
  position: relative;
  padding: 2em;
  background-color: var(--card-bg-color);
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.5);
  overflow-x: auto;
  margin-bottom: var(--item-gap);
}

@media (orientation: portrait) {
  .card {
    padding: 1em;
  }
}
</style>

<style lang="scss">
.card#article {
  text-indent: 2em;
  line-height: 1.5;
  word-break: break-all;

  h1,
  h2,
  h3,
  h4 {
    text-align: center;
    text-indent: 0;
  }
  ul,
  ol {
    padding-left: 1.5em;
  }
  ul,
  ol {
    text-indent: 0;
  }
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 20em;
    /* display: block; */
    margin-left: auto;
    margin-right: auto;
  }
  a {
    color: #49b1f5;
    text-decoration: underline;
  }
  pre {
    text-indent: 0;
    background-color: #212121;
    color: #eff;
    padding: 0.5em;
    border-radius: 0.5em;
    overflow-x: auto;
  }
  :not(pre) > code {
    padding: 2px 5px;
    background: #1b1f230d;
    color: #f47466;
  }
  [class^="language-"] {
    .lang,
    .copy {
      display: none;
    }
  }
}
</style>
