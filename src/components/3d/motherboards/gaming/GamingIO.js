import * as THREE from 'three';

/**
 * Builds the Wireless Module (Wi-Fi 6E), Display Engine (eDP/HDMI), and External I/O Ports
 * Features:
 * - Wi-Fi 6E (802.11ax) M.2 2230 module with nickel EMI shield and dual IPEX antenna cables
 * - 40-pin eDP DisplayPort ribbon connector & Hardware MUX Switch video controller
 * - Full perimeter gaming I/O ports: HDMI 2.1, USB-C Thunderbolt 4, Dual USB-A 3.2, RJ-45 2.5G LAN, 3.5mm Audio
 */
export function buildGamingIO(parentGroup) {
  const ioGroup = new THREE.Group();
  ioGroup.name = 'gamingIO';

  const metalPortMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8, // Stainless steel connector shield
    metalness: 0.95,
    roughness: 0.2
  });

  const blueUsbMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7, // USB 3.2 Blue tongue
    roughness: 0.4
  });

  // 1. Wi-Fi 6E M.2 2230 Module (Position: x: -3.5, z: 1.2)
  const wifiGroup = new THREE.Group();
  wifiGroup.position.set(-3.5, 0.19, 1.2);

  // M.2 2230 Mini PCB
  const wifiPcb = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.04, 0.85),
    new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.4 })
  );
  wifiPcb.position.y = 0.05;
  wifiGroup.add(wifiPcb);

  // Metal EMI Shield Can
  const wifiShield = new THREE.Mesh(
    new THREE.BoxGeometry(0.58, 0.08, 0.65),
    new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.92, roughness: 0.18 })
  );
  wifiShield.position.set(0, 0.09, -0.05);
  wifiGroup.add(wifiShield);

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
    wctx.fillText('2.4Gbps TRI', 40, 190);
  }
  const wifiTex = new THREE.CanvasTexture(wifiCanvas);
  const wifiLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.52, 0.58),
    new THREE.MeshBasicMaterial({ map: wifiTex })
  );
  wifiLabel.rotation.x = -Math.PI / 2;
  wifiLabel.position.set(0, 0.132, -0.05);
  wifiGroup.add(wifiLabel);

  // Dual IPEX Micro Antenna Terminals (Gold)
  const ipexGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 12);
  const ipexMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95 });

  [-0.16, 0.16].forEach((ix, i) => {
    const ipex = new THREE.Mesh(ipexGeo, ipexMat);
    ipex.position.set(ix, 0.14, -0.32);
    wifiGroup.add(ipex);

    // Antenna Coaxial Cables routing toward edge
    const antPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(ix, 0.14, -0.32),
      new THREE.Vector3(ix - 0.2, 0.14, -0.6),
      new THREE.Vector3(-1.0, 0.14, -1.2),
      new THREE.Vector3(-1.2, 0.14, -2.4)
    ]);
    const antGeo = new THREE.TubeGeometry(antPath, 16, 0.02, 6, false);
    const antMat = new THREE.MeshStandardMaterial({
      color: i === 0 ? 0x18181b : 0x94a3b8, // Black Main, Gray Aux
      roughness: 0.6
    });
    const antCable = new THREE.Mesh(antGeo, antMat);
    wifiGroup.add(antCable);
  });

  ioGroup.add(wifiGroup);

  // 2. Display Engine & eDP Connector (Position: x: 3.4, z: -2.8)
  const displayGroup = new THREE.Group();
  displayGroup.position.set(3.4, 0.19, -2.8);

  // 40-Pin eDP Gold Pin Connector
  const edpGeo = new THREE.BoxGeometry(0.85, 0.08, 0.32);
  const edpMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  const edp = new THREE.Mesh(edpGeo, edpMat);
  edp.position.y = 0.04;
  displayGroup.add(edp);

  const edpPins = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.02, 0.12),
    ipexMat
  );
  edpPins.position.set(0, 0.08, 0);
  displayGroup.add(edpPins);

  // Hardware MUX Switch / Advanced Optimus IC Chip
  const muxGeo = new THREE.BoxGeometry(0.38, 0.05, 0.38);
  const muxMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
  const mux = new THREE.Mesh(muxGeo, muxMat);
  mux.position.set(-0.7, 0.03, 0.3);
  displayGroup.add(mux);

  // MUX Switch Decal
  const muxCanvas = document.createElement('canvas');
  muxCanvas.width = 128;
  muxCanvas.height = 128;
  const mctx = muxCanvas.getContext('2d');
  if (mctx) {
    mctx.fillStyle = '#0f172a';
    mctx.fillRect(0, 0, 128, 128);
    mctx.fillStyle = '#22c55e';
    mctx.font = 'bold 20px monospace';
    mctx.fillText('MUX IC', 20, 50);
    mctx.fillText('165Hz', 20, 85);
  }
  const muxTex = new THREE.CanvasTexture(muxCanvas);
  const muxLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.34, 0.34),
    new THREE.MeshBasicMaterial({ map: muxTex })
  );
  muxLabel.rotation.x = -Math.PI / 2;
  muxLabel.position.set(-0.7, 0.06, 0.3);
  displayGroup.add(muxLabel);

  ioGroup.add(displayGroup);

  // 3. Left Edge External I/O Ports Stack (x: -4.8, z: -0.4 to 1.6)
  const leftPorts = [
    { type: 'dcin', z: -0.6, w: 0.45, h: 0.45, d: 0.5 },
    { type: 'rj45', z: 0.0, w: 0.45, h: 0.48, d: 0.65 },
    { type: 'hdmi', z: 0.6, w: 0.45, h: 0.32, d: 0.6 },
    { type: 'usba', z: 1.2, w: 0.45, h: 0.35, d: 0.55 },
    { type: 'usbc', z: 1.6, w: 0.45, h: 0.22, d: 0.35 }
  ];

  leftPorts.forEach((port) => {
    const portHousing = new THREE.Mesh(
      new THREE.BoxGeometry(port.w, port.h, port.d),
      metalPortMat
    );
    portHousing.position.set(-4.7, 0.20 + port.h / 2, port.z);
    portHousing.castShadow = true;
    ioGroup.add(portHousing);

    if (port.type === 'usba') {
      const tongue = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 0.40),
        blueUsbMat
      );
      tongue.position.set(-4.9, 0.20 + port.h / 2, port.z);
      ioGroup.add(tongue);
    }
  });

  // 4. Right Edge External I/O Ports Stack (x: 4.8, z: 0.2 to 1.4)
  const rightPorts = [
    { type: 'usba', z: 0.4, w: 0.45, h: 0.35, d: 0.55 },
    { type: 'audio', z: 1.1, w: 0.45, h: 0.35, d: 0.40 }
  ];

  rightPorts.forEach((port) => {
    const portHousing = new THREE.Mesh(
      new THREE.BoxGeometry(port.w, port.h, port.d),
      metalPortMat
    );
    portHousing.position.set(4.7, 0.20 + port.h / 2, port.z);
    portHousing.castShadow = true;
    ioGroup.add(portHousing);

    if (port.type === 'usba') {
      const tongue = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 0.40),
        blueUsbMat
      );
      tongue.position.set(4.9, 0.20 + port.h / 2, port.z);
      ioGroup.add(tongue);
    } else if (port.type === 'audio') {
      const jackHole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.09, 0.08, 16),
        new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.9 })
      );
      jackHole.rotation.z = Math.PI / 2;
      jackHole.position.set(4.9, 0.38, port.z);
      ioGroup.add(jackHole);
    }
  });

  // Highlight Planes for Pin 07 (Display) & Pin 10 (IO)
  const displayHighlight = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 1.4),
    new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0, side: THREE.DoubleSide })
  );
  displayHighlight.rotation.x = -Math.PI / 2;
  displayHighlight.position.set(3.4, 0.01, -2.8);
  displayHighlight.name = 'displayHighlight';
  ioGroup.add(displayHighlight);

  const ioHighlight = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 3.4),
    new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0, side: THREE.DoubleSide })
  );
  ioHighlight.rotation.x = -Math.PI / 2;
  ioHighlight.position.set(-3.8, 0.01, 0.6);
  ioHighlight.name = 'ioHighlight';
  ioGroup.add(ioHighlight);

  parentGroup.add(ioGroup);
  return ioGroup;
}
