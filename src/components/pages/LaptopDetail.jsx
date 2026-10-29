import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  ArrowLeft, Cpu, Sparkles, HardDrive, Fan, Battery, Layers, RefreshCw
} from 'lucide-react';
import Component3DViewer from '../3d/Component3DViewer';
import { getLaptopById } from '../../data/laptopData';
import { GAMING_MOTHERBOARD_PINS, getGamingPinByNumber } from '../../data/gamingMotherboardData';
import { ENTRY_MOTHERBOARD_PINS, getEntryPinByNumber } from '../../data/entryMotherboardData';
import { CREATOR_MOTHERBOARD_PINS, getCreatorPinByNumber } from '../../data/creatorMotherboardData';
import { buildGamingMotherboard } from '../3d/motherboards/gaming/GamingMotherboard';
import { buildEntryMotherboard } from '../3d/motherboards/entry/EntryMotherboard';
import { buildCreatorMotherboard } from '../3d/motherboards/creator/CreatorMotherboard';

/**
 * LaptopDetail (Edukasi VR Sub-Page)
 * FULLSCREEN WebGL 3D Motherboard Digital Twin Experience:
 * - 100% WebGL Canvas filling the background (Hardware Accelerated 60 FPS)
 * - Category Isolation: Dedicated 3D Motherboards for Entry Level, Gaming, and Creator
 * - OrbitControls for seamless 3D rotation, pan, zoom (Camera config 100% preserved)
 * - Structured Workspace Panels & Segmented Controls (rounded-lg / rounded-xl)
 */
