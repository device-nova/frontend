import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import { MapPin, Users, Cpu, Wifi, Hexagon } from 'lucide-react';

// TODO-CONTENT: placeholder role specifics, team names, and location
// details — replace with real open positions and company information
// before the site goes live for recruitment purposes.

const PERKS = [
  { icon: Cpu, text: 'Work on inference at the edge — real distributed systems, not CRUD endpoints.' },
  { icon: Wifi, text: 'Remotely flexible with hubs in San Francisco and Austin for those who want in-person collaboration.' },
  { icon: Users, text: 'Small, deep-technical team. Every engineer talks to customers and reads plant-floor telemetry.' },
];

const OPEN_ROLES = [
  { title: 'Senior Embedded Systems Engineer', team: 'Edge Runtime', location: 'Remote (US/EU)' },
  { title: 'AI Inference Optimization Engineer', team: 'Platform', location: 'Austin, TX' },
  { title: 'Industrial Protocols Engineer (OPC-UA / Modbus)', team: 'Integrations', location: 'Remote' },
  { title: 'Field Deployment Engineer', team: 'Customer Engineering', location: 'Hybrid — Multiple Regions' },
  { title: 'Product Designer, Dashboard & Console', team: 'Design', location: 'Remote' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Careers() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build the runtime that runs the factory floor"
        description="We're a small, deep-technical team working on inference at the edge, distributed systems, and industrial protocol integration."
      />

      {/* Intro / Perks */}
      <section className="bg-surface section-pad -mt-8 border-t border-border">
        <div className="container-base max-w-3xl">
          <p className="text-muted leading-relaxed text-lg mb-8">
            Device-Nova is building the inference layer that lets industrial equipment act on data
            in milliseconds — on the device, at the source, without a cloud round trip. We are a
            team of embedded systems engineers, distributed systems architects, and industrial
            automation veterans who believe that the most important AI inference happens where the
            sensor data originates.
          </p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {PERKS.map(({ icon: Icon, text }) => (
              <motion.div key={text} variants={itemVariants}>
                <Card interactive={false} className="h-full">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-cyan/10 border border-cyan/25 flex items-center justify-center">
                      <Icon size={16} className="text-cyan" aria-hidden="true" />
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{text}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open roles */}
      <section className="bg-void section-pad border-t border-border">
        <div className="container-base max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-cyan/10 border border-cyan/25 flex items-center justify-center">
              <Hexagon size={18} className="text-cyan" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Open roles</h2>
              <p className="text-sm text-muted">{OPEN_ROLES.length} position{OPEN_ROLES.length === 1 ? '' : 's'} currently available</p>
            </div>
          </div>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {OPEN_ROLES.map((role) => (
              <motion.div key={role.title} variants={itemVariants}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface border border-border rounded-2xl p-6 transition-all duration-300 hover:border-hover hover:-translate-y-1">
                  <div>
                    <h2 className="font-display text-lg font-semibold">{role.title}</h2>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge tone="neutral">{role.team}</Badge>
                      <span className="flex items-center gap-1.5 text-sm text-muted">
                        <MapPin size={14} aria-hidden="true" />
                        {role.location}
                      </span>
                    </div>
                  </div>
                  <Button as="a" href="/contact" variant="secondary" size="md">
                    Apply now
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 p-6 rounded-2xl border border-border/40 bg-surface-raised/50">
            <p className="text-sm text-muted leading-relaxed">
              <span className="text-primary font-medium">Don't see the right fit?</span> We're always
              interested in talking to engineers and operators who understand industrial systems.
              Send a general application via our{' '}
              <a href="/contact" className="text-cyan hover:text-cyan-deep transition-colors duration-300">
                contact page
              </a>{' '}
              and tell us what you'd bring to the team.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
