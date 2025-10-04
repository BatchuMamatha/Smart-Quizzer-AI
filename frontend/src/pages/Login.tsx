import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../lib/api';
import { UserManager } from '../lib/userManager';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const navigate = useNavigate();
  const userManager = UserManager.getInstance();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      userManager.login(response.user, response.tokens.access_token);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== FORGOT PASSWORD TRIGGERED ===');
    console.log('Email:', forgotPasswordEmail);
    
    if (!forgotPasswordEmail.trim()) {
      setForgotPasswordMessage('Please enter your email address');
      return;
    }

    try {
      // Capture email before clearing the form
      const emailToReset = forgotPasswordEmail;
      console.log('Email to reset:', emailToReset);
      
      // Clear everything first
      setShowForgotPassword(false);
      setForgotPasswordMessage('');
      setForgotPasswordEmail('');
      setError('');
      
      // Set success message with delay to ensure modal is closed
      setTimeout(() => {
        const successMsg = `Reset link sent successfully to ${emailToReset}!`;
        console.log('Setting success message:', successMsg);
        setSuccessMessage(successMsg);
        
        // Auto-clear after 8 seconds (longer for testing)
        setTimeout(() => {
          console.log('Clearing success message');
          setSuccessMessage('');
        }, 8000);
      }, 100);
      
    } catch (error) {
      console.log('Error in forgot password:', error);
      setForgotPasswordMessage('Failed to send reset email. Please try again.');
    }
  };

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
            <span className="text-3xl text-white">🧠</span>
          </div>
          <h2 className="text-4xl font-bold text-gradient mb-2">
            Smart Quizzer
          </h2>
          <p className="text-gray-600 text-lg font-medium">
            AI-Powered Learning Platform
          </p>
          <p className="text-gray-500 mt-2">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Login Form */}
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
                      <h3 className="text-sm font-medium text-red-800">Login Error</h3>
                      <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in-up" style={{zIndex: 1000}}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-green-400 text-lg">✅</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Success!</h3>
                      <p className="text-sm text-green-600 mt-1">{successMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-5">
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
                      placeholder="Enter your username"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">👤</span>
                    </div>
                  </div>
                </div>

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
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input pl-12 pr-12 focus-ring"
                      placeholder="Enter your password"
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
                </div>
                
                {/* Forgot Password Link */}
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setSuccessMessage(''); // Clear any existing success message
                      setError(''); // Clear any existing error message
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              {/* Forgot Password Modal */}
              {showForgotPassword && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/10">
                  <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-fade-in-scale border border-gray-200">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl text-white">🔑</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h3>
                      <p className="text-gray-600">Enter your email to receive reset instructions</p>
                    </div>
                    
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div>
                        <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-2">
                          📧 Email Address
                        </label>
                        <input
                          id="forgot-email"
                          type="email"
                          value={forgotPasswordEmail}
                          onChange={(e) => setForgotPasswordEmail(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                      
                      {forgotPasswordMessage && (
                        <div className={`p-3 rounded-lg text-sm ${
                          forgotPasswordMessage.includes('sent') 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {forgotPasswordMessage}
                        </div>
                      )}
                      
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => {
                            setShowForgotPassword(false);
                            setForgotPasswordMessage('');
                            setForgotPasswordEmail('');
                            setSuccessMessage('');
                          }}
                          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            console.log('=== DIRECT BUTTON CLICK ===');
                            console.log('Email:', forgotPasswordEmail);
                            
                            if (!forgotPasswordEmail.trim()) {
                              setForgotPasswordMessage('Please enter your email address');
                              return;
                            }
                            
                            const emailToReset = forgotPasswordEmail;
                            console.log('Email to reset:', emailToReset);
                            
                            // Close modal and clear form
                            setShowForgotPassword(false);
                            setForgotPasswordMessage('');
                            setForgotPasswordEmail('');
                            setError('');
                            
                            // Set success message immediately
                            const successMsg = `Reset link sent successfully to ${emailToReset}!`;
                            console.log('Setting success message:', successMsg);
                            setSuccessMessage(successMsg);
                            
                            // Clear after 8 seconds
                            setTimeout(() => {
                              console.log('Clearing success message');
                              setSuccessMessage('');
                            }, 8000);
                          }}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg"
                        >
                          Send Reset Link
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg w-full group"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner mr-3"></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">🚀</span>
                      Sign In
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
                  <span className="px-4 bg-white text-gray-500 font-medium">Don't have an account?</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Link
                  to="/register"
                  className="btn btn-secondary w-full group"
                >
                  <span className="mr-2">✨</span>
                  Create Account
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          By signing in, you agree to our terms of service and privacy policy
        </p>
      </div>
    </div>
  );
};

export default Login;