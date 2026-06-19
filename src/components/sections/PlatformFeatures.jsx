import { motion } from 'framer-motion';
import {
  Cpu,
  BrainCircuit,
  Network,
  Wrench,
  LayoutDashboard,
  CloudUpload,
} from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Card from '../ui/Card.jsx';

const FEATURES = [
  {
    icon: Cpu,
    title: 'Edge AI Processing Engine',
    description:
      'Deploys and serves AI/ML models directly on edge hardware — from ARM Cortex microcontrollers to NVIDIA Jetson modules — without requiring a cloud round-trip for inference.',
  },
  {
    icon: BrainCircuit,
    title: 'Device Intelligence Layer',
    description:
      'Aggregates multi-sensor telemetry streams, normalizes heterogeneous data formats, and maintains a continuously updated device state model that feeds downstream inference.',
  },
  {
    icon: Network,
    title: 'IoT Orchestration System',
    description:
      'Manages device provisioning, model versioning, and configuration rollouts across distributed fleets. Supports zero-downtime updates on live production devices.',
  },
  {
    icon: Wrench,
    title: 'Predictive Maintenance Intelligence',
    description:
      'Detects early-stage mechanical degradation signatures — vibration anomalies, thermal drift, pressure variance — before they reach failure thresholds, with explainable confidence scores.',
  },
  {
    icon: LayoutDashboard,
    title: 'Edge Intelligence Dashboard',
    description:
      'Unified operational view across your entire device estate: live inference status, alert queues, health metrics, and model performance — all rendered from edge-sourced data.',
  },
  {
    icon: CloudUpload,
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
    <section id="platform" className="bg-surface section-pad">
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
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={cardVariants} className="h-full">
              <Card className="h-full group relative overflow-hidden">
                {/* Watermark icon revealed on hover */}
                <Icon
                  size={80}
                  className="absolute -bottom-2 -right-2 text-cyan opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Glowing icon container */}
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-cyan/10 border border-cyan/25 shadow-glow-cyan mb-5 transition-all duration-300 group-hover:bg-cyan/15 group-hover:shadow-glow-cyan">
                  <Icon size={22} className="text-cyan" aria-hidden="true" />
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
