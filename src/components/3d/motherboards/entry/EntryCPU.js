import * as THREE from 'three';

/**
 * Builds the Intel Core i5-1335U Processor (with Integrated Intel Iris Xe Graphics)
 * Position: Upper Center (x: 0.2, z: -1.0)
 * Features:
 * - Ultra-low voltage BGA1744 package with dark green substrate
 * - Polished nickel-plated heat spreader with laser-engraved Intel Core i5 and Iris Xe markings
 * - Integrates both CPU compute cores and 80-EU Iris Xe GPU on the same silicon die
 * - Decoupling capacitors around package perimeter
 * - Highlights for Pin 01 (Integrated GPU) and Pin 02 (CPU)
 */
export function buildEntryCPU(parentGroup) {
  const cpuGroup = new THREE.Group();
  cpuGroup.name = 'entryCPU';
  cpuGroup.position.set(0.2, 0.17, -1.0);

  // 1. Processor Substrate (Dark Green BGA package)
  const substrateGeo = new THREE.BoxGeometry(1.5, 0.07, 1.3);
  const substrateMat = new THREE.MeshStandardMaterial({
    color: 0x064e3b, // Dark green BGA substrate
    roughness: 0.35,
    metalness: 0.2
  });
  const substrate = new THREE.Mesh(substrateGeo, substrateMat);
  substrate.position.y = 0.035;
  substrate.castShadow = true;
  substrate.receiveShadow = true;
  cpuGroup.add(substrate);

  // Gold Pin 1 alignment triangle
  const cornerMarkGeo = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    -0.68, 0.072, -0.58,
    -0.48, 0.072, -0.58,
    -0.68, 0.072, -0.38
  ]);
  cornerMarkGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  const cornerMarkMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide });
  const cornerMark = new THREE.Mesh(cornerMarkGeo, cornerMarkMat);
  cpuGroup.add(cornerMark);

  // 2. Metallic Integrated Heat Spreader (IHS)
  const ihsGeo = new THREE.BoxGeometry(1.15, 0.10, 0.95);
  const ihsMat = new THREE.MeshStandardMaterial({
    color: 0xd1d5db, // Nickel-plated copper heat spreader
    metalness: 0.92,
    roughness: 0.18
  });
  const ihs = new THREE.Mesh(ihsGeo, ihsMat);
  ihs.position.y = 0.10;
  ihs.castShadow = true;
  cpuGroup.add(ihs);

  // 3. Laser Engraved Markings Decal
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 512;
  labelCanvas.height = 384;
  const ctx = labelCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#d1d5db';
    ctx.fillRect(0, 0, 512, 384);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('intel.', 40, 70);
    ctx.font = 'bold 30px monospace';
    ctx.fillText('CORE i5', 40, 120);
    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('Iris Xe Graphics', 40, 165);
    ctx.fillStyle = '#334155';
    ctx.font = '20px monospace';
    ctx.fillText('i5-1335U 1.30GHz', 40, 210);
    ctx.fillText('10C / 12T • 15W BASE', 40, 250);
    ctx.fillText('BGA1744 INTEL 7', 40, 290);

    // 2D Matrix code pattern
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(360, 220, 80, 80);
    ctx.fillStyle = '#d1d5db';
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if ((r + c) % 2 === 0) {
          ctx.fillRect(370 + c * 20, 230 + r * 20, 14, 14);
        }
      }
    }
  }

  const labelTex = new THREE.CanvasTexture(labelCanvas);
  labelTex.anisotropy = 4;
  const labelGeo = new THREE.PlaneGeometry(1.10, 0.90);
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTex,
    metalness: 0.85,
    roughness: 0.22,
  });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.rotation.x = -Math.PI / 2;
  labelMesh.position.y = 0.151;
  cpuGroup.add(labelMesh);

  // 4. Decoupling capacitors around CPU package
  const capGeo = new THREE.BoxGeometry(0.06, 0.03, 0.04);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
  
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const rad = 0.65;
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(Math.cos(angle) * rad, 0.07, Math.sin(angle) * (rad * 0.85));
    cap.rotation.y = angle;
    cpuGroup.add(cap);
  }

  // 5. Highlight Halo Planes (for CPU and iGPU selection)
  const highlightGeo = new THREE.PlaneGeometry(1.8, 1.6);
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
