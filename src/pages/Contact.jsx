import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import { CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO-ASSET: wire this up to the real lead-capture endpoint / CRM.
    setSubmitted(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to our solutions team"
        description="Tell us about your environment — device count, protocols in use, and what you're trying to solve — and we'll route you to the right engineer."
      />

      <section className="container-base pb-32 max-w-xl">
        {submitted ? (
          <div className="bg-surface border border-border rounded-2xl p-10 text-center">
            <CheckCircle2 size={40} className="text-success mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold mb-2">Message received</h2>
            <p className="text-muted">A member of our solutions team will respond within one business day.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input id="firstName" label="First name" required autoComplete="given-name" />
              <Input id="lastName" label="Last name" required autoComplete="family-name" />
            </div>
            <Input id="email" type="email" label="Work email" required autoComplete="email" />
            <Input id="company" label="Company" required autoComplete="organization" />
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm text-muted font-body">
                What are you looking to solve?
              </label>
              <textarea
                id="message"
                rows={4}
                required
                className="bg-surface-raised border border-border rounded-md px-4 py-3 text-primary outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan focus:border-cyan resize-none"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Send Message
            </Button>
          </form>
        )}
      </section>
    </>
  );
}
