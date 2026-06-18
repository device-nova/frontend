import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Network, Cloud, Shield, BarChart2, ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge.jsx';

const LAYERS = [
  {
    id: 'edge-nodes',
    icon: Cpu,
    title: 'Edge Nodes',
    sublabel: 'Device Layer',
    items: ['AI inference engine', 'Local data store', 'Sensor fusion', 'Autonomous control'],
    color: 'cyan',
  },
  {
    id: 'orchestration',
    icon: Network,
    title: 'Orchestration Layer',
    sublabel: 'Platform Core',
    items: ['Model versioning', 'Fleet management', 'Alert routing', 'Schema registry'],
    color: 'cyan',
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security Fabric',
    sublabel: 'Cross-Layer',
    items: ['mTLS between nodes', 'Signed model artifacts', 'RBAC enforcement', 'Audit log stream'],
    color: 'success',
  },
  {
    id: 'cloud-sync',
    icon: Cloud,
    title: 'Cloud Sync',
    sublabel: 'Optional Egress',
    items: ['Insight aggregation', 'Retraining candidate export', 'Compliance archival', 'BI connector'],
    color: 'muted',
  },
  {
    id: 'analytics',
    icon: BarChart2,
    title: 'Intelligence Dashboard',
    sublabel: 'Operator Plane',
    items: ['Real-time observability', 'Trend analytics', 'Capacity planning', 'Model performance'],
    color: 'cyan',
  },
];

const colorMap = {
  cyan: {
    icon: 'text-cyan',
    bg: 'bg-cyan/10 border-cyan/25',
    glow: 'shadow-glow-cyan',
    border: 'border-cyan/25',
  },
  success: {
    icon: 'text-success',
    bg: 'bg-success/10 border-success/25',
    glow: '',
    border: 'border-success/25',
  },
  muted: {
    icon: 'text-muted',
    bg: 'bg-surface-raised border-border',
    glow: '',
    border: 'border-border',
  },
};

export default function Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="architecture" className="bg-surface section-pad" ref={ref}>
      <div className="container-base">
        <div className="mb-14 max-w-2xl">
          <Badge tone="cyan" className="mb-5">
            Architecture
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary leading-tight">
            A distributed intelligence stack, top to bottom
          </h2>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            Device-Nova is structured as five coherent layers, each independently deployable
            and observable. No layer creates a hard dependency on cloud availability.
          </p>
        </div>

        {/* Pipeline visualization */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0 lg:gap-0">
          {LAYERS.map((layer, i) => {
            const c = colorMap[layer.color];
            return (
              <div key={layer.id} className="flex flex-col lg:flex-row items-stretch flex-1 min-w-0">
                {/* Layer card */}
                <motion.div
                  className={`flex-1 rounded-2xl border ${c.border} bg-void p-5 flex flex-col gap-4`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * i, duration: 0.55, ease: 'easeOut' }}
                >
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${c.bg} ${c.glow}`}>
                    <layer.icon size={18} className={c.icon} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[0.65rem] tracking-widest2 text-muted uppercase mb-1">
                      {layer.sublabel}
                    </p>
                    <h3 className="font-display text-base font-semibold text-primary">{layer.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-1.5 mt-auto">
                    {layer.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-muted">
                        <span className={`h-1 w-1 rounded-full flex-shrink-0 ${layer.color === 'cyan' ? 'bg-cyan' : layer.color === 'success' ? 'bg-success' : 'bg-muted'}`} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Connector arrow between layers */}
                {i < LAYERS.length - 1 && (
                  <motion.div
                    className="flex lg:flex-col items-center justify-center px-2 py-2 lg:py-0 lg:px-1 flex-shrink-0"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
                    aria-hidden="true"
                  >
                    <ChevronRight size={16} className="text-cyan rotate-90 lg:rotate-0" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Data-flow annotation */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 rounded-2xl border border-border bg-void px-8 py-5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="h-2 w-2 rounded-full bg-cyan animate-pulse-glow" aria-hidden="true" />
            <span className="font-mono text-xs tracking-widest2 uppercase text-cyan">Data flow</span>
          </div>
          <p className="text-sm text-muted">
            Sensor data is processed and acted upon entirely within the Edge Node layer.
            Only aggregated insights and retraining signals traverse upward to Cloud Sync —
            raw telemetry never leaves the device unless explicitly configured.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
