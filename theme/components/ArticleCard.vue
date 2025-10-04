<template>
  <div class="card" id="article">
    <Content />
  </div>
  <!-- <div class="card" id="Comment"></div> -->
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const loadMathJax = () => {
  if ("MathJax" in window) return;
  var MathJax = {
    startup: {
      elements: [".art-container", "#Comment", ".catalog"],
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

onMounted(() => {
  loadMathJax();
  loadComment();
});
</script>

<style scoped>
.card {
  display: block;
  position: relative;
  max-width: 30cm;
  padding: 2em;
  background-color: var(--card-bg-color);
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.5);
  overflow-x: auto;
  margin-bottom: var(--item-gap);
}

@media (max-aspect-ratio: 3/5), (max-width: 40em) {
  .card {
    margin: 1rem 0.5rem;
    padding: 1em;
  }
}
</style>

<style lang="scss">
.card#article {
  text-indent: 2em;
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
  ul {
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
}
</style>
