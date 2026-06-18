import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Badge from '../ui/Badge.jsx';
import Card from '../ui/Card.jsx';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import { Cpu, Network, Cloud, RotateCw, MousePointerClick } from 'lucide-react';

/* ─────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────── */
const STATIONS = [
  {
    id: 0,
    title: 'Edge AI Processing Engine',
    sublabel: '< 2ms latency · On-device inference · NVIDIA optimized',
    description:
      'Device-Nova runs a full AI inference stack — model serving, anomaly detection, and autonomous control logic — directly on your edge hardware. There is no network hop in the critical path. A fault detected at the sensor level is acted upon before the data leaves the device.',
    position: new THREE.Vector3(-3.5, 0, 0),
    cameraPos: new THREE.Vector3(-3.5 + 3.2 * Math.sin(0.6), 2.1, 3.2 * Math.cos(0.6)),
    cameraTarget: new THREE.Vector3(-3.5, 0.2, 0),
    tabLabel: 'Edge Node',
    icon: Cpu,
  },
  {
    id: 1,
    title: 'Distributed Intelligence Mesh',
    sublabel: 'Self-healing · Autonomous · Real-time coordination',
    description:
      'Multiple edge nodes form a coordinated intelligence mesh, sharing context and routing alerts without central orchestration. Each node operates independently but participates in a broader situational awareness layer that spans your entire device estate.',
    position: new THREE.Vector3(0, 0.5, 0),
    cameraPos: new THREE.Vector3(0 + 3.5 * Math.sin(0.3), 2.4, 3.5 * Math.cos(0.3)),
    cameraTarget: new THREE.Vector3(0, 0.5, 0),
    tabLabel: 'Mesh Network',
    icon: Network,
  },
  {
    id: 2,
    title: 'Why Cloud-Only Falls Short',
    sublabel: '80–400ms round trip · Connectivity dependent · Single point of failure',
    description:
      'Traditional IoT architectures route every inference decision through a remote data center, adding 80–400ms of overhead on every control cycle. In fast-moving industrial processes, that latency window is the difference between a caught fault and unplanned downtime — and it assumes the uplink is always available.',
    position: new THREE.Vector3(3.5, 0, 0),
    cameraPos: new THREE.Vector3(3.5 + 3.0 * Math.sin(-0.5), 1.9, 3.0 * Math.cos(-0.5)),
    cameraTarget: new THREE.Vector3(3.5, 0.1, 0),
    tabLabel: 'Cloud Limits',
    icon: Cloud,
  },
];

const OVERVIEW_CAM_POS = new THREE.Vector3(0, 3.2, 9.5);
const OVERVIEW_CAM_TARGET = new THREE.Vector3(0, 0.1, 0);
const IDLE_TIMEOUT_MS = 9000;

/* ─────────────────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────────────────── */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function createCircularSprite() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.3, 'rgba(0,217,255,0.6)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function createGridTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'transparent';
  ctx.clearRect(0, 0, size, size);
  ctx.strokeStyle = 'rgba(0,217,255,0.12)';
  ctx.lineWidth = 1;
  const step = 32;
  for (let x = 0; x <= size; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke();
  }
  for (let y = 0; y <= size; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  return tex;
}

