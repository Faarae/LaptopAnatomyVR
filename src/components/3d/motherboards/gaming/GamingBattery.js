import * as THREE from 'three';

/**
 * Builds the 90 Wh High-Density Lithium-Ion Battery Pack & Power Delivery Connector
 * Position: Bottom Section (x: 0.0, z: 3.2)
 * Features:
 * - Large 4-cell polymer battery pack spanning across lower chassis
 * - 4x Individual pouch cell pillow segments with seams
 * - High-detail technical safety caution & certification label decal
 * - Heavy-gauge multi-wire power harness (Red, Black, Blue, White wires)
 * - Heavy-duty keyed motherboard battery socket connector
 */
export function buildGamingBattery(parentGroup) {
  const batteryGroup = new THREE.Group();
  batteryGroup.name = 'gamingBattery';
  batteryGroup.position.set(0.0, 0.10, 3.2);

  // 1. Main Battery Polymer Enclosure Base (4 Cells)
  const packWidth = 8.6;
  const packDepth = 2.4;
  const packHeight = 0.22;

  const packBaseGeo = new THREE.BoxGeometry(packWidth, packHeight, packDepth);
  const packMat = new THREE.MeshStandardMaterial({
    color: 0x18181b, // Matte textured battery black
    roughness: 0.65,
    metalness: 0.15
  });
  const packBase = new THREE.Mesh(packBaseGeo, packMat);
  packBase.position.y = packHeight / 2;
  packBase.castShadow = true;
  packBase.receiveShadow = true;
  batteryGroup.add(packBase);

  // 4x Individual Pouch Cell Raised Cushions / Pillow Segments
  const cellWidth = (packWidth - 0.5) / 4;
  const cellGeo = new THREE.BoxGeometry(cellWidth * 0.94, 0.05, packDepth * 0.92);
  const cellMat = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    roughness: 0.5,
    metalness: 0.25
  });

  for (let c = 0; c < 4; c++) {
    const cx = -packWidth / 2 + 0.35 + c * cellWidth + (cellWidth * 0.94) / 2;
    const cellMesh = new THREE.Mesh(cellGeo, cellMat);
    cellMesh.position.set(cx, packHeight + 0.02, 0);
    batteryGroup.add(cellMesh);
  }

  // 2. Battery Safety Label / Holographic Specification Decal
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 1024;
  labelCanvas.height = 256;
  const ctx = labelCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, 1024, 256);
    
    // Warning Stripe
    ctx.fillStyle = '#facc15';
    ctx.fillRect(0, 0, 1024, 12);
    ctx.fillRect(0, 244, 1024, 12);

    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 36px monospace';
    ctx.fillText('90Wh HIGH CAPACITY RECHARGEABLE LI-ION BATTERY', 40, 60);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('RATING: 15.4V === 5845mAh • 4S1P 4-CELL PACK', 40, 105);
    ctx.fillText('MODEL: BATT-90WH-G16 • FAST CHARGE 240W READY', 40, 145);

    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('CAUTION: DO NOT PUNCTURE, CRUSH, HEAT ABOVE 65°C OR SHORT CIRCUIT', 40, 190);
    ctx.fillText('FAA COMPLIANT FOR AIRLINE CARRY-ON (<100Wh) • CE / FCC / PSE / UKCA', 40, 225);

    // Battery icon & recycling logo
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 4;
    ctx.strokeRect(860, 40, 100, 50);
    ctx.fillRect(960, 55, 12, 20);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(870, 50, 75, 30);
  }

  const labelTex = new THREE.CanvasTexture(labelCanvas);
  const labelGeo = new THREE.PlaneGeometry(5.6, 1.4);
  const labelMat = new THREE.MeshBasicMaterial({
    map: labelTex,
    transparent: true,
    opacity: 0.95
  });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.rotation.x = -Math.PI / 2;
  labelMesh.position.set(-0.6, packHeight + 0.05, 0);
  batteryGroup.add(labelMesh);

  // 3. Heavy-Duty Keyed Battery Header Socket on Motherboard (Top edge of battery at z: -1.2 relative to battery)
  const headerGeo = new THREE.BoxGeometry(1.1, 0.16, 0.45);
  const headerMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc, // White/Ivory nylon connector
    roughness: 0.4
  });
  const headerSocket = new THREE.Mesh(headerGeo, headerMat);
  headerSocket.position.set(-2.2, packHeight + 0.06, -1.25);
  batteryGroup.add(headerSocket);

  // 4. Heavy-Gauge Multi-Wire Power Cable Harness (Thick flexible wires)
  const wireColors = [0xef4444, 0xef4444, 0x3b82f6, 0xfacc15, 0x0f172a, 0x0f172a];
  wireColors.forEach((color, idx) => {
    const ox = -2.6 + idx * 0.16;
    const wirePath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(ox, packHeight + 0.02, -0.6),
      new THREE.Vector3(ox, packHeight + 0.14, -0.9),
      new THREE.Vector3(ox + 0.05, packHeight + 0.08, -1.2)
    ]);
    const wireGeo = new THREE.TubeGeometry(wirePath, 16, 0.035, 8, false);
    const wireMat = new THREE.MeshStandardMaterial({ color, roughness: 0.5 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    batteryGroup.add(wire);
  });

  // Highlight Plane for Battery (Pin 09)
  const highlightGeo = new THREE.PlaneGeometry(9.0, 2.8);
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
