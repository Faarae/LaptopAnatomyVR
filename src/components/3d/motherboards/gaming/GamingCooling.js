import * as THREE from 'three';

/**
 * Builds the Dual Fan & Multi-Heatpipe Thermal Cooling System
 * Features:
 * - Left & Right Centrifugal Blower Fans with rotating turbine impeller blades
 * - Polished copper CPU & GPU cold plates with spring-tension retention screws
 * - 4x Flattened sintered metallic copper heat pipes routing between dies and fin stacks
 * - Quad dense exhaust fin stacks (Rear-Left, Rear-Right, Side-Left, Side-Right)
 * - Exposes fan meshes for smooth, frame-rate independent rotation in animation loop
 */
export function buildGamingCooling(parentGroup) {
  const coolingGroup = new THREE.Group();
  coolingGroup.name = 'gamingCooling';

  const fanRotators = [];

  // Copper Material for Heatpipes & Cold Plates
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xd97736, // Gleaming sintered thermal copper
    metalness: 0.92,
    roughness: 0.22
  });

  const nickelCopperMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8, // Nickel-plated copper fin material
    metalness: 0.9,
    roughness: 0.25
  });

  // Fan Housing Material
  const fanHousingMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a, // Matte black polymer fan shroud
    roughness: 0.5,
    metalness: 0.3
  });

  const fanBladeMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b, // Liquid crystal polymer fan blades
    roughness: 0.35,
    metalness: 0.4
  });

  // 1. CPU & GPU Copper Baseplates (Cold Plates)
  // GPU Cold Plate (Left at x: -1.8, z: -1.2)
  const gpuColdPlateGeo = new THREE.BoxGeometry(2.2, 0.08, 2.2);
  const gpuColdPlate = new THREE.Mesh(gpuColdPlateGeo, copperMat);
  gpuColdPlate.position.set(-1.8, 0.32, -1.2);
  coolingGroup.add(gpuColdPlate);

  // CPU Cold Plate (Right at x: 1.8, z: -1.2)
  const cpuColdPlateGeo = new THREE.BoxGeometry(2.0, 0.08, 2.0);
  const cpuColdPlate = new THREE.Mesh(cpuColdPlateGeo, copperMat);
  cpuColdPlate.position.set(1.8, 0.32, -1.2);
  coolingGroup.add(cpuColdPlate);

  // Spring Tension Retention Screws (4 on GPU, 4 on CPU)
  const springScrewGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.16, 12);
  const springMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95 });

  [
    [-2.7, -2.1], [-0.9, -2.1], [-2.7, -0.3], [-0.9, -0.3],
    [0.9, -2.0], [2.7, -2.0], [0.9, -0.4], [2.7, -0.4]
  ].forEach(([sx, sz]) => {
    const screw = new THREE.Mesh(springScrewGeo, springMat);
    screw.position.set(sx, 0.38, sz);
    coolingGroup.add(screw);
  });

  // 2. Centrifugal Blower Fans (Left & Right)
  const fanConfigs = [
    { x: -3.8, z: -2.8, name: 'leftFan' },
    { x: 3.8, z: -2.8, name: 'rightFan' }
  ];

  fanConfigs.forEach(({ x, z, name }) => {
    const fanAssembly = new THREE.Group();
    fanAssembly.name = name;
    fanAssembly.position.set(x, 0.20, z);

    // Fan Outer Shroud Casing
    const shroudGeo = new THREE.CylinderGeometry(1.25, 1.30, 0.55, 32);
    const shroud = new THREE.Mesh(shroudGeo, fanHousingMat);
    shroud.position.y = 0.28;
    fanAssembly.add(shroud);

    // Center Intake Hole
    const intakeGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.58, 32);
    const intakeMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
    const intake = new THREE.Mesh(intakeGeo, intakeMat);
    intake.position.y = 0.29;
    fanAssembly.add(intake);

    // Center Intake Metal Grill Mesh / Center Hub Badge
    const hubBadgeGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.60, 24);
    const hubBadgeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.8,
      roughness: 0.2
    });
    const hubBadge = new THREE.Mesh(hubBadgeGeo, hubBadgeMat);
    hubBadge.position.y = 0.30;
    fanAssembly.add(hubBadge);

    // Rotating Turbine Impeller Group
    const rotorGroup = new THREE.Group();
    rotorGroup.name = name + '_rotor';
    rotorGroup.position.y = 0.28;

    // 24 Curved Aerodynamic Blades per Fan
    const bladeGeo = new THREE.BoxGeometry(0.04, 0.40, 0.45);
    for (let b = 0; b < 24; b++) {
      const angle = (b / 24) * Math.PI * 2;
      const blade = new THREE.Mesh(bladeGeo, fanBladeMat);
      blade.position.set(Math.cos(angle) * 0.62, 0, Math.sin(angle) * 0.62);
      blade.rotation.y = -angle + 0.35; // Aerodynamic curvature pitch
      rotorGroup.add(blade);
    }

    fanAssembly.add(rotorGroup);
    coolingGroup.add(fanAssembly);
    fanRotators.push(rotorGroup);
  });

  // 3. Flattened Sintered Copper Heat Pipes (4 Multi-Way Routing Lines)
  // Heatpipe 1: Shared Main Pipe connecting GPU, CPU, and Left/Right Exhausts
  const hp1Path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4.4, 0.38, -3.8), // Left rear exhaust
    new THREE.Vector3(-3.2, 0.38, -3.2),
    new THREE.Vector3(-1.8, 0.38, -1.5), // Over GPU
    new THREE.Vector3(0.0, 0.42, -1.4),  // Bridge between GPU and CPU
    new THREE.Vector3(1.8, 0.38, -1.5),  // Over CPU
    new THREE.Vector3(3.2, 0.38, -3.2),
    new THREE.Vector3(4.4, 0.38, -3.8),  // Right rear exhaust
  ]);
  const hp1Geo = new THREE.TubeGeometry(hp1Path, 64, 0.12, 12, false);
  const hp1 = new THREE.Mesh(hp1Geo, copperMat);
  hp1.castShadow = true;
  coolingGroup.add(hp1);

  // Heatpipe 2: Secondary Dedicated GPU & Side Exhaust Pipe
  const hp2Path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4.6, 0.36, -2.2), // Left side exhaust
    new THREE.Vector3(-3.4, 0.36, -2.0),
    new THREE.Vector3(-2.2, 0.36, -0.9), // Over GPU lower edge
    new THREE.Vector3(-1.4, 0.36, -0.9),
    new THREE.Vector3(-1.0, 0.38, -2.6),
    new THREE.Vector3(-2.8, 0.38, -3.8), // Left rear exhaust
  ]);
  const hp2Geo = new THREE.TubeGeometry(hp2Path, 48, 0.10, 10, false);
  const hp2 = new THREE.Mesh(hp2Geo, copperMat);
  hp2.castShadow = true;
  coolingGroup.add(hp2);

  // Heatpipe 3: Dedicated CPU & Right Exhaust Pipe
  const hp3Path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.0, 0.36, -1.0),  // Over CPU lower edge
    new THREE.Vector3(2.4, 0.36, -1.0),
    new THREE.Vector3(3.5, 0.36, -2.0),
    new THREE.Vector3(4.6, 0.36, -2.2),  // Right side exhaust
  ]);
  const hp3Geo = new THREE.TubeGeometry(hp3Path, 36, 0.10, 10, false);
  const hp3 = new THREE.Mesh(hp3Geo, copperMat);
  hp3.castShadow = true;
  coolingGroup.add(hp3);

  // Heatpipe 4: Auxiliary High-TGP Bridge
  const hp4Path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.6, 0.40, -1.8),
    new THREE.Vector3(-0.5, 0.42, -2.2),
    new THREE.Vector3(0.5, 0.42, -2.2),
    new THREE.Vector3(1.6, 0.40, -1.8),
  ]);
  const hp4Geo = new THREE.TubeGeometry(hp4Path, 32, 0.09, 10, false);
  const hp4 = new THREE.Mesh(hp4Geo, copperMat);
  hp4.castShadow = true;
  coolingGroup.add(hp4);

  // 4. Quad Copper & Nickel Exhaust Fin Stacks
  const createFinStack = (width, height, depth, finCount, mat) => {
    const finGroup = new THREE.Group();
    const spacing = width / finCount;
    for (let i = 0; i < finCount; i++) {
      const fin = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, height, depth),
        mat
      );
      fin.position.set(-width / 2 + (i + 0.5) * spacing, height / 2, 0);
      finGroup.add(fin);
    }
    // Top protective shroud bar
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.05, 0.06, depth + 0.05),
      mat
    );
    bar.position.set(0, height + 0.03, 0);
    finGroup.add(bar);
    return finGroup;
  };

  // Rear Left Fin Stack
  const rearLeftFins = createFinStack(1.8, 0.45, 0.65, 32, copperMat);
  rearLeftFins.position.set(-3.6, 0.20, -4.0);
  coolingGroup.add(rearLeftFins);

  // Rear Right Fin Stack
  const rearRightFins = createFinStack(1.8, 0.45, 0.65, 32, copperMat);
  rearRightFins.position.set(3.6, 0.20, -4.0);
  coolingGroup.add(rearRightFins);

  // Side Left Fin Stack
  const sideLeftFins = createFinStack(1.4, 0.45, 0.55, 24, nickelCopperMat);
  sideLeftFins.rotation.y = Math.PI / 2;
  sideLeftFins.position.set(-4.6, 0.20, -2.2);
  coolingGroup.add(sideLeftFins);

  // Side Right Fin Stack
  const sideRightFins = createFinStack(1.4, 0.45, 0.55, 24, nickelCopperMat);
  sideRightFins.rotation.y = Math.PI / 2;
  sideRightFins.position.set(4.6, 0.20, -2.2);
  coolingGroup.add(sideRightFins);

  // Highlight Plane for Cooling (Pin 05)
  const highlightGeo = new THREE.PlaneGeometry(9.6, 4.2);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.set(0, 0.01, -2.4);
  highlightMesh.name = 'coolingHighlight';
  coolingGroup.add(highlightMesh);

  parentGroup.add(coolingGroup);
  return { coolingGroup, fanRotators };
}
