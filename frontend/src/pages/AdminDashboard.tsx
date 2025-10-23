import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserManager } from '../lib/userManager';
import api from '../lib/api';

interface AdminStats {
  total_users: number;
  total_quizzes: number;
  total_questions: number;
  flagged_questions: number;
  active_users_today: number;
  avg_quiz_score: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  skill_level: string;
  created_at: string;
  quiz_count: number;
}

interface FlaggedQuestion {
  id: number;
  question_text: string;
  question_type: string;
  flag_reason: string;
  flag_count: number;
  flagged_by: string[];
  status: 'pending' | 'reviewed' | 'resolved';
}

interface Feedback {
  id: number;
  question_id: number;
  user_id: number;
  username: string;
  feedback_text: string;
  rating: number;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestion[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'moderation' | 'feedback'>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userManager = UserManager.getInstance();
  const currentUser = userManager.getCurrentUser();

  useEffect(() => {
    // Check if user is admin
    if (!currentUser || currentUser.role !== 'admin') {
      setError('Unauthorized: Admin access required');
      setLoading(false);
      return;
    }

    fetchAdminData();
  }, [activeTab]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsData, usersData, flaggedData, feedbackData] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
        api.get('/admin/flagged-questions'),
        api.get('/admin/feedback')
      ]);

      setStats(statsData.data);
      setUsers(usersData.data.users || []);
      setFlaggedQuestions(flaggedData.data.flagged_questions || []);
      setFeedbacks(feedbackData.data.feedbacks || []);
    } catch (err: any) {
      console.error('Error fetching admin data:', err);
      setError(err.response?.data?.error || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleResolveFlag = async (questionId: number) => {
    try {
      await api.post(`/admin/resolve-flag/${questionId}`);
      fetchAdminData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to resolve flag');
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    
    try {
      await api.delete(`/admin/question/${questionId}`);
      fetchAdminData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete question');
    }
  };

  const handleUpdateUserRole = async (userId: number, newSkillLevel: string) => {
    try {
      await api.put(`/admin/users/${userId}/skill-level`, { skill_level: newSkillLevel });
      fetchAdminData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update user');
    }
  };

  const handleLogout = () => {
    userManager.logout();
    navigate('/login');
  };

  if (error && error.includes('Unauthorized')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full">
          <div className="card-body text-center">
            <span className="text-red-500 text-6xl mb-6 block">🚫</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button onClick={() => window.location.href = '/dashboard'} className="btn btn-primary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🛡️ Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage users, moderate content, and monitor platform health
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Logged in as</p>
              <p className="font-semibold text-gray-900">{currentUser?.full_name}</p>
              <p className="text-xs text-purple-600">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              <span className="mr-2">👋</span>
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'users', label: '👥 Users', icon: '👥' },
            { id: 'moderation', label: '🚩 Moderation', icon: '🚩' },
            { id: 'feedback', label: '💬 Feedback', icon: '💬' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="card">
            <div className="card-body text-center">
              <div className="spinner-large mb-4 mx-auto"></div>
              <p className="text-gray-600">Loading admin data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <div className="card-body">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">Total Users</h3>
                      <span className="text-4xl">👥</span>
                    </div>
                    <p className="text-4xl font-bold">{stats.total_users}</p>
                    <p className="text-blue-100 mt-2">{stats.active_users_today} active today</p>
                  </div>
                </div>

                <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <div className="card-body">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">Total Quizzes</h3>
                      <span className="text-4xl">📝</span>
                    </div>
                    <p className="text-4xl font-bold">{stats.total_quizzes}</p>
                    <p className="text-green-100 mt-2">Avg Score: {stats.avg_quiz_score.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <div className="card-body">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">Questions Generated</h3>
                      <span className="text-4xl">❓</span>
                    </div>
                    <p className="text-4xl font-bold">{stats.total_questions}</p>
                  </div>
                </div>

                <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
                  <div className="card-body">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">Flagged Content</h3>
                      <span className="text-4xl">🚩</span>
                    </div>
                    <p className="text-4xl font-bold">{stats.flagged_questions}</p>
                    <p className="text-red-100 mt-2">Requires review</p>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="card">
                <div className="card-body">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Skill Level</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quizzes</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{user.username}</div>
                              <div className="text-sm text-gray-500">{user.full_name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={user.skill_level}
                                onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                                className="text-sm border rounded px-2 py-1"
                              >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.quiz_count}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button className="text-blue-600 hover:text-blue-800">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Moderation Tab */}
            {activeTab === 'moderation' && (
              <div className="space-y-6">
                <div className="card">
                  <div className="card-body">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">🚩 Flagged Questions</h2>
                    {flaggedQuestions.length === 0 ? (
                      <p className="text-gray-600 text-center py-8">No flagged questions</p>
                    ) : (
                      <div className="space-y-4">
                        {flaggedQuestions.map(question => (
                          <div key={question.id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                                  {question.question_type}
                                </span>
                                <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                  {question.flag_count} flags
                                </span>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                question.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                question.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {question.status}
                              </span>
                            </div>
                            <p className="text-gray-900 font-medium mb-2">{question.question_text}</p>
                            <p className="text-red-600 text-sm mb-3">
                              <strong>Reason:</strong> {question.flag_reason}
                            </p>
                            <p className="text-gray-600 text-sm mb-4">
                              Flagged by: {question.flagged_by.join(', ')}
                            </p>
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleResolveFlag(question.id)}
                                className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
                              >
                                ✓ Resolve
                              </button>
                              <button
                                onClick={() => handleDeleteQuestion(question.id)}
                                className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <div className="card">
                <div className="card-body">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">💬 User Feedback</h2>
                  {feedbacks.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No feedback yet</p>
                  ) : (
                    <div className="space-y-4">
                      {feedbacks.map(feedback => (
                        <div key={feedback.id} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="font-semibold text-gray-900">{feedback.username}</span>
                              <span className="text-gray-500 text-sm ml-2">
                                {new Date(feedback.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {'⭐'.repeat(feedback.rating)}
                              <span className="ml-2 text-gray-600">({feedback.rating}/5)</span>
                            </div>
                          </div>
                          <p className="text-gray-700">{feedback.feedback_text}</p>
                          <p className="text-gray-500 text-sm mt-2">Question ID: {feedback.question_id}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
