import { Link } from 'react-router-dom';
import { RadioTower } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

export default function NotFound() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="container-base min-h-[80vh] flex flex-col items-center justify-center text-center pt-20">
      <div className="relative h-32 w-32 mb-10 flex items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full border-2 border-amber/40 ${
            reducedMotion ? '' : 'animate-pulse-glow'
          }`}
        />
        <div className="absolute inset-4 rounded-full border border-amber/30" />
        <RadioTower size={36} className="text-amber relative z-10" aria-hidden="true" />
      </div>

      <p className="mono-label text-amber text-xs mb-4">Status: signal lost</p>
      <h1 className="font-display text-5xl md:text-6xl font-semibold mb-4">404</h1>
      <p className="text-muted text-lg max-w-md mb-10 leading-relaxed">
        This node isn't reporting back. The page you're looking for may have moved, been
        decommissioned, or never existed on this network.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button as={Link} to="/" variant="primary" size="md">
          Return to base
        </Button>
        <Button as={Link} to="/contact" variant="secondary" size="md">
          Contact Support
        </Button>
      </div>
    </div>
  );
}
