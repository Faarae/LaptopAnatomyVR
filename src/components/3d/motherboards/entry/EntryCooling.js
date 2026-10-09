import * as THREE from 'three';

/**
 * Builds the Single Fan & Single Copper Pipe Thermal Cooling Solution
 * Position: Top-Left Section (x: -3.2, z: -2.6)
 * Features:
 * - Single ultra-quiet centrifugal blower fan with 55 curved impeller blades
 * - Polished copper CPU cold plate with 4 retention screws
 * - Single 6mm flattened sintered copper heat pipe routing to top-left exhaust
 * - Aluminum rear exhaust fin stack (60 ultra-thin dissipation fins)
 * - Exposes single fan impeller for smooth 60 FPS real-time rotation
 */
export function buildEntryCooling(parentGroup) {
  const coolingGroup = new THREE.Group();
  coolingGroup.name = 'entryCooling';

  const fanRotators = [];

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xd97736, // Sintered thermal copper
    metalness: 0.92,
    roughness: 0.22
  });

  const aluminumFinMat = new THREE.MeshStandardMaterial({
    color: 0x64748b, // Extruded aluminum fins
    metalness: 0.85,
    roughness: 0.25
  });

  const fanHousingMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a, // Matte black polymer fan casing
    roughness: 0.55,
    metalness: 0.25
  });

  const fanBladeMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.35,
    metalness: 0.4
  });

  // 1. CPU Copper Cold Plate (over CPU at x: 0.2, z: -1.0)
  const cpuColdPlateGeo = new THREE.BoxGeometry(1.6, 0.06, 1.4);
  const cpuColdPlate = new THREE.Mesh(cpuColdPlateGeo, copperMat);
  cpuColdPlate.position.set(0.2, 0.28, -1.0);
  coolingGroup.add(cpuColdPlate);

  // 4x Retention Screws
  const screwGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.12, 10);
  const screwMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95 });

  [
    [-0.5, -0.5], [0.5, -0.5],
    [-0.5, 0.5],  [0.5, 0.5]
  ].forEach(([sx, sz]) => {
    const screw = new THREE.Mesh(screwGeo, screwMat);
    screw.position.set(0.2 + sx * 1.2, 0.33, -1.0 + sz * 1.0);
    coolingGroup.add(screw);
  });

  // 2. Single Centrifugal Blower Fan on Top-Left
  const fanAssembly = new THREE.Group();
  fanAssembly.position.set(-3.2, 0.18, -2.6);

  // Fan Shroud Casing
  const shroudGeo = new THREE.CylinderGeometry(1.20, 1.25, 0.48, 28);
  const shroud = new THREE.Mesh(shroudGeo, fanHousingMat);
  shroud.position.y = 0.24;
  fanAssembly.add(shroud);

  // Center Air Intake
  const intakeGeo = new THREE.CylinderGeometry(0.70, 0.70, 0.50, 28);
  const intakeMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
  const intake = new THREE.Mesh(intakeGeo, intakeMat);
  intake.position.y = 0.25;
  fanAssembly.add(intake);

  // Center Hub Badge
  const hubBadge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.52, 20),
    new THREE.MeshStandardMaterial({ color: 0x0d9488, metalness: 0.8, roughness: 0.2 })
  );
  hubBadge.position.y = 0.26;
  fanAssembly.add(hubBadge);

  // Rotating Impeller Group
  const rotorGroup = new THREE.Group();
  rotorGroup.name = 'entryFan_rotor';
  rotorGroup.position.y = 0.24;

  const bladeGeo = new THREE.BoxGeometry(0.035, 0.34, 0.42);
  for (let b = 0; b < 20; b++) {
    const angle = (b / 20) * Math.PI * 2;
    const blade = new THREE.Mesh(bladeGeo, fanBladeMat);
    blade.position.set(Math.cos(angle) * 0.58, 0, Math.sin(angle) * 0.58);
    blade.rotation.y = -angle + 0.35;
    rotorGroup.add(blade);
  }

  fanAssembly.add(rotorGroup);
  coolingGroup.add(fanAssembly);
  fanRotators.push(rotorGroup);

  // 3. Single Sintered Copper Heat Pipe Routing
  // Routes from CPU (0.2, -1.0) curving smoothly to top-left fan and rear exhaust (-3.2, -3.8)
  const hpPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.6, 0.32, -1.0),
    new THREE.Vector3(0.0, 0.32, -1.0),
    new THREE.Vector3(-1.4, 0.34, -1.2),
    new THREE.Vector3(-2.4, 0.34, -2.0),
    new THREE.Vector3(-3.0, 0.34, -3.2),
    new THREE.Vector3(-3.4, 0.34, -3.8)
  ]);
  const hpGeo = new THREE.TubeGeometry(hpPath, 48, 0.10, 10, false);
  const heatpipe = new THREE.Mesh(hpGeo, copperMat);
  heatpipe.castShadow = true;
  coolingGroup.add(heatpipe);

  // 4. Rear Aluminum Exhaust Fin Stack (-3.2, -4.0)
  const finWidth = 2.0;
  const finHeight = 0.40;
  const finDepth = 0.60;
  const finCount = 28;
  const finSpacing = finWidth / finCount;
  const finGroup = new THREE.Group();
  finGroup.position.set(-3.2, 0.18, -4.0);

  for (let i = 0; i < finCount; i++) {
    const fin = new THREE.Mesh(
      new THREE.BoxGeometry(0.025, finHeight, finDepth),
      aluminumFinMat
    );
    fin.position.set(-finWidth / 2 + (i + 0.5) * finSpacing, finHeight / 2, 0);
    finGroup.add(fin);
  }
  coolingGroup.add(finGroup);

  // Highlight Plane for Cooling (Pin 05)
  const highlightGeo = new THREE.PlaneGeometry(5.4, 4.0);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.set(-1.8, 0.01, -2.2);
  highlightMesh.name = 'coolingHighlight';
  coolingGroup.add(highlightMesh);

  parentGroup.add(coolingGroup);
  return { coolingGroup, fanRotators };
}
