import Badge from '../ui/Badge.jsx';

export default function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="container-base pt-40 pb-16 text-center">
      {eyebrow && (
        <div className="flex justify-center mb-6">
          <Badge tone="cyan">{eyebrow}</Badge>
        </div>
      )}
      <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
      {description && (
        <p className="mt-5 text-lg text-muted leading-relaxed max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
