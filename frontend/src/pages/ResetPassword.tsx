import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { authAPI } from '../lib/api';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [userInfo, setUserInfo] = useState<{ username: string; email: string } | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setTokenValid(false);
      setError('Invalid reset link. Please request a new password reset.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await authAPI.verifyResetToken({ token: token! });
      setTokenValid(response.valid);
      if (response.valid && response.user) {
        setUserInfo(response.user);
      } else {
        setError(response.message || 'Invalid or expired reset token');
      }
    } catch (error: any) {
      setTokenValid(false);
      setError('Failed to verify reset token. Please try again.');
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  const getStrengthBg = (strength: number) => {
    if (strength < 2) return 'bg-red-50';
    if (strength < 4) return 'bg-yellow-50';
    return 'bg-green-50';
  };

  const getStrengthTextColor = (strength: number) => {
    if (strength < 2) return 'text-red-600';
    if (strength < 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'new_password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (formData.new_password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (formData.new_password !== formData.confirm_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.resetPassword({
        token: token!,
        new_password: formData.new_password
      });

      setSuccess(response.message || 'Password reset successful!');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Password reset successful! Please log in with your new password.' 
          } 
        });
      }, 3000);

    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full">
          <div className="text-center">
            <div className="inline-block mb-4">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 font-medium">Verifying reset token...</p>
          </div>
        </div>
      </div>
    );
  }

  // Invalid Token State
  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl shadow-lg">
              <span className="text-5xl">❌</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Invalid Reset Link
            </h1>
            <p className="text-gray-600 text-base">
              This password reset link is invalid or has expired
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              
              <p className="text-gray-600 text-center">
                Please request a new password reset from the login page.
              </p>
              
              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                <span>←</span>
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Valid Token - Reset Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg">
            <span className="text-5xl">🔑</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 text-base">
            Enter your new password
          </p>
          {userInfo && (
            <p className="text-gray-500 text-sm mt-3">
              Resetting password for <strong>{userInfo.username}</strong>
            </p>
          )}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <span className="text-lg">⚠️</span>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Success Alert */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <span className="text-lg">✅</span>
                  <div>
                    <p className="font-semibold text-green-800 text-sm">Success!</p>
                    <p className="text-green-700 text-sm mt-1">{success}</p>
                    <p className="text-green-600 text-xs mt-2">Redirecting to login...</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {/* New Password Field */}
              <div>
                <label htmlFor="new_password" className="block text-sm font-semibold text-gray-900 mb-3">
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔒</span>
                  <input
                    id="new_password"
                    name="new_password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.new_password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your new password"
                    disabled={loading || success !== ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={loading || success !== ''}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.new_password && (
                  <div className={`mt-3 p-3 rounded-lg ${getStrengthBg(passwordStrength)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700">Password Strength</span>
                      <span className={`text-xs font-semibold ${getStrengthTextColor(passwordStrength)}`}>
                        {getStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getStrengthColor(passwordStrength)}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {passwordStrength < 2 && "Use uppercase, lowercase, numbers and symbols"}
                      {passwordStrength >= 2 && passwordStrength < 4 && "Good, but add more variety"}
                      {passwordStrength >= 4 && "Great password!"}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirm_password" className="block text-sm font-semibold text-gray-900 mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔒</span>
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Confirm your new password"
                    disabled={loading || success !== ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={loading || success !== ''}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {formData.confirm_password && (
                  <div className="mt-2">
                    {formData.new_password === formData.confirm_password ? (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <span>✅</span>
                        <span>Passwords match</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <span>❌</span>
                        <span>Passwords do not match</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success !== ''}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Resetting...</span>
                </>
              ) : success ? (
                <>
                  <span>✅</span>
                  <span>Password Reset!</span>
                </>
              ) : (
                <>
                  <span>🔑</span>
                  <span>Reset Password</span>
                </>
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center pt-4 border-t border-gray-200">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <p className="text-center text-xs text-gray-500 mt-8">
          For security, this reset link will expire in 24 hours
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;