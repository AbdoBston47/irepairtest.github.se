// assets/site.js
(function(){
  const root = document.documentElement;
  const THEME_KEY = 'theme';
  const LANG_KEY  = 'lang';
  const $ = s => document.querySelector(s);

  /* ---------- THEME ---------- */
  function setTheme(theme){
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const btn = $('#themeBtn');
    if (btn) btn.textContent = (theme === 'dark') ? '🌙 Mörkt' : '☀️ Ljust';
  }
  function toggleTheme(){
    setTheme((localStorage.getItem(THEME_KEY) || 'light') === 'light' ? 'dark' : 'light');
  }

  /* ---------- LANGUAGE ---------- */
  // Default no-op; pages can override with a dictionary.
  if (typeof window.applyLang !== 'function') {
    window.applyLang = function(){};
  }
  function setLang(lang){
    localStorage.setItem(LANG_KEY, lang);
    const btn = $('#langBtn');
    if (btn) btn.textContent = (lang === 'sv') ? 'English' : 'Svenska';
    // Let each page update its texts
    try { window.applyLang(lang); } catch(e){}
    // Refresh footer text (rights string) after language change
    if (typeof window.setFooterBrand === 'function') window.setFooterBrand();
  }
  function toggleLang(){
    setLang((localStorage.getItem(LANG_KEY) || 'sv') === 'sv' ? 'en' : 'sv');
  }

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    // Defaults: start in LIGHT + SV
    setTheme(localStorage.getItem(THEME_KEY) || 'light');
    setLang(localStorage.getItem(LANG_KEY) || 'sv');

    const themeBtn = $('#themeBtn');
    const langBtn  = $('#langBtn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (langBtn)  langBtn.addEventListener('click', toggleLang);
  });

  /* ---------- FOOTER BRAND (Bston-Tech) ---------- */
  (function footerBrandInit(){
    const BRAND = 'Bston-Tech';
    function footerHTML(lang){
      const l = lang || localStorage.getItem(LANG_KEY) || 'sv';
      const rights = (l === 'sv') ? 'Alla rättigheter förbehållna.' : 'All rights reserved.';
      return `© <span>${new Date().getFullYear()}</span> ${BRAND}. <span data-i18n="foot.rights">${rights}</span>`;
    }
    function setFooterBrand() {
      let f = document.querySelector('#site-footer, footer.site-footer, footer');
      if (!f) { f = document.createElement('footer'); f.id = 'site-footer'; document.body.appendChild(f); }
      f.innerHTML = footerHTML();
    }
    document.addEventListener('DOMContentLoaded', setFooterBrand);
    window.addEventListener('load', setFooterBrand);
    const mo = new MutationObserver(() => {
      const f = document.querySelector('#site-footer, footer.site-footer, footer');
      if (f && !f.textContent.includes(BRAND)) setFooterBrand();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    window.setFooterBrand = setFooterBrand;
  })();
})();
