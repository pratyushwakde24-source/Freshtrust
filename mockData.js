// ==========================================================================
// FreshTrust – India's Most Transparent Meat Delivery Platform
// Comprehensive Production-Ready Mock Data & State Engine (`mockData.js`)
// ==========================================================================

window.FRESHTRUST_DATA = {
  // Global Session State
  session: {
    isLoggedIn: true,
    currentUser: {
      id: 'usr-1',
      name: 'Pratyush Sharma',
      phone: '+91 98765 43210',
      email: 'pratyush.sharma@freshtrust.luxury',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      membershipTier: 'VIP Atelier Gold',
      membershipExpiry: '18 July 2027',
      walletBalance: 1450,
      loyaltyCoins: 420,
      savedAddresses: [
        { id: 'addr-1', tag: 'Home', fullAddress: 'Apartment 4B, Palm Heights, BKC Road, Mumbai - 400051', instructions: 'Ring bell twice. Leave at door if no response.', isDefault: true },
        { id: 'addr-2', tag: 'Office', fullAddress: 'Level 14, Prestige Tech Park, Outer Ring Road, Bengaluru - 560103', instructions: 'Call upon arriving at Gate 2 security desk.', isDefault: false }
      ]
    },
    activeRole: 'customer' // 'customer' | 'worker' | 'shop-owner' | 'delivery' | 'super-admin'
  },

  // 5 Hero Cinematic Banners for Auto-Rotation
  heroBanners: [
    {
      id: 'hero-1',
      tag: '🔥 100% FARM FRESH',
      title: 'Antibiotic-Free Farm Fresh Chicken',
      subtitle: 'Hand-trimmed live on camera & vacuum-packed at 1.8°C cold chain.',
      ctaPrimary: 'Watch Live →',
      ctaSecondary: 'Order Now',
      action: 'live-cam',
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=1000&auto=format&fit=crop&q=80',
      bgGradient: 'linear-gradient(135deg, #1A0507 0%, #3B0A11 60%, #111827 100%)'
    },
    {
      id: 'hero-2',
      tag: '👑 EXOTIC WAGYU',
      title: 'Japanese A5 Miyazaki Wagyu Ribeye',
      subtitle: 'Intense snow-like marbling. Watch master butchers cut your steak live.',
      ctaPrimary: 'Explore Wagyu →',
      ctaSecondary: 'Watch Stream',
      action: 'product-wagyu',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=1000&auto=format&fit=crop&q=80',
      bgGradient: 'linear-gradient(135deg, #111111 0%, #2A1F0A 60%, #0F172A 100%)'
    },
    {
      id: 'hero-3',
      tag: '🌊 SEAFOOD FESTIVAL',
      title: 'Wild-Caught Coastal Prawns & Atlantic Salmon',
      subtitle: 'Air-shipped daily from cold fjords and coastal docks. 100% fresh, never frozen.',
      ctaPrimary: 'View Seafood →',
      ctaSecondary: 'Order Now',
      action: 'category-fish',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1000&auto=format&fit=crop&q=80',
      bgGradient: 'linear-gradient(135deg, #0A192F 0%, #0F2942 60%, #0B132B 100%)'
    },
    {
      id: 'hero-4',
      tag: '🏷️ WEEKEND EXCLUSIVE',
      title: 'Flat ₹150 OFF + Zero Delivery Fee',
      subtitle: 'Upgrade to FreshTrust VIP Pass for unlimited 24-min express deliveries.',
      ctaPrimary: 'Get VIP Pass →',
      ctaSecondary: 'Claim Coupon',
      action: 'membership',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=1000&auto=format&fit=crop&q=80',
      bgGradient: 'linear-gradient(135deg, #1C1917 0%, #292524 60%, #111827 100%)'
    },
    {
      id: 'hero-5',
      tag: '🎥 LIVE BUTCHER CAM',
      title: 'See Freshness Before You Buy',
      subtitle: 'Watch Master Ramesh precision cut, trim fat, and digitally weigh your meat.',
      ctaPrimary: 'Join Live Stream →',
      ctaSecondary: 'How It Works',
      action: 'live-cam',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=80',
      bgGradient: 'linear-gradient(135deg, #4C0519 0%, #881337 60%, #0F172A 100%)'
    }
  ],

  // Trust Indicators
  trustBadges: [
    { icon: '🎥', title: 'Live Preparation', desc: 'Watch your order cut on camera' },
    { icon: '🛡️', title: 'FSSAI Verified', desc: '100% Certified Dark Stores' },
    { icon: '🤖', title: 'AI Hygiene Checked', desc: 'AI mask & hairnet audits' },
    { icon: '❄️', title: 'Cold Chain Maintained', desc: 'Preserved at 1.8°C thermal box' },
    { icon: '⚖️', title: 'Weight Verified', desc: 'Bluetooth scale live sync' },
    { icon: '🔒', title: 'Tamper Proof Seal', desc: 'Vacuum-sealed security lock' }
  ],

  // Live Streams Running Now
  liveStreamsNow: [
    {
      id: 'live-stream-1',
      workerName: 'Master Ramesh',
      workerTitle: 'Head Butcher • Station 1',
      shopName: 'Atelier Meat Co. (BKC Studio)',
      currentCut: 'Deccan Goat Mutton Biryani Cut',
      orderNumber: '#FT-89241',
      viewersCount: 142,
      fps: '1080p 60fps',
      thumbnail: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'live-stream-2',
      workerName: 'Chef Marcus',
      workerTitle: 'Fish Master • Station 3',
      shopName: 'Deccan Highland Studio (Pune)',
      currentCut: 'Atlantic Salmon Filleting',
      orderNumber: '#FT-89240',
      viewersCount: 98,
      fps: '1080p 60fps',
      thumbnail: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'live-stream-3',
      workerName: 'Butcher Suresh',
      workerTitle: 'Poultry Master • Station 2',
      shopName: 'Global Wagyu & Meat Hub (Bengaluru)',
      currentCut: 'Country Chicken Wings Trim',
      orderNumber: '#FT-89239',
      viewersCount: 215,
      fps: '1080p 60fps',
      thumbnail: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&auto=format&fit=crop&q=80'
    }
  ],

  // Search History & Suggestions
  searchHistory: ['Biryani Cut Mutton', 'Country Chicken Breast', 'Atlantic Salmon Fillet', 'Miyazaki A5 Wagyu'],
  trendingSearches: ['Deccan Goat Chops', 'Jumbo Tiger Prawns', 'Peri-Peri Marinated Wings', 'Organic Country Eggs', 'Seekh Kebab Mince'],

  // Categories
  categories: [
    { id: 'cat-all', name: 'All Cuts', icon: '🥩', count: '48 Cuts' },
    { id: 'cat-chicken', name: 'Fresh Chicken', icon: '🍗', count: '14 Cuts' },
    { id: 'cat-mutton', name: 'Tender Mutton', icon: '🍖', count: '12 Cuts' },
    { id: 'cat-fish', name: 'Fish & Seafood', icon: '🐟', count: '10 Cuts' },
    { id: 'cat-prawns', name: 'Jumbo Prawns', icon: '🦐', count: '4 Cuts' },
    { id: 'cat-wagyu', name: 'Exotic Wagyu', icon: '🥩', count: '3 Cuts' },
    { id: 'cat-eggs', name: 'Organic Eggs', icon: '🥚', count: '2 Packs' },
    { id: 'cat-ready', name: 'Ready to Cook', icon: '🔥', count: '8 Cuts' }
  ],

  // Verified Dark Stores & Studios
  shops: [
    { id: 'shop-1', name: 'Atelier Meat Co. (Flagship BKC Studio)', distance: '1.2 km', deliveryTime: '24 Mins', hygieneScore: 99.8, coldChainStatus: '1.8°C Audited', fssai: '10019043002812', rating: 4.98, reviewsCount: 3420, openHours: '06:00 AM - 11:00 PM', address: 'G-Block, BKC Green Hub, Bandra East, Mumbai', isLive: true, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80' },
    { id: 'shop-2', name: 'Deccan Highland Pasture Studio', distance: '3.2 km', deliveryTime: '28 Mins', hygieneScore: 99.4, coldChainStatus: '2.1°C Audited', fssai: '10019043002999', rating: 4.94, reviewsCount: 1840, openHours: '06:30 AM - 10:30 PM', address: 'Kalyani Nagar, Pune', isLive: true, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80' },
    { id: 'shop-3', name: 'Global Wagyu & Artisanal Seafood Hub', distance: '4.8 km', deliveryTime: '34 Mins', hygieneScore: 99.9, coldChainStatus: '1.5°C Audited', fssai: '10019043003112', rating: 4.99, reviewsCount: 920, openHours: '07:00 AM - 10:00 PM', address: 'Indiranagar 100ft Road, Bengaluru', isLive: true, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80' }
  ],

  // Comprehensive Product Catalog
  products: [
    {
      id: 'prod-1',
      categoryId: 'cat-mutton',
      name: 'Artisanal Lamb Rib Chops (Prime Marbling)',
      subtitle: 'Pasture-raised Deccan lamb, precision hand-trimmed live on camera for juicy tenderness.',
      price: 680,
      originalPrice: 750,
      unit: '500g (Serves 2-3)',
      rating: 4.98,
      reviewsCount: 420,
      freshnessScore: 99,
      deliveryTime: '24 Mins',
      prepTime: '~12 mins Live Cutting',
      badges: ['100% Fresh', 'Halal Certified', 'Live Camera Cut'],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=80'
      ],
      availableWeights: [
        { label: '250g', price: 350, isDefault: false },
        { label: '500g', price: 680, isDefault: true },
        { label: '1kg', price: 1300, isDefault: false }
      ],
      availableCuts: [
        { id: 'cut-curry', name: 'Curry Cut (Medium 3cm Dice)', desc: 'Bone-in tender chunks ideal for traditional gravies.' },
        { id: 'cut-steaks', name: 'Rib Chops Steaks (French Trimmed)', desc: 'Clean rib bone handle, perfect for high-heat pan searing.' },
        { id: 'cut-boneless', name: 'Boneless Cubes (Marinated Kebabs)', desc: 'Pure juicy tenderloin cubes stripped of all connective fat.' }
      ],
      nutrition: { protein: '24.2g', calories: '210 kcal', fat: '11.8g', iron: '3.4mg' },
      origin: 'Deccan Green Highland Pastures (Nashik)',
      storage: 'Vacuum sealed at 1.8°C.'
    },
    {
      id: 'prod-2',
      categoryId: 'cat-chicken',
      name: 'Country Chicken Curry Cut (Free-Range Skinless)',
      subtitle: 'Free-range desi birds fed on natural grains. High protein, lean meat with authentic country flavor.',
      price: 360,
      originalPrice: 420,
      unit: '500g (12-14 Pieces)',
      rating: 4.95,
      reviewsCount: 890,
      freshnessScore: 98,
      deliveryTime: '22 Mins',
      prepTime: '~8 mins Live Cutting',
      badges: ['Free Range', 'Antibiotic Free', 'Halal Certified'],
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&auto=format&fit=crop&q=80'
      ],
      availableWeights: [
        { label: '500g', price: 360, isDefault: true },
        { label: '1kg', price: 690, isDefault: false }
      ],
      availableCuts: [
        { id: 'cut-std', name: 'Standard Curry Cut (Skinless)', desc: 'Equal mix of breast, thigh, and drumstick pieces with bone.' },
        { id: 'cut-boneless-chk', name: 'Breast Boneless Cubes', desc: '100% lean white chicken breast diced for stir fries.' }
      ],
      nutrition: { protein: '28.4g', calories: '165 kcal', fat: '4.2g', iron: '1.8mg' },
      origin: 'Green Meadow Bio-Farms (Sahyadri foothills)'
    },
    {
      id: 'prod-3',
      categoryId: 'cat-fish',
      name: 'Norwegian Atlantic Salmon Fillet (Center Cut)',
      subtitle: 'Flown in fresh 24 hours from cold arctic fjords. Rich in Omega-3 fatty acids and buttery texture.',
      price: 1250,
      originalPrice: 1400,
      unit: '300g (2 Premium Portions)',
      rating: 4.99,
      reviewsCount: 310,
      freshnessScore: 99,
      deliveryTime: '26 Mins',
      prepTime: '~10 mins Live Filleting',
      badges: ['Wild Sourced', 'Omega-3 Rich', 'Air Shipped'],
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80'
      ],
      availableWeights: [
        { label: '300g', price: 1250, isDefault: true },
        { label: '600g', price: 2400, isDefault: false }
      ],
      availableCuts: [
        { id: 'cut-fillet', name: 'Skin-On Pan Sear Fillets', desc: 'Descaled and pin-boned, leaving crispy edible skin intact.' },
        { id: 'cut-sashimi', name: 'Sashimi Grade Boneless Slices', desc: 'Trimmed and thinly sliced for sushi.' }
      ],
      nutrition: { protein: '22.0g', calories: '208 kcal', fat: '13.1g', iron: '1.2mg' },
      origin: 'Cold Arctic Fjords, Norway'
    },
    {
      id: 'prod-4',
      categoryId: 'cat-wagyu',
      name: 'Japanese A5 Wagyu Tenderloin Steak (Miyazaki)',
      subtitle: 'The pinnacle of luxury beef with intense snow-like marbling that melts effortlessly on the palate.',
      price: 4800,
      originalPrice: 5500,
      unit: '250g (1 Thick Cut Steak)',
      rating: 5.0,
      reviewsCount: 142,
      freshnessScore: 100,
      deliveryTime: '30 Mins',
      prepTime: '~15 mins Live Trimming',
      badges: ['A5 Grade', 'Miyazaki Wagyu', '100% Imported'],
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop&q=80'
      ],
      availableWeights: [
        { label: '250g', price: 4800, isDefault: true },
        { label: '500g', price: 9200, isDefault: false }
      ],
      availableCuts: [
        { id: 'cut-steak-a5', name: 'Thick Steak Cut (3cm)', desc: 'Standard steak thickness for high-heat skillet searing.' }
      ],
      nutrition: { protein: '19.5g', calories: '315 kcal', fat: '26.4g', iron: '2.4mg' },
      origin: 'Miyazaki Prefecture, Japan'
    }
  ],

  // 6 Why FreshTrust Pillars
  whyFreshTrust: [
    { icon: '🎥', title: 'Watch Live Cam', desc: 'Connect to your butcher cutting station in real time.' },
    { icon: '🤖', title: 'AI Hygiene Audit', desc: 'Computer vision monitors masks, hairnets & sanitized blades.' },
    { icon: '❄️', title: '1.8°C Cold Chain', desc: 'Maintained in thermal insulated boxes from dark store to doorstep.' },
    { icon: '⚖️', title: 'Bluetooth Verified Weight', desc: 'Live digital scale telemetry printed directly on your tamper-proof box.' },
    { icon: '⚡', title: '24-Min Delivery', desc: 'Dispatched immediately after cutting without intermediate warehouse delay.' },
    { icon: '🛡️', title: 'FSSAI Certified', desc: '100% audited green dark store facilities with zero preservatives.' }
  ],

  // Real Customer Testimonials
  testimonials: [
    {
      id: 'test-1',
      name: 'Chef Sanjeev R.',
      role: 'Master Chef & Culinary Critic',
      city: 'Mumbai',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      comment: 'FreshTrust is revolutionary. Watching Master Ramesh precision cut my mutton on live camera gave me 100% confidence. The meat quality is unmatched!'
    },
    {
      id: 'test-2',
      name: 'Dr. Priya Nair',
      role: 'Clinical Nutritionist',
      city: 'Bengaluru',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      comment: 'The 1.8°C cold chain integrity and antibiotic-free certificate make FreshTrust the safest meat delivery platform in India. Highly recommended.'
    },
    {
      id: 'test-3',
      name: 'Vikramaditya S.',
      role: 'Food & Wine Connoisseur',
      city: 'Delhi NCR',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      comment: 'Ordered the Miyazaki A5 Wagyu. The live scale readout showed exactly 252g before vacuum sealing. Fast 20-min delivery!'
    }
  ],

  // Coupons
  coupons: [
    { code: 'FRESHTRUST50', discountType: 'FLAT', value: 150, minOrder: 500, desc: 'Flat ₹150 OFF on your live cutting studio order above ₹500.' },
    { code: 'WELCOME100', discountType: 'FLAT', value: 200, minOrder: 800, desc: 'New user welcome special: Flat ₹200 OFF.' },
    { code: 'VIPFREE', discountType: 'DELIVERY', value: 40, minOrder: 0, desc: '100% Free Express Delivery for Atelier Pass members.' }
  ]
};

// Unified accessor for window.FRESHTRUST_DATA.user -> session.currentUser
Object.defineProperty(window.FRESHTRUST_DATA, 'user', {
  get() { return this.session ? this.session.currentUser : null; },
  set(val) { if (this.session) this.session.currentUser = val; },
  configurable: true,
  enumerable: true
});
