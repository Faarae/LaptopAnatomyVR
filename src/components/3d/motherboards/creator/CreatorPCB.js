import * as THREE from 'three';

/**
 * Builds the Creator Laptop Mainboard PCB (AeroBook Studio Pro 16)
 * Features:
 * - High-density 12-layer Megtron studio PCB silhouette with dual fan corner recesses
 * - Dark charcoal/navy PCB material with subtle teal/blue accents (#0c1926)
 * - Controlled-impedance differential circuit traces & ground plane shields
 * - Gold grounding screw mounting holes with retention rings
 * - Silkscreen labeling ("AERO-STUDIO-PRO16 MAINBOARD REV 3.0", "AMD RYZEN AI 9 / RTX 4070", "32GB LPDDR5X-7500", "DUAL USB4 40G", "90Wh BATT")
 * - SMT decoupling capacitor arrays & fine-pitch SMD components
 */
export function buildCreatorPCB(parentGroup) {
  const pcbGroup = new THREE.Group();
  pcbGroup.name = 'creatorPCB';

  // 1. High-Density Studio Mainboard Geometry
  const shape = new THREE.Shape();
  shape.moveTo(-4.6, -3.8); // Top left near rear exhaust
  shape.lineTo(-3.2, -3.8);
  shape.lineTo(-3.2, -4.2); // Rear center IO shelf
  shape.lineTo(3.2, -4.2);
  shape.lineTo(3.2, -3.8);
  shape.lineTo(4.6, -3.8);  // Top right near rear exhaust
  shape.lineTo(4.8, -2.2);
  shape.lineTo(4.8, 1.8);   // Right lower edge (IO & SD slot)
  shape.lineTo(2.6, 1.8);   // Battery bay cutout right step
  shape.lineTo(2.6, 2.4);   // SSD tab
  shape.lineTo(1.4, 2.4);
  shape.lineTo(1.4, 1.8);
  shape.lineTo(-1.4, 1.8);  // Battery header lip
  shape.lineTo(-1.4, 2.2);
  shape.lineTo(-2.6, 2.2);
  shape.lineTo(-2.6, 1.8);
  shape.lineTo(-4.8, 1.8);  // Left lower edge (Dual USB4)
  shape.lineTo(-4.8, -2.2);
  shape.closePath();

  // Mounting Holes
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
  pcbGeo.rotateX(Math.PI / 2);
  pcbGeo.translate(0, 0.09, 0);

  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x0c1926, // Deep charcoal navy 12-layer Megtron studio PCB
    roughness: 0.40,
    metalness: 0.22,
  });

  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
  pcbMesh.receiveShadow = true;
  pcbMesh.castShadow = true;
  pcbGroup.add(pcbMesh);

  // 2. Mounting Hole Gold Pad Rings & Screws
  const ringGeo = new THREE.RingGeometry(0.18, 0.32, 24);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.9,
    roughness: 0.25,
    side: THREE.DoubleSide
  });

  const screwGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16);
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
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

  // 3. Cyan / Blue High-Frequency Circuit Traces & Bus Lines
  const traceMat = new THREE.MeshBasicMaterial({
    color: 0x0284c7, // Studio cyan/blue trace lines
    transparent: true,
    opacity: 0.40
  });

  const goldTraceMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.45
  });

  // PCIe differential bus lines
  for (let i = -8; i <= 8; i++) {
    const traceGeo = new THREE.PlaneGeometry(0.018, 1.8);
    const traceMesh = new THREE.Mesh(traceGeo, traceMat);
    traceMesh.rotation.x = -Math.PI / 2;
    traceMesh.position.set(i * 0.08, 0.191, -0.1);
    pcbGroup.add(traceMesh);
  }

  // LPDDR5X high-speed memory serpentine traces
  for (let i = -10; i <= 10; i++) {
    const memTraceGeo = new THREE.PlaneGeometry(0.015, 0.85);
    const memTraceMesh = new THREE.Mesh(memTraceGeo, goldTraceMat);
    memTraceMesh.rotation.x = -Math.PI / 2;
    memTraceMesh.position.set(i * 0.08, 0.191, 0.7 + (i % 2 === 0 ? 0.04 : -0.04));
    pcbGroup.add(memTraceMesh);
  }

  // 4. Silkscreen Text / Studio Markings
  const silkscreenCanvas = document.createElement('canvas');
  silkscreenCanvas.width = 1024;
  silkscreenCanvas.height = 1024;
  const ctx = silkscreenCanvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 1024, 1024);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('AERO-STUDIO-PRO16 MAINBOARD REV 3.0', 80, 120);
    ctx.fillText('AMD RYZEN AI 9 HX 370 / NVIDIA RTX 4070 STUDIO', 80, 160);
    ctx.font = 'bold 18px monospace';
    ctx.fillText('32GB LPDDR5X-7500 UNIFIED MEMORY', 320, 520);
    ctx.fillText('2TB M.2 PCIE 4.0 x4 (KEY-M 2280)', 580, 780);
    ctx.fillText('90Wh HIGH-DENSITY STUDIO ENDURANCE BATTERY', 240, 940);
    ctx.fillText('WIFI-7 BE200 MLO', 80, 680);
    ctx.fillText('DUAL USB4 40Gbps / HDMI 2.1', 640, 220);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 80, 900, 880);
    ctx.strokeRect(300, 480, 420, 160);
  }

  const silkscreenTex = new THREE.CanvasTexture(silkscreenCanvas);
  silkscreenTex.anisotropy = 4;
  const silkscreenGeo = new THREE.PlaneGeometry(8.6, 7.2);
  const silkscreenMat = new THREE.MeshBasicMaterial({
    map: silkscreenTex,
    transparent: true,
    opacity: 0.70,
    depthWrite: false
  });
  const silkscreenMesh = new THREE.Mesh(silkscreenGeo, silkscreenMat);
  silkscreenMesh.rotation.x = -Math.PI / 2;
  silkscreenMesh.position.set(0, 0.192, -0.6);
  pcbGroup.add(silkscreenMesh);

  // 5. SMD Decoupling Capacitors & Resistors Matrix
  const smdCapGeo = new THREE.BoxGeometry(0.06, 0.03, 0.04);
  const smdCapMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6 });
  const smdResGeo = new THREE.BoxGeometry(0.05, 0.025, 0.035);
  const smdResMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });

  const smdLocations = [
    [-1.7, -0.2], [-1.7, -2.0], [-0.8, -1.1], [-2.6, -1.1],
    [1.7, -0.2],  [1.7, -2.0],  [0.8, -1.1],  [2.6, -1.1],
    [0.0, 0.1],   [0.0, 1.3],   [1.2, 0.4],   [-1.2, 0.4],
    [-3.8, 0.2],  [-3.8, 0.6],  [3.8, 0.2]
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
