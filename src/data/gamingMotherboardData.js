/**
 * Gaming Laptop Motherboard 3D Pins & Hardware Architecture Dataset
 * Specific for AeroBook Strix G16 (Gaming Laptop Category)
 * 
 * 10 Dedicated Gaming Hotspots:
 * Pin 01: Graphics Processing Unit (GPU) — NVIDIA GeForce RTX 4060 Laptop GPU (8GB GDDR6)
 * Pin 02: Central Processing Unit (CPU) — Intel Core i7-14650HX (16-Core / 24-Thread)
 * Pin 03: NVMe SSD — 1 TB M.2 NVMe PCIe 4.0 x4 High-Speed SSD (M.2 2280)
 * Pin 04: DDR5 System Memory (RAM) — 16 GB DDR5-5600 (2 x 8 GB SO-DIMM Modular)
 * Pin 05: Dual Fan Cooling System — Dual High-CFM Blower Fans + 4-Way Copper Heat Pipes
 * Pin 06: Motherboard & System Interconnect — High-Speed PCIe 4.0 Lanes & DMI 4.0 Interconnect
 * Pin 07: Display Interface — Embedded DisplayPort (eDP) & HDMI 2.1 Dedicated Video Pipeline
 * Pin 08: Voltage Regulator Module (VRM) — Multi-Phase DrMOS Power Stages & High-Current Chokes
 * Pin 09: Battery & Power Management — 90 Wh High-Density Li-ion Pack & Smart Charging Controller
 * Pin 10: Expansion & Wireless I/O — Wi-Fi 6E (802.11ax) M.2 2230 & High-Speed External I/O Ports
 */

