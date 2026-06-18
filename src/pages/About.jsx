import PageHeader from '../components/ui/PageHeader.jsx';
import { Target, Cpu, Globe } from 'lucide-react';

const PRINCIPLES = [
  {
    icon: Cpu,
    title: 'Built for the edge, not adapted to it',
    description:
      'Device-Nova was architected from the first line of code to run inference on constrained industrial hardware — not a cloud platform retrofitted with an edge agent.',
  },
  {
    icon: Target,
    title: 'Operational reliability over feature breadth',
    description:
      'Every release is validated against real plant-floor conditions: intermittent connectivity, legacy protocols, and hardware that has to run for a decade without a reboot.',
  },
  {
    icon: Globe,
    title: 'Vendor-neutral by design',
    description:
      'We integrate with the sensors, PLCs, and SCADA systems already on your floor. No forced hardware refresh, no proprietary lock-in.',
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Device-Nova"
        title="Industrial intelligence, deployed where decisions happen"
        description="We build the inference layer that lets industrial equipment act on data in milliseconds, not minutes — without depending on a round trip to the cloud."
      />

      <section className="container-base pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="bg-surface border border-border rounded-2xl p-8">
              <div className="h-12 w-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-6">
                <p.icon size={22} className="text-cyan" aria-hidden="true" />
              </div>
              <h2 className="font-display text-xl font-semibold mb-3">{p.title}</h2>
              <p className="text-muted leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface border-t border-border">
        <div className="container-base py-24 max-w-3xl">
          <h2 className="font-display text-3xl font-semibold mb-6">Where we operate</h2>
          <p className="text-muted leading-relaxed text-lg">
            Device-Nova is deployed across manufacturing lines, energy grids, logistics fleets, and
            municipal infrastructure where latency and connectivity constraints make cloud-only AI
            impractical. Our engineering and field teams work directly with plant automation groups
            during rollout, from protocol mapping through model deployment.
          </p>
        </div>
      </section>
    </>
  );
}
