/**
 * Laptop Anatomy AR - Component Data Module
 * Sourced directly from src/data/componentData.js
 * Optimized for Mobile WebAR HUD, Bottom Sheet, and Text-to-Speech (TTS).
 */

export const AR_COMPONENTS = [
  {
    targetIndex: 0,
    id: "cpu",
    markerName: "Marker 01: CPU",
    name: "CPU (Central Processing Unit)",
    fullName: "Intel Core i7-14650HX Mobile Processor",
    category: "Compute Engine",
    tag: "Brain of System",
    accentColor: "#00f0ff",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    modelFile: "./models/cpu.glb",
    markerImage: "./markers/marker-cpu.png",
    defaultScale: 0.45,
    specsHighlight: "16 Cores (8P + 8E) • 24 Threads • 5.0 GHz Turbo • 55W TDP",
    description: "Prosesor komputasi utama yang mendekode, mengoordinasikan, dan mengeksekusi instruksi di semua beban kerja sistem operasi serta aplikasi laptop.",
    architecture: "Arsitektur hybrid x86-64 dengan Performance Cores (P-Cores) dan Efficient Cores (E-Cores), Integrated Heat Spreader (IHS) nikel, dan die silikon mikroskopis padat.",
    workingPrinciple: "Mengambil instruksi mesin dari RAM, mendekodekannya melalui unit mikro-kode, mengeksekusi logika aritmatika via ALU, dan menyimpan memori berulang di cache SRAM L1/L2/L3 berkecepatan nanodetik.",
    laptopRole: "Secara langsung menentukan daya tanggap laptop, kompilasi kode, multitasking OS, dan efisiensi termal. Algoritma boost dinamis meningkatkan frekuensi hingga 5.0+ GHz saat terhubung pengisi daya.",
    specs: {
      "Konfigurasi Core": "16 Cores (8P + 8E) / 24 Threads",
      "Base & Turbo Clock": "2.2 GHz Base / 5.0 GHz Max Turbo",
      "Smart Cache L3": "24 MB Intel Smart Cache",
      "Thermal Power (TDP)": "55W Base (Hingga 115W Turbo)",
      "Proses Fabrikasi": "Intel 7 (10nm SuperFin)",
      "Paket Soket": "BGA1964 Soldered Mobile Substrate"
    },
    ttsNarration: "CPU atau Central Processing Unit adalah otak komputasi utama laptop yang mengoordinasikan instruksi sistem dengan arsitektur hybrid multi-core, kecepatan clock hingga 5 gigahertz, dan cache memory berkecepatan tinggi."
  },
  {
    targetIndex: 1,
    id: "ram",
    markerName: "Marker 02: RAM",
    name: "RAM (Random Access Memory)",
    fullName: "Dual-Channel DDR5 SO-DIMM System Memory",
    category: "System Memory",
    tag: "High-Speed Buffer",
    accentColor: "#10b981",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    modelFile: "./models/ram.glb",
    markerImage: "./markers/marker-ram.png",
    defaultScale: 0.32,
    specsHighlight: "DDR5-5600 MT/s • Dual-Channel • 1.1V Ultra Low Voltage • On-Die ECC",
    description: "Memori kerja volatil berkecepatan tinggi yang menyimpan aplikasi yang sedang aktif, tab browser terbuka, dan dataset kerja untuk akses sub-nanodetik oleh prosesor.",
    architecture: "Modul SO-DIMM 262-pin dengan chip DRAM silikon multi-bank, koreksi kesalahan on-die ECC, chip PMIC (Power Management IC) terintegrasi, dan kontak pin emas berlekuk pengunci.",
    workingPrinciple: "Menyimpan data biner dalam kapasitor mikroskopis yang diperbarui ribuan kali per detik. Konfigurasi saluran ganda (dual-channel) menggandakan bandwidth transfer data ke memory controller CPU.",
    laptopRole: "Memungkinkan multitasking mulus di antara puluhan program tanpa harus memindahkan memori ke disk penyimpanan sekunder. Kapasitas 16GB dual-channel menjadi standar optimal laptop modern.",
    specs: {
      "Standar Memori": "DDR5 SO-DIMM 262-Pin",
      "Kecepatan Transfer": "5600 MT/s (Megatransfers/sec)",
      "Lebar Bus & Saluran": "Dual 32-bit Subchannels (128-bit Total)",
      "Bandwidth Puncak": "Hingga 89.6 GB/s",
      "Tegangan Operasi": "1.1 Volt Ultra-Low Voltage",
      "Latensi CAS": "CL40 @ 5600 MT/s"
    },
    ttsNarration: "RAM atau Random Access Memory SO-DIMM DDR5 adalah memori kerja berkecepatan tinggi dengan kecepatan 5600 megatransfer per detik yang menampung aplikasi aktif agar multitasking berjalan lancar tanpa hambatan."
  },
  {
    targetIndex: 2,
    id: "ssd",
    markerName: "Marker 03: SSD",
    name: "SSD (Solid State Drive)",
    fullName: "1 TB M.2 2280 NVMe PCIe Gen 4.0 x4 SSD",
    category: "Persistent Storage",
    tag: "Persistent Storage",
    accentColor: "#f59e0b",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    modelFile: "./models/ssd.glb",
    markerImage: "./markers/marker-ssd.png",
    defaultScale: 0.38,
    specsHighlight: "PCIe 4.0 x4 • 7000 MB/s Read • 3D TLC NAND Flash • 600 TBW",
    description: "Media penyimpanan permanen non-volatile berkecepatan tinggi yang memuat sistem operasi, file game, dan data pengguna dengan kecepatan transfer gigabyte per detik.",
    architecture: "Form factor M.2 2280 (22 x 80 mm) yang memuat chip flash controller multi-core berlapis pendingin nikel, buffer DRAM cache LPDDR4, dan paket sel 3D TLC NAND flash memory vertikal.",
    workingPrinciple: "Berkomunikasi langsung dengan CPU melalui 4 jalur PCIe Gen 4 menggunakan protokol NVMe (Non-Volatile Memory Express), mendukung hingga 64.000 antrean data paralel tanpa latensi mekanis.",
    laptopRole: "Membuat waktu boot laptop hanya 5 detik, mempercepat loading level game secara instan, serta menjadi ruang virtual memory swap saat memori fisik RAM penuh.",
    specs: {
      "Form Factor": "M.2 2280 (22mm lebar x 80mm panjang)",
      "Antarmuka Bus": "PCIe Gen 4.0 x4 NVMe 1.4",
      "Kecepatan Baca (Seq)": "Hingga 7,000 MB/s",
      "Kecepatan Tulis (Seq)": "Hingga 5,500 MB/s",
      "Ketahanan (Endurance)": "600 TBW (Terabytes Written)",
      "Konektor": "Key-M Gold Pin Edge Connector"
    },
    ttsNarration: "SSD M.2 NVMe PCIe Generasi 4 adalah media penyimpanan non-volatile berbasis chip 3D NAND Flash dengan kecepatan baca hingga 7000 megabyte per detik untuk booting dan loading instan."
  }
];

export function getComponentByIndex(index) {
  return AR_COMPONENTS.find(c => c.targetIndex === Number(index)) || null;
}

export function getComponentById(id) {
  return AR_COMPONENTS.find(c => c.id === id) || null;
}
