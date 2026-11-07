/* Self-contained multilingual page: no network requests, no client-side framework. */
(function () {
  'use strict';
  const DATA = window.FEATURE_I18N || { blocks: {}, ui: {} };
  const languages = ['zh', 'en', 'ru', 'fr', 'ar'];
  const selector = document.getElementById('language-picker');
  const translatable = Array.from(document.querySelectorAll('[data-i18n], [data-ui], [data-extra]'));
  const figures = Array.from(document.querySelectorAll('figure img[data-zoom]'));
  const originals = new WeakMap();
  translatable.forEach((node) => originals.set(node, node.innerHTML));
  const altOriginals = new WeakMap();
  figures.forEach((node) => altOriginals.set(node, node.alt));
  const extras = {
    zh: ['01 / 类别不均衡', '02 / 类间重叠', '03 / 时间模式', '窗口长度 10', '步长 10'],
    en: ['01 / Class imbalance', '02 / Inter-class overlap', '03 / Temporal pattern', 'window 10', 'step 10'],
    fr: ['01 / Déséquilibre des classes', '02 / Chevauchement des classes', '03 / Schémas temporels', 'fenêtre 10', 'pas 10'],
    ru: ['01 / Дисбаланс классов', '02 / Перекрытие классов', '03 / Временные закономерности', 'окно 10', 'шаг 10'],
    ar: ['01 / عدم توازن الفئات', '02 / تداخل الفئات', '03 / الأنماط الزمنية', 'النافذة 10', 'الخطوة 10']
  };
  const extraIDs = ['challenge.0', 'challenge.1', 'challenge.2', 'chip.4', 'chip.5'];
  let current = 'zh';
  function t(key, lang = current) {
    return (DATA.ui[lang] && DATA.ui[lang][key]) ||
      (DATA.blocks[lang] && DATA.blocks[lang][key]) ||
      (DATA.ui.en && DATA.ui.en[key]) || key;
  }
  function applyLanguage(lang) {
    if (!languages.includes(lang)) lang = 'zh';
    current = lang;
    const html = document.documentElement;
    html.lang = lang;
    html.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    if (selector) selector.value = lang;
    translatable.forEach((node) => {
      if (lang === 'en') {
        node.innerHTML = originals.get(node);
        return;
      }
      let translated;
      if (node.hasAttribute('data-i18n')) translated = t(node.getAttribute('data-i18n'), lang);
      if (node.hasAttribute('data-ui')) translated = t(node.getAttribute('data-ui'), lang);
      if (node.hasAttribute('data-extra')) translated = extras[lang][extraIDs.indexOf(node.getAttribute('data-extra'))];
      if (translated !== undefined) node.textContent = translated;
    });
    figures.forEach((image, idx) => {
      const fig = image.closest('figure');
      let cap = fig ? fig.querySelector('figcaption') : null;
      image.alt = lang === 'en' ? altOriginals.get(image) : ((cap && cap.textContent.trim()) || t('lightbox'));
      image.setAttribute('aria-label',t('lightbox'));
      image.title = t('zoomHelp');
    });
    document.querySelectorAll('.table-figure').forEach((fig) => {
      fig.style.setProperty('--swipe-copy',JSON.stringify(t('fig.swipe')));
    });
    const lightboxClose = document.getElementById('close-dialog');
    if (lightboxClose) lightboxClose.setAttribute('aria-label',t('close'));
    document.querySelectorAll('[data-copy]').forEach((b) => b.setAttribute('aria-label',t('copy')));
    if (selector) selector.setAttribute('aria-label',t('language'));
    document.title = 'Feature-level SMOTE | ' + (lang === 'en' ? 'Gas turbine fault diagnosis' : t('top.01',lang));
    const desc = document.querySelector('meta[name="description"]');
    if (desc && lang !== 'en') desc.setAttribute('content',t('abstract.01',lang));
    try { localStorage.setItem('feature_smote_language', lang); } catch (_) {}
    window.dispatchEvent(new CustomEvent('research-language-change', { detail: { language: lang } }));
  }
  window.SiteI18n = { t: (key) => t(key), applyLanguage };
  try {
    const preferred = localStorage.getItem('feature_smote_language');
    if (languages.includes(preferred)) current = preferred;
  } catch (_) {}
  applyLanguage(current);
  if (selector) selector.addEventListener('change', (event) => applyLanguage(event.target.value));

  // Native image dialog, with keyboard accessibility and translated captions.
  const dialog = document.getElementById('image-dialog');
  const dialogImage = document.getElementById('dialog-image');
  const dialogCaption = document.getElementById('dialog-caption');
  const close = document.getElementById('close-dialog');
  let lastFocused = null;
  function openImage(image) {
    if (!dialog || !dialogImage || typeof dialog.showModal !== 'function') return;
    lastFocused = document.activeElement;
    dialogImage.src = image.getAttribute('src');
    dialogImage.alt = image.alt;
    const fig = image.closest('figure');
    const caption = fig ? fig.querySelector('figcaption') : null;
    dialogCaption.textContent = caption ? caption.textContent.trim() : '';
    dialog.showModal();
    if (close) close.focus();
  }
  figures.forEach((img) => {
    img.addEventListener('click', () => openImage(img));
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openImage(img); }
    });
  });
  if (close) close.addEventListener('click', () => dialog.close());
  if (dialog) {
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { dialogImage.removeAttribute('src'); if (lastFocused) lastFocused.focus(); });
  }
  // Clipboard: also works when opened directly from disk via file://.
  const copy = document.querySelector('[data-copy="bibtex-code"]');
  const code = document.getElementById('bibtex-code');
  if (copy && code) {
    copy.addEventListener('click', async () => {
      const value = code.innerText;
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('No clipboard API');
        await navigator.clipboard.writeText(value);
      } catch (error) {
        const area = document.createElement('textarea');
        area.value = value; area.setAttribute('readonly','');
        area.style.position='fixed';area.style.opacity='0';area.style.top='-1000px';
        document.body.appendChild(area); area.select();
        try { document.execCommand('copy'); } catch (_) {}
        area.remove();
      }
      copy.textContent=t('copied');
      copy.setAttribute('aria-live','polite');
      window.setTimeout(() => { copy.textContent=t('copy'); },1700);
    });
  }

  // Highlight current section in the desktop/mobile navigation.
  const linkGroups = Array.from(document.querySelectorAll('.topnav a[href^="#"], .mobile-section-nav a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    const io=new IntersectionObserver((items) => {
      items.forEach((item) => {
        if (!item.isIntersecting) return;
        const anchor='#'+item.target.id;
        linkGroups.forEach((a) => {
          const active=a.getAttribute('href')===anchor;
          if (active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current');
        });
      });
    }, {rootMargin:'-16% 0px -65% 0px',threshold:0});
    document.querySelectorAll('section[id]').forEach((sec) => io.observe(sec));
  }
})();
