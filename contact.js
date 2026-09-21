

'use strict';

const ATELIER_DATA = {
  newport: {
    badge: 'GLOBAL FLAGSHIP ATELIER',
    title: 'Newport Beach Headquarters',
    coords: '33.6189° N, 117.9298° W · Elev. 42 ft',
    address: '1200 Bayside Drive, Suite 400<br>Newport Beach, California 92625',
    airport: 'John Wayne Airport (SNA) — 12 mins',
    helipad: "33°37'10\"N 117°53'44\"W",
    amenities: '3D Digital Holodeck · 20+ Stone Slab Library · Wet Weir Demo',
    parking: 'Private Secure Subterranean Valet',
    phone: '+1 (949) 885-AURA',
    tel: '+19498852872',
    navUrl: 'https://maps.google.com/?q=1200+Bayside+Dr+Newport+Beach+CA'
  },
  malibu: {
    badge: 'PACIFIC BLUFF DESIGN STUDIO',
    title: 'Malibu Pacific Studio',
    coords: '34.0259° N, 118.7798° W · Elev. 120 ft',
    address: '23410 Civic Center Way, Suite 210<br>Malibu, California 90265',
    airport: "Los Angeles Int'l (LAX) — 38 mins",
    helipad: "34°01'33\"N 118°46'47\"W",
    amenities: 'Cantilever Glass Floor Gallery · Ocean Horizon Sunset Simulator',
    parking: 'Gated Oceanfront Patron Stalls',
    phone: '+1 (310) 592-POOL',
    tel: '+13105927665',
    navUrl: 'https://maps.google.com/?q=23410+Civic+Center+Way+Malibu+CA'
  },
  palmbeach: {
    badge: 'EAST COAST FEASIBILITY HUB',
    title: 'Palm Beach Royal Atelier',
    coords: '26.7056° N, 80.0364° W · Elev. 14 ft',
    address: '250 Worth Avenue, Suite 300<br>Palm Beach, Florida 33480',
    airport: "Palm Beach Int'l (PBI) — 15 mins",
    helipad: "26°42'20\"N 80°02'11\"W",
    amenities: 'Tropical Flora & Natural Rock Vault · Hydro-Aeration Lab',
    parking: 'Worth Avenue Private Patron Garage',
    phone: '+1 (561) 740-AURA',
    tel: '+15617402872',
    navUrl: 'https://maps.google.com/?q=250+Worth+Avenue+Palm+Beach+FL'
  }
};

