// import { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { Cpu, Cloud, Zap, ArrowRight, RefreshCw, Globe } from 'lucide-react';
// import Badge from '../ui/Badge.jsx';

// /* ------------------------------------------------------------------ */
// /* Sub-components                                                        */
// /* ------------------------------------------------------------------ */

// function FlowNode({ icon: Icon, label, sublabel, accent = false, delay = 0, inView }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.85 }}
//       animate={inView ? { opacity: 1, scale: 1 } : {}}
//       transition={{ duration: 0.5, ease: 'easeOut', delay }}
//       className="flex flex-col items-center gap-2 text-center"
//     >
//       <div
//         className={`h-16 w-16 rounded-2xl flex items-center justify-center border transition-all duration-300
//           ${accent
//             ? 'bg-cyan/10 border-cyan/40 shadow-glow-cyan'
//             : 'bg-surface-raised border-border'
//           }`}
//       >
//         <Icon size={26} className={accent ? 'text-cyan' : 'text-muted'} aria-hidden="true" />
//       </div>
//       <span className="font-display text-sm font-semibold text-primary">{label}</span>
//       {sublabel && <span className="font-mono text-[0.65rem] text-muted tracking-widest2">{sublabel}</span>}
//     </motion.div>
//   );
// }

// function AnimatedConnector({ delay, inView, dashed = false }) {
//   return (
//     <motion.div
//       className="flex-1 flex items-center justify-center px-2 min-w-[32px]"
//       initial={{ opacity: 0 }}
//       animate={inView ? { opacity: 1 } : {}}
//       transition={{ delay, duration: 0.4 }}
//     >
//       <svg width="100%" height="24" viewBox="0 0 80 24" fill="none" aria-hidden="true">
//         <line
//           x1="0" y1="12" x2="68" y2="12"
//           stroke={dashed ? 'var(--fg-muted)' : 'var(--accent-cyan)'}
//           strokeWidth="1.5"
//           strokeDasharray={dashed ? '5 4' : '0'}
//           className={!dashed ? 'animate-dash-flow' : ''}
//           strokeDashoffset="0"
//         />
//         <polygon points="68,7 80,12 68,17" fill={dashed ? 'var(--fg-muted)' : 'var(--accent-cyan)'} />
//       </svg>
//     </motion.div>
//   );
// }

// function LatencyPill({ label, value, tone, delay, inView }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ delay, duration: 0.5, ease: 'easeOut' }}
//       className="flex items-center gap-3 rounded-xl border border-border bg-surface-raised px-5 py-3"
//     >
//       <span className="font-mono text-xs text-muted tracking-widest2 uppercase">{label}</span>
//       <span
//         className={`font-display text-2xl font-bold ${tone === 'bad' ? 'text-amber' : 'text-cyan'}`}
//       >
//         {value}
//       </span>
//     </motion.div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Main section                                                          */
// /* ------------------------------------------------------------------ */

// export default function HowItWorks() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, amount: 0.25 });

//   return (
//     <section id="how-it-works" className="bg-void section-pad" ref={ref}>
//       <div className="container-base">
//         <div className="mb-14 max-w-2xl">
//           <Badge tone="cyan" className="mb-5">
//             How Edge AI Works
//           </Badge>
//           <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary leading-tight">
//             AI inference at the source, not the cloud
//           </h2>
//           <p className="mt-5 text-lg text-muted leading-relaxed">
//             Device-Nova moves the inference step from your data center to the device itself.
//             The latency difference is not incremental — it is architectural.
//           </p>
//         </div>

//         {/* ---- EDGE AI (NEW) PATH ---- */}
//         <div className="mb-10">
//           <p className="font-mono text-xs tracking-widest2 uppercase text-cyan mb-6">
//             With Device-Nova
//           </p>
//           <div
//             className="flex items-center gap-0 rounded-2xl border border-cyan/20 bg-surface p-6 md:p-8 overflow-x-auto"
//             role="img"
//             aria-label="Edge AI flow: Sensor feeds Device-Nova Edge AI which delivers instant decision in under 2ms"
//           >
//             <FlowNode icon={Cpu} label="Sensor / PLC" sublabel="Raw signal" delay={0} inView={inView} />
//             <AnimatedConnector delay={0.2} inView={inView} />
//             <FlowNode icon={Zap} label="Device-Nova Edge AI" sublabel="On-device inference" accent delay={0.3} inView={inView} />
//             <AnimatedConnector delay={0.5} inView={inView} />
//             <FlowNode icon={Zap} label="Instant Decision" sublabel="Autonomous action" accent delay={0.6} inView={inView} />
//           </div>
//           <div className="flex justify-start mt-4">
//             <LatencyPill label="Decision latency" value="< 2 ms" tone="good" delay={0.7} inView={inView} />
//           </div>
//         </div>

