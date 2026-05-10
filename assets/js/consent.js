/* Postlewhite Plumbing — cookie consent banner + Google Consent Mode v2
   - Stores user choice in localStorage under "pp_consent"
   - Updates gtag consent state when user picks Accept or Reject
   - Exposes window.openCookieSettings() so the footer link can re-prompt
*/
(function () {
  "use strict";

  var KEY = "pp_consent";
  var CSS_ID = "pp-consent-banner";

  function readConsent() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }
  function writeConsent(value) {
    try { localStorage.setItem(KEY, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }

  function applyConsent(analyticsGranted) {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: analyticsGranted ? "granted" : "denied",
        ad_user_data: analyticsGranted ? "granted" : "denied",
        ad_personalization: analyticsGranted ? "granted" : "denied",
        analytics_storage: analyticsGranted ? "granted" : "denied"
      });
    }
  }

  function buildBanner() {
    if (document.getElementById(CSS_ID)) return;

    var banner = document.createElement("div");
    banner.id = CSS_ID;
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<div class="cookie-banner-text">' +
          '<strong>We use cookies</strong>' +
          '<p>We use Google Analytics cookies to understand how visitors use our site so we can improve it. ' +
          'See our <a href="/privacy.html">privacy policy</a>.</p>' +
        '</div>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" class="btn btn-ghost" data-consent="reject">Reject</button>' +
          '<button type="button" class="btn btn-primary" data-consent="accept">Accept</button>' +
        '</div>' +
      '</div>';

    function close() { if (banner && banner.parentNode) banner.parentNode.removeChild(banner); }

    banner.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.dataset && t.dataset.consent) {
        var accepted = t.dataset.consent === "accept";
        writeConsent({ analytics: accepted, ts: Date.now(), v: 1 });
        applyConsent(accepted);
        close();
      }
    });

    document.body.appendChild(banner);
  }

  function init() {
    var saved = readConsent();
    if (saved && typeof saved.analytics === "boolean") {
      applyConsent(saved.analytics);
      return;
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", buildBanner);
    } else {
      buildBanner();
    }
  }

  // Footer link calls this to re-prompt
  window.openCookieSettings = function () {
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    var existing = document.getElementById(CSS_ID);
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    buildBanner();
  };

  init();
})();
