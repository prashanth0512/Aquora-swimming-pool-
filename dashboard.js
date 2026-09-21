

'use strict';

function initSidebar() {
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebar = document.getElementById('dashboard-sidebar');
  const closeBtn = document.getElementById('sidebar-close-btn');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add('sidebar-open');
    if (backdrop) backdrop.classList.add('show');
    document.body.style.overflow = window.innerWidth <= 1024 ? 'hidden' : '';
  }

  function closeSidebar() {
    sidebar.classList.remove('sidebar-open');
    if (backdrop) backdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        if (sidebar.classList.contains('sidebar-open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      } else {
        
        document.body.classList.toggle('sidebar-collapsed');
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && sidebar.classList.contains('sidebar-open')) {
      closeSidebar();
    }
  });
}

function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.nav-tab-btn');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) {
        e.preventDefault();
        switchDashboardTab(tabId);
      }
    });
  });

  
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById(`pane-${initialHash}`)) {
    switchDashboardTab(initialHash);
  }
}

function switchDashboardTab(tabId) {
  if (!tabId) return;

  
  const tabButtons = document.querySelectorAll('.nav-tab-btn');
  tabButtons.forEach(btn => {
    const isCurrent = btn.getAttribute('data-tab') === tabId;
    btn.classList.toggle('active', isCurrent);
  });

  
  const panes = document.querySelectorAll('.dashboard-tab-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  const targetPane = document.getElementById(`pane-${tabId}`);
  if (targetPane) {
    targetPane.classList.add('active');
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, '', `#${tabId}`);
  }

  
  if (tabId === 'messages') {
    setTimeout(() => {
      const input = document.getElementById('chat-input-field');
      if (input) input.focus();
    }, 350);
  }

  
  const sidebar = document.getElementById('dashboard-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar && sidebar.classList.contains('sidebar-open')) {
    sidebar.classList.remove('sidebar-open');
    if (backdrop) backdrop.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function initChartInteractions() {
  const tooltip = document.getElementById('chart-tooltip');
  const chartWrapper = document.getElementById('line-chart-container');

  
  const dataPoints = document.querySelectorAll('.chart-data-point');
  dataPoints.forEach(pt => {
    pt.addEventListener('mouseenter', (e) => {
      if (!tooltip || !chartWrapper) return;
      const info = pt.getAttribute('data-info');
      tooltip.textContent = info;
      tooltip.style.display = 'block';

      const circle = pt.querySelector('.point-circle');
      if (circle) {
        const cx = parseFloat(circle.getAttribute('cx'));
        const cy = parseFloat(circle.getAttribute('cy'));
        const rect = chartWrapper.getBoundingClientRect();
        const percentX = cx / 800;
        const percentY = cy / 280;

        tooltip.style.left = `${percentX * rect.width}px`;
        tooltip.style.top = `${percentY * rect.height}px`;
      }
    });

    pt.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.style.display = 'none';
    });
  });

  
  const barFills = document.querySelectorAll('.barchart-fill');
  barFills.forEach(bar => {
    bar.addEventListener('mouseenter', (e) => {
      const text = bar.getAttribute('data-tooltip');
      if (text) showToast(text);
    });
  });

  
  const segments = document.querySelectorAll('.donut-segment');
  const centerTextVal = document.querySelector('.dcenter-val');
  const centerTextLbl = document.querySelector('.dcenter-lbl');

  segments.forEach(seg => {
    seg.addEventListener('mouseenter', () => {
      const info = seg.getAttribute('data-segment');
      if (info && centerTextVal && centerTextLbl) {
        const parts = info.split(': ');
        centerTextVal.textContent = parts[1] || '100%';
        centerTextLbl.textContent = parts[0] || 'Finishes';
      }
    });

    seg.addEventListener('mouseleave', () => {
      if (centerTextVal && centerTextLbl) {
        centerTextVal.textContent = '100%';
        centerTextLbl.textContent = 'Procured';
      }
    });
  });
}

