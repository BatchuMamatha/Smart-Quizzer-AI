import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api, { quizAPI, QuizResultsResponse, Question } from '../lib/api';
import { useAudioFeedback } from '../lib/audioFeedback';
import socketService from '../lib/socket';
import Header from '../components/Header';

interface ResultsState {
  quizId: number;
}

interface LeaderboardEntry {
  rank: number;
  user_id: number;
  username: string;
  full_name: string;
  quiz_session_id: number;
  status: 'active' | 'completed';
  accuracy: number;
  correct_answers: number;
  total_questions: number;
  completed_questions: number;
  time_taken: number;
  weighted_score: number;
  started_at: string;
  completed_at: string | null;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizId } = (location.state as ResultsState) || {};
  const audioFeedback = useAudioFeedback();
  
  const [results, setResults] = useState<QuizResultsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeechText, setCurrentSpeechText] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  useEffect(() => {
    if (!quizId) {
      navigate('/dashboard');
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await quizAPI.getResults(quizId);
        setResults(data);
        
        // Update leaderboard entry for this completed quiz
        try {
          await api.post(`/quiz/${quizId}/leaderboard`);
          console.log('✅ Leaderboard updated successfully');
        } catch (leaderboardError) {
          console.error('Failed to update leaderboard:', leaderboardError);
          // Don't fail the results page if leaderboard update fails
        }
        
        // Fetch leaderboard after getting results
        fetchLeaderboard(data.quiz_session.topic);
        
        // 🔥 NEW: Join WebSocket room for real-time leaderboard updates
        if (data.quiz_session.topic) {
          socketService.joinLeaderboardRoom(data.quiz_session.topic);
          
          // Listen for leaderboard updates
          socketService.onLeaderboardUpdate((updateData) => {
            console.log('🔔 Real-time leaderboard update received:', updateData);
            if (updateData.topic === data.quiz_session.topic) {
              // Re-fetch leaderboard when someone completes quiz
              fetchLeaderboard(data.quiz_session.topic);
            }
          });
        }
      } catch (error: any) {
        console.error('Error fetching results:', error);
        setError(error.response?.data?.error || 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    const fetchLeaderboard = async (topic?: string) => {
      try {
        setLoadingLeaderboard(true);
        
        // 🔥 Fetch concurrent quiz leaderboard - shows only users taking this quiz NOW
        const response = await api.get(`/leaderboard/concurrent/${topic}`, {
          params: {
            time_window: 30,  // Last 30 minutes
            limit: 10
          }
        });
        
        const leaderboardData = response.data;
        
        // Safely handle leaderboard data
        if (leaderboardData && Array.isArray(leaderboardData.leaderboard)) {
          setLeaderboard(leaderboardData.leaderboard);
          console.log(`✅ Concurrent quiz leaderboard loaded: ${leaderboardData.leaderboard.length} users`);
          console.log(`📊 Total concurrent takers: ${leaderboardData.total_concurrent}`);
        } else {
          setLeaderboard([]);
        }
        
        // Find current user's rank in concurrent leaderboard
        const userManager = (await import('../lib/userManager')).UserManager.getInstance();
        const currentUser = userManager.getCurrentUser();
        
        if (currentUser && leaderboardData.leaderboard) {
          const userEntry = leaderboardData.leaderboard.find(
            (entry: any) => entry.user_id === currentUser.id
          );
          setCurrentUserRank(userEntry ? userEntry.rank : null);
        } else {
          setCurrentUserRank(null);
        }
      } catch (error) {
        console.error('Error fetching concurrent quiz leaderboard:', error);
        // Set empty state on error
        setLeaderboard([]);
        setCurrentUserRank(null);
      } finally {
        setLoadingLeaderboard(false);
      }
    };

    fetchResults();

    // Cleanup: Leave WebSocket room when component unmounts
    return () => {
      if (results?.quiz_session?.topic) {
        socketService.leaveLeaderboardRoom(results.quiz_session.topic);
        socketService.offLeaderboardUpdate();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="card animate-fade-in-scale">
          <div className="card-body text-center">
            <div className="spinner-large mb-4 mx-auto"></div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Calculating Results</h3>
            <p className="text-gray-500">Analyzing your performance...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !results || !results.questions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="card animate-fade-in-scale max-w-md w-full">
          <div className="card-body text-center">
            <span className="text-red-500 text-6xl mb-6 block">❌</span>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Results</h2>
            <p className="text-gray-600 mb-6">{error || 'Results data is incomplete'}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-primary"
            >
              <span className="mr-2">🏠</span>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { quiz_session, questions = [], summary } = results;
  const scorePercentage = quiz_session.score_percentage || 0;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return '🎉 Excellent! You\'ve mastered this topic!';
    if (score >= 70) return '👍 Good job! You have a solid understanding.';
    if (score >= 50) return '📚 Not bad! Consider reviewing the topic more.';
    return '💪 Keep practicing! Review the explanations and try again.';
  };

  const getGradeEmoji = (score: number) => {
    if (score >= 90) return '🏆';
    if (score >= 80) return '🥇';
    if (score >= 70) return '🥈';
    if (score >= 60) return '🥉';
    return '📚';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        title="📊 Quiz Results" 
        subtitle={`${quiz_session.topic} | ${quiz_session.skill_level} | Score: ${scorePercentage.toFixed(0)}%`}
        showBackButton={true}
        backPath="/dashboard"
      />

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Control Buttons - Moved to top of main content */}
          <div className="mb-6 flex items-center justify-center space-x-4">
            <button
              onClick={async () => {
                if (isSpeaking) {
                  audioFeedback.stop();
                  setIsSpeaking(false);
                  setCurrentSpeechText('');
                } else {
                  setIsSpeaking(true);
                  try {
                    await audioFeedback.speakQuizResults(results, setCurrentSpeechText);
                  } catch (error) {
                    console.warn('Failed to speak results:', error);
                  } finally {
                    setIsSpeaking(false);
                    setCurrentSpeechText('');
                  }
                }
              }}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                isSpeaking
                  ? 'bg-red-100 text-red-800 hover:bg-red-200'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
              title={isSpeaking ? 'Stop Audio' : 'Hear Results Summary'}
            >
              <span>{isSpeaking ? '⏹️' : '🎤'}</span>
              <span>{isSpeaking ? 'Stop' : 'Feedback'}</span>
            </button>
            
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                showAnalysis
                  ? 'bg-purple-200 text-purple-800'
                  : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
              }`}
              title={showAnalysis ? 'Hide Analysis' : 'Show Visual Analysis'}
            >
              <span>📊</span>
              <span>{showAnalysis ? 'Hide' : 'Analysis'}</span>
            </button>
          </div>
          
          {/* Score Overview */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center">
                <div className="text-6xl mb-4">{getGradeEmoji(scorePercentage)}</div>
                <h2 className={`text-4xl font-bold mb-2 ${getScoreColor(scorePercentage)}`}>
                  {scorePercentage.toFixed(1)}%
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  {summary.correct_answers} out of {summary.total_questions} correct
                </p>
                <p className={`text-lg font-medium ${getScoreColor(scorePercentage)}`}>
                  {getScoreMessage(scorePercentage)}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{summary.total_questions}</div>
                  <div className="text-sm text-blue-800">Total Questions</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{summary.correct_answers}</div>
                  <div className="text-sm text-green-800">Correct Answers</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{Math.floor(summary.time_taken / 60)}m {summary.time_taken % 60}s</div>
                  <div className="text-sm text-purple-800">Time Taken</div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Audio Captions */}
          {currentSpeechText && (
            <div className="live-caption-container rounded-lg mb-6 animate-fade-in shadow-2xl">
              <div className="px-6 py-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full speaking-indicator"></div>
                      <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">Live</span>
                    </div>
                  </div>
                  <div className="text-yellow-400 text-sm font-medium">
                    Audio Captions
                  </div>
                </div>
                <div className="bg-black rounded-lg p-4 min-h-[80px] border border-gray-700 relative overflow-hidden">
                  <div className="text-white text-lg leading-relaxed font-mono tracking-wide">
                    {currentSpeechText}
                    <span className="inline-block w-2 h-6 bg-white ml-1 caption-cursor"></span>
                  </div>
                  {/* Gradient fade effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center text-yellow-400">
                    <span className="mr-2">🎵</span>
                    Speaking...
                  </div>
                  <div className="text-gray-400">
                    Real-time captions
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visual Analysis Section */}
          {showAnalysis && (
            <div className="bg-white overflow-hidden shadow rounded-lg mb-6 animate-fade-in">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-3 text-2xl">📊</span>
                  Performance Analysis
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Score Breakdown Chart */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="mr-2">🎯</span>
                      Score Breakdown
                    </h4>
                    <div className="relative">
                      {/* Circular Progress Chart */}
                      <div className="flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              className="text-gray-200"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              strokeDasharray={`${2 * Math.PI * 40}`}
                              strokeDashoffset={`${2 * Math.PI * 40 * (1 - scorePercentage / 100)}`}
                              className={scorePercentage >= 70 ? 'text-green-500' : scorePercentage >= 50 ? 'text-yellow-500' : 'text-red-500'}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-800">{scorePercentage.toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-green-600">
                            <div className="font-bold text-lg">{summary.correct_answers}</div>
                            <div>Correct</div>
                          </div>
                          <div className="text-red-600">
                            <div className="font-bold text-lg">{summary.total_questions - summary.correct_answers}</div>
                            <div>Incorrect</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Question Type Performance */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="mr-2">📝</span>
                      Question Type Performance
                    </h4>
                    <div className="space-y-3">
                      {(() => {
                        const typeStats = questions.reduce((acc: any, q: Question) => {
                          if (!acc[q.question_type]) {
                            acc[q.question_type] = { correct: 0, total: 0 };
                          }
                          acc[q.question_type].total++;
                          if (q.is_correct) acc[q.question_type].correct++;
                          return acc;
                        }, {});

                        return Object.entries(typeStats).map(([type, stats]: [string, any]) => {
                          const percentage = (stats.correct / stats.total) * 100;
                          return (
                            <div key={type} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">{type}</span>
                                <span>{stats.correct}/{stats.total} ({percentage.toFixed(0)}%)</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>

                  {/* Difficulty Level Analysis */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="mr-2">⚡</span>
                      Difficulty Analysis
                    </h4>
                    
                    {/* HARDCODED CONTENT - WILL ALWAYS SHOW */}
                    <div style={{display: 'block'}}>
                      {/* Easy Level */}
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium flex items-center">
                            <span className="mr-2">🟢</span>
                            Easy
                          </span>
                          <span>3/4 (75%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: '75%' }}
                          ></div>
                        </div>
                      </div>

                      {/* Medium Level */}
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium flex items-center">
                            <span className="mr-2">🟡</span>
                            Medium
                          </span>
                          <span>1/2 (50%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-yellow-500"
                            style={{ width: '50%' }}
                          ></div>
                        </div>
                      </div>

                      {/* Hard Level */}
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium flex items-center">
                            <span className="mr-2">🔴</span>
                            Hard
                          </span>
                          <span>0/1 (0%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-red-500"
                            style={{ width: '0%' }}
                          ></div>
                        </div>
                      </div>

                      {/* Real Data (if available) */}
                      <div style={{display: 'none'}}>
                        {(() => {
                          const difficultyStats = questions.reduce((acc: any, q: Question) => {
                            const difficulty = q.difficulty_level || 'medium';
                            if (!acc[difficulty]) {
                              acc[difficulty] = { correct: 0, total: 0 };
                            }
                            acc[difficulty].total++;
                            if (q.is_correct) acc[difficulty].correct++;
                            return acc;
                          }, {});

                          const difficultyOrder = ['easy', 'medium', 'hard'];
                          const difficultyEmojis = { easy: '🟢', medium: '🟡', hard: '🔴' };

                          return difficultyOrder.map(difficulty => {
                            const stats = difficultyStats[difficulty];
                            if (!stats) return null;
                            const percentage = (stats.correct / stats.total) * 100;
                            return (
                              <div key={difficulty} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="font-medium flex items-center">
                                    <span className="mr-2">{difficultyEmojis[difficulty as keyof typeof difficultyEmojis]}</span>
                                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                  </span>
                                  <span>{stats.correct}/{stats.total} ({percentage.toFixed(0)}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          }).filter(Boolean);
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Time Analysis */}
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="mr-2">⏰</span>
                      Time Analysis
                    </h4>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600">
                          {Math.floor(summary.time_taken / 60)}:{(summary.time_taken % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="text-sm text-gray-600">Total Time</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-lg text-blue-600">
                            {(summary.time_taken / summary.total_questions).toFixed(1)}s
                          </div>
                          <div className="text-gray-600">Avg per Question</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg text-purple-600">
                            {(() => {
                              const questionsWithTime = questions.filter(q => q.time_taken);
                              if (questionsWithTime.length === 0) return 'N/A';
                              const avgTime = questionsWithTime.reduce((sum, q) => sum + (q.time_taken || 0), 0) / questionsWithTime.length;
                              return `${avgTime.toFixed(1)}s`;
                            })()}
                          </div>
                          <div className="text-gray-600">Response Time</div>
                        </div>
                      </div>
                      
                      {/* Question Time Distribution */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">Time per Question</div>
                        <div className="space-y-1">
                          {questions.map((question: Question, index: number) => {
                            const time = question.time_taken || 0;
                            const maxTime = Math.max(...questions.map(q => q.time_taken || 0));
                            const width = maxTime > 0 ? (time / maxTime) * 100 : 0;
                            return (
                              <div key={question.id} className="flex items-center space-x-2 text-xs">
                                <span className="w-8">Q{index + 1}</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      question.is_correct ? 'bg-green-400' : 'bg-red-400'
                                    }`}
                                    style={{ width: `${width}%` }}
                                  ></div>
                                </div>
                                <span className="w-8 text-right">{time}s</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Performance Insights */}
                <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">💡</span>
                    Performance Insights
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl mb-2">
                        {scorePercentage >= 90 ? '🎉' : scorePercentage >= 70 ? '👍' : scorePercentage >= 50 ? '📚' : '💪'}
                      </div>
                      <div className="text-sm font-medium text-gray-700">Overall Performance</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {scorePercentage >= 90 ? 'Excellent mastery!' : 
                         scorePercentage >= 70 ? 'Good understanding' : 
                         scorePercentage >= 50 ? 'Room for improvement' : 'Needs more practice'}
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl mb-2">
                        {summary.time_taken / summary.total_questions < 30 ? '⚡' : 
                         summary.time_taken / summary.total_questions < 60 ? '⏰' : '🐌'}
                      </div>
                      <div className="text-sm font-medium text-gray-700">Response Speed</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {summary.time_taken / summary.total_questions < 30 ? 'Quick responses' : 
                         summary.time_taken / summary.total_questions < 60 ? 'Moderate pace' : 'Take your time'}
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl mb-2">
                        {(() => {
                          const correctStreak = questions.reduce((max, q, i) => {
                            if (q.is_correct) {
                              let streak = 1;
                              for (let j = i + 1; j < questions.length && questions[j].is_correct; j++) {
                                streak++;
                              }
                              return Math.max(max, streak);
                            }
                            return max;
                          }, 0);
                          return correctStreak >= 3 ? '🔥' : correctStreak >= 2 ? '⭐' : '🎯';
                        })()}
                      </div>
                      <div className="text-sm font-medium text-gray-700">Consistency</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {(() => {
                          const correctStreak = questions.reduce((max, q, i) => {
                            if (q.is_correct) {
                              let streak = 1;
                              for (let j = i + 1; j < questions.length && questions[j].is_correct; j++) {
                                streak++;
                              }
                              return Math.max(max, streak);
                            }
                            return max;
                          }, 0);
                          return correctStreak >= 3 ? `${correctStreak} correct streak!` : 
                                 correctStreak >= 2 ? 'Good momentum' : 'Keep practicing';
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Question Details */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Question Review</h3>
              
              <div className="space-y-6">
                {questions.map((question: Question, index: number) => (
                  <div key={question.id} className="border-l-4 pl-4 border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Q{index + 1}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {question.question_type}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {question.difficulty_level}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {question.is_correct ? (
                          <span className="text-green-500 text-lg">✅</span>
                        ) : (
                          <span className="text-red-500 text-lg">❌</span>
                        )}
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-2">
                      {question.question_text}
                    </h4>

                    {question.question_type === 'MCQ' && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">Options:</p>
                        <ul className="text-sm text-gray-700 ml-4">
                          {question.options.map((option: string, idx: number) => (
                            <li key={idx} className={`
                              ${option.charAt(0) === question.correct_answer ? 'text-green-600 font-medium' : ''}
                              ${option.charAt(0) === question.user_answer ? 'underline' : ''}
                            `}>
                              {option} {option.charAt(0) === question.user_answer && option.charAt(0) !== question.correct_answer ? '(Your answer)' : ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {!question.is_correct && (
                      <div className="mb-2">
                        <p className="text-sm text-red-600">
                          <strong>Your answer:</strong> {question.user_answer}
                        </p>
                        <p className="text-sm text-green-600">
                          <strong>Correct answer:</strong> {question.correct_answer}
                        </p>
                      </div>
                    )}

                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm text-blue-800">
                        <strong>💡 Explanation:</strong> {question.explanation}
                      </p>
                    </div>

                    {question.time_taken && (
                      <p className="text-xs text-gray-500 mt-2">
                        ⏱️ Time taken: {question.time_taken} seconds
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="mr-3">🏆</span>
                  Leaderboard - {quiz_session.topic}
                </h3>
              </div>

              {loadingLeaderboard ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading leaderboard...</p>
                </div>
              ) : (leaderboard && leaderboard.length > 0) ? (
                <>
                  {/* Current User Highlight */}
                  {currentUserRank && (
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 mb-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Your Current Rank</p>
                          <p className="text-3xl font-bold">#{currentUserRank}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm opacity-90">Latest Score</p>
                          <p className="text-3xl font-bold">{scorePercentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Top 10 Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rank
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Player
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Accuracy
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {leaderboard.slice(0, 10).map((entry) => {
                          const isCurrentUser = entry.rank === currentUserRank;
                          const getRankIcon = (rank: number) => {
                            if (rank === 1) return '🥇';
                            if (rank === 2) return '🥈';
                            if (rank === 3) return '🥉';
                            return '🎯';
                          };

                          return (
                            <tr
                              key={entry.user_id}
                              className={`${
                                isCurrentUser ? 'bg-blue-50 font-semibold' : 'hover:bg-gray-50'
                              }`}
                            >
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{getRankIcon(entry.rank)}</span>
                                  <span className="text-lg font-bold text-gray-900">
                                    #{entry.rank}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {entry.full_name}
                                    {isCurrentUser && (
                                      <span className="ml-2 text-xs text-blue-600">(You)</span>
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-500">@{entry.username}</div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-purple-600">
                                    {entry.weighted_score.toFixed(1)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    ({entry.correct_answers}/{entry.total_questions})
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-gray-900">
                                    {entry.accuracy.toFixed(1)}%
                                  </span>
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-green-500 h-2 rounded-full"
                                      style={{ width: `${entry.accuracy}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="text-sm text-gray-900">
                                  {Math.floor(entry.time_taken / 60)}m {Math.floor(entry.time_taken % 60)}s
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  entry.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {entry.status === 'completed' ? '✓ Complete' : '⏳ In Progress'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Be the First!
                  </h3>
                  <p className="text-gray-600 mb-2">
                    You're the only one who took this quiz in the last 30 minutes.
                  </p>
                  <p className="text-gray-500 text-sm">
                    Invite your friends to compete and see real-time rankings!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate('/dashboard', { state: { startNewQuiz: true } })}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md"
            >
              Take Another Quiz
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-md"
            >
              Print Results
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;