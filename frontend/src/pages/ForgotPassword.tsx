import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../lib/api';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate email format
    if (!email.trim()) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.forgotPassword({ email });

      if (response.success) {
        setSuccess(response.message);
        setSubmitted(true);
        setEmail('');

        // Redirect to login after 5 seconds
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        setError(response.message || 'Failed to process password reset request');
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      setError(
        error.response?.data?.error ||
        'Failed to send reset email. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Icon and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg">
            <span className="text-5xl">🔐</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600 text-base">
            No worries, we'll help you reset it
          </p>
        </div>

        {submitted && success ? (
          // Success State
          <div className="space-y-6">
            {/* Success Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
                  <span className="text-3xl">✅</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Check Your Email
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  We've sent a password reset link to:
                </p>
                <p className="text-gray-900 font-medium mb-6 break-all">{email}</p>
                
                {/* Key Info */}
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg">
                    <span className="text-lg mt-0.5">⏱️</span>
                    <span className="text-gray-700">Link expires in <strong>24 hours</strong></span>
                  </div>
                  <div className="flex items-start gap-3 bg-yellow-50 p-3 rounded-lg">
                    <span className="text-lg mt-0.5">💡</span>
                    <span className="text-gray-700">Check spam/junk folder if not found</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    <span>←</span>
                    Back to Login
                  </Link>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSuccess('');
                      setEmail('');
                      setError('');
                    }}
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Send to Different Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Form State
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <p className="font-semibold text-red-800 text-sm">Error</p>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📧</span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="your.email@example.com"
                      disabled={loading}
                      autoComplete="email"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Enter the email associated with your account
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>📧</span>
                      <span>Send Reset Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Footer Link */}
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Remembered your password?</p>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}

        {/* Footer Info */}
        <p className="text-center text-xs text-gray-500 mt-8">
          For security, password reset links expire in 24 hours
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
