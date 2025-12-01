import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../lib/api';
import { UserManager } from '../lib/userManager';
import { ErrorNotification } from '../components/ErrorNotification';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SKILL_LEVELS, getSkillLevelFullDisplay } from '../lib/skillLevelUtils';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone_number: '',
    skill_level: 'Intermediate',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [usernameAvailability, setUsernameAvailability] = useState<{
    checking: boolean;
    available: boolean | null;
    message: string;
  }>({ checking: false, available: null, message: '' });
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

    // Check username availability as user types
    if (name === 'username') {
      if (value.length >= 3) {
        checkUsernameAvailability(value);
      } else {
        setUsernameAvailability({ checking: false, available: null, message: '' });
      }
    }
  };

  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) return;

    setUsernameAvailability({ checking: true, available: null, message: 'Checking...' });

    try {
      const result = await authAPI.checkUsernameAvailability(username);
      setUsernameAvailability({
        checking: false,
        available: result.available,
        message: result.message
      });
    } catch (error) {
      setUsernameAvailability({
        checking: false,
        available: null,
        message: 'Error checking username'
      });
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

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authAPI.register(registerData);
      userManager.login(response.user, response.tokens.access_token);
      navigate('/dashboard', { state: { fromRegistration: true } });
    } catch (error: any) {
      setError(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-15 blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl w-full space-y-6">
        {/* Header */}
        <div className="text-center animate-fade-in-up">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl hover-glow">
            <span className="text-3xl text-white">✨</span>
          </div>
          <h2 className="text-4xl font-bold text-gradient mb-2">
            Join Smart Quizzer
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
            Start Your AI-Powered Learning Journey
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Create your account and unlock personalized quizzes
          </p>
        </div>

        {/* Registration Form */}
        <div className="card animate-fade-in-scale">
          <div className="card-body space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <ErrorNotification message={error} dismissible onDismiss={() => setError('')} />}

              {/* Personal Information Section */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  <span className="mr-2">👤</span>
                  Personal Information
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
                    <div className="relative">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className="form-input focus-ring pr-10"
                        placeholder="Choose a username"
                      />
                      {formData.username.length >= 3 && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          {usernameAvailability.checking ? (
                            <LoadingSpinner size="sm" />
                          ) : usernameAvailability.available === true ? (
                            <span className="text-green-500 text-lg">✅</span>
                          ) : usernameAvailability.available === false ? (
                            <span className="text-red-500 text-lg">❌</span>
                          ) : null}
                        </div>
                      )}
                    </div>
                    {formData.username.length >= 3 && usernameAvailability.message && (
                      <p className={`text-xs mt-1 ${
                        usernameAvailability.available === true ? 'text-green-600' :
                        usernameAvailability.available === false ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {usernameAvailability.message}
                      </p>
                    )}
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
                      placeholder="Enter your email"
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

                {/* Skill Level */}
                <div className="mt-3">
                  <label htmlFor="skill_level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    🎯 Skill Level
                  </label>
                  <select
                    id="skill_level"
                    name="skill_level"
                    value={formData.skill_level}
                    onChange={handleChange}
                    className="form-select focus-ring w-full md:w-1/2"
                  >
                    {SKILL_LEVELS.map(level => (
                      <option key={level} value={level}>
                        {getSkillLevelFullDisplay(level)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Security Section */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  <span className="mr-2">🔒</span>
                  Security
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Password */}
                  <div className="md:col-span-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      🔒 Password
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
                        className="form-input pr-10 focus-ring"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
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
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs space-y-1">
                        <div className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                          <span className="mr-1">{formData.password.length >= 8 ? '✓' : '○'}</span>
                          At least 8 characters
                        </div>
                        <div className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                          <span className="mr-1">{/[A-Z]/.test(formData.password) ? '✓' : '○'}</span>
                          One uppercase letter
                        </div>
                        <div className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                          <span className="mr-1">{/[a-z]/.test(formData.password) ? '✓' : '○'}</span>
                          One lowercase letter
                        </div>
                        <div className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                          <span className="mr-1">{/[0-9]/.test(formData.password) ? '✓' : '○'}</span>
                          One number
                        </div>
                        <div className={`flex items-center ${/[!@#$%^&*()_+\-=[\]{}|;:',.<>?/~`]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                          <span className="mr-1">{/[!@#$%^&*()_+\-=[\]{}|;:',.<>?/~`]/.test(formData.password) ? '✓' : '○'}</span>
                          One special character
                        </div>
                      </div>
                    </div>
                  )}
                  </div>

                  {/* Confirm Password */}
                  <div className="md:col-span-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      🔐 Confirm Password
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
                        className="form-input pr-10 focus-ring"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <span className="text-lg">{showConfirmPassword ? '🙈' : '👁️'}</span>
                      </button>
                    </div>
                    
                    {/* Password Match Indicator */}
                    {formData.confirmPassword && (
                      <div className="mt-1 flex items-center text-xs">
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
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col md:flex-row gap-3">
                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="flex-1"
                  loading={loading}
                  icon={!loading && <span>🎉</span>}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
                <Link
                  to="/login"
                  className="btn btn-secondary flex-1 group"
                >
                  <span className="mr-2">🔑</span>
                  Sign In
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          By creating an account, you agree to our terms of service and privacy policy
        </p>
      </div>
    </div>
  );
};

export default Register;
