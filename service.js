

document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  initGalleryFilters();
  initFaqAccordion();
  initRunningNumbers();
});

function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.srv-filter-btn');
  const galleryItems = document.querySelectorAll('.srv-gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('is-hidden');
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 40);
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherPanel = otherItem.querySelector('.faq-panel');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 32 + 'px';
      }
    });
  });
}

function initHeroCarousel() {
  const stage = document.getElementById('srv-hcarousel-stage');
  if (!stage) return;

  const cards = Array.from(stage.querySelectorAll('.srv-hcard'));
  if (cards.length < 3) return;

  const prevBtn = document.getElementById('srv-carousel-prev');
  const nextBtn = document.getElementById('srv-carousel-next');
  const dots = Array.from(document.querySelectorAll('.srv-hdot'));
  const timerBar = document.getElementById('srv-timer-bar');
  const carouselWrap = document.getElementById('srv-hero-carousel');

  let currentIndex = 0;
  const total = cards.length;
  const SLIDE_INTERVAL = 3000; 
  let autoTimer = null;
  let isPaused = false;

  function renderCarousel() {
    cards.forEach((card, idx) => {
      
      card.classList.remove('is-center', 'is-left', 'is-right', 'is-hidden', 'is-hidden-left', 'is-hidden-right');
      card.setAttribute('aria-hidden', 'true');

      
      let diff = idx - currentIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      if (diff === 0) {
        card.classList.add('is-center');
        card.setAttribute('aria-hidden', 'false');
      } else if (diff === -1) {
        card.classList.add('is-left');
      } else if (diff === 1) {
        card.classList.add('is-right');
      } else if (diff < -1) {
        card.classList.add('is-hidden', 'is-hidden-left');
      } else {
        card.classList.add('is-hidden', 'is-hidden-right');
      }
    });

    
    dots.forEach((dot, idx) => {
      const isActive = idx === currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    
    if (timerBar) {
      timerBar.style.transition = 'none';
      timerBar.style.width = '0%';
      void timerBar.offsetWidth; 
      if (!isPaused) {
        timerBar.style.transition = `width ${SLIDE_INTERVAL}ms linear`;
        timerBar.style.width = '100%';
      }
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % total;
    renderCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + total) % total;
    renderCarousel();
  }

  function goToSlide(idx) {
    currentIndex = (idx + total) % total;
    renderCarousel();
  }

  function startAutoSlide() {
    stopAutoSlide();
    if (timerBar && !isPaused) {
      timerBar.style.transition = 'none';
      timerBar.style.width = '0%';
      void timerBar.offsetWidth;
      timerBar.style.transition = `width ${SLIDE_INTERVAL}ms linear`;
      timerBar.style.width = '100%';
    }
    autoTimer = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, SLIDE_INTERVAL);
  }

  function stopAutoSlide() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  
  if (carouselWrap) {
    carouselWrap.addEventListener('mouseenter', () => {
      isPaused = true;
      if (timerBar) {
        const computed = window.getComputedStyle(timerBar).width;
        timerBar.style.transition = 'none';
        timerBar.style.width = computed;
      }
    });

    carouselWrap.addEventListener('mouseleave', () => {
      isPaused = false;
      startAutoSlide();
    });

    
    carouselWrap.setAttribute('tabindex', '0');
    carouselWrap.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        startAutoSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        startAutoSlide();
      }
    });
  }

  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      startAutoSlide();
    });
  }

  
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      startAutoSlide();
    });
  }

  
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(idx);
      startAutoSlide();
    });
  });

  
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      
      if (e.target.closest('.srv-hero-view-btn')) {
        return;
      }
      if (card.classList.contains('is-left')) {
        prevSlide();
        startAutoSlide();
      } else if (card.classList.contains('is-right')) {
        nextSlide();
        startAutoSlide();
      }
    });
  });

  
  let touchStartX = 0;
  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    isPaused = true;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    isPaused = false;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
    startAutoSlide();
  }, { passive: true });

  
  renderCarousel();
  startAutoSlide();
}

function initRunningNumbers() {
  const statElements = document.querySelectorAll('.srv-hspec-num');
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
      const current = isFloat ? (ease * targetVal).toFixed(2) : Math.round(ease * targetVal);
      targetNode.nodeValue = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        targetNode.nodeValue = rawNum + suffix;
      }
    }
    targetNode.nodeValue = (isFloat ? '0.00' : '0') + suffix;
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
