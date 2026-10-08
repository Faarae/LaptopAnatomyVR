import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Compass } from 'lucide-react';

/**
 * Component3DViewer
 * Interactive Three.js WebGL viewer for ISOLATED 3D hardware components.
 * Renders textured 3D models of specific laptop/PC components:
 * - 'cpu': LGA Processor with metal IHS and gold pin matrix
 * - 'ram': DDR5 RAM stick with DRAM chips and gold edge connector
 * - 'ssd': M.2 NVMe SSD with controller, NAND flash, and M-key connector
 * - 'gpu': Discrete GPU silicon die with GDDR6 memory chips
 * - 'heatsink': Extruded aluminum cooling fins and copper heatpipes
 * - 'fan': Centrifugal laptop blower fan with impeller blades
 * - 'battery': CR2032 CMOS lithium coin cell
 * - 'socket': Motherboard LGA CPU socket with locking lever
 * - 'pcie': PCIe x16 expansion slot
 */
export default function Component3DViewer({
  type = 'cpu', // 'cpu' | 'ram' | 'ssd' | 'gpu' | 'heatsink' | 'fan' | 'battery' | 'socket' | 'pcie'
  className = '',
  heightClass = 'h-[240px] sm:h-[280px]',
  autoRotateSpeed = 1.4,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);

  const controlsRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent so it inherits surrounding light card surface

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 3.2, 5.2);

    // 3. Renderer with pure transparent background
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // 100% transparent clear color
    renderer.shadowMap.enabled = true;

    // 4. Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = isRotating;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.minDistance = 2.5;
    controls.maxDistance = 12;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe8fff0, 2.8);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const greenRim = new THREE.PointLight(0x5bc47a, 2.2, 12);
    greenRim.position.set(-4, 3, -3);
    scene.add(greenRim);

    const tealFill = new THREE.PointLight(0x45b8a5, 1.8, 12);
    tealFill.position.set(4, -2, 3);
    scene.add(tealFill);

    // 6. Build Component Model based on type
    const modelGroup = new THREE.Group();
    buildComponentModel(modelGroup, type);
    scene.add(modelGroup);

    // Subtle clean ground shadow plate
    const shadowGeo = new THREE.CircleGeometry(1.8, 32);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.08 });
    const shadowPlate = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlate.rotation.x = -Math.PI / 2;
    shadowPlate.position.y = -1.2;
    scene.add(shadowPlate);

    // 7. Animation loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      controls.autoRotate = isRotating;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
    };
  }, [type, isRotating]);

  /**
   * Builds the 3D model geometry & materials for the specified component
   */
  const buildComponentModel = (group, compType) => {
    switch (compType) {
      case 'cpu': {
        // CPU Substrate PCB (Green/Dark)
        const sub = new THREE.Mesh(
          new THREE.BoxGeometry(2.4, 0.12, 2.4),
          new THREE.MeshStandardMaterial({ color: 0x151d1b, roughness: 0.35 })
        );
        group.add(sub);

        // Nickel-Plated Integrated Heat Spreader (IHS)
        const ihs = new THREE.Mesh(
          new THREE.BoxGeometry(1.9, 0.22, 1.9),
          new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.88, roughness: 0.18 })
        );
        ihs.position.y = 0.16;
        group.add(ihs);

        // IHS Laser Engraved Badge
        const badge = new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 0.02, 1.2),
          new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.6 })
        );
        badge.position.y = 0.28;
        group.add(badge);

        // Gold corner orientation triangle
        const goldCorner = new THREE.Mesh(
          new THREE.BoxGeometry(0.2, 0.02, 0.2),
          new THREE.MeshStandardMaterial({ color: 0xe5b85c, metalness: 0.9 })
        );
        goldCorner.position.set(-1.05, 0.08, -1.05);
        group.add(goldCorner);
        break;
      }

      case 'ram': {
        // RAM SO-DIMM / DIMM PCB
        const pcb = new THREE.Mesh(
          new THREE.BoxGeometry(3.6, 1.2, 0.08),
          new THREE.MeshStandardMaterial({ color: 0x151d1b, roughness: 0.4 })
        );
        group.add(pcb);

        // Gold Contact Fingers Edge Connector with Key Notch
        const goldLeft = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 0.2, 0.09),
          new THREE.MeshStandardMaterial({ color: 0xe5b85c, metalness: 0.85, roughness: 0.2 })
        );
        goldLeft.position.set(-0.85, -0.5, 0);
        group.add(goldLeft);

        const goldRight = new THREE.Mesh(
          new THREE.BoxGeometry(1.4, 0.2, 0.09),
          new THREE.MeshStandardMaterial({ color: 0xe5b85c, metalness: 0.85, roughness: 0.2 })
        );
        goldRight.position.set(0.95, -0.5, 0);
        group.add(goldRight);

        // 4x DRAM Memory Chips
        [-1.2, -0.4, 0.4, 1.2].forEach((x) => {
          const chip = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 0.55, 0.08),
            new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5 })
          );
          chip.position.set(x, 0.1, 0.06);
          group.add(chip);
        });

        // PMIC Power Controller in center
        const pmic = new THREE.Mesh(
          new THREE.BoxGeometry(0.3, 0.3, 0.06),
          new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6 })
        );
        pmic.position.set(0, 0.4, 0.06);
        group.add(pmic);
        break;
      }

      case 'ssd': {
        // M.2 2280 NVMe Slim PCB
        const pcb = new THREE.Mesh(
          new THREE.BoxGeometry(3.2, 0.9, 0.08),
          new THREE.MeshStandardMaterial({ color: 0x151d1b, roughness: 0.4 })
        );
        group.add(pcb);

        // M-Key Gold Connector
        const mKey = new THREE.Mesh(
          new THREE.BoxGeometry(0.3, 0.8, 0.09),
          new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9, roughness: 0.2 })
        );
        mKey.position.set(-1.55, 0, 0);
        group.add(mKey);

        // Silver Controller IC
        const ctrl = new THREE.Mesh(
          new THREE.BoxGeometry(0.65, 0.65, 0.09),
          new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.8, roughness: 0.2 })
        );
        ctrl.position.set(-0.8, 0, 0.06);
        group.add(ctrl);

        // Dual NAND Flash Memory Chips
        [0.1, 0.9].forEach((x) => {
          const nand = new THREE.Mesh(
            new THREE.BoxGeometry(0.65, 0.7, 0.08),
            new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
          );
          nand.position.set(x, 0, 0.06);
          group.add(nand);
        });
        break;
      }

      case 'gpu': {
        // GPU Substrate Interposer
        const sub = new THREE.Mesh(
          new THREE.BoxGeometry(2.6, 0.14, 2.6),
          new THREE.MeshStandardMaterial({ color: 0x061e13, roughness: 0.3 })
        );
        group.add(sub);

        // Polished Mirror Silicon Die
        const die = new THREE.Mesh(
          new THREE.BoxGeometry(1.4, 0.14, 1.4),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.95, roughness: 0.05 })
        );
        die.position.y = 0.12;
        group.add(die);

        // Surrounding GDDR6 VRAM Packages
        const vramCoords = [
          [-1.0, 0], [1.0, 0], [0, -1.0], [0, 1.0],
          [-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]
        ];
        vramCoords.forEach(([x, z]) => {
          const vram = new THREE.Mesh(
            new THREE.BoxGeometry(0.35, 0.1, 0.35),
            new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 })
          );
          vram.position.set(x, 0.1, z);
          group.add(vram);
        });
        break;
      }

      case 'heatsink': {
        // Polished Copper Cold Plate Base
        const base = new THREE.Mesh(
          new THREE.BoxGeometry(2.4, 0.2, 2.4),
          new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.9, roughness: 0.2 })
        );
        base.position.y = -0.5;
        group.add(base);

        // Copper Heatpipe running through
        const pipe = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 3.2, 16),
          new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.92, roughness: 0.15 })
        );
        pipe.rotation.z = Math.PI / 2;
        pipe.position.y = -0.3;
        group.add(pipe);

        // Extruded Aluminum Cooling Fins Stack
        const finCount = 14;
        const finSpacing = 2.4 / finCount;
        for (let i = 0; i < finCount; i++) {
          const fin = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, 1.4, 2.2),
            new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.25 })
          );
          fin.position.set(-1.2 + (i + 0.5) * finSpacing, 0.3, 0);
          group.add(fin);
        }
        break;
      }

      case 'cooling-fan':
      case 'fan': {
        // Centrifugal Blower Housing
        const housing = new THREE.Mesh(
          new THREE.CylinderGeometry(1.5, 1.5, 0.6, 32),
          new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 })
        );
        group.add(housing);

        // Air Intake Center Opening
        const intake = new THREE.Mesh(
          new THREE.CylinderGeometry(0.9, 0.9, 0.62, 32),
          new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.8 })
        );
        group.add(intake);

        // Central Motor Hub
        const motor = new THREE.Mesh(
          new THREE.CylinderGeometry(0.4, 0.4, 0.65, 24),
          new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 })
        );
        group.add(motor);

        // Curved Impeller Blades (12 blades)
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const blade = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, 0.5, 0.5),
            new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 })
          );
          blade.position.set(Math.cos(angle) * 0.65, 0, Math.sin(angle) * 0.65);
          blade.rotation.y = angle + 0.4;
          group.add(blade);
        }

        // Exhaust Outlet Spout
        const exhaust = new THREE.Mesh(
          new THREE.BoxGeometry(0.8, 0.6, 1.2),
          new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 })
        );
        exhaust.position.set(1.4, 0, 0.6);
        group.add(exhaust);
        break;
      }

      case 'battery': {
        // CR2032 Lithium Coin Battery
        const cell = new THREE.Mesh(
          new THREE.CylinderGeometry(1.2, 1.2, 0.35, 32),
          new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.12 })
        );
        group.add(cell);

        // Circular Rim
        const rim = new THREE.Mesh(
          new THREE.TorusGeometry(1.15, 0.08, 16, 32),
          new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 })
        );
        rim.rotation.x = Math.PI / 2;
        rim.position.y = 0.17;
        group.add(rim);

        // Embossed "+" Polarity Marking
        const plus1 = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.04, 0.15),
          new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6 })
        );
        plus1.position.y = 0.19;
        group.add(plus1);

        const plus2 = new THREE.Mesh(
          new THREE.BoxGeometry(0.15, 0.04, 0.6),
          new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6 })
        );
        plus2.position.y = 0.19;
        group.add(plus2);
        break;
      }

      case 'socket': {
        // LGA Socket Plastic Housing
        const base = new THREE.Mesh(
          new THREE.BoxGeometry(2.6, 0.3, 2.6),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
        );
        group.add(base);

        // Gold Contact Pin Matrix
        const pinGrid = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 0.32, 1.8),
          new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9, roughness: 0.3 })
        );
        group.add(pinGrid);

        // Metal Load Plate Frame
        const frame = new THREE.Mesh(
          new THREE.BoxGeometry(2.2, 0.1, 2.2),
          new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.2 })
        );
        frame.position.y = 0.18;
        group.add(frame);

        // Chrome Locking Tension Arm Lever
        const lever = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, 3.0, 12),
          new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.96, roughness: 0.08 })
        );
        lever.rotation.z = Math.PI / 2;
        lever.position.set(-1.2, 0.22, 0);
        group.add(lever);
        break;
      }

      case 'wifi-card':
      case 'wifi': {
        // M.2 2230 Wi-Fi 6E Module PCB
        const pcb = new THREE.Mesh(
          new THREE.BoxGeometry(2.2, 0.08, 2.4),
          new THREE.MeshStandardMaterial({ color: 0x0d3822, roughness: 0.35 })
        );
        group.add(pcb);

        // Nickel RF Metal Shielding Can
        const shield = new THREE.Mesh(
          new THREE.BoxGeometry(1.7, 0.22, 1.5),
          new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.15 })
        );
        shield.position.set(0, 0.14, 0.15);
        group.add(shield);

        // Gold U.FL Micro-Coaxial Antenna Connectors (Main & Aux)
        [-0.45, 0.45].forEach((x) => {
          const ufl = new THREE.Mesh(
            new THREE.CylinderGeometry(0.12, 0.12, 0.18, 16),
            new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.2 })
          );
          ufl.position.set(x, 0.28, -0.4);
          group.add(ufl);
        });

        // Gold M.2 A/E-Key Interface Fingers
        const edge = new THREE.Mesh(
          new THREE.BoxGeometry(1.6, 0.09, 0.3),
          new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9, roughness: 0.2 })
        );
        edge.position.set(0, 0, 1.1);
        group.add(edge);
        break;
      }

      case 'motherboard': {
        // Multi-Layer Mainboard PCB
        const pcb = new THREE.Mesh(
          new THREE.BoxGeometry(3.6, 0.1, 3.2),
          new THREE.MeshStandardMaterial({ color: 0x061e12, roughness: 0.4 })
        );
        group.add(pcb);

        // Central CPU LGA Socket
        const cpuSocket = new THREE.Mesh(
          new THREE.BoxGeometry(1.4, 0.18, 1.4),
          new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 })
        );
        cpuSocket.position.set(-0.4, 0.12, -0.3);
        group.add(cpuSocket);

        const cpuIhs = new THREE.Mesh(
          new THREE.BoxGeometry(1.0, 0.1, 1.0),
          new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.85, roughness: 0.2 })
        );
        cpuIhs.position.set(-0.4, 0.24, -0.3);
        group.add(cpuIhs);

        // Dual SO-DIMM RAM Slots
        [0.7, 1.1].forEach((x) => {
          const ramSlot = new THREE.Mesh(
            new THREE.BoxGeometry(0.22, 0.16, 1.8),
            new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 })
          );
          ramSlot.position.set(x, 0.11, -0.2);
          group.add(ramSlot);
        });

        // PCIe Expansion Slot
        const pcieSlot = new THREE.Mesh(
          new THREE.BoxGeometry(2.4, 0.18, 0.22),
          new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 })
        );
        pcieSlot.position.set(-0.2, 0.11, 0.9);
        group.add(pcieSlot);

        // VRM Aluminum Heatsink on rear I/O
        const vrm = new THREE.Mesh(
          new THREE.BoxGeometry(1.6, 0.35, 0.4),
          new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.75, roughness: 0.3 })
        );
        vrm.position.set(-0.4, 0.22, -1.25);
        group.add(vrm);

        // Chipset Heatsink (Gold/Copper)
        const chipset = new THREE.Mesh(
          new THREE.BoxGeometry(0.7, 0.22, 0.7),
          new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.85, roughness: 0.25 })
        );
        chipset.position.set(1.0, 0.14, 0.8);
        group.add(chipset);

        // Solid Capacitors
        [[-1.4, -0.8], [-1.4, -0.4], [-1.4, 0], [-1.4, 0.4]].forEach(([x, z]) => {
          const cap = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 0.25, 12),
            new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 })
          );
          cap.position.set(x, 0.16, z);
          group.add(cap);
        });
        break;
      }

      case 'pcie':
      default: {
        // PCIe x16 Expansion Slot Housing
        const slot = new THREE.Mesh(
          new THREE.BoxGeometry(3.6, 0.6, 0.45),
          new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 })
        );
        group.add(slot);

        // Gold spring contact groove
        const groove = new THREE.Mesh(
          new THREE.BoxGeometry(3.4, 0.4, 0.1),
          new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.85, roughness: 0.25 })
        );
        groove.position.y = 0.15;
        group.add(groove);

        // Retention Lock Latch at end
        const latch = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.8, 0.5),
          new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 })
        );
        latch.position.set(1.9, 0.1, 0);
        group.add(latch);
        break;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl bg-slate-50/60 border border-slate-200/80 overflow-hidden shadow-xs select-none ${heightClass} ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Controls HUD */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 p-1 rounded-xl bg-white/90 border border-slate-200 shadow-xs backdrop-blur-md">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`p-1.5 rounded-lg text-xs transition-all ${
            isRotating ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
          title="Toggle Auto-Rotate"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-2 left-2 pointer-events-none text-[10px] font-mono text-slate-500 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/90 border border-slate-200/80 shadow-2xs font-medium">
        <Compass className="w-3 h-3 text-emerald-600" />
        <span>3D Model: Drag to orbit • Scroll to zoom</span>
      </div>
    </div>
  );
}
