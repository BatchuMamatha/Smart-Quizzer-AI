import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../lib/api';
import { UserManager } from '../lib/userManager';

const AdminRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    skill_level: 'Advanced', // Default for admins
    adminCode: '', // Security code to verify admin creation
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const userManager = UserManager.getInstance();

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validatePasswordStrength = (password: string): { valid: boolean; message: string } => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    if (!/[!@#$%^&*()_+\-=[\]{}|;:',.<>?/~`]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:\',.<>?/~`)' };
    }
    return { valid: true, message: 'Password is valid' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate username is not empty
    if (!formData.username.trim()) {
      setError('Please enter a username before continuing');
      setLoading(false);
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(formData.password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message);
      setLoading(false);
      return;
    }

    // Validate admin code (simple verification)
    // In production, this should be a more secure mechanism
    if (!formData.adminCode.trim()) {
      setError('Admin verification code is required');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, adminCode, ...registerData } = formData;
      // Add role field to specify admin registration
      const adminRegisterData = {
        ...registerData,
        role: 'admin',
        admin_code: adminCode, // Send code to backend for verification
      };

      const response = await authAPI.register(adminRegisterData);
      userManager.login(response.user, response.tokens.access_token);
      navigate('/admin');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Admin registration failed');
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    if (passwordStrength === 4) return 'Strong';
    return 'Very Strong';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-red-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-400 to-red-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-15 blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in-up">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-amber-600 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl hover-glow">
            <span className="text-3xl text-white">🔑</span>
          </div>
          <h2 className="text-4xl font-bold text-gradient mb-2">
            Admin Registration
          </h2>
          <p className="text-gray-600 text-lg font-medium">
            Create Administrator Account
          </p>
          <p className="text-gray-500 mt-2">
            Secure access to platform management
          </p>
        </div>

        {/* Registration Form */}
        <div className="card animate-fade-in-scale">
          <div className="card-body space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in-up">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-red-400 text-lg">⚠️</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Registration Error</h3>
                      <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="full_name" className="form-label">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">👨‍💼</span>
                      Full Name
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      className="form-input pl-12 focus-ring"
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">👨‍💼</span>
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label htmlFor="username" className="form-label">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">👤</span>
                      Username
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="form-input pl-12 focus-ring"
                      placeholder="Choose a username"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">👤</span>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="form-label">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">📧</span>
                      Email Address
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input pl-12 focus-ring"
                      placeholder="your.email@example.com"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">📧</span>
                    </div>
                  </div>
                </div>

                {/* Admin Code */}
                <div>
                  <label htmlFor="adminCode" className="form-label">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🔐</span>
                      Admin Verification Code
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="adminCode"
                      name="adminCode"
                      type="password"
                      required
                      value={formData.adminCode}
                      onChange={handleChange}
                      className="form-input pl-12 focus-ring"
                      placeholder="Enter admin verification code"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">🔐</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Contact system administrator for verification code
                  </p>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="form-label">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🔒</span>
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input pl-12 pr-12 focus-ring"
                      placeholder="Create a strong password"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">🔒</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <span className="text-lg">{showPassword ? '🙈' : '👁️'}</span>
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Password Strength:</span>
                        <span className="font-semibold">{getStrengthText()}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getStrengthColor()} transition-all duration-300`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs space-y-1 mt-2">
                        <div className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-600'}`}>
                          <span className="mr-1">{formData.password.length >= 8 ? '✓' : '○'}</span>
                          At least 8 characters
                        </div>
                        <div className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-600'}`}>
                          <span className="mr-1">{/[A-Z]/.test(formData.password) ? '✓' : '○'}</span>
                          One uppercase letter
                        </div>
                        <div className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-600'}`}>
                          <span className="mr-1">{/[a-z]/.test(formData.password) ? '✓' : '○'}</span>
                          One lowercase letter
                        </div>
                        <div className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-600'}`}>
                          <span className="mr-1">{/[0-9]/.test(formData.password) ? '✓' : '○'}</span>
                          One number
                        </div>
                        <div className={`flex items-center ${/[!@#$%^&*()_+\-=[\]{}|;:',.<>?/~`]/.test(formData.password) ? 'text-green-600' : 'text-gray-600'}`}>
                          <span className="mr-1">{/[!@#$%^&*()_+\-=[\]{}|;:',.<>?/~`]/.test(formData.password) ? '✓' : '○'}</span>
                          One special character
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="form-label">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🔒</span>
                      Confirm Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input pl-12 pr-12 focus-ring"
                      placeholder="Confirm your password"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">🔒</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <span className="text-lg">{showConfirmPassword ? '🙈' : '👁️'}</span>
                    </button>
                  </div>

                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <div className="mt-2 text-xs">
                      {formData.password === formData.confirmPassword ? (
                        <span className="text-green-600 flex items-center">
                          <span className="mr-1">✅</span>
                          Passwords match
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center">
                          <span className="mr-1">❌</span>
                          Passwords do not match
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-success btn-lg w-full group"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner mr-3"></div>
                      Creating Admin Account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">🔑</span>
                      Create Admin Account
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  )}
                </button>
              </div>
            </form>

            <div className="text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Already have admin access?</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Link
                  to="/login"
                  className="btn btn-secondary w-full group"
                >
                  <span className="mr-2">🔑</span>
                  Admin Sign In
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          Admin accounts require verification code for security
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
