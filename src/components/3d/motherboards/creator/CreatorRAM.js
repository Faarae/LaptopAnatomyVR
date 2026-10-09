import * as THREE from 'three';

/**
 * Builds the 32 GB LPDDR5X-7500 Soldered High-Bandwidth Unified Memory (4x 8GB BGA ICs)
 * Position: Center-Middle Section (x: 0.0, z: 0.7)
 * Features:
 * - 4x Soldered LPDDR5X BGA packages directly surface-mounted around CPU
 * - Quad 32-bit independent subchannels (128-bit total) delivering 120 GB/s bandwidth
 * - Laser markings ("LPDDR5X 8GB 7500 MT/s 0.9V")
 * - Gold pin 1 orientation dots
 * - Direct ultra-dense high-frequency memory bus trace lines
 */
export function buildCreatorRAM(parentGroup) {
  const ramGroup = new THREE.Group();
  ramGroup.name = 'creatorRAM';
  ramGroup.position.set(0.0, 0.19, 0.7);

  // 4x Soldered LPDDR5X BGA Memory IC Packages
  const memChipGeo = new THREE.BoxGeometry(0.56, 0.05, 0.42);
  const memChipMat = new THREE.MeshStandardMaterial({
    color: 0x111827,
    roughness: 0.45,
    metalness: 0.2
  });

  const chipPositions = [
    [-1.05, -0.15], [-0.35, -0.15],
    [0.35, -0.15],  [1.05, -0.15]
  ];

  chipPositions.forEach(([cx, cz], idx) => {
    const chip = new THREE.Mesh(memChipGeo, memChipMat);
    chip.position.set(cx, 0.04, cz);
    chip.castShadow = true;
    ramGroup.add(chip);

    // Gold Pin 1 Dot
    const dot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.01, 8),
      new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 })
    );
    dot.position.set(cx - 0.22, 0.07, cz - 0.15);
    ramGroup.add(dot);

    // Laser Decal
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 256;
    labelCanvas.height = 160;
    const ctx = labelCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, 256, 160);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('LPDDR5X 8GB', 20, 50);
      ctx.fillText('7500 MT/s', 20, 90);
      ctx.fillStyle = '#facc15';
      ctx.font = '16px monospace';
      ctx.fillText(`SUB-CH ${idx + 1} • 0.9V`, 20, 130);
    }
    const labelTex = new THREE.CanvasTexture(labelCanvas);
    const labelMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.50, 0.36),
      new THREE.MeshBasicMaterial({ map: labelTex })
    );
    labelMesh.rotation.x = -Math.PI / 2;
    labelMesh.position.set(cx, 0.068, cz);
    ramGroup.add(labelMesh);
  });

  // Highlight Plane for Soldered LPDDR5X (Pin 04)
  const highlightGeo = new THREE.PlaneGeometry(3.0, 1.0);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.set(0, 0.01, -0.15);
  highlightMesh.name = 'ramHighlight';
  ramGroup.add(highlightMesh);

  parentGroup.add(ramGroup);
  return ramGroup;
}
