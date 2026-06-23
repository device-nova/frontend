import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader.jsx';
import Badge from '../components/ui/Badge.jsx';
import Card from '../components/ui/Card.jsx';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function Product() {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient animated background */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 15%, rgba(0,217,255,0.12) 0%, transparent 65%)',
        }}
      />

      <PageHeader
        eyebrow="Product"
        title="Nova Core — Coming Soon"
        description="A dedicated product landing page is under development. Key capabilities, architecture, and deployment workflows will be available here."
      />

      <section className="container-base pb-32">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <Badge tone="neutral" className="mb-6">Under Development</Badge>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary leading-tight">
            What you’ll find on this page
          </h2>
          <p className="mt-4 text-muted leading-relaxed text-lg">
            We’re building an overview of the Nova Core platform: edge inference runtime, device orchestration, and the edge-to-cloud sync model.
          </p>

          <div className="flex justify-center mt-8">
            <a
              href="https://app.device-nova.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan bg-gradient-primary text-void font-medium shadow-glow-cyan hover:shadow-glow-cyan hover:-translate-y-1 px-8 py-4 text-base"
            >
              GO TO DASHBOARD
            </a>
          </div>
        </div>


        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={cardVariants}>
            <Card>
              <div className="h-12 w-12 rounded-xl bg-cyan/10 border border-cyan/25 flex items-center justify-center mb-5">
                <span className="font-display text-cyan text-lg" aria-hidden="true">01</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-primary mb-2">Edge Inference</h3>
              <p className="text-muted text-sm leading-relaxed">
                Real-time AI inference designed to run directly on constrained industrial hardware.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card>
              <div className="h-12 w-12 rounded-xl bg-cyan/10 border border-cyan/25 flex items-center justify-center mb-5">
                <span className="font-display text-cyan text-lg" aria-hidden="true">02</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-primary mb-2">Device Orchestration</h3>
              <p className="text-muted text-sm leading-relaxed">
                Fleet provisioning, model lifecycle, and reliable execution in production environments.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card>
              <div className="h-12 w-12 rounded-xl bg-cyan/10 border border-cyan/25 flex items-center justify-center mb-5">
                <span className="font-display text-cyan text-lg" aria-hidden="true">03</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-primary mb-2">Edge-to-Cloud Sync</h3>
              <p className="text-muted text-sm leading-relaxed">
                Optional sync for aggregated analytics and retraining workflows—without blocking on-device inference.
              </p>
            </Card>
          </motion.div>
        </motion.div>


      </section>
    </div>
  );
}

