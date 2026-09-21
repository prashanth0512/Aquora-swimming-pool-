

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initThemeAndRtl();
    initMobileDrawer();
    initDropdowns();
    initPricingFaqAccordion();
    initModalHandlers();
  });

  
  
  
  function initThemeAndRtl() {
    const htmlEl = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rtlToggleBtn = document.getElementById('rtl-toggle');

    
    const savedTheme = localStorage.getItem('aquara-theme') || localStorage.getItem('aura-theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('aquara-theme', newTheme);
        localStorage.setItem('aura-theme', newTheme);
        showToast(newTheme === 'dark' ? 'Switched to Twilight Dark Mode' : 'Switched to Coastal Light Mode');
      });
    }

    
    const savedDir = localStorage.getItem('aquara-dir') || localStorage.getItem('aura-rtl') || 'ltr';
    htmlEl.setAttribute('dir', savedDir);
    if (rtlToggleBtn) {
      const rtlText = rtlToggleBtn.querySelector('span');
      if (rtlText) rtlText.textContent = savedDir === 'rtl' ? 'LTR' : 'RTL';

      rtlToggleBtn.addEventListener('click', () => {
        const currentDir = htmlEl.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        htmlEl.setAttribute('dir', newDir);
        localStorage.setItem('aquara-dir', newDir);
        localStorage.setItem('aura-rtl', newDir);
        if (rtlText) rtlText.textContent = newDir === 'rtl' ? 'LTR' : 'RTL';
        showToast(newDir === 'rtl' ? 'RTL Layout Enabled' : 'LTR Layout Restored');
      });
    }

    window.addEventListener('storage', (e) => {
      if (e.key === 'aquara-theme' || e.key === 'aura-theme') {
        if (e.newValue) htmlEl.setAttribute('data-theme', e.newValue);
      }
      if (e.key === 'aquara-dir' || e.key === 'aura-rtl') {
        if (e.newValue) {
          htmlEl.setAttribute('dir', e.newValue);
          const rtlText = rtlToggleBtn ? rtlToggleBtn.querySelector('span') : null;
          if (rtlText) rtlText.textContent = e.newValue === 'rtl' ? 'LTR' : 'RTL';
        }
      }
    });
  }

  
  
  
  function initMobileDrawer() {
    const hamburgerBtn = document.getElementById('mobile-hamburger-btn') || document.getElementById('hamburger-btn');
    const drawer = document.getElementById('mobile-nav-drawer') || document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-drawer-overlay') || document.getElementById('mobile-drawer-backdrop');
    const closeBtn = document.getElementById('drawer-close-btn');

    if (!hamburgerBtn || !drawer || !backdrop) return;

    function openDrawer() {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.setAttribute('aria-hidden', 'false');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.setAttribute('aria-hidden', 'true');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  
  
  
  function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.has-dropdown');

    dropdownToggles.forEach(dropdown => {
      const toggleBtn = dropdown.querySelector('.dropdown-toggle');
      if (!toggleBtn) return;

      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        dropdownToggles.forEach(d => d.classList.remove('open'));
        if (!isOpen) {
          dropdown.classList.add('open');
          toggleBtn.setAttribute('aria-expanded', 'true');
        } else {
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('click', () => {
      dropdownToggles.forEach(d => {
        d.classList.remove('open');
        const btn = d.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  
  
  
  function initPricingFaqAccordion() {
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

  
  
  
  function initModalHandlers() {
    const quoteModal = document.getElementById('quote-modal');
    const loginModal = document.getElementById('login-modal');
    const quoteTypeSelect = document.getElementById('quote-type');

    window.openQuoteModal = function (tierName) {
      if (quoteModal) {
        quoteModal.classList.add('open');
        quoteModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (tierName && quoteTypeSelect) {
          for (let i = 0; i < quoteTypeSelect.options.length; i++) {
            if (quoteTypeSelect.options[i].text.toLowerCase().includes(tierName.toLowerCase()) ||
                tierName.toLowerCase().includes(quoteTypeSelect.options[i].text.toLowerCase())) {
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

    window.handleQuoteSubmit = function (e) {
      e.preventDefault();
      const nameInput = document.getElementById('quote-name');
      const name = nameInput ? nameInput.value : 'Patron';
      window.closeQuoteModal();
      showToast(`Thank you, ${name}! Your masterplan proposal request was received. Our architectural studio will contact you within 24 hours.`);
      const form = document.getElementById('quote-form');
      if (form) form.reset();
    };

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

    window.handleLoginSubmit = function (e) {
      e.preventDefault();
      window.closeLoginModal();
      showToast('Client authentication successful. Redirecting to Private Project Room...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    };

    window.fillDemoCredentials = function () {
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      if (emailInput) emailInput.value = 'client@aurawaters.com';
      if (passInput) passInput.value = 'paradise2026';
      showToast('Demo client credentials populated.');
    };

    
    if (quoteModal) {
      quoteModal.addEventListener('click', (e) => {
        if (e.target === quoteModal) window.closeQuoteModal();
      });
    }

    if (loginModal) {
      loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) window.closeLoginModal();
      });
    }

    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeQuoteModal();
        window.closeLoginModal();
      }
    });
  }

  
  
  
  window.showToast = function (message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4200);
  };

})();
