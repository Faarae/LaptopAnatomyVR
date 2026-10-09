import * as THREE from 'three';

/**
 * Builds the 512 GB M.2 2280 PCIe Gen 3.0 x4 NVMe SSD
 * Position: Lower Right Section (x: 2.4, z: 1.4)
 * Features:
 * - M.2 2280 standard form factor
 * - Surface mount M.2 Key-M socket
 * - 4-channel PCIe 3.0 NVMe controller IC
 * - 512 GB 3D TLC NAND flash storage package
 * - Gold edge connector fingers and retention screw
 */
export function buildEntrySSD(parentGroup) {
  const ssdGroup = new THREE.Group();
  ssdGroup.name = 'entrySSD';
  ssdGroup.position.set(2.4, 0.17, 1.4);

  // 1. M.2 Key-M Surface-Mount Socket
  const socketGeo = new THREE.BoxGeometry(0.68, 0.09, 0.32);
  const socketMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  const socket = new THREE.Mesh(socketGeo, socketMat);
  socket.position.set(0, 0.045, -0.95);
  ssdGroup.add(socket);

  // Gold connector pins inside socket
  const goldPins = new THREE.Mesh(
    new THREE.BoxGeometry(0.58, 0.02, 0.10),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.2 })
  );
  goldPins.position.set(0, 0.055, -0.88);
  ssdGroup.add(goldPins);

  // 2. M.2 2280 PCB Stick
  const ssdPcbGeo = new THREE.BoxGeometry(0.58, 0.035, 1.85);
  const ssdPcbMat = new THREE.MeshStandardMaterial({
    color: 0x064e3b, // Dark green NVMe PCB
    roughness: 0.4,
    metalness: 0.2
  });
  const ssdPcb = new THREE.Mesh(ssdPcbGeo, ssdPcbMat);
  ssdPcb.position.set(0, 0.08, 0);
  ssdPcb.castShadow = true;
  ssdGroup.add(ssdPcb);

  // Gold Finger Edge Connectors at head of SSD
  const goldEdge = new THREE.Mesh(
    new THREE.BoxGeometry(0.54, 0.02, 0.10),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95 })
  );
  goldEdge.position.set(0, 0.09, -0.86);
  ssdGroup.add(goldEdge);

  // 3. PCIe 3.0 SSD Controller IC
  const ctrlGeo = new THREE.BoxGeometry(0.40, 0.04, 0.40);
  const ctrlMat = new THREE.MeshStandardMaterial({
    color: 0x475569, // Metal capped controller
    metalness: 0.9,
    roughness: 0.25
  });
  const controller = new THREE.Mesh(ctrlGeo, ctrlMat);
  controller.position.set(0, 0.11, -0.45);
  controller.castShadow = true;
  ssdGroup.add(controller);

  // 4. 512 GB 3D TLC NAND Flash Package
  const nandGeo = new THREE.BoxGeometry(0.46, 0.05, 0.52);
  const nandMat = new THREE.MeshStandardMaterial({
    color: 0x18181b, // Black epoxy IC
    roughness: 0.45,
    metalness: 0.2
  });
  const nand = new THREE.Mesh(nandGeo, nandMat);
  nand.position.set(0, 0.11, 0.25);
  nand.castShadow = true;
  ssdGroup.add(nand);

  // Laser Decal on SSD
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 256;
  labelCanvas.height = 512;
  const ctx = labelCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 256, 512);
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('512GB NVMe', 20, 55);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '18px monospace';
    ctx.fillText('PCIe 3.0 x4', 20, 95);
    ctx.fillText('3500 MB/s READ', 20, 130);
    ctx.fillText('3D TLC NAND', 20, 165);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('MODEL: M.2 2280', 20, 440);
  }
  const labelTex = new THREE.CanvasTexture(labelCanvas);
  const labelMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.52, 1.65),
    new THREE.MeshBasicMaterial({ map: labelTex, transparent: true, opacity: 0.90 })
  );
  labelMesh.rotation.x = -Math.PI / 2;
  labelMesh.position.set(0, 0.142, 0.05);
  ssdGroup.add(labelMesh);

  // 5. Standoff & Mounting Screw at tail end (z: 0.95)
  const standoff = new THREE.Mesh(
    new THREE.CylinderGeometry(0.10, 0.10, 0.10, 14),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 })
  );
  standoff.position.set(0, 0.05, 0.95);
  ssdGroup.add(standoff);

  const screw = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.035, 14),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 })
  );
  screw.position.set(0, 0.11, 0.95);
  ssdGroup.add(screw);

  // Highlight Plane for SSD (Pin 03)
  const highlightGeo = new THREE.PlaneGeometry(1.1, 2.4);
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
