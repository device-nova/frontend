import Badge from '../ui/Badge.jsx';

export default function PageHeader({ eyebrow, title, description, bgImage }) {
  const content = (
    <div className="container-base pt-40 pb-16 text-center relative z-10">
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

  if (bgImage) {
    return (
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 backdrop-blur-md" />
          <div className="absolute inset-0 bg-gradient-to-b from-void/75 via-void/90 to-void/95" />
        </div>
        {content}
      </div>
    );
  }

  return content;
}
