/**
 * OM SAI MOBILE - Reels Lightbox Video Player Modal
 * Real playable Instagram video player with seamless embed iframes, 
 * instant thumbnail fallback, direct Instagram app links, and customized WhatsApp actions.
 */

const reelData = {
  'reel-1': {
    title: 'Amit unboxing VIVO V80',
    customer: 'Amit',
    phone: 'VIVO V80 5G Flagship',
    price: '₹79,999',
    type: 'purchase',
    date: 'Latest Delivery',
    image: 'assets/images/reel-thumb-1.jpg',
    category: 'unboxings',
    instagramUrl: 'https://www.instagram.com/reel/DeCIartPwJY/',
    embedUrl: 'https://www.instagram.com/reel/DeCIartPwJY/embed/',
    desc: 'Amit unboxing the brand new VIVO V80 with authentic GST invoice, manufacturer warranty & complimentary premium setup at OM SAI MOBILE KALAMBOLI.'
  },
  'reel-2': {
    title: 'Ganesh unboxing iPhone 18 Pro',
    customer: 'Ganesh',
    phone: 'Apple iPhone 18 Pro',
    price: '₹1,64,999',
    type: 'purchase',
    date: 'Store Spotlight',
    image: 'assets/images/reel-thumb-2.jpg',
    category: 'unboxings',
    instagramUrl: 'https://www.instagram.com/reel/DeWqs7JPivr/',
    embedUrl: 'https://www.instagram.com/reel/DeWqs7JPivr/embed/',
    desc: 'Ganesh unboxing the ultra-flagship iPhone 18 Pro live in OM SAI MOBILE store with authentic seal verification, tempered glass application & festive gift pack.'
  },
  'reel-3': {
    title: 'An Old Phone Shines Like New',
    customer: 'OM SAI Repair Lab',
    phone: 'Express Phone Restoration & Deep Polish',
    price: '₹499 Onwards',
    type: 'repair',
    date: 'Service Bench',
    image: 'assets/images/reel-thumb-3.jpg',
    category: 'repairs',
    instagramUrl: 'https://www.instagram.com/reel/DfBgg9Gig0S/',
    embedUrl: 'https://www.instagram.com/reel/DfBgg9Gig0S/embed/',
    desc: 'Watch an old, worn phone get restored like brand new with expert deep cleaning, precision polish, and screen revival right here at Om Sai Mobile!'
  },
  'reel-4': {
    title: 'Raju bhai unboxing Infinix Note 60 Pro',
    customer: 'Raju Bhai',
    phone: 'Infinix Note 60 Pro 5G',
    price: '₹40,999',
    type: 'purchase',
    date: 'In-Store Handover',
    image: 'assets/images/reel-thumb-4.jpg',
    category: 'happy-customers',
    instagramUrl: 'https://www.instagram.com/reel/De633blO15r/',
    embedUrl: 'https://www.instagram.com/reel/De633blO15r/embed/',
    desc: 'Raju bhai taking delivery of the Infinix Note 60 Pro 5G box pack with zero waiting time, official store warranty stamped, and complimentary accessories.'
  }
};

let activeReelInterval = null;
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
  const modalInstagramBtn = document.getElementById('modalWatchOnInstagramBtn');
  const progressBar = document.getElementById('modalReelProgressBar');
  const iframeContainer = document.getElementById('modalReelIframeContainer');

  function openReel(reelId) {
    const data = reelData[reelId] || reelData['reel-1'];

    // Update text details
    if (modalCustomer) modalCustomer.textContent = data.customer;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalPrice) modalPrice.textContent = data.price;
    if (modalImage) modalImage.src = data.image;

    // Direct Instagram link
    if (modalInstagramBtn) {
      modalInstagramBtn.href = data.instagramUrl;
    }

    // Configure WhatsApp inquiry CTA
    const storeNumber = "919821593333";
    if (modalActionBtn) {
      if (data.type === 'repair') {
        const msg = `Hello OM SAI MOBILE SHOP KALAMBOLI! I watched your reel "${data.title}" and would like to inquire about express repair / polish for ${data.phone}.`;
        modalActionBtn.href = `https://wa.me/${storeNumber}?text=${encodeURIComponent(msg)}`;
        modalActionBtn.innerHTML = `
          <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.966.565 3.805 1.554 5.371L2 22l4.757-1.527a9.98 9.98 0 005.274 1.488h.005c5.534 0 10.029-4.495 10.029-10.03 0-2.678-1.043-5.197-2.937-7.091A9.972 9.972 0 0012.031 2z"/></svg>
          <span>Book Repair & Polish on WhatsApp</span>
        `;
      } else {
        const msg = `Hello OM SAI MOBILE SHOP KALAMBOLI! I watched your reel of ${data.customer} unboxing ${data.phone} (${data.price}). I want to order/inquire about this phone.`;
        modalActionBtn.href = `https://wa.me/${storeNumber}?text=${encodeURIComponent(msg)}`;
        modalActionBtn.innerHTML = `
          <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.966.565 3.805 1.554 5.371L2 22l4.757-1.527a9.98 9.98 0 005.274 1.488h.005c5.534 0 10.029-4.495 10.029-10.03 0-2.678-1.043-5.197-2.937-7.091A9.972 9.972 0 0012.031 2z"/></svg>
          <span>Order This Model on WhatsApp</span>
        `;
      }
    }

    // Mount playable Instagram embed iframe
    if (iframeContainer) {
      iframeContainer.innerHTML = `
        <iframe 
          id="activeReelIframe" 
          src="${data.embedUrl}" 
          class="w-full h-full border-0 rounded-2xl bg-black" 
          frameborder="0" 
          scrolling="no" 
          allowtransparency="true" 
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      `;
    }

    // Progress bar loop
    reelProgress = 0;
    clearInterval(activeReelInterval);
    activeReelInterval = setInterval(() => {
      reelProgress += 0.8;
      if (reelProgress > 100) reelProgress = 0;
      if (progressBar) progressBar.style.width = `${reelProgress}%`;
    }, 100);

    modal.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
  }

  function closeReel() {
    clearInterval(activeReelInterval);
    // Unmount iframe to immediately stop video & audio
    if (iframeContainer) {
      iframeContainer.innerHTML = '';
    }
    modal.classList.remove('modal-active');
    document.body.style.overflow = '';
  }

  // Bind clicks to all reel cards
  reelCards.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
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
