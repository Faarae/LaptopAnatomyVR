import * as THREE from 'three';

/**
 * Builds the NVIDIA GeForce RTX 4070 Laptop GPU (Ada Lovelace Studio Edition) + 8GB GDDR6 VRAM
 * Position: Upper Center-Left (x: -1.7, z: -1.1)
 * Features:
 * - Dedicated BGA package with dark charcoal substrate
 * - AD106 bare silicon die with mirror finish and NVIDIA Studio green trim
 * - 4x surrounding GDDR6 VRAM IC chips (2GB each = 8GB total)
 * - Laser-etched GPU & Studio VRAM markings
 * - Decoupling MLCC capacitor array
 * - Highlight plane for Pin 01 (GPU)
 */
export function buildCreatorGPU(parentGroup) {
  const gpuGroup = new THREE.Group();
  gpuGroup.name = 'creatorGPU';
  gpuGroup.position.set(-1.7, 0.19, -1.1);

  // 1. GPU Substrate (Dark Charcoal / Black BGA)
  const substrateGeo = new THREE.BoxGeometry(1.85, 0.08, 1.85);
  const substrateMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.35,
    metalness: 0.25
  });
  const substrate = new THREE.Mesh(substrateGeo, substrateMat);
  substrate.position.y = 0.04;
  substrate.castShadow = true;
  substrate.receiveShadow = true;
  gpuGroup.add(substrate);

  // Gold alignment pin marker
  const pin1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.02, 12),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 })
  );
  pin1.position.set(-0.78, 0.09, -0.78);
  gpuGroup.add(pin1);

  // 2. Bare Silicon GPU Die (AD106-350-A1) with Mirror Silicon Finish
  const dieGeo = new THREE.BoxGeometry(1.10, 0.08, 1.00);
  const dieMat = new THREE.MeshStandardMaterial({
    color: 0x334155, // Mirror silicon finish
    metalness: 0.96,
    roughness: 0.12
  });
  const die = new THREE.Mesh(dieGeo, dieMat);
  die.position.y = 0.10;
  die.castShadow = true;
  gpuGroup.add(die);

  // Green NVIDIA Accent Trim
  const trim = new THREE.Mesh(
    new THREE.BoxGeometry(1.18, 0.02, 1.08),
    new THREE.MeshBasicMaterial({ color: 0x22c55e })
  );
  trim.position.y = 0.06;
  gpuGroup.add(trim);

  // 3. Laser Engraved GPU Silicon Die Label
  const gpuCanvas = document.createElement('canvas');
  gpuCanvas.width = 512;
  gpuCanvas.height = 512;
  const ctx = gpuCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('NVIDIA', 180, 105);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 30px monospace';
    ctx.fillText('GEFORCE RTX', 130, 160);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '22px monospace';
    ctx.fillText('RTX 4070 STUDIO', 130, 210);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('AD106-350-A1', 150, 255);
    ctx.fillText('4608 CUDA • DUAL AV1', 115, 300);
    ctx.fillText('STUDIO DRIVERS VALIDATED', 85, 345);

    // Studio Palette icon
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(256, 425, 35, 0, Math.PI * 2);
    ctx.stroke();
  }

  const gpuTex = new THREE.CanvasTexture(gpuCanvas);
  gpuTex.anisotropy = 4;
  const dieLabelGeo = new THREE.PlaneGeometry(1.05, 0.95);
  const dieLabelMat = new THREE.MeshStandardMaterial({
    map: gpuTex,
    metalness: 0.9,
    roughness: 0.15
  });
  const dieLabelMesh = new THREE.Mesh(dieLabelGeo, dieLabelMat);
  dieLabelMesh.rotation.x = -Math.PI / 2;
  dieLabelMesh.position.y = 0.141;
  gpuGroup.add(dieLabelMesh);

  // 4. Surrounding GDDR6 VRAM Packages (4x 2GB = 8GB GDDR6)
  const vramGeo = new THREE.BoxGeometry(0.55, 0.06, 0.42);
  const vramMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.45,
    metalness: 0.2
  });

  const vramPositions = [
    [-1.20, 0],     // Left
    [1.20, 0],      // Right
    [-0.35, -1.20], // Top Left
    [0.35, -1.20]   // Top Right
  ];

  vramPositions.forEach(([vx, vz]) => {
    const vramMesh = new THREE.Mesh(vramGeo, vramMat);
    vramMesh.position.set(vx, 0.05, vz);
    if (Math.abs(vx) > 1.0) {
      vramMesh.rotation.y = Math.PI / 2;
    }
    vramMesh.castShadow = true;
    gpuGroup.add(vramMesh);

    // Silver pin 1 dot
    const dot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.01, 8),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9 })
    );
    dot.position.set(vx - 0.18, 0.082, vz - 0.12);
    gpuGroup.add(dot);

    // VRAM Text Label
    const vramCanvas = document.createElement('canvas');
    vramCanvas.width = 256;
    vramCanvas.height = 128;
    const vctx = vramCanvas.getContext('2d');
    if (vctx) {
      vctx.fillStyle = '#18181b';
      vctx.fillRect(0, 0, 256, 128);
      vctx.fillStyle = '#38bdf8';
      vctx.font = 'bold 22px monospace';
      vctx.fillText('GDDR6 2GB', 20, 50);
      vctx.fillText('16 Gbps 128B', 20, 90);
    }
    const vramTex = new THREE.CanvasTexture(vramCanvas);
    const vramLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(0.48, 0.35),
      new THREE.MeshBasicMaterial({ map: vramTex })
    );
    vramLabel.rotation.x = -Math.PI / 2;
    if (Math.abs(vx) > 1.0) {
      vramLabel.rotation.z = Math.PI / 2;
    }
    vramLabel.position.set(vx, 0.081, vz);
    gpuGroup.add(vramLabel);
  });

  // 5. MLCC Capacitors
  const mlccGeo = new THREE.BoxGeometry(0.06, 0.03, 0.04);
  const mlccMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.2 });
  
  for (let i = 0; i < 10; i++) {
    const mlcc = new THREE.Mesh(mlccGeo, mlccMat);
    const angle = (i / 10) * Math.PI * 2;
    mlcc.position.set(Math.cos(angle) * 0.74, 0.07, Math.sin(angle) * 0.74);
    mlcc.rotation.y = angle;
    gpuGroup.add(mlcc);
  }

  // 6. Highlight Plane (for Pin 01 selection)
  const highlightGeo = new THREE.PlaneGeometry(2.8, 2.8);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.y = 0.01;
  highlightMesh.name = 'gpuHighlight';
  gpuGroup.add(highlightMesh);

  parentGroup.add(gpuGroup);
  return gpuGroup;
}
