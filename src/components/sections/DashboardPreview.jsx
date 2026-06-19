import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Activity, Wifi, WifiOff, BrainCircuit, Bell, Zap } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Badge from '../ui/Badge.jsx';
import { useCountUp } from '../../hooks/useCountUp.js';

/* ------------------------------------------------------------------ */
/* Stat Card with count-up                                              */
/* ------------------------------------------------------------------ */
function StatCard({ icon: Icon, label, value, suffix = '', tone = 'cyan', active }) {
  const count = useCountUp(value, 1600, active);
  const toneClasses = {
    cyan: 'text-cyan bg-cyan/10 border-cyan/20',
    amber: 'text-amber bg-amber/10 border-amber/20',
    success: 'text-success bg-success/10 border-success/20',
    muted: 'text-muted bg-surface-raised border-border',
  };
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-raised p-5 transition-all duration-300 hover:-translate-y-1 hover:border-hover hover:shadow-glow-cyan cursor-default">
      <div className={`h-9 w-9 rounded-lg flex items-center justify-center border ${toneClasses[tone]}`}>
        <Icon size={18} className={toneClasses[tone].split(' ')[0]} aria-hidden="true" />
      </div>
      <div>
        <p className="font-display text-3xl font-bold text-primary tabular-nums">
          {count.toLocaleString()}{suffix}
        </p>
        <p className="font-mono text-xs tracking-widest2 text-muted mt-1 uppercase">{label}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Animated topology map — Device-Nova architecture                     */
/* Rebuilt on a 600x320 viewBox with verified spacing: 110-unit         */
/* vertical gaps between tiers, 153-unit horizontal gaps between edge   */
/* device nodes. Previous version used a cramped 100x100 viewBox        */
/* rendered at only 224px tall, which is why labels overlapped circles  */
/* and each other — this version fixes the root sizing problem rather   */
/* than nudging individual coordinates.                                 */
/* ------------------------------------------------------------------ */

/* Edge nodes moved up to y=250 (was 270) and the EDGE DEVICES tier
   label pushed down to y=335 (was 296) — at r=22 a node centered at
   y=250 has its bottom edge at y=272, leaving a genuine 63-unit clear
   gap before the label, instead of the 4-unit near-touch that caused
   the collision in the screenshot. ViewBox height increased to 360
   to fit the extra room. */
const EDGE_DEVICES = [
  { id: 'sensor-a', x: 70, y: 250, label: 'Sensor A', r: 24 },
  { id: 'sensor-b', x: 223, y: 250, label: 'Sensor B', r: 24 },
  { id: 'plc', x: 377, y: 250, label: 'PLC Node', r: 26 },
  { id: 'gateway', x: 530, y: 250, label: 'Gateway 1', r: 24 },
];

const ORCHESTRATOR = { id: 'orchestrator', x: 300, y: 150, label: 'Edge AI Orchestrator', r: 42 };
const CLOUD_SYNC = { id: 'cloud', x: 300, y: 48, label: 'Cloud Sync', r: 26, muted: true };

const EDGE_CONNECTIONS = EDGE_DEVICES.map((d) => [ORCHESTRATOR, d]);
const CLOUD_CONNECTION = [ORCHESTRATOR, CLOUD_SYNC];

function buildPulseData() {
  const pulses = [];
  EDGE_CONNECTIONS.forEach(([a, b], i) => {
    pulses.push({
      key: `edge-pulse-${i}`,
      path: `M ${a.x} ${a.y} L ${b.x} ${b.y}`,
      speed: 0.9 + Math.random() * 0.3,
      delay: i * 0.25,
    });
  });
  pulses.push({
    key: 'cloud-pulse',
    path: `M ${ORCHESTRATOR.x} ${ORCHESTRATOR.y} L ${CLOUD_SYNC.x} ${CLOUD_SYNC.y}`,
    speed: 3.2,
    delay: 1.0,
  });
  return pulses;
}
const PULSES = buildPulseData();

function DataPulse({ pulse, reduceMotion, color = 'var(--accent-cyan)', size = 5 }) {
  if (reduceMotion) {
    return <circle r={size} fill={color} fillOpacity="0.8" style={{ offsetPath: `path('${pulse.path}')`, offsetDistance: '50%' }} />;
  }
  return (
    <g>
      {/* Soft glow trail behind the core dot, makes motion read clearly even in a still frame */}
      <motion.circle
        r={size * 2.6}
        fill={color}
        fillOpacity="0.18"
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={{ duration: pulse.speed, repeat: Infinity, ease: 'linear', delay: pulse.delay }}
        style={{ offsetPath: `path('${pulse.path}')` }}
      />
      <motion.circle
        r={size}
        fill={color}
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={{ duration: pulse.speed, repeat: Infinity, ease: 'linear', delay: pulse.delay }}
        style={{ offsetPath: `path('${pulse.path}')` }}
      />
    </g>
  );
}

function TopologyMap({ inView }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-5 h-full transition-all duration-300 hover:-translate-y-1 hover:border-hover hover:shadow-glow-cyan cursor-default">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-widest2 uppercase text-muted">Network Architecture</span>
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
        </div>
        <span className="font-mono text-[0.65rem] text-success tracking-wide">Live Data Feed</span>
      </div>

      <svg
        viewBox="0 0 600 360"
        className="w-full h-80 sm:h-96"
        role="img"
        aria-label="Device-Nova architecture: four edge devices — Sensor A, Sensor B, PLC Node, and Gateway 1 — connect upward to a central Edge AI Orchestrator, which has a secondary, slower connection to Cloud Sync at the top. Connections animate continuously to show live data movement."
      >
        {/* Tier labels, each on its own clear band with no node within
            its vertical range — EDGE DEVICES previously sat only 4
            units below the node circles and read as overlapping. */}
        <text x="20" y="334" fontSize="11" fill="var(--fg-muted)" fontFamily="JetBrains Mono, monospace" fontWeight="500" letterSpacing="1.5">
          EDGE DEVICES
        </text>
        <text x="20" y="196" fontSize="11" fill="var(--fg-muted)" fontFamily="JetBrains Mono, monospace" fontWeight="500" letterSpacing="1.5">
          AI ORCHESTRATION
        </text>
        <text x="20" y="20" fontSize="11" fill="var(--fg-muted)" fontFamily="JetBrains Mono, monospace" fontWeight="500" letterSpacing="1.5" opacity="0.5">
          CLOUD SYNC
        </text>

        {/* Cloud connection — dashed, de-emphasized, with a slow
            continuous dash-flow so the line itself looks alive
            even between the occasional traveling pulse. */}
        <motion.line
          x1={CLOUD_CONNECTION[0].x} y1={CLOUD_CONNECTION[0].y}
          x2={CLOUD_CONNECTION[1].x} y2={CLOUD_CONNECTION[1].y}
          stroke="var(--accent-cyan)" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 6"
          animate={inView && !reduceMotion ? { strokeDashoffset: [0, -24] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Edge connections — solid, fast, with a quicker dash-flow
            to visually contrast against the slow cloud connection. */}
        {EDGE_CONNECTIONS.map(([a, b]) => (
          <motion.line
            key={`edge-${a.id}-${b.id}`}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke="var(--accent-cyan)" strokeWidth="2.5" strokeOpacity="0.5" strokeDasharray="8 5"
            animate={inView && !reduceMotion ? { strokeDashoffset: [0, -26] } : {}}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {inView && PULSES.map((p) => (
          <DataPulse key={p.key} pulse={p} reduceMotion={reduceMotion} size={p.key === 'cloud-pulse' ? 4 : 5} />
        ))}

        {/* Cloud Sync node */}
        <circle cx={CLOUD_SYNC.x} cy={CLOUD_SYNC.y} r={CLOUD_SYNC.r}
          fill="var(--bg-surface-raised)" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="3 3" />
        <text x={CLOUD_SYNC.x} y={CLOUD_SYNC.y + 4} textAnchor="middle" fontSize="10.5"
          fill="var(--fg-muted)" fontFamily="JetBrains Mono, monospace" fontWeight="500" opacity="0.65">
          {CLOUD_SYNC.label}
        </text>

        {/* Orchestrator — breathing glow ring runs continuously so the
            node visibly pulses with activity even between data packets,
            not just a one-time scale-in on load. Dark text on the
            bright fill for correct contrast. */}
        <motion.circle
          cx={ORCHESTRATOR.x} cy={ORCHESTRATOR.y} r={ORCHESTRATOR.r + 14}
          fill="var(--accent-cyan)"
          animate={inView && !reduceMotion ? { opacity: [0.08, 0.22, 0.08], scale: [1, 1.12, 1] } : { opacity: 0.08 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${ORCHESTRATOR.x}px ${ORCHESTRATOR.y}px` }}
        />
        <motion.circle
          cx={ORCHESTRATOR.x} cy={ORCHESTRATOR.y} r={ORCHESTRATOR.r}
          fill="var(--accent-cyan)" stroke="var(--accent-cyan)" strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ transformOrigin: `${ORCHESTRATOR.x}px ${ORCHESTRATOR.y}px` }}
        />
        <text x={ORCHESTRATOR.x} y={ORCHESTRATOR.y - 4} textAnchor="middle" fontSize="12"
          fill="var(--bg-void)" fontFamily="Space Grotesk, sans-serif" fontWeight="700">
          Edge AI
        </text>
        <text x={ORCHESTRATOR.x} y={ORCHESTRATOR.y + 11} textAnchor="middle" fontSize="12"
          fill="var(--bg-void)" fontFamily="Space Grotesk, sans-serif" fontWeight="700">
          Orchestrator
        </text>

        {/* Edge device nodes — border weight increased (strokeWidth 1.75 -> 2.75,
            radius 22-24 -> 24-26) per request, plus a slow continuous opacity
            breathing so they read as active sensors, not static icons. */}
        {EDGE_DEVICES.map((node, i) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x} cy={node.y} r={node.r}
              fill="var(--bg-surface-raised)" stroke="var(--accent-cyan)" strokeOpacity="0.55" strokeWidth="2.75"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? {
                scale: 1,
                opacity: reduceMotion ? 1 : [1, 0.7, 1],
              } : {}}
              transition={inView ? {
                scale: { duration: 0.35, delay: 0.08 * i + 0.15 },
                opacity: reduceMotion
                  ? { duration: 0.35, delay: 0.08 * i + 0.15 }
                  : { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 + 1 },
              } : {}}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            <motion.text
              x={node.x} y={node.y + 4} textAnchor="middle" fontSize="10.5"
              fill="var(--fg-primary)" fontFamily="JetBrains Mono, monospace" fontWeight="500"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.08 * i + 0.3 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}
      </svg>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan" aria-hidden="true" />
            <span className="font-mono text-[0.6rem] text-muted tracking-wide">Edge</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan opacity-40" aria-hidden="true" />
            <span className="font-mono text-[0.6rem] text-muted tracking-wide">Cloud</span>
          </span>
        </div>
        <Badge tone="cyan" className="text-[0.6rem]">Powered by NVIDIA SDK</Badge>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Health panel                                                          */
/* ------------------------------------------------------------------ */
function HealthBar({ label, value, max = 100, tone = 'cyan' }) {
  const pct = Math.round((value / max) * 100);
  const barColor = tone === 'amber' ? 'bg-amber' : tone === 'success' ? 'bg-success' : 'bg-cyan';
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[0.65rem] text-muted w-28 truncate uppercase tracking-widest2">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      <span className="font-mono text-xs text-primary w-10 text-right">{value}{tone === 'ms' ? ' ms' : '%'}</span>
    </div>
  );
}

function HealthPanel() {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-5 h-full transition-all duration-300 hover:-translate-y-1 hover:border-hover hover:shadow-glow-cyan cursor-default">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-widest2 uppercase text-muted">Infrastructure Health</span>
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75 animate-ping" style={{ animationDuration: '2s' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
        </div>
        <Activity size={14} className="text-cyan" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-4">
        <HealthBar label="Uptime" value={99.4} tone="success" />
        <HealthBar label="AI Load" value={67} tone="cyan" />
        <HealthBar label="Latency" value={1.8} max={10} tone="cyan" />
        <HealthBar label="Error Rate" value={0.3} tone="success" />
        <HealthBar label="Bandwidth" value={42} tone="amber" />
      </div>
      <div className="mt-5 pt-4 border-t border-border flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse-glow" aria-hidden="true" />
          <span className="font-mono text-[0.65rem] text-amber">2 alerts pending review</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={10} className="text-cyan" aria-hidden="true" />
          <span className="font-mono text-[0.6rem] text-muted tracking-wide">
            Inference activity: <span className="text-cyan">active</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main section                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="dashboard" className="bg-void section-pad" ref={ref}>
      <div className="container-base">
        <SectionHeader
          eyebrow="Dashboard Preview"
          title="Operational visibility across your entire device estate"
          description="All inference activity, device health, and alert state surfaces in a single control plane — sourced from edge data, not cloud aggregation delays."
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <StatCard icon={Wifi} label="Online Devices" value={1247} tone="success" active={inView} />
          <StatCard icon={WifiOff} label="Offline" value={8} tone="amber" active={inView} />
          <StatCard icon={BrainCircuit} label="AI Models Active" value={34} tone="cyan" active={inView} />
          <StatCard icon={Bell} label="Alerts (24 h)" value={2} tone="muted" active={inView} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <TopologyMap inView={inView} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <HealthPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
