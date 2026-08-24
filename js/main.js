/* ==========================================================================
   ALFAIZ RAYHAN - PORTFOLIO MAIN JAVASCRIPT MODULE
   Includes: Theme Switcher (Dark/Light) & Multilingual i18n (ID, EN, JA, KO, ES, FR)
   ========================================================================== */

// 1. CYBER CANVAS PARTICLES ANIMATION
// 1. 3D INTERACTIVE CYBER MATRIX & PARTICLE CANVAS ANIMATION (LEVEL DEWA)
(function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let mouseX = 0;
  let mouseY = 0;
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    targetRotX = mouseY * 0.35;
    targetRotY = mouseX * 0.35;
  });

  const isMobileDevice = window.innerWidth < 768 || (window.matchMedia && window.matchMedia('(hover: none)').matches);
  const particles = [];
  const particleCount = isMobileDevice ? 16 : 65;
  const fov = 400;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 800,
      z: (Math.random() - 0.5) * 800,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      vz: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.2
    });
  }

  function rotate3D(p, rx, ry) {
    let cosY = Math.cos(ry);
    let sinY = Math.sin(ry);
    let x1 = p.x * cosY + p.z * sinY;
    let z1 = -p.x * sinY + p.z * cosY;

    let cosX = Math.cos(rx);
    let sinX = Math.sin(rx);
    let y2 = p.y * cosX - z1 * sinX;
    let z2 = p.y * sinX + z1 * cosX;

    return { x: x1, y: y2, z: z2 };
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isMobileDevice) {
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;
    }

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const projected = [];

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      if (Math.abs(p.x) > 700) p.vx *= -1;
      if (Math.abs(p.y) > 500) p.vy *= -1;
      if (Math.abs(p.z) > 500) p.vz *= -1;

      const rot = rotate3D(p, currentRotX, currentRotY);
      const scale = fov / (fov + rot.z + 600);
      const sx = rot.x * scale + cx;
      const sy = rot.y * scale + cy;

      projected.push({ sx, sy, scale, rotZ: rot.z, orig: p });

      if (scale > 0) {
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.5, p.radius * scale * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = rot.z > 0 ? '#10b981' : '#06b6d4';
        if (!isMobileDevice) {
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 6 * scale;
        }
        ctx.fill();
        if (!isMobileDevice) ctx.shadowBlur = 0;
      }
    }

    const maxDist = isMobileDevice ? 90 : 130;
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const p1 = projected[i];
        const p2 = projected[j];
        const dist = Math.hypot(p1.sx - p2.sx, p1.sy - p2.sy);

        if (dist < maxDist && p1.scale > 0 && p2.scale > 0) {
          const isLight = document.documentElement.getAttribute('data-theme') === 'light';
          const alpha = (1 - dist / maxDist) * (isLight ? 0.4 : 0.25) * ((p1.scale + p2.scale) / 2);
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${alpha})` : `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.9 * p1.scale;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }
  animateParticles();
})();

// 3. MULTILINGUAL i18n SWITCHER (6 LANGUAGES: ID, EN, JA, KO, ES, FR)
let currentLang = 'id';
let typingTimeout = null;

const typingPhrasesPerLang = {
  id: [
    "Ex-Intern Forensik Digital @ Ditres Siber Polda Metro Jaya",
    "Asisten Praktikum & Pembina Riset @ Seculab Telkom Univ",
    "Blue Team Security & OWASP Top 10 Defense Specialist",
    "Anggota Resmi Asosiasi Forensik Digital Indonesia (AFDI)"
  ],
  en: [
    "Ex-Digital Forensics Intern @ Ditres Siber Metro Police",
    "Teaching Assistant & Research Lead @ Seculab Telkom Univ",
    "Blue Team Security & OWASP Top 10 Defense Specialist",
    "Registered Member @ Indonesian Digital Forensics Assoc (AFDI)"
  ],
  ja: [
    "ジャカルタ警視庁サイバー犯罪課元フォレンジックインターン",
    "Seculab研究指導責任者＆実習指導アシスタント",
    "ブルーチーム＆OWASP Top 10防御スペシャリスト",
    "インドネシアデジタルフォレンジック協会 (AFDI) 正式会員"
  ],
  ko: [
    "자카르타 경찰청 사이버수사대 디지털 포렌식 전 인턴",
    "Seculab 연구 지도자 및 실습 조교 @ 텔콤 대학교",
    "블루팀 보안 및 OWASP Top 10 방어 전문가",
    "인도네시아 디지털 포렌식 협회 (AFDI) 정식 회원"
  ],
  es: [
    "Ex-Pasante Forense Digital @ Ditres Siber Policía Yakarta",
    "Asistente de Cátedra y Asesor de Investigación @ Seculab",
    "Especialista en Seguridad Blue Team y OWASP Top 10",
    "Miembro Oficial de la Asociación Forense Digital de Indonesia (AFDI)"
  ],
  fr: [
    "Ancien stagiaire DFIR @ Police Criminelle Numérique (Ditres Siber)",
    "Assistant d'enseignement & Chef de Recherche @ Seculab",
    "Spécialiste Sécurité Blue Team & Défense OWASP Top 10",
    "Membre Officiel de l'Association d'Informatique Légale Indonésienne (AFDI)"
  ]
};

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const phrases = typingPhrasesPerLang[currentLang] || typingPhrasesPerLang.id;
  const currentPhrase = phrases[phraseIdx % phrases.length];

  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typingElement.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIdx === currentPhrase.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    speed = 400;
  }

  if (typingTimeout) clearTimeout(typingTimeout);
  typingTimeout = setTimeout(typeEffect, speed);
}

