import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const userManager = UserManager.getInstance();
  const user = userManager.getCurrentUser();

  const handleLogout = () => {
    userManager.logout();
    navigate('/login');
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
