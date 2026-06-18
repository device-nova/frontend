import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';

export default function FinalCTA() {
  return (
    <section id="final-cta" className="bg-surface section-pad relative overflow-hidden">
      {/* Background glow orb */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,217,255,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(var(--border-default) 1px, transparent 1px), linear-gradient(90deg, var(--border-default) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-base relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Badge tone="cyan" className="mb-6 mx-auto">
            Get Started
          </Badge>

          <h2 className="font-display text-4xl md:text-6xl font-semibold text-primary leading-[1.05] tracking-tight">
            Move AI inference to the device. Eliminate the round trip.
          </h2>

          <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl mx-auto">
            Schedule a technical demo with a Device-Nova engineer. We will walk through
            a live deployment on hardware matching your current device profile.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Button
              as="a"
              href="/contact"
              variant="primary"
              size="lg"
            >
              Request Demo
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button
              as="a"
              href="/docs"
              variant="secondary"
              size="lg"
            >
              View Documentation
              <ChevronRight size={18} aria-hidden="true" />
            </Button>
          </div>

          <p className="mt-8 font-mono text-xs text-muted tracking-wide">
            No commitment required. Deployable in your environment within 48 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
