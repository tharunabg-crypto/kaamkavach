import type { ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'quiet';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-deep',
  secondary:
    'border border-navy/20 bg-white text-navy hover:border-navy/40 hover:bg-cream',
  accent: 'bg-accent text-navy-deep hover:bg-navy hover:text-white',
  quiet: 'text-navy hover:bg-navy/5',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-3 text-xs',
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-[50px] px-6 text-base',
};

const getButtonClasses = ({
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonStyleProps) =>
  [
    'inline-flex items-center justify-center gap-2 rounded-control font-semibold leading-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric disabled:cursor-not-allowed disabled:opacity-60',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyleProps {}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={getButtonClasses({ variant, size, className })}
    />
  );
}

export interface ButtonLinkProps
  extends Omit<LinkProps, 'className'>,
    ButtonStyleProps {}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={getButtonClasses({ variant, size, className })}
    />
  );
}
