import * as THREE from 'three';

/**
 * Builds the Wi-Fi 7 Wireless Module, 4K OLED Display Connector, and Creator I/O Hub
 * Features:
 * - Intel Wi-Fi 7 (BE200) module with 320MHz MLO support and dual antenna lines
 * - 40-Pin eDP 1.4 Interface + Factory Color Calibration EEPROM
 * - Left edge: Dual USB4 / Thunderbolt 4 (40Gbps) Type-C ports, HDMI 2.1 port, USB 3.2 Type-A
 * - Right edge: Full-size SD Express 7.0 Card Reader housing, USB 3.2 Type-A, 3.5mm Hi-Res Audio Jack
 */
export function buildCreatorIO(parentGroup) {
  const ioGroup = new THREE.Group();
  ioGroup.name = 'creatorIO';

  const metalPortMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.95,
    roughness: 0.2
  });

  const blueUsbMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.4
  });

  // 1. Wi-Fi 7 Module (x: -3.6, z: 1.0)
  const wifiGroup = new THREE.Group();
  wifiGroup.position.set(-3.6, 0.19, 1.0);

  const wifiPcb = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.04, 0.85),
    new THREE.MeshStandardMaterial({ color: 0x0c1926, roughness: 0.4 })
  );
  wifiPcb.position.y = 0.05;
  wifiGroup.add(wifiPcb);

  const wifiShield = new THREE.Mesh(
    new THREE.BoxGeometry(0.58, 0.08, 0.65),
    new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.92, roughness: 0.18 })
  );
  wifiShield.position.set(0, 0.09, -0.05);
  wifiGroup.add(wifiShield);

  // Wi-Fi 7 Label Decal
  const wifiCanvas = document.createElement('canvas');
  wifiCanvas.width = 256;
  wifiCanvas.height = 256;
  const wctx = wifiCanvas.getContext('2d');
  if (wctx) {
    wctx.fillStyle = '#d1d5db';
    wctx.fillRect(0, 0, 256, 256);
    wctx.fillStyle = '#0f172a';
    wctx.font = 'bold 30px monospace';
    wctx.fillText('Wi-Fi 7', 40, 70);
    wctx.font = 'bold 22px monospace';
    wctx.fillText('BE200 M.2', 40, 110);
    wctx.fillText('320M MLO 5.8G', 40, 150);
    wctx.fillText('BT 5.4 LE', 40, 190);
  }
  const wifiTex = new THREE.CanvasTexture(wifiCanvas);
  const wifiLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.52, 0.58),
    new THREE.MeshBasicMaterial({ map: wifiTex })
  );
  wifiLabel.rotation.x = -Math.PI / 2;
  wifiLabel.position.set(0, 0.132, -0.05);
  wifiGroup.add(wifiLabel);

  // Dual IPEX antenna wires
  const ipexMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95 });
  [-0.16, 0.16].forEach((ix, i) => {
    const ipex = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.03, 12),
      ipexMat
    );
    ipex.position.set(ix, 0.14, -0.32);
    wifiGroup.add(ipex);

    const antPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(ix, 0.14, -0.32),
      new THREE.Vector3(ix - 0.2, 0.14, -0.6),
      new THREE.Vector3(-1.0, 0.14, -1.2),
      new THREE.Vector3(-1.2, 0.14, -2.4)
    ]);
    const antGeo = new THREE.TubeGeometry(antPath, 16, 0.02, 6, false);
    const antMat = new THREE.MeshStandardMaterial({
      color: i === 0 ? 0x18181b : 0x94a3b8,
      roughness: 0.6
    });
    const antCable = new THREE.Mesh(antGeo, antMat);
    wifiGroup.add(antCable);
  });

  ioGroup.add(wifiGroup);

  // 2. 40-Pin eDP 4K OLED Display Connector (x: 3.3, z: -2.6)
  const displayGroup = new THREE.Group();
  displayGroup.position.set(3.3, 0.19, -2.6);

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

  // Calibration EEPROM IC
  const eeprom = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.05, 0.35),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 })
  );
  eeprom.position.set(-0.7, 0.03, 0.3);
  displayGroup.add(eeprom);

  ioGroup.add(displayGroup);

  // 3. Left Edge Ports (x: -4.8): Dual USB4, HDMI 2.1, USB-A
  const leftPorts = [
    { type: 'hdmi', z: -0.4, w: 0.45, h: 0.32, d: 0.60 },
    { type: 'usb4_1', z: 0.3, w: 0.45, h: 0.22, d: 0.35 },
    { type: 'usb4_2', z: 0.8, w: 0.45, h: 0.22, d: 0.35 },
    { type: 'usba', z: 1.4, w: 0.45, h: 0.35, d: 0.55 }
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

  // 4. Right Edge Ports (x: 4.8): SD Express 7.0 Card Slot, USB-A, Audio
  const rightPorts = [
    { type: 'sd_card', z: -0.2, w: 0.45, h: 0.18, d: 0.95 },
    { type: 'usba', z: 0.6, w: 0.45, h: 0.35, d: 0.55 },
    { type: 'audio', z: 1.3, w: 0.45, h: 0.35, d: 0.40 }
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
    } else if (port.type === 'sd_card') {
      // SD card slot mouth
      const slotMouth = new THREE.Mesh(
        new THREE.BoxGeometry(0.10, 0.06, 0.85),
        new THREE.MeshBasicMaterial({ color: 0x020617 })
      );
      slotMouth.position.set(4.9, 0.20 + port.h / 2, port.z);
      ioGroup.add(slotMouth);
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
  displayHighlight.position.set(3.3, 0.01, -2.6);
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
