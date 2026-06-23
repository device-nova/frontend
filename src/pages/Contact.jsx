import { useForm, ValidationError } from '@formspree/react';
import PageHeader from '../components/ui/PageHeader.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import { CheckCircle2, Mail, Clock, MapPin, Building2 } from 'lucide-react';

const EVALUATION_OPTIONS = [
  { value: '', label: 'Select an option…' },
  { value: 'pilot', label: 'Pilot Deployment' },
  { value: 'enterprise', label: 'Enterprise Contract' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'press', label: 'Press / Media' },
  { value: 'other', label: 'Other' },
];

export default function Contact() {
  const [state, handleSubmit] = useForm('xaqgnwrd');

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to our solutions engineering team"
        description="Tell us about your environment — device count, protocols in use, and what you're trying to solve — and we'll route you to the right engineer."
      />

      {state.succeeded ? (
        <section className="container-base pb-32 max-w-xl">
          <div className="bg-surface border border-border rounded-2xl p-10 text-center">
            <CheckCircle2 size={40} className="text-success mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold mb-2">Message received</h2>
            <p className="text-muted">A member of our solutions engineering team will respond within one business day.</p>
          </div>
        </section>
      ) : (
        <section className="container-base pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form — left column */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input id="firstName" name="firstName" label="First name" required autoComplete="given-name" />
                  <Input id="lastName" name="lastName" label="Last name" required autoComplete="family-name" />
                </div>
                <Input id="email" name="email" type="email" label="Work email" required autoComplete="email" />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
                <Input id="company" name="company" label="Company" required autoComplete="organization" />

                {/* Dropdown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="evaluation" className="text-sm text-muted font-body">
                    What are you evaluating?
                  </label>
                  <select
                    id="evaluation"
                    name="evaluation"
                    className="h-11 bg-surface-raised border border-border rounded-md px-4 text-primary outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan focus:border-cyan appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237e8ca0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                    }}
                  >
                    {EVALUATION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-muted font-body">
                    Tell us about your deployment
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="bg-surface-raised border border-border rounded-md px-4 py-3 text-primary outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan focus:border-cyan resize-none"
                    placeholder="Device types, approximate device count, protocols in use, and the problem you're looking to solve…"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={state.submitting}>
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Company details — right column */}
            <div className="lg:col-span-2 space-y-6">
              <Card interactive={false}>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-cyan/10 border border-cyan/25 flex items-center justify-center">
                      <Building2 size={18} className="text-cyan" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-primary mb-1">Office</h3>
                      <p className="text-sm text-muted leading-relaxed">
                        548 Market St, San Francisco, CA 94104, USA<br />
                        +1 (415) 628-7412
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-cyan/10 border border-cyan/25 flex items-center justify-center">
                      <Mail size={18} className="text-cyan" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-primary mb-1">Email</h3>
                      <p className="text-sm text-muted">
                        General inquiries:{' '}
                        <a href="mailto:hello@device-nova.com" className="text-cyan hover:text-cyan-deep transition-colors duration-300">
                          hello@device-nova.com
                        </a>
                      </p>
                      <p className="text-sm text-muted mt-1">
                        Sales:{' '}
                        <a href="mailto:sales@device-nova.com" className="text-cyan hover:text-cyan-deep transition-colors duration-300">
                          sales@device-nova.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-cyan/10 border border-cyan/25 flex items-center justify-center">
                      <Clock size={18} className="text-cyan" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-primary mb-1">Business hours</h3>
                      <p className="text-sm text-muted">
                        Monday – Friday, 9:00 AM – 6:00 PM PT
                      </p>
                      <p className="text-sm text-muted mt-1">
                        Engineering on-call: 24/7 for active enterprise deployments
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social links */}
                <div className="mt-6 pt-6 border-t border-border/40">
                  <p className="font-mono text-[0.6rem] tracking-widest3 text-muted/50 mb-3 uppercase">Follow us</p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://linkedin.com"
                      aria-label="Device-Nova on LinkedIn"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 text-muted hover:text-cyan hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://x.com"
                      aria-label="Device-Nova on X"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 text-muted hover:text-cyan hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href="https://youtube.com"
                      aria-label="Device-Nova on YouTube"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 text-muted hover:text-cyan hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </Card>

              <div className="rounded-2xl overflow-hidden border border-border">
                <iframe
                  title="Device-Nova office location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0193430745957!2d-122.39843868468147!3d37.79117047975678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858062c6b45b5f%3A0x82a5d3edd6d95a0b!2s548%20Market%20St%2C%20San%20Francisco%2C%20CA%2094104!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.5)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block"
                />
              </div>
            </div>
          </div>

          {/* Support routing note */}
          <div className="mt-10 max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted leading-relaxed">
              <span className="text-cyan font-medium">For existing deployments:</span> If you are an active Device-Nova customer
              with a technical support issue, please email{' '}
              <a href="mailto:support@device-nova.com" className="text-cyan hover:text-cyan-deep transition-colors duration-300">
                support@device-nova.com
              </a>{' '}
              directly for the fastest routing to our engineering on-call team. The form above is best for new inquiries,
              partnership discussions, and general questions.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
