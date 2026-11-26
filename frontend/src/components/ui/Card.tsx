import type { HTMLAttributes } from 'react';

export type CardVariant = 'surface' | 'subtle' | 'raised' | 'brand';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
}

const variantClasses: Record<CardVariant, string> = {
  surface: 'border border-navy/15 bg-surface text-ink',
  subtle: 'border border-navy/12 bg-cream text-ink',
  raised: 'border border-navy/12 bg-surface text-ink shadow-sm',
  brand: 'border border-navy bg-navy text-white',
};

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3.5',
  md: 'p-4 sm:p-5',
  lg: 'p-5 sm:p-7',
};

export function Card({
  variant = 'surface',
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={[
        'rounded-card',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
