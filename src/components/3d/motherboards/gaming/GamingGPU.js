import * as THREE from 'three';

/**
 * Builds the NVIDIA GeForce RTX 4060 Laptop GPU (Ada Lovelace) + 8GB GDDR6 VRAM
 * Position: Upper Center-Left (x: -1.8, z: -1.2)
 * Features:
 * - Dedicated BGA package with dark substrate
 * - Bare metallic silicon die (AD107) with NVIDIA green trim
 * - 4x surrounding GDDR6 VRAM IC chips (2GB each = 8GB total)
 * - Laser-etched GPU & VRAM markings
 * - Decoupling MLCC capacitor array directly on package
 */
export function buildGamingGPU(parentGroup) {
  const gpuGroup = new THREE.Group();
  gpuGroup.name = 'gamingGPU';
  gpuGroup.position.set(-1.8, 0.19, -1.2);

  // 1. GPU Substrate (Dark Green / Black high-density multi-layer BGA)
  const substrateGeo = new THREE.BoxGeometry(1.8, 0.08, 1.8);
  const substrateMat = new THREE.MeshStandardMaterial({
    color: 0x0a1f18, // Deep gaming dark substrate
    roughness: 0.35,
    metalness: 0.25
  });
  const substrate = new THREE.Mesh(substrateGeo, substrateMat);
  substrate.position.y = 0.04;
  substrate.castShadow = true;
  substrate.receiveShadow = true;
  gpuGroup.add(substrate);

  // Gold alignment pin marker
  const pin1Geo = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 12);
  const pin1Mat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 });
  const pin1Mesh = new THREE.Mesh(pin1Geo, pin1Mat);
  pin1Mesh.position.set(-0.76, 0.09, -0.76);
  gpuGroup.add(pin1Mesh);

  // 2. Bare Silicon GPU Die (AD107-400-A1) with Mirror Silicon Finish
  const dieGeo = new THREE.BoxGeometry(1.05, 0.08, 0.95);
  const dieMat = new THREE.MeshStandardMaterial({
    color: 0x334155, // Shiny dark silicon
    metalness: 0.96,
    roughness: 0.12
  });
  const die = new THREE.Mesh(dieGeo, dieMat);
  die.position.y = 0.10;
  die.castShadow = true;
  gpuGroup.add(die);

  // Die Green Accent Trim (NVIDIA Signature Green)
  const trimGeo = new THREE.BoxGeometry(1.12, 0.02, 1.02);
  const trimMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
  const trim = new THREE.Mesh(trimGeo, trimMat);
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
    ctx.fillText('NVIDIA', 180, 110);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 30px monospace';
    ctx.fillText('GEFORCE RTX', 130, 170);
    ctx.font = '22px monospace';
    ctx.fillText('RTX 4060 LAPTOP', 130, 220);
    ctx.fillText('AD107-400-A1', 150, 260);
    ctx.fillText('TAIWAN 2342A1', 145, 300);
    ctx.fillText('3072 CUDA • 140W', 130, 340);

    // Green GPU Logo icon
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(256, 420, 40, 0, Math.PI * 2);
    ctx.stroke();
  }

  const gpuTex = new THREE.CanvasTexture(gpuCanvas);
  gpuTex.anisotropy = 4;
  const dieLabelGeo = new THREE.PlaneGeometry(1.0, 0.9);
  const dieLabelMat = new THREE.MeshStandardMaterial({
    map: gpuTex,
    metalness: 0.9,
    roughness: 0.15
  });
  const dieLabelMesh = new THREE.Mesh(dieLabelGeo, dieLabelMat);
  dieLabelMesh.rotation.x = -Math.PI / 2;
  dieLabelMesh.position.y = 0.141;
  gpuGroup.add(dieLabelMesh);

  // 4. Surrounding GDDR6 VRAM Packages (4x 2GB chips = 8GB GDDR6)
  // Positioned tightly around the GPU (top, bottom, left, right)
  const vramGeo = new THREE.BoxGeometry(0.55, 0.06, 0.42);
  const vramMat = new THREE.MeshStandardMaterial({
    color: 0x18181b, // Black epoxy IC package
    roughness: 0.5,
    metalness: 0.2
  });

  const vramPositions = [
    [-1.15, 0],   // Left VRAM
    [1.15, 0],    // Right VRAM
    [-0.35, -1.15], // Top Left VRAM
    [0.35, -1.15]   // Top Right VRAM
  ];

  vramPositions.forEach(([vx, vz], idx) => {
    const vramMesh = new THREE.Mesh(vramGeo, vramMat);
    vramMesh.position.set(vx, 0.05, vz);
    if (Math.abs(vx) > 1.0) {
      vramMesh.rotation.y = Math.PI / 2;
    }
    vramMesh.castShadow = true;
    gpuGroup.add(vramMesh);

    // Silver pin 1 dot on each VRAM
    const dotGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 8);
    const dotMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9 });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.position.set(vx - 0.18, 0.082, vz - 0.12);
    gpuGroup.add(dotMesh);

    // VRAM Text Label (Laser marking)
    const vramCanvas = document.createElement('canvas');
    vramCanvas.width = 256;
    vramCanvas.height = 128;
    const vctx = vramCanvas.getContext('2d');
    if (vctx) {
      vctx.fillStyle = '#18181b';
      vctx.fillRect(0, 0, 256, 128);
      vctx.fillStyle = '#94a3b8';
      vctx.font = 'bold 22px monospace';
      vctx.fillText('GDDR6 2GB', 20, 50);
      vctx.fillText('16 Gbps 128B', 20, 90);
    }
    const vramTex = new THREE.CanvasTexture(vramCanvas);
    const vramLabelGeo = new THREE.PlaneGeometry(0.48, 0.35);
    const vramLabelMat = new THREE.MeshBasicMaterial({ map: vramTex });
    const vramLabel = new THREE.Mesh(vramLabelGeo, vramLabelMat);
    vramLabel.rotation.x = -Math.PI / 2;
    if (Math.abs(vx) > 1.0) {
      vramLabel.rotation.z = Math.PI / 2;
    }
    vramLabel.position.set(vx, 0.081, vz);
    gpuGroup.add(vramLabel);
  });

  // 5. MLCC Decoupling Capacitors around GPU die
  const mlccGeo = new THREE.BoxGeometry(0.06, 0.03, 0.04);
  const mlccMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.2 });
  
  for (let i = 0; i < 10; i++) {
    const mlcc = new THREE.Mesh(mlccGeo, mlccMat);
    const angle = (i / 10) * Math.PI * 2;
    mlcc.position.set(Math.cos(angle) * 0.72, 0.07, Math.sin(angle) * 0.72);
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
