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
    accentColor: "#0D9488",
    image: "/images/laptop-a.jpg",
    description: "Designed for daily productivity, study, and high energy efficiency with Intel Core i5-1335U, integrated Intel Iris Xe graphics, soldered DDR4 memory, and a quiet single-fan thermal solution.",
    specs: {
      cpu: "Intel Core i5-1335U (10-Core / 12-Thread, Up to 4.6 GHz)",
      gpu: "Intel Iris Xe Graphics (Integrated 80 EUs)",
      ram: "16 GB DDR4-3200 (Soldered Onboard)",
      storage: "512 GB M.2 NVMe PCIe 3.0 x4 SSD",
      cooling: "Single Low-Noise Fan + Slim Copper Heat Pipe",
      battery: "42 Wh Lithium-Ion Pack (All-Day Efficiency)"
    },
    anatomyFocus: [
      "Compact energy-efficient motherboard layout",
      "Integrated Intel Iris Xe graphics architecture",
      "Soldered onboard DDR4 memory chips",
      "Quiet single-fan copper heat pipe cooling"
    ]
  },
  {
    id: "laptop-b",
    code: "LAPTOP-02",
    name: "Laptop B — Gaming",
    alias: "AeroBook Strix G16",
    category: "Gaming",
    categoryBadge: "High Performance",
    accentColor: "#10B981",
    image: "/images/laptop-b.jpg",
    description: "Built for intensive real-time ray tracing and competitive gaming with Intel Core i7-14650HX, discrete NVIDIA RTX 4060 8GB GPU, multi-heatpipe dual centrifugal cooling, and modular DDR5 SO-DIMM slots.",
    specs: {
      cpu: "Intel Core i7-14650HX (16-Core / 24-Thread, Up to 5.2 GHz)",
      gpu: "NVIDIA GeForce RTX 4060 Laptop GPU (8GB GDDR6, 140W TGP)",
      ram: "16 GB DDR5-5600 MHz (2 x 8GB SO-DIMM Modular)",
      storage: "1 TB M.2 NVMe PCIe 4.0 x4 High-Speed SSD",
      cooling: "Dual Centrifugal Fans + 4-Way Sintered Copper Heatpipes",
      battery: "90 Wh High-Density Lithium-Ion Pack (240W Fast Charge)"
    },
    anatomyFocus: [
      "Discrete NVIDIA RTX 4060 BGA GPU & GDDR6 VRAM",
      "Intel Core i7-14650HX 16-Core BGA1964 Package",
      "Dual high-CFM centrifugal blower fans with spinning impellers",
      "Modular dual-channel DDR5 SO-DIMM memory slots"
    ]
  },
  {
    id: "laptop-c",
    code: "LAPTOP-03",
    name: "Laptop C — Creator",
    alias: "AeroBook Studio Pro 16",
    category: "Creator",
    categoryBadge: "Workstation & Studio",
    accentColor: "#0284C7",
    image: "/images/laptop-c.jpg",
    description: "Engineered for 3D artists, video editors, and AI workflows with AMD Ryzen AI 9 HX 370, discrete NVIDIA RTX 4070 8GB GPU, soldered 32GB LPDDR5X-7500, and dual-fan studio cooling.",
    specs: {
      cpu: "AMD Ryzen AI 9 HX 370 (12-Core / 24-Thread, 50 TOPS NPU)",
      gpu: "NVIDIA GeForce RTX 4070 Laptop GPU (8GB GDDR6, Studio Drivers)",
      ram: "32 GB LPDDR5X-7500 (Soldered High-Bandwidth Memory)",
      storage: "2 TB M.2 NVMe PCIe 4.0 x4 High-Speed SSD",
      cooling: "Dual Studio Blower Fans + Multi-Way Copper Heatpipes & Heatsinks",
      battery: "90 Wh Studio Endurance Battery Pack (Fast Charge)"
    },
    anatomyFocus: [
      "AMD Ryzen AI 9 processor with integrated NPU",
      "Discrete NVIDIA RTX 4070 Laptop GPU with 8GB GDDR6",
      "High-density soldered LPDDR5X-7500 unified memory",
      "Symmetrical dual-fan multi-heatpipe studio cooling"
    ]
  }
];

export const getLaptopById = (id) => {
  return LAPTOPS.find((laptop) => laptop.id === id) || LAPTOPS[0];
};
