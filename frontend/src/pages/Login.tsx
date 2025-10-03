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
  const [showPassword, setShowPassword] = useState(false);
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
              </div>

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