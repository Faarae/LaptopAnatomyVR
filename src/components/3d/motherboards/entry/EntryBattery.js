import * as THREE from 'three';

/**
 * Builds the 42 Wh 3-Cell Lithium-Ion Polymer Battery Pack
 * Position: Bottom Section (x: 0.0, z: 3.0)
 * Features:
 * - Slim 3-cell lithium polymer pouch battery pack
 * - 3x Individual raised cell segments with seams
 * - High-detail technical safety caution & certification label
 * - Multi-wire power harness (Red, Black, Blue, White)
 * - Motherboard battery header socket
 */
export function buildEntryBattery(parentGroup) {
  const batteryGroup = new THREE.Group();
  batteryGroup.name = 'entryBattery';
  batteryGroup.position.set(0.0, 0.08, 3.0);

  // 1. Main Battery Pack Base (3 Cells)
  const packWidth = 8.0;
  const packDepth = 2.0;
  const packHeight = 0.18;

  const packBaseGeo = new THREE.BoxGeometry(packWidth, packHeight, packDepth);
  const packMat = new THREE.MeshStandardMaterial({
    color: 0x18181b, // Matte textured black
    roughness: 0.65,
    metalness: 0.15
  });
  const packBase = new THREE.Mesh(packBaseGeo, packMat);
  packBase.position.y = packHeight / 2;
  packBase.castShadow = true;
  packBase.receiveShadow = true;
  batteryGroup.add(packBase);

  // 3x Individual Pouch Cell Cushions
  const cellWidth = (packWidth - 0.4) / 3;
  const cellGeo = new THREE.BoxGeometry(cellWidth * 0.94, 0.04, packDepth * 0.90);
  const cellMat = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    roughness: 0.5,
    metalness: 0.25
  });

  for (let c = 0; c < 3; c++) {
    const cx = -packWidth / 2 + 0.3 + c * cellWidth + (cellWidth * 0.94) / 2;
    const cellMesh = new THREE.Mesh(cellGeo, cellMat);
    cellMesh.position.set(cx, packHeight + 0.015, 0);
    batteryGroup.add(cellMesh);
  }

  // 2. Battery Safety Label Decal
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 1024;
  labelCanvas.height = 256;
  const ctx = labelCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, 1024, 256);
    
    ctx.fillStyle = '#0d9488';
    ctx.fillRect(0, 0, 1024, 10);
    ctx.fillRect(0, 246, 1024, 10);

    ctx.fillStyle = '#2dd4bf';
    ctx.font = 'bold 36px monospace';
    ctx.fillText('42Wh RECHARGEABLE LI-ION POLYMER BATTERY PACK', 40, 60);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('RATING: 11.55V === 3650mAh • 3S1P 3-CELL CONFIGURATION', 40, 105);
    ctx.fillText('MODEL: BATT-42WH-SLIM14 • 65W USB-C PD COMPLIANT', 40, 145);

    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('CAUTION: DO NOT PUNCTURE, CRUSH, OR DISASSEMBLE • CE / FCC / PSE', 40, 190);
    ctx.fillText('ALL-DAY PRODUCTIVITY BATTERY ARCHITECTURE (<100Wh AIRLINE SAFE)', 40, 225);

    ctx.strokeStyle = '#0d9488';
    ctx.lineWidth = 4;
    ctx.strokeRect(860, 45, 90, 45);
    ctx.fillRect(950, 58, 10, 18);
    ctx.fillStyle = '#2dd4bf';
    ctx.fillRect(868, 52, 60, 30);
  }

  const labelTex = new THREE.CanvasTexture(labelCanvas);
  const labelGeo = new THREE.PlaneGeometry(5.2, 1.25);
  const labelMat = new THREE.MeshBasicMaterial({
    map: labelTex,
    transparent: true,
    opacity: 0.95
  });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.rotation.x = -Math.PI / 2;
  labelMesh.position.set(-0.5, packHeight + 0.045, 0);
  batteryGroup.add(labelMesh);

  // 3. Motherboard Header Socket at top of battery
  const headerGeo = new THREE.BoxGeometry(0.9, 0.14, 0.38);
  const headerMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
  const headerSocket = new THREE.Mesh(headerGeo, headerMat);
  headerSocket.position.set(-1.5, packHeight + 0.06, -1.05);
  batteryGroup.add(headerSocket);

  // 4. Cable Harness (Red, Black, Blue, White)
  const wireColors = [0xef4444, 0xef4444, 0x3b82f6, 0x0f172a];
  wireColors.forEach((color, idx) => {
    const ox = -1.8 + idx * 0.18;
    const wirePath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(ox, packHeight + 0.02, -0.4),
      new THREE.Vector3(ox, packHeight + 0.12, -0.7),
      new THREE.Vector3(ox + 0.04, packHeight + 0.07, -1.0)
    ]);
    const wireGeo = new THREE.TubeGeometry(wirePath, 14, 0.03, 8, false);
    const wireMat = new THREE.MeshStandardMaterial({ color, roughness: 0.5 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    batteryGroup.add(wire);
  });

  // Highlight Plane for Battery (Pin 09)
  const highlightGeo = new THREE.PlaneGeometry(8.4, 2.4);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.set(0, 0.01, 0);
  highlightMesh.name = 'batteryHighlight';
  batteryGroup.add(highlightMesh);

  parentGroup.add(batteryGroup);
  return batteryGroup;
}
