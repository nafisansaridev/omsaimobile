/**
 * OM SAI MOBILE - Main JavaScript
 * Handles navigation, live store hours, toast notifications, and global utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initLiveStoreStatus();
  initStickyHeader();
  initHeroPhoneMockup();
});

// Mobile Navigation Drawer
function initMobileNav() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileMenuClose');
  const drawer = document.getElementById('mobileMenuDrawer');
  const backdrop = document.getElementById('mobileMenuBackdrop');

  if (!menuBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    if (backdrop) {
      backdrop.classList.remove('hidden');
      setTimeout(() => backdrop.classList.add('opacity-50'), 10);
    }
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.add('translate-x-full');
    drawer.classList.remove('translate-x-0');
    if (backdrop) {
      backdrop.classList.remove('opacity-50');
      setTimeout(() => backdrop.classList.add('hidden'), 300);
    }
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
}

// Live Store Status Calculator (Open Daily: 9:00 AM - 10:00 PM)
function initLiveStoreStatus() {
  const statusElements = document.querySelectorAll('.live-store-status');
  if (statusElements.length === 0) return;

  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTimeInMinutes = hour * 60 + minute;

  let isOpen = false;
  const closeTimeString = '10:00 PM';
  const openTimeString = '9:00 AM';

  // Open 7 days a week: 9:00 AM (540 min) to 10:00 PM (1320 min)
  if (currentTimeInMinutes >= 9 * 60 && currentTimeInMinutes < 22 * 60) {
    isOpen = true;
  }

  statusElements.forEach(el => {
    const isGradientOrTicker = el.closest('.top-ticker-wrapper') !== null || el.closest('.bg-gradient-to-br') !== null || el.closest('.bg-slate-950') !== null;
    if (isOpen) {
      if (isGradientOrTicker) {
        el.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/40">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
          Open Now • Closes ${closeTimeString}
        </span>`;
      } else {
        el.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Open Now • Closes ${closeTimeString}
        </span>`;
      }
    } else {
      if (isGradientOrTicker) {
        el.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white/20 backdrop-blur-md text-rose-200 border border-white/40">
          <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
          Closed Now • Opens ${openTimeString}
        </span>`;
      } else {
        el.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
          <span class="w-2 h-2 rounded-full bg-rose-500"></span>
          Closed Now • Opens ${openTimeString}
        </span>`;
      }
    }
  });
}

// Sticky Header elevation on scroll
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-md', 'bg-white/88');
      header.classList.remove('bg-white/78');
    } else {
      header.classList.remove('shadow-md', 'bg-white/88');
      header.classList.add('bg-white/78');
    }
  });
}

// Interactive Hero Smartphone Mockup Live Clock & Status
function initHeroPhoneMockup() {
  const statusTimeEl = document.getElementById('phoneStatusTime');
  const clockEl = document.getElementById('phoneClock');
  const dateEl = document.getElementById('phoneDate');
  const storeBadgeEl = document.getElementById('phoneStoreBadge');

  if (!statusTimeEl && !clockEl) return;

  function updateTime() {
    const now = new Date();
    const hours24 = now.getHours();
    const minutes = now.getMinutes();
    const hours12 = hours24 % 12 || 12;
    const formattedHours = String(hours12).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const timeStr = `${formattedHours}:${formattedMinutes}`;

    if (statusTimeEl) statusTimeEl.textContent = timeStr;
    if (clockEl) clockEl.textContent = timeStr;

    if (dateEl) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      dateEl.textContent = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}`;
    }

    if (storeBadgeEl) {
      const currentMin = hours24 * 60 + minutes;
      const isOpen = currentMin >= 9 * 60 && currentMin < 22 * 60;
      if (isOpen) {
        storeBadgeEl.className = 'mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-300 shadow-sm';
        storeBadgeEl.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span><span>Open Now • Closes 10:00 PM</span>`;
      } else {
        storeBadgeEl.className = 'mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100/90 text-rose-800 border border-rose-200 shadow-sm';
        storeBadgeEl.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span><span>Closed • Opens 9:00 AM</span>`;
      }
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// Global Toast Notification Helper
function showToast(message, type = 'success') {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'fixed bottom-20 md:bottom-8 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl font-medium text-sm transition-all duration-300 transform translate-y-12 opacity-0 pointer-events-none';
    document.body.appendChild(toast);
  }

  if (type === 'success') {
    toast.className = 'fixed bottom-20 md:bottom-8 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl font-medium text-sm bg-slate-900 text-white border-l-4 border-emerald-500 transition-all duration-300 transform translate-y-0 opacity-100 pointer-events-auto';
    toast.innerHTML = `
      <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>${message}</span>
    `;
  } else {
    toast.className = 'fixed bottom-20 md:bottom-8 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl font-medium text-sm bg-slate-900 text-white border-l-4 border-rose-500 transition-all duration-300 transform translate-y-0 opacity-100 pointer-events-auto';
    toast.innerHTML = `
      <svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>${message}</span>
    `;
  }

  setTimeout(() => {
    toast.classList.add('translate-y-12', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 4000);
}

// Generate Dynamic WhatsApp URL helper
function generateWhatsAppOrderLink(productName, variant, price) {
  const storePhoneNumber = "919821593333";
  const rawMessage = `Hello OM SAI MOBILE SHOP! I am interested in purchasing:\n\n📱 *Product:* ${productName}\n⚙️ *Variant:* ${variant}\n💰 *Price:* ${price}\n\nPlease confirm store availability and pickup at your Kalamboli shop.`;
  return `https://wa.me/${storePhoneNumber}?text=${encodeURIComponent(rawMessage)}`;
}

window.showToast = showToast;
window.generateWhatsAppOrderLink = generateWhatsAppOrderLink;
