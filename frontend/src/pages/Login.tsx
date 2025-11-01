import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../lib/api';
import { UserManager } from '../lib/userManager';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    full_name: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isAdminSignup, setIsAdminSignup] = useState(false);

  const navigate = useNavigate();
  const userManager = UserManager.getInstance();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(''); // Clear error when user types
  };

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(''); // Clear error when user types
  };

  const handleAdminSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (signupData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (!signupData.email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        username: signupData.username,
        email: signupData.email,
        full_name: signupData.full_name,
        password: signupData.password,
        skill_level: 'Intermediate',
        role: 'admin' // Set role as admin
      });

      console.log('🔍 Admin Signup Response:', response);

      // Auto-login after signup
      if (response.user && response.tokens) {
        userManager.login(response.user, response.tokens.access_token);
        setSuccessMessage('Admin account created successfully! Redirecting to dashboard...');
        
        setTimeout(() => {
          navigate('/admin');
        }, 1500);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to create admin account. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      
      console.log('🔍 Login Response:', {
        userId: response.user.id,
        username: response.user.username,
        fullName: response.user.full_name,
        tokenPreview: response.tokens.access_token.substring(0, 30) + '...'
      });
      
      // Store tokens and user data
      userManager.login(response.user, response.tokens.access_token);
      
      // Verify what was stored
      console.log('🔍 Stored in sessionStorage:', {
        user: sessionStorage.getItem('user'),
        tokenPreview: sessionStorage.getItem('access_token')?.substring(0, 30) + '...'
      });
      
      setSuccessMessage('Login successful! Redirecting...');
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Invalid credentials. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail.trim()) {
      setForgotPasswordMessage('Please enter your email address');
      return;
    }

    try {
      const response = await authAPI.forgotPassword({ email: forgotPasswordEmail });
      
      if (response.success) {
        setShowForgotPassword(false);
        setForgotPasswordMessage('');
        setForgotPasswordEmail('');
        
        setSuccessMessage(`Reset instructions sent to ${forgotPasswordEmail}!`);
        
        // Auto-clear after 8 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 8000);
        
      } else {
        setForgotPasswordMessage(response.message || 'Failed to process reset request');
      }
      
    } catch (error: any) {
      console.error('Forgot password error:', error);
      setForgotPasswordMessage('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-3 shadow-lg">
              <span className="text-white text-3xl">🧠</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Smart Quizzer
          </h1>
          <p className="text-gray-600 font-medium">AI-Powered Learning Platform</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in-up">
            <div className="flex items-start">
              <span className="text-green-500 text-xl mr-3 mt-1">✅</span>
              <div>
                <h4 className="font-semibold text-green-800 mb-1">Success</h4>
                <p className="text-green-700">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-fade-in-up">
            <div className="flex items-start">
              <span className="text-red-500 text-xl mr-3 mt-1">❌</span>
              <div>
                <h4 className="font-semibold text-red-800 mb-1">Error</h4>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Login/Signup Form */}
        {!showForgotPassword && (
          <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-xl p-8 animate-fade-in-scale">
            {/* Login Mode Toggle */}
            <div className="mb-6 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsAdminLogin(false);
                  setIsAdminSignup(false);
                  setFormData({ username: '', password: '' });
                  setSignupData({ username: '', email: '', full_name: '', password: '', confirmPassword: '' });
                  setError('');
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  !isAdminLogin && !isAdminSignup
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">👤</span>
                User Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAdminLogin(true);
                  setIsAdminSignup(false);
                  setFormData({ username: '', password: '' });
                  setSignupData({ username: '', email: '', full_name: '', password: '', confirmPassword: '' });
                  setError('');
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  isAdminLogin && !isAdminSignup
                    ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">🔑</span>
                Admin
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isAdminLogin ? '🔑 Admin Access' : 'Welcome Back!'}
              </h2>
              <p className="text-gray-600">
                {isAdminLogin 
                  ? 'Sign in with your administrator credentials'
                  : 'Please sign in to continue your learning journey'
                }
              </p>
            </div>

            {/* Admin Signup Form */}
            {/* Admin signup removed - admins created via backend only */}

            {/* Regular Login Form (User or Admin) */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  👤 Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your username"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  🔒 Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <span className="text-lg">
                      {showPassword ? '🙈' : '👁️'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  isAdminLogin
                    ? 'bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">{isAdminLogin ? '🔑' : '🚀'}</span>
                    {isAdminLogin ? 'Admin Sign In' : 'Sign In'}
                  </div>
                )}
              </button>

              {/* Forgot Password Link - Only show for regular users */}
              {!isAdminLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors underline"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </form>

            {/* Register Link - Only show for regular users */}
            {!isAdminLogin && !isAdminSignup && (
              <div className="mt-6 text-center border-t border-gray-200 pt-6">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Forgot Password Form */}
        {showForgotPassword && (
          <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-xl p-8 animate-fade-in-scale">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotPasswordMessage('');
                    setForgotPasswordEmail('');
                  }}
                  className="mr-3 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ←
                </button>
                Reset Password
              </h2>
              <p className="text-gray-600">Enter your email to receive reset instructions</p>
            </div>

            {/* Forgot Password Message */}
            {forgotPasswordMessage && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">{forgotPasswordMessage}</p>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-2">
                  📧 Email Address
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  <span className="mr-2">📧</span>
                  Send Reset Link
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotPasswordMessage('');
                    setForgotPasswordEmail('');
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;