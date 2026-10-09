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
import ComponentDetailModal from './ComponentDetailModal';

/**
 * Motherboard3DViewer
 * 100% Native Three.js WebGL Interactive Motherboard Engine:
 * - 60 FPS hardware accelerated WebGL rendering
 * - Category Isolation: Dedicated 3D Motherboards for Entry Level, Gaming, and Creator
 * - 10 Interactive numbered hotspot pins with raycasting
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
  const isGaming = laptopId === 'laptop-b' || category === 'Gaming';
  const isCreator = laptopId === 'laptop-c' || category === 'Creator';
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
  }, [highlightPinNumber, laptopId, isGaming, isCreator]);

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
        if (camera.position.distanceTo(targetCamPosPosRef?.current?.position || targetCamPosRef.current.position) < 0.04) {
          targetCamPosRef.current = null;
        }
      }

      // Rotate fan impellers in real-time
      if (fanRotatorsRef.current.length > 0) {
        fanRotatorsRef.current.forEach((fan) => {
          fan.rotation.y += delta * 12.0;
        });
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
  }, [laptopId, isGaming, isCreator, isAutoRotate]);

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
            {isGaming ? 'GAMING MAINBOARD 3D DIGITAL TWIN' : isCreator ? 'CREATOR MAINBOARD 3D DIGITAL TWIN' : 'ENTRY ULTRABOOK 3D DIGITAL TWIN'}
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
