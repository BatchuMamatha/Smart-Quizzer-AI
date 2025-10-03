import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizAPI, QuizSession } from '../lib/api';
import { UserManager } from '../lib/userManager';

const History: React.FC = () => {
  const [quizHistory, setQuizHistory] = useState<QuizSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
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
    } catch (error: any) {
      console.error('Error fetching quiz history:', error);
      setError(error.response?.data?.error || 'Failed to load quiz history');
    } finally {
      setLoading(false);
    }
  };

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📈 Quiz History
              </h1>
              <p className="text-sm text-gray-600">Track your learning progress</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

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
              <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{quizHistory.length}</div>
                      <div className="text-sm text-blue-800">Total Quizzes</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {quizHistory.filter(q => q.status === 'completed').length}
                      </div>
                      <div className="text-sm text-green-800">Completed</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
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
                      <div className="text-sm text-purple-800">Average Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quiz List */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Quizzes</h3>
                  
                  <div className="space-y-4">
                    {quizHistory.map((quiz) => (
                      <div key={quiz.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-medium text-gray-900">{quiz.topic}</h4>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {quiz.skill_level}
                            </span>
                            {getStatusBadge(quiz.status)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(quiz.started_at).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <span className="text-xs text-gray-500">Questions</span>
                            <p className="font-medium">{quiz.completed_questions}/{quiz.total_questions}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Correct</span>
                            <p className="font-medium">{quiz.correct_answers}</p>
                          </div>
                          {quiz.status === 'completed' && (
                            <div>
                              <span className="text-xs text-gray-500">Score</span>
                              <p className={`font-medium ${getScoreColor(quiz.score_percentage)}`}>
                                {quiz.score_percentage.toFixed(1)}%
                              </p>
                            </div>
                          )}
                          <div>
                            <span className="text-xs text-gray-500">Time</span>
                            <p className="font-medium">
                              {quiz.completed_at 
                                ? new Date(quiz.completed_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                                : 'In progress'
                              }
                            </p>
                          </div>
                        </div>

                        {quiz.custom_topic && (
                          <div className="mb-3">
                            <span className="text-xs text-gray-500">Custom Topic:</span>
                            <p className="text-sm text-gray-700 mt-1 line-clamp-2">{quiz.custom_topic}</p>
                          </div>
                        )}

                        <div className="flex justify-end space-x-2">
                          {quiz.status === 'completed' && (
                            <button
                              onClick={() => handleViewResults(quiz.id)}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-1 px-3 rounded text-sm"
                            >
                              View Results
                            </button>
                          )}
                          {quiz.status === 'active' && (
                            <button
                              onClick={() => navigate('/quiz', { 
                                state: { resumeQuizId: quiz.id } 
                              })}
                              className="bg-green-100 hover:bg-green-200 text-green-800 font-medium py-1 px-3 rounded text-sm"
                            >
                              Resume Quiz
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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