window.setLanguage = function(lang) {
  if (typeof i18nData === 'undefined' || !i18nData[lang]) return;
  
  if (typeof stopBotVoice === 'function') {
    stopBotVoice();
  }

  currentLang = lang;
  window.currentLang = lang;
  localStorage.setItem('pref-lang', lang);

  const dict = i18nData[lang];

  // Update all DOM elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update CV download link dynamically based on selected language
  document.querySelectorAll('a[href*="CV_ATS_Alfaiz_Rayhan"], a[href*="Resume_ATS_Alfaiz_Rayhan"], a[href*="cv_alfaiz_rayhan"]').forEach(link => {
    if (lang === 'id') {
      link.setAttribute('href', 'CV_ATS_Alfaiz_Rayhan_Putra_Adji_CyberSecurity.pdf');
    } else {
      link.setAttribute('href', 'Resume_ATS_Alfaiz_Rayhan_Putra_Adji_CyberSecurity_DFIR.pdf');
    }
  });

  // Re-start typing animation
  phraseIdx = 0;
  charIdx = 0;
  isDeleting = false;
  if (typingTimeout) clearTimeout(typingTimeout);
  typeEffect();
};

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('pref-lang') || 'id';
  document.documentElement.setAttribute('data-theme', 'dark');

  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = savedLang;
  }
  setLanguage(savedLang);
});

// 4. ACTION DOWNLOAD CV (DIRECT PDF FILE LINK & DROPDOWN HANDLER)
window.toggleCvDropdown = function(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById('cv-dropdown-menu');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
};

document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('cv-dropdown-menu');
  if (dropdown && dropdown.classList.contains('show')) {
    if (!e.target.closest('.cv-dropdown-wrapper')) {
      dropdown.classList.remove('show');
    }
  }
});

// INTERACTIVE OPERATIONS CATEGORY FILTER
window.filterOperations = function(category) {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  filterBtns.forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const cards = document.querySelectorAll('#projects .glass-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    } else {
      card.style.display = 'none';
    }
  });
};

// CYBER TOAST NOTIFICATION ENGINE
window.showCyberToast = function(message) {
  let toastContainer = document.getElementById('cyber-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'cyber-toast-container';
    toastContainer.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; pointer-events: none;';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.style.cssText = 'background: rgba(10, 15, 26, 0.95); border: 1.5px solid var(--accent-emerald); color: #ffffff; padding: 12px 20px; border-radius: 8px; font-family: var(--font-body); font-size: 0.88rem; box-shadow: 0 8px 30px rgba(16, 185, 129, 0.3); backdrop-filter: blur(12px); pointer-events: auto; transform: translateY(0); transition: all 0.3s ease;';
  toast.innerHTML = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
};

// 1-CLICK COPY CONTACT ENGINE
window.copyContactText = function(text, label, event) {
  if (event) event.preventDefault();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showCyberToast(`📋 ${label} <b>${text}</b> berhasil disalin ke clipboard!`);
    }).catch(() => {
      showCyberToast(`📋 ${label}: <b>${text}</b>`);
    });
  } else {
    showCyberToast(`📋 ${label}: <b>${text}</b>`);
  }
};

window.downloadCV = function() {
  const lang = window.currentLang || 'id';
  const pdfFile = (lang === 'id') 
    ? 'CV_ATS_Alfaiz_Rayhan_Putra_Adji_CyberSecurity.pdf' 
    : 'Resume_ATS_Alfaiz_Rayhan_Putra_Adji_CyberSecurity_DFIR.pdf';
  window.open(pdfFile, '_blank');
};

// 4B. MULTILINGUAL BOT VOICE ENGINE (WEB SPEECH API - ZERO BUG ARCHITECTURE)
let isSpeaking = false;

window.speakBotVoice = function(customText) {
  if (!('speechSynthesis' in window)) {
    if (typeof showCyberToast === 'function') {
      showCyberToast('⚠️ Peramban Anda tidak mendukung Web Speech API');
    }
    return;
  }

  if (window.speechSynthesis.speaking || isSpeaking) {
    stopBotVoice();
    return;
  }

  const dict = (typeof i18nData !== 'undefined' && i18nData[currentLang]) ? i18nData[currentLang] : (i18nData ? i18nData.id : {});
  const textToSpeak = customText || dict.ttsSummary || dict.heroDesc;

  if (!textToSpeak) return;

  const ttsUtterance = new SpeechSynthesisUtterance(textToSpeak);

  const langMap = {
    id: 'id-ID',
    en: 'en-US',
    ja: 'ja-JP',
    ko: 'ko-KR',
    es: 'es-ES',
    fr: 'fr-FR'
  };

  const targetLangCode = langMap[currentLang] || 'id-ID';
  ttsUtterance.lang = targetLangCode;
  ttsUtterance.rate = 1.0;
  ttsUtterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    const matchedVoice = voices.find(v => v.lang === targetLangCode || v.lang.startsWith(currentLang));
    if (matchedVoice) {
      ttsUtterance.voice = matchedVoice;
    }
  }

  ttsUtterance.onstart = function() {
    isSpeaking = true;
    updateVoiceBotUI(true);
  };

  ttsUtterance.onend = function() {
    isSpeaking = false;
    updateVoiceBotUI(false);
  };

  ttsUtterance.onerror = function() {
    isSpeaking = false;
    updateVoiceBotUI(false);
  };

  window.speechSynthesis.speak(ttsUtterance);
};

