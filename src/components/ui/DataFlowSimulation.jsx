import { useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Activity } from 'lucide-react';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────
   NODE LAYOUT — viewBox widened to 0 0 860 240 with 30-unit
   side padding (was 0 0 800 220, flush to the edges). The
   Edge Nodes sublabel is ~130 units wide centered at x=70,
   so with no padding its left half ran past x=0 and was
   clipped by the SVG boundary — that was the "halfly
   visible" text. Long sublabels are also now split onto two
   lines instead of one wide line, which fixes the clipping
   at its root rather than just nudging coordinates.
───────────────────────────────────────────────────────── */
const NODES = [
  { id: 'edge', x: 100, y: 120, r: 40, title: 'Edge Nodes', subLines: ['SENSORS · PLCs', 'GATEWAYS'] },
  { id: 'orch', x: 300, y: 120, r: 40, title: 'Orchestration', subLines: ['INFERENCE · CONTROL'] },
  { id: 'cloud', x: 500, y: 120, r: 36, title: 'Cloud Sync', subLines: ['AGGREGATED ONLY'], muted: true },
  { id: 'dash', x: 700, y: 120, r: 36, title: 'Dashboard', subLines: ['OBSERVABILITY'], muted: true },
];

const CONNECTIONS = [
  { id: 'fast', x1: 140, x2: 260, from: 0, to: 1, speed: 'fast', caption: '< 2ms · on-device', captionX: 200 },
  { id: 'slow1', x1: 336, x2: 464, from: 1, to: 2, speed: 'slow', caption: 'insights only', captionX: 400 },
  { id: 'slow2', x1: 536, x2: 664, from: 2, to: 3, speed: 'slow', caption: 'read-only feed', captionX: 600 },
];
const Y = 120;

const EDGE_PACKETS = [{ delay: 0 }, { delay: 0.45 }, { delay: 0.9 }];
const SLOW_PACKETS = [{ delay: 0 }];

function pathFor(c) {
  return `M ${c.x1} ${Y} L ${c.x2} ${Y}`;
}

