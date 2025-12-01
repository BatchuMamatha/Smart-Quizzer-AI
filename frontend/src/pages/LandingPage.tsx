import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const adminMenuRef = useRef<HTMLDivElement>(null);

  // Close admin menu when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node)) {
        setShowAdminMenu(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowAdminMenu(false);
      }
    };

    if (showAdminMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showAdminMenu]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="bg-white bg-opacity-80 backdrop-blur-md shadow-md dark:bg-gray-800 dark:bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">🧠</span>
              <h1 className="text-2xl font-bold text-gradient dark:text-blue-400">Smart Quizzer AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Admin Access Dropdown */}
              <div className="relative" ref={adminMenuRef}>
                <button
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowAdminMenu(!showAdminMenu);
                    }
                    if (e.key === 'Escape') {
                      setShowAdminMenu(false);
                    }
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors flex items-center dark:text-gray-300 dark:hover:text-indigo-400"
                  title="Admin Access"
                  aria-expanded={showAdminMenu}
                  aria-haspopup="true"
                >
                  <span className="mr-1">🔐</span>
                  Admin Access
                  <span className="ml-1 text-xs">{showAdminMenu ? '▲' : '▼'}</span>
                </button>
                
                {showAdminMenu && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fade-in dark:bg-gray-800 dark:border-gray-600"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowAdminMenu(false);
                        navigate('/login?admin=true');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setShowAdminMenu(false);
                          navigate('/login?admin=true');
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center dark:text-gray-300 dark:hover:bg-indigo-900 dark:hover:text-indigo-400"
                    >
                      <span className="mr-2">🔑</span>
                      Admin Login
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowAdminMenu(false);
                        navigate('/admin-register');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setShowAdminMenu(false);
                          navigate('/admin-register');
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center dark:text-gray-300 dark:hover:bg-indigo-900 dark:hover:text-indigo-400"
                    >
                      <span className="mr-2">📝</span>
                      Admin Registration
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 text-gray-700 font-semibold hover:text-blue-600 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Master Any Topic with
            <span className="text-gradient dark:text-blue-400 block mt-2">AI-Powered Quizzes</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your learning experience with personalized quizzes generated by advanced AI. 
            Track your progress, compete on leaderboards, and achieve mastery in any subject.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
            >
              <span className="mr-2">🚀</span>
              Get Started Free
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 transform hover:-translate-y-1 transition-all duration-200"
            >
              <span className="mr-2">👤</span>
              Login to Continue
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-200 hover:shadow-2xl">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">AI-Generated Questions</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our advanced AI creates unique, relevant questions tailored to your skill level and learning goals.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-200 hover:shadow-2xl">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Performance Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track your progress with detailed analytics, identify weak areas, and watch your improvement over time.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-200 hover:shadow-2xl">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Competitive Leaderboards</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Compete with learners worldwide, earn badges, and climb the ranks to become a quiz master.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">1️⃣</span>
              </div>
              <h4 className="font-bold text-lg mb-2 dark:text-gray-200">Sign Up</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Create your free account in seconds</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">2️⃣</span>
              </div>
              <h4 className="font-bold text-lg mb-2 dark:text-gray-200">Choose Topic</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Select from various subjects or upload custom content</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">3️⃣</span>
              </div>
              <h4 className="font-bold text-lg mb-2 dark:text-gray-200">Take Quiz</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Answer AI-generated questions at your skill level</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">4️⃣</span>
              </div>
              <h4 className="font-bold text-lg mb-2 dark:text-gray-200">Track Progress</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Review results and improve your knowledge</p>
            </div>
          </div>
        </div>

        {/* Key Features List */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-10 text-white">
          <h3 className="text-3xl font-bold text-center mb-8">Why Choose Smart Quizzer AI?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Adaptive Learning</h4>
                <p className="text-blue-100">Questions adapt to your performance in real-time</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Custom Content Upload</h4>
                <p className="text-blue-100">Generate quizzes from your own PDFs, documents, or text</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Multiple Question Types</h4>
                <p className="text-blue-100">MCQs, True/False, and Short Answer questions</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Instant Feedback</h4>
                <p className="text-blue-100">Get detailed explanations for every answer</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Progress Tracking</h4>
                <p className="text-blue-100">Monitor your improvement with visual analytics</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Gamification</h4>
                <p className="text-blue-100">Earn badges and compete on global leaderboards</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 py-12">
          <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Ready to Start Learning?</h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Join thousands of learners improving their knowledge every day</p>
          <button
            onClick={() => navigate('/register')}
            className="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-200"
          >
            <span className="mr-2">🎯</span>
            Start Your Journey Now
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-3 flex items-center">
                <span className="text-2xl mr-2">🧠</span>
                Smart Quizzer AI
              </h4>
              <p className="text-gray-400 text-sm">
                Empowering learners with AI-driven personalized quizzes and adaptive learning experiences.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => navigate('/login')} className="text-gray-400 hover:text-white transition-colors">
                    Login
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/register')} className="text-gray-400 hover:text-white transition-colors">
                    Sign Up
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-3">Admin Portal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => navigate('/login?admin=true')} className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="mr-1">🔑</span>
                    Admin Login
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/admin-register')} className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="mr-1">📝</span>
                    Admin Registration
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✨ AI-Powered Questions</li>
                <li>📈 Performance Analytics</li>
                <li>🏆 Leaderboards & Badges</li>
                <li>📁 Custom Content Upload</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => navigate('/privacy-policy')} className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/terms-of-service')} className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>&copy; 2025 Smart Quizzer AI. All rights reserved. Powered by Gemini AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
