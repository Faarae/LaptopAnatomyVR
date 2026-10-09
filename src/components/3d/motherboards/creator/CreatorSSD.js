import * as THREE from 'three';

/**
 * Builds the 2 TB M.2 2280 PCIe Gen 4.0 x4 NVMe SSD with Aluminum Thermal Spreader
 * Position: Lower Right Section (x: 2.3, z: 1.5)
 * Features:
 * - M.2 2280 standard form factor
 * - Surface mount M.2 Key-M socket with gold pins
 * - Anodized blue-grey aluminum thermal heatsink plate with surface ridges
 * - High-speed PCIe 4.0 controller (7,400 MB/s) and 2TB 3D TLC NAND underneath
 * - CNC silver retention screw at tail end
 */
export function buildCreatorSSD(parentGroup) {
  const ssdGroup = new THREE.Group();
  ssdGroup.name = 'creatorSSD';
  ssdGroup.position.set(2.3, 0.19, 1.5);

  // 1. M.2 Key-M Socket
  const socketGeo = new THREE.BoxGeometry(0.72, 0.10, 0.35);
  const socketMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  const socket = new THREE.Mesh(socketGeo, socketMat);
  socket.position.set(0, 0.05, -1.02);
  ssdGroup.add(socket);

  // Gold connector pins inside socket
  const goldPins = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.03, 0.12),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.2 })
  );
  goldPins.position.set(0, 0.06, -0.95);
  ssdGroup.add(goldPins);

  // 2. M.2 2280 Base PCB
  const ssdPcbGeo = new THREE.BoxGeometry(0.62, 0.04, 2.0);
  const ssdPcbMat = new THREE.MeshStandardMaterial({
    color: 0x0c1926,
    roughness: 0.4,
    metalness: 0.2
  });
  const ssdPcb = new THREE.Mesh(ssdPcbGeo, ssdPcbMat);
  ssdPcb.position.set(0, 0.08, 0);
  ssdPcb.castShadow = true;
  ssdGroup.add(ssdPcb);

  // 3. Anodized Aluminum Blue-Grey Thermal Armor / Heatsink Plate
  const heatsinkGeo = new THREE.BoxGeometry(0.60, 0.06, 1.70);
  const heatsinkMat = new THREE.MeshStandardMaterial({
    color: 0x1e3a5f, // Studio anodized navy/blue aluminum
    metalness: 0.88,
    roughness: 0.28
  });
  const heatsink = new THREE.Mesh(heatsinkGeo, heatsinkMat);
  heatsink.position.set(0, 0.13, 0.05);
  heatsink.castShadow = true;
  ssdGroup.add(heatsink);

  // Thermal Dissipation Ridges across the heatsink
  const ridgeGeo = new THREE.BoxGeometry(0.56, 0.03, 0.04);
  const ridgeMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8, // Cyan accent ridge
    metalness: 0.9,
    roughness: 0.2
  });

  for (let r = -6; r <= 6; r++) {
    if (r % 2 === 0) {
      const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
      ridge.position.set(0, 0.17, 0.05 + r * 0.10);
      ssdGroup.add(ridge);
    }
  }

  // 4. Laser Engraved Heatsink Label Decal
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 256;
  labelCanvas.height = 512;
  const ctx = labelCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#1e3a5f';
    ctx.fillRect(0, 0, 256, 512);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('2TB PRO NVMe', 20, 55);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '18px monospace';
    ctx.fillText('PCIe 4.0 x4', 20, 95);
    ctx.fillText('7400 MB/s READ', 20, 130);
    ctx.fillText('THERMAL ARMOR', 20, 165);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('STUDIO EDITION', 20, 440);
  }
  const labelTex = new THREE.CanvasTexture(labelCanvas);
  const labelMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.54, 1.60),
    new THREE.MeshBasicMaterial({ map: labelTex, transparent: true, opacity: 0.92 })
  );
  labelMesh.rotation.x = -Math.PI / 2;
  labelMesh.position.set(0, 0.185, 0.05);
  ssdGroup.add(labelMesh);

  // 5. Standoff & Mounting Screw at tail end (z: 1.05)
  const standoff = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 })
  );
  standoff.position.set(0, 0.06, 1.05);
  ssdGroup.add(standoff);

  const screw = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, 0.04, 16),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 })
  );
  screw.position.set(0, 0.13, 1.05);
  ssdGroup.add(screw);

  // Highlight Plane for SSD (Pin 03)
  const highlightGeo = new THREE.PlaneGeometry(1.2, 2.6);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.y = 0.01;
  highlightMesh.name = 'ssdHighlight';
  ssdGroup.add(highlightMesh);

  parentGroup.add(ssdGroup);
  return ssdGroup;
}
