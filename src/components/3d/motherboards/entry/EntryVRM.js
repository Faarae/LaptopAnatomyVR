import * as THREE from 'three';

/**
 * Builds the Compact 4+1 Phase Digital VRM Power Delivery System
 * Position: Left of CPU (x: -1.2, z: -1.0)
 * Features:
 * - 4-Phase CPU Vcore + 1-Phase VCCSA power delivery
 * - Molded alloy power inductors (Chokes) with inductance markings
 * - High-efficiency dual N-channel power MOSFET packages
 * - Solid low-ESR tantalum polymer filter capacitors
 */
export function buildEntryVRM(parentGroup) {
  const vrmGroup = new THREE.Group();
  vrmGroup.name = 'entryVRM';

  // 1. Molded Alloy Inductor Chokes
  const chokeGeo = new THREE.BoxGeometry(0.28, 0.18, 0.28);
  const chokeMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.6,
    metalness: 0.3
  });

  // 2. Dual MOSFET Packages
  const mosfetGeo = new THREE.BoxGeometry(0.16, 0.04, 0.16);
  const mosfetMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.4
  });

  // 3. Tantalum Capacitors
  const tantGeo = new THREE.BoxGeometry(0.20, 0.07, 0.12);
  const tantMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.5
  });

  const tantStripeGeo = new THREE.BoxGeometry(0.035, 0.072, 0.122);
  const tantStripeMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.9
  });

  // 4 Vertical VRM Phase Stages (x: -1.2, z: -1.6 to -0.4)
  for (let p = 0; p < 4; p++) {
    const pz = -1.6 + p * 0.40;

    // Choke
    const choke = new THREE.Mesh(chokeGeo, chokeMat);
    choke.position.set(-1.2, 0.26, pz);
    choke.castShadow = true;
    vrmGroup.add(choke);

    // Dual MOSFET
    const mosfet = new THREE.Mesh(mosfetGeo, mosfetMat);
    mosfet.position.set(-1.5, 0.19, pz);
    vrmGroup.add(mosfet);

    // Tantalum Capacitor
    const tant = new THREE.Mesh(tantGeo, tantMat);
    tant.position.set(-0.9, 0.205, pz);
    vrmGroup.add(tant);

    const tantStripe = new THREE.Mesh(tantStripeGeo, tantStripeMat);
    tantStripe.position.set(-0.98, 0.205, pz);
    vrmGroup.add(tantStripe);
  }

  // +1 Phase for VCCSA at bottom (x: -0.6, z: -0.2)
  const auxChoke = new THREE.Mesh(chokeGeo, chokeMat);
  auxChoke.position.set(-0.6, 0.26, -0.3);
  vrmGroup.add(auxChoke);

  // Highlight Plane for VRM (Pin 08)
  const highlightGeo = new THREE.PlaneGeometry(1.6, 2.0);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.set(-1.2, 0.01, -1.0);
  highlightMesh.name = 'vrmHighlight';
  vrmGroup.add(highlightMesh);

  parentGroup.add(vrmGroup);
  return vrmGroup;
}
