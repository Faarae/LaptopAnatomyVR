/**
 * QUESTION BANK (20 Visual 3D Hardware Questions)
 * Laptop & PC Hardware Identification and Architecture
 * 
 * Each question has:
 * - id: unique integer
 * - question: string (asking about the 3D model component shown)
 * - componentType: 'cpu' | 'ram' | 'ssd' | 'gpu' | 'heatsink' | 'fan' | 'battery' | 'socket' | 'pcie'
 * - visualLabel: string
 * - options: array of { id: 'A'|'B'|'C'|'D', text: string }
 * - correctAnswer: string ('A'|'B'|'C'|'D')
 * - explanation: string
 */
export const QUESTION_BANK = [
  {
    id: 1,
    question: 'Perhatikan model 3D komponen dengan pelindung panas logam (IHS) di samping. Apakah nama komponen inti yang berfungsi sebagai otak pemroses komputasi ini?',
    componentType: 'cpu',
    visualLabel: 'Model 3D: Processor Package (IHS & Die)',
    options: [
      { id: 'A', text: 'RAM (Random Access Memory)' },
      { id: 'B', text: 'CPU (Central Processing Unit)' },
      { id: 'C', text: 'GPU (Graphics Card)' },
      { id: 'D', text: 'SSD NVMe' },
    ],
    correctAnswer: 'B',
    explanation: 'Model 3D ini adalah CPU (Central Processing Unit) dengan Integrated Heat Spreader (IHS) logam yang mengeksekusi instruksi sistem komputasi.',
  },
  {
    id: 2,
    question: 'Perhatikan modul memori stik 3D dengan deretan chip memori hitam di samping. Komponen apakah ini yang berfungsi menampung data aplikasi aktif sementara?',
    componentType: 'ram',
    visualLabel: 'Model 3D: RAM DDR5 Memory Stick',
    options: [
      { id: 'A', text: 'Hard Disk Drive (HDD)' },
      { id: 'B', text: 'RAM (Random Access Memory)' },
      { id: 'C', text: 'Kipas Blower Pendingin' },
      { id: 'D', text: 'Baterai Koin CMOS' },
    ],
    correctAnswer: 'B',
    explanation: 'Model 3D ini adalah keping RAM DDR5. RAM merupakan memori kerja ultra-cepat sementara untuk aplikasi yang sedang berjalan.',
  },
  {
    id: 3,
    question: 'Perhatikan papan modul memori ramping berformat M.2 2280 di samping. Apakah nama media penyimpanan flash non-volatile kecepatan tinggi ini?',
    componentType: 'ssd',
    visualLabel: 'Model 3D: M.2 NVMe Solid State Drive',
    options: [
      { id: 'A', text: 'M.2 NVMe SSD' },
      { id: 'B', text: 'Hard Disk Magnetik' },
      { id: 'C', text: 'Kartu Suara Analog' },
      { id: 'D', text: 'Kabel Pita Ribbon' },
    ],
    correctAnswer: 'A',
    explanation: 'Komponen 3D ini adalah M.2 NVMe SSD yang menggunakan chip flash NAND dan jalur PCIe berkecepatan lebih dari 5.000 MB/s.',
  },
  {
    id: 4,
    question: 'Perhatikan silikon cermin di samping yang dikelilingi chip memori VRAM. Komponen apakah ini yang bertugas memproses grafis 3D dan visual game?',
    componentType: 'gpu',
    visualLabel: 'Model 3D: GPU Silicon Die & VRAM',
    options: [
      { id: 'A', text: 'GPU (Graphics Processing Unit)' },
      { id: 'B', text: 'Sound Card DSP' },
      { id: 'C', text: 'Power Delivery Inverter' },
      { id: 'D', text: 'Chip BIOS Flash' },
    ],
    correctAnswer: 'A',
    explanation: 'Komponen 3D ini adalah GPU (Graphics Processing Unit) dengan ribuan core pemroses paralel khusus rasterisasi dan ray tracing 3D.',
  },
  {
    id: 5,
    question: 'Perhatikan susunan sirip aluminium dan pipa konduksi tembaga pada model 3D di samping. Apakah peran utama komponen thermal ini?',
    componentType: 'heatsink',
    visualLabel: 'Model 3D: Aluminum Fin Stack & Heatpipe',
    options: [
      { id: 'A', text: 'Menghasilkan arus tegangan tinggi' },
      { id: 'B', text: 'Menyerap dan membuang panas CPU/GPU ke luar laptop' },
      { id: 'C', text: 'Memperkuat jangkauan sinyal Wi-Fi' },
      { id: 'D', text: 'Menyimpan konfigurasi tanggal BIOS' },
    ],
    correctAnswer: 'B',
    explanation: 'Model 3D ini adalah Heatsink sirip aluminium dengan heatpipe tembaga yang menghantarkan panas berlebih dari prosesor ke ventilasi pembuangan.',
  },
  {
    id: 6,
    question: 'Perhatikan model 3D kipas sentrifugal berbilah rapat di samping. Ke bagian mana udara panas laptop dihembuskan oleh komponen ini?',
    componentType: 'fan',
    visualLabel: 'Model 3D: Centrifugal Cooling Blower Fan',
    options: [
      { id: 'A', text: 'Dibuang ke arah sirip ventilasi luar chassis' },
      { id: 'B', text: 'Ditiupkan kembali ke dalam chip prosesor' },
      { id: 'C', text: 'Dialirkan ke baterai agar baterai panas' },
      { id: 'D', text: 'Dihisap langsung ke layar monitor' },
    ],
    correctAnswer: 'A',
    explanation: 'Kipas sentrifugal blower menghisap udara sejuk dari kisi-kisi bawah laptop dan meniupkannya melewati sirip heatsink keluar laptop.',
  },
  {
    id: 7,
    question: 'Perhatikan dudukan soket 3D dengan tuas pengunci logam krom di samping. Di bagian motherboard manakah komponen prosesor (CPU) harus dipasang?',
    componentType: 'socket',
    visualLabel: 'Model 3D: CPU Socket LGA Retention Base',
    options: [
      { id: 'A', text: 'Dipasang tepat ke dalam soket CPU ini dengan tuas pengunci' },
      { id: 'B', text: 'Dicolokkan ke slot USB luar' },
      { id: 'C', text: 'Ditempelkan pada kipas pendingin' },
      { id: 'D', text: 'Diselipkan di antara keyboard' },
    ],
    correctAnswer: 'A',
    explanation: 'Ini adalah soket prosesor LGA dengan ribuan pin pegas emas dan tuas penahan mekanis untuk mengunci chip CPU ke motherboard.',
  },
  {
    id: 8,
    question: 'Perhatikan baterai kancing lithium koin perak (CR2032) di samping. Apakah fungsi baterai kecil ini di motherboard laptop/PC?',
    componentType: 'battery',
    visualLabel: 'Model 3D: CR2032 Lithium Coin Battery',
    options: [
      { id: 'A', text: 'Menyalakan speaker dan subwoofer' },
      { id: 'B', text: 'Menjaga jam Real-Time Clock (RTC) dan pengaturan BIOS saat laptop mati' },
      { id: 'C', text: 'Mengisi daya prosesor saat bermain game' },
      { id: 'D', text: 'Menggantikan charger listrik utama laptop' },
    ],
    correctAnswer: 'B',
    explanation: 'Baterai CMOS koin CR2032 mempertahankan tegangan 3V ke chip jam waktu (RTC) dan memori BIOS agar konfigurasi jam tidak reset saat dicabut.',
  },
  {
    id: 9,
    question: 'Perhatikan slot ekspansi 3D berwarna hitam dengan klip pengunci di samping. Komponen kartu ekspansi apa yang lazim dipasang di slot PCIe x16 ini?',
    componentType: 'pcie',
    visualLabel: 'Model 3D: PCIe x16 Expansion Slot',
    options: [
      { id: 'A', text: 'Kartu Grafis Diskrit (Discrete GPU)' },
      { id: 'B', text: 'Baterai Kering Laptop' },
      { id: 'C', text: 'Trackpad Touchpad' },
      { id: 'D', text: 'Webcam Depan' },
    ],
    correctAnswer: 'A',
    explanation: 'Slot PCIe x16 menyediakan 16 jalur serial kecepatan tinggi langsung ke CPU, paling sering digunakan untuk menancapkan kartu grafis diskrit (GPU).',
  },
  {
    id: 10,
    question: 'Pada modul RAM DDR5 di samping, terdapat lekukan notch pada deretan pin emasnya. Apakah tujuan utama dari notch lekukan fisik ini?',
    componentType: 'ram',
    visualLabel: 'Model 3D: RAM Module Pin Key Notch',
    options: [
      { id: 'A', text: 'Mencegah RAM dipasang terbalik atau pada generasi slot yang salah' },
      { id: 'B', text: 'Jalur kabel pengisian daya baterai' },
      { id: 'C', text: 'Lubang ventilasi pembuangan air' },
      { id: 'D', text: 'Gantungan kunci pengaman fisik' },
    ],
    correctAnswer: 'A',
    explanation: 'Lekukan notch asimetris pada pin RAM berfungsi sebagai kunci (keying) mekanis agar pengguna tidak bisa memasang RAM terbalik atau salah tipe.',
  },
  {
    id: 11,
    question: 'Perhatikan konektor emas di tepi modul SSD M.2 3D di samping. Interface transmisi data apa yang digunakan modul ini untuk mencapai transfer kilat?',
    componentType: 'ssd',
    visualLabel: 'Model 3D: SSD M-Key Gold Interface',
    options: [
      { id: 'A', text: 'PCIe NVMe (PCI Express)' },
      { id: 'B', text: 'VGA Analog' },
      { id: 'C', text: 'Audio Jack 3.5mm' },
      { id: 'D', text: 'Inframerah (IR)' },
    ],
    correctAnswer: 'A',
    explanation: 'SSD modern menggunakan jalur bus PCIe (Peripheral Component Interconnect Express) dengan protokol NVMe berlatensi ultra-rendah.',
  },
  {
    id: 12,
    question: 'Ketika laptop dimatikan total, apa yang terjadi pada data yang tersimpan di dalam modul RAM 3D ini?',
    componentType: 'ram',
    visualLabel: 'Model 3D: Volatile DRAM Module',
    options: [
      { id: 'A', text: 'Data di RAM langsung terhapus bersih karena bersifat volatile' },
      { id: 'B', text: 'Data tetap tersimpan permanen seperti di flashdisk' },
      { id: 'C', text: 'Data dipindahkan otomatis ke layar' },
      { id: 'D', text: 'RAM berubah menjadi media penyimpanan foto' },
    ],
    correctAnswer: 'A',
    explanation: 'RAM adalah memori volatile yang membutuhkan pasokan listrik konstan. Begitu daya mati, kapasitor sel DRAM langsung kehilangan muatan datanya.',
  },
  {
    id: 13,
    question: 'Perhatikan plat penyerap panas IHS pada CPU di samping. Apa bahan yang wajib dioleskan di antara permukaan CPU ini dan heatsink pendingin?',
    componentType: 'cpu',
    visualLabel: 'Model 3D: CPU Integrated Heat Spreader Surface',
    options: [
      { id: 'A', text: 'Thermal Paste / Thermal Grease' },
      { id: 'B', text: 'Minyak Goreng Mesin' },
      { id: 'C', text: 'Lem Kertas PVA' },
      { id: 'D', text: 'Air Aki Baterai' },
    ],
    correctAnswer: 'A',
    explanation: 'Thermal paste mengisi celah udara mikroskopis antara permukaan plat IHS CPU dan dasar heatsink logam untuk menghantarkan panas maksimal.',
  },
  {
    id: 14,
    question: 'Perhatikan bilah kipas melengkung 3D di samping. Bagaimana cara Embedded Controller (EC) laptop mengatur kecepatan putar RPM kipas ini?',
    componentType: 'fan',
    visualLabel: 'Model 3D: PWM 4-Pin Controlled Fan Blades',
    options: [
      { id: 'A', text: 'Melalui sinyal PWM (Pulse Width Modulation) sesuai sensor suhu' },
      { id: 'B', text: 'Diputar secara manual dengan jari tangan' },
      { id: 'C', text: 'Menggunakan magnet dari speaker laptop' },
      { id: 'D', text: 'Mengikuti volume audio musik' },
    ],
    correctAnswer: 'A',
    explanation: 'Motherboard laptop membaca sensor thermistor dan mengirim sinyal PWM duty-cycle ke motor kipas untuk mengatur putaran RPM secara otomatis.',
  },
  {
    id: 15,
    question: 'Perhatikan modul chip grafis die 3D di samping. Mengapa laptop gaming membutuhkan GPU diskrit selain kartu grafis bawaan prosesor (iGPU)?',
    componentType: 'gpu',
    visualLabel: 'Model 3D: Dedicated Mobile GPU Processor',
    options: [
      { id: 'A', text: 'Memiliki VRAM berkecepatan tinggi dan core terpisah untuk beban 3D berat' },
      { id: 'B', text: 'Hanya untuk mematikan suara kipas' },
      { id: 'C', text: 'Agar laptop bisa menyala tanpa baterai' },
      { id: 'D', text: 'Menambah kapasitas memori hard disk' },
    ],
    correctAnswer: 'A',
    explanation: 'GPU diskrit memiliki chip silicon berdaya tinggi dan memori VRAM GDDR6 berkecepatan ratusan gigabyte per detik terpisah dari memori utama sistem.',
  },
  {
    id: 16,
    question: 'Perhatikan pipa tembaga berkilau yang menembus sirip pendingin di samping. Berisi apakah bagian dalam pipa tembaga (heatpipe) laptop ini?',
    componentType: 'heatsink',
    visualLabel: 'Model 3D: Sintered Copper Heatpipe Internal',
    options: [
      { id: 'A', text: 'Cairan kerja khusus bertekanan rendah yang menguap dan mengembun' },
      { id: 'B', text: 'Kabel kawat tembaga padat murni tanpa rongga' },
      { id: 'C', text: 'Udara kompresor bertekanan 100 bar' },
      { id: 'D', text: 'Minyak rem kendaraan' },
    ],
    correctAnswer: 'A',
    explanation: 'Heatpipe memiliki sumbu berpori kapiler (sintered wick) dan cairan kerja yang menguap saat terkena panas chip dan mengembun kembali di area sirip dingin.',
  },
  {
    id: 17,
    question: 'Perhatikan model soket CPU di samping. Apa yang terjadi jika pin-pin kontak pegas emas di dalam soket ini bengkok karena pemasangan yang salah?',
    componentType: 'socket',
    visualLabel: 'Model 3D: Delicate LGA Spring Pins',
    options: [
      { id: 'A', text: 'Prosesor gagal booting (POST) atau mengalami korsleting jalur memori' },
      { id: 'B', text: 'Layar monitor otomatis berganti resolusi ke 8K' },
      { id: 'C', text: 'Kapasitas SSD otomatis bertambah' },
      { id: 'D', text: 'Kecepatan internet Wi-Fi meningkat' },
    ],
    correctAnswer: 'A',
    explanation: 'Setiap pin LGA membawa jalur sinyal listrik berfrekuensi tinggi. Jika ada pin yang bengkok atau bersentuhan, sistem akan gagal booting atau rusak.',
  },
  {
    id: 18,
    question: 'Perhatikan baterai kancing koin CR2032 di samping. Di mana letak komponen ini pada motherboard komputer/laptop?',
    componentType: 'battery',
    visualLabel: 'Model 3D: CMOS Socket Holder Base',
    options: [
      { id: 'A', text: 'Di dalam dudukan socket koin bundar pada motherboard' },
      { id: 'B', text: 'Ditanam di dalam panel layar monitor LCD' },
      { id: 'C', text: 'Diletakkan di dalam tombol spasi keyboard' },
      { id: 'D', text: 'Di dalam kepala charger colokan dinding' },
    ],
    correctAnswer: 'A',
    explanation: 'Baterai CR2032 dipasang pada socket plastik bundar dengan klip pegas logam di bagian sirkuit motherboard.',
  },
  {
    id: 19,
    question: 'Perhatikan slot ekspansi PCIe x16 di samping. Berapakah jumlah pin kontak pada slot ekspansi standar kartu grafis ini?',
    componentType: 'pcie',
    visualLabel: 'Model 3D: PCIe x16 Retention Contacts',
    options: [
      { id: 'A', text: '164 pin kontak' },
      { id: 'B', text: 'Hanya 4 pin' },
      { id: 'C', text: '12 pin' },
      { id: 'D', text: '1.000 pin' },
    ],
    correctAnswer: 'A',
    explanation: 'Slot standar PCI Express x16 memiliki total 164 pin kontak yang mentransmisikan daya 75W dan 16 jalur data serial diferensial.',
  },
  {
    id: 20,
    question: 'Perhatikan chip controller perak pada modul SSD di samping. Apa tugas utama chip controller ini?',
    componentType: 'ssd',
    visualLabel: 'Model 3D: NVMe Controller ASIC Chip',
    options: [
      { id: 'A', text: 'Mengatur baca-tulis, wear leveling, dan proteksi error flash memory' },
      { id: 'B', text: 'Mengeluarkan suara peringatan darurat' },
      { id: 'C', text: 'Memutar kipas pendingin laptop' },
      { id: 'D', text: 'Mengubah warna layar laptop' },
    ],
    correctAnswer: 'A',
    explanation: 'Controller SSD adalah prosesor tertanam yang mengoordinasikan transfer data PCIe, mengelola cache, dan mendistribusikan keausan (wear leveling) sel memori.',
  },
];