window.stopBotVoice = function() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isSpeaking = false;
  updateVoiceBotUI(false);
};

function updateVoiceBotUI(speaking) {
  const dict = (typeof i18nData !== 'undefined' && i18nData[currentLang]) ? i18nData[currentLang] : (i18nData ? i18nData.id : {});
  const btnElements = document.querySelectorAll('.btn-voice-bot');

  btnElements.forEach(btn => {
    if (speaking) {
      btn.classList.add('speaking');
      btn.style.background = 'rgba(239, 68, 68, 0.25)';
      btn.style.borderColor = '#ef4444';
      btn.innerHTML = `<span>⏹️</span> <span>${dict.btnVoiceStop || '⏹️ Hentikan Suara Bot'}</span>`;
    } else {
      btn.classList.remove('speaking');
      btn.style.background = 'rgba(16, 185, 129, 0.2)';
      btn.style.borderColor = 'var(--accent-emerald)';
      btn.innerHTML = `<span>🔊</span> <span data-i18n="btnVoicePlay">${dict.btnVoicePlay || '🔊 Suara Bot (Bacakan)'}</span>`;
    }
  });
}

// 5. MODAL DIALOGS FOR PROJECT DETAILS
const modalContainer = document.getElementById('modal-container');
const modalBodyContent = document.getElementById('modal-body-content');

