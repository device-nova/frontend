import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Cpu, Wifi, WifiOff, BrainCircuit, Bell } from 'lucide-react';
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
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-raised p-5">
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
/* Animated topology map                                                */
/* ------------------------------------------------------------------ */
const NODES = [
  { id: 'hub', x: 50, y: 50, label: 'Edge Hub', r: 10, primary: true },
  { id: 'n1', x: 20, y: 20, label: 'Sensor A', r: 6 },
  { id: 'n2', x: 80, y: 18, label: 'Sensor B', r: 6 },
  { id: 'n3', x: 15, y: 70, label: 'Gateway 1', r: 7 },
  { id: 'n4', x: 82, y: 72, label: 'PLC Node', r: 7 },
  { id: 'n5', x: 50, y: 85, label: 'Gateway 2', r: 6 },
  { id: 'n6', x: 35, y: 38, label: 'Sensor C', r: 5 },
  { id: 'n7', x: 66, y: 37, label: 'Sensor D', r: 5 },
];
const EDGES = [
  ['hub', 'n1'], ['hub', 'n2'], ['hub', 'n3'],
  ['hub', 'n4'], ['hub', 'n5'], ['hub', 'n6'], ['hub', 'n7'],
  ['n1', 'n6'], ['n2', 'n7'],
];

function TopologyMap({ inView }) {
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs tracking-widest2 uppercase text-muted">Network Topology</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" aria-hidden="true" />
          <span className="font-mono text-[0.65rem] text-success">Live</span>
        </span>
      </div>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-48"
        aria-label="Network topology showing edge hub connected to 7 sensors and gateways"
      >
        {/* Edges */}
        {EDGES.map(([a, b]) => {
          const na = nodeMap[a];
          const nb = nodeMap[b];
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="var(--accent-cyan)"
              strokeWidth="0.4"
              strokeOpacity="0.35"
              strokeDasharray="2 2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <g key={node.id}>
            {node.primary && (
              <circle
                cx={node.x} cy={node.y} r={node.r + 5}
                fill="var(--accent-cyan)"
                fillOpacity="0.06"
                className="animate-pulse-glow"
              />
            )}
            <motion.circle
              cx={node.x} cy={node.y} r={node.r}
              fill={node.primary ? 'var(--accent-cyan)' : 'var(--bg-surface-raised)'}
              stroke={node.primary ? 'var(--accent-cyan)' : 'rgba(0,217,255,0.3)'}
              strokeWidth="0.8"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i + 0.2 }}
            />
          </g>
        ))}
      </svg>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[0.65rem] text-muted">8 nodes · 7 edges active</span>
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
    <div className="rounded-2xl border border-border bg-surface-raised p-5 h-full">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-xs tracking-widest2 uppercase text-muted">Infrastructure Health</span>
        <Activity size={14} className="text-cyan" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-4">
        <HealthBar label="Uptime" value={99.4} tone="success" />
        <HealthBar label="AI Load" value={67} tone="cyan" />
        <HealthBar label="Latency" value={1.8} max={10} tone="cyan" />
        <HealthBar label="Error Rate" value={0.3} tone="success" />
        <HealthBar label="Bandwidth" value={42} tone="amber" />
      </div>
      <div className="mt-5 pt-4 border-t border-border flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse-glow" aria-hidden="true" />
        <span className="font-mono text-[0.65rem] text-amber">2 alerts pending review</span>
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
        <div className="mb-14 max-w-2xl">
          <Badge tone="cyan" className="mb-5">
            Dashboard Preview
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary leading-tight">
            Operational visibility across your entire device estate
          </h2>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            All inference activity, device health, and alert state surfaces in a single
            control plane — sourced from edge data, not cloud aggregation delays.
          </p>
        </div>

        {/* Stat strip */}
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

        {/* Topology + Health */}
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
