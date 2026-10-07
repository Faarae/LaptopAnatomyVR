/**
 * Laptop Data Source
 * Decoupled data model representing available laptop architectures for VR exploration.
 */

export const LAPTOPS = [
  {
    id: "laptop-a",
    code: "LAPTOP-01",
    name: "Laptop A — Entry Level",
    alias: "AeroBook Slim 14",
    category: "Entry Level",
    categoryBadge: "Productivity & Study",
    accentColor: "#38BDF8",
    description: "Designed for daily productivity, coursework, and high battery efficiency with integrated graphics architecture and passive/quiet thermal profile.",
    specs: {
      cpu: "Quad-Core Ultra-Low Voltage Processor",
      gpu: "Integrated Iris Architecture Graphics",
      ram: "8 GB LPDDR4X (Soldered Onboard)",
      storage: "256 GB NVMe PCIe Gen 3 SSD",
      cooling: "Single Low-Noise Fan + Slim Copper Pipe",
      battery: "45 Wh Lithium-Polymer (Up to 10 hrs)"
    },
    anatomyFocus: [
      "Compact motherboard layout",
      "Single-fan thermal chamber",
      "Integrated GPU memory sharing",
      "Power-efficient battery cells"
    ]
  },
  {
    id: "laptop-b",
    code: "LAPTOP-02",
    name: "Laptop B — Gaming",
    alias: "TitanForge RTX 16",
    category: "Gaming",
    categoryBadge: "High Performance",
    accentColor: "#F43F5E",
    description: "Built for intensive real-time rendering and triple-A gaming with high-wattage discrete GPU, multi-heatpipe dual exhaust vapor cooling, and modular dual RAM slots.",
    specs: {
      cpu: "Octa-Core High-Performance Max Clock CPU",
      gpu: "Dedicated Discrete GPU (8GB GDDR6 VRAM)",
      ram: "16 GB DDR5 5600MHz (Dual SODIMM Modular)",
      storage: "1 TB NVMe PCIe Gen 4 High-Speed SSD",
      cooling: "Dual High-CFM Fans + 4-Way Copper Heatpipes",
      battery: "80 Wh High-Capacity Fast-Charge Battery"
    },
    anatomyFocus: [
      "Discrete GPU heatsink assembly",
      "Dual centrifugal cooling fans",
      "Upgradable dual RAM modules",
      "High-power VRM delivery chokes"
    ]
  },
  {
    id: "laptop-c",
    code: "LAPTOP-03",
    name: "Laptop C — Creator",
    alias: "VisionStudio Pro 16",
    category: "Creator",
    categoryBadge: "Workstation & Media",
    accentColor: "#818CF8",
    description: "Engineered for 3D creators, motion artists, and video editors with high RAM density, color-accurate display controllers, and studio-grade thermal efficiency.",
    specs: {
      cpu: "14-Core Hybrid Architecture Creator CPU",
      gpu: "Studio-Grade GPU with Hardware Ray Tracing",
      ram: "32 GB LPDDR5X Dual-Channel Unified Memory",
      storage: "1 TB NVMe PCIe Gen 4 (Dual M.2 Slots)",
      cooling: "Vapor Chamber Liquid-Vapor Thermal Plate",
      battery: "90 Wh Studio Endurance Battery Pack"
    },
    anatomyFocus: [
      "Vapor chamber thermal spreader",
      "Dual NVMe expansion slots",
      "Thunderbolt controller chipset",
      "Dense high-bandwidth memory layout"
    ]
  }
];

export const getLaptopById = (id) => {
  return LAPTOPS.find((laptop) => laptop.id === id) || LAPTOPS[0];
};
