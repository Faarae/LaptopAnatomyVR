/**
 * Entry Level Laptop Motherboard 3D Pins & Hardware Architecture Dataset
 * Specific for AeroBook Slim 14 (Entry Level Laptop Category)
 * 
 * 10 Dedicated Entry Level Hotspots:
 * Pin 01: Graphics Processing Unit (GPU) — Intel Iris Xe Graphics (Integrated 80 EUs)
 * Pin 02: Central Processing Unit (CPU) — Intel Core i5-1335U (10-Core / 12-Thread)
 * Pin 03: NVMe SSD — 512 GB M.2 NVMe PCIe 3.0 x4 SSD
 * Pin 04: System Memory (RAM) — 16 GB DDR4-3200 (Soldered Onboard)
 * Pin 05: Single Fan Cooling System — Single Low-Noise Centrifugal Fan + Slim Copper Heat Pipe
 * Pin 06: Motherboard & System Interconnect — Ultra-Compact 6-Layer HDI PCB & System Bus
 * Pin 07: Display Interface — 30-Pin eDP (Embedded DisplayPort 1.4) Ribbon Connector
 * Pin 08: Voltage Regulator Module (VRM) — Compact 4+1 Phase Digital VRM Power Stages
 * Pin 09: Battery & Power System — 42 Wh 3-Cell Lithium-Ion Battery Pack & Smart Charging Controller
 * Pin 10: Expansion & Wireless I/O — Wi-Fi 6 (802.11ax) Module & USB-C / USB 3.2 Ports
 */

