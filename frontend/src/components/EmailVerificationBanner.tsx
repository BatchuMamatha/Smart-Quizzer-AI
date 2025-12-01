import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface EmailVerificationBannerProps {
  userEmail: string;
  onDismiss?: () => void;
}

const EmailVerificationBanner: React.FC<EmailVerificationBannerProps> = ({ userEmail, onDismiss }) => {
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleResendVerification = async () => {
    // Email verification is disabled
    setIsResending(true);
    setResendStatus('success');
    setMessage('Email verification is disabled on this server. All users have full access.');
    setIsResending(false);
  };

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-400 dark:text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            Email Verification Disabled
          </h3>
          <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
            <p>
              Email verification has been disabled on this server. All users have full access to features.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={handleResendVerification}
              disabled={isResending}
              className="text-sm font-medium text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100 underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? 'Sending...' : 'Resend Verification Email'}
            </button>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-sm font-medium text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100"
              >
                Dismiss
              </button>
            )}
          </div>
          {resendStatus !== 'idle' && (
            <div className={`mt-2 text-sm ${
              resendStatus === 'success' 
                ? 'text-green-700 dark:text-green-300' 
                : 'text-red-700 dark:text-red-300'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;
