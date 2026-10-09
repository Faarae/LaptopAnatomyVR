import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Compass, Sparkles, Cpu, Layers, HardDrive, Battery, ShieldCheck } from 'lucide-react';

// Modular 3D Motherboard Builders for internal hardware exposure
import { buildGamingCPU } from './motherboards/gaming/GamingCPU';
import { buildGamingGPU } from './motherboards/gaming/GamingGPU';
import { buildGamingRAM } from './motherboards/gaming/GamingRAM';
import { buildGamingSSD } from './motherboards/gaming/GamingSSD';
import { buildGamingCooling } from './motherboards/gaming/GamingCooling';
import { buildGamingBattery } from './motherboards/gaming/GamingBattery';

/**
 * LandingLaptop3D
 * High-Detail Interactive 3D Laptop Digital Twin for Landing Page Hero Showcase.
 * Features:
 * - Sleek CNC Aluminum chassis with open-frame internal motherboard exposure
 * - Actual modular hardware inside: Intel Core i7, NVIDIA RTX 4060, Dual DDR5 SO-DIMM, M.2 SSD, 90Wh Battery
 * - Dual spinning centrifugal blower fans in real-time
 * - Holographic display screen with live telemetry graphics
 * - Smooth mouse-parallax tilt & 360° orbit interaction
 * - 5 Interactive 3D component beacons linked to landing page hotspots
 */
