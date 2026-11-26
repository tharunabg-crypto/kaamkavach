import type { HTMLAttributes } from 'react';

export type ContainerSize = 'reading' | 'narrow' | 'standard' | 'wide';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
  reading: 'max-w-3xl',
  narrow: 'max-w-md',
  standard: 'max-w-6xl',
  wide: 'max-w-7xl',
};

export function Container({
  size = 'wide',
  className = '',
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={[
        'mx-auto w-full px-[var(--layout-gutter)]',
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