export default function LaptopDetail({ laptopId, onNavigate }) {
  const laptop = getLaptopById(laptopId);
  const isGaming = laptop.id === 'laptop-b' || laptop.category === 'Gaming';
  const isCreator = laptop.id === 'laptop-c' || laptop.category === 'Creator';
  const isEntry = !isGaming && !isCreator;

  let currentPins = ENTRY_MOTHERBOARD_PINS;
  let getPin = getEntryPinByNumber;

  if (isGaming) {
    currentPins = GAMING_MOTHERBOARD_PINS;
    getPin = getGamingPinByNumber;
  } else if (isCreator) {
    currentPins = CREATOR_MOTHERBOARD_PINS;
    getPin = getCreatorPinByNumber;
  }

  const defaultPinNum = 2;
  const [selectedPinNumber, setSelectedPinNumber] = useState(defaultPinNum);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [cameraView, setCameraView] = useState('isometric');
  const [photoError, setPhotoError] = useState(false);
  const [mobilePanel, setMobilePanel] = useState('none'); // 'none' | 'specs' | 'dossier'

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
    specItems = [
      { label: "Processor (CPU)", value: laptop.specs.cpu, icon: Cpu, accent: "#0D9488", pinNum: 2, pinName: "Pin #02: Intel Core i5-1335U" },
      { label: "Integrated Graphics (iGPU)", value: laptop.specs.gpu, icon: Sparkles, accent: "#14B8A6", pinNum: 1, pinName: "Pin #01: Intel Iris Xe Graphics" },
      { label: "Soldered Memory (RAM)", value: laptop.specs.ram, icon: Layers, accent: "#2DD4BF", pinNum: 4, pinName: "Pin #04: 16GB DDR4 Soldered" },
      { label: "NVMe Storage (SSD)", value: laptop.specs.storage, icon: HardDrive, accent: "#0D9488", pinNum: 3, pinName: "Pin #03: 512GB PCIe 3.0 SSD" },
      { label: "Single Fan Cooling", value: laptop.specs.cooling, icon: Fan, accent: "#F59E0B", pinNum: 5, pinName: "Pin #05: Single Blower Fan" },
      { label: "42Wh Battery & Power IC", value: laptop.specs.battery, icon: Battery, accent: "#EAB308", pinNum: 9, pinName: "Pin #09: 42Wh Battery & BMS" },
    ];
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.022);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 10, 11);
    cameraRef.current = camera;

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

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 2.8;
    controls.maxDistance = 24;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

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

    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (targetCamPosRef.current) {
        camera.position.lerp(targetCamPosRef.current.position, 0.06);
        controls.target.lerp(targetCamPosRef.current.target, 0.06);
        if (camera.position.distanceTo(targetCamPosRef.current.position) < 0.05) {
          targetCamPosRef.current = null;
        }
      }

      if (fanRotatorsRef.current.length > 0) {
        fanRotatorsRef.current.forEach((fan) => {
          fan.rotation.y += delta * 12.0;
        });
      }

      const activePinNum = selectedPinNumberRef.current;
      pinMeshesRef.current.forEach((group) => {
        const pinData = group.userData.pinData;
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
      className="relative w-full h-[calc(100dvh-3.75rem)] max-h-[calc(100dvh-3.75rem)] overflow-hidden select-none bg-slate-100"
    >
      {/* ── FULLSCREEN WEBGL 3D BACKGROUND CANVAS ── */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing z-0 touch-none" 
      />

      {/* Hovered Pin Floating Tag */}
      {hoveredPin && (
        <div className="hidden sm:flex absolute top-16 left-1/2 -translate-x-1/2 z-30 p-2 px-3.5 rounded-lg bg-white/95 border border-emerald-400 text-xs font-mono text-slate-800 shadow-lg pointer-events-none items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
            {hoveredPin.pinNumber}
          </span>
          <span className="font-semibold text-slate-900">{hoveredPin.shortName}</span>
          <span className="text-[10px] text-emerald-700">({hoveredPin.category})</span>
        </div>
      )}

      {/* ── TOP FLOATING CONTROL HUD BAR (Responsive Mobile + Desktop) ── */}
      <div className="absolute top-2.5 sm:top-3 left-2.5 right-2.5 sm:left-4 sm:right-4 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pointer-events-none">
        {/* Left: Back button & Title */}
        <div className="pointer-events-auto flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onNavigate('laptop-selection')}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg bg-white/95 border border-slate-300 text-slate-700 text-xs font-sans font-semibold hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 transition-all backdrop-blur-md shadow-2xs cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-white/95 border border-slate-200 backdrop-blur-md shadow-2xs min-w-0">
            <span className="text-[11px] sm:text-xs font-mono text-slate-500 hidden sm:inline">{laptop.code} /</span>
            <span className="text-xs font-display font-bold text-slate-900 truncate">{laptop.name}</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-semibold border-l border-slate-200 pl-1.5 sm:pl-2 shrink-0">
              {laptop.category}
            </span>
          </div>
        </div>

        {/* Right: Camera Angle & Rotate Segmented Bar */}
        <div className="pointer-events-auto inline-flex items-center justify-between sm:justify-start gap-1 p-1 rounded-lg bg-white/95 border border-slate-200 backdrop-blur-md shadow-2xs overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setCameraAngle('isometric')}
            className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-sans font-semibold active:scale-90 transition-all cursor-pointer shrink-0 ${
              cameraView === 'isometric' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
            }`}
          >
            Isometrik
          </button>
          <button
            type="button"
            onClick={() => setCameraAngle('topdown')}
            className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-sans font-semibold active:scale-90 transition-all cursor-pointer shrink-0 ${
              cameraView === 'topdown' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
            }`}
          >
            Tampak Atas
          </button>
          <button
            type="button"
            onClick={() => setCameraAngle('front')}
            className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-sans font-semibold active:scale-90 transition-all cursor-pointer shrink-0 ${
              cameraView === 'front' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
            }`}
          >
            Tampak Depan
          </button>
          <button
            type="button"
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-sans font-semibold active:scale-90 transition-all cursor-pointer inline-flex items-center gap-1 shrink-0 ${
              isAutoRotate
                ? 'bg-violet-600 text-white shadow-sm shadow-violet-500/25'
                : 'text-slate-600 hover:text-violet-700 hover:bg-violet-50/50'
            }`}
            title="Putar Otomatis 360 Derajat"
          >
            <RefreshCw
              strokeWidth={1.75}
              className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`}
              style={{ animationDuration: '6s' }}
            />
            <span>360°</span>
          </button>
        </div>
      </div>

      {/* ── DESKTOP LEFT FLOATING PANEL: HARDWARE SPECS SELECTOR (lg:flex) ── */}
      <div className="hidden lg:flex absolute top-16 left-4 bottom-16 w-84 z-20 flex-col justify-between pointer-events-auto backdrop-blur-xl bg-white/95 border border-slate-200 rounded-xl p-4 shadow-lg overflow-y-auto">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
              Arsitektur Perangkat Keras
            </span>
            <span className="text-[11px] font-mono text-slate-700 font-semibold">
              {laptop.alias}
            </span>
          </div>

          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            {laptop.description}
          </p>

          <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold pt-1">
            Daftar Modul (Klik untuk Fokus):
          </h4>

          {/* Clickable Component Spec Cards */}
          <div className="space-y-2">
            {specItems.map((spec, idx) => {
              const isSelected = selectedPinNumber === spec.pinNum;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedPinNumber(spec.pinNum)}
                  className={`p-2.5 rounded-lg border transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                    isSelected
                      ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/15 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:border-emerald-400/60 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-display font-bold text-slate-900">
                      {spec.label}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 font-bold">
                      {isSelected && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-xs bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-xs h-2 w-2 bg-emerald-500" />
                        </span>
                      )}
                      <span>PIN #{spec.pinNum < 10 ? `0${spec.pinNum}` : spec.pinNum}</span>
                    </span>
                  </div>
                  <p className="text-[11px] font-sans text-slate-600 truncate">
                    {spec.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom hint */}
        <div className="pt-2 border-t border-slate-200 text-[11px] font-sans text-slate-500">
          Klik angka pin pada papan sirkuit atau daftar di atas untuk melihat rincian.
        </div>
      </div>

      {/* ── DESKTOP RIGHT FLOATING PANEL: ACTIVE COMPONENT TECHNICAL DOSSIER (lg:flex) ── */}
      {activePin && (
        <div className="hidden lg:flex absolute top-16 right-4 bottom-16 w-96 z-20 flex-col justify-between pointer-events-auto backdrop-blur-xl bg-white/95 border border-slate-200 rounded-xl p-4 shadow-lg overflow-y-auto">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold font-mono text-xs flex items-center justify-center shadow-2xs">
                  {activePin.pinNumber}
                </span>
                <div>
                  <span className="text-[10px] font-mono text-emerald-700 block uppercase font-bold">
                    PIN #{activePin.pinNumber < 10 ? `0${activePin.pinNumber}` : activePin.pinNumber} • {activePin.badge}
                  </span>
                  <span className="text-xs font-bold font-display text-slate-900">
                    {activePin.shortName}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-md font-semibold">
                {activePin.category}
              </span>
            </div>

            {/* 3D Component Model Card */}
            <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100 border-b border-slate-200">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold">
                  Model 3D Komponen
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Interaktif 360°
                </span>
              </div>
              <div className="h-36 w-full relative bg-white overflow-hidden flex items-center justify-center">
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

            {/* Foto Fisik Riil Komponen */}
            <div className="rounded-lg overflow-hidden border border-slate-200 bg-white">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100 border-b border-slate-200">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold">
                  Foto Fisik Riil
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {activePin.imageName || `pin-${activePin.pinNumber}.jpg`}
                </span>
              </div>

              {!photoError ? (
                <div className="relative bg-slate-100 flex items-center justify-center min-h-[110px] max-h-[130px] overflow-hidden">
                  <img
                    src={`/images/components/${activePin.imageName || `pin-${activePin.pinNumber}.jpg`}`}
                    alt={activePin.shortName}
                    onError={() => setPhotoError(true)}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ) : (
                <div className="p-3 bg-slate-50 text-center">
                  <span className="text-xs font-semibold text-slate-700 block">
                    Foto Fisik Belum Tersedia
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                    public/images/components/{activePin.imageName || `pin-${activePin.pinNumber}.jpg`}
                  </span>
                </div>
              )}
            </div>

            {/* Architecture Role */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <h5 className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1 font-semibold">
                Fungsi Arsitektur
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {activePin.role}
              </p>
            </div>

            {/* Practical Application */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <h5 className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1 font-semibold">
                Penerapan Pada Laptop Modern
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {activePin.laptopComparison}
              </p>
            </div>

            {/* Hardware Specs Matrix */}
            <div>
              <h5 className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
                Spesifikasi Teknis:
              </h5>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                {Object.entries(activePin.specs).map(([k, v], i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[9px] text-slate-400 block">{k}</span>
                    <span className="text-slate-800 font-semibold truncate block">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* VR Note */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 mt-2">
            <p className="text-[11px] text-slate-600 font-sans leading-tight">
              <strong className="text-slate-900">Catatan Inspeksi:</strong> {activePin.vrNote}
            </p>
          </div>
        </div>
      )}

      {/* ── MOBILE & TABLET COLLAPSIBLE BOTTOM DRAWER (lg:hidden) ── */}
      {mobilePanel === 'specs' && (
        <div className="lg:hidden absolute left-2.5 right-2.5 bottom-26 max-h-[54dvh] z-30 backdrop-blur-xl bg-white/98 border border-slate-200 rounded-xl p-3.5 shadow-2xl overflow-y-auto animate-fade-slide-up pointer-events-auto">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2.5">
            <div>
              <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold block">
                {laptop.alias}
              </span>
              <h4 className="text-xs font-display font-bold text-slate-900">
                Daftar Modul Perangkat Keras
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setMobilePanel('none')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold cursor-pointer"
            >
              ✕ Tutup
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {specItems.map((spec, idx) => {
              const isSelected = selectedPinNumber === spec.pinNum;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedPinNumber(spec.pinNum);
                    setMobilePanel('dossier');
                  }}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer active:scale-[0.98] ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 ring-1 ring-emerald-500/20'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-display font-bold text-slate-900">
                      {spec.label}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold">
                      PIN #{spec.pinNum < 10 ? `0${spec.pinNum}` : spec.pinNum}
                    </span>
                  </div>
                  <p className="text-[11px] font-sans text-slate-600 truncate">
                    {spec.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {mobilePanel === 'dossier' && activePin && (
        <div className="lg:hidden absolute left-2.5 right-2.5 bottom-26 max-h-[56dvh] z-30 backdrop-blur-xl bg-white/98 border border-slate-200 rounded-xl p-3.5 shadow-2xl overflow-y-auto animate-fade-slide-up pointer-events-auto">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-bold font-mono text-xs flex items-center justify-center shrink-0">
                {activePin.pinNumber}
              </span>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-emerald-700 block uppercase font-bold truncate">
                  PIN #{activePin.pinNumber < 10 ? `0${activePin.pinNumber}` : activePin.pinNumber} • {activePin.category}
                </span>
                <span className="text-xs font-bold font-display text-slate-900 truncate block">
                  {activePin.shortName}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobilePanel('none')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold shrink-0 cursor-pointer"
            >
              ✕ Tutup
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Compact 3D + Real Photo Grid on Mobile */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg overflow-hidden border border-slate-200 bg-white">
                <div className="px-2 py-1 bg-slate-100 border-b border-slate-200 text-[9px] font-mono font-bold text-slate-700 uppercase">
                  Model 3D
                </div>
                <div className="h-28 w-full flex items-center justify-center">
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

              <div className="rounded-lg overflow-hidden border border-slate-200 bg-white flex flex-col">
                <div className="px-2 py-1 bg-slate-100 border-b border-slate-200 text-[9px] font-mono font-bold text-slate-700 uppercase">
                  Foto Fisik Riil
                </div>
                {!photoError ? (
                  <div className="h-28 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={`/images/components/${activePin.imageName || `pin-${activePin.pinNumber}.jpg`}`}
                      alt={activePin.shortName}
                      onError={() => setPhotoError(true)}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ) : (
                  <div className="h-28 flex items-center justify-center p-2 text-center text-[10px] text-slate-500">
                    Foto belum tersedia
                  </div>
                )}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <h5 className="text-[10px] font-mono uppercase text-slate-500 mb-0.5 font-semibold">
                Fungsi Arsitektur
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {activePin.role}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
              {Object.entries(activePin.specs).map(([k, v], i) => (
                <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[9px] text-slate-400 block">{k}</span>
                  <span className="text-slate-800 font-semibold truncate block">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── BOTTOM HUD: MOBILE PANEL SWITCHER + HOTSPOT PINS BAR (Pins 1 to 10) ── */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 right-2.5 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none">
        
        {/* Mobile Segmented Panel Switcher (Only on < 1024px) */}
        <div className="lg:hidden pointer-events-auto inline-flex items-center gap-1 p-1 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-xl shadow-lg w-full max-w-md justify-between">
          <button
            type="button"
            onClick={() => setMobilePanel('none')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-sans font-semibold transition-all cursor-pointer ${
              mobilePanel === 'none'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Layar 3D Penuh
          </button>
          <button
            type="button"
            onClick={() => setMobilePanel(mobilePanel === 'specs' ? 'none' : 'specs')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-sans font-semibold transition-all cursor-pointer ${
              mobilePanel === 'specs'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daftar Modul
          </button>
          <button
            type="button"
            onClick={() => setMobilePanel(mobilePanel === 'dossier' ? 'none' : 'dossier')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-sans font-semibold transition-all cursor-pointer truncate ${
              mobilePanel === 'dossier'
                ? 'bg-violet-600 text-white shadow-2xs'
                : 'text-violet-700 bg-violet-50/70 hover:bg-violet-100'
            }`}
          >
            Info Pin #{selectedPinNumber < 10 ? `0${selectedPinNumber}` : selectedPinNumber}
          </button>
        </div>

        {/* Pin 1-10 Selector Bar */}
        <div className="pointer-events-auto flex items-center justify-start sm:justify-center gap-1 sm:gap-1.5 p-1.5 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-xl shadow-lg overflow-x-auto max-w-full">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-2 hidden sm:inline font-semibold shrink-0">
            PIN 1–10:
          </span>
          {currentPins.map((pin) => {
            const isSelected = selectedPinNumber === pin.pinNumber;
            return (
              <button
                key={pin.id}
                type="button"
                onClick={() => setSelectedPinNumber(pin.pinNumber)}
                className={`
                  relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono text-xs font-bold transition-all shrink-0 cursor-pointer
                  ${isSelected
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/25'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:border-emerald-400 hover:text-emerald-700 hover:bg-white'
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
    </div>
  );
}