function initSearchFilter() {
  const searchInput = document.getElementById('dashboard-search-input');
  if (!searchInput) return;

  
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    
    const milestoneCards = document.querySelectorAll('.milestone-card');
    milestoneCards.forEach(card => {
      const title = card.querySelector('.mcard-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.mcard-desc')?.textContent.toLowerCase() || '';
      const match = !query || title.includes(query) || desc.includes(query);
      card.style.display = match ? '' : 'none';
    });

    
    const materialCards = document.querySelectorAll('.material-spec-card');
    materialCards.forEach(card => {
      const name = card.querySelector('.matspec-name')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.matspec-desc')?.textContent.toLowerCase() || '';
      const match = !query || name.includes(query) || desc.includes(query);
      card.style.display = match ? '' : 'none';
    });

    
    const permitCards = document.querySelectorAll('.permit-card');
    permitCards.forEach(card => {
      const title = card.querySelector('.pcard-title')?.textContent.toLowerCase() || '';
      const id = card.querySelector('.pcard-id')?.textContent.toLowerCase() || '';
      const match = !query || title.includes(query) || id.includes(query);
      card.style.display = match ? '' : 'none';
    });
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchInput.value.toLowerCase().trim();
      if (!query) return;

      if (query.includes('stone') || query.includes('travertine') || query.includes('mosaic') || query.includes('material') || query.includes('tile') || query.includes('acrylic')) {
        switchDashboardTab('materials');
      } else if (query.includes('milestone') || query.includes('stage') || query.includes('rebar') || query.includes('shotcrete') || query.includes('weir') || query.includes('pour') || query.includes('drone')) {
        switchDashboardTab('milestones');
      } else if (query.includes('permit') || query.includes('coastal') || query.includes('inspect') || query.includes('city') || query.includes('clearance')) {
        switchDashboardTab('permits');
      } else if (query.includes('escrow') || query.includes('pay') || query.includes('invoice') || query.includes('aia') || query.includes('audit')) {
        switchDashboardTab('escrow');
      } else if (query.includes('chat') || query.includes('msg') || query.includes('message') || query.includes('marcus') || query.includes('architect')) {
        switchDashboardTab('messages');
      } else if (query.includes('water') || query.includes('temp') || query.includes('telemetry') || query.includes('ph') || query.includes('salinity') || query.includes('pump')) {
        switchDashboardTab('telemetry');
      }
    }
  });
}

