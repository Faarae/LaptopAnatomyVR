import * as THREE from 'three';

/**
 * Builds the Entry Level Laptop Mainboard PCB (AeroBook Slim 14)
 * Features:
 * - Compact irregular silhouette with single top-left fan cutout and 3-cell battery bay
 * - Dark green high-density PCB material (#0d3328)
 * - Copper/gold circuit traces and ground plane bus lines
 * - Grounding screw mounting holes with metallic retention rings
 * - Silkscreen labeling ("AERO-SLIM14 MAINBOARD REV 1.2", "INTEL CORE i5-1335U", "DDR4 SOLDERED", "M.2 PCIE 3.0", "42Wh BATT")
 * - SMT decoupling capacitor grids & micro SMD packages
 */
export function buildEntryPCB(parentGroup) {
  const pcbGroup = new THREE.Group();
  pcbGroup.name = 'entryPCB';

  // 1. Compact Irregular Shaped Mainboard Geometry
  // Single fan cutout on top-left (-4.6 to -1.8), top right straight, battery bay at bottom
  const shape = new THREE.Shape();
  shape.moveTo(-4.6, -1.8); // Left edge below fan cutout
  shape.lineTo(-4.6, 1.8);  // Left lower edge (IO ports)
  shape.lineTo(-2.2, 1.8);  // Battery bay cutout left step
  shape.lineTo(-2.2, 2.2);  // Battery connector lip
  shape.lineTo(-0.8, 2.2);
  shape.lineTo(-0.8, 1.8);
  shape.lineTo(2.0, 1.8);   // Battery bay cutout right step
  shape.lineTo(2.0, 2.4);   // M.2 SSD tab
  shape.lineTo(3.4, 2.4);
  shape.lineTo(3.4, 1.8);
  shape.lineTo(4.6, 1.8);   // Right lower edge
  shape.lineTo(4.6, -3.8);  // Right upper edge
  shape.lineTo(-1.8, -3.8); // Rear exhaust bridge next to fan
  shape.lineTo(-1.8, -2.4); // Fan recess inner wall
  shape.lineTo(-4.6, -2.4); // Fan recess outer wall
  shape.closePath();

  // Mounting Holes in Shape
  const holePositions = [
    [-4.0, 1.2],  [4.0, 1.2],
    [-2.6, -0.6], [2.6, -0.6],
    [4.0, -3.2],  [0.0, -3.2],
    [0.0, 1.2]
  ];

  holePositions.forEach(([hx, hz]) => {
    const holePath = new THREE.Path();
    holePath.absarc(hx, hz, 0.15, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
  });

  const extrudeSettings = {
    steps: 1,
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2
  };

  const pcbGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  pcbGeo.rotateX(Math.PI / 2);
  pcbGeo.translate(0, 0.08, 0);

  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x0d3328, // Dark forest green ultrabook PCB
    roughness: 0.44,
    metalness: 0.18,
  });

  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
  pcbMesh.receiveShadow = true;
  pcbMesh.castShadow = true;
  pcbGroup.add(pcbMesh);

  // 2. Mounting Hole Gold Rings & Screws
  const ringGeo = new THREE.RingGeometry(0.16, 0.28, 20);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // Gold plated grounding ring
    metalness: 0.9,
    roughness: 0.25,
    side: THREE.DoubleSide
  });

  const screwGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.07, 14);
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8, // Silver CNC screw
    metalness: 0.95,
    roughness: 0.15
  });

  holePositions.forEach(([hx, hz]) => {
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.set(hx, 0.17, hz);
    pcbGroup.add(ringMesh);

    const screwMesh = new THREE.Mesh(screwGeo, screwMat);
    screwMesh.position.set(hx, 0.15, hz);
    pcbGroup.add(screwMesh);
  });

  // 3. Copper Circuit Traces & Bus Lines
  const traceMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0.35
  });

  const goldTraceMat = new THREE.MeshBasicMaterial({
    color: 0xfacc15,
    transparent: true,
    opacity: 0.40
  });

  // Memory bus lines connecting CPU to soldered DDR4 chips
  for (let i = -6; i <= 6; i++) {
    const traceGeo = new THREE.PlaneGeometry(0.015, 0.8);
    const traceMesh = new THREE.Mesh(traceGeo, goldTraceMat);
    traceMesh.rotation.x = -Math.PI / 2;
    traceMesh.position.set(0.2 + i * 0.09, 0.171, -0.2);
    pcbGroup.add(traceMesh);
  }

  // PCIe bus lines connecting CPU to M.2 SSD
  for (let i = 0; i < 4; i++) {
    const pcieTraceGeo = new THREE.PlaneGeometry(1.6, 0.02);
    const pcieTraceMesh = new THREE.Mesh(pcieTraceGeo, traceMat);
    pcieTraceMesh.rotation.x = -Math.PI / 2;
    pcieTraceMesh.position.set(1.4, 0.171, 0.4 + i * 0.12);
    pcbGroup.add(pcieTraceMesh);
  }

  // 4. Silkscreen Text / Markings
  const silkscreenCanvas = document.createElement('canvas');
  silkscreenCanvas.width = 1024;
  silkscreenCanvas.height = 1024;
  const ctx = silkscreenCanvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 1024, 1024);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('AERO-SLIM14 MAINBOARD REV 1.2', 80, 120);
    ctx.fillText('INTEL CORE i5-1335U / IRIS Xe ARCHITECTURE', 80, 160);
    ctx.font = 'bold 18px monospace';
    ctx.fillText('16GB DDR4-3200 SOLDERED DUAL-CHANNEL', 240, 560);
    ctx.fillText('M.2 PCIE 3.0 x4 (KEY-M 2280)', 580, 760);
    ctx.fillText('42Wh 3-CELL LI-ION BATTERY', 260, 940);
    ctx.fillText('WIFI-6 AX201', 80, 680);
    ctx.fillText('eDP 1.4 FHD 60Hz', 680, 220);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 80, 900, 880);
    ctx.strokeRect(220, 500, 540, 140);
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
  silkscreenMesh.position.set(0, 0.172, -0.6);
  pcbGroup.add(silkscreenMesh);

  // 5. SMD Decoupling Capacitors & Resistors
  const smdCapGeo = new THREE.BoxGeometry(0.05, 0.025, 0.035);
  const smdCapMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6 });
  const smdResGeo = new THREE.BoxGeometry(0.04, 0.02, 0.03);
  const smdResMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });

  const smdLocations = [
    [0.2, -0.2], [0.2, -1.8], [-0.6, -1.0], [1.0, -1.0],
    [-2.0, 0.2], [-2.0, 0.8], [3.2, 0.2], [1.2, 0.2]
  ];

  smdLocations.forEach(([cx, cz]) => {
    for (let k = 0; k < 4; k++) {
      const isCap = k % 2 === 0;
      const mesh = new THREE.Mesh(isCap ? smdCapGeo : smdResGeo, isCap ? smdCapMat : smdResMat);
      mesh.position.set(cx + (k % 2 - 0.5) * 0.08, 0.18, cz + (Math.floor(k / 2) - 0.5) * 0.07);
      pcbGroup.add(mesh);
    }
  });

  parentGroup.add(pcbGroup);
  return pcbGroup;
}
