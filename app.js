// ==========================================================================
// FreshTrust – India's Most Transparent Meat Delivery Platform
// Core State Machine & Simulation Engine (`app.js`)
// Refinement Sprint V2
// ==========================================================================

let activeCart = [
  { id: 'prod-1', name: 'Artisanal Lamb Rib Chops (Curry Cut)', weight: '500g', price: 680, cut: 'Curry Cut (Medium Dice)', quantity: 1 },
  { id: 'prod-2', name: 'Country Chicken Curry Cut (Skinless)', weight: '500g', price: 360, cut: 'Standard Curry Cut', quantity: 1 }
];

let selectedProductObj = null;
let currentSelectedWeightObj = null;
let currentSelectedCutObj = null;
let currentSelectedQty = 1;
let appliedCouponObj = { code: 'FRESHTRUST50', discountType: 'FLAT', value: 150 };
let wishlistItems = new Set();
let elapsedTimerInterval = null;
let elapsedSeconds = 252; // 04:12 initial
let heroSlideIndex = 0;
let heroTimer = null;

// Initialize Application on Load
document.addEventListener('DOMContentLoaded', () => {
  initScreenViewport();
  initCustomerHome();
  initFullCategoriesGrid();
  renderCart();
  renderOrderHistory();
  renderAddresses();
  renderWallet();
  initLiveCamTimeline();
  startElapsedTimer();
  startRiderAnimation();
  renderShopDashboardTables();
  
  // Header scroll detection for background blur & shadow
  window.addEventListener('scroll', handleHeaderScroll);
  window.addEventListener('resize', initScreenViewport);
});

// Sticky Header Scroll Handler
function handleHeaderScroll() {
  const topbar = document.querySelector('.app-topbar');
  if (topbar) {
    if (window.scrollY > 20) {
      topbar.classList.add('scrolled');
    } else {
      topbar.classList.remove('scrolled');
    }
  }
}

// Auto detect screen width on load/resize
function initScreenViewport() {
  const deviceFrame = document.getElementById('device-frame');
  const viewBtns = document.querySelectorAll('.view-btn');
  if (!deviceFrame) return;
  
  // If user hasn't explicitly forced a device frame preview mode
  if (!deviceFrame.dataset.userForcedMode) {
    if (window.innerWidth >= 1024) {
      deviceFrame.className = 'viewport-frame mode-desktop';
      viewBtns.forEach(btn => btn.classList.remove('active'));
      if (viewBtns[2]) viewBtns[2].classList.add('active');
    } else if (window.innerWidth >= 768) {
      deviceFrame.className = 'viewport-frame mode-tablet';
      viewBtns.forEach(btn => btn.classList.remove('active'));
      if (viewBtns[1]) viewBtns[1].classList.add('active');
    } else {
      deviceFrame.className = 'viewport-frame mode-mobile';
      viewBtns.forEach(btn => btn.classList.remove('active'));
      if (viewBtns[0]) viewBtns[0].classList.add('active');
    }
  }
}

// ==========================================================================
// 1. Suite & Workspace Switcher Dropdown Engine
// ==========================================================================
function toggleWorkspaceMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('workspace-menu');
  if (menu) {
    menu.classList.toggle('open');
  }
}

// Close workspace dropdown on outside click
document.addEventListener('click', (e) => {
  const menu = document.getElementById('workspace-menu');
  const btn = document.querySelector('.workspace-trigger-btn');
  if (menu && menu.classList.contains('open') && !menu.contains(e.target) && !btn?.contains(e.target)) {
    menu.classList.remove('open');
  }
});

function switchSuite(suiteName, btnElem) {
  // Update suite buttons
  document.querySelectorAll('.suite-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.workspace-item').forEach(btn => btn.classList.remove('active'));
  if (btnElem) btnElem.classList.add('active');

  // Update suite views
  document.querySelectorAll('.suite-view').forEach(view => view.classList.remove('active'));
  const targetSuite = document.getElementById(`suite-${suiteName}`);
  if (targetSuite) targetSuite.classList.add('active');

  // Close workspace menu
  const menu = document.getElementById('workspace-menu');
  if (menu) menu.classList.remove('open');

  showToast(`Switched workspace to: ${suiteName.toUpperCase()}`);
}

