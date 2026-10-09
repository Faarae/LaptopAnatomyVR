/**
 * Creator Laptop Motherboard 3D Pins & Hardware Architecture Dataset
 * Specific for AeroBook Studio Pro 16 (Creator Laptop Category)
 * 
 * 10 Dedicated Creator Hotspots:
 * Pin 01: Graphics Processing Unit (GPU) — NVIDIA GeForce RTX 4070 Laptop GPU (8GB GDDR6 Studio)
 * Pin 02: Central Processing Unit (CPU) — AMD Ryzen AI 9 HX 370 (12-Core / 24-Thread, 50 TOPS NPU)
 * Pin 03: NVMe SSD — 2 TB M.2 NVMe PCIe 4.0 x4 High-Speed SSD with Thermal Spreader
 * Pin 04: System Memory (RAM) — 32 GB LPDDR5X-7500 MHz (Soldered High-Bandwidth Unified Memory)
 * Pin 05: Dual Studio Fan Cooling System — Symmetrical Dual Blower Fans + Multi-Way Copper Heatpipes
 * Pin 06: Motherboard & System Interconnect — High-Density 12-Layer Studio PCB & PCIe 4.0 Interconnect
 * Pin 07: Display Interface — 40-Pin eDP 1.4 (4K OLED / 120Hz Calibrated) & HDMI 2.1 Video PHY
 * Pin 08: Voltage Regulator Module (VRM) — Multi-Phase Studio VRM with Low-Profile Alloy Chokes & Tantalum Array
 * Pin 09: Battery & Power System — 90 Wh High-Capacity Creator Endurance Battery Pack (100W USB-C PD)
 * Pin 10: Expansion & Wireless I/O — Wi-Fi 7 (802.11be) Module + Dual USB4 (40Gbps) & SD Express 7.0
 */

