# PANDUAN SPESIFIKASI LENGKAP SELURUH ANTARMUKA (UI)
# LAPTOP ANATOMY VR

Dokumen ini memuat **deskripsi arsitektur visual, tata letak (layout), komponen, elemen interaktif, palet warna, dan alur antarmuka pengguna (UI/UX)** dari seluruh halaman pada aplikasi **Laptop Anatomy VR**.

Dokumen ini disusun secara modular agar Anda dapat memeriksa setiap bagian antarmuka dan memberikan instruksi revisi secara spesifik.

---

## DAFTAR ISI

1. [Cara Memberikan Catatan Revisi UI](#1-cara-memberikan-catatan-revisi-ui)
2. [Sistem Desain & Token Warna Global](#2-sistem-desain--token-warna-global)
3. [Komponen Bersama (Global Shared Components)](#3-komponen-bersama-global-shared-components)
4. [Halaman 1: Landing Page (Beranda)](#4-halaman-1-landing-page-beranda)
5. [Halaman 2: Pemilihan Laptop (Laptop Selection)](#5-halaman-2-pemilihan-laptop-laptop-selection)
6. [Halaman 3: Laboratorium 3D Detail Laptop (Laptop Detail)](#6-halaman-3-laboratorium-3d-detail-laptop-laptop-detail)
7. [Halaman 4: Perpustakaan Komponen (Component Library)](#7-halaman-4-perpustakaan-komponen-component-library)
8. [Halaman 5: Hub Tantangan (Challenge Lab Hub)](#8-halaman-5-hub-tantangan-challenge-lab-hub)
9. [Sub-Halaman Tantangan & Mini-Game Suite (6 Modul)](#9-sub-halaman-tantangan--mini-game-suite-6-modul)
10. [Halaman 6: Panduan Alur (How It Works)](#10-halaman-6-panduan-alur-how-it-works)
11. [Halaman 7: Tentang Proyek (About)](#11-halaman-7-tentang-proyek-about)
12. [Halaman 8: Menu Navigasi Utama (Main Menu)](#12-halaman-8-menu-navigasi-utama-main-menu)

---

## 1. CARA MEMBERIKAN CATATAN REVISI UI

Saat Anda ingin merevisi tampilan atau elemen tertentu, Anda cukup menyebutkan:
1. **Nama Halaman / Komponen**: (contoh: *Halaman Laptop Selection*, *Komponen Navbar*, atau *Challenge 05 Speed Challenge*)
2. **Elemen yang Ingin Diubah**: (contoh: *Tombol CTA*, *Warna Kartu*, *Posisi Hotspot*, *Ukuran Teks*, *Badge*, dll.)
3. **Instruksi Perubahan**: (contoh: *"Ubah teks tombol menjadi 'Mulai Eksplorasi'", "Ganti aksen kartu ke warna Amber", "Tambahkan informasi spesifikasi X", dsb.*)

---

## 2. SISTEM DESAIN & TOKEN WARNA GLOBAL

Seluruh aplikasi dikendalikan oleh sistem token terpusat dengan prinsip distribusi warna **60% Netral Gelap, 20% Teks & Garis Netral, 10% Hijau Brand, 5% Teal/Cyan Teknis, dan 5% Amber/Merah Semantik**.

### A. Palet Warna Utama
| Peran Token | Kode Hex | Penggunaan Antarmuka |
| :--- | :--- | :--- |
| **Main Background** | `#0B1110` | Latar belakang dasar seluruh aplikasi & kanvas 3D |
| **Secondary Background** | `#101716` | Latar belakang sekunder, viewport simulasi, strip bawah |
| **Surface (Card)** | `#151D1B` | Latar default seluruh kartu, modal, dan panel HUD kaca |
| **Elevated Surface** | `#1B2522` | Kontainer bertingkat, keycap keyboard, dropdown aktif |
| **Surface Hover** | `#202C29` | Status kursor saat melayang di atas kartu |
| **Primary Brand Green** | `#5BC47A` | Tombol CTA utama, status aktif navigasi, indikator sukses |
| **Primary Hover** | `#72D98D` | Status hover tombol CTA utama |
| **Primary Muted** | `#2F6543` | Border atau bayangan tombol aksi utama |
| **Secondary Teal** | `#45B8A5` | Diagram sirkuit, informasi teknis, pendingin, status modul |
| **Secondary Cyan** | `#5EB6D6` | Link interaktif, spesifikasi bus PCIe/eDP, konektor data |
| **Accent Amber** | `#E5B85C` | Timer, streak multiplier, tingkat kesulitan, badge populer |
| **Semantic Error Red** | `#E16B72` | Indikator salah pada kuis, peringatan kritis, tombol bahaya |

### B. Tipografi & Teks
* **Primary Text (`#E8EEEA`)**: Digunakan untuk judul utama (headings), teks penting, dan tombol utama. Menghindari warna putih murni agar nyaman di mata.
* **Secondary Text (`#A9B5AF`)**: Digunakan untuk deskripsi umum, sub-judul, dan label antarmuka.
* **Muted Text (`#74817B`)**: Digunakan untuk metadata kecil, timestamp, dan teks status pasif.
* **Disabled Text (`#4F5B56`)**: Status tidak aktif.

### C. Sistem Tombol Global (`Button.jsx`)
* **Primary Button**: Background Hijau `#5BC47A`, teks gelap `#0B1110`, font tebal, efek hover cerah `#72D98D`.
* **Secondary Button**: Background Dark Neutral `#151D1B`, border `border-white/10`, teks `#E8EEEA`, hover border Teal `#45B8A5`.
* **Tertiary / Ghost Button**: Transparan, teks `#A9B5AF`, hover background `#1B2522` dan teks `#E8EEEA`.
* **Danger**: Background `#E16B72`, teks gelap.
* **Warning**: Background `#E5B85C`, teks gelap.

---

## 3. KOMPONEN BERSAMA (GLOBAL SHARED COMPONENTS)

### A. Bilah Navigasi Atas (`Navbar.jsx`)
* **Struktur**: Posisi fixed/sticky di bagian atas (`z-50`), tinggi `4.5rem` (72px), backdrop blur kaca (`bg-[#0B1110]/85 border-b border-white/10`).
* **Logo**: Vektor resmi SVG `LAVR-logo.svg` di sisi kiri + Tipografi `Laptop Anatomy VR` + Badge status `VR LAB`.
* **Menu Navigasi Desktop**:
  * `Home` (Beranda)
  * `Explore ▾` (Dropdown: *Laptop Selection* & *Component Library*)
  * `Challenge Lab ▾` (Dropdown: *Challenge Lab Hub*, *01 Hardware Quiz*, *02 Match It*, *03 Drag & Place*, *04 Find Component*, *05 Speed Challenge*, *06 Hardware Identification*)
  * `How It Works` (Panduan alur edukasi)
  * `About` (Tentang proyek)
* **Indikator Aktif**: Garis sliding indicator halus di bawah menu aktif dengan warna hijau brand `#5BC47A`.
* **Aksi Kanan**: Tombol cepat CTA `Launch VR` atau `Explore Now` (Hijau brand `#5BC47A`).
* **Navigasi Mobile**: Hamburger menu di sisi kanan yang membuka drawer vertikal dengan latar `#151D1B`.

### B. Latar Belakang Ambient 7-Lapisan (`ImmersiveBackground.jsx`)
* **Layer 1**: Gradasi dasar arang gelap `#0B1110` → `#101716`.
* **Layer 2**: Pendaran radial hijau lembut (*ambient spotlight*) di belakang fokus utama.
* **Layer 3**: Grid sirkuit ortogonal halus 40px × 40px dengan animasi pergeseran diagonal lambat.
* **Layer 4**: Garis vektor sirkuit tembaga motherboard bergradasi Green `#5BC47A` → Teal `#45B8A5`.
* **Layer 5**: Partikel foton kuning/amber mengalir lembut melintasi jalur bus sirkuit.
* **Layer 6**: Tipografi monospace telemetri mikroskopik (`SYS_BUS // 0x48A`, `CORE_FREQ // 4.8GHz`).
* **Layer 7**: Efek paralaks halus saat kursor mouse digerakkan.

### C. Mesin 3D Motherboard Native WebGL (`Motherboard3DViewer.jsx`)
* **Spesifikasi**: Render murni Three.js 60 FPS, bebas ketergantungan Sketchfab, 100% offline.
* **Latar WebGL**: `#0B1110` dengan kabut eksponensial halus.
* **Detail Geometri**:
  * Papan PCB arang gelap `#151d1b` dengan jalur bus sirkuit Teal `#45b8a5`.
  * Soket prosesor LGA berkilau dengan tuas logam retensi krom.
  * Fin heatsink aluminium VRM dan chipset PCH.
  * Slot RAM dual-channel DDR (aksen Amber dan Teal).
  * Slot ekspansi PCIe x16 dan konektor ATX 24-pin.
* **10 Titik Pin Anotasi Interaktif**: Hotspot bola hijau `#5BC47A` dengan cincin Teal `#45b8a5` dan pendaran berdenyut.
* **Kontrol Kamera HUD**: Pilihan sudut pandang preset (*Iso 3D*, *Top Blueprint*, *Front Angle*) dan toggle *Auto-Rotate*.
* **Strip Pemilih Pin Bawah**: Deretan tombol nomor pin 01-10 untuk navigasi cepat antar komponen.

### D. Modal Dossier Detail Komponen (`ComponentDetailModal.jsx`)
* **Tipe Tampilan**: Modal pop-up kaca mengambang (`bg-[#151D1B] border border-white/10 shadow-2xl`).
* **Header**: Badge nomor pin, kategori komponen (Teal), nama arsitektur, dan tombol tutup silang (`X`).
* **Isi Konten**:
  * Judul Arsitektur & Deskripsi Fungsi Umum.
  * Peran Utama & Perutean Sinyal Bus (Aksen Amber `#E5B85C`).
  * Implementasi Komponen pada Laptop Modern (Aksen Hijau `#5BC47A`).
  * Matriks Spesifikasi Teknis Elektrik & Frekuensi (Grid 2 kolom beraksen Cyan `#5EB6D6`).
  * Tips Pengamatan Inspeksi VR (Kotak amber transparan dengan ikon mata).
* **Footer**: Tombol navigasi Pin Sebelumnya / Pin Berikutnya dan tombol utama CTA `Focus in 3D` (gradasi Green `#5BC47A` → Teal `#45B8A5`).

---

## 4. HALAMAN 1: LANDING PAGE (BERANDA)

* **URL / State**: `/` atau tab `'landing'`
* **File Utama**: [src/components/pages/LandingPage.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/LandingPage.jsx) & [src/components/landing/HeroLaptop.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/landing/HeroLaptop.jsx)

### Elemen Antarmuka:
1. **Bagian Teks Hero (Kiri / Atas)**:
   * **Tagline Badge**: `SPATIAL HARDWARE LEARNING LAB // 2026` dengan lampu indikator hijau berkedip.
   * **Judul Utama**: `ANATOMI LAPTOP DALAM TIGA DIMENSI` dengan gradasi restrained Green `#5BC47A` → Teal `#45B8A5`.
   * **Deskripsi**: Penjelasan ringkas bahwa pengguna dapat membedah laptop lapis demi lapis secara interaktif.
   * **Grup Tombol Aksi**:
     * Tombol Utama: `Mulai Eksplorasi Arsitektur` (Hijau brand `#5BC47A` + ikon panah).
     * Tombol Sekunder: `Uji Kemampuan di Challenge Lab` (Surface dark netral `#151D1B`, border netral, teks `#E8EEEA`).
2. **Centerpiece 3D Laptop Hero (`HeroLaptop.jsx`)**:
   * **Lid Layar Laptop**: Bezel tipis dengan webcam notch atas, layar cyber grid blueprint teal `#45b8a5`, telemetri status *VR HARDWARE ENGINE // ONLINE*, dan emblem holografik tengah *LAPTOP ANATOMY VR*.
   * **Engsel (Hinge)**: Assembly engsel logam gelap beraksen netral.
   * **Keyboard Deck & Chassis**: Sasis arang gelap dengan chamfer highlight halus, well keyboard dengan keycaps individual, dan glass trackpad bawah dengan indikator *POWER: ON*.
   * **4 Hotspot Interaktif Multi-Warna**:
     * Hotspot 1 (Layar): Cyan `#5EB6D6` — *Ultra-Clear Retina Display // 165Hz DCI-P3*
     * Hotspot 2 (Thermal): Teal `#45B8A5` — *Dual Thermal Exhaust // 55 CFM Airflow*
     * Hotspot 3 (CPU): Brand Green `#5BC47A` — *Hybrid Architecture SoC // Multi-Core Compute*
     * Hotspot 4 (Baterai): Amber `#E5B85C` — *High-Density Battery Bank // 80 Wh Capacity*
   * **Kartu Inspeksi HUD Pop-up**: Muncul mengambang saat hotspot diklik, menampilkan kategori, deskripsi arsitektur, dan parameter metrik spesifikasi.
3. **Lantai Sirkuit Interaktif**:
   * Garis penghubung SVG bergradasi Amber → Green dengan ring konsentris lantai yang tidak menyilaukan.
4. **Pill Fitur Cepat Bawah**:
   * Menampilkan 3 sorotan ringkas: *100% WebGL Native*, *10 Hotspot Anotasi*, *6 Ujian Praktik Taktis*.

---

## 5. HALAMAN 2: PEMILIHAN LAPTOP (LAPTOP SELECTION)

* **URL / State**: tab `'laptop-selection'`
* **File Utama**: [src/components/pages/LaptopSelection.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/LaptopSelection.jsx)

### Elemen Antarmuka:
1. **Header Halaman**:
   * Badge atas: `CHOOSE HARDWARE PLATFORM // TIER SELECTION`
   * Judul: `Pilih Platform Laptop untuk Dieksplorasi`
   * Deskripsi: Pemilihan model laptop untuk melihat perbedaan susunan komponen pendingin, GPU, dan motherboard.
2. **3 Kartu Model Laptop (Grid 3 Kolom)**:
   * **Laptop A (Ultrabook Standar / Portabel)**:
     * Latar: `#151D1B`, border netral.
     * Ilustrasi: Exploded laptop isometrik dengan sirkuit tembaga terpadu.
     * Spesifikasi: CPU Hemat Daya (15W U-Series), RAM On-Board LPDDR5, Single Fan.
     * Tombol: `Inspect Architecture` (Surface netral `#1B2522`, hover border Teal).
   * **Laptop B (High-End Workstation / Gaming)**:
     * Latar: `#151D1B`, border netral beraksen Amber tipis.
     * **Badge Khusus**: `PALING POPULER` dengan warna Amber `#E5B85C`.
     * Ilustrasi: Exploded laptop dengan dual-fan blower teal, modul GPU diskrit amber, dan heatpipe ganda.
     * Spesifikasi: CPU 45W H-Series, Dedicated GPU RTX, Dual-Channel DDR5 SO-DIMM Modular.
     * Tombol: `Inspect Architecture` (Hijau brand `#5BC47A` teks gelap `#0B1110`).
   * **Laptop C (Ultra-Thin Dual-Screen / Konsep)**:
     * Latar: `#151D1B`, border netral.
     * Ilustrasi: Exploded sasis tipis dengan vapor chamber dan baterai bertumpuk.
     * Spesifikasi: Vapor Chamber Cooling, Dual M.2 PCIe 5.0, Baterai 99.9Wh.
     * Tombol: `Inspect Architecture` (Surface netral `#1B2522`, hover border Teal).
3. **Bar Perbandingan Bawah**:
   * Link teks interaktif `Bandingkan Spesifikasi Lengkap Ketiga Laptop` dengan warna Cyan `#5EB6D6`.

---

## 6. HALAMAN 3: LABORATORIUM 3D DETAIL LAPTOP (LAPTOP DETAIL)

* **URL / State**: tab `'laptop-detail'`
* **File Utama**: [src/components/pages/LaptopDetail.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/LaptopDetail.jsx)

### Elemen Antarmuka:
1. **Kanvas 3D WebGL Latar Belakang (`100vh`)**:
   * Menampilkan model motherboard 3D interaktif Three.js secara menyeluruh.
   * Mendukung navigasi drag mouse untuk memutar sudut pandang dan scroll untuk zoom.
2. **Floating Top Control HUD Bar**:
   * Tombol Kiri: `← Back to Laptops` (pil kaca netral `#151D1B`).
   * Label Tengah: Kode laptop, nama laptop, dan badge kategori (`#45B8A5` Teal).
   * Tombol Kanan (Preset Kamera):
     * `Iso 3D` (Sudut isometrik perspektif)
     * `Top Blueprint` (Tampak atas skematik)
     * `Front Angle` (Tampak depan profil rendah)
     * Tombol ikon rotasi otomatis (*Auto-Rotate Toggle*).
3. **Floating Left Panel (Pemilih Spesifikasi Hardware)**:
   * Terletak mengambang di sisi kiri viewport.
   * Daftar komponen internal laptop yang dapat diklik:
     * *Central Processing Unit (CPU)* — Hijau `#5BC47A`
     * *DDR5 Memory SO-DIMM (RAM)* — Teal `#45B8A5`
     * *PCIe Gen4 NVMe (SSD)* — Cyan `#5EB6D6`
     * *Dedicated Graphics Processor (GPU)* — Amber `#E5B85C`
     * *Dual Blower Cooling (Thermals)* — Teal `#45B8A5`
   * Mengklik item langsung mengarahkan kamera 3D ke posisi pin sirkuit komponen terkait.
4. **Floating Right Panel (Technical Dossier & Telemetri)**:
   * Terletak mengambang di sisi kanan viewport.
   * Menampilkan dossier modul yang sedang aktif, parameter tegangan (*Voltage*), antarmuka bus (*Bus Interface*), kapasitas transfer, dan tombol `Buka Detail Anotasi Pin`.
5. **Bottom Pin Quick-Selector Strip**:
   * Strip horizontal di bagian bawah layar yang menampilkan 10 tombol nomor pin.
   * Mengklik nomor pin akan otomatis melakukan tweening kamera ke posisi pin dan memunculkan pop-up modal informasi.

---

## 7. HALAMAN 4: PERPUSTAKAAN KOMPONEN (COMPONENT LIBRARY)

* **URL / State**: tab `'component-library'`
* **File Utama**: [src/components/pages/ComponentLibrary.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/ComponentLibrary.jsx)

### Elemen Antarmuka:
1. **Header Halaman**:
   * Badge: `COMPONENT ARCHIVE // REFERENCE DATABASE`
   * Judul: `Katalog Komponen Hardware Internal`
   * Deskripsi: Ensiklopedia teknis modul silikon dan periferal laptop.
2. **Kategori Filter Tab Bar**:
   * Pilihan filter: `All (8)`, `Compute (3)`, `Memory & Storage (2)`, `Cooling (2)`, `System Board (1)`.
   * Tombol aktif menggunakan pendaran halus hijau `#5BC47A` dengan background `#1B2522`.
3. **Grid 8 Kartu Komponen Hardware**:
   * Komponen terdaftar:
     1. **CPU** (Central Processing Unit)
     2. **GPU** (Graphics Processing Unit)
     3. **RAM** (DDR5 SO-DIMM Memory)
     4. **SSD** (M.2 NVMe Solid State Drive)
     5. **Cooling Fan** (Centrifugal Blower Fan)
     6. **Heatsink** (Copper Heatpipe Fin Stack)
     7. **CMOS Battery** (CR2032 Lithium Cell)
     8. **PCIe Slot** (Expansion Slot Interconnect)
   * **Struktur Kartu**:
     * Latar: `#151D1B`, border netral `border-white/10`.
     * Header kartu: Badge kategori (Teal/Cyan) dan nama komponen.
     * Thumbnail mini visual perangkat keras.
     * Matriks 3 parameter kunci (Form Factor, Bus Speed, Thermal TDP).
     * Tombol Aksi: `Inspect 3D Dossier` (Surface netral dengan hover Teal).
4. **Modal 3D Technical Dossier**:
   * Terbuka saat kartu komponen diklik.
   * Menampilkan model 3D mandiri dari komponen tersebut (`Component3DViewer.jsx`) yang dapat diputar bebas.
   * Menampilkan deskripsi ilmiah, peran sistem, dan tabel perbandingan spesifikasi generasi terbaru.

---

## 8. HALAMAN 5: HUB TANTANGAN (CHALLENGE LAB HUB)

* **URL / State**: tab `'challenge-hub'` atau rute `'challenge'` dengan mode `'hub'`
* **File Utama**: [src/components/challenge/ChallengeLabHub.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/challenge/ChallengeLabHub.jsx) & [src/components/challenge/GamePreview.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/challenge/GamePreview.jsx)

### Elemen Antarmuka:
1. **Header Taktis Hub**:
   * Badge: `CHALLENGE LAB // TACTICAL SIMULATION ARENA`
   * Judul: `Pusat Simulasi & Evaluasi Arsitektur Hardware`
   * Deskripsi: Arena latihan interaktif untuk menguji pemahaman arsitektur hardware.
2. **Panggung Pratinjau Tengah (`GamePreview.jsx`)**:
   * **Latar Wadah**: `#151D1B` dengan border netral `border-white/10` dan bayangan lembut.
   * **Header Telemetry**: Status *CHALLENGE PREVIEW // LIVE VIEWPORT*, badge nomor misi Amber `#E5B85C`, dan tingkat kesulitan.
   * **Layar Viewport Simulasi (`#101716`)**:
     * Menampilkan simulasi langsung dari game yang sedang dipilih:
       * *Quiz*: Siluet soal 3D kartu komponen & 4 pill jawaban interaktif.
       * *Match It*: Dua modul komponen dengan kabel laser penghubung dinamis.
       * *Drag & Place*: Komponen mengambang dengan garis soket motherboard target.
       * *Find Component*: Radar pemindaian koordinat spasial dengan crosshair teal.
       * *Speed Challenge*: Model 3D target berputar dengan timer ring melingkar emas.
       * *Hardware Identification*: Model 3D silikon di kiri dan matriks bus PCIe di kanan.
   * **Footer Telemetry & Tombol CTA Utama**:
     * Ringkasan durasi rata-rata dan potensi perolehan XP.
     * Tombol Besar: `MULAI MISI TANTANGAN` (Hijau brand `#5BC47A`, teks gelap `#0B1110`, ikon panah).
3. **6 Kartu Modul Tantangan di Sekitar Panggung**:
   * Terbagi menjadi kolom kiri (Kartu 01, 02, 03) dan kolom kanan (Kartu 04, 05, 06).
   * **Kartu 01: Hardware Architecture Quiz**
     * Nomor & Kategori: `01 // THEORETICAL` (Amber `#E5B85C`)
     * Judul: `Hardware Architecture Quiz`
     * Tag: `10 Pertanyaan 3D`
   * **Kartu 02: Match It**
     * Nomor & Kategori: `02 // INTERCONNECT` (Amber `#E5B85C`)
     * Judul: `Match It: Bus Interconnect`
     * Tag: `Menghubungkan Modul & Fungsi`
   * **Kartu 03: Drag & Place**
     * Nomor & Kategori: `03 // ASSEMBLY` (Amber `#E5B85C`)
     * Judul: `Drag & Place: Socket Assembly`
     * Tag: `Perakitan Soket Presisi`
   * **Kartu 04: Find Component**
     * Nomor & Kategori: `04 // SPATIAL RADAR` (Amber `#E5B85C`)
     * Judul: `Find Component: Spatial Locator`
     * Tag: `Deteksi 10 Titik Pin 3D`
   * **Kartu 05: Speed Challenge**
     * Nomor & Kategori: `05 // OVERCLOCK REFLEX` (Amber `#E5B85C`)
     * Judul: `Speed Challenge: Hardware Reflex`
     * Tag: `Timer Cepat & Combo Multiplier`
   * **Kartu 06: Hardware Identification**
     * Nomor & Kategori: `06 // SPEC ANALYSIS` (Amber `#E5B85C`)
     * Judul: `Hardware Identification: Spec Matrix`
     * Tag: `Analisis Silikon & Bus PCIe`
   * **Status Kartu**: Kartu yang sedang dipilih ditandai dengan garis batas hijau brand `#5BC47A` dan indikator radio aktif.

---

## 9. SUB-HALAMAN TANTANGAN & MINI-GAME SUITE (6 MODUL)

Sesuai arsitektur alur edukasi, seluruh tantangan memiliki alur:
`Hub → Game Briefing (Penjelasan) → Main Game → Mission Complete (Hasil) → Game Briefing → Hub`.

### A. Halaman Penjelasan Awal Game (`GameBriefingView.jsx`)
* **Wadah**: Wadah kaca terpusat `#151D1B` dengan border netral `border-white/10`.
* **Header**: Tombol `← Kembali ke Hub`, badge nomor misi Amber, dan judul game.
* **Konten Kiri (Kotak Hologram 3D)**:
  * Viewport model 3D Three.js yang merepresentasikan tantangan yang akan dimainkan.
* **Konten Kanan (Petunjuk Misi & Aturan)**:
  * Deskripsi objektif misi pembelajaran.
  * Kartu aturan: Jumlah langkah/soal, batas waktu, dan kriteria penilaian.
  * Tips teknis (*Tactical Tip*) berwarna Amber/Teal.
  * Tombol CTA: `MULAI TANTANGAN SEKARANG` (Hijau brand `#5BC47A`).

### B. Shell Pembungkus Mini-Game (`GameShell.jsx`)
* **Status Bar Atas**:
  * Judul tantangan dan nomor misi.
  * Milestone dots penanda progress langkah (titik aktif hijau `#5BC47A`).
  * Badge Skor Live XP (Warna Amber `#E5B85C` dengan animasi penambahan poin).
  * Tombol keluar / kembali ke briefing.
* **Tooltip Hint Dinamis Bawah**:
  * Kotak petunjuk teknis dengan ikon lampu berwarna Teal `#45B8A5` yang membantu pengguna jika bingung.

### C. Modul 01: Hardware Quiz (`QuickQuizGame.jsx`)
* **Kartu Pertanyaan**: Viewport Three.js 3D model komponen di sisi atas pertanyaan.
* **Pilihan Jawaban**: 4 tombol opsi berlatar `#101716`.
  * Saat dijawab benar: Berubah menjadi hijau `#5BC47A` dengan background subtle `#193A29` dan centang hijau.
  * Saat dijawab salah: Berubah menjadi merah `#E16B72` dengan background `#3D1418` dan silang merah.
* **Drawer Penjelasan Edukatif**: Laci penjelasan ilmiah otomatis terbuka di bawah pertanyaan setelah pengguna memilih.

### D. Modul 02: Match It (`MatchItGame.jsx`)
* **Kolom Kiri**: 4 Kartu modul silikon fisik (CPU, RAM, GPU, SSD) dengan model 3D Three.js.
* **Kolom Kanan**: 4 Kartu deskripsi fungsi operasional sirkuit.
* **Laser Interkoneksi**: Sinar laser SVG dinamis bergradasi Green → Teal → Amber yang menghubungkan modul dengan fungsinya saat dipasangkan.
* **Tombol Acak**: Tombol `RANDOMIZE COMPONENTS` untuk mengacak kombinasi komponen baru.

### E. Modul 03: Drag & Place (`DragPlaceGame.jsx`)
* **Workbench Perakitan**: Papan motherboard horizontal berlatar `#101716` dengan siluet garis soket LGA-1700, slot RAM DDR5, dan slot M.2 NVMe.
* **Baki Komponen (Inventory Tray)**: Baki di sisi bawah tempat komponen siap ditarik (drag) atau diklik ke soket target.
* **Sistem Snap**: Suara dan feedback visual saat komponen pas masuk ke dalam pin soket.

### F. Modul 04: Find Component (`FindComponentGame.jsx`)
* **Panggung 3D Motherboard**: Render 3D Three.js penuh dengan 10 titik pin presisi raycasting.
* **Target Misi**: Arahan di bagian atas (misal: *Cari dan klik titik pin untuk konektor pendingin aktif!*).
* **Radar Spasial**: Reticle pemindaian teal dengan koordinat sudut.
* **Quick Take Drawer**: Catatan edukatif ringkas muncul saat pin yang benar ditemukan.

### G. Modul 05: Speed Challenge (`SpeedChallengeGame.jsx`)
* **Target 3D Tengah**: Model komponen hardware 3D berputar cepat di tengah panggung.
* **Cincin Pengatur Waktu (SVG Timer Ring)**:
  * Normal: Hijau `#5BC47A`
  * Waspada (< 15s): Amber `#E5B85C`
  * Kritis (< 5s): Merah `#E16B72`
* **Streak Multiplier**: Badge emas Amber `#E5B85C` (1.0x → 1.5x → 2.0x → 3.0x Combo).
* **Tombol Cepat**: 4 tombol nama hardware di bawah target untuk respon refleks kilat.

### H. Modul 06: Hardware Identification (`HardwareIdentificationGame.jsx`)
* **Sisi Kiri**: Viewport 3D model komponen silikon terisolasi dengan kontrol inspeksi rotasi.
* **Sisi Kanan Atas**: Matriks spesifikasi teknis bus (PCIe Gen 4.0, Form Factor M.2 2280, Peak Throughput, Topology) dengan nilai berwarna Cyan `#5EB6D6`.
* **Sisi Kanan Bawah**: Pertanyaan analisis dan 4 opsi jawaban multiple choice.
* **Feedback Pembahasan**: Penjelasan analisis arsitektur muncul setelah jawaban dipilih.

### I. Modal Selesai Misi (`MissionCompleteModal.jsx`)
* **Latar**: Pop-up dialog tengah berlatar `#151D1B` dengan border netral.
* **Rekapitulasi**: Skor total XP (Amber), persentase akurasi (Hijau), dan waktu pengerjaan.
* **Tombol Aksi**:
  * Tombol `Mainkan Lagi` (Surface netral).
  * Tombol `Kembali ke Briefing` (Hijau brand `#5BC47A`).

---

## 10. HALAMAN 6: PANDUAN ALUR (HOW IT WORKS)

* **URL / State**: tab `'how-it-works'`
* **File Utama**: [src/components/pages/HowItWorks.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/HowItWorks.jsx)

### Elemen Antarmuka:
1. **Header Halaman**:
   * Badge: `GUIDED EXPLORATION // WORKFLOW GUIDE`
   * Judul: `Bagaimana Cara Menggunakan Laptop Anatomy VR`
   * Deskripsi: 3 Tahapan sederhana dari pemilihan laptop hingga uji pemahaman.
2. **3 Kartu Tahapan Berurutan (Grid 3 Kolom)**:
   * **Tahap 01: Pilih Model Laptop**
     * Aksen: Hijau Brand `#5BC47A`
     * Visual: Diagram sirkuit pemilihan platform sasis.
     * Deskripsi: Menentukan kategori laptop sesuai kebutuhan analisis arsitektur.
   * **Tahap 02: Eksplorasi 3D & Anotasi Pin**
     * Aksen: Secondary Teal `#45B8A5`
     * Visual: Diagram motherboard dengan 10 titik hotspot dan inspeksi 3D.
     * Deskripsi: Memutar motherboard secara bebas dan memeriksa fungsi setiap pin sirkuit.
   * **Tahap 03: Uji Kemampuan di Challenge Lab**
     * Aksen: Secondary Cyan `#5EB6D6`
     * Visual: Diagram piala evaluasi dan perakitan komponen.
     * Deskripsi: Menguji daya ingat dan logika pada 6 mode tantangan taktis.
3. **Tombol CTA Bawah**:
   * Tombol besar: `Mulai Eksplorasi Sekarang` (Hijau brand `#5BC47A` teks gelap).

---

## 11. HALAMAN 7: TENTANG PROYEK (ABOUT)

* **URL / State**: tab `'about'`
* **File Utama**: [src/components/pages/About.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/About.jsx)

### Elemen Antarmuka:
1. **Header Halaman**:
   * Badge: `PROJECT BRIEF // UTS REALITAS BERKEMBANG`
   * Judul: `Tentang Laptop Anatomy VR`
   * Deskripsi: Inisiatif media pembelajaran arsitektur komputer berbasis WebXR dan Three.js.
2. **Kartu Misi Edukasi Utama**:
   * Wadah kaca `#151D1B` dengan border netral.
   * Rincian latar belakang mengapa pemahaman hardware fisik sangat penting bagi mahasiswa ilmu komputer.
3. **Ilustrasi Isometrik Motherboard Silikon**:
   * Vektor skematik PCB laptop meledak dengan chip prosesor multi-warna (Green, Teal, Cyan, Amber).
4. **Grid 4 Fitur Unggulan Proyek**:
   * Kartu 1: *100% WebGL Native (Three.js 60 FPS)* — Ikon Hijau `#5BC47A`
   * Kartu 2: *10 Titik Pin Anotasi Presisi* — Ikon Teal `#45B8A5`
   * Kartu 3: *6 Modul Simulasi Challenge Lab* — Ikon Cyan `#5EB6D6`
   * Kartu 4: *WebXR Spatial Ready Architecture* — Ikon Amber `#E5B85C`
5. **Footer Informasi Tim & Mata Kuliah**:
   * Menampilkan informasi mata kuliah Realitas Berkembang dan tahun akademik 2026.

---

## 12. HALAMAN 8: MENU NAVIGASI UTAMA (MAIN MENU)

* **URL / State**: tab `'main-menu'`
* **File Utama**: [src/components/pages/MainMenu.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/MainMenu.jsx)

### Elemen Antarmuka:
1. **Header Hub**:
   * Badge: `MAIN NAVIGATION HUB`
   * Judul: `Main Menu`
   * Deskripsi: Gerbang navigasi cepat ke seluruh modul aplikasi.
2. **4 Kartu Gateway Modul (Grid 2 Kolom)**:
   * **Kartu 1: Explore Laptop** (Aksen Hijau `#5BC47A`)
     * Ikon Laptop, badge *Interactive Explorer*, stat *3 Hardware Tiers*, CTA *Launch Explorer*.
   * **Kartu 2: Component Library** (Aksen Teal `#45B8A5`)
     * Ikon CPU, badge *Reference Database*, stat *8 Core Components*, CTA *Open Library*.
   * **Kartu 3: How It Works** (Aksen Cyan `#5EB6D6`)
     * Ikon Buku Panduan, badge *Step-by-step*, stat *3 Easy Steps*, CTA *View Guide*.
   * **Kartu 4: About Project** (Aksen Amber `#E5B85C`)
     * Ikon Info, badge *Project Info*, stat *UTS Project 2026*, CTA *Read Details*.
3. **Tombol Kembali**:
   * Tombol *← Return to Landing Page* di bagian bawah.

---

## CONTOH CARA MEMBERIKAN PERMINTAAN REVISI

Anda dapat menggunakan format seperti contoh berikut saat ingin meminta revisi:

> **Contoh 1 (Revisi Teks & Konten)**:
> *"Revisi Halaman Landing Page: Ubah teks tombol sekunder menjadi 'Mulai Uji Tantangan' dan ganti tagline badge menjadi 'VIRTUAL LAB HARDWARE 2026'."*

> **Contoh 2 (Revisi Warna / Tampilan)**:
> *"Revisi Halaman Laptop Selection: Untuk kartu Laptop A, ganti warna tombol Inspect Architecture menjadi aksen Cyan `#5EB6D6`."*

> **Contoh 3 (Revisi Layout / Komponen)**:
> *"Revisi Challenge Hub: Pada kartu nomor 05 Speed Challenge, ubah teks tagnya menjadi 'Tantangan Refleks Waktu'."*
