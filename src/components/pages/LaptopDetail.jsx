import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  ArrowLeft, Cpu, Sparkles, HardDrive, Fan, Battery, Layers, 
  CheckCircle2, Compass, RotateCw, Eye, Zap, Info, Box, ExternalLink,
  Camera, Image as ImageIcon, ShieldCheck, Flame, Palette
} from 'lucide-react';
import Component3DViewer from '../3d/Component3DViewer';
import { getLaptopById } from '../../data/laptopData';
import { MOTHERBOARD_PINS, getPinByNumber } from '../../data/motherboardPins';
import { GAMING_MOTHERBOARD_PINS, getGamingPinByNumber } from '../../data/gamingMotherboardData';
import { ENTRY_MOTHERBOARD_PINS, getEntryPinByNumber } from '../../data/entryMotherboardData';
import { CREATOR_MOTHERBOARD_PINS, getCreatorPinByNumber } from '../../data/creatorMotherboardData';
import { buildGamingMotherboard } from '../3d/motherboards/gaming/GamingMotherboard';
import { buildEntryMotherboard } from '../3d/motherboards/entry/EntryMotherboard';
import { buildCreatorMotherboard } from '../3d/motherboards/creator/CreatorMotherboard';

/**
 * LaptopDetail (Explore Sub-Page)
 * FULLSCREEN WebGL 3D Motherboard Digital Twin Experience:
 * - 100% WebGL Canvas filling the background (Hardware Accelerated 60 FPS)
 * - Category Isolation: Dedicated 3D Motherboards for Entry Level, Gaming, and Creator
 * - OrbitControls for seamless 3D rotation, pan, zoom (Camera config 100% preserved)
 * - Floating glassmorphic HUD & technical dossier panels
 * - STRICT zero-scroll viewport (fits within 100vh)
 * - Click spec item on the left -> 3D camera smoothly focuses & highlights component
 */