const modalData = {
  'hrd-modal': `
    <div style="border-bottom: 1.5px solid rgba(16, 185, 129, 0.3); padding-bottom: 12px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
      <div>
        <span data-i18n="hrdBadgeTitle" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-emerald); background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); padding: 3px 10px; border-radius: 4px; font-weight: 700;">
          🎯 EXECUTIVE CANDIDATE DASHBOARD (RINGKASAN 30 DETIK)
        </span>
        <h3 style="color: #ffffff; font-size: 1.4rem; margin-top: 6px; margin-bottom: 0;">Alfaiz Rayhan Putra Adji</h3>
        <p data-i18n="hrdRoleSub" style="color: var(--text-muted); font-size: 0.88rem; margin: 2px 0 0 0;">Spesialis Keamanan Siber (Blue Team OWASP Top 10) &amp; Investigasi Forensik Digital (DFIR)</p>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <button onclick="speakBotVoice()" class="btn-cta btn-voice-bot" style="padding: 10px 16px; font-size: 0.85rem; background: rgba(16, 185, 129, 0.2); border: 1.5px solid var(--accent-emerald);">
          <span>🔊</span> <span data-i18n="btnVoicePlay">🔊 Suara Bot (Bacakan)</span>
        </button>
        <a href="CV_ATS_Alfaiz_Rayhan_Putra_Adji_CyberSecurity.pdf" target="_blank" class="btn-cta" style="padding: 10px 14px; font-size: 0.82rem; background: rgba(6, 182, 212, 0.2); border: 1.5px solid var(--accent-cyan); text-decoration: none;">
          🇮🇩 PDF (ID)
        </a>
        <a href="Resume_ATS_Alfaiz_Rayhan_Putra_Adji_CyberSecurity_DFIR.pdf" target="_blank" class="btn-cta" style="padding: 10px 14px; font-size: 0.82rem; background: rgba(16, 185, 129, 0.2); border: 1.5px solid var(--accent-emerald); text-decoration: none;">
          🇬🇧 PDF (EN)
        </a>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-bottom: 16px;">
      <div style="background: rgba(10, 15, 26, 0.8); border: 1px solid rgba(6, 182, 212, 0.3); padding: 12px; border-radius: 10px;">
        <div data-i18n="hrdEduTitle" style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-cyan); font-weight: bold; margin-bottom: 6px;">
          🎓 PENDIDIKAN &amp; STATUS
        </div>
        <p data-i18n="hrdEduDesc" style="font-size: 0.85rem; color: var(--text-main); line-height: 1.45; margin: 0;">
          <b>Telkom University</b> — S1 Teknik Komputer (2022–2026)<br>
          <span style="color: var(--accent-emerald); font-size: 0.82rem;">🟢 Ready for Cyber Security &amp; DFIR Roles</span>
        </p>
      </div>

      <div style="background: rgba(10, 15, 26, 0.8); border: 1px solid rgba(16, 185, 129, 0.3); padding: 12px; border-radius: 10px;">
        <div data-i18n="hrdExpTitle" style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-emerald); font-weight: bold; margin-bottom: 6px;">
          👮 MAGANG KEPOLISIAN &amp; AKADEMIK
        </div>
        <p data-i18n="hrdExpDesc" style="font-size: 0.85rem; color: var(--text-main); line-height: 1.4; margin: 0;">
          • <b>Ditres Siber Polda Metro Jaya:</b> Intern Forensik Digital<br>
          • <b>Seculab Telkom Univ:</b> Asisten Lab &amp; Pembina Riset
        </p>
      </div>

      <div style="background: rgba(10, 15, 26, 0.8); border: 1px solid rgba(168, 85, 247, 0.3); padding: 12px; border-radius: 10px;">
        <div data-i18n="hrdCertTitle" style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-purple); font-weight: bold; margin-bottom: 6px;">
          🏆 SERTIFIKASI &amp; ASOSIASI
        </div>
        <p data-i18n="hrdCertDesc" style="font-size: 0.85rem; color: var(--text-main); line-height: 1.4; margin: 0;">
          • <b>AFDI:</b> Anggota Resmi Terdaftar<br>
          • <b>Sertifikasi:</b> Security Blue Team, PassMark OSFTC, Cisco, Cyber Academy
        </p>
      </div>
    </div>

    <div style="background: rgba(6, 182, 212, 0.06); border: 1px solid rgba(6, 182, 212, 0.25); padding: 14px; border-radius: 10px; margin-bottom: 16px;">
      <div data-i18n="hrdValueTitle" style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-cyan); font-weight: bold; margin-bottom: 6px;">
        💡 TOP 3 NILAI TAMBAH KANDIDAT BISA LANGSUNG KONTRIBUSI:
      </div>
      <ol data-i18n="hrdValueList" style="font-size: 0.85rem; color: var(--text-main); line-height: 1.5; margin-left: 18px; margin-bottom: 0;">
        <li><b>Keahlian Ganda (Dual Competency):</b> Mampu bertahan preventif (WAF/OWASP AppSec) dan menginvestigasi insiden pasca-serangan (DFIR).</li>
        <li><b>Pengalaman Praktis Lapangan:</b> Pernah menangani bukti digital &amp; laporan standar kepolisian di Ditres Siber Polda Metro Jaya.</li>
        <li><b>Soft Skills &amp; Leadership Teruji:</b> Berpengalaman mengajar praktikum lab, membimbing riset, serta memimpin operasional divisi kepanitiaan HMTK.</li>
      </ol>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; background: rgba(0,0,0,0.4); padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
      <span data-i18n="hrdQuickAction" style="font-size: 0.85rem; color: var(--text-muted);">Aksi Cepat Rekruter:</span>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button onclick="copyContactText('alfaiz1002@gmail.com', 'Email', event)" class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;">
          📧 Salin Email
        </button>
        <button onclick="copyContactText('08128429768', 'Nomor WhatsApp', event)" class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;">
          💬 Salin WhatsApp
        </button>
        <a href="https://www.linkedin.com/in/alfaiz-rayhan/" target="_blank" class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;">
          🔗 LinkedIn
        </a>
      </div>
    </div>
  `,
  'appsec-modal': `
    <h3 style="color: var(--accent-cyan); font-size: 1.35rem; margin-bottom: 12px;">Web Application Security &amp; Remediation OWASP Top 10</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
      Arsitektur keamanan backend mandiri yang dirancang dan diimplementasikan pada Tugas Akhir:
    </p>
    <ul style="color: var(--text-main); font-size: 0.88rem; margin-left: 20px; line-height: 1.65;">
      <li><b>WAF &amp; Middleware Pemindai Rekursif:</b> <code>DetectInjectionMiddleware</code> memindai GET &amp; POST untuk SQLi (UNION SELECT, OR 1=1) dan XSS (&lt;script&gt;, onerror=) dengan severity CRITICAL.</li>
      <li><b>Deteksi Bot &amp; Web Scraping:</b> 2-Layer defense (Signature User-Agent Python/Scrapy/Selenium &amp; Behavior Rate-Limit &gt;50 req/menit via Redis/File Cache).</li>
      <li><b>Proteksi Akses File &amp; Endpoint Debug:</b> 403 Forbidden blocking untuk file <code>.env</code>, <code>.git</code>, <code>.htaccess</code>, serta memblokir <code>/_debugbar</code>, <code>/telescope</code>, &amp; <code>phpinfo</code>.</li>
      <li><b>Autentikasi OTP Stateful CSPRNG:</b> 6-Digit random_int() dengan 15-menit expiry, 3x failed attempts lock, &amp; 3-Layer Auto-Cleaning (Realtime, Replay Attack Instant Cleanup, &amp; Laravel Prunable).</li>
      <li><b>Autentikasi OTP RFC Benchmark:</b> Validasi 100% RFC Test Vector untuk HOTP (RFC 4226), TOTP (RFC 6238), &amp; OCRA (RFC 6287). Auto-detect bahasa WhatsApp (ID vs EN).</li>
      <li><b>Keamanan Payment Midtrans:</b> Constant-time SHA-512 <code>hash_equals()</code> (Timing Attack protection), API Server Re-verification (Anti-Spoofing), &amp; Idempotency.</li>
      <li><b>Proteksi API IDOR:</b> Ownership token validation di <code>PaymentController</code> + logging otomatis <code>logIdorAttempt()</code>.</li>
      <li><b>HTTP Security Headers:</b> HSTS (1 tahun + subdomains), X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff), Referrer-Policy, &amp; Permissions-Policy. Endpoint <code>/csp-report</code>.</li>
      <li><b>Keamanan Password Dua-Lapis:</b> Client-side 5-criteria Regex 100% Strength Meter + Server-side Bcrypt hashing &amp; <code>uncompromised()</code> k-Anonymity leak check (HaveIBeenPwned API).</li>
      <li><b>Kebijakan Retensi Log ISO 27001:</b> Aturan Anti-Repudiation yang memproteksi bukti forensik aktif (usia 1–89 hari) dari insider threat/hacker, dan hanya mengizinkan pembersihan pada log &gt;90 hari.</li>
      <li><b>Telegram Security Alert:</b> Notifikasi real-time ke Telegram Bot untuk insiden CRITICAL/WARNING dilengkapi parser UserAgent (OS, Browser, Device, GeoIP).</li>
    </ul>
  `,
  'dfir-modal': `
    <h3 style="color: var(--accent-emerald); font-size: 1.35rem; margin-bottom: 12px;">Forensik Digital &amp; Triase Kepolisian</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
      Prosedur investigasi yang dikuasai selama magang di Ditres Siber Polda Metro Jaya:
    </p>
    <ul style="color: var(--text-main); font-size: 0.9rem; margin-left: 20px; line-height: 1.6;">
      <li><b>Akuisisi Bukti Digital:</b> Pencitraan bukti digital menggunakan write-blocker dengan FTK Imager &amp; Magnet ACQUIRE.</li>
      <li><b>Forensik Registry &amp; Basis Data:</b> Analisis HIVE Windows Registry via Registry Explorer serta validasi query SQLite Database Browser.</li>
      <li><b>Legalitas Hukum:</b> Preservasi Chain of Custody dan penyusunan laporan hasil analisis forensik standar penyidikan kepolisian.</li>
    </ul>
  `,
  'pineus-modal': `
    <h3 style="color: var(--accent-cyan); font-size: 1.35rem; margin-bottom: 12px;">Arsitektur Keamanan Reservasi Pineus Tilu (Tugas Akhir / Capstone Design)</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
      Detail 13 Fitur Keamanan Backend yang dirancang dan dikerjakan sendiri pada Tugas Akhir:
    </p>
    <ul style="color: var(--text-main); font-size: 0.88rem; margin-left: 20px; line-height: 1.6;">
      <li><b>WAF &amp; Scanner Rekursif:</b> Middleware pemindai SQLi (UNION SELECT) &amp; XSS (&lt;script&gt;) pada GET &amp; POST.</li>
      <li><b>Deteksi Bot &amp; Rate Anomaly:</b> Pemblokiran Signature Scraper (Python, cURL, Selenium) &amp; Anomali &gt;50 req/menit.</li>
      <li><b>OTP 2FA &amp; RFC Benchmark:</b> Stateful Random CSPRNG 6-digit + Validasi 100% RFC Test Vector (HOTP 4226, TOTP 6238, OCRA 6287). Pembersihan 3-Lapis (Anti-Replay Attack).</li>
      <li><b>Midtrans Payment Security:</b> Validasi SHA-512 <code>hash_equals()</code> (Anti-Timing Attack) + Re-verification API (Anti-Spoofing).</li>
      <li><b>Password Security &amp; Leak Check:</b> Hashing Bcrypt + Check Kebocoran <code>uncompromised()</code> via k-Anonymity.</li>
      <li><b>Retensi Log ISO 27001 &amp; Anti-Repudiation:</b> Proteksi ketat log 1-89 hari sebagai bukti forensik aktif, pembersihan dibatasi &gt;90 hari. Notifikasi real-time Telegram Bot + GeoIP.</li>
    </ul>
  `,
  'module-modal': `
    <h3 style="color: var(--accent-purple); font-size: 1.35rem; margin-bottom: 12px;">Modul Praktikum DFIR &amp; Kurikulum Laboratorium</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
      Kurikulum laboratorium utama yang disusun untuk Security Laboratory Telkom University:
    </p>
    <ul style="color: var(--text-main); font-size: 0.9rem; margin-left: 20px; line-height: 1.6;">
      <li>Landasan teori komprehensif &amp; petunjuk penyiapan perangkat lunak prasyarat.</li>
      <li>Lingkungan praktikum target (analisis artefak Windows &amp; Linux).</li>
      <li>Pembimbingan riset komparasi tiga tools analisis Windows Registry.</li>
    </ul>
  `,
  'studygroup-modal': `
    <h3 style="color: var(--accent-purple); font-size: 1.35rem; margin-bottom: 12px;">Webinar &amp; Workshop Hands-on: Digital Forensics Fundamentals</h3>
    <div style="background: rgba(168, 85, 247, 0.12); border: 1px solid rgba(168, 85, 247, 0.35); padding: 10px 16px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-purple); margin-bottom: 16px; font-weight: 600;">
      🎙️ Peran: Speaker &amp; Workshop Lead | Seculab Study Group Week 2
    </div>
    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
      Merancang dan membawakan sesi pelatihan interaktif mengenai investigasi forensik digital berdasarkan standar metodologi hukum &amp; akademik:
    </p>
    <ul style="color: var(--text-main); font-size: 0.88rem; margin-left: 20px; line-height: 1.65; margin-bottom: 16px;">
      <li><b>Kerangka Kerja NIST DFIR:</b> Penerapan metode ilmiah memulihkan, melestarikan, menganalisis, dan menyajikan data digital yang sah secara hukum.</li>
      <li><b>Standar Evidence Handling:</b> Prosedur 4 Tahap <code>Identify &rarr; Isolate &rarr; Preserve &rarr; Analyze</code> (termasuk pemutusan jaringan LAN/Wi-Fi &amp; isolasi perangkat).</li>
      <li><b>Cakupan Investigasi Spektrum Luas:</b> Mobile, Network, Cloud, Malware, dan IoT Forensics.</li>
      <li><b>Hands-on Analysis - HxD (Hex Editor):</b> Pemeriksaan data mentah pada level byte dari file, memori, &amp; storage.</li>
      <li><b>Hands-on Analysis - HashCalc (Integritas Bukti):</b> Verifikasi digital fingerprint cryptographic hash (MD5, SHA-1, SHA-256) untuk preservasi integritas bukti.</li>
      <li><b>Hands-on Analysis - ExifTool (Metadata):</b> Ekstraksi dan analisa metadata tersembunyi pada berkas digital.</li>
    </ul>
    <div class="badge-list">
      <span class="tech-tag">NIST Standard</span>
      <span class="tech-tag">HxD Hex Analysis</span>
      <span class="tech-tag">HashCalc Integrity</span>
      <span class="tech-tag">ExifTool Metadata</span>
      <span class="tech-tag">Evidence Preservation</span>
    </div>
  `
};

