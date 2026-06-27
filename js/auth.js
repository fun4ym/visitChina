/* === Internal Doc Auth (SHA-256) === */
(function(){
  var STORAGE_KEY = 'visitChina_auth';
  var HASH = document.querySelector('meta[name=auth-hash]').content;

  // Already authenticated this session?
  if (sessionStorage.getItem(STORAGE_KEY) === 'ok') {
    showContent();
    return;
  }

  // Show overlay
  var overlay = document.getElementById('auth-overlay');
  if (overlay) overlay.style.display = 'flex';

  // SHA-256 via Web Crypto API
  async function sha256(text) {
    var enc = new TextEncoder().encode(text);
    var buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf)).map(function(b){ return b.toString(16).padStart(2,'0'); }).join('');
  }

  var form = document.getElementById('auth-form');
  var input = document.getElementById('auth-input');
  var error = document.getElementById('auth-error');

  if (form && input) {
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      var pw = input.value.trim();
      if (!pw) return;
      input.disabled = true;
      try {
        var h = await sha256(pw);
        if (h === HASH) {
          sessionStorage.setItem(STORAGE_KEY, 'ok');
          if (overlay) overlay.style.display = 'none';
          showContent();
        } else {
          if (error) error.style.display = 'block';
          input.value = '';
          input.focus();
        }
      } catch(err) {
        // Fallback: if crypto fails, show error
        if (error) { error.textContent = 'Browser error, please refresh'; error.style.display = 'block'; }
      }
      input.disabled = false;
    });
  }

  function showContent(){
    var c = document.getElementById('protected-content');
    if (c) c.style.display = 'block';
    // Fire init if script defines one
    if (typeof initChecklist === 'function') initChecklist();
  }
})();
