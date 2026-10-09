import * as THREE from 'three';

/**
 * Builds the Multi-Phase Low-Profile Digital Studio VRM Power Delivery System
 * Position: Flanking AMD CPU and RTX 4070 GPU (Upper-Center area)
 * Features:
 * - 8-Phase CPU Core + 2-Phase GPU Core + 2-Phase VRAM/SOC power delivery
 * - Low-profile molded alloy inductors with inductance markings
 * - Integrated 50A DrMOS power stages
 * - High-density low-ESR solid tantalum polymer capacitor array
 * - Highlight plane for Pin 08 (VRM)
 */
export function buildCreatorVRM(parentGroup) {
  const vrmGroup = new THREE.Group();
  vrmGroup.name = 'creatorVRM';

  // 1. Low-Profile Molded Alloy Inductor Chokes
  const chokeGeo = new THREE.BoxGeometry(0.30, 0.19, 0.30);
  const chokeMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.6,
    metalness: 0.3
  });

  // 2. DrMOS Power Stages
  const drmosGeo = new THREE.BoxGeometry(0.18, 0.05, 0.18);
  const drmosMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.4
  });

  // 3. Tantalum Capacitors Matrix
  const tantalumGeo = new THREE.BoxGeometry(0.24, 0.08, 0.14);
  const tantalumMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.5
  });

  const tantalumStripeGeo = new THREE.BoxGeometry(0.04, 0.082, 0.142);
  const tantalumStripeMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.9
  });

  // Top VRM rail across CPU and GPU (z: -2.3)
  for (let i = -6; i <= 6; i++) {
    if (Math.abs(i) === 0) continue;
    const cx = i * 0.44;
    const cz = -2.3;

    // Alloy Choke
    const choke = new THREE.Mesh(chokeGeo, chokeMat);
    choke.position.set(cx, 0.28, cz);
    choke.castShadow = true;
    vrmGroup.add(choke);

    // DrMOS
    const drmos = new THREE.Mesh(drmosGeo, drmosMat);
    drmos.position.set(cx, 0.21, cz + 0.24);
    vrmGroup.add(drmos);

    // Tantalum Capacitor
    const tant = new THREE.Mesh(tantalumGeo, tantalumMat);
    tant.position.set(cx, 0.23, cz + 0.44);
    vrmGroup.add(tant);

    const tantStripe = new THREE.Mesh(tantalumStripeGeo, tantalumStripeMat);
    tantStripe.position.set(cx - 0.10, 0.23, cz + 0.44);
    vrmGroup.add(tantStripe);
  }

  // Vertical VRM rail between CPU and GPU
  [-0.6, 0.6].forEach(vx => {
    for (let j = 0; j < 3; j++) {
      const vz = -1.5 + j * 0.44;
      const choke = new THREE.Mesh(chokeGeo, chokeMat);
      choke.position.set(vx, 0.28, vz);
      vrmGroup.add(choke);
    }
  });

  // Highlight Plane for VRM (Pin 08)
  const highlightGeo = new THREE.PlaneGeometry(6.4, 1.8);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.set(0, 0.01, -2.3);
  highlightMesh.name = 'vrmHighlight';
  vrmGroup.add(highlightMesh);

  parentGroup.add(vrmGroup);
  return vrmGroup;
}
