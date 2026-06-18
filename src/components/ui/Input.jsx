import { forwardRef } from 'react';

/**
 * variant="terminal" uses a bottom-border emphasis instead of a full
 * box border, for a more "command line" feel where appropriate.
 */
const Input = forwardRef(function Input(
  { label, id, variant = 'default', className = '', ...props },
  ref
) {
  const baseField =
    variant === 'terminal'
      ? 'bg-transparent border-0 border-b-2 border-border rounded-none px-1 focus:border-cyan'
      : 'bg-surface-raised border border-border rounded-md px-4 focus:border-cyan';

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm text-muted font-body">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`h-11 text-primary placeholder:text-muted/60 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan ${baseField} ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
