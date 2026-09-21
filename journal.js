

'use strict';

function initFaqAccordion() {
  const accordion = document.getElementById('faq-accordion');
  if (!accordion) return;

  const triggers = accordion.querySelectorAll('.faq-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const panel = item.querySelector('.faq-panel');
      const isOpen = item.classList.contains('open');

      
      accordion.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq-panel').setAttribute('aria-hidden', 'true');
      });

      
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');
      }
    });
  });
}

function initCardAnimations() {
  const cards = document.querySelectorAll('.journal-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          
          const card = entry.target;
          const index = Array.from(cards).indexOf(card);
          setTimeout(() => {
            card.classList.add('card-visible');
          }, index * 90);
          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  cards.forEach((card) => observer.observe(card));
}

function initCardNavigation() {
  const cards = document.querySelectorAll('.journal-card');
  cards.forEach((card) => {
    
    card.addEventListener('click', (e) => {
      
      if (e.target.closest('.journal-card-btn')) return;

      const articleId = card.getAttribute('data-article-id');
      if (articleId) {
        window.location.href = `journal-detail.html?article=${articleId}`;
      }
    });

    
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const articleId = card.getAttribute('data-article-id');
        if (articleId) {
          window.location.href = `journal-detail.html?article=${articleId}`;
        }
      }
    });
  });
}

function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('aquara-theme') || localStorage.getItem('aura-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('aquara-theme', next);
      localStorage.setItem('aura-theme', next);
    });
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'aquara-theme' || e.key === 'aura-theme') {
      if (e.newValue) html.setAttribute('data-theme', e.newValue);
    }
  });
}

function initRtlToggle() {
  const btn = document.getElementById('rtl-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('aquara-dir') || localStorage.getItem('aura-rtl') || 'ltr';
  html.setAttribute('dir', saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('dir') || 'ltr';
      const next = current === 'ltr' ? 'rtl' : 'ltr';
      html.setAttribute('dir', next);
      localStorage.setItem('aquara-dir', next);
      localStorage.setItem('aura-rtl', next);
    });
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'aquara-dir' || e.key === 'aura-rtl') {
      if (e.newValue) html.setAttribute('dir', e.newValue);
    }
  });
}

function openQuoteModal(source) {
  const modal = document.getElementById('quote-modal');
  if (modal) {
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
  }
}

function closeQuoteModal() {
  const modal = document.getElementById('quote-modal');
  if (modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('modal-active');
    document.body.style.overflow = '';
  }
}

function openLoginModal() {
  window.location.href = 'login.html';
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('modal-active');
    document.body.style.overflow = '';
  }
}

function handleQuoteSubmit(e) {
  e.preventDefault();
  closeQuoteModal();
  showToast('Thank you — your proposal request has been received. Our principal designer will contact you within 24 hours.');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  closeLoginModal();
  showToast('Welcome back. Redirecting to your Client Portal...');
}

function fillDemoCredentials() {
  const email = document.getElementById('login-email');
  const pass = document.getElementById('login-password');
  if (email) email.value = 'client@aurawaters.com';
  if (pass) pass.value = 'paradise2026';
}

function showToast(message) {
  const container = document.getElementById('toast-notification');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item toast-show';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('toast-show');
    toast.classList.add('toast-hide');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

function initModalOverlayClose() {
  ['quote-modal', 'login-modal'].forEach((id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.getAttribute('aria-hidden') === 'false' && closeQuoteModal();
        if (id === 'login-modal') closeLoginModal();
      }
    });
  });
}

function initHeroInteractions() {
  
  const tags = document.querySelectorAll('.hero-topic-tag');
  const cards = document.querySelectorAll('.journal-card');

  const topicMapping = {
    'all': null,
    'philosophy': ['infinity-edge-mastery'],
    'materials': ['stone-water-dialogue'],
    'engineering': ['hydraulic-engineering-secrets', 'pool-construction-timeline'],
    'lighting': ['night-pool-lighting-design'],
    'living': ['resort-pool-landscaping']
  };

  tags.forEach((tag) => {
    tag.addEventListener('click', () => {
      tags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');

      const topic = tag.getAttribute('data-topic');
      const allowedIds = topicMapping[topic];

      cards.forEach((card) => {
        const id = card.getAttribute('data-article-id');
        if (!allowedIds || allowedIds.includes(id)) {
          card.style.display = '';
          setTimeout(() => card.classList.add('card-visible'), 50);
        } else {
          card.style.display = 'none';
          card.classList.remove('card-visible');
        }
      });

      
      const grid = document.getElementById('journal-cards-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  
  const deck = document.getElementById('hero-card-deck');
  const frontCard = document.getElementById('hero-front-card');

  if (deck && frontCard) {
    deck.addEventListener('mousemove', (e) => {
      const rect = deck.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = -(y / (rect.height / 2)) * 7;
      const rotY = (x / (rect.width / 2)) * 7;

      frontCard.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.02)`;
    });

    deck.addEventListener('mouseleave', () => {
      frontCard.style.transform = '';
    });

    
    frontCard.addEventListener('click', (e) => {
      if (e.target.closest('.deck-read-btn')) return;
      window.location.href = 'journal-detail.html?article=infinity-edge-mastery';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initHeaderScroll();
  initFaqAccordion();
  initCardAnimations();
  initCardNavigation();
  initHeroInteractions();
  initModalOverlayClose();
  initRunningNumbers();
});

function initRunningNumbers() {
  const statElements = document.querySelectorAll('.journal-hero-stat .stat-num');
  if (!statElements.length) return;

  function runCounter(el) {
    let targetNode = null;
    let targetText = '';
    for (let i = 0; i < el.childNodes.length; i++) {
      const node = el.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE && /\d/.test(node.nodeValue)) {
        targetNode = node;
        targetText = node.nodeValue.trim();
        break;
      }
    }
    if (!targetNode) return;

    const numMatch = targetText.match(/^([0-9,.]+)(.*)$/);
    if (!numMatch) return;

    const rawNum = numMatch[1].replace(/,/g, '');
    const isFloat = rawNum.includes('.');
    const targetVal = parseFloat(rawNum);
    const suffix = numMatch[2] || '';
    if (isNaN(targetVal)) return;

    const duration = Math.min(2200, Math.max(1200, targetVal > 50 ? 1800 : 1400));
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = isFloat ? (ease * targetVal).toFixed(1) : Math.round(ease * targetVal);
      targetNode.nodeValue = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        targetNode.nodeValue = rawNum + suffix;
      }
    }
    targetNode.nodeValue = (isFloat ? '0.0' : '0') + suffix;
    requestAnimationFrame(update);
  }

  if (!('IntersectionObserver' in window)) {
    statElements.forEach(runCounter);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  statElements.forEach((el) => observer.observe(el));
}
