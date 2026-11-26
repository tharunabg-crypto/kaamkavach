import { useId, type InputHTMLAttributes, type ReactNode } from 'react';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  hint?: string;
  error?: string;
  leadingAdornment?: ReactNode;
  containerClassName?: string;
}

export function TextField({
  id,
  label,
  hint,
  error,
  leadingAdornment,
  containerClassName = '',
  className = '',
  required,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? `field-${generatedId}`;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [ariaDescribedBy, hintId, errorId]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      <label
        htmlFor={fieldId}
        className="block text-xs font-semibold text-navy"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-status-danger">
            *
          </span>
        )}
      </label>
      <div className="relative">
        {leadingAdornment && (
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-navy/55">
            {leadingAdornment}
          </span>
        )}
        <input
          {...inputProps}
          id={fieldId}
          required={required}
          aria-invalid={error ? true : ariaInvalid}
          aria-describedby={describedBy}
          className={[
            'min-h-12 w-full rounded-control border border-navy/25 bg-cream px-3 text-sm text-ink placeholder:text-ink/45 transition-colors focus:border-electric focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-60',
            leadingAdornment ? 'pl-10' : '',
            error ? 'border-status-danger' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        />
      </div>
      {hint && (
        <p id={hintId} className="text-xs text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-status-danger">
          {error}
        </p>
      )}
    </div>
  );
}
