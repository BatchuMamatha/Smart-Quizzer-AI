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
    phone_number: '',
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

  const validateEmail = (email: string): { valid: boolean; message: string } => {
    // Email regex pattern for comprehensive validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!email.trim()) {
      return { valid: false, message: 'Email address is required' };
    }
    
    if (!emailRegex.test(email)) {
      return { valid: false, message: 'Please enter a valid email address (e.g., user@example.com)' };
    }
    
    return { valid: true, message: 'Email is valid' };
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

    // Validate email format
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      setError(emailValidation.message);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-red-50 to-orange-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-400 to-red-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-15 blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl w-full space-y-6">
        {/* Header */}
        <div className="text-center animate-fade-in-up">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-amber-600 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl hover-glow">
            <span className="text-3xl text-white">🔑</span>
          </div>
          <h2 className="text-4xl font-bold text-gradient mb-2">
            Admin Registration
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
            Create Administrator Account
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Secure access to platform management
          </p>
        </div>

        {/* Registration Form */}
        <div className="card animate-fade-in-scale">
          <div className="card-body space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-fade-in-up">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-red-400 text-lg">⚠️</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-400">Registration Error</h3>
                      <p className="text-sm text-red-600 dark:text-red-300 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Information Section */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-300 mb-3 flex items-center">
                  <span className="mr-2">👤</span>
                  Administrator Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      👨‍💼 Full Name
                    </label>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      className="form-input focus-ring"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Username */}
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      👤 Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="form-input focus-ring"
                      placeholder="Choose a username"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      📧 Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input focus-ring"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone Number (Optional) */}
                  <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      📱 Phone <span className="text-gray-400 text-xs">(optional)</span>
                    </label>
                    <input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      autoComplete="tel"
                      pattern="[+]?[0-9]{10,15}"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="form-input focus-ring"
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-3 flex items-center">
                  <span className="mr-2">🔐</span>
                  Security & Verification
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Admin Code */}
                  <div className="md:col-span-2">
                    <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      🔐 Admin Verification Code
                    </label>
                    <input
                      id="adminCode"
                      name="adminCode"
                      type="password"
                      required
                      value={formData.adminCode}
                      onChange={handleChange}
                      className="form-input focus-ring"
                      placeholder="Enter admin verification code"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
            </div>

            {/* Submit Buttons */}
              <div className="flex flex-col md:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-success btn-lg flex-1 group"
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
                <Link
                  to="/login"
                  className="btn btn-secondary flex-1 group"
                >
                  <span className="mr-2">🔑</span>
                  Admin Sign In
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          Admin accounts require verification code for security
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
