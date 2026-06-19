import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Timer, WifiOff, HardDrive, BrainCircuit, Cpu, Target, Globe, Shield, Eye, Hexagon, ArrowRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';

// TODO-CONTENT: placeholder leadership names, bios, and founding milestones —
// replace with real company information before production launch.

const MISMATCHES = [
  {
    icon: Timer,
    title: 'Round-Trip Latency',
    body: 'Every decision routed through the cloud adds 80–400 ms of overhead. In a fast-moving assembly line or safety-critical process, that window is the difference between a caught fault and unplanned downtime.',
  },
  {
    icon: WifiOff,
    title: 'Connectivity Dependency',
    body: 'Remote sites — mines, offshore rigs, cellular-dead factory floors — operate with intermittent or metered uplink. Cloud-dependent inference stops working the moment the link drops.',
  },
  {
    icon: HardDrive,
    title: 'Unconstrained Bandwidth Cost',
    body: 'Streaming raw sensor telemetry at scale generates terabytes per day. The ingestion and storage bill grows proportionally with your device estate, whether or not the cloud made a useful decision.',
  },
  {
    icon: BrainCircuit,
    title: 'No Device-Level Intelligence',
    body: 'Traditional SCADA and PLC systems are deterministic rule-engines — they execute what they were programmed to do. They cannot learn from operational patterns, detect novel anomalies, or adapt to changing conditions without manual re-engineering.',
  },
];

const MILESTONES = [
  { year: '2021', title: 'Company Founded', description: 'Device-Nova was incorporated in San Francisco by a team of embedded systems and distributed computing engineers who had spent the previous decade deploying industrial IoT systems and watching cloud-only architectures fail in real production environments.' },
  { year: '2022', title: 'First Pilot Deployment', description: 'The platform was deployed in a tier-1 automotive manufacturing plant for real-time anomaly detection on robotic assembly arms — the first production validation of the edge inference engine outside a lab environment.' },
  { year: '2023', title: 'Platform v1 Launch', description: 'General availability of the Device-Nova edge intelligence platform, including the inference engine, device orchestration layer, and edge-to-cloud sync, with support for NVIDIA Jetson and ARM Cortex-M class hardware.' },
  { year: '2024', title: 'Series A & Fleet Scaling', description: 'Closed a $12M Series A round led by Meridian Venture Partners. The platform scaled to manage fleets exceeding 5,000 devices across three continents in manufacturing, energy, and logistics.' },
  { year: '2025', title: 'Mesh Intelligence Layer', description: 'Released the distributed intelligence mesh enabling coordinated inference across device groups without central cloud orchestration — the architecture the platform was originally designed to deliver.' },
];

const LEADERSHIP = [
  {
    name: 'Alex Voss',
    title: 'Co-Founder & CEO',
    bio: 'Previously led embedded systems at a Fortune 500 industrial automation firm, where he oversaw the deployment of over 50,000 field devices across oil and gas, manufacturing, and utility infrastructure. Background in computer engineering and control theory.',
  },
  {
    name: 'Maya Chen',
    title: 'Co-Founder & CTO',
    bio: 'Architected distributed inference pipelines at a major cloud provider before leaving to build edge-native infrastructure. Published research on on-device model pruning for resource-constrained hardware at ICML and SysML.',
  },
  {
    name: 'David Okonkwo',
    title: 'VP of Engineering',
    bio: 'Led platform engineering for an industrial IoT unicorn from Series A to acquisition, scaling the engineering organization from 8 to 80. Spent the early part of his career designing real-time control systems for power grid infrastructure.',
  },
  {
    name: 'Priya Nair',
    title: 'VP of Industrial Partnerships',
    bio: 'Drove strategic partnerships at a leading SCADA and PLC manufacturer for over a decade. Deep relationships across the automation ecosystem, from sensor OEMs to system integrators managing multi-site industrial rollouts.',
  },
];

