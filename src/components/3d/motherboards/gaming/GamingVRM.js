import * as THREE from 'three';

/**
 * Builds the Multi-Phase Digital Voltage Regulator Module (VRM)
 * Position: Flanking CPU and GPU power rails (Upper-Center area)
 * Features:
 * - 10-Phase CPU Vcore + 2-Phase GPU Vcore + 2-Phase VRAM power delivery
 * - High-current molded alloy power inductors (Chokes) with inductance markings
 * - Integrated DrMOS power stages (Driver + High/Low MOSFETs)
 * - Solid aluminum polymer capacitors (Silver cylindrical cans with blue top markings)
 * - Low-ESR Tantalum capacitors for high-frequency ripple suppression
 */
export function buildGamingVRM(parentGroup) {
  const vrmGroup = new THREE.Group();
  vrmGroup.name = 'gamingVRM';

  // 1. Molded Alloy Inductor Chokes (Black square cubes with bevels)
  const chokeGeo = new THREE.BoxGeometry(0.32, 0.22, 0.32);
  const chokeMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b, // Dark charcoal magnetic alloy
    roughness: 0.6,
    metalness: 0.3
  });

  // 2. Integrated DrMOS Power Stages (Black QFN surface-mount chips)
  const drmosGeo = new THREE.BoxGeometry(0.18, 0.05, 0.18);
  const drmosMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.4
  });

  // 3. Solid Aluminum Polymer Capacitors (Silver cylindrical cans)
  const capCylinderGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.28, 16);
  const capCylinderMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0, // Silver aluminum can
    metalness: 0.95,
    roughness: 0.15
  });

  const capTopGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.02, 16);
  const capTopMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7, // Blue polarity marking on top
    roughness: 0.3
  });

  // 4. Low-ESR Tantalum Capacitors (Rectangular flat blocks with gold stripe)
  const tantalumGeo = new THREE.BoxGeometry(0.24, 0.08, 0.14);
  const tantalumMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.5
  });

  const tantalumStripeGeo = new THREE.BoxGeometry(0.04, 0.082, 0.142);
  const tantalumStripeMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // Gold polarity line
    metalness: 0.9
  });

  // Placement Arrays around CPU (x: 1.8, z: -1.2) and GPU (x: -1.8, z: -1.2)
  // Row 1: Top VRM rail above CPU & GPU (z: -2.4)
  for (let i = -7; i <= 7; i++) {
    if (Math.abs(i) === 0 || Math.abs(i) === 1) continue; // Leave center gap
    const cx = i * 0.42;
    const cz = -2.4;

    // Alloy Choke
    const choke = new THREE.Mesh(chokeGeo, chokeMat);
    choke.position.set(cx, 0.30, cz);
    choke.castShadow = true;
    vrmGroup.add(choke);

    // DrMOS next to choke
    const drmos = new THREE.Mesh(drmosGeo, drmosMat);
    drmos.position.set(cx, 0.21, cz + 0.26);
    vrmGroup.add(drmos);

    // Polymer Capacitor in front
    const capCan = new THREE.Mesh(capCylinderGeo, capCylinderMat);
    capCan.position.set(cx, 0.33, cz - 0.28);
    vrmGroup.add(capCan);

    const capTop = new THREE.Mesh(capTopGeo, capTopMat);
    capTop.position.set(cx, 0.47, cz - 0.28);
    vrmGroup.add(capTop);

    // Tantalum Capacitor
    const tant = new THREE.Mesh(tantalumGeo, tantalumMat);
    tant.position.set(cx, 0.23, cz + 0.48);
    vrmGroup.add(tant);

    const tantStripe = new THREE.Mesh(tantalumStripeGeo, tantalumStripeMat);
    tantStripe.position.set(cx - 0.10, 0.23, cz + 0.48);
    vrmGroup.add(tantStripe);
  }

  // Row 2: Vertical VRM rail between CPU and RAM / GPU
  [-0.6, 0.6].forEach(vx => {
    for (let j = 0; j < 3; j++) {
      const vz = -1.6 + j * 0.48;

      const choke = new THREE.Mesh(chokeGeo, chokeMat);
      choke.position.set(vx, 0.30, vz);
      vrmGroup.add(choke);

      const capCan = new THREE.Mesh(capCylinderGeo, capCylinderMat);
      capCan.position.set(vx + (vx > 0 ? 0.26 : -0.26), 0.33, vz);
      vrmGroup.add(capCan);
    }
  });

  // Highlight Plane for VRM (Pin 08)
  const highlightGeo = new THREE.PlaneGeometry(6.8, 1.8);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.set(0, 0.01, -2.4);
  highlightMesh.name = 'vrmHighlight';
  vrmGroup.add(highlightMesh);

  parentGroup.add(vrmGroup);
  return vrmGroup;
}
