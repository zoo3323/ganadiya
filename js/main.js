// ============================================================
// 가나디야 랜딩페이지 인터랙션
// 1) CTA URL 주입  2) 모바일 네비  3) 스크롤 리빌  4) FAQ 단일 열림
// ============================================================
(function () {
  "use strict";

  // 리빌 숨김은 JS가 살아 있을 때만 적용 (미동작 시 콘텐츠 항상 노출)
  document.documentElement.classList.add("js");

  // ---------- 1) CTA URL 주입 ----------
  // config.js의 FORM_URL 하나만 바꾸면 모든 CTA에 반영됩니다.
  if (typeof GANADIYA_CONFIG !== "undefined" && GANADIYA_CONFIG.FORM_URL) {
    document.querySelectorAll("a[data-cta]").forEach(function (a) {
      a.href = GANADIYA_CONFIG.FORM_URL;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  // ---------- 2) 모바일 네비 ----------
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });

    // 링크 클릭 시 자동 닫힘
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "메뉴 열기");
      }
    });
  }

  // ---------- 3) 스크롤 리빌 ----------
  var reveals = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  }

  // ---------- 4) FAQ 단일 열림 ----------
  var faqItems = document.querySelectorAll(".faq-list details");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  // ---------- 헤더 스크롤 그림자 ----------
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
