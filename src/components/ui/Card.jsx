/**
 * Base card primitive: rounded-2xl, default border, hover lift + glow.
 * `interactive` adds the hover lift; static cards (e.g. inside the
 * dashboard preview) should pass interactive={false}.
 */
export default function Card({
  children,
  className = '',
  interactive = true,
  glass = false,
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={`
        rounded-2xl border border-border p-8
        ${glass ? 'backdrop-blur-xl bg-surface/40' : 'bg-surface'}
        ${interactive ? 'transition-all duration-300 hover:-translate-y-1 hover:border-hover hover:shadow-glow-cyan' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
}
