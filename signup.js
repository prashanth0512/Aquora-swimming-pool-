

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initPasswordToggle();
  initPasswordStrength();
  initSignupForm();
  initSocialLogins();
  initTermsModal();
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
  setupEyeToggle('btn-toggle-signup-pw', 'signup-password');
  setupEyeToggle('btn-toggle-signup-confirm-pw', 'signup-confirm-password');
}

function setupEyeToggle(btnId, inputId) {
  const toggleBtn = document.getElementById(btnId);
  const pwInput = document.getElementById(inputId);

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

function initPasswordStrength() {
  const pwInput = document.getElementById('signup-password');
  const bars = [
    document.getElementById('str-1'),
    document.getElementById('str-2'),
    document.getElementById('str-3'),
    document.getElementById('str-4')
  ];
  const strengthText = document.getElementById('strength-text');

  if (!pwInput || !strengthText) return;

  pwInput.addEventListener('input', () => {
    const val = pwInput.value;
    const score = evaluatePasswordScore(val);

    
    bars.forEach(b => {
      b.className = 'strength-bar';
    });

    if (val.length === 0) {
      strengthText.textContent = 'Security: Enter at least 8 characters';
      return;
    }

    if (score === 1) {
      bars[0].classList.add('weak');
      strengthText.textContent = 'Security: Weak (add length & numbers)';
      strengthText.style.color = '#ef4444';
    } else if (score === 2) {
      bars[0].classList.add('fair');
      bars[1].classList.add('fair');
      strengthText.textContent = 'Security: Fair (add symbols & uppercase)';
      strengthText.style.color = '#f59e0b';
    } else if (score === 3) {
      bars[0].classList.add('good');
      bars[1].classList.add('good');
      bars[2].classList.add('good');
      strengthText.textContent = 'Security: Good (almost fortress level)';
      strengthText.style.color = '#00b4d8';
    } else if (score === 4) {
      bars.forEach(b => b.classList.add('strong'));
      strengthText.textContent = 'Security: Exceptional (Patron Vault standard)';
      strengthText.style.color = '#10b981';
    }
  });
}

function evaluatePasswordScore(pw) {
  if (!pw) return 0;
  let score = 0;

  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  return score;
}

function initSignupForm() {
  const form = document.getElementById('signup-form');
  const nameInput = document.getElementById('signup-name');
  const emailInput = document.getElementById('signup-email');
  const pwInput = document.getElementById('signup-password');
  const confirmPwInput = document.getElementById('signup-confirm-password');
  const termsCheckbox = document.getElementById('terms-agree');
  const submitBtn = document.getElementById('btn-signup-submit');

  if (!form || !nameInput || !emailInput || !pwInput || !confirmPwInput) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const pwVal = pwInput.value.trim();
    const confirmVal = confirmPwInput.value.trim();
    const termsAccepted = termsCheckbox ? termsCheckbox.checked : true;

    
    const nameGroup = nameInput.closest('.form-group');
    if (!nameVal || nameVal.length < 2) {
      nameGroup.classList.add('has-error');
      isValid = false;
    } else {
      nameGroup.classList.remove('has-error');
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailGroup = emailInput.closest('.form-group');
    if (!emailVal || !emailRegex.test(emailVal)) {
      emailGroup.classList.add('has-error');
      isValid = false;
    } else {
      emailGroup.classList.remove('has-error');
    }

    
    const pwGroup = pwInput.closest('.form-group');
    const confirmGroup = confirmPwInput.closest('.form-group');
    const pwError = document.getElementById('err-signup-password');

    if (!pwVal || pwVal.length < 8 || pwVal !== confirmVal) {
      pwGroup.classList.add('has-error');
      confirmGroup.classList.add('has-error');
      if (pwError) {
        pwError.style.display = 'block';
        pwError.textContent = pwVal !== confirmVal ? 'Passwords do not match.' : 'Password must be at least 8 characters.';
      }
      isValid = false;
    } else {
      pwGroup.classList.remove('has-error');
      confirmGroup.classList.remove('has-error');
      if (pwError) pwError.style.display = 'none';
    }

    
    const termsError = document.getElementById('err-signup-terms');
    if (!termsAccepted) {
      if (termsError) termsError.style.display = 'block';
      isValid = false;
    } else {
      if (termsError) termsError.style.display = 'none';
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
        <span>Enrolling Patron Profile...</span>
      `;
    }

    showToast(`Patron profile created for ${nameVal}. Establishing private atelier vault...`);

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1200);
  });

  
  [nameInput, emailInput, pwInput, confirmPwInput].forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group) group.classList.remove('has-error');
      const pwError = document.getElementById('err-signup-password');
      if (pwError && pwInput.value === confirmPwInput.value) {
        pwError.style.display = 'none';
      }
    });
  });

  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', () => {
      const termsError = document.getElementById('err-signup-terms');
      if (termsError && termsCheckbox.checked) termsError.style.display = 'none';
    });
  }
}

function initSocialLogins() {
  const googleBtn = document.getElementById('btn-google-signup');
  const appleBtn = document.getElementById('btn-apple-signup');

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      showToast('Redirecting to Google One-Tap Patron Enrolment...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }

  if (appleBtn) {
    appleBtn.addEventListener('click', () => {
      showToast('Authenticating with Apple Secure Patron Keychain...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }
}

function initTermsModal() {
  const termsLink = document.getElementById('terms-link');
  if (!termsLink) return;

  termsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('AURA WATERS AIA Protocol: All client designs, topographic data, and inquiries are protected under strict bilateral non-disclosure agreements.');
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
