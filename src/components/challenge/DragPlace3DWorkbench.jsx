import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  CheckCircle2, Sparkles, Compass, AlertCircle, Box, Volume2
} from 'lucide-react';
import { ASSEMBLY_COMPONENT_POOL } from './DragPlaceGame';
import { buildGamingPCB } from '../3d/motherboards/gaming/GamingPCB';
import { buildGamingCPU } from '../3d/motherboards/gaming/GamingCPU';
import { buildGamingGPU } from '../3d/motherboards/gaming/GamingGPU';
import { buildGamingRAM } from '../3d/motherboards/gaming/GamingRAM';
import { buildGamingSSD } from '../3d/motherboards/gaming/GamingSSD';
import { buildGamingCooling } from '../3d/motherboards/gaming/GamingCooling';
import { buildGamingBattery } from '../3d/motherboards/gaming/GamingBattery';
import { buildGamingVRM } from '../3d/motherboards/gaming/GamingVRM';
import { buildGamingIO } from '../3d/motherboards/gaming/GamingIO';

/**
 * DragPlace3DWorkbench
 * 100% Native WebGL Three.js Fullscreen Isometric Assembly Scene:
 * - Uses the authentic Gaming Laptop Motherboard (AeroBook Strix G16) as the workbench base
 * - Real modular 3D components matching the laptop motherboard detail 1:1
 * - Empty realistic sockets corresponding to activeQuestIds
 * - Staging 3D components on the front ESD table tray with high-fidelity textures
 * - Fluid 3D Raycasting with elevated plane drag mechanics
 * - Locked Isometric Camera Perspective
 * - Multi-item persistence: placed items are locked in place and never reset/lost
 */