export const GAMING_MOTHERBOARD_PINS = [
  {
    id: 'gaming-gpu',
    pinNumber: 1,
    name: 'Discrete Graphics Processing Unit (GPU)',
    shortName: 'NVIDIA RTX 4060 Laptop GPU',
    component: 'NVIDIA GeForce RTX 4060 Laptop GPU (8GB GDDR6)',
    category: 'Graphics & AI Compute',
    badge: 'DISCRETE GPU',
    description: 'High-performance mobile discrete graphics processing unit based on NVIDIA Ada Lovelace architecture, soldered directly onto the PCB with 8 GB GDDR6 dedicated video memory.',
    role: 'Accelerates real-time 3D ray tracing, rasterization, tensor AI computations (DLSS 3.5), and video rendering pipelines independently of the CPU.',
    laptopComparison: 'Unlike modular PCIe desktop graphics cards, mobile GPUs are surface-mounted (BGA) directly onto the motherboard to maintain a sub-22mm chassis profile while sharing high-performance copper heatpipes.',
    specs: {
      'Architecture': 'NVIDIA Ada Lovelace (AD107)',
      'CUDA Cores': '3,072 Shader Execution Cores',
      'VRAM': '8 GB GDDR6 (128-bit Bus @ 16 Gbps)',
      'TGP / Boost Clock': 'Up to 140W Max TGP (2370 MHz Boost)',
      'Tensor / RT Cores': '96 Tensor Cores (4th Gen) / 24 RT Cores (3rd Gen)',
      'Display Outputs': 'Direct eDP to 165Hz QHD+ & HDMI 2.1 FRL'
    },
    educationalInsight: 'Gaming laptop GPUs utilize surrounding high-speed GDDR6 memory chips operating with tight trace tolerances to deliver over 256 GB/s memory bandwidth directly adjacent to the silicon die.',
    vrNote: 'Notice the shiny metallic GPU die surrounded by 4 dark GDDR6 VRAM packages and dedicated multi-phase inductors with copper heat sink contact plates.',
    position3D: { x: -1.8, y: 0.42, z: -1.2 },
    cameraAngle: { x: -1.8, y: 3.8, z: 2.2 },
    componentKey: 'gpu'
  },
  {
    id: 'gaming-cpu',
    pinNumber: 2,
    name: 'Central Processing Unit (CPU)',
    shortName: 'Intel Core i7-14650HX',
    component: 'Intel Core i7-14650HX Processor',
    category: 'Primary Compute',
    badge: 'PROCESSOR',
    description: '14th Generation high-performance mobile hybrid processor featuring 16 physical cores (8 Performance Cores + 8 Efficient Cores) and 24 threads with up to 5.2 GHz Max Turbo frequency.',
    role: 'Executes game logic, operating system threads, physics simulations, and dispatches rendering draw calls over PCIe 4.0/5.0 lanes to the dedicated graphics card.',
    laptopComparison: 'Utilizes a BGA1964 soldered ball-grid array package with thermal sensor arrays placed across individual core clusters to dynamically balance burst clock speeds and power consumption.',
    specs: {
      'Core Architecture': '16 Cores (8P + 8E) / 24 Threads',
      'Max Turbo Frequency': 'Up to 5.20 GHz (Intel Turbo Boost Max 3.0)',
      'Intel Smart Cache': '30 MB L3 High-Speed Shared Cache',
      'Processor Base Power': '55W Base / Up to 157W Max Turbo Power',
      'PCIe Revision': 'PCIe Gen 5.0 (CPU lanes) + PCIe Gen 4.0',
      'Instruction Set': '64-bit AVX2, Deep Learning Boost (DL Boost)'
    },
    educationalInsight: 'The HX-series processor is derived from desktop silicon dies, delivering true enthusiast desktop-tier processing capability within the thermal constraints of a laptop chassis.',
    vrNote: 'Examine the rectangular processor substrate with metallic heat spreader and the surrounding row of high-capacity alloy VRM power chokes.',
    position3D: { x: 1.8, y: 0.42, z: -1.2 },
    cameraAngle: { x: 1.8, y: 3.8, z: 2.2 },
    componentKey: 'cpu'
  },
  {
    id: 'gaming-ssd',
    pinNumber: 3,
    name: 'NVMe Solid-State Drive (Storage)',
    shortName: '1 TB M.2 PCIe 4.0 NVMe SSD',
    component: '1 TB M.2 2280 PCIe Gen 4.0 x4 SSD',
    category: 'High-Speed Storage',
    badge: 'STORAGE',
    description: 'High-speed M.2 2280 solid-state drive communicating via PCIe Gen 4.0 x4 NVMe 1.4 protocol with 3D TLC NAND flash memory and dedicated DRAM cache.',
    role: 'Provides non-volatile ultra-fast file system storage, loading 100+ GB game assets, texture streaming, and instantaneous OS boot times with zero moving mechanical parts.',
    laptopComparison: 'Removable M.2 form-factor module secured with a single CNC mounting screw, equipped with thermal interface pads connecting to internal aluminum heat spreaders.',
    specs: {
      'Form Factor': 'M.2 2280 Key-M (22mm x 80mm)',
      'Interface Protocol': 'PCIe Gen 4.0 x4 / NVMe 1.4',
      'Sequential Read': 'Up to 7,000 MB/s',
      'Sequential Write': 'Up to 5,000 MB/s',
      'NAND Flash Type': '176-Layer 3D TLC NAND',
      'Endurance (TBW)': '600 Terabytes Written'
    },
    educationalInsight: 'NVMe SSDs bypass legacy SATA controller bottlenecks by communicating directly with the CPU memory controller using 4 dedicated PCIe differential serial lanes.',
    vrNote: 'Look at the narrow green/black M.2 PCB featuring the flash controller IC, dual NAND storage packages, and the gold-plated keyed edge connector.',
    position3D: { x: 2.3, y: 0.38, z: 1.6 },
    cameraAngle: { x: 2.3, y: 3.4, z: 4.2 },
    componentKey: 'ssd'
  },
  {
    id: 'gaming-ram',
    pinNumber: 4,
    name: 'Dual-Channel DDR5 System Memory',
    shortName: '16 GB DDR5-5600 SO-DIMM',
    component: '16 GB (2 x 8 GB) DDR5-5600MHz SO-DIMM',
    category: 'System Memory',
    badge: 'DDR5 RAM',
    description: 'High-bandwidth dual-channel DDR5 synchronous dynamic random-access memory running at 5600 MT/s with on-die ECC (Error Correction Code) and dual 32-bit subchannels.',
    role: 'Supplies ultra-low latency volatile workspace for current game assets, executable code, physics calculations, and operating system caching buffers.',
    laptopComparison: 'Uses two physical 262-pin SO-DIMM slots with spring-loaded retention arms, allowing user upgrades up to 64 GB DDR5 in high-performance gaming rigs.',
    specs: {
      'Capacity': '16 GB (Dual-Channel: 2 x 8 GB)',
      'Memory Standard': 'DDR5 SO-DIMM (262 pins)',
      'Data Transfer Rate': '5600 MT/s (Megatransfers/second)',
      'Operating Voltage': '1.1V Ultra-Low Voltage (JEDEC standard)',
      'Channel Layout': '2 x 32-bit Subchannels per DIMM (128-bit total)',
      'Bandwidth': 'Up to 89.6 GB/s Peak Aggregate Bandwidth'
    },
    educationalInsight: 'DDR5 introduces dual 32-bit independent subchannels per stick plus an onboard Power Management IC (PMIC), drastically improving memory access efficiency over DDR4.',
    vrNote: 'Observe the two horizontal metal SO-DIMM socket cages with gold contact pins and dual memory sticks locked in place with spring retention clips.',
    position3D: { x: 0.0, y: 0.40, z: 0.8 },
    cameraAngle: { x: 0.0, y: 3.6, z: 3.5 },
    componentKey: 'ram'
  },
  {
    id: 'gaming-cooling',
    pinNumber: 5,
    name: 'Dual Fan & Multi-Heatpipe Thermal System',
    shortName: 'Dual Centrifugal Cooling System',
    component: 'Dual Arc-Flow Fans + 4x Copper Heatpipes & Heatsinks',
    category: 'Thermal Management',
    badge: 'COOLING SYSTEM',
    description: 'Comprehensive thermal dissipation architecture comprising dual 12V high-CFM centrifugal blower fans, 4 flattened sintered copper composite heatpipes, and quad copper exhaust fin stacks.',
    role: 'Rapidly absorbs high heatflux from CPU and GPU silicon dies through phase-change fluid evaporation within copper heatpipes, exhausting hot air out rear and side vents.',
    laptopComparison: 'Unlike passive ultrabooks, gaming laptops require active high-CFM dual blowers with liquid crystal polymer blades capable of dissipating over 190W combined TDP under full load.',
    specs: {
      'Fan Configuration': 'Dual 84-Blade Centrifugal Impellers',
      'Heatpipe Array': '4x Sintered Copper Composite Heatpipes (6mm/8mm)',
      'Fin Stack Material': 'Quad 0.1mm Ultra-Thin Copper Fins (240+ fins)',
      'Total Thermal Capacity': 'Up to 195W Sustained Combined Dissipation',
      'Bearing Type': 'Fluid Dynamic Bearing (FDB) Low-Noise',
      'Fan Speed Control': '4-Pin Smart PWM Curve with 0dB Silent Idle'
    },
    educationalInsight: 'Heatpipes utilize sintered copper wick structures filled with microscopic amounts of purified water that evaporates at hot components and condenses at the fin stacks in a continuous thermodynamic loop.',
    vrNote: 'Trace the gleaming metallic copper heatpipes looping from the central CPU and GPU contact plates over to the spinning fan blowers and rear exhaust fin arrays.',
    position3D: { x: -3.3, y: 0.55, z: -2.6 },
    cameraAngle: { x: -3.3, y: 4.2, z: 0.4 },
    componentKey: 'cooling'
  },
  {
    id: 'gaming-interconnect',
    pinNumber: 6,
    name: 'Motherboard & System Interconnect',
    shortName: 'PCIe 4.0 & DMI Bus Interconnect',
    component: 'High-Speed PCIe 4.0 / DMI 4.0 Platform Controller Hub',
    category: 'System Architecture',
    badge: 'BUS INTERCONNECT',
    description: 'Multi-layer high-density interconnect (HDI) PCB subsystem routing PCIe 4.0 differential pairs, DMI 4.0 x8 CPU link, clock generators, and power delivery bus lines.',
    role: 'Synchronizes gigabytes of data every second across compute cores, graphics memory, NVMe storage, and peripheral controllers with picosecond trace length matching.',
    laptopComparison: 'Laptop mainboards utilize 8 to 12 layer FR4/Megtron circuit boards with embedded ground shields and microvias to prevent crosstalk across tight component layouts.',
    specs: {
      'PCB Construction': '10-Layer High-Density Interconnect (HDI) FR-4',
      'CPU-to-PCH Link': 'DMI 4.0 x8 (15.75 GB/s bidirectional)',
      'PCIe Lane Total': '20 Dedicated PCIe 4.0/5.0 Differential Pairs',
      'Trace Impedance': '85-Ohm / 100-Ohm Controlled Differential Lines',
      'Signal Filtering': 'Embedded Solid SMT Decoupling Capacitor Arrays'
    },
    educationalInsight: 'Equal-length serpentine trace routing ensures high-frequency signals reach memory and GPU silicon at the exact same instant, preventing fatal data timing skew.',
    vrNote: 'Observe the intricate golden and dark circuit traces fanning out across the PCB surface connecting all major silicon packages.',
    position3D: { x: 0.0, y: 0.28, z: -0.2 },
    cameraAngle: { x: 0.0, y: 4.2, z: 2.8 },
    componentKey: 'interconnect'
  },
  {
    id: 'gaming-display-int',
    pinNumber: 7,
    name: 'Embedded Display & Video Output Engine',
    shortName: 'eDP 1.4 & HDMI 2.1 Interface',
    component: 'eDP Display Bus + MUX Switch Video Engine',
    category: 'Video & Display',
    badge: 'DISPLAY ENGINE',
    description: 'Direct high-bandwidth display interface comprising a 40-pin eDP (Embedded DisplayPort 1.4b) connector with MUX switch hardware bypass and dedicated HDMI 2.1 FRL video output PHY.',
    role: 'Transmits uncompressed high-refresh rate video frames directly from the dedicated GPU (or iGPU via MUX switch) to the laptop 165Hz QHD+ panel with G-Sync support.',
    laptopComparison: 'Modern gaming laptops include an Advanced Optimus hardware MUX switch chip that automatically routes display signals directly from the RTX GPU to bypass the iGPU for minimum latency.',
    specs: {
      'Panel Interface': '40-Pin eDP 1.4b (4-Lane HBR3, 32.4 Gbps)',
      'Supported Refresh': 'QHD+ (2560x1600) @ 165Hz / 240Hz G-Sync',
      'External Video': 'HDMI 2.1 Fixed Rate Link (Up to 4K 120Hz / 8K 60Hz)',
      'Color Support': '10-bit HDR (1.07 Billion Colors), 100% DCI-P3',
      'Multiplexer (MUX)': 'Automatic Dynamic Display Switching (Advanced Optimus)'
    },
    educationalInsight: 'The hardware MUX switch eliminates a 5-15% gaming performance penalty by allowing the discrete RTX GPU to drive the internal display directly without routing through the CPU iGPU frame buffer.',
    vrNote: 'Look at the gold-pinned eDP ribbon cable connector on the upper PCB edge next to the video converter multiplexer ICs.',
    position3D: { x: 3.4, y: 0.35, z: -2.8 },
    cameraAngle: { x: 3.4, y: 3.8, z: 0.2 },
    componentKey: 'display'
  },
  {
    id: 'gaming-vrm',
    pinNumber: 8,
    name: 'Voltage Regulator Module (VRM Power Delivery)',
    shortName: 'Multi-Phase Digital VRM Power Stages',
    component: '10+2 Phase DrMOS Digital Power Delivery System',
    category: 'Power Delivery',
    badge: 'VRM POWER',
    description: 'High-efficiency multi-phase power delivery subsystem comprising integrated DrMOS power stages, high-current molded alloy inductors, and tantalum/solid polymer filter capacitors.',
    role: 'Steps down the incoming ~20V DC power adapter input into extremely clean, ultra-stable ~0.8V to 1.3V high-current power (exceeding 120A) required by the CPU and GPU silicon dies.',
    laptopComparison: 'Gaming laptops pack dozens of high-amperage MOSFETs around the CPU/GPU with thermal pads linking them directly to the copper cooling pipes to handle intense 190W power spikes.',
    specs: {
      'Power Phases': '10-Phase CPU Vcore + 2-Phase GPU Vcore + 2-Phase VRAM',
      'Power Stage Type': 'Integrated DrMOS (Driver + High/Low Side MOSFETs)',
      'Current Rating': 'Up to 60A per Phase Stage (600A Total Capacity)',
      'Inductors': 'Low-Loss Molded Alloy Chokes with Shielded Ferrite',
      'Capacitor Bank': 'High-Density Solid Tantalum Polymer Capacitors',
      'Switching Frequency': '500 kHz to 1.0 MHz Digital PWM Controller'
    },
    educationalInsight: 'Digital VRM controllers dynamically monitor temperature and current on every individual phase, spreading electrical load in microsecond intervals to maintain maximum efficiency and safety.',
    vrNote: 'Examine the neat rows of dark square alloy power chokes and silver rectangular tantalum capacitors flanking the CPU and GPU processor sockets.',
    position3D: { x: 0.0, y: 0.38, z: -2.4 },
    cameraAngle: { x: 0.0, y: 3.6, z: 0.6 },
    componentKey: 'vrm'
  },
  {
    id: 'gaming-battery',
    pinNumber: 9,
    name: '90 Wh High-Density Battery & Power System',
    shortName: '90 Wh Lithium-Ion Battery & Power IC',
    component: '90 Wh 4-Cell Li-ion Battery + Smart Charging BMS',
    category: 'Power & Battery',
    badge: 'BATTERY & BMS',
    description: 'High-capacity 90 Watt-hour 4-cell lithium-ion rechargeable polymer battery pack accompanied by an onboard Battery Management System (BMS) and Type-C 100W Power Delivery controller.',
    role: 'Supplies portable DC power to the entire laptop, balances charging voltage across 4 lithium cells, and manages fast charging protocols (up to 50% in 30 minutes).',
    laptopComparison: 'Occupies the entire bottom front section of the chassis to maximize weight distribution and cell volume, connected via a heavy-gauge multi-wire power harness.',
    specs: {
      'Energy Capacity': '90 Watt-hours (Wh) / 5845 mAh @ 15.4V',
      'Cell Configuration': '4S1P (4-Cell Series Lithium-Ion Polymer)',
      'Fast Charge Rating': 'Up to 240W Dedicated DC-In / 100W USB-C PD 3.0',
      'Battery Health Logic': 'Smart Cycle Limiter (80% Lifespan Protection Mode)',
      'Integrated BMS': 'Over-Voltage, Over-Current, Short-Circuit, & Dual NTC Thermal Protection'
    },
    educationalInsight: '90 Wh is near the maximum legal limit (100 Wh) allowed by the FAA on commercial aircraft, maximizing portable gaming and creator productivity endurance.',
    vrNote: 'Inspect the large black 4-cell battery pack spanning the lower half of the chassis and its thick multi-wire power cable socket plugged into the motherboard.',
    position3D: { x: 0.0, y: 0.28, z: 3.2 },
    cameraAngle: { x: 0.0, y: 4.5, z: 6.2 },
    componentKey: 'battery'
  },
  {
    id: 'gaming-io',
    pinNumber: 10,
    name: 'Expansion, Wireless & Peripheral I/O Subsystem',
    shortName: 'Wi-Fi 6E (802.11ax) & High-Speed I/O',
    component: 'Intel Wi-Fi 6E AX211 M.2 2230 + USB-C/USB-A/RJ45 Ports',
    category: 'Wireless & I/O',
    badge: 'EXPANSION & I/O',
    description: 'Integrated peripheral connectivity array featuring an M.2 2230 Wi-Fi 6E/Bluetooth 5.3 module with dual IPEX antennas, alongside USB 3.2 Gen 2, Thunderbolt/USB-C, RJ-45 2.5G LAN, and 3.5mm audio jacks.',
    role: 'Provides ultra-low latency gigabit wireless and wired networking for competitive multiplayer gaming, plus high-speed connections for VR headsets and external peripherals.',
    laptopComparison: 'Features reinforced steel-shielded I/O ports soldered directly onto the perimeter of the PCB with ESD (Electrostatic Discharge) protection diodes on every pin.',
    specs: {
      'Wireless Standard': 'Wi-Fi 6E (802.11ax) Tri-Band (2.4 GHz, 5 GHz, 6 GHz)',
      'Peak Wireless Speed': 'Up to 2.4 Gbps (160 MHz Channel Width, 2x2 MU-MIMO)',
      'Bluetooth Version': 'Bluetooth 5.3 Low Energy (LE Audio)',
      'Wired Ethernet': 'Realtek RTL8125 2.5 Gigabit RJ-45 LAN',
      'USB Ports': '1x USB 3.2 Gen 2 Type-C (DP/PD), 2x USB 3.2 Gen 2 Type-A',
      'Audio DAC': 'Realtek High-Definition Audio CODEC with DTS:X Ultra'
    },
    educationalInsight: 'Wi-Fi 6E unlocks the pristine 6 GHz wireless spectrum band, completely eliminating interference from older legacy Wi-Fi and Bluetooth devices in dense environments.',
    vrNote: 'Observe the small silver-shielded M.2 Wi-Fi card with two black and gray coaxial antenna cables routed around the edges of the PCB, next to the external I/O port metal housings.',
    position3D: { x: -3.5, y: 0.35, z: 1.2 },
    cameraAngle: { x: -3.5, y: 3.6, z: 3.6 },
    componentKey: 'io'
  }
];

export function getGamingPinById(id) {
  return GAMING_MOTHERBOARD_PINS.find(p => p.id === id);
}

export function getGamingPinByNumber(num) {
  return GAMING_MOTHERBOARD_PINS.find(p => p.pinNumber === Number(num));
}
