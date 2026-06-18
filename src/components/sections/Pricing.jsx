import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 199,
    annualPrice: 159,
    unit: '/ device / mo',
    description:
      'For pilot programs and proof-of-concept deployments up to 25 devices.',
    cta: 'Start Free Trial',
    ctaVariant: 'secondary',
    ctaHref: '/contact',
    features: [
      'Up to 25 edge devices',
      'Edge AI inference engine',
      'Device health monitoring',
      'Predictive maintenance alerts',
      'Standard support (email)',
      'REST API access',
      '90-day data retention',
    ],
    highlighted: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 499,
    annualPrice: 399,
    unit: '/ device / mo',
    description:
      'For production deployments across multi-site industrial operations.',
    cta: 'Request Demo',
    ctaVariant: 'primary',
    ctaHref: '/contact',
    features: [
      'Up to 500 edge devices',
      'Everything in Starter',
      'Fleet orchestration layer',
      'Edge-to-cloud sync',
      'Custom model deployment',
      'Digital twin integration',
      'Priority support (SLA 4 h)',
      '2-year data retention',
      'SSO / SAML',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    unit: '',
    description:
      'For enterprise-scale deployments with custom SLAs, on-premise options, and dedicated engineering support.',
    cta: 'Contact Sales',
    ctaVariant: 'secondary',
    ctaHref: '/contact',
    features: [
      'Unlimited edge devices',
      'Everything in Professional',
      'On-premise deployment option',
      'Custom AI model training',
      'Dedicated infrastructure',
      'White-label available',
      'Dedicated CSM + engineer',
      '24/7 phone support',
      'Custom data retention',
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-surface section-pad">
      <div className="container-base">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <Badge tone="cyan" className="mb-5">
            Pricing
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary leading-tight">
            Per-device pricing that scales with your deployment
          </h2>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            No upfront infrastructure costs. Pricing is based on connected device count,
            billed monthly or annually.
          </p>

          {/* Annual / Monthly toggle */}
          <div className="inline-flex items-center gap-3 mt-8 rounded-lg border border-border bg-void p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-md px-4 py-2 font-mono text-xs tracking-widest2 uppercase transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan ${
                !annual ? 'bg-surface text-primary shadow-elevation' : 'text-muted'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-md px-4 py-2 font-mono text-xs tracking-widest2 uppercase transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan ${
                annual ? 'bg-surface text-primary shadow-elevation' : 'text-muted'
              }`}
            >
              Annual
              <span className="ml-2 font-mono text-[0.6rem] text-success">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              layout
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300
                ${tier.highlighted
                  ? 'border-cyan/50 bg-void shadow-glow-cyan scale-[1.03] z-10'
                  : 'border-border bg-void opacity-90 hover:opacity-100 hover:border-hover hover:shadow-glow-cyan hover:-translate-y-1'
                }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge tone="cyan" className="text-[0.65rem]">{tier.badge}</Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold text-primary">{tier.name}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{tier.description}</p>
              </div>

              <div className="mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={annual ? 'annual' : 'monthly'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-end gap-2"
                  >
                    {tier.monthlyPrice !== null ? (
                      <>
                        <span className="font-display text-4xl font-bold text-primary">
                          ${annual ? tier.annualPrice : tier.monthlyPrice}
                        </span>
                        <span className="font-mono text-xs text-muted mb-1.5 tracking-wide">
                          {tier.unit}
                        </span>
                      </>
                    ) : (
                      <span className="font-display text-3xl font-semibold text-primary">
                        Custom pricing
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={15}
                      className={`flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-cyan' : 'text-muted'}`}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-muted leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                as="a"
                href={tier.ctaHref}
                variant={tier.ctaVariant}
                size="md"
                className="w-full justify-center"
              >
                {tier.cta}
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="text-center font-mono text-xs text-muted mt-10 tracking-wide">
          All plans include 14-day free trial. No credit card required for Starter.
          Enterprise contracts available with multi-year terms.
        </p>
      </div>
    </section>
  );
}
