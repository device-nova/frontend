import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader.jsx';
import Card from '../ui/Card.jsx';
import iconEdgeAi from '../../assets/images/features/edge-ai.png';
import iconDeviceIntelligence from '../../assets/images/features/device-intelligence.png';
import iconOrchestration from '../../assets/images/features/orchestration.png';
import iconPredictive from '../../assets/images/features/predictive-maintenance.png';
import iconDashboard from '../../assets/images/features/dashboard.png';
import iconEdgeToCloud from '../../assets/images/features/edge-to-cloud.png';

const FEATURES = [
  {
    icon: iconEdgeAi,
    title: 'Edge AI Processing Engine',
    description:
      'Deploys and serves AI/ML models directly on edge hardware — from ARM Cortex microcontrollers to NVIDIA Jetson modules — without requiring a cloud round-trip for inference.',
  },
  {
    icon: iconDeviceIntelligence,
    title: 'Device Intelligence Layer',
    description:
      'Aggregates multi-sensor telemetry streams, normalizes heterogeneous data formats, and maintains a continuously updated device state model that feeds downstream inference.',
  },
  {
    icon: iconOrchestration,
    title: 'IoT Orchestration System',
    description:
      'Manages device provisioning, model versioning, and configuration rollouts across distributed fleets. Supports zero-downtime updates on live production devices.',
  },
  {
    icon: iconPredictive,
    title: 'Predictive Maintenance Intelligence',
    description:
      'Detects early-stage mechanical degradation signatures — vibration anomalies, thermal drift, pressure variance — before they reach failure thresholds, with explainable confidence scores.',
  },
  {
    icon: iconDashboard,
    title: 'Edge Intelligence Dashboard',
    description:
      'Unified operational view across your entire device estate: live inference status, alert queues, health metrics, and model performance — all rendered from edge-sourced data.',
  },
  {
    icon: iconEdgeToCloud,
    title: 'Edge-to-Cloud Sync',
    description:
      'Synchronizes aggregated insights, model retraining candidates, and audit logs to your preferred cloud environment on a configurable schedule, without requiring persistent connectivity.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function PlatformFeatures() {
  return (
    <section id="platform" className="bg-surface section-pad relative overflow-hidden">
      <div className="ambient-orb ambient-orb--cyan" aria-hidden="true" />
      <div className="container-base">
        <SectionHeader
          eyebrow="Platform Features"
          title="A complete Edge AI stack for industrial operations"
          description="Device-Nova is not a single component — it is a vertically integrated platform that covers inference, orchestration, observability, and cloud integration from a single control plane."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {FEATURES.map(({ icon, title, description }) => (
            <motion.div key={title} variants={cardVariants} className="h-full">
              <Card className="h-full group relative overflow-hidden">
                <img
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  className="absolute -bottom-2 -right-2 w-36 h-36 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none object-contain"
                />

                <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-cyan/10 border border-cyan/25 shadow-glow-cyan mb-5 transition-all duration-300 group-hover:bg-cyan/15 group-hover:shadow-glow-cyan">
                  <img src={icon} alt="" aria-hidden="true" className="h-10 w-10 object-contain" />
                </div>

                <h3 className="font-display text-lg font-semibold text-primary mb-3">{title}</h3>
                <p className="text-muted leading-relaxed text-sm">{description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
