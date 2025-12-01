import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Email verification is disabled - always show success
    setStatus('success');
    setMessage('Email verification is disabled on this server. You can proceed to login.');
    
    // Redirect to login after 3 seconds
    setTimeout(() => {
      navigate('/login', { state: { verified: true } });
    }, 3000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Email Verification
            </h1>
          </div>

          {/* Status Display */}
          <div className="text-center">
            {status === 'verifying' && (
              <div>
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Verifying your email address...
                </p>
              </div>
            )}

            {status === 'success' && (
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <svg
                    className="w-10 h-10 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                  Success!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {message}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Redirecting to login page...
                </p>
                <Link
                  to="/login"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Go to Login
                </Link>
              </div>
            )}

            {status === 'error' && (
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                  <svg
                    className="w-10 h-10 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                  Verification Failed
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {message}
                </p>
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Go to Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Register Again
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help?{' '}
              <a href="mailto:support@smartquizzer.example.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
