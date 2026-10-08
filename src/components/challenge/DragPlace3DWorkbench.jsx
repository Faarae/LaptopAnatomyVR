import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  CheckCircle2, Sparkles, Compass, AlertCircle, Box, Volume2
} from 'lucide-react';
import { ASSEMBLY_COMPONENT_POOL } from './DragPlaceGame';

/**
 * DragPlace3DWorkbench
 * 100% Native WebGL Three.js Fullscreen Isometric Assembly Scene:
 * - Empty Motherboard Sockets corresponding to activeQuestIds
 * - Staging 3D Components on the front ESD table tray
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

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.02);

    // 2. Camera (Strictly Isometric POV, framed to the right so left quest drawer never covers it)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(-1.2, 10.2, 11.2);
    camera.lookAt(-1.2, 0, 0.4);
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
    controls.target.set(-1.2, 0, 0.4);
    controls.maxPolarAngle = Math.PI / 2.15;
    controls.minPolarAngle = Math.PI / 5;
    controls.minDistance = 6.0;
    controls.maxDistance = 22.0;
    controlsRef.current = controls;

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.6);
    mainLight.position.set(8, 16, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillGreen = new THREE.PointLight(0x10b981, 1.6, 22);
    fillGreen.position.set(-6, 6, -3);
    scene.add(fillGreen);

    const fillCyan = new THREE.PointLight(0x06b6d4, 1.4, 22);
    fillCyan.position.set(6, 6, 6);
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

          if (dist < 2.0) {
            setActiveHoverHint(`✓ Posisi pas! Lepaskan kursor untuk memasang ${draggedObjRef.current.userData.name}!`);
          } else {
            setActiveHoverHint(`Tarik ${draggedObjRef.current.userData.name} ke soketnya...`);
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

        if (closestSocket && minDistance < 2.1) {
          trySnap(draggedId, closestSocket);
        } else if (moveDistance < 8) {
          // Just clicked: keep active in select mode
          setActiveItem?.(draggedId);
          setActiveHoverHint(`${draggedObj.userData.name} dipilih! Klik soketnya di motherboard.`);
        } else {
          // Slide back to initial dock position
          draggedObj.userData.isDragging = false;
          draggedObj.position.copy(draggedObj.userData.initialPos);
          setActiveHoverHint(`Komponen kembali ke baki.`);
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

      // Animate socket beacons
      Object.keys(socketBeaconsRef.current).forEach((sKey) => {
        const beacon = socketBeaconsRef.current[sKey];
        if (beacon && beacon.visible) {
          const ring = beacon.getObjectByName('beaconRing');
          if (ring) ring.rotation.z += delta * 2.0;

          const glow = beacon.getObjectByName('beaconGlow');
          if (glow) {
            const scale = 1 + Math.sin(time * 4) * 0.15;
            glow.scale.set(scale, scale, scale);
          }
        }
      });

      // Subtle breathing floating on uninstalled staging components
      const currActive = activeItemRef.current;
      Object.keys(componentsRef.current).forEach((cKey) => {
        const comp = componentsRef.current[cKey];
        if (comp && !comp.userData.installed && !comp.userData.isDragging && currActive !== cKey) {
          comp.position.y = comp.userData.initialPos.y + Math.sin(time * 2.5 + comp.position.x) * 0.04;
          comp.rotation.y = Math.sin(time * 0.8) * 0.06;
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

    for (let i = 0; i < 24; i++) {
      const p = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x10b981 : 0xf59e0b,
          transparent: true,
          opacity: 1,
        })
      );
      p.position.set(
        centerPos.x + (Math.random() - 0.5) * 0.4,
        centerPos.y + 0.3 + Math.random() * 0.2,
        centerPos.z + (Math.random() - 0.5) * 0.4
      );
      p.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.08,
          0.04 + Math.random() * 0.06,
          (Math.random() - 0.5) * 0.08
        ),
        life: 0.8,
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
      new THREE.BoxGeometry(16, 0.2, 14),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.7, metalness: 0.1 })
    );
    mat.position.y = -0.11;
    mat.receiveShadow = true;
    scene.add(mat);

    // Front Staging Tray
    const tray = new THREE.Mesh(
      new THREE.BoxGeometry(9.6, 0.08, 2.2),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.15 })
    );
    tray.position.set(0, 0.04, 2.7);
    tray.receiveShadow = true;
    scene.add(tray);

    // Front Tray Rim
    const rim = new THREE.Mesh(
      new THREE.BoxGeometry(9.8, 0.12, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 })
    );
    rim.position.set(0, 0.06, 3.8);
    scene.add(rim);

    // Grid Traces
    const grid = new THREE.GridHelper(14, 28, 0x10b981, 0xcbd5e1);
    grid.position.y = 0.01;
    scene.add(grid);
  };

  /**
   * Build Motherboard with Target Sockets
   */
  const buildMotherboardWithSockets = (scene, questIds) => {
    const mbGroup = new THREE.Group();
    mbGroup.position.set(0, 0, -0.6);

    // Mainboard PCB Surface
    const pcb = new THREE.Mesh(
      new THREE.BoxGeometry(8.6, 0.2, 7.2),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.2 })
    );
    pcb.receiveShadow = true;
    mbGroup.add(pcb);

    // Gold Circuit Traces
    const traceGrid = new THREE.GridHelper(7.8, 22, 0xf59e0b, 0x1e293b);
    traceGrid.position.y = 0.11;
    mbGroup.add(traceGrid);

    // VRM Heatsinks
    const vrm = createHeatsink(0.7, 0.8, 2.6, 0x475569);
    vrm.position.set(-3.2, 0.5, -1.2);
    mbGroup.add(vrm);

    const vrmTop = createHeatsink(2.4, 0.8, 0.7, 0x475569);
    vrmTop.position.set(-1.8, 0.5, -2.8);
    mbGroup.add(vrmTop);

    // Chipset PCH Heatsink
    const pch = createHeatsink(1.4, 0.5, 1.4, 0xb45309);
    pch.position.set(-2.0, 0.35, 1.6);
    mbGroup.add(pch);

    // PCIe Slot
    const pcie = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.4, 3.4),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
    );
    pcie.position.set(-0.2, 0.3, 0.8);
    mbGroup.add(pcie);

    // CMOS CR2032 Battery
    const batt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.38, 0.14, 24),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95 })
    );
    batt.position.set(-2.2, 0.25, 2.8);
    mbGroup.add(batt);

    scene.add(mbGroup);

    // ── DEFINE ALL POSSIBLE SOCKET LOCATIONS & HOUSINGS ──
    socketTargetsRef.current = {
      cpu: new THREE.Vector3(-1.8, 0.22, -1.8),
      ram: new THREE.Vector3(2.2, 0.24, -1.8),
      ssd: new THREE.Vector3(2.0, 0.22, 0.8),
      battery: new THREE.Vector3(-2.6, 0.22, 1.0),
      wifi: new THREE.Vector3(-0.6, 0.22, -1.4),
      fan: new THREE.Vector3(-3.2, 0.25, -2.5),
    };

    // 1. CPU Socket Base (World: -1.8, -1.8)
    const cpuBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.16, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
    );
    cpuBase.position.set(-1.8, 0.18, -1.8);
    scene.add(cpuBase);

    const pinMatrix = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.18, 1.6),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.15 })
    );
    pinMatrix.position.set(-1.8, 0.22, -1.8);
    scene.add(pinMatrix);

    // 2. RAM Socket Base (World: 2.2, -1.8)
    const ramSlotBase = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.25, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.6 })
    );
    ramSlotBase.position.set(2.2, 0.2, -1.8);
    scene.add(ramSlotBase);

    // 3. SSD Socket Base (World: 2.0, 0.8)
    const m2Connector = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.25, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5 })
    );
    m2Connector.position.set(0.6, 0.22, 0.8);
    scene.add(m2Connector);

    const standoff = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.22, 16),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 })
    );
    standoff.position.set(3.4, 0.2, 0.8);
    scene.add(standoff);

    // 4. Battery Housing (World: -2.6, 1.0)
    const battTray = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.12, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 })
    );
    battTray.position.set(-2.6, 0.16, 1.0);
    scene.add(battTray);

    // 5. WiFi Slot (World: -0.6, -1.4)
    const wifiSlot = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.22, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 })
    );
    wifiSlot.position.set(-0.6, 0.18, -1.4);
    scene.add(wifiSlot);

    // 6. Fan Header (World: -3.2, -2.5)
    const fanHeader = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.24, 0.3),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
    );
    fanHeader.position.set(-3.2, 0.2, -2.5);
    scene.add(fanHeader);

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
    const ringGeo = new THREE.RingGeometry(0.55, 0.75, 32);
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
    const beamGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.9, 16, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = 0.5;
    group.add(beam);

    // Floating Target Diamond Marker
    const markerGeo = new THREE.OctahedronGeometry(0.18);
    const markerMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity: 0.8,
      metalness: 0.8,
    });
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.name = 'beaconGlow';
    marker.position.y = 1.05;
    group.add(marker);

    // Raycast Hitbox
    const hitbox = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 2.2, 16),
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
    const xOffsets = [-2.8, 0.0, 2.8];

    questIds.forEach((qId, index) => {
      const compInfo = ASSEMBLY_COMPONENT_POOL[qId];
      if (!compInfo) return;

      const xPos = xOffsets[index] || 0;
      const initialPos = new THREE.Vector3(xPos, 0.22, 2.7);

      // Pedestal Pad on Staging Tray
      const pad = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.04, 1.8),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
      );
      pad.position.set(xPos, 0.09, 2.7);
      scene.add(pad);

      // Create Component 3D Mesh
      const compGroup = create3DComponentMesh(qId, compInfo);
      compGroup.position.copy(initialPos);
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
        compGroup.userData.installed = true;
      }

      scene.add(compGroup);
      componentsRef.current[qId] = compGroup;
    });
  };

  /**
   * 3D Mesh Builder for Each Component in the Pool
   */
  const create3DComponentMesh = (id, compInfo) => {
    const group = new THREE.Group();

    if (id === 'cpu') {
      // CPU Substrate & Nickel IHS
      const pcb = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.08, 1.6),
        new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.3 })
      );
      group.add(pcb);

      const ihs = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.16, 1.2),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.15 })
      );
      ihs.position.y = 0.1;
      group.add(ihs);

      const pin001 = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.02, 0.18),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 })
      );
      pin001.position.set(-0.65, 0.05, -0.65);
      group.add(pin001);
    } 
    else if (id === 'ram') {
      // RAM Stick with DRAM chips
      const pcb = new THREE.Mesh(
        new THREE.BoxGeometry(3.0, 0.9, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4 })
      );
      pcb.rotation.x = Math.PI / 4;
      group.add(pcb);

      const teeth = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 0.18, 0.09),
        new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.92, roughness: 0.15 })
      );
      teeth.rotation.x = Math.PI / 4;
      teeth.position.set(0, -0.32, -0.15);
      group.add(teeth);

      [-1.0, -0.35, 0.35, 1.0].forEach((x) => {
        const chip = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.45, 0.06),
          new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 })
        );
        chip.rotation.x = Math.PI / 4;
        chip.position.set(x, 0.08, 0.05);
        group.add(chip);
      });
    } 
    else if (id === 'ssd') {
      // M.2 NVMe SSD
      const pcb = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 0.08, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.4 })
      );
      group.add(pcb);

      const nand1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.12, 0.6),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 })
      );
      nand1.position.set(0.4, 0.08, 0);
      group.add(nand1);

      const nand2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.12, 0.6),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 })
      );
      nand2.position.set(-0.4, 0.08, 0);
      group.add(nand2);

      const controller = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.14, 0.4),
        new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85, roughness: 0.2 })
      );
      controller.position.set(-1.0, 0.09, 0);
      group.add(controller);
    } 
    else if (id === 'battery') {
      // Battery Pack
      const pack = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.18, 1.4),
        new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.4 })
      );
      group.add(pack);

      [-0.6, 0.0, 0.6].forEach((x) => {
        const ridge = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.04, 1.2),
          new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.6 })
        );
        ridge.position.set(x, 0.1, 0);
        group.add(ridge);
      });

      const label = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.01, 0.6),
        new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.3 })
      );
      label.position.set(0, 0.1, 0);
      group.add(label);
    } 
    else if (id === 'wifi') {
      // WiFi M.2 2230
      const pcb = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.06, 1.4),
        new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.4 })
      );
      group.add(pcb);

      const shield = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.1, 1.0),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 })
      );
      shield.position.set(0, 0.06, 0.1);
      group.add(shield);

      [-0.3, 0.3].forEach((x) => {
        const ipex = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, 0.08, 12),
          new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 })
        );
        ipex.position.set(x, 0.12, -0.45);
        group.add(ipex);
      });
    } 
    else if (id === 'fan') {
      // Blower Fan
      const housing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 0.9, 0.24, 24),
        new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5 })
      );
      group.add(housing);

      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 0.28, 20),
        new THREE.MeshStandardMaterial({ color: 0xec4899, metalness: 0.7, roughness: 0.3 })
      );
      hub.position.y = 0.02;
      group.add(hub);
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

  /**
   * Helper: Heatsink Fins
   */
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
