/* ========================================
   ZEKER HOEVEN VASTGOED — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Sticky Nav Shadow ──
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 10);
    });
  }

  // ── Mobile Hamburger Menu ──
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav__links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Active Nav Link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a:not(.btn)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── FAQ Accordion ──
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      // Toggle current
      if (!wasActive) item.classList.add('active');
    });
  });

  // ── Form Submission → Success Page ──
  document.querySelectorAll('form[data-redirect]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Brief delay for UX
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
      }
      setTimeout(() => {
        window.location.href = form.dataset.redirect;
      }, 600);
    });
  });

  // ── Scroll Animations (IntersectionObserver) ──
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ── Smooth Scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
