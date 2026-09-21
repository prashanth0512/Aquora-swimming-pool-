

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initPasswordToggle();
  initLoginForm();
  initSocialLogins();
  initForgotPassword();
});

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle-btn');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('aquara-theme') || localStorage.getItem('aura-theme') || 'dark';

  html.setAttribute('data-theme', savedTheme);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('aquara-theme', next);
      localStorage.setItem('aura-theme', next);
      showToast(`Theme switched to ${next === 'dark' ? 'Dark Azure' : 'Light Atelier'}`);
    });
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'aquara-theme' || e.key === 'aura-theme') {
      if (e.newValue) html.setAttribute('data-theme', e.newValue);
    }
  });
}

function initRtlToggle() {
  const btn = document.getElementById('rtl-toggle-btn');
  const html = document.documentElement;
  const savedRtl = localStorage.getItem('aquara-dir') || localStorage.getItem('aura-rtl') || 'ltr';

  html.setAttribute('dir', savedRtl);
  if (btn && savedRtl === 'rtl') {
    btn.classList.add('active');
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('dir') || 'ltr';
      const next = current === 'ltr' ? 'rtl' : 'ltr';
      html.setAttribute('dir', next);
      localStorage.setItem('aquara-dir', next);
      localStorage.setItem('aura-rtl', next);
      btn.classList.toggle('active', next === 'rtl');
      showToast(`Layout switched to ${next.toUpperCase()}`);
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

function initPasswordToggle() {
  const toggleBtn = document.getElementById('btn-toggle-pw');
  const pwInput = document.getElementById('login-password');

  if (!toggleBtn || !pwInput) return;

  const eyeOpen = toggleBtn.querySelector('.eye-open');
  const eyeClosed = toggleBtn.querySelector('.eye-closed');

  toggleBtn.addEventListener('click', () => {
    const isPassword = pwInput.getAttribute('type') === 'password';
    pwInput.setAttribute('type', isPassword ? 'text' : 'password');

    if (eyeOpen && eyeClosed) {
      eyeOpen.style.display = isPassword ? 'none' : 'block';
      eyeClosed.style.display = isPassword ? 'block' : 'none';
    }
  });
}

function initLoginForm() {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('login-email');
  const pwInput = document.getElementById('login-password');
  const submitBtn = document.getElementById('btn-login-submit');

  if (!form || !emailInput || !pwInput) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const emailVal = emailInput.value.trim();
    const pwVal = pwInput.value.trim();

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailGroup = emailInput.closest('.form-group');
    if (!emailVal || !emailRegex.test(emailVal)) {
      emailGroup.classList.add('has-error');
      isValid = false;
    } else {
      emailGroup.classList.remove('has-error');
    }

    
    const pwGroup = pwInput.closest('.form-group');
    if (!pwVal || pwVal.length < 6) {
      pwGroup.classList.add('has-error');
      isValid = false;
    } else {
      pwGroup.classList.remove('has-error');
    }

    if (!isValid) {
      
      form.classList.add('form-shake');
      setTimeout(() => form.classList.remove('form-shake'), 400);
      return;
    }

    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-loader" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12"></circle>
        </svg>
        <span>Authenticating Patron Vault...</span>
      `;
    }

    showToast('Welcome back, Estate Patron. Establishing secure session...');

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  });

  
  [emailInput, pwInput].forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group) group.classList.remove('has-error');
    });
  });
}

function initSocialLogins() {
  const googleBtn = document.getElementById('btn-google-auth');
  const appleBtn = document.getElementById('btn-apple-auth');

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      showToast('Initiating Google Patron Verification Protocol...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }

  if (appleBtn) {
    appleBtn.addEventListener('click', () => {
      showToast('Connecting to Apple Private Relay Authentication...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }
}

function initForgotPassword() {
  const forgotLink = document.getElementById('forgot-pw-link');
  if (!forgotLink) return;

  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('login-email');
    const emailVal = emailInput ? emailInput.value.trim() : '';

    if (emailVal && emailVal.includes('@')) {
      showToast(`Encrypted password reset token dispatched to ${emailVal}`);
    } else {
      showToast('Please input your registered estate email to receive a recovery token.');
      if (emailInput) emailInput.focus();
    }
  });
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
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}
