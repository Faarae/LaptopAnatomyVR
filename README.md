# Laptop Anatomy VR 💻🥽

**Laptop Anatomy VR** adalah aplikasi edukasi berbasis Virtual Reality (VR) yang dirancang untuk mengenalkan arsitektur dan komponen internal laptop kepada pengguna secara interaktif. Proyek ini dikembangkan untuk kebutuhan UTS mata kuliah **Realitas Berkembang**.

---

## 🎯 Lingkup Pengembangan Saat Ini (Phase 1)

Sesuai dengan batasan instruksi pengembangan:
* ✅ **Landing Page**: Pengenalan platform dengan navigasi utama dan hero visual bertema teknologi.
* ✅ **Main Menu**: Pusat navigasi interaktif (*Explore Laptop, Component Library, How It Works, About*).
* ✅ **Laptop Selection**: Pemilihan kategori laptop (*Entry Level, Gaming, Creator*) berbasis card UI.
* ✅ **Laptop Detail & 3D Placeholder**: Area viewport khusus berlabel **"3D Model Coming Soon"** dan **"3D MODEL PLACEHOLDER"** yang terisolasi dan siap menerima canvas WebGL/Three.js/WebXR di masa mendatang tanpa merombak tata letak UI.
* ✅ **Component Library**: Katalog 8 komponen inti laptop (*CPU, GPU, RAM, SSD, Motherboard, Battery, Cooling Fan, Wi-Fi Card*).
* ✅ **How It Works**: Panduan 3 langkah alur edukasi (*Step 01, Step 02, Step 03*).
* ✅ **About**: Informasi misi edukasi, target pengguna, dan arsitektur sistem.
* 🚫 **Scope Non-Goals**: Belum memuat objek 3D, animasi exploded view, physics, maupun sistem kuis interaktif (disiapkan untuk fase berikutnya).

---

## 🎨 UI/UX Design System & Color Palette

Antarmuka menggunakan estetika **Dark Futuristic Technology**:

| Elemen | Hex Code | Keterangan |
| :--- | :--- | :--- |
| **Primary Background** | `#0B1020` | Cyber dark background |
| **Secondary Background** | `#111827` | Viewport & section background |
| **Card Background** | `#172033` | Glassmorphism card container |
| **Primary Accent** | `#38BDF8` | Cyan neon accent & primary interactive glow |
| **Secondary Accent** | `#818CF8` | Indigo neon accent |
| **Main Text** | `#F8FAFC` | High-contrast readable typography |
| **Secondary Text** | `#94A3B8` | Muted technical descriptions |

* **Typography**: Space Grotesk (Headings & Display), Inter (Body & UI text).
* **Button States**: Default, Hover (glow & elevation), Active (scale click effect), Disabled (40% opacity, pointer-events disabled).

---

## 📁 Arsitektur Proyek (Decoupled & Scalable)

```text
UTS/
├── dist/                             # Production build siap deploy
├── src/
│   ├── data/
│   │   ├── laptopData.js             # Data model kategori laptop & spesifikasi
│   │   └── componentData.js          # Data katalog 8 komponen internal laptop
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx            # Standar button (default, hover, active, disabled)
│   │   │   └── Navbar.jsx            # Dynamic breadcrumb & header
│   │   ├── placeholder3d/
│   │   │   └── Model3DPlaceholder.jsx# Viewport terisolasi (#vr-3d-viewport-target)
│   │   └── pages/
│   │       ├── LandingPage.jsx       # Hero, CTA Start Exploring & How It Works
│   │       ├── MainMenu.jsx          # Menu navigasi 4 modul
│   │       ├── LaptopSelection.jsx   # Pemilihan 3 kartu laptop
│   │       ├── LaptopDetail.jsx      # Detail laptop + 3D Viewport + Specs
│   │       ├── ComponentLibrary.jsx  # Grid 8 kartu komponen
│   │       ├── HowItWorks.jsx        # Step 01, Step 02, Step 03 visual guide
│   │       └── About.jsx             # Tentang aplikasi & tujuan edukasi
│   ├── styles/
│   │   └── index.css                 # Cyber grid, glow, & Tailwind configuration
│   ├── App.jsx                       # State router & navigator
│   └── main.jsx                      # React mount entry
├── index.html                        # Shell HTML dengan font Space Grotesk & Inter
├── tailwind.config.js                # Token warna & styling
├── vite.config.js                    # Konfigurasi bundler Vite
└── package.json                      # Dependensi & skrip
```

---

## 🚀 Cara Menjalankan Proyek

### 1. Menjalankan di Mode Development
Pastikan [Node.js](https://nodejs.org/) telah terpasang, lalu jalankan di terminal:

```bash
npm install
npm run dev
```
Buka browser pada alamat yang ditampilkan (biasanya `http://localhost:5173/`).

### 2. Membangun Versi Produksi
Untuk mengompilasi file statis siap saji:

```bash
npm run build
```
Hasil build akan tersimpan di dalam folder `dist/`.

### 3. Menjalankan Preview Versi Produksi
```bash
npm run preview
```

---

## 🔄 Alur Navigasi Aplikasi

```text
Landing Page
     │
     ├── Start Exploring ─────────┐
     └── How It Works ──┐         │
                        │         ▼
                        │     Main Menu
                        │         │
                        ├─────────┼───────────────┬────────────┐
                        ▼         ▼               ▼            ▼
                     How It    Explore        Component      About
                     Works     Laptop         Library
                                  │
                                  ▼
                            Laptop Selection
                                  │
                                  ▼
                            Laptop Detail
                                  │
                                  ▼
                         3D Model Placeholder
```
