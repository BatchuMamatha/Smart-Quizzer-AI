/**
 * Button Component
 * Standardized button styles across the application
 */

import React, { ButtonHTMLAttributes } from 'react';
import { ButtonSpinner } from './LoadingSpinner';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-blue-600 to-blue-700
    hover:from-blue-700 hover:to-blue-800
    text-white
    shadow-md hover:shadow-lg
    border border-blue-600
  `,
  secondary: `
    bg-gray-600
    hover:bg-gray-700
    text-white
    shadow-md hover:shadow-lg
    border border-gray-600
  `,
  success: `
    bg-gradient-to-r from-green-600 to-green-700
    hover:from-green-700 hover:to-green-800
    text-white
    shadow-md hover:shadow-lg
    border border-green-600
  `,
  danger: `
    bg-gradient-to-r from-red-600 to-red-700
    hover:from-red-700 hover:to-red-800
    text-white
    shadow-md hover:shadow-lg
    border border-red-600
  `,
  warning: `
    bg-gradient-to-r from-yellow-500 to-yellow-600
    hover:from-yellow-600 hover:to-yellow-700
    text-white
    shadow-md hover:shadow-lg
    border border-yellow-500
  `,
  ghost: `
    bg-transparent
    hover:bg-gray-100 dark:hover:bg-gray-800
    text-gray-700 dark:text-gray-300
    border border-gray-300 dark:border-gray-600
  `
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};

const baseClasses = `
  font-semibold
  rounded-lg
  transition-all
  duration-200
  transform
  active:scale-95
  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:transform-none
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  focus:ring-blue-500
  dark:focus:ring-offset-gray-900
`;

/**
 * Button - Standardized button component
 * 
 * @example
 * // Primary button
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * 
 * @example
 * // Loading state
 * <Button variant="success" loading={isSubmitting}>
 *   Submit
 * </Button>
 * 
 * @example
 * // With icon
 * <Button variant="primary" icon={<span>🚀</span>}>
 *   Launch
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const isDisabled = disabled || loading;

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {loading ? (
          <>
            <ButtonSpinner />
            {children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </span>
    </button>
  );
};

/**
 * IconButton - Button with only an icon
 */
interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactNode;
  ariaLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  ariaLabel,
  size = 'md',
  ...props
}) => {
  return (
    <Button {...props} size={size} aria-label={ariaLabel}>
      {icon}
    </Button>
  );
};

/**
 * Link styled as button
 */
interface LinkButtonProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  external = false
}) => {
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    inline-block
    text-center
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <a
      href={href}
      className={buttonClasses}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
};
