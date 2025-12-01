import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserManager } from '../lib/userManager';
import Header from '../components/Header';

interface ProfileFormData {
  full_name: string;
  email: string;
  username: string;
  phone_number: string;
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
    phone_number: '',
    skill_level: 'Intermediate'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [emailAvailability, setEmailAvailability] = useState<{
    checking: boolean;
    available: boolean | null;
    message: string;
  }>({ checking: false, available: null, message: '' });
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setFormData({
      full_name: user.full_name || '',
      email: user.email || '',
      username: user.username || '',
      phone_number: user.phone_number || '',
      skill_level: user.skill_level || 'Intermediate'
    });
    
    const fetchUserStats = async () => {
      // Fetch additional user stats if needed
    };
    
    fetchUserStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check email availability when user changes email
    if (name === 'email' && user) {
      const emailValue = value.trim();
      // Only check if email is different from current email and has valid format
      if (emailValue && emailValue !== user.email && emailValue.includes('@')) {
        checkEmailAvailability(emailValue);
      } else if (emailValue === user.email) {
        // Reset if user goes back to their original email
        setEmailAvailability({ checking: false, available: null, message: '' });
      } else {
        // Clear status for empty or invalid email
        setEmailAvailability({ checking: false, available: null, message: '' });
      }
    }
  };

  const checkEmailAvailability = async (email: string) => {
    if (!email || !user) return;

    setEmailAvailability({ checking: true, available: null, message: 'Checking...' });

    try {
      const { authAPI } = await import('../lib/api');
      const result = await authAPI.checkEmailAvailability(email, user.id);
      setEmailAvailability({
        checking: false,
        available: result.available,
        message: result.message
      });
    } catch (error) {
      setEmailAvailability({
        checking: false,
        available: null,
        message: 'Error checking email'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      // Validate form data
      if (!formData.full_name.trim() || !formData.email.trim()) {
        throw new Error('Name and email are required');
      }

      // Check if email changed and is not available
      if (user && formData.email !== user.email && emailAvailability.available === false) {
        throw new Error('Email is already in use by another account');
      }

      // Call API to update profile
      const { authAPI } = await import('../lib/api');
      const response = await authAPI.updateProfile({
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone_number.trim() || undefined,
        skill_level: formData.skill_level
      });

      // Update local user data
      userManager.updateUser(response.user);
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear email availability status
      setEmailAvailability({ checking: false, available: null, message: '' });
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);

    } catch (error: any) {
      console.error('Profile update error:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload PNG, JPG, GIF, or WEBP images.');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('File too large. Maximum size is 5MB.');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload avatar
    setIsUploadingAvatar(true);
    setError('');
    setSuccess('');

    try {
      const { authAPI } = await import('../lib/api');
      const response = await authAPI.uploadAvatar(file);
      
      // Update local user data
      userManager.updateUser(response.user);
      setSuccess('Profile picture updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (error: any) {
      console.error('Avatar upload error:', error);
      setError(error.response?.data?.error || 'Failed to upload profile picture');
      setAvatarPreview(null);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!window.confirm('Are you sure you want to remove your profile picture?')) {
      return;
    }

    setIsUploadingAvatar(true);
    setError('');
    setSuccess('');

    try {
      const { authAPI } = await import('../lib/api');
      const response = await authAPI.deleteAvatar();
      
      // Update local user data
      userManager.updateUser(response.user);
      setAvatarPreview(null);
      setSuccess('Profile picture removed successfully!');
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (error: any) {
      console.error('Avatar delete error:', error);
      setError(error.response?.data?.error || 'Failed to remove profile picture');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        username: user.username || '',
        phone_number: user.phone_number || '',
        skill_level: user.skill_level || 'Intermediate'
      });
    }
    setIsEditing(false);
    setError('');
    setSuccess('');
    setEmailAvailability({ checking: false, available: null, message: '' });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <Header 
        title="👤 User Profile" 
        subtitle="Manage your account settings and preferences"
        showBackButton={true}
        backPath="/dashboard"
      />

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Avatar Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-lg border border-white dark:border-gray-700 border-opacity-30 rounded-2xl shadow-xl p-6">
              <div className="text-center">
                {/* Avatar Display */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                  {avatarPreview || user?.avatar_url ? (
                    <img
                      src={avatarPreview || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${user?.avatar_url}`}
                      alt={user?.full_name}
                      className="w-full h-full rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-4xl font-bold">
                        {user?.full_name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {/* Upload Overlay */}
                  {isUploadingAvatar && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Avatar Upload Buttons */}
                <div className="flex justify-center gap-2 mb-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {user?.avatar_url ? '📷 Change' : '📷 Upload'}
                  </button>
                  {user?.avatar_url && (
                    <button
                      onClick={handleDeleteAvatar}
                      disabled={isUploadingAvatar}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      🗑️ Remove
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Max 5MB • PNG, JPG, GIF, WEBP
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user?.full_name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-2">@{user?.username}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {user?.skill_level === 'Beginner' ? '🌱' : user?.skill_level === 'Intermediate' ? '🚀' : '🏆'} {user?.skill_level}
                </div>
                
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Member Since:</span>
                    <span className="font-medium dark:text-gray-200">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Quizzes Taken:</span>
                    <span className="font-medium dark:text-gray-200">{user?.total_quizzes ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Average Score:</span>
                    <span className="font-medium dark:text-gray-200">{user?.average_score ?? 0}%</span>
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
                  <div className="relative">
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
                    {isEditing && user && formData.email !== user.email && formData.email.includes('@') && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {emailAvailability.checking ? (
                          <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                        ) : emailAvailability.available === true ? (
                          <span className="text-green-500 text-xl">✅</span>
                        ) : emailAvailability.available === false ? (
                          <span className="text-red-500 text-xl">❌</span>
                        ) : null}
                      </div>
                    )}
                  </div>
                  {isEditing && user && formData.email !== user.email && emailAvailability.message && (
                    <p className={`text-sm mt-1 ${
                      emailAvailability.available === true ? 'text-green-600' :
                      emailAvailability.available === false ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {emailAvailability.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📱 Phone Number <span className="text-gray-400 text-sm font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    pattern="[+]?[0-9]{10,15}"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      isEditing 
                        ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                    placeholder="+1234567890"
                  />
                  {isEditing && (
                    <p className="text-xs text-gray-500 mt-1">
                      💡 Format: +1234567890 (10-15 digits, optional + prefix)
                    </p>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🏷️ Username <span className="text-gray-500 text-xs font-normal">(cannot be changed)</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    disabled={true}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 cursor-not-allowed text-gray-600"
                    readOnly
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    ℹ️ Your username is permanent and cannot be modified
                  </p>
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