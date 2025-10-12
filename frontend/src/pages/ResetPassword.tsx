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
    if (strength < 2) return 'bg-red-400';
    if (strength < 4) return 'bg-yellow-400';
    return 'bg-green-400';
  };

  const getStrengthText = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
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

  if (tokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="card animate-pulse">
          <div className="card-body text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying reset token...</p>
          </div>
        </div>
      </div>
    );
  }

  if (tokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-md w-full space-y-8">
          <div className="text-center animate-fade-in-up">
            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
              <span className="text-3xl text-white">❌</span>
            </div>
            <h2 className="text-4xl font-bold text-gradient mb-2">
              Invalid Reset Link
            </h2>
            <p className="text-gray-600 text-lg font-medium mb-6">
              This password reset link is invalid or has expired
            </p>
          </div>

          <div className="card animate-fade-in-scale">
            <div className="card-body space-y-6 text-center">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600">{error}</p>
                </div>
              )}
              
              <p className="text-gray-600">
                Please request a new password reset from the login page.
              </p>
              
              <Link
                to="/login"
                className="btn btn-primary w-full"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in-up">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl hover-glow">
            <span className="text-3xl text-white">🔑</span>
          </div>
          <h2 className="text-4xl font-bold text-gradient mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600 text-lg font-medium">
            Enter your new password
          </p>
          {userInfo && (
            <p className="text-gray-500 mt-2">
              Resetting password for <strong>{userInfo.username}</strong>
            </p>
          )}
        </div>

        {/* Reset Form */}
        <div className="card animate-fade-in-scale">
          <div className="card-body space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in-up">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-red-400 text-lg">⚠️</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in-up">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-green-400 text-lg">✅</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Success!</h3>
                      <p className="text-sm text-green-600 mt-1">{success}</p>
                      <p className="text-sm text-green-600 mt-1">Redirecting to login...</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="new_password" className="form-label">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🔒</span>
                      New Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="new_password"
                      name="new_password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.new_password}
                      onChange={handleChange}
                      className="form-input pl-12 pr-12 focus-ring"
                      placeholder="Enter your new password"
                      disabled={loading}
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">🔒</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={loading}
                    >
                      <span className="text-lg">{showPassword ? '🙈' : '👁️'}</span>
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.new_password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Password strength:</span>
                        <span className={`font-medium ${passwordStrength < 2 ? 'text-red-600' : passwordStrength < 4 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {getStrengthText(passwordStrength)}
                        </span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirm_password" className="form-label">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🔒</span>
                      Confirm New Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className="form-input pl-12 pr-12 focus-ring"
                      placeholder="Confirm your new password"
                      disabled={loading}
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">🔒</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={loading}
                    >
                      <span className="text-lg">{showConfirmPassword ? '🙈' : '👁️'}</span>
                    </button>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {formData.confirm_password && (
                    <div className="mt-1">
                      {formData.new_password === formData.confirm_password ? (
                        <span className="text-sm text-green-600 flex items-center gap-1">
                          <span>✅</span> Passwords match
                        </span>
                      ) : (
                        <span className="text-sm text-red-600 flex items-center gap-1">
                          <span>❌</span> Passwords do not match
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || success !== ''}
                  className="btn btn-primary btn-lg w-full group"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner mr-3"></div>
                      Resetting Password...
                    </div>
                  ) : success ? (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">✅</span>
                      Password Reset!
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">🔑</span>
                      Reset Password
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  )}
                </button>
              </div>
            </form>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          For security, this reset link will expire in 1 hour
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;