
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initThemeAndRtl();
    initKinetic404();
    initCausticsCanvas();
    initKeyboardShortcuts();
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

  function initKinetic404() {
    const movingEl = document.getElementById('p404-moving-number');
    const stage = document.getElementById('p404-stage');
    if (!movingEl || !stage) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;

    function onPointerMove(e) {
      const rect = stage.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = (clientX - centerX) / (window.innerWidth / 2);
      const normY = (clientY - centerY) / (window.innerHeight / 2);

      targetX = Math.max(-1, Math.min(1, normX));
      targetY = Math.max(-1, Math.min(1, normY));
      isHovering = true;
    }

    function onPointerLeave() {
      targetX = 0;
      targetY = 0;
      isHovering = false;
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    document.body.addEventListener('mouseleave', onPointerLeave);

    function renderTilt() {
      const lerpFactor = 0.08;
      currentX += (targetX - currentX) * lerpFactor;
      currentY += (targetY - currentY) * lerpFactor;

      const tiltMaxDeg = 14;
      const shiftMaxPx = 22;

      const rotateY = currentX * tiltMaxDeg;
      const rotateX = -currentY * tiltMaxDeg;
      const translateX = currentX * shiftMaxPx;
      const translateY = currentY * shiftMaxPx;

      movingEl.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0)`;

      requestAnimationFrame(renderTilt);
    }

    requestAnimationFrame(renderTilt);
  }

  function initCausticsCanvas() {
    const canvas = document.getElementById('caustics-canvas');
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
    const BUBBLE_COUNT = 36;

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 0.6 + 0.25,
        drift: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.4 + 0.15
      });
    }

    const ripples = [];
    window.addEventListener('pointerdown', (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: Math.random() * 80 + 70,
        alpha: 0.75
      });
    });

    let wavePhase = 0;

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const waveColor = isLight ? 'rgba(0, 102, 255, ' : 'rgba(0, 229, 255, ';

      wavePhase += 0.015;
      ctx.lineWidth = 1.2;

      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        const yOffset = height * (0.35 + j * 0.2);
        const amp = 16 + j * 8;

        for (let x = 0; x <= width; x += 18) {
          const y =
            yOffset +
            Math.sin(x * 0.004 + wavePhase + j * 1.5) * amp +
            Math.cos(x * 0.008 - wavePhase) * (amp * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `${waveColor}${0.035 - j * 0.008})`;
        ctx.stroke();
      }

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.speed;
        b.x += Math.sin(wavePhase + i) * 0.35 + b.drift;

        if (b.y < -10) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${waveColor}${b.opacity * (isLight ? 0.4 : 0.7)})`;
        ctx.fill();
      }

      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 2.2;
        rip.alpha *= 0.96;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${waveColor}${rip.alpha * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      requestAnimationFrame(renderCanvas);
    }

    requestAnimationFrame(renderCanvas);
  }

  function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.location.href = 'index.html';
      }
    });
  }
})();