/* ─────────────────────────────────────────────────────────
   STATION 1 — Edge Node
───────────────────────────────────────────────────────── */
function createEdgeNodeGroup() {
  const group = new THREE.Group();
  group.position.copy(STATIONS[0].position);

  const bodyGeo = new THREE.BoxGeometry(1.2, 0.8, 0.6);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x0d131c, roughness: 0.3, metalness: 0.7,
    emissive: 0x00d9ff, emissiveIntensity: 0.15,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(body);

  const ledGeo = new THREE.BoxGeometry(0.8, 0.05, 0.05);
  const ledMat = new THREE.MeshStandardMaterial({ emissive: 0x00d9ff, emissiveIntensity: 2.5, color: 0x00d9ff });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(0, 0.43, 0);
  group.add(led);

  for (let i = 0; i < 3; i++) {
    const ventGeo = new THREE.BoxGeometry(0.04, 0.3, 0.62);
    const ventMat = new THREE.MeshStandardMaterial({ color: 0x131b26, roughness: 0.9, metalness: 0.1 });
    const vent = new THREE.Mesh(ventGeo, ventMat);
    vent.position.set(-0.3 + i * 0.3, 0, 0);
    group.add(vent);
  }

  const ringGeo = new THREE.TorusGeometry(0.92, 0.022, 8, 64);
  const ringMat = new THREE.MeshStandardMaterial({ emissive: 0x00d9ff, emissiveIntensity: 1.6, color: 0x00d9ff });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI * 0.08;
  group.add(ring);

  const PARTICLE_COUNT = 40;
  const pGeo = new THREE.SphereGeometry(0.025, 4, 4);
  const pMat = new THREE.MeshStandardMaterial({ emissive: 0x00d9ff, emissiveIntensity: 2.0, color: 0x00d9ff });
  const particles = new THREE.InstancedMesh(pGeo, pMat, PARTICLE_COUNT);
  particles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const dummy = new THREE.Object3D();
  const pData = Array.from({ length: PARTICLE_COUNT }, () => ({
    theta: Math.random() * Math.PI * 2,
    phi: Math.random() * Math.PI,
    speed: 0.008 + Math.random() * 0.006,
    dist: Math.random() * 1.2,
    life: Math.random(),
  }));
  pData.forEach((p, i) => {
    const r = p.dist;
    dummy.position.set(r * Math.sin(p.phi) * Math.cos(p.theta), r * Math.cos(p.phi), r * Math.sin(p.phi) * Math.sin(p.theta));
    dummy.scale.setScalar(1 - p.dist * 0.5);
    dummy.updateMatrix();
    particles.setMatrixAt(i, dummy.matrix);
  });
  group.add(particles);

  const hoverRingGeo = new THREE.TorusGeometry(0.85, 0.03, 8, 48);
  const hoverRingMat = new THREE.MeshStandardMaterial({ emissive: 0x00d9ff, emissiveIntensity: 1.2, color: 0x00d9ff, transparent: true, opacity: 0 });
  const hoverRing = new THREE.Mesh(hoverRingGeo, hoverRingMat);
  hoverRing.rotation.x = -Math.PI / 2;
  hoverRing.position.y = -0.45;
  hoverRing.userData.targetOpacity = 0;
  hoverRing.userData.isHoverRing = true;
  group.add(hoverRing);

  // Generous invisible hitbox — larger than the visual body so the station is
  // easy to target on both desktop (precise cursor) and mobile (fat finger).
  const hitbox = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 2.0, 2.0),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  );
  hitbox.position.y = 0.15;
  hitbox.userData.isHitbox = true;
  group.add(hitbox);

  let time = 0;

  function update(delta) {
    time += delta;
    ring.rotation.y += 0.012;

    pData.forEach((p, i) => {
      p.dist += p.speed;
      p.life = p.dist / 2.2;
      if (p.dist > 2.2) {
        p.dist = 0.1 + Math.random() * 0.2;
        p.theta = Math.random() * Math.PI * 2;
        p.phi = Math.random() * Math.PI;
        p.speed = 0.008 + Math.random() * 0.006;
      }
      const r = p.dist;
      dummy.position.set(r * Math.sin(p.phi) * Math.cos(p.theta), r * Math.cos(p.phi), r * Math.sin(p.phi) * Math.sin(p.theta));
      const s = Math.max(0.02, (1 - p.life) * 0.8);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      particles.setMatrixAt(i, dummy.matrix);
    });
    particles.instanceMatrix.needsUpdate = true;

    hoverRing.material.opacity = (0.2 + 0.3 * Math.sin(time * 3)) * hoverRing.userData.targetOpacity;
  }

  return { group, update, bodyMat, ledMat, ringMat, hoverRingMat };
}

