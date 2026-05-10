/* Postlewhite Plumbing — small enhancements
   - Hamburger nav toggle
   - Highlight current nav link
   - Smooth-close menu after clicking a link on mobile
   - FAQ accordion behavior is native (<details>)
*/
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".primary-nav");

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    // Mark current page in nav
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".primary-nav a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      var page = href.split("/").pop();
      if (page === here) {
        a.setAttribute("aria-current", "page");
      }
    });

    // Update copyright year
    var yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();
  });
})();
