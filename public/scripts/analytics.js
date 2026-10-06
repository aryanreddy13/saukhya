/**
 * Saukhya Clinic - Lightweight Event Tracker
 * Zero PII / Patient privacy protected.
 */
(function () {
  'use strict';

  function trackEvent(eventName, params) {
    if (!eventName) return;
    
    // Clean params: ensure no sensitive text is passed
    var safeParams = params || {};

    // Google Analytics (gtag.js)
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, safeParams);
    }

    // Plausible Analytics
    if (typeof window.plausible === 'function') {
      window.plausible(eventName, { props: safeParams });
    }

    // Generic dataLayer
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: eventName }, safeParams));
    }

    // Debug logging in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('[Analytics Event]', eventName, safeParams);
    }
  }

  // Global helper
  window.saukhyaTrack = trackEvent;

  // Delegate click events for data-event elements
  document.addEventListener('click', function (e) {
    var target = e.target.closest('[data-event]');
    if (!target) return;

    var eventName = target.getAttribute('data-event');
    var eventLabel = target.getAttribute('data-event-label') || '';
    var service = target.getAttribute('data-service') || '';

    var params = {};
    if (eventLabel) params.label = eventLabel;
    if (service) params.service = service;

    trackEvent(eventName, params);
  });
})();
