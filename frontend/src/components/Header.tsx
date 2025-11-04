import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserManager } from '../lib/userManager';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backPath?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = '🧠 Smart Quizzer', 
  subtitle = 'AI-Powered Learning Platform',
  showBackButton = false,
  backPath = '/dashboard'
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userManager = UserManager.getInstance();
  const user = userManager.getCurrentUser();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    userManager.logout();
    navigate('/login');
  };

  const navigationItems: { path: string; label: string; highlight?: boolean }[] = [
    { path: '/dashboard', label: '🏠 Dashboard' },
    { path: '/analytics', label: '📊 Analytics' },
    { path: '/history', label: '📜 History' },
    { path: '/leaderboard', label: '🏆 Leaderboard' },
    { path: '/content-upload', label: '📁 Upload Content' },
    { path: '/profile', label: '👤 Profile' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setShowMenu(false);
  };

  return (
    <header className="relative bg-white bg-opacity-80 backdrop-blur-md shadow-lg border-b border-white border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4 animate-fade-in-up">
            {showBackButton && (
              <button
                onClick={() => navigate(backPath)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                <span className="mr-2">←</span>
                Back
              </button>
            )}
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">
                {title}
              </h1>
              <p className="text-gray-600 font-medium">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 animate-slide-in-right">
            {/* Navigation Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                <span className="mr-2">📍</span>
                Go To
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-2 space-y-1">
                    {navigationItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          location.pathname === item.path
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">Welcome back,</p>
              <p className="text-lg font-bold text-gradient">{user?.full_name || user?.username || 'User'}</p>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              <span className="mr-2">👤</span>
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
            >
              <span className="mr-2">👋</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
