/* ============================================================
   visitChina Shared JavaScript
   Features: brand-bar language toggle, bilingual nav, 
   sub-page mode-aware (TH/EN or ZH/EN), cost calculator,
   analytics, localStorage persistence
   ============================================================ */

// ── GA4 Analytics (placeholder) ──
(function(){
  var gaId = 'G-XXXXXXXXXX';
  if (gaId !== 'G-XXXXXXXXXX') {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
    document.head.appendChild(s);
    s.onload = function(){
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', gaId);
      window._gtag = gtag;
    };
  }
})();

// ── Meta Pixel (placeholder) ──
(function(){
  var pixelId = 'YOUR_PIXEL_ID';
  if (pixelId !== 'YOUR_PIXEL_ID') {
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', pixelId);
    fbq('track', 'PageView');
  }
})();

// ═══════════════════════════════════════
//  Unified Language System
// ═══════════════════════════════════════
(function(){
  var isMainPage = !window.location.pathname.includes('/schools/');
  var toggleBtn = document.getElementById('lang-toggle');
  if (!toggleBtn) return;

  // ── Init body class from localStorage ──
  var savedLang = localStorage.getItem('visitChina_lang') || 'th';
  document.body.className = 'lang-' + savedLang;

  // ── Sub-page: check if EN mode was active ──
  if (!isMainPage) {
    var subState = localStorage.getItem('visitChina_sub_en');
    if (subState === '1') document.body.classList.add('lang-en');
  }

  // ── Update toggle button label ──
  function updateBtn() {
    if (isMainPage) {
      toggleBtn.innerHTML = document.body.classList.contains('lang-th')
        ? '🇨🇳 中文'
        : '🇹🇭 ไทย';
    } else {
      var en = document.body.classList.contains('lang-en');
      var th = document.body.classList.contains('lang-th');
      if (en) {
        toggleBtn.innerHTML = th ? '🇹🇭 ไทย' : '🇨🇳 中文';
      } else {
        toggleBtn.innerHTML = '🇬🇧 English';
      }
    }
  }
  updateBtn();

  // ── Click handler ──
  toggleBtn.addEventListener('click', function() {
    if (isMainPage) {
      // Main page: toggle TH ↔ ZH
      var isTh = document.body.classList.contains('lang-th');
      var newLang = isTh ? 'zh' : 'th';
      document.body.className = 'lang-' + newLang;
      localStorage.setItem('visitChina_lang', newLang);
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
      // Sub-page: toggle native ↔ EN
      document.body.classList.toggle('lang-en');
      var isEn = document.body.classList.contains('lang-en');
      localStorage.setItem('visitChina_sub_en', isEn ? '1' : '0');
    }
    updateBtn();

    if (window._gtag) {
      window._gtag('event', 'language_switch', {
        page: isMainPage ? 'main' : 'school',
        lang: document.body.className
      });
    }
  });
})();

// ── Nav Anchor Redirect (bilingual panel-aware) ──
(function(){
  var navLinks = document.querySelectorAll('.brand-nav a[href^="#"], .brand-logo[href^="#"]');
  if (!navLinks.length) return;

  function resolveAnchor(hash) {
    var id = hash.replace('#', '');
    // ZH panel uses -zh suffix, TH panel uses bare IDs
    if (document.body.classList.contains('lang-zh')) return id + '-zh';
    return id;
  }

  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var hash = this.getAttribute('href');
      if (!hash || hash === '#') return;
      if (this.closest('.dropdown-sub')) return;
      if (this.classList.contains('dd-disabled')) return;

      e.preventDefault();
      var targetId = resolveAnchor(hash);
      var target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, null, '#' + targetId);
      }
    });
  });
})();

// ── Cost Calculator ──
(function(){
  var calcForm = document.getElementById('cost-calc');
  if (!calcForm) return;

  var sliders = calcForm.querySelectorAll('input[type=range]');
  var totalEl = document.getElementById('calc-total');
  var detailEl = document.getElementById('calc-detail');
  if (!totalEl) return;

  function format(num){ return num.toLocaleString('zh-CN'); }

  function recalc(){
    var tuition = parseInt(document.getElementById('calc-tuition').value) || 20500;
    var dormFee = parseInt(document.getElementById('calc-dorm').value) || 1200;
    var living = parseInt(document.getElementById('calc-living').value) || 1200;
    var years = 4;
    var totalTuition = tuition * years;
    var totalDorm = dormFee * 12 * years;
    var totalLiving = living * 12 * years;
    var grandTotal = totalTuition + totalDorm + totalLiving;
    totalEl.textContent = '¥' + format(grandTotal);
    detailEl.textContent = '学费 ¥' + format(totalTuition) + ' + 住宿 ¥' + format(totalDorm) + ' + 生活费 ¥' + format(totalLiving);
  }

  sliders.forEach(function(slider){
    var display = document.getElementById(slider.id + '-val');
    if (display) {
      display.textContent = '¥' + format(parseInt(slider.value));
      slider.addEventListener('input', function(){
        display.textContent = '¥' + format(parseInt(this.value));
        recalc();
      });
    }
  });
  recalc();
})();

// ── Checklist localStorage Persistence ──
(function(){
  var checklist = document.querySelectorAll('.ci-box');
  if (!checklist.length) return;
  var storageKey = 'visitChina_checklist_' + (window.location.pathname.replace(/\//g,'_') || 'default');
  var saved = localStorage.getItem(storageKey);
  var savedStates = saved ? JSON.parse(saved) : {};
  checklist.forEach(function(box, i){
    var id = box.dataset.id || ('item-' + i);
    if (savedStates[id]) box.classList.add('done');
  });
  checklist.forEach(function(box, i){
    box.addEventListener('click', function(){
      var id = this.dataset.id || ('item-' + i);
      var states = {};
      checklist.forEach(function(b, j){
        var bid = b.dataset.id || ('item-' + j);
        states[bid] = b.classList.contains('done');
      });
      localStorage.setItem(storageKey, JSON.stringify(states));
      if (typeof updateProgress === 'function') updateProgress();
    });
  });
  if (typeof updateProgress === 'function') updateProgress();
})();

// ── Log page view ──
if (window._gtag) {
  window._gtag('event', 'page_view_enhanced', {
    page_title: document.title,
    page_path: window.location.pathname
  });
}