function selectStudioOnMap(studioId) {
  const data = ATELIER_DATA[studioId];
  if (!data) return;

  
  const tabs = document.querySelectorAll('.studio-tab-btn');
  tabs.forEach(tab => {
    const isTarget = tab.getAttribute('data-target') === studioId;
    tab.classList.toggle('active', isTarget);
    tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  
  const cards = document.querySelectorAll('.atelier-card');
  cards.forEach(card => {
    const isTarget = card.getAttribute('data-atelier') === studioId;
    card.classList.toggle('active-card', isTarget);
  });

  
  const markers = document.querySelectorAll('.map-studio-marker');
  markers.forEach(marker => {
    const isTarget = marker.id === `marker-${studioId}`;
    marker.classList.toggle('active', isTarget);
  });

  
  const hud = document.getElementById('map-hud-overlay');
  if (hud) {
    hud.style.opacity = '0.3';
    setTimeout(() => {
      const badge = document.getElementById('hud-badge');
      const title = document.getElementById('hud-title');
      const coords = document.getElementById('hud-coords');
      const address = document.getElementById('hud-address');
      const airport = document.getElementById('hud-airport');
      const helipad = document.getElementById('hud-helipad');
      const amenities = document.getElementById('hud-amenities');
      const parking = document.getElementById('hud-parking');
      const callBtn = document.getElementById('hud-call-btn');
      const navBtn = document.getElementById('hud-nav-btn');

      if (badge) badge.textContent = data.badge;
      if (title) title.textContent = data.title;
      if (coords) coords.innerHTML = `<svg class="coord-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg> ${data.coords}`;
      if (address) address.innerHTML = data.address;
      if (airport) airport.textContent = data.airport;
      if (helipad) helipad.textContent = data.helipad;
      if (amenities) amenities.textContent = data.amenities;
      if (parking) parking.textContent = data.parking;

      if (callBtn) {
        callBtn.textContent = `Call ${data.title.split(' ')[0]} Atelier`;
        callBtn.href = `tel:${data.tel}`;
      }
      if (navBtn) {
        navBtn.href = data.navUrl;
      }

      hud.style.opacity = '1';
    }, 150);
  }
}

function setMapView(mode) {
  const stage = document.getElementById('map-interactive-stage');
  const btnArch = document.getElementById('btn-view-arch');
  const btnSat = document.getElementById('btn-view-sat');

  if (btnArch && btnSat) {
    btnArch.classList.toggle('active', mode === 'arch');
    btnSat.classList.toggle('active', mode === 'sat');
  }

  if (stage) {
    if (mode === 'sat') {
      stage.style.background = 'radial-gradient(circle at 60% 50%, #06111f 0%, #010408 100%)';
      const rings = stage.querySelector('.map-topo-rings');
      if (rings) rings.style.borderColor = 'rgba(0, 229, 255, 0.3)';
    } else {
      stage.style.background = '';
      const rings = stage.querySelector('.map-topo-rings');
      if (rings) rings.style.borderColor = '';
    }
  }
}

let attachedFiles = [];

function initCommissionForm() {
  const form = document.getElementById('contact-commission-form');
  if (!form) return;

  const nameInput = document.getElementById('c-name');
  const emailInput = document.getElementById('c-email');
  const phoneInput = document.getElementById('c-phone');
  const locationInput = document.getElementById('c-location');

  
  [nameInput, emailInput, phoneInput, locationInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.classList.remove('has-error');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasError = false;

    
    if (!nameInput.value.trim()) {
      nameInput.classList.add('has-error');
      hasError = true;
    }

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailInput.classList.add('has-error');
      hasError = true;
    }

    
    if (!phoneInput.value.trim()) {
      phoneInput.classList.add('has-error');
      hasError = true;
    }

    
    if (!locationInput.value.trim()) {
      locationInput.classList.add('has-error');
      hasError = true;
    }

    if (hasError) {
      const firstError = form.querySelector('.has-error');
      if (firstError) firstError.focus();
      showToast('Please complete all required fields highlighted in red.');
      return;
    }

    
    const submitBtn = document.getElementById('cform-submit-btn');
    const submitText = submitBtn ? submitBtn.querySelector('.submit-text') : null;
    const originalText = submitText ? submitText.textContent : 'Submit Private Feasibility Inquiry';

    if (submitBtn) {
      submitBtn.classList.add('loading');
      if (submitText) submitText.textContent = 'Transmitting Feasibility Brief...';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.classList.remove('loading');
        if (submitText) submitText.textContent = originalText;
      }

      form.reset();
      clearDropzoneFiles();

      showToast('Commission Brief Received: Our Principal Architect will review your property parameters and reach out within 24 hours.');
    }, 1200);
  });
}