export default function DragPlace3DWorkbench({
  activeQuestIds = ['cpu', 'ram', 'ssd'],
  installedSlots = {},
  onComponentSnap = null,
  onWrongSnap = null,
  activeItem = null,
  setActiveItem = null,
  className = '',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animFrameRef = useRef(null);

  // References to keep callbacks and mutable state fresh (avoid stale closures)
  const onComponentSnapRef = useRef(onComponentSnap);
  const onWrongSnapRef = useRef(onWrongSnap);
  const activeItemRef = useRef(activeItem);
  const installedSlotsRef = useRef(installedSlots);
  const activeQuestIdsRef = useRef(activeQuestIds);

  useEffect(() => { onComponentSnapRef.current = onComponentSnap; }, [onComponentSnap]);
  useEffect(() => { onWrongSnapRef.current = onWrongSnap; }, [onWrongSnap]);
  useEffect(() => { activeItemRef.current = activeItem; }, [activeItem]);
  useEffect(() => { installedSlotsRef.current = installedSlots; }, [installedSlots]);
  useEffect(() => { activeQuestIdsRef.current = activeQuestIds; }, [activeQuestIds]);

  // 3D Objects Maps
  const componentsRef = useRef({});      // { [id]: Group }
  const socketTargetsRef = useRef({});   // { [id]: Vector3 }
  const socketBeaconsRef = useRef({});   // { [id]: Group }
  const particlesRef = useRef([]);
  const fanRotatorsRef = useRef([]);

  // 3D Dragging state
  const dragPlaneRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), -1.1));
  const isDraggingRef = useRef(false);
  const draggedObjRef = useRef(null);
  const offsetRef = useRef(new THREE.Vector3());

  const [activeHoverHint, setActiveHoverHint] = useState(null);
  const [snapFeedback, setSnapFeedback] = useState(null);

  // Sync installed state into 3D objects
  useEffect(() => {
    Object.keys(installedSlots).forEach((slotKey) => {
      const isInstalled = installedSlots[slotKey];
      const compGroup = componentsRef.current[slotKey];
      const beaconGroup = socketBeaconsRef.current[slotKey];
      const targetPos = socketTargetsRef.current[slotKey];

      if (compGroup && isInstalled && targetPos) {
        compGroup.position.copy(targetPos);
        compGroup.rotation.set(0, 0, 0);
        if (slotKey === 'battery') {
          compGroup.scale.set(1, 1, 1);
        }
        compGroup.userData.installed = true;
        compGroup.userData.isDragging = false;
      }

      if (beaconGroup) {
        beaconGroup.visible = !isInstalled;
      }
    });
  }, [installedSlots]);

  // Sync activeItem elevation
  useEffect(() => {
    if (activeItem && componentsRef.current[activeItem]) {
      const group = componentsRef.current[activeItem];
      if (!group.userData.installed) {
        group.position.y = 0.85; // Elevate to indicate pick
      }
    } else {
      Object.keys(componentsRef.current).forEach((key) => {
        const group = componentsRef.current[key];
        if (group && !group.userData.installed && !group.userData.isDragging) {
          group.position.y = group.userData.initialPos.y;
        }
      });
    }
  }, [activeItem]);

  /**
   * Main Three.js Initialization & Lifecycle
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Reset fan rotators
    fanRotatorsRef.current = [];

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.018);

    // 2. Camera (Strictly Isometric POV, framed so left quest drawer never covers it)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(-1.0, 13.5, 12.8);
    camera.lookAt(-0.8, 0, 0.6);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. OrbitControls (Strictly bounded around isometric focus)
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(-0.8, 0, 0.6);
    controls.maxPolarAngle = Math.PI / 2.15;
    controls.minPolarAngle = Math.PI / 5;
    controls.minDistance = 6.0;
    controls.maxDistance = 25.0;
    controlsRef.current = controls;

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainLight.position.set(8, 18, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillGreen = new THREE.PointLight(0x10b981, 1.8, 24);
    fillGreen.position.set(-6, 7, -3);
    scene.add(fillGreen);

    const fillCyan = new THREE.PointLight(0x06b6d4, 1.6, 24);
    fillCyan.position.set(6, 7, 6);
    scene.add(fillCyan);

    // 6. Build ESD Table Workbench & Motherboard Sockets
    buildAssemblyWorkbench(scene);
    buildMotherboardWithSockets(scene, activeQuestIds);
    buildStagingComponents(scene, activeQuestIds);

    // 7. Raycasting & Interaction Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const planeIntersect = new THREE.Vector3();

    const getInteractiveObject = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      // Only uninstalled components can be dragged
      const interactables = Object.values(componentsRef.current)
        .filter((comp) => comp && !comp.userData.installed);

      const intersects = raycaster.intersectObjects(interactables, true);
      if (intersects.length > 0) {
        let curr = intersects[0].object;
        while (curr) {
          if (curr.userData && curr.userData.id) {
            const compGroup = componentsRef.current[curr.userData.id] || curr;
            return { component: compGroup, point: intersects[0].point };
          }
          if (curr === scene) break;
          curr = curr.parent;
        }
      }
      return null;
    };

    const getSocketIntersect = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const beacons = Object.values(socketBeaconsRef.current)
        .filter((b) => b && b.visible);

      const intersects = raycaster.intersectObjects(beacons, true);
      if (intersects.length > 0) {
        let curr = intersects[0].object;
        while (curr) {
          if (curr.userData && curr.userData.socketId) {
            return curr.userData.socketId;
          }
          if (curr === scene) break;
          curr = curr.parent;
        }
      }
      return null;
    };

    let pointerDownPos = { x: 0, y: 0 };

    const onPointerDown = (e) => {
      if (e.button !== 0) return;
      pointerDownPos = { x: e.clientX, y: e.clientY };

      const hit = getInteractiveObject(e);

      if (hit) {
        e.stopPropagation();
        const comp = hit.component;
        isDraggingRef.current = true;
        draggedObjRef.current = comp;
        comp.userData.isDragging = true;
        controls.enabled = false;

        dragPlaneRef.current.constant = -1.1;
        raycaster.ray.intersectPlane(dragPlaneRef.current, planeIntersect);
        offsetRef.current.copy(comp.position).sub(planeIntersect);

        canvas.style.cursor = 'grabbing';
        setActiveItem?.(comp.userData.id);
        setActiveHoverHint(`Mengangkat ${comp.userData.name}. Geser ke soket yang menyala di motherboard!`);
      } else {
        // Direct click on glowing socket with active item
        const hitSocket = getSocketIntersect(e);
        const currActive = activeItemRef.current;
        if (hitSocket && currActive) {
          e.stopPropagation();
          trySnap(currActive, hitSocket);
        }
      }
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      if (isDraggingRef.current && draggedObjRef.current) {
        if (raycaster.ray.intersectPlane(dragPlaneRef.current, planeIntersect)) {
          const nextPos = planeIntersect.add(offsetRef.current);
          draggedObjRef.current.position.x = nextPos.x;
          draggedObjRef.current.position.z = nextPos.z;
          draggedObjRef.current.position.y = 1.1;
        }

        const draggedId = draggedObjRef.current.userData.id;
        const targetPos = socketTargetsRef.current[draggedId];
        if (targetPos) {
          const dist = new THREE.Vector2(draggedObjRef.current.position.x, draggedObjRef.current.position.z)
            .distanceTo(new THREE.Vector2(targetPos.x, targetPos.z));

          if (dist < 2.2) {
            setActiveHoverHint(`✓ Posisi pas! Lepaskan kursor untuk memasang ${draggedObjRef.current.userData.name}!`);
          } else {
            setActiveHoverHint(`Tarik ${draggedObjRef.current.userData.name} ke soketnya di motherboard...`);
          }
        }
      } else {
        const hit = getInteractiveObject(e);
        const hitSocket = getSocketIntersect(e);
        const currActive = activeItemRef.current;

        if (hit) {
          canvas.style.cursor = 'grab';
          setActiveHoverHint(`Klik atau Tarik ${hit.component.userData.name}`);
        } else if (hitSocket && currActive) {
          canvas.style.cursor = 'pointer';
          setActiveHoverHint(`Klik untuk memasang ke Soket ${hitSocket.toUpperCase()}`);
        } else {
          canvas.style.cursor = 'default';
        }
      }
    };

    const onPointerUp = (e) => {
      if (isDraggingRef.current && draggedObjRef.current) {
        const draggedObj = draggedObjRef.current;
        const draggedId = draggedObj.userData.id;
        isDraggingRef.current = false;
        controls.enabled = true;
        canvas.style.cursor = 'default';

        const moveDistance = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);

        // Check proximity to any target socket
        let closestSocket = null;
        let minDistance = 999;

        Object.keys(socketTargetsRef.current).forEach((sKey) => {
          const target = socketTargetsRef.current[sKey];
          const dist = new THREE.Vector2(draggedObj.position.x, draggedObj.position.z)
            .distanceTo(new THREE.Vector2(target.x, target.z));

          if (dist < minDistance) {
            minDistance = dist;
            closestSocket = sKey;
          }
        });

        if (closestSocket && minDistance < 2.3) {
          trySnap(draggedId, closestSocket);
        } else if (moveDistance < 8) {
          // Just clicked: keep active in select mode
          setActiveItem?.(draggedId);
          setActiveHoverHint(`${draggedObj.userData.name} dipilih! Klik soketnya di motherboard.`);
        } else {
          // Slide back to initial dock position
          draggedObj.userData.isDragging = false;
          draggedObj.position.copy(draggedObj.userData.initialPos);
          if (draggedId === 'battery') {
            draggedObj.scale.set(0.38, 0.38, 0.38);
          }
          setActiveHoverHint(`Komponen kembali ke baki meja.`);
        }

        draggedObjRef.current = null;
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown, { capture: true });
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animFrameRef.current = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Spin rotating fans
      fanRotatorsRef.current.forEach((rotor) => {
        if (rotor) rotor.rotation.y += delta * 7.5;
      });

      // Animate socket beacons
      Object.keys(socketBeaconsRef.current).forEach((sKey) => {
        const beacon = socketBeaconsRef.current[sKey];
        if (beacon && beacon.visible) {
          const ring = beacon.getObjectByName('beaconRing');
          if (ring) ring.rotation.z += delta * 2.2;

          const glow = beacon.getObjectByName('beaconGlow');
          if (glow) {
            const scale = 1 + Math.sin(time * 4) * 0.16;
            glow.scale.set(scale, scale, scale);
            glow.rotation.y += delta * 1.5;
          }
        }
      });

      // Subtle breathing floating on uninstalled staging components
      const currActive = activeItemRef.current;
      Object.keys(componentsRef.current).forEach((cKey) => {
        const comp = componentsRef.current[cKey];
        if (comp && !comp.userData.installed && !comp.userData.isDragging && currActive !== cKey) {
          comp.position.y = comp.userData.initialPos.y + Math.sin(time * 2.5 + comp.position.x) * 0.04;
          comp.rotation.y = Math.sin(time * 0.8) * 0.05;
        }
      });

      // Spark particles update
      particlesRef.current.forEach((p, idx) => {
        p.position.add(p.userData.velocity);
        p.userData.life -= delta;
        p.material.opacity = Math.max(0, p.userData.life / 0.8);
        if (p.userData.life <= 0) {
          scene.remove(p);
          particlesRef.current.splice(idx, 1);
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };
    renderLoop();

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
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
    };
  }, [activeQuestIds]);

  /**
   * Snapping Logic (Called during pointerUp or direct socket click)
   */
  const trySnap = (componentId, targetSocket) => {
    const compGroup = componentsRef.current[componentId];
    if (!compGroup) return;

    if (componentId === targetSocket) {
      // SUCCESS!
      const targetPos = socketTargetsRef.current[targetSocket];
      compGroup.position.copy(targetPos);
      compGroup.rotation.set(0, 0, 0);
      if (componentId === 'battery') {
        compGroup.scale.set(1, 1, 1);
      }
      compGroup.userData.installed = true;
      compGroup.userData.isDragging = false;

      spawnSnapParticles(targetPos);

      if (socketBeaconsRef.current[targetSocket]) {
        socketBeaconsRef.current[targetSocket].visible = false;
      }

      setSnapFeedback({
        message: `BERHASIL! ${compGroup.userData.name} terpasang sempurna!`,
        type: 'success',
      });
      setTimeout(() => setSnapFeedback(null), 2500);

      onComponentSnapRef.current?.(componentId, targetSocket);
      setActiveItem?.(null);
    } else {
      // WRONG SOCKET!
      compGroup.position.copy(compGroup.userData.initialPos);
      if (componentId === 'battery') {
        compGroup.scale.set(0.38, 0.38, 0.38);
      }
      compGroup.userData.isDragging = false;

      setSnapFeedback({
        message: `PERINGATAN: ${compGroup.userData.name} tidak cocok dengan soket ini!`,
        type: 'wrong',
      });
      setTimeout(() => setSnapFeedback(null), 2500);

      onWrongSnapRef.current?.(targetSocket);
    }
  };

  /**
   * Spark particles explosion on snap
   */
  const spawnSnapParticles = (centerPos) => {
    const scene = sceneRef.current;
    if (!scene) return;

    for (let i = 0; i < 28; i++) {
      const p = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x10b981 : 0xf59e0b,
          transparent: true,
          opacity: 1,
        })
      );
      p.position.set(
        centerPos.x + (Math.random() - 0.5) * 0.5,
        centerPos.y + 0.3 + Math.random() * 0.25,
        centerPos.z + (Math.random() - 0.5) * 0.5
      );
      p.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.09,
          0.05 + Math.random() * 0.07,
          (Math.random() - 0.5) * 0.09
        ),
        life: 0.85,
      };
      scene.add(p);
      particlesRef.current.push(p);
    }
  };

  /**
   * Build Assembly Table & Staging Tray
   */
  const buildAssemblyWorkbench = (scene) => {
    // Large ESD Anti-Static Mat
    const mat = new THREE.Mesh(
      new THREE.BoxGeometry(18, 0.2, 16),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.7, metalness: 0.1 })
    );
    mat.position.set(0, -0.11, 0.2);
    mat.receiveShadow = true;
    scene.add(mat);

    // Grid Traces on Workbench Mat
    const grid = new THREE.GridHelper(18, 36, 0x10b981, 0xcbd5e1);
    grid.position.set(0, 0.01, 0.2);
    scene.add(grid);

    // Front Staging Tray
    const tray = new THREE.Mesh(
      new THREE.BoxGeometry(10.8, 0.08, 2.4),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.15 })
    );
    tray.position.set(0, 0.04, 5.0);
    tray.receiveShadow = true;
    scene.add(tray);

    // Front Tray Rim Accent
    const rim = new THREE.Mesh(
      new THREE.BoxGeometry(11.0, 0.12, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 })
    );
    rim.position.set(0, 0.06, 6.2);
    scene.add(rim);
  };

  /**
   * Build Motherboard with Target Sockets
   * Uses authentic Gaming Laptop Motherboard base (GamingPCB, RTX 4060 GPU, VRM, IO)
   */
  const buildMotherboardWithSockets = (scene, questIds) => {
    const mbGroup = new THREE.Group();
    mbGroup.position.set(0, 0, -0.6);

    // 1. Mount Realistic Gaming Laptop Mainboard PCB Base
    buildGamingPCB(mbGroup);

    // 2. Mount Soldered Compute Engine: NVIDIA RTX 4060 GPU (Permanently Seated BGA)
    buildGamingGPU(mbGroup);

    // 3. Mount VRM Power Delivery Infrastructure
    buildGamingVRM(mbGroup);

    // 4. Mount Perimeter IO System (Display, USB, LAN, Audio)
    const ioGroup = buildGamingIO(mbGroup);
    if (questIds.includes('wifi')) {
      ioGroup.traverse((child) => {
        if (child.name === 'gamingWiFiModule') {
          child.visible = false;
        }
      });
    }

    // 5. Mount Thermal Cooling Subsystem
    const coolingResult = buildGamingCooling(mbGroup);
    if (coolingResult && coolingResult.fanRotators) {
      if (questIds.includes('fan')) {
        // Hide left fan so user can assemble it into the left bay
        mbGroup.traverse((child) => {
          if (child.name === 'leftFan') {
            child.visible = false;
          }
        });
        coolingResult.fanRotators.forEach((rotor) => {
          if (rotor.name !== 'leftFan_rotor') {
            fanRotatorsRef.current.push(rotor);
          }
        });
      } else {
        coolingResult.fanRotators.forEach((rotor) => fanRotatorsRef.current.push(rotor));
      }
    }

    // 6. Mount Non-Quest Components (if not part of current assembly challenge)
    if (!questIds.includes('cpu')) {
      buildGamingCPU(mbGroup);
    }
    if (!questIds.includes('ram')) {
      buildGamingRAM(mbGroup);
    }
    if (!questIds.includes('ssd')) {
      buildGamingSSD(mbGroup);
    }
    if (!questIds.includes('battery')) {
      buildGamingBattery(mbGroup);
    }

    scene.add(mbGroup);

    // ── DEFINE ALL AUTHENTIC GAMING LAPTOP SOCKET LOCATIONS (World Coordinates) ──
    socketTargetsRef.current = {
      cpu: new THREE.Vector3(1.8, 0.22, -1.8),
      ram: new THREE.Vector3(0.0, 0.24, 0.2),
      ssd: new THREE.Vector3(2.3, 0.22, 1.0),
      battery: new THREE.Vector3(0.0, 0.16, 2.6),
      wifi: new THREE.Vector3(-3.5, 0.22, 0.6),
      fan: new THREE.Vector3(-3.8, 0.22, -3.4),
    };

    // ── MOUNT REALISTIC EMPTY SOCKET BASES FOR ACTIVE QUESTS ──
    if (questIds.includes('cpu')) {
      // Empty CPU BGA1964 Socket Base with Gold Pin Array
      const cpuBase = new THREE.Mesh(
        new THREE.BoxGeometry(1.85, 0.08, 1.85),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
      );
      cpuBase.position.set(1.8, 0.18, -1.8);
      scene.add(cpuBase);

      const pinMatrix = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.08, 1.4),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.15 })
      );
      pinMatrix.position.set(1.8, 0.22, -1.8);
      scene.add(pinMatrix);

      // Gold Pin-1 Corner Triangle Indicator
      const pin1Mark = new THREE.Mesh(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-0.7, 0.23, -0.7),
          new THREE.Vector3(-0.5, 0.23, -0.7),
          new THREE.Vector3(-0.7, 0.23, -0.5)
        ]),
        new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide })
      );
      pin1Mark.position.set(1.8, 0, -1.8);
      scene.add(pin1Mark);
    }

    if (questIds.includes('ram')) {
      // Empty Dual SO-DIMM Socket Base Frame with Retention Latches
      const ramBase = new THREE.Mesh(
        new THREE.BoxGeometry(3.0, 0.09, 1.0),
        new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 })
      );
      ramBase.position.set(0.0, 0.18, 0.2);
      scene.add(ramBase);

      [-0.25, 0.25].forEach((z) => {
        const slotChannel = new THREE.Mesh(
          new THREE.BoxGeometry(2.7, 0.06, 0.15),
          new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.3 })
        );
        slotChannel.position.set(0.0, 0.22, 0.2 + z);
        scene.add(slotChannel);
      });
    }

    if (questIds.includes('ssd')) {
      // Empty M.2 Key-M Socket Connector & Brass Standoff Post
      const m2Connector = new THREE.Mesh(
        new THREE.BoxGeometry(0.72, 0.10, 0.35),
        new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5 })
      );
      m2Connector.position.set(2.3, 0.20, -0.05);
      scene.add(m2Connector);

      const standoff = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.14, 16),
        new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95 })
      );
      standoff.position.set(2.3, 0.18, 2.05);
      scene.add(standoff);
    }

    if (questIds.includes('battery')) {
      // Empty Battery Bay Recess Outline & Keyed DC-IN Power Header
      const dcHeader = new THREE.Mesh(
        new THREE.BoxGeometry(0.85, 0.12, 0.32),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
      );
      dcHeader.position.set(0.0, 0.18, 1.4);
      scene.add(dcHeader);
    }

    if (questIds.includes('wifi')) {
      // Empty M.2 Key-E Wi-Fi Socket & Standoff
      const wifiBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 0.10, 0.3),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 })
      );
      wifiBase.position.set(-3.5, 0.20, 0.25);
      scene.add(wifiBase);
    }

    if (questIds.includes('fan')) {
      // Empty Left Blower Fan Bay Chassis Recess with 4-Pin PWM Header
      const pwmHeader = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.12, 0.2),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
      );
      pwmHeader.position.set(-3.8, 0.20, -2.1);
      scene.add(pwmHeader);
    }

    // Build holographic beacons ONLY for the active quest components
    socketBeaconsRef.current = {};
    questIds.forEach((qId) => {
      const compInfo = ASSEMBLY_COMPONENT_POOL[qId];
      const targetPos = socketTargetsRef.current[qId];
      if (compInfo && targetPos) {
        const beacon = createSocketHologramBeacon(qId, compInfo.socketName, compInfo.colorHex);
        beacon.position.copy(targetPos);
        beacon.visible = !installedSlots[qId];
        scene.add(beacon);
        socketBeaconsRef.current[qId] = beacon;
      }
    });
  };

  /**
   * Helper: Holographic Glowing Beacon
   */
  const createSocketHologramBeacon = (socketId, label, colorHex) => {
    const group = new THREE.Group();
    group.userData = { socketId };

    // Rotating Glowing Ring
    const ringGeo = new THREE.RingGeometry(0.6, 0.85, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.name = 'beaconRing';
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.05;
    group.add(ring);

    // Hologram Vertical Light Beam
    const beamGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.0, 16, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = 0.55;
    group.add(beam);

    // Floating Target Diamond Marker
    const markerGeo = new THREE.OctahedronGeometry(0.2);
    const markerMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity: 0.85,
      metalness: 0.8,
    });
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.name = 'beaconGlow';
    marker.position.y = 1.15;
    group.add(marker);

    // Raycast Hitbox
    const hitbox = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 2.4, 16),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitbox.position.y = 0.8;
    hitbox.userData = { socketId };
    group.add(hitbox);

    return group;
  };

  /**
   * Build Staging 3D Components on the Table Tray
   */
  const buildStagingComponents = (scene, questIds) => {
    componentsRef.current = {};
    const xOffsets = [-3.0, 0.0, 3.0];

    questIds.forEach((qId, index) => {
      const compInfo = ASSEMBLY_COMPONENT_POOL[qId];
      if (!compInfo) return;

      const xPos = xOffsets[index] || 0;
      const initialPos = new THREE.Vector3(xPos, 0.22, 5.0);

      // Pedestal Pad on Staging Tray
      const pad = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 0.04, 1.9),
        new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 })
      );
      pad.position.set(xPos, 0.09, 5.0);
      scene.add(pad);

      // Pad Rim Accent
      const padRim = new THREE.Mesh(
        new THREE.BoxGeometry(2.65, 0.02, 1.95),
        new THREE.MeshBasicMaterial({ color: compInfo.colorHex, transparent: true, opacity: 0.4 })
      );
      padRim.position.set(xPos, 0.08, 5.0);
      scene.add(padRim);

      // Create Detailed 3D Component Mesh
      const compGroup = create3DComponentMesh(qId, compInfo);
      compGroup.position.copy(initialPos);
      if (qId === 'battery') {
        compGroup.scale.set(0.38, 0.38, 0.38);
      }
      compGroup.userData = {
        id: qId,
        name: compInfo.name,
        initialPos: initialPos,
        installed: installedSlots[qId] || false,
        isDragging: false,
      };

      // If already installed, snap directly to socket
      if (installedSlots[qId] && socketTargetsRef.current[qId]) {
        compGroup.position.copy(socketTargetsRef.current[qId]);
        compGroup.rotation.set(0, 0, 0);
        if (qId === 'battery') {
          compGroup.scale.set(1, 1, 1);
        }
        compGroup.userData.installed = true;
      }

      scene.add(compGroup);
      componentsRef.current[qId] = compGroup;
    });
  };

  /**
   * High-Fidelity 3D Mesh Builder for Each Component in the Pool
   * Matches the modular gaming laptop models 1:1
   */
  const create3DComponentMesh = (id, compInfo) => {
    const group = new THREE.Group();

    if (id === 'cpu') {
      // 1. Intel Core i7 14650HX CPU
      // Emerald green multi-layer substrate
      const sub = new THREE.Mesh(
        new THREE.BoxGeometry(1.7, 0.08, 1.7),
        new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.35, metalness: 0.2 })
      );
      sub.position.y = 0.04;
      group.add(sub);

      // Gold Corner Pin-1 Triangle
      const cornerMark = new THREE.Mesh(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-0.78, 0.082, -0.78),
          new THREE.Vector3(-0.55, 0.082, -0.78),
          new THREE.Vector3(-0.78, 0.082, -0.55)
        ]),
        new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide })
      );
      group.add(cornerMark);

      // Nickel-plated IHS die plate
      const ihs = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 0.12, 1.3),
        new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.92, roughness: 0.18 })
      );
      ihs.position.y = 0.12;
      group.add(ihs);

      // Laser-engraved CPU label
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 512;
      labelCanvas.height = 512;
      const ctx = labelCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#d1d5db';
        ctx.fillRect(0, 0, 512, 512);
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 36px monospace';
        ctx.fillText('intel', 60, 120);
        ctx.font = 'bold 28px monospace';
        ctx.fillText('CORE i7', 60, 170);
        ctx.font = '22px monospace';
        ctx.fillText('i7-14650HX', 60, 220);
        ctx.fillText('SRM24 2.10GHZ', 60, 260);
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(360, 80, 80, 80);
      }
      const labelTex = new THREE.CanvasTexture(labelCanvas);
      const labelPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(1.24, 1.24),
        new THREE.MeshBasicMaterial({ map: labelTex })
      );
      labelPlane.rotation.x = -Math.PI / 2;
      labelPlane.position.y = 0.182;
      group.add(labelPlane);

      // Decoupling MLCC capacitors
      const capGeo = new THREE.BoxGeometry(0.08, 0.04, 0.05);
      const capMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const cap = new THREE.Mesh(capGeo, capMat);
        cap.position.set(Math.cos(angle) * 0.76, 0.08, Math.sin(angle) * 0.76);
        cap.rotation.y = angle;
        group.add(cap);
      }
    } 
    else if (id === 'ram') {
      // 2. DDR5 5600MT/s SO-DIMM Stick
      const pcb = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 0.08, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4 })
      );
      group.add(pcb);

      // Gold Edge Connector Fingers
      const fingers = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.02, 0.14),
        new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.15 })
      );
      fingers.position.set(0, 0.042, 0.35);
      group.add(fingers);

      // 4 DDR5 BGA Memory IC Chips
      const chipGeo = new THREE.BoxGeometry(0.48, 0.04, 0.32);
      const chipMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 });
      [-0.8, -0.28, 0.28, 0.8].forEach((cx) => {
        const chip = new THREE.Mesh(chipGeo, chipMat);
        chip.position.set(cx, 0.06, -0.05);
        group.add(chip);
      });

      // PMIC Controller Chip
      const pmic = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.03, 0.18),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 })
      );
      pmic.position.set(0, 0.055, -0.28);
      group.add(pmic);

      // DDR5 Laser Decal
      const ramCanvas = document.createElement('canvas');
      ramCanvas.width = 512;
      ramCanvas.height = 128;
      const rctx = ramCanvas.getContext('2d');
      if (rctx) {
        rctx.fillStyle = '#1e293b';
        rctx.fillRect(0, 0, 512, 128);
        rctx.fillStyle = '#f8fafc';
        rctx.font = 'bold 28px monospace';
        rctx.fillText('SK hynix 16GB 1Rx8', 20, 45);
        rctx.font = '22px monospace';
        rctx.fillText('PC5-5600B DDR5 SODIMM 1.1V', 20, 85);
      }
      const ramTex = new THREE.CanvasTexture(ramCanvas);
      const ramDecal = new THREE.Mesh(
        new THREE.PlaneGeometry(2.2, 0.4),
        new THREE.MeshBasicMaterial({ map: ramTex })
      );
      ramDecal.rotation.x = -Math.PI / 2;
      ramDecal.position.set(0, 0.082, -0.05);
      group.add(ramDecal);
    } 
    else if (id === 'ssd') {
      // 3. Samsung 990 PRO M.2 2280 NVMe Gen4 SSD
      const pcb = new THREE.Mesh(
        new THREE.BoxGeometry(0.72, 0.06, 2.2),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 })
      );
      group.add(pcb);

      // Gold Key-M Edge Fingers at Front
      const goldPins = new THREE.Mesh(
        new THREE.BoxGeometry(0.64, 0.02, 0.15),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 })
      );
      goldPins.position.set(0, 0.032, -1.02);
      group.add(goldPins);

      // High-speed NVMe PCIe 4.0 Controller
      const ctrl = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.06, 0.42),
        new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85, roughness: 0.2 })
      );
      ctrl.position.set(0, 0.06, -0.55);
      group.add(ctrl);

      // 2x 3D TLC V-NAND Flash packages
      const nandGeo = new THREE.BoxGeometry(0.55, 0.06, 0.55);
      const nandMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
      [0.05, 0.68].forEach((nz) => {
        const nand = new THREE.Mesh(nandGeo, nandMat);
        nand.position.set(0, 0.06, nz);
        group.add(nand);
      });

      // Laser label decal
      const ssdCanvas = document.createElement('canvas');
      ssdCanvas.width = 256;
      ssdCanvas.height = 512;
      const sctx = ssdCanvas.getContext('2d');
      if (sctx) {
        sctx.fillStyle = '#0f172a';
        sctx.fillRect(0, 0, 256, 512);
        sctx.fillStyle = '#ef4444';
        sctx.fillRect(0, 0, 256, 40);
        sctx.fillStyle = '#f8fafc';
        sctx.font = 'bold 24px monospace';
        sctx.fillText('SAMSUNG 990 PRO', 15, 80);
        sctx.font = '18px monospace';
        sctx.fillText('PCIe 4.0 NVMe M.2', 15, 120);
        sctx.fillText('1000GB V-NAND', 15, 160);
      }
      const ssdTex = new THREE.CanvasTexture(ssdCanvas);
      const ssdDecal = new THREE.Mesh(
        new THREE.PlaneGeometry(0.68, 1.3),
        new THREE.MeshBasicMaterial({ map: ssdTex })
      );
      ssdDecal.rotation.x = -Math.PI / 2;
      ssdDecal.position.set(0, 0.092, 0.2);
      group.add(ssdDecal);
    } 
    else if (id === 'battery') {
      // 4. Authentic 4-Cell Li-Polymer Battery Pack
      const packBase = new THREE.Mesh(
        new THREE.BoxGeometry(8.6, 0.22, 2.4),
        new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.65, metalness: 0.15 })
      );
      packBase.position.y = 0.11;
      group.add(packBase);

      // 4 Individual Pouch Cell Pillows
      [-3.1, -1.05, 1.05, 3.1].forEach((cx) => {
        const pillow = new THREE.Mesh(
          new THREE.BoxGeometry(1.85, 0.06, 2.15),
          new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.55 })
        );
        pillow.position.set(cx, 0.23, 0);
        group.add(pillow);
      });

      // Safety Caution Decal
      const battCanvas = document.createElement('canvas');
      battCanvas.width = 512;
      battCanvas.height = 256;
      const bctx = battCanvas.getContext('2d');
      if (bctx) {
        bctx.fillStyle = '#18181b';
        bctx.fillRect(0, 0, 512, 256);
        bctx.fillStyle = '#facc15';
        bctx.font = 'bold 28px monospace';
        bctx.fillText('CAUTION / ATTENTION', 30, 50);
        bctx.fillStyle = '#f8fafc';
        bctx.font = '20px monospace';
        bctx.fillText('RECHARGEABLE LI-ION BATTERY', 30, 95);
        bctx.fillText('MODEL: C41N2013 15.4V 90Wh', 30, 135);
        bctx.fillText('4-CELL PACK • CE FC PSE', 30, 175);
      }
      const battTex = new THREE.CanvasTexture(battCanvas);
      const battDecal = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 1.4),
        new THREE.MeshBasicMaterial({ map: battTex })
      );
      battDecal.rotation.x = -Math.PI / 2;
      battDecal.position.set(0, 0.262, 0);
      group.add(battDecal);

      // Flexible Wire Cable Harness
      const wireColors = [0xef4444, 0xef4444, 0x3b82f6, 0xfacc15, 0x0f172a, 0x0f172a];
      wireColors.forEach((color, idx) => {
        const ox = -0.5 + idx * 0.18;
        const wirePath = new THREE.CatmullRomCurve3([
          new THREE.Vector3(ox, 0.24, -1.0),
          new THREE.Vector3(ox, 0.28, -1.3),
          new THREE.Vector3(ox, 0.20, -1.5)
        ]);
        const wire = new THREE.Mesh(
          new THREE.TubeGeometry(wirePath, 12, 0.035, 8, false),
          new THREE.MeshStandardMaterial({ color, roughness: 0.5 })
        );
        group.add(wire);
      });
    } 
    else if (id === 'wifi') {
      // 5. Intel Killer Wi-Fi 6E AX211 M.2 2230
      const pcb = new THREE.Mesh(
        new THREE.BoxGeometry(0.75, 0.04, 0.95),
        new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.4 })
      );
      pcb.position.y = 0.05;
      group.add(pcb);

      // Nickel-plated Metal EMI Shield Can
      const shield = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.08, 0.72),
        new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.92, roughness: 0.18 })
      );
      shield.position.set(0, 0.09, -0.05);
      group.add(shield);

      // Wi-Fi 6E Label Decal
      const wifiCanvas = document.createElement('canvas');
      wifiCanvas.width = 256;
      wifiCanvas.height = 256;
      const wctx = wifiCanvas.getContext('2d');
      if (wctx) {
        wctx.fillStyle = '#d1d5db';
        wctx.fillRect(0, 0, 256, 256);
        wctx.fillStyle = '#0f172a';
        wctx.font = 'bold 30px monospace';
        wctx.fillText('Wi-Fi 6E', 40, 70);
        wctx.font = 'bold 22px monospace';
        wctx.fillText('AX211 M.2', 40, 110);
        wctx.fillText('BT 5.3 160M', 40, 150);
      }
      const wifiTex = new THREE.CanvasTexture(wifiCanvas);
      const wifiDecal = new THREE.Mesh(
        new THREE.PlaneGeometry(0.6, 0.65),
        new THREE.MeshBasicMaterial({ map: wifiTex })
      );
      wifiDecal.rotation.x = -Math.PI / 2;
      wifiDecal.position.set(0, 0.132, -0.05);
      group.add(wifiDecal);

      // Dual Gold IPEX Antenna Terminals
      [-0.18, 0.18].forEach((ix) => {
        const ipex = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.04, 0.03, 12),
          new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95 })
        );
        ipex.position.set(ix, 0.14, -0.36);
        group.add(ipex);
      });
    } 
    else if (id === 'fan') {
      // 6. Laptop Centrifugal Blower Cooling Fan
      const shroud = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.25, 0.52, 32),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5, metalness: 0.3 })
      );
      shroud.position.y = 0.26;
      group.add(shroud);

      // Center Intake Hole
      const intake = new THREE.Mesh(
        new THREE.CylinderGeometry(0.72, 0.72, 0.54, 32),
        new THREE.MeshBasicMaterial({ color: 0x020617 })
      );
      intake.position.y = 0.27;
      group.add(intake);

      // Metallic Green Hub Badge
      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 0.56, 24),
        new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8, roughness: 0.2 })
      );
      hub.position.y = 0.28;
      group.add(hub);

      // Rotating Impeller Turbine Group
      const rotor = new THREE.Group();
      rotor.position.y = 0.26;

      const bladeGeo = new THREE.BoxGeometry(0.04, 0.38, 0.42);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.4 });
      for (let b = 0; b < 24; b++) {
        const angle = (b / 24) * Math.PI * 2;
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.position.set(Math.cos(angle) * 0.58, 0, Math.sin(angle) * 0.58);
        blade.rotation.y = -angle + 0.35;
        rotor.add(blade);
      }
      group.add(rotor);
      fanRotatorsRef.current.push(rotor);
    }

    // Large invisible raycast hitbox for effortless interaction
    const hitBox = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 2.0, 16),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitBox.position.y = 0.3;
    hitBox.userData = { id, name: compInfo.name };
    group.add(hitBox);

    return group;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* Floating Hover Instruction Hint */}
      {activeHoverHint && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200 text-xs font-mono text-slate-800 shadow-lg pointer-events-none animate-fadeIn flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>{activeHoverHint}</span>
        </div>
      )}

      {/* Floating Snapping Feedback Toast */}
      {snapFeedback && (
        <div className={`absolute top-24 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-2xl shadow-2xl text-xs font-mono font-bold flex items-center gap-2.5 animate-bounce ${
          snapFeedback.type === 'success'
            ? 'bg-emerald-600 text-white border border-emerald-400'
            : 'bg-amber-600 text-white border border-amber-400'
        }`}>
          {snapFeedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-200" />
          )}
          <span>{snapFeedback.message}</span>
        </div>
      )}

    </div>
  );
}
