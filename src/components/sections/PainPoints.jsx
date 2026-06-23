import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader.jsx';
import Card from '../ui/Card.jsx';
import iconLatency from '../../assets/images/pain-points/latency.png';
import iconConnectivity from '../../assets/images/pain-points/connectivity.png';
import iconBandwidth from '../../assets/images/pain-points/bandwidth.png';
import iconDeviceIntelligence from '../../assets/images/pain-points/device-intelligence.png';

const PAINS = [
  {
    icon: iconLatency,
    title: 'Round-Trip Latency',
    body:
      'Every cloud-routed decision adds 80 to 400 ms of overhead — enough to miss a fault on a fast-moving line.',
  },
  {
    icon: iconConnectivity,
    title: 'Connectivity Dependency',
    body:
      'Mines, offshore rigs, and remote factory floors run on intermittent uplinks. When the connection drops, cloud-dependent systems stop working entirely.',
  },
  {
    icon: iconBandwidth,
    title: 'Unconstrained Bandwidth Cost',
    body:
      'Raw telemetry at scale generates terabytes per day. Ingestion costs grow with your device count, regardless of whether useful decisions are made.',
  },
  {
    icon: iconDeviceIntelligence,
    title: 'No Device-Level Intelligence',
    body:
      'Traditional SCADA and PLC systems only execute what they were programmed to do. They cannot detect novel anomalies or adapt without manual re-engineering.',
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
          {PAINS.map(({ icon, title, body }) => (
            <motion.div key={title} variants={cardVariants}>
              <Card className="h-full group relative overflow-hidden">
                <img
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none object-contain"
                />
                <div className="flex items-start gap-5 relative z-10">
                  <div className="flex-shrink-0 h-16 w-16 rounded-xl flex items-center justify-center bg-amber/10 border border-amber/20 shadow-glow-amber">
                    <img src={icon} alt="" aria-hidden="true" className="h-10 w-10 object-contain" />
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
