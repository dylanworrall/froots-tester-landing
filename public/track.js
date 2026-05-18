// Lightweight conversion-event tracker.
// Fires GA4's `file_download` event when any link to a release binary is clicked.
// Param names match GA4 enhanced-measurement so data merges cleanly.
(function () {
  function platformFromFile(name) {
    if (/\.dmg$/i.test(name)) return 'macos';
    if (/\.(exe|msi)$/i.test(name)) return 'windows';
    if (/\.(AppImage|deb|rpm)$/i.test(name)) return 'linux';
    return 'unknown';
  }

  function track(event, params) {
    if (typeof window.gtag === 'function') window.gtag('event', event, params);
  }

  function isDownloadLink(href) {
    if (!href) return false;
    return /releases\/download\//.test(href) ||
           /\.(dmg|exe|msi|AppImage|deb|rpm)(?:[?#]|$)/i.test(href);
  }

  function attachOne(a) {
    if (a.__ftDl) return;
    a.__ftDl = true;
    a.addEventListener('click', function () {
      var href = a.href || '';
      var file = (href.split('?')[0].split('#')[0].split('/').pop() || '').trim();
      var ext = (file.match(/\.([a-z0-9]+)$/i) || [, ''])[1].toLowerCase();
      track('file_download', {
        file_name: file,
        file_extension: ext,
        platform: platformFromFile(file),
        link_url: href,
        link_text: (a.textContent || '').trim().slice(0, 80),
        page_location: window.location.href,
      });
    }, { passive: true });
  }

  function scan() {
    document.querySelectorAll('a[href]').forEach(function (a) {
      if (isDownloadLink(a.getAttribute('href') || '')) attachOne(a);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan);
  } else {
    scan();
  }
  // Re-scan once after a tick in case JS rewrites the auto-detect button's href.
  setTimeout(scan, 1500);
})();
