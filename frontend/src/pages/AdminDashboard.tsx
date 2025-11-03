import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserManager } from '../lib/userManager';
import api from '../lib/api';
import socketService from '../lib/socket';

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
  question_id: number;
  question_text: string;
  question_type: string;
  difficulty: string;
  flag_reason: string;
  flag_count: number;
  flagged_by: string[];
  flagged_by_email: string;
  status: 'pending' | 'reviewed' | 'resolved';
  flagged_at: string;
  resolved_at?: string;
}

interface Feedback {
  id: number;
  question_id: number;
  question_text: string;
  question_type: string;
  difficulty: string;
  user_id: number;
  username: string;
  user_email: string;
  feedback_text: string;
  rating: number;
  created_at: string;
}

interface LeaderboardEntry {
  id: number;
  user_id: number;
  username: string;
  full_name: string;
  email: string;
  quiz_session_id: number;
  topic: string;
  // score: removed - admin leaderboard shows recent activity, not rankings
  correct_count: number;
  total_questions: number;
  accuracy: number;
  time_taken: number;
  rank: number;
  timestamp: string;
  submitted_at: string;  // Added: quiz completion timestamp
}

interface UserSummary {
  user_id: number;
  username: string;
  full_name: string;
  email: string;
  role: string;
  total_quizzes: number;
  // avg_score: removed - focus on accuracy instead
  total_correct: number;
  total_questions: number;
  overall_accuracy: number;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestion[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [usersSummary, setUsersSummary] = useState<UserSummary[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'moderation' | 'feedback' | 'leaderboard'>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isConnected, setIsConnected] = useState(false);
  
  // Leaderboard filters
  const [searchTerm, setSearchTerm] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [leaderboardView, setLeaderboardView] = useState<'entries' | 'users'>('entries');
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  // Question view modal
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  
  // User detail modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  
  // Moderation filter
  const [flagStatusFilter, setFlagStatusFilter] = useState<'all' | 'pending' | 'resolved'>('pending');

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
    
    // 🔥 NEW: Connect WebSocket for real-time admin leaderboard updates
    const socket = socketService.getSocket();
    
    // Wait for connection before joining room
    const setupWebSocket = () => {
      setIsConnected(socketService.getConnectionStatus());
      
      // Join admin leaderboard room for global updates
      socketService.joinLeaderboardRoom('admin_global');
      
      // Listen for leaderboard updates from ANY quiz completion
      socketService.onLeaderboardUpdate((updateData) => {
        console.log('🔔 Admin received leaderboard update:', updateData);
        
        // If we're on the leaderboard tab, refresh it
        if (activeTab === 'leaderboard') {
          console.log('🔄 Auto-refreshing admin leaderboard...');
          fetchLeaderboard();
          setLastUpdated(new Date());
        }
      });
    };

    // If already connected, set up immediately
    if (socket && socket.connected) {
      setupWebSocket();
    } else if (socket) {
      // Wait for connection event
      socket.once('connect', () => {
        setupWebSocket();
      });
    }

    // Monitor connection status changes
    const checkConnection = setInterval(() => {
      setIsConnected(socketService.getConnectionStatus());
    }, 2000);
    
    // Cleanup WebSocket on unmount
    return () => {
      clearInterval(checkConnection);
      socketService.leaveLeaderboardRoom('admin_global');
      socketService.offLeaderboardUpdate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing admin data...');
      fetchAdminData();
    }, 30000); // 30 seconds

