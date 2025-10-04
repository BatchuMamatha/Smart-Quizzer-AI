import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserManager } from '../lib/userManager';

interface ProfileFormData {
  full_name: string;
  email: string;
  username: string;
  skill_level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const userManager = UserManager.getInstance();
  const user = userManager.getCurrentUser();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    email: '',
    username: '',
    skill_level: 'Intermediate'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setFormData({
      full_name: user.full_name || '',
      email: user.email || '',
      username: user.username || '',
      skill_level: user.skill_level || 'Intermediate'
    });
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      // Validate form data
      if (!formData.full_name.trim() || !formData.email.trim() || !formData.username.trim()) {
        throw new Error('All fields are required');
      }

      // For now, we'll update the local user data
      // In a real app, this would make an API call
      const updatedUser = {
        ...user!,
        ...formData,
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        username: formData.username.trim()
      };

      // Update user in memory (simulate API update)
      userManager.updateUser(updatedUser);
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);

    } catch (error: any) {
      console.error('Profile update error:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        username: user.username || '',
        skill_level: user.skill_level || 'Intermediate'
      });
    }
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const handleLogout = () => {
    userManager.logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white bg-opacity-80 backdrop-blur-md shadow-lg border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span className="text-2xl">←</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gradient">
                  👤 User Profile
                </h1>
                <p className="text-gray-600">Manage your account settings and preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">Logged in as,</p>
                <p className="text-lg font-bold text-gradient">{user?.full_name}</p>
              </div>
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

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Avatar Section */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-xl p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-3xl font-bold">
                    {user?.full_name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{user?.full_name}</h3>
                <p className="text-gray-500 mb-2">@{user?.username}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {user?.skill_level === 'Beginner' ? '🌱' : user?.skill_level === 'Intermediate' ? '🚀' : '🏆'} {user?.skill_level}
                </div>
                
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since:</span>
                    <span className="font-medium">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quizzes Taken:</span>
                    <span className="font-medium">{user?.total_quizzes ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Score:</span>
                    <span className="font-medium">{user?.average_score ?? 0}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  <p className="text-gray-600">Update your personal details and preferences</p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                  >
                    <span className="mr-2">✏️</span>
                    Edit Profile
                  </button>
                )}
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <span className="text-green-500 text-xl mr-3 mt-1">✅</span>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-1">Success</h4>
                      <p className="text-green-700">{success}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <span className="text-red-500 text-xl mr-3 mt-1">❌</span>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">Error</h4>
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👤 Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      isEditing 
                        ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📧 Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      isEditing 
                        ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🏷️ Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      isEditing 
                        ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                    placeholder="Enter your username"
                  />
                </div>

                {/* Skill Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎯 Skill Level
                  </label>
                  <select
                    name="skill_level"
                    value={formData.skill_level}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      isEditing 
                        ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  >
                    <option value="Beginner">🌱 Beginner</option>
                    <option value="Intermediate">🚀 Intermediate</option>
                    <option value="Advanced">🏆 Advanced</option>
                  </select>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSaving ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Saving...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span className="mr-2">💾</span>
                          Save Changes
                        </div>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                    >
                      <span className="mr-2">❌</span>
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;