// Bilingual toggle and small progressive enhancements.
// English is the default. ?lang=ko or ?lang=en in the URL, or a language the
// visitor chose with the toggle, overrides it.
(function () {
  var KEY = "a2a-lang";
  var root = document.documentElement;
  root.classList.add("js");

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function apply(lang) {
    root.lang = lang;
    var titles = { en: root.dataset.titleEn, ko: root.dataset.titleKo };
    if (titles[lang]) document.title = titles[lang];
    document.querySelectorAll(".lang-toggle").forEach(function (b) {
      b.textContent = lang === "ko" ? "EN" : "한국어";
      b.setAttribute("aria-label", lang === "ko" ? "Switch to English" : "한국어로 보기");
    });
  }

  var param = new URLSearchParams(location.search).get("lang");
  var forced = param === "en" || param === "ko" ? param : null;
  var stored = saved();
  apply(forced || (stored === "ko" || stored === "en" ? stored : "en"));

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".lang-toggle");
    if (!btn) return;
    var next = root.lang === "ko" ? "en" : "ko";
    try { localStorage.setItem(KEY, next); } catch (err) {}
    apply(next);
  });

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Fade sections in as they scroll into view. Content stays visible without JS.
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
})();
