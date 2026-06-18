/**
 * Mono-font badge used for section eyebrows, status indicators
 * ("Powered by NVIDIA SDK"), and pricing tier flags.
 * tone="amber" is reserved for alerts/live-status per brand rules —
 * never use amber for plain decoration.
 */
const TONES = {
  cyan: 'text-cyan border-cyan/30 bg-cyan/5',
  amber: 'text-amber border-amber/30 bg-amber/5',
  neutral: 'text-muted border-border bg-surface-raised',
  success: 'text-success border-success/30 bg-success/5',
};

export default function Badge({ children, tone = 'cyan', className = '', dot = false }) {
  return (
    <span
      className={`mono-label inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-[0.7rem] ${TONES[tone]} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            tone === 'amber' ? 'bg-amber animate-pulse-glow' : tone === 'success' ? 'bg-success' : 'bg-cyan'
          }`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
