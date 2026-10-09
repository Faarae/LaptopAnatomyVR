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
import { create3DPinMarker } from '../common/PinMarker3D';

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
    const pinGroup = create3DPinMarker(pin);
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
