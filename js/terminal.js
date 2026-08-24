/* ==========================================================================
   ALFAIZ RAYHAN - INTERACTIVE TERMINAL WIDGET MODULE (MULTILINGUAL)
   ========================================================================== */

(function initTerminalModule() {
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  function getElements() {
    return {
      terminalInput: document.getElementById('terminal-input'),
      terminalBody: document.getElementById('terminal-body')
    };
  }

  function scrollToBottom() {
    const { terminalBody } = getElements();
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  const termi18n = {
    id: {
      help: `Perintah yang tersedia:
  <span style="color: var(--accent-cyan);">whoami</span>       - Menampilkan ringkasan profil profesional
  <span style="color: var(--accent-cyan);">skills</span>       - Menampilkan keahlian teknis &amp; tools forensik
  <span style="color: var(--accent-cyan);">seculab</span>      - Informasi Security Laboratory Telkom University
  <span style="color: var(--accent-cyan);">pengalaman</span>   - Riwayat magang, asisten lab, &amp; kepanitiaan HMTK
  <span style="color: var(--accent-cyan);">organisasi</span>   - Kepemimpinan panitia &amp; divisi (Centurion &amp; Connection)
  <span style="color: var(--accent-cyan);">proyek</span>       - Menampilkan proyek keamanan unggulan
  <span style="color: var(--accent-cyan);">sertifikasi</span>  - Daftar sertifikasi industri &amp; anggota AFDI
  <span style="color: var(--accent-cyan);">kontak</span>      - Kontak email, telepon, dan media sosial
  <span style="color: var(--accent-cyan);">clear</span>        - Bersihkan layar terminal
  <span style="color: var(--accent-cyan);">banner</span>       - Tampilkan banner ASCII keamanan
  <span style="color: var(--accent-cyan);">sudo</span>         - Cek hak akses administratif`,

      whoami: `Alfaiz Rayhan Putra Adji
Mahasiswa S1 Teknik Komputer @ Telkom University
Kompetensi Ganda: Blue Team Remediation (OWASP Top 10) &amp; Digital Forensics Investigation (DFIR).
Mantan Intern Forensik Digital @ Ditres Siber Polda Metro Jaya.`,

      hrd: `<span style="color: var(--accent-emerald); font-weight: bold;">[🎯 EXECUTIVE CANDIDATE DASHBOARD ENGAGED]</span><br>Membuka Ringkasan 30 Detik Kandidat...`,

      seculab: `<span style="color: var(--accent-purple); font-weight: bold;">Security Laboratory (Seculab) Telkom University:</span>
Laboratorium spesialis riset &amp; praktikum Keamanan OS, NetSec, &amp; DFIR.
Peran: Asisten Praktikum, Pembina Riset Divisi DFIR, &amp; Speaker Study Group Week 2.`,

      organisasi: `<span style="color: var(--accent-purple); font-weight: bold;">[+] KEPEMIMPINAN ORGANISASI &amp; KEPANITIAAN HMTK TELKOM UNIVERSITY:</span>
1. <span style="color: var(--accent-purple);">Centurion HMTK (2024)</span> - PJ Divisi Esports (FIFA Tournament Lead)
   • Memimpin operasional turnamen FIFA secara end-to-end (bracket, regulasi, penjadwalan &amp; sistem polling).
   • Menegakkan standar fair-play dan menyelesaikan sengketa teknis (100% lancar &amp; tepat waktu).
2. <span style="color: var(--accent-cyan);">Connection HMTK (2023)</span> - Divisi Sponsorship &amp; Moderator Edukasi
   • Eksplorasi prospek kemitraan dan koordinasi lintas divisi untuk kelancaran logistik acara.
   • Bertindak sebagai Moderator &amp; Mentor Sesi Edukasi logika pemrograman dan game untuk siswa kelas 3 SD.
3. <span style="color: var(--accent-emerald);">AFDI (2026 – Sekarang)</span> - Anggota Resmi Terdaftar Asosiasi Forensik Digital Indonesia.`,

      skills: `<span style="color: var(--accent-emerald); font-weight: bold;">[+] CYBER SECURITY:</span> Web AppSec, OWASP Top 10, WAF, OTP RFC 6238, Bcrypt/SHA-512, HTTP Headers, ISO 27001 Audit Logs
<span style="color: var(--accent-emerald); font-weight: bold;">[+] DIGITAL FORENSICS:</span> FTK Imager, Autopsy, OSForensics, Magnet ACQUIRE, Registry Explorer, Andriller, Chain of Custody
<span style="color: var(--accent-emerald); font-weight: bold;">[+] BAHASA &amp; DB:</span> PHP, JavaScript, Laravel, MySQL, Linux Shell`,

      pengalaman: `1. Digital Forensics Intern - Ditres Siber Polda Metro Jaya (Juni - Agus 2025)
   • Akuisisi bukti digital &amp; kepatuhan Chain of Custody.
   • Analisis artefak (Windows Registry, SQL DB, Storage, Mobile).
2. Teaching Assistant &amp; Pembina Riset - Security Lab, Telkom University (Semester 7-8)
   • Mengampu praktikum Keamanan Sistem &amp; OS. Merumuskan topik riset &amp; membimbing mahasiswa.
3. PJ Divisi Esports (FIFA Tournament Lead) - Centurion HMTK (2024)
   • Manajemen turnamen end-to-end, rulebook fair-play, koordinasi puluhan peserta.
4. Divisi Sponsorship &amp; Moderator Edukasi - Connection HMTK (2023)
   • Kemitraan sponsor, koordinasi lintas divisi, &amp; mentor logika game interaktif anak SD.`,

      proyek: `1. Arsitektur Keamanan Reservasi Pineus Tilu (Tugas Akhir S1):
   • 13+ fitur keamanan backend berbasis OWASP Top 10.
   • Keamanan kata sandi 2-lapis, engine OTP RFC, validasi webhook SHA-512 Midtrans, alert insiden Telegram Bot.
2. Modul Praktikum Forensik Digital:
   • Penulis kurikulum &amp; modul praktikum utama Security Laboratory Telkom University.`,

      sertifikasi: `• DFIR Foundations &amp; Techniques - Blue Cape Security (2026)
• OSForensics Triage Certification - PassMark Software (2025)
• Introduction to Digital Forensics - Security Blue Team (2025)
• Sertifikat Penghargaan Liaison Officer - Seculab Telkom University (2025)
• Cisco Networking Academy Certificate - Cisco (2026)
• Introduction to Information Security - Cyber Academy (2026)
• Classical Cryptography for Beginner - Cyber Academy (2026)
• Digital Forensics - OpenLearn, The Open University (2025)
• Anggota AFDI - Asosiasi Forensik Digital Indonesia (Anggota Resmi Terdaftar)`,

      kontak: `Email    : alfaiz1002@gmail.com
Telepon  : +62 8128429768
LinkedIn : linkedin.com/in/alfaiz-rayhan
GitHub   : github.com/alfaiz1002`,

      bannerText: `Operasi Keamanan Siber &amp; Forensik Digital`,
      sudoMsg: `<span style="color: #ef4444;">[!] Akses Ditolak: Alfaiz adalah root di stasiun kerja ini.</span>`,
      notFound: `perintah tidak ditemukan`
    },

    en: {
      help: `Available commands:
  <span style="color: var(--accent-cyan);">whoami</span>       - Display professional profile summary
  <span style="color: var(--accent-cyan);">skills</span>       - Display technical skills &amp; forensic tools
  <span style="color: var(--accent-cyan);">seculab</span>      - Security Laboratory Telkom University info
  <span style="color: var(--accent-cyan);">pengalaman</span>   - Work experience, lab assistant &amp; HMTK roles
  <span style="color: var(--accent-cyan);">organisasi</span>   - Committee &amp; division leadership (Centurion &amp; Connection)
  <span style="color: var(--accent-cyan);">proyek</span>       - Display featured security projects
  <span style="color: var(--accent-cyan);">sertifikasi</span>  - Industry certifications &amp; AFDI membership
  <span style="color: var(--accent-cyan);">kontak</span>      - Email, phone, &amp; social media links
  <span style="color: var(--accent-cyan);">clear</span>        - Clear terminal screen
  <span style="color: var(--accent-cyan);">banner</span>       - Display ASCII security banner
  <span style="color: var(--accent-cyan);">sudo</span>         - Check admin privilege access`,

      whoami: `Alfaiz Rayhan Putra Adji
B.S. Computer Engineering Student @ Telkom University
Dual Competencies: Blue Team Remediation (OWASP Top 10) &amp; Digital Forensics Investigation (DFIR).
Former Digital Forensics Intern @ Ditres Siber Metro Police.`,

      hrd: `<span style="color: var(--accent-emerald); font-weight: bold;">[🎯 EXECUTIVE CANDIDATE DASHBOARD ENGAGED]</span><br>Opening 30-Second Candidate Summary...`,

      seculab: `<span style="color: var(--accent-purple); font-weight: bold;">Security Laboratory (Seculab) Telkom University:</span>
Specialized research &amp; teaching lab for OS Security, NetSec, &amp; DFIR.
Roles: Teaching Assistant, DFIR Research Lead, &amp; Speaker for Study Group Week 2.`,

      organisasi: `<span style="color: var(--accent-purple); font-weight: bold;">[+] ORGANIZATIONAL LEADERSHIP &amp; HMTK COMMITTEES:</span>
1. <span style="color: var(--accent-purple);">Centurion HMTK (2024)</span> - Esports Division Lead (FIFA Tournament Lead)
   • Led tournament operations end-to-end (bracket structure, regulations, scheduling &amp; polling).
   • Enforced fair-play standards and resolved technical disputes (100% smooth &amp; on-time).
2. <span style="color: var(--accent-cyan);">Connection HMTK (2023)</span> - Sponsorship &amp; Education Moderator
   • Managed sponsor outreach and cross-divisional coordination for event logistics.
   • Served as Moderator &amp; Mentor for interactive programming logic and game creation session for 3rd-grade students.
3. <span style="color: var(--accent-emerald);">AFDI (2026 – Present)</span> - Official Registered Member of Indonesian Digital Forensics Association.`,

      skills: `<span style="color: var(--accent-emerald); font-weight: bold;">[+] CYBER SECURITY:</span> Web AppSec, OWASP Top 10, WAF, OTP RFC 6238, Bcrypt/SHA-512, HTTP Headers, ISO 27001 Audit Logs
<span style="color: var(--accent-emerald); font-weight: bold;">[+] DIGITAL FORENSICS:</span> FTK Imager, Autopsy, OSForensics, Magnet ACQUIRE, Registry Explorer, Andriller, Chain of Custody
<span style="color: var(--accent-emerald); font-weight: bold;">[+] LANGUAGES &amp; DB:</span> PHP, JavaScript, Laravel, MySQL, Linux Shell`,

      pengalaman: `1. Digital Forensics Intern - Ditres Siber Metro Police (June - Aug 2025)
   • Digital evidence acquisition &amp; Chain of Custody compliance.
   • Artifact analysis (Windows Registry, SQL DB, Storage, Mobile).
2. Teaching Assistant &amp; Research Lead - Security Lab, Telkom University (Semesters 7-8)
   • Instructed System Security &amp; OS labs. Formulated research topics &amp; mentored students.
3. Esports Division Lead (FIFA Tournament Lead) - Centurion HMTK (2024)
   • End-to-end tournament management, fair-play rulebook, coordinated dozens of players.
4. Sponsorship &amp; Education Moderator - Connection HMTK (2023)
   • Sponsor partnerships, cross-divisional coordination, &amp; interactive game logic mentor.`,

      proyek: `1. Pineus Tilu Reservation Security Architecture (Capstone Design):
   • 13+ OWASP Top 10 backend defense features.
   • 2-Layer password security, OTP RFC engine, Midtrans SHA-512 webhook validation, Telegram alert bot.
2. Digital Forensics Lab Practicum Modules:
   • Author of main curriculum &amp; practicum modules at Security Laboratory Telkom University.`,

      sertifikasi: `• DFIR Foundations &amp; Techniques - Blue Cape Security (2026)
• OSForensics Triage Certification - PassMark Software (2025)
• Introduction to Digital Forensics - Security Blue Team (2025)
• Liaison Officer Certificate of Appreciation - Seculab Telkom University (2025)
• Cisco Networking Academy Certificate - Cisco (2026)
• Introduction to Information Security - Cyber Academy (2026)
• Classical Cryptography for Beginner - Cyber Academy (2026)
• Digital Forensics - OpenLearn, The Open University (2025)
• AFDI Member - Indonesian Digital Forensics Association (Official Registered Member)`,

      kontak: `Email    : alfaiz1002@gmail.com
Phone    : +62 8128429768
LinkedIn : linkedin.com/in/alfaiz-rayhan
GitHub   : github.com/alfaiz1002`,

      bannerText: `Cyber Security Operations &amp; Digital Forensics`,
      sudoMsg: `<span style="color: #ef4444;">[!] Access Denied: Alfaiz is root on this workstation.</span>`,
      notFound: `command not found`
    },

    ja: {
      help: `利用可能なコマンド:
  <span style="color: var(--accent-cyan);">whoami</span>       - プロフィール要約を表示
  <span style="color: var(--accent-cyan);">skills</span>       - 技術スキルおよびフォレンジックツールを表示
  <span style="color: var(--accent-cyan);">seculab</span>      - テルコム大学セキュリティラボ情報
  <span style="color: var(--accent-cyan);">pengalaman</span>   - 経歴、指導助手およびHMTK役職
  <span style="color: var(--accent-cyan);">organisasi</span>   - 委員会および部門の指導実績 (Centurion &amp; Connection)
  <span style="color: var(--accent-cyan);">proyek</span>       - 主要なセキュリティプロジェクトを表示
  <span style="color: var(--accent-cyan);">sertifikasi</span>  - 認定資格およびAFDI会員資格
  <span style="color: var(--accent-cyan);">kontak</span>      - 連絡先情報
  <span style="color: var(--accent-cyan);">clear</span>        - 画面をクリア
  <span style="color: var(--accent-cyan);">banner</span>       - ASCIIセキュリティバナーを表示`,

      whoami: `アルファイズ・レイハン・プトラ・アジ
テルコム大学 コンピュータ工学科専攻
デュアルスキル: Webセキュリティ (OWASP Top 10) ＆ デジタルフォレンジック調査 (DFIR)。
ジャカルタ首都圏警察サイバー犯罪捜査局 元鑑識インターン。`,

      hrd: `<span style="color: var(--accent-emerald); font-weight: bold;">[🎯 エグゼクティブダッシュボード起動]</span><br>30秒候補者要約を開いています...`,

      seculab: `<span style="color: var(--accent-purple); font-weight: bold;">テルコム大学セキュリティラボ (Seculab):</span>
OSセキュリティ、ネットセック、DFIRの研究・実習専用ラボ。
役職: 実習指導助手、DFIR研究責任者、Study Group Week 2スピーカー。`,

      organisasi: `<span style="color: var(--accent-purple); font-weight: bold;">[+] 組織のリーダーシップ＆HMTK委員会:</span>
1. <span style="color: var(--accent-purple);">Centurion HMTK (2024)</span> - Esports部門責任者 (FIFA大会統括)
   • 大会運営全般（トーナメント表、規則、スケジュール、投票システム）を統括。
2. <span style="color: var(--accent-cyan);">Connection HMTK (2023)</span> - スポンサー部門＆教育モデレーター
   • スポンサー開拓および小学3年生向けプログラミング教育モデレーター。
3. <span style="color: var(--accent-emerald);">AFDI (2026 – 現在)</span> - インドネシアデジタルフォレンジック協会 正式会員。`,

      skills: `<span style="color: var(--accent-emerald); font-weight: bold;">[+] サイバーセキュリティ:</span> Web AppSec, OWASP Top 10, WAF, OTP RFC 6238, Bcrypt/SHA-512, ISO 27001 Logs
<span style="color: var(--accent-emerald); font-weight: bold;">[+] デジタルフォレンジック:</span> FTK Imager, Autopsy, OSForensics, Magnet ACQUIRE, Registry Explorer, Andriller
<span style="color: var(--accent-emerald); font-weight: bold;">[+] 言語＆DB:</span> PHP, JavaScript, Laravel, MySQL, Linux Shell`,

      pengalaman: `1. デジタルフォレンジックインターン - ジャカルタ警視庁 (2025年6月～8月)
2. 実習指導助手＆研究指導責任者 - テルコム大学 Seculab (第7-8学期)
3. Esports部門責任者 (FIFA Tournament Lead) - Centurion HMTK (2024)
4. スポンサー部門＆教育モデレーター - Connection HMTK (2023)`,

      proyek: `1. Pineus Tilu Webセキュリティアーキテクチャ (卒業研究):
   • OWASP Top 10に基づく13以上のバックエンド防御機能。
2. デジタルフォレンジック実習モジュール:
   • テルコム大学Seculab主要カリキュラム著者。`,

      sertifikasi: `• DFIR Foundations &amp; Techniques - Blue Cape Security (2026)
• OSForensics Triage Certification - PassMark Software (2025)
• Security Blue Team, Cisco, Cyber Academy, AFDI正式会員`,

      kontak: `Email    : alfaiz1002@gmail.com
Phone    : +62 8128429768
LinkedIn : linkedin.com/in/alfaiz-rayhan
GitHub   : github.com/alfaiz1002`,

      bannerText: `サイバーセキュリティ＆デジタルフォレンジック`,
      sudoMsg: `<span style="color: #ef4444;">[!] アクセス拒否: Alfaizはこのワークステーションのrootです。</span>`,
      notFound: `コマンドが見つかりません`
    },

    ko: {
      help: `사용 가능한 명령어:
  <span style="color: var(--accent-cyan);">whoami</span>       - 프로필 요약 표시
  <span style="color: var(--accent-cyan);">skills</span>       - 기술 스킬 및 포렌식 툴 표시
  <span style="color: var(--accent-cyan);">seculab</span>      - 텔콤 대학교 보안 연구소 정보
  <span style="color: var(--accent-cyan);">pengalaman</span>   - 경력, 실습 조교 및 HMTK 역량
  <span style="color: var(--accent-cyan);">organisasi</span>   - 위원회 및 부서 리더십 (Centurion &amp; Connection)
  <span style="color: var(--accent-cyan);">proyek</span>       - 주요 보안 프로젝트 표시
  <span style="color: var(--accent-cyan);">sertifikasi</span>  - 산업 자격증 및 AFDI 회원 자격
  <span style="color: var(--accent-cyan);">kontak</span>      - 연락처 정보
  <span style="color: var(--accent-cyan);">clear</span>        - 화면 지우기
  <span style="color: var(--accent-cyan);">banner</span>       - ASCII 보안 배너 표시`,

      whoami: `알파이즈 레이한 푸트라 아지
텔콤 대학교 컴퓨터공학과 전공
이중 전문성: 웹 보안 (OWASP Top 10) 및 디지털 포렌식 수사 (DFIR).
자카르타 수도경찰청 사이버수사대 전 포렌식 인턴.`,

      hrd: `<span style="color: var(--accent-emerald); font-weight: bold;">[🎯 대시보드 요약 실행]</span><br>30초 지원자 요약을 열고 있습니다...`,

      seculab: `<span style="color: var(--accent-purple); font-weight: bold;">텔콤 대학교 보안 연구소 (Seculab):</span>
OS 보안, NetSec, DFIR 전용 연구 및 실습 연구소.
역할: 실습 조교, DFIR 연구 지도자, Study Group 스피커.`,

      organisasi: `<span style="color: var(--accent-purple); font-weight: bold;">[+] 조직 리더십 및 HMTK 위원회:</span>
1. <span style="color: var(--accent-purple);">Centurion HMTK (2024)</span> - Esports 부서 총괄 (FIFA 대회 리드)
2. <span style="color: var(--accent-cyan);">Connection HMTK (2023)</span> - 스폰서십 및 교육 모더레이터
3. <span style="color: var(--accent-emerald);">AFDI (2026 – 현재)</span> - 인도네시아 디지털 포렌식 협회 정회원.`,

      skills: `<span style="color: var(--accent-emerald); font-weight: bold;">[+] 사이버 보안:</span> Web AppSec, OWASP Top 10, WAF, OTP RFC 6238, Bcrypt/SHA-512, ISO 27001 Logs
<span style="color: var(--accent-emerald); font-weight: bold;">[+] 디지털 포렌식:</span> FTK Imager, Autopsy, OSForensics, Magnet ACQUIRE, Registry Explorer, Andriller
<span style="color: var(--accent-emerald); font-weight: bold;">[+] 언어 및 DB:</span> PHP, JavaScript, Laravel, MySQL, Linux Shell`,

      pengalaman: `1. 디지털 포렌식 인턴 - 자카르타 경찰청 사이버수사대 (2025년 6월~8월)
2. 실습 조교 및 연구 지도자 - 텔콤 대학교 Seculab (7-8학기)
3. Esports 부서 총괄 - Centurion HMTK (2024)
4. 스폰서십 및 교육 모더레이터 - Connection HMTK (2023)`,

      proyek: `1. Pineus Tilu 웹 보안 아키텍처 (졸업 작품):
   • OWASP Top 10 기반 13개 이상 백엔드 보안 기능.
2. 디지털 포렌식 실습 모듈:
   • 텔콤 대학교 Seculab 주요 커리큘럼 저자.`,

      sertifikasi: `• DFIR Foundations &amp; Techniques - Blue Cape Security (2026)
• OSForensics Triage Certification - PassMark Software (2025)
• Security Blue Team, Cisco, Cyber Academy, AFDI 정회원`,

      kontak: `Email    : alfaiz1002@gmail.com
Phone    : +62 8128429768
LinkedIn : linkedin.com/in/alfaiz-rayhan
GitHub   : github.com/alfaiz1002`,

      bannerText: `사이버 보안 및 디지털 포렌식`,
      sudoMsg: `<span style="color: #ef4444;">[!] 접근 거부: Alfaiz는 이 워크스테이션의 root입니다.</span>`,
      notFound: `명령어를 찾을 수 없습니다`
    },

    es: {
      help: `Comandos disponibles:
  <span style="color: var(--accent-cyan);">whoami</span>       - Mostrar resumen del perfil profesional
  <span style="color: var(--accent-cyan);">skills</span>       - Mostrar habilidades técnicas y herramientas forenses
  <span style="color: var(--accent-cyan);">seculab</span>      - Información de Security Laboratory Telkom Univ
  <span style="color: var(--accent-cyan);">pengalaman</span>   - Experiencia laboral, asistente de lab y HMTK
  <span style="color: var(--accent-cyan);">organisasi</span>   - Liderazgo de comités (Centurion &amp; Connection)
  <span style="color: var(--accent-cyan);">proyek</span>       - Mostrar proyectos de seguridad
  <span style="color: var(--accent-cyan);">sertifikasi</span>  - Certificaciones industriales y membrecía AFDI
  <span style="color: var(--accent-cyan);">kontak</span>      - Enlaces de contacto y redes sociales
  <span style="color: var(--accent-cyan);">clear</span>        - Limpiar pantalla del terminal
  <span style="color: var(--accent-cyan);">banner</span>       - Mostrar banner ASCII de seguridad`,

      whoami: `Alfaiz Rayhan Putra Adji
Estudiante de Ing. Informática @ Universidad de Telkom
Doble Competencia: Seguridad Web (OWASP Top 10) e Investigación Forense Digital (DFIR).
Ex Pasante de Forense Digital @ Policía Metropolitana de Yakarta.`,

      hrd: `<span style="color: var(--accent-emerald); font-weight: bold;">[🎯 PANEL EJECUTIVO ACTIVADO]</span><br>Abriendo Resumen de 30 Segundos...`,

      seculab: `<span style="color: var(--accent-purple); font-weight: bold;">Security Laboratory (Seculab) Telkom University:</span>
Laboratorio especializado de investigación en Seguridad de SO, NetSec y DFIR.
Roles: Asistente de Laboratorio y Asesor de Investigación en DFIR.`,

      organisasi: `<span style="color: var(--accent-purple); font-weight: bold;">[+] LIDERAZGO ORGANIZACIONAL Y COMITÉS HMTK:</span>
1. <span style="color: var(--accent-purple);">Centurion HMTK (2024)</span> - Líder de División Esports (FIFA Tournament Lead)
2. <span style="color: var(--accent-cyan);">Connection HMTK (2023)</span> - División de Patrocinios y Moderador de Educación
3. <span style="color: var(--accent-emerald);">AFDI (2026 – Presente)</span> - Miembro Registrado de la Asociación Forense Digital de Indonesia.`,

      skills: `<span style="color: var(--accent-emerald); font-weight: bold;">[+] CIBERSEGURIDAD:</span> Web AppSec, OWASP Top 10, WAF, OTP RFC 6238, Bcrypt/SHA-512, ISO 27001 Logs
<span style="color: var(--accent-emerald); font-weight: bold;">[+] FORENSE DIGITAL:</span> FTK Imager, Autopsy, OSForensics, Magnet ACQUIRE, Registry Explorer, Andriller
<span style="color: var(--accent-emerald); font-weight: bold;">[+] LENGUAJES Y BD:</span> PHP, JavaScript, Laravel, MySQL, Linux Shell`,

      pengalaman: `1. Pasante Forense Digital - Policía Metropolitana de Yakarta (Junio - Agosto 2025)
2. Asistente y Asesor de Investigación - Seculab Telkom Univ (Semestres 7-8)
3. Líder de Torneos Esports - Centurion HMTK (2024)
4. Patrocinios y Moderador Educativo - Connection HMTK (2023)`,

      proyek: `1. Arquitectura de Seguridad Pineus Tilu (Proyecto Final):
   • 13+ funciones de defensa backend basadas en OWASP Top 10.
2. Módulos Prácticos de Forense Digital:
   • Autor del plan de estudios principal en el Laboratorio de Seguridad.`,

      sertifikasi: `• DFIR Foundations &amp; Techniques - Blue Cape Security (2026)
• OSForensics Triage Certification - PassMark Software (2025)
• Security Blue Team, Cisco, Cyber Academy, Miembro Registrado AFDI`,

      kontak: `Email    : alfaiz1002@gmail.com
Teléfono : +62 8128429768
LinkedIn : linkedin.com/in/alfaiz-rayhan
GitHub   : github.com/alfaiz1002`,

      bannerText: `Operaciones de Ciberseguridad y Forense Digital`,
      sudoMsg: `<span style="color: #ef4444;">[!] Acceso Denegado: Alfaiz es root en esta estación de trabajo.</span>`,
      notFound: `comando no encontrado`
    },

    fr: {
      help: `Commandes disponibles:
  <span style="color: var(--accent-cyan);">whoami</span>       - Afficher le résumé du profil professionnel
  <span style="color: var(--accent-cyan);">skills</span>       - Afficher les compétences techniques &amp; outils DFIR
  <span style="color: var(--accent-cyan);">seculab</span>      - Infos sur le Security Laboratory Telkom Univ
  <span style="color: var(--accent-cyan);">pengalaman</span>   - Expériences, assistant lab &amp; rôles HMTK
  <span style="color: var(--accent-cyan);">organisasi</span>   - Leadership comités (Centurion &amp; Connection)
  <span style="color: var(--accent-cyan);">proyek</span>       - Afficher les projets de sécurité
  <span style="color: var(--accent-cyan);">sertifikasi</span>  - Certifications industrielles &amp; membre AFDI
  <span style="color: var(--accent-cyan);">kontak</span>      - Coordonnées et réseaux sociaux
  <span style="color: var(--accent-cyan);">clear</span>        - Effacer l'écran du terminal
  <span style="color: var(--accent-cyan);">banner</span>       - Afficher la bannière ASCII`,

      whoami: `Alfaiz Rayhan Putra Adji
Étudiant en Génie Informatique @ Université Telkom
Double compétence: Sécurité Web (OWASP Top 10) &amp; Enquêtes Numériques (DFIR).
Ancien Stagiaire en Informatique Légale @ Police Criminelle Numérique.`,

      hrd: `<span style="color: var(--accent-emerald); font-weight: bold;">[🎯 TABLEAU DE BORD EXÉCUTIF ACTIVÉ]</span><br>Ouverture du Résumé 30 Secondes...`,

      seculab: `<span style="color: var(--accent-purple); font-weight: bold;">Security Laboratory (Seculab) Université Telkom:</span>
Laboratoire spécialisé en Sécurité OS, NetSec &amp; DFIR.
Rôles: Assistant d'Enseignement, Chef de Recherche DFIR &amp; Conférencier.`,

      organisasi: `<span style="color: var(--accent-purple); font-weight: bold;">[+] LEADERSHIP ORGANISATIONNEL ET COMITÉS HMTK:</span>
1. <span style="color: var(--accent-purple);">Centurion HMTK (2024)</span> - Responsable Division Esports (FIFA Tournament Lead)
2. <span style="color: var(--accent-cyan);">Connection HMTK (2023)</span> - Division Sponsoring &amp; Modérateur Éducatif
3. <span style="color: var(--accent-emerald);">AFDI (2026 – Présent)</span> - Membre Officiel de l'Association d'Informatique Légale Indonésienne.`,

      skills: `<span style="color: var(--accent-emerald); font-weight: bold;">[+] CYBERSÉCURITÉ:</span> Web AppSec, OWASP Top 10, WAF, OTP RFC 6238, Bcrypt/SHA-512, ISO 27001 Logs
<span style="color: var(--accent-emerald); font-weight: bold;">[+] INFORMATIQUE LÉGALE:</span> FTK Imager, Autopsy, OSForensics, Magnet ACQUIRE, Registry Explorer, Andriller
<span style="color: var(--accent-emerald); font-weight: bold;">[+] LANGAGES &amp; BD:</span> PHP, JavaScript, Laravel, MySQL, Linux Shell`,

      pengalaman: `1. Stagiaire DFIR - Police Criminelle Numérique (Juin - Août 2025)
2. Assistant d'Enseignement &amp; Chef de Recherche - Seculab Telkom Univ (Semestres 7-8)
3. Responsable Tournois Esports - Centurion HMTK (2024)
4. Division Sponsoring &amp; Modérateur Éducatif - Connection HMTK (2023)`,

      proyek: `1. Architecture de Sécurité Pineus Tilu (Projet de Fin d'Études):
   • 13+ fonctionnalités de défense backend basées sur OWASP Top 10.
2. Modules Pratiques d'Informatique Légale:
   • Auteur du programme principal au Security Laboratory.`,

      sertifikasi: `• DFIR Foundations &amp; Techniques - Blue Cape Security (2026)
• OSForensics Triage Certification - PassMark Software (2025)
• Security Blue Team, Cisco, Cyber Academy, Membre Officiel AFDI`,

      kontak: `Email    : alfaiz1002@gmail.com
Téléphone: +62 8128429768
LinkedIn : linkedin.com/in/alfaiz-rayhan
GitHub   : github.com/alfaiz1002`,

      bannerText: `Opérations de Cybersécurité &amp; Informatique Légale`,
      sudoMsg: `<span style="color: #ef4444;">[!] Accès Refusé: Alfaiz est root sur cette station de travail.</span>`,
      notFound: `commande non trouvée`
    }
  };

  function processCommand(rawInput) {
    const { terminalInput, terminalBody } = getElements();
    if (!terminalBody) return;

    const cmd = rawInput.trim().toLowerCase();

    // Render input prompt line
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-output';
    inputLine.innerHTML = `<span style="color: var(--accent-emerald); font-weight: bold;">alfaiz@sec-ops:~$</span> ${escapeHTML(rawInput)}`;
    
    if (terminalInput && terminalInput.parentElement) {
      terminalBody.insertBefore(inputLine, terminalInput.parentElement);
      terminalInput.value = '';
    } else {
      terminalBody.appendChild(inputLine);
    }

    if (cmd === '') {
      scrollToBottom();
      return;
    }

    const activeLang = (typeof window.currentLang !== 'undefined' && termi18n[window.currentLang]) ? window.currentLang : (localStorage.getItem('pref-lang') || 'id');
    const langDict = termi18n[activeLang] || termi18n.id;

    const pseudoHash = Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('');
    let response = `<span style="color: #64748b; font-size: 0.76rem; font-family: var(--font-mono); display: block; margin-bottom: 6px;">🔒 [TELEMETRY_SHA256: e3b0c442...${pseudoHash} | COMPUTE_TIME: 0.42ms | VERIFIED ✓]</span>`;

    switch(cmd) {
      case 'help':
      case 'bantuan':
        response += langDict.help;
        break;

      case 'whoami':
      case 'profile':
      case 'profil':
        response += langDict.whoami;
        break;

      case 'hrd':
      case 'rekruter':
      case 'recruiter':
        if (typeof openModal === 'function') {
          openModal('hrd-modal');
        }
        response += langDict.hrd;
        break;

      case 'seculab':
      case 'seclab':
        response += langDict.seculab;
        break;

      case 'organisasi':
      case 'organization':
      case 'kepanitiaan':
      case 'hmtk':
      case 'centurion':
      case 'connection':
      case 'leadership':
        response += langDict.organisasi;
        break;

      case 'studygroup':
      case 'webinar':
        response += langDict.seculab;
        break;

      case 'skills':
      case 'keahlian':
        response += langDict.skills;
        break;

      case 'pengalaman':
      case 'experience':
      case 'work':
        response += langDict.pengalaman;
        break;

      case 'proyek':
      case 'projects':
        response += langDict.proyek;
        break;

      case 'certs':
      case 'sertifikasi':
      case 'certifications':
        response += langDict.sertifikasi;
        break;

      case 'kontak':
      case 'contact':
        response += langDict.kontak;
        break;

      case 'clear':
        const outputs = terminalBody.querySelectorAll('.terminal-output');
        outputs.forEach(el => el.remove());
        scrollToBottom();
        return;

      case 'banner':
        response += `<span style="color: var(--accent-cyan);">
  █████╗ ██╗     ███████╗████╗███████╗
 ██╔══██╗██║     ██╔════╝██║██║██╔════╝
 ███████║██║     █████╗  ██║██║███████╗
 ██╔══██║██║     ██╔══╝  ██║██║╚════██║
 ██║  ██║███████╗██║     ██║██║███████╗
 ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝╚══════╝</span>
 ${langDict.bannerText}`;
        break;

      case 'sudo':
        response += langDict.sudoMsg;
        break;

      default:
        response += `bash: ${langDict.notFound}: <span style="color: #ef4444;">${escapeHTML(cmd)}</span>. Ketik '<span style="color: var(--accent-emerald);">help</span>' untuk bantuan.`;
    }

    const responseLine = document.createElement('div');
    responseLine.className = 'terminal-output';
    responseLine.innerHTML = response;

    if (terminalInput && terminalInput.parentElement) {
      terminalBody.insertBefore(responseLine, terminalInput.parentElement);
    } else {
      terminalBody.appendChild(responseLine);
    }

    scrollToBottom();
  }

  // GLOBAL EXPORTS FOR QUICK BUTTONS & AUTO-DEMO
  window.execQuickCmd = function(cmd) {
    processCommand(cmd);
  };

  let isDemoRunning = false;
  window.startAutoDemo = function() {
    if (isDemoRunning) return;
    isDemoRunning = true;

    processCommand('clear');
    const demoSequence = ['whoami', 'skills', 'seculab', 'sertifikasi'];
    let delay = 300;

    demoSequence.forEach((cmd, idx) => {
      setTimeout(() => {
        processCommand(cmd);
        if (idx === demoSequence.length - 1) {
          isDemoRunning = false;
        }
      }, delay);
      delay += 1000;
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    const { terminalInput } = getElements();
    if (!terminalInput) return;

    terminalInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        processCommand(terminalInput.value);
      }
    });
  });
})();
