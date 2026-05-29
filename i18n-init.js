const SUPPORTED = ['en','nl','fr','de','es','it','et','pt'];

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = i18next.t(el.dataset.i18n);
    if (val && val !== el.dataset.i18n) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = i18next.t(el.dataset.i18nHtml);
    if (val && val !== el.dataset.i18nHtml) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = i18next.t(el.dataset.i18nPlaceholder);
    if (val && val !== el.dataset.i18nPlaceholder) el.placeholder = val;
  });
  const lang = i18next.language.split('-')[0];
  document.documentElement.lang = lang;
  const codeEl = document.querySelector('.lang-current-code');
  if (codeEl) codeEl.textContent = lang.toUpperCase();
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  if (typeof window._onI18nUpdate === 'function') window._onI18nUpdate();
}

function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) lang = 'en';
  i18next.changeLanguage(lang).then(() => {
    updateContent();
    localStorage.setItem('miss-chill-lang', lang);
    document.querySelector('.lang-selector').classList.remove('open');
    const modal = document.getElementById('lang-modal');
    modal.classList.remove('visible');
    setTimeout(() => modal.style.display = 'none', 350);
  });
}

function initSelector() {
  const selector = document.querySelector('.lang-selector');
  const trigger  = document.querySelector('.lang-current');
  trigger.addEventListener('click', e => {
    e.stopPropagation();
    selector.classList.toggle('open');
  });
  document.addEventListener('click', () => selector.classList.remove('open'));
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
}

function initModal() {
  const modal = document.getElementById('lang-modal');
  const saved = localStorage.getItem('miss-chill-lang');
  if (!saved) {
    setTimeout(() => modal.classList.add('visible'), 500);
  } else {
    modal.style.display = 'none';
  }
  document.querySelectorAll('.lang-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
  document.getElementById('lang-modal-skip').addEventListener('click', () => {
    modal.classList.remove('visible');
    setTimeout(() => modal.style.display = 'none', 350);
  });
}

function init() {
  const saved   = localStorage.getItem('miss-chill-lang');
  const browser = (navigator.language || 'en').split('-')[0].toLowerCase();
  const detected = SUPPORTED.includes(browser) ? browser : 'en';
  const initial  = SUPPORTED.includes(saved) ? saved : detected;

  i18next
    .use(i18nextBrowserLanguageDetector)
    .init({
      lng: initial,
      fallbackLng: 'en',
      resources: window.MISS_CHILL_TRANSLATIONS,
      detection: { order: ['localStorage', 'navigator'] }
    }, () => {
      updateContent();
      initSelector();
      initModal();
    });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