function initNotificationDropdown() {
  const bellBtn = document.getElementById('notif-bell-btn');
  const panel = document.getElementById('notif-panel');
  const profilePanel = document.getElementById('user-profile-panel');
  const profileBtn = document.getElementById('user-profile-pill');

  if (!bellBtn || !panel) return;

  bellBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = panel.classList.contains('show');
    if (!isOpen && profilePanel) {
      profilePanel.classList.remove('show');
      if (profileBtn) profileBtn.setAttribute('aria-expanded', 'false');
    }
    panel.classList.toggle('show', !isOpen);
    bellBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== bellBtn && !bellBtn.contains(e.target)) {
      panel.classList.remove('show');
      bellBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

function initProfileDropdown() {
  const profileBtn = document.getElementById('user-profile-pill');
  const profilePanel = document.getElementById('user-profile-panel');
  const notifPanel = document.getElementById('notif-panel');
  const bellBtn = document.getElementById('notif-bell-btn');

  if (!profileBtn || !profilePanel) return;

  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = profilePanel.classList.contains('show');
    if (!isOpen && notifPanel) {
      notifPanel.classList.remove('show');
      if (bellBtn) bellBtn.setAttribute('aria-expanded', 'false');
    }
    profilePanel.classList.toggle('show', !isOpen);
    profileBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!profilePanel.contains(e.target) && e.target !== profileBtn && !profileBtn.contains(e.target)) {
      profilePanel.classList.remove('show');
      profileBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

function markAllNotificationsRead() {
  const unreadItems = document.querySelectorAll('.notif-item.unread');
  unreadItems.forEach(item => item.classList.remove('unread'));
  const dot = document.getElementById('notif-badge-dot');
  if (dot) dot.style.display = 'none';
  showToast('All notifications marked as read.');
}

function handleSendMessage(e) {
  e.preventDefault();
  const input = document.getElementById('chat-input-field');
  const container = document.getElementById('chat-messages-container');

  if (!input || !container) return;
  const messageText = input.value.trim();
  if (!messageText) return;

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  
  const msgEl = document.createElement('div');
  msgEl.className = 'chat-msg msg-patron';
  msgEl.innerHTML = `
    <div class="cmsg-bubble">
      <div class="cmsg-header">
        <span class="cmsg-author">You (Alistair Vance)</span>
        <span class="cmsg-time">${timeString}</span>
      </div>
      <p>${escapeHtml(messageText)}</p>
    </div>
  `;
  container.appendChild(msgEl);
  input.value = '';
  container.scrollTop = container.scrollHeight;

  
  setTimeout(() => {
    const replies = [
      "Thank you Alistair. I have logged this with our site superintendent and will personally inspect it on tomorrow morning's survey.",
      "Understood, Alistair. I have updated our hydraulic modeling tolerances accordingly. Everything remains completely on schedule.",
      "Excellent. I will have physical finish mockups brought up to your Bel-Air terrace on our Friday walkthrough."
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    const replyEl = document.createElement('div');
    replyEl.className = 'chat-msg msg-architect';
    replyEl.innerHTML = `
      <img src="assets/team_marcus.jpg" alt="Marcus" class="cmsg-avatar">
      <div class="cmsg-bubble">
        <div class="cmsg-header">
          <span class="cmsg-author">Marcus Ellroy</span>
          <span class="cmsg-time">Just now</span>
        </div>
        <p>${randomReply}</p>
      </div>
    `;
    container.appendChild(replyEl);
    container.scrollTop = container.scrollHeight;
    showToast('New message from Marcus Ellroy (Principal Architect)');
  }, 1400);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function openVariationModal() {
  const modal = document.getElementById('variation-modal');
  if (modal) {
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
  }
}

function closeVariationModal() {
  const modal = document.getElementById('variation-modal');
  if (modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('modal-active');
    document.body.style.overflow = '';
  }
}

function handleVariationSubmit(e) {
  e.preventDefault();
  closeVariationModal();
  showToast('Scope Variation Order #VAR-2026-04 submitted to Marcus Ellroy for technical feasibility review.');
}

function openLightbox(src, caption) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');

  if (modal && img) {
    img.src = src;
    if (cap) cap.textContent = caption || 'High-Resolution Site Survey';
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightboxDirect() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('modal-active');
    document.body.style.overflow = '';
  }
}

function closeLightbox(e) {
  const modal = document.getElementById('lightbox-modal');
  if (e.target === modal) {
    closeLightboxDirect();
  }
}

function viewInvoice(id, amount, phase) {
  const modal = document.getElementById('invoice-modal');
  const idEl = document.getElementById('inv-modal-id');
  const amountEl = document.getElementById('inv-modal-amount');
  const phaseEl = document.getElementById('inv-modal-phase');

  if (modal) {
    if (idEl) idEl.textContent = id;
    if (amountEl) amountEl.textContent = amount;
    if (phaseEl) phaseEl.textContent = phase;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
  }
}

function closeInvoiceModal() {
  const modal = document.getElementById('invoice-modal');
  if (modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('modal-active');
    document.body.style.overflow = '';
  }
}

function downloadInvoicePdf() {
  closeInvoiceModal();
  showToast('Generating signed AIA G702 official escrow voucher PDF...');
  setTimeout(() => {
    showToast('Download complete: AIA_G702_Disbursement_Receipt.pdf');
  }, 1200);
}

function downloadAiaAudit() {
  showToast('Compiling complete AIA G702/G703 escrow balance audit & municipal stamps...');
  setTimeout(() => {
    showToast('Download complete: BelAir_Estate_AIA_Audit_Report.pdf');
  }, 1400);
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle-btn');
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
  const btn = document.getElementById('rtl-toggle-btn');
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

function initEscapeKey() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVariationModal();
      closeLightboxDirect();
      closeInvoiceModal();

      const sidebar = document.getElementById('dashboard-sidebar');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (sidebar && sidebar.classList.contains('sidebar-open')) {
        sidebar.classList.remove('sidebar-open');
        if (backdrop) backdrop.classList.remove('show');
        document.body.style.overflow = '';
      }

      const notifPanel = document.getElementById('notif-panel');
      if (notifPanel) notifPanel.classList.remove('show');

      const profilePanel = document.getElementById('user-profile-panel');
      const profileBtn = document.getElementById('user-profile-pill');
      if (profilePanel) {
        profilePanel.classList.remove('show');
        if (profileBtn) profileBtn.setAttribute('aria-expanded', 'false');
      }
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
    setTimeout(() => toast.remove(), 400);
  }, 4200);
}

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initTabNavigation();
  initChartInteractions();
  initSearchFilter();
  initNotificationDropdown();
  initProfileDropdown();
  initThemeToggle();
  initRtlToggle();
  initEscapeKey();
});

window.switchDashboardTab = switchDashboardTab;
window.openVariationModal = openVariationModal;
window.closeVariationModal = closeVariationModal;
window.handleVariationSubmit = handleVariationSubmit;
window.openLightbox = openLightbox;
window.closeLightboxDirect = closeLightboxDirect;
window.closeLightbox = closeLightbox;
window.viewInvoice = viewInvoice;
window.closeInvoiceModal = closeInvoiceModal;
window.downloadInvoicePdf = downloadInvoicePdf;
window.downloadAiaAudit = downloadAiaAudit;
window.handleSendMessage = handleSendMessage;
window.markAllNotificationsRead = markAllNotificationsRead;
window.showToast = showToast;
