# PANDUAN SPESIFIKASI LENGKAP SELURUH ANTARMUKA (UI)
# LAPTOP ANATOMY VR

Dokumen ini memuat **deskripsi arsitektur visual, tata letak (layout), komponen, elemen interaktif, palet warna, dan alur antarmuka pengguna (UI/UX)** dari seluruh halaman pada aplikasi **Laptop Anatomy VR**.

Dokumen ini disusun secara modular dan ramah agar Anda dapat memeriksa setiap bagian antarmuka dan memberikan instruksi revisi secara spesifik.

---

## DAFTAR ISI

1. [Cara Memberikan Catatan Revisi UI](#1-cara-memberikan-catatan-revisi-ui)
2. [Sistem Desain & Token Warna Global (Light & Friendly UI)](#2-sistem-desain--token-warna-global-light--friendly-ui)
3. [Sistem Latar Belakang Imersif Dinamis (Hijau, Ungu, Gold)](#3-sistem-latar-belakang-imersif-dinamis-hijau-ungu-gold)
4. [Standar Tata Letak 1 Layar Penuh (Strict Zero-Scroll Policy)](#4-standar-tata-letak-1-layar-penuh-strict-zero-scroll-policy)
5. [Komponen Bersama (Global Shared Components)](#5-komponen-bersama-global-shared-components)
6. [Halaman 1: Landing Page (Beranda)](#6-halaman-1-landing-page-beranda)
7. [Halaman 2: Pemilihan Laptop (Laptop Selection)](#7-halaman-2-pemilihan-laptop-laptop-selection)
8. [Halaman 3: Laboratorium 3D Detail Laptop (Laptop Detail)](#8-halaman-3-laboratorium-3d-detail-laptop-laptop-detail)
9. [Halaman 4: Perpustakaan Komponen (Component Library)](#9-halaman-4-perpustakaan-komponen-component-library)
10. [Halaman 5: Hub Tantangan (Challenge Lab Hub)](#10-halaman-5-hub-tantangan-challenge-lab-hub)
11. [Sub-Halaman Tantangan & Mini-Game Suite (6 Modul)](#11-sub-halaman-tantangan--mini-game-suite-6-modul)
    * 11.1 Alur Mission Briefing (Dossier Edukasi Non-3D)
    * 11.2 Challenge 01: Quick Hardware Quiz (3D Transparan Bersih)
    * 11.3 Challenge 02: Match It! (Memory Puzzle 3D Acak)
    * 11.4 Challenge 03: Drag & Place (Meja Kerja Motherboard Autentik)
    * 11.5 Challenge 04: Component Diagnostics (Triage Perangkat Keras)
    * 11.6 Challenge 05: Speed Challenge (Time-Attack 60 Detik)
    * 11.7 Challenge 06: Hardware Identification (Analisis Silikon)
12. [Halaman 6: Panduan Alur (How It Works)](#12-halaman-6-panduan-alur-how-it-works)
13. [Halaman 7: Tentang Proyek (About)](#13-halaman-7-tentang-proyek-about)

---

## 1. CARA MEMBERIKAN CATATAN REVISI UI

Saat Anda ingin merevisi tampilan atau elemen tertentu, Anda cukup menyebutkan:
1. **Nama Halaman / Komponen**: (contoh: *Halaman Drag & Place*, *Komponen Navbar*, atau *Kartu Tantangan di Hub*)
2. **Elemen yang Ingin Diubah**: (contoh: *Ukuran Font*, *Posisi Tombol*, *Aksen Warna*, *Bentuk Slot Motherboard*, dsb.)
3. **Instruksi Perubahan**: (contoh: *"Perbesar teks header", "Ganti aksen tombol ke warna ungu", "Tambahkan indikator X pada soket", dsb.*)

---

## 2. SISTEM DESAIN & TOKEN WARNA GLOBAL (LIGHT & FRIENDLY UI)

Aplikasi mengusung tema **terang, bersih, ramah, dan futuristik** (*Bright Futuristic Lab*). Menghilangkan kesan gelap pekat yang melelahkan mata dan menggantinya dengan ruang kerja laboratorium digital modern yang segar.

### A. Palet Warna Utama
| Peran Token | Kode Hex / Tailwind | Karakteristik & Penggunaan |
| :--- | :--- | :--- |
| **Latar Belakang Dasar** | `#F8FAFC` (`slate-50`) | Latar dasar bersih bergradasi lembut, nyaman di mata. |
| **Permukaan Kartu (Surface)** | `#FFFFFF` (`bg-white`) | Kartu konten putih murni berkilau halus dengan sudut membulat lebar (`rounded-2xl`, `rounded-3xl`). |
| **Elevasi & Border** | `#E2E8F0` (`slate-200`) | Garis tepi halus ultra-ramping (`border-slate-200/80`) dengan bayangan halus (`shadow-xs` / `shadow-sm`). |
| **Teks Utama (Headings)** | `#0F172A` (`slate-900`) | Tipografi Space Grotesk tajam dan terbaca jelas. |
| **Teks Deskripsi (Body)** | `#475569` (`slate-600`) | Tipografi Inter netral, kontras seimbang, ramah pembaca. |
| **Teks Metadata / Telemetri** | `#64748B` (`slate-500`) | Tipografi JetBrains Mono untuk metrik teknis dan status. |
| **Brand Primary Green** | `#10B981` (`emerald-600`) | Aksen hijau segar untuk tombol aksi utama (CTA), status aktif, dan indikator sukses. |
| **Aksen Royal Purple** | `#8B5CF6` (`violet-500`) | Aksen ungu modern untuk kartu spesialisasi, aurora latar, dan badge tingkat lanjut. |
| **Aksen Radiant Gold** | `#F59E0B` (`amber-500`) | Aksen emas untuk poin XP, bintang skor, pinout sirkuit motherboard, dan highlight kunci. |
| **Aksen Semantic Alert** | `#F43F5E` (`rose-500`) | Indikator kesalahan atau peringatan kritis. |

---

## 3. SISTEM LATAR BELAKANG IMERSIF DINAMIS (HIJAU, UNGU, GOLD)

Komponen: [src/components/common/ImmersiveBackground.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/common/ImmersiveBackground.jsx)

Latar belakang tidak lagi polos! Halaman dihidupkan oleh sistem atmosfer visual multi-layer yang beranimasi halus:
1. **Tritone Ambient Auroras**: Tiga pendaran cahaya bergradasi lembut di tepian layar:
   * Pendaran Hijau Zamrud (`emerald-400/15`) di sudut kiri atas.
   * Pendaran Ungu Royal (`violet-400/15`) di sudut kanan bawah.
   * Pendaran Emas Bercahaya (`amber-300/12`) di area tengah.
2. **Interactive Cursor Spotlight**: Efek sorotan cahaya halus transparan yang bergerak lembut mengikuti koordinat kursor mouse pengguna.
3. **SVG Hardware Circuit Traces & Traveling Photons**: Garis-garis sirkuit tipis berbelok khas papan PCB (berwarna hijau, ungu, dan emas) dengan partikel foton bercahaya yang mengalir di sepanjang jalurnya.
4. **Floating Ambient Particles**: Butiran partikel halus yang melayang acak memberikan sensasi kedalaman ruang (*depth of field*).

---

## 4. STANDAR TATA LETAK 1 LAYAR PENUH (STRICT ZERO-SCROLL POLICY)

Semua halaman utama dan sub-halaman game menerapkan kebijakan **Zero-Scroll**:
* Ketinggian konten dikunci pada batas maksimal layar: `h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-hidden`.
* Jarak bernapas di bagian bawah (*bottom clearance*) dirancang lega (40–70px) agar elemen bawah tidak mepet ke tepi layar atau terpotong taskbar.
* Pengguna dapat menikmati seluruh interaksi secara ergonomis tanpa perlu menggulir (*scrolling*) ke bawah.

---

## 5. KOMPONEN BERSAMA (GLOBAL SHARED COMPONENTS)

### A. Navigation Bar (Header)
* **File**: [src/components/common/Navbar.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/common/Navbar.jsx)
* **Karakter Visual**: Putih berkilau kaca (`bg-white/85 backdrop-blur-md`), garis tepi `border-slate-200/80`.
* **Identitas Brand**: Logo teks `Laptop Anatomy VR` dengan indikator status online hijau berdenyut (`bg-emerald-500`).
* **Menu Navigasi**: Home, Explore (Dropdown: Semua Laptop, Ultrabook, Gaming, Creator, Library), Challenge (Dropdown: Hub + 6 Game), How It Works, About. Indikator aktif ditandai garis bawah hijau melengkung.

---

## 6. HALAMAN 1: LANDING PAGE (BERANDA)

* **File**: [src/components/pages/Home.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/Home.jsx)
* **Layout**: Split 2 Kolom Seimbang dalam 1 Halaman Penuh.
* **Kolom Kiri (Hero Intel)**:
  * Badge Sistem: `INTERACTIVE HARDWARE PLATFORM • VER 2.4`.
  * Judul Utama: `Bedah Arsitektur & Anatomi Laptop Secara Interaktif`.
  * Deskripsi Edukasi: Penjelasan singkat fungsi pembelajaran komponen sirkuit internal.
  * Tombol CTA: Tombol hijau primer `Mulai Eksplorasi 3D` dan tombol sekunder putih `Buka Challenge Lab`.
  * 3 Metrik Cepat: `9+ Komponen Inti`, `10 Pinout Presisi`, `6 Modul Praktik`.
* **Kolom Kanan (3D Interactive Preview)**:
  * Kanvas 3D Motherboard interaktif yang berputar halus dengan pencahayaan studio bersih.
  * Kartu status telemetri mengambang di pojok pratinjau.

---

## 7. HALAMAN 2: PEMILIHAN LAPTOP (LAPTOP SELECTION)

* **File**: [src/components/pages/ExploreLaptops.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/ExploreLaptops.jsx)
* **Layout**: 3 Kartu Grid Berdampingan Pas 1 Layar Penuh.
* **Header**: Judul `Pilih Profil Arsitektur Laptop` dengan subtitle ringkas dan badge kategori.
* **3 Kartu Laptop Terkurasi**:
  1. **Ultrabook Slim X1**: Banner gambar fotorealistik ramping, spesifikasi daya hemat 15W, RAM LPDDR5 soldered, penyimpanan tunggal M.2. Aksen Cyan/Teal.
  2. **Gaming Performance Beast**: Banner laptop gaming dengan kisi pendingin agresif, CPU HX 55W + GPU RTX 4080, dual fan vapor chamber. Aksen Emerald Green.
  3. **Creator Studio Pro**: Banner workstation bodi aluminium elegan, layar resolusi tinggi, konfigurasi pendingin hening. Aksen Violet/Purple.
* **Aksi Interaktif**: Mengarahkan kursor menampilkan elevasi kartu (`shadow-md scale-[1.01]`), tombol `Bedah Komponen Motherboard 3D →` membawa langsung ke laboratorium 3D.

---

## 8. HALAMAN 3: LABORATORIUM 3D DETAIL LAPTOP (LAPTOP DETAIL)

* **File**: [src/components/pages/LaptopDetail.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/LaptopDetail.jsx)
* **Layout**: Fullscreen WebGL 3D Motherboard Digital Twin (`w-full h-[calc(100vh-4.5rem)]`) dengan HUD kaca mengambang di atasnya tanpa scroll.
* **Fitur Marker 3D Huruf 'V' (Chevron V-Arrow)**:
  * Seluruh penanda komponen di motherboard menggunakan **panah 3D berbentuk huruf V** (*downward chevron*) bersih tanpa bayangan lantai gelap (`castShadow = false`, `receiveShadow = false`).
  * **Efek Timbul & Bersinar**: Ketika pin ditekan/aktif, panah V menjulang naik (+0.32 unit), membesar sepanjang bentuknya (`scale 1.38x`), dan memancarkan pendaran neon hijau zamrud (`emissiveIntensity = 2.6`) yang berdenyut anggun.
* **Panel Inspeksi Teknis Kanan (Technical Dossier)**:
  * **Model 3D Interaktif Presisi di Tengah**: Menampilkan model 3D komponen isolasi ([src/components/3d/Component3DViewer.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/3d/Component3DViewer.jsx)) yang berputar 360° otomatis, dikalkulasi dengan pembatas `Box3.getCenter()` sehingga terpusat sempurna di tengah wadah.
  * **Box Foto Fisik Riil Komponen**: Wadah foto fisik asli komponen yang terhubung ke direktori `public/images/components/pin-[n].jpg`.
  * **Panduan Pengunggahan Foto**: Jika berkas foto belum dimasukkan, ditampilkan bingkai bergaris putus-putus elegan dengan ikon kamera yang mengarahkan pengguna untuk menyimpan foto di `public/images/components/` sesuai dokumen [public/images/components/PANDUAN_FOTO_KOMPONEN.md](file:///d:/Belajar/Realitas%20Berkembang/UTS/public/images/components/PANDUAN_FOTO_KOMPONEN.md).
  * Penjelasan Fungsi Arsitektur, Penerapan pada Laptop Modern, dan Matriks Bus Elektrikal.
* **Bilah Hotspot Bawah (Pins 1–10)**: Bar pil mengambang di bagian bawah untuk akses cepat fokus kamera ke 10 komponen bernomor.

---

## 9. HALAMAN 4: PERPUSTAKAAN KOMPONEN (COMPONENT LIBRARY)

* **File**: [src/components/pages/ComponentLibrary.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/ComponentLibrary.jsx)
* **Layout**: Master-Detail 2 Kolom (Daftar 9 Komponen di kiri, Inspektor 3D di kanan).
* **Daftar Komponen**: CPU, GPU, RAM DDR5, SSD NVMe, Heatsink Tembaga, Kipas Blower, Baterai CMOS, Soket LGA, Slot PCIe.
* **Inspektor 3D**: Model komponen berputar 360°, bebas diputar menggunakan drag mouse, informasi fungsi, pinout, dan parameter termal.

---

## 10. HALAMAN 5: HUB TANTANGAN (CHALLENGE LAB HUB)

* **File**: [src/components/pages/ChallengeLab.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/ChallengeLab.jsx) & [GamePreview.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/challenge/GamePreview.jsx)
* **Struktur Tata Letak**:
  * **Area Pratinjau Tengah yang Besar (Central Preview)**: Menampilkan simulasi nyata dari tantangan yang sedang dipilih (mini-kuis live, slot perakitan live, kartu memori live) sehingga pengguna dapat mencoba sebelum bermain.
  * **6 Kartu Modul Mengelilingi Pratinjau**:
    1. Quick Hardware Quiz (Kuis Pilihan Ganda 3D)
    2. Match It! (Memory Puzzle Spesifikasi)
    3. Drag & Place (Perakitan Soket Motherboard)
    4. Component Diagnostics (Pemecahan Masalah Hardware)
    5. Speed Challenge (Time-Attack 60 Detik)
    6. Hardware Identification (Analisis Silikon Mendalam)
  * Kartu terpilih disorot dengan cincin bercahaya dan badge status.

---

## 11. SUB-HALAMAN TANTANGAN & MINI-GAME SUITE (6 MODUL)

### 11.1 Alur Mission Briefing (Dossier Edukasi Non-3D)
* **File**: [src/components/challenge/GameBriefingView.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/challenge/GameBriefingView.jsx)
* **Karakteristik**:
  * **Bebas 3D**: Sesuai permintaan pengguna, model 3D dihilangkan agar halaman briefing memuat instan dan fokus pada pemahaman aturan.
  * **Mission Dossier Card (Kiri)**: Kartu identitas misi dengan ikon target, badge reward `+500 XP ON COMPLETION`, dan 4 metrik telemetri (Target Soket, Interface, Bonus Perakitan, Toleransi Pin).
  * **Panduan & Aturan Misi (Kanan)**: Langkah-langkah instruksi terperinci nomor 1, 2, 3 dan tips praktis.
  * **Aksi Navigasi**: Tombol hijau lebar `Mulai Tantangan →` dan tombol kembali `← Kembali ke Hub`. Setelah game selesai, tombol kembali selalu mengarah ke halaman briefing ini terlebih dahulu.

### 11.2 Challenge 01: Quick Hardware Quiz (3D Transparan Bersih)
* **File**: [src/components/challenge/QuickQuizGame.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/challenge/QuickQuizGame.jsx)
* **Karakteristik**:
  * 10 pertanyaan arsitektur hardware interaktif.
  * **Viewer 3D Transparan**: Menghilangkan kotak hitam pekat yang lama! Model 3D komponen terkait berdiri bersih di atas pelat bayangan lembut di atas kartu putih.
  * 4 opsi jawaban interaktif dengan feedback visual langsung (hijau untuk benar, merah untuk salah).
  * Bilah progres atas dengan indikator skor bintang emas.

### 11.3 Challenge 02: Match It! (Memory Puzzle 3D Acak)
* **File**: [src/components/challenge/MatchItGame.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/challenge/MatchItGame.jsx)
* **Karakteristik**:
  * Grid kartu memori dengan perpaduan nama komponen, fungsi, dan aset 3D.
  * Komponen dipilih secara **acak (randomized)** di setiap sesi permainan baru agar tidak monoton.
  * Fitur pencocokan pasangan dengan efek balik kartu halus dan audio/haptic feedback visual.

### 11.4 Challenge 03: Drag & Place (Meja Kerja Perakitan 3D Layar Penuh — Isometrik & Bebas Terhalang)
* **File**: [src/components/challenge/DragPlaceGame.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/challenge/DragPlaceGame.jsx) & [DragPlace3DWorkbench.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/challenge/DragPlace3DWorkbench.jsx)
* **Karakteristik Utama**:
  * **Kanvas Layar Penuh (Fullscreen WebGL)**: Kanvas Three.js memenuhi layar seperti di Laptop Explore (`w-full h-[calc(100vh-4.5rem)]`).
  * **Sudut Pandang Kamera Isometrik Terkunci**: Kamera terkunci pada sudut isometrik bersih (`camera.position.set(-1.2, 10.2, 11.2)` & `controls.target.set(-1.2, 0, 0.4)`), ter-offset presisi sehingga seluruh motherboard dan baki perakitan berada di area tengah-kanan terbuka dan tidak terhalang panel.
  * **Panel Quest Collapsible (Bisa Dilipat)**: Panel daftar target misi di sebelah kiri dilengkapi tombol lipat (`< ChevronLeft`), yang menciutkan panel menjadi pil melayang kecil `TARGET PERAKITAN (0/3)` sehingga ruang 3D 100% terbuka tanpa gangguan.
  * **Kolam Komponen Acak (Randomized Pool)**: Setiap sesi permainan mengacak 3 komponen berbeda dari kumpulan perangkat keras: CPU Core i7, RAM DDR5, SSD NVMe, Baterai Polymer 75Wh, Modul Wi-Fi 6E, dan Kipas Pendingin 12V. Dilengkapi tombol **Acak Komponen Baru**.
  * **Perbaikan Tuntas Bug Multi-Item Stale Closure**: Menggunakan functional state update dan callback ref sehingga komponen yang sudah terpasang terkunci permanen di soketnya, tidak pernah hilang saat komponen lain dipasang, dan kondisi kemenangan (+500 XP) langsung terpicu saat seluruh komponen terpasang.
  * **Dukungan Seret 3D & Klik Cepat**: Pengguna dapat menyeret model 3D langsung dari baki perakitan atau mengklik kartu target di panel lalu mengklik beacon soket bercahaya di motherboard. Teks tooltip hover menampilkan nama komponen yang benar secara dinamis (bebas dari teks `undefined`).

### 11.5 Challenge 04: Component Diagnostics (Triage Perangkat Keras)
* **File**: [src/components/challenge/ComponentDiagnosticsGame.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/challenge/ComponentDiagnosticsGame.jsx)
* **Karakteristik**:
  * Skenario kasus kerusakan laptop nyata (misal: layar artifak, laptop mati total saat render berat, SSD tidak terdeteksi di BIOS).
  * Pemain menganalisis gejala dan memilih komponen penyebab kegagalan dengan inspeksi visual.

### 11.6 Challenge 05: Speed Challenge (Time-Attack 60 Detik)
* **File**: [src/components/challenge/SpeedChallengeGame.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/challenge/SpeedChallengeGame.jsx)
* **Karakteristik**:
  * Pengatur waktu hitung mundur 60 detik dengan efek detak jantung visual saat mendekati 10 detik terakhir.
  * Menampilkan model 3D komponen acak berputar cepat; pemain harus menebak nama dan fungsi secepat mungkin untuk mengumpulkan streak multiplier.

### 11.7 Challenge 06: Hardware Identification (Analisis Silikon)
* **File**: [src/components/challenge/HardwareIdentificationGame.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/challenge/HardwareIdentificationGame.jsx)
* **Karakteristik**:
  * Modul tingkat lanjut untuk mengenali komponen dari detail fisik mikroskopis (posisi notch RAM, jumlah pin BGA/LGA, kode form factor M.2 2280 vs 2230).

---

## 12. HALAMAN 6: PANDUAN ALUR (HOW IT WORKS)

* **File**: [src/components/pages/HowItWorks.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/HowItWorks.jsx)
* **Layout**: 4 Kartu Alur Horizontal Seimbang Pas 1 Layar Penuh.
* **4 Tahapan Pembelajaran**:
  1. *Pilih Form Factor*: Pilih profil arsitektur laptop (Ultrabook, Gaming, Creator).
  2. *Eksplorasi 3D Motherboard*: Jelajahi 10 pinout interaktif dengan kendali orbit 360°.
  3. *Pelajari Telemetri*: Pahami bandwidth data, konfigurasi daya, dan disipasi termal.
  4. *Uji di Challenge Lab*: Validasi pemahaman lewat 6 modul mini-game praktis.

---

## 13. HALAMAN 7: TENTANG PROYEK (ABOUT)

* **File**: [src/components/pages/About.jsx](file:///d:/Belajar/Realitas%20Berkembang/UTS/src/components/pages/About.jsx)
* **Layout**: Panel Informasi Terintegrasi Pas 1 Layar Penuh.
* **Konten**:
  * Visi dan latar belakang pembuatan aplikasi untuk Ujian Tengah Semester (UTS) mata kuliah Realitas Berkembang.
  * Arsitektur teknologi: React 18, Three.js WebGL Native 60 FPS, Vite, Tailwind CSS.
  * Informasi pengembang dan hak cipta akademis.

---

Dokumen ini mencerminkan keadaan implementasi visual aplikasi terkini dan siap digunakan sebagai panduan revisi berkelanjutan.
