/* ==========================================================
   NmapSSL — site scripts
   Include with: <script src="script.js"></script>
   Handles the animated hero terminal on index.html.
   Login form logic now lives in firebase-auth.js (real auth).
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroTerminal();
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