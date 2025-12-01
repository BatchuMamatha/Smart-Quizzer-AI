import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizAPI, QuizSession } from '../lib/api';
import { UserManager } from '../lib/userManager';
import Header from '../components/Header';

const History: React.FC = () => {
  const [quizHistory, setQuizHistory] = useState<QuizSession[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<QuizSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [skillLevelFilter, setSkillLevelFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all'); // all, today, week, month
  
  const navigate = useNavigate();
  const userManager = UserManager.getInstance();

  useEffect(() => {
    if (!userManager.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    fetchQuizHistory();
  }, [navigate, userManager]);

  const fetchQuizHistory = async () => {
    try {
      setLoading(true);
      const history = await quizAPI.getHistory();
      setQuizHistory(history);
      setFilteredHistory(history); // Initialize filtered history
    } catch (error: any) {
      console.error('Error fetching quiz history:', error);
      setError(error.response?.data?.error || 'Failed to load quiz history');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = [...quizHistory];

    // Search filter (topic and custom_topic)
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(quiz => 
        quiz.topic.toLowerCase().includes(search) ||
        (quiz.custom_topic && quiz.custom_topic.toLowerCase().includes(search))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(quiz => quiz.status === statusFilter);
    }

    // Skill level filter
    if (skillLevelFilter !== 'all') {
      filtered = filtered.filter(quiz => quiz.skill_level === skillLevelFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(quiz => {
        const quizDate = new Date(quiz.started_at);
        
        switch (dateFilter) {
          case 'today':
            return quizDate >= todayStart;
          case 'week':
            const weekAgo = new Date(todayStart);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return quizDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(todayStart);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return quizDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    setFilteredHistory(filtered);
  }, [searchTerm, statusFilter, skillLevelFilter, dateFilter, quizHistory]);

  // Apply filters whenever filter criteria or quiz history changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, skillLevelFilter, dateFilter, quizHistory, applyFilters]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSkillLevelFilter('all');
    setDateFilter('all');
  };

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || skillLevelFilter !== 'all' || dateFilter !== 'all';

  const handleViewResults = (quizId: number) => {
    navigate('/results', { state: { quizId } });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">✅ Completed</span>;
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">⏳ In Progress</span>;
      case 'abandoned':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">❌ Abandoned</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
            <span className="text-gray-600">Loading quiz history...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header 
        title="📈 Quiz History" 
        subtitle="Track your learning progress"
        showBackButton={true}
        backPath="/dashboard"
      />

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="text-red-400 mr-3">❌</div>
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {quizHistory.length === 0 && !error ? (
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-12 text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Quiz History</h3>
                <p className="text-gray-600 mb-6">You haven't taken any quizzes yet. Start your learning journey!</p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md"
                >
                  Take Your First Quiz
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg mb-6">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{quizHistory.length}</div>
                      <div className="text-sm text-blue-800 dark:text-blue-300">Total Quizzes</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {quizHistory.filter(q => q.status === 'completed').length}
                      </div>
                      <div className="text-sm text-green-800 dark:text-green-300">Completed</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {quizHistory.filter(q => q.status === 'completed').length > 0 
                          ? Math.round(
                              quizHistory
                                .filter(q => q.status === 'completed')
                                .reduce((sum, q) => sum + q.score_percentage, 0) /
                              quizHistory.filter(q => q.status === 'completed').length
                            )
                          : 0
                        }%
                      </div>
                      <div className="text-sm text-purple-800 dark:text-purple-300">Average Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg mb-6">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">🔍 Search & Filter</h3>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                      >
                        ✖ Clear All
                      </button>
                    )}
                  </div>

                  {/* Search Bar */}
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search by topic name or custom content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-lg">🔍</span>
                      </div>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Filter Dropdowns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        📊 Status
                      </label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="all">All Statuses</option>
                        <option value="completed">✅ Completed</option>
                        <option value="active">⏳ In Progress</option>
                        <option value="abandoned">❌ Abandoned</option>
                      </select>
                    </div>

                    {/* Skill Level Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        🎯 Skill Level
                      </label>
                      <select
                        value={skillLevelFilter}
                        onChange={(e) => setSkillLevelFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="all">All Levels</option>
                        <option value="Beginner">🌱 Beginner</option>
                        <option value="Intermediate">🚀 Intermediate</option>
                        <option value="Advanced">🏆 Advanced</option>
                      </select>
                    </div>

                    {/* Date Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        📅 Date Range
                      </label>
                      <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="all">All Time</option>
                        <option value="today">📆 Today</option>
                        <option value="week">📅 Last 7 Days</option>
                        <option value="month">🗓️ Last 30 Days</option>
                      </select>
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Showing <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredHistory.length}</span> of <span className="font-semibold">{quizHistory.length}</span> quizzes
                    {hasActiveFilters && <span className="ml-1">(filtered)</span>}
                  </div>
                </div>
              </div>

              {/* Quiz List */}
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {hasActiveFilters ? 'Filtered Results' : 'Recent Quizzes'}
                  </h3>
                  
                  {filteredHistory.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🔍</div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Results Found</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        No quizzes match your current filters.
                      </p>
                      <button
                        onClick={clearFilters}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredHistory.map((quiz) => (
                        <div key={quiz.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-gray-700/50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <h4 className="font-medium text-gray-900 dark:text-white">{quiz.topic}</h4>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                {quiz.skill_level}
                              </span>
                              {getStatusBadge(quiz.status)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(quiz.started_at).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">Questions</span>
                              <p className="font-medium dark:text-gray-200">{quiz.completed_questions}/{quiz.total_questions}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">Correct</span>
                              <p className="font-medium dark:text-gray-200">{quiz.correct_answers}</p>
                            </div>
                            {quiz.status === 'completed' && (
                              <div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Score</span>
                                <p className={`font-medium ${getScoreColor(quiz.score_percentage)}`}>
                                  {quiz.score_percentage.toFixed(1)}%
                                </p>
                              </div>
                            )}
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">Time</span>
                              <p className="font-medium dark:text-gray-200">
                                {quiz.completed_at 
                                  ? new Date(quiz.completed_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                                  : 'In progress'
                                }
                              </p>
                            </div>
                          </div>

                          {quiz.custom_topic && (
                            <div className="mb-3">
                              <span className="text-xs text-gray-500 dark:text-gray-400">Custom Topic:</span>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">{quiz.custom_topic}</p>
                            </div>
                          )}

                          <div className="flex justify-end space-x-2">
                            {quiz.status === 'completed' && (
                              <button
                                onClick={() => handleViewResults(quiz.id)}
                                className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 font-medium py-1 px-3 rounded text-sm"
                              >
                                View Results
                              </button>
                            )}
                            {quiz.status === 'active' && (
                              <button
                                onClick={() => navigate('/quiz', { 
                                  state: { resumeQuizId: quiz.id } 
                                })}
                                className="bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-800 dark:text-green-200 font-medium py-1 px-3 rounded text-sm"
                              >
                                Resume Quiz
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;