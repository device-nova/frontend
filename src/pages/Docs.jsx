import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import { FileCode2 } from 'lucide-react';

export default function Docs() {
  return (
    <div className="container-base pt-40 pb-32 flex flex-col items-center text-center min-h-[60vh] justify-center">
      <div className="h-16 w-16 rounded-2xl bg-cyan/10 flex items-center justify-center mb-8">
        <FileCode2 size={28} className="text-cyan" aria-hidden="true" />
      </div>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
        Developer API / Docs
      </h1>
      <p className="text-muted text-lg max-w-md mb-2">Coming soon.</p>
      <p className="text-muted max-w-md leading-relaxed">
        API reference, SDK guides, and integration documentation for the Device-Nova edge runtime
        are in progress. Contact our solutions team for early technical access.
      </p>
      <Button as="a" href="/contact" variant="secondary" size="md" className="mt-8">
        Request Early Access
      </Button>
    </div>
  );
}
