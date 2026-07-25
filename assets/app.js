/* ===== iRepair Global Logic ===== */
(function() {
  const root = document.documentElement;
  const THEME_KEY = 'irepair_theme';
  const LANG_KEY = 'irepair_lang';

  // Helper function to query elements
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  /* ---------- THEME MANAGEMENT ---------- */
  function setTheme(theme) {
    if (!theme) return;
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem('theme', theme); // Backward compatibility
    
    // Update theme toggle buttons if they exist
    const themeBtns = $$('#themeBtn, .theme-toggle');
    const lang = root.getAttribute('lang') || localStorage.getItem(LANG_KEY) || 'sv';
    themeBtns.forEach(btn => {
      if (btn) {
        btn.innerHTML = theme === 'dark' 
          ? `<span>🌙</span> ${lang === 'sv' ? 'Mörkt' : 'Dark'}`
          : `<span>☀️</span> ${lang === 'sv' ? 'Ljust' : 'Light'}`;
        btn.setAttribute('aria-label', lang === 'sv' ? 'Byt tema' : 'Change theme');
      }
    });

    // Apply specific logic if page has specific theme requirements
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  let lastThemeToggle = 0;
  function toggleTheme() {
    if (Date.now() - lastThemeToggle < 100) return;
    lastThemeToggle = Date.now();
    const current = localStorage.getItem(THEME_KEY) || localStorage.getItem('theme') || 'light';
    setTheme(current === 'light' ? 'dark' : 'light');
  }

  /* ---------- LANGUAGE MANAGEMENT ---------- */
  function setLang(lang) {
    if (!lang) return;
    localStorage.setItem(LANG_KEY, lang);
    localStorage.setItem('lang', lang); // Backward compatibility
    root.setAttribute('lang', lang);

    const currentTheme = localStorage.getItem(THEME_KEY) || localStorage.getItem('theme') || 'light';
    const themeBtns = $$('#themeBtn, .theme-toggle');
    themeBtns.forEach(btn => {
      btn.innerHTML = currentTheme === 'dark'
        ? `<span>🌙</span> ${lang === 'sv' ? 'Mörkt' : 'Dark'}`
        : `<span>☀️</span> ${lang === 'sv' ? 'Ljust' : 'Light'}`;
      btn.setAttribute('aria-label', lang === 'sv' ? 'Byt tema' : 'Change theme');
    });
    
    // Update language toggle buttons if they exist
    const langBtns = $$('#langBtn, .lang-toggle');
    langBtns.forEach(btn => {
      if (btn) {
        btn.innerHTML = lang === 'sv' ? 'English' : 'Svenska';
      }
    });

    // Trigger page-specific translations
    if (typeof window.applyLang === 'function') {
      window.applyLang(lang);
    }

    // Update global elements like footer copyright
    updateGlobalText(lang);
    
    window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
  }

  let lastLangToggle = 0;
  function toggleLang() {
    if (Date.now() - lastLangToggle < 100) return;
    lastLangToggle = Date.now();
    const current = localStorage.getItem(LANG_KEY) || localStorage.getItem('lang') || 'sv';
    setLang(current === 'sv' ? 'en' : 'sv');
  }

  function updateGlobalText(lang) {
    // Keep the same footer wording and layout on every page.
    const yr = new Date().getFullYear();
    const footer = $('footer');
    if (footer) {
      const rights = lang === 'sv' ? 'Alla rättigheter förbehållna.' : 'All rights reserved.';
      footer.innerHTML = `
        <div class="container footer-content">
          <div class="footer-line">
            © ${yr} <strong>iRepair Of Sweden</strong>. ${rights}
            <span class="powered-by">Powered by Bston Tech</span>
          </div>
        </div>
      `;
    }

    const quickActions = $('.mobile-quick-actions');
    if (quickActions) {
      const labels = lang === 'sv'
        ? ['Ring oss', 'Se priser', 'Butiker']
        : ['Call us', 'View prices', 'Stores'];
      quickActions.querySelectorAll('a').forEach((link, index) => {
        link.textContent = labels[index];
      });
      quickActions.setAttribute('aria-label', lang === 'sv' ? 'Snabbkontakt' : 'Quick contact');
    }

    const menuButton = $('.menu-toggle');
    if (menuButton) {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute(
        'aria-label',
        lang === 'sv'
          ? (open ? 'Stäng meny' : 'Öppna meny')
          : (open ? 'Close menu' : 'Open menu')
      );
    }

    $$('[data-sv][data-en]').forEach(element => {
      element.textContent = element.getAttribute(lang === 'sv' ? 'data-sv' : 'data-en');
    });

    $$('.service-card').forEach(card => {
      card.setAttribute(
        'data-cta',
        lang === 'sv' ? 'Se modeller och priser →' : 'View models and prices →'
      );
    });

    const trustStrip = $('.trust-strip');
    if (trustStrip) {
      trustStrip.setAttribute('aria-label', lang === 'sv' ? 'Våra fördelar' : 'Our benefits');
    }

    translateLegacyText(lang);
  }

  function translateLegacyText(lang) {
    const legacyPages = new Set([
      'poco-f.html', 'poco-m.html', 'poco-x.html', 'redmi-12.html',
      'redmi-note-13.html', 'samsung-a.html', 'samsung-a3-a5-a7.html',
      'samsung-note.html', 'samsung-s10.html', 'samsung-s20.html',
      'samsung-s21.html', 'samsung-s22.html', 'samsung-s23.html',
      'samsung-s8.html', 'samsung-s9.html', 'samsung-tab.html',
      'xiaomi-14.html', 'xiaomi-ovrigt.html', 'xiaomi-pad.html', 'xiaomi.html'
    ]);
    const pageName = location.pathname.split('/').pop() || 'index.html';
    if (!legacyPages.has(pageName)) return;

    const selectors = [
      'nav a', 'h1', 'h2', 'h3', 'th', 'td:first-child',
      '.eyebrow', '.pill', '.hint', 'main p', '.price-card > p'
    ];
    const elements = $$(selectors.join(','));
    const replacements = [
      ['Våra butiker', 'Our stores'],
      ['Om oss', 'About us'],
      ['Reparationer', 'Repairs'],
      ['Hem', 'Home'],
      ['Kontakt', 'Contact'],
      ['Tjänst', 'Service'],
      ['Pris', 'Price'],
      ['Modell', 'Model'],
      ['Kontakta oss', 'Contact us'],
      ['Skärmbyte', 'Screen replacement'],
      ['skärmbyte', 'screen replacement'],
      ['Batteribyte', 'Battery replacement'],
      ['batteribyte', 'battery replacement'],
      ['Laddportsbyte', 'Charging port replacement'],
      ['Laddport', 'Charging port'],
      ['Bakkamerabyte', 'Rear camera replacement'],
      ['Framkamerabyte', 'Front camera replacement'],
      ['Kameraglas', 'Camera glass'],
      ['Bakglas/baksida', 'Back glass / rear cover'],
      ['Bakglas', 'Back glass'],
      ['Felsökningsavgift', 'Diagnostics fee'],
      ['Felsökning', 'Diagnostics'],
      ['Mjukvara', 'Software'],
      ['Fuktsanering', 'Liquid damage cleaning'],
      ['Lödningsarbete', 'Soldering work'],
      ['Högtalare', 'Speaker'],
      ['Mikrofon', 'Microphone'],
      ['Källa:', 'Source:'],
      ['Betalning:', 'Payment:'],
      ['prislista', 'price list'],
      ['reparationer', 'repairs'],
      ['service', 'service'],
      ['serien', 'series'],
      ['byte', 'replacement'],
      ['original', 'original'],
      ['Kontakta', 'Contact']
    ];

    elements.forEach(element => {
      if (!element.dataset.svText) {
        element.dataset.svText = element.textContent.trim();
      }
      if (lang === 'sv') {
        element.textContent = element.dataset.svText;
        return;
      }
      let translated = element.dataset.svText;
      replacements.forEach(([sv, en]) => {
        translated = translated.split(sv).join(en);
      });
      element.textContent = translated
        .replace(/\s+–\s+/g, ' — ')
        .replace(/\s+·\s+/g, ' · ');
    });
  }

  /* ---------- UI ENHANCEMENTS ---------- */
  function initScrollEffect() {
    const header = $('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = 'var(--shadow-lg)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  function initMobileNavigation() {
    const head = $('.site-header .head');
    const nav = $('.site-header nav');
    const actions = $('.site-header .actions');
    if (!head || !nav || !actions) return;

    nav.id = nav.id || 'main-navigation';
    const menuButton = document.createElement('button');
    menuButton.className = 'btn menu-toggle';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-label', 'Öppna meny');
    menuButton.setAttribute('aria-controls', nav.id);
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<span aria-hidden="true">☰</span>';
    actions.prepend(menuButton);

    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      const lang = root.getAttribute('lang') || 'sv';
      menuButton.setAttribute(
        'aria-label',
        lang === 'sv'
          ? (open ? 'Stäng meny' : 'Öppna meny')
          : (open ? 'Close menu' : 'Open menu')
      );
      menuButton.innerHTML = `<span aria-hidden="true">${open ? '×' : '☰'}</span>`;
    });

    nav.addEventListener('click', e => {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.innerHTML = '<span aria-hidden="true">☰</span>';
      }
    });

    document.addEventListener('click', e => {
      if (!head.contains(e.target) && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.innerHTML = '<span aria-hidden="true">☰</span>';
      }
    });
  }

  function initMobileQuickActions() {
    if ($('.mobile-quick-actions')) return;
    const quick = document.createElement('div');
    quick.className = 'mobile-quick-actions';
    quick.setAttribute('aria-label', 'Snabbkontakt');
    quick.innerHTML = `
      <a class="btn ghost" href="tel:08348888">Ring oss</a>
      <a class="btn primary" href="repairs.html">Se priser</a>
      <a class="btn ghost" href="stores.html">Butiker</a>
    `;
    document.body.appendChild(quick);
  }

  /* ---------- INITIALIZATION ---------- */
  function init() {
    // Strip old inline event listeners to prevent double-firing
    ['themeBtn', 'langBtn'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        const clone = btn.cloneNode(true);
        btn.parentNode.replaceChild(clone, btn);
      }
    });

    // Sync old keys to new keys if necessary
    if (!localStorage.getItem(THEME_KEY) && localStorage.getItem('theme')) {
        localStorage.setItem(THEME_KEY, localStorage.getItem('theme'));
    }
    if (!localStorage.getItem(LANG_KEY) && localStorage.getItem('lang')) {
        localStorage.setItem(LANG_KEY, localStorage.getItem('lang'));
    }

    // Load saved preferences or defaults
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    const savedLang = localStorage.getItem(LANG_KEY) || 'sv';

    setTheme(savedTheme);
    setLang(savedLang);

    // Bind event listeners
    document.addEventListener('click', (e) => {
      const themeBtn = e.target.closest('#themeBtn, .theme-toggle');
      const langBtn = e.target.closest('#langBtn, .lang-toggle');
      
      if (themeBtn) {
        e.preventDefault();
        toggleTheme();
      }
      if (langBtn) {
        e.preventDefault();
        toggleLang();
      }
    });

    initScrollEffect();
    initMobileNavigation();
    initMobileQuickActions();
    updateGlobalText(savedLang);

    // Add entry animations to cards if they don't have them
    const cards = $$('.card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    });
  }

  // Ensure init runs when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0));
  } else {
    setTimeout(init, 0);
  }

  // Export for page-specific scripts
  window.iRepair = { setTheme, setLang, toggleTheme, toggleLang };
})();
