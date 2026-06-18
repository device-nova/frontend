import PageHeader from '../components/ui/PageHeader.jsx';

const SECTIONS = [
  {
    title: 'Data we collect',
    body: 'When you request a demo or contact our team, we collect the information you provide directly: name, company, email, and the details of your inquiry. Our platform, when deployed, processes operational telemetry from edge devices under terms set out in your service agreement — this data is not used for any purpose outside the scope of that agreement.',
  },
  {
    title: 'How we use it',
    body: 'Contact information is used solely to respond to inquiries and route demo requests to the appropriate solutions engineer. We do not sell or share contact data with third parties for marketing purposes.',
  },
  {
    title: 'Device and telemetry data',
    body: 'Device-Nova is designed for on-premises and edge-local processing. Telemetry that leaves a customer environment for cloud sync is governed by the data handling terms in the applicable enterprise agreement, including retention period and encryption standards.',
  },
  {
    title: 'Security',
    body: 'We apply industry-standard encryption in transit and at rest, role-based access control across our internal systems, and routine third-party security review of our infrastructure.',
  },
  {
    title: 'Contact',
    body: 'Questions about this policy can be directed to our team via the contact page.',
  },
];

export default function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated June 2026." />
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