//         {/* ---- CLOUD-ONLY (OLD) PATH ---- */}
//         <div>
//           <p className="font-mono text-xs tracking-widest2 uppercase text-muted mb-6">
//             Traditional cloud-dependent architecture
//           </p>
//           <div
//             className="flex items-center gap-0 rounded-2xl border border-border bg-surface-raised p-6 md:p-8 overflow-x-auto opacity-70"
//             role="img"
//             aria-label="Cloud IoT flow: Sensor sends to internet then cloud AI then round-trip back to device taking 80 to 400ms"
//           >
//             <FlowNode icon={Cpu} label="Sensor / PLC" sublabel="Raw signal" delay={0.1} inView={inView} />
//             <AnimatedConnector delay={0.2} inView={inView} dashed />
//             <FlowNode icon={Globe} label="Internet" sublabel="WAN hop" delay={0.3} inView={inView} />
//             <AnimatedConnector delay={0.4} inView={inView} dashed />
//             <FlowNode icon={Cloud} label="Cloud AI" sublabel="Remote inference" delay={0.5} inView={inView} />
//             <AnimatedConnector delay={0.6} inView={inView} dashed />
//             <FlowNode icon={RefreshCw} label="Round Trip" sublabel="Back to device" delay={0.7} inView={inView} />
//           </div>
//           <div className="flex justify-start mt-4">
//             <LatencyPill label="Decision latency" value="80–400 ms" tone="bad" delay={0.8} inView={inView} />
//           </div>
//         </div>

//         {/* Callout */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.9, duration: 0.6 }}
//           className="mt-14 rounded-2xl border border-cyan/20 bg-cyan/5 px-8 py-6 flex flex-col md:flex-row items-start md:items-center gap-4"
//         >
//           <ArrowRight size={22} className="text-cyan flex-shrink-0" aria-hidden="true" />
//           <p className="text-primary leading-relaxed">
//             Device-Nova runs a full AI inference stack — model serving, data normalization,
//             anomaly detection — directly on resource-constrained edge hardware without modifying
//             existing PLC or SCADA configurations.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import Badge from '../ui/Badge.jsx';
import Card from '../ui/Card.jsx';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import { Cpu, Network, Cloud } from 'lucide-react';

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

