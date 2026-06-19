import { motion } from 'framer-motion';
import { WifiOff, Timer, HardDrive, BrainCircuit } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Card from '../ui/Card.jsx';

const PAINS = [
  {
    icon: Timer,
    title: 'Round-Trip Latency',
    body:
      'Every decision routed through the cloud adds 80–400 ms of overhead. In a fast-moving assembly line or safety-critical process, that window is the difference between a caught fault and unplanned downtime.',
  },
  {
    icon: WifiOff,
    title: 'Connectivity Dependency',
    body:
      'Remote sites — mines, offshore rigs, cellular-dead factory floors — operate with intermittent or metered uplink. Cloud-dependent inference stops working the moment the link drops.',
  },
  {
    icon: HardDrive,
    title: 'Unconstrained Bandwidth Cost',
    body:
      'Streaming raw sensor telemetry at scale generates terabytes per day. The ingestion and storage bill grows proportionally with your device estate, whether or not the cloud made a useful decision.',
  },
  {
    icon: BrainCircuit,
    title: 'No Device-Level Intelligence',
    body:
      'Traditional SCADA and PLC systems are deterministic rule-engines — they execute what they were programmed to do. They cannot learn from operational patterns, detect novel anomalies, or adapt to changing conditions without manual re-engineering.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function PainPoints() {
  return (
    <section id="pain-points" className="bg-surface section-pad">
      <div className="container-base">
        <SectionHeader
          eyebrow="Industrial Pain Points"
          title="Cloud-only IoT has a latency problem"
          description="Routing every inference decision through a remote data center made sense when device edge hardware was too constrained to run models. That constraint no longer exists."
          tone="amber"
          badgeDot
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PAINS.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} variants={cardVariants}>
              <Card className="h-full group relative overflow-hidden">
                {/* Subtle icon watermark revealed on hover */}
                <Icon
                  size={96}
                  className="absolute -bottom-4 -right-4 text-border opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  aria-hidden="true"
                />
                <div className="flex items-start gap-5 relative z-10">
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center bg-amber/10 border border-amber/20 shadow-glow-amber">
                    <Icon size={22} className="text-amber" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary mb-2">{title}</h3>
                    <p className="text-muted leading-relaxed text-sm">{body}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
