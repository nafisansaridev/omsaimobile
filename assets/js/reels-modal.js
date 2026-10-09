/**
 * OM SAI MOBILE - Reels Lightbox Video Player Modal
 * Provides vertical 9:16 interactive playback experience with sound toggle, progress animation, and WhatsApp action
 */

const reelData = {
  'reel-1': {
    title: 'Amit unboxing iPhone 15 Pro',
    customer: 'Amit Patel',
    phone: 'Apple iPhone 15 Pro 256GB',
    price: '₹1,34,999',
    type: 'purchase',
    date: '2 Days Ago',
    image: 'assets/images/reel-thumb-1.jpg',
    category: 'unboxings',
    desc: 'Amit came from Naroda specifically for our verified box-pack rate with official GST invoice. Spot data transfer done in 15 mins!'
  },
  'reel-2': {
    title: 'Sneha unboxing OnePlus 12R',
    customer: 'Sneha Shah',
    phone: 'OnePlus 12R 5G 16GB RAM',
    price: '₹39,999',
    type: 'purchase',
    date: '3 Days Ago',
    image: 'assets/images/reel-thumb-2.jpg',
    category: 'unboxings',
    desc: 'Festive offer unboxing with complimentary tempered glass and 100W SuperVOOC rapid setup. Congratulations Sneha!'
  },
  'reel-3': {
    title: 'Same-Day Display Fix Demo',
    customer: 'Live Service Bench',
    phone: 'Samsung S22 Ultra AMOLED Replacement',
    price: '₹6,499',
    type: 'repair',
    date: 'Yesterday',
    image: 'assets/images/reel-thumb-3.jpg',
    category: 'repairs',
    desc: 'Cracked curved display repaired in 35 minutes live on our anti-static bench. 100% touch sensitivity & 90-day warranty passed.'
  },
  'reel-4': {
    title: 'Priya Handover with 1-Year Store Warranty',
    customer: 'Priya Trivedi',
    phone: 'Vivo V30 Pro ZEISS Edition',
    price: '₹41,999',
    type: 'purchase',
    date: '4 Days Ago',
    image: 'assets/images/reel-thumb-4.jpg',
    category: 'happy-customers',
    desc: 'Priya taking delivery with our OM SAI MOBILE stamped warranty card & branded gift bag. Genuine smartphones only!'
  },
  'reel-5': {
    title: 'Rajesh unboxing Samsung S24 Ultra',
    customer: 'Rajesh Verma',
    phone: 'Samsung Galaxy S24 Ultra 256GB',
    price: '₹1,19,999',
    type: 'purchase',
    date: '5 Days Ago',
    image: 'assets/images/reel-thumb-5.jpg',
    category: 'unboxings',
    desc: 'Rajesh upgrading with instant old phone exchange spot credit of ₹18,500. Zero wait time, live activation.'
  },
  'reel-6': {
    title: '20-Min Express Battery Swap',
    customer: 'Live Service Bench',
    phone: 'iPhone 13 OEM Battery Replacement',
    price: '₹1,899',
    type: 'repair',
    date: '1 Week Ago',
    image: 'assets/images/reel-thumb-6.jpg',
    category: 'repairs',
    desc: 'Swollen battery safely recycled and replaced with 100% health calibration and IP68 waterproof adhesive re-seal.'
  }
};

let activeReelInterval = null;
let isAudioMuted = true;
let isPlaying = true;
let reelProgress = 0;