const PRINCIPLES = [
  {
    icon: Cpu,
    title: 'Built for the edge, not adapted to it',
    description: 'Device-Nova was architected from the first line of code to run inference on constrained industrial hardware — not a cloud platform retrofitted with an edge agent.',
  },
  {
    icon: Target,
    title: 'Operational reliability over feature breadth',
    description: 'Every release is validated against real plant-floor conditions: intermittent connectivity, legacy protocols, and hardware that has to run for a decade without a reboot.',
  },
  {
    icon: Globe,
    title: 'Vendor-neutral by design',
    description: 'We integrate with the sensors, PLCs, and SCADA systems already on your floor. No forced hardware refresh, no proprietary lock-in.',
  },
  {
    icon: Shield,
    title: 'Data sovereignty first',
    description: 'Your operational telemetry stays on your infrastructure. Cloud sync is opt-in and configurable — never an implicit requirement of the platform.',
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

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Device-Nova"
        title="Industrial intelligence, deployed where decisions happen"
        description="We build the inference layer that lets industrial equipment act on data in milliseconds, not minutes — without depending on a round trip to the cloud."
      />

      {/* Mission / Intro */}
      <section className="bg-surface section-pad border-t border-border">
        <div className="container-base max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-6">The edge inference platform for industrial operations that cannot afford a round trip to the cloud.</h2>
          <p className="text-muted leading-relaxed text-lg mb-4">
            Device-Nova was built to solve a problem that every industrial IoT team eventually hits: cloud-dependent inference architectures work well in demos and fail under production conditions. Latency is too high. Connectivity is too unreliable. The bandwidth cost of streaming raw sensor data to a remote data center scales linearly with your device count — not with the value of the decisions being made.
          </p>
          <p className="text-muted leading-relaxed text-lg">
            Our platform runs AI inference directly on edge hardware — from ARM Cortex-M microcontrollers to NVIDIA Jetson modules — so that a sensor reading becomes an actionable decision within the same control cycle, on the same device, without ever leaving the plant floor. Cloud sync becomes a strategic capability for aggregated analytics and model retraining, not a requirement for real-time operation.
          </p>
        </div>
      </section>

      {/* Why we exist — problem cards (reusing PainPoints pattern) */}
      <section className="bg-void section-pad border-t border-border">
        <div className="container-base">
          <SectionHeader
            eyebrow="The Problem We Solve"
            title="Cloud-only IoT was built for a world where connectivity is free and latency doesn't matter"
            description="Every architecture decision in Device-Nova starts from a single premise: the device is the best place to make an inference decision, because it is the only place where the data originates in real time."
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
            {MISMATCHES.map(({ icon: Icon, title, body }) => (
              <motion.div key={title} variants={cardVariants}>
                <Card className="h-full group relative overflow-hidden">
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

      {/* Company timeline */}
      <section className="bg-surface section-pad border-t border-border">
        <div className="container-base">
          <SectionHeader
            eyebrow="Our History"
            title="From plant-floor problem to platform"
            description="Device-Nova was not incubated in a venture studio. It was written, tested, and rewritten on the factory floor — the only place where the constraints of real industrial inference make themselves known."
          />

          <div className="max-w-3xl mx-auto relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />

            <motion.div
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {MILESTONES.map((m) => (
                <motion.div key={m.year} variants={itemVariants} className="relative pl-14">
                  {/* Numbered node */}
                  <div className="absolute left-0 top-0 h-10 w-10 rounded-full bg-void border border-cyan/30 flex items-center justify-center shadow-glow-cyan">
                    <span className="font-mono text-[0.6rem] tracking-widest2 text-cyan">{m.year}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-primary mb-2">{m.title}</h3>
                    <p className="text-muted leading-relaxed">{m.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership team */}
      <section className="bg-void section-pad border-t border-border">
        <div className="container-base">
          <SectionHeader
            eyebrow="Leadership"
            title="The team that built the runtime"
            description="Engineers and operators who have spent their careers on the industrial side of the technology industry — building systems that have to work the first time, every time, for years."
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {LEADERSHIP.map(({ name, title: role, bio }) => (
              <motion.div key={name} variants={itemVariants} className="h-full">
                <Card className="h-full">
                  <div className="flex items-start gap-5">
                    {/* TODO-ASSET: replace placeholder avatar with real team headshots */}
                    <div className="flex-shrink-0 h-14 w-14 rounded-full bg-cyan/10 border border-cyan/25 flex items-center justify-center overflow-hidden">
                      <span className="font-display text-lg font-semibold text-cyan">
                        {name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold text-primary">{name}</h3>
                      <p className="font-mono text-[0.65rem] tracking-widest2 text-cyan mt-0.5 mb-3">{role}</p>
                      <p className="text-muted text-sm leading-relaxed">{bio}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values / Principles */}
      <section className="bg-surface section-pad border-t border-border">
        <div className="container-base">
          <SectionHeader
            eyebrow="Our Principles"
            title="How we build"
            description="These are not aspirational values painted on a wall. They are engineering constraints that govern every platform decision — from protocol selection to deployment model."
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {PRINCIPLES.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} variants={itemVariants} className="group">
                <Card className="h-full">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center bg-cyan/10 border border-cyan/25 shadow-glow-cyan transition-all duration-300 group-hover:bg-cyan/15 group-hover:shadow-glow-cyan">
                      <Icon size={22} className="text-cyan" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-primary mb-2">{title}</h3>
                      <p className="text-muted leading-relaxed text-sm">{description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-void section-pad border-t border-border">
        <div className="container-base text-center">
          <div className="max-w-xl mx-auto">
            <div className="h-14 w-14 rounded-2xl bg-cyan/10 border border-cyan/25 flex items-center justify-center mx-auto mb-6">
              <Hexagon size={24} className="text-cyan" aria-hidden="true" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Talk to our engineering team
            </h2>
            <p className="text-muted leading-relaxed text-lg mb-8">
              Tell us about your deployment environment — device types, protocol requirements, and the problems you're trying to solve at the edge. We route every inquiry to a solutions engineer who has deployed in similar conditions.
            </p>
            <Button as={Link} to="/contact" variant="primary" size="lg">
              Get in touch
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
