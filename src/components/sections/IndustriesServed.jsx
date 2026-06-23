import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader.jsx';
import iconManufacturing from '../../assets/images/industries/manufacturing.png';
import iconEnergy from '../../assets/images/industries/energy.png';
import iconLogistics from '../../assets/images/industries/logistics.png';
import iconSmartCities from '../../assets/images/industries/smart-cities.png';
import iconRobotics from '../../assets/images/industries/robotics.png';
import iconOilGas from '../../assets/images/industries/oil-gas.png';

const INDUSTRIES = [
  {
    icon: iconManufacturing,
    title: 'Manufacturing',
    description: 'Assembly-line anomaly detection, quality control, and predictive maintenance on CNC machines and robotics.',
  },
  {
    icon: iconEnergy,
    title: 'Energy & Utilities',
    description: 'Real-time grid edge monitoring, turbine health inference, and autonomous load balancing without cloud dependency.',
  },
  {
    icon: iconLogistics,
    title: 'Logistics & Fleet',
    description: 'On-vehicle AI for route optimization, fault prediction on drive-train systems, and warehouse automation.',
  },
  {
    icon: iconSmartCities,
    title: 'Smart Cities',
    description: 'Traffic signal intelligence, environmental sensor networks, and utility infrastructure management at the edge.',
  },
  {
    icon: iconRobotics,
    title: 'Robotics & Automation',
    description: 'Closed-loop feedback for collaborative robots and autonomous guided vehicles using local AI inference.',
  },
  {
    icon: iconOilGas,
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
        <SectionHeader
          eyebrow="Industries Served"
          title="Built for the environments where connectivity is a variable"
          description="Device-Nova is designed for industrial contexts — not hypothetical IoT demos. Every deployment assumption is stress-tested against real operational conditions."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {INDUSTRIES.map(({ icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="group flex gap-5 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-hover hover:shadow-glow-cyan"
            >
              <div className="flex-shrink-0 h-16 w-16 rounded-xl flex items-center justify-center bg-cyan/10 border border-cyan/20 transition-all duration-300 group-hover:bg-cyan/15 group-hover:shadow-glow-cyan">
                <img src={icon} alt="" aria-hidden="true" className="h-10 w-10 object-contain" />
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