function openModal(id) {
  if (modalContainer && modalData[id]) {
    modalBodyContent.innerHTML = modalData[id];
    if (typeof currentLang !== 'undefined' && typeof i18nData !== 'undefined') {
      const dict = i18nData[currentLang] || i18nData.id;
      modalBodyContent.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.innerHTML = dict[key];
        }
      });
    }
    modalContainer.classList.add('active');
  }
}

function closeModal() {
  if (typeof stopBotVoice === 'function') {
    stopBotVoice();
  }
  if (modalContainer) {
    modalContainer.classList.remove('active');
  }
}

function closeModalOnOverlay(e) {
  if (e.target === modalContainer) {
    closeModal();
  }
}

/* ==========================================================================
   LEVEL DEWA UI/UX ENHANCEMENT MODULES
   ========================================================================== */

// 6. SCROLL PROGRESS BAR & ACTIVE NAV HIGHLIGHT
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  const progressBar = document.getElementById('scroll-bar');
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
});

// IntersectionObserver for Nav Link Highlight
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-link');
          } else {
            link.classList.remove('active-link');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
});

// 7. CUSTOM CYBER PRECISION CURSOR
(function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('cursor-dot');
  if (!cursor || !dot) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
  });

  const interactiveElements = document.querySelectorAll('a, button, input, select, .glass-card, .cert-card, .t-btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
})();

