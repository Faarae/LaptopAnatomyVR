import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Box, RotateCw, Compass, Eye, Sparkles, Layers, Info, Zap 
} from 'lucide-react';
import { MOTHERBOARD_PINS, getPinByNumber } from '../../data/motherboardPins';
import { GAMING_MOTHERBOARD_PINS, getGamingPinByNumber } from '../../data/gamingMotherboardData';
import { ENTRY_MOTHERBOARD_PINS, getEntryPinByNumber } from '../../data/entryMotherboardData';
import { CREATOR_MOTHERBOARD_PINS, getCreatorPinByNumber } from '../../data/creatorMotherboardData';
import { buildGamingMotherboard } from './motherboards/gaming/GamingMotherboard';
import { buildEntryMotherboard } from './motherboards/entry/EntryMotherboard';
import { buildCreatorMotherboard } from './motherboards/creator/CreatorMotherboard';
import { create3DPinMarker } from './motherboards/common/PinMarker3D';
import ComponentDetailModal from './ComponentDetailModal';

/**
 * Motherboard3DViewer
 * 100% Native Three.js WebGL Interactive Motherboard Engine:
 * - 60 FPS hardware accelerated WebGL rendering
 * - Category Isolation: Dedicated 3D Motherboards for Entry Level, Gaming, Creator, and Desktop
 * - 10 Interactive numbered hotspot pins with raycasting
 * - Downward 'V' chevron 3D markers with dynamic glowing & bobbing
 * - Smooth camera tweening to pins and angle presets (Camera settings 100% preserved)
 * - OrbitControls with touch & mouse drag
 */
