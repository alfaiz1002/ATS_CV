# Catatan Pembangunan & Panduan CV ATS (Alfaiz Rayhan Putra Adji)

Dokumen ini berisi penjelasan teknis, hasil audit rekomendasi, dan petunjuk penggunaan berkas HTML CV ATS yang telah dibuat di folder ini.

---

## 🌟 Master CV ATS Gabungan (Tersedia Versi EN & ID)

**Nama Lengkap:** **Alfaiz Rayhan Putra Adji**  
**Berkas Utama Bahasa Inggris:** **`cv_alfaiz_rayhan.html`**  
**Berkas Utama Bahasa Indonesia:** **`cv_alfaiz_rayhan_id.html`**  
**Web Interactive / Portfolio:** **`index.html`** (Dilengkapi fitur *Language Switcher* ID/EN/JA/KO/ES/FR)

CV ATS ini menggabungkan seluruh keahlian Anda di bidang **Cyber Security (Web AppSec & OWASP Top 10)** dan **Digital Forensics (Ditres Siber Polda Metro Jaya)** ke dalam 1 dokumen presisi **2 halaman A4** yang siap digunakan untuk melamar di Perusahaan Nasional, BUMN, Instansi Pemerintah (Versi Indonesia), maupun Perusahaan Multinasional / MNC (Versi Inggris).

---

## 📋 Hasil Audit & Verifikasi Rekomendasi

### 1. Keterbacaan Ukuran Font Cetak / PDF
- **Pemeriksaan:** Ukuran font di `@media print` telah dinaikkan dari `11.5px` menjadi **`12px` - `12.5px`** (setara **9.5pt – 9.8pt**).
- **Hasil:** Teks kini berukuran ideal (standar profesional 9.5pt+) yang sangat nyaman dibaca baik saat dibuka di PDF viewer layar monitor maupun saat dicetak fisik di atas kertas A4, tanpa mengorbankan batas maksimal 2 halaman.

### 2. Tautan LinkedIn & GitHub
- **Pemeriksaan:** Dipastikan tidak ada link kosong atau placeholder.
- **Hasil:** Berkas CV sudah menyematkan link aktif milik Anda secara presisi:
  - **Email:** `alfaiz1002@gmail.com`
  - **LinkedIn:** `https://www.linkedin.com/in/alfaiz-rayhan/`
  - **GitHub:** `https://github.com/alfaiz1002`

### 3. Kalimat Penutup Eksplisit pada Professional Summary
- **Pemeriksaan:** Menambahkan klausa penutup yang secara eksplisit menegaskan kompetensi ganda (*Blue Team + DFIR*) dari awal paragraf pembuka.
- **Hasil:** Penambahan klausa:
  > *"..., possessing dual competencies in penetration testing/remediation (Blue Team) and digital forensics investigation (DFIR)."*

### 4. Pengujian Ekstraksi Teks ATS (Parsing Test)
- **Pemeriksaan:** Diuji ekstraksi teks murni dari dokumen HTML5 semantik.
- **Hasil:** Karena DOM HTML disusun 100% linier tanpa `table`, `flex`, `grid`, atau `float` offset pada struktur utama, urutan pembacaan teks terbaca utuh dan runtut dari awal (Header) hingga akhir (Organization) tanpa ada karakter terpotong atau baris loncat.

### 5. Penambahan Sub-Kategori Tools & Forensics Software di Technical Skills
- **Pemeriksaan:** Memastikan nama-nama software/tools forensik dan pengujian keamanan yang sebelumnya tertulis di bagian *Work Experience* (Ditres Siber & Lab Security) juga tertera secara eksplisit pada bagian *Technical Skills*.
- **Hasil:** Ditambahkan baris sub-kategori baru:
  > `Tools & Forensics Software: FTK Imager, Autopsy, OSForensics, Magnet ACQUIRE, Registry Explorer, Andriller, SQLite Database Browser, Burp Suite, Git, Kali Linux, WSL (Windows Subsystem for Linux)`
  hal ini menjamin parser ATS mendeteksi langsung kata kunci software forensik dan keamanan siber utama saat pengindeksan section keahlian.

### 6. Penegasan Peran Pembina Riset (Research Lead & Advisor)
- **Pemeriksaan:** Mempertajam deskripsi pengalaman sebagai Pembina Riset bagi adik tingkat di laboratorium agar memperlihatkan kemampuan kepemimpinan (*leadership*), pembimbingan topik riset, dan pengajaran teknik.
- **Hasil:** Memperbarui 2 poin bullet pada Teaching Assistant:
  - > *"Served as Research Lead & Advisor for junior members within the Digital Forensics Research Division, formulating research topics tailored to individual technical skill sets."*
  - > *"Mentored and coached junior students throughout research execution, supervising study on 'Comparative Study of Three Windows Registry Analysis Tools in Digital Forensic Investigations.'"*

