/**
 * Component Library Data
 * Core internal laptop components catalog for educational reference.
 */

export const COMPONENTS = [
  {
    id: "cpu",
    name: "CPU",
    fullName: "Central Processing Unit",
    category: "Compute",
    tag: "Brain of System",
    description: "The main processor responsible for executing instructions and processing data across all software and operating system tasks.",
    iconName: "Cpu",
    specsHighlight: "Clock speed, Cores & Threads, Cache memory, TDP rating"
  },
  {
    id: "gpu",
    name: "GPU",
    fullName: "Graphics Processing Unit",
    category: "Compute / Display",
    tag: "Visual Engine",
    description: "Specialized chip engineered for parallel mathematical computations, 3D polygon rasterization, ray tracing, and video decoding.",
    iconName: "Sparkles",
    specsHighlight: "CUDA / Stream Cores, VRAM capacity, Memory bus width"
  },
  {
    id: "ram",
    name: "RAM",
    fullName: "Random Access Memory",
    category: "Memory",
    tag: "High-Speed Buffer",
    description: "Volatile high-speed working memory that stores currently executing applications and working datasets for rapid processor access.",
    iconName: "HardDriveDownload",
    specsHighlight: "Data transfer rate (MHz/MT/s), Channel mode, Timing latency"
  },
  {
    id: "ssd",
    name: "SSD",
    fullName: "Solid State Drive (M.2 NVMe)",
    category: "Storage",
    tag: "Persistent Storage",
    description: "Non-volatile flash memory storage holding the operating system, games, and user files with ultra-fast read/write throughput.",
    iconName: "HardDrive",
    specsHighlight: "PCIe Generation interface, Sequential read/write speeds, TBW"
  },
  {
    id: "motherboard",
    name: "Motherboard",
    fullName: "Main Logic Circuit Board",
    category: "Architecture",
    tag: "Central Backbone",
    description: "The primary printed circuit board (PCB) that interconnects the CPU, memory, power rails, display interface, and external ports.",
    iconName: "CircuitBoard",
    specsHighlight: "Chipset interconnect, Power delivery VRM phases, Form factor"
  },
  {
    id: "battery",
    name: "Battery",
    fullName: "Lithium-Ion / Polymer Battery",
    category: "Power",
    tag: "Energy Cell",
    description: "Rechargeable internal chemical energy source powering the laptop untethered, managed by smart Battery Management System (BMS) chips.",
    iconName: "BatteryCharging",
    specsHighlight: "Watt-hour (Wh) capacity, Cell count, Charging wattage rating"
  },
  {
    id: "cooling-fan",
    name: "Cooling Fan",
    fullName: "Active Thermal Blower & Heatpipe",
    category: "Thermal",
    tag: "Heat Dissipation",
    description: "Centrifugal blower fan and sintered copper heatpipes that channel thermal energy away from the CPU/GPU silicon dies.",
    iconName: "Fan",
    specsHighlight: "CFM airflow rating, Blade density, Liquid bearing durability"
  },
  {
    id: "wifi-card",
    name: "Wi-Fi Card",
    fullName: "M.2 Wireless Network Controller",
    category: "Connectivity",
    tag: "Wireless Interface",
    description: "Modular or soldered radio controller providing high-speed dual/tri-band Wi-Fi connectivity and Bluetooth peripheral pairing.",
    iconName: "Wifi",
    specsHighlight: "Wi-Fi 6E/7 standard, Multi-band antennas, Bluetooth version"
  }
];
