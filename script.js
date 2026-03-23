// ============================================
// QR CODE GENERATOR — script.js
// 6 types: URL, Text, Email, Phone, WiFi, vCard
// API: api.qrserver.com (free, no key)
// ============================================

let currentType    = 'url';
let currentDataUrl = '';
let toastTimer, genTimer;

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

function setType(type) {
  currentType = type;
  document.querySelectorAll('.type-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.type === type)
  );
  ['url','text','email','phone','wifi','vcard'].forEach(t =>
    document.getElementById('ig-' + t).classList.toggle('hidden', t !== type)
  );
  generate();
}

function buildContent() {
  const v = id => (document.getElementById(id)?.value || '').trim();
  switch (currentType) {
    case 'url':   return v('f-url');
    case 'text':  return v('f-text');
    case 'phone': return v('f-phone') ? 'tel:' + v('f-phone') : '';
    case 'email': {
      const em = v('f-email'); if (!em) return '';
      const p = [];
      if (v('f-subject')) p.push('subject=' + encodeURIComponent(v('f-subject')));
      if (v('f-message')) p.push('body='    + encodeURIComponent(v('f-message')));
      return 'mailto:' + em + (p.length ? '?' + p.join('&') : '');
    }
    case 'wifi': {
      const ssid = v('f-ssid'); if (!ssid) return '';
      return `WIFI:T:${v('f-sec')||'WPA'};S:${ssid};P:${v('f-pass')};;`;
    }
    case 'vcard': {
      const name = v('f-name'); if (!name) return '';
      let c = 'BEGIN:VCARD\nVERSION:3.0\nFN:' + name + '\n';
      if (v('f-vphone')) c += 'TEL:'   + v('f-vphone') + '\n';
      if (v('f-vemail')) c += 'EMAIL:' + v('f-vemail') + '\n';
      if (v('f-vweb'))   c += 'URL:'   + v('f-vweb')   + '\n';
      return c + 'END:VCARD';
    }
  }
  return '';
}

function generate() {
  clearTimeout(genTimer);
  genTimer = setTimeout(_generate, 300);
}

function _generate() {
  const content = buildContent();
  const ph      = document.getElementById('qrPlaceholder');
  const img     = document.getElementById('qrImg');
  const actions = document.getElementById('outputActions');
  const meta    = document.getElementById('qrMeta');

  if (!content) {
    ph.style.display      = 'block';
    img.style.display     = 'none';
    actions.style.display = 'none';
    meta.style.display    = 'none';
    currentDataUrl = '';
    return;
  }

  const size = parseInt(document.getElementById('qrSize').value);
  const fg   = document.getElementById('fgColor').value.replace('#', '');
  const bg   = document.getElementById('bgColor').value.replace('#', '');
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(content)}&color=${fg}&bgcolor=${bg}&format=png`;

  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const canvas = document.getElementById('qrCanvas');
    canvas.width = size; canvas.height = size;
    try {
      canvas.getContext('2d').drawImage(img, 0, 0, size, size);
      currentDataUrl = canvas.toDataURL('image/png');
    } catch(e) {
      currentDataUrl = apiUrl;
    }
    ph.style.display      = 'none';
    img.style.display     = 'block';
    actions.style.display = 'flex';
    meta.style.display    = 'block';
    const labels = { url:'URL', text:'Text', email:'Email', phone:'Phone', wifi:'WiFi', vcard:'vCard' };
    document.getElementById('metaType').textContent  = labels[currentType];
    document.getElementById('metaSize').textContent  = size + '×' + size + ' px';
    document.getElementById('metaChars').textContent = content.length;
  };
  img.onerror = () => showToast('❌ No internet connection');
  img.src = apiUrl;
}

function downloadQR() {
  if (!currentDataUrl) { showToast('Generate a QR code first'); return; }
  const a = document.createElement('a');
  a.href = currentDataUrl; a.download = 'qrcode.png';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  showToast('⬇ Downloaded!');
}

async function copyQR() {
  if (!currentDataUrl) { showToast('Generate a QR code first'); return; }
  try {
    const res  = await fetch(currentDataUrl);
    const blob = await res.blob();
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    showToast('⎘ Copied!');
  } catch(e) {
    showToast('❌ Copy failed — try downloading');
  }
}

window.addEventListener('load', () => {
  document.getElementById('f-url').value = 'https://github.com/professoralbay';
  generate();
});
