import * as THREE from 'three';

/**
 * Builds the Wi-Fi 6 Module, eDP Display Connector, and Ultrabook I/O Ports
 * Position: Outer Edges & Perimeter
 * Features:
 * - Intel Wi-Fi 6 (AX201) M.2 module with nickel shield and dual antenna lines
 * - 30-Pin eDP 1.4 Display Ribbon Connector with metal locking bar
 * - Left edge: USB-C (PD 65W/DP 1.4), USB 3.2 Gen 1 Type-A, 3.5mm audio combo jack
 * - Right edge: USB 3.2 Gen 1 Type-A, MicroSD card slot
 */
export function buildEntryIO(parentGroup) {
  const ioGroup = new THREE.Group();
  ioGroup.name = 'entryIO';

  const metalPortMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.95,
    roughness: 0.2
  });

  const blueUsbMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7, // USB 3.2 Blue tongue
    roughness: 0.4
  });

  // 1. Wi-Fi 6 Module (x: -3.6, z: 0.8)
  const wifiGroup = new THREE.Group();
  wifiGroup.position.set(-3.6, 0.17, 0.8);

  // M.2 2230 PCB
  const wifiPcb = new THREE.Mesh(
    new THREE.BoxGeometry(0.60, 0.035, 0.75),
    new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.4 })
  );
  wifiPcb.position.y = 0.04;
  wifiGroup.add(wifiPcb);

  // Metal Shield
  const wifiShield = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 0.07, 0.58),
    new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.92, roughness: 0.18 })
  );
  wifiShield.position.set(0, 0.08, -0.04);
  wifiGroup.add(wifiShield);

  // Wi-Fi 6 Label
  const wifiCanvas = document.createElement('canvas');
  wifiCanvas.width = 256;
  wifiCanvas.height = 256;
  const wctx = wifiCanvas.getContext('2d');
  if (wctx) {
    wctx.fillStyle = '#d1d5db';
    wctx.fillRect(0, 0, 256, 256);
    wctx.fillStyle = '#0f172a';
    wctx.font = 'bold 30px monospace';
    wctx.fillText('Wi-Fi 6', 40, 75);
    wctx.font = 'bold 22px monospace';
    wctx.fillText('AX201 M.2', 40, 115);
    wctx.fillText('BT 5.2 2.4G', 40, 155);
  }
  const wifiTex = new THREE.CanvasTexture(wifiCanvas);
  const wifiLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.48, 0.52),
    new THREE.MeshBasicMaterial({ map: wifiTex })
  );
  wifiLabel.rotation.x = -Math.PI / 2;
  wifiLabel.position.set(0, 0.118, -0.04);
  wifiGroup.add(wifiLabel);

  // Dual IPEX antenna wires
  [-0.14, 0.14].forEach((ix, i) => {
    const ipex = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.025, 10),
      new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95 })
    );
    ipex.position.set(ix, 0.12, -0.28);
    wifiGroup.add(ipex);

    const antPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(ix, 0.12, -0.28),
      new THREE.Vector3(ix - 0.15, 0.12, -0.6),
      new THREE.Vector3(-0.9, 0.12, -1.2)
    ]);
    const antGeo = new THREE.TubeGeometry(antPath, 14, 0.018, 6, false);
    const antMat = new THREE.MeshStandardMaterial({
      color: i === 0 ? 0x18181b : 0x94a3b8,
      roughness: 0.6
    });
    const antCable = new THREE.Mesh(antGeo, antMat);
    wifiGroup.add(antCable);
  });

  ioGroup.add(wifiGroup);

  // 2. 30-Pin eDP Display Connector (x: 2.2, z: -2.4)
  const edpGroup = new THREE.Group();
  edpGroup.position.set(2.2, 0.17, -2.4);

  const edpGeo = new THREE.BoxGeometry(0.70, 0.07, 0.28);
  const edpMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  const edp = new THREE.Mesh(edpGeo, edpMat);
  edp.position.y = 0.035;
  edpGroup.add(edp);

  const edpPins = new THREE.Mesh(
    new THREE.BoxGeometry(0.60, 0.02, 0.10),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95 })
  );
  edpPins.position.set(0, 0.07, 0);
  edpGroup.add(edpPins);

  ioGroup.add(edpGroup);

  // 3. Left Edge Ports (x: -4.6)
  const leftPorts = [
    { type: 'usbc', z: -0.2, w: 0.40, h: 0.20, d: 0.32 },
    { type: 'usba', z: 0.6, w: 0.40, h: 0.32, d: 0.50 },
    { type: 'audio', z: 1.2, w: 0.40, h: 0.32, d: 0.38 }
  ];

  leftPorts.forEach((port) => {
    const portHousing = new THREE.Mesh(
      new THREE.BoxGeometry(port.w, port.h, port.d),
      metalPortMat
    );
    portHousing.position.set(-4.5, 0.17 + port.h / 2, port.z);
    portHousing.castShadow = true;
    ioGroup.add(portHousing);

    if (port.type === 'usba') {
      const tongue = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.07, 0.36),
        blueUsbMat
      );
      tongue.position.set(-4.68, 0.17 + port.h / 2, port.z);
      ioGroup.add(tongue);
    } else if (port.type === 'audio') {
      const jackHole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 0.06, 14),
        new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.9 })
      );
      jackHole.rotation.z = Math.PI / 2;
      jackHole.position.set(-4.68, 0.33, port.z);
      ioGroup.add(jackHole);
    }
  });

  // 4. Right Edge Ports (x: 4.6)
  const rightPorts = [
    { type: 'usba', z: 0.4, w: 0.40, h: 0.32, d: 0.50 },
    { type: 'microsd', z: 1.1, w: 0.40, h: 0.16, d: 0.42 }
  ];

  rightPorts.forEach((port) => {
    const portHousing = new THREE.Mesh(
      new THREE.BoxGeometry(port.w, port.h, port.d),
      metalPortMat
    );
    portHousing.position.set(4.5, 0.17 + port.h / 2, port.z);
    portHousing.castShadow = true;
    ioGroup.add(portHousing);

    if (port.type === 'usba') {
      const tongue = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.07, 0.36),
        blueUsbMat
      );
      tongue.position.set(4.68, 0.17 + port.h / 2, port.z);
      ioGroup.add(tongue);
    }
  });

  // Highlight Planes for Pin 07 (Display) & Pin 10 (IO)
  const displayHighlight = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 1.2),
    new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0, side: THREE.DoubleSide })
  );
  displayHighlight.rotation.x = -Math.PI / 2;
  displayHighlight.position.set(2.2, 0.01, -2.4);
  displayHighlight.name = 'displayHighlight';
  ioGroup.add(displayHighlight);

  const ioHighlight = new THREE.Mesh(
    new THREE.PlaneGeometry(2.0, 2.8),
    new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0, side: THREE.DoubleSide })
  );
  ioHighlight.rotation.x = -Math.PI / 2;
  ioHighlight.position.set(-3.8, 0.01, 0.5);
  ioHighlight.name = 'ioHighlight';
  ioGroup.add(ioHighlight);

  parentGroup.add(ioGroup);
  return ioGroup;
}