/* ─────────────────────────────────────────────────────────
   STATION 2 — Network Mesh
───────────────────────────────────────────────────────── */
function createNetworkMeshGroup() {
  const group = new THREE.Group();
  group.position.copy(STATIONS[1].position);

  const NODE_POSITIONS = [
    [0, 0, 0],
    [-0.9, 0.5, 0.3], [0.9, 0.4, -0.2], [0.0, 1.0, 0.5],
    [-0.6, -0.5, 0.7], [0.7, -0.4, 0.6], [-1.0, 0.1, -0.4],
    [0.3, 0.8, -0.8], [-0.3, -0.8, -0.5], [1.0, -0.2, -0.6],
  ];

  const nodeMeshes = [];
  const nodeGeo = new THREE.SphereGeometry(0.10, 16, 16);

  NODE_POSITIONS.forEach(([x, y, z], i) => {
    const isHub = i === 0;
    const mat = new THREE.MeshStandardMaterial({
      color: 0x00d9ff, emissive: 0x00d9ff,
      emissiveIntensity: isHub ? 1.4 : 0.7,
      roughness: 0.2, metalness: 0.5,
    });
    const mesh = new THREE.Mesh(isHub ? new THREE.SphereGeometry(0.20, 32, 32) : nodeGeo, mat);
    mesh.position.set(x, y, z);
    group.add(mesh);
    nodeMeshes.push(mesh);
  });

  const EDGES = [[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[2,9],[3,7],[4,5],[6,7],[8,4],[9,5]];
  const pulseMeshes = [];
  const edgeData = [];

  EDGES.forEach(([a, b]) => {
    const pA = new THREE.Vector3(...NODE_POSITIONS[a]);
    const pB = new THREE.Vector3(...NODE_POSITIONS[b]);
    const points = [pA, pB];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00d9ff, transparent: true, opacity: 0.3 });
    const line = new THREE.Line(lineGeo, lineMat);
    group.add(line);

    const pulseGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const pulseMat = new THREE.MeshStandardMaterial({ emissive: 0x00d9ff, emissiveIntensity: 3.0, color: 0x00d9ff });
    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    group.add(pulse);
    pulseMeshes.push(pulse);
    edgeData.push({ from: pA.clone(), to: pB.clone(), t: Math.random(), speed: 0.006 + Math.random() * 0.005 });
  });

  const hoverRingGeo = new THREE.TorusGeometry(0.95, 0.025, 8, 48);
  const hoverRingMat = new THREE.MeshStandardMaterial({ emissive: 0x00d9ff, emissiveIntensity: 1.2, color: 0x00d9ff, transparent: true, opacity: 0 });
  const hoverRing = new THREE.Mesh(hoverRingGeo, hoverRingMat);
  hoverRing.rotation.x = -Math.PI / 2;
  hoverRing.position.y = -1.0;
  hoverRing.userData.targetOpacity = 0;
  hoverRing.userData.isHoverRing = true;
  group.add(hoverRing);

  const hitbox = new THREE.Mesh(
    new THREE.SphereGeometry(1.7, 12, 12),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  );
  hitbox.position.y = 0.15;
  hitbox.userData.isHitbox = true;
  group.add(hitbox);

  let time = 0;

  function update(delta) {
    time += delta;
    group.rotation.y += 0.004;

    edgeData.forEach((ed, i) => {
      ed.t += ed.speed;
      if (ed.t > 1) ed.t = 0;
      pulseMeshes[i].position.lerpVectors(ed.from, ed.to, ed.t);
    });

    nodeMeshes.forEach((n, i) => {
      const phase = time * 1.5 + i * 0.7;
      n.material.emissiveIntensity = (i === 0 ? 1.0 : 0.5) + 0.3 * Math.sin(phase);
    });

    hoverRing.material.opacity = (0.2 + 0.3 * Math.sin(time * 3)) * hoverRing.userData.targetOpacity;
  }

  const nodeMat0 = nodeMeshes[0].material;
  return { group, update, nodeMat: nodeMat0, hoverRingMat };
}

