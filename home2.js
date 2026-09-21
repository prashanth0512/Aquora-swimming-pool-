

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndDirection();
  initHeaderScroll();
  initHomeDropdown();
  initMobileDrawer();
  initKeyboardNav();
  initNavigationActiveState();
});

function initNavigationActiveState() {
  const homeTrigger = document.getElementById('home-dropdown-trigger');
  if (homeTrigger) {
    homeTrigger.classList.add('active');
    homeTrigger.setAttribute('aria-current', 'page');
  }
  const homeMenuLinks = document.querySelectorAll('#home-dropdown-menu .dropdown-link');
  homeMenuLinks.forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (href.includes('home2.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  const drawerH1 = document.getElementById('drawer-home-1');
  const drawerH2 = document.getElementById('drawer-home-2');
  if (drawerH1) drawerH1.classList.remove('active');
  if (drawerH2) drawerH2.classList.add('active');

  document.querySelectorAll('.drawer-menu .drawer-link').forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (href.includes('home2.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initThemeAndDirection() {
  const html = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const rtlToggleBtn = document.getElementById('rtl-toggle-btn');

  
  const savedTheme = localStorage.getItem('aquara-theme') || localStorage.getItem('aura-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  
  const savedDir = localStorage.getItem('aquara-dir') || localStorage.getItem('aura-rtl') || 'ltr';
  html.setAttribute('dir', savedDir);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('aquara-theme', nextTheme);
      localStorage.setItem('aura-theme', nextTheme);
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const currentDir = html.getAttribute('dir') || 'ltr';
      const nextDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      html.setAttribute('dir', nextDir);
      localStorage.setItem('aquara-dir', nextDir);
      localStorage.setItem('aura-rtl', nextDir);
      showToast(`Layout orientation: ${nextDir.toUpperCase()}`);
    });
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'aquara-theme' || e.key === 'aura-theme') {
      if (e.newValue) html.setAttribute('data-theme', e.newValue);
    }
    if (e.key === 'aquara-dir' || e.key === 'aura-rtl') {
      if (e.newValue) html.setAttribute('dir', e.newValue);
    }
  });
}

