/**
 * Saukhya Clinic - Multilingual i18n Client
 * Instant language switching with localStorage persistence.
 */
(function () {
  'use strict';

  var currentLang = 'en';

  // Helper to resolve nested keys like "hero.headline"
  function getNested(obj, path) {
    if (!obj || !path) return null;
    var parts = path.split('.');
    var curr = obj;
    for (var i = 0; i < parts.length; i++) {
      if (curr[parts[i]] === undefined) return null;
      curr = curr[parts[i]];
    }
    return curr;
  }

  function applyTranslations(lang) {
    if (!window.saukhyaTranslations || !window.saukhyaTranslations[lang]) return;
    var dict = window.saukhyaTranslations[lang];

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Elements with data-i18n
    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = getNested(dict, key);
      if (val !== null && typeof val === 'string') {
        var paramsStr = el.getAttribute('data-i18n-params');
        if (paramsStr) {
          try {
            var params = JSON.parse(paramsStr);
            for (var p in params) {
              val = val.replace(new RegExp('\\{' + p + '\\}', 'g'), params[p]);
            }
          } catch (e) {}
        }
        el.textContent = val;
      }
    });

    // Elements with data-i18n-placeholder
    var placeholderEls = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderEls.forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = getNested(dict, key);
      if (val !== null && typeof val === 'string') {
        el.setAttribute('placeholder', val);
      }
    });

    // Elements with data-i18n-aria
    var ariaEls = document.querySelectorAll('[data-i18n-aria]');
    ariaEls.forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      var val = getNested(dict, key);
      if (val !== null && typeof val === 'string') {
        el.setAttribute('aria-label', val);
      }
    });

    // Update active class on language toggle buttons
    var buttons = document.querySelectorAll('[data-lang-select]');
    buttons.forEach(function (btn) {
      var btnLang = btn.getAttribute('data-lang-select');
      if (btnLang === lang) {
        btn.classList.add('bg-teal-700', 'text-white', 'font-semibold');
        btn.classList.remove('text-slate-700', 'hover:bg-slate-100');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('bg-teal-700', 'text-white', 'font-semibold');
        btn.classList.add('text-slate-700', 'hover:bg-slate-100');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    currentLang = lang;
    window.saukhyaCurrentLang = lang;
    
    // Dispatch custom event for components like ClinicStatus
    document.dispatchEvent(new CustomEvent('saukhya:languageChanged', { detail: { lang: lang } }));
  }

  function setLanguage(lang) {
    if (!['en', 'hi', 'mr'].includes(lang)) lang = 'en';
    try {
      localStorage.setItem('saukhya_lang', lang);
    } catch (e) {}
    applyTranslations(lang);
    if (typeof window.saukhyaTrack === 'function') {
      window.saukhyaTrack('language_change', { language: lang });
    }
  }

  window.saukhyaSetLanguage = setLanguage;

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    var savedLang = 'en';
    try {
      savedLang = localStorage.getItem('saukhya_lang') || 'en';
    } catch (e) {}

    // Add click listeners to buttons with data-lang-select
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-lang-select]');
      if (btn) {
        var lang = btn.getAttribute('data-lang-select');
        if (lang) {
          setLanguage(lang);
        }
      }
    });

    if (savedLang && savedLang !== 'en') {
      applyTranslations(savedLang);
    }
  });
})();
