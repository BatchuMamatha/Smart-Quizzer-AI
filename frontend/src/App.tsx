import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserManager } from './lib/userManager';

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import History from './pages/History';
import Analytics from './pages/Analytics';
import ContentUploadPage from './pages/ContentUploadPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import Leaderboard from './pages/Leaderboard';

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
            path="/leaderboard" 
            element={
              <UserRoute>
                <Leaderboard />
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
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;