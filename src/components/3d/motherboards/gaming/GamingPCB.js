import * as THREE from 'three';

/**
 * Builds the realistic Gaming Laptop Mainboard PCB
 * Features:
 * - Irregular gaming laptop silhouette with dual fan corner recesses and battery bay
 * - Dark green/black high-density PCB material (#102b24)
 * - Fine copper/gold circuit traces and ground plane buses
 * - Grounding screw mounting holes with metallic retention rings
 * - Silkscreen labeling ("AERO-G16 MAINBOARD REV 2.4", "PCIE GEN4", "DDR5 SO-DIMM 1.1V")
 * - SMT decoupling capacitor grids & micro SMD packages
 */
export function buildGamingPCB(parentGroup) {
  const pcbGroup = new THREE.Group();
  pcbGroup.name = 'gamingPCB';

  // 1. Irregular Shaped Mainboard Geometry using ExtrudeGeometry for realistic silhouette
  const shape = new THREE.Shape();
  // Dimensions roughly 9.6 wide x 7.6 deep, centered around (0, 0, -0.6)
  // Left side: Fan cutout on top-left (-4.8, -4.2 to -2.0)
  // Right side: Fan cutout on top-right (4.8, -4.2 to -2.0)
  // Bottom: Recess for battery pack (z > 1.8)
  
  // Outer perimeter contour
  shape.moveTo(-4.6, -3.8); // Top left near rear IO
  shape.lineTo(-3.4, -3.8); // Rear exhaust bridge
  shape.lineTo(-3.4, -4.2); // Rear center IO shelf
  shape.lineTo(3.4, -4.2);
  shape.lineTo(3.4, -3.8);
  shape.lineTo(4.6, -3.8);  // Top right near rear IO
  shape.lineTo(4.8, -2.4);  // Right edge upper
  shape.lineTo(4.8, 1.8);   // Right edge lower (IO ports wing)
  shape.lineTo(2.8, 1.8);   // Battery bay cutout right step
  shape.lineTo(2.8, 2.4);   // SSD / M.2 expansion tab
  shape.lineTo(1.6, 2.4);
  shape.lineTo(1.6, 1.8);
  shape.lineTo(-1.6, 1.8);  // Center battery connector edge
  shape.lineTo(-1.6, 2.2);  // Battery header lip
  shape.lineTo(-2.8, 2.2);
  shape.lineTo(-2.8, 1.8);
  shape.lineTo(-4.8, 1.8);  // Left edge lower (IO ports wing)
  shape.lineTo(-4.8, -2.4); // Left edge upper
  shape.closePath();

  // Mounting Holes in Shape
  const holePositions = [
    [-4.2, -3.2], [4.2, -3.2],
    [-2.8, -0.6], [2.8, -0.6],
    [-4.2, 1.2],  [4.2, 1.2],
    [0.0, -3.4],  [0.0, 1.2]
  ];

  holePositions.forEach(([hx, hz]) => {
    const holePath = new THREE.Path();
    holePath.absarc(hx, hz, 0.16, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
  });

  const extrudeSettings = {
    steps: 1,
    depth: 0.18,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.03,
    bevelSegments: 2
  };

  const pcbGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  // Rotate so that extrusion is along Y axis (flat on X-Z plane)
  pcbGeo.rotateX(Math.PI / 2);
  pcbGeo.translate(0, 0.09, 0);

  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x102b24, // High-end dark forest green gaming PCB
    roughness: 0.42,
    metalness: 0.18,
  });

  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
  pcbMesh.receiveShadow = true;
  pcbMesh.castShadow = true;
  pcbGroup.add(pcbMesh);

  // 2. Mounting Hole Gold Retention Rings & Screws
  const ringGeo = new THREE.RingGeometry(0.18, 0.32, 24);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // Gold plated grounding pad
    metalness: 0.9,
    roughness: 0.25,
    side: THREE.DoubleSide
  });

  const screwGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16);
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8, // Silver CNC screw
    metalness: 0.95,
    roughness: 0.15
  });

  holePositions.forEach(([hx, hz]) => {
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.set(hx, 0.19, hz);
    pcbGroup.add(ringMesh);

    const screwMesh = new THREE.Mesh(screwGeo, screwMat);
    screwMesh.position.set(hx, 0.16, hz);
    pcbGroup.add(screwMesh);
  });

  // 3. Copper / Gold High-Density Circuit Traces & Bus Lines
  const traceMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0.35,
    wireframe: false
  });

  const goldTraceMat = new THREE.MeshBasicMaterial({
    color: 0xfacc15,
    transparent: true,
    opacity: 0.45
  });

  // PCIe differential bus lines (connecting CPU & GPU to SSD/PCH)
  for (let i = -8; i <= 8; i++) {
    const traceGeo = new THREE.PlaneGeometry(0.02, 1.8);
    const traceMesh = new THREE.Mesh(traceGeo, traceMat);
    traceMesh.rotation.x = -Math.PI / 2;
    traceMesh.position.set(i * 0.08, 0.191, -0.1);
    pcbGroup.add(traceMesh);
  }

  // High-frequency DDR5 memory traces (serpentine trace representation)
  for (let i = -12; i <= 12; i++) {
    const memTraceGeo = new THREE.PlaneGeometry(0.015, 0.9);
    const memTraceMesh = new THREE.Mesh(memTraceGeo, goldTraceMat);
    memTraceMesh.rotation.x = -Math.PI / 2;
    memTraceMesh.position.set(i * 0.07, 0.191, 0.8 + (i % 2 === 0 ? 0.05 : -0.05));
    pcbGroup.add(memTraceMesh);
  }

  // GPU-to-VRAM High Bandwidth bus traces
  [-1.8].forEach(gx => {
    for (let j = 0; j < 4; j++) {
      const vramTraceGeo = new THREE.PlaneGeometry(1.2, 0.02);
      const vramTraceMesh = new THREE.Mesh(vramTraceGeo, goldTraceMat);
      vramTraceMesh.rotation.x = -Math.PI / 2;
      vramTraceMesh.position.set(gx, 0.191, -1.2 + (j - 1.5) * 0.3);
      pcbGroup.add(vramTraceMesh);
    }
  });

  // 4. Subtle Silkscreen Text / Markings (Canvas Texture Decals)
  const silkscreenCanvas = document.createElement('canvas');
  silkscreenCanvas.width = 1024;
  silkscreenCanvas.height = 1024;
  const ctx = silkscreenCanvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 1024, 1024);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('STRIX G16 GAMING MAINBOARD REV 2.4', 80, 120);
    ctx.fillText('NVIDIA AD107 GPU / INTEL LGA-1700 BGA', 80, 160);
    ctx.font = 'bold 18px monospace';
    ctx.fillText('DDR5 SO-DIMM 1.1V DUAL-CHANNEL', 340, 520);
    ctx.fillText('M.2 PCIE GEN 4.0 x4 (KEY-M 2280)', 580, 780);
    ctx.fillText('90Wh HIGH-DENSITY LI-ION BATTERY', 260, 940);
    ctx.fillText('WIFI-6E AX211', 80, 680);
    ctx.fillText('HDMI 2.1 / eDP 1.4', 720, 220);

    // Decorative silkscreen boundary lines & crosshairs
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 80, 900, 880);
    ctx.strokeRect(320, 480, 380, 180);
  }

  const silkscreenTex = new THREE.CanvasTexture(silkscreenCanvas);
  silkscreenTex.anisotropy = 4;
  const silkscreenGeo = new THREE.PlaneGeometry(8.6, 7.2);
  const silkscreenMat = new THREE.MeshBasicMaterial({
    map: silkscreenTex,
    transparent: true,
    opacity: 0.65,
    depthWrite: false
  });
  const silkscreenMesh = new THREE.Mesh(silkscreenGeo, silkscreenMat);
  silkscreenMesh.rotation.x = -Math.PI / 2;
  silkscreenMesh.position.set(0, 0.192, -0.6);
  pcbGroup.add(silkscreenMesh);

  // 5. Dense Matrix of SMT Decoupling Capacitors & Resistors across the PCB
  const smdCapGeo = new THREE.BoxGeometry(0.06, 0.03, 0.04);
  const smdCapMat = new THREE.MeshStandardMaterial({
    color: 0xb45309, // Ceramic capacitor tan/brown
    roughness: 0.6
  });

  const smdResGeo = new THREE.BoxGeometry(0.05, 0.025, 0.035);
  const smdResMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a, // Black SMD resistor package
    roughness: 0.4
  });

  // Instanced SMT clusters around CPU/GPU/RAM
  const smdLocations = [
    [-1.8, -0.2], [-1.8, -2.2], [-0.8, -1.2], [-2.8, -1.2],
    [1.8, -0.2], [1.8, -2.2], [0.8, -1.2], [2.8, -1.2],
    [0.0, 0.1], [0.0, 1.4], [1.2, 0.4], [-1.2, 0.4],
    [-3.8, 0.2], [-3.8, 0.6], [-3.8, 1.0], [3.8, 0.2]
  ];

  smdLocations.forEach(([cx, cz]) => {
    for (let k = 0; k < 6; k++) {
      const isCap = k % 2 === 0;
      const mesh = new THREE.Mesh(isCap ? smdCapGeo : smdResGeo, isCap ? smdCapMat : smdResMat);
      mesh.position.set(cx + (k % 3 - 1) * 0.1, 0.20, cz + (Math.floor(k / 3) - 0.5) * 0.08);
      pcbGroup.add(mesh);
    }
  });

  parentGroup.add(pcbGroup);
  return pcbGroup;
}
