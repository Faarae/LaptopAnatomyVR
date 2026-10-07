/**
 * Motherboard 3D Pins & Hardware Anatomy Dataset
 * Aligned with the 3D Motherboard reference model ("Motherboard and its parts")
 * 
 * Pins 1-10 match the exact numbered circular pins shown on the board:
 * 1: 1X PCIe slot
 * 2: 2X 3-pin case fan connectors
 * 3: ATA controller
 * 4: 4X Memory slots (RAM)
 * 5: Heat sink & Back panel connections
 * 6: Wireless chipset & 3X PCI slots
 * 7: Memory slots (DDR channels)
 * 8: CPU socket (LGA socket with lever)
 * 9: Southbridge & CMOS battery
 * 10: PCI expansion slot
 */

export const MOTHERBOARD_PINS = [
  {
    id: 'pcie-slot',
    pinNumber: 1,
    name: '1X PCIe Slot (Peripheral Component Interconnect Express)',
    shortName: 'PCIe x16 Slot',
    category: 'Expansion Bus',
    badge: 'EXPANSION',
    description: 'High-speed serial computer expansion bus standard designed for discrete graphics processing units (dGPU), NVMe high-speed carrier cards, and capture cards.',
    role: 'Provides point-to-point dedicated bandwidth directly to the CPU without sharing data lines with other peripherals.',
    laptopComparison: 'In modern gaming and creator laptops, the PCIe interface connects the soldered mobile GPU (e.g. RTX 4080 Mobile) or secondary M.2 NVMe SSD to the CPU bus lanes.',
    specs: {
      'Bandwidth': 'Up to 32 GB/s (PCIe 4.0 x16) / 64 GB/s (PCIe 5.0)',
      'Pin Count': '164 pins (x16 configuration)',
      'Signal Type': 'Differential Low-Voltage Serial',
      'Power Delivery': 'Up to 75 Watts via slot'
    },
    vrNote: 'Observe the gold-plated finger spring contacts inside the slot that minimize signal degradation at multi-gigahertz frequencies.',
    position3D: { x: -1.2, y: 0.35, z: 0.8 },
    cameraAngle: { x: -1.2, y: 4.5, z: 4.0 }
  },
  {
    id: 'fan-connectors',
    pinNumber: 2,
    name: '2X 3-Pin Case Fan Connectors',
    shortName: 'Fan Headers',
    category: 'Thermal & Power',
    badge: 'THERMAL',
    description: 'Header pins supplying 12V DC power and tachometer feedback RPM monitoring for chassis cooling fans and active exhaust blowers.',
    role: 'Enables the motherboard BIOS / EC (Embedded Controller) to adjust fan rotation speed in response to thermal thermistor sensor readings.',
    laptopComparison: 'Laptops utilize miniaturized 4-pin ultra-thin PWM blower fans connected via micro-JST ribbon connectors to keep chassis profiles under 20mm.',
    specs: {
      'Voltage': '12V DC standard',
      'Pins': 'Pin 1: Ground, Pin 2: +12V Power, Pin 3: Tachometer RPM Sensor',
      'Current Rating': '1.0 Amp max (12W per header)',
      'Control Method': 'Voltage stepping (DC) or PWM duty-cycle'
    },
    vrNote: 'Notice the polarization tab key that prevents reverse installation and short circuits.',
    position3D: { x: -0.6, y: 0.25, z: 1.4 },
    cameraAngle: { x: -0.6, y: 3.5, z: 3.8 }
  },
  {
    id: 'ata-controller',
    pinNumber: 3,
    name: 'ATA / Storage Bus Controller',
    shortName: 'Storage Controller',
    category: 'Storage & I/O',
    badge: 'STORAGE',
    description: 'Dedicated integrated circuit (IC) managing data serialization, command queuing, and parity verification between disk drives and system memory.',
    role: 'Decodes storage read/write requests, coordinates DMA (Direct Memory Access) transfers, and controls hard drives and optical media.',
    laptopComparison: 'Modern laptops have replaced legacy ATA ribbon cables with integrated PCIe NVMe controllers built directly into M.2 SSD modules.',
    specs: {
      'Interface Protocol': 'Parallel ATA / Ultra DMA 133 / Serial ATA',
      'Data Throughput': '133 MB/s (PATA) up to 600 MB/s (SATA III)',
      'Package Type': 'QFP (Quad Flat Package) surface mount',
      'DMA Support': 'Ultra DMA Mode 6'
    },
    vrNote: 'The copper circuit traces fanning out from the controller maintain equal length to prevent data skew.',
    position3D: { x: -3.8, y: 0.25, z: 2.2 },
    cameraAngle: { x: -3.8, y: 4.0, z: 4.5 }
  },
  {
    id: 'ram-slots-secondary',
    pinNumber: 4,
    name: '4X Dual-Channel Memory Slots (DDR RAM)',
    shortName: 'RAM DIMM Slots',
    category: 'High-Speed Memory',
    badge: 'MEMORY',
    description: 'High-bandwidth DIMM (Dual In-Line Memory Module) slots providing volatile ultra-low latency workspace for applications currently being executed.',
    role: 'Allows the memory controller inside the CPU to access 64-bit wide parallel data buses simultaneously across interleaved channels.',
    laptopComparison: 'Laptops employ compact SO-DIMM (Small Outline DIMM) or soldered LPDDR5X chips placed directly adjacent to the CPU to reduce physical latency.',
    specs: {
      'Channel Architecture': 'Dual Channel (128-bit total bus width)',
      'Slot Type': '240-pin DDR DIMM with keyed notch',
      'Voltage Standard': '1.5V / 1.2V / 1.1V (DDR3 to DDR5)',
      'Max Bandwidth': 'Up to 89.6 GB/s in dual-channel configuration'
    },
    vrNote: 'Look at the color-coded alternating pairs: populating matching color slots activates dual-channel memory interleaving.',
    position3D: { x: 2.2, y: 0.45, z: 1.0 },
    cameraAngle: { x: 2.2, y: 4.8, z: 3.6 }
  },
  {
    id: 'heatsink-vrm',
    pinNumber: 5,
    name: 'VRM Heat Sink & Back Panel Connections',
    shortName: 'VRM Heatsink & I/O',
    category: 'Thermal & Connectivity',
    badge: 'THERMAL & I/O',
    description: 'Extruded aluminum thermal dissipation fins covering high-temperature MOSFET power stages, alongside external rear I/O connectors.',
    role: 'Draws intense heat away from the Voltage Regulator Module (VRM) chokes and capacitors that convert 12V incoming power down to clean ~1.2V CPU core voltage.',
    laptopComparison: 'Laptops use vapor chambers and flattened sintered copper heatpipes leading to dual exhaust fin stacks cooled by centrifugal fans.',
    specs: {
      'Material': 'Anodized 6063 Aluminum with high fin density',
      'Dissipation Area': '~180 cm² effective surface area',
      'I/O Ports': 'Gigabit RJ45 Ethernet, USB 3.2, Audio DAC, HDMI',
      'Operating Temp': 'Tolerates up to 105°C MOSFET surface temperature'
    },
    vrNote: 'Inspect the vertical cooling fins engineered to maximize natural convection and chassis airflow channel efficiency.',
    position3D: { x: 3.0, y: 0.9, z: -4.0 },
    cameraAngle: { x: 3.0, y: 4.5, z: -1.0 }
  },
  {
    id: 'wireless-pci',
    pinNumber: 6,
    name: 'Wireless Chipset Subsystem & 3X PCI Slots',
    shortName: 'Wireless & PCI Bus',
    category: 'Networking & Legacy Bus',
    badge: 'NETWORKING',
    description: 'Integrated RF wireless baseband controller paired with 32-bit legacy PCI parallel expansion slots for auxiliary hardware.',
    role: 'Handles baseband packet modulation for Wi-Fi and Bluetooth, while PCI slots offer expansion for legacy sound cards and network cards.',
    laptopComparison: 'In modern laptops, this entire system is condensed into a tiny M.2 2230 module (e.g., Intel Killer Wi-Fi 6E/7) under 3 grams in weight.',
    specs: {
      'Bus Width': '32-bit parallel (PCI legacy) / PCIe x1 (Modern M.2)',
      'Clock Frequency': '33 MHz (PCI) / 2.4 & 5.0 GHz (Wi-Fi)',
      'Max Data Rate': '133 MB/s (PCI bus) / Up to 2400 Mbps (Wi-Fi 6)',
      'Security Protocols': 'WPA3 Personal / Enterprise hardware decryption'
    },
    vrNote: 'Notice the golden trace shielding around the wireless module to suppress electromagnetic interference (EMI).',
    position3D: { x: -3.2, y: 0.35, z: -2.0 },
    cameraAngle: { x: -3.2, y: 4.2, z: 0.8 }
  },
  {
    id: 'memory-primary-bank',
    pinNumber: 7,
    name: 'Primary Memory Slots (DDR Channel A/B)',
    shortName: 'DDR Channel Bank',
    category: 'High-Speed Memory',
    badge: 'MEMORY',
    description: 'The primary memory channel interface featuring dual retaining clips and precision surface-mount solder balls connecting directly to the memory controller.',
    role: 'Acts as the primary boot memory bank where the first RAM stick must be seated for motherboard power-on self test (POST) to complete.',
    laptopComparison: 'Thin laptops frequently solder high-frequency LPDDR5x RAM chips directly around the CPU die to eliminate connector impedance and save space.',
    specs: {
      'Bus Clock': '200 MHz to 3200+ MHz base frequency',
      'Latency (CAS)': 'CL 14 to CL 40 depending on DDR generation',
      'Gold Plating': '30 micro-inch gold plating on pin fingers',
      'Dual-Channel Boost': '+70% to +90% real-world bandwidth over single channel'
    },
    vrNote: 'Examine the retaining levers on both ends that lock the memory module into place with tactile audible feedback.',
    position3D: { x: 3.4, y: 0.45, z: 1.8 },
    cameraAngle: { x: 3.4, y: 4.8, z: 4.0 }
  },
  {
    id: 'cpu-socket',
    pinNumber: 8,
    name: 'Central CPU Socket (LGA Socket with Tension Lever)',
    shortName: 'CPU Socket LGA',
    category: 'Compute Core',
    badge: 'PROCESSOR',
    description: 'The primary electrical and physical interface housing the Central Processing Unit. Features a precision pin matrix and metal load plate with locking arm.',
    role: 'Transfers billions of electrical signals per second between the CPU cores, PCIe lanes, RAM bus, and motherboard power delivery subsystem.',
    laptopComparison: 'Laptops use BGA (Ball Grid Array) sockets where the CPU silicon is permanently soldered to the motherboard with microscopic solder spheres.',
    specs: {
      'Socket Type': 'LGA (Land Grid Array) with spring-loaded pins',
      'Pin Count': '775 to 1700 microscopic gold-plated contact pins',
      'Clamping Pressure': 'Over 30 kg of mechanical retention clamping force',
      'Supported TDP': 'Up to 253 Watts peak burst power'
    },
    vrNote: 'Look at the chrome retention lever on the side: pressing down secures hundreds of delicate pins against the underside of the processor heat spreader.',
    position3D: { x: 2.2, y: 0.5, z: -1.6 },
    cameraAngle: { x: 2.2, y: 4.0, z: 1.0 }
  },
  {
    id: 'southbridge-cmos',
    pinNumber: 9,
    name: 'Southbridge Chipset (PCH) & CMOS Coin Cell Battery',
    shortName: 'Southbridge / PCH & CMOS',
    category: 'System Logic & RTC',
    badge: 'CHIPSET & BIOS',
    description: 'Platform Controller Hub (PCH) managing lower-speed peripherals, paired with a 3V lithium CR2032 coin cell that keeps the Real-Time Clock (RTC) and BIOS settings alive.',
    role: 'Orchestrates USB ports, SATA drives, audio codecs, keyboard/trackpad controllers, and stores hardware boot parameters even when unplugged.',
    laptopComparison: 'Laptops integrate modern PCH directly on the CPU substrate package and use tiny shrink-wrapped coin cells connected via a 2-wire header.',
    specs: {
      'Battery Voltage': '3.0 Volts DC (Lithium Manganese Dioxide)',
      'Battery Lifespan': '3 to 5 years continuous RTC power',
      'Bus Link to CPU': 'DMI (Direct Media Interface) high-speed link',
      'Chipset TDP': 'Typically 6W to 15W passive cooling'
    },
    vrNote: 'Notice the heatsink over the chipset and the shiny silver circular coin battery holder with its spring retention clip.',
    position3D: { x: -3.0, y: 0.35, z: 2.8 },
    cameraAngle: { x: -3.0, y: 4.0, z: 5.0 }
  },
  {
    id: 'pci-expansion',
    pinNumber: 10,
    name: 'Secondary PCI Expansion Slot',
    shortName: 'PCI Slot 2',
    category: 'Expansion Bus',
    badge: 'EXPANSION',
    description: 'Standard 124-pin peripheral interconnect slot offering shared parallel bus capability for expansion audio processors, TV tuners, and diagnostic cards.',
    role: 'Provides modular upgradability across legacy peripheral devices operating at 33 MHz clock frequency.',
    laptopComparison: 'Laptops have completely replaced traditional PCI slots with internal M.2 slots (Key E for Wi-Fi, Key M for NVMe SSD) and external Thunderbolt/USB4 ports.',
    specs: {
      'Slot Voltage': '5.0V / 3.3V dual keyed tolerance',
      'Bus Frequency': '33 MHz clock standard',
      'Throughput': '133 MB/second maximum shared',
      'Form Factor': 'Standard full-height / half-length compatible'
    },
    vrNote: 'Notice the keying ridge in the slot preventing users from inserting cards that require incompatible signaling voltages.',
    position3D: { x: -2.4, y: 0.35, z: -0.8 },
    cameraAngle: { x: -2.4, y: 4.0, z: 1.5 }
  }
];

export function getPinById(id) {
  return MOTHERBOARD_PINS.find(p => p.id === id);
}

export function getPinByNumber(num) {
  return MOTHERBOARD_PINS.find(p => p.pinNumber === Number(num));
}
