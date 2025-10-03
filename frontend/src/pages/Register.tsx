import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../lib/api';
import { UserManager } from '../lib/userManager';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    skill_level: 'Intermediate',
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

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-yellow-500';
    if (strength <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength <= 1) return 'Weak';
    if (strength <= 2) return 'Fair';
    if (strength <= 3) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters long');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authAPI.register(registerData);
      userManager.login(response.user, response.tokens.access_token);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-15 blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in-up">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl hover-glow">
            <span className="text-3xl text-white">✨</span>
          </div>
          <h2 className="text-4xl font-bold text-gradient mb-2">
            Join Smart Quizzer
          </h2>
          <p className="text-gray-600 text-lg font-medium">
            Start Your AI-Powered Learning Journey
          </p>
          <p className="text-gray-500 mt-2">
            Create your account and unlock personalized quizzes
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
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">📧</span>
                    </div>
                  </div>
                </div>

                {/* Skill Level */}
                <div>
                  <label htmlFor="skill_level" className="form-label">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🎯</span>
                      Skill Level
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      id="skill_level"
                      name="skill_level"
                      value={formData.skill_level}
                      onChange={handleChange}
                      className="form-select pl-12 focus-ring"
                    >
                      <option value="Beginner">🌱 Beginner - Just starting out</option>
                      <option value="Intermediate">🚀 Intermediate - Some experience</option>
                      <option value="Advanced">🏆 Advanced - Expert level</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">🎯</span>
                    </div>
                  </div>
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
                      placeholder="Create a password"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">🔒</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <span className="text-lg">{showPassword ? '🙈' : '👁️'}</span>
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500">Password Strength</span>
                        <span className={`font-medium ${passwordStrength <= 1 ? 'text-red-600' : passwordStrength <= 2 ? 'text-yellow-600' : passwordStrength <= 3 ? 'text-blue-600' : 'text-green-600'}`}>
                          {getPasswordStrengthText(passwordStrength)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="form-label">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🔐</span>
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
                      <span className="text-gray-400 text-lg">🔐</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <span className="text-lg">{showConfirmPassword ? '🙈' : '👁️'}</span>
                    </button>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <div className="mt-2 flex items-center text-xs">
                      {formData.password === formData.confirmPassword ? (
                        <span className="flex items-center text-green-600">
                          <span className="mr-1">✅</span>
                          Passwords match
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <span className="mr-1">❌</span>
                          Passwords don't match
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-success btn-lg w-full group"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner mr-3"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">🎉</span>
                      Create Account
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
                  <span className="px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Link
                  to="/login"
                  className="btn btn-secondary w-full group"
                >
                  <span className="mr-2">🔑</span>
                  Sign In
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          By creating an account, you agree to our terms of service and privacy policy
        </p>
      </div>
    </div>
  );
};

export default Register;
