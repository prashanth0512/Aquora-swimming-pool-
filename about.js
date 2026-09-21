

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initStatCounters();
    initTimelineScrollSpy();
    initScrollReveals();
    initValuesChips();
    initTeamCards();
    initHeroStageTilt();
  });

  
  
  
  function initStatCounters() {
    const statElements = [
      { el: document.querySelector('.about-hero-stats .about-stat:nth-child(1) .about-stat-num'), target: 25, suffix: '+' },
      { el: document.querySelector('.about-hero-stats .about-stat:nth-child(3) .about-stat-num'), target: 340, suffix: '+' },
      { el: document.querySelector('.about-hero-stats .about-stat:nth-child(5) .about-stat-num'), target: 18, suffix: '' },
      { el: document.querySelector('.about-hero-stats .about-stat:nth-child(7) .about-stat-num'), target: 9, suffix: '' },
      { el: document.querySelector('.story-float-num'), target: 340, suffix: '+' }
    ];

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statElements.forEach(({ el, target, suffix }) => {
            if (el) animateNumber(el, target, suffix, 1800);
          });
        }
      });
    }, { threshold: 0.2 });

    const statsContainer = document.querySelector('.about-hero-stats') || document.getElementById('about-hero');
    if (statsContainer) {
      observer.observe(statsContainer);
    }
  }

  function animateNumber(element, target, suffix, duration) {
    const startTime = performance.now();
    const startValue = 0;

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * (target - startValue) + startValue);

      element.innerHTML = `${currentVal}${suffix ? `<span class="about-stat-plus">${suffix}</span>` : ''}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.innerHTML = `${target}${suffix ? `<span class="about-stat-plus">${suffix}</span>` : ''}`;
      }
    }

    requestAnimationFrame(step);
  }

  
  
  
  function initTimelineScrollSpy() {
    const timelineItems = document.querySelectorAll('.about-timeline .tl-item');
    if (!timelineItems.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const dot = entry.target.querySelector('.tl-dot');
        const card = entry.target.querySelector('.tl-card');

        if (entry.isIntersecting) {
          if (dot) dot.classList.add('tl-dot-active');
          if (card) card.classList.add('tl-card-focused');
        } else {
          
          if (card && !card.classList.contains('tl-card-active')) {
            card.classList.remove('tl-card-focused');
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3
    });

    timelineItems.forEach((item) => observer.observe(item));
  }

  
  
  
  function initScrollReveals() {
    const revealTargets = document.querySelectorAll(
      '.story-grid, .mv-card, .tl-item, .team-card, .values-strip, .story-pillar'
    );

    revealTargets.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach((el) => observer.observe(el));
  }

  
  
  
  function initValuesChips() {
    const chips = document.querySelectorAll('.value-chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const valueName = chip.textContent.trim();
        if (typeof window.showToast === 'function') {
          window.showToast(`AURA Core Value: ${valueName} embedded in every commission.`);
        }
      });
    });
  }

  
  
  
  function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        const role = card.querySelector('.team-role');
        if (role) role.style.letterSpacing = '0.14em';
      });
      card.addEventListener('mouseleave', () => {
        const role = card.querySelector('.team-role');
        if (role) role.style.letterSpacing = '0.1em';
      });
    });
  }

  
  
  
  function initHeroStageTilt() {
    const stage = document.querySelector('.about-hero-stage');
    if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    stage.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 900) return;
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const normX = x / (rect.width / 2);
      const normY = y / (rect.height / 2);

      const frameMain = stage.querySelector('.about-frame-main');
      const frameAccent = stage.querySelector('.about-frame-accent');
      const glow = stage.querySelector('.about-hero-glow-fx');

      if (frameMain) {
        frameMain.style.transform = `perspective(1000px) rotateY(${normX * 3.5}deg) rotateX(${-normY * 3.5}deg) translateY(-4px)`;
      }
      if (frameAccent) {
        frameAccent.style.transform = `perspective(1000px) rotateY(${normX * 6}deg) rotateX(${-normY * 6}deg) translate(${normX * 6}px, ${normY * 6 - 5}px) scale(1.02)`;
      }
      if (glow) {
        glow.style.transform = `translate(${normX * 16}px, ${normY * 16}px) scale(1.05)`;
      }
    });

    stage.addEventListener('mouseleave', () => {
      const frameMain = stage.querySelector('.about-frame-main');
      const frameAccent = stage.querySelector('.about-frame-accent');
      const glow = stage.querySelector('.about-hero-glow-fx');
      if (frameMain) frameMain.style.transform = '';
      if (frameAccent) frameAccent.style.transform = '';
      if (glow) glow.style.transform = '';
    });
  }

})();
