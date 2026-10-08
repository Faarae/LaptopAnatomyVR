import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Box, RotateCw, Compass, Eye, Sparkles, Layers, Info, Zap 
} from 'lucide-react';
import { MOTHERBOARD_PINS, getPinByNumber } from '../../data/motherboardPins';
import ComponentDetailModal from './ComponentDetailModal';

/**
 * Motherboard3DViewer
 * 100% Native Three.js WebGL Interactive Motherboard Engine:
 * - 60 FPS hardware accelerated WebGL rendering
 * - Fully offline compliant (Zero Sketchfab dependencies)
 * - 10 Interactive numbered hotspot pins with raycasting
 * - Smooth camera tweening to pins and angle presets
 * - OrbitControls with touch & mouse drag
 */
export default function Motherboard3DViewer({
  highlightPinNumber = null,
  onPinClick = null,
  className = "",
  heightClass = "h-[450px] sm:h-[520px] lg:h-[580px]",
  showModal = true,
  showPinStrip = true,
}) {
  const [activePin, setActivePin] = useState(null);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [cameraView, setCameraView] = useState('isometric');

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const pinMeshesRef = useRef([]);
  const animFrameRef = useRef(null);
  const targetCamPosRef = useRef(null);

  // Sync external highlightPinNumber
  useEffect(() => {
    if (highlightPinNumber) {
      const pin = getPinByNumber(highlightPinNumber);
      if (pin) {
        setActivePin(pin);
        focusCameraOnPin(pin);
      }
    } else {
      setActivePin(null);
    }
  }, [highlightPinNumber]);

  /**
   * Initialize Three.js WebGL Scene
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.02);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 9.8, 11.2);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 3.2;
    controls.maxDistance = 22;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xe8fff0, 2.6);
    mainLight.position.set(8, 14, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const greenFill = new THREE.PointLight(0x5bc47a, 2.0, 20);
    greenFill.position.set(-6, 5, -4);
    scene.add(greenFill);

    const tealFill = new THREE.PointLight(0x45b8a5, 1.8, 20);
    tealFill.position.set(6, 4, 6);
    scene.add(tealFill);

    // 6. Build Motherboard Geometry
    buildMotherboardBoard(scene);

    // 7. Raycaster for 3D Pin interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getPinFromObject = (obj) => {
      let curr = obj;
      while (curr && curr !== scene) {
        if (curr.userData && curr.userData.pinData) {
          return curr.userData.pinData;
        }
        curr = curr.parent;
      }
      return null;
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pinMeshesRef.current, true);

      let hitPin = null;
      for (let i = 0; i < intersects.length; i++) {
        const found = getPinFromObject(intersects[i].object);
        if (found) {
          hitPin = found;
          break;
        }
      }

      if (hitPin) {
        canvas.style.cursor = 'pointer';
        setHoveredPin(hitPin);
      } else {
        canvas.style.cursor = 'default';
        setHoveredPin(null);
      }
    };

    const onPointerClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pinMeshesRef.current, true);

      let hitPin = null;
      for (let i = 0; i < intersects.length; i++) {
        const found = getPinFromObject(intersects[i].object);
        if (found) {
          hitPin = found;
          break;
        }
      }

      if (hitPin) {
        setActivePin(hitPin);
        onPinClick?.(hitPin);
        focusCameraOnPin(hitPin);
      }
    };

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('click', onPointerClick);

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera transition if target exists
      if (targetCamPosRef.current) {
        camera.position.lerp(targetCamPosRef.current.position, 0.07);
        controls.target.lerp(targetCamPosRef.current.target, 0.07);
        if (camera.position.distanceTo(targetCamPosRef.current.position) < 0.04) {
          targetCamPosRef.current = null;
        }
      }

      // Rotate pin rings & pulse glow
      pinMeshesRef.current.forEach((group) => {
        const ring = group.getObjectByName('pinRing');
        const glow = group.getObjectByName('pinGlow');
        if (ring) ring.rotation.z += delta * 1.5;
        if (glow) {
          const pulse = 1 + Math.sin(elapsedTime * 4 + group.userData.pinData.pinNumber) * 0.18;
          glow.scale.set(pulse, pulse, pulse);
        }
      });

      controls.autoRotate = isAutoRotate;
      controls.autoRotateSpeed = 1.2;
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
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('click', onPointerClick);
      cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
    };
  }, [isAutoRotate]);

  /**
   * Builds the Motherboard geometry & components
   */
  const buildMotherboardBoard = (scene) => {
    pinMeshesRef.current = [];

    // PCB Main Board (Dark Neutral Surface with high-tech traces)
    const pcbGeo = new THREE.BoxGeometry(10, 0.2, 10);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x151d1b,
      roughness: 0.5,
      metalness: 0.2,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.receiveShadow = true;
    scene.add(pcb);

    // Decorative Ground traces / Bus lines grid (Teal & dark neutral)
    const gridHelper = new THREE.GridHelper(9.6, 24, 0x45b8a5, 0x1a2e29);
    gridHelper.position.y = 0.11;
    scene.add(gridHelper);

    // 1. CPU Socket (LGA 1700 style)
    const socketGroup = new THREE.Group();
    socketGroup.position.set(2.2, 0.2, -1.6);
    
    const socketBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.18, 2.4),
      new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5 })
    );
    socketGroup.add(socketBase);

    const ihs = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.12, 1.6),
      new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.85, roughness: 0.2 })
    );
    ihs.position.y = 0.12;
    socketGroup.add(ihs);

    const lever = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 2.6, 8),
      new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 0.95, roughness: 0.1 })
    );
    lever.rotation.z = Math.PI / 2;
    lever.position.set(-0.95, 0.18, 0);
    socketGroup.add(lever);

    scene.add(socketGroup);

    // 2. VRM Heatsinks (Aluminum fin blocks around CPU)
    const vrm1 = createHeatsink(0.8, 0.9, 2.8, 0x334155);
    vrm1.position.set(0.6, 0.55, -1.6);
    scene.add(vrm1);

    const vrm2 = createHeatsink(2.8, 0.9, 0.8, 0x334155);
    vrm2.position.set(2.2, 0.55, -3.3);
    scene.add(vrm2);

    // 3. Northbridge / Main Chipset Heatsink (Center-left)
    const nbHeatsink = createHeatsink(1.6, 0.65, 1.6, 0x475569);
    nbHeatsink.position.set(-0.2, 0.45, 0.4);
    scene.add(nbHeatsink);

    // 4. Southbridge / PCH Heatsink (Bottom-left)
    const sbHeatsink = createHeatsink(1.8, 0.5, 1.6, 0x475569);
    sbHeatsink.position.set(-2.2, 0.35, 2.4);
    scene.add(sbHeatsink);

    // 5. Dual-Channel DDR RAM Slots (Top-right & Mid-right)
    const ramBank1 = createRamSlots(2, 0xfacc15, 0x1e293b);
    ramBank1.position.set(2.2, 0.3, 1.0);
    scene.add(ramBank1);

    const ramBank2 = createRamSlots(2, 0x45b8a5, 0x1e293b);
    ramBank2.position.set(3.4, 0.3, 1.8);
    scene.add(ramBank2);

    // 6. PCIe x16 Slot (Center vertical slot)
    const pcieSlot = createExpansionSlot(0.35, 0.45, 3.8, 0x0f172a);
    pcieSlot.position.set(-1.2, 0.32, 0.8);
    scene.add(pcieSlot);

    // 7. PCI Legacy Slots (3 Slots on left)
    [-2.2, -2.9, -3.6].forEach(xPos => {
      const pciSlot = createExpansionSlot(0.32, 0.4, 3.4, 0xf8fafc);
      pciSlot.position.set(xPos, 0.3, -1.4);
      scene.add(pciSlot);
    });

    // 8. Rear I/O Panel Stack (Back edge)
    const ioStack = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 1.2, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.3 })
    );
    ioStack.position.set(3.0, 0.7, -4.4);
    scene.add(ioStack);

    // 9. ATX 24-Pin Power Connector
    const atx24 = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.6, 2.4),
      new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.6 })
    );
    atx24.position.set(4.4, 0.4, -0.6);
    scene.add(atx24);

    // 10. CMOS Battery (CR2032 Coin Cell in circular socket)
    const batterySocket = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.42, 0.15, 24),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 })
    );
    batterySocket.position.set(-3.2, 0.18, 3.4);
    scene.add(batterySocket);

    const batteryCell = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.38, 0.12, 24),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.15 })
    );
    batteryCell.position.set(-3.2, 0.25, 3.4);
    scene.add(batteryCell);

    // 11. Cylindrical Capacitors matrix
    const capCoords = [
      [1.0, -0.4], [1.0, -0.9], [1.0, -1.4], [1.0, -2.0],
      [1.4, -3.2], [1.8, -3.2], [2.2, -3.2], [2.6, -3.2],
      [-0.4, 2.4], [-0.4, 3.0], [-1.0, 3.2], [-1.4, 3.2]
    ];
    capCoords.forEach(([x, z]) => {
      const cap = createCapacitor();
      cap.position.set(x, 0.3, z);
      scene.add(cap);
    });

    // 12. Create the 10 Interactive Numbered 3D Pins
    MOTHERBOARD_PINS.forEach((pin) => {
      const pinGroup = create3DPinMarker(pin);
      scene.add(pinGroup);
      pinMeshesRef.current.push(pinGroup);
    });
  };

  const createHeatsink = (w, h, d, color) => {
    const group = new THREE.Group();
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(w, h * 0.25, d),
      new THREE.MeshStandardMaterial({ color, metalness: 0.75, roughness: 0.25 })
    );
    group.add(base);

    const finCount = Math.floor(d * 4);
    const finThickness = 0.04;
    const spacing = d / finCount;
    for (let i = 0; i < finCount; i++) {
      const fin = new THREE.Mesh(
        new THREE.BoxGeometry(w * 0.96, h * 0.75, finThickness),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2 })
      );
      fin.position.set(0, h * 0.45, -d / 2 + (i + 0.5) * spacing);
      group.add(fin);
    }
    return group;
  };

  const createRamSlots = (slotCount, accentColor, bodyColor) => {
    const group = new THREE.Group();
    for (let i = 0; i < slotCount; i++) {
      const offset = (i - (slotCount - 1) / 2) * 0.45;
      const slotBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.4, 3.6),
        new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.5 })
      );
      slotBody.position.set(offset, 0, 0);
      group.add(slotBody);

      const innerLine = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.45, 3.4),
        new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.3 })
      );
      innerLine.position.set(offset, 0.05, 0);
      group.add(innerLine);

      [-1.85, 1.85].forEach(zEnd => {
        const latch = new THREE.Mesh(
          new THREE.BoxGeometry(0.32, 0.55, 0.15),
          new THREE.MeshStandardMaterial({ color: 0xf1f5f9 })
        );
        latch.position.set(offset, 0.1, zEnd);
        group.add(latch);
      });
    }
    return group;
  };

  const createExpansionSlot = (w, h, d, color) => {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color, roughness: 0.4 })
    );
    group.add(body);

    const slotGroove = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.4, h * 0.6, d * 0.95),
      new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.9 })
    );
    slotGroove.position.y = h * 0.25;
    group.add(slotGroove);

    return group;
  };

  const createCapacitor = () => {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.42, 16),
      new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.4 })
    );
    group.add(body);

    const capTop = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.04, 16),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.15 })
    );
    capTop.position.y = 0.22;
    group.add(capTop);

    return group;
  };

  const create3DPinMarker = (pin) => {
    const group = new THREE.Group();
    group.position.set(pin.position3D.x, pin.position3D.y + 0.35, pin.position3D.z);
    group.userData = { pinData: pin };

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x5bc47a,
        emissive: 0x2f6543,
        emissiveIntensity: 0.6,
        roughness: 0.2
      })
    );
    sphere.userData = { pinData: pin };
    group.add(sphere);

    const ringGeo = new THREE.RingGeometry(0.28, 0.38, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x45b8a5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.name = 'pinRing';
    ring.userData = { pinData: pin };
    group.add(ring);

    const glowGeo = new THREE.SphereGeometry(0.34, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x5bc47a,
      transparent: true,
      opacity: 0.25
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.name = 'pinGlow';
    glow.userData = { pinData: pin };
    group.add(glow);

    const stalk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.45, 8),
      new THREE.MeshStandardMaterial({ color: 0x45b8a5, metalness: 0.8 })
    );
    stalk.position.y = -0.25;
    stalk.userData = { pinData: pin };
    group.add(stalk);

    return group;
  };

  const focusCameraOnPin = (pin) => {
    if (cameraRef.current && controlsRef.current) {
      targetCamPosRef.current = {
        position: new THREE.Vector3(
          pin.position3D.x + (pin.cameraAngle?.x || 0) * 0.4,
          pin.cameraAngle?.y || 4.2,
          pin.position3D.z + 3.2
        ),
        target: new THREE.Vector3(pin.position3D.x, pin.position3D.y, pin.position3D.z)
      };
    }
  };

  const setCameraAngle = (view) => {
    setCameraView(view);
    if (!cameraRef.current || !controlsRef.current) return;

    if (view === 'isometric') {
      targetCamPosRef.current = {
        position: new THREE.Vector3(0, 9.5, 10.5),
        target: new THREE.Vector3(0, 0, 0)
      };
    } else if (view === 'topdown') {
      targetCamPosRef.current = {
        position: new THREE.Vector3(0, 13, 0.01),
        target: new THREE.Vector3(0, 0, 0)
      };
    } else if (view === 'front') {
      targetCamPosRef.current = {
        position: new THREE.Vector3(0, 2.2, 9),
        target: new THREE.Vector3(0, 0.4, 0)
      };
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl bg-slate-50 border border-slate-200/90 overflow-hidden shadow-sm flex flex-col ${heightClass} ${className}`}
    >
      {/* HUD Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-5 py-2.5 border-b border-slate-200 bg-white/95 backdrop-blur-md gap-2 shrink-0 z-20">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono font-bold text-slate-900 tracking-wider uppercase">
            MOTHERBOARD 3D DIGITAL TWIN
          </span>
          <span className="text-[10px] font-mono text-amber-700 font-semibold hidden sm:inline">
            [ WEBGL 60FPS • 10 PINS ]
          </span>
        </div>

        {/* 3D Camera Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 backdrop-blur-md">
          <button
            onClick={() => setCameraAngle('isometric')}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all ${
              cameraView === 'isometric' ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Isometric High-Angle"
          >
            Iso
          </button>
          <button
            onClick={() => setCameraAngle('topdown')}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all ${
              cameraView === 'topdown' ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Top-Down Blueprint"
          >
            Top
          </button>
          <button
            onClick={() => setCameraAngle('front')}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all ${
              cameraView === 'front' ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Front Angle"
          >
            Front
          </button>
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-1.5 rounded-lg text-xs transition-all ${
              isAutoRotate ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Toggle Auto-Rotate"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Viewport Mount Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

        {/* Hovered Pin Tooltip */}
        {hoveredPin && (
          <div className="absolute top-4 left-4 z-10 p-2.5 rounded-xl bg-white/95 border border-slate-200 text-xs font-mono text-slate-800 shadow-md pointer-events-none animate-fadeIn flex items-center gap-2">
            <span className="w-5 h-5 rounded-lg bg-emerald-500 text-white font-bold flex items-center justify-center text-[10px]">
              {hoveredPin.pinNumber}
            </span>
            <span className="font-bold text-emerald-700">{hoveredPin.shortName}</span>
            <span className="text-[10px] text-slate-500">({hoveredPin.category})</span>
          </div>
        )}
      </div>

      {/* Bottom Pin Quick-Selector Strip */}
      {showPinStrip && (
        <div className="shrink-0 px-3 py-2 border-t border-slate-200 bg-white/95 backdrop-blur-md flex items-center justify-between gap-2 overflow-x-auto z-20">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline font-semibold">
              HOTSPOT PINS:
            </span>
            {MOTHERBOARD_PINS.map((pin) => {
              const isSelected = activePin?.pinNumber === pin.pinNumber;
              return (
                <button
                  key={pin.id}
                  onClick={() => {
                    setActivePin(pin);
                    onPinClick?.(pin);
                    focusCameraOnPin(pin);
                  }}
                  className={`
                    relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-mono text-xs font-bold transition-all shrink-0
                    ${isSelected
                      ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)] scale-110'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/60 shadow-xs'
                    }
                  `}
                  title={`${pin.pinNumber}: ${pin.shortName}`}
                >
                  <span>{pin.pinNumber}</span>
                </button>
              );
            })}
          </div>

          {activePin && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono text-amber-700 font-bold hidden md:inline truncate max-w-[200px]">
                {activePin.shortName}
              </span>
              {showModal && (
                <button
                  onClick={() => setActivePin(activePin)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 text-xs font-mono font-semibold hover:bg-teal-100 transition-all shadow-xs"
                >
                  <Info className="w-3 h-3" />
                  <span>Details</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Educational Detail Modal */}
      {showModal && activePin && (
        <ComponentDetailModal
          pin={activePin}
          onClose={() => setActivePin(null)}
          onNavigatePin={(nextNum) => {
            const nextPin = getPinByNumber(nextNum);
            if (nextPin) {
              setActivePin(nextPin);
              onPinClick?.(nextPin);
              focusCameraOnPin(nextPin);
            }
          }}
          onFocus3D={(pin) => focusCameraOnPin(pin)}
        />
      )}
    </div>
  );
}