function initReelsModal() {
  const modal = document.getElementById('reelPlayerModal');
  const closeBtn = document.getElementById('closeReelModal');
  const backdrop = document.getElementById('reelModalBackdrop');
  const reelCards = document.querySelectorAll('.reel-interactive-trigger');

  if (!modal) return;

  const modalImage = document.getElementById('modalReelImage');
  const modalCustomer = document.getElementById('modalReelCustomer');
  const modalTitle = document.getElementById('modalReelTitle');
  const modalDesc = document.getElementById('modalReelDesc');
  const modalPrice = document.getElementById('modalReelPrice');
  const modalActionBtn = document.getElementById('modalReelWhatsAppBtn');
  const modalSoundBtn = document.getElementById('modalReelSoundToggle');
  const soundIcon = document.getElementById('modalSoundIcon');
  const soundText = document.getElementById('modalSoundText');
  const progressBar = document.getElementById('modalReelProgressBar');
  const playPauseOverlay = document.getElementById('modalReelPlayPause');
  const pauseCenterIndicator = document.getElementById('modalPauseCenterIndicator');

  function openReel(reelId) {
    const data = reelData[reelId] || reelData['reel-1'];

    modalImage.src = data.image;
    modalCustomer.textContent = data.customer;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalPrice.textContent = data.price;

    const storeNumber = "919821593333";
    if (data.type === 'repair') {
      const msg = `Hello OM SAI MOBILE SHOP KALAMBOLI! I watched your reel "${data.title}" and would like to inquire about express repair for ${data.phone}.`;
      modalActionBtn.href = `https://wa.me/${storeNumber}?text=${encodeURIComponent(msg)}`;
      modalActionBtn.innerHTML = `
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.966.565 3.805 1.554 5.371L2 22l4.757-1.527a9.98 9.98 0 005.274 1.488h.005c5.534 0 10.029-4.495 10.029-10.03 0-2.678-1.043-5.197-2.937-7.091A9.972 9.972 0 0012.031 2z"/></svg>
        Book Express Repair on WhatsApp
      `;
    } else {
      const msg = `Hello OM SAI MOBILE SHOP KALAMBOLI! I watched your store reel for ${data.customer} with ${data.phone} (${data.price}). I want to order/inquire about this model.`;
      modalActionBtn.href = `https://wa.me/${storeNumber}?text=${encodeURIComponent(msg)}`;
      modalActionBtn.innerHTML = `
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.966.565 3.805 1.554 5.371L2 22l4.757-1.527a9.98 9.98 0 005.274 1.488h.005c5.534 0 10.029-4.495 10.029-10.03 0-2.678-1.043-5.197-2.937-7.091A9.972 9.972 0 0012.031 2z"/></svg>
        Order This Model on WhatsApp
      `;
    }

    // Reset player state
    reelProgress = 0;
    isPlaying = true;
    if (pauseCenterIndicator) pauseCenterIndicator.classList.add('hidden');
    startProgressLoop();

    modal.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
  }

  function startProgressLoop() {
    clearInterval(activeReelInterval);
    activeReelInterval = setInterval(() => {
      if (isPlaying) {
        reelProgress += 1;
        if (reelProgress > 100) reelProgress = 0;
        if (progressBar) progressBar.style.width = `${reelProgress}%`;
      }
    }, 100);
  }

  function closeReel() {
    clearInterval(activeReelInterval);
    modal.classList.remove('modal-active');
    document.body.style.overflow = '';
  }

  // Bind clicks to all reel cards
  reelCards.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Don't trigger modal if user clicked the nested WhatsApp micro-action directly
      if (e.target.closest('.reel-direct-wa-btn')) return;
      const reelId = trigger.dataset.reelId;
      openReel(reelId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeReel);
  if (backdrop) backdrop.addEventListener('click', closeReel);

  // Keyboard escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal-active')) {
      closeReel();
    }
  });

  // Sound toggle
  if (modalSoundBtn) {
    modalSoundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isAudioMuted = !isAudioMuted;
      if (isAudioMuted) {
        soundText.textContent = 'Muted';
        soundIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />`;
        if (window.showToast) window.showToast('Audio muted');
      } else {
        soundText.textContent = 'Sound ON';
        soundIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />`;
        if (window.showToast) window.showToast('Audio simulated ON (ambient store sound)');
      }
    });
  }

  // Play/pause click on video container
  if (playPauseOverlay) {
    playPauseOverlay.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (pauseCenterIndicator) {
        if (isPlaying) {
          pauseCenterIndicator.classList.add('hidden');
        } else {
          pauseCenterIndicator.classList.remove('hidden');
        }
      }
    });
  }
}

// Category filter tabs on reels.html page
function initReelsFilter() {
  const filterTabs = document.querySelectorAll('.reels-filter-tab');
  const reelItems = document.querySelectorAll('.reels-page-item');

  if (filterTabs.length === 0) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.className = 'reels-filter-tab px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-sm transition-all';
      });
      tab.className = 'reels-filter-tab px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 transition-all';

      const category = tab.dataset.category || 'all';

      reelItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initReelsModal();
  initReelsFilter();
});
