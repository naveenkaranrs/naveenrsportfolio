import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { sounds } from '../audio/soundEngine';
import {
  RotateCcw,
  Maximize2,
  Compass,
  Cpu,
  Eye,
  Info,
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';

export default function PCBScene3D({ onSelectComponent, activeComponentId }) {
  const mountRef = useRef(null);
  const [hoveredChip, setHoveredChip] = useState(null);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [cameraMode, setCameraMode] = useState('iso');

  const sceneState = useRef({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    interactiveObjects: [],
    pulseParticles: [],
    leds: [],
    targetCamPos: null,
    targetLookAt: null,
    isLerpingCam: false,
    reqId: null,
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(-100, -100),
    materials: {}
  });

  // Generate high-resolution procedural PCB texture
  const createPCBTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');

    // Dark sleek high-tech solder mask (obsidian emerald)
    const bgGradient = ctx.createLinearGradient(0, 0, 2048, 2048);
    bgGradient.addColorStop(0, '#06110f');
    bgGradient.addColorStop(0.5, '#0a1a16');
    bgGradient.addColorStop(1, '#050c0a');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 2048, 2048);

    // Subtle substrate fiber grid
    ctx.strokeStyle = 'rgba(0, 229, 153, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 2048; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 2048);
      ctx.stroke();
    }
    for (let y = 0; y < 2048; y += 16) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(2048, y);
      ctx.stroke();
    }

    // Gold ground vias array
    ctx.fillStyle = '#ffc04d';
    for (let i = 0; i < 400; i++) {
      const vx = Math.random() * 2000 + 24;
      const vy = Math.random() * 2000 + 24;
      ctx.beginPath();
      ctx.arc(vx, vy, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#020705';
      ctx.beginPath();
      ctx.arc(vx, vy, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffc04d';
    }

    // Copper / Gold High-Tech Traces
    ctx.strokeStyle = '#00e599';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(0, 229, 153, 0.6)';
    ctx.shadowBlur = 4;

    const drawTrace = (pts) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i][0], pts[i][1]);
      }
      ctx.stroke();
      // Pad terminal
      const last = pts[pts.length - 1];
      ctx.fillStyle = '#ffc04d';
      ctx.beginPath();
      ctx.arc(last[0], last[1], 4, 0, Math.PI * 2);
      ctx.fill();
    };

    // Bus traces emanating from MCU center (1024, 1024)
    const cx = 1024, cy = 1024;
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 16) {
      const r1 = 280;
      const r2 = 500 + Math.random() * 200;
      const r3 = 700 + Math.random() * 250;
      const x1 = cx + Math.cos(angle) * r1;
      const y1 = cy + Math.sin(angle) * r1;
      const x2 = cx + Math.cos(angle) * r2;
      const y2 = cy + Math.sin(angle) * r2;
      const x3 = x2 + (Math.cos(angle + 0.4) * (r3 - r2));
      const y3 = y2 + (Math.sin(angle + 0.4) * (r3 - r2));
      drawTrace([[x1, y1], [x2, y2], [x3, y3]]);
    }

    // RFID loop coil antenna on bottom-left
    ctx.strokeStyle = '#ffb020';
    ctx.lineWidth = 4;
    for (let r = 80; r < 220; r += 16) {
      ctx.beginPath();
      ctx.roundRect(320 - r, 1600 - r, r * 2, r * 2, 20);
      ctx.stroke();
    }

    // High-precision silkscreen markings
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "JetBrains Mono", monospace';
    ctx.fillText('NAVEEN LABS EMBEDDED SYSTEM v2.4', 120, 140);

    ctx.font = '20px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('ARM CORTEX-M4 @ 168MHz | FreeRTOS Kernel v10.5', 120, 180);
    ctx.fillText('CAN-FD / MODBUS RS-485 / DCN-QoS / IoMT NODE', 120, 215);

    // Silkscreen component boundaries and pin labels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - 240, cy - 240, 480, 480);
    ctx.fillStyle = '#00e599';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText('U1: STM32F407VGT6 [CORE MCU]', cx - 210, cy - 255);

    // Peripheral silkscreens
    ctx.fillStyle = '#00d2ff';
    ctx.fillText('RF1: ESP32-WROOM / IoMT', 1400, 480);
    ctx.fillText('U2: CAN-FD TRANSCEIVER', 1420, 1500);
    ctx.fillText('ANT1: DCN RFID ANTENNA', 180, 1340);
    ctx.fillText('J1: SWD / JTAG PROBE', 1440, 950);
    ctx.fillText('U3: MODBUS RS-485 BUS', 260, 520);
    ctx.fillText('U4: 20+ FREELANCE IoT HUB', 840, 1750);
    ctx.fillText('M1: EEPROM / CERT MATRIX', 280, 980);
    ctx.fillText('TB1: SYSTEM I/O CONNECT', 1700, 1780);

    // Gold plated corner mounting pads
    const corners = [[80, 80], [1968, 80], [80, 1968], [1968, 1968]];
    corners.forEach(([kx, ky]) => {
      ctx.fillStyle = '#ffc04d';
      ctx.beginPath();
      ctx.arc(kx, ky, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#020504';
      ctx.beginPath();
      ctx.arc(kx, ky, 24, 0, Math.PI * 2);
      ctx.fill();
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070a10);
    scene.fog = new THREE.FogExp2(0x070a10, 0.022);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 16, 17);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05; // Prevent camera from going under PCB
    controls.minDistance = 4;
    controls.maxDistance = 35;
    controls.target.set(0, 0, 0);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xd4f0ff, 2.2);
    mainKeyLight.position.set(12, 22, 14);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 2048;
    mainKeyLight.shadow.mapSize.height = 2048;
    mainKeyLight.shadow.camera.near = 0.5;
    mainKeyLight.shadow.camera.far = 50;
    mainKeyLight.shadow.camera.left = -16;
    mainKeyLight.shadow.camera.right = 16;
    mainKeyLight.shadow.camera.top = 16;
    mainKeyLight.shadow.camera.bottom = -16;
    scene.add(mainKeyLight);

    // Cyan accent rim light
    const cyanRim = new THREE.PointLight(0x00d2ff, 3.5, 30);
    cyanRim.position.set(-14, 8, -10);
    scene.add(cyanRim);

    // Emerald accent glow light
    const emeraldGlow = new THREE.PointLight(0x00e599, 4.0, 30);
    emeraldGlow.position.set(12, 7, -8);
    scene.add(emeraldGlow);

    // Warm copper bounce light
    const copperBounce = new THREE.PointLight(0xffaa33, 1.8, 25);
    copperBounce.position.set(0, -5, 0);
    scene.add(copperBounce);

    // 5. Build 3D PCB Board Substrate
    const pcbWidth = 20;
    const pcbHeight = 14;
    const pcbThickness = 0.35;

    const pcbTexture = createPCBTexture();
    const pcbMaterial = new THREE.MeshStandardMaterial({
      map: pcbTexture,
      roughness: 0.38,
      metalness: 0.25,
      bumpMap: pcbTexture,
      bumpScale: 0.02
    });

    const pcbSideMaterial = new THREE.MeshStandardMaterial({
      color: 0x051a14,
      roughness: 0.8,
      metalness: 0.1
    });

    const pcbBottomMaterial = new THREE.MeshStandardMaterial({
      color: 0x06110f,
      roughness: 0.6,
      metalness: 0.3
    });

    const pcbMaterials = [
      pcbSideMaterial, // right
      pcbSideMaterial, // left
      pcbMaterial,     // top (our high-res traces)
      pcbBottomMaterial, // bottom
      pcbSideMaterial, // front
      pcbSideMaterial  // back
    ];

    const pcbGeometry = new THREE.BoxGeometry(pcbWidth, pcbThickness, pcbHeight);
    const pcbMesh = new THREE.Mesh(pcbGeometry, pcbMaterials);
    pcbMesh.position.y = 0;
    pcbMesh.receiveShadow = true;
    scene.add(pcbMesh);

    // Subtle dark grid floor underneath
    const gridHelper = new THREE.GridHelper(50, 50, 0x00e599, 0x112229);
    gridHelper.position.y = -2.5;
    scene.add(gridHelper);

    // 6. Interactive Component Registry
    const interactiveList = [];
    const leds = [];

    // Helper: Add interactive metadata to mesh
    const registerInteractive = (mesh, data) => {
      mesh.userData = {
        isInteractive: true,
        ...data,
        originalEmissive: mesh.material?.emissive ? mesh.material.emissive.getHex() : 0x000000,
        originalScale: mesh.scale.clone()
      };
      interactiveList.push(mesh);
    };

    // Helper: Create Chip Pins
    const createChipPins = (parent, width, length, pinCountPerSide, height = 0.12) => {
      const pinMat = new THREE.MeshStandardMaterial({
        color: 0xe0e6ed,
        metalness: 0.95,
        roughness: 0.15
      });
      const pinGeo = new THREE.BoxGeometry(0.08, height, 0.3);

      // Top and bottom sides
      const stepX = (width * 0.8) / (pinCountPerSide - 1);
      const startX = -(width * 0.8) / 2;
      for (let i = 0; i < pinCountPerSide; i++) {
        // Top
        const pTop = new THREE.Mesh(pinGeo, pinMat);
        pTop.position.set(startX + i * stepX, -height / 2, length / 2 + 0.12);
        pTop.castShadow = true;
        parent.add(pTop);
        // Bottom
        const pBot = new THREE.Mesh(pinGeo, pinMat);
        pBot.position.set(startX + i * stepX, -height / 2, -length / 2 - 0.12);
        pBot.castShadow = true;
        parent.add(pBot);
      }

      // Left and right sides
      const pinGeoSide = new THREE.BoxGeometry(0.3, height, 0.08);
      const stepZ = (length * 0.8) / (pinCountPerSide - 1);
      const startZ = -(length * 0.8) / 2;
      for (let i = 0; i < pinCountPerSide; i++) {
        // Right
        const pRight = new THREE.Mesh(pinGeoSide, pinMat);
        pRight.position.set(width / 2 + 0.12, -height / 2, startZ + i * stepZ);
        pRight.castShadow = true;
        parent.add(pRight);
        // Left
        const pLeft = new THREE.Mesh(pinGeoSide, pinMat);
        pLeft.position.set(-width / 2 - 0.12, -height / 2, startZ + i * stepZ);
        pLeft.castShadow = true;
        parent.add(pLeft);
      }
    };

    // --- COMPONENT 1: CENTRAL MCU (STM32F407VGT6 / ARM CORTEX-M4) ---
    const mcuGroup = new THREE.Group();
    mcuGroup.position.set(0, pcbThickness / 2 + 0.22, 0);

    const mcuMat = new THREE.MeshStandardMaterial({
      color: 0x181c22,
      roughness: 0.32,
      metalness: 0.45,
      emissive: 0x002218,
      emissiveIntensity: 0.2
    });
    const mcuBody = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.35, 3.6), mcuMat);
    mcuBody.castShadow = true;
    mcuGroup.add(mcuBody);

    // Laser engraved text plate on top of MCU
    const mcuPlateCanvas = document.createElement('canvas');
    mcuPlateCanvas.width = 512;
    mcuPlateCanvas.height = 512;
    const pctx = mcuPlateCanvas.getContext('2d');
    pctx.fillStyle = '#14181d';
    pctx.fillRect(0, 0, 512, 512);
    // Pin 1 dot
    pctx.fillStyle = '#ffffff';
    pctx.beginPath();
    pctx.arc(60, 60, 20, 0, Math.PI * 2);
    pctx.fill();
    // Engraved text
    pctx.font = 'bold 36px "JetBrains Mono", monospace';
    pctx.fillStyle = '#00e599';
    pctx.fillText('ARM CORTEX-M4', 90, 180);
    pctx.font = '28px "JetBrains Mono", monospace';
    pctx.fillStyle = '#d0d8e0';
    pctx.fillText('STM32F407VGT6', 90, 235);
    pctx.font = '22px "JetBrains Mono", monospace';
    pctx.fillStyle = '#7a8898';
    pctx.fillText('168MHz | 1MB FLASH', 90, 280);
    pctx.fillText('NAVEEN LABS ARCH', 90, 320);

    const mcuPlateTex = new THREE.CanvasTexture(mcuPlateCanvas);
    const mcuPlateMat = new THREE.MeshBasicMaterial({ map: mcuPlateTex });
    const mcuPlate = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), mcuPlateMat);
    mcuPlate.rotation.x = -Math.PI / 2;
    mcuPlate.position.y = 0.18;
    mcuGroup.add(mcuPlate);

    createChipPins(mcuGroup, 3.6, 3.6, 12, 0.15);
    registerInteractive(mcuBody, {
      id: 'chip-mcu',
      name: 'STM32F407 Core MCU',
      subtext: 'ARM Cortex-M4 @ 168MHz',
      category: 'core',
      targetPos: new THREE.Vector3(0, 5, 5),
      lookAt: new THREE.Vector3(0, 0, 0)
    });
    scene.add(mcuGroup);

    // --- COMPONENT 2: ESP32-WROOM (IoMT ICU Patient Project) ---
    const espGroup = new THREE.Group();
    espGroup.position.set(5.5, pcbThickness / 2 + 0.2, -3.2);

    const rfShieldMat = new THREE.MeshStandardMaterial({
      color: 0xc8d0d8,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x001525,
      emissiveIntensity: 0.3
    });
    const espBody = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.3, 3.6), rfShieldMat);
    espBody.castShadow = true;
    espGroup.add(espBody);

    // Gold PCB antenna trace on the ESP32 substrate
    const antSubstrateMat = new THREE.MeshStandardMaterial({ color: 0x031812, roughness: 0.5 });
    const antSubstrate = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.15, 1.2), antSubstrateMat);
    antSubstrate.position.set(0, 0.05, -2.2);
    espGroup.add(antSubstrate);

    // Antenna gold traces
    const antGoldMat = new THREE.MeshStandardMaterial({ color: 0xffb020, metalness: 0.95, roughness: 0.1 });
    for (let ai = -1.0; ai <= 1.0; ai += 0.4) {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.9), antGoldMat);
      trace.position.set(ai, 0.13, -2.2);
      espGroup.add(trace);
    }

    createChipPins(espGroup, 2.8, 3.6, 8, 0.12);
    registerInteractive(espBody, {
      id: 'proj-iomt-icu',
      name: 'ESP32 IoMT Biosensor Hub',
      subtext: 'ICU Patient Telemetry (96% Acc)',
      category: 'project',
      targetPos: new THREE.Vector3(5.5, 4.5, -0.5),
      lookAt: new THREE.Vector3(5.5, 0, -3.2)
    });
    scene.add(espGroup);

    // --- COMPONENT 3: CAN-FD TRANSCEIVER (Edge AI Driver Emotion Project) ---
    const canGroup = new THREE.Group();
    canGroup.position.set(5.5, pcbThickness / 2 + 0.15, 3.8);

    const canMat = new THREE.MeshStandardMaterial({
      color: 0x1f232b,
      roughness: 0.35,
      metalness: 0.3,
      emissive: 0x100500,
      emissiveIntensity: 0.2
    });
    const canBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.25, 2.0), canMat);
    canBody.castShadow = true;
    canGroup.add(canBody);
    createChipPins(canGroup, 1.6, 2.0, 4, 0.1);

    registerInteractive(canBody, {
      id: 'proj-edge-ai-vehicle',
      name: 'CAN-FD Transceiver & ECU',
      subtext: 'Edge AI Driver Emotion & Brake Control',
      category: 'project',
      targetPos: new THREE.Vector3(5.5, 4.0, 6.5),
      lookAt: new THREE.Vector3(5.5, 0, 3.8)
    });
    scene.add(canGroup);

    // --- COMPONENT 4: RFID EMERGENCY GATEWAY (Smart Ambulance Project) ---
    const rfidGroup = new THREE.Group();
    rfidGroup.position.set(-6.0, pcbThickness / 2 + 0.15, 3.8);

    const rfidMat = new THREE.MeshStandardMaterial({
      color: 0x1a2126,
      roughness: 0.3,
      metalness: 0.4,
      emissive: 0x00151a,
      emissiveIntensity: 0.3
    });
    const rfidBody = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.25, 1.8), rfidMat);
    rfidBody.castShadow = true;
    rfidGroup.add(rfidBody);
    createChipPins(rfidGroup, 1.8, 1.8, 4, 0.1);

    // Pulsing halo circle above RFID coil
    const haloGeo = new THREE.RingGeometry(1.6, 1.75, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = -Math.PI / 2;
    haloMesh.position.y = 0.05;
    rfidGroup.add(haloMesh);

    registerInteractive(rfidBody, {
      id: 'proj-ambulance-dcn',
      name: 'DCN RFID Priority Gateway',
      subtext: 'Smart Ambulance V2I (40% Faster)',
      category: 'project',
      targetPos: new THREE.Vector3(-6.0, 4.0, 6.5),
      lookAt: new THREE.Vector3(-6.0, 0, 3.8)
    });
    scene.add(rfidGroup);

    // --- COMPONENT 5: MODBUS RS-485 / CONVEYOR AI CONTROLLER ---
    const modbusGroup = new THREE.Group();
    modbusGroup.position.set(-6.0, pcbThickness / 2 + 0.15, -3.8);

    const modbusMat = new THREE.MeshStandardMaterial({
      color: 0x22262d,
      roughness: 0.3,
      metalness: 0.4
    });
    const modbusBody = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.25, 2.2), modbusMat);
    modbusBody.castShadow = true;
    modbusGroup.add(modbusBody);
    createChipPins(modbusGroup, 1.8, 2.2, 4, 0.1);

    registerInteractive(modbusBody, {
      id: 'proj-conveyor-ai',
      name: 'MODBUS RS-485 Industrial Controller',
      subtext: 'Automated Conveyor AI Quality Control',
      category: 'project',
      targetPos: new THREE.Vector3(-6.0, 4.0, -1.0),
      lookAt: new THREE.Vector3(-6.0, 0, -3.8)
    });
    scene.add(modbusGroup);

    // --- COMPONENT 6: 20+ FREELANCE IoT HUB & HACKATHONS ---
    const freelanceGroup = new THREE.Group();
    freelanceGroup.position.set(0, pcbThickness / 2 + 0.15, 4.6);

    const freelanceMat = new THREE.MeshStandardMaterial({
      color: 0x1b2824,
      roughness: 0.3,
      metalness: 0.5,
      emissive: 0x002e1c,
      emissiveIntensity: 0.4
    });
    const freelanceBody = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.22, 1.6), freelanceMat);
    freelanceBody.castShadow = true;
    freelanceGroup.add(freelanceBody);
    createChipPins(freelanceGroup, 3.2, 1.6, 6, 0.1);

    registerInteractive(freelanceBody, {
      id: 'chip-freelance',
      name: '20+ Freelance IoT & Hackathons Hub',
      subtext: 'Real-World Client Prototyping & R&D',
      category: 'freelance',
      targetPos: new THREE.Vector3(0, 4.0, 7.5),
      lookAt: new THREE.Vector3(0, 0, 4.6)
    });
    scene.add(freelanceGroup);

    // --- COMPONENT 7: JTAG / SWD 10-PIN DEBUG HEADER (BRING-UP LAB) ---
    const swdGroup = new THREE.Group();
    swdGroup.position.set(7.6, pcbThickness / 2 + 0.3, 0);

    const shroudMat = new THREE.MeshStandardMaterial({ color: 0x111418, roughness: 0.6 });
    const shroud = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 2.4), shroudMat);
    swdGroup.add(shroud);

    // Gold pins inside header
    const goldPinMat = new THREE.MeshStandardMaterial({ color: 0xffb020, metalness: 0.95, roughness: 0.1 });
    for (let r = -0.3; r <= 0.3; r += 0.6) {
      for (let c = -0.8; c <= 0.8; c += 0.4) {
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 8), goldPinMat);
        pin.position.set(r, 0.25, c);
        swdGroup.add(pin);
      }
    }

    registerInteractive(shroud, {
      id: 'chip-debug-lab',
      name: 'SWD / JTAG Debug & Bring-up Lab',
      subtext: 'Oscilloscope, Logic Analyzer, GDB Registers',
      category: 'debug',
      targetPos: new THREE.Vector3(7.6, 4.0, 3.0),
      lookAt: new THREE.Vector3(7.6, 0, 0)
    });
    scene.add(swdGroup);

    // --- COMPONENT 8: EEPROM / CERTIFICATIONS & EXPERIENCE MATRIX ---
    const eepromGroup = new THREE.Group();
    eepromGroup.position.set(-6.5, pcbThickness / 2 + 0.12, 0);

    const eepromMat = new THREE.MeshStandardMaterial({
      color: 0x1d2128,
      roughness: 0.35,
      metalness: 0.4,
      emissive: 0x15001a,
      emissiveIntensity: 0.3
    });
    const eepromBody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.22, 1.8), eepromMat);
    eepromBody.castShadow = true;
    eepromGroup.add(eepromBody);
    createChipPins(eepromGroup, 1.4, 1.8, 4, 0.1);

    registerInteractive(eepromBody, {
      id: 'chip-experience-certs',
      name: 'Non-Volatile Memory (EEPROM)',
      subtext: 'Experience, ACM SIGBED, HYBIX & Certifications',
      category: 'experience',
      targetPos: new THREE.Vector3(-6.5, 4.0, 3.0),
      lookAt: new THREE.Vector3(-6.5, 0, 0)
    });
    scene.add(eepromGroup);

    // --- COMPONENT 9: INDUSTRIAL TERMINAL BLOCK (CONTACT ME) ---
    const termGroup = new THREE.Group();
    termGroup.position.set(8.2, pcbThickness / 2 + 0.4, 5.2);

    const termBodyMat = new THREE.MeshStandardMaterial({ color: 0x007848, roughness: 0.4 });
    const termBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.7, 2.2), termBodyMat);
    termGroup.add(termBody);

    // Brass screws
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4a017, metalness: 0.8, roughness: 0.2 });
    for (let z = -0.7; z <= 0.7; z += 0.46) {
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 12), brassMat);
      screw.position.set(0, 0.36, z);
      termGroup.add(screw);
    }

    registerInteractive(termBody, {
      id: 'chip-contact',
      name: 'System I/O Terminal Block',
      subtext: 'Direct Transmission / Contact Naveen',
      category: 'contact',
      targetPos: new THREE.Vector3(8.2, 4.0, 8.0),
      lookAt: new THREE.Vector3(8.2, 0, 5.2)
    });
    scene.add(termGroup);

    // --- SURFACE MOUNT PASSIVES (Capacitors, Resistors, Blinking LEDs) ---
    const capMat = new THREE.MeshStandardMaterial({ color: 0x9e734b, roughness: 0.4 });
    const capEndMat = new THREE.MeshStandardMaterial({ color: 0xd4d8e0, metalness: 0.9, roughness: 0.2 });
    const resMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 });

    const createSMDPassive = (x, z, rot = 0, isCap = true) => {
      const group = new THREE.Group();
      group.position.set(x, pcbThickness / 2 + 0.06, z);
      group.rotation.y = rot;

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.22), isCap ? capMat : resMat);
      group.add(body);

      const end1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.13, 0.23), capEndMat);
      end1.position.x = -0.16;
      group.add(end1);

      const end2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.13, 0.23), capEndMat);
      end2.position.x = 0.16;
      group.add(end2);

      scene.add(group);
    };

    // Scatter realistic SMD passives around ICs
    [
      [-2.3, 0, 0], [-2.3, 1.2, 0], [-2.3, -1.2, 0],
      [2.3, 0, 0], [2.3, 1.2, 0], [2.3, -1.2, 0],
      [0, 2.3, Math.PI / 2], [1.2, 2.3, Math.PI / 2], [-1.2, 2.3, Math.PI / 2],
      [0, -2.3, Math.PI / 2], [1.2, -2.3, Math.PI / 2], [-1.2, -2.3, Math.PI / 2],
      [3.8, -3.2, 0], [7.2, -3.2, 0], [3.8, 3.8, 0], [-4.4, 3.8, 0]
    ].forEach(([x, z, r], idx) => {
      createSMDPassive(x, z, r, idx % 2 === 0);
    });

    // Blinking Status LEDs (Heartbeat, TX, RX, Power)
    const ledConfigs = [
      { color: 0x00e599, x: -2.8, z: 2.8, name: 'HEARTBEAT_LED (FreeRTOS Tick)' },
      { color: 0x00d2ff, x: -2.8, z: 3.2, name: 'UART_RX_LED' },
      { color: 0xffaa00, x: -2.8, z: 3.6, name: 'CAN_TX_LED' },
      { color: 0xff3b30, x: 2.8, z: -2.8, name: '3V3_POWER_OK' }
    ];

    ledConfigs.forEach((cfg) => {
      const ledMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.8,
        roughness: 0.2
      });
      const ledMesh = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.15, 0.25), ledMat);
      ledMesh.position.set(cfg.x, pcbThickness / 2 + 0.08, cfg.z);
      scene.add(ledMesh);

      const pLight = new THREE.PointLight(cfg.color, 1.2, 3);
      pLight.position.set(cfg.x, pcbThickness / 2 + 0.3, cfg.z);
      scene.add(pLight);

      leds.push({ mesh: ledMesh, light: pLight, baseIntensity: 1.2, color: cfg.color });
    });

    // --- PULSING DATA PARTICLES (Moving glowing photons along traces) ---
    const pulseCount = 35;
    const pulseGeometry = new THREE.SphereGeometry(0.06, 8, 8);
    const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0x00e599 });
    const pulseParticles = [];

    for (let i = 0; i < pulseCount; i++) {
      const p = new THREE.Mesh(pulseGeometry, pulseMaterial.clone());
      const startOnMcu = Math.random() > 0.5;
      const angle = Math.random() * Math.PI * 2;
      const dist = 1.8 + Math.random() * 6.5;

      p.userData = {
        angle,
        dist,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
        startMcu: startOnMcu
      };
      scene.add(p);
      pulseParticles.push(p);
    }

    // Store state in ref
    sceneState.current = {
      scene,
      camera,
      renderer,
      controls,
      interactiveObjects: interactiveList,
      pulseParticles,
      leds,
      targetCamPos: null,
      targetLookAt: null,
      isLerpingCam: false,
      reqId: null,
      raycaster: new THREE.Raycaster(),
      mouse: new THREE.Vector2(-100, -100),
      materials: {}
    };

    // 7. Mouse Interaction (Hover / Raycasting)
    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      sceneState.current.mouse.set(x, y);
    };

    const handleClick = (event) => {
      const { raycaster, mouse, camera, interactiveObjects } = sceneState.current;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.id) {
          sounds.playChipSelect();
          // Trigger smooth camera glide to chip
          if (hit.userData.targetPos && hit.userData.lookAt) {
            sceneState.current.targetCamPos = hit.userData.targetPos.clone();
            sceneState.current.targetLookAt = hit.userData.lookAt.clone();
            sceneState.current.isLerpingCam = true;
          }
          if (onSelectComponent) {
            onSelectComponent(hit.userData);
          }
        }
      }
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('mousemove', handleMouseMove);
    canvasDom.addEventListener('click', handleClick);

    // 8. Animation & Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Animate blinking LEDs
      leds.forEach((led, idx) => {
        const pulse = (Math.sin(time * (4 + idx * 2)) + 1) / 2;
        led.light.intensity = pulse > 0.4 ? led.baseIntensity : 0.1;
        led.mesh.material.emissiveIntensity = pulse > 0.4 ? 1.0 : 0.2;
      });

      // Animate pulsing data particles
      pulseParticles.forEach((p) => {
        p.userData.progress += p.userData.speed;
        if (p.userData.progress > 1) {
          p.userData.progress = 0;
          p.userData.angle = Math.random() * Math.PI * 2;
        }

        const prog = p.userData.progress;
        const currentR = prog * p.userData.dist;
        p.position.x = Math.cos(p.userData.angle) * currentR;
        p.position.z = Math.sin(p.userData.angle) * currentR;
        p.position.y = pcbThickness / 2 + 0.08 + Math.sin(prog * Math.PI) * 0.15;
      });

      // Raycast hover check
      const { raycaster, mouse, camera: cam, interactiveObjects } = sceneState.current;
      raycaster.setFromCamera(mouse, cam);
      const intersects = raycaster.intersectObjects(interactiveObjects);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        canvasDom.style.cursor = 'pointer';

        if (hoveredChip?.id !== hit.userData.id) {
          sounds.playHover();
          setHoveredChip(hit.userData);
        }

        // Highlight hit object
        interactiveObjects.forEach((obj) => {
          if (obj === hit) {
            obj.material.emissive?.setHex(0x00e599);
            obj.material.emissiveIntensity = 0.6;
          } else {
            obj.material.emissive?.setHex(obj.userData.originalEmissive || 0x000000);
            obj.material.emissiveIntensity = 0.2;
          }
        });
      } else {
        canvasDom.style.cursor = 'default';
        if (hoveredChip) {
          setHoveredChip(null);
          interactiveObjects.forEach((obj) => {
            obj.material.emissive?.setHex(obj.userData.originalEmissive || 0x000000);
            obj.material.emissiveIntensity = 0.2;
          });
        }
      }

      // Smooth Camera Glide (Lerp) to selected chip
      if (sceneState.current.isLerpingCam && sceneState.current.targetCamPos) {
        camera.position.lerp(sceneState.current.targetCamPos, 0.06);
        controls.target.lerp(sceneState.current.targetLookAt, 0.06);

        if (camera.position.distanceTo(sceneState.current.targetCamPos) < 0.1) {
          sceneState.current.isLerpingCam = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
      sceneState.current.reqId = requestAnimationFrame(animate);
    };

    sceneState.current.reqId = requestAnimationFrame(animate);

    // 9. Resize Handling
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvasDom.removeEventListener('mousemove', handleMouseMove);
      canvasDom.removeEventListener('click', handleClick);
      if (sceneState.current.reqId) {
        cancelAnimationFrame(sceneState.current.reqId);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Camera presets
  const setCameraView = (mode) => {
    sounds.playRelay();
    setCameraMode(mode);
    const { camera, controls } = sceneState.current;
    if (!camera || !controls) return;

    if (mode === 'top') {
      sceneState.current.targetCamPos = new THREE.Vector3(0, 24, 0.01);
      sceneState.current.targetLookAt = new THREE.Vector3(0, 0, 0);
      sceneState.current.isLerpingCam = true;
    } else if (mode === 'iso') {
      sceneState.current.targetCamPos = new THREE.Vector3(0, 16, 17);
      sceneState.current.targetLookAt = new THREE.Vector3(0, 0, 0);
      sceneState.current.isLerpingCam = true;
    } else if (mode === 'macro') {
      sceneState.current.targetCamPos = new THREE.Vector3(0, 4.5, 4.5);
      sceneState.current.targetLookAt = new THREE.Vector3(0, 0, 0);
      sceneState.current.isLerpingCam = true;
    }
  };

  const toggleAutoRotate = () => {
    sounds.playRelay();
    const next = !isAutoRotating;
    setIsAutoRotating(next);
    if (sceneState.current.controls) {
      sceneState.current.controls.autoRotate = next;
      sceneState.current.controls.autoRotateSpeed = 1.4;
    }
  };

  const resetCamera = () => {
    sounds.playRelay();
    setCameraView('iso');
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none" style={{ height: 'calc(100vh - 65px)' }}>
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" style={{ width: '100%', height: '100%' }} />

      {/* Floating 3D Hover Tooltip HUD */}
      {hoveredChip && (
        <div
          className="absolute pointer-events-none transform -translate-x-1/2"
          style={{
            left: '50%',
            bottom: '85px',
            zIndex: 30
          }}
        >
          <div className="pcb-hover-badge animate-fade-in flex items-center gap-3 px-4 py-2.5 rounded-lg border border-emerald-500/50 bg-black/80 backdrop-blur-md shadow-2xl">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                <Cpu size={13} /> {hoveredChip.name}
              </div>
              <div className="text-sm font-semibold text-slate-100 font-mono">
                {hoveredChip.subtext}
              </div>
            </div>
            <div className="ml-3 pl-3 border-l border-emerald-500/30 text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
              [Click to Inspect]
            </div>
          </div>
        </div>
      )}

      {/* Interactive Controls Overlay Bar */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-slate-800/80 shadow-xl">
        <button
          onClick={() => setCameraView('iso')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            cameraMode === 'iso' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-300 hover:bg-slate-800'
          }`}
          title="Isometric View"
        >
          <Compass size={14} /> 3D Isometric
        </button>

        <button
          onClick={() => setCameraView('top')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            cameraMode === 'top' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-300 hover:bg-slate-800'
          }`}
          title="Top Down Schematic"
        >
          <Eye size={14} /> Top-Down
        </button>

        <button
          onClick={() => setCameraView('macro')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            cameraMode === 'macro' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-300 hover:bg-slate-800'
          }`}
          title="MCU Macro View"
        >
          <Cpu size={14} /> MCU Macro
        </button>

        <div className="w-[1px] h-4 bg-slate-800 mx-1" />

        <button
          onClick={toggleAutoRotate}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            isAutoRotating ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-slate-300 hover:bg-slate-800'
          }`}
          title="Toggle Auto Rotation"
        >
          <RotateCcw size={14} className={isAutoRotating ? 'animate-spin' : ''} /> {isAutoRotating ? 'Rotating' : 'Orbit'}
        </button>

        <button
          onClick={resetCamera}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          title="Reset Camera Position"
        >
          <Maximize2 size={14} /> Reset
        </button>
      </div>

      {/* PCB Quick Nav Chip Selector Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md p-1.5 rounded-xl border border-slate-800/80 shadow-2xl overflow-x-auto max-w-full">
          <span className="text-[11px] font-mono text-slate-400 px-2 flex items-center gap-1">
            <Zap size={13} className="text-amber-400" /> SELECT IC:
          </span>

          <button
            onClick={() => onSelectComponent({ id: 'chip-mcu' })}
            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-emerald-950/40 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all whitespace-nowrap"
          >
            STM32F407 Core
          </button>

          <button
            onClick={() => onSelectComponent({ id: 'proj-iomt-icu' })}
            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-cyan-950/40 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all whitespace-nowrap"
          >
            ESP32 IoMT ICU
          </button>

          <button
            onClick={() => onSelectComponent({ id: 'proj-ambulance-dcn' })}
            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-sky-950/40 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-all whitespace-nowrap"
          >
            DCN Smart Ambulance
          </button>

          <button
            onClick={() => onSelectComponent({ id: 'proj-edge-ai-vehicle' })}
            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-amber-950/40 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all whitespace-nowrap"
          >
            CAN Edge AI Vehicle
          </button>

          <button
            onClick={() => onSelectComponent({ id: 'proj-conveyor-ai' })}
            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-indigo-950/40 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all whitespace-nowrap"
          >
            MODBUS Conveyor AI
          </button>

          <button
            onClick={() => onSelectComponent({ id: 'chip-debug-lab' })}
            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all whitespace-nowrap"
          >
            SWD / Bring-Up Lab
          </button>
        </div>

        {/* Legend Hint */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
          <span>Left Click: Inspect IC | Right Drag: Pan | Scroll: Zoom</span>
        </div>
      </div>
    </div>
  );
}