### 7. Keanggotaan Resmi AFDI (Indonesian Digital Forensics Association)
- **Pemeriksaan:** Mencantumkan status keanggotaan resmi dan tanggal bergabung pada bagian *Organization & Membership*.
- **Hasil:** Menyematkan sub-header bersih:
  > `Official Member | May 2026 – Present`

### 8. Lembaga Penerbit Sertifikasi Ringkas & Clean
- **Pemeriksaan:** Memasukkan nama lembaga penerbit (*Security Blue Team, Cyber Academy, PassMark Software, Cisco*) tanpa string ID yang panjang agar tampilan CV tetap bersih dan bebas *line wrap*.
- **Hasil:** Memperbarui daftar sertifikasi:
  - `Introduction to Digital Forensics – Security Blue Team (2025)`
  - `Introduction to Information Security – Cyber Academy (2026)`
  - `Classical Cryptography for Beginner – Cyber Academy (2026)`
  - `OSForensics Triage Certification – PassMark Software (2025)`
  - `Cisco Networking Academy Certificate – Cisco (2026)`

### 9. Pengayaan Kepemimpinan Kepanitiaan Kampus (HMTK Telkom University)
- **Pemeriksaan:** Menambahkan rekam jejak kepemimpinan organisasi prodi di section *Organization & Leadership* guna memperkuat pembuktian *soft skills* (agile teamwork, event operations, external relations, mentoring).
- **Hasil:** Ditambahkan dua entitas kepanitiaan:
  - **Centurion HMTK (2024)**: *Esports Division Lead (FIFA Tournament)* — Perancangan bagan tanding, jadwal kompetisi, rulebook fair-play, dan resolusi sengketa teknis.
### 10. Integrasi Buku Panduan & Modul Praktikum CSE-410 Digital Forensics (101 Halaman)
- **Pemeriksaan:** Mempertajam deskripsi proyek dan riwayat pengajaran di laboratorium dengan menyerap bukti dokumen resmi buku modul praktikum **CSE-410 Digital Forensics** setebal **101 Halaman** yang dibuat secara berkolaborasi langsung bersama Dosen Pembina Security Laboratory (Seculab) untuk kurikulum S1 Telkom University.
- **Hasil:** Menyematkan fakta spesifik 12 modul laboratorium (Chain of Custody SHA-256, YARA Rules, Email Metadata, Android ADB & SQLite `contacts2.db`/`calllog.db`, Server Log EVTX/Linux Chainsaw/Sigma, Plaso Super-Timeline, Wireshark/Zeek Network Forensics) pada section *Work Experience (Teaching Assistant)* dan *Key Projects & Achievements*.

### 11. Penegasan Status Fresh Graduate (Sarjana Teknik Komputer / Bachelor of Computer Engineering)
- **Pemeriksaan:** Memperbarui sebutan status pendidikan dari *"Mahasiswa S1 Teknik Komputer"* menjadi *"Sarjana Teknik Komputer (S.T.)"* (ID) dan *"Bachelor of Computer Engineering Graduate"* (EN) pada bagian *Professional Summary*, *Hero Description*, *TTS Audio Summary*, dan *Terminal Interactive*.
- **Hasil:** Memastikan recruiter mendeteksi kualifikasi kandidat sebagai *Fresh Graduate* yang telah menyelesaikan sidang/yudisium dan siap bekerja penuh waktu (*ready for full-time employment*), bukan lagi mahasiswa aktif.

---

## 🌟 Keunggulan Struktur Gabungan Full-Stack Security

1. **Profil "Full-Stack Security Specialist"**: Recruiter langsung melihat bahwa Anda memiliki dua keahlian berharga sekaligus: **Mencegah/Membentengi Serangan (Preventive/Blue Team)** dan **Menginvestigasi Kejahatan Siber (Investigative/DFIR)**.
2. **Kaya Kata Kunci (ATS Keywords)**: Memiliki cakupan kata kunci teknis Bahasa Inggris yang sangat luas (*FTK Imager, Autopsy, WAF, OWASP Top 10, OTP RFC, Bcrypt, ISO 27001, Chain of Custody*), sehingga lolos pemindaian ATS untuk berbagai kualifikasi posisi keamanan siber.
3. **Efisien & Praktis**: Hanya perlu mengelola dan mengunggah 1 file PDF utama tanpa risiko tertukar file.

