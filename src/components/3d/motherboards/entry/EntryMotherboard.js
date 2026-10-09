import * as THREE from 'three';
import { ENTRY_MOTHERBOARD_PINS } from '../../../../data/entryMotherboardData';
import { buildEntryPCB } from './EntryPCB';
import { buildEntryCPU } from './EntryCPU';
import { buildEntryRAM } from './EntryRAM';
import { buildEntrySSD } from './EntrySSD';
import { buildEntryCooling } from './EntryCooling';
import { buildEntryBattery } from './EntryBattery';
import { buildEntryVRM } from './EntryVRM';
import { buildEntryIO } from './EntryIO';

/**
 * Builds the complete Dedicated Entry Level Laptop Motherboard (AeroBook Slim 14)
 * Assembles all modular components into a single coherent Three.js scene hierarchy.
 * Returns:
 * - rootGroup: THREE.Group containing all meshes
 * - pinMeshes: Array of Pin Marker groups for raycasting click detection
 * - fanRotators: Array of fan impeller mesh groups for real-time rotation
 * - updateHighlight: Function to highlight a component based on activePinNumber
 */
export function buildEntryMotherboard(scene) {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'entryMotherboardRoot';

  // 1. Mount PCB Base
  buildEntryPCB(rootGroup);

  // 2. Mount Compute Silicon & Memory
  buildEntryCPU(rootGroup);
  buildEntryRAM(rootGroup);
  buildEntrySSD(rootGroup);

  // 3. Mount VRM Power Delivery & Single Fan Cooling
  buildEntryVRM(rootGroup);
  const { fanRotators } = buildEntryCooling(rootGroup);

  // 4. Mount 42 Wh Battery & I/O Subsystem
  buildEntryBattery(rootGroup);
  buildEntryIO(rootGroup);

  // 5. Mount 10 Interactive Numbered 3D Pin Markers
  const pinMeshes = [];

  ENTRY_MOTHERBOARD_PINS.forEach((pin) => {
    const pinGroup = createEntry3DPinMarker(pin);
    rootGroup.add(pinGroup);
    pinMeshes.push(pinGroup);
  });

  // 6. Component Highlight Controller
  const updateHighlight = (pinNumber) => {
    const highlightMap = {
      1: 'cpuHighlight', // Integrated Iris Xe graphics (in CPU package)
      2: 'cpuHighlight', // Intel Core i5 CPU
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
function createEntry3DPinMarker(pin) {
  const group = new THREE.Group();
  group.position.set(pin.position3D.x, pin.position3D.y + 0.35, pin.position3D.z);
  group.userData = { pinData: pin };

  // Core Glowing Pin Sphere (Emerald Neon)
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
    color: 0x34d399,
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
    color: 0x10b981,
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
    new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.85, roughness: 0.2 })
  );
  stalk.position.y = -0.25;
  stalk.userData = { pinData: pin };
  group.add(stalk);

  return group;
}
