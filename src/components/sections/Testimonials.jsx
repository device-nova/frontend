import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Badge from '../ui/Badge.jsx';

// Clearly fictional testimonials for placeholder purposes.
// TODO-ASSET: Replace with real customer quotes and company names before launch.
const TESTIMONIALS = [
  {
    quote:
      "We evaluated three edge inference platforms before selecting Device-Nova. The others required either constant cloud connectivity or significant firmware modification. Device-Nova deployed on our existing Siemens S7 gateway hardware with a two-day integration cycle.",
    name: 'Marcus Holm',
    title: 'VP of Operations',
    company: 'Nordic Industrial Group',
    initials: 'MH',
  },
  {
    quote:
      "Predictive maintenance at our offshore compressor stations was previously impossible without expensive satellite uplink. Device-Nova runs the anomaly detection model locally — latency under 3 ms — and syncs only the alert summary when connectivity is available.",
    name: 'Priya Venkataraman',
    title: 'Plant Automation Lead',
    company: 'Helios Energy Solutions',
    initials: 'PV',
  },
  {
    quote:
      "Our AI team had been blocked on the edge deployment problem for 18 months — the inference stack simply couldn't fit the target hardware envelope. Device-Nova's NVIDIA-optimized runtime gave us a 4× reduction in model footprint with equivalent accuracy.",
    name: 'James Okoro',
    title: 'Director of AI Engineering',
    company: 'Apex Manufacturing Systems',
    initials: 'JO',
  },
  {
    quote:
      "The Fleet Intelligence module cut our predictive maintenance false-positive rate by 60 percent in the first quarter. More importantly, it surfaces confidence scores alongside every alert — our maintenance teams trust the data because they can see why a flag was raised.",
    name: 'Sandra Leclerc',
    title: 'Systems Architect',
    company: 'Continental Logistics Group',
    initials: 'SL',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-void section-pad">
      <div className="container-base">
        <div className="mb-14 max-w-2xl">
          <Badge tone="cyan" className="mb-5">
            Customer Perspectives
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary leading-tight">
            Deployed in production industrial environments
          </h2>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            Device-Nova is not a proof-of-concept platform. These accounts reflect live
            deployments operating under production load.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={cardVariants}>
              {/* Glass-morphism card treatment */}
              <div className="relative h-full rounded-2xl border border-border backdrop-blur-xl bg-surface/40 p-8 flex flex-col gap-6 transition-all duration-300 hover:border-hover hover:shadow-glow-cyan hover:-translate-y-1">
                <Quote
                  size={28}
                  className="text-cyan/30 flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="text-primary leading-relaxed flex-1 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-cyan/10 border border-cyan/25 flex-shrink-0">
                    <span className="font-mono text-xs font-semibold text-cyan" aria-hidden="true">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-primary">{t.name}</p>
                    <p className="font-mono text-[0.65rem] tracking-wide text-muted">
                      {t.title} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