function initDropzone() {
  const dropzone = document.getElementById('cform-dropzone');
  const fileInput = document.getElementById('c-file-input');
  const fileList = document.getElementById('dropzone-file-list');

  if (!dropzone || !fileInput) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  });

  fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!attachedFiles.some(f => f.name === file.name && f.size === file.size)) {
        attachedFiles.push(file);
      }
    }
    renderFileList();
  }

  function renderFileList() {
    if (!fileList) return;
    fileList.innerHTML = '';
    attachedFiles.forEach((file, index) => {
      const chip = document.createElement('div');
      chip.className = 'dropzone-file-chip';
      const sizeStr = file.size > 1048576 
        ? `${(file.size / 1048576).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;

      chip.innerHTML = `
        <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>${file.name} (${sizeStr})</span>
        <button type="button" class="chip-remove-btn" data-index="${index}" aria-label="Remove file">&times;</button>
      `;
      fileList.appendChild(chip);
    });

    
    fileList.querySelectorAll('.chip-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        attachedFiles.splice(idx, 1);
        renderFileList();
      });
    });
  }
}

function clearDropzoneFiles() {
  attachedFiles = [];
  const fileList = document.getElementById('dropzone-file-list');
  if (fileList) fileList.innerHTML = '';
  const fileInput = document.getElementById('c-file-input');
  if (fileInput) fileInput.value = '';
}

function initFaqAccordion() {
  const accordion = document.getElementById('contact-faq-accordion');
  if (!accordion) return;

  const triggers = accordion.querySelectorAll('.cfaq-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.cfaq-item');
      const isOpen = item.classList.contains('open');

      
      accordion.querySelectorAll('.cfaq-item').forEach((i) => {
        i.classList.remove('open');
        const btn = i.querySelector('.cfaq-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle-btn') || document.getElementById('theme-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('aquara-theme') || localStorage.getItem('aura-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
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
  const btn = document.getElementById('rtl-toggle-btn') || document.getElementById('rtl-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('aquara-dir') || localStorage.getItem('aura-rtl') || 'ltr';
  html.setAttribute('dir', saved);
  if (btn && saved === 'rtl') btn.classList.add('active');

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('dir') || 'ltr';
      const next = current === 'ltr' ? 'rtl' : 'ltr';
      html.setAttribute('dir', next);
      localStorage.setItem('aquara-dir', next);
      localStorage.setItem('aura-rtl', next);
      btn.classList.toggle('active', next === 'rtl');
    });
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'aquara-dir' || e.key === 'aura-rtl') {
      if (e.newValue) {
        html.setAttribute('dir', e.newValue);
        if (btn) btn.classList.toggle('active', e.newValue === 'rtl');
      }
    }
  });
}

function initMobileDrawer() {
  const hamburger = document.getElementById('mobile-hamburger-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');
  const backdrop = document.getElementById('drawer-backdrop');

  if (!hamburger || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

function initDropdown() {
  const trigger = document.getElementById('home-dropdown-trigger');
  const item = document.getElementById('home-dropdown-item');

  if (!trigger || !item) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', !expanded);
    item.classList.toggle('open', !expanded);
  });

  document.addEventListener('click', (e) => {
    if (!item.contains(e.target)) {
      trigger.setAttribute('aria-expanded', 'false');
      item.classList.remove('open');
    }
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
  showToast('Thank you — your masterplan proposal request has been received. Our senior architect will contact you within 24 hours.');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  closeLoginModal();
  showToast('Welcome back. Authenticating private client portal session...');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 800);
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
  }, 4200);
}

function initModalOverlayClose() {
  ['quote-modal', 'login-modal'].forEach((id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        if (id === 'quote-modal') closeQuoteModal();
        if (id === 'login-modal') closeLoginModal();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuoteModal();
      closeLoginModal();
      const drawer = document.getElementById('mobile-nav-drawer');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }
  });
}

function initStudioTabs() {
  const tabs = document.querySelectorAll('.studio-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      if (target) selectStudioOnMap(target);
    });
  });
}

function initNavigationActiveState() {
  const homeTrigger = document.getElementById('home-dropdown-trigger');
  if (homeTrigger) {
    homeTrigger.classList.remove('active');
    homeTrigger.removeAttribute('aria-current');
  }
  document.querySelectorAll('.desktop-nav .nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (href.includes('contact.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
  document.querySelectorAll('.drawer-menu .drawer-link').forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (href.includes('contact.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initMobileDrawer();
  initDropdown();
  initHeaderScroll();
  initNavigationActiveState();
  initCommissionForm();
  initDropzone();
  initStudioTabs();
  initFaqAccordion();
  initModalOverlayClose();

  selectStudioOnMap('newport');
});

window.selectStudioOnMap = selectStudioOnMap;
window.setMapView = setMapView;
window.openQuoteModal = openQuoteModal;
window.closeQuoteModal = closeQuoteModal;
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.handleQuoteSubmit = handleQuoteSubmit;
window.handleLoginSubmit = handleLoginSubmit;
window.fillDemoCredentials = fillDemoCredentials;
window.showToast = showToast;
