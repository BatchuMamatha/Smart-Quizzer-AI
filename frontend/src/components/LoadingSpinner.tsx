/**
 * Loading Spinner Component
 * Unified loading indicator across the application
 */

import React from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'secondary' | 'white' | 'current';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
  label?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-4',
  xl: 'w-12 h-12 border-4'
};

const variantClasses: Record<SpinnerVariant, string> = {
  primary: 'border-blue-500 border-t-transparent',
  secondary: 'border-gray-500 border-t-transparent',
  white: 'border-white border-t-transparent',
  current: 'border-current border-t-transparent'
};

/**
 * LoadingSpinner - Standardized loading indicator
 * 
 * @example
 * // Small inline spinner
 * <LoadingSpinner size="sm" variant="white" />
 * 
 * @example
 * // Large centered spinner with label
 * <LoadingSpinner size="lg" label="Loading..." />
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  className = '',
  label
}) => {
  const spinnerClasses = `
    inline-block
    rounded-full
    animate-spin
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (label) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className={spinnerClasses} role="status" aria-label="Loading"></div>
        <p className="text-gray-600 dark:text-gray-400">{label}</p>
      </div>
    );
  }

  return <div className={spinnerClasses} role="status" aria-label="Loading"></div>;
};

/**
 * Centered loading spinner for full-page or container loading states
 */
interface CenteredLoadingProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}

export const CenteredLoading: React.FC<CenteredLoadingProps> = ({
  size = 'lg',
  label = 'Loading...',
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[200px] ${className}`}>
      <LoadingSpinner size={size} label={label} />
    </div>
  );
};

/**
 * Button spinner - optimized for button loading states
 */
interface ButtonSpinnerProps {
  className?: string;
}

export const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({ className = '' }) => {
  return <LoadingSpinner size="sm" variant="white" className={className} />;
};
