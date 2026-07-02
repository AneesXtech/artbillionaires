/* 
   Art Millionaires - Premium Interaction Scripts
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Header Scroll Effect ---
  const desktopHeaderMenu = document.getElementById('luxury-menu-wrapper');
  const mobileHeader = document.getElementById('luxury-mobile-header');
  const rootElement = document.documentElement;
  const utilityOverlay = document.getElementById('utility-overlay');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBtn = document.querySelector('.js-cart-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.querySelector('.cart-count');
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  const accountBtn = document.querySelector('.js-account-btn');
  const accountModal = document.getElementById('account-modal');
  const accountCloseBtn = document.getElementById('account-close-btn');
  const accountForm = document.getElementById('account-form');
  const accountStatus = document.getElementById('account-status');
  const productBuyButtons = document.querySelectorAll('.product-buy-btn');
  const cartStorageKey = 'artMillionairesCart';
  const accountStorageKey = 'artMillionairesAccount';
  let cartItems = [];

  function handleScroll() {
    const scrollY = window.scrollY;
    
    // Mobile header scrolled background
    if (mobileHeader) {
      if (scrollY > 20) {
        mobileHeader.classList.add('scrolled');
      } else {
        mobileHeader.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
  // Initial check in case page is loaded scrolled
  handleScroll();


  // --- 2. Side Drawer Navigation ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const sideDrawer = document.getElementById('side-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const menuOverlay = document.getElementById('menu-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-nav-item a');

  function syncPageLock() {
    const hasOpenUi =
      sideDrawer.classList.contains('active') ||
      (cartDrawer && cartDrawer.classList.contains('active')) ||
      (accountModal && accountModal.classList.contains('active'));

    document.body.classList.toggle('ui-open', hasOpenUi);
    rootElement.classList.toggle('ui-open', hasOpenUi);
  }

  function setDrawerOpenState(isOpen) {
    hamburgerBtn.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    sideDrawer.classList.toggle('active', isOpen);
    menuOverlay.classList.toggle('active', isOpen);
    document.body.classList.toggle('drawer-open', isOpen);
    rootElement.classList.toggle('drawer-open', isOpen);
    syncPageLock();
  }

  function toggleMenu() {
    closeCart();
    closeAccount();
    setDrawerOpenState(!sideDrawer.classList.contains('active'));
  }

  function closeMenu() {
    setDrawerOpenState(false);
  }

  hamburgerBtn.addEventListener('click', toggleMenu);
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMenu);
  }
  menuOverlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    if (accountModal && accountModal.classList.contains('active')) {
      closeAccount();
      return;
    }

    if (cartDrawer && cartDrawer.classList.contains('active')) {
      closeCart();
      return;
    }

    if (sideDrawer.classList.contains('active')) {
      closeMenu();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && sideDrawer.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close menu when a navigation link inside is clicked
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  const exchangeRates = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.78 }
  };

  let currentCurrency = 'USD';

  function formatPrice(value) {
    const config = exchangeRates[currentCurrency] || { symbol: '$', rate: 1.0 };
    const converted = Math.round(value * config.rate);
    return config.symbol + converted.toLocaleString();
  }

  function persistCart() {
    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
    } catch (error) {
      // noop
    }
  }

  const allProductsCatalog = [
    { title: 'Golden Still Life', price: 3200, image: 'assets/Art Images/golden-still-life.jpg', details: 'Oil on Canvas  -  36 x 28 inches (2021)', category: 'Featured Art', medium: 'Canvas', year: 2021, availability: 'in-stock' },
    { title: 'Equestrian Grace', price: 4500, image: 'assets/Art Images/equestrian-grace.jpg', details: 'Oil on Canvas  -  48 x 36 inches (2020)', category: 'Animals', medium: 'Canvas', year: 2020, availability: 'in-stock' },
    { title: 'Crimson Twilight', price: 5800, image: 'assets/Art Images/crimson-twilight.jpg', details: 'Oil on Canvas  -  40 x 30 inches (2021)', category: 'Featured Art', medium: 'Canvas', year: 2021, availability: 'in-stock' },
    { title: 'Heritage Portrait', price: 7200, image: 'assets/Art Images/heritage-portrait.jpg', details: 'Oil on Canvas  -  36 x 48 inches (2017)', category: 'Humans', medium: 'Canvas', year: 2017, availability: 'in-stock' },
    { title: 'Serenity in Bloom', price: 2900, image: 'assets/Art Images/serenity-in-bloom.jpg', details: 'Oil on Canvas  -  30 x 40 inches (2021)', category: 'Featured Art', medium: 'Canvas', year: 2021, availability: 'in-stock' },
    { title: 'Mystic Horizon', price: 18500, image: 'assets/Art Images/mystic-horizon.jpg', details: 'Oil on Canvas  -  48 x 36 inches (2025)', category: 'Featured Art', medium: 'Canvas', year: 2025, availability: 'in-stock' },
    { title: 'Rainbow Ballerina', price: 6400, image: 'assets/Art Images/rainbow-ballerina.jpg', details: 'Oil on Canvas  -  36 x 48 inches (2023)', category: 'Humans', medium: 'Canvas', year: 2023, availability: 'in-stock' },
    { title: '1948 Dancing Couple by Car', price: 1650, image: 'assets/Art Images/dancing-couple-1948.jpg', details: 'Oil on Canvas  -  30 x 30 inches (2021)', category: 'Humans', medium: 'Canvas', year: 2021, availability: 'in-stock' },
    { title: "My Daddy's a Great Painter", price: 3800, image: "assets/Art Images/daddys-painter.jpg", details: 'Oil on Canvas  -  24 x 36 inches (2021)', category: 'Humans', medium: 'Canvas', year: 2021, availability: 'in-stock' },
    { title: 'Once Upon a Time in America', price: 22000, image: 'assets/Art Images/mystic-horizon.jpg', details: 'Oil on Canvas  -  40 x 30 inches (2015)', category: 'Humans', medium: 'Canvas', year: 2015, availability: 'in-stock' },
    { title: '1948 Dancing Couple by Car', price: 1650, image: 'assets/Art Images/dancing-couple-1948.jpg', details: 'Oil on Canvas  -  30 x 30 inches (2021)', category: 'Humans', medium: 'Canvas', year: 2021, availability: 'in-stock' },
    { title: 'Mystical Girl', price: 1750, image: 'assets/Art Images/mystical-girl-slide.jpg', details: 'Oil on Canvas  -  48 x 36 inches (2012)', category: 'Humans', medium: 'Canvas', year: 2012, availability: 'in-stock' },
    { title: 'Ancient Civilization', price: 8500, image: 'assets/Art Images/heritage-portrait.jpg', details: 'Oil on Wood  -  40 x 48 inches (2010)', category: 'Featured Art', medium: 'Wood', year: 2010, availability: 'in-stock' },
    { title: 'Runaway Horse', price: 1550, image: 'assets/Art Images/equestrian-grace.jpg', details: 'Oil on Canvas  -  48 x 36 inches (2011)', category: 'Animals', medium: 'Canvas', year: 2011, availability: 'in-stock' },
    { title: 'Spirit of India (2011)', price: 9500, image: 'assets/Art Images/serenity-in-bloom.jpg', details: 'Oil on Canvas  -  30 x 40 inches (2011)', category: 'Featured Art', medium: 'Canvas', year: 2011, availability: 'in-stock' },
    { title: 'Taj Mahal', price: 15000, image: 'assets/Art Images/Taj Mahal - Oil on Wood  48 x 36 inches  2011.jpg', details: 'Oil on Wood  -  48 x 36 inches (2011)', category: 'Architectural', medium: 'Wood', year: 2011, availability: 'in-stock' },
    { title: "A Lion Queen's Journey", price: 1250, image: 'assets/Art Images/A Lion Queens Journey through Eden - Oil on Linen  24 x 30 inches  2023.jpg', details: 'Oil on Linen • 24 × 30 inches (2023)', category: 'Animals', medium: 'Linen', year: 2023, availability: 'in-stock' },
    { title: 'Street-Side Cars', price: 1350, image: 'assets/Art Images/Street-Side Cars  Oil on Wood  32 x 24 inches  2007.jpg', details: 'Oil on Wood  -  32 x 24 inches (2007)', category: 'Architectural', medium: 'Wood', year: 2007, availability: 'in-stock' },
    { title: 'Cute White Kitty', price: 450, image: 'assets/Art Images/Cute White Kitty - Oil on Paper  29 x 21 inches  2004.jpg', details: 'Oil on Paper  -  29 x 21 inches (2004)', category: 'Animals', medium: 'Paper', year: 2004, availability: 'in-stock' },
    { title: 'Doggy Dog', price: 750, image: 'assets/Art Images/Doggy Dog - Oil on Wood  32 x 24 inches  2006.jpg', details: 'Oil on Wood  -  32 x 24 inches (2006)', category: 'Animals', medium: 'Wood', year: 2006, availability: 'in-stock' },
    { title: 'Shadows of Egret', price: 1550, image: 'assets/Art Images/Shadows of Egret - Oil on Wood  48 x 32 inches  2007.jpg', details: 'Oil on Wood  -  48 x 32 inches (2007)', category: 'Birds', medium: 'Wood', year: 2007, availability: 'in-stock' },
    { title: 'Wild Beast', price: 1600, image: 'assets/Art Images/Wild Beast - Oil on Canvas - 48 x 32 inches - 2007.jpg', details: 'Oil on Canvas  -  48 x 32 inches (2007)', category: 'Animals', medium: 'Canvas', year: 2007, availability: 'out-of-stock' },
    { title: 'Perched Beauty of Nature', price: 1300, image: 'assets/Art Images/Perched Beauty of Nature  - Oil on Wood  48 x 32 inches  2006.jpg', details: 'Oil on Wood  -  48 x 32 inches (2006)', category: 'Birds', medium: 'Wood', year: 2006, availability: 'in-stock' },
    { title: 'Cars in Town', price: 1450, image: 'assets/Art Images/Cars in Town  Oil on Wood  48 x 32 inches  2007.jpg', details: 'Oil on Wood  -  48 x 32 inches (2007)', category: 'Architectural', medium: 'Wood', year: 2007, availability: 'out-of-stock' },
    { title: 'Hungry White Tiger', price: 1500, image: 'assets/Art Images/Hungry White Tiger  - Oil on Wood  48 x 32 inches  2006  -Temp Rsz1250 Cmp8.jpg', details: 'Oil on Wood  -  48 x 32 inches (2006)', category: 'Animals', medium: 'Wood', year: 2006, availability: 'out-of-stock' },
    { title: 'A New Day Rising', price: 12500, image: 'assets/Art Images/A New Day Rising - Oil on Canvas - 48 x 36 inches  2011.jpg', details: 'Oil on Canvas  -  48 x 36 inches (2011)', category: 'Featured Art', medium: 'Canvas', year: 2011, availability: 'in-stock' },
    { title: 'An Evening Alone', price: 1450, image: 'assets/Art Images/An Evening Alone - Oil on Wood   48 x 32 inches  2007.jpg', details: 'Oil on Wood  -  48 x 32 inches (2007)', category: 'Humans', medium: 'Wood', year: 2007, availability: 'in-stock' },
    { title: 'Blue Sea Egret', price: 380, image: 'assets/Art Images/Blue Sea Egret - Oil on Canvas  18 x 14 inches  2013.jpg', details: 'Oil on Canvas  -  18 x 14 inches (2013)', category: 'Birds', medium: 'Canvas', year: 2013, availability: 'in-stock' },
    { title: 'Cultural India', price: 6500, image: 'assets/Art Images/Cultural India - Oil on Wood  55 x 48 inches  2007.jpg', details: 'Oil on Wood  -  55 x 48 inches (2007)', category: 'Humans', medium: 'Wood', year: 2007, availability: 'in-stock' },
    { title: 'Evening Fog Ride', price: 480, image: 'assets/Art Images/Evening Fog Ride - Oil on Canvas  18 x 14 inches  2013.jpg', details: 'Oil on Canvas  -  18 x 14 inches (2013)', category: 'Architectural', medium: 'Canvas', year: 2013, availability: 'in-stock' },
    { title: 'Glazing Eyes', price: 1200, image: 'assets/Art Images/Glazing Eyes - Oil on Wood  34 x 24 inches  2006.jpg', details: 'Oil on Wood  -  34 x 24 inches (2006)', category: 'Humans', medium: 'Wood', year: 2006, availability: 'in-stock' },
    { title: 'Great White Egret', price: 950, image: 'assets/Art Images/Great White Egret - Oil on Wood  32 x 24 inches  2007.jpg', details: 'Oil on Wood  -  32 x 24 inches (2007)', category: 'Birds', medium: 'Wood', year: 2007, availability: 'in-stock' },
    { title: 'Happy Shepherd', price: 850, image: 'assets/Art Images/Happy Shepherd - Oil on Canvas  48 x 32 inches  2007.jpg', details: 'Oil on Canvas  -  48 x 32 inches (2007)', category: 'Humans', medium: 'Canvas', year: 2007, availability: 'in-stock' },
    { title: 'In the Dark', price: 1600, image: 'assets/Art Images/In the Dark - Oil on Canvas - 48 x 36 inches  2012.jpg', details: 'Oil on Canvas  -  48 x 36 inches (2012)', category: 'Featured Art', medium: 'Canvas', year: 2012, availability: 'in-stock' },
    { title: 'Indian Beauty (Misty Foliage)', price: 1200, image: 'assets/Art Images/Indian Beauty in Rainy Misty Foliage - Oil on wood  24 x 32 inches  2022.jpg', details: 'Oil on Wood  -  24 x 32 inches (2022)', category: 'Humans', medium: 'Wood', year: 2022, availability: 'in-stock' },
    { title: "It's A Beautiful Day", price: 1450, image: 'assets/Art Images/It\'s A Beautiful Day - Oil Acrylic on Canvas  40 x 30 inches  2016.jpg', details: 'Oil Acrylic on Canvas  -  40 x 30 inches (2016)', category: 'Featured Art', medium: 'Canvas', year: 2016, availability: 'in-stock' },
    { title: 'Abstract Harmony', price: 1300, image: 'assets/Art Images/mystical-girl-slide.jpg', details: 'Oil on Canvas  -  36 x 24 inches (2011)', category: 'Humans', medium: 'Canvas', year: 2011, availability: 'in-stock' },
    { title: "Rock ' N Roll Mystique", price: 1650, image: 'assets/Art Images/Rock \' N Roll Mystique   48 x 30 inches  2014.jpg', details: 'Oil on Canvas  -  48 x 30 inches (2014)', category: 'Featured Art', medium: 'Canvas', year: 2014, availability: 'in-stock' },
    { title: 'Sensual Beauty', price: 1400, image: 'assets/Art Images/Sensual Beauty -  Oil on Canvas  40 x  30  inches  2012.jpg', details: 'Oil on Canvas  -  40 x 30 inches (2012)', category: 'Humans', medium: 'Canvas', year: 2012, availability: 'in-stock' },
    { title: 'Spirit of India (2008)', price: 1600, image: 'assets/Art Images/Spirit of India - Oil on Canvas  36 x 30 inches  2008.jpg', details: 'Oil on Canvas  -  36 x 30 inches (2008)', category: 'Featured Art', medium: 'Canvas', year: 2008, availability: 'in-stock' },
    { title: 'Tabby with Golden Eyes', price: 1750, image: 'assets/Art Images/tabby-golden-eyes.jpg', details: 'Oil on Linen  -  24 x 32 inches (2022)', category: 'Animals', medium: 'Linen', year: 2022, availability: 'in-stock' },
    { title: 'Lonesome Girl by Window', price: 1250, image: 'assets/Art Images/The Lonesome Girl by the Window - Oil on Canvas  36 x 24 inches  2008.jpg', details: 'Oil on Canvas  -  36 x 24 inches (2008)', category: 'Humans', medium: 'Canvas', year: 2008, availability: 'in-stock' },
    { title: 'White Egret Flying', price: 1350, image: 'assets/Art Images/White Egret Flying - Oil on Wood  32 x 24 inches  2007.jpg', details: 'Oil on Wood  -  32 x 24 inches (2007)', category: 'Birds', medium: 'Wood', year: 2007, availability: 'in-stock' }
  ];

  function addToCart(title, price, image) {
    const existingItem = cartItems.find(item => item.title === title);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      const newItem = {
        id: `${title}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title,
        price,
        image,
        quantity: 1
      };
      cartItems.unshift(newItem);
    }
    persistCart();
    renderCart();
    openCart();
  }

  function renderRelatedProducts() {
    const relatedSection = document.getElementById('cart-related-section');
    const relatedTrack = document.getElementById('cart-related-track');
    if (!relatedSection || !relatedTrack) return;

    // Find products in catalog that are not in cart
    const cartTitles = cartItems.map(item => item.title);
    const recommendations = allProductsCatalog.filter(item => !cartTitles.includes(item.title));

    if (recommendations.length === 0) {
      relatedSection.style.display = 'none';
      return;
    }

    relatedSection.style.display = 'block';
    relatedTrack.innerHTML = '';

    recommendations.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-related-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-related-item-img">
        <h4 class="cart-related-item-title">${item.title}</h4>
        <div class="cart-related-item-price">${formatPrice(item.price)}</div>
        <button class="cart-related-item-add" type="button">+ Add</button>
      `;

      div.querySelector('.cart-related-item-add').addEventListener('click', () => {
        addToCart(item.title, item.price, item.image);
      });

      relatedTrack.appendChild(div);
    });
  }

  function renderCart() {
    if (!cartItemsContainer || !cartEmptyState || !cartTotal) {
      return;
    }

    cartItemsContainer.innerHTML = '';

    if (!cartItems.length) {
      cartEmptyState.hidden = false;
      cartItemsContainer.hidden = true;
      cartTotal.textContent = formatPrice(0);
      
      // Update all cart count badges on the page
      document.querySelectorAll('.cart-count').forEach(badge => {
        badge.textContent = '0';
      });

      if (checkoutBtn) {
        checkoutBtn.disabled = true;
      }
      renderRelatedProducts();
      return;
    }

    cartEmptyState.hidden = true;
    cartItemsContainer.hidden = false;

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    cartTotal.textContent = formatPrice(totalAmount);
    
    // Update all cart count badges on the page (sum of quantities)
    const totalQty = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.querySelectorAll('.cart-count').forEach(badge => {
      badge.textContent = String(totalQty);
    });

    if (checkoutBtn) {
      checkoutBtn.disabled = false;
    }

    cartItems.forEach((item) => {
      const cartItem = document.createElement('article');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-copy">
          <h3 class="cart-item-title">${item.title}</h3>
          <p class="cart-item-meta">Original handmade artwork</p>
          <div class="cart-item-price">${formatPrice(item.price * (item.quantity || 1))}</div>
          <div class="cart-quantity-selector">
            <button class="cart-qty-btn dec-btn" type="button" data-cart-id="${item.id}">&minus;</button>
            <input type="number" class="cart-qty-input" value="${item.quantity || 1}" min="1" readonly data-cart-id="${item.id}">
            <button class="cart-qty-btn inc-btn" type="button" data-cart-id="${item.id}">&plus;</button>
          </div>
        </div>
        <button class="cart-remove-btn" type="button" data-cart-id="${item.id}" aria-label="Remove item">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    renderRelatedProducts();
  }

  function openCart() {
    if (!cartDrawer || !utilityOverlay) {
      return;
    }

    closeMenu();
    closeAccount();
    cartDrawer.classList.add('active');
    cartDrawer.setAttribute('aria-hidden', 'false');
    utilityOverlay.classList.add('active');
    document.querySelectorAll('.js-cart-btn').forEach(btn => btn.classList.add('is-active'));
    syncPageLock();
  }

  function closeCart() {
    if (!cartDrawer || !utilityOverlay) {
      return;
    }

    cartDrawer.classList.remove('active');
    cartDrawer.setAttribute('aria-hidden', 'true');
    if (!accountModal?.classList.contains('active')) {
      utilityOverlay.classList.remove('active');
    }
    document.querySelectorAll('.js-cart-btn').forEach(btn => btn.classList.remove('is-active'));
    syncPageLock();
  }

  function openAccount() {
    // If we have a dedicated account page, redirect there instead of opening a modal
    window.location.href = 'account.html';
  }

  function closeAccount() {
    if (!accountModal || !utilityOverlay) {
      return;
    }

    accountModal.classList.remove('active');
    accountModal.setAttribute('aria-hidden', 'true');
    if (!cartDrawer?.classList.contains('active')) {
      utilityOverlay.classList.remove('active');
    }
    document.querySelectorAll('.js-account-btn').forEach(btn => btn.classList.remove('is-active'));
    syncPageLock();
  }

  function updateCurrency(currencyCode) {
    currentCurrency = currencyCode;
    const config = exchangeRates[currencyCode];
    if (!config) return;

    const flagMap = {
      USD: 'https://flagcdn.com/w20/us.png',
      EUR: 'https://flagcdn.com/w20/eu.png',
      GBP: 'https://flagcdn.com/w20/gb.png'
    };

    const headerFlag = document.getElementById('header-currency-flag');
    const headerText = document.getElementById('header-currency-text');

    if (headerFlag) headerFlag.src = flagMap[currencyCode];
    if (headerText) headerText.textContent = `${config.symbol} (${currencyCode})`;

    // Convert product prices on the page
    document.querySelectorAll('.product-price').forEach(priceDiv => {
      const basePrice = parseFloat(priceDiv.getAttribute('data-base-price'));
      if (!isNaN(basePrice)) {
        const converted = Math.round(basePrice * config.rate);
        priceDiv.textContent = config.symbol + converted.toLocaleString();
      }
    });

    // Also convert and re-render cart
    renderCart();
  }

  function loadSavedState() {
    // Initialize product base prices dynamically
    document.querySelectorAll('.product-card').forEach(card => {
      const buyBtn = card.querySelector('.product-buy-btn');
      const priceDiv = card.querySelector('.product-price');
      if (buyBtn && priceDiv) {
        const basePrice = buyBtn.getAttribute('data-product-price');
        priceDiv.setAttribute('data-base-price', basePrice);
      }
    });

    try {
      const storedCart = localStorage.getItem(cartStorageKey);
      cartItems = storedCart ? JSON.parse(storedCart) : [];
      // Ensure quantity key exists for compatibility
      cartItems.forEach(item => {
        if (typeof item.quantity === 'undefined') {
          item.quantity = 1;
        }
      });
    } catch (error) {
      cartItems = [];
    }

    try {
      const storedAccount = localStorage.getItem(accountStorageKey);
      if (storedAccount && accountStatus) {
        accountStatus.textContent = `Signed in as ${storedAccount}`;
      }
    } catch (error) {
      // noop
    }

    // Default to USD on load
    updateCurrency('USD');
  }

  // Bind clicks for all Buy Now buttons
  productBuyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const title = button.dataset.productTitle || 'Artwork';
      const price = Number(button.dataset.productPrice || 0);
      const image = button.dataset.productImage || '';
      addToCart(title, price, image);
    });
  });

  // Cart item click event delegation for quantity and remove controls
  cartItemsContainer?.addEventListener('click', (event) => {
    const decBtn = event.target.closest('.dec-btn');
    const incBtn = event.target.closest('.inc-btn');
    const removeBtn = event.target.closest('.cart-remove-btn');

    if (decBtn) {
      const itemId = decBtn.dataset.cartId;
      const item = cartItems.find(item => item.id === itemId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove if quantity drops below 1
          cartItems = cartItems.filter(item => item.id !== itemId);
        }
        persistCart();
        renderCart();
      }
      return;
    }

    if (incBtn) {
      const itemId = incBtn.dataset.cartId;
      const item = cartItems.find(item => item.id === itemId);
      if (item) {
        item.quantity += 1;
        persistCart();
        renderCart();
      }
      return;
    }

    if (removeBtn) {
      const itemId = removeBtn.dataset.cartId;
      cartItems = cartItems.filter((item) => item.id !== itemId);
      persistCart();
      renderCart();
    }
  });

  // Cart Related Carousel Scroll Navigation
  const cartTrack = document.getElementById('cart-related-track');
  const cartPrev = document.getElementById('cart-carousel-prev');
  const cartNext = document.getElementById('cart-carousel-next');

  cartPrev?.addEventListener('click', () => {
    cartTrack?.scrollBy({ left: -140, behavior: 'smooth' });
  });

  cartNext?.addEventListener('click', () => {
    cartTrack?.scrollBy({ left: 140, behavior: 'smooth' });
  });

  // Cart Order Note Accordion toggle
  const cartNoteToggle = document.getElementById('cart-note-toggle');
  const cartNoteWrapper = document.getElementById('cart-note-wrapper');
  const cartOrderNote = document.getElementById('cart-order-note');

  cartNoteToggle?.addEventListener('click', () => {
    cartNoteToggle.classList.toggle('active');
    if (cartNoteToggle.classList.contains('active')) {
      cartNoteWrapper.style.maxHeight = cartNoteWrapper.scrollHeight + 'px';
    } else {
      cartNoteWrapper.style.maxHeight = '0px';
    }
  });

  if (cartOrderNote) {
    const savedNote = localStorage.getItem('artMillionairesOrderNote');
    if (savedNote) {
      cartOrderNote.value = savedNote;
    }
    cartOrderNote.addEventListener('input', () => {
      localStorage.setItem('artMillionairesOrderNote', cartOrderNote.value);
    });
  }

  // Bind all cart toggle buttons
  document.querySelectorAll('.js-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (cartDrawer?.classList.contains('active')) {
        closeCart();
      } else {
        openCart();
      }
    });
  });

  // Bind all account toggle buttons
  document.querySelectorAll('.js-account-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openAccount();
    });
  });

  cartCloseBtn?.addEventListener('click', closeCart);
  
  // Close drawers/modals on background click
  utilityOverlay?.addEventListener('click', () => {
    closeCart();
    closeAccount();
  });

  // Dedicated Account Page Forms and UI sync
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const panelLogin = document.getElementById('panel-login');
  const panelRegister = document.getElementById('panel-register');
  const authCard = document.getElementById('auth-card');
  const dashboardPanel = document.getElementById('dashboard-panel');
  const welcomeMsg = document.getElementById('dashboard-welcome-msg');
  const userEmailText = document.getElementById('dashboard-user-email');
  const logoutBtn = document.getElementById('btn-dash-logout');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const avatarCircle = document.getElementById('dashboard-avatar-circle');

  // ── Tab switching (Login / Register) ──
  tabLogin?.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    panelLogin.classList.add('active');
    panelRegister.classList.remove('active');
  });

  tabRegister?.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    panelRegister.classList.add('active');
    panelLogin.classList.remove('active');
  });

  // ── Dashboard panel navigation ──
  const allPanelBtns = document.querySelectorAll('.dashboard-link[data-panel]');
  const allPanels = {
    orders:   document.getElementById('panel-orders'),
    wishlist: document.getElementById('panel-wishlist'),
    profile:  document.getElementById('panel-profile'),
    address:  document.getElementById('panel-address'),
    password: document.getElementById('panel-password'),
  };

  function switchDashPanel(panelName) {
    allPanelBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.panel === panelName);
    });
    Object.entries(allPanels).forEach(([key, el]) => {
      if (el) el.style.display = key === panelName ? 'block' : 'none';
    });
    if (panelName === 'wishlist') renderDashWishlist();
    if (panelName === 'orders')   renderDashOrders();
    if (panelName === 'profile')  loadProfileForm();
    if (panelName === 'address')  loadAddressForm();
  }

  allPanelBtns.forEach(btn => {
    btn.addEventListener('click', () => switchDashPanel(btn.dataset.panel));
  });

  // ── Order History ──
  const sampleOrders = [
    { id: 'AB-9042', date: 'June 11, 2026', items: 1, total: '$1,250', status: 'delivered' },
    { id: 'AB-8831', date: 'May 28, 2026',  items: 2, total: '$2,600', status: 'pending' },
    { id: 'AB-8120', date: 'April 14, 2026', items: 1, total: '$1,550', status: 'processing' },
  ];

  function renderDashOrders() {
    const container = document.getElementById('orders-list-container');
    const emptyMsg  = document.getElementById('orders-empty-msg');
    if (!container) return;

    // Merge sample + any cart-derived orders from localStorage
    let orders = [];
    try { orders = JSON.parse(localStorage.getItem('artMillionairesOrders') || '[]'); } catch(e) {}
    const allOrders = [...orders, ...sampleOrders];

    if (!allOrders.length) {
      container.innerHTML = '';
      if (emptyMsg) emptyMsg.style.display = 'block';
      return;
    }
    if (emptyMsg) emptyMsg.style.display = 'none';

    container.innerHTML = allOrders.map(o => `
      <div class="order-item">
        <div class="order-meta-info">
          <h4>Order #${o.id}</h4>
          <p>Placed on ${o.date} &bull; ${o.items} Item${o.items > 1 ? 's' : ''} &bull; ${o.total}</p>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <span class="order-status ${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span>
          <button class="order-view-btn" type="button">View</button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.order-view-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        showToast(`Order #${allOrders[i].id} details coming soon!`);
      });
    });
  }

  // ── Dashboard Wishlist ──
  function renderDashWishlist() {
    const grid  = document.getElementById('dash-wishlist-grid');
    const empty = document.getElementById('wishlist-empty-msg');
    if (!grid) return;

    let items = [];
    try { items = JSON.parse(localStorage.getItem('artMillionairesWishlist') || '[]'); } catch(e) {}

    if (!items.length) {
      grid.innerHTML = '';
      if (empty) empty.style.display = 'block';
      return;
    }
    if (empty) empty.style.display = 'none';

    grid.innerHTML = items.map((item, idx) => `
      <div class="dash-wishlist-card">
        <img src="${item.image}" alt="${item.title}" class="dash-wishlist-img">
        <div class="dash-wishlist-info">
          <p class="dash-wishlist-title">${item.title}</p>
          <p class="dash-wishlist-price">$${item.price.toLocaleString()}</p>
        </div>
        <div class="dash-wishlist-actions">
          <button class="btn btn-primary dash-wl-buy" data-idx="${idx}" type="button" style="font-size:0.72rem;padding:6px;">Buy Now</button>
          <button class="btn dash-wl-remove" data-idx="${idx}" type="button" style="font-size:0.72rem;padding:6px;background:transparent;border:1px solid rgba(220,53,69,0.4);color:#e07070;">Remove</button>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.dash-wl-buy').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = items[btn.dataset.idx];
        addToCart(item.title, item.price, item.image);
      });
    });

    grid.querySelectorAll('.dash-wl-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        items.splice(btn.dataset.idx, 1);
        localStorage.setItem('artMillionairesWishlist', JSON.stringify(items));
        renderDashWishlist();
        showToast('Removed from wishlist!');
      });
    });
  }

  // ── Profile Form ──
  function loadProfileForm() {
    try {
      const profile = JSON.parse(localStorage.getItem('artMillionairesProfile') || '{}');
      const email = localStorage.getItem(accountStorageKey) || '';
      const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
      setVal('profile-fname',   profile.fname);
      setVal('profile-lname',   profile.lname);
      setVal('profile-display', profile.display);
      setVal('profile-email',   email);
      setVal('profile-phone',   profile.phone);
    } catch(e) {}
  }

  document.getElementById('profile-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const getVal = id => document.getElementById(id)?.value.trim() || '';
    const profile = {
      fname:   getVal('profile-fname'),
      lname:   getVal('profile-lname'),
      display: getVal('profile-display'),
      phone:   getVal('profile-phone'),
    };
    localStorage.setItem('artMillionairesProfile', JSON.stringify(profile));
    const fb = document.getElementById('profile-feedback');
    if (fb) { fb.textContent = '✓ Profile saved successfully!'; fb.className = 'dash-form-feedback'; }
    if (avatarCircle && profile.fname) avatarCircle.textContent = profile.fname[0].toUpperCase();
    if (welcomeMsg && profile.fname) welcomeMsg.textContent = `Welcome, ${profile.fname}!`;
    showToast('Profile updated!');
  });

  // ── Address Form ──
  function loadAddressForm() {
    try {
      const addr = JSON.parse(localStorage.getItem('artMillionairesAddress') || '{}');
      const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
      setVal('addr-fname',   addr.fname);
      setVal('addr-lname',   addr.lname);
      setVal('addr-street',  addr.street);
      setVal('addr-street2', addr.street2);
      setVal('addr-city',    addr.city);
      setVal('addr-state',   addr.state);
      setVal('addr-zip',     addr.zip);
      setVal('addr-country', addr.country);
      setVal('addr-phone',   addr.phone);
    } catch(e) {}
  }

  document.getElementById('address-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const getVal = id => document.getElementById(id)?.value.trim() || '';
    const addr = {
      fname: getVal('addr-fname'), lname: getVal('addr-lname'),
      street: getVal('addr-street'), street2: getVal('addr-street2'),
      city: getVal('addr-city'), state: getVal('addr-state'),
      zip: getVal('addr-zip'), country: getVal('addr-country'), phone: getVal('addr-phone'),
    };
    localStorage.setItem('artMillionairesAddress', JSON.stringify(addr));
    const fb = document.getElementById('address-feedback');
    if (fb) { fb.textContent = '✓ Address saved successfully!'; fb.className = 'dash-form-feedback'; }
    showToast('Address saved!');
  });

  // ── Password Change ──
  document.getElementById('password-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const fb = document.getElementById('password-feedback');
    const current = document.getElementById('pwd-current')?.value || '';
    const newPwd  = document.getElementById('pwd-new')?.value || '';
    const confirm = document.getElementById('pwd-confirm')?.value || '';
    const storedPwd = localStorage.getItem('artMillionairesPassword') || 'password';

    if (current !== storedPwd) {
      if (fb) { fb.textContent = '✗ Current password is incorrect.'; fb.className = 'dash-form-feedback error'; }
      return;
    }
    if (newPwd.length < 6) {
      if (fb) { fb.textContent = '✗ New password must be at least 6 characters.'; fb.className = 'dash-form-feedback error'; }
      return;
    }
    if (newPwd !== confirm) {
      if (fb) { fb.textContent = '✗ Passwords do not match.'; fb.className = 'dash-form-feedback error'; }
      return;
    }
    localStorage.setItem('artMillionairesPassword', newPwd);
    if (fb) { fb.textContent = '✓ Password updated successfully!'; fb.className = 'dash-form-feedback'; }
    document.getElementById('password-form').reset();
    showToast('Password updated!');
  });

  // ── Update Account UI ──
  function updateAccountUI() {
    const activeUser = localStorage.getItem(accountStorageKey);
    if (activeUser) {
      if (authCard) authCard.style.display = 'none';
      if (dashboardPanel) dashboardPanel.style.display = 'grid';

      // Load saved name if available
      let displayName = activeUser;
      try {
        const profile = JSON.parse(localStorage.getItem('artMillionairesProfile') || '{}');
        if (profile.fname) displayName = profile.fname + (profile.lname ? ' ' + profile.lname : '');
        if (avatarCircle) avatarCircle.textContent = (profile.fname || activeUser)[0].toUpperCase();
      } catch(e) { if (avatarCircle) avatarCircle.textContent = activeUser[0].toUpperCase(); }

      if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${displayName.split(' ')[0]}!`;
      if (userEmailText) userEmailText.textContent = activeUser;

      // Show orders by default
      switchDashPanel('orders');

      document.querySelectorAll('.wood-menu-btn span').forEach(span => {
        if (span.textContent === 'Login') span.textContent = 'Dashboard';
      });
    } else {
      if (authCard) authCard.style.display = 'block';
      if (dashboardPanel) dashboardPanel.style.display = 'none';
    }
  }

  registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput  = document.getElementById('register-name');
    const emailInput = document.getElementById('register-email');
    const pwdInput   = document.getElementById('register-password');
    const email = emailInput?.value.trim();
    const name  = nameInput?.value.trim();
    const pwd   = pwdInput?.value || '';
    if (email) {
      localStorage.setItem(accountStorageKey, email);
      if (pwd) localStorage.setItem('artMillionairesPassword', pwd);
      if (name) {
        const parts = name.split(' ');
        localStorage.setItem('artMillionairesProfile', JSON.stringify({ fname: parts[0], lname: parts.slice(1).join(' ') }));
      }
      showToast('Account created successfully!');
      registerForm.reset();
      updateAccountUI();
    }
  });

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('login-email');
    const pwdInput   = document.getElementById('login-password');
    const email = emailInput?.value.trim();
    const pwd   = pwdInput?.value || '';
    if (email) {
      // Basic password check if one was set during registration
      const storedPwd = localStorage.getItem('artMillionairesPassword');
      if (storedPwd && pwd && pwd !== storedPwd) {
        showToast('Incorrect password. Please try again.');
        return;
      }
      localStorage.setItem(accountStorageKey, email);
      showToast('Signed in successfully!');
      loginForm.reset();
      updateAccountUI();
    }
  });

  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem(accountStorageKey);
    showToast('Signed out successfully!');
    updateAccountUI();
  });

  updateAccountUI();



  // Redirect checkout action to account.html if not signed in, else process checkout toast
  checkoutBtn?.addEventListener('click', () => {
    if (!cartItems.length) {
      return;
    }
    const activeUser = localStorage.getItem(accountStorageKey);
    if (!activeUser) {
      showToast('Please sign in or create an account to checkout.');
      closeCart();
      setTimeout(() => {
        window.location.href = 'account.html';
      }, 1500);
    } else {
      showToast('Thank you for your order! Checkout process completed.');
      cartItems = [];
      persistCart();
      renderCart();
      closeCart();
    }
  });

  // ── Unified Search (Desktop + Mobile) ──
  const searchInput    = document.getElementById('desktop-search-input');
  const searchBtn      = document.getElementById('desktop-search-btn');
  const mobileSearchInput = document.getElementById('mobile-search-input');
  const mobileSearchBtn   = document.getElementById('mobile-search-btn');

  const isIndexPage = window.location.pathname.endsWith('index.html') ||
                      window.location.pathname === '/' ||
                      window.location.pathname.endsWith('/');

  // ── Desktop suggestions dropdown ──
  const searchBox = document.querySelector('.header-search-box');
  let desktopDropdown = document.getElementById('search-suggestions');
  if (searchBox && !desktopDropdown) {
    desktopDropdown = document.createElement('div');
    desktopDropdown.id = 'search-suggestions';
    desktopDropdown.className = 'search-suggestions-dropdown';
    searchBox.appendChild(desktopDropdown);
  }

  // ── Mobile suggestions dropdown ──
  const mobileSearchRow = document.querySelector('.mobile-search-row');
  let mobileDropdown = document.getElementById('mobile-search-suggestions');
  if (mobileSearchRow && !mobileDropdown) {
    mobileDropdown = document.createElement('div');
    mobileDropdown.id = 'mobile-search-suggestions';
    mobileDropdown.className = 'search-suggestions-dropdown mobile-suggestions';
    mobileSearchRow.style.position = 'relative';
    mobileSearchRow.appendChild(mobileDropdown);
  }

  // ── Core: render suggestions into a given dropdown ──
  function renderSuggestions(query, dropdown, inputEl) {
    if (!dropdown) return;
    if (!query) { dropdown.classList.remove('show'); return; }

    const matches = allProductsCatalog.filter(item =>
      item.title.toLowerCase().includes(query) ||
      (item.details && item.details.toLowerCase().includes(query))
    );

    dropdown.innerHTML = '';
    dropdown.classList.add('show');

    if (matches.length === 0) {
      dropdown.innerHTML = `<div class="search-suggestions-empty">No products found for "${query}"</div>`;
      return;
    }

    const header = document.createElement('div');
    header.className = 'search-suggestion-header';
    header.textContent = 'Products Found';
    dropdown.appendChild(header);

    matches.forEach(item => {
      const div = document.createElement('div');
      div.className = 'search-suggestion-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="search-suggestion-thumb">
        <div class="search-suggestion-info">
          <h4 class="search-suggestion-title">${item.title}</h4>
          <p class="search-suggestion-details" style="font-size:0.72rem;color:rgba(239,232,220,0.5);margin:0;text-align:left;">${item.details || ''}</p>
          <div class="search-suggestion-price">${formatPrice(item.price)}</div>
        </div>
        <button class="search-suggestion-add-btn" type="button">+ Add</button>
      `;

      div.addEventListener('click', (e) => {
        if (e.target.closest('.search-suggestion-add-btn')) {
          addToCart(item.title, item.price, item.image);
          dropdown.classList.remove('show');
          if (inputEl) inputEl.value = '';
          return;
        }

        // If not on index page — navigate to index with hash
        if (!isIndexPage) {
          window.location.href = `index.html#collections`;
          return;
        }

        // On index page — scroll to product card
        const productCards = document.querySelectorAll('.product-card');
        let foundCard = null;
        productCards.forEach(card => {
          if ((card.querySelector('.product-title')?.textContent.trim() || '') === item.title) {
            foundCard = card;
          }
        });
        if (foundCard) {
          foundCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          foundCard.classList.remove('highlight-glow');
          void foundCard.offsetWidth;
          foundCard.classList.add('highlight-glow');
        }
        dropdown.classList.remove('show');
        if (inputEl) inputEl.value = '';
      });

      dropdown.appendChild(div);
    });
  }

  // ── Desktop input events ──
  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    renderSuggestions(q, desktopDropdown, searchInput);
  });
  searchInput?.addEventListener('focus', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q) renderSuggestions(q, desktopDropdown, searchInput);
  });
  searchBtn?.addEventListener('click', () => {
    const q = searchInput?.value.toLowerCase().trim() || '';
    if (!isIndexPage && q) { window.location.href = `index.html#collections`; return; }
    renderSuggestions(q, desktopDropdown, searchInput);
  });

  // ── Mobile input events ──
  mobileSearchInput?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    renderSuggestions(q, mobileDropdown, mobileSearchInput);
  });
  mobileSearchInput?.addEventListener('focus', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q) renderSuggestions(q, mobileDropdown, mobileSearchInput);
  });
  mobileSearchBtn?.addEventListener('click', () => {
    const q = mobileSearchInput?.value.toLowerCase().trim() || '';
    if (!isIndexPage && q) { window.location.href = `index.html#collections`; return; }
    renderSuggestions(q, mobileDropdown, mobileSearchInput);
  });
  mobileSearchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = mobileSearchInput.value.toLowerCase().trim();
      if (!isIndexPage && q) { window.location.href = `index.html#collections`; return; }
      renderSuggestions(q, mobileDropdown, mobileSearchInput);
    }
  });
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = searchInput.value.toLowerCase().trim();
      if (!isIndexPage && q) { window.location.href = `index.html#collections`; return; }
      renderSuggestions(q, desktopDropdown, searchInput);
    }
  });

  // ── Close dropdowns on outside click ──
  document.addEventListener('click', (e) => {
    if (desktopDropdown && searchBox && !searchBox.contains(e.target)) {
      desktopDropdown.classList.remove('show');
    }
    if (mobileDropdown && mobileSearchRow && !mobileSearchRow.contains(e.target)) {
      mobileDropdown.classList.remove('show');
    }
  });







  // Share functionality
  const shareBtn = document.getElementById('header-share-btn');
  
  function handleShareSuccess() {
    const span = shareBtn?.querySelector('span');
    if (span) {
      const originalText = span.textContent;
      span.textContent = '✓ Copied!';
      showToast('🔗 Page link copied to clipboard!');
      setTimeout(() => {
        span.textContent = originalText;
      }, 2500);
    } else {
      showToast('🔗 Page link copied to clipboard!');
    }
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      handleShareSuccess();
    } catch (err) {
      showToast('Failed to copy link.');
    }
    document.body.removeChild(textArea);
  }

  shareBtn?.addEventListener('click', () => {
    const shareUrl = window.location.href;

    // Always copy link to clipboard first
    const doCopy = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          handleShareSuccess();
        }).catch(() => {
          fallbackCopyText(shareUrl);
        });
      } else {
        fallbackCopyText(shareUrl);
      }
    };

    // On mobile with native share — show share sheet AND copy
    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
      doCopy();
      navigator.share({
        title: 'Art Billionaires',
        text: 'Discover original, hand-painted canvas artworks by Art Billionaires.',
        url: shareUrl
      }).catch(err => console.log(err));
    } else {
      // Desktop: just copy link and notify
      doCopy();
    }
  });

  // Currency Dropdown Toggle
  const currencyBtn = document.getElementById('header-currency-btn');
  const currencyDropdown = document.getElementById('header-currency-dropdown');

  currencyBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currencyDropdown?.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    currencyDropdown?.classList.remove('show');
  });

  currencyDropdown?.addEventListener('click', (e) => {
    const option = e.target.closest('.currency-option');
    if (option) {
      const currency = option.getAttribute('data-currency');
      updateCurrency(currency);
    }
  });

  // Luxury Toast Utility
  function showToast(message) {
    let toast = document.getElementById('luxury-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'luxury-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = 'show';
    setTimeout(() => {
      toast.className = '';
    }, 3000);
  }

  // Bind Order and Wishlist buttons for interactive toast feedback
  document.getElementById('header-wishlist-btn')?.addEventListener('click', () => {
    showToast('Your Wishlist is currently empty.');
  });
  document.getElementById('header-order-btn')?.addEventListener('click', () => {
    showToast('You have no active orders yet.');
  });

  loadSavedState();

  // --- 2b. Back To Top ---
  const backToTopButton = document.getElementById('back-to-top');

  if (backToTopButton) {
    function updateBackToTopVisibility() {
      backToTopButton.classList.toggle('visible', window.scrollY > 500);
    }

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateBackToTopVisibility);
    updateBackToTopVisibility();
  }


  // --- 3. Infinite Scroll Marquee Setup ---
  // Clone marquee items to ensure seamless scrolling
  const marqueeTrack = document.querySelector('.logo-bar__track');
  if (marqueeTrack) {
    const originalContent = marqueeTrack.innerHTML;
    // Clone twice to handle very wide viewports
    marqueeTrack.innerHTML = originalContent + originalContent + originalContent;
  }

  // --- 4. Reviews Carousel + Read More ---
  const reviewTextLimit = 112;
  const reviewTexts = document.querySelectorAll('.review-text');

  reviewTexts.forEach(text => {
    const fullText = text.textContent.trim();

    if (fullText.length <= reviewTextLimit) {
      return;
    }

    const shortText = `${fullText.slice(0, reviewTextLimit).trim()}...`;
    const button = document.createElement('button');

    text.dataset.fullText = fullText;
    text.dataset.shortText = shortText;
    text.textContent = shortText;

    button.type = 'button';
    button.className = 'review-read-toggle';
    button.textContent = 'Read more';
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      text.textContent = isExpanded ? text.dataset.shortText : text.dataset.fullText;
      button.textContent = isExpanded ? 'Read more' : 'Read less';
      button.setAttribute('aria-expanded', String(!isExpanded));
    });

    text.insertAdjacentElement('afterend', button);
  });

  const reviewsCarousel = document.querySelector('.reviews-carousel');

  if (reviewsCarousel) {
    const reviewsTrack = reviewsCarousel.querySelector('.reviews-grid');
    const prevButton = reviewsCarousel.querySelector('.reviews-arrow-prev');
    const nextButton = reviewsCarousel.querySelector('.reviews-arrow-next');

    function getReviewStep() {
      const firstCard = reviewsTrack.querySelector('.review-card');
      const trackStyles = window.getComputedStyle(reviewsTrack);
      const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || 0);

      return firstCard ? firstCard.getBoundingClientRect().width + gap : 0;
    }

    function updateReviewButtons() {
      const maxScroll = reviewsTrack.scrollWidth - reviewsTrack.clientWidth - 2;
      prevButton.disabled = reviewsTrack.scrollLeft <= 2;
      nextButton.disabled = reviewsTrack.scrollLeft >= maxScroll;
    }

    prevButton.addEventListener('click', () => {
      reviewsTrack.scrollBy({ left: -getReviewStep(), behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
      reviewsTrack.scrollBy({ left: getReviewStep(), behavior: 'smooth' });
    });

    reviewsTrack.addEventListener('scroll', updateReviewButtons);
    window.addEventListener('resize', updateReviewButtons);
    updateReviewButtons();
  }

  // --- 5. FAQ Accordion Logic ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question-btn');
    const panel = item.querySelector('.faq-answer-panel');

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQ items first
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherPanel = otherItem.querySelector('.faq-answer-panel');
          otherPanel.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        // Set max-height to the scrollHeight of the panel to trigger CSS transition
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Re-calculate active FAQ panels on window resize
  window.addEventListener('resize', () => {
    const activeFaqItem = document.querySelector('.faq-item.active');
    if (activeFaqItem) {
      const panel = activeFaqItem.querySelector('.faq-answer-panel');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });

  // --- 5. Hero Slideshow Controller ---
  const heroSlides = document.querySelectorAll('#hero .hero-slide');
  const heroContents = document.querySelectorAll('#hero .hero-content');
  const heroDots = document.querySelectorAll('#hero .hero-pagination-dots .dot');
  const prevArrow = document.getElementById('hero-prev');
  const nextArrow = document.getElementById('hero-next');
  const playPauseBtn = document.getElementById('hero-play-pause');
  const pauseIcon = playPauseBtn?.querySelector('.icon-pause');
  const playIcon = playPauseBtn?.querySelector('.icon-play');
  
  let currentHeroSlideIndex = 0;
  let heroSlideshowInterval;
  let isHeroSlideshowPlaying = true;

  function showHeroSlide(index) {
    if (!heroSlides.length) return;

    // Wrap around index
    if (index >= heroSlides.length) {
      currentHeroSlideIndex = 0;
    } else if (index < 0) {
      currentHeroSlideIndex = heroSlides.length - 1;
    } else {
      currentHeroSlideIndex = index;
    }

    // Toggle active classes on slides
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentHeroSlideIndex);
    });

    // Toggle active classes on content overlays
    heroContents.forEach((content, i) => {
      content.classList.toggle('active', i === currentHeroSlideIndex);
    });

    // Toggle active classes on dots
    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentHeroSlideIndex);
    });
  }

  function startHeroSlideshow() {
    stopHeroSlideshow();
    if (isHeroSlideshowPlaying) {
      heroSlideshowInterval = setInterval(() => {
        showHeroSlide(currentHeroSlideIndex + 1);
      }, 6000); // Change slide every 6 seconds
    }
  }

  function stopHeroSlideshow() {
    if (heroSlideshowInterval) {
      clearInterval(heroSlideshowInterval);
    }
  }

  function updatePlayPauseUI() {
    if (!playPauseBtn || !pauseIcon || !playIcon) return;
    if (isHeroSlideshowPlaying) {
      pauseIcon.style.display = 'block';
      playIcon.style.display = 'none';
      playPauseBtn.setAttribute('aria-label', 'Pause Slideshow');
    } else {
      pauseIcon.style.display = 'none';
      playIcon.style.display = 'block';
      playPauseBtn.setAttribute('aria-label', 'Play Slideshow');
    }
  }

  // Bind click handlers to navigation controls
  prevArrow?.addEventListener('click', () => {
    showHeroSlide(currentHeroSlideIndex - 1);
    if (isHeroSlideshowPlaying) {
      startHeroSlideshow(); // Reset interval
    }
  });

  nextArrow?.addEventListener('click', () => {
    showHeroSlide(currentHeroSlideIndex + 1);
    if (isHeroSlideshowPlaying) {
      startHeroSlideshow(); // Reset interval
    }
  });

  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showHeroSlide(index);
      if (isHeroSlideshowPlaying) {
        startHeroSlideshow(); // Reset interval
      }
    });
  });

  // Play/Pause button handler
  playPauseBtn?.addEventListener('click', () => {
    isHeroSlideshowPlaying = !isHeroSlideshowPlaying;
    updatePlayPauseUI();
    if (isHeroSlideshowPlaying) {
      startHeroSlideshow();
    } else {
      stopHeroSlideshow();
    }
  });

  // Start slideshow on load
  if (heroSlides.length > 0) {
    isHeroSlideshowPlaying = true;
    updatePlayPauseUI();
    startHeroSlideshow();
  }

  // --- Pre-Footer Form Submit Handlers ---
  const contactForm = document.getElementById('pre-footer-contact-form');
  const newsletterForm = document.getElementById('pre-footer-newsletter-form');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you shortly.');
    contactForm.reset();
  });

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
  });

  // --- Dynamic Custom Dropdown Selector with Flags ---
  document.querySelectorAll('.luxury-phone-prefix-select').forEach(select => {
    const parent = select.closest('.luxury-phone-input-group');
    if (!parent) return;

    // Create custom container
    const customContainer = document.createElement('div');
    customContainer.className = 'custom-select-container';

    // Create trigger
    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';
    
    const triggerFlag = document.createElement('img');
    triggerFlag.className = 'custom-select-flag';
    triggerFlag.alt = 'Flag';
    
    const triggerText = document.createElement('span');
    
    trigger.appendChild(triggerFlag);
    trigger.appendChild(triggerText);
    customContainer.appendChild(trigger);

    // Create dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'custom-select-dropdown';

    // Populate dropdown options from native select
    Array.from(select.options).forEach(opt => {
      if (opt.disabled) return; // Skip separator
      
      const countryCode = opt.getAttribute('data-code');
      if (!countryCode) return;

      const optionDiv = document.createElement('div');
      optionDiv.className = 'custom-option';
      optionDiv.setAttribute('data-value', opt.value);
      optionDiv.setAttribute('data-code', countryCode);
      optionDiv.setAttribute('data-text', opt.textContent);

      const flag = document.createElement('img');
      flag.src = `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
      flag.alt = `${countryCode.toUpperCase()} Flag`;
      flag.loading = 'lazy';

      const label = document.createElement('span');
      // Strip the emoji symbol from option text (since we display the image)
      const cleanText = opt.textContent.replace(/[^\x00-\x7F]/g, "").trim();
      label.textContent = cleanText;

      optionDiv.appendChild(flag);
      optionDiv.appendChild(label);
      dropdown.appendChild(optionDiv);

      // Handle custom option click
      optionDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        select.value = opt.value;
        // Trigger native change event
        select.dispatchEvent(new Event('change'));
        closeDropdown();
      });
    });

    customContainer.appendChild(dropdown);
    
    // Insert custom select wrapper before the hidden native select
    parent.insertBefore(customContainer, select);

    // Helper to update trigger UI
    function updateTriggerUI() {
      const selectedOpt = select.options[select.selectedIndex];
      if (!selectedOpt) return;
      const code = selectedOpt.getAttribute('data-code');
      if (code) {
        triggerFlag.src = `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
        triggerFlag.style.display = 'block';
      } else {
        triggerFlag.style.display = 'none';
      }
      triggerText.textContent = selectedOpt.value;
    }

    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close other dropdowns
      document.querySelectorAll('.custom-select-dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      dropdown.classList.toggle('open');
    });

    function closeDropdown() {
      dropdown.classList.remove('open');
    }

    // Listen to changes on the hidden native select to update the custom UI
    select.addEventListener('change', updateTriggerUI);

    // Handle form reset to update UI after delay
    const form = select.closest('form');
    form?.addEventListener('reset', () => {
      setTimeout(updateTriggerUI, 50);
    });

    // Close on click outside
    document.addEventListener('click', closeDropdown);

    // Initial run to sync trigger
    updateTriggerUI();
  });

  // ==========================================================================
  // Masonry Layout and Card Rendering Engine
  // ==========================================================================

  function applyMasonry(grid) {
    if (typeof grid === 'string') {
      grid = document.getElementById(grid);
    }
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.product-card')).filter(card => {
      return card.style.display !== 'none' && !card.classList.contains('hidden');
    });

    if (cards.length === 0) {
      grid.style.height = '';
      return;
    }

    if (grid.classList.contains('list-view')) {
      grid.classList.remove('masonry-active');
      grid.style.height = '';
      cards.forEach(card => {
        card.style.position = '';
        card.style.width = '';
        card.style.left = '';
        card.style.top = '';
      });
      return;
    }

    grid.classList.add('masonry-active');

    const gridWidth = grid.getBoundingClientRect().width;
    let cols = 3;
    if (window.innerWidth <= 768) {
      cols = 1;
    } else if (window.innerWidth <= 1024) {
      cols = 2;
    }

    const gap = 32;
    const colWidth = (gridWidth - (gap * (cols - 1))) / cols;

    const colHeights = new Array(cols).fill(0);

    cards.forEach(card => {
      card.style.position = 'absolute';
      card.style.width = `${colWidth}px`;
      
      let minCol = 0;
      for (let i = 1; i < cols; i++) {
        if (colHeights[i] < colHeights[minCol]) {
          minCol = i;
        }
      }

      card.style.left = `${minCol * (colWidth + gap)}px`;
      card.style.top = `${colHeights[minCol]}px`;

      const cardHeight = card.getBoundingClientRect().height;
      colHeights[minCol] += cardHeight + gap;
    });

    const maxHeight = Math.max(...colHeights);
    grid.style.height = `${maxHeight - gap}px`;
  }

  window.addEventListener('resize', () => {
    const homepageGrid = document.querySelector('.products-section .products-grid');
    if (homepageGrid) applyMasonry(homepageGrid);
    const collectionsGrid = document.getElementById('collections-grid');
    if (collectionsGrid) applyMasonry(collectionsGrid);
  });

  function createProductCard(item) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('data-stock', item.availability);

    const inWishlist = wishlistItems.some(wish => wish.title === item.title);
    const wishlistClass = inWishlist ? 'wishlist-toggle-btn in-wishlist' : 'wishlist-toggle-btn';

    card.innerHTML = `
      <div class="product-img-link">
        ${item.availability === 'out-of-stock' ? `
          <div class="sold-ribbon-wrapper">
            <span class="sold-ribbon">Sold</span>
          </div>
        ` : ''}
        <button class="${wishlistClass}" type="button" 
          data-product-title="${item.title}" 
          data-product-price="${item.price}"
          data-product-image="${item.image}" 
          aria-label="Add to Wishlist">
          <svg class="heart-icon" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" />
          </svg>
        </button>
        <a href="collections.html" class="museum-frame-link" style="display: block; text-decoration: none;">
          <div class="museum-frame">
            <div class="museum-frame-inner">
              <img src="${item.image}" alt="${item.title} Painting" class="product-img canvas-image" loading="lazy">
            </div>
          </div>
        </a>
        <div class="product-img-overlay">
          <button class="btn btn-primary product-buy-btn" type="button" 
            data-product-title="${item.title}"
            data-product-price="${item.price}"
            data-product-image="${item.image}"
            ${item.availability === 'out-of-stock' ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ''}>
            ${item.availability === 'out-of-stock' ? 'Sold Out' : 'Buy Now'}
          </button>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-title">${item.title}</h3>
        <div class="product-details">${item.details}</div>
        <div class="product-price" data-base-price="${item.price}">$${item.price.toLocaleString()}</div>
      </div>
    `;

    // Wishlist click
    const wishBtn = card.querySelector('.wishlist-toggle-btn');
    wishBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      toggleWishlist(item.title, item.price, item.image);
      const heartPath = wishBtn.querySelector('.heart-icon path');
      const nowInWishlist = wishlistItems.some(wish => wish.title === item.title);
      if (nowInWishlist) {
        wishBtn.classList.add('in-wishlist');
        heartPath.setAttribute('fill', 'currentColor');
      } else {
        wishBtn.classList.remove('in-wishlist');
        heartPath.setAttribute('fill', 'none');
      }
    });

    // Buy Now click
    const buyBtn = card.querySelector('.product-buy-btn');
    buyBtn.addEventListener('click', (e) => {
      if (item.availability === 'out-of-stock') return;
      e.stopPropagation();
      e.preventDefault();
      addToCart(item.title, item.price, item.image);
    });

    return card;
  }

  // --- Homepage Products Tab Filtering and Masonry ---
  const homepageGrid = document.querySelector('.products-section .products-grid');
  if (homepageGrid) {
    const homepageTabBtns = document.querySelectorAll('.selection-tab-btn');
    
    function renderHomepageProducts(tabValue) {
      homepageGrid.innerHTML = '';
      
      let filtered = allProductsCatalog;
      if (tabValue === 'available') {
        filtered = allProductsCatalog.filter(item => item.availability === 'in-stock');
      } else if (tabValue === 'sold') {
        filtered = allProductsCatalog.filter(item => item.availability === 'out-of-stock');
      }
      
      // Show exactly 12 painting cards
      const itemsToRender = filtered.slice(0, 12);
      
      itemsToRender.forEach(item => {
        const card = createProductCard(item);
        homepageGrid.appendChild(card);
        
        // Dynamic aspect ratio adjustment
        const img = card.querySelector('.canvas-image');
        const frame = card.querySelector('.museum-frame');
        if (img && frame) {
          const adjust = () => {
            const r = img.naturalWidth / img.naturalHeight;
            if (r) frame.style.setProperty('aspect-ratio', r, 'important');
          };
          if (img.complete) adjust();
          else img.addEventListener('load', adjust);
        }
      });
      
      updateCurrency(currentCurrency);
      
      const imgs = homepageGrid.querySelectorAll('img');
      imgs.forEach(img => {
        if (!img.complete) {
          img.addEventListener('load', () => applyMasonry(homepageGrid));
        }
      });
      applyMasonry(homepageGrid);
    }

    homepageTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        homepageTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tabValue = btn.getAttribute('data-tab');
        renderHomepageProducts(tabValue);
      });
    });

    // Initial render: default is "all"
    setTimeout(() => {
      renderHomepageProducts('all');
    }, 100);
  }


  // ==========================================================================
  // Wishlist Feature Integration Logic
  // ==========================================================================

  let wishlistItems = JSON.parse(localStorage.getItem('artMillionairesWishlist') || '[]');

  function updateWishlistUI() {
    const toggleBtns = document.querySelectorAll('.wishlist-toggle-btn');
    toggleBtns.forEach(btn => {
      const title = btn.getAttribute('data-product-title');
      const inWishlist = wishlistItems.some(item => item.title === title);
      if (inWishlist) {
        btn.classList.add('in-wishlist');
      } else {
        btn.classList.remove('in-wishlist');
      }
    });

    // Also sync the accounts page wishlist tab
    renderAccountWishlist();
    // Also sync the wishlist page grid
    renderWishlistPage();
  }

  function toggleWishlist(title, price, image) {
    const existingIndex = wishlistItems.findIndex(item => item.title === title);
    if (existingIndex > -1) {
      wishlistItems.splice(existingIndex, 1);
      showToast('Removed from Wishlist!');
    } else {
      wishlistItems.push({ title, price, image });
      showToast('Added to Wishlist!');
    }
    localStorage.setItem('artMillionairesWishlist', JSON.stringify(wishlistItems));
    updateWishlistUI();
  }

  // Bind all card heart wishlist buttons
  document.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const title = btn.getAttribute('data-product-title');
      const price = parseFloat(btn.getAttribute('data-product-price'));
      const image = btn.getAttribute('data-product-image');
      toggleWishlist(title, price, image);
    });
  });

  // Redirect menu wishlist buttons to wishlist.html page
  document.querySelectorAll('#header-wishlist-btn, .js-wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'wishlist.html';
    });
  });

  // Render wishlist inside account dashboard panel
  function renderAccountWishlist() {
    const container = document.getElementById('wishlist-items-container');
    const emptyMsg = document.getElementById('wishlist-empty-msg');
    if (!container || !emptyMsg) return;

    container.innerHTML = '';

    if (wishlistItems.length === 0) {
      emptyMsg.style.display = 'block';
      container.style.display = 'none';
      return;
    }

    emptyMsg.style.display = 'none';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
    container.style.gap = '20px';

    wishlistItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'dashboard-wishlist-item';
      card.style.background = '#110c08';
      card.style.border = '1px solid rgba(201, 164, 92, 0.2)';
      card.style.borderRadius = '6px';
      card.style.padding = '12px';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.gap = '8px';

      card.innerHTML = `
        <div style="width: 100%; height: auto; display: flex; align-items: center; justify-content: center; background: transparent; overflow: hidden; margin-bottom: 8px;">
          <img src="${item.image}" alt="${item.title}" style="width: 100%; height: auto; max-height: 250px; object-fit: contain; display: block;">
        </div>
        <h4 style="font-family: var(--font-serif); font-size: 0.95rem; color: #ffeac8; margin: 4px 0 0 0;">${item.title}</h4>
        <div style="font-family: var(--font-sans); font-size: 0.9rem; color: #d4b06f; font-weight: 600;">$${item.price.toLocaleString()}</div>
        <div style="display: flex; gap: 8px; margin-top: auto;">
          <button class="btn btn-primary dash-wishlist-buy" type="button" style="flex: 1; padding: 6px 12px; font-size: 0.8rem; border-radius: 4px;">Buy Now</button>
          <button class="dash-wishlist-remove" type="button" style="background: transparent; border: 1px solid #dc3545; color: #dc3545; border-radius: 4px; padding: 6px 10px; cursor: pointer; font-size: 0.8rem; transition: all 0.3s ease;">Remove</button>
        </div>
      `;

      card.querySelector('.dash-wishlist-buy').addEventListener('click', () => {
        addToCart(item.title, item.price, item.image);
      });

      card.querySelector('.dash-wishlist-remove').addEventListener('click', () => {
        wishlistItems = wishlistItems.filter(w => w.title !== item.title);
        localStorage.setItem('artMillionairesWishlist', JSON.stringify(wishlistItems));
        showToast('Removed from Wishlist!');
        updateWishlistUI();
      });

      container.appendChild(card);
    });
  }

  // Render wishlist page grid (wishlist.html)
  function renderWishlistPage() {
    const grid = document.getElementById('wishlist-page-grid');
    const emptyState = document.getElementById('wishlist-page-empty');
    if (!grid || !emptyState) return;

    grid.innerHTML = '';

    if (wishlistItems.length === 0) {
      emptyState.style.display = 'block';
      grid.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    grid.style.display = 'grid';

    wishlistItems.forEach(item => {
      const card = document.createElement('article');
      card.className = 'wishlist-card';
      
      card.innerHTML = `
        <div class="product-img-link" style="width: 100%; height: auto; display: flex; align-items: center; justify-content: center; background: transparent; overflow: hidden;">
          <img src="${item.image}" alt="${item.title}" class="product-img canvas-image" style="width: 100%; height: auto; max-height: 250px; object-fit: contain; display: block;">
        </div>
        <div class="product-info" style="padding: 18px 20px; display: flex; flex-direction: column; gap: 8px;">
          <h3 class="product-title" style="margin: 0; font-family: var(--font-serif); font-size: 1.15rem; color: #ffeac8;">${item.title}</h3>
          <div class="product-price" style="font-family: var(--font-sans); font-size: 1.1rem; color: #d4b06f; font-weight: 600;">$${item.price.toLocaleString()}</div>
        </div>
        <div class="wishlist-card-actions">
          <button class="btn btn-primary wishlist-card-buy-btn" type="button">Buy Now</button>
          <button class="wishlist-card-remove-btn" type="button" aria-label="Remove from wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
              <line x1="20" y1="4" x2="8.12" y2="15.88"/>
              <line x1="14.47" y1="14.48" x2="20" y2="20"/>
              <line x1="8.12" y1="8.12" x2="12" y2="12"/>
            </svg>
          </button>
        </div>
      `;

      card.querySelector('.wishlist-card-buy-btn').addEventListener('click', () => {
        addToCart(item.title, item.price, item.image);
      });

      card.querySelector('.wishlist-card-remove-btn').addEventListener('click', () => {
        wishlistItems = wishlistItems.filter(w => w.title !== item.title);
        localStorage.setItem('artMillionairesWishlist', JSON.stringify(wishlistItems));
        showToast('Removed from Wishlist!');
        updateWishlistUI();
      });

      grid.appendChild(card);
    });
  }

  // Initialize wishlist states
  updateWishlistUI();

  // --- Masterpieces Slider Logic ---
  const masterpiecesTrack = document.getElementById('masterpieces-track');
  const masterpiecesPrev = document.getElementById('masterpieces-prev');
  const masterpiecesNext = document.getElementById('masterpieces-next');
  const masterpiecesThumbTrack = document.getElementById('masterpieces-thumbnails-track');
  const masterpiecesNumericPag = document.getElementById('masterpieces-numeric-pagination');

  if (masterpiecesTrack && masterpiecesPrev && masterpiecesNext) {
    let currentIndex = 0;
    const slides = masterpiecesTrack.querySelectorAll('.masterpieces-slide');
    const totalSlides = slides.length;
    const mobileCounter = document.getElementById('mp-mobile-counter');

    // Dynamically generate thumbnails and numeric pagination
    const thumbItems = [];
    const numItems = [];

    slides.forEach((slide, idx) => {
      const img = slide.querySelector('img');
      const imgSrc = img ? img.getAttribute('src') : '';
      const imgAlt = img ? img.getAttribute('alt') : `Slide ${idx + 1}`;

      // Create thumbnail
      if (masterpiecesThumbTrack) {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'masterpieces-thumb-item' + (idx === 0 ? ' active' : '');
        thumbDiv.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}">`;
        thumbDiv.addEventListener('click', () => {
          currentIndex = idx;
          updateSlider();
        });
        masterpiecesThumbTrack.appendChild(thumbDiv);
        thumbItems.push(thumbDiv);
      }

      // Create numeric paginator item
      if (masterpiecesNumericPag) {
        const numSpan = document.createElement('span');
        numSpan.className = 'masterpieces-num-item' + (idx === 0 ? ' active' : '');
        numSpan.textContent = String(idx + 1).padStart(2, '0');
        numSpan.addEventListener('click', () => {
          currentIndex = idx;
          updateSlider();
        });
        masterpiecesNumericPag.appendChild(numSpan);
        numItems.push(numSpan);
      }
    });

    function updateSlider() {
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentIndex);
      });

      thumbItems.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentIndex);
      });

      numItems.forEach((num, idx) => {
        num.classList.toggle('active', idx === currentIndex);
      });

      // Update mobile counter (← 01 →)
      if (mobileCounter) {
        mobileCounter.textContent = String(currentIndex + 1).padStart(2, '0');
      }
    }

    masterpiecesPrev.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalSlides - 1; // Infinite loop to the end
      }
      updateSlider();
    });

    masterpiecesNext.addEventListener('click', () => {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // Infinite loop to the beginning
      }
      updateSlider();
    });

    // Run initial update
    updateSlider();
  }

  /* =========================================================
     TESTIMONIALS: Read More / Read Less Toggle
     ========================================================= */
  (function initTestimonialToggles() {
    const track = document.getElementById('testimonials-track');
    if (!track) return;

    // Duplicate all cards for seamless infinite loop
    const cards = Array.from(track.children);
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    // Wire up toggle buttons (use event delegation so clones work too)
    document.querySelector('.testimonials-marquee-wrapper').addEventListener('click', function(e) {
      const btn = e.target.closest('.tcard-toggle');
      if (!btn) return;

      const card = btn.closest('.tcard');
      if (!card) return;

      const isExpanded = card.classList.toggle('expanded');
      btn.textContent = isExpanded ? 'Read Less' : 'Read More';
      btn.setAttribute('aria-expanded', isExpanded);

      // Pause marquee when reading
      const track = document.querySelector('.testimonials-track');
      if (track) {
        track.style.animationPlayState = isExpanded ? 'paused' : '';
      }
    });
  })();

  /* =========================================================
     VIDEO SHOWCASE: Custom Video Player Controls
     ========================================================= */
  (function initVideoShowcase() {
    const video = document.getElementById('showcase-video');
    const overlay = document.getElementById('video-overlay');
    const btnPlayPause = document.getElementById('ctrl-play-pause');
    const btnMute = document.getElementById('ctrl-mute');
    const btnFullscreen = document.getElementById('ctrl-fullscreen');
    const progressBar = document.getElementById('ctrl-progress-wrapper');
    const progressFill = document.getElementById('ctrl-progress-fill');
    const progressThumb = document.getElementById('ctrl-progress-thumb');
    const timeCurrent = document.getElementById('ctrl-time-current');
    const timeDuration = document.getElementById('ctrl-time-duration');
    const videoWidget = document.querySelector('.video-widget');

    if (!video) return;

    // Helper: format time in MM:SS
    function formatTime(seconds) {
      if (isNaN(seconds) || seconds === Infinity) return '00:00';
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    // Update time displays and progress bar
    function updateProgress() {
      if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (progressThumb) progressThumb.style.left = `${percent}%`;
        if (timeCurrent) timeCurrent.textContent = formatTime(video.currentTime);
      }
    }

    // Set video duration when metadata loaded
    video.addEventListener('loadedmetadata', () => {
      if (timeDuration) timeDuration.textContent = formatTime(video.duration);
    });

    // Fallback if metadata already loaded or loadedmetadata event fires before listener
    if (video.readyState >= 1) {
      if (timeDuration) timeDuration.textContent = formatTime(video.duration);
    }

    video.addEventListener('timeupdate', updateProgress);

    // Toggle Play/Pause
    function togglePlay() {
      if (video.paused) {
        video.play();
        video.muted = false; // Unmute on explicit user interaction
        if (overlay) overlay.classList.add('hidden');
        if (videoWidget) videoWidget.classList.add('playing');
        updatePlayBtnState(true);
        updateMuteBtnState(false);
      } else {
        video.pause();
        if (overlay) overlay.classList.remove('hidden');
        if (videoWidget) videoWidget.classList.remove('playing');
        updatePlayBtnState(false);
      }
    }

    function updatePlayBtnState(isPlaying) {
      if (!btnPlayPause) return;
      const playIcon = btnPlayPause.querySelector('.play-icon');
      const pauseIcon = btnPlayPause.querySelector('.pause-icon');
      if (isPlaying) {
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
        btnPlayPause.setAttribute('aria-label', 'Pause');
      } else {
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        btnPlayPause.setAttribute('aria-label', 'Play');
      }
    }

    function updateMuteBtnState(isMuted) {
      if (!btnMute) return;
      const muteIcon = btnMute.querySelector('.volume-mute-icon');
      const upIcon = btnMute.querySelector('.volume-up-icon');
      if (isMuted) {
        if (muteIcon) muteIcon.style.display = 'block';
        if (upIcon) upIcon.style.display = 'none';
        btnMute.setAttribute('aria-label', 'Unmute');
      } else {
        if (muteIcon) muteIcon.style.display = 'none';
        if (upIcon) upIcon.style.display = 'block';
        btnMute.setAttribute('aria-label', 'Mute');
      }
    }

    // Click events
    if (overlay) overlay.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
    if (video) video.addEventListener('click', togglePlay);
    if (btnPlayPause) btnPlayPause.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });

    // Mute toggle
    if (btnMute) {
      btnMute.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        updateMuteBtnState(video.muted);
      });
    }

    // Seek on progress bar
    if (progressBar) {
      progressBar.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        if (video.duration) {
          video.currentTime = pos * video.duration;
          updateProgress();
        }
      });
    }

    // Fullscreen toggle
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
          if (videoWidget.requestFullscreen) {
            videoWidget.requestFullscreen();
          } else if (videoWidget.webkitRequestFullscreen) {
            videoWidget.webkitRequestFullscreen();
          } else if (videoWidget.msRequestFullscreen) {
            videoWidget.msRequestFullscreen();
          } else if (video.requestFullscreen) {
            video.requestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      });
    }

    // Listen to video element end event
    video.addEventListener('ended', () => {
      if (overlay) overlay.classList.remove('hidden');
      if (videoWidget) videoWidget.classList.remove('playing');
      updatePlayBtnState(false);
    });
  })();

  // ── YouTube Video Placeholder Click to Play ──
  const youtubeOverlay = document.getElementById('video-overlay');
  const youtubeVideoContainer = document.getElementById('youtube-video-container');
  if (youtubeOverlay && youtubeVideoContainer) {
    youtubeOverlay.addEventListener('click', () => {
      youtubeVideoContainer.innerHTML = `
        <iframe 
          class="video-player" 
          src="https://www.youtube.com/embed/X-pEUiJoeVM?autoplay=1&rel=0" 
          title="World Class Oil Paintings by Anand PKC"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
          style="width: 100%; height: 100%; object-fit: cover; display: block; border: none;">
        </iframe>
      `;
    });
  }

  // Click handlers for the two additional video cards
  const addVideoOverlay1 = document.getElementById('add-video-overlay-1');
  const addVideoContainer1 = document.getElementById('add-video-container-1');
  if (addVideoOverlay1 && addVideoContainer1) {
    addVideoOverlay1.addEventListener('click', () => {
      addVideoContainer1.innerHTML = `
        <iframe 
          class="video-player" 
          src="https://www.youtube.com/embed/HHSGL5xkppU?autoplay=1&rel=0" 
          title="World Class Oil Paintings by Anand PKC"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
          style="width: 100%; height: 100%; object-fit: cover; display: block; border: none;">
        </iframe>
      `;
    });
  }

  const addVideoOverlay2 = document.getElementById('add-video-overlay-2');
  const addVideoContainer2 = document.getElementById('add-video-container-2');
  if (addVideoOverlay2 && addVideoContainer2) {
    addVideoOverlay2.addEventListener('click', () => {
      addVideoContainer2.innerHTML = `
        <iframe 
          class="video-player" 
          src="https://www.youtube.com/embed/CIDhbnt3GeI?autoplay=1&rel=0" 
          title="Once Upon a Time in America"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
          style="width: 100%; height: 100%; object-fit: cover; display: block; border: none;">
        </iframe>
      `;
    });
  }

  // ── Collections Filtering, Pagination, and Sidebar States ──
  function initCollectionsFilter() {
    const grid = document.getElementById('collections-grid');
    if (!grid) return;

    // Dynamic category title/breadcrumb when URL has ?category=...
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      const categoryLabel = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase();
      
      // Update hero H1
      const heroTitle = document.querySelector('.inner-hero-banner-title');
      if (heroTitle) heroTitle.textContent = `${categoryLabel} Collection`;
      
      // Update hero description
      const heroDesc = document.querySelector('.inner-hero-banner-description');
      if (heroDesc) heroDesc.textContent = `\u2764 Explore our curated selection of museum-quality ${categoryLabel.toLowerCase()} oil paintings, masterfully crafted by Anand PKC \u2764`;
      
      // Update breadcrumb
      const breadcrumb = document.querySelector('.collections-breadcrumb');
      if (breadcrumb) {
        breadcrumb.innerHTML = `
          <a href="index.html">Home</a>
          <span class="breadcrumb-separator">&gt;</span>
          <a href="collections.html">Collections</a>
          <span class="breadcrumb-separator">&gt;</span>
          <span class="active-page">${categoryLabel}</span>
        `;
      }
      
      // Update page title tag
      document.title = `${categoryLabel} Collection - Art Billionaires`;
    }

    const sidebarInputs = document.querySelectorAll('#collections-sidebar input');
    const availabilityRadios = document.querySelectorAll('input[name="availability"]');
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const priceRangeRadios = document.querySelectorAll('input[name="price-range"]');
    const mediumCheckboxes = document.querySelectorAll('input[name="medium"]');
    const sortSelect = document.getElementById('sort-select');
    const clearBtn = document.getElementById('clear-filters-btn');
    const productsCount = document.getElementById('products-count');
    const loadMoreBtn = document.getElementById('load-more-btn');

    const sidebar = document.getElementById('collections-sidebar');
    const mobileFilterToggleBtn = document.getElementById('mobile-filter-toggle-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

    let visibleCount = 12;

    const gridBtn = document.getElementById('view-grid-btn');
    const listBtn = document.getElementById('view-list-btn');
    let currentLayout = localStorage.getItem('collections-layout-pref') || 'grid';

    function updateLayoutButtons() {
      if (!gridBtn || !listBtn) return;
      if (currentLayout === 'list') {
        gridBtn.classList.remove('active');
        listBtn.classList.add('active');
        grid.classList.add('list-view');
      } else {
        listBtn.classList.remove('active');
        gridBtn.classList.add('active');
        grid.classList.remove('list-view');
      }
    }

    if (gridBtn && listBtn) {
      gridBtn.addEventListener('click', () => {
        if (currentLayout === 'grid') return;
        currentLayout = 'grid';
        localStorage.setItem('collections-layout-pref', 'grid');
        updateLayoutButtons();
        filterAndRender();
      });

      listBtn.addEventListener('click', () => {
        if (currentLayout === 'list') return;
        currentLayout = 'list';
        localStorage.setItem('collections-layout-pref', 'list');
        updateLayoutButtons();
        filterAndRender();
      });
    }

    updateLayoutButtons();

    // Sidebar single active filter state machine
    function updateSidebarFilterStates() {
      sidebarInputs.forEach(input => {
        const label = input.closest('.filter-checkbox-label');
        if (!label) return;

        // Ensure all are enabled and not faded
        input.disabled = false;
        label.classList.remove('disabled');

        // Check if this input is active (checked)
        // Note: we ignore availability="all" since it represents no filter
        const isActive = input.checked && !(input.name === 'availability' && input.value === 'all');

        if (isActive) {
          label.classList.add('filter-active');
        } else {
          label.classList.remove('filter-active');
        }
      });
    }

    // Main filter, sort and pagination engine
    function filterAndRender() {
      let activeAvailability = 'all';
      availabilityRadios.forEach(radio => {
        if (radio.checked) activeAvailability = radio.value;
      });

      let activeCategories = [];
      categoryCheckboxes.forEach(cb => {
        if (cb.checked) activeCategories.push(cb.value);
      });

      let activePriceRange = null;
      priceRangeRadios.forEach(radio => {
        if (radio.checked) activePriceRange = radio.value;
      });

      let activeMediums = [];
      mediumCheckboxes.forEach(cb => {
        if (cb.checked) activeMediums.push(cb.value);
      });

      const activeSort = sortSelect ? sortSelect.value : 'featured';

      let filtered = allProductsCatalog.filter(item => {
        // Availability
        if (activeAvailability === 'in-stock' && item.availability !== 'in-stock') return false;
        if (activeAvailability === 'out-of-stock' && item.availability !== 'out-of-stock') return false;

        // Category
        if (activeCategories.length > 0 && !activeCategories.includes(item.category)) return false;

        // Price Range
        if (activePriceRange) {
          const price = item.price;
          if (activePriceRange === '300-500') {
            if (price < 300 || price > 500) return false;
          } else if (activePriceRange === '500-1000') {
            if (price < 500 || price > 1000) return false;
          } else if (activePriceRange === '1000-3000') {
            if (price < 1000 || price > 3000) return false;
          } else if (activePriceRange === '5000-10000') {
            if (price < 5000 || price > 10000) return false;
          } else if (activePriceRange === '10000+') {
            if (price < 10000) return false;
          }
        }

        // Medium
        if (activeMediums.length > 0 && !activeMediums.includes(item.medium)) return false;

        return true;
      });

      // Sort
      if (activeSort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (activeSort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (activeSort === 'year-desc') {
        filtered.sort((a, b) => b.year - a.year);
      }

      // Render grid
      grid.innerHTML = '';
      const totalMatching = filtered.length;

      if (totalMatching === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0; color: var(--text-muted); font-size: 1.1rem; font-weight: 300; width: 100%;">
            No paintings found matching the selected filters.
          </div>
        `;
        if (productsCount) productsCount.textContent = 'Showing 0 paintings';
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        grid.style.height = '';
        return;
      }

      if (productsCount) {
        productsCount.textContent = `Showing ${Math.min(visibleCount, totalMatching)} of ${totalMatching} painting${totalMatching === 1 ? '' : 's'}`;
      }

      // Pagination slice
      const itemsToRender = filtered.slice(0, visibleCount);
      itemsToRender.forEach(item => {
        const card = createProductCard(item);
        grid.appendChild(card);
        
        // Dynamic aspect ratio adjustment
        const img = card.querySelector('.canvas-image');
        const frame = card.querySelector('.museum-frame');
        if (img && frame) {
          const adjust = () => {
            const r = img.naturalWidth / img.naturalHeight;
            if (r) frame.style.setProperty('aspect-ratio', r, 'important');
          };
          if (img.complete) adjust();
          else img.addEventListener('load', adjust);
        }
      });

      // Recalculate converted currency prices across newly rendered products
      updateCurrency(currentCurrency);

      // Setup Load More button visibility
      if (loadMoreBtn) {
        if (visibleCount >= totalMatching) {
          loadMoreBtn.style.display = 'none';
        } else {
          loadMoreBtn.style.display = 'inline-flex';
        }
      }

      // Recalculate masonry layout on image load
      const imgs = grid.querySelectorAll('img');
      imgs.forEach(img => {
        if (!img.complete) {
          img.addEventListener('load', () => applyMasonry(grid));
        }
      });
      applyMasonry(grid);
    }

    // Initialize wasChecked attributes for all inputs
    sidebarInputs.forEach(input => {
      input.dataset.wasChecked = input.checked ? 'true' : 'false';
    });

    // Attach Sidebar Listeners
    sidebarInputs.forEach(input => {
      input.addEventListener('change', () => {
        if (input.checked) {
          // If this filter is checked, uncheck all OTHER filters in the sidebar
          sidebarInputs.forEach(other => {
            if (other !== input) {
              other.checked = false;
              other.dataset.wasChecked = 'false';
            } else {
              other.dataset.wasChecked = 'true';
            }
          });
        } else {
          input.dataset.wasChecked = 'false';
        }

        // If no filter is checked in the entire sidebar, automatically check the default "all" availability radio
        let anyChecked = false;
        sidebarInputs.forEach(other => {
          if (other.checked) {
            anyChecked = true;
          }
        });
        if (!anyChecked) {
          const allRadio = document.querySelector('input[name="availability"][value="all"]');
          if (allRadio) {
            allRadio.checked = true;
            allRadio.dataset.wasChecked = 'true';
          }
        }

        updateSidebarFilterStates();
        visibleCount = 12;
        filterAndRender();
      });

      // Toggle functionality for radio inputs
      if (input.type === 'radio') {
        input.addEventListener('click', () => {
          if (input.dataset.wasChecked === 'true') {
            // Only uncheck if it's not the default "all" availability radio
            if (!(input.name === 'availability' && input.value === 'all')) {
              input.checked = false;
              input.dataset.wasChecked = 'false';
              
              // Restore availability default radio "all"
              const allRadio = document.querySelector('input[name="availability"][value="all"]');
              if (allRadio) {
                allRadio.checked = true;
                allRadio.dataset.wasChecked = 'true';
              }
              
              // Dispatch change manually to trigger filtering
              input.dispatchEvent(new Event('change'));
            }
          }
        });
      }
    });

    sortSelect?.addEventListener('change', () => {
      visibleCount = 12;
      filterAndRender();
    });

    // Clear filters btn
    clearBtn?.addEventListener('click', () => {
      sidebarInputs.forEach(input => {
        if (input.name === 'availability') {
          input.checked = (input.value === 'all');
          input.dataset.wasChecked = (input.value === 'all') ? 'true' : 'false';
        } else {
          input.checked = false;
          input.dataset.wasChecked = 'false';
        }
      });
      updateSidebarFilterStates();
      visibleCount = 12;
      filterAndRender();
    });

    // Load More Btn Click
    loadMoreBtn?.addEventListener('click', () => {
      visibleCount += 6;
      filterAndRender();
    });

    // Parse URL params for preselected categories / price /availability
    const params = new URLSearchParams(window.location.search);
    const categoryQueryParam = params.get('category');
    if (categoryQueryParam) {
      categoryCheckboxes.forEach(cb => {
        if (cb.value.toLowerCase() === categoryQueryParam.toLowerCase()) {
          cb.checked = true;
        }
      });
    }
    const availabilityParam = params.get('availability');
    if (availabilityParam) {
      availabilityRadios.forEach(radio => {
        if (radio.value === availabilityParam) {
          radio.checked = true;
        }
      });
    }
    const priceParam = params.get('price-range');
    if (priceParam) {
      priceRangeRadios.forEach(radio => {
        if (radio.value === priceParam) {
          radio.checked = true;
        }
      });
    }
    const mediumParam = params.get('medium');
    if (mediumParam) {
      mediumCheckboxes.forEach(cb => {
        if (cb.value.toLowerCase() === mediumParam.toLowerCase()) {
          cb.checked = true;
        }
      });
    }

    // Sync wasChecked attributes again after parsing URL params
    sidebarInputs.forEach(input => {
      input.dataset.wasChecked = input.checked ? 'true' : 'false';
    });

    // Mobile Drawer Controls
    mobileFilterToggleBtn?.addEventListener('click', () => {
      sidebar?.classList.add('active');
      menuOverlay?.classList.add('active');
    });

    const closeSidebar = () => {
      sidebar?.classList.remove('active');
      menuOverlay?.classList.remove('active');
    };

    sidebarCloseBtn?.addEventListener('click', closeSidebar);
    menuOverlay?.addEventListener('click', closeSidebar);

    // Category-option dropdown: intercept on this page, navigate from external pages
    document.querySelectorAll('.category-option').forEach(option => {
      option.addEventListener('click', (e) => {
        const selectedCategory = option.getAttribute('data-category');
        if (!selectedCategory) return;
        e.preventDefault();

        // Uncheck all category checkboxes, check only the selected one
        categoryCheckboxes.forEach(cb => {
          cb.checked = cb.value.toLowerCase() === selectedCategory.toLowerCase();
          cb.dataset.wasChecked = cb.checked ? 'true' : 'false';
        });

        // Push URL param
        const url = new URL(window.location.href);
        url.searchParams.set('category', selectedCategory);
        window.history.pushState({}, '', url.toString());

        // Render with updated filter
        visibleCount = 12;
        updateSidebarFilterStates();
        filterAndRender();

        document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Initial state and render
    updateSidebarFilterStates();
    filterAndRender();
  }

  initCollectionsFilter();

  // --- Dynamic Active Navigation Link ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.menu-row2-btn, .drawer-nav-item a, .footer-luxury-list a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      if (currentPath === 'index.html' && linkPath === 'index.html') {
        link.classList.remove('active');
      } else {
        link.classList.add('active');
      }
    } else {
      link.classList.remove('active');
    }
  });

});