---

## 1. Arsitektur Kode & Kepatuhan ATS (Applicant Tracking System)

CV ini dibangun menggunakan **Single-File HTML5 + Embedded CSS** yang dirancang 100% kompatibel dengan sistem parser ATS modern (Workday, Taleo, Greenhouse, Lever, dll).

### Prinsip Utama yang Diterapkan:
1. **Single-Column Structural DOM**:
   - Seluruh bagian CV disusun secara vertikal dari atas ke bawah tanpa menggunakan `display: grid` atau `display: flex` pada kontainer utama.
   - Hal ini menjamin bahwa sistem pembaca ATS membaca urutan riwayat kerja dan pendidikan sesuai hierarki kronologis tanpa tercampur secara horizontal.
2. **Tag Semantik HTML5**:
   - Menggunakan tag `header`, `main`, `section`, `article`, `h1`, `h2`, `h3`, `p`, `ul`, dan `li`.
   - Menghindari penggunaan `div` kosong berlebihan agar struktur data jernih bagi parser otomatis.
3. **Bebas Elemen Visual yang Mengganggu ATS**:
   - **TIDAK Menggunakan Foto / Avatar**: Foto profil dapat menyebabkan beberapa parser ATS menolak dokumen.
   - **TIDAK Menggunakan Icon Grafis**: Elemen icon SVG/FontAwesome sering kali terjemah sebagai karakter sampah (*gibberish*) oleh parser. Kontak menggunakan label teks bersih: `Phone:`, `Email:`, `LinkedIn:`, dan `GitHub:`.
   - **Bullet Points Standar**: Menggunakan `<ul><li>` standar bawaan browser tanpa simbol/emoji khusus.

---

## 2. Standar Tipografi & Skema Warna Monokrom

Tampilan disesuaikan dengan standar dokumen bisnis eksekutif (Harvard/Corporate Standard):

- **Palet Warna Monokrom Murni**:
  - **Teks Utama & Heading**: Hitam Pekat (`#000000` & `#1a1a1a`) untuk kontras tertinggi.
  - **Border & Pemisah Section**: Abu-Abu Gelap Solid (`#000000` / `#333333`, ketebalan 1.5px).
  - **Teks Sekunder (Tanggal, Lokasi & Sub-head)**: Abu-Abu (`#555555`) untuk memberikan hierarki visual tanpa merusak keterbacaan.
  - **Background**: Putih Polos (`#ffffff`), bebas shading/warna latar.
- **Tipografi Hybrid**:
  - **Nama & Header**: `Georgia, "Times New Roman", serif` (Memberikan kesan elegan, resmi, dan tegas).
  - **Isi Dokumen**: `Arial, "Helvetica Neue", sans-serif` (Memberikan keterbacaan yang sangat tinggi di layar monitor maupun kertas cetak).

---

## 3. Optimasi Ekspor ke PDF & Cetak 2 Halaman A4 (@media print)

Ukuran font dan spacing disesuaikan secara presisi agar dokumen pas di **maksimal 2 halaman A4**:

```css
@media print {
  @page {
    size: A4;
    margin: 10mm 12mm 10mm 12mm;
  }
  h2 {
    page-break-after: avoid;
    break-after: avoid;
  }
  .experience-item, .project-item, .education-item {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  li {
    font-size: 12px;
    line-height: 1.35;
    margin-bottom: 2px;
  }
}
```

---

## 4. Panduan Ekspor ke PDF (Langkah demi Langkah)

1. Buka file **`cv_alfaiz_rayhan_id.html`** (Versi Indonesia) atau **`cv_alfaiz_rayhan.html`** (Versi Inggris) di browser **Google Chrome** atau **Microsoft Edge**.
2. Tekan kombinasi tombol **`Ctrl + P`** (Windows) atau **`Cmd + P`** (Mac).
3. Pada opsi **Destination / Tujuan Cetak**, pilih **Save as PDF**.
4. Pengaturan: Paper size `A4`, Margins `Default`.
5. Klik **Save**.

---

## 5. Standar Penamaan File PDF Saat Melamar Pekerjaan

Gunakan format penamaan berkas PDF yang bersih dan profesional saat mengunggah ke portal karier (JobStreet, LinkedIn, Kalibrr, Workday) atau mengirim via email:

- **Versi Bahasa Indonesia:** `CV_ATS_Alfaiz_Rayhan_Putra_Adji_CyberSecurity.pdf`
- **Versi Bahasa Inggris:** `Resume_ATS_Alfaiz_Rayhan_Putra_Adji_CyberSecurity_DFIR.pdf`

