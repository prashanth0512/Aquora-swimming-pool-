

(function () {
  'use strict';

  
  
  
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('aquara-theme') || localStorage.getItem('aura-theme') || 'dark';

  
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(newTheme === 'dark' ? 'Switched to Twilight Dark Mode' : 'Switched to Coastal Light Mode');
    });
  }

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('aquara-theme', theme);
    localStorage.setItem('aura-theme', theme);
  }

  
  
  
  const rtlToggleBtn = document.getElementById('rtl-toggle-btn');
  const savedDir = localStorage.getItem('aquara-dir') || localStorage.getItem('aura-rtl') || 'ltr';

  setDirection(savedDir);

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const currentDir = htmlEl.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      setDirection(newDir);
      showToast(newDir === 'rtl' ? 'RTL Layout Enabled' : 'LTR Layout Restored');
    });
  }

  function setDirection(dir) {
    htmlEl.setAttribute('dir', dir);
    localStorage.setItem('aquara-dir', dir);
    localStorage.setItem('aura-rtl', dir);
    if (rtlToggleBtn) {
      const rtlText = rtlToggleBtn.querySelector('.rtl-text');
      if (rtlText) {
        rtlText.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
    }
  }

  
  window.addEventListener('storage', (e) => {
    if (e.key === 'aquara-theme' || e.key === 'aura-theme') {
      if (e.newValue) htmlEl.setAttribute('data-theme', e.newValue);
    }
    if (e.key === 'aquara-dir' || e.key === 'aura-rtl') {
      if (e.newValue) setDirection(e.newValue);
    }
  });

  
  
  
  const mainHeader = document.getElementById('main-header');
  const sections = document.querySelectorAll('section[id], footer[id]');

  function initNavigationActiveState() {
    let currentPath = decodeURIComponent(window.location.pathname).split('/').pop() || 'index.html';
    currentPath = currentPath.split('?')[0].split('#')[0].toLowerCase();
    if (!currentPath || currentPath === '') currentPath = 'index.html';

    const isHome1 = currentPath === 'index.html';
    const isHome2 = currentPath === 'home2.html';
    const isAbout = currentPath === 'about.html';
    const isService = currentPath === 'service.html' || currentPath === 'service detail.html';
    const isPricing = currentPath === 'pricing.html';
    const isJournal = currentPath === 'journal.html' || currentPath === 'journal-detail.html';
    const isDashboard = currentPath === 'dashboard.html';
    const isContact = currentPath === 'contact.html';

    const homeTrigger = document.getElementById('home-dropdown-trigger');
    const homeMenuLinks = document.querySelectorAll('#home-dropdown-menu .dropdown-link');

    if (isHome1 || isHome2) {
      if (homeTrigger) {
        homeTrigger.classList.add('active');
        homeTrigger.setAttribute('aria-current', 'page');
      }
      homeMenuLinks.forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        if ((isHome1 && href === 'index.html') || (isHome2 && href === 'home2.html')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    } else {
      if (homeTrigger) {
        homeTrigger.classList.remove('active');
        homeTrigger.removeAttribute('aria-current');
      }
      homeMenuLinks.forEach(link => link.classList.remove('active'));
    }

    document.querySelectorAll('.desktop-nav .nav-link:not(.dropdown-toggle)').forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase().trim();
      let matches = false;

      if (isAbout && href === 'about.html') matches = true;
      else if (isService && href === 'service.html') matches = true;
      else if (isPricing && href === 'pricing.html') matches = true;
      else if (isJournal && href === 'journal.html') matches = true;
      else if (isDashboard && (href === 'dashboard.html' || href === '#project-room')) matches = true;
      else if (isContact && href === 'contact.html') matches = true;

      if (matches) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    document.querySelectorAll('.drawer-menu .drawer-link').forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase().trim();
      let matches = false;

      if (isHome1 && href === 'index.html') matches = true;
      else if (isHome2 && href === 'home2.html') matches = true;
      else if (isAbout && href === 'about.html') matches = true;
      else if (isService && href === 'service.html') matches = true;
      else if (isPricing && href === 'pricing.html') matches = true;
      else if (isJournal && href === 'journal.html') matches = true;
      else if (isDashboard && href === 'dashboard.html') matches = true;
      else if (isContact && href === 'contact.html') matches = true;

      if (matches) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const drawerH1 = document.getElementById('drawer-home-1');
    const drawerH2 = document.getElementById('drawer-home-2');
    if (drawerH1 && drawerH2) {
      drawerH1.classList.toggle('active', isHome1);
      drawerH2.classList.toggle('active', isHome2);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  function handleScroll() {
    const scrollY = window.scrollY;

    if (mainHeader) {
      if (scrollY > 30) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    const hashNavLinks = document.querySelectorAll('.desktop-nav a.nav-link[href^="#"]');
    if (hashNavLinks.length > 0) {
      let currentSectionId = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        hashNavLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${currentSectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    }

    const heroScrollRunner = document.getElementById('hero-scrollbar-runner');
    if (heroScrollRunner) {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const scrolled = (window.scrollY / scrollTotal) * 100;
        heroScrollRunner.style.width = `${Math.min(100, Math.max(18, scrolled))}%`;
      }
    }
  }

  initNavigationActiveState();
  handleScroll();

  
  
  
  const hamburgerBtn = document.getElementById('mobile-hamburger-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const drawerOverlay = document.getElementById('mobile-drawer-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-home-btn');

  function openDrawer() {
    if (drawer && drawerOverlay && hamburgerBtn) {
      drawer.classList.add('open');
      drawerOverlay.classList.add('open');
      hamburgerBtn.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      drawerOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && drawerOverlay && hamburgerBtn) {
      drawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      drawerOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => {
    if (drawer && drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  
  
  
  const filterChips = document.querySelectorAll('.filter-chip');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filterChips.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');

      const filter = chip.getAttribute('data-filter');

      let visibleIndex = 0;
      galleryItems.forEach((item) => {
        const itemCategories = item.getAttribute('data-category') || '';
        if (filter === 'all' || itemCategories.includes(filter)) {
          item.classList.remove('hide');
          item.classList.remove('is-revealed');
          const delay = visibleIndex * 60;
          visibleIndex++;
          setTimeout(() => {
            item.classList.add('is-revealed');
          }, delay);
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  
  
  
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-description');

  window.openLightbox = function (src, title, desc) {
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = src;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxDesc) lightboxDesc.textContent = desc;

      lightboxModal.classList.add('open');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeLightbox = function () {
    if (lightboxModal) {
      lightboxModal.classList.remove('open');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lightboxImg) lightboxImg.src = '';
    }
  };

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        window.closeLightbox();
      }
    });
  }

  
  
  
  const portalTabs = document.querySelectorAll('.portal-tab');
  const portalPanes = document.querySelectorAll('.portal-tab-pane');

  portalTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      portalTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      portalPanes.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const tabId = tab.getAttribute('data-tab');
      const targetPane = document.getElementById(`tab-pane-${tabId}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  
  const demoPhases = [
    {
      percent: '68%',
      phaseTag: 'Phase 05 of 06',
      status: 'Active Construction',
      statusClass: 'in-progress',
      title: 'Pneumatic Shotcrete Shell Curing & Hydraulics',
      desc: 'High-strength 5,000 PSI shotcrete structure poured. 28-day water curing protocol underway. Submerged LED conduit and hydro-massage returns installed and pressure tested at 50 PSI.',
      est: 'Est. Handover: Oct 28'
    },
    {
      percent: '84%',
      phaseTag: 'Phase 05 of 06',
      status: 'Mosaic Installation',
      statusClass: 'in-progress',
      title: 'Italian Glass Mosaic & Travertine Decking',
      desc: 'Bisazza iridescent waterline mosaics being hand-set by master guild masons. Perimeter knife-edge slot drain leveled to within 0.5mm laser precision.',
      est: 'Est. Handover: Oct 14'
    },
    {
      percent: '100%',
      phaseTag: 'Phase 06 of 06',
      status: 'Handover Ready',
      statusClass: 'approved',
      title: 'Commissioning & Smart-Water Calibration',
      desc: 'Hydrostatic pressure certified. Saltwater titanium heating and automated robotic purification activated. Private owner orientation completed.',
      est: 'Delivered: Flawless Execution'
    },
    {
      percent: '35%',
      phaseTag: 'Phase 03 of 06',
      status: 'Armature & Plumbing',
      statusClass: 'in-progress',
      title: 'Seismic Grade Rebar Armature Assembly',
      desc: 'Precision laser excavation completed to bedrock. Grade-60 steel rebar cage woven in double grid formation for 25-year structural warranty rating.',
      est: 'Est. Handover: Nov 20'
    }
  ];

  let currentDemoIndex = 0;

  window.toggleDemoMilestone = function () {
    currentDemoIndex = (currentDemoIndex + 1) % demoPhases.length;
    const p = demoPhases[currentDemoIndex];

    const percentText = document.getElementById('demo-percent-text');
    const phaseTag = document.getElementById('demo-phase-tag');
    const statusPill = document.getElementById('demo-status-pill');
    const titleEl = document.getElementById('demo-phase-title');
    const descEl = document.getElementById('demo-phase-desc');
    const barEl = document.getElementById('demo-phase-bar');
    const estEl = document.getElementById('demo-est-completion');

    if (percentText) percentText.textContent = p.percent;
    if (phaseTag) phaseTag.textContent = p.phaseTag;
    if (statusPill) {
      statusPill.textContent = p.status;
      statusPill.className = `badge-status ${p.statusClass}`;
    }
    if (titleEl) titleEl.textContent = p.title;
    if (descEl) descEl.textContent = p.desc;
    if (barEl) barEl.style.width = p.percent;
    if (estEl) estEl.textContent = p.est;

    showToast(`Dashboard updated: ${p.title} (${p.percent})`);
  };

  
  
  
  const quoteModal = document.getElementById('quote-modal');
  const quoteTypeSelect = document.getElementById('quote-type');

  window.openQuoteModal = function (poolType) {
    if (quoteModal) {
      quoteModal.classList.add('open');
      quoteModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (poolType && quoteTypeSelect) {
        
        for (let i = 0; i < quoteTypeSelect.options.length; i++) {
          if (quoteTypeSelect.options[i].text.toLowerCase().includes(poolType.toLowerCase())) {
            quoteTypeSelect.selectedIndex = i;
            break;
          }
        }
      }
    }
  };

  window.closeQuoteModal = function () {
    if (quoteModal) {
      quoteModal.classList.remove('open');
      quoteModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) window.closeQuoteModal();
    });
  }

  window.handleQuoteSubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('quote-name').value;
    window.closeQuoteModal();
    showToast(`Thank you, ${name}! Your masterplan consultation request was received. Our architectural studio will contact you within 24 hours.`);
    document.getElementById('quote-form').reset();
  };

  
  const heroQuoteBtn = document.getElementById('hero-quote-btn');
  if (heroQuoteBtn) {
    heroQuoteBtn.addEventListener('click', () => window.openQuoteModal('Vanishing Infinity Edge'));
  }

  const drawerQuoteBtn = document.getElementById('drawer-quote-btn');
  if (drawerQuoteBtn) {
    drawerQuoteBtn.addEventListener('click', () => {
      closeDrawer();
      window.openQuoteModal('Consultation Request');
    });
  }

  
  
  
  const loginModal = document.getElementById('login-modal');
  const headerLoginBtn = document.getElementById('header-login-btn');
  const drawerLoginBtn = document.getElementById('drawer-login-btn');
  const promoLoginBtn = document.getElementById('promo-login-btn');

  window.openLoginModal = function () {
    window.location.href = 'login.html';
  };

  window.closeLoginModal = function () {
    if (loginModal) {
      loginModal.classList.remove('open');
      loginModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) window.closeLoginModal();
    });
  }

  if (headerLoginBtn) headerLoginBtn.addEventListener('click', window.openLoginModal);
  if (promoLoginBtn) promoLoginBtn.addEventListener('click', window.openLoginModal);
  if (drawerLoginBtn) {
    drawerLoginBtn.addEventListener('click', () => {
      closeDrawer();
      window.openLoginModal();
    });
  }

  window.fillDemoCredentials = function () {
    const emailField = document.getElementById('login-email');
    const passField = document.getElementById('login-password');
    if (emailField) emailField.value = 'client@aurawaters.com';
    if (passField) passField.value = 'paradise2026';
    showToast('Demo client credentials populated.');
  };

  window.handleLoginSubmit = function (e) {
    e.preventDefault();
    const emailField = document.getElementById('login-email');
    const email = emailField ? emailField.value : 'Client';
    window.closeLoginModal();
    showToast(`Welcome back, ${email.split('@')[0]}! Redirecting to your Private Client Portal...`);
    
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 800);
  };

  
  
  
  window.showToast = function (message) {
    const container = document.getElementById('toast-notification');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 4000);
  };

  
  
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeLightbox();
      window.closeQuoteModal();
      window.closeLoginModal();
      closeDrawer();
    }
  });

  
  
  
  window.scrollToSection = function (id) {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  
  
  
  const portfolioChips = document.querySelectorAll('.portfolio-chip');
  const projectCards = document.querySelectorAll('.projects-editorial-grid .project-card');

  portfolioChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      portfolioChips.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');

      const targetCategory = chip.getAttribute('data-category');

      let visibleIndex = 0;
      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-project');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex';
          
          card.classList.remove('is-revealed');
          const delay = visibleIndex * 120;
          visibleIndex++;
          setTimeout(() => {
            card.classList.add('is-revealed');
          }, delay);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  
  
  
  function initScrollReveal() {
    const animatedCards = document.querySelectorAll(
      '.scroll-slide-left, .projects-editorial-grid .project-card, .features-grid .feature-card, .pool-types-grid .pool-type-card, .timeline-row, .gallery-item'
    );

    if (!('IntersectionObserver' in window)) {
      animatedCards.forEach((card) => card.classList.add('is-revealed'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedCards.forEach((card) => {
      if (!card.classList.contains('scroll-slide-left')) {
        card.classList.add('scroll-slide-left');
      }
      scrollObserver.observe(card);
    });
  }

  function initRunningNumbers() {
    const statElements = document.querySelectorAll(
      '.stat-banner-num, .hero-stat-number, .m-stat-val'
    );
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveal();
      initRunningNumbers();
    });
  } else {
    initScrollReveal();
    initRunningNumbers();
  }

})();
