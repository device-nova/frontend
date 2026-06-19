import { useEffect, useState } from 'react';
import PageHeader from '../components/ui/PageHeader.jsx';

// TODO-CONTENT: placeholder terms of service — must be reviewed by
// qualified legal counsel before the site or platform goes live.
// This draft addresses common B2B SaaS/IoT contracting concerns
// but is not a substitute for professional legal advice.

const SECTIONS = [
  {
    id: 'agreement',
    title: 'Agreement to terms',
    content: (
      <>
        <p>
          These Terms of Service ("Terms") govern access to and use of the Device-Nova website, cloud
          dashboard, and associated services (collectively, the "Services"), as well as the
          Device-Nova edge intelligence runtime software ("Edge Runtime"). By accessing or using the
          Services, you agree to be bound by these Terms. If you are entering into these Terms on
          behalf of an organization, you represent that you have the authority to bind that
          organization.
        </p>
        <p>
          Where an executed Enterprise Agreement exists between your organization and Device-Nova,
          Inc. ("Device-Nova," "we," "our," or "us"), the terms of that agreement take precedence
          over these Terms in the event of a conflict regarding the use of the Platform in a
          production deployment.
        </p>
      </>
    ),
  },
  {
    id: 'license',
    title: 'License and usage rights',
    subsections: [
      {
        title: 'Evaluation license',
        content:
          'Device-Nova grants you a non-exclusive, non-transferable, time-limited license to use the Edge Runtime and cloud dashboard for internal evaluation purposes. This license does not permit production deployment, commercial use, or benchmarking disclosed to third parties without prior written consent.',
      },
      {
        title: 'Production license',
        content:
          'Production deployment is governed by a separate Enterprise Agreement that specifies device count, term, support tier, and applicable fees. The Edge Runtime binary may not be reverse-engineered, decompiled, or disassembled. Model artifacts you deploy remain your intellectual property.',
      },
      {
        title: 'Restrictions',
        content:
          'You may not: (a) resell, sublicense, or distribute the Edge Runtime or dashboard access to third parties without a written agreement permitting such distribution; (b) use the Services to develop a competing product; (c) exceed the device count or usage limits specified in your order form; or (d) remove or alter any proprietary notice on the Edge Runtime.',
      },
    ],
  },
  {
    id: 'accounts',
    title: 'Account responsibilities',
    content: (
      <>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for
          all activity that occurs under your account. You must notify Device-Nova immediately of any
          unauthorized access or security incident affecting your account or deployment. Device-Nova
          is not liable for losses resulting from unauthorized use of your account where such use
          resulted from your failure to maintain adequate security controls.
        </p>
      </>
    ),
  },
  {
    id: 'availability',
    title: 'Service availability and uptime',
    content: (
      <>
        <p>
          Cloud dashboard and sync services are provided subject to the uptime commitments in the
          applicable service tier, as defined in your Enterprise Agreement. The Edge Runtime is
          designed to operate independently of cloud connectivity. Cloud-side outages do not affect
          on-device inference, alerting, or control logic executing at the edge.
        </p>
        <p>
          Device-Nova will use commercially reasonable efforts to minimize downtime of the cloud
          dashboard and sync services. Scheduled maintenance will be communicated with reasonable
          advance notice via the dashboard or email.
        </p>
      </>
    ),
  },
  {
    id: 'data',
    title: 'Data ownership and processing',
    content: (
      <>
        <p>
          Your organization retains full ownership of all operational telemetry, sensor data, model
          inputs and outputs, and any derived insights processed by the Edge Runtime ("Customer
          Data"). Device-Nova claims no intellectual property rights over Customer Data.
        </p>
        <p>
          Device-Nova processes Customer Data solely to provide the Services, as described in the
          applicable Enterprise Agreement and Data Processing Addendum. We do not use Customer Data
          for model training, product improvement, or any purpose outside the scope of the
          agreement without your explicit consent.
        </p>
        <p>
          Aggregated, de-identified statistics derived from Platform usage (e.g., average inference
          latency, model performance benchmarks) may be used for product documentation and
          marketing, provided that such statistics cannot be reverse-engineered to identify your
          organization or specific deployment.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    content: (
      <>
        <p>
          Device-Nova is infrastructure software deployed in industrial environments where failure
          can result in property damage, production loss, or personal injury. You are responsible
          for validating model outputs, decision thresholds, and fail-safe mechanisms against your
          own safety and compliance requirements before relying on automated actions in any
          safety-critical context.
        </p>
        <p>
          To the maximum extent permitted by applicable law, Device-Nova's total liability for any
          claims arising from or related to the Services is limited to the fees paid by you during
          the twelve months preceding the event giving rise to the claim. In no event shall
          Device-Nova be liable for indirect, incidental, consequential, or punitive damages,
          including lost profits, production downtime, or data loss.
        </p>
        <p>
          Nothing in these Terms excludes or limits liability for fraud, death or personal injury
          caused by negligence, or any other liability that cannot be excluded or limited under
          applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    content: (
      <>
        <p>
          You agree to indemnify and hold Device-Nova harmless from any claims, damages, losses, and
          expenses (including reasonable legal fees) arising from: (a) your use of the Services in
          violation of these Terms; (b) your violation of applicable law; or (c) any dispute
          between you and a third party arising from your deployment of the Edge Runtime.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    title: 'Term and termination',
    content: (
      <>
        <p>
          For evaluation licenses, these Terms terminate automatically at the end of the evaluation
          period. For production deployments, the term is governed by your Enterprise Agreement.
          Device-Nova may suspend or terminate access to the Services immediately if: (a) you
          breach these Terms; (b) your payment is overdue and remains unpaid for 30 days after
          notice; or (c) we are required to do so by law.
        </p>
        <p>
          Upon termination, you must cease all use of the Edge Runtime and destroy all copies in
          your possession. Sections related to liability, data ownership, indemnification, and
          dispute resolution survive termination.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to terms',
    content: (
      <>
        <p>
          We may modify these Terms from time to time. Material changes will be communicated via
          email to the primary account contact and posted on our website at least 30 days before
          the changes take effect. Continued use of the Services after the effective date of the
          modified Terms constitutes acceptance of the changes.
        </p>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    content: (
      <>
        <p>
          These Terms are governed by the laws of the State of California, without regard to its
          conflict of laws principles. The parties submit to the exclusive jurisdiction of the
          state and federal courts located in San Francisco, California for any disputes arising
          from these Terms.
        </p>
      </>
    ),
  },
];

function flattenSections(sections) {
  const result = [];
  sections.forEach((s) => {
    result.push({ id: s.id, title: s.title, depth: 0 });
    if (s.subsections) {
      s.subsections.forEach((sub) => {
        result.push({ id: sub.id || sub.title.toLowerCase().replace(/\s+/g, '-'), title: sub.title, depth: 1 });
      });
    }
  });
  return result;
}

function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

export default function Terms() {
  const flatSections = flattenSections(SECTIONS);
  const sectionIds = flatSections.map((s) => s.id);
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms governing access to the Device-Nova platform, edge runtime, and associated services."
      />
      <p className="container-base text-center mb-12 -mt-6">
        <span className="font-mono text-xs text-muted/60">Last updated June 2026</span>
      </p>

      <section className="container-base pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Table of contents — sticky sidebar */}
          <nav
            className="lg:col-span-1 lg:sticky lg:top-32 lg:self-start"
            aria-label="Table of contents"
          >
            <ul className="space-y-1.5">
              {flatSections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`block text-sm transition-colors duration-300 rounded-sm focus-visible:ring-2 focus-visible:ring-cyan ${
                      s.depth === 1 ? 'pl-4' : ''
                    } ${
                      activeId === s.id
                        ? 'text-cyan font-medium'
                        : 'text-muted hover:text-primary'
                    }`}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content — reading column */}
          <div className="lg:col-span-3 max-w-3xl space-y-10">
            {SECTIONS.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">{section.title}</h2>
                {section.subsections ? (
                  <div className="space-y-6">
                    {section.subsections.map((sub, i) => (
                      <div key={i}>
                        <h3 className="font-display text-lg font-semibold text-primary mb-2">{sub.title}</h3>
                        <p className="text-muted leading-relaxed">{sub.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 text-muted leading-relaxed">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}