export default function LandingLaptop3D({
  activeHotspot = null,
  onHotspotHover = null,
  onHotspotClick = null,
  className = '',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);
  const [internalHoverId, setInternalHoverId] = useState(null);

  const controlsRef = useRef(null);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const beaconMeshesRef = useRef([]);
  const fanRotatorsRef = useRef([]);

  // Active Hotspot reference to keep callbacks fresh
  const activeHotspotRef = useRef(activeHotspot);
  useEffect(() => {
    activeHotspotRef.current = activeHotspot;
  }, [activeHotspot]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 440;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // 2. Camera: Angled isometric perspective
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 5.8, 9.6);
    camera.lookAt(0, 0.4, 0);

    // 3. Renderer with high performance & transparent canvas
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

    // 4. OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = isRotating;
    controls.autoRotateSpeed = 1.2;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 5.0;
    controls.maxDistance = 16.0;
    controls.enablePan = false;
    controls.target.set(0, 0.3, 0);
    controlsRef.current = controls;

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(8, 14, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x99f6e4, 1.4);
    fillLight.position.set(-8, 6, -6);
    scene.add(fillLight);

    const rimEmerald = new THREE.PointLight(0x10b981, 2.2, 14);
    rimEmerald.position.set(0, 4, -4);
    scene.add(rimEmerald);

    const cyanUnderglow = new THREE.PointLight(0x06b6d4, 1.6, 10);
    cyanUnderglow.position.set(0, -0.2, 3);
    scene.add(cyanUnderglow);

    // 6. Build High-Detail Laptop Digital Twin
    const laptopRoot = new THREE.Group();
    laptopRoot.name = 'laptopRoot';
    scene.add(laptopRoot);

    const { beacons, fanRotators } = buildDetailedLaptop(laptopRoot);
    beaconMeshesRef.current = beacons;
    fanRotatorsRef.current = fanRotators;

    // Circular Holographic Floor Target Plate
    const floorGeo = new THREE.RingGeometry(3.6, 3.68, 64);
    const floorMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
    const floorRing = new THREE.Mesh(floorGeo, floorMat);
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = -0.52;
    scene.add(floorRing);

    const floorDiscGeo = new THREE.CircleGeometry(4.2, 48);
    const floorDiscMat = new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.08 });
    const floorDisc = new THREE.Mesh(floorDiscGeo, floorDiscMat);
    floorDisc.rotation.x = -Math.PI / 2;
    floorDisc.position.y = -0.53;
    scene.add(floorDisc);

    // 7. Raycasting for Component Beacons
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Parallax mouse target calculation
      mouseRef.current.targetX = (pointer.x * 0.12);
      mouseRef.current.targetY = (pointer.y * 0.08);

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(beaconMeshesRef.current, true);

      if (hits.length > 0) {
        let curr = hits[0].object;
        while (curr && !curr.userData?.hotspotId && curr.parent) {
          curr = curr.parent;
        }
        if (curr?.userData?.hotspotId) {
          canvas.style.cursor = 'pointer';
          setInternalHoverId(curr.userData.hotspotId);
          onHotspotHover?.(curr.userData.hotspotId);
          return;
        }
      }

      canvas.style.cursor = 'grab';
      setInternalHoverId(null);
      onHotspotHover?.(null);
    };

    const handlePointerDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(beaconMeshesRef.current, true);

      if (hits.length > 0) {
        let curr = hits[0].object;
        while (curr && !curr.userData?.hotspotId && curr.parent) {
          curr = curr.parent;
        }
        if (curr?.userData?.hotspotId) {
          onHotspotClick?.(curr.userData.hotspotId);
        }
      }
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('click', handlePointerDown);

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse-parallax interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      laptopRoot.rotation.y = mouseRef.current.x;
      laptopRoot.rotation.x = -mouseRef.current.y * 0.5;

      // Spin internal centrifugal fans
      if (fanRotatorsRef.current.length > 0) {
        fanRotatorsRef.current.forEach((r) => {
          r.rotation.y += 0.09;
        });
      }

      // Animate pulsing component beacons
      beacons.forEach((b) => {
        const id = b.userData.hotspotId;
        const isTarget = activeHotspotRef.current === id || internalHoverId === id;
        
        // Bobbing vertical motion
        b.position.y = b.userData.baseY + Math.sin(elapsed * 3.5 + b.userData.phase) * 0.06;

        if (isTarget) {
          b.scale.setScalar(1.28 + Math.sin(elapsed * 8) * 0.12);
          if (b.userData.glowRing) {
            b.userData.glowRing.material.opacity = 0.9;
          }
        } else {
          b.scale.setScalar(1.0);
          if (b.userData.glowRing) {
            b.userData.glowRing.material.opacity = 0.45;
          }
        }
      });

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
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('click', handlePointerDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      controls.dispose();
      renderer.dispose();
    };
  }, [isRotating]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden ${className} select-none`}
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Top Floating Controls */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
        <button
          onClick={() => setIsRotating((p) => !p)}
          className={`
            p-2 rounded-xl border backdrop-blur-md transition-all duration-200
            ${isRotating 
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-700 shadow-xs' 
              : 'bg-white/85 border-slate-200 text-slate-500 hover:text-slate-800'
            }
          `}
          title={isRotating ? 'Jeda Rotasi Otomatis' : 'Mulai Rotasi Otomatis'}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
        </button>
      </div>

      {/* Floating 3D Component Quick Status Pill */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-[11px] font-mono text-slate-600 shadow-md flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span><strong>AeroBook Strix G16 3D</strong> // Hover modul untuk inspeksi</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono text-emerald-400 shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>MOTHERBOARD DIGITAL TWIN</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Builds the Detailed 3D Gaming Laptop Model:
 * Base Chassis with open internal Motherboard + Open Display Screen Lid + Holographic Component Beacons
 */
function buildDetailedLaptop(parentGroup) {
  const laptopGroup = new THREE.Group();
  laptopGroup.position.set(0, -0.4, 0);

  // Materials
  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a, // Deep slate titanium
    metalness: 0.88,
    roughness: 0.28,
  });

  const chamferMat = new THREE.MeshStandardMaterial({
    color: 0x334155, // Polished CNC metal chamfer
    metalness: 0.95,
    roughness: 0.15,
  });

  const pcbDarkMat = new THREE.MeshStandardMaterial({
    color: 0x06281f, // Multi-layer green-black motherboard substrate
    metalness: 0.25,
    roughness: 0.38,
  });

  // ─────────────────────────────────────────────────────────────
  // 1. BASE CHASSIS (Lower Deck)
  // ─────────────────────────────────────────────────────────────
  const baseWidth = 6.4;
  const baseDepth = 4.8;
  const baseHeight = 0.28;

  // Main Bottom Chassis Tub
  const baseTubGeo = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
  const baseTub = new THREE.Mesh(baseTubGeo, chassisMat);
  baseTub.position.set(0, baseHeight / 2, 0.4);
  baseTub.castShadow = true;
  baseTub.receiveShadow = true;
  laptopGroup.add(baseTub);

  // Polished CNC Perimeter Lip
  const lipGeo = new THREE.BoxGeometry(baseWidth + 0.08, 0.04, baseDepth + 0.08);
  const lip = new THREE.Mesh(lipGeo, chamferMat);
  lip.position.set(0, baseHeight + 0.01, 0.4);
  laptopGroup.add(lip);

  // Front RGB Accent Strip (Glowing Emerald)
  const rgbGeo = new THREE.BoxGeometry(baseWidth * 0.7, 0.03, 0.06);
  const rgbMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const rgbStrip = new THREE.Mesh(rgbGeo, rgbMat);
  rgbStrip.position.set(0, baseHeight * 0.6, 0.4 + baseDepth / 2 + 0.02);
  laptopGroup.add(rgbStrip);

  // Internal Motherboard Substrate Plate (Recessed in Chassis)
  const mbPcbGeo = new THREE.BoxGeometry(baseWidth * 0.94, 0.05, baseDepth * 0.90);
  const mbPcb = new THREE.Mesh(mbPcbGeo, pcbDarkMat);
  mbPcb.position.set(0, baseHeight + 0.02, 0.4);
  laptopGroup.add(mbPcb);

  // ─────────────────────────────────────────────────────────────
  // 2. MOUNT REAL MOTHERBOARD HARDWARE INSIDE CHASSIS
  // ─────────────────────────────────────────────────────────────
  const hardwareGroup = new THREE.Group();
  hardwareGroup.position.set(0, baseHeight + 0.04, 0.4);
  hardwareGroup.scale.set(0.68, 0.68, 0.68); // Proportionally scaled to fit internal chassis bay

  // Build actual modular components from friend's files:
  buildGamingCPU(hardwareGroup);
  buildGamingGPU(hardwareGroup);
  buildGamingRAM(hardwareGroup);
  buildGamingSSD(hardwareGroup);
  const { fanRotators } = buildGamingCooling(hardwareGroup);
  buildGamingBattery(hardwareGroup);

  // Remove selection highlight halo meshes from ambient view
  hardwareGroup.traverse((child) => {
    if (child.name && child.name.endsWith('Highlight')) {
      child.visible = false;
    }
  });

  laptopGroup.add(hardwareGroup);

  // ─────────────────────────────────────────────────────────────
  // 3. DISPLAY SCREEN LID (Angled Open at ~110°)
  // ─────────────────────────────────────────────────────────────
  const lidGroup = new THREE.Group();
  // Hinge axis placed at rear top edge of base chassis
  lidGroup.position.set(0, baseHeight + 0.02, 0.4 - baseDepth / 2);
  lidGroup.rotation.x = -Math.PI / 1.75; // Opened ~108 degrees backwards

  const lidHeight = 4.2;
  const lidThickness = 0.14;

  // Screen Back Cover
  const lidBackGeo = new THREE.BoxGeometry(baseWidth, lidHeight, lidThickness);
  const lidBack = new THREE.Mesh(lidBackGeo, chassisMat);
  lidBack.position.set(0, lidHeight / 2, -lidThickness / 2);
  lidBack.castShadow = true;
  lidGroup.add(lidBack);

  // Screen Bezel Outer Frame
  const bezelGeo = new THREE.BoxGeometry(baseWidth - 0.04, lidHeight - 0.04, 0.04);
  const bezelMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.6 });
  const bezel = new THREE.Mesh(bezelGeo, bezelMat);
  bezel.position.set(0, lidHeight / 2, 0.01);
  lidGroup.add(bezel);

  // Active Holographic LCD Display Glass Canvas
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 1024;
  screenCanvas.height = 680;
  const ctx = screenCanvas.getContext('2d');
  if (ctx) {
    // Deep Cyber Gradient Background
    const grad = ctx.createLinearGradient(0, 0, 1024, 680);
    grad.addColorStop(0, '#020617');
    grad.addColorStop(0.5, '#061a15');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 680);

    // Matrix Grid Lines
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 680);
      ctx.stroke();
    }
    for (let y = 0; y < 680; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Header Telemetry
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 32px monospace';
    ctx.fillText('AEROBOOK STRIX G16 // DIGITAL TWIN OS', 60, 80);

    ctx.fillStyle = '#64748b';
    ctx.font = '18px monospace';
    ctx.fillText('SYSTEM ARCHITECTURE: INTEL 14TH GEN + NVIDIA ADA LOVELACE', 60, 115);

    // Live Metrics Cards
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(60, 150, 420, 180);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 150, 420, 180);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('CPU: i7-14650HX', 85, 195);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '18px monospace';
    ctx.fillText('16-CORE / 24-THREAD • 5.20 GHz', 85, 230);
    ctx.fillText('POWER: 55W BASE / 157W BOOST', 85, 260);
    ctx.fillText('TEMP: 44°C • NORMAL', 85, 290);

    // GPU Metrics Card
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(520, 150, 440, 180);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.strokeRect(520, 150, 440, 180);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('GPU: RTX 4060 8GB', 545, 195);
    ctx.fillStyle = '#4ade80';
    ctx.font = '18px monospace';
    ctx.fillText('3,072 CUDA CORES • 140W TGP', 545, 230);
    ctx.fillText('VRAM: 8GB GDDR6 (128-BIT)', 545, 260);
    ctx.fillText('DLSS 3.5 RAY RECONSTRUCTION', 545, 290);

    // Bottom Waveform Activity Graph
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(60, 450);
    for (let x = 60; x <= 960; x += 15) {
      const y = 450 + Math.sin(x * 0.05) * 35 * Math.sin(x * 0.02);
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('BUS INTERCONNECT LINK: ACTIVE (15.75 GB/s DMI 4.0)', 60, 520);
    ctx.fillText('DUAL BLOWER PWM FAN RPM: 2,400 RPM (BALANCED MODE)', 60, 550);
  }

  const screenTex = new THREE.CanvasTexture(screenCanvas);
  screenTex.anisotropy = 4;
  const screenGeo = new THREE.PlaneGeometry(baseWidth - 0.4, lidHeight - 0.4);
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.set(0, lidHeight / 2, 0.035);
  lidGroup.add(screenMesh);

  laptopGroup.add(lidGroup);

  // ─────────────────────────────────────────────────────────────
  // 4. INTERACTIVE 3D HOLOGRAPHIC COMPONENT BEACONS
  // ─────────────────────────────────────────────────────────────
  const beaconConfigs = [
    { id: 'cpu', label: 'CPU', x: 1.25, z: 0.0, baseY: baseHeight + 0.65, phase: 0.0, color: 0x10b981 },
    { id: 'gpu', label: 'GPU', x: -1.25, z: 0.0, baseY: baseHeight + 0.65, phase: 1.2, color: 0x22c55e },
    { id: 'ram', label: 'RAM', x: 0.0, z: 0.95, baseY: baseHeight + 0.60, phase: 2.4, color: 0x06b6d4 },
    { id: 'ssd', label: 'SSD', x: 1.6, z: 1.5, baseY: baseHeight + 0.60, phase: 3.6, color: 0x8b5cf6 },
    { id: 'battery', label: 'Battery', x: 0.0, z: 2.3, baseY: baseHeight + 0.55, phase: 4.8, color: 0xf59e0b },
  ];

  const beacons = [];

  beaconConfigs.forEach((cfg) => {
    const bGroup = new THREE.Group();
    bGroup.name = `beacon_${cfg.id}`;
    bGroup.position.set(cfg.x, cfg.baseY, cfg.z);
    bGroup.userData = {
      hotspotId: cfg.id,
      baseY: cfg.baseY,
      phase: cfg.phase,
    };

    // Central Glowing Sphere Core
    const sphereGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      emissive: cfg.color,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    bGroup.add(sphere);

    // Glowing Horizontal Ring
    const ringGeo = new THREE.RingGeometry(0.24, 0.32, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    bGroup.add(ring);
    bGroup.userData.glowRing = ring;

    // Vertical Holographic Light Beam Cone
    const coneGeo = new THREE.ConeGeometry(0.28, 0.55, 16, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.y = -0.28;
    cone.rotation.x = Math.PI;
    bGroup.add(cone);

    laptopGroup.add(bGroup);
    beacons.push(bGroup);
  });

  parentGroup.add(laptopGroup);
  return { beacons, fanRotators };
}
