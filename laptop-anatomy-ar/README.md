# Laptop Anatomy AR (Standalone WebAR Project — Branch `ar`)

Aplikasi **Laptop Anatomy AR** adalah aplikasi *Marker-Based Web Augmented Reality (WebAR)* yang dibangun menggunakan **MindAR (v1.2.5)** dan **A-Frame (v1.5.0)**. Folder ini adalah versi mandiri (*standalone*) yang siap di-push ke branch `ar` atau di-deploy langsung ke Vercel/Netlify.

---

## 1. Struktur Folder Mandiri (`laptop-anatomy-ar`)

```text
laptop-anatomy-ar/
├── index.html                        # Halaman utama WebAR (Landing Page + Scanner Kamera)
├── style.css                         # Stylesheet UI & HUD kamera
├── ar-app.js                         # Logika WebAR (Tracking events, Scale/Rotate, Audio TTS)
├── ar-data.js                        # Data edukasi 3 komponen (CPU, RAM, SSD)
├── package.json                      # Konfigurasi Vite + HTTPS lokal (@vitejs/plugin-basic-ssl)
├── vite.config.js                    # Server lokal HTTPS di port 5173 (host: true)
└── public/
    ├── targets.mind                  # File kompilasi MindAR 3 target marker
    ├── LAVR-logo.svg                 # Logo identitas aplikasi
    ├── images/
    │   └── laptop-exploded-hero.jpg  # Gambar latar hero landing page
    ├── markers/                      # 3 Kartu marker siap cetak / scan
    │   ├── marker-cpu.png            # Target 0: CPU Intel Core i7-14650HX
    │   ├── marker-ram.png            # Target 1: RAM SO-DIMM DDR5-5600
    │   └── marker-ssd.png            # Target 2: SSD M.2 2280 NVMe PCIe 4.0
    └── models/                       # Model 3D biner glTF (.glb)
        ├── cpu.glb
        ├── ram.glb
        └── ssd.glb
```

---

## 2. Cara Menjalankan Hosting Lokal

1. Masuk ke folder `laptop-anatomy-ar` dan install dependency:
   ```powershell
   cd laptop-anatomy-ar
   npm install
   npm run dev
   ```
2. Buka di browser:
   * **Di Laptop**: `https://localhost:5173/`
   * **Di HP (Satu Wi-Fi/Hotspot)**: `https://192.168.x.x:5173/` *(lihat URL Network di terminal)*

---

## 3. Cara Push Folder Ini Khusus ke Branch `ar`

Jika ingin mem-push **hanya isi folder `laptop-anatomy-ar`** ke branch `ar` pada repositori GitHub Anda:

```powershell
cd "d:\Belajar\Realitas Berkembang\UTS\laptop-anatomy-ar"
git init
git checkout -b ar
git remote add origin https://github.com/Faarae/LaptopAnatomyVR.git
git add .
git commit -m "feat(ar): standalone Laptop Anatomy WebAR project"
git push -u origin ar --force
```

