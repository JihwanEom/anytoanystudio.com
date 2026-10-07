// Bilingual toggle. English is the default; Korean browsers start in Korean.
(function () {
  var KEY = "a2a-lang";
  var root = document.documentElement;

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

  // ?lang=en or ?lang=ko in the URL wins over the saved and browser language.
  var param = new URLSearchParams(location.search).get("lang");
  var forced = param === "en" || param === "ko" ? param : null;
  var initial = forced || saved() || ((navigator.language || "").toLowerCase().indexOf("ko") === 0 ? "ko" : "en");
  apply(initial);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".lang-toggle");
    if (!btn) return;
    var next = root.lang === "ko" ? "en" : "ko";
    try { localStorage.setItem(KEY, next); } catch (err) {}
    apply(next);
  });

  var y = document.querySelectorAll("[data-year]");
  y.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