/* ─────────────────────────────────────────────────────────
   STATION 3 — Cloud Server
───────────────────────────────────────────────────────── */
function createServerGroup() {
  const group = new THREE.Group();
  group.position.copy(STATIONS[2].position);

  const RACK_UNITS = 3;
  const rackMats = [];
  for (let i = 0; i < RACK_UNITS; i++) {
    const rackGeo = new THREE.BoxGeometry(1.0, 0.3, 0.6);
    const rackMat = new THREE.MeshStandardMaterial({
      color: 0x131b26, roughness: 0.65, metalness: 0.5,
      emissive: 0xff8a00, emissiveIntensity: 0.04,
    });
    rackMats.push(rackMat);
    const rack = new THREE.Mesh(rackGeo, rackMat);
    rack.position.y = (i - 1) * 0.34;
    group.add(rack);

    const ledGeo = new THREE.BoxGeometry(0.55, 0.04, 0.04);
    const ledMat = new THREE.MeshStandardMaterial({ emissive: 0xff8a00, emissiveIntensity: 0.9, color: 0xff8a00 });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(-0.05, (i - 1) * 0.34 + 0.17, 0);
    group.add(led);
  }

  const latencyGeo = new THREE.TorusGeometry(1.05, 0.025, 8, 64);
  const latencyMat = new THREE.MeshStandardMaterial({ emissive: 0xff8a00, emissiveIntensity: 0.65, color: 0xff8a00 });
  const latencyRing = new THREE.Mesh(latencyGeo, latencyMat);
  latencyRing.rotation.x = Math.PI * 0.12;
  group.add(latencyRing);

  const latencyGeo2 = new THREE.TorusGeometry(1.25, 0.015, 8, 64);
  const latencyMat2 = new THREE.MeshStandardMaterial({ emissive: 0xff8a00, emissiveIntensity: 0.25, color: 0xff8a00, transparent: true, opacity: 0.5 });
  const latencyRing2 = new THREE.Mesh(latencyGeo2, latencyMat2);
  latencyRing2.rotation.x = -Math.PI * 0.07;
  group.add(latencyRing2);

  const hoverRingGeo = new THREE.TorusGeometry(0.9, 0.025, 8, 48);
  const hoverRingMat = new THREE.MeshStandardMaterial({ emissive: 0xff8a00, emissiveIntensity: 1.0, color: 0xff8a00, transparent: true, opacity: 0 });
  const hoverRing = new THREE.Mesh(hoverRingGeo, hoverRingMat);
  hoverRing.rotation.x = -Math.PI / 2;
  hoverRing.position.y = -0.65;
  hoverRing.userData.targetOpacity = 0;
  hoverRing.userData.isHoverRing = true;
  group.add(hoverRing);

  const hitbox = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 2.0, 1.8),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  );
  hitbox.position.y = 0.05;
  hitbox.userData.isHitbox = true;
  group.add(hitbox);

  let time = 0;

  function update(delta) {
    time += delta;
    latencyRing.rotation.y += 0.007;
    latencyRing2.rotation.y -= 0.004;
    latencyRing2.rotation.z += 0.003;
    hoverRing.material.opacity = (0.2 + 0.3 * Math.sin(time * 3)) * hoverRing.userData.targetOpacity;
  }

  return { group, update, rackMats, latencyMat, hoverRingMat };
}

/* ─────────────────────────────────────────────────────────
   GROUND PLANE
───────────────────────────────────────────────────────── */
function createGroundPlane() {
  const geo = new THREE.PlaneGeometry(22, 22);
  const gridTex = createGridTexture();
  const mat = new THREE.MeshStandardMaterial({
    color: 0x0d131c, roughness: 0.85, metalness: 0.15,
    map: gridTex, transparent: true, opacity: 0.75,
  });
  const plane = new THREE.Mesh(geo, mat);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.55;
  return plane;
}

