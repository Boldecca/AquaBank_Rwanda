// Navbar scroll shadow
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      // Close mobile menu
      document.getElementById('hamburger').classList.remove('open');
      document.getElementById('navLinks').classList.remove('open');
    }
  });
});

// Hamburger menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('navLinks').classList.toggle('open');
});
