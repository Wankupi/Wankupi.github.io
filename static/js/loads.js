let isLocal = (location.hostname == "localhost" || location.hostname == "127.0.0.1");
let isMainPage = (location.pathname == "/");

var MathJax = { startup: { typeset: (!isMainPage), output: 'chtml' }, tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] }, options: { enableMenu: false } };

function loadJs(src, config, func) {
  let d = document.createElement("script");
  d.src = src;
  for (i in config) d.setAttribute(i, config[i]);
  d.addEventListener("load", (e) => { (typeof (func) == "function") && func(e); e.target.remove(); });
  document.head.appendChild(d);
}

function loadCss(url) {
  let lnk = document.createElement("link");
  lnk.rel = "stylesheet";
  lnk.type = "text/css";
  lnk.href = url;
  document.head.appendChild(lnk);
}

loadJs(isLocal ? "/static/js/MathJax/es5/tex-chtml.js" : "https://cdn.jsdelivr.net/npm/mathjax/es5/tex-chtml.js", { id: "MathJax-script", async: "" });

if (!isLocal) {
  loadJs("https://cdn.jsdelivr.net/npm/leancloud-storage@3/dist/av-min.js", { async: "" }, (e) => {
    AV.init({ appId: "0fXMSbCD7SIxO3z7u5j1VjkL-gzGzoHsz", appKey: "eIi8ECHYotfQqPB4AQRI6nfi", serverURL: "https://0fxmsbcd.lc-cn-n1-shared.com" });
    const r = new AV.Object("AccessRecords");
    r.set("url", location.pathname);
    r.set("hostname", location.hostname);
    if (AV.User.current()) r.set("User", AV.User.current().attributes.username);
    r.set("ua", navigator.appVersion);
    r.save();
  });
}

if (isMainPage) {
  loadJs(isLocal ? "/static/js/jquery/jquery.min.js" : "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js", { id: "jquery-script" }, () => {
    $(".scroll-down").on("click", function () { $("html,body").animate({ scrollTop: $("main").offset().top }, 1000); });
    $(".back-top").on("click", e => { $("html,body").animate({ scrollTop: 0 }, 1000); });
  });
}
else {
  document.title += " | Wankupi";

  loadCss("/static/css/highlight.css");

  loadJs("/static/js/highlight/highlight.pack.js", { async: true }, () => { hljs.initHighlighting(); });

  loadJs("https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js", { async: "" }, () => {
    new Valine({
      el: '#Comment',
      app_id: '0fXMSbCD7SIxO3z7u5j1VjkL-gzGzoHsz',
      app_key: 'eIi8ECHYotfQqPB4AQRI6nfi',
      placeholder: '写下你的精彩评论！',
      lang: 'zh-CN',
      visitor: true,
      recordIP: true,
      enableQQ: true,
      requiredFields: ['nick', 'mail']
    });
  });
}