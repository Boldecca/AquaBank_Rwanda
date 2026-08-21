/* ============================================================
   AQUABANK RWANDA — SHARED PAGE JS
   ============================================================ */

// Navbar scroll state
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
  // Inner pages start scrolled (white navbar)
  navbar.classList.add('scrolled');
}

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// Scroll reveal
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// KPI counters
const kpiObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target);
      const step = target / (1800 / 16);
      let cur = 0;
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.floor(cur).toLocaleString();
        if (cur >= target) clearInterval(t);
      }, 16);
      kpiObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.kpi-val[data-target]').forEach(el => kpiObs.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// FAQ category filter
document.querySelectorAll('.faq-cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.faq-cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.faq-item').forEach(item => {
      item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
    });
  });
});

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('cName')?.value.trim();
    const email = document.getElementById('cEmail')?.value.trim();
    const msg   = document.getElementById('cMessage')?.value.trim();
    if (!name || !email || !msg) { alert('Please fill in all required fields.'); return; }
    const success = document.getElementById('contactSuccess');
    if (success) { success.style.display = 'block'; }
    contactForm.reset();
    setTimeout(() => { if (success) success.style.display = 'none'; }, 5000);
  });
}

// Active nav link
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === 'index.html' && href === '/') ||
        (path === '' && href === '/') || href.includes(path.replace('.html',''))) {
      a.classList.add('active');
    }
  });
})();
