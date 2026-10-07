# Laptop Anatomy VR 💻🥽

**Laptop Anatomy VR** adalah aplikasi edukasi interaktif berbasis web (dipersiapkan untuk Virtual Reality / WebXR) yang dirancang untuk mengenalkan arsitektur dan komponen internal laptop kepada pengguna melalui visualisasi 3D WebGL, eksplorasi motherboard interaktif, dan sistem kuis taktis.

Proyek ini dikembangkan untuk kebutuhan evaluasi UTS mata kuliah **Realitas Berkembang**.

---

## 🎯 Fitur & Modul Utama Aplikasi

* ✅ **Landing Page Imersif**: Pengenalan platform dengan 3D mouse parallax, floating idle animation, screen scanline beam, hotspot pulsa bertahap, dan 7-layer ambient technology background.
* ✅ **Seamless Header & Branding**: Menggunakan logo resmi [`LAVR-logo.svg`](public/LAVR-logo.svg) pada navbar dan favicon browser, header transparan menyatu dengan hero, serta dropdown navigasi hierarkis (*Explore ▾* dan *Challenge ▾*).
* ✅ **Laptop Explorer (Selection & Detail)**:
  * Pemilihan laptop berbasis 3D tilt cards (*Entry Level, Gaming, Creator*).
  * Sub-halaman detail laptop dengan **Fullscreen WebGL Background (`100vh`)** ditenagai Three.js 60 FPS.
  * Floating HUD Cards: Profil laptop & klik spesifikasi interaktif di kiri, serta dossier arsitektur pin di kanan.
  * Mengklik spesifikasi internal (CPU, GPU, RAM, SSD, Cooling, Battery) secara otomatis mengarahkan kamera 3D ke pin motherboard terkait.
* ✅ **Mesin 3D Motherboard WebGL (10 Pin Anotasi)**:
  * 10 pin spasial interaktif berhalo cahaya sesuai skema fisik (*PCIe, Fan, Storage, RAM Dual-Channel, VRM Heatsink, Wireless PCI, Primary Memory, CPU Socket LGA, Southbridge & CMOS, Secondary PCI*).
  * Kontrol Orbit 360°, zoom, raycasting hover/klik, auto-rotate, wireframe, dan preset sudut pandang (*Isometric, Top-Down, I/O Profile*).
* ✅ **Challenge Lab (5 Interactive Mini-Games)**:
  * **01 Quick Quiz**: Kuis 10 soal acak dari 20 bank soal dengan **Panggung Inspector Model 3D Komponen Fisik** (dapat diputar 360°), combo streak multiplier, feedback arsitektur, grade rating, dan rekor di `localStorage`.
  * **02 Match It**: Pemasangan bus data dan bandwidth antar-komponen.
  * **03 Drag & Place**: Pemasangan komponen dengan **preview model 3D** saat komponen diangkat.
  * **04 Find Component**: Misi pencarian spasial 10 pin langsung pada papan motherboard 3D WebGL.
  * **05 Speed Challenge**: Tantangan identifikasi kilat berbatas waktu.
* ✅ **Component Library**: Katalog 8 komponen inti dengan animasi idle hardware (*fan rotate, cpu breathe, ram scan, ssd blink, battery pulse*).
* ✅ **Strict Zero-Scroll**: Seluruh halaman dikunci pas dalam 1 layar tampilan (`100vh`, `overflow: hidden`) tanpa scrollbar vertikal.

---

## 🎨 Palet Warna & Desain Sistem

| Elemen | Hex Code | Keterangan |
| :--- | :--- | :--- |
| **Primary Background** | `#04150F` | Deep forest dark canvas |
| **Secondary Background** | `#061C14` | Viewport & section gradient |
| **Card Background** | `#0C2017` / `#0D2B1D` | Translucent glassmorphism container |
| **Primary Accent** | `#22C55E` | Emerald green neon glow |
| **Secondary Accent** | `#FACC15` | Cyber gold / warning telemetry |
| **Main Text** | `#FFFFFF` | High-contrast display typography |
| **Secondary Text** | `#86EFAC` / `#94A3B8` | Monospace & muted technical labels |

* **Tipografi**: Space Grotesk (Headings & Display), Inter (Body & UI text), JetBrains Mono (Technical Telemetry).

---

## 🚀 Panduan Menjalankan Aplikasi

1. **Clone / Buka Direktori Proyek**:
   ```bash
   cd "d:\Belajar\Realitas Berkembang\UTS"
   ```
2. **Install Dependensi**:
   ```bash
   npm install
   ```
3. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Akses di browser: `http://localhost:5173` atau `http://localhost:5174`.
4. **Build Produksi**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📄 Laporan Proyek Lengkap

* Laporan progress mendalam dapat dilihat pada [PROGRESS.md](PROGRESS.md).
* Laporan khusus sistem Challenge Lab & 5 Mini-Game dapat dilihat pada [CHALLENGE_LAB_REPORT.md](CHALLENGE_LAB_REPORT.md).
