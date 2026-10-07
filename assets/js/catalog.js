/**
 * OM SAI MOBILE - Product Catalog Logic
 * Supports real-time search, category filtering, price sorting, and dynamic WhatsApp order triggers
 */

const products = [
  {
    id: 'prod-1',
    name: 'Apple iPhone 15 Pro Max',
    brand: 'Apple',
    category: '5g',
    tags: ['all', '5g', 'flagship'],
    variant: '256GB Natural Titanium',
    price: 134999,
    mrp: 144900,
    specs: '256GB • Natural Titanium • A17 Pro Chip • 48MP Triple Cam',
    stockStatus: 'in-stock',
    stockText: 'In Stock at Store',
    badge: 'Best Seller',
    image: 'assets/images/phone-iphone15pro.jpg'
  },
  {
    id: 'prod-2',
    name: 'Samsung Galaxy S24 Ultra 5G',
    brand: 'Samsung',
    category: '5g',
    tags: ['all', '5g', 'flagship'],
    variant: '12GB / 256GB Titanium Gray',
    price: 119999,
    mrp: 129999,
    specs: '12GB RAM / 256GB • Galaxy AI • 200MP Camera • S-Pen Included',
    stockStatus: 'in-stock',
    stockText: 'In Stock at Store',
    badge: 'Store Choice',
    image: 'assets/images/phone-samsungs24.jpg'
  },
  {
    id: 'prod-3',
    name: 'OnePlus 12R 5G',
    brand: 'OnePlus',
    category: '5g',
    tags: ['all', '5g', 'budget'],
    variant: '16GB RAM / 256GB Cool Blue',
    price: 39999,
    mrp: 42999,
    specs: '16GB / 256GB • Snapdragon 8 Gen 2 • 100W SuperVOOC • 5500mAh',
    stockStatus: 'in-stock',
    stockText: 'In Stock at Store',
    badge: 'Hot Deal',
    image: 'assets/images/phone-oneplus12r.jpg'
  },
  {
    id: 'prod-4',
    name: 'Nimbus ANC Wireless Pro Earbuds',
    brand: 'Nimbus',
    category: 'audio',
    tags: ['all', 'audio'],
    variant: 'Midnight Black & Silver Trim',
    price: 2499,
    mrp: 4999,
    specs: '40h Total Playtime • 45dB Active Noise Cancellation • IPX5 Splashproof',
    stockStatus: 'in-stock',
    stockText: 'In Stock at Store',
    badge: '50% OFF',
    image: 'assets/images/gadget-earbuds.jpg'
  },
  {
    id: 'prod-5',
    name: '65W GaN Dual-Port Fast Charger + Cable',
    brand: 'PowerPro',
    category: 'chargers',
    tags: ['all', 'chargers'],
    variant: 'Dual USB-C & USB-A with 100W Braided Cable',
    price: 1499,
    mrp: 2499,
    specs: 'GaN III Semiconductor • Type-C PD 3.0 • iPhone & Android Support',
    stockStatus: 'in-stock',
    stockText: 'In Stock at Store',
    badge: 'Essential',
    image: 'assets/images/gadget-fastcharger.jpg'
  },
  {
    id: 'prod-6',
    name: 'Redmi Note 13 Pro+ 5G',
    brand: 'Xiaomi',
    category: 'budget',
    tags: ['all', '5g', 'budget'],
    variant: '12GB / 256GB Fusion Purple',
    price: 28999,
    mrp: 33999,
    specs: '1.5K Curved AMOLED • 200MP OIS Camera • 120W HyperCharge In-Box',
    stockStatus: 'in-stock',
    stockText: 'In Stock at Store',
    badge: 'Popular',
    image: 'assets/images/phone-oneplus12r.jpg'
  },
  {
    id: 'prod-7',
    name: 'Vivo V30 Pro 5G (ZEISS Edition)',
    brand: 'Vivo',
    category: '5g',
    tags: ['all', '5g', 'flagship'],
    variant: '12GB / 512GB Andaman Blue',
    price: 41999,
    mrp: 46999,
    specs: '50MP ZEISS Triple Camera • Studio Aura Light • Ultra Slim 3D Curved',
    stockStatus: 'fast-order',
    stockText: 'Fast Order (24h)',
    badge: 'Portrait Champ',
    image: 'assets/images/phone-samsungs24.jpg'
  },
  {
    id: 'prod-8',
    name: 'Realme 12 Pro+ 5G Submarine Blue',
    brand: 'Realme',
    category: 'budget',
    tags: ['all', '5g', 'budget'],
    variant: '8GB / 256GB Submarine Blue',
    price: 29999,
    mrp: 34999,
    specs: '64MP Periscope Telephoto (3X Optical) • Luxury Watch Fluted Bezel',
    stockStatus: 'in-stock',
    stockText: 'In Stock at Store',
    badge: 'Spot Offer',
    image: 'assets/images/phone-iphone15pro.jpg'
  },
  {
    id: 'prod-9',
    name: 'ArmorShield Military MagSafe Case & 9H Glass',
    brand: 'ArmorShield',
    category: 'chargers',
    tags: ['all', 'chargers'],
    variant: 'Anti-Yellowing Clear + 9H Glass Combo',
    price: 799,
    mrp: 1499,
    specs: '12ft Drop Protection • N52 Neodymium Magnets • Scratch Resistant',
    stockStatus: 'in-stock',
    stockText: 'In Stock at Store',
    badge: 'Combo Save',
    image: 'assets/images/gadget-fastcharger.jpg'
  }
];

function formatPriceINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function renderProductCard(p) {
  const discountPercent = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  const waUrl = window.generateWhatsAppOrderLink ? 
    window.generateWhatsAppOrderLink(p.name, p.variant, formatPriceINR(p.price)) : 
    `https://wa.me/919821593333?text=Hi%20OM%20SAI%20MOBILE%20SHOP%20KALAMBOLI,%20I%20want%20to%20buy%20${encodeURIComponent(p.name)}%20at%20${encodeURIComponent(formatPriceINR(p.price))}`;

  const stockBadgeClass = p.stockStatus === 'in-stock' 
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
    : 'bg-amber-50 text-amber-700 border-amber-200';

  const stockDot = p.stockStatus === 'in-stock'
    ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>'
    : '<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>';

  return `
    <div class="product-item-card bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
      <!-- Thumbnail Header -->
      <div class="relative bg-slate-50 p-6 flex items-center justify-center overflow-hidden h-64">
        <!-- Stock status chip -->
        <div class="absolute top-3 left-3 z-10">
          <span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${stockBadgeClass}">
            ${stockDot}
            ${p.stockText}
          </span>
        </div>

        <!-- Highlight Badge -->
        <div class="absolute top-3 right-3 z-10">
          <span class="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900 text-white">
            ${p.badge}
          </span>
        </div>

        <!-- Product Image -->
        <img 
          src="${p.image}" 
          alt="${p.name} at OM SAI MOBILE" 
          class="max-h-52 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <!-- Content Body -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <!-- Brand & Name -->
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-600">${p.brand}</span>
            <span class="text-xs text-slate-400">Store Warranty</span>
          </div>
          <h3 class="font-bold text-slate-900 text-base md:text-lg group-hover:text-emerald-700 transition-colors line-clamp-1">
            ${p.name}
          </h3>

          <!-- Specs snippet -->
          <p class="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
            ${p.specs}
          </p>
        </div>

        <!-- Pricing & CTA -->
        <div class="mt-4 pt-3 border-t border-slate-100">
          <div class="flex items-baseline justify-between mb-3">
            <div>
              <span class="text-xl font-black text-slate-900">${formatPriceINR(p.price)}</span>
              <span class="text-xs text-slate-400 line-through ml-1.5">${formatPriceINR(p.mrp)}</span>
            </div>
            <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              ${discountPercent}% OFF
            </span>
          </div>

          <a 
            href="${waUrl}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow transition-all duration-200"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.966.565 3.805 1.554 5.371L2 22l4.757-1.527a9.98 9.98 0 005.274 1.488h.005c5.534 0 10.029-4.495 10.029-10.03 0-2.678-1.043-5.197-2.937-7.091A9.972 9.972 0 0012.031 2zm5.82 14.156c-.244.686-1.42 1.309-1.954 1.393-.497.078-1.129.111-3.268-.772-2.736-1.13-4.502-3.896-4.639-4.078-.137-.182-1.107-1.474-1.107-2.81 0-1.336.7-1.993.95-2.261.244-.268.533-.335.711-.335.178 0 .356.002.511.01.168.009.39-.064.61.465.228.55.778 1.897.845 2.034.067.137.111.298.022.477-.089.179-.133.29-.267.445-.133.155-.281.347-.4.466-.134.133-.274.278-.119.544.156.267.694 1.144 1.489 1.85 1.025.912 1.888 1.196 2.155 1.33.267.133.422.111.578-.067.155-.178.667-.777.845-1.044.178-.267.356-.222.6-.133.245.089 1.556.734 1.823.867.267.134.444.2.511.312.067.112.067.644-.177 1.33z"/>
            </svg>
            Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;
}

// Initialize Catalog Page
function initCatalogPage() {
  const catalogGrid = document.getElementById('catalogProductGrid');
  const searchInput = document.getElementById('catalogSearchInput');
  const sortSelect = document.getElementById('catalogSortSelect');
  const filterPills = document.querySelectorAll('.catalog-filter-pill');
  const emptyState = document.getElementById('catalogEmptyState');
  const countDisplay = document.getElementById('productCountDisplay');

  if (!catalogGrid) return;

  let currentCategory = 'all';
  let currentSearch = '';
  let currentSort = 'featured';

  function applyFiltersAndRender() {
    let filtered = products.filter(p => {
      // Category filter
      const matchesCategory = currentCategory === 'all' || p.tags.includes(currentCategory);
      // Search filter
      const searchTerms = currentSearch.toLowerCase().trim();
      const matchesSearch = !searchTerms || 
        p.name.toLowerCase().includes(searchTerms) ||
        p.brand.toLowerCase().includes(searchTerms) ||
        p.specs.toLowerCase().includes(searchTerms);

      return matchesCategory && matchesSearch;
    });

    // Sorting
    if (currentSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} products`;
    }

    if (filtered.length === 0) {
      catalogGrid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      catalogGrid.innerHTML = filtered.map(renderProductCard).join('');
    }
  }

  // Filter pills click
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.className = 'catalog-filter-pill px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors shrink-0';
      });
      pill.className = 'catalog-filter-pill px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 transition-all shrink-0';

      currentCategory = pill.dataset.category || 'all';
      applyFiltersAndRender();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Sort select
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Initial render
  applyFiltersAndRender();
}

// Featured Products Section on Home Page
function initFeaturedProducts() {
  const featuredGrid = document.getElementById('featuredDealsGrid');
  const homeCategoryPills = document.querySelectorAll('.home-cat-filter-pill');
  if (!featuredGrid) return;

  function renderFeatured(category = 'all') {
    let filtered = products.filter(p => category === 'all' || p.tags.includes(category)).slice(0, 4);
    featuredGrid.innerHTML = filtered.map(renderProductCard).join('');
  }

  homeCategoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      homeCategoryPills.forEach(p => {
        p.className = 'home-cat-filter-pill px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors shrink-0';
      });
      pill.className = 'home-cat-filter-pill px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 transition-all shrink-0';

      const cat = pill.dataset.category || 'all';
      renderFeatured(cat);
    });
  });

  renderFeatured('all');
}

document.addEventListener('DOMContentLoaded', () => {
  initCatalogPage();
  initFeaturedProducts();
});
