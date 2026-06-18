import PageHeader from '../components/ui/PageHeader.jsx';

const SECTIONS = [
  {
    title: 'Agreement to terms',
    body: 'Use of the Device-Nova platform, dashboard, and associated services is governed by these terms and any executed enterprise agreement between your organization and Device-Nova, Inc. Where the two conflict, the enterprise agreement controls.',
  },
  {
    title: 'License and scope',
    body: 'Device-Nova grants a non-exclusive, non-transferable license to deploy the platform on the device count and infrastructure specified in your order form. Reverse engineering of the edge runtime binary is prohibited.',
  },
  {
    title: 'Service availability',
    body: 'Cloud-sync and dashboard services are covered by the uptime commitments in your service tier. The edge inference runtime is designed to operate independently of cloud connectivity and is not subject to cloud-side uptime terms.',
  },
  {
    title: 'Liability',
    body: 'Device-Nova is infrastructure software used in industrial environments. Customers are responsible for validating model outputs and decision thresholds against their own safety and compliance requirements before relying on automated actions.',
  },
  {
    title: 'Changes to these terms',
    body: 'We will provide notice of material changes to these terms at least 30 days in advance for active enterprise customers.',
  },
];

export default function Terms() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" description="Last updated June 2026." />
      <section className="container-base pb-32 max-w-2xl space-y-10">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl font-semibold mb-3">{s.title}</h2>
            <p className="text-muted leading-relaxed">{s.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