// 8. 3D TILT & MOUSE SPOTLIGHT ON CARDS
(function init3DTiltAndSpotlight() {
  const cards = document.querySelectorAll('.glass-card, .seclab-card, .cert-card, .formal-avatar-frame, .seclab-photo-frame, .afdi-honor-banner, .timeline-item, .bespoke-dossier-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spotlight coordinates
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
})();

// 10. HERO DUO-ASPECT PHOTO SWITCHER (LEVEL DEWA)
window.switchHeroPhoto = function(type) {
  const heroImg = document.getElementById('hero-avatar-img');
  const heroRoleText = document.getElementById('hero-avatar-role');
  const btnFormal = document.getElementById('btn-photo-formal');
  const btnLab = document.getElementById('btn-photo-lab');

  if (!heroImg) return;

  heroImg.style.opacity = '0.2';
  setTimeout(() => {
    const roleKey = type === 'lab' ? 'heroAvatarRoleLab' : 'heroAvatarRoleFormal';
    if (heroRoleText) {
      heroRoleText.setAttribute('data-i18n', roleKey);
      if (typeof i18nData !== 'undefined' && typeof currentLang !== 'undefined' && i18nData[currentLang] && i18nData[currentLang][roleKey]) {
        heroRoleText.textContent = i18nData[currentLang][roleKey];
      }
    }

    if (type === 'lab') {
      heroImg.src = 'images/profile_lab.jpg';
      if (btnLab) btnLab.classList.add('active');
      if (btnFormal) btnFormal.classList.remove('active');
    } else {
      heroImg.src = 'images/profile_formal.jpg';
      if (btnFormal) btnFormal.classList.add('active');
      if (btnLab) btnLab.classList.remove('active');
    }
    heroImg.style.opacity = '1';
  }, 80);
};

// 11. TABBED OPERATIONS FILTER (LEVEL DEWA)
window.filterOperations = function(category) {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const filterableItems = document.querySelectorAll('[data-category]');

  filterBtns.forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  filterableItems.forEach(item => {
    const itemCats = item.getAttribute('data-category').split(' ');
    if (category === 'all' || itemCats.includes(category)) {
      item.style.display = '';
      item.style.opacity = '0';
      setTimeout(() => { item.style.opacity = '1'; }, 50);
    } else {
      item.style.display = 'none';
    }
  });
};

// 12. FULL-SCREEN CERTIFICATE PHOTO VIEWER MODAL (WITH FORENSIC MAGNIFIER LENS & AUTHENTICITY BADGE)
window.openCertModal = function(imgSrc, title, event) {
  if (event) {
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  if (!modalContainer || !modalBodyContent) return;

  modalBodyContent.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px;">
      <h3 style="color: var(--accent-emerald); font-size: 1.15rem; margin: 0;">${title}</h3>
      <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-emerald); background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); padding: 3px 10px; border-radius: 4px; font-weight: 600;">
        ✓ OFFICIAL REGISTRY VALIDATED
      </span>
    </div>
    <div style="text-align: center; position: relative;">
      <div id="modal-magnifier-container" class="magnifier-container">
        <div id="modal-magnifier-lens" class="magnifier-lens"></div>
        <img id="modal-magnifier-img" src="${imgSrc}" alt="${title}" style="max-width: 100%; max-height: 68vh; border-radius: 12px; border: 1.5px solid var(--accent-emerald); box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);">
      </div>
      <div style="margin-top: 6px; font-size: 0.74rem; color: var(--accent-emerald); font-family: var(--font-mono);">🔍 Arahkan kursor di atas gambar untuk Kaca Pembesar Forensik (Zoom 2.2x)</div>
    </div>
    <div style="margin-top: 12px; display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.74rem; color: var(--text-muted);">
      <span>🔒 INTEGRITY: SHA-256 HASH VERIFIED</span>
      <span>STATUS: ACTIVE &amp; ADMISSIBLE ✓</span>
    </div>
  `;
  modalContainer.classList.add('active');

  setTimeout(() => {
    if (typeof window.initForensicLens === 'function') {
      window.initForensicLens('modal-magnifier-container', 'modal-magnifier-img', 'modal-magnifier-lens');
    }
  }, 100);
};

// 13. COPY CONTACT WITH CYBER TOAST NOTIFICATION
window.copyContactText = function(text, label, event) {
  if (event) {
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
    if (typeof event.preventDefault === 'function') event.preventDefault();
  }
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCyberToast(`📋 Berhasil disalin: ${label}`);
    });
  }
};

window.showCyberToast = function(message) {
  let toast = document.getElementById('cyber-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cyber-toast';
    toast.className = 'cyber-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>🟢</span> <div>${message}</div>`;
  toast.classList.add('active');
  
  if (window.toastTimer) clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
};

