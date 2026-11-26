import type { HTMLAttributes } from 'react';

export type BadgeTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'inverse';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'border-navy/15 bg-cream text-ink',
  info: 'border-electric/25 bg-electric/10 text-navy',
  success:
    'border-status-success/25 bg-status-success-soft text-status-success',
  warning:
    'border-accent/45 bg-status-warning-soft text-status-warning',
  danger: 'border-status-danger/25 bg-status-danger-soft text-status-danger',
  inverse: 'border-white/20 bg-white/10 text-white',
};

export function Badge({
  tone = 'neutral',
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={[
        'inline-flex min-h-6 items-center gap-1.5 rounded-control border px-2 py-0.5 font-mono text-[11px] font-semibold leading-tight',
        toneClasses[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
