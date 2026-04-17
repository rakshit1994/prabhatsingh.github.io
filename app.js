/* ============================================================
   PRABHAT SINGH — Personal Brand Website · app.js
   ============================================================ */

// ── Nav scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Mobile hamburger ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ── Scroll reveal animation ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Once revealed, no need to keep observing
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ── Animated number counters ──
function animateCounter(el, target, suffix, duration = 2000) {
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = eased * target;
    el.textContent = isDecimal ? current.toFixed(1) + suffix : Math.floor(current) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Observe stat numbers for counter animation
const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const text = entry.target.textContent;
      // Extract numeric values from stat numbers
      const match = text.match(/([\d.]+)/);
      if (match) {
        const num = parseFloat(match[1]);
        const suffix = text.replace(match[1], '');
        animateCounter(entry.target, num, suffix);
      }
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Active nav link highlight ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => activeObserver.observe(section));

// ── Contact form handler ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ── Parallax glow on hero ──
const heroBgGlow = document.querySelector('.hero-bg-glow');
if (heroBgGlow) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    heroBgGlow.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive: true });
}

// ── Staggered card reveals ──
function staggerReveal(selector, delayStep = 80) {
  const cards = document.querySelectorAll(selector);
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * delayStep}ms`;
  });
}

staggerReveal('.offering-card');
staggerReveal('.ach-card');
staggerReveal('.rec-card');
staggerReveal('.service-card');
staggerReveal('.insight-card', 60);
staggerReveal('.timeline-item', 100);
staggerReveal('.board-item', 50);

// ── Typing animation for hero subtitle ──
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = '';
  let i = 0;

  // Only run once hero is in view
  const typeObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const type = () => {
        if (i < text.length) {
          subtitle.textContent += text[i++];
          setTimeout(type, 30);
        }
      };
      setTimeout(type, 600);
      typeObserver.disconnect();
    }
  }, { threshold: 0.5 });

  typeObserver.observe(subtitle);
}

// ── Floating cards parallax ──
const floatingCards = document.querySelectorAll('.floating-card');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  floatingCards.forEach((card, i) => {
    const speed = i % 2 === 0 ? 0.05 : -0.05;
    card.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });

// ── Page load entrance ──
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