// 14. LEVEL DEWA SOC RADAR PING SIMULATOR & MATRIX TEXT DECODE
(function initSocRadarAndScramble() {
  const pingEl = document.getElementById('radar-ms');
  if (pingEl) {
    setInterval(() => {
      const ms = Math.floor(Math.random() * 16) + 18;
      pingEl.textContent = ms + 'ms';
    }, 2200);
  }

  const scrambleChars = '011001010101#$@%&*<>_[]/!X?Z';
  
  function scrambleText(element) {
    const originalText = element.getAttribute('data-orig-text') || element.textContent;
    if (!element.getAttribute('data-orig-text')) {
      element.setAttribute('data-orig-text', originalText);
    }
    
    let iteration = 0;
    const interval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((char, index) => {
          if (index < iteration || char === ' ' || char === '<' || char === '>') return char;
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join('');

      if (iteration >= originalText.length) {
        clearInterval(interval);
        element.textContent = originalText;
      }
      iteration += 1 / 2;
    }, 30);
  }

  document.querySelectorAll('.hero-greeting').forEach(el => {
    el.addEventListener('mouseenter', () => scrambleText(el));
  });
})();

// 15. RADAR NODE CLICK NAVIGATION HANDLER
window.navigateToNode = function(targetId, label) {
  const el = document.getElementById(targetId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    showCyberToast(`🎯 Telemetri Target: ${label}`);
  }
};

// 16. FORENSIC MAGNIFIER LENS HANDLER (LEVEL DEWA)
window.initForensicLens = function(containerId, imgId, lensId) {
  const container = document.getElementById(containerId);
  const img = document.getElementById(imgId);
  const lens = document.getElementById(lensId);

  if (!container || !img || !lens) return;

  function setupLens() {
    function moveLens(e) {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        lens.style.display = 'none';
        return;
      }

      lens.style.display = 'block';
      lens.style.backgroundImage = `url('${img.src}')`;
      lens.style.backgroundSize = `${rect.width * 2.4}px ${rect.height * 2.4}px`;

      const lensW = lens.offsetWidth / 2;
      const lensH = lens.offsetHeight / 2;

      lens.style.left = `${x - lensW}px`;
      lens.style.top = `${y - lensH}px`;
      lens.style.backgroundPosition = `-${x * 2.4 - lensW}px -${y * 2.4 - lensH}px`;
    }

    container.addEventListener('mousemove', moveLens);
    container.addEventListener('mouseleave', () => { lens.style.display = 'none'; });
  }

  if (img.complete && img.naturalWidth > 0) {
    setupLens();
  } else {
    img.onload = setupLens;
  }
};

// 17. 3D PARALLAX MOUSE TILT INTERACTIVE CARD MODULE (LEVEL DEWA)
(function init3DCardTilt() {
  document.addEventListener('DOMContentLoaded', () => {
    const tiltTargets = document.querySelectorAll('.cert-card, .project-card, .afdi-honor-banner');

    tiltTargets.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;

        const centerX = rect.left + cardWidth / 2;
        const centerY = rect.top + cardHeight / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = (-1 * (mouseY / (cardHeight / 2)) * 8).toFixed(2);
        const rotateY = ((mouseX / (cardWidth / 2)) * 8).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  });
})();

