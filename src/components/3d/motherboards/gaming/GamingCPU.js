import * as THREE from 'three';

/**
 * Builds the Intel Core i7-14650HX High-Performance Mobile CPU
 * Position: Upper Center-Right (x: 1.8, z: -1.2)
 * Features:
 * - High-density BGA1964 substrate with gold perimeter test pads
 * - Metallic nickel-plated heat spreader with laser-etched markings
 * - Thermal paste interface barrier
 * - Surrounding decoupling SMD capacitor arrays
 */
export function buildGamingCPU(parentGroup) {
  const cpuGroup = new THREE.Group();
  cpuGroup.name = 'gamingCPU';
  cpuGroup.position.set(1.8, 0.19, -1.2);

  // 1. Processor Substrate (Dark Green / Blue multi-layer package)
  const substrateGeo = new THREE.BoxGeometry(1.7, 0.08, 1.7);
  const substrateMat = new THREE.MeshStandardMaterial({
    color: 0x064e3b, // Dark emerald green BGA substrate
    roughness: 0.35,
    metalness: 0.2
  });
  const substrate = new THREE.Mesh(substrateGeo, substrateMat);
  substrate.position.y = 0.04;
  substrate.castShadow = true;
  substrate.receiveShadow = true;
  cpuGroup.add(substrate);

  // Substrate Gold Corner Alignment Triangle & Pin 1 Indicator
  const cornerMarkGeo = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    -0.78, 0.082, -0.78,
    -0.55, 0.082, -0.78,
    -0.78, 0.082, -0.55
  ]);
  cornerMarkGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  const cornerMarkMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide });
  const cornerMark = new THREE.Mesh(cornerMarkGeo, cornerMarkMat);
  cpuGroup.add(cornerMark);

  // 2. Metallic Integrated Heat Spreader (IHS) / Die Plate
  const ihsGeo = new THREE.BoxGeometry(1.3, 0.12, 1.3);
  const ihsMat = new THREE.MeshStandardMaterial({
    color: 0xd1d5db, // Nickel-plated copper heat spreader
    metalness: 0.92,
    roughness: 0.18
  });
  const ihs = new THREE.Mesh(ihsGeo, ihsMat);
  ihs.position.y = 0.12;
  ihs.castShadow = true;
  cpuGroup.add(ihs);

  // 3. Laser-Engraved CPU Label Canvas
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 512;
  labelCanvas.height = 512;
  const ctx = labelCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#d1d5db';
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('intel.', 60, 100);
    ctx.font = 'bold 32px monospace';
    ctx.fillText('CORE i7', 60, 160);
    ctx.font = '22px monospace';
    ctx.fillText('i7-14650HX', 60, 210);
    ctx.fillText('SRMC9 2.20GHz', 60, 250);
    ctx.fillText('16C / 24T • 55W', 60, 290);
    ctx.fillText('BGA1964 14TH GEN', 60, 330);
    
    // Laser 2D DataMatrix barcode pattern
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(360, 340, 90, 90);
    ctx.fillStyle = '#d1d5db';
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if ((r + c) % 2 === 0) {
          ctx.fillRect(370 + c * 18, 350 + r * 18, 12, 12);
        }
      }
    }
  }

  const labelTex = new THREE.CanvasTexture(labelCanvas);
  labelTex.anisotropy = 4;
  const labelGeo = new THREE.PlaneGeometry(1.24, 1.24);
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTex,
    metalness: 0.85,
    roughness: 0.22,
  });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.rotation.x = -Math.PI / 2;
  labelMesh.position.y = 0.181;
  cpuGroup.add(labelMesh);

  // 4. Peripheral SMD Decoupling Capacitors around CPU perimeter
  const capGeo = new THREE.BoxGeometry(0.08, 0.04, 0.05);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
  
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const rad = 0.76;
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(Math.cos(angle) * rad, 0.08, Math.sin(angle) * rad);
    cap.rotation.y = angle;
    cpuGroup.add(cap);
  }

  // 5. Highlight Halo Plane (for selection)
  const highlightGeo = new THREE.PlaneGeometry(2.0, 2.0);
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
