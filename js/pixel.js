/*
 * Pixel Meta (Facebook / Instagram Ads) — activé seulement si js/config.js contient metaPixelId.
 * Événements : PageView (visite), Lead (demande de devis enregistrée), Contact (clic WhatsApp ou téléphone).
 */
(function () {
  const id = String((window.TR_CONFIG || {}).metaPixelId || '').trim();
  window.trTrack = function () {};
  if (!/^\d{10,20}$/.test(id)) return;

  /* eslint-disable */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq('init', id);
  window.fbq('track', 'PageView');
  window.trTrack = function (event, params) { window.fbq('track', event, params || {}); };

  // clics vers WhatsApp ou le téléphone
  document.addEventListener('click', function (e) {
    const link = e.target.closest && e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (href.indexOf('wa.me') !== -1) window.trTrack('Contact', { content_name: 'WhatsApp' });
    else if (href.indexOf('tel:') === 0) window.trTrack('Contact', { content_name: 'Téléphone' });
  }, true);
})();