function switchViewport(mode, btnElem) {
  document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElem) btnElem.classList.add('active');

  const deviceFrame = document.getElementById('device-frame');
  if (deviceFrame) {
    deviceFrame.dataset.userForcedMode = 'true';
    deviceFrame.className = `viewport-frame mode-${mode}`;
  }
}

// ==========================================================================
// 2. Customer App Navigation Engine
// ==========================================================================
function navigateToScreen(screenId, navItemElem) {
  document.querySelectorAll('#suite-customer .screen-content').forEach(sc => {
    sc.classList.remove('active');
  });

  const targetScreen = document.getElementById(screenId);
  if (targetScreen) targetScreen.classList.add('active');

  // Sync desktop top header nav links
  document.querySelectorAll('.desktop-nav-links .desktop-nav-link').forEach(link => link.classList.remove('active'));

  if (navItemElem) {
    navItemElem.classList.add('active');
  }

  // Auto-match header & navbar links
  const dLinks = document.querySelectorAll('.desktop-nav-links .desktop-nav-link');
  if (screenId === 'screen-home' && dLinks[0]) dLinks[0].classList.add('active');
  if (screenId === 'screen-categories' && dLinks[1]) dLinks[1].classList.add('active');
  if (screenId === 'screen-live-cam' && dLinks[2]) dLinks[2].classList.add('active');
  if (screenId === 'screen-membership' && dLinks[3]) dLinks[3].classList.add('active');
  if (screenId === 'screen-order-history' && dLinks[4]) dLinks[4].classList.add('active');
  if (screenId === 'screen-support' && dLinks[5]) dLinks[5].classList.add('active');

  // Scroll to top of screen
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // If navigating to cart, re-render calculation
  if (screenId === 'screen-cart') renderCart();
}

function showOnboardingSlide(slideNum) {
  document.querySelectorAll('.onboard-slide').forEach(slide => slide.style.display = 'none');
  const targetSlide = document.getElementById(`onboard-slide-${slideNum}`);
  if (targetSlide) targetSlide.style.display = 'block';
}

