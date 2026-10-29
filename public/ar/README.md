# Panduan Aplikasi Laptop Anatomy AR (WebAR MindAR)

Aplikasi **Laptop Anatomy AR** adalah aplikasi *Marker-Based Web Augmented Reality (WebAR)* yang dikembangkan secara mandiri menggunakan **MindAR (v1.2.5)** dan **A-Frame (v1.5.0)**. Aplikasi ini mengadaptasi tema, data edukasi, dan model 3D perangkat keras dari proyek **Laptop Anatomy VR**.

---

## 1. Struktur Folder & Aset

Aplikasi WebAR ditempatkan di dalam direktori `public/ar/` agar terpisah total dari aplikasi VR lama:

```text
public/ar/
├── index.html            # Halaman utama WebAR (Landing Page + Scanner Kamera)
├── style.css             # Tema futuristik Dark Slate, Neon Cyan, Emerald, dan Gold
├── ar-app.js             # Logika WebAR (Tracking events, Scale/Rotate, Audio TTS)
├── ar-data.js            # Data edukasi komponen bersumber dari componentData.js
├── targets.mind          # [Perlu Dikompilasi Manual] File biner target 3 marker
├── markers/              # File gambar kartu marker sumber siap cetak / scan:
│   ├── marker-cpu.png    # Target 0: CPU Intel Core i7-14650HX (1.9 MB)
│   ├── marker-ram.png    # Target 1: RAM SO-DIMM DDR5-5600 (1.3 MB)
│   └── marker-ssd.png    # Target 2: SSD M.2 2280 NVMe PCIe 4.0 (1.0 MB)
└── models/               # Model 3D biner glTF (.glb) tervalidasi & terpusat:
    ├── cpu.glb           # 33 KB (Substrate BGA1964, IHS nikel, stiker canvas laser)
    ├── ram.glb           # 75 KB (Dual slot SO-DIMM, 8x chip BGA, stiker label DDR5)
    └── ssd.glb           # 47 KB (M.2 Key-M, PCIe 4.0 controller, NAND flash)
```

---

## 2. Pemetaan Target Index (Target Mapping)

File `targets.mind` memetakan 3 kartu marker berikut secara berurutan:

| Target Index | Komponen | File Gambar Marker Sumber | Model 3D yang Muncul | Deskripsi Utama |
| :---: | :--- | :--- | :--- | :--- |
| **0** | **CPU** | `public/ar/markers/marker-cpu.png` | `public/ar/models/cpu.glb` | Intel Core i7-14650HX, 16 Cores, 24 Threads |
| **1** | **RAM** | `public/ar/markers/marker-ram.png` | `public/ar/models/ram.glb` | SO-DIMM DDR5-5600 MT/s, Dual-Channel 1.1V |
| **2** | **SSD** | `public/ar/markers/marker-ssd.png` | `public/ar/models/ssd.glb` | 1TB M.2 2280 NVMe PCIe 4.0 x4, 7000 MB/s Read |

---

## 3. Cara Kompilasi Manual `targets.mind` (Langkah 1 Menit)

Sesuai ketentuan, file `.mind` **tidak boleh dibuat sembarangan/palsu**. Untuk menghasilkan file pelacakan Computer Vision yang valid:

