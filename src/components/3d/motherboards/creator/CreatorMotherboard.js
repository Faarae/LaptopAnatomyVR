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
import { create3DPinMarker } from '../common/PinMarker3D';

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