export const CREATOR_MOTHERBOARD_PINS = [
  {
    id: 'creator-gpu',
    pinNumber: 1,
    name: 'Discrete Creator Graphics Processing Unit (GPU)',
    shortName: 'NVIDIA RTX 4070 Studio GPU',
    component: 'NVIDIA GeForce RTX 4070 Laptop GPU (8GB GDDR6)',
    category: 'Graphics & Creative Compute',
    badge: 'STUDIO GPU',
    description: 'High-performance mobile discrete graphics processing unit optimized with NVIDIA Studio Drivers, 4,608 CUDA cores, 36 3rd Gen RT cores, and 144 4th Gen Tensor cores for hardware-accelerated creative workflows.',
    role: 'Accelerates 3D rendering (Blender, Maya, Unreal Engine), 8K video editing (DaVinci Resolve, Premiere Pro), AI image synthesis, and hardware-accelerated ray tracing with studio-grade reliability.',
    laptopComparison: 'Features calibrated power curves and validated ISV studio drivers designed for maximum color precision and rendering stability rather than raw burst gaming clock speeds.',
    specs: {
      'Architecture': 'NVIDIA Ada Lovelace (AD106)',
      'CUDA Cores': '4,608 Stream Processing Cores',
      'VRAM': '8 GB GDDR6 (128-bit Bus @ 16 Gbps, 256 GB/s)',
      'Tensor / RT Cores': '144 Tensor Cores (4th Gen) / 36 RT Cores (3rd Gen)',
      'Max Subsystem Power': 'Up to 115W TGP (Dynamic Studio Boost)',
      'Encoders (NVENC)': 'Dual 8th Gen AV1 Encoders (4K/8K Export Acceleration)'
    },
    educationalInsight: 'Dual hardware AV1 video encoders allow creators to export 4K and 8K timelines in half the time compared to software CPU encoding while preserving higher visual fidelity.',
    vrNote: 'Observe the rectangular GPU die with its mirror silicon finish surrounded by 4 dark GDDR6 VRAM packages and dedicated multi-phase power chokes.',
    position3D: { x: -1.7, y: 0.42, z: -1.1 },
    cameraAngle: { x: -1.7, y: 3.8, z: 2.2 },
    componentKey: 'gpu'
  },
  {
    id: 'creator-cpu',
    pinNumber: 2,
    name: 'Central Processing Unit with Integrated NPU (CPU)',
    shortName: 'AMD Ryzen AI 9 HX 370',
    component: 'AMD Ryzen AI 9 HX 370 Processor (Zen 5 + XDNA 2 NPU)',
    category: 'Primary Compute & AI',
    badge: 'AI PROCESSOR',
    description: 'Next-generation mobile processor featuring 12 cores (4 Zen 5 + 8 Zen 5c) and 24 threads, integrated Radeon 890M graphics, and an advanced AMD XDNA 2 Neural Processing Unit delivering 50 TOPS of local AI performance.',
    role: 'Executes complex video decoding, audio DSP processing, generative AI workflows (Stable Diffusion, Whisper, LLMs), and parallel code compilation with leading power efficiency.',
    laptopComparison: 'Combines full-size Zen 5 performance cores for demanding single-threaded creative tasks with compact Zen 5c efficiency cores for prolonged battery life during mobile production.',
    specs: {
      'Core Architecture': '12 Cores (4 Zen 5 + 8 Zen 5c) / 24 Threads',
      'Max Boost Clock': 'Up to 5.10 GHz Max Boost Frequency',
      'NPU Performance': 'AMD XDNA 2 NPU (50 TOPS Local AI Compute)',
      'Combined AI TOPS': 'Up to 80 Total Platform TOPS (CPU + GPU + NPU)',
      'L3 Cache': '24 MB High-Speed Unified Cache',
      'Default TDP': '28W Base / Configurable up to 54W Boost'
    },
    educationalInsight: 'The dedicated 50 TOPS NPU runs local AI algorithms (such as generative fill, noise cancellation, and auto-framing) continuously with sub-3W power draw, keeping the GPU free for 3D rendering.',
    vrNote: 'Examine the AMD processor package with metallic heat spreader and the adjacent soldered high-speed LPDDR5X memory chips.',
    position3D: { x: 1.7, y: 0.42, z: -1.1 },
    cameraAngle: { x: 1.7, y: 3.8, z: 2.2 },
    componentKey: 'cpu'
  },
  {
    id: 'creator-ssd',
    pinNumber: 3,
    name: 'NVMe Solid-State Drive with Thermal Spreader (Storage)',
    shortName: '2 TB M.2 PCIe 4.0 NVMe SSD',
    component: '2 TB M.2 2280 PCIe Gen 4.0 x4 SSD + Aluminum Heat Shield',
    category: 'High-Speed Storage',
    badge: 'STORAGE',
    description: 'High-capacity 2 Terabyte M.2 2280 PCIe Gen 4.0 x4 NVMe SSD featuring 176-layer 3D TLC NAND, 2GB dedicated LPDDR4 cache, and an integrated anodized aluminum thermal spreader plate.',
    role: 'Provides massive ultra-fast scratch disk storage for multi-stream 4K/8K ProRes and RAW video timelines, uncompressed 3D project textures, and instant project loading.',
    laptopComparison: 'High-speed creator SSDs include dedicated aluminum thermal armor plates that dissipate heat to prevent thermal throttling during continuous 100+ GB video rendering exports.',
    specs: {
      'Form Factor': 'M.2 2280 Key-M with Aluminum Thermal Shield',
      'Interface Protocol': 'PCIe Gen 4.0 x4 / NVMe 1.4',
      'Sequential Read': 'Up to 7,400 MB/s',
      'Sequential Write': 'Up to 6,800 MB/s',
      'NAND Flash': '2 TB 3D TLC NAND (1200 TBW Endurance)',
      'Thermal Shield': 'Anodized Aluminum with High-Conductivity Thermal Pad'
    },
    educationalInsight: 'Thermal throttling can degrade SSD read/write speeds by over 50% during long exports; the aluminum heat spreader keeps the controller under 65°C during sustained heavy writes.',
    vrNote: 'Look at the metallic blue-grey aluminum thermal heatsink plate covering the M.2 2280 drive in the lower-right expansion section.',
    position3D: { x: 2.3, y: 0.38, z: 1.5 },
    cameraAngle: { x: 2.3, y: 3.4, z: 4.2 },
    componentKey: 'ssd'
  },
  {
    id: 'creator-ram',
    pinNumber: 4,
    name: 'Soldered High-Bandwidth LPDDR5X Unified Memory',
    shortName: '32 GB LPDDR5X-7500 Memory',
    component: '32 GB (4 x 8GB) LPDDR5X-7500 MHz Soldered BGA Memory',
    category: 'System Memory',
    badge: 'LPDDR5X RAM',
    description: '32 GB of ultra-high-speed Low-Power DDR5X synchronous DRAM operating at 7500 MT/s in a quad 32-bit subchannel (128-bit) topology soldered directly around the processor die.',
    role: 'Supplies massive 120 GB/s unified memory bandwidth for editing high-resolution video layers, large 3D scene geometry, and running multi-gigabyte local AI models in system memory.',
    laptopComparison: 'LPDDR5X is soldered directly adjacent to the CPU to reduce trace capacitance and enable extreme 7500 MT/s frequencies with 20% lower power than standard DDR5 SO-DIMMs.',
    specs: {
      'Capacity': '32 GB Unified System Memory',
      'Memory Standard': 'LPDDR5X (Low-Power Double Data Rate 5X)',
      'Data Rate': '7500 MT/s (Megatransfers/second)',
      'Peak Bandwidth': '120.0 GB/s Peak Aggregate Memory Bandwidth',
      'Channel Layout': 'Quad 32-bit Independent Subchannels (128-bit total)',
      'Operating Voltage': '1.05V / 0.9V Ultra-Low Voltage'
    },
    educationalInsight: 'Unified high-bandwidth memory allows the CPU, GPU, and NPU to access the same 32 GB memory pool with zero copy overhead, drastically accelerating generative AI inference.',
    vrNote: 'Observe the 4 soldered dark BGA memory packages closely flanking the AMD Ryzen AI processor to maintain optimal high-frequency trace lengths.',
    position3D: { x: 0.0, y: 0.35, z: 0.7 },
    cameraAngle: { x: 0.0, y: 3.6, z: 3.4 },
    componentKey: 'ram'
  },
  {
    id: 'creator-cooling',
    pinNumber: 5,
    name: 'Dual Studio Fan & Multi-Way Copper Thermal System',
    shortName: 'Dual Symmetrical Studio Cooling',
    component: 'Dual Low-Turbulence Fans + 3-Way Sintered Heatpipes & Heatsinks',
    category: 'Thermal Management',
    badge: 'COOLING SYSTEM',
    description: 'Precision-engineered dual centrifugal thermal architecture featuring two low-turbulence blower fans, 3 sintered copper composite heatpipes, and dual rear/side copper exhaust fin stacks.',
    role: 'Efficiently dissipates up to 140W combined sustained thermal load from the AMD CPU and NVIDIA RTX 4070 GPU while maintaining quiet acoustics suitable for audio recording and studio production.',
    laptopComparison: 'Creator cooling systems utilize fluid dynamic bearings (FDB) and sound-dampened fan blade geometry to prevent high-pitched acoustic whine during video rendering.',
    specs: {
      'Fan Configuration': 'Dual 79-Blade Liquid Crystal Polymer Blowers',
      'Heatpipe Array': '3x Sintered Copper Heatpipes (8mm Main / 6mm Secondary)',
      'Exhaust Stacks': 'Dual High-Density Copper Fin Arrays (180+ fins)',
      'Thermal Capacity': 'Up to 140W Combined Sustained Dissipation',
      'Acoustics': '<35 dBA at Full Render Load (Studio Acoustic Tuning)',
      'Bearing': 'Precision Fluid Dynamic Bearing (FDB)'
    },
    educationalInsight: 'The symmetrical dual-fan layout draws fresh air through bottom vents and exhausts hot air out the rear and sides, keeping the keyboard surface and palm rests cool to the touch.',
    vrNote: 'Trace the sleek copper heatpipes routing from the CPU and GPU baseplates over to the left and right fan housings and rear exhaust fin arrays.',
    position3D: { x: -3.2, y: 0.52, z: -2.4 },
    cameraAngle: { x: -3.2, y: 4.0, z: 0.6 },
    componentKey: 'cooling'
  },
  {
    id: 'creator-interconnect',
    pinNumber: 6,
    name: 'High-Density 12-Layer Studio Mainboard Interconnect',
    shortName: '12-Layer Studio HDI Interconnect',
    component: '12-Layer Low-Loss Megtron PCB Subsystem & High-Speed PCIe Bus',
    category: 'System Architecture',
    badge: 'BUS INTERCONNECT',
    description: 'Professional 12-layer ultra-low-loss circuit board routing high-speed PCIe Gen 4.0/5.0 differential lanes, USB4 40Gbps lines, and analog audio shielding planes with microvias.',
    role: 'Maintains pristine signal integrity and suppresses electromagnetic interference (EMI) across gigahertz-frequency buses connecting compute silicon, memory, and high-speed I/O.',
    laptopComparison: 'Uses premium high-Tg Megtron-6 PCB laminates with embedded copper ground planes to prevent signal loss across high-speed USB4 and PCIe Gen 4 storage buses.',
    specs: {
      'PCB Construction': '12-Layer High-Density Interconnect (HDI) Megtron-6',
      'Signal Quality': 'Ultra-Low Dielectric Loss (Df < 0.002 @ 10 GHz)',
      'Bus Standards': 'PCIe Gen 4.0, USB4 (40 Gbps), eDP 1.4, I2S Audio',
      'Trace Geometry': 'Serpentine Length-Matched Differential Trace Routing',
      'EMI Shielding': 'Embedded Solid Ground Reference Planes'
    },
    educationalInsight: 'Megtron-6 PCB laminates reduce high-frequency signal attenuation by over 40% compared to standard FR-4, essential for stable 40 Gbps USB4 and PCIe Gen 4 data transfers.',
    vrNote: 'Observe the dense, dark charcoal circuit board with fine blue and teal trace lines fanning out across all major components.',
    position3D: { x: 0.0, y: 0.28, z: -0.1 },
    cameraAngle: { x: 0.0, y: 4.0, z: 2.8 },
    componentKey: 'interconnect'
  },
  {
    id: 'creator-display-int',
    pinNumber: 7,
    name: 'Calibrated Display Engine & 4K OLED Interface',
    shortName: '40-Pin eDP (4K 120Hz Calibrated) & HDMI 2.1',
    component: '40-Pin eDP 1.4 Interface + Hardware Color Engine PHY',
    category: 'Display & Video',
    badge: 'DISPLAY ENGINE',
    description: 'High-bandwidth 40-pin eDP (Embedded DisplayPort 1.4b) interface paired with an onboard hardware factory color calibration EEPROM and dedicated HDMI 2.1 video output PHY.',
    role: 'Drives the factory-calibrated 4K 120Hz OLED display panel with 10-bit HDR (1.07 billion colors), 100% DCI-P3 color gamut, and Delta E < 1 professional color accuracy.',
    laptopComparison: 'Creator laptop display buses include dedicated hardware color profile ROMs that maintain exact Pantone and Calman color certifications across all OS updates.',
    specs: {
      'Panel Interface': '40-Pin eDP 1.4b (4-Lane HBR3, 32.4 Gbps)',
      'Supported Panel': '4K UHD+ (3840x2400) 120Hz OLED HDR500 True Black',
      'Color Depth': '10-Bit Native (1.07 Billion Colors), 100% DCI-P3, 100% Adobe RGB',
      'Color Accuracy': 'Hardware Factory Calibrated Delta E < 1.0',
      'External Output': 'HDMI 2.1 FRL (Up to 8K 60Hz / 4K 120Hz 10-bit HDR)'
    },
    educationalInsight: 'True 10-bit color transmission over 4-lane eDP eliminates color banding in smooth gradients and subtle shadow transitions during professional color grading.',
    vrNote: 'Look at the gold-plated 40-pin eDP display connector near the top edge and the adjacent video PHY controller ICs.',
    position3D: { x: 3.3, y: 0.35, z: -2.6 },
    cameraAngle: { x: 3.3, y: 3.6, z: 0.4 },
    componentKey: 'display'
  },
  {
    id: 'creator-vrm',
    pinNumber: 8,
    name: 'Multi-Phase Low-Profile Studio VRM Power Delivery',
    shortName: 'Multi-Phase Digital Studio VRM',
    component: '8+2 Phase Low-Profile DrMOS Power Delivery System',
    category: 'Power Delivery',
    badge: 'VRM POWER',
    description: 'High-efficiency multi-phase power delivery subsystem comprising integrated DrMOS power stages, low-profile molded alloy inductors, and high-density tantalum polymer capacitors.',
    role: 'Converts incoming 20V DC adapter power into clean, ultra-low-noise ~0.8V to 1.25V power for the AMD Ryzen CPU and NVIDIA RTX 4070 GPU with minimal electrical ripple.',
    laptopComparison: 'Uses low-profile high-frequency power components that fit underneath slim chassis vapor spreaders while maintaining high conversion efficiency exceeding 93%.',
    specs: {
      'Power Stages': '8-Phase CPU Core + 2-Phase GPU Core + 2-Phase VRAM/SOC',
      'Stage Component': 'Integrated High-Efficiency 50A DrMOS Stages',
      'Inductors': 'Low-Loss Molded Alloy Flat Power Inductors',
      'Filter Capacitors': 'Ultra-Low ESR Solid Tantalum Polymer Capacitor Matrix',
      'PWM Controller': 'Digital Multi-Phase PWM with Microsecond SVID Telemetry'
    },
    educationalInsight: 'Low electrical ripple on the GPU and CPU power rails ensures maximum clock stability during multi-hour 3D rendering jobs without crashing or thermal throttling.',
    vrNote: 'Notice the neat rows of flat black power inductors and silver tantalum capacitors arranged between and above the CPU and GPU silicon dies.',
    position3D: { x: 0.0, y: 0.36, z: -2.2 },
    cameraAngle: { x: 0.0, y: 3.6, z: 0.6 },
    componentKey: 'vrm'
  },
  {
    id: 'creator-battery',
    pinNumber: 9,
    name: '90 Wh High-Capacity Creator Endurance Battery Pack',
    shortName: '90 Wh 4-Cell Li-ion Battery & 100W PD',
    component: '90 Wh 4-Cell Li-ion Polymer Battery + Dual Type-C BMS',
    category: 'Power & Battery',
    badge: 'BATTERY & BMS',
    description: 'High-capacity 90 Watt-hour 4-cell lithium-ion rechargeable polymer battery pack with dual-chip Battery Management System (BMS) supporting 100W USB-C Power Delivery fast charging.',
    role: 'Provides extended on-location creative endurance for photo editing, video timeline review, and 3D modeling away from power outlets, charging to 60% in 45 minutes.',
    laptopComparison: 'Spans the full lower chassis width with 4 balanced lithium pouch cells, featuring intelligent battery longevity algorithms that prevent cell degradation at 100% plug-in state.',
    specs: {
      'Energy Capacity': '90 Watt-hours (Wh) / 5845 mAh @ 15.4V',
      'Cell Configuration': '4S1P (4-Cell Series Lithium-Ion Polymer)',
      'Fast Charging': 'Up to 140W Dedicated DC-In / 100W USB-C Power Delivery 3.0',
      'Creator Battery Life': 'Up to 12 Hours Office & Video / Up to 4.5 Hours Creative Render',
      'Protection Logic': 'Over-Voltage, Over-Current, Short-Circuit, & Dual NTC Thermal Cutoff'
    },
    educationalInsight: '90 Wh provides maximum legal airline carry-on capacity (under the 100 Wh FAA limit), allowing creative professionals to edit 4K video while traveling globally.',
    vrNote: 'Inspect the large black 4-cell battery pack spanning the lower half of the chassis and its heavy-gauge multi-wire connector harness.',
    position3D: { x: 0.0, y: 0.28, z: 3.2 },
    cameraAngle: { x: 0.0, y: 4.5, z: 6.2 },
    componentKey: 'battery'
  },
  {
    id: 'creator-io',
    pinNumber: 10,
    name: 'Wi-Fi 7 Wireless, Dual USB4 & Creator I/O Hub',
    shortName: 'Wi-Fi 7 (802.11be), Dual USB4 & SD Express',
    component: 'Intel Wi-Fi 7 BE200 Module + Dual USB4 (40Gbps) & Full SD Card',
    category: 'Wireless & I/O',
    badge: 'EXPANSION & I/O',
    description: 'Next-generation connectivity array featuring an Intel Wi-Fi 7 (802.11be) module with 320 MHz channels, dual USB4 (40 Gbps) Type-C ports with Thunderbolt 4 compatibility, HDMI 2.1, and a full-size SD Express 7.0 card reader.',
    role: 'Enables blazing-fast 5.8 Gbps wireless cloud backups, 40 Gbps external RAID storage transfers, dual 4K/6K external monitor drives, and direct high-speed camera SD card ingest (up to 985 MB/s).',
    laptopComparison: 'Creator laptops feature dedicated high-bandwidth USB4 retimer chips and full-size UHS-II / SD Express card slots for seamless photographer and videographer media ingest.',
    specs: {
      'Wireless Standard': 'Wi-Fi 7 (802.11be) Tri-Band (2.4 / 5 / 6 GHz) with 320 MHz Channels',
      'Max Wireless Rate': 'Up to 5.8 Gbps (4096-QAM, Multi-Link Operation MLO)',
      'USB4 Ports': '2x USB4 / Thunderbolt 4 (40 Gbps, DP 1.4, 100W Power Delivery)',
      'Card Reader': 'Full-Size SD Express 7.0 Card Slot (Up to 985 MB/s Ingest)',
      'Video Output': 'HDMI 2.1 Fixed Rate Link (4K 120Hz / 8K 60Hz)',
      'Audio DAC': 'ESS Sabre High-Resolution 32-bit/384kHz Audio DAC'
    },
    educationalInsight: 'Wi-Fi 7 Multi-Link Operation (MLO) connects to both 5 GHz and 6 GHz bands simultaneously, providing rock-solid ultra-low latency for cloud asset streaming and remote editing.',
    vrNote: 'Observe the small shielded Wi-Fi 7 module with dual antenna lines, the full-size SD card slot housing, and the stainless steel USB4 ports on the side edges.',
    position3D: { x: -3.6, y: 0.35, z: 1.0 },
    cameraAngle: { x: -3.6, y: 3.6, z: 3.5 },
    componentKey: 'io'
  }
];

export function getCreatorPinById(id) {
  return CREATOR_MOTHERBOARD_PINS.find(p => p.id === id);
}

export function getCreatorPinByNumber(num) {
  return CREATOR_MOTHERBOARD_PINS.find(p => p.pinNumber === Number(num));
}
