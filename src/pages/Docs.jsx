import { useState } from 'react';
import { FileCode2, Bell } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Badge from '../components/ui/Badge.jsx';

export default function Docs() {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);

  function handleNotify(e) {
    e.preventDefault();
    // TODO-ASSET: wire this up to a real notification/email-capture endpoint.
    setNotified(true);
  }

  return (
    <div className="container-base pt-40 pb-32 min-h-[65vh] flex flex-col items-center text-center">
      <div className="h-16 w-16 rounded-2xl bg-cyan/10 border border-cyan/25 flex items-center justify-center mb-6">
        <FileCode2 size={28} className="text-cyan" aria-hidden="true" />
      </div>

      <Badge tone="neutral" className="mb-6">Coming Soon</Badge>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
        Developer API & SDK Documentation
      </h1>

      <p className="text-muted text-lg max-w-lg mx-auto leading-relaxed mb-2">
        API reference, SDK guides, and integration documentation for the Device-Nova edge runtime
        are in active development.
      </p>

      <p className="text-muted max-w-md mx-auto leading-relaxed mb-10">
        The documentation will cover model deployment, protocol integration, device provisioning,
        the inference API, and the edge-to-cloud sync framework.
      </p>

      {notified ? (
        <div className="flex items-center gap-3 bg-cyan/5 border border-cyan/20 rounded-xl px-6 py-4">
          <Bell size={18} className="text-cyan" aria-hidden="true" />
          <p className="text-sm text-muted">
            You'll be notified when the documentation is published.
          </p>
        </div>
      ) : (
        <form onSubmit={handleNotify} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full max-w-md">
          <div className="flex-1 w-full">
            <Input
              id="docs-email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Work email for documentation notification"
            />
          </div>
          <Button type="submit" variant="primary" size="md">
            Notify me
          </Button>
        </form>
      )}

      <div className="mt-20 pt-10 border-t border-border/40 max-w-xl">
        <p className="text-sm text-muted leading-relaxed">
          Need early technical access for an active evaluation?{' '}
          <a href="/contact" className="text-cyan hover:text-cyan-deep transition-colors duration-300">
            Contact our solutions engineering team
          </a>{' '}
          for pre-release documentation and SDK access under NDA.
        </p>
      </div>
    </div>
  );
}
