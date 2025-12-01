import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserManager } from './lib/userManager';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { serviceWorkerManager } from './lib/serviceWorkerManager';
import OfflineIndicator from './components/OfflineIndicator';
import MobileIndicator from './components/MobileIndicator';
import ToastContainer from './components/ToastContainer';
import { useToast } from './hooks/useToast';

// Import pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRegister from './pages/AdminRegister';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import History from './pages/History';
import Analytics from './pages/Analytics';
import ContentUploadPage from './pages/ContentUploadPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

const userManager = UserManager.getInstance();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = userManager.isAuthenticated();
      setIsAuthenticated(authenticated);
    };

    checkAuth();

    // Listen for authentication changes
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = userManager.isAuthenticated();
      const admin = userManager.isAdmin();
      setIsAuthenticated(authenticated);
      setIsAdmin(admin);
    };

    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isAuthenticated === null || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const UserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = userManager.isAuthenticated();
      const admin = userManager.isAdmin();
      setIsAuthenticated(authenticated);
      setIsAdmin(admin);
    };

    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isAuthenticated === null || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { toasts, removeToast } = useToast();

  // Register service worker for offline support
  useEffect(() => {
    serviceWorkerManager.register();
  }, []);

  // Ensure dark theme is properly applied to body
  useEffect(() => {
    const updateBodyClass = () => {
      if (document.documentElement.classList.contains('dark')) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    };

    // Initial update
    updateBodyClass();

    // Watch for changes to the html dark class
    const observer = new MutationObserver(updateBodyClass);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="App">
            {/* Toast notifications */}
            <ToastContainer toasts={toasts} onClose={removeToast} position="top-right" />
            
            {/* Offline status indicator */}
            <OfflineIndicator showWhenOnline />
            
            {/* Mobile breakpoint indicator (development only) */}
            {process.env.NODE_ENV === 'development' && <MobileIndicator position="bottom-right" />}
            
            <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route 
            path="/dashboard" 
            element={
              <UserRoute>
                <Dashboard />
              </UserRoute>
            } 
          />
          <Route 
            path="/quiz" 
            element={
              <UserRoute>
                <Quiz />
              </UserRoute>
            } 
          />
          <Route 
            path="/results" 
            element={
              <UserRoute>
                <Results />
              </UserRoute>
            } 
          />
          <Route 
            path="/history" 
            element={
              <UserRoute>
                <History />
              </UserRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <UserRoute>
                <Analytics />
              </UserRoute>
            } 
          />
          <Route 
            path="/content-upload" 
            element={
              <UserRoute>
                <ContentUploadPage />
              </UserRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <UserRoute>
                <ProfilePage />
              </UserRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;