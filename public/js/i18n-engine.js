/**
 * i18n Translation Engine
 * Applies translations based on detected language.
 * Korean is the default HTML content; English is applied dynamically.
 */
(function() {
  'use strict';

  function getLang() {
    // 1. localStorage (user's explicit choice)
    var stored = localStorage.getItem('lang');
    if (stored === 'ko' || stored === 'en') return stored;

    // 2. Cookie (set by server or previous toggle)
    var match = document.cookie.match(/(?:^|; )lang=([^;]*)/);
    if (match && (match[1] === 'ko' || match[1] === 'en')) return match[1];

    // 3. html lang attribute (injected by server based on IP/headers)
    var htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang === 'en') return 'en';

    // 4. Default: Korean
    return 'ko';
  }

  function applyTranslations(lang) {
    var dict = window.I18N && window.I18N[lang];
    if (!dict) return;

    // data-i18n → textContent
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (dict[key] != null) els[i].textContent = dict[key];
    }

    // data-i18n-html → innerHTML (for content with markup like <span class="hl">)
    var htmlEls = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmlEls.length; j++) {
      var hKey = htmlEls[j].getAttribute('data-i18n-html');
      if (dict[hKey] != null) htmlEls[j].innerHTML = dict[hKey];
    }

    // data-i18n-placeholder → placeholder attribute
    var phEls = document.querySelectorAll('[data-i18n-placeholder]');
    for (var k = 0; k < phEls.length; k++) {
      var pKey = phEls[k].getAttribute('data-i18n-placeholder');
      if (dict[pKey] != null) phEls[k].placeholder = dict[pKey];
    }

    // data-i18n-data-text → data-text attribute (typing animation)
    var dtEls = document.querySelectorAll('[data-i18n-data-text]');
    for (var l = 0; l < dtEls.length; l++) {
      var dKey = dtEls[l].getAttribute('data-i18n-data-text');
      if (dict[dKey] != null) dtEls[l].setAttribute('data-text', dict[dKey]);
    }

    // data-i18n-data-msg → data-msg attribute (chat suggestion messages)
    var dmEls = document.querySelectorAll('[data-i18n-data-msg]');
    for (var m = 0; m < dmEls.length; m++) {
      var mKey = dmEls[m].getAttribute('data-i18n-data-msg');
      if (dict[mKey] != null) dmEls[m].setAttribute('data-msg', dict[mKey]);
    }

    // Page title from data-i18n-title attribute on <html>
    var titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey && dict[titleKey]) {
      document.title = dict[titleKey];
    }

    // Update html lang attribute
    document.documentElement.setAttribute('lang', lang);

    // Update language toggle button text (show opposite language)
    var toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = '$ ' + (lang === 'ko' ? 'EN' : 'KO');
    }
  }

  function toggleLang() {
    var current = getLang();
    var next = current === 'ko' ? 'en' : 'ko';
    localStorage.setItem('lang', next);
    document.cookie = 'lang=' + next + ';path=/;max-age=31536000;SameSite=Lax';
    location.reload();
  }

  // Initialize on load
  var lang = getLang();
  applyTranslations(lang);

  // Remove FOUC prevention class
  document.documentElement.classList.remove('lang-loading');

  // Expose public API
  window.I18N_ENGINE = {
    getLang: getLang,
    toggleLang: toggleLang,
    applyTranslations: applyTranslations
  };
})();
