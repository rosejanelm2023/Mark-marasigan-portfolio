document.getElementById('year').textContent = new Date().getFullYear();

(function initAnalytics(){
  const cfg = window.PORTFOLIO_ANALYTICS || {};

  if (cfg.gaMeasurementId) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cfg.gaMeasurementId)}`;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', cfg.gaMeasurementId, { anonymize_ip: true });
  }

  if (cfg.clarityProjectId) {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, 'clarity', 'script', cfg.clarityProjectId);
  }

  function trackEvent(name, params={}) {
    const payload = {
      ...params,
      page_path: window.location.pathname,
      page_title: document.title
    };

    if (typeof window.gtag === 'function') {
      window.gtag('event', name, payload);
    }

    if (typeof window.clarity === 'function') {
      window.clarity('event', name);
    }

    if (!cfg.gaMeasurementId && !cfg.clarityProjectId) {
      console.info('[Analytics preview]', name, payload);
    }
  }

  window.trackPortfolioEvent = trackEvent;

  document.querySelectorAll('[data-track]').forEach((element) => {
    element.addEventListener('click', () => {
      trackEvent(element.dataset.track, {
        link_text: element.textContent.trim(),
        link_url: element.href || ''
      });
    });
  });

  // Track which major sections visitors actually reach.
  const seen = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.id && !seen.has(entry.target.id)) {
        seen.add(entry.target.id);
        trackEvent('section_view', { section_id: entry.target.id });
      }
    });
  }, { threshold: 0.45 });

  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
})();