function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initHomeDropdown() {
  const dropdownItem = document.getElementById('home-dropdown-item');
  const trigger = document.getElementById('home-dropdown-trigger');
  const menu = document.getElementById('home-dropdown-menu');

  if (!dropdownItem || !trigger || !menu) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.contains('show');
    if (isOpen) {
      menu.classList.remove('show');
      trigger.setAttribute('aria-expanded', 'false');
    } else {
      menu.classList.add('show');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });

  document.addEventListener('click', (e) => {
    if (!dropdownItem.contains(e.target)) {
      menu.classList.remove('show');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

function initMobileDrawer() {
  const openBtn = document.getElementById('mobile-hamburger-btn');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const drawerLinks = drawer ? drawer.querySelectorAll('.drawer-link') : [];

  if (!openBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

let currentExperienceKey = 'infinity';

const experiencesData = {
  infinity: {
    key: 'infinity',
    code: 'PARADIGM CODE: AW-INF-01',
    acoustic: 'Silent Flow Profile (<16dB)',
    status: 'Hydraulic CFD Simulation Active',
    title: 'The Infinity Escape',
    tag: 'Vanishing Perimeter Catch Basin',
    scale: '0.02% SLOPE PRECISION',
    img: 'assets/hero_infinity.jpg',
    desc: 'Engineered for properties with expansive horizons. The water surface extends seamlessly to a laser-calibrated vanishing edge, eliminating the visual boundary between pool and sky while silently recirculating into a subterranean surge basin with zero acoustic splash.',
    specs: [
      '±1.2mm Laser Leveled Weir',
      'Whisper Chute <16dB',
      'Variable Speed Dual Surge',
      'Coastal Bluffs & Hilltops'
    ],
    synergy: 'Silver Travertine Flamed Coping + Caribbean Deep Cyan Pebble Interior + Monolithic Glass Tile Spillway.',
    pins: [
      { top: '48%', left: '68%', label: 'WEIR WALL ELEVATION', text: '±1.2mm Laser Vanishing Lip' },
      { top: '76%', left: '28%', label: 'ACOUSTIC ATTENUATION', text: 'Sub-Basin Silent Chute <16dB' },
      { top: '26%', left: '22%', label: 'SURFACE FINISH', text: 'Monolithic Travertine Coping' }
    ]
  },
  family: {
    key: 'family',
    code: 'PARADIGM CODE: AW-FAM-02',
    acoustic: 'Dampened Ambient Harmony',
    status: 'Bespoke Multi-Tier Solarium',
    title: 'The Family Sanctuary',
    tag: 'Multi-Zone Architectural Haven',
    scale: 'MULTI-GRADIENT DEPTH PROFILE',
    img: 'assets/project_resort.jpg',
    desc: 'Balancing generational fun with architectural grandeur. Incorporates an expansive 9-inch submerged Baja solarium, child-safe anti-slip travertine transition steps, concealed auto-safety tracks, and an integrated thermal wellness spa.',
    specs: [
      '9" Uniform Baja Solarium',
      'Concealed Under-Track Cover',
      'Dual UV-C + Hydro-Ozone',
      'Expansive Flat Grounds & Lawns'
    ],
    synergy: 'French Riviera Limestone Paving + Arctic White Micro-Glass Aggregate + In-Water Ledge Loungers.',
    pins: [
      { top: '65%', left: '35%', label: 'BAJA TANNING SHELF', text: '9" Submerged Solarium Zone' },
      { top: '35%', left: '72%', label: 'ELEVATED SPA RIM', text: 'Cascade Hydrotherapy Jets' },
      { top: '80%', left: '15%', label: 'ACCESS GEOMETRY', text: 'Monolithic Step Tread Design' }
    ]
  },
  contemporary: {
    key: 'contemporary',
    code: 'PARADIGM CODE: AW-KNIFE-03',
    acoustic: 'Zero-Turbulence Liquid Glass',
    status: 'Perimeter Slot Hydraulic Balance',
    title: 'The Knife-Edge Oasis',
    tag: '360° Perimeter Slot Mirror',
    scale: '100% FLUSH DECK LEVELING',
    img: 'assets/gallery_knife_edge.jpg',
    desc: 'The zenith of minimalist landscape engineering. Water rises flush with surrounding stone decks through a precision 10mm concealed slot perimeter, transforming the entire pool into a silent, reflective liquid glass mirror.',
    specs: [
      '10mm Precision Perimeter Slot',
      'Zero Surface Cresting Index',
      'Recessed Basal Linear LEDs',
      'Modernist Architectural Courtyards'
    ],
    synergy: 'Charcoal Basalt Slabs + Midnight Black Polished Pebble + Brushed 316 Marine Stainless Trim.',
    pins: [
      { top: '60%', left: '48%', label: 'PERIMETER SLOT', text: '10mm Concealed Slot Drain' },
      { top: '32%', left: '30%', label: 'SURFACE TENSION', text: 'Level-Deck Mirror Surface' },
      { top: '75%', left: '76%', label: 'LINEAR ILLUMINATION', text: 'Recessed 3000K Warm Water Glow' }
    ]
  },
  resort: {
    key: 'resort',
    code: 'PARADIGM CODE: AW-RST-04',
    acoustic: 'Cascading Spillway Resonator',
    status: 'Dual-Zone Geothermal Climate',
    title: 'The Private Resort',
    tag: 'Sunken Fire Lounge & Geothermal Spa',
    scale: 'DUAL THERMAL MICRO-CLIMATES',
    img: 'assets/gallery_fire_lounge.jpg',
    desc: 'Transforming your estate into a private five-star wellness compound. Features an architectural sunken fire conversation lounge cantilevered into the pool, hand-cut stone spillways, and independent high-capacity geothermal spa circuits.',
    specs: [
      '12-Guest Submerged Lounge',
      'Dual Geothermal Heat Circuits',
      'Hand-Cut Granite Spillway',
      'Flagship Multi-Acre Country Estates'
    ],
    synergy: 'Antalya Gold Marble Coping + Sunken Fire Pit Gas Burners + Deep Ocean Ceramic Tile.',
    pins: [
      { top: '68%', left: '42%', label: 'SUNKEN FIRE LOUNGE', text: 'Cantilevered Dry Conversation Atrium' },
      { top: '38%', left: '65%', label: 'ILLUMINATED SPA', text: 'Geothermal 104°F Rapid Heating' },
      { top: '45%', left: '18%', label: 'CASCADING WEIR', text: 'Engineered Sheet Waterfalls' }
    ]
  }
};

function selectExperience(key, btn) {
  const data = experiencesData[key];
  if (!data) return;

  currentExperienceKey = key;

  
  const allTabs = document.querySelectorAll('.h2-paradigm-tab');
  allTabs.forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  } else {
    const matchingTab = document.querySelector(`.h2-paradigm-tab[data-exp="${key}"]`);
    if (matchingTab) {
      matchingTab.classList.add('active');
      matchingTab.setAttribute('aria-selected', 'true');
    }
  }

  
  const img = document.getElementById('exp-image');
  const badge = document.getElementById('exp-badge');
  const title = document.getElementById('exp-title');
  const desc = document.getElementById('exp-desc');
  const code = document.getElementById('exp-code');
  const acoustic = document.getElementById('exp-acoustic-text');
  const status = document.getElementById('exp-status-text');
  const scale = document.getElementById('exp-scale-val');
  const synergy = document.getElementById('exp-synergy');

  const s1 = document.getElementById('exp-spec-1');
  const s2 = document.getElementById('exp-spec-2');
  const s3 = document.getElementById('exp-spec-3');
  const s4 = document.getElementById('exp-spec-4');

  if (img) {
    img.style.opacity = '0.35';
    setTimeout(() => {
      img.src = data.img;
      img.alt = `${data.title} by AURA WATERS`;
      img.style.opacity = '1';
    }, 180);
  }

  if (code) code.textContent = data.code;
  if (acoustic) acoustic.textContent = data.acoustic;
  if (status) status.textContent = data.status;
  if (badge) badge.textContent = data.tag;
  if (scale) scale.textContent = data.scale;
  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.desc;
  if (synergy) synergy.textContent = data.synergy;

  if (s1 && data.specs[0]) s1.textContent = data.specs[0];
  if (s2 && data.specs[1]) s2.textContent = data.specs[1];
  if (s3 && data.specs[2]) s3.textContent = data.specs[2];
  if (s4 && data.specs[3]) s4.textContent = data.specs[3];

  
  if (data.pins && data.pins.length >= 3) {
    for (let i = 1; i <= 3; i++) {
      const pinEl = document.getElementById(`pin-${i}`);
      const pinTextEl = document.getElementById(`pin-${i}-text`);
      const pinObj = data.pins[i - 1];
      if (pinEl && pinObj) {
        pinEl.style.top = pinObj.top;
        pinEl.style.left = pinObj.left;
        const labelEl = pinEl.querySelector('.pin-label');
        if (labelEl) labelEl.textContent = pinObj.label;
        if (pinTextEl) pinTextEl.textContent = pinObj.text;
      }
    }
  }
}

function inspectCurrentParadigm() {
  const data = experiencesData[currentExperienceKey];
  if (!data) return;
  if (typeof openLightbox === 'function') {
    openLightbox(data.img, data.title, `${data.code} — ${data.tag}. ${data.desc}`);
  }
}

function filterInspiration(category, btn) {
  const pills = document.querySelectorAll('.h2-filter-pill');
  pills.forEach(p => {
    p.classList.remove('active');
    p.setAttribute('aria-selected', 'false');
  });

  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }

  const cards = document.querySelectorAll('.h2-insp-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = '';
      card.style.opacity = '0';
      card.style.transform = 'translateY(8px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      card.style.display = 'none';
    }
  });
}

function openQuoteModal(context) {
  const modal = document.getElementById('quote-modal');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (context) {
    const notesInput = document.getElementById('quote-notes');
    if (notesInput && !notesInput.value) {
      notesInput.value = `Inquiry initiated from: ${context}`;
    }
  }
}

function closeQuoteModal() {
  const modal = document.getElementById('quote-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function handleQuoteSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('quote-name').value || 'Client';
  closeQuoteModal();
  showToast(`Thank you, ${name}. Your architectural proposal request has been received.`);
  const form = document.getElementById('quote-form');
  if (form) form.reset();
}

function openLoginModal() {
  window.location.href = 'login.html';
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function fillDemoCredentials() {
  const email = document.getElementById('login-email');
  const pass = document.getElementById('login-password');
  if (email) email.value = 'client@aurawaters.com';
  if (pass) pass.value = 'paradise2026';
  showToast('Demo credentials autofilled.');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  closeLoginModal();
  showToast('Welcome back, Mr. Sterling. Redirecting to your Malibu Horizon Dashboard...');
  setTimeout(() => {
    const target = document.getElementById('project-room');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }, 700);
}

function openLightbox(imgSrc, title, description) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-title');
  const descEl = document.getElementById('lightbox-description');

  if (!modal || !img) return;

  img.src = imgSrc;
  if (titleEl) titleEl.textContent = title || 'Architectural Waterscape';
  if (descEl) descEl.textContent = description || 'AURA WATERS bespoke installation';

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuoteModal();
      closeLoginModal();
      closeLightbox();
      const drawer = document.getElementById('mobile-nav-drawer');
      const overlay = document.getElementById('mobile-drawer-overlay');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  
  ['quote-modal', 'login-modal', 'lightbox-modal'].forEach(id => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          if (id === 'quote-modal') closeQuoteModal();
          if (id === 'login-modal') closeLoginModal();
          if (id === 'lightbox-modal') closeLightbox();
        }
      });
    }
  });

  
  const headerLoginBtn = document.getElementById('header-login-btn');
  if (headerLoginBtn) {
    headerLoginBtn.addEventListener('click', openLoginModal);
  }
}

function showToast(message) {
  const container = document.getElementById('toast-notification');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-bubble';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}