function DataPacket({ path, duration, delay, size, reduceMotion }) {
  if (reduceMotion) {
    return <circle r={size * 1.8} fill="var(--accent-cyan)" fillOpacity="0.6" style={{ offsetPath: `path('${path}')`, offsetDistance: '50%' }} />;
  }
  return (
    <g>
      <motion.circle r={size * 3} fill="var(--accent-cyan)" fillOpacity="0.12"
        initial={{ offsetDistance: '0%' }} animate={{ offsetDistance: '100%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
        style={{ offsetPath: `path('${path}')` }} />
      <motion.circle r={size} fill="var(--accent-cyan)"
        initial={{ offsetDistance: '0%' }} animate={{ offsetDistance: '100%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
        style={{ offsetPath: `path('${path}')` }} />
    </g>
  );
}

function ConnectionLine({ conn, reduceMotion }) {
  const isFast = conn.speed === 'fast';
  return (
    <motion.line
      x1={conn.x1} y1={Y} x2={conn.x2} y2={Y}
      stroke="var(--accent-cyan)"
      strokeWidth={isFast ? 2 : 1.25}
      strokeOpacity={isFast ? 0.35 : 0.2}
      strokeDasharray={isFast ? '10 6' : '5 7'}
      animate={reduceMotion ? {} : { strokeDashoffset: [0, isFast ? -32 : -24] }}
      transition={{ duration: isFast ? 0.9 : 2.6, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function ArrowHead({ x, y, opacity }) {
  return <polygon points={`${x - 9},${y - 7} ${x - 9},${y + 7} ${x + 6},${y}`} fill="var(--accent-cyan)" fillOpacity={opacity} />;
}

/* Node with rotating rings. Muted nodes (Cloud Sync, Dashboard) keep a
   visually secondary role vs. Edge/Orchestration, but their ring opacity
   was previously low enough (0.10-0.18) to read as not-animating at all.
   Raised to a clearly visible level while still staying dimmer than the
   primary nodes, so the hierarchy reads as "present and alive, just
   calmer" rather than "broken." */
function NodeShape({ x, y, r, title, subLines, muted, spin, reduceMotion }) {
  const ringOpacityOuter = muted ? 0.32 : 0.45;
  const ringOpacityInner = muted ? 0.22 : 0.3;
  return (
    <g>
      <circle cx={x} cy={y} r={r + 16} fill="var(--accent-cyan)" fillOpacity={muted ? '0.04' : '0.07'} />
      <circle cx={x} cy={y} r={r} fill="var(--bg-surface-raised)" stroke="var(--accent-cyan)" strokeWidth="2" strokeOpacity={muted ? '0.32' : '0.55'} />

      <motion.circle
        cx={x} cy={y} r={r - 9}
        fill="none" stroke="var(--accent-cyan)" strokeWidth="1.25"
        strokeOpacity={ringOpacityOuter} strokeDasharray="4 5"
        style={{ transformOrigin: `${x}px ${y}px` }}
        animate={reduceMotion ? {} : { rotate: spin > 0 ? 360 : -360 }}
        transition={{ duration: 14 / Math.abs(spin), repeat: Infinity, ease: 'linear' }}
      />
      <motion.circle
        cx={x} cy={y} r={r - 4}
        fill="none" stroke="var(--accent-cyan)" strokeWidth="0.75"
        strokeOpacity={ringOpacityInner} strokeDasharray="1 6"
        style={{ transformOrigin: `${x}px ${y}px` }}
        animate={reduceMotion ? {} : { rotate: spin > 0 ? -360 : 360 }}
        transition={{ duration: 20 / Math.abs(spin), repeat: Infinity, ease: 'linear' }}
      />

      <text x={x} y={y + 3} textAnchor="middle" fontSize="15" fontFamily="Space Grotesk, sans-serif" fontWeight="600" fill={muted ? 'var(--fg-muted)' : 'var(--fg-primary)'}>
        {title}
      </text>

      {/* Sublabel split across up to two lines, each independently
          centered at the node's x — guarantees no line can be wider
          than its own text content, eliminating the edge-clipping bug. */}
      {subLines.map((line, i) => (
        <text
          key={line}
          x={x}
          y={y + r + 24 + i * 13}
          textAnchor="middle"
          fontSize="9.5"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.5"
          fill="var(--fg-muted)"
          opacity={muted ? '0.5' : '0.65'}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/* ─────────────────────────────────────────────────────────
   THREE.JS LAYER — ambient particles + a glow sprite behind
   every node, pulsing in sync with that node's fast/slow role.
───────────────────────────────────────────────────────── */
function useThreeLayer(containerRef, enabled) {
  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const COUNT = 70;
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * w;
      positions[i * 3 + 1] = (Math.random() - 0.5) * h;
      positions[i * 3 + 2] = -2;
      speeds[i] = 10 + Math.random() * 18;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color('#00D9FF'), size: 2.2, transparent: true,
      opacity: 0.3, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(geometry, particleMat));

    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 128; glowCanvas.height = 128;
    const gctx = glowCanvas.getContext('2d');
    const grad = gctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0,217,255,0.55)');
    grad.addColorStop(1, 'rgba(0,217,255,0)');
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 128, 128);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);

    // viewBox is now 0 0 860 240 (padded) — must match for correct mapping
    const viewBoxW = 860, viewBoxH = 240;
    const scaleX = w / viewBoxW, scaleY = h / viewBoxH;
    const glowSprites = NODES.map((n, i) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      }));
      const px = (n.x - viewBoxW / 2) * scaleX;
      const py = -(n.y - viewBoxH / 2) * scaleY;
      sprite.position.set(px, py, -1);
      const baseScale = n.r * 2.4 * Math.max(scaleX, scaleY);
      sprite.scale.set(baseScale, baseScale, 1);
      sprite.userData = { baseScale, muted: !!n.muted, phase: i * 0.6 };
      scene.add(sprite);
      return sprite;
    });

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3] += speeds[i] * 0.016;
        if (pos[i * 3] > w / 2) pos[i * 3] = -w / 2;
      }
      geometry.attributes.position.needsUpdate = true;

      glowSprites.forEach((sprite) => {
        const { baseScale, muted, phase } = sprite.userData;
        const speed = muted ? 0.7 : 1.6;
        const amount = muted ? 0.1 : 0.16;
        const pulse = 1 + Math.sin(t * speed + phase) * amount;
        sprite.scale.set(baseScale * pulse, baseScale * pulse, 1);
        sprite.material.opacity = muted ? 0.4 : 0.55;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const nw = container.clientWidth, nh = container.clientHeight;
      camera.left = -nw / 2; camera.right = nw / 2;
      camera.top = nh / 2; camera.bottom = -nh / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      particleMat.dispose();
      glowTexture.dispose();
      glowSprites.forEach((s) => s.material.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [containerRef, enabled]);
}

export default function DataFlowSimulation() {
  const ref = useRef(null);
  const threeHostRef = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();

  useThreeLayer(threeHostRef, inView && !reduceMotion);

  return (
    <motion.div
      ref={ref}
      className="mt-12 rounded-2xl border border-border bg-void overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="relative flex items-center gap-2 px-5 sm:px-8 pt-5 sm:pt-6 z-10">
        <Activity size={14} className="text-cyan" aria-hidden="true" />
        <span className="font-mono text-[0.65rem] tracking-widest2 uppercase text-cyan">Live Data Flow</span>
        <span className="relative flex h-2 w-2 ml-auto" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
      </div>

      {/* Taller on mobile now (h-72 vs previous h-64) to give the
          two-line sublabels room without feeling cramped. */}
      <div ref={threeHostRef} className="relative w-full h-72 sm:h-80 lg:h-[26rem]">
        <svg
          viewBox="0 0 860 240"
          className="absolute inset-0 w-full h-full z-10"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Diagram showing data flowing from Edge Nodes to Orchestration quickly and continuously, then to Cloud Sync and the Intelligence Dashboard slowly and only as aggregated summaries."
        >
          {CONNECTIONS.map((c) => <ConnectionLine key={c.id} conn={c} reduceMotion={reduceMotion} />)}

          <ArrowHead x={256} y={Y} opacity={0.5} />
          <ArrowHead x={460} y={Y} opacity={0.24} />
          <ArrowHead x={660} y={Y} opacity={0.22} />

          {CONNECTIONS.map((c) => (
            <text key={c.id} x={c.captionX} y={Y - 18} textAnchor="middle" fontSize={c.speed === 'fast' ? 11 : 10}
              fontFamily="JetBrains Mono, monospace"
              fill={c.speed === 'fast' ? 'var(--accent-cyan)' : 'var(--fg-muted)'}
              opacity={c.speed === 'fast' ? 0.7 : 0.45}>
              {c.caption}
            </text>
          ))}

          {NODES.map((n, i) => (
            <NodeShape key={n.id} {...n} spin={i % 2 === 0 ? 1 : -1} reduceMotion={reduceMotion} />
          ))}

          {EDGE_PACKETS.map((p, i) => (
            <DataPacket key={`e${i}`} path={pathFor(CONNECTIONS[0])} duration={1.1} delay={p.delay} size={3.2} reduceMotion={reduceMotion} />
          ))}
          {SLOW_PACKETS.map((p, i) => (
            <DataPacket key={`s1-${i}`} path={pathFor(CONNECTIONS[1])} duration={3.6} delay={p.delay} size={2.8} reduceMotion={reduceMotion} />
          ))}
          {SLOW_PACKETS.map((p, i) => (
            <DataPacket key={`s2-${i}`} path={pathFor(CONNECTIONS[2])} duration={3.6} delay={p.delay + 0.6} size={2.8} reduceMotion={reduceMotion} />
          ))}
        </svg>
      </div>

      <p className="relative px-5 sm:px-8 py-5 sm:py-6 text-xs text-muted font-mono tracking-wide opacity-70 z-10">
        Processing stays at the edge. Only insights travel up — raw telemetry never leaves the device unless explicitly configured.
      </p>
    </motion.div>
  );
}
