import * as THREE from 'three';

/**
 * Builds the Dual-Channel DDR5 SO-DIMM System Memory (16 GB: 2 x 8 GB)
 * Position: Center-Middle Section (x: 0.0, z: 0.8)
 * Features:
 * - 2x Stacked/Stepped metal-shielded SO-DIMM 262-pin sockets
 * - 2x Removable DDR5 SO-DIMM memory sticks with gold edge connector fingers
 * - 4x DDR5 BGA memory IC chips per stick (8 total)
 * - Onboard Power Management IC (PMIC) and SPD Hub
 * - Manufacturer capacity label ("8GB DDR5 5600 MT/s 1.1V")
 * - Metal locking retention side latches
 */
export function buildGamingRAM(parentGroup) {
  const ramGroup = new THREE.Group();
  ramGroup.name = 'gamingRAM';
  ramGroup.position.set(0.0, 0.19, 0.8);

  // 1. Dual SO-DIMM Metal Shielded Socket Enclosures
  // Two slots positioned horizontally one in front of the other
  const slotZOffsets = [-0.35, 0.35];

  slotZOffsets.forEach((sz, slotIdx) => {
    const socketBase = new THREE.Group();
    socketBase.position.set(0, 0, sz);

    // Socket Black Plastic Base Frame
    const baseFrameGeo = new THREE.BoxGeometry(2.8, 0.08, 0.55);
    const baseFrameMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6
    });
    const baseFrame = new THREE.Mesh(baseFrameGeo, baseFrameMat);
    baseFrame.position.y = 0.04;
    socketBase.add(baseFrame);

    // Nickel-plated side retention clips (spring latches on left and right)
    const clipGeo = new THREE.BoxGeometry(0.12, 0.14, 0.22);
    const clipMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1
    });

    [-1.42, 1.42].forEach(cx => {
      const clip = new THREE.Mesh(clipGeo, clipMat);
      clip.position.set(cx, 0.08, 0);
      socketBase.add(clip);
    });

    // 2. DDR5 SO-DIMM Module PCB (Green/Black PCB stick)
    const stickGeo = new THREE.BoxGeometry(2.65, 0.04, 0.46);
    const stickMat = new THREE.MeshStandardMaterial({
      color: 0x0f382c, // Dark emerald green memory PCB
      roughness: 0.4,
      metalness: 0.2
    });
    const stick = new THREE.Mesh(stickGeo, stickMat);
    stick.position.set(0, 0.10, 0);
    stick.castShadow = true;
    socketBase.add(stick);

    // Gold Finger Contacts edge along inner border
    const goldEdgeGeo = new THREE.BoxGeometry(2.5, 0.02, 0.06);
    const goldEdgeMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Gold plated pins
      metalness: 0.95,
      roughness: 0.2
    });
    const goldEdge = new THREE.Mesh(goldEdgeGeo, goldEdgeMat);
    goldEdge.position.set(0, 0.09, -0.22);
    socketBase.add(goldEdge);

    // Keyed Notch in gold fingers (DDR5 center notch position)
    const notchGeo = new THREE.BoxGeometry(0.08, 0.03, 0.08);
    const notchMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const notch = new THREE.Mesh(notchGeo, notchMat);
    notch.position.set(-0.15, 0.095, -0.22);
    socketBase.add(notch);

    // 3. DDR5 Memory IC Chips (4x 2GB BGA chips per stick)
    const memChipGeo = new THREE.BoxGeometry(0.38, 0.04, 0.32);
    const memChipMat = new THREE.MeshStandardMaterial({
      color: 0x111827, // Black epoxy IC
      roughness: 0.45,
      metalness: 0.25
    });

    const chipXPositions = [-0.95, -0.38, 0.38, 0.95];
    chipXPositions.forEach((cx) => {
      const chip = new THREE.Mesh(memChipGeo, memChipMat);
      chip.position.set(cx, 0.13, 0);
      chip.castShadow = true;
      socketBase.add(chip);

      // Gold pin-1 dot
      const dot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.01, 8),
        new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 })
      );
      dot.position.set(cx - 0.14, 0.152, -0.11);
      socketBase.add(dot);
    });

    // 4. DDR5 Onboard PMIC (Power Management IC) in center
    const pmicGeo = new THREE.BoxGeometry(0.18, 0.035, 0.18);
    const pmicMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.2
    });
    const pmic = new THREE.Mesh(pmicGeo, pmicMat);
    pmic.position.set(0.0, 0.13, 0);
    socketBase.add(pmic);

    // 5. RAM Specification Label / Heat Spreader Sticker
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 512;
    labelCanvas.height = 128;
    const ctx = labelCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, 512, 128);
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 24px monospace';
      ctx.fillText(`8GB DDR5-5600 [CH-${slotIdx === 0 ? 'A' : 'B'}]`, 20, 45);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '18px monospace';
      ctx.fillText('1.1V CL40 • ON-DIE ECC • JEDEC', 20, 85);
      ctx.fillStyle = '#facc15';
      ctx.fillText('STRIX SO-DIMM', 340, 45);

      // Barcode lines
      ctx.fillStyle = '#ffffff';
      for (let b = 0; b < 24; b++) {
        const w = (b % 3 === 0) ? 3 : 1.5;
        ctx.fillRect(340 + b * 6, 65, w, 40);
      }
    }

    const labelTex = new THREE.CanvasTexture(labelCanvas);
    const labelGeo = new THREE.PlaneGeometry(2.4, 0.38);
    const labelMat = new THREE.MeshBasicMaterial({
      map: labelTex,
      transparent: true,
      opacity: 0.92
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.rotation.x = -Math.PI / 2;
    labelMesh.position.set(0, 0.155, 0);
    socketBase.add(labelMesh);

    ramGroup.add(socketBase);
  });

  // Highlight Plane for RAM (Pin 04)
  const highlightGeo = new THREE.PlaneGeometry(3.4, 1.4);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.y = 0.01;
  highlightMesh.name = 'ramHighlight';
  ramGroup.add(highlightMesh);

  parentGroup.add(ramGroup);
  return ramGroup;
}