export default function LaptopDetail({ laptopId, onNavigate }) {
  const laptop = getLaptopById(laptopId);
  const isGaming = laptop.id === 'laptop-b' || laptop.category === 'Gaming';
  const isCreator = laptop.id === 'laptop-c' || laptop.category === 'Creator';
  const isEntry = !isGaming && !isCreator;

  // Active dataset and pin resolver
  let currentPins = ENTRY_MOTHERBOARD_PINS;
  let getPin = getEntryPinByNumber;

  if (isGaming) {
    currentPins = GAMING_MOTHERBOARD_PINS;
    getPin = getGamingPinByNumber;
  } else if (isCreator) {
    currentPins = CREATOR_MOTHERBOARD_PINS;
    getPin = getCreatorPinByNumber;
  }

  // Active highlighted pin state (default Pin #02 for CPU across all categories)
  const defaultPinNum = 2;
  const [selectedPinNumber, setSelectedPinNumber] = useState(defaultPinNum);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [cameraView, setCameraView] = useState('isometric');
  const [photoError, setPhotoError] = useState(false);

  const selectedPinNumberRef = useRef(selectedPinNumber);
  useEffect(() => {
    selectedPinNumberRef.current = selectedPinNumber;
    setPhotoError(false);
  }, [selectedPinNumber]);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const pinMeshesRef = useRef([]);
  const fanRotatorsRef = useRef([]);
  const updateHighlightRef = useRef(null);
  const animFrameRef = useRef(null);
  const targetCamPosRef = useRef(null);

  const activePin = getPin(selectedPinNumber) || currentPins[0];

  // Spec items mapped to category-specific pin numbers
  let specItems = [];
  if (isGaming) {
    specItems = [
      { label: "Processor (CPU)", value: laptop.specs.cpu, icon: Cpu, accent: "#10B981", pinNum: 2, pinName: "Pin #02: Intel Core i7-14650HX" },
      { label: "Dedicated Graphics (GPU)", value: laptop.specs.gpu, icon: Sparkles, accent: "#22C55E", pinNum: 1, pinName: "Pin #01: NVIDIA RTX 4060 GPU" },
      { label: "System Memory (RAM)", value: laptop.specs.ram, icon: Layers, accent: "#38BDF8", pinNum: 4, pinName: "Pin #04: Dual DDR5 SO-DIMM" },
      { label: "High-Speed Storage (SSD)", value: laptop.specs.storage, icon: HardDrive, accent: "#34D399", pinNum: 3, pinName: "Pin #03: 1TB PCIe 4.0 NVMe" },
      { label: "Dual Fan Thermal Cooling", value: laptop.specs.cooling, icon: Fan, accent: "#F59E0B", pinNum: 5, pinName: "Pin #05: Dual Fan & Heatpipes" },
      { label: "90Wh Battery & Power IC", value: laptop.specs.battery, icon: Battery, accent: "#EAB308", pinNum: 9, pinName: "Pin #09: 90Wh Battery & BMS" },
    ];
  } else if (isCreator) {
    specItems = [
      { label: "Processor & NPU (CPU)", value: laptop.specs.cpu, icon: Cpu, accent: "#0284C7", pinNum: 2, pinName: "Pin #02: AMD Ryzen AI 9" },
      { label: "Studio Graphics (GPU)", value: laptop.specs.gpu, icon: Sparkles, accent: "#38BDF8", pinNum: 1, pinName: "Pin #01: NVIDIA RTX 4070 Studio" },
      { label: "Unified Memory (RAM)", value: laptop.specs.ram, icon: Layers, accent: "#06B6D4", pinNum: 4, pinName: "Pin #04: 32GB LPDDR5X-7500" },
      { label: "PCIe 4.0 Storage (SSD)", value: laptop.specs.storage, icon: HardDrive, accent: "#0284C7", pinNum: 3, pinName: "Pin #03: 2TB Pro NVMe SSD" },
      { label: "Dual Studio Fan Cooling", value: laptop.specs.cooling, icon: Fan, accent: "#F59E0B", pinNum: 5, pinName: "Pin #05: Symmetrical Cooling" },
      { label: "90Wh Studio Endurance", value: laptop.specs.battery, icon: Battery, accent: "#EAB308", pinNum: 9, pinName: "Pin #09: 90Wh Battery & 100W PD" },
    ];
  } else {
    // Entry Level
    specItems = [
      { label: "Processor (CPU)", value: laptop.specs.cpu, icon: Cpu, accent: "#0D9488", pinNum: 2, pinName: "Pin #02: Intel Core i5-1335U" },
      { label: "Integrated Graphics (iGPU)", value: laptop.specs.gpu, icon: Sparkles, accent: "#14B8A6", pinNum: 1, pinName: "Pin #01: Intel Iris Xe Graphics" },
      { label: "Soldered Memory (RAM)", value: laptop.specs.ram, icon: Layers, accent: "#2DD4BF", pinNum: 4, pinName: "Pin #04: 16GB DDR4 Soldered" },
      { label: "NVMe Storage (SSD)", value: laptop.specs.storage, icon: HardDrive, accent: "#0D9488", pinNum: 3, pinName: "Pin #03: 512GB PCIe 3.0 SSD" },
      { label: "Single Fan Cooling", value: laptop.specs.cooling, icon: Fan, accent: "#F59E0B", pinNum: 5, pinName: "Pin #05: Single Blower Fan" },
      { label: "42Wh Battery & Power IC", value: laptop.specs.battery, icon: Battery, accent: "#EAB308", pinNum: 9, pinName: "Pin #09: 42Wh Battery & BMS" },
    ];
  }

  /**
   * Three.js Fullscreen WebGL Motherboard Setup (Camera settings 100% Preserved)
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
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.022);

    // 2. Camera (UNTOUCHED: EXACT PRESERVED SETTINGS)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 10, 11);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
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
    controls.minDistance = 2.8;
    controls.maxDistance = 24;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.7);
    mainLight.position.set(8, 16, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const accentFill = new THREE.PointLight(
      isGaming ? 0x10b981 : isCreator ? 0x0284c7 : 0x0d9488,
      2.0,
      25
    );
    accentFill.position.set(-6, 6, -4);
    scene.add(accentFill);

    const cyanFill = new THREE.PointLight(0x06b6d4, 1.6, 25);
    cyanFill.position.set(6, 5, 6);
    scene.add(cyanFill);

    // 6. Build Motherboard (Category Isolated)
    if (isGaming) {
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

    // 7. Raycaster for clicking 3D pins
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
        setSelectedPinNumber(hitPin.pinNumber);
        focusCameraOnPin(hitPin);
      }
    };

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('click', onPointerClick);

    // 8. Animation loop (Smooth 60 FPS WebGL loop with fan rotation & camera interpolation)
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      if (targetCamPosRef.current) {
        camera.position.lerp(targetCamPosRef.current.position, 0.06);
        controls.target.lerp(targetCamPosRef.current.target, 0.06);
        if (camera.position.distanceTo(targetCamPosRef.current.position) < 0.05) {
          targetCamPosRef.current = null;
        }
      }

      // Rotate fans in real-time
      if (fanRotatorsRef.current.length > 0) {
        fanRotatorsRef.current.forEach((fan) => {
          fan.rotation.y += delta * 12.0;
        });
      }

      // Animate 3D V-Arrow Indicators (Timbul & Bersinar Sepanjang Bentuknya saat ditekan)
      const activePinNum = selectedPinNumberRef.current;
      pinMeshesRef.current.forEach((group) => {
        const pinData = group.userData.pinData;
        const isSelected = activePinNum === pinData.pinNumber;

        const arrowGroup = group.getObjectByName('arrowGroup');
        const vMesh = group.getObjectByName('vArrowMesh');

        if (arrowGroup) {
          const bob = Math.sin(elapsedTime * 3.5 + pinData.pinNumber * 0.7) * 0.05;
          // Timbul: Menjulang naik ke atas saat pin ditekan / aktif
          arrowGroup.position.y = (isSelected ? 0.32 : 0) + bob;
        }

        if (vMesh && vMesh.material) {
          if (isSelected) {
            // Timbul membesar sepanjang bentuk huruf V & bersinar terang
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
      controls.autoRotateSpeed = 1.0;
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
  }, [laptopId, isAutoRotate]);

  // Focus camera and update highlights when selected pin changes
  useEffect(() => {
    const pin = getPin(selectedPinNumber);
    if (pin) {
      focusCameraOnPin(pin);
      if (updateHighlightRef.current) {
        updateHighlightRef.current(selectedPinNumber);
      }
    }
  }, [selectedPinNumber, laptopId]);

  const focusCameraOnPin = (pin) => {
    if (cameraRef.current && controlsRef.current) {
      targetCamPosRef.current = {
        position: new THREE.Vector3(
          pin.position3D.x + (pin.cameraAngle?.x || 0) * 0.35,
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
        position: new THREE.Vector3(0, 9.8, 10.8),
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
      className="relative w-full h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-hidden select-none bg-slate-100"
    >
      {/* ── FULLSCREEN WEBGL 3D BACKGROUND CANVAS ── */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing z-0" 
      />

      {/* Hovered Pin Floating Tag */}
      {hoveredPin && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 p-2 px-3.5 rounded-xl bg-white/95 border border-emerald-300 text-xs font-mono text-slate-800 shadow-xl pointer-events-none animate-fadeIn flex items-center gap-2">
          <span className="w-5 h-5 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
            {hoveredPin.pinNumber}
          </span>
          <span className="font-semibold text-emerald-700">{hoveredPin.shortName}</span>
          <span className="text-[10px] text-slate-500">({hoveredPin.category})</span>
        </div>
      )}

      {/* ── TOP FLOATING CONTROL HUD BAR ── */}
      <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Left: Back button & Title */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => onNavigate('laptop-selection')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200/90 text-slate-700 text-xs font-mono hover:border-emerald-300 hover:text-emerald-700 transition-all backdrop-blur-md shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Pilihan Laptop</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white/90 border border-slate-200/90 backdrop-blur-md shadow-xs">
            <span className="text-xs font-mono text-slate-400">{laptop.code} //</span>
            <span className="text-xs font-mono font-bold text-slate-800">{laptop.name}</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-semibold ${
              isGaming ? 'bg-emerald-100/70 text-emerald-800 border-emerald-300' :
              isCreator ? 'bg-sky-100/70 text-sky-800 border-sky-300' :
              'bg-teal-100/70 text-teal-800 border-teal-300'
            }`}>
              {isGaming ? '🔥 GAMING HARDWARE' : isCreator ? '🎨 CREATOR STUDIO' : '⚡ ENERGY EFFICIENT'}
            </span>
          </div>
        </div>

        {/* Right: Camera Angle & Rotate Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-xl bg-white/90 border border-slate-200/90 backdrop-blur-md shadow-sm">
          <button
            onClick={() => setCameraAngle('isometric')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
              cameraView === 'isometric' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Iso 3D
          </button>
          <button
            onClick={() => setCameraAngle('topdown')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
              cameraView === 'topdown' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Top Blueprint
          </button>
          <button
            onClick={() => setCameraAngle('front')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
              cameraView === 'front' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Front Angle
          </button>
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-1.5 rounded-lg text-xs transition-all ${
              isAutoRotate ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Toggle Auto-Rotate"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── LEFT FLOATING GLASS PANEL: HARDWARE SPECS SELECTOR ── */}
      <div className="absolute top-16 left-4 bottom-16 w-72 sm:w-80 lg:w-84 z-20 flex flex-col justify-between pointer-events-auto backdrop-blur-xl bg-white/92 border border-slate-200/90 rounded-2xl p-4 shadow-xl overflow-y-auto">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[10px] font-mono text-emerald-700 uppercase tracking-wider font-semibold">
              ARSITEKTUR HARDWARE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
              {laptop.alias}
            </span>
          </div>

          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            {laptop.description}
          </p>

          <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold pt-1">
            Komponen Utama (Klik untuk fokus 3D):
          </h4>

          {/* Clickable Component Spec Cards */}
          <div className="space-y-2">
            {specItems.map((spec, idx) => {
              const Icon = spec.icon;
              const isSelected = selectedPinNumber === spec.pinNum;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedPinNumber(spec.pinNum)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-300 shadow-xs ring-1 ring-emerald-500/20'
                      : 'bg-slate-50 border-slate-200/70 hover:border-emerald-200 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[11px] font-mono font-medium text-slate-800">
                        {spec.label}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-700 px-1.5 py-0.5 rounded bg-emerald-100/70 font-bold">
                      Pin #{spec.pinNum < 10 ? `0${spec.pinNum}` : spec.pinNum}
                    </span>
                  </div>
                  <p className="text-[11px] font-sans text-slate-600 font-medium pl-5 truncate">
                    {spec.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom hint */}
        <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Klik pin atau putar papan 3D dengan mouse untuk eksplorasi.</span>
        </div>
      </div>

      {/* ── RIGHT FLOATING GLASS PANEL: ACTIVE COMPONENT TECHNICAL DOSSIER ── */}
      {activePin && (
        <div className="absolute top-16 right-4 bottom-16 w-80 sm:w-88 lg:w-96 z-20 flex flex-col justify-between pointer-events-auto backdrop-blur-xl bg-white/92 border border-slate-200/90 rounded-2xl p-4 shadow-xl overflow-y-auto">
          <div className="space-y-3">
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold font-mono text-xs flex items-center justify-center shadow-xs">
                  {activePin.pinNumber}
                </span>
                <div>
                  <span className="text-[9px] font-mono text-emerald-700 block uppercase font-bold">
                    PIN #{activePin.pinNumber < 10 ? `0${activePin.pinNumber}` : activePin.pinNumber} // {activePin.badge}
                  </span>
                  <span className="text-xs font-bold font-display text-slate-900">
                    {activePin.shortName}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {activePin.category}
              </span>
            </div>

            {/* Floating 3D Component Model Card */}
            <div className="rounded-xl overflow-hidden border border-slate-200/90 bg-slate-900/5 shadow-xs">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100/90 border-b border-slate-200/70">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold flex items-center gap-1.5">
                  <Box className="w-3 h-3 text-emerald-600" />
                  Model 3D Interaktif
                </span>
                <span className="text-[9px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  Bisa Diputar 360°
                </span>
              </div>
              <div className="h-36 w-full relative bg-slate-50/70 rounded-b-xl overflow-hidden flex items-center justify-center">
                <Component3DViewer
                  type={activePin.threeType || activePin.componentKey || 'cpu'}
                  category={laptop?.category || 'Gaming'}
                  laptopId={laptopId}
                  autoRotate={true}
                  heightClass="h-full"
                  hideControls={true}
                  hideHint={true}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Box Foto Fisik Riil Komponen */}
            <div className="rounded-xl overflow-hidden border border-slate-200/90 bg-white shadow-xs">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100/90 border-b border-slate-200/70">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center gap-1.5">
                  <Camera className="w-3 h-3 text-emerald-600" />
                  Foto Fisik Riil Komponen
                </span>
                <span className="text-[9px] font-mono text-slate-500">
                  {activePin.imageName || `pin-${activePin.pinNumber}.jpg`}
                </span>
              </div>

              {!photoError ? (
                <div className="relative group bg-slate-100 flex items-center justify-center min-h-[110px] max-h-[130px] overflow-hidden">
                  <img
                    src={`/images/components/${activePin.imageName || `pin-${activePin.pinNumber}.jpg`}`}
                    alt={activePin.shortName}
                    onError={() => setPhotoError(true)}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-1 right-1.5 bg-black/60 text-white text-[8px] font-mono px-1.5 py-0.5 rounded backdrop-blur-xs">
                    Foto Asli
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-amber-50/50 border border-dashed border-amber-300/80 rounded-b-xl flex flex-col items-center text-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-900 block font-sans">
                      Foto Fisik Belum Dimasukkan
                    </span>
                    <span className="text-[9px] font-mono text-slate-600 block mt-0.5">
                      Simpan file foto di: <code className="bg-amber-100/80 text-amber-950 font-bold px-1 py-0.5 rounded">public/images/components/{activePin.imageName || `pin-${activePin.pinNumber}.jpg`}</code>
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 leading-tight">
                    Format: JPG / PNG (Rasio 16:9). Cek <code className="text-emerald-700">PANDUAN_FOTO_KOMPONEN.md</code>.
                  </p>
                </div>
              )}
            </div>

            {/* Architecture Role */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <h5 className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 mb-1 font-semibold">
                Fungsi Arsitektur
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {activePin.role}
              </p>
            </div>

            {/* Practical Application in Modern Laptops */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <h5 className="text-[10px] font-mono uppercase tracking-wider text-amber-700 mb-1 font-semibold flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-amber-600" />
                <span>Penerapan Pada Laptop Modern</span>
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {activePin.laptopComparison}
              </p>
            </div>

            {/* Hardware Specs Matrix */}
            <div>
              <h5 className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
                Spesifikasi Bus & Elektrikal:
              </h5>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                {Object.entries(activePin.specs).map(([k, v], i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                    <span className="text-[9px] text-slate-400 block">{k}</span>
                    <span className="text-slate-800 font-semibold truncate block">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Educational Insight (if present) */}
            {activePin.educationalInsight && (
              <div className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-200 flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-teal-800 font-sans leading-tight">
                  <strong className="font-semibold">Educational Insight:</strong> {activePin.educationalInsight}
                </p>
              </div>
            )}
          </div>

          {/* VR Inspection Observation Tip */}
          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2 mt-2">
            <Eye className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-700 font-sans leading-tight">
              {activePin.vrNote}
            </p>
          </div>
        </div>
      )}

      {/* ── BOTTOM FLOATING HOTSPOT PINS QUICK-BAR (Pins 1 to 10) ── */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-xl shadow-xl pointer-events-auto">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-2 hidden sm:inline font-semibold">
          HOTSPOT 1–10:
        </span>
        {currentPins.map((pin) => {
          const isSelected = selectedPinNumber === pin.pinNumber;
          return (
            <button
              key={pin.id}
              onClick={() => setSelectedPinNumber(pin.pinNumber)}
              className={`
                relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-mono text-xs font-bold transition-all shrink-0
                ${isSelected
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-110'
                  : 'bg-slate-100 text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-slate-50'
                }
              `}
              title={`Pin #${pin.pinNumber}: ${pin.shortName}`}
            >
              <span>{pin.pinNumber}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
