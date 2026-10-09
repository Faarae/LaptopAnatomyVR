import * as THREE from 'three';

/**
 * Builds the AMD Ryzen AI 9 HX 370 Processor (Zen 5 + 50 TOPS XDNA 2 NPU)
 * Position: Upper Center-Right (x: 1.7, z: -1.1)
 * Features:
 * - High-density FP8 mobile BGA package with dark charcoal substrate
 * - Metallic nickel-plated heat spreader with laser-engraved AMD Ryzen AI branding
 * - Integrated 50 TOPS Neural Processing Unit (NPU) and Radeon 890M iGPU
 * - Decoupling MLCC capacitor array around package
 * - Highlight plane for Pin 02 (CPU)
 */
export function buildCreatorCPU(parentGroup) {
  const cpuGroup = new THREE.Group();
  cpuGroup.name = 'creatorCPU';
  cpuGroup.position.set(1.7, 0.19, -1.1);

  // 1. Processor Substrate (Dark Charcoal / Brown AMD BGA package)
  const substrateGeo = new THREE.BoxGeometry(1.65, 0.08, 1.65);
  const substrateMat = new THREE.MeshStandardMaterial({
    color: 0x1c1917, // Dark charcoal substrate
    roughness: 0.35,
    metalness: 0.25
  });
  const substrate = new THREE.Mesh(substrateGeo, substrateMat);
  substrate.position.y = 0.04;
  substrate.castShadow = true;
  substrate.receiveShadow = true;
  cpuGroup.add(substrate);

  // Gold Pin 1 Triangle
  const cornerMarkGeo = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    -0.75, 0.082, -0.75,
    -0.52, 0.082, -0.75,
    -0.75, 0.082, -0.52
  ]);
  cornerMarkGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  const cornerMarkMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide });
  const cornerMark = new THREE.Mesh(cornerMarkGeo, cornerMarkMat);
  cpuGroup.add(cornerMark);

  // 2. Metallic Heat Spreader (IHS)
  const ihsGeo = new THREE.BoxGeometry(1.25, 0.12, 1.25);
  const ihsMat = new THREE.MeshStandardMaterial({
    color: 0xd1d5db, // Nickel-plated copper heat spreader
    metalness: 0.92,
    roughness: 0.18
  });
  const ihs = new THREE.Mesh(ihsGeo, ihsMat);
  ihs.position.y = 0.12;
  ihs.castShadow = true;
  cpuGroup.add(ihs);

  // 3. Laser Engraved CPU Decal
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 512;
  labelCanvas.height = 512;
  const ctx = labelCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#d1d5db';
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#ea580c'; // AMD Orange accent
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('AMD', 60, 95);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 30px monospace';
    ctx.fillText('RYZEN AI 9', 60, 150);
    ctx.font = '22px monospace';
    ctx.fillText('HX 370 5.1GHz', 60, 200);
    ctx.fillStyle = '#0284c7';
    ctx.fillText('XDNA 2 NPU • 50 TOPS', 60, 245);
    ctx.fillStyle = '#334155';
    ctx.font = '18px monospace';
    ctx.fillText('12C / 24T • ZEN 5', 60, 290);
    ctx.fillText('RADEON 890M GRAPHICS', 60, 330);

    // AMD Zen Circle icon
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(400, 390, 45, 0, Math.PI * 1.85);
    ctx.stroke();
  }

  const labelTex = new THREE.CanvasTexture(labelCanvas);
  labelTex.anisotropy = 4;
  const labelGeo = new THREE.PlaneGeometry(1.20, 1.20);
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTex,
    metalness: 0.85,
    roughness: 0.22,
  });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.rotation.x = -Math.PI / 2;
  labelMesh.position.y = 0.181;
  cpuGroup.add(labelMesh);

  // 4. Peripheral SMD Decoupling Capacitors
  const capGeo = new THREE.BoxGeometry(0.08, 0.04, 0.05);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
  
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const rad = 0.74;
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(Math.cos(angle) * rad, 0.08, Math.sin(angle) * rad);
    cap.rotation.y = angle;
    cpuGroup.add(cap);
  }

  // 5. Highlight Halo Plane
  const highlightGeo = new THREE.PlaneGeometry(1.9, 1.9);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.y = 0.01;
  highlightMesh.name = 'cpuHighlight';
  cpuGroup.add(highlightMesh);

  parentGroup.add(cpuGroup);
  return cpuGroup;
}
