import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Compass } from 'lucide-react';

// Modular 3D Motherboard Component Builders (Gaming, Creator, Entry)
import { buildGamingCPU } from './motherboards/gaming/GamingCPU';
import { buildGamingGPU } from './motherboards/gaming/GamingGPU';
import { buildGamingRAM } from './motherboards/gaming/GamingRAM';
import { buildGamingSSD } from './motherboards/gaming/GamingSSD';
import { buildGamingCooling } from './motherboards/gaming/GamingCooling';
import { buildGamingBattery } from './motherboards/gaming/GamingBattery';
import { buildGamingVRM } from './motherboards/gaming/GamingVRM';
import { buildGamingIO } from './motherboards/gaming/GamingIO';
import { buildGamingPCB } from './motherboards/gaming/GamingPCB';

import { buildCreatorCPU } from './motherboards/creator/CreatorCPU';
import { buildCreatorGPU } from './motherboards/creator/CreatorGPU';
import { buildCreatorRAM } from './motherboards/creator/CreatorRAM';
import { buildCreatorSSD } from './motherboards/creator/CreatorSSD';
import { buildCreatorCooling } from './motherboards/creator/CreatorCooling';
import { buildCreatorBattery } from './motherboards/creator/CreatorBattery';
import { buildCreatorVRM } from './motherboards/creator/CreatorVRM';
import { buildCreatorIO } from './motherboards/creator/CreatorIO';
import { buildCreatorPCB } from './motherboards/creator/CreatorPCB';

import { buildEntryCPU } from './motherboards/entry/EntryCPU';
import { buildEntryRAM } from './motherboards/entry/EntryRAM';
import { buildEntrySSD } from './motherboards/entry/EntrySSD';
import { buildEntryCooling } from './motherboards/entry/EntryCooling';
import { buildEntryBattery } from './motherboards/entry/EntryBattery';
import { buildEntryVRM } from './motherboards/entry/EntryVRM';
import { buildEntryIO } from './motherboards/entry/EntryIO';
import { buildEntryPCB } from './motherboards/entry/EntryPCB';

/**
 * Component3DViewer
 * Interactive Three.js WebGL viewer for ISOLATED 3D hardware components.
 * 100% Aligned with Modular 3D Laptop Motherboards (Gaming Strix G16, Creator Studio Pro, Entry Slim).
 * Features:
 * - High-detail laser-etched silicon packages (Intel Core i7-14650HX, NVIDIA RTX 4060, AMD Ryzen AI 9)
 * - Rotating centrifugal cooling blower fans
 * - Golden contacts, SO-DIMM sockets, M.2 NVMe controllers & heatpipes
 * - Auto-centered bounding box with orbit controls & smooth lighting
 */
