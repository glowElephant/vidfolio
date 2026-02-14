// Navigation: mobile toggle, active highlight, page transitions
(function () {
  // Mobile toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // Highlight active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (href === '/' && path === '/index.html')) {
      a.classList.add('active');
    }
  });

  // Page transition
  const overlay = document.querySelector('.page-transition');
  if (overlay) {
    document.querySelectorAll('a[href^="/"]').forEach(a => {
      if (a.getAttribute('href').startsWith('//')) return;
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href === path) return;
        e.preventDefault();
        overlay.classList.add('active');
        setTimeout(() => { window.location.href = href; }, 300);
      });
    });

    // Fade in on load
    window.addEventListener('pageshow', () => {
      overlay.classList.remove('active');
    });
  }
})();
