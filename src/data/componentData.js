/**
 * Component Library Data
 * Comprehensive technical and educational catalog for laptop internal components.
 */

export const COMPONENTS = [
  {
    id: "cpu",
    name: "CPU",
    fullName: "Central Processing Unit",
    category: "Compute Engine",
    tag: "Brain of System",
    threeType: "cpu",
    image: "/images/components/pin-8.jpg",
    imageName: "pin-8.jpg",
    description: "The primary computational processor that decodes, coordinates, and executes instructions across all operating system and software workloads.",
    specsHighlight: "Clock speed, Cores & Threads, Cache memory, TDP rating",
    details: {
      architecture: "Hybrid x86-64 / ARM SoC with Performance (P-Cores) and Efficient (E-Cores) microarchitecture, Integrated Heat Spreader (IHS), and ultra-dense silicon die.",
      workingPrinciple: "Fetches machine instructions from RAM, decodes them via microcode engines, executes arithmetic/logic through ALUs, and caches frequently accessed memory in nanosecond L1/L2/L3 SRAM buffers.",
      laptopRole: "Directly determines responsiveness, compiling speed, OS multitasking capabilities, and thermal power draw. In modern laptops, dynamic boost algorithms scale clock speeds up to 5.4+ GHz when plugged into AC power.",
      specs: {
        "Core Configuration": "Up to 14 Cores (6P + 8E) / 20 Threads",
        "Base & Boost Clock": "2.4 GHz Base / 5.0 GHz Turbo Boost",
        "L3 Cache": "24 MB Intel Smart Cache",
        "Thermal Design Power (TDP)": "45W Base (Up to 115W Max Turbo)",
        "Manufacturing Node": "Intel 7 (10nm SuperFin / 4nm TSMC)",
        "Instruction Set": "x86-64, AVX2, SSE4.2, FMA3"
      },
      vrInsight: "In 3D inspection, notice the nickel-plated copper heat spreader sitting over microscopic billions of transistors, surrounded by gold contact pads that seat into the motherboard socket."
    }
  },
  {
    id: "gpu",
    name: "GPU",
    fullName: "Graphics Processing Unit",
    category: "Compute & Rasterization",
    tag: "Visual Engine",
    threeType: "gpu",
    image: "/images/components/pin-1.jpg",
    imageName: "pin-1.jpg",
    description: "Specialized massively-parallel chip engineered for 3D polygon rasterization, real-time hardware ray tracing, physics computation, and tensor AI acceleration.",
    specsHighlight: "CUDA / Stream Cores, VRAM capacity, Memory bus width",
    details: {
      architecture: "Massively parallel SIMD/SIMT streaming multiprocessors accompanied by dedicated RT (Ray Tracing) cores, Tensor matrix engines, and surrounding high-speed GDDR6 memory chips.",
      workingPrinciple: "Calculates millions of vertex coordinates, texture transforms, and lighting shader passes simultaneously every frame, writing final pixel buffers to the display frame buffer at high refresh rates.",
      laptopRole: "Powers 3D gaming, CAD rendering, video color grading, VR headsets, and local AI model inference. In laptops, discrete GPUs connect to the CPU via dedicated PCIe x8/x16 lanes with dynamic power sharing (Dynamic Boost).",
      specs: {
        "CUDA Cores / Compute Units": "Up to 4608 Stream Processors",
        "Video Memory (VRAM)": "8 GB to 16 GB GDDR6 / GDDR6X",
        "Memory Bus Width": "128-bit to 256-bit Bus",
        "Memory Bandwidth": "Up to 384 GB/s",
        "Ray Tracing Acceleration": "Dedicated 3rd Gen RT Cores",
        "Power Target (TGP)": "60W to 140W with Dynamic Boost"
      },
      vrInsight: "Look at the central mirror-polished silicon die surrounded by rectangular GDDR6 memory chips connected by high-density interposer wiring."
    }
  },
  {
    id: "ram",
    name: "RAM",
    fullName: "Random Access Memory",
    category: "System Memory",
    tag: "High-Speed Buffer",
    threeType: "ram",
    image: "/images/components/pin-4.jpg",
    imageName: "pin-4.jpg",
    description: "Volatile high-speed working memory that stores currently executing applications, open browser tabs, and working datasets for sub-nanosecond processor access.",
    specsHighlight: "Transfer speed (MT/s), Channel mode, Timing latency, Form factor",
    details: {
      architecture: "SO-DIMM / CAMM2 module or soldered LPDDR5X chips featuring multi-bank DRAM silicon dies, on-die ECC error correction, and an onboard Power Management IC (PMIC).",
      workingPrinciple: "Stores binary data in microscopic capacitive cell arrays that refresh thousands of times per second. Populating paired memory channels doubles aggregate data transfer rates to the CPU memory controller.",
      laptopRole: "Enables seamless multitasking between dozens of applications without swapping pagefiles to slower disk storage. 16GB+ dual-channel is the modern sweet spot for gaming and creative workloads.",
      specs: {
        "Memory Standard": "DDR5 / LPDDR5X SO-DIMM",
        "Data Transfer Rate": "5600 MT/s to 6400 MT/s",
        "Bus Width & Channels": "Dual 32-bit Subchannels (128-bit Total)",
        "Peak Bandwidth": "Up to 89.6 GB/s",
        "Operating Voltage": "1.1V Ultra-Low Voltage",
        "CAS Latency": "CL40 to CL46"
      },
      vrInsight: "Notice the golden edge contacts with the keying notch preventing inverted installation, plus the row of black epoxy DRAM chips controlled by the central PMIC chip."
    }
  },
  {
    id: "ssd",
    name: "SSD NVMe",
    fullName: "Solid State Drive (M.2 NVMe PCIe)",
    category: "Persistent Storage",
    tag: "Persistent Storage",
    threeType: "ssd",
    image: "/images/components/pin-3.jpg",
    imageName: "pin-3.jpg",
    description: "Non-volatile 3D NAND flash memory storage holding the operating system, games, and user files with gigabyte-per-second sequential and random throughput.",
    specsHighlight: "PCIe Generation interface, Sequential read/write speeds, TBW endurance",
    details: {
      architecture: "M.2 2280 form factor PCB mounting a high-speed multi-core flash controller IC, DRAM cache buffer, and layered 3D TLC/QLC NAND flash memory packages.",
      workingPrinciple: "Communicates directly with the CPU over PCIe Gen 4 lanes utilizing the NVMe (Non-Volatile Memory Express) protocol, supporting up to 64,000 parallel I/O queues without mechanical seek latency.",
      laptopRole: "Enables 5-second OS boot times, near-instant game level loading, rapid file copying, and virtual memory swap space when physical RAM fills up.",
      specs: {
        "Form Factor": "M.2 2280 (22mm wide x 80mm long)",
        "Bus Interface": "PCIe Gen 4.0 x4 NVMe 1.4",
        "Sequential Read Speed": "Up to 7,000 MB/s",
        "Sequential Write Speed": "Up to 5,500 MB/s",
        "Random 4K IOPS": "Up to 800,000 IOPS",
        "Endurance Rating": "600 TBW (Terabytes Written)"
      },
      vrInsight: "Notice the nickel-plated flash controller chip and the M-key edge connector that locks into the motherboard M.2 standoff screw."
    }
  },
  {
    id: "motherboard",
    name: "Motherboard",
    fullName: "Main Logic Circuit Board",
    category: "System Backbone",
    tag: "Central Backbone",
    threeType: "motherboard",
    image: "/images/components/pin-10.jpg",
    imageName: "pin-10.jpg",
    description: "The primary printed circuit board (PCB) that interconnects the CPU, memory, power delivery rails, display pipeline, audio, and all input/output buses.",
    specsHighlight: "Chipset interconnect, Power delivery VRM phases, Form factor, Trace layers",
    details: {
      architecture: "High-density 8-to-12 layer fiberglass PCB featuring precision copper trace runs, embedded power ground planes, surface-mount VRM chokes, and southbridge chipset controllers.",
      workingPrinciple: "Distributes regulated voltages to every component, synchronizes clock generators, and routes high-speed differential signal pairs with impedance matching to prevent signal degradation.",
      laptopRole: "The physical and electrical foundation of the laptop. Dictates port availability (Thunderbolt, USB-C, HDMI), thermal layout, component upgradeability, and structural rigidity.",
      specs: {
        "PCB Construction": "10-Layer High-Density Interconnect (HDI)",
        "Power Delivery (VRM)": "8+2 Phase Digital Power Stages",
        "Chipset": "Intel 700 Series / AMD 600 Series PCH",
        "Expansion Bus": "PCIe 4.0 / 5.0 high-speed differential traces",
        "I/O Support": "Thunderbolt 4, USB4, DisplayPort Alt Mode",
        "Firmware": "UEFI Secure Boot BIOS with TPM 2.0"
      },
      vrInsight: "Observe the intricate golden and copper trace tracks branching out like tree roots from the CPU socket towards the RAM and expansion slots."
    }
  },
  {
    id: "battery",
    name: "Battery",
    fullName: "Lithium-Polymer Rechargeable Battery",
    category: "Power Subsystem",
    tag: "Energy Reservoir",
    threeType: "battery",
    image: "/images/components/pin-9.jpg",
    imageName: "pin-9.jpg",
    description: "Rechargeable high-density chemical energy source powering the laptop untethered, managed by smart Battery Management System (BMS) microcontrollers.",
    specsHighlight: "Watt-hour (Wh) capacity, Cell count, Charging wattage rating, Cycle lifespan",
    details: {
      architecture: "Multiple pouch-format Lithium Cobalt Oxide (LiCoO2) or NMC cells connected in series/parallel, wired to an intelligent Battery Management System (BMS) protection circuit board.",
      workingPrinciple: "Lithium ions intercalate between graphite anode and metal oxide cathode through a porous polymer separator, releasing electric current during discharge and absorbing charge during AC adapter connection.",
      laptopRole: "Provides 6 to 14 hours of continuous portable operation. Advanced power management throttles performance dynamically when running on battery to preserve battery runtime.",
      specs: {
        "Capacity Rating": "70 Wh to 99.9 Wh (FAA Flight Limit)",
        "Cell Topology": "4-Cell (4S1P) In Series Lithium-Polymer",
        "Nominal Voltage": "15.2V to 15.4V (Peak 17.4V)",
        "Fast-Charging Rate": "Up to 100W USB-PD / 140W Proprietary",
        "Cycle Life": "800 to 1,000 Full Charge Cycles (80% Health)",
        "Safety Protection": "Over-charge, over-discharge, thermal cutoff"
      },
      vrInsight: "In teardown views, the battery pack dominates the lower half of the chassis directly underneath the palmrest and trackpad."
    }
  },
  {
    id: "cooling-fan",
    name: "Cooling Fan",
    fullName: "Active Thermal Blower & Heatpipe",
    category: "Thermal Subsystem",
    tag: "Heat Dissipation",
    threeType: "fan",
    image: "/images/components/pin-2.jpg",
    imageName: "pin-2.jpg",
    description: "Centrifugal blower fan and sintered copper heatpipes that rapidly conduct thermal energy away from the CPU and GPU silicon dies to prevent thermal throttling.",
    specsHighlight: "CFM airflow rating, Blade density, Liquid bearing durability, Heatpipe count",
    details: {
      architecture: "Hydro-dynamic bearing (HDB) brushless DC motor spinning ultra-thin liquid-crystal polymer (LCP) impeller blades inside an aerodynamic magnesium-alloy or copper chamber.",
      workingPrinciple: "Sintered copper heatpipes containing a vacuum and capillary wick boil liquid water into vapor at the hot processor dies. The vapor rushes to cool fin stacks where fans blow room-temperature air to exhaust heat outside the chassis.",
      laptopRole: "Maintains silicon temperatures below 90°C under heavy rendering or gaming loads, enabling continuous high clock speeds without thermal throttling or shutdown.",
      specs: {
        "Blade Material": "0.15mm Liquid Crystal Polymer (LCP)",
        "Blade Count": "Up to 84 Aerodynamic Impeller Blades",
        "Motor Type": "3-Phase 6-Pole Brushless DC Motor",
        "Rotational Speed": "Up to 6,200 RPM at Full Load",
        "Acoustic Noise": "Under 42 dBA in Balanced Mode",
        "Heatpipe Alloy": "Oxygen-Free Sintered Copper Powder"
      },
      vrInsight: "Look at the curved centrifugal impeller blades designed to pull air from top and bottom vents and expel it sideways through the copper radiator fins."
    }
  },
  {
    id: "wifi-card",
    name: "Wi-Fi Card",
    fullName: "M.2 Wireless Network Controller",
    category: "Wireless Networking",
    tag: "Wireless Interface",
    threeType: "wifi",
    image: "/images/components/pin-6.jpg",
    imageName: "pin-6.jpg",
    description: "Modular or soldered radio frequency (RF) controller providing gigabit wireless internet connectivity and ultra-low latency Bluetooth peripheral pairing.",
    specsHighlight: "Wi-Fi 6E/7 standard, Multi-band antennas, Bluetooth version, Channel width",
    details: {
      architecture: "M.2 2230 A/E-key plug-in module with RF shielding nickel can, onboard baseband DSP processor, low-noise amplifiers (LNA), and dual U.FL antenna connectors.",
      workingPrinciple: "Modulates radio signals across 2.4 GHz, 5 GHz, and 6 GHz spectrums using 1024-QAM / 4096-QAM orthogonal frequency-division multiplexing (OFDMA) with multi-user MIMO beamforming.",
      laptopRole: "Enables multiplayer online gaming with under-10ms ping, 4K/8K video streaming, fast cloud backups, and stable connectivity to Bluetooth mice, keyboards, and headphones.",
      specs: {
        "Wireless Standard": "Wi-Fi 6E (802.11ax) & Wi-Fi 7 Ready",
        "Frequency Bands": "Tri-Band 2.4 GHz, 5 GHz, 6 GHz",
        "Max PHY Throughput": "Up to 2.4 Gbps to 5.8 Gbps",
        "Channel Bandwidth": "160 MHz & 320 MHz Channels",
        "Bluetooth Version": "Bluetooth 5.3 / 5.4 with LE Audio",
        "Antenna Configuration": "2x2 Tx/Rx MU-MIMO Beamforming"
      },
      vrInsight: "Notice the shiny metal shielding box keeping interference out of sensitive radio circuits, and the tiny gold antenna sockets connected to screen-mounted antenna cables."
    }
  }
];

export const getComponentById = (id) => {
  return COMPONENTS.find((comp) => comp.id === id) || COMPONENTS[0];
};
