import * as THREE from 'three';
import { CREATOR_MOTHERBOARD_PINS } from '../../../../data/creatorMotherboardData';
import { buildCreatorPCB } from './CreatorPCB';
import { buildCreatorCPU } from './CreatorCPU';
import { buildCreatorGPU } from './CreatorGPU';
import { buildCreatorRAM } from './CreatorRAM';
import { buildCreatorSSD } from './CreatorSSD';
import { buildCreatorCooling } from './CreatorCooling';
import { buildCreatorBattery } from './CreatorBattery';
import { buildCreatorVRM } from './CreatorVRM';
import { buildCreatorIO } from './CreatorIO';

/**
 * Builds the complete Dedicated Creator Laptop Motherboard (AeroBook Studio Pro 16)
 * Assembles all modular components into a single coherent Three.js scene hierarchy.
 * Returns:
 * - rootGroup: THREE.Group containing all meshes
 * - pinMeshes: Array of Pin Marker groups for raycasting click detection
 * - fanRotators: Array of fan impeller mesh groups for real-time rotation
 * - updateHighlight: Function to highlight a component based on activePinNumber
 */
export function buildCreatorMotherboard(scene) {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'creatorMotherboardRoot';

  // 1. Mount PCB Base
  buildCreatorPCB(rootGroup);

  // 2. Mount Compute Silicon & Memory
  buildCreatorCPU(rootGroup);
  buildCreatorGPU(rootGroup);
  buildCreatorRAM(rootGroup);
  buildCreatorSSD(rootGroup);

  // 3. Mount VRM Power Delivery & Dual Studio Fan Cooling
  buildCreatorVRM(rootGroup);
  const { fanRotators } = buildCreatorCooling(rootGroup);

  // 4. Mount 90 Wh Battery & I/O Subsystem
  buildCreatorBattery(rootGroup);
  buildCreatorIO(rootGroup);

  // 5. Mount 10 Interactive Numbered 3D Pin Markers
  const pinMeshes = [];

  CREATOR_MOTHERBOARD_PINS.forEach((pin) => {
    const pinGroup = createCreator3DPinMarker(pin);
    rootGroup.add(pinGroup);
    pinMeshes.push(pinGroup);
  });

  // 6. Component Highlight Controller
  const updateHighlight = (pinNumber) => {
    const highlightMap = {
      1: 'gpuHighlight',
      2: 'cpuHighlight',
      3: 'ssdHighlight',
      4: 'ramHighlight',
      5: 'coolingHighlight',
      6: null,
      7: 'displayHighlight',
      8: 'vrmHighlight',
      9: 'batteryHighlight',
      10: 'ioHighlight'
    };

    const targetName = highlightMap[pinNumber];

    rootGroup.traverse((child) => {
      if (child.name && child.name.endsWith('Highlight') && child.material) {
        if (targetName && child.name === targetName) {
          child.material.opacity = 0.35;
          child.material.color.setHex(0x22c55e);
        } else {
          child.material.opacity = 0;
        }
      }
    });
  };

  scene.add(rootGroup);

  return {
    rootGroup,
    pinMeshes,
    fanRotators,
    updateHighlight
  };
}

/**
 * Creates an interactive 3D Pin Marker with glowing sphere and rotating halo ring
 */
function createCreator3DPinMarker(pin) {
  const group = new THREE.Group();
  group.position.set(pin.position3D.x, pin.position3D.y + 0.35, pin.position3D.z);
  group.userData = { pinData: pin };

  // Core Glowing Pin Sphere (Emerald/Cyan Neon)
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.85,
      roughness: 0.15,
      metalness: 0.2
    })
  );
  sphere.userData = { pinData: pin };
  group.add(sphere);

  // Outer Rotating Neon Ring
  const ringGeo = new THREE.RingGeometry(0.28, 0.38, 24);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8, // Cyan neon ring for Creator
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.90
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.name = 'pinRing';
  ring.userData = { pinData: pin };
  group.add(ring);

  // Pulsing Ambient Halo
  const glowGeo = new THREE.SphereGeometry(0.36, 16, 16);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x0284c7,
    transparent: true,
    opacity: 0.30
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.name = 'pinGlow';
  glow.userData = { pinData: pin };
  group.add(glow);

  // Chrome Mounting Stalk
  const stalk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.45, 8),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.85, roughness: 0.2 })
  );
  stalk.position.y = -0.25;
  stalk.userData = { pinData: pin };
  group.add(stalk);

  return group;
}
