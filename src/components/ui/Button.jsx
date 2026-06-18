import { forwardRef } from 'react';

const VARIANTS = {
  primary:
    'bg-gradient-primary text-void font-medium shadow-glow-cyan hover:shadow-glow-cyan hover:-translate-y-1',
  secondary:
    'bg-transparent border border-border text-primary hover:border-cyan hover:-translate-y-1 hover:text-cyan',
  ghost:
    'bg-transparent text-primary hover:text-cyan',
};

const SIZES = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

/**
 * Buttons are rounded-lg, never pill-shaped — this is an industrial
 * infrastructure product, not a consumer app.
 */
const Button = forwardRef(function Button(
  { as = 'button', variant = 'primary', size = 'md', className = '', children, ...props },
  ref
) {
  const Component = as;
  return (
    <Component
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Button;
