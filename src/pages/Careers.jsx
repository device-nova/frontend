import PageHeader from '../components/ui/PageHeader.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import { MapPin } from 'lucide-react';

const OPEN_ROLES = [
  { title: 'Senior Embedded Systems Engineer', team: 'Edge Runtime', location: 'Remote (US/EU)' },
  { title: 'AI Inference Optimization Engineer', team: 'Platform', location: 'Austin, TX' },
  { title: 'Industrial Protocols Engineer (OPC-UA / Modbus)', team: 'Integrations', location: 'Remote' },
  { title: 'Field Deployment Engineer', team: 'Customer Engineering', location: 'Hybrid — Multiple Regions' },
  { title: 'Product Designer, Dashboard & Console', team: 'Design', location: 'Remote' },
];

export default function Careers() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build the runtime that runs the factory floor"
        description="We're a small, deep-technical team working on inference at the edge, distributed systems, and industrial protocol integration."
      />

      <section className="container-base pb-24 max-w-3xl">
        <div className="space-y-4">
          {OPEN_ROLES.map((role) => (
            <div
              key={role.title}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface border border-border rounded-2xl p-6 transition-all duration-300 hover:border-hover hover:-translate-y-1"
            >
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
                View Role
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-muted text-sm">
          Don't see a fit but think you should be on the team anyway? Reach out via our{' '}
          <a href="/contact" className="text-cyan hover:text-cyan-deep transition-colors duration-300">
            contact page
          </a>
          .
        </p>
      </section>
    </>
  );
}
