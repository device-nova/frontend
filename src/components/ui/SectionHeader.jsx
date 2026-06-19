import Badge from './Badge.jsx';

export default function SectionHeader({
  eyebrow,
  title,
  description,
  tone = 'cyan',
  badgeDot = false,
  className = '',
}) {
  return (
    <div className={`mb-14 text-center mx-auto max-w-2xl ${className}`}>
      {eyebrow && (
        <Badge tone={tone} dot={badgeDot} className="mb-5">
          {eyebrow}
        </Badge>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
