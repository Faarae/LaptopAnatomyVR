import * as THREE from 'three';
import { GAMING_MOTHERBOARD_PINS } from '../../../../data/gamingMotherboardData';
import { buildGamingPCB } from './GamingPCB';
import { buildGamingCPU } from './GamingCPU';
import { buildGamingGPU } from './GamingGPU';
import { buildGamingRAM } from './GamingRAM';
import { buildGamingSSD } from './GamingSSD';
import { buildGamingCooling } from './GamingCooling';
import { buildGamingBattery } from './GamingBattery';
import { buildGamingVRM } from './GamingVRM';
import { buildGamingIO } from './GamingIO';

/**
 * Builds the complete Dedicated Gaming Laptop Motherboard (AeroBook Strix G16)
 * Assembles all modular components into a single coherent Three.js scene hierarchy.
 * Returns:
 * - rootGroup: THREE.Group containing all meshes
 * - pinMeshes: Array of Pin Marker groups for raycasting click detection
 * - fanRotators: Array of fan impeller mesh groups for real-time rotation
 * - updateHighlight: Function to highlight a component based on activePinNumber
 */
export function buildGamingMotherboard(scene) {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'gamingMotherboardRoot';

  // 1. Mount PCB Base
  buildGamingPCB(rootGroup);

  // 2. Mount Primary Compute Silicon & Memory
  buildGamingCPU(rootGroup);
  buildGamingGPU(rootGroup);
  buildGamingRAM(rootGroup);
  buildGamingSSD(rootGroup);

  // 3. Mount VRM Power Delivery & Thermal Cooling
  buildGamingVRM(rootGroup);
  const { fanRotators } = buildGamingCooling(rootGroup);

  // 4. Mount Battery & I/O Subsystem
  buildGamingBattery(rootGroup);
  buildGamingIO(rootGroup);

  // 5. Mount 10 Interactive Numbered 3D Pin Markers
  const pinMeshes = [];

  GAMING_MOTHERBOARD_PINS.forEach((pin) => {
    const pinGroup = createGaming3DPinMarker(pin);
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
function createGaming3DPinMarker(pin) {
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
