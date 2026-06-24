import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import DataFlowSimulation from '../ui/DataFlowSimulation.jsx';
import iconEdgeNodes from '../../assets/images/architecture/edge-nodes.png';
import iconOrchestration from '../../assets/images/architecture/orchestration.png';
import iconSecurity from '../../assets/images/architecture/security.png';
import iconCloudSync from '../../assets/images/architecture/cloud-sync.png';
import iconAnalytics from '../../assets/images/architecture/analytics.png';

const LAYERS = [
  {
    id: 'edge-nodes',
    icon: iconEdgeNodes,
    title: 'Edge Nodes',
    sublabel: 'Device Layer',
    items: ['AI inference engine', 'Local data store', 'Sensor fusion', 'Autonomous control'],
    color: 'cyan',
  },
  {
    id: 'orchestration',
    icon: iconOrchestration,
    title: 'Orchestration Layer',
    sublabel: 'Platform Core',
    items: ['Model versioning', 'Fleet management', 'Alert routing', 'Schema registry'],
    color: 'cyan',
  },
  {
    id: 'security',
    icon: iconSecurity,
    title: 'Security Fabric',
    sublabel: 'Cross-Layer',
    items: ['mTLS between nodes', 'Signed model artifacts', 'RBAC enforcement', 'Audit log stream'],
    color: 'success',
  },
  {
    id: 'cloud-sync',
    icon: iconCloudSync,
    title: 'Cloud Sync',
    sublabel: 'Optional Egress',
    items: ['Insight aggregation', 'Retraining candidate export', 'Compliance archival', 'BI connector'],
    color: 'muted',
  },
  {
    id: 'analytics',
    icon: iconAnalytics,
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

/* Connector chevron between layer cards: a quiet, continuous
   brightness pulse hints at directional flow without competing
   with the main animated diagram further down the section. */
function FlowChevron({ delay, reduceMotion }) {
  if (reduceMotion) {
    return <ChevronRight size={16} className="text-cyan rotate-90 lg:rotate-0" aria-hidden="true" />;
  }
  return (
    <motion.div
      animate={{ opacity: [0.35, 1, 0.35] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <ChevronRight size={16} className="text-cyan rotate-90 lg:rotate-0" aria-hidden="true" />
    </motion.div>
  );
}

export default function Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  return (
    <section id="architecture" className="bg-surface section-pad" ref={ref}>
      <div className="container-base">
        <SectionHeader
          eyebrow="Architecture"
          title="A distributed intelligence stack, top to bottom"
          description="Device-Nova is structured as five coherent layers, each independently deployable and observable. No layer creates a hard dependency on cloud availability."
        />

        {/* Layer cards with directional connector chevrons */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0">
          {LAYERS.map((layer, i) => {
            const c = colorMap[layer.color];
            return (
              <div key={layer.id} className="flex flex-col lg:flex-row items-stretch flex-1 min-w-0">
                <motion.div
                  className={`flex-1 rounded-2xl border ${c.border} bg-gradient-to-b from-void via-void to-void/60 p-4 lg:p-5 flex flex-col gap-3 transition-all duration-300 hover:border-hover hover:shadow-glow-cyan`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * i, duration: 0.55, ease: 'easeOut' }}
                >
                  <div className={`h-14 w-14 rounded-xl flex items-center justify-center border ${c.bg} ${c.glow}`}>
                    <img src={layer.icon} alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
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

                {i < LAYERS.length - 1 && (
                  <motion.div
                    className="flex lg:flex-col items-center justify-center px-2 py-2 lg:py-0 lg:px-1 flex-shrink-0"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
                  >
                    <FlowChevron delay={i * 0.3} reduceMotion={reduceMotion} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Unified, properly-scaled animated flow diagram */}
        <DataFlowSimulation />
      </div>
    </section>
  );
}