/**
 * Prepares a fresh 10-question match:
 * 1. Shuffles all 20 questions using Fisher-Yates and selects exactly 10.
 * 2. Shuffles the options (A, B, C, D) for each question.
 * 3. Dynamically recalculates the correct answer key so the answer always matches.
 * 
 * @param {number} count Number of questions to pick (default 10)
 * @returns {Array} Array of 10 fully randomized questions
 */
export function getRandomQuizMatch(count = 10) {
  // 1. Shuffle questions without duplicates
  const pool = [...QUESTION_BANK];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const selected = pool.slice(0, count);

  // 2. Shuffle options per question & preserve answer key
  return selected.map((q, idx) => {
    // Find text of original correct answer
    const originalCorrectOption = q.options.find(opt => opt.id === q.correctAnswer);
    const correctText = originalCorrectOption ? originalCorrectOption.text : '';

    // Shuffle options
    const shuffledOptions = [...q.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    const labels = ['A', 'B', 'C', 'D'];
    let newCorrectAnswer = 'A';

    const finalOptions = shuffledOptions.map((opt, optIdx) => {
      const assignedLabel = labels[optIdx];
      if (opt.text === correctText) {
        newCorrectAnswer = assignedLabel;
      }
      return {
        id: assignedLabel,
        text: opt.text,
      };
    });

    return {
      matchIndex: idx + 1,
      id: q.id,
      question: q.question,
      options: finalOptions,
      correctAnswer: newCorrectAnswer,
      explanation: q.explanation,
      componentType: q.componentType,
      visualLabel: q.visualLabel,
    };
  });
}
