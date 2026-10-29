# Laptop Anatomy Education

**Laptop Anatomy Education** adalah platform pembelajaran arsitektur perangkat keras laptop berbasis web yang mengintegrasikan tiga pilar utama: **Edukasi VR (3D WebGL)**, **Edukasi AR (Marker-Based WebAR / MindAR)**, dan **Challenge Lab (6 Misi Evaluasi & Perakitan 3D)**.

---

## Tiga Pilar Utama

1. **Edukasi VR (Eksplorasi 3D Virtual)**
   - **Eksplorasi Arsitektur Laptop**: Bedah motherboard 3D interaktif pada 3 kategori laptop (*Ultrabook Slim X1*, *Gaming Performance Beast*, dan *Creator Studio Pro*) dengan 10 pin hotspot.
   - **Katalog Komponen 3D**: Inspeksi 8 komponen inti (CPU, GPU, RAM, SSD, Cooling Fan, Battery, Wi-Fi Card, Motherboard) lengkap dengan mode perbandingan Model 3D dan Foto Fisik Riil.
2. **Edukasi AR (Studio Pemindaian WebAR)**
   - Terintegrasi langsung di dalam aplikasi menggunakan **MindAR v1.2.5** dan **A-Frame v1.5.0**.
   - Mendukung pemindaian 3 kartu marker sasaran (`TARGET 01: CPU`, `TARGET 02: RAM`, `TARGET 03: SSD`), kontrol skala 3D (`0.25x–2.50x`), rotasi 360°, serta **Narasi Audio (TTS Bahasa Indonesia)**.
   - Direktori mandiri untuk kebutuhan branch/deploy khusus WebAR juga tersedia di `laptop-anatomy-ar/`.
3. **Challenge Lab (6 Misi Evaluasi & Perakitan 3D)**
   - **01 Quick Quiz**: Kuis diagnostik 10 soal acak dari 20 bank soal teknis dengan panggung model 3D, timer 30 detik, dan streak multiplier.
   - **02 Match It**: Interkoneksi kabel laser antara model 3D komponen dengan fungsi komputasinya.
   - **03 Drag & Place**: Meja kerja perakitan soket CPU BGA, RAM DDR5, dan M.2 NVMe pada papan sirkuit 3D.
   - **04 Find Component**: Pemindaian spasial titik lokasi komponen langsung di atas motherboard 3D.
   - **05 Speed Challenge**: Sprint identifikasi model 3D berputar dalam batas waktu 45 detik.
   - **06 Hardware Identification**: Analisis matriks spesifikasi teknis dan pengenalan geometri silikon 3D.

---

## Sistem Desain ("Bright Futuristic Lab" — Tritone Palette)

Mengacu pada dokumentasi [`DESKRIPSI_UI.md`](DESKRIPSI_UI.md):
- **Primary Canvas**: `#F8FAFC` (`Slate-50`) & `#FFFFFF` (`Pure White`)
- **Brand Primary Green**: `#10B981` (`Emerald-500` / `Emerald-600`) — CTA primer, Edukasi VR, dan status validasi
- **Royal Purple Accent**: `#8B5CF6` (`Violet-500` / `Violet-600`) — Edukasi AR, Creator Studio, dan aksen spasial
- **Radiant Gold Accent**: `#F59E0B` (`Amber-500` / `Amber-600`) — Challenge Lab, skor XP, streak, dan pin sirkuit

---

## Cara Menjalankan Aplikasi

1. **Install Dependensi**:
   ```bash
   npm install
   ```
2. **Jalankan Server Development (HTTPS Aktif untuk Kamera WebAR)**:
   ```bash
   npm run dev
   ```
3. **Build Produksi**:
   ```bash
   npm run build
   ```
