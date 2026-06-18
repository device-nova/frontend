// TODO-ASSET: replace this placeholder icon + wordmark with the final
// Device-Nova brandmark (SVG) once delivered by the client.

export default function Logo({ className = '', showWordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" className="flex-shrink-0">
        <rect width="32" height="32" rx="7" fill="var(--bg-surface-raised)" />
        <circle cx="16" cy="16" r="11" stroke="var(--accent-cyan)" strokeWidth="1.5" fill="none" opacity="0.5" />
        <circle cx="16" cy="16" r="6.5" stroke="var(--accent-cyan)" strokeWidth="1.5" fill="none" opacity="0.85" />
        <circle cx="16" cy="16" r="2.2" fill="var(--accent-cyan)" />
      </svg>
      {showWordmark && (
        <span className="font-display font-semibold text-lg tracking-tight text-primary">
          Device-Nova
        </span>
      )}
    </span>
  );
}
