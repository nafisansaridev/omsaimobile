/**
 * OM SAI MOBILE - Interactive Repair Estimator Logic
 * Calculates dynamic repair cost ranges, turnaround time, warranty terms, and WhatsApp pre-filled booking
 */

const repairData = {
  brands: {
    apple: {
      name: 'Apple iPhone',
      baseMultiplier: 2.2,
      typicalModels: 'iPhone 11 to 15 Pro Max'
    },
    samsung: {
      name: 'Samsung Galaxy',
      baseMultiplier: 1.8,
      typicalModels: 'S21-S24, A & M Series'
    },
    oneplus: {
      name: 'OnePlus',
      baseMultiplier: 1.5,
      typicalModels: 'OnePlus 9/10/11/12R & Nord'
    },
    xiaomi: {
      name: 'Xiaomi / Redmi',
      baseMultiplier: 1.1,
      typicalModels: 'Redmi Note 10-13, Poco'
    },
    vivo: {
      name: 'Vivo / iQOO',
      baseMultiplier: 1.2,
      typicalModels: 'V Series, Y Series, Neo'
    },
    realme: {
      name: 'Realme / Narzo',
      baseMultiplier: 1.1,
      typicalModels: '10-12 Pro+, GT Series'
    }
  },
  issues: {
    screen: {
      name: 'Cracked Screen / Display Assembly',
      icon: '📱',
      baseLow: 1499,
      baseHigh: 2899,
      time: '30 – 45 Minutes',
      warranty: '90 Days Store Guarantee',
      desc: 'Original grade FHD+ / AMOLED glass & touch digitizer replacement with 0% touch lag.'
    },
    battery: {
      name: 'Battery Drain / Swelling Replacement',
      icon: '🔋',
      baseLow: 999,
      baseHigh: 1799,
      time: '20 – 30 Minutes',
      warranty: '180 Days Battery Warranty',
      desc: 'High-density OEM battery with 100% capacity calibration and overheating prevention.'
    },
    charging: {
      name: 'Charging Port & Mic Flex Fix',
      icon: '⚡',
      baseLow: 699,
      baseHigh: 1299,
      time: '25 – 35 Minutes',
      warranty: '90 Days Store Guarantee',
      desc: 'Precision micro-soldering or genuine Type-C / Lightning connector sub-board replacement.'
    },
    water: {
      name: 'Water Damage Ultrasonic Diagnosis',
      icon: '💧',
      baseLow: 899,
      baseHigh: 1999,
      time: '45 – 60 Minutes',
      warranty: '60 Days Store Guarantee',
      desc: 'Complete ultrasonic circuit wash, motherboard corrosion removal, and IC level recovery.'
    },
    camera: {
      name: 'Camera Lens & Sensor Blur Repair',
      icon: '📷',
      baseLow: 1199,
      baseHigh: 2499,
      time: '30 – 40 Minutes',
      warranty: '90 Days Store Guarantee',
      desc: 'Sapphire glass outer lens replacement or OEM OIS camera module realignment.'
    },
    speaker: {
      name: 'Ear Speaker & Ringer Replacement',
      icon: '🔊',
      baseLow: 599,
      baseHigh: 1199,
      time: '20 – 30 Minutes',
      warranty: '90 Days Store Guarantee',
      desc: 'Crisp audio restoration for muffled calls, distorted loudspeaker, or ear speaker issues.'
    }
  }
};

function initRepairCalculator() {
  const brandButtons = document.querySelectorAll('.brand-selector-btn');
  const issueButtons = document.querySelectorAll('.issue-selector-btn');
  const priceDisplay = document.getElementById('calcEstimatedPrice');
  const timeDisplay = document.getElementById('calcTurnaroundTime');
  const warrantyDisplay = document.getElementById('calcWarranty');
  const issueDescDisplay = document.getElementById('calcIssueDesc');
  const selectedBrandName = document.getElementById('calcSelectedBrand');
  const selectedIssueName = document.getElementById('calcSelectedIssue');
  const bookBtn = document.getElementById('calcBookWhatsAppBtn');

  if (!priceDisplay) return;

  let currentBrandKey = 'apple';
  let currentIssueKey = 'screen';

  function updateEstimate() {
    const brand = repairData.brands[currentBrandKey] || repairData.brands.apple;
    const issue = repairData.issues[currentIssueKey] || repairData.issues.screen;

    // Calculate dynamic range based on brand multiplier
    const low = Math.round((issue.baseLow * brand.baseMultiplier) / 50) * 50 - 1; // e.g. ₹1,499
    const high = Math.round((issue.baseHigh * brand.baseMultiplier) / 50) * 50 - 1;

    const formattedRange = `₹${low.toLocaleString('en-IN')} – ₹${high.toLocaleString('en-IN')}`;

    // Update UI with smooth text fade
    priceDisplay.style.opacity = '0';
    setTimeout(() => {
      priceDisplay.textContent = formattedRange;
      priceDisplay.style.opacity = '1';
    }, 150);

    if (timeDisplay) timeDisplay.textContent = issue.time;
    if (warrantyDisplay) warrantyDisplay.textContent = issue.warranty;
    if (issueDescDisplay) issueDescDisplay.textContent = issue.desc;
    if (selectedBrandName) selectedBrandName.textContent = brand.name;
    if (selectedIssueName) selectedIssueName.textContent = issue.name;

    // WhatsApp dynamic booking URL
    const storeNumber = "919821593333";
    const rawMessage = `Hello OM SAI MOBILE SHOP KALAMBOLI! I would like to book an Express In-Store Repair slot:\n\n📱 *Device Brand:* ${brand.name} (${brand.typicalModels})\n🔧 *Issue:* ${issue.name}\n💰 *Estimated Quote:* ${formattedRange}\n⏱️ *Turnaround:* ${issue.time}\n🛡️ *Warranty:* ${issue.warranty}\n\nPlease confirm technician availability at your Kalamboli shop and reserve my slot.`;

    if (bookBtn) {
      bookBtn.href = `https://wa.me/${storeNumber}?text=${encodeURIComponent(rawMessage)}`;
    }
  }

  // Brand click listener
  brandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      brandButtons.forEach(b => {
        b.classList.remove('active', 'border-emerald-500', 'bg-emerald-50/70', 'text-emerald-900');
        b.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
      });
      btn.classList.add('active', 'border-emerald-500', 'bg-emerald-50/70', 'text-emerald-900');
      btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');

      currentBrandKey = btn.dataset.brand;
      updateEstimate();
    });
  });

  // Issue click listener
  issueButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      issueButtons.forEach(b => {
        b.classList.remove('active', 'border-emerald-500', 'bg-emerald-50/70', 'text-emerald-900');
        b.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
      });
      btn.classList.add('active', 'border-emerald-500', 'bg-emerald-50/70', 'text-emerald-900');
      btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');

      currentIssueKey = btn.dataset.issue;
      updateEstimate();
    });
  });

  // Initial Calculation
  updateEstimate();
}

document.addEventListener('DOMContentLoaded', initRepairCalculator);