/* ─────────────────────────────────────────────────────────
   AMBIENT PARTICLES
───────────────────────────────────────────────────────── */
function createParticleField(count = 300) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const sprite = createCircularSprite();
  const mat = new THREE.PointsMaterial({ size: 0.045, map: sprite, transparent: true, depthWrite: false, sizeAttenuation: true, opacity: 0.65 });
  const points = new THREE.Points(geo, mat);

  function update() {
    const pos = geo.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.002;
      if (pos[i * 3 + 1] > 4.5) {
        pos[i * 3 + 1] = -4.5;
        pos[i * 3] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
    }
    geo.attributes.position.needsUpdate = true;
  }

  return { points, update };
}

/* ─────────────────────────────────────────────────────────
   MAIN THREE.JS HOOK
───────────────────────────────────────────────────────── */
function useThreeScene(canvasRef, containerRef, onFirstInteract) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const selectedIdxRef = useRef(null);
  const stateRef = useRef(null);
  const onFirstInteractRef = useRef(onFirstInteract);
  onFirstInteractRef.current = onFirstInteract;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let gl;
    try {
      gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) throw new Error('no webgl');
    } catch {
      return;
    }

    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, context: gl });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const W = container.clientWidth;
    const H = container.clientHeight;
    renderer.setSize(W, H, false);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060a10);

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.copy(OVERVIEW_CAM_POS);
    camera.lookAt(OVERVIEW_CAM_TARGET);

    // OrbitControls — active immediately so the scene feels alive and
    // explorable from the very first frame, with no forced camera moves.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.55;
    controls.enablePan = false;
    controls.enableZoom = false; // preserve the intended framing/presentation
    controls.maxPolarAngle = Math.PI / 1.95; // generous vertical range, no flip past horizon
    controls.minPolarAngle = 0.35;
    controls.target.copy(OVERVIEW_CAM_TARGET);
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.5;
    controls.update();

    const ambient = new THREE.AmbientLight(0x060a10, 0.4);
    scene.add(ambient);
    const cyanKey = new THREE.PointLight(0x00d9ff, 14, 16);
    cyanKey.position.set(-2, 3, 2);
    scene.add(cyanKey);
    const fill = new THREE.PointLight(0x0099cc, 7, 13);
    fill.position.set(3, 1, -2);
    scene.add(fill);
    const amberAccent = new THREE.PointLight(0xff8a00, 5, 11);
    amberAccent.position.set(5, 2, 1);
    scene.add(amberAccent);

    const s1 = createEdgeNodeGroup();
    const s2 = createNetworkMeshGroup();
    const s3 = createServerGroup();
    scene.add(s1.group, s2.group, s3.group);

    const stationObjects = [s1, s2, s3];
    stationObjects.forEach((s, idx) => {
      s.group.userData.stationIdx = idx;
      s.group.children.forEach(c => { c.userData.stationIdx = idx; });
    });

    scene.add(createGroundPlane());
    const particleCount = isMobile ? 80 : 300;
    const pf = createParticleField(particleCount);
    scene.add(pf.points);

    let composer = null;
    if (!isMobile) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.88, 0.45, 0.18);
      composer.addPass(bloom);
    }

    // Camera transition state — only ever triggered by explicit user action
    // (clicking a station or a tab button), never automatically.
    const camState = {
      fromPos: camera.position.clone(),
      fromTarget: controls.target.clone(),
      toPos: camera.position.clone(),
      toTarget: controls.target.clone(),
      currentTarget: controls.target.clone(),
      progress: 1,
      transitioning: false,
    };

    function focusStation(idx) {
      const st = STATIONS[idx];
      camState.fromPos.copy(camera.position);
      camState.fromTarget.copy(controls.target);
      camState.toPos.copy(st.cameraPos);
      camState.toTarget.copy(st.cameraTarget);
      camState.progress = 0;
      camState.transitioning = true;
      controls.enabled = false;
      controls.autoRotate = false;
      selectedIdxRef.current = idx;
      setSelectedIdx(idx);
      lastInteraction = performance.now();

      stationObjects.forEach((s, i) => {
        if (s.bodyMat) s.bodyMat.emissiveIntensity = i === idx ? 0.4 : 0.12;
        if (s.ringMat) s.ringMat.emissiveIntensity = i === idx ? 2.5 : 1.4;
        if (s.ledMat) s.ledMat.emissiveIntensity = i === idx ? 3.5 : 2.2;
        if (s.nodeMat) s.nodeMat.emissiveIntensity = i === idx ? 2.0 : 1.2;
        if (s.latencyMat) s.latencyMat.emissiveIntensity = i === idx ? 1.2 : 0.55;
      });
    }

    // Raycasting — test hitboxes only. Hitboxes are deliberately oversized,
    // which makes targeting reliable on both mouse and touch without the
    // visual geometry itself needing to grow.
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredIdx = null;

    function getStationIdxFromEvent(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const targets = stationObjects.map(s =>
        s.group.children.find(c => c.userData.isHitbox)
      ).filter(Boolean);
      const hits = raycaster.intersectObjects(targets, false);
      if (hits.length > 0) {
        return hits[0].object.userData.stationIdx ?? null;
      }
      return null;
    }

    function setHoverRingTargets(idx) {
      stationObjects.forEach((s, i) => {
        const hoverMesh = s.group.children.find(c => c.userData.isHoverRing);
        if (hoverMesh) hoverMesh.userData.targetOpacity = i === idx ? 1 : 0;
      });
    }

    let lastInteraction = performance.now();
    let userHasInteracted = false;
    const pointerDownPos = new THREE.Vector2();
    let isPointerDown = false;

    function markInteracted() {
      lastInteraction = performance.now();
      if (!userHasInteracted) {
        userHasInteracted = true;
        if (onFirstInteractRef.current) onFirstInteractRef.current();
      }
    }

    function onPointerDown(e) {
      isPointerDown = true;
      pointerDownPos.set(e.clientX, e.clientY);
      markInteracted();
      controls.autoRotate = false;
    }

    function onPointerUp(e) {
      isPointerDown = false;
      const dx = e.clientX - pointerDownPos.x;
      const dy = e.clientY - pointerDownPos.y;
      // Only treat as a "click" (vs. a drag-to-orbit) if the pointer barely moved.
      if (Math.sqrt(dx * dx + dy * dy) < 6) {
        const idx = getStationIdxFromEvent(e);
        if (idx !== null) {
          markInteracted();
          focusStation(idx);
        }
      }
    }

    function onPointerMove(e) {
      if (isPointerDown) return; // don't fight the drag/orbit gesture
      const idx = getStationIdxFromEvent(e);
      hoveredIdx = idx;
      canvas.style.cursor = idx !== null ? 'pointer' : 'grab';
      setHoverRingTargets(idx);
    }

    function onPointerLeave() {
      hoveredIdx = null;
      setHoverRingTargets(null);
      canvas.style.cursor = 'grab';
    }

    canvas.style.cursor = 'grab';
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    controls.addEventListener('start', markInteracted);

    const ro = new ResizeObserver(() => {
      const nW = container.clientWidth;
      const nH = container.clientHeight;
      renderer.setSize(nW, nH, false);
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      if (composer) composer.setSize(nW, nH);
    });
    ro.observe(container);

    const isPausedRef = { current: false };
    const io = new IntersectionObserver(([entry]) => {
      isPausedRef.current = entry.intersectionRatio < 0.1;
    }, { threshold: 0.1 });
    io.observe(container);

    // NOTE: No auto-focus timer and no forced camera move on mount.
    // The scene loads straight into a calm overview shot and waits for
    // the visitor to actually engage with it.

    let rafId;
    let lastTime = performance.now();

    function render() {
      rafId = requestAnimationFrame(render);
      if (isPausedRef.current) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (camState.transitioning) {
        camState.progress = Math.min(camState.progress + delta / 1.2, 1);
        const e = easeInOutCubic(camState.progress);
        camera.position.lerpVectors(camState.fromPos, camState.toPos, e);
        camState.currentTarget.lerpVectors(camState.fromTarget, camState.toTarget, e);
        controls.target.copy(camState.currentTarget);
        controls.update();
        if (camState.progress >= 1) {
          camState.transitioning = false;
          controls.enabled = true;
        }
      } else if (controls.enabled) {
        const idleElapsed = now - lastInteraction;
        const shouldIdleSpin = idleElapsed > IDLE_TIMEOUT_MS;
        if (shouldIdleSpin !== controls.autoRotate) controls.autoRotate = shouldIdleSpin;
        controls.update();
      }

      stationObjects.forEach((s, i) => {
        const targetScale = i === hoveredIdx ? 1.08 : 1.0;
        s.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
      });

      s1.update(delta);
      s2.update(delta);
      s3.update(delta);
      pf.update();

      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    }
    render();

    stateRef.current = { focusStation };

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      controls.removeEventListener('start', markInteracted);
      controls.dispose();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);

      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const focusStation = useCallback((idx) => {
    if (stateRef.current) stateRef.current.focusStation(idx);
    setSelectedIdx(idx);
    selectedIdxRef.current = idx;
  }, []);

  return { selectedIdx, focusStation };
}