1. Buka browser dan kunjungi compiler resmi MindAR:  
   👉 **[https://hiukim.github.io/mind-ar-js-doc/tools/compile](https://hiukim.github.io/mind-ar-js-doc/tools/compile)**
2. Seret (*drag & drop*) atau unggah ketiga gambar kartu marker dari folder `public/ar/markers/` **dengan urutan yang tepat**:
   * **Gambar 1 (Index 0)**: `marker-cpu.png`
   * **Gambar 2 (Index 1)**: `marker-ram.png`
   * **Gambar 3 (Index 2)**: `marker-ssd.png`
3. Periksa titik fitur (*green tracking feature dots*) yang tersebar di sudut dan logo kartu marker.
4. Klik tombol **"Start" / "Compile"**. Proses kompilasi akan berjalan di peramban Anda (biasanya memakan waktu 30–60 detik).
5. Setelah selesai, unduh file hasilnya, pastikan namanya adalah **`targets.mind`**.
6. Pindahkan / simpan file tersebut ke lokasi:  
   📂 **`d:\Belajar\Realitas Berkembang\UTS\public\ar\targets.mind`**

---

## 4. Cara Menjalankan Secara Lokal

1. Buka terminal di folder proyek ini:
   ```bash
   npm run dev
   ```
2. Buka browser pada URL:
   * **WebAR Langsung**: `http://localhost:5173/ar/index.html` (atau `http://localhost:5173/ar/`)
   * **Aplikasi VR Lama**: `http://localhost:5173/` (tetap utuh dan berfungsi normal)

---

## 5. Cara Menjalankan di Smartphone (Panduan HTTPS)

> **PENTING**: Semua peramban smartphone (Google Chrome di Android maupun Safari di iPhone) **mewajibkan protokol HTTPS** agar kamera WebRTC dapat diakses. Membuka IP lokal HTTP biasa (seperti `http://192.168.x.x:5173`) akan menghasilkan layar hitam karena izin kamera ditolak oleh browser.

### Opsi A: Deploy Instan ke Hosting HTTPS (Paling Direkomendasikan)
1. Buat repositori GitHub dan push proyek ini.
2. Hubungkan ke **Vercel** atau **Netlify** (gratis):
   * Build Command: `npm run build`
   * Output Directory: `dist`
3. Buka tautan HTTPS hasil deploy di peramban HP Anda (misal: `https://laptop-anatomy-ar.vercel.app/ar/`).

### Opsi B: Menggunakan Tunneling HTTPS Lokal (Tanpa Deploy)
Di terminal komputer Anda saat `npm run dev` berjalan, jalankan tunnel sementara:
```bash
npx localtunnel --port 5173
```
Buka tautan `https://xxxx.loca.lt/ar/` di smartphone Anda.

---

## 6. Fitur & Interaksi yang Tersedia

1. **Siklus Status Pelacakan Marker**:
   * **Sebelum Marker Ditemukan**: Status pill berwarna kuning berkedip (*"Arahkan kamera ke kartu marker..."*), reticle pemindaian aktif di tengah layar.
   * **Marker Terdeteksi (Target Found)**: Status pill menyala hijau (*"● Terdeteksi: [Komponen]"*), model 3D muncul tegak di atas kartu, reticle meredup otomatis.
   * **Marker Hilang (Target Lost)**: Status pill berwarna oranye (*"Marker Hilang. Arahkan kembali kamera"*), panel informasi edukasi terakhir tetap bertahan agar pengguna dapat terus membaca.
2. **Kontrol Interaksi 3D**:
   * **Scale `+`**: Memperbesar ukuran model (maksimal 2.5x).
   * **Scale `−`**: Memperkecil ukuran model (minimal 0.25x).
   * **Reset Scale (`↺`)**: Mengembalikan skala ke 1.0x dan mereset rotasi.
   * **Rotate Left / Right (`↶` / `↷`)**: Memutar model 15° per klik.
   * **Auto-Rotate (`⚡`)**: Menyalakan / mematikan rotasi otomatis 360° yang mulus.
3. **Audio Text-to-Speech (TTS)**:
   * Tombol **"🔊 Dengarkan"**: Membacakan ringkasan edukasi komponen dalam Bahasa Indonesia (`id-ID`).
   * Tombol **"⏹ Stop"**: Menghentikan narasi seketika.
   * *Fitur ini murni memerlukan interaksi klik pengguna (tanpa autoplay).*
4. **Bottom Sheet Edukasi**:
   * Panel informasi dapat digeser atau diklik untuk dibuka / dilipat.
   * Dilengkapi 3 tab: **Ikhtisar & Fungsi**, **Spesifikasi Teknis**, dan **Peran di Laptop**.

---

## 7. Checklist Pengujian di Smartphone

- [ ] **Akses Kamera**: Izin kamera (*camera prompt*) muncul saat menekan tombol "Buka Scanner WebAR" dan disetujui.
- [ ] **Uji Marker 1 (CPU)**: Arahkan ke `marker-cpu.png`, model 3D Intel CPU muncul tegak dan terpusat.
- [ ] **Uji Marker 2 (RAM)**: Arahkan ke `marker-ram.png`, model 3D SO-DIMM RAM muncul dengan slot ganda.
- [ ] **Uji Marker 3 (SSD)**: Arahkan ke `marker-ssd.png`, model 3D M.2 NVMe SSD muncul dengan chip flash.
- [ ] **Uji Skala**: Tekan tombol `+` dan `−`, pastikan model membesar dan mengecil dengan batas aman.
- [ ] **Uji Rotasi**: Tekan tombol putar manual dan tombol rotasi otomatis (*Auto-Rotate*).
- [ ] **Uji TTS**: Tekan tombol speaker, dengarkan suara pembacaan bahasa Indonesia.
- [ ] **Uji Target Lost**: Tutup kartu marker, pastikan status berubah menjadi oranye dan teks bottom sheet tidak hilang.