export const ENTRY_MOTHERBOARD_PINS = [
  {
    id: 'entry-gpu',
    pinNumber: 1,
    threeType: 'gpu',
    imageName: 'pin-1.jpg',
    name: 'Integrated Graphics Processing Unit (iGPU)',
    shortName: 'Intel Iris Xe Graphics',
    component: 'Intel Iris Xe Graphics (80 Execution Units)',
    category: 'Integrated Graphics',
    badge: 'INTEGRATED GPU',
    description: 'Energy-efficient integrated graphics engine built directly inside the Intel Core i5 processor silicon die, utilizing shared system DDR4 memory for video and display rendering.',
    role: 'Renders operating system desktop compositing, 4K video playback (AV1/HEVC hardware decoding), everyday productivity applications, and casual games with ultra-low power consumption.',
    laptopComparison: 'Entry-level laptops integrate the graphics processing cores directly onto the CPU silicon die to reduce motherboard component count, thickness, thermal output, and cost.',
    specs: {
      'GPU Type': 'Integrated Graphics (iGPU)',
      'Architecture': 'Intel Xe-LP Architecture',
      'Execution Units': '80 Execution Units (640 Shading Units)',
      'Graphics Clock': 'Up to 1.25 GHz Dynamic Frequency',
      'Memory Allocation': 'Dynamically Shared System RAM (Up to 8 GB)',
      'Display Output': 'Direct eDP to 1080p Panel & HDMI 1.4b'
    },
    educationalInsight: 'Integrated graphics do not require a separate dedicated graphics chip or dedicated GDDR6 VRAM, significantly lowering laptop battery drain and thermal dissipation requirements.',
    vrNote: 'Notice that the integrated GPU is housed directly inside the central processor package rather than as a separate silicon chip on the motherboard.',
    position3D: { x: 0.2, y: 0.38, z: -1.0 },
    cameraAngle: { x: 0.2, y: 3.6, z: 2.2 },
    componentKey: 'gpu'
  },
  {
    id: 'entry-cpu',
    pinNumber: 2,
    threeType: 'cpu',
    imageName: 'pin-8.jpg',
    name: 'Central Processing Unit (CPU)',
    shortName: 'Intel Core i5-1335U',
    component: 'Intel Core i5-1335U Ultra-Low Voltage Processor',
    category: 'Primary Compute',
    badge: 'PROCESSOR',
    description: '13th Gen Intel Core mobile hybrid processor featuring 10 physical cores (2 Performance Cores + 8 Efficient Cores) and 12 threads with up to 4.60 GHz Max Turbo frequency.',
    role: 'Executes operating system processes, productivity suites, web browsing tasks, and multimedia playback with a baseline thermal design power of only 15 Watts.',
    laptopComparison: 'Utilizes a compact BGA1744 soldered ball-grid array package directly mounted to the PCB to allow ultra-thin chassis profiles under 16mm.',
    specs: {
      'Core Architecture': '10 Cores (2P + 8E) / 12 Threads',
      'Max Turbo Frequency': 'Up to 4.60 GHz (P-core) / 3.40 GHz (E-core)',
      'Intel Smart Cache': '12 MB L3 High-Speed Cache',
      'Processor Base Power': '15W Base / Up to 55W Max Turbo Power',
      'Manufacturing Process': 'Intel 7 (10nm Enhanced SuperFin)',
      'Instruction Set': '64-bit AVX2, Intel Deep Learning Boost'
    },
    educationalInsight: 'The U-series architecture prioritizes energy conservation by assigning background tasks to 8 ultra-efficient cores while reserving 2 high-frequency performance cores for active user workloads.',
    vrNote: 'Observe the compact rectangular processor package with its polished silver heat spreader and the single copper heat pipe clamped on top.',
    position3D: { x: 0.2, y: 0.38, z: -1.0 },
    cameraAngle: { x: 0.2, y: 3.6, z: 2.2 },
    componentKey: 'cpu'
  },
  {
    id: 'entry-ssd',
    pinNumber: 3,
    threeType: 'ssd',
    imageName: 'pin-3.jpg',
    name: 'NVMe Solid-State Drive (Storage)',
    shortName: '512 GB M.2 NVMe PCIe 3.0 SSD',
    component: '512 GB M.2 2280 PCIe Gen 3.0 x4 SSD',
    category: 'High-Speed Storage',
    badge: 'STORAGE',
    description: 'High-speed M.2 2280 solid-state drive communicating via PCIe Gen 3.0 x4 NVMe protocol with high-density 3D NAND flash memory.',
    role: 'Stores the operating system, user files, applications, and documents, delivering fast application launch times and near-instantaneous resume from sleep mode.',
    laptopComparison: 'Removable M.2 module secured with a single mounting screw, offering easy user serviceability and storage expansion without soldering.',
    specs: {
      'Form Factor': 'M.2 2280 Key-M (22mm x 80mm)',
      'Interface Protocol': 'PCIe Gen 3.0 x4 / NVMe 1.3',
      'Sequential Read': 'Up to 3,500 MB/s',
      'Sequential Write': 'Up to 2,500 MB/s',
      'NAND Flash Type': '3D TLC NAND Flash',
      'Power Consumption': 'Sub-3.5W Active / 5mW Low-Power Idle'
    },
    educationalInsight: 'PCIe NVMe SSDs provide over 6x faster data transfer rates compared to legacy SATA SSDs, eliminating system responsiveness bottlenecks in everyday multitasking.',
    vrNote: 'Examine the narrow green M.2 storage stick plugged into its gold-plated slot at the lower right section of the motherboard.',
    position3D: { x: 2.4, y: 0.35, z: 1.4 },
    cameraAngle: { x: 2.4, y: 3.4, z: 4.0 },
    componentKey: 'ssd'
  },
  {
    id: 'entry-ram',
    pinNumber: 4,
    threeType: 'ram',
    imageName: 'pin-4.jpg',
    name: 'Soldered Onboard System Memory (RAM)',
    shortName: '16 GB DDR4-3200 Soldered RAM',
    component: '16 GB (4 x 4GB) DDR4-3200 MHz BGA Memory ICs',
    category: 'System Memory',
    badge: 'SOLDERED RAM',
    description: '16 GB of high-speed DDR4 synchronous DRAM soldered directly to the motherboard PCB in a dual-channel 128-bit bus topology operating at 3200 MT/s.',
    role: 'Provides volatile workspace for running programs, browser tabs, and documents with ultra-low latency and minimal electrical footprint.',
    laptopComparison: 'By soldering RAM packages directly around the CPU without SO-DIMM sockets, entry-level ultrabooks shave 4mm of chassis thickness and reduce power consumption.',
    specs: {
      'Capacity': '16 GB (4x 4GB BGA Memory Chips)',
      'Memory Type': 'DDR4 SDRAM (Soldered Onboard)',
      'Transfer Rate': '3200 MT/s (Megatransfers/second)',
      'Bus Width': 'Dual-Channel 128-bit Architecture',
      'Operating Voltage': '1.2V Low Voltage Standard',
      'Form Factor': 'Permanent BGA Surface Mount (Non-removable)'
    },
    educationalInsight: 'Soldering memory chips directly onto the mainboard minimizes trace distances to the CPU memory controller, improving signal integrity and reducing manufacturing costs.',
    vrNote: 'Look at the 4 dark rectangular memory IC packages neatly arranged adjacent to the processor package.',
    position3D: { x: 0.2, y: 0.32, z: 0.6 },
    cameraAngle: { x: 0.2, y: 3.6, z: 3.2 },
    componentKey: 'ram'
  },
  {
    id: 'entry-cooling',
    pinNumber: 5,
    threeType: 'fan',
    imageName: 'pin-2.jpg',
    name: 'Single Fan & Copper Pipe Thermal Solution',
    shortName: 'Single Centrifugal Blower Cooling',
    component: 'Single Ultra-Quiet Blower Fan + D6 Copper Heat Pipe',
    category: 'Thermal Management',
    badge: 'COOLING SYSTEM',
    description: 'Compact thermal dissipation system consisting of a single 5V ultra-quiet centrifugal blower fan, one sintered copper heat pipe, and a rear aluminum exhaust fin stack.',
    role: 'Transfers thermal energy from the 15W Intel Core i5 processor to the rear exhaust fins, maintaining whisper-quiet operation during daily computing tasks.',
    laptopComparison: 'Low-power 15W U-series laptops require only a single cooling fan and slim heatpipe, allowing significant space savings for larger battery capacity.',
    specs: {
      'Fan Count': '1x Centrifugal Blower Fan (55-Blade Impeller)',
      'Heat Pipe': '1x Sintered Copper Heat Pipe (6mm Flattened)',
      'Fin Material': 'Ultra-Thin Aluminum Exhaust Fins (60 fins)',
      'TDP Dissipation': 'Up to 28W Sustained Cooling Capacity',
      'Acoustic Level': '<25 dBA Silent Operation at Idle',
      'Control Mode': 'Intelligent PWM Thermal Curve'
    },
    educationalInsight: 'Phase-change cooling inside the sintered copper heat pipe allows rapid heat transfer without requiring bulky heatsinks or high fan speeds.',
    vrNote: 'Follow the single polished copper heat pipe routing from the CPU cold plate directly into the top-left blower fan and rear exhaust fins.',
    position3D: { x: -2.8, y: 0.48, z: -2.2 },
    cameraAngle: { x: -2.8, y: 3.8, z: 0.6 },
    componentKey: 'cooling'
  },
  {
    id: 'entry-interconnect',
    pinNumber: 6,
    threeType: 'pcie',
    imageName: 'pin-10.jpg',
    name: 'Motherboard PCB & System Interconnect',
    shortName: 'Compact 6-Layer Mainboard Interconnect',
    component: '6-Layer High-Density Interconnect (HDI) Circuit Board',
    category: 'System Architecture',
    badge: 'BUS INTERCONNECT',
    description: 'High-density 6-layer FR-4 circuit board routing power rails, high-speed PCIe lanes, USB signals, and display data across a compact physical footprint.',
    role: 'Connects all electrical components with controlled-impedance traces and integrated ground planes to eliminate electromagnetic interference.',
    laptopComparison: 'Entry-level motherboards feature optimized component layouts that eliminate daughterboards and ribbon cables to maximize durability and cost-efficiency.',
    specs: {
      'PCB Layers': '6-Layer High-Density Interconnect (HDI)',
      'Substrate Material': 'FR-4 High-Tg Glass Epoxy',
      'Bus Standards': 'PCIe Gen 3.0, USB 3.2, eDP 1.4, I2C, SPI',
      'Trace Impedance': '90-Ohm USB / 85-Ohm PCIe Differential Pairs',
      'Form Factor': 'Custom Compact Ultrabook Mainboard'
    },
    educationalInsight: 'Carefully calculated serpentine trace geometry balances signal propagation timing so data arrives simultaneously across all memory and storage bus lanes.',
    vrNote: 'Observe the green PCB traces fanning out across the board connecting the central processor to all peripheral ports.',
    position3D: { x: -0.6, y: 0.25, z: 0.0 },
    cameraAngle: { x: -0.6, y: 4.0, z: 2.8 },
    componentKey: 'interconnect'
  },
  {
    id: 'entry-display-int',
    pinNumber: 7,
    threeType: 'socket',
    imageName: 'pin-7.jpg',
    name: 'Embedded DisplayPort (eDP) Interface',
    shortName: '30-Pin eDP Display Connector',
    component: '30-Pin eDP 1.4 Display Ribbon Connector',
    category: 'Display Interface',
    badge: 'DISPLAY ENGINE',
    description: 'Low-profile 30-pin gold-plated surface mount connector transmitting high-speed digital video signals directly from the Intel Iris Xe GPU to the 1080p IPS display panel.',
    role: 'Routes 2-lane eDP video data, display backlight PWM brightness control, and EDID panel identification telemetry over a micro-coaxial ribbon cable.',
    laptopComparison: 'Features a metal locking bail that clamps the display ribbon cable securely to prevent disconnection during laptop lid opening and closing.',
    specs: {
      'Connector Type': '30-Pin Low-Profile Surface Mount (0.5mm pitch)',
      'Protocol': 'Embedded DisplayPort (eDP) 1.4 (2 Lanes)',
      'Supported Display': 'Full HD 1920x1080 IPS @ 60Hz 100% sRGB',
      'Backlight Control': 'Integrated PWM Duty-Cycle Controller',
      'Gold Plating': '15 micro-inch Gold Plated Contacts'
    },
    educationalInsight: 'eDP replaces older LVDS display cables with packetized digital data transmission, drastically reducing cable wire count and power consumption in the laptop hinge.',
    vrNote: 'Look at the small gold-pinned connector near the top edge of the board with its silver retention locking bracket.',
    position3D: { x: 2.2, y: 0.30, z: -2.4 },
    cameraAngle: { x: 2.2, y: 3.5, z: 0.4 },
    componentKey: 'display'
  },
  {
    id: 'entry-vrm',
    pinNumber: 8,
    threeType: 'heatsink',
    imageName: 'pin-5.jpg',
    name: 'Voltage Regulator Module (VRM Power Delivery)',
    shortName: 'Compact 4+1 Phase Digital VRM',
    component: '4+1 Phase Integrated Power Delivery Subsystem',
    category: 'Power Delivery',
    badge: 'VRM POWER',
    description: 'Compact 4+1 phase power delivery subsystem converting incoming DC power down to the precision ~0.9V to 1.2V core voltage required by the Intel Core i5 processor.',
    role: 'Ensures ripple-free, highly stable current delivery during CPU clock frequency transitions from 800 MHz idle up to 4.60 GHz burst turbo states.',
    laptopComparison: 'Due to the efficient 15W TDP processor, entry-level laptops require only a compact 4-phase VRM that operates coolly without needing heavy heatsinks.',
    specs: {
      'Phase Design': '4-Phase CPU Vcore + 1-Phase System Agent (VCCSA)',
      'MOSFET Type': 'High-Efficiency Dual N-Channel Power MOSFETs',
      'Inductors': 'Molded Shielded Alloy SMD Power Inductors',
      'Capacitors': 'Solid Tantalum Polymer Low-ESR Capacitors',
      'Efficiency': 'Up to 94% Peak DC-DC Conversion Efficiency'
    },
    educationalInsight: 'Digital VRMs adjust output voltage in microvolts hundreds of times per second (SVID protocol) to match processor workload and preserve battery life.',
    vrNote: 'Notice the neat row of small black square inductors and tantalum capacitors positioned immediately to the left of the CPU package.',
    position3D: { x: -1.2, y: 0.32, z: -1.0 },
    cameraAngle: { x: -1.2, y: 3.5, z: 1.6 },
    componentKey: 'vrm'
  },
  {
    id: 'entry-battery',
    pinNumber: 9,
    threeType: 'battery',
    imageName: 'pin-9.jpg',
    name: '42 Wh Lithium-Ion Battery & Power Management',
    shortName: '42 Wh 3-Cell Battery Pack & BMS',
    component: '42 Wh 3-Cell Li-ion Polymer Battery + Smart Charger IC',
    category: 'Power & Battery',
    badge: 'BATTERY & BMS',
    description: 'High-density 42 Watt-hour 3-cell lithium-ion rechargeable polymer battery pack paired with a Texas Instruments Battery Management IC and 65W USB-C PD charging support.',
    role: 'Supplies portable DC power for up to 10 hours of daily productivity and supports 65W fast charging (0% to 50% in 45 minutes) via USB Type-C.',
    laptopComparison: 'Flat 3-cell pouch pack spanning the lower half of the chassis, connected via a flexible multi-pin power cable directly to the mainboard.',
    specs: {
      'Energy Capacity': '42 Watt-hours (Wh) / 3650 mAh @ 11.55V',
      'Cell Configuration': '3S1P (3-Cell Series Lithium-Ion Polymer)',
      'Fast Charge Rating': '65W USB-C Power Delivery (PD 3.0)',
      'Battery Life': 'Up to 10 Hours Productivity & Video Playback',
      'Safety Protection': 'Over-Voltage, Over-Current, Thermal Cutoff BMS'
    },
    educationalInsight: 'Combining a 42 Wh battery with an energy-efficient 15W U-series CPU allows thin and lightweight laptops to easily achieve full-day battery autonomy.',
    vrNote: 'Inspect the slim black 3-cell battery pack spanning the lower section of the chassis and its multi-wire connector harness.',
    position3D: { x: 0.0, y: 0.25, z: 3.0 },
    cameraAngle: { x: 0.0, y: 4.2, z: 5.8 },
    componentKey: 'battery'
  },
  {
    id: 'entry-io',
    pinNumber: 10,
    threeType: 'wifi',
    imageName: 'pin-6.jpg',
    name: 'Wireless Networking & Peripheral I/O Array',
    shortName: 'Wi-Fi 6 (802.11ax) & USB-C / USB-A I/O',
    component: 'Wi-Fi 6 AX201 Module + USB-C PD / USB 3.2 Ports',
    category: 'Wireless & I/O',
    badge: 'EXPANSION & I/O',
    description: 'Integrated connectivity subsystem featuring a Wi-Fi 6 (802.11ax) + Bluetooth 5.2 module with dual antenna lines, alongside full-function USB Type-C, USB 3.2 Type-A, and 3.5mm audio ports.',
    role: 'Enables high-speed wireless networking up to 2.4 Gbps, external display output via USB-C DisplayPort Alt Mode, and connectivity for mice and storage drives.',
    laptopComparison: 'Directly soldered surface-mount I/O ports reinforced with through-hole metal anchoring tabs to withstand thousands of cable insertions.',
    specs: {
      'Wireless Standard': 'Wi-Fi 6 (802.11ax) Dual-Band 2x2 MU-MIMO',
      'Max Wireless Speed': 'Up to 2.4 Gbps (160 MHz Channel Bandwidth)',
      'Bluetooth': 'Bluetooth 5.2 Low Energy (LE)',
      'USB-C Port': '1x Full-Function USB-C (USB 3.2 Gen 2, PD 65W, DP 1.4)',
      'USB-A Ports': '2x USB 3.2 Gen 1 (5 Gbps Data Transfer)',
      'Audio Interface': '3.5mm Headphone / Microphone Combo Jack'
    },
    educationalInsight: 'Wi-Fi 6 uses OFDMA (Orthogonal Frequency-Division Multiple Access) technology to maintain low latency and high speeds even when multiple devices share the same network router.',
    vrNote: 'Observe the small silver-shielded Wi-Fi 6 module on the motherboard and the external USB-C and USB-A port housings along the side edges.',
    position3D: { x: -3.6, y: 0.30, z: 0.8 },
    cameraAngle: { x: -3.6, y: 3.5, z: 3.2 },
    componentKey: 'io'
  }
];

export function getEntryPinById(id) {
  return ENTRY_MOTHERBOARD_PINS.find(p => p.id === id);
}

export function getEntryPinByNumber(num) {
  return ENTRY_MOTHERBOARD_PINS.find(p => p.pinNumber === Number(num));
}
