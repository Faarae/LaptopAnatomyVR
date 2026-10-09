import * as THREE from 'three';

/**
 * Builds the Dual Studio Fan & Multi-Way Copper Cooling Solution
 * Position: Symmetrical Top Section (Left: -3.6, Right: 3.6, z: -2.6)
 * Features:
 * - Dual sound-dampened studio blower fans with rotating 79-blade impellers
 * - Polished copper CPU (AMD) and GPU (RTX 4070) cold plates with spring screws
 * - Symmetrical 3-way sintered metallic copper heat pipes routing to dual exhaust fin arrays
 * - Dual dense copper exhaust fin stacks (<35 dBA acoustic profile)
 * - Exposes dual fan impellers for smooth 60 FPS real-time rotation
 */
export function buildCreatorCooling(parentGroup) {
  const coolingGroup = new THREE.Group();
  coolingGroup.name = 'creatorCooling';

  const fanRotators = [];

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xd97736,
    metalness: 0.92,
    roughness: 0.22
  });

  const fanHousingMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.5,
    metalness: 0.3
  });

  const fanBladeMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.35,
    metalness: 0.4
  });

  // 1. CPU & GPU Copper Baseplates (Cold Plates)
  // GPU Cold Plate (Left at x: -1.7, z: -1.1)
  const gpuColdPlateGeo = new THREE.BoxGeometry(2.1, 0.08, 2.1);
  const gpuColdPlate = new THREE.Mesh(gpuColdPlateGeo, copperMat);
  gpuColdPlate.position.set(-1.7, 0.32, -1.1);
  coolingGroup.add(gpuColdPlate);

  // CPU Cold Plate (Right at x: 1.7, z: -1.1)
  const cpuColdPlateGeo = new THREE.BoxGeometry(1.9, 0.08, 1.9);
  const cpuColdPlate = new THREE.Mesh(cpuColdPlateGeo, copperMat);
  cpuColdPlate.position.set(1.7, 0.32, -1.1);
  coolingGroup.add(cpuColdPlate);

  // Retention Screws (4 on GPU, 4 on CPU)
  const screwGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.15, 12);
  const screwMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95 });

  [
    [-2.5, -1.9], [-0.9, -1.9], [-2.5, -0.3], [-0.9, -0.3],
    [0.9, -1.8],  [2.5, -1.8],  [0.9, -0.4],  [2.5, -0.4]
  ].forEach(([sx, sz]) => {
    const screw = new THREE.Mesh(screwGeo, screwMat);
    screw.position.set(sx, 0.38, sz);
    coolingGroup.add(screw);
  });

  // 2. Dual Centrifugal Blower Fans (Left & Right)
  const fanConfigs = [
    { x: -3.6, z: -2.6, name: 'creatorLeftFan' },
    { x: 3.6, z: -2.6, name: 'creatorRightFan' }
  ];

  fanConfigs.forEach(({ x, z, name }) => {
    const fanAssembly = new THREE.Group();
    fanAssembly.position.set(x, 0.20, z);

    // Fan Outer Shroud Casing
    const shroudGeo = new THREE.CylinderGeometry(1.22, 1.28, 0.52, 32);
    const shroud = new THREE.Mesh(shroudGeo, fanHousingMat);
    shroud.position.y = 0.26;
    fanAssembly.add(shroud);

    // Center Intake Hole
    const intakeGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.55, 32);
    const intakeMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
    const intake = new THREE.Mesh(intakeGeo, intakeMat);
    intake.position.y = 0.27;
    fanAssembly.add(intake);

    // Center Hub Badge (Studio Blue/Teal Accent)
    const hubBadge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.34, 0.58, 24),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8, roughness: 0.2 })
    );
    hubBadge.position.y = 0.28;
    fanAssembly.add(hubBadge);

    // Rotating Turbine Impeller Group
    const rotorGroup = new THREE.Group();
    rotorGroup.name = name + '_rotor';
    rotorGroup.position.y = 0.26;

    const bladeGeo = new THREE.BoxGeometry(0.038, 0.38, 0.44);
    for (let b = 0; b < 22; b++) {
      const angle = (b / 22) * Math.PI * 2;
      const blade = new THREE.Mesh(bladeGeo, fanBladeMat);
      blade.position.set(Math.cos(angle) * 0.60, 0, Math.sin(angle) * 0.60);
      blade.rotation.y = -angle + 0.35;
      rotorGroup.add(blade);
    }

    fanAssembly.add(rotorGroup);
    coolingGroup.add(fanAssembly);
    fanRotators.push(rotorGroup);
  });

  // 3. Symmetrical 3-Way Sintered Copper Heat Pipes
  // Heatpipe 1: Shared Main Upper Pipe (connecting GPU, CPU to Left & Right Exhausts)
  const hp1Path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4.2, 0.38, -3.6),
    new THREE.Vector3(-3.0, 0.38, -3.0),
    new THREE.Vector3(-1.7, 0.38, -1.4),
    new THREE.Vector3(0.0, 0.42, -1.3),
    new THREE.Vector3(1.7, 0.38, -1.4),
    new THREE.Vector3(3.0, 0.38, -3.0),
    new THREE.Vector3(4.2, 0.38, -3.6)
  ]);
  const hp1Geo = new THREE.TubeGeometry(hp1Path, 64, 0.11, 12, false);
  const hp1 = new THREE.Mesh(hp1Geo, copperMat);
  hp1.castShadow = true;
  coolingGroup.add(hp1);

  // Heatpipe 2: Dedicated GPU Lower Pipe
  const hp2Path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4.4, 0.36, -2.0),
    new THREE.Vector3(-3.2, 0.36, -1.8),
    new THREE.Vector3(-2.1, 0.36, -0.8),
    new THREE.Vector3(-1.3, 0.36, -0.8),
    new THREE.Vector3(-0.9, 0.38, -2.4),
    new THREE.Vector3(-2.6, 0.38, -3.6)
  ]);
  const hp2Geo = new THREE.TubeGeometry(hp2Path, 48, 0.095, 10, false);
  const hp2 = new THREE.Mesh(hp2Geo, copperMat);
  hp2.castShadow = true;
  coolingGroup.add(hp2);

  // Heatpipe 3: Dedicated CPU Lower Pipe
  const hp3Path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.9, 0.36, -0.8),
    new THREE.Vector3(2.1, 0.36, -0.8),
    new THREE.Vector3(3.2, 0.36, -1.8),
    new THREE.Vector3(4.4, 0.36, -2.0)
  ]);
  const hp3Geo = new THREE.TubeGeometry(hp3Path, 36, 0.095, 10, false);
  const hp3 = new THREE.Mesh(hp3Geo, copperMat);
  hp3.castShadow = true;
  coolingGroup.add(hp3);

  // 4. Rear Exhaust Copper Fin Stacks (Left & Right)
  const createFinStack = (width, height, depth, finCount) => {
    const finGroup = new THREE.Group();
    const spacing = width / finCount;
    for (let i = 0; i < finCount; i++) {
      const fin = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, height, depth),
        copperMat
      );
      fin.position.set(-width / 2 + (i + 0.5) * spacing, height / 2, 0);
      finGroup.add(fin);
    }
    return finGroup;
  };

  const rearLeftFins = createFinStack(1.7, 0.44, 0.60, 28);
  rearLeftFins.position.set(-3.5, 0.20, -3.9);
  coolingGroup.add(rearLeftFins);

  const rearRightFins = createFinStack(1.7, 0.44, 0.60, 28);
  rearRightFins.position.set(3.5, 0.20, -3.9);
  coolingGroup.add(rearRightFins);

  // Highlight Plane for Cooling (Pin 05)
  const highlightGeo = new THREE.PlaneGeometry(9.4, 4.0);
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
