// =========================================================
// Monir Hosen — Portfolio
// Vanilla JS: sliding tab indicator + scroll-spy, KPI count-up
// =========================================================

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     TAB BAR: scroll-spy + sliding indicator
  --------------------------------------------------------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var indicator = document.getElementById("tabIndicator");
  var nav = document.querySelector(".tabbar__nav");
  var sections = tabs
    .map(function (tab) {
      var id = tab.getAttribute("data-tab");
      return document.getElementById(id);
    })
    .filter(Boolean);

  function moveIndicatorTo(tab) {
    if (!tab || !indicator) return;
    var navRect = nav.getBoundingClientRect();
    var tabRect = tab.getBoundingClientRect();
    indicator.style.left = (tabRect.left - navRect.left + nav.scrollLeft) + "px";
    indicator.style.width = tabRect.width + "px";
  }

  function setActiveTab(id) {
    var target = null;
    tabs.forEach(function (tab) {
      var isMatch = tab.getAttribute("data-tab") === id;
      tab.classList.toggle("is-active", isMatch);
      if (isMatch) target = tab;
    });
    if (target) {
      moveIndicatorTo(target);
      // keep active tab visible on small screens where the tab list scrolls
      var navRect = nav.getBoundingClientRect();
      var tRect = target.getBoundingClientRect();
      if (tRect.left < navRect.left || tRect.right > navRect.right) {
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
      }
    }
  }

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        // pick the entry closest to the top of the viewport that's intersecting
        var visible = entries.filter(function (e) { return e.isIntersecting; });
        if (visible.length) {
          visible.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
          setActiveTab(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { observer.observe(section); });
  }

  window.addEventListener("load", function () {
    var current = document.querySelector(".tab.is-active") || tabs[0];
    moveIndicatorTo(current);
  });
  window.addEventListener("resize", function () {
    var current = document.querySelector(".tab.is-active");
    moveIndicatorTo(current);
  });

  /* ---------------------------------------------------------
     KPI COUNT-UP
  --------------------------------------------------------- */
  var kpiNums = Array.prototype.slice.call(document.querySelectorAll(".kpi-card__num"));

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = parseInt(el.getAttribute("data-decimal") || "0", 10);

    if (reduceMotion || isNaN(target)) {
      el.textContent = (decimals ? target.toFixed(decimals) : Math.round(target).toLocaleString("en-US")) + suffix;
      return;
    }

    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current = target * eased;
      el.textContent = (decimals ? current.toFixed(decimals) : Math.round(current).toLocaleString("en-US")) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = (decimals ? target.toFixed(decimals) : Math.round(target).toLocaleString("en-US")) + suffix;
      }
    }
    window.requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && kpiNums.length) {
    var kpiObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    kpiNums.forEach(function (el) { kpiObserver.observe(el); });
  } else {
    kpiNums.forEach(animateCount);
  }
})();