export default function Motherboard3DViewer({
  laptopId = 'laptop-a',
  category = 'Entry Level',
  highlightPinNumber = null,
  onPinClick = null,
  className = "",
  heightClass = "h-[450px] sm:h-[520px] lg:h-[580px]",
  showModal = true,
  showPinStrip = true,
}) {
  const isDesktop = category === 'desktop' || laptopId === 'desktop';
  const isGaming = !isDesktop && (laptopId === 'laptop-b' || category === 'Gaming');
  const isCreator = !isDesktop && (laptopId === 'laptop-c' || category === 'Creator');
  const isEntry = !isDesktop && !isGaming && !isCreator;

  let currentPins = ENTRY_MOTHERBOARD_PINS;
  let getPin = getEntryPinByNumber;

  if (isDesktop) {
    currentPins = MOTHERBOARD_PINS;
    getPin = getPinByNumber;
  } else if (isGaming) {
    currentPins = GAMING_MOTHERBOARD_PINS;
    getPin = getGamingPinByNumber;
  } else if (isCreator) {
    currentPins = CREATOR_MOTHERBOARD_PINS;
    getPin = getCreatorPinByNumber;
  }

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
  const fanRotatorsRef = useRef([]);
  const updateHighlightRef = useRef(null);
  const animFrameRef = useRef(null);
  const targetCamPosRef = useRef(null);
  const activePinRef = useRef(activePin);

  useEffect(() => {
    activePinRef.current = activePin;
  }, [activePin]);

  // Sync external highlightPinNumber
  useEffect(() => {
    if (highlightPinNumber) {
      const pin = getPin(highlightPinNumber);
      if (pin) {
        setActivePin(pin);
        focusCameraOnPin(pin);
        if (updateHighlightRef.current) {
          updateHighlightRef.current(highlightPinNumber);
        }
      }
    } else {
      setActivePin(null);
      if (updateHighlightRef.current) {
        updateHighlightRef.current(null);
      }
    }
  }, [highlightPinNumber, laptopId, isGaming, isCreator, isDesktop]);

  /**
   * Initialize Three.js WebGL Scene (Camera settings 100% Preserved)
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

    // 2. Camera (UNTOUCHED: EXACT PRESERVED SETTINGS)
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

    // 4. OrbitControls (UNTOUCHED: EXACT PRESERVED SETTINGS)
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 3.0;
    controls.maxDistance = 24;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.6);
    mainLight.position.set(8, 14, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const accentLightColor = isGaming ? 0x10b981 : isCreator ? 0x0284c7 : 0x0d9488;
    const greenFill = new THREE.PointLight(accentLightColor, 1.8, 20);
    greenFill.position.set(-6, 5, -4);
    scene.add(greenFill);

    const tealFill = new THREE.PointLight(0x06b6d4, 1.5, 20);
    tealFill.position.set(6, 4, 6);
    scene.add(tealFill);

    // 6. Build Motherboard Geometry (Category Isolated)
    if (isDesktop) {
      buildDesktopMotherboardBoard(scene);
    } else if (isGaming) {
      const { pinMeshes, fanRotators, updateHighlight } = buildGamingMotherboard(scene);
      pinMeshesRef.current = pinMeshes;
      fanRotatorsRef.current = fanRotators || [];
      updateHighlightRef.current = updateHighlight;
    } else if (isCreator) {
      const { pinMeshes, fanRotators, updateHighlight } = buildCreatorMotherboard(scene);
      pinMeshesRef.current = pinMeshes;
      fanRotatorsRef.current = fanRotators || [];
      updateHighlightRef.current = updateHighlight;
    } else {
      const { pinMeshes, fanRotators, updateHighlight } = buildEntryMotherboard(scene);
      pinMeshesRef.current = pinMeshes;
      fanRotatorsRef.current = fanRotators || [];
      updateHighlightRef.current = updateHighlight;
    }

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
        if (updateHighlightRef.current) {
          updateHighlightRef.current(hitPin.pinNumber);
        }
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

      // Rotate fan impellers in real-time
      if (fanRotatorsRef.current.length > 0) {
        fanRotatorsRef.current.forEach((fan) => {
          fan.rotation.y += delta * 12.0;
        });
      }

      // Animate 3D V-Arrow Indicators (Timbul & Bersinar Sepanjang Bentuknya saat ditekan)
      const activePinNum = activePinRef.current?.pinNumber;
      pinMeshesRef.current.forEach((group) => {
        const pinData = group.userData?.pinData;
        if (!pinData) return;
        const isSelected = activePinNum === pinData.pinNumber;

        const arrowGroup = group.getObjectByName('arrowGroup');
        const vMesh = group.getObjectByName('vArrowMesh');

        if (arrowGroup) {
          const bob = Math.sin(elapsedTime * 3.5 + pinData.pinNumber * 0.7) * 0.05;
          arrowGroup.position.y = (isSelected ? 0.32 : 0) + bob;
        }

        if (vMesh && vMesh.material) {
          if (isSelected) {
            vMesh.scale.set(1.38, 1.38, 1.38);
            vMesh.material.emissiveIntensity = 2.6 + Math.sin(elapsedTime * 6) * 0.6;
            vMesh.material.emissive.setHex(0x34d399);
          } else {
            vMesh.scale.set(1.0, 1.0, 1.0);
            vMesh.material.emissiveIntensity = 0.75;
            vMesh.material.emissive.setHex(0x059669);
          }
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
  }, [laptopId, isGaming, isCreator, isDesktop, isAutoRotate]);

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

  // View Presets (UNTOUCHED: EXACT PRESERVED SETTINGS)
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

  /**
   * Desktop / Classic Motherboard for desktop challenges
   */
  const buildDesktopMotherboardBoard = (scene) => {
    pinMeshesRef.current = [];

    const pcbGeo = new THREE.BoxGeometry(10, 0.2, 10);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x151d1b,
      roughness: 0.5,
      metalness: 0.2,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.receiveShadow = true;
    scene.add(pcb);

    const gridHelper = new THREE.GridHelper(9.6, 24, 0x45b8a5, 0x1a2e29);
    gridHelper.position.y = 0.11;
    scene.add(gridHelper);

    // CPU Socket
    const socketGroup = new THREE.Group();
    socketGroup.position.set(2.2, 0.2, -1.6);
    const socketBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.18, 2.4),
      new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5 })
    );
    socketGroup.add(socketBase);

    const ihs = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.12, 1.6),
      new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.88, roughness: 0.2 })
    );
    ihs.position.y = 0.12;
    socketGroup.add(ihs);

    const lever = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 2.0, 8),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 })
    );
    lever.rotation.z = Math.PI / 2;
    lever.position.set(-1.0, 0.15, 0);
    socketGroup.add(lever);
    scene.add(socketGroup);

    // RAM Slots
    const ramBank1 = createRamSlots(2, 0xfacc15, 0x1e293b);
    ramBank1.position.set(3.8, 0.2, 1.2);
    scene.add(ramBank1);

    const ramBank2 = createRamSlots(2, 0x38bdf8, 0x1e293b);
    ramBank2.position.set(3.8, 0.2, 2.6);
    scene.add(ramBank2);

    // PCIe x16 Slot
    const pcie1 = createExpansionSlot(0.4, 0.35, 6.2, 0x1e293b);
    pcie1.position.set(-0.2, 0.2, 0);
    scene.add(pcie1);

    const pcie2 = createExpansionSlot(0.35, 0.3, 3.8, 0x334155);
    pcie2.position.set(-1.6, 0.18, 1.2);
    scene.add(pcie2);

    const pcie3 = createExpansionSlot(0.35, 0.3, 3.8, 0x334155);
    pcie3.position.set(-2.8, 0.18, 1.2);
    scene.add(pcie3);

    // VRM Heatsinks
    const vrmTop = createHeatsink(3.6, 0.7, 1.2, 0x334155);
    vrmTop.position.set(2.2, 0.45, -3.6);
    scene.add(vrmTop);

    const vrmLeft = createHeatsink(1.2, 0.7, 2.4, 0x334155);
    vrmLeft.position.set(0.6, 0.45, -1.8);
    scene.add(vrmLeft);

    const chipset = createHeatsink(1.8, 0.5, 1.8, 0x1e293b);
    chipset.position.set(-1.8, 0.35, -2.4);
    scene.add(chipset);

    const m2Shield = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.18, 3.0),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.25 })
    );
    m2Shield.position.set(1.4, 0.2, 1.5);
    scene.add(m2Shield);

    const ioStack = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 1.2, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.15 })
    );
    ioStack.position.set(3.0, 0.7, -4.4);
    scene.add(ioStack);

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
    const spacing = d / finCount;
    for (let i = 0; i < finCount; i++) {
      const fin = new THREE.Mesh(
        new THREE.BoxGeometry(w * 0.96, h * 0.75, 0.04),
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
            {isDesktop ? 'DESKTOP MOTHERBOARD 3D DIGITAL TWIN' : isGaming ? 'GAMING MAINBOARD 3D DIGITAL TWIN' : isCreator ? 'CREATOR MAINBOARD 3D DIGITAL TWIN' : 'ENTRY ULTRABOOK 3D DIGITAL TWIN'}
          </span>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold hidden sm:inline">
            [ WEBGL 60FPS • 10 HOTSPOTS ]
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
              HOTSPOTS:
            </span>
            {currentPins.map((pin) => {
              const isSelected = activePin?.pinNumber === pin.pinNumber;
              return (
                <button
                  key={pin.id}
                  onClick={() => {
                    setActivePin(pin);
                    onPinClick?.(pin);
                    focusCameraOnPin(pin);
                    if (updateHighlightRef.current) {
                      updateHighlightRef.current(pin.pinNumber);
                    }
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
              <span className="text-[11px] font-mono text-emerald-800 font-bold hidden md:inline truncate max-w-[200px]">
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
            const nextPin = getPin(nextNum);
            if (nextPin) {
              setActivePin(nextPin);
              onPinClick?.(nextPin);
              focusCameraOnPin(nextPin);
              if (updateHighlightRef.current) {
                updateHighlightRef.current(nextPin.pinNumber);
              }
            }
          }}
          onFocus3D={(pin) => focusCameraOnPin(pin)}
        />
      )}
    </div>
  );
}