// ==========================================================================
// 3. Customer Home Rendering & Hero Carousel Engine
// ==========================================================================
function initCustomerHome() {
  const data = window.FRESHTRUST_DATA;
  if (!data) return;

  // Render Hero Carousel
  renderHeroCarousel();
  startHeroRotation();

  // Render Trust Bar
  renderTrustBar();

  // Render Category Cards Grid
  const catContainer = document.getElementById('home-categories-list');
  if (catContainer) {
    catContainer.innerHTML = data.categories.map((cat, idx) => `
      <div class="category-card" onclick="navigateToScreen('screen-categories')">
        <div class="category-icon">${cat.icon}</div>
        <div class="category-name">${cat.name}</div>
        <div class="category-count">${cat.count || 'Fresh'}</div>
      </div>
    `).join('');
  }

  // Render Live Streams Now Section
  renderLiveStreamsNow();

  // Render Verified Dark Stores
  const shopsContainer = document.getElementById('home-shops-list');
  if (shopsContainer) {
    shopsContainer.innerHTML = data.shops.map(shop => `
      <div style="background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px; display: flex; align-items: center; justify-content: space-between; box-shadow: var(--shadow-sm); cursor: pointer;" onclick="openShopProfile('${shop.id}')">
        <div style="display: flex; align-items: center; gap: 16px;">
          <img src="${shop.image}" style="width: 64px; height: 64px; border-radius: var(--radius-md); object-fit: cover;" />
          <div>
            <h5 style="font-size: 15px; font-weight: 800; color: var(--secondary); margin-bottom: 4px;">${shop.name}</h5>
            <p style="font-size: 12px; color: var(--text-secondary);">${shop.distance} • ${shop.deliveryTime} ETA • <b style="color:var(--accent);">${shop.coldChainStatus}</b></p>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">FSSAI: ${shop.fssai}</div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
          <span style="background: var(--accent-light); color: var(--accent); font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: var(--radius-full);">⭐ ${shop.rating} (${shop.reviewsCount})</span>
          <span style="font-size: 11px; color: var(--primary); font-weight: 700;">🎥 Live Stream Active</span>
        </div>
      </div>
    `).join('');
  }

  // Render Trending Products
  const productsGrid = document.getElementById('home-products-grid');
  if (productsGrid) {
    productsGrid.innerHTML = data.products.map(prod => `
      <div class="product-card" onclick="selectProduct('${prod.id}')">
        <div class="product-img-wrapper" style="background-image: url('${prod.image}');">
          <div class="freshness-score-badge">🛡️ ${prod.freshnessScore}% Fresh</div>
          <div class="delivery-eta-badge">⚡ ${prod.deliveryTime}</div>
        </div>
        <div class="product-body">
          <div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="background: rgba(220,38,38,0.1); color: var(--primary); font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 4px;">LIVE CUT</span>
              <span style="font-size: 11px; color: var(--text-muted);">⭐ ${prod.rating}</span>
            </div>
            <h4 class="product-title">${prod.name}</h4>
            <p class="product-sub">${prod.subtitle}</p>
          </div>
          <div class="product-footer-row">
            <div>
              <span style="font-size: 18px; font-weight: 900; color: var(--secondary);">₹${prod.price}</span>
              ${prod.originalPrice ? `<span style="font-size: 12px; color: var(--text-muted); text-decoration: line-through; margin-left: 6px;">₹${prod.originalPrice}</span>` : ''}
              <div style="font-size: 11px; color: var(--text-muted);">${prod.unit}</div>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn-secondary" style="padding: 6px 10px; font-size: 11px; color: var(--primary); border-color: var(--primary);" onclick="event.stopPropagation(); navigateToScreen('screen-live-cam')">🎥 Watch Live</button>
              <button class="btn-add" onclick="event.stopPropagation(); addToCart('${prod.id}', '${prod.unit}', 'Standard Cut', ${prod.price})">+ ADD</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Why FreshTrust & Testimonials
  renderWhyFreshTrust();
  renderTestimonials();
}

// Render 5 Hero Banners
function renderHeroCarousel() {
  const container = document.getElementById('home-hero-carousel');
  const banners = window.FRESHTRUST_DATA.heroBanners;
  if (!container || !banners) return;

  container.innerHTML = `
    ${banners.map((b, idx) => `
      <div class="hero-slide ${idx === heroSlideIndex ? 'active' : ''}" style="background-image: url('${b.image}');">
        <div class="hero-slide-overlay" style="background: ${b.bgGradient}; opacity: 0.88;"></div>
        <div class="hero-slide-content">
          <span class="hero-pill-tag">${b.tag}</span>
          <h2 class="hero-slide-title">${b.title}</h2>
          <p class="hero-slide-sub">${b.subtitle}</p>
          <div class="hero-cta-group">
            <button class="btn-primary" onclick="navigateToScreen('screen-live-cam')">${b.ctaPrimary}</button>
            <button class="btn-secondary" style="background: rgba(255,255,255,0.15); color: #fff; border-color: rgba(255,255,255,0.3);" onclick="navigateToScreen('screen-categories')">${b.ctaSecondary}</button>
          </div>
        </div>
      </div>
    `).join('')}
    
    <div class="hero-progress-bar">
      ${banners.map((_, idx) => `
        <div class="hero-dot-indicator ${idx === heroSlideIndex ? 'active' : ''}" onclick="setHeroSlide(${idx})">
          <div class="progress-fill"></div>
        </div>
      `).join('')}
    </div>
  `;
}

function startHeroRotation() {
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    const banners = window.FRESHTRUST_DATA.heroBanners;
    if (!banners) return;
    heroSlideIndex = (heroSlideIndex + 1) % banners.length;
    renderHeroCarousel();
  }, 5000);
}

function setHeroSlide(idx) {
  heroSlideIndex = idx;
  renderHeroCarousel();
  startHeroRotation();
}

// Render Trust Bar
function renderTrustBar() {
  const container = document.getElementById('trust-bar-section');
  const badges = window.FRESHTRUST_DATA.trustBadges;
  if (!container || !badges) return;

  container.innerHTML = `
    <div class="trust-bar-container">
      ${badges.map(b => `
        <div class="trust-item">
          <span class="trust-icon">${b.icon}</span>
          <div>
            <div class="trust-title">${b.title}</div>
            <div class="trust-desc">${b.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Render Live Streams Now Section
function renderLiveStreamsNow() {
  const container = document.getElementById('live-now-section');
  const streams = window.FRESHTRUST_DATA.liveStreamsNow;
  if (!container || !streams) return;

  container.innerHTML = `
    <div class="live-now-container">
      <div class="live-now-header">
        <div>
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
            <div class="live-badge-pulsing"><span class="live-dot"></span> LIVE BUTCHER CAM</div>
            <span style="font-size:12px; color:#94A3B8;">Real-Time Preparation Preview</span>
          </div>
          <h3 style="font-size:20px; font-weight:900; color:#fff;">Active Studio Stream Feeds</h3>
        </div>
        <button class="btn-secondary" style="background:rgba(255,255,255,0.1); color:#fff; border-color:rgba(255,255,255,0.2);" onclick="navigateToScreen('screen-live-cam')">Watch Fullstream →</button>
      </div>

      <div class="live-cards-scroller">
        ${streams.map(s => `
          <div class="live-stream-card" onclick="navigateToScreen('screen-live-cam')">
            <div class="live-card-thumb" style="background-image: url('${s.thumbnail}');">
              <div style="position:absolute; top:12px; left:12px; background:rgba(0,0,0,0.7); backdrop-filter:blur(6px); color:#fff; font-size:10px; font-weight:800; padding:4px 8px; border-radius:4px; display:flex; align-items:center; gap:6px;">
                <span class="live-dot"></span> ${s.fps}
              </div>
              <div style="position:absolute; bottom:12px; right:12px; background:rgba(0,0,0,0.7); color:#fff; font-size:11px; font-weight:700; padding:4px 8px; border-radius:4px;">
                👁️ ${s.viewersCount} watching
              </div>
            </div>
            <div class="live-card-body">
              <h5 style="font-size:14px; font-weight:800; color:#fff;">${s.currentCut}</h5>
              <p style="font-size:12px; color:#94A3B8; margin-top:2px;">${s.workerName} • ${s.shopName}</p>
              <div style="margin-top:10px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:11px; color:var(--primary); font-weight:800;">Order ${s.orderNumber}</span>
                <span style="font-size:11px; color:#10B981; font-weight:700;">Tap to Join Live →</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Render Why FreshTrust 6 Pillars
function renderWhyFreshTrust() {
  const container = document.getElementById('why-freshtrust-section');
  const pillars = window.FRESHTRUST_DATA.whyFreshTrust;
  if (!container || !pillars) return;

  container.innerHTML = `
    <div style="margin-bottom:20px;">
      <h3 style="font-size:22px; font-weight:900; color:var(--secondary);">Why FreshTrust?</h3>
      <p style="font-size:13px; color:var(--text-secondary);">India's first platform built on 100% video transparency and cold chain audit.</p>
    </div>
    <div class="why-grid">
      ${pillars.map(p => `
        <div class="why-card">
          <div style="font-size:32px; margin-bottom:12px;">${p.icon}</div>
          <h4 style="font-size:16px; font-weight:800; color:var(--secondary); margin-bottom:6px;">${p.title}</h4>
          <p style="font-size:13px; color:var(--text-secondary); line-height:1.5;">${p.desc}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// Render Testimonials
function renderTestimonials() {
  const container = document.getElementById('testimonials-section');
  const reviews = window.FRESHTRUST_DATA.testimonials;
  if (!container || !reviews) return;

  container.innerHTML = `
    <div style="margin-bottom:20px;">
      <h3 style="font-size:22px; font-weight:900; color:var(--secondary);">Trusted by 100,000+ Connoisseurs</h3>
      <p style="font-size:13px; color:var(--text-secondary);">See what culinary critics and home chefs say about Live Butcher Cam transparency.</p>
    </div>
    <div style="display:flex; gap:20px; overflow-x:auto; padding-bottom:12px;">
      ${reviews.map(r => `
        <div class="testimonial-card">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
            <img src="${r.avatar}" style="width:48px; height:48px; border-radius:var(--radius-full); object-fit:cover;" />
            <div>
              <h5 style="font-size:14px; font-weight:800; color:var(--secondary);">${r.name}</h5>
              <p style="font-size:11px; color:var(--text-secondary);">${r.role} • ${r.city}</p>
            </div>
          </div>
          <div style="color:var(--gold); font-size:13px; margin-bottom:8px;">⭐⭐⭐⭐⭐</div>
          <p style="font-size:13px; color:var(--text-secondary); line-height:1.5;">"${r.comment}"</p>
        </div>
      `).join('')}
    </div>
  `;
}

function initFullCategoriesGrid() {
  const fullGrid = document.getElementById('full-categories-grid');
  if (fullGrid && window.FRESHTRUST_DATA) {
    fullGrid.innerHTML = window.FRESHTRUST_DATA.products.map(prod => `
      <div class="product-card" onclick="selectProduct('${prod.id}')">
        <div class="product-img-wrapper" style="background-image: url('${prod.image}');">
          <div class="freshness-score-badge">🛡️ ${prod.freshnessScore}% Fresh</div>
          <div class="delivery-eta-badge">⚡ ${prod.deliveryTime}</div>
        </div>
        <div class="product-body">
          <div>
            <h4 class="product-title">${prod.name}</h4>
            <p class="product-sub">${prod.subtitle}</p>
          </div>
          <div class="product-footer-row">
            <div>
              <span style="font-size: 18px; font-weight: 900; color: var(--secondary);">₹${prod.price}</span>
              <div style="font-size: 11px; color: var(--text-muted);">${prod.unit}</div>
            </div>
            <button class="btn-add" onclick="event.stopPropagation(); addToCart('${prod.id}', '${prod.unit}', 'Standard Cut', ${prod.price})">+ ADD</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// Search Modal Handlers
function openSearchModal() {
  const modal = document.getElementById('search-dropdown-modal');
  if (modal) {
    modal.classList.add('open');
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-dropdown-modal');
  if (modal) {
    modal.classList.remove('open');
  }
}

function selectProduct(prodId) {
  const data = window.FRESHTRUST_DATA;
  if (!data) return;

  const prod = data.products.find(p => p.id === prodId) || data.products[0];
  selectedProductObj = prod;
  currentSelectedWeightObj = prod.availableWeights[0];
  currentSelectedCutObj = prod.availableCuts[0];
  currentSelectedQty = 1;

  const container = document.getElementById('product-detail-container');
  if (container) {
    container.innerHTML = `
      <div style="background: #fff; border-radius: var(--radius-xl); border: 1px solid var(--border); overflow: hidden; box-shadow: var(--shadow-lg); margin-bottom: 24px;">
        <div style="height: 320px; background-image: url('${prod.image}'); background-size: cover; background-position: center; position: relative;">
          <button class="icon-btn-circle" style="position: absolute; top: 16px; left: 16px; background: rgba(255,255,255,0.9);" onclick="navigateToScreen('screen-home')">←</button>
          <div class="freshness-score-badge" style="top: 16px; right: 16px; font-size: 13px;">🛡️ Freshness Score: ${prod.freshnessScore}/100</div>
        </div>
        <div style="padding: 28px;">
          <h2 style="font-size: 24px; font-weight: 900; color: var(--secondary); margin-bottom: 8px;">${prod.name}</h2>
          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 20px;">${prod.subtitle}</p>
          
          <div style="background: var(--card-bg); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border); margin-bottom: 24px;">
            <h4 style="font-size: 14px; font-weight: 800; margin-bottom: 10px;">Select Weight Portion:</h4>
            <div style="display: flex; gap: 10px;">
              ${prod.availableWeights.map((w, idx) => `
                <button class="btn-secondary ${idx === 0 ? 'active' : ''}" style="${idx === 0 ? 'background: var(--primary); color: #fff; border-color: var(--primary);' : ''}" onclick="selectWeightIndex(${idx})">${w.label} - ₹${w.price}</button>
              `).join('')}
            </div>
          </div>

          <div style="background: var(--card-bg); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border); margin-bottom: 24px;">
            <h4 style="font-size: 14px; font-weight: 800; margin-bottom: 10px;">Select Master Cut Style:</h4>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${prod.availableCuts.map((c, idx) => `
                <label style="background: #fff; border: 1px solid ${idx === 0 ? 'var(--primary)' : 'var(--border)'}; padding: 12px; border-radius: var(--radius-sm); cursor: pointer; display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <b style="font-size: 13px;">${c.name}</b>
                    <p style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">${c.desc}</p>
                  </div>
                  <input type="radio" name="cut-select" ${idx === 0 ? 'checked' : ''} />
                </label>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 24px;">
            <div>
              <span style="font-size: 24px; font-weight: 900; color: var(--secondary);" id="detail-price-text">₹${prod.price}</span>
              <span style="font-size: 12px; color: var(--text-muted);"> (Taxes Included)</span>
            </div>
            <button class="btn-primary" onclick="addToCart('${prod.id}', '${currentSelectedWeightObj.label}', '${currentSelectedCutObj.name}', ${currentSelectedWeightObj.price}); navigateToScreen('screen-cart');">
              🛒 Add & Proceed to Cart →
            </button>
          </div>
        </div>
      </div>
    `;
  }

  navigateToScreen('screen-product-detail');
}

function addToCart(id, weight, cut, price) {
  const prod = window.FRESHTRUST_DATA.products.find(p => p.id === id);
  const name = prod ? prod.name : 'Fresh Meat Cut';
  
  activeCart.push({ id, name, weight, cut, price, quantity: 1 });
  renderCart();
  showToast(`Added ${name} (${weight}) to Cart!`);
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const countPill = document.getElementById('header-desktop-cart-text');
  
  const total = activeCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const count = activeCart.length;

  if (countPill) countPill.innerText = `${count} Items | ₹${total}`;

  if (container) {
    if (activeCart.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          <div style="font-size: 48px; margin-bottom: 12px;">🛒</div>
          <h4>Your Cart is Empty</h4>
          <p style="font-size: 13px; margin-top: 4px;">Explore our 100% live-streamed fresh cut catalog.</p>
          <button class="btn-primary" style="margin-top: 16px;" onclick="navigateToScreen('screen-categories')">Browse Cuts →</button>
        </div>
      `;
    } else {
      container.innerHTML = activeCart.map((item, idx) => `
        <div style="background: #fff; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h5 style="font-size: 14px; font-weight: 800; color: var(--secondary);">${item.name}</h5>
            <p style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">Cut: ${item.cut} • Portion: ${item.weight}</p>
            <b style="font-size: 14px; color: var(--primary); margin-top: 6px; display: inline-block;">₹${item.price}</b>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button class="btn-secondary" style="padding: 4px 10px;" onclick="updateCartQty(${idx}, -1)">-</button>
            <b>${item.quantity}</b>
            <button class="btn-secondary" style="padding: 4px 10px;" onclick="updateCartQty(${idx}, 1)">+</button>
          </div>
        </div>
      `).join('');
    }
  }

  // Update Bill Totals
  const itemTotalElem = document.getElementById('cart-item-total');
  const grandTotalElem = document.getElementById('cart-grand-total');
  const btnCartTotalElem = document.getElementById('btn-cart-total');

  const discount = appliedCouponObj ? appliedCouponObj.value : 0;
  const tax = Math.round(total * 0.05);
  const grandTotal = Math.max(0, total - discount + tax + 25);

  if (itemTotalElem) itemTotalElem.innerText = `₹${total}`;
  if (grandTotalElem) grandTotalElem.innerText = `₹${grandTotal}`;
  if (btnCartTotalElem) btnCartTotalElem.innerText = `₹${grandTotal}`;
}

function updateCartQty(idx, change) {
  if (activeCart[idx]) {
    activeCart[idx].quantity += change;
    if (activeCart[idx].quantity <= 0) {
      activeCart.splice(idx, 1);
    }
    renderCart();
  }
}

// Live Stream Timer Simulation
function startElapsedTimer() {
  if (elapsedTimerInterval) clearInterval(elapsedTimerInterval);
  elapsedTimerInterval = setInterval(() => {
    elapsedSeconds++;
    const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
    const secs = String(elapsedSeconds % 60).padStart(2, '0');
    const timerElem = document.getElementById('live-elapsed-time');
    if (timerElem) timerElem.innerText = `${mins}:${secs}`;
  }, 1000);
}

function renderOrderHistory() {}
function renderAddresses() {}
function renderWallet() {}
function initLiveCamTimeline() {}
function startRiderAnimation() {}
function renderShopDashboardTables() {}

function showToast(msg) {
  const toast = document.getElementById('global-toast');
  const text = document.getElementById('toast-text');
  if (toast && text) {
    text.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}
