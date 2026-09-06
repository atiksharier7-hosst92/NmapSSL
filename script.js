/* ==========================================================
   NmapSSL — site scripts
   Include with: <script src="script.js"></script>
   Works on both index.html (hero terminal) and login.html
   (login form) — each block checks the page has the right
   element before running, so one file covers both pages.
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroTerminal();
  initLoginForm();
});

/* ---------- index.html: animated hero terminal ---------- */
function initHeroTerminal() {
  const body = document.getElementById('termBody');
  if (!body) return; // not on this page

  const lines = [
    { t: '<span class="prompt">$</span> python nmapssl.py -t example.com -p 443', d: 20 },
    { t: '', d: 200 },
    { t: '<span class="dim">[+] Scanning target: example.com</span>', d: 40 },
    { t: '<span class="ok">[+] Open port found: 443/tcp</span>', d: 40 },
    { t: '<span class="ok">[+] SSL/TLS certificate valid until: 2027-01-01</span>', d: 40 },
    { t: '<span class="ok">[+] Supported protocols: TLSv1.2, TLSv1.3</span>', d: 40 },
    { t: '<span class="warn">[!] Weak cipher suite detected: TLS_RSA_WITH_AES_128_CBC_SHA</span>', d: 40 },
    { t: '<span class="dim">[+] Scan complete in 4.2s</span>', d: 40 },
  ];

  let html = '';
  let li = 0;

  function typeLine() {
    if (li >= lines.length) {
      html += '<br>' + '<span class="prompt">$</span> <span class="caret"></span>';
      body.innerHTML = html;
      return;
    }
    const line = lines[li];
    html += (li > 0 ? '\n' : '') + line.t;
    body.innerHTML = html + '<span class="caret"></span>';
    li++;
    setTimeout(typeLine, line.d + 120);
  }

  typeLine();
}

/* ---------- login.html: form + show/hide password ---------- */
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return; // not on this page

  const errorBox = document.getElementById('errorBox');
  const toggleBtn = document.getElementById('togglePass');
  const passInput = document.getElementById('password');

  if (toggleBtn && passInput) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = passInput.type === 'password';
      passInput.type = isPassword ? 'text' : 'password';
      toggleBtn.textContent = isPassword ? 'HIDE' : 'SHOW';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Demo only: no real authentication happens here.
    // Wire this up to your backend's auth endpoint, e.g.:
    //
    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // })
    //   .then(res => res.json())
    //   .then(data => { ... })
    //   .catch(err => { ... });

    errorBox.classList.remove('show');

    const email = document.getElementById('email').value.trim();
    const password = passInput.value;

    if (!email || !password) {
      showMessage(errorBox, 'Please fill in both fields.', 'error');
      return;
    }

    showMessage(errorBox, 'Login form captured — connect this to your backend to authenticate.', 'success');
  });
}

function showMessage(box, text, type) {
  box.textContent = text;
  if (type === 'success') {
    box.style.color = 'var(--accent)';
    box.style.background = 'rgba(79,209,174,0.08)';
    box.style.borderColor = 'rgba(79,209,174,0.3)';
  } else {
    box.style.color = 'var(--danger)';
    box.style.background = 'rgba(229,98,106,0.08)';
    box.style.borderColor = 'rgba(229,98,106,0.3)';
  }
  box.classList.add('show');
}