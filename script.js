document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const mobileToggle = document.getElementById('mobileToggle');
  const header = document.querySelector('header');
  const contactForm = document.getElementById('contactForm');
  const projectModal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeModalBtn = document.getElementById('closeModal');

  // Theme: default to dark, allow 'light' class
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light') {
      body.classList.add('light');
      if (themeToggle) themeToggle.textContent = '☀️';
    } else {
      if (themeToggle) themeToggle.textContent = '🌙';
    }
  } catch (e) {
    /* ignore storage errors */
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light');
      const isLight = body.classList.contains('light');
      themeToggle.textContent = isLight ? '☀️' : '🌙';
      try { localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark'); } catch (e) {}
    });
  }

  // Mobile nav
  if (mobileToggle && header) {
    mobileToggle.addEventListener('click', () => {
      header.classList.toggle('mobile-open');
      mobileToggle.setAttribute('aria-expanded', header.classList.contains('mobile-open'));
    });

    // close nav when link clicked
    document.querySelectorAll('nav a').forEach(a => {
      a.addEventListener('click', () => header.classList.remove('mobile-open'));
    });
  }

  // Project modal
  if (projectModal) {
    document.querySelectorAll('.project-view').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const t = btn.dataset.title || 'Project';
        const d = btn.dataset.desc || '';
        if (modalTitle) modalTitle.textContent = t;
        if (modalBody) modalBody.textContent = d;
        projectModal.setAttribute('aria-hidden', 'false');
      });
    });

    // close handlers
    projectModal.addEventListener('click', (e) => {
      if (e.target.matches('[data-close]') || e.target === projectModal) {
        projectModal.setAttribute('aria-hidden', 'true');
      }
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', () => projectModal.setAttribute('aria-hidden', 'true'));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') projectModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Contact form
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Basic client-side validation
      if (!name || !email || !message) {
        alert('Please complete all fields.');
        return;
      }

      // Demo behavior: show a confirmation and reset
      alert('Thanks ' + name + '! Message received (demo).');
      contactForm.reset();
    });
  }

});