const OVERVIEW_CAM_POS = new THREE.Vector3(0, 3.5, 8.5);
const OVERVIEW_CAM_TARGET = new THREE.Vector3(0, 0, 0);
const IDLE_TIMEOUT_MS = 8000;

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

  // Main body
  const bodyGeo = new THREE.BoxGeometry(1.2, 0.8, 0.6);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x0d131c, roughness: 0.3, metalness: 0.7,
    emissive: 0x00d9ff, emissiveIntensity: 0.15,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(body);

  // LED strip on top
  const ledGeo = new THREE.BoxGeometry(0.8, 0.05, 0.05);
  const ledMat = new THREE.MeshStandardMaterial({ emissive: 0x00d9ff, emissiveIntensity: 2.5, color: 0x00d9ff });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(0, 0.43, 0);
  group.add(led);

  // Side vent lines
  for (let i = 0; i < 3; i++) {
    const ventGeo = new THREE.BoxGeometry(0.04, 0.3, 0.62);
    const ventMat = new THREE.MeshStandardMaterial({ color: 0x131b26, roughness: 0.9, metalness: 0.1 });
    const vent = new THREE.Mesh(ventGeo, ventMat);
    vent.position.set(-0.3 + i * 0.3, 0, 0);
    group.add(vent);
  }

  // Orbit ring
  const ringGeo = new THREE.TorusGeometry(0.92, 0.022, 8, 64);
  const ringMat = new THREE.MeshStandardMaterial({ emissive: 0x00d9ff, emissiveIntensity: 1.6, color: 0x00d9ff });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI * 0.08;
  group.add(ring);

  // Particle emitter — InstancedMesh of 40 tiny spheres
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

  // Hover ring beneath (flat torus on ground plane)
  const hoverRingGeo = new THREE.TorusGeometry(0.85, 0.03, 8, 48);
  const hoverRingMat = new THREE.MeshStandardMaterial({ emissive: 0x00d9ff, emissiveIntensity: 1.2, color: 0x00d9ff, transparent: true, opacity: 0 });
  const hoverRing = new THREE.Mesh(hoverRingGeo, hoverRingMat);
  hoverRing.rotation.x = -Math.PI / 2;
  hoverRing.position.y = -0.45;
  group.add(hoverRing);

  let time = 0;

  function update(delta) {
    time += delta;
    ring.rotation.y += 0.012;

    // animate particles
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

    // pulse hover ring
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

  // Edges between nodes
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

    // Traveling pulse dot
    const pulseGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const pulseMat = new THREE.MeshStandardMaterial({ emissive: 0x00d9ff, emissiveIntensity: 3.0, color: 0x00d9ff });
    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    group.add(pulse);
    pulseMeshes.push(pulse);
    edgeData.push({ from: pA.clone(), to: pB.clone(), t: Math.random(), speed: 0.006 + Math.random() * 0.005 });
  });

  // Hover ring
  const hoverRingGeo = new THREE.TorusGeometry(0.95, 0.025, 8, 48);
  const hoverRingMat = new THREE.MeshStandardMaterial({ emissive: 0x00d9ff, emissiveIntensity: 1.2, color: 0x00d9ff, transparent: true, opacity: 0 });
  const hoverRing = new THREE.Mesh(hoverRingGeo, hoverRingMat);
  hoverRing.rotation.x = -Math.PI / 2;
  hoverRing.position.y = -1.0;
  group.add(hoverRing);

  let time = 0;

  function update(delta) {
    time += delta;
    group.rotation.y += 0.004;

    // animate pulse dots
    edgeData.forEach((ed, i) => {
      ed.t += ed.speed;
      if (ed.t > 1) ed.t = 0;
      pulseMeshes[i].position.lerpVectors(ed.from, ed.to, ed.t);
    });

    // pulse node emissive
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

    // LED strip per rack
    const ledGeo = new THREE.BoxGeometry(0.55, 0.04, 0.04);
    const ledMat = new THREE.MeshStandardMaterial({ emissive: 0xff8a00, emissiveIntensity: 0.9, color: 0xff8a00 });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(-0.05, (i - 1) * 0.34 + 0.17, 0);
    group.add(led);
  }

  // Latency / spinner ring
  const latencyGeo = new THREE.TorusGeometry(1.05, 0.025, 8, 64);
  const latencyMat = new THREE.MeshStandardMaterial({ emissive: 0xff8a00, emissiveIntensity: 0.65, color: 0xff8a00 });
  const latencyRing = new THREE.Mesh(latencyGeo, latencyMat);
  latencyRing.rotation.x = Math.PI * 0.12;
  group.add(latencyRing);

  // Second ring offset for depth
  const latencyGeo2 = new THREE.TorusGeometry(1.25, 0.015, 8, 64);
  const latencyMat2 = new THREE.MeshStandardMaterial({ emissive: 0xff8a00, emissiveIntensity: 0.25, color: 0xff8a00, transparent: true, opacity: 0.5 });
  const latencyRing2 = new THREE.Mesh(latencyGeo2, latencyMat2);
  latencyRing2.rotation.x = -Math.PI * 0.07;
  group.add(latencyRing2);

  // Hover ring
  const hoverRingGeo = new THREE.TorusGeometry(0.9, 0.025, 8, 48);
  const hoverRingMat = new THREE.MeshStandardMaterial({ emissive: 0xff8a00, emissiveIntensity: 1.0, color: 0xff8a00, transparent: true, opacity: 0 });
  const hoverRing = new THREE.Mesh(hoverRingGeo, hoverRingMat);
  hoverRing.rotation.x = -Math.PI / 2;
  hoverRing.position.y = -0.65;
  group.add(hoverRing);

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
function useThreeScene(canvasRef, containerRef) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const selectedIdxRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // WebGL check
    let gl;
    try {
      gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) throw new Error('no webgl');
    } catch {
      return;
    }

    const isMobile = window.innerWidth < 768;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, context: gl });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const W = container.clientWidth;
    const H = container.clientHeight;
    renderer.setSize(W, H, false);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060a10);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.copy(OVERVIEW_CAM_POS);
    camera.lookAt(OVERVIEW_CAM_TARGET);

    // Lights
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

    // Stations
    const s1 = createEdgeNodeGroup();
    const s2 = createNetworkMeshGroup();
    const s3 = createServerGroup();
    scene.add(s1.group, s2.group, s3.group);

    const stationObjects = [s1, s2, s3];
    stationObjects.forEach(s => {
      s.group.userData.stationIdx = stationObjects.indexOf(s);
      s.group.children.forEach(c => { c.userData.stationIdx = stationObjects.indexOf(s); });
    });

    // Ground + particles
    scene.add(createGroundPlane());
    const particleCount = isMobile ? 80 : 300;
    const pf = createParticleField(particleCount);
    scene.add(pf.points);

    // Post-processing
    let composer = null;
    if (!isMobile) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.88, 0.45, 0.18);
      composer.addPass(bloom);
    }

    // Camera lerp state
    const camState = {
      fromPos: OVERVIEW_CAM_POS.clone(),
      fromTarget: OVERVIEW_CAM_TARGET.clone(),
      toPos: OVERVIEW_CAM_POS.clone(),
      toTarget: OVERVIEW_CAM_TARGET.clone(),
      currentTarget: OVERVIEW_CAM_TARGET.clone(),
      progress: 1,
      transitioning: false,
    };

    function focusStation(idx) {
      const st = STATIONS[idx];
      camState.fromPos.copy(camera.position);
      camState.fromTarget.copy(camState.currentTarget);
      camState.toPos.copy(st.cameraPos);
      camState.toTarget.copy(st.cameraTarget);
      camState.progress = 0;
      camState.transitioning = true;
      selectedIdxRef.current = idx;
      setSelectedIdx(idx);

      // Set emissive states
      stationObjects.forEach((s, i) => {
        if (s.bodyMat) s.bodyMat.emissiveIntensity = i === idx ? 0.4 : 0.12;
        if (s.ringMat) s.ringMat.emissiveIntensity = i === idx ? 2.5 : 1.4;
        if (s.ledMat) s.ledMat.emissiveIntensity = i === idx ? 3.5 : 2.2;
        if (s.nodeMat) s.nodeMat.emissiveIntensity = i === idx ? 2.0 : 1.2;
        if (s.latencyMat) s.latencyMat.emissiveIntensity = i === idx ? 1.2 : 0.55;
      });
    }

    // Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredIdx = null;

    function getStationIdxFromEvent(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const targets = stationObjects.map(s => s.group);
      const hits = raycaster.intersectObjects(targets, true);
      if (hits.length > 0) {
        const obj = hits[0].object;
        return obj.userData.stationIdx ?? obj.parent?.userData.stationIdx ?? null;
      }
      return null;
    }

    // Idle auto-rotate
    let lastInteraction = performance.now();
    let idleAngle = 0;

    function onMouseMove(e) {
      const idx = getStationIdxFromEvent(e);
      hoveredIdx = idx;
      canvas.style.cursor = idx !== null ? 'pointer' : 'default';
      stationObjects.forEach((s, i) => {
        s.group.children.forEach(c => {
          if (c.userData && c.userData.targetOpacity !== undefined) return;
        });
        if (s.hoverRingMat) {
          s.hoverRingMat.userData = s.hoverRingMat.userData || {};
          // stored on the mesh directly
        }
        // target opacity on hover ring mesh
        const hoverMesh = s.group.children.find(c => c.geometry && c.geometry.type === 'TorusGeometry' && c.position.y < -0.3);
        if (hoverMesh) hoverMesh.userData.targetOpacity = i === idx ? 1 : 0;
      });
    }

    function onClick(e) {
      const idx = getStationIdxFromEvent(e);
      if (idx !== null) {
        lastInteraction = performance.now();
        focusStation(idx);
      }
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);

    // Resize
    const ro = new ResizeObserver(() => {
      const nW = container.clientWidth;
      const nH = container.clientHeight;
      renderer.setSize(nW, nH, false);
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      if (composer) composer.setSize(nW, nH);
    });
    ro.observe(container);

    // Intersection observer — pause when off-screen
    const isPausedRef = { current: false };
    const io = new IntersectionObserver(([entry]) => {
      isPausedRef.current = entry.intersectionRatio < 0.1;
    }, { threshold: 0.1 });
    io.observe(container);

    // Initial auto-focus after 1.5s
    const autoFocusTimer = setTimeout(() => focusStation(0), 1500);

    // Render loop
    let rafId;
    let lastTime = performance.now();

    function render() {
      rafId = requestAnimationFrame(render);
      if (isPausedRef.current) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Camera lerp
      if (camState.transitioning) {
        camState.progress = Math.min(camState.progress + delta / 1.2, 1);
        const e = easeInOutCubic(camState.progress);
        camera.position.lerpVectors(camState.fromPos, camState.toPos, e);
        camState.currentTarget.lerpVectors(camState.fromTarget, camState.toTarget, e);
        camera.lookAt(camState.currentTarget);
        if (camState.progress >= 1) camState.transitioning = false;
      }

      // Idle rotation
      const idleElapsed = now - lastInteraction;
      if (idleElapsed > IDLE_TIMEOUT_MS && !camState.transitioning) {
        idleAngle += 0.003;
        camera.position.x = Math.sin(idleAngle) * 8.5;
        camera.position.z = Math.cos(idleAngle) * 8.5;
        camera.lookAt(OVERVIEW_CAM_TARGET);
      }

      // Scale lerp for hover
      stationObjects.forEach((s, i) => {
        const targetScale = i === hoveredIdx ? 1.07 : 1.0;
        s.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      // Update station animations
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
      clearTimeout(autoFocusTimer);
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onClick);

      // Dispose
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
  const [showHint, setShowHint] = useState(true);
  const [webglAvailable, setWebglAvailable] = useState(true);

  // Check WebGL early
  useEffect(() => {
    const testCanvas = document.createElement('canvas');
    const ctx = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!ctx) setWebglAvailable(false);
    setTimeout(() => setShowHint(false), 3500);
  }, []);

  const { selectedIdx, focusStation } = useThreeScene(
    reducedMotion || !webglAvailable ? { current: null } : canvasRef,
    reducedMotion || !webglAvailable ? { current: null } : containerRef
  );

  const activeStation = selectedIdx !== null ? STATIONS[selectedIdx] : null;

  return (
    <section id="how-it-works" className="bg-void section-pad relative overflow-hidden">
      {/* Section header */}
      <div className="container-base mb-10">
        <Badge tone="cyan" className="mb-5">How Edge AI Works</Badge>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary leading-tight max-w-2xl">
          AI inference at the source, not the cloud
        </h2>
        <p className="mt-5 text-lg text-muted leading-relaxed max-w-xl">
          Explore the three layers of Device-Nova's edge intelligence architecture.
          {!reducedMotion && webglAvailable && ' Click any station in the 3D scene to inspect it.'}
        </p>
      </div>

      {/* 3D Scene or fallback */}
      {reducedMotion || !webglAvailable ? (
        <div className="container-base"><StaticFallback /></div>
      ) : (
        <div
          ref={containerRef}
          className="relative w-full select-none"
          style={{ height: 'clamp(400px, 55vw, 680px)' }}
          aria-label="Interactive 3D visualization of Edge AI architecture. Use the buttons below to explore each layer."
          role="img"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            aria-hidden="true"
          />

          {/* Click-to-explore hint */}
          {showHint && (
            <div
              className="absolute top-5 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{ opacity: showHint ? 1 : 0, transition: 'opacity 0.6s ease' }}
              aria-hidden="true"
            >
              <span className="font-mono text-[0.65rem] tracking-widest2 uppercase text-cyan/60 border border-cyan/20 rounded-md px-4 py-2 bg-void/50 backdrop-blur-sm animate-pulse">
                Click to explore
              </span>
            </div>
          )}

          {/* Info panel overlay */}
          <div className="absolute bottom-0 left-0 right-0">
            <div
              className="container-base pb-6"
              style={{
                opacity: activeStation ? 1 : 0,
                transform: activeStation ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
                pointerEvents: activeStation ? 'auto' : 'none',
              }}
            >
              {/* Glassmorphic info card */}
              <div className="rounded-2xl border border-border bg-void/70 backdrop-blur-xl p-5 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-primary">
                      {activeStation?.title}
                    </h3>
                    <p className="font-mono text-[0.65rem] tracking-widest2 uppercase text-cyan mt-1">
                      {activeStation?.sublabel}
                    </p>
                    <p className="text-muted text-sm leading-relaxed mt-3 max-w-2xl">
                      {activeStation?.description}
                    </p>
                  </div>
                </div>

                {/* Station tabs */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                  {STATIONS.map((st, i) => {
                    const Icon = st.icon;
                    const isActive = selectedIdx === i;
                    const isCloud = i === 2;
                    return (
                      <button
                        key={st.id}
                        onClick={() => focusStation(i)}
                        aria-pressed={isActive}
                        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs tracking-widest2 uppercase border transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan
                          ${isActive
                            ? isCloud
                              ? 'bg-amber/10 border-amber/40 text-amber'
                              : 'bg-cyan/10 border-cyan/40 text-cyan'
                            : 'bg-surface-raised border-border text-muted hover:border-hover hover:text-primary'
                          }`}
                      >
                        <Icon size={13} aria-hidden="true" />
                        {st.tabLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