/* ─────────────────────────────────────────────────────────
   STATIC FALLBACK (reduced motion / no WebGL)
───────────────────────────────────────────────────────── */
function StaticFallback() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
      {STATIONS.map((st, i) => {
        const Icon = st.icon;
        const isCloud = i === 2;
        return (
          <Card key={st.id} interactive className={isCloud ? 'opacity-80' : ''}>
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center border mb-4 ${isCloud ? 'bg-amber/10 border-amber/25' : 'bg-cyan/10 border-cyan/25 shadow-glow-cyan'}`}>
              <Icon size={22} className={isCloud ? 'text-amber' : 'text-cyan'} aria-hidden="true" />
            </div>
            <h3 className="font-display text-lg font-semibold text-primary mb-2">{st.title}</h3>
            <p className="font-mono text-[0.65rem] tracking-widest2 text-cyan mb-3 uppercase">{st.sublabel}</p>
            <p className="text-muted text-sm leading-relaxed">{st.description}</p>
          </Card>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
export default function HowItWorks() {
  const reducedMotion = usePrefersReducedMotion();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [showOnboardHint, setShowOnboardHint] = useState(true);

  useEffect(() => {
    const testCanvas = document.createElement('canvas');
    const ctx = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!ctx) setWebglAvailable(false);
  }, []);

  const handleFirstInteract = useCallback(() => {
    setShowOnboardHint(false);
  }, []);

  const { selectedIdx, focusStation } = useThreeScene(
    reducedMotion || !webglAvailable ? { current: null } : canvasRef,
    reducedMotion || !webglAvailable ? { current: null } : containerRef,
    handleFirstInteract
  );

  const handleTabClick = (i) => {
    setShowOnboardHint(false);
    focusStation(i);
  };

  const activeStation = selectedIdx !== null ? STATIONS[selectedIdx] : null;
  const use3D = !reducedMotion && webglAvailable;

  return (
    <section id="how-it-works" className="bg-void section-pad relative overflow-hidden">
      {/* Section header */}
      <div className="container-base mb-8 sm:mb-10">
        <Badge tone="cyan" className="mb-4 sm:mb-5">How Edge AI Works</Badge>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-primary leading-tight max-w-2xl">
          AI inference at the source, not the cloud
        </h2>
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-xl">
          Explore the three layers of Device-Nova's edge intelligence architecture.
          {use3D && ' Drag to rotate, or click a station to inspect it.'}
        </p>
      </div>

      {use3D ? (
        <>
          {/* 3D Visualization — fully unobstructed, nothing overlaid on top */}
          <div
            ref={containerRef}
            className="relative w-full select-none"
            style={{ height: 'clamp(340px, 48vw, 600px)' }}
            aria-label="Interactive 3D visualization of Edge AI architecture. Drag to orbit. Use the buttons below to explore each layer."
            role="img"
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full block"
              aria-hidden="true"
            />

            {/* Onboarding hint — bottom-right, unobtrusive, fades on first interaction */}
            <div
              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 pointer-events-none"
              style={{
                opacity: showOnboardHint ? 1 : 0,
                transform: showOnboardHint ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
              aria-hidden="true"
            >
              <div className="flex items-center gap-2 rounded-full border border-cyan/25 bg-void/60 backdrop-blur-md pl-2.5 pr-3.5 py-2 shadow-glow-cyan/40">
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-cyan/10">
                  <RotateCw size={12} className="text-cyan animate-spin" style={{ animationDuration: '3s' }} />
                </span>
                <span className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-widest2 uppercase text-cyan/80 whitespace-nowrap">
                  Drag to rotate
                </span>
              </div>
            </div>
          </div>

          {/* Station buttons — immediately beneath the scene, before the description */}
          <div className="container-base mt-5 sm:mt-6">
            <div
              className="flex flex-wrap items-center gap-2 sm:gap-3"
              role="tablist"
              aria-label="Architecture layers"
            >
              {STATIONS.map((st, i) => {
                const Icon = st.icon;
                const isActive = selectedIdx === i;
                const isCloud = i === 2;
                return (
                  <button
                    key={st.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-pressed={isActive}
                    onClick={() => handleTabClick(i)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 sm:py-3 font-mono text-[0.65rem] sm:text-xs tracking-widest2 uppercase border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void
                      ${isActive
                        ? isCloud
                          ? 'bg-amber/10 border-amber/45 text-amber shadow-glow-amber'
                          : 'bg-cyan/10 border-cyan/45 text-cyan shadow-glow-cyan'
                        : 'bg-surface-raised border-border text-muted hover:border-hover hover:text-primary hover:-translate-y-0.5'
                      }`}
                  >
                    <Icon size={14} aria-hidden="true" />
                    {st.tabLabel}
                  </button>
                );
              })}

              {!activeStation && (
                <span className="flex items-center gap-1.5 font-mono text-[0.6rem] sm:text-[0.65rem] text-muted/70 tracking-wide ml-1">
                  <MousePointerClick size={13} aria-hidden="true" />
                  Pick a layer to inspect
                </span>
              )}
            </div>
          </div>

          {/* Detailed information card — below the buttons, never over the scene */}
          <div className="container-base mt-4 sm:mt-5">
            <div
              style={{
                opacity: activeStation ? 1 : 0,
                maxHeight: activeStation ? 600 : 0,
                transform: activeStation ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.35s ease-out, transform 0.35s ease-out, max-height 0.35s ease-out',
                overflow: 'hidden',
              }}
            >
              {activeStation && (
                <div className="rounded-2xl border border-border bg-surface-raised/70 backdrop-blur-xl p-4 sm:p-5 md:p-6">
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-primary leading-snug">
                    {activeStation.title}
                  </h3>
                  <p className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-widest2 uppercase text-cyan mt-1.5">
                    {activeStation.sublabel}
                  </p>
                  <p className="text-muted text-sm leading-relaxed mt-3 max-w-3xl">
                    {activeStation.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="container-base"><StaticFallback /></div>
      )}
    </section>
  );
}