    return () => clearInterval(refreshInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh, activeTab]);

  // Refetch when flag status filter changes
  useEffect(() => {
    if (activeTab === 'moderation') {
      fetchAdminData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagStatusFilter]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      if (activeTab === 'leaderboard') {
        await fetchLeaderboard();
      } else {
        const flaggedParams = activeTab === 'moderation' ? `?status=${flagStatusFilter}` : '';
        
        const [statsData, usersData, flaggedData, feedbackData] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/users'),
          api.get(`/admin/flagged-questions${flaggedParams}`),
          api.get('/admin/feedback')
        ]);

        setStats(statsData.data);
        setUsers(usersData.data.users || []);
        setFlaggedQuestions(flaggedData.data.flagged_questions || []);
        setFeedbacks(feedbackData.data.feedbacks || []);
      }
    } catch (err: any) {
      console.error('Error fetching admin data:', err);
      setError(err.response?.data?.error || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchLeaderboard = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (topicFilter) params.append('topic', topicFilter);
      params.append('limit', '100');
      
      console.log('📊 Fetching admin leaderboard...', { search: searchTerm, topic: topicFilter });
      const response = await api.get(`/admin/leaderboard?${params.toString()}`);
      setLeaderboard(response.data.leaderboard || []);
      setUsersSummary(response.data.users_summary || []);
      setLastUpdated(new Date());
      console.log(`✅ Admin leaderboard loaded: ${response.data.leaderboard?.length || 0} entries`);
    } catch (err: any) {
      console.error('Error fetching leaderboard:', err);
      setError(err.response?.data?.error || 'Failed to load leaderboard');
    }
  };

  const handleResolveFlag = async (flagId: number) => {
    try {
      await api.post(`/admin/resolve-flag/${flagId}`);
      alert('Flag resolved successfully');
      fetchAdminData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to resolve flag');
    }
  };

  const handleDeleteQuestion = async (flagId: number) => {
    if (!window.confirm('Are you sure you want to delete this question? This will also resolve all flags for it.')) return;
    
    try {
      await api.delete(`/admin/delete-flagged-question/${flagId}`);
      alert('Question deleted and flags resolved successfully');
      fetchAdminData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete question');
    }
  };

  const handleViewQuestion = async (questionId: number) => {
    try {
      const response = await api.get(`/questions/${questionId}`);
      setSelectedQuestion(response.data);
      setShowQuestionModal(true);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to load question details');
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'users', label: '👥 Users', icon: '👥' },
              { id: 'leaderboard', label: '🏆 Leaderboard', icon: '🏆' },
              { id: 'moderation', label: '🚩 Moderation', icon: '🚩' },
              { id: 'feedback', label: '💬 Feedback', icon: '💬' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Auto-refresh Toggle */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-sm text-gray-600">Auto-refresh</span>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoRefresh ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoRefresh ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-xs text-gray-500">
              {autoRefresh ? '🔄 On' : '⏸️ Off'}
            </span>
          </div>
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
                              <button 
                                onClick={() => handleViewUser(user)}
                                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                              >
                                👁️ View
                              </button>
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
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">🚩 Flagged Questions</h2>
                        <p className="text-gray-600 text-sm mt-1">
                          Questions flagged by users for review
                        </p>
                      </div>
                      
                      {/* Status Filter */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 font-medium">Filter:</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setFlagStatusFilter('pending')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                              flagStatusFilter === 'pending'
                                ? 'bg-orange-600 text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            🟡 Pending
                          </button>
                          <button
                            onClick={() => setFlagStatusFilter('resolved')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                              flagStatusFilter === 'resolved'
                                ? 'bg-green-600 text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            ✅ Resolved
                          </button>
                          <button
                            onClick={() => setFlagStatusFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                              flagStatusFilter === 'all'
                                ? 'bg-blue-600 text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            📋 All
                          </button>
                        </div>
                        <span className="px-3 py-2 bg-purple-100 text-purple-800 rounded-lg font-semibold text-sm">
                          {flaggedQuestions.length} {flagStatusFilter !== 'all' ? flagStatusFilter : 'total'}
                        </span>
                      </div>
                    </div>
                    
                    {flaggedQuestions.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">
                          {flagStatusFilter === 'pending' ? '✅' : flagStatusFilter === 'resolved' ? '🎉' : '📋'}
                        </div>
                        <p className="text-gray-600 text-lg font-medium">
                          {flagStatusFilter === 'pending' 
                            ? 'No pending flagged questions' 
                            : flagStatusFilter === 'resolved'
                            ? 'No resolved flagged questions'
                            : 'No flagged questions found'}
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          {flagStatusFilter === 'pending' 
                            ? 'Great! All questions are in good shape.'
                            : 'Questions flagged by users will appear here'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {flaggedQuestions.map(question => (
                          <div key={question.id} className="border-2 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1 flex items-center gap-2 flex-wrap">
                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                                  {question.question_type}
                                </span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                  {question.difficulty}
                                </span>
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                  🚩 {question.flag_count} {question.flag_count === 1 ? 'flag' : 'flags'}
                                </span>
                                <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                                  question.status === 'pending' 
                                    ? 'bg-orange-500 text-white' 
                                    : question.status === 'reviewed' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-green-500 text-white'
                                }`}>
                                  {question.status === 'pending' && '🟡 PENDING'}
                                  {question.status === 'reviewed' && '🔵 REVIEWED'}
                                  {question.status === 'resolved' && '✅ RESOLVED'}
                                </span>
                              </div>
                            </div>
                            
                            {/* Question Text */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-3 border-l-4 border-orange-500">
                              <p className="text-gray-900 font-medium">{question.question_text}</p>
                            </div>
                            
                            {/* Flag Reason */}
                            <div className="bg-red-50 rounded-lg p-3 mb-3 border-l-4 border-red-500">
                              <p className="text-red-800 text-sm">
                                <strong>Flag Reason:</strong> {question.flag_reason}
                              </p>
                            </div>
                            
                            {/* Flagged By Info */}
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-gray-600 text-sm font-medium">Flagged by:</span>
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-lg text-sm font-semibold">
                                {question.flagged_by.join(', ')}
                              </span>
                              <span className="text-gray-500 text-sm">
                                ({question.flagged_by_email})
                              </span>
                              <span className="text-gray-500 text-sm ml-auto">
                                {new Date(question.flagged_at).toLocaleDateString()} at {new Date(question.flagged_at).toLocaleTimeString()}
                              </span>
                            </div>
                            
                            {/* Only show action buttons for pending flags */}
                            {question.status === 'pending' && (
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => handleViewQuestion(question.question_id)}
                                  className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                                >
                                  👁️ View Question
                                </button>
                                <button
                                  onClick={() => handleResolveFlag(question.id)}
                                  className="btn btn-sm bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
                                >
                                  ✓ Mark as Resolved
                                </button>
                                <button
                                  onClick={() => handleDeleteQuestion(question.id)}
                                  className="btn btn-sm bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
                                >
                                  🗑️ Delete Question
                                </button>
                              </div>
                            )}
                            
                            {/* Show resolved info for resolved flags */}
                            {question.status === 'resolved' && (
                              <div className="flex items-center gap-3 text-sm bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                <span className="text-3xl">✅</span>
                                <div>
                                  <p className="font-semibold text-green-800">Resolved Successfully</p>
                                  {question.resolved_at && (
                                    <p className="text-green-700">
                                      On {new Date(question.resolved_at).toLocaleDateString()} at {new Date(question.resolved_at).toLocaleTimeString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
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
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">💬 User Feedback</h2>
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
                      {feedbacks.length} Total Feedback{feedbacks.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  {feedbacks.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📭</div>
                      <p className="text-gray-600 text-lg font-medium">No feedback available yet</p>
                      <p className="text-gray-500 text-sm mt-2">User feedback will appear here after users complete quizzes</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {feedbacks.map(feedback => (
                        <div key={feedback.id} className="border-2 rounded-lg p-5 bg-white hover:shadow-md transition-all">
                          {/* Header with user info and rating */}
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-gray-900 text-lg">{feedback.username}</span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
                                  {feedback.user_email}
                                </span>
                              </div>
                              <span className="text-gray-500 text-sm">
                                📅 {new Date(feedback.created_at).toLocaleDateString()} at {new Date(feedback.created_at).toLocaleTimeString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col items-end">
                                <div className="flex items-center">
                                  {'⭐'.repeat(feedback.rating)}
                                  {'☆'.repeat(5 - feedback.rating)}
                                </div>
                                <span className="text-xs text-gray-600 mt-1">({feedback.rating}/5)</span>
                              </div>
                            </div>
                          </div>

                          {/* Feedback text */}
                          <div className="bg-gray-50 rounded-lg p-4 mb-3 border-l-4 border-purple-500">
                            <p className="text-gray-800 leading-relaxed">{feedback.feedback_text}</p>
                          </div>

                          {/* Question summary and view button */}
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold">
                                {feedback.question_type}
                              </span>
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
                                {feedback.difficulty}
                              </span>
                              <span className="text-gray-600 text-sm">
                                Question ID: {feedback.question_id}
                              </span>
                            </div>
                            <button
                              onClick={() => handleViewQuestion(feedback.question_id)}
                              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                            >
                              👁️ View Question
                            </button>
                          </div>

                          {/* Question preview */}
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm text-gray-600 font-medium mb-1">Question Preview:</p>
                            <p className="text-gray-700 text-sm italic">"{feedback.question_text.substring(0, 100)}{feedback.question_text.length > 100 ? '...' : ''}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="card">
                  <div className="card-body">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">🏆 Global Leaderboard</h2>
                      
                      {/* Real-Time Status Indicators */}
                      <div className="flex items-center space-x-4">
                        {/* WebSocket Connection Status */}
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                          <span className={`text-sm font-medium ${isConnected ? 'text-green-700' : 'text-red-700'}`}>
                            {isConnected ? 'Live Updates ON' : 'Disconnected'}
                          </span>
                        </div>
                        
                        {/* Last Updated Timestamp */}
                        <div className="text-sm text-gray-600">
                          Last updated: {lastUpdated.toLocaleTimeString()}
                        </div>
                        
                        {/* Manual Refresh Button */}
                        <button
                          onClick={() => {
                            fetchLeaderboard();
                            setAutoRefresh(true);
                          }}
                          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2"
                          title="Manually refresh leaderboard"
                        >
                          <span>🔄</span>
                          <span>Refresh</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <input
                        type="text"
                        placeholder="🔍 Search by username or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="📚 Filter by topic..."
                        value={topicFilter}
                        onChange={(e) => setTopicFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        onClick={fetchLeaderboard}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                      >
                        🔍 Search
                      </button>
                    </div>

                    {/* View Toggle */}
                    <div className="flex space-x-2 mb-4">
                      <button
                        onClick={() => setLeaderboardView('entries')}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                          leaderboardView === 'entries'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        � Recent Activity
                      </button>
                      <button
                        onClick={() => setLeaderboardView('users')}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                          leaderboardView === 'users'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        👥 User Statistics
                      </button>
                    </div>
                  </div>
                </div>

                {/* Leaderboard Entries View */}
                {leaderboardView === 'entries' && (
                  <div className="card">
                    <div className="card-body">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        🏆 Performance Leaderboard ({leaderboard.length} users ranked)
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Showing each user's most recent quiz attempt, ranked by: 1) Correct Answers (higher is better), 2) Time Taken (faster is better)
                      </p>
                      {leaderboard.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">No quiz attempts found</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correct Answers</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Taken</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {leaderboard.map((entry, index) => (
                                <tr key={entry.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      {index < 3 && (
                                        <span className="text-2xl mr-2">
                                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                                        </span>
                                      )}
                                      <span className="text-sm font-bold text-gray-900">#{index + 1}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{entry.username}</div>
                                    <div className="text-sm text-gray-500">{entry.full_name}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                      {entry.topic}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-gray-900">
                                      {entry.correct_count}/{entry.total_questions}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`text-sm font-semibold ${
                                      entry.accuracy >= 80 ? 'text-green-600' : 
                                      entry.accuracy >= 60 ? 'text-blue-600' : 
                                      entry.accuracy >= 40 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                      {entry.accuracy}%
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {Math.floor(entry.time_taken / 60)}m {entry.time_taken % 60}s
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div>{new Date(entry.submitted_at).toLocaleDateString()}</div>
                                    <div className="text-xs text-gray-400">{new Date(entry.submitted_at).toLocaleTimeString()}</div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* User Statistics View */}
                {leaderboardView === 'users' && (
                  <div className="card">
                    <div className="card-body">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        👥 User Performance Statistics ({usersSummary.length} users)
                      </h3>
                      {usersSummary.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">No user statistics available</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Quizzes</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Accuracy</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Correct</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Questions</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {usersSummary
                                .sort((a, b) => b.overall_accuracy - a.overall_accuracy)
                                .map((user, index) => (
                                <tr key={user.user_id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      {index < 3 && (
                                        <span className="text-xl mr-2">
                                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                                        </span>
                                      )}
                                      <div>
                                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                        <div className="text-sm text-gray-500">{user.full_name}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                      user.role === 'admin' 
                                        ? 'bg-purple-100 text-purple-800' 
                                        : 'bg-green-100 text-green-800'
                                    }`}>
                                      {user.role}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                    {user.total_quizzes}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className={`text-sm font-semibold ${
                                        user.overall_accuracy >= 80 ? 'text-green-600' :
                                        user.overall_accuracy >= 60 ? 'text-blue-600' :
                                        user.overall_accuracy >= 40 ? 'text-yellow-600' : 'text-red-600'
                                      }`}>
                                        {user.overall_accuracy}%
                                      </div>
                                      <div className="ml-2 text-xs text-gray-500">
                                        ({user.total_correct}/{user.total_questions})
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {user.total_correct}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.total_questions}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Question View Modal */}
      {showQuestionModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowQuestionModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
              <h3 className="text-2xl font-bold">📝 Question Details</h3>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Question Type & Difficulty */}
              <div className="flex gap-3">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
                  {selectedQuestion.question_type}
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg font-semibold">
                  {selectedQuestion.difficulty} Level
                </span>
              </div>

              {/* Question Text */}
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-600">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Question:</h4>
                <p className="text-lg text-gray-900">{selectedQuestion.question_text}</p>
              </div>

              {/* Multiple Choice Options */}
              {(selectedQuestion.question_type === 'MCQ' || selectedQuestion.question_type === 'multiple_choice') && selectedQuestion.options && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-600">Options:</h4>
                  {selectedQuestion.options.map((option: string, index: number) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-2 ${
                        option === selectedQuestion.correct_answer
                          ? 'bg-green-50 border-green-500 text-green-900'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {option === selectedQuestion.correct_answer && (
                          <span className="text-green-600 font-bold">✓</span>
                        )}
                        <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                        <span>{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* True/False Answer */}
              {(selectedQuestion.question_type === 'True/False' || selectedQuestion.question_type === 'true_false') && (
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Correct Answer:</h4>
                  <p className="text-lg font-bold text-green-900">{selectedQuestion.correct_answer}</p>
                </div>
              )}

              {/* Short Answer */}
              {(selectedQuestion.question_type === 'Short Answer' || selectedQuestion.question_type === 'short_answer') && (
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Sample Answer:</h4>
                  <p className="text-lg text-green-900">{selectedQuestion.correct_answer}</p>
                </div>
              )}

              {/* Explanation */}
              {selectedQuestion.explanation && (
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Explanation:</h4>
                  <p className="text-gray-800">{selectedQuestion.explanation}</p>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Question ID</p>
                  <p className="font-semibold text-gray-900">{selectedQuestion.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Topic</p>
                  <p className="font-semibold text-gray-900">{selectedQuestion.topic || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created By</p>
                  <p className="font-semibold text-gray-900">
                    {selectedQuestion.created_by 
                      ? `${selectedQuestion.created_by.username} (${selectedQuestion.created_by.email})`
                      : 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created At</p>
                  <p className="font-semibold text-gray-900">
                    {selectedQuestion.created_at 
                      ? new Date(selectedQuestion.created_at).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setShowQuestionModal(false)}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowUserModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
              <h3 className="text-2xl font-bold">👤 User Profile Details</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors text-2xl w-10 h-10 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* User Header */}
              <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-3xl font-bold">
                    {selectedUser.full_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900">{selectedUser.full_name}</h4>
                  <p className="text-gray-600">@{selectedUser.username}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      User ID: {selectedUser.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedUser.skill_level === 'Beginner' 
                        ? 'bg-green-100 text-green-800' 
                        : selectedUser.skill_level === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedUser.skill_level === 'Beginner' ? '🌱' : selectedUser.skill_level === 'Intermediate' ? '🚀' : '🏆'} {selectedUser.skill_level}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                  <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📧</span>
                    Contact Information
                  </h5>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Email Address</p>
                      <p className="text-gray-900 font-semibold">{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Username</p>
                      <p className="text-gray-900 font-semibold">@{selectedUser.username}</p>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                  <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📅</span>
                    Account Information
                  </h5>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Member Since</p>
                      <p className="text-gray-900 font-semibold">
                        {new Date(selectedUser.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Account Age</p>
                      <p className="text-gray-900 font-semibold">
                        {Math.floor((Date.now() - new Date(selectedUser.created_at).getTime()) / (1000 * 60 * 60 * 24))} days
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quiz Statistics */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                  <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Quiz Statistics
                  </h5>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Total Quizzes Taken</p>
                      <p className="text-3xl font-bold text-green-700">{selectedUser.quiz_count}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Skill Level</p>
                      <p className="text-gray-900 font-semibold">{selectedUser.skill_level}</p>
                    </div>
                  </div>
                </div>

                {/* Learning Progress */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border border-orange-200">
                  <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    Learning Progress
                  </h5>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Current Level</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${
                              selectedUser.skill_level === 'Beginner' 
                                ? 'bg-green-500 w-1/3' 
                                : selectedUser.skill_level === 'Intermediate'
                                ? 'bg-yellow-500 w-2/3'
                                : 'bg-red-500 w-full'
                            }`}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {selectedUser.skill_level === 'Beginner' ? '33%' : selectedUser.skill_level === 'Intermediate' ? '66%' : '100%'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Activity Status</p>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Active User
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end items-center pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
