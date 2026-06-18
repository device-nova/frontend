import { motion } from 'framer-motion';
import { Factory, Zap, Truck, Building2, Bot, Flame } from 'lucide-react';
import Badge from '../ui/Badge.jsx';

const INDUSTRIES = [
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Assembly-line anomaly detection, quality control, and predictive maintenance on CNC machines and robotics.',
  },
  {
    icon: Zap,
    title: 'Energy & Utilities',
    description: 'Real-time grid edge monitoring, turbine health inference, and autonomous load balancing without cloud dependency.',
  },
  {
    icon: Truck,
    title: 'Logistics & Fleet',
    description: 'On-vehicle AI for route optimization, fault prediction on drive-train systems, and warehouse automation.',
  },
  {
    icon: Building2,
    title: 'Smart Cities',
    description: 'Traffic signal intelligence, environmental sensor networks, and utility infrastructure management at the edge.',
  },
  {
    icon: Bot,
    title: 'Robotics & Automation',
    description: 'Closed-loop feedback for collaborative robots and autonomous guided vehicles using local AI inference.',
  },
  {
    icon: Flame,
    title: 'Oil & Gas',
    description: 'Remote pipeline integrity monitoring, compressor anomaly detection, and offshore rig safety systems in connectivity-limited environments.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function IndustriesServed() {
  return (
    <section id="solutions" className="bg-void section-pad">
      <div className="container-base">
        <div className="mb-14 max-w-2xl">
          <Badge tone="cyan" className="mb-5">
            Industries Served
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary leading-tight">
            Built for the environments where connectivity is a variable
          </h2>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            Device-Nova is designed for industrial contexts — not hypothetical IoT demos.
            Every deployment assumption is stress-tested against real operational conditions.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {INDUSTRIES.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="group flex gap-5 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-hover hover:shadow-glow-cyan"
            >
              <div className="flex-shrink-0 h-11 w-11 rounded-xl flex items-center justify-center bg-cyan/10 border border-cyan/20 transition-all duration-300 group-hover:bg-cyan/15 group-hover:shadow-glow-cyan">
                <Icon size={20} className="text-cyan" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-primary mb-2">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
