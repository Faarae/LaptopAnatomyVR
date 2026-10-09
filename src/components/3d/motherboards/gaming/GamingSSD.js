import * as THREE from 'three';

/**
 * Builds the 1 TB M.2 2280 PCIe Gen 4.0 x4 NVMe SSD
 * Position: Lower Right Section (x: 2.3, z: 1.6)
 * Features:
 * - M.2 2280 form factor (22mm x 80mm standard proportions)
 * - M.2 Key-M angled surface-mount socket
 * - High-speed PCIe Gen 4.0 NVMe controller with nickel top
 * - 2x 512GB 3D TLC NAND Flash storage packages
 * - Dedicated 1GB LPDDR4 DRAM cache buffer IC
 * - Gold edge connector pins and keyed notch
 * - CNC silver screw standoff retention lock
 */
export function buildGamingSSD(parentGroup) {
  const ssdGroup = new THREE.Group();
  ssdGroup.name = 'gamingSSD';
  ssdGroup.position.set(2.3, 0.19, 1.6);

  // 1. M.2 Key-M Surface-Mount Socket (Top edge, connecting to PCB)
  const socketGeo = new THREE.BoxGeometry(0.72, 0.10, 0.35);
  const socketMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.5
  });
  const socket = new THREE.Mesh(socketGeo, socketMat);
  socket.position.set(0, 0.05, -1.05);
  ssdGroup.add(socket);

  // Gold connector pins inside socket
  const goldPinsGeo = new THREE.BoxGeometry(0.62, 0.03, 0.12);
  const goldPinsMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.95,
    roughness: 0.2
  });
  const goldPins = new THREE.Mesh(goldPinsGeo, goldPinsMat);
  goldPins.position.set(0, 0.06, -0.98);
  ssdGroup.add(goldPins);

  // 2. M.2 2280 PCB Stick (Narrow rectangular dark PCB)
  // Length: 2.1 units, Width: 0.62 units
  const ssdPcbGeo = new THREE.BoxGeometry(0.62, 0.04, 2.0);
  const ssdPcbMat = new THREE.MeshStandardMaterial({
    color: 0x064e3b, // Dark forest green NVMe PCB
    roughness: 0.4,
    metalness: 0.2
  });
  const ssdPcb = new THREE.Mesh(ssdPcbGeo, ssdPcbMat);
  ssdPcb.position.set(0, 0.09, 0);
  ssdPcb.castShadow = true;
  ssdGroup.add(ssdPcb);

  // Gold Finger Edge Connectors at head of SSD
  const goldEdgeGeo = new THREE.BoxGeometry(0.58, 0.02, 0.12);
  const goldEdge = new THREE.Mesh(goldEdgeGeo, goldPinsMat);
  goldEdge.position.set(0, 0.10, -0.94);
  ssdGroup.add(goldEdge);

  // Key-M notch cutout in gold edge
  const keyNotchGeo = new THREE.BoxGeometry(0.06, 0.03, 0.14);
  const keyNotchMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
  const keyNotch = new THREE.Mesh(keyNotchGeo, keyNotchMat);
  keyNotch.position.set(0.12, 0.10, -0.94);
  ssdGroup.add(keyNotch);

  // 3. PCIe 4.0 x4 SSD Controller IC (Metallic top for heat dissipation)
  const ctrlGeo = new THREE.BoxGeometry(0.44, 0.05, 0.44);
  const ctrlMat = new THREE.MeshStandardMaterial({
    color: 0x64748b, // Nickel-plated metal lid
    metalness: 0.92,
    roughness: 0.2
  });
  const controller = new THREE.Mesh(ctrlGeo, ctrlMat);
  controller.position.set(0, 0.13, -0.55);
  controller.castShadow = true;
  ssdGroup.add(controller);

  // 4. DRAM Cache IC (LPDDR4 1GB buffer)
  const dramGeo = new THREE.BoxGeometry(0.32, 0.035, 0.24);
  const dramMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.5
  });
  const dram = new THREE.Mesh(dramGeo, dramMat);
  dram.position.set(0, 0.12, -0.15);
  ssdGroup.add(dram);

  // 5. 2x 3D TLC NAND Flash Packages (512GB each)
  const nandGeo = new THREE.BoxGeometry(0.48, 0.06, 0.46);
  const nandMat = new THREE.MeshStandardMaterial({
    color: 0x18181b, // Black epoxy IC
    roughness: 0.45,
    metalness: 0.2
  });

  const nandZPositions = [0.28, 0.78];
  nandZPositions.forEach((nz) => {
    const nand = new THREE.Mesh(nandGeo, nandMat);
    nand.position.set(0, 0.13, nz);
    nand.castShadow = true;
    ssdGroup.add(nand);

    // Laser Pin-1 white/silver dot
    const dot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.01, 8),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9 })
    );
    dot.position.set(-0.18, 0.162, nz - 0.16);
    ssdGroup.add(dot);
  });

  // 6. Laser Printed Label Decal across the NVMe SSD
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 256;
  labelCanvas.height = 512;
  const ctx = labelCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 256, 512);
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('1TB NVMe Gen4', 20, 50);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '16px monospace';
    ctx.fillText('PCIe 4.0 x4', 20, 85);
    ctx.fillText('7000 MB/s READ', 20, 115);
    ctx.fillText('3D TLC NAND', 20, 145);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('SN: NV4-1024-STRIX', 20, 420);
    ctx.fillText('MODEL: M.2 2280', 20, 450);

    // QR code representation
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(160, 60, 60, 60);
  }

  const labelTex = new THREE.CanvasTexture(labelCanvas);
  const labelGeo = new THREE.PlaneGeometry(0.56, 1.8);
  const labelMat = new THREE.MeshBasicMaterial({
    map: labelTex,
    transparent: true,
    opacity: 0.90
  });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.rotation.x = -Math.PI / 2;
  labelMesh.position.set(0, 0.165, 0.05);
  ssdGroup.add(labelMesh);

  // 7. Mounting Screw Standoff & Screw (Tail end at z: 1.05)
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