// 18. OPTION 3: CYBERWARP 3D PORTAL + MATRIX DIGITAL RAIN NAVIGATION ENGINE (LEVEL DEWA)
(function initCyberWarpAndMatrixRain() {
  const sections = ['hero', 'about', 'experience', 'projects', 'certifications', 'cv-dossier-banner', 'contact'];
  let currentSectionIdx = 0;
  let isWarping = false;

  // Matrix Rain Canvas Renderer
  const matrixCanvas = document.getElementById('matrix-rain-canvas');
  let matrixCtx = null;
  let matrixDrops = [];
  const matrixChars = '010101010101#$@%&*<>_[]/!X?Z';
  const fontSize = 14;

  if (matrixCanvas) {
    matrixCtx = matrixCanvas.getContext('2d');

    function resizeMatrixCanvas() {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
      const columns = Math.floor(matrixCanvas.width / fontSize);
      matrixDrops = [];
      for (let i = 0; i < columns; i++) {
        matrixDrops[i] = Math.floor(Math.random() * -50);
      }
    }
    resizeMatrixCanvas();
    window.addEventListener('resize', resizeMatrixCanvas);

    function drawMatrixRain() {
      if (!matrixCtx) return;
      matrixCtx.fillStyle = 'rgba(7, 10, 18, 0.15)';
      matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

      matrixCtx.fillStyle = '#10b981';
      matrixCtx.font = fontSize + 'px monospace';

      for (let i = 0; i < matrixDrops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        const x = i * fontSize;
        const y = matrixDrops[i] * fontSize;

        if (i % 3 === 0) {
          matrixCtx.fillStyle = '#06b6d4';
        } else {
          matrixCtx.fillStyle = '#10b981';
        }

        matrixCtx.fillText(text, x, y);

        if (y > matrixCanvas.height && Math.random() > 0.975) {
          matrixDrops[i] = 0;
        }
        matrixDrops[i]++;
      }
    }

    setInterval(drawMatrixRain, 35);
  }

  // Update Section Index Indicator
  function updateSectionIndicator() {
    const indicatorEl = document.getElementById('mobile-section-indicator');
    if (indicatorEl) {
      const current = String(currentSectionIdx + 1).padStart(2, '0');
      const total = String(sections.length).padStart(2, '0');
      indicatorEl.textContent = `${current} / ${total}`;
    }
  }

  // Navigation Controller
  window.navigateSection = function(targetInput) {
    if (isWarping) return;

    let targetIdx = currentSectionIdx;

    if (typeof targetInput === 'number') {
      if (targetInput === 1 || targetInput === -1) {
        targetIdx = currentSectionIdx + targetInput;
      } else {
        targetIdx = targetInput;
      }
    } else if (typeof targetInput === 'string') {
      const foundIdx = sections.indexOf(targetInput.replace('#', ''));
      if (foundIdx !== -1) targetIdx = foundIdx;
    }

    if (targetIdx < 0) targetIdx = 0;
    if (targetIdx >= sections.length) targetIdx = sections.length - 1;

    if (targetIdx === currentSectionIdx && typeof targetInput === 'number' && Math.abs(targetInput) === 1) return;

    currentSectionIdx = targetIdx;
    updateSectionIndicator();

    const targetId = sections[targetIdx];
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const overlay = document.getElementById('cyber-warp-overlay');
    const label = document.getElementById('warp-target-label');

    if (label) {
      label.textContent = `> TARGETING: NODE [0${targetIdx + 1}_${targetId.toUpperCase()}]`;
    }

    isWarping = true;
    if (overlay) overlay.classList.add('active');

    targetElement.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      if (overlay) overlay.classList.remove('active');
      isWarping = false;
    }, 280);
  };

  // Keyboard Shortcuts (Space, Enter, Arrows, Numbers)
  document.addEventListener('keydown', (e) => {
    // Ignore if typing in input/textarea or modal is open
    const activeEl = document.activeElement;
    const isEditing = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
    const modalContainer = document.getElementById('modal-container');
    const isModalOpen = modalContainer && modalContainer.classList.contains('active');

    if (isEditing || isModalOpen) return;

    // Space / Enter / ArrowDown / ArrowRight / PageDown -> Forward
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault();
      window.navigateSection(1);
    }
    // Shift+Space / ArrowUp / ArrowLeft / PageUp / Backspace -> Backward
    else if ((e.key === ' ' && e.shiftKey) || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      window.navigateSection(-1);
    }
    // Numbers 1 - 7 -> Direct Section Jump
    else if (e.key >= '1' && e.key <= '7') {
      e.preventDefault();
      window.navigateSection(parseInt(e.key) - 1);
    }
  });

  // IntersectionObserver to auto-sync current section index on manual scroll
  document.addEventListener('DOMContentLoaded', () => {
    updateSectionIndicator();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isWarping) {
          const idx = sections.indexOf(entry.target.id);
          if (idx !== -1) {
            currentSectionIdx = idx;
            updateSectionIndicator();
          }
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  });
})();

// 19. MOBILE MENU TOGGLE HANDLER
window.toggleMobileMenu = function() {
  const navLinks = document.querySelector('.nav-links');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  if (navLinks) {
    navLinks.classList.toggle('mobile-active');
  }
  if (toggleBtn) {
    toggleBtn.classList.toggle('open');
  }
};

// Auto close mobile menu when nav link is clicked
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      const toggleBtn = document.getElementById('mobile-menu-toggle');
      if (navLinks && navLinks.classList.contains('mobile-active')) {
        navLinks.classList.remove('mobile-active');
      }
      if (toggleBtn && toggleBtn.classList.contains('open')) {
        toggleBtn.classList.remove('open');
      }
    });
  });
});
