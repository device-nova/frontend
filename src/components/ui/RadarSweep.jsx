/**
 * Circular radar-sweep visual: a ring with a rotating gradient sweep line,
 * suggesting active scanning/detection. The rotation is pure CSS
 * (animate-radar-sweep, defined in tailwind.config.js) so it stays
 * performant and is trivially disabled by the reduced-motion media query
 * in global.css — but we also gate it explicitly via the `active` prop
 * so the static fallback can render a completely different (non-rotating)
 * markup when prefers-reduced-motion is set.
 */
export default function RadarSweep({ active = true, size = 160 }) {
  if (!active) {
    return (
      <div
        className="relative flex items-center justify-center rounded-full border-2 border-cyan/30"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <div className="h-2 w-2 rounded-full bg-cyan" />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }} aria-hidden="true">
      <div className="absolute inset-0 rounded-full border border-cyan/20" />
      <div className="absolute inset-3 rounded-full border border-cyan/15" />
      <div className="absolute inset-6 rounded-full border border-cyan/10" />

      {/* Rotating conic-gradient sweep, clipped to a circle */}
      <div
        className="absolute inset-0 rounded-full animate-radar-sweep"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(0,217,255,0) 0deg, rgba(0,217,255,0) 270deg, rgba(0,217,255,0.55) 345deg, rgba(0,217,255,0.9) 360deg)',
          maskImage: 'radial-gradient(circle, transparent 0%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 0%, black 100%)',
        }}
      />

      <div className="h-2.5 w-2.5 rounded-full bg-cyan shadow-glow-cyan relative z-10" />
    </div>
  );
}
