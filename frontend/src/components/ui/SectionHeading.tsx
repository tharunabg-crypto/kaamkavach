import type { ReactNode } from 'react';

export interface SectionHeadingProps {
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  size?: 'md' | 'lg';
  className?: string;
}

const titleSizes = {
  md: 'text-2xl sm:text-3xl',
  lg: 'text-3xl sm:text-4xl lg:text-[2.7rem]',
};

export function SectionHeading({
  title,
  eyebrow,
  description,
  align = 'left',
  size = 'md',
  className = '',
}: SectionHeadingProps) {
  return (
    <header
      className={[
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && (
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-electric">
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2.5 font-display font-bold tracking-tight text-navy ${titleSizes[size]}`}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
          {description}
        </p>
      )}
    </header>
  );
}
