import * as THREE from 'three';

/**
 * Builds the 16 GB DDR4-3200 Soldered Onboard Memory (4x 4GB BGA ICs)
 * Position: Center-Middle Section (x: 0.2, z: 0.6)
 * Features:
 * - 4x Soldered BGA memory packages directly surface-mounted onto PCB
 * - Permanent dual-channel 128-bit bus topology (No SO-DIMM sockets)
 * - Laser markings ("DDR4 4GB 3200 MT/s 1.2V")
 * - Gold pin 1 orientation dots
 * - Direct high-frequency memory bus trace lines to CPU
 */
export function buildEntryRAM(parentGroup) {
  const ramGroup = new THREE.Group();
  ramGroup.name = 'entryRAM';
  ramGroup.position.set(0.2, 0.17, 0.6);

  // 4x Soldered DDR4 BGA Memory IC Packages
  const memChipGeo = new THREE.BoxGeometry(0.52, 0.05, 0.38);
  const memChipMat = new THREE.MeshStandardMaterial({
    color: 0x111827, // Dark epoxy package
    roughness: 0.45,
    metalness: 0.2
  });

  const chipPositions = [
    [-0.95, -0.18], [-0.32, -0.18],
    [0.32, -0.18],  [0.95, -0.18]
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
    dot.position.set(cx - 0.20, 0.07, cz - 0.13);
    ramGroup.add(dot);

    // Laser Decal
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 256;
    labelCanvas.height = 160;
    const ctx = labelCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, 256, 160);
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 24px monospace';
      ctx.fillText('DDR4 4GB', 20, 55);
      ctx.fillText('3200 MT/s', 20, 95);
      ctx.fillStyle = '#22c55e';
      ctx.font = '18px monospace';
      ctx.fillText(`CH-${idx < 2 ? 'A' : 'B'} 1.2V`, 20, 135);
    }
    const labelTex = new THREE.CanvasTexture(labelCanvas);
    const labelMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.46, 0.32),
      new THREE.MeshBasicMaterial({ map: labelTex })
    );
    labelMesh.rotation.x = -Math.PI / 2;
    labelMesh.position.set(cx, 0.068, cz);
    ramGroup.add(labelMesh);
  });

  // Highlight Plane for Soldered RAM (Pin 04)
  const highlightGeo = new THREE.PlaneGeometry(2.8, 0.9);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.set(0, 0.01, -0.18);
  highlightMesh.name = 'ramHighlight';
  ramGroup.add(highlightMesh);

  parentGroup.add(ramGroup);
  return ramGroup;
}
