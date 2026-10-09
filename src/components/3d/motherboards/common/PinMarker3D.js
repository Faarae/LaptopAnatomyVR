import * as THREE from 'three';

/**
 * Creates a 3D Downward 'V' Chevron Arrow Pin Marker (Huruf V Tanpa Bayangan)
 * Implements the specification from DESKRIPSI_UI.md:
 * - Downward chevron pointing directly at the motherboard component
 * - No dark ground shadows (castShadow = false, receiveShadow = false)
 * - Large invisible raycast cylinder hitbox for effortless click/touch interaction
 * - arrowGroup + vArrowMesh for smooth bobbing, scale expansion, and emerald neon pulse
 */
export function create3DPinMarker(pin) {
  const group = new THREE.Group();
  const baseY = (pin.position3D?.y ?? 0) + 0.35;
  group.position.set(pin.position3D?.x ?? 0, baseY, pin.position3D?.z ?? 0);
  group.userData = { pinData: pin, baseY };

  // ── 3D DOWNWARD 'V' CHEVRON ARROW (Huruf V Tanpa Bayangan) ──
  const arrowGroup = new THREE.Group();
  arrowGroup.name = 'arrowGroup';
  arrowGroup.userData = { pinData: pin };

  // 2D Shape of Huruf V pointing down
  const vShape = new THREE.Shape();
  vShape.moveTo(-0.34, 0.48);  // Top-left outer
  vShape.lineTo(0.0, 0.0);     // Bottom point of V (points directly at component)
  vShape.lineTo(0.34, 0.48);   // Top-right outer
  vShape.lineTo(0.18, 0.48);   // Top-right inner
  vShape.lineTo(0.0, 0.22);    // Inner valley
  vShape.lineTo(-0.18, 0.48);  // Top-left inner
  vShape.closePath();

  const extrudeSettings = {
    depth: 0.08,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  };
  const vGeo = new THREE.ExtrudeGeometry(vShape, extrudeSettings);
  vGeo.center();

  // Vibrant material with NO shadows (engga ada bayangan)
  const vMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x059669,
    emissiveIntensity: 0.9,
    roughness: 0.2,
    metalness: 0.4,
  });
  const vMesh = new THREE.Mesh(vGeo, vMat);
  vMesh.name = 'vArrowMesh';
  vMesh.castShadow = false;
  vMesh.receiveShadow = false;
  // Tilted slightly toward isometric camera so the V shape is 100% distinct
  vMesh.rotation.x = -Math.PI / 7;
  vMesh.position.y = 0.32;
  vMesh.userData = { pinData: pin };
  arrowGroup.add(vMesh);

  // Large invisible raycast hitbox for effortless clicking
  const hitBox = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 1.8, 12),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitBox.position.y = 0.3;
  hitBox.userData = { pinData: pin };
  group.add(hitBox);

  group.add(arrowGroup);
  return group;
}
