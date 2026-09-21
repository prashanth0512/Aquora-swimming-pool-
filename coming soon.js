
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initThemeAndRtl();
    initCountdownTimer();
    initAmbientCanvas();
  });

  function initThemeAndRtl() {
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle-btn');
    const rtlBtn = document.getElementById('rtl-toggle-btn');

    const savedTheme = localStorage.getItem('aquara-theme') || localStorage.getItem('aura-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    const savedDir = localStorage.getItem('aquara-dir') || localStorage.getItem('aura-rtl') || 'ltr';
    html.setAttribute('dir', savedDir);
    if (rtlBtn) rtlBtn.classList.toggle('active', savedDir === 'rtl');

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', nextTheme);
        localStorage.setItem('aquara-theme', nextTheme);
        localStorage.setItem('aura-theme', nextTheme);
      });
    }

    if (rtlBtn) {
      rtlBtn.addEventListener('click', () => {
        const currentDir = html.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        html.setAttribute('dir', nextDir);
        localStorage.setItem('aquara-dir', nextDir);
        localStorage.setItem('aura-rtl', nextDir);
        rtlBtn.classList.toggle('active', nextDir === 'rtl');
      });
    }

    window.addEventListener('storage', (e) => {
      if (e.key === 'aquara-theme' || e.key === 'aura-theme') {
        if (e.newValue) html.setAttribute('data-theme', e.newValue);
      }
      if (e.key === 'aquara-dir' || e.key === 'aura-rtl') {
        if (e.newValue) {
          html.setAttribute('dir', e.newValue);
          if (rtlBtn) rtlBtn.classList.toggle('active', e.newValue === 'rtl');
        }
      }
    });
  }

  function initCountdownTimer() {
    const elDays = document.getElementById('cd-days');
    const elHours = document.getElementById('cd-hours');
    const elMinutes = document.getElementById('cd-minutes');
    const elSeconds = document.getElementById('cd-seconds');

    const barDays = document.getElementById('bar-days');
    const barHours = document.getElementById('bar-hours');
    const barMinutes = document.getElementById('bar-minutes');
    const barSeconds = document.getElementById('bar-seconds');

    let targetTime = localStorage.getItem('aquora_launch_target');
    if (!targetTime) {
      const future = new Date();
      future.setDate(future.getDate() + 42);
      future.setHours(future.getHours() + 18);
      future.setMinutes(future.getMinutes() + 34);
      future.setSeconds(future.getSeconds() + 59);
      targetTime = future.getTime();
      localStorage.setItem('aquora_launch_target', targetTime);
    } else {
      targetTime = parseInt(targetTime, 10);
    }

    let prevVals = { days: -1, hours: -1, minutes: -1, seconds: -1 };

    function updateCounter() {
      const now = Date.now();
      let diff = Math.max(0, targetTime - now);

      if (diff === 0) {
        const future = new Date();
        future.setDate(future.getDate() + 45);
        targetTime = future.getTime();
        localStorage.setItem('aquora_launch_target', targetTime);
        diff = targetTime - now;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const pad = (n) => String(n).padStart(2, '0');

      applyValue(elDays, barDays, pad(days), (days / 60) * 100, prevVals.days !== days);
      applyValue(elHours, barHours, pad(hours), (hours / 24) * 100, prevVals.hours !== hours);
      applyValue(elMinutes, barMinutes, pad(minutes), (minutes / 60) * 100, prevVals.minutes !== minutes);
      applyValue(elSeconds, barSeconds, pad(seconds), (seconds / 60) * 100, prevVals.seconds !== seconds);

      prevVals = { days, hours, minutes, seconds };
    }

    function applyValue(el, bar, val, percent, changed) {
      if (!el) return;
      if (changed) {
        el.textContent = val;
        el.classList.remove('digit-pulse-down');
        void el.offsetWidth;
        el.classList.add('digit-pulse-down');
      }
      if (bar) {
        bar.style.width = `${Math.min(100, Math.max(8, percent))}%`;
      }
    }

    updateCounter();
    setInterval(updateCounter, 1000);
  }

  function initAmbientCanvas() {
    const canvas = document.getElementById('cs-ambient-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize, { passive: true });

    const bubbles = [];
    const BUBBLE_COUNT = 32;

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1,
        speed: Math.random() * 0.55 + 0.2,
        drift: Math.random() * 0.3 - 0.15,
        opacity: Math.random() * 0.35 + 0.15
      });
    }

    let wavePhase = 0;

    function render() {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const waveColor = isLight ? 'rgba(0, 102, 255, ' : 'rgba(0, 229, 255, ';

      wavePhase += 0.012;
      ctx.lineWidth = 1.1;

      for (let j = 0; j < 2; j++) {
        ctx.beginPath();
        const yOffset = height * (0.4 + j * 0.25);
        const amp = 14 + j * 6;

        for (let x = 0; x <= width; x += 20) {
          const y =
            yOffset +
            Math.sin(x * 0.0035 + wavePhase + j * 1.8) * amp +
            Math.cos(x * 0.007 - wavePhase) * (amp * 0.35);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `${waveColor}${0.03 - j * 0.008})`;
        ctx.stroke();
      }

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.speed;
        b.x += Math.sin(wavePhase + i) * 0.3 + b.drift;

        if (b.y < -10) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${waveColor}${b.opacity * (isLight ? 0.35 : 0.6)})`;
        ctx.fill();
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  window.handleNotifySubmit = function (e) {
    e.preventDefault();
    const input = document.getElementById('cs-email-input');
    const btn = document.getElementById('cs-submit-btn');
    if (!input || !btn) return;

    const email = input.value.trim();
    if (!email || !email.includes('@')) {
      showToast('Please provide a valid estate email address.');
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span>Priority Folio Reserved</span> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
    btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';

    showToast(`Priority invitation reserved for ${email}. You will receive confidential first-access blueprints.`);
    input.value = '';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = `
        <span>Request Priority Invitation</span>
        <svg class="icon-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      `;
      btn.style.background = '';
    }, 5000);
  };

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

  window.showToast = showToast;
})();