export default function Component3DViewer({
  type = 'cpu',
  componentId,
  category = 'Gaming',
  laptopCategory,
  laptopId,
  className = '',
  heightClass = 'h-[240px] sm:h-[280px]',
  autoRotateSpeed = 1.4,
  autoRotate = true,
  hideControls = false,
  hideHint = false,
  interactive = true,
  cameraDistance,
}) {
  const modelType = (componentId || type || 'cpu').toLowerCase();
  const effectiveCategory = (laptopCategory || category || '').toLowerCase();
  const isCreator = effectiveCategory.includes('creator') || laptopId === 'laptop-a';
  const isEntry = effectiveCategory.includes('entry') || laptopId === 'laptop-c';

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRotating, setIsRotating] = useState(autoRotate);

  const controlsRef = useRef(null);
  const animFrameRef = useRef(null);

  // Auto-detect compact thumbnail mode
  const isCompact = hideControls || hideHint || heightClass.includes('h-12') || heightClass.includes('h-14') || heightClass.includes('h-16') || heightClass.includes('h-20') || heightClass.includes('h-24') || heightClass.includes('h-36');

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 200;
    const height = container.clientHeight || 200;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    const dist = cameraDistance || (isCompact ? 3.4 : 5.2);
    camera.position.set(0, dist * 0.58, dist);

    // 3. Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = isRotating;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.minDistance = 1.5;
    controls.maxDistance = 16;
    controls.enableZoom = !isCompact && interactive;
    controls.enablePan = false;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(6, 10, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.6);
    fillLight.position.set(-6, 6, -4);
    scene.add(fillLight);

    const rimGreen = new THREE.PointLight(0x10b981, 1.8, 14);
    rimGreen.position.set(-4, 2, 4);
    scene.add(rimGreen);

    const bottomGlow = new THREE.PointLight(0x0284c7, 1.2, 12);
    bottomGlow.position.set(4, -2, -3);
    scene.add(bottomGlow);

    // 6. Build Modular Component Model
    const modelGroup = new THREE.Group();
    const fanRotators = buildModularModel(modelGroup, modelType, { isCreator, isEntry });

    // Center model at exact origin (0, 0, 0)
    const bbox = new THREE.Box3().setFromObject(modelGroup);
    const bCenter = new THREE.Vector3();
    bbox.getCenter(bCenter);
    modelGroup.position.sub(bCenter);

    const bSize = new THREE.Vector3();
    bbox.getSize(bSize);
    const maxDim = Math.max(bSize.x, bSize.y, bSize.z, 1.2);

    const fov = camera.fov * (Math.PI / 180);
    const autoDist = ((maxDim / 2) / Math.tan(fov / 2)) * 1.45;
    const finalDist = cameraDistance || Math.max(autoDist, 3.2);

    camera.position.set(0, finalDist * 0.45, finalDist * 0.95);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);

    scene.add(modelGroup);

    // Soft Shadow Disc
    const shadowRadius = Math.max(bSize.x, bSize.z) * 0.75;
    const shadowGeo = new THREE.CircleGeometry(shadowRadius, 32);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.1 });
    const shadowPlate = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlate.rotation.x = -Math.PI / 2;
    shadowPlate.position.y = -(bSize.y / 2) - 0.08;
    scene.add(shadowPlate);

    // 7. Animation Loop with Fan Rotation
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      controls.autoRotate = isRotating;
      controls.update();

      if (fanRotators && fanRotators.length > 0) {
        fanRotators.forEach((rotator) => {
          rotator.rotation.y += 0.08;
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
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
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      controls.dispose();
      renderer.dispose();
    };
  }, [modelType, effectiveCategory, isRotating, autoRotateSpeed, cameraDistance, isCompact, interactive]);

  const toggleRotation = () => {
    setIsRotating((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden ${heightClass} ${className} select-none`}
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Floating Controls Overlay */}
      {!hideControls && (
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          <button
            onClick={toggleRotation}
            className={`
              p-1.5 rounded-lg border backdrop-blur-md transition-all duration-200
              ${isRotating 
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 shadow-xs' 
                : 'bg-white/80 border-slate-200 text-slate-500 hover:text-slate-800'
              }
            `}
            title={isRotating ? 'Jeda Rotasi Otomatis' : 'Mulai Rotasi Otomatis'}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          </button>
        </div>
      )}

      {/* Subtle Hint */}
      {!hideHint && !isCompact && (
        <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-center gap-1.5 pointer-events-none">
          <div className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-[10px] font-mono text-slate-500 shadow-2xs flex items-center gap-1.5 font-medium">
            <Compass className="w-3 h-3 text-emerald-600" />
            <span>Drag untuk memutar 360° • Scroll untuk zoom</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Builds the modular 3D model matching the actual laptop motherboard architecture.
 */
function buildModularModel(targetGroup, rawType, { isCreator, isEntry }) {
  const norm = (rawType || '').toLowerCase().replace(/_/g, '-');
  const temp = new THREE.Group();
  let fanRotators = [];

  if (isCreator) {
    if (norm.includes('cpu') || norm.includes('processor')) {
      buildCreatorCPU(temp);
    } else if (norm.includes('gpu') || norm.includes('graphics')) {
      buildCreatorGPU(temp);
    } else if (norm.includes('ram') || norm.includes('memory')) {
      buildCreatorRAM(temp);
    } else if (norm.includes('ssd') || norm.includes('storage') || norm.includes('nvme')) {
      buildCreatorSSD(temp);
    } else if (norm.includes('cooling') || norm.includes('fan')) {
      const res = buildCreatorCooling(temp);
      if (res?.fanRotators) fanRotators = res.fanRotators;
    } else if (norm.includes('battery')) {
      buildCreatorBattery(temp);
    } else if (norm.includes('vrm') || norm.includes('heatsink')) {
      buildCreatorVRM(temp);
    } else if (norm.includes('io') || norm.includes('wifi')) {
      buildCreatorIO(temp);
    } else if (norm.includes('motherboard') || norm.includes('pcb')) {
      buildCreatorPCB(temp);
    } else {
      buildCreatorCPU(temp);
    }
  } else if (isEntry) {
    if (norm.includes('cpu') || norm.includes('processor') || norm.includes('gpu')) {
      buildEntryCPU(temp);
    } else if (norm.includes('ram') || norm.includes('memory')) {
      buildEntryRAM(temp);
    } else if (norm.includes('ssd') || norm.includes('storage') || norm.includes('nvme')) {
      buildEntrySSD(temp);
    } else if (norm.includes('cooling') || norm.includes('fan')) {
      const res = buildEntryCooling(temp);
      if (res?.fanRotators) fanRotators = res.fanRotators;
    } else if (norm.includes('battery')) {
      buildEntryBattery(temp);
    } else if (norm.includes('vrm') || norm.includes('heatsink')) {
      buildEntryVRM(temp);
    } else if (norm.includes('io') || norm.includes('wifi')) {
      buildEntryIO(temp);
    } else if (norm.includes('motherboard') || norm.includes('pcb')) {
      buildEntryPCB(temp);
    } else {
      buildEntryCPU(temp);
    }
  } else {
    // Gaming (Default)
    if (norm.includes('cpu') || norm.includes('processor')) {
      buildGamingCPU(temp);
    } else if (norm.includes('gpu') || norm.includes('graphics')) {
      buildGamingGPU(temp);
    } else if (norm.includes('ram') || norm.includes('memory')) {
      buildGamingRAM(temp);
    } else if (norm.includes('ssd') || norm.includes('storage') || norm.includes('nvme')) {
      buildGamingSSD(temp);
    } else if (norm.includes('cooling') || norm.includes('fan')) {
      const res = buildGamingCooling(temp);
      if (res?.fanRotators) fanRotators = res.fanRotators;
    } else if (norm.includes('battery')) {
      buildGamingBattery(temp);
    } else if (norm.includes('vrm') || norm.includes('heatsink')) {
      buildGamingVRM(temp);
    } else if (norm.includes('io') || norm.includes('wifi')) {
      buildGamingIO(temp);
    } else if (norm.includes('motherboard') || norm.includes('pcb')) {
      buildGamingPCB(temp);
    } else {
      buildGamingCPU(temp);
    }
  }

  // Remove selection highlight halo meshes from isolated viewer
  temp.traverse((child) => {
    if (child.name && child.name.endsWith('Highlight')) {
      child.visible = false;
    }
  });

  // Center model geometry perfectly around origin (0, 0, 0)
  const box = new THREE.Box3().setFromObject(temp);
  const center = new THREE.Vector3();
  box.getCenter(center);
  temp.position.sub(center);

  targetGroup.add(temp);
  return fanRotators;
}
