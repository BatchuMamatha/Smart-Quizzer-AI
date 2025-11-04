import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserManager } from '../lib/userManager';
import api from '../lib/api';
import Header from '../components/Header';

interface LeaderboardEntry {
  rank: number;
  user_id: number;
  username: string;
  full_name: string;
  score?: number;
  correct_count?: number;
  total_questions?: number;
  accuracy?: number;
  time_taken?: number;
  avg_difficulty_weight?: number;
  timestamp?: string;
  status?: string;
  completed_questions?: number;
  quiz_session_id?: number;
  total_quizzes?: number;
  avg_score?: number;
  total_correct?: number;
  avg_time?: number;
  weighted_score?: number;
}

interface LeaderboardData {
  leaderboard?: LeaderboardEntry[];
  live_leaderboard?: LeaderboardEntry[];
  topic?: string;
  period?: string;
  total_entries: number;
  total_active?: number;
  last_updated?: string;
}

const Leaderboard: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const userManager = UserManager.getInstance();
  const currentUser = userManager.getCurrentUser();
  
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'global' | 'topic' | 'live'>('global');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [timePeriod, setTimePeriod] = useState('all');
  const [limit, setLimit] = useState(10);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [previousRanks, setPreviousRanks] = useState<Map<number, number>>(new Map());
  const [currentUserRank, setCurrentUserRank] = useState<LeaderboardEntry | null>(null);
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, selectedTopic, timePeriod, limit]);

  useEffect(() => {
    if (!autoRefresh) return;

    const refreshInterval = viewMode === 'live' ? 5000 : 30000;
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, refreshInterval);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh, viewMode, selectedTopic, timePeriod, limit]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError('');
      
      let data: LeaderboardData;
      
      if (viewMode === 'global') {
        const response = await api.get(`/leaderboard/global?limit=${limit}${selectedTopic ? `&topic=${selectedTopic}` : ''}`);
        data = response.data;
      } else if (viewMode === 'topic' && selectedTopic) {
        const response = await api.get(`/leaderboard/topic/${selectedTopic}?limit=${limit}&period=${timePeriod}`);
        data = response.data;
      } else if (viewMode === 'live' && selectedTopic) {
        const response = await api.get(`/leaderboard/live/${selectedTopic}`);
        data = response.data;
      } else {
        const response = await api.get(`/leaderboard/global?limit=${limit}`);
        data = response.data;
      }
      
      if (leaderboardData) {
        const rankMap = new Map<number, number>();
        const entries = viewMode === 'live' ? (leaderboardData.live_leaderboard || []) : (leaderboardData.leaderboard || []);
        entries.forEach(entry => {
          rankMap.set(entry.user_id, entry.rank);
        });
        setPreviousRanks(rankMap);
      }
      
      setLeaderboardData(data);
      setLastUpdated(new Date());
      
      // Find current user in leaderboard
      const entries = viewMode === 'live' ? (data.live_leaderboard || []) : (data.leaderboard || []);
      if (currentUser) {
        const userEntry = entries.find(entry => entry.user_id === currentUser.id);
        setCurrentUserRank(userEntry || null);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load leaderboard');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchLeaderboard();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getRankBadgeColor = (rank: number): string => {
    if (rank === 1) return 'bg-yellow-500 text-white';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-orange-600 text-white';
    return 'bg-blue-500 text-white';
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getRankIcon = (rank: number): string => {
    if (rank === 1) return '🏆';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🎯';
  };

  const getRankChange = (userId: number, currentRank: number): 'up' | 'down' | 'same' | 'new' => {
    const prevRank = previousRanks.get(userId);
    if (prevRank === undefined) return 'new';
    if (prevRank > currentRank) return 'up';
    if (prevRank < currentRank) return 'down';
    return 'same';
  };

  const renderRankChangeIndicator = (userId: number, currentRank: number) => {
    const change = getRankChange(userId, currentRank);
    if (change === 'up') {
      return <span className="text-green-500 text-xl animate-bounce">↑</span>;
    } else if (change === 'down') {
      return <span className="text-red-500 text-xl animate-bounce">↓</span>;
    } else if (change === 'new') {
      return <span className="text-blue-500 text-sm">NEW</span>;
    }
    return null;
  };

  if (loading && !leaderboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card animate-fade-in-scale">
          <div className="card-body text-center">
            <div className="spinner-large mb-4 mx-auto"></div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Rankings</h3>
            <p className="text-gray-500">Fetching leaderboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  const entries = viewMode === 'live' 
    ? (leaderboardData?.live_leaderboard || [])
    : (leaderboardData?.leaderboard || []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="🏆 Leaderboard" 
        subtitle="See how you rank against other quiz masters!"
        showBackButton={true}
        backPath="/dashboard"
      />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Control Panel */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('global')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'global'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🌍 Global
                </button>
                <button
                  onClick={() => setViewMode('topic')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'topic'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  📚 Topic
                </button>
                <button
                  onClick={() => setViewMode('live')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                    viewMode === 'live'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🔴 Live
                  {viewMode === 'live' && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  )}
                </button>
              </div>

              {(viewMode === 'topic' || viewMode === 'live') && (
                <input
                  type="text"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  placeholder="Enter topic name..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}

              {viewMode === 'topic' && (
                <select
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              )}

              {viewMode !== 'live' && (
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="10">Top 10</option>
                  <option value="25">Top 25</option>
                  <option value="50">Top 50</option>
                </select>
              )}
            </div>

            {/* Refresh Controls */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="rounded"
                  />
                  Auto-refresh ({viewMode === 'live' ? '5s' : '30s'})
                </label>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                {viewMode === 'live' && leaderboardData?.total_active !== undefined && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                    <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                    {leaderboardData.total_active} active
                  </span>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Current User Rank Highlight */}
          {currentUserRank && (
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 mb-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Your Current Rank</p>
                  <p className="text-4xl font-bold">#{currentUserRank.rank}</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl mb-2">
                    {currentUserRank.rank === 1 ? '🥇' : currentUserRank.rank === 2 ? '🥈' : currentUserRank.rank === 3 ? '🥉' : '🎯'}
                  </p>
                  <p className="text-sm opacity-90">Out of {leaderboardData?.total_entries} users</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Latest Score</p>
                  <p className="text-3xl font-bold">{(currentUserRank.avg_score || currentUserRank.score || 0).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          {showStats && viewMode === 'global' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{leaderboardData?.total_entries || 0}</div>
                <div className="text-gray-600 font-medium">Total Players</div>
                <div className="text-2xl mt-2">👥</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {entries.length > 0 ? (entries[0].avg_score || entries[0].score || 0).toFixed(1) : 'N/A'}%
                </div>
                <div className="text-gray-600 font-medium">Top Score</div>
                <div className="text-2xl mt-2">🏆</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {entries.length > 0 ? (entries[0].accuracy || 0).toFixed(1) : 'N/A'}%
                </div>
                <div className="text-gray-600 font-medium">Best Accuracy</div>
                <div className="text-2xl mt-2">🎯</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {entries.length > 0 ? Math.floor((entries[0].avg_time || 0) / 60) : 0}m
                </div>
                <div className="text-gray-600 font-medium">Fastest Time</div>
                <div className="text-2xl mt-2">⚡</div>
              </div>
            </div>
          )}

          {/* Stats Toggle Button */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowStats(!showStats)}
              className={`flex items-center gap-2 px-6 py-2 mx-auto rounded-full text-sm font-medium transition-colors ${
                showStats
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
              }`}
            >
              <span>📊</span>
              <span>{showStats ? 'Hide' : 'Show'} Statistics</span>
            </button>
          </div>

          {/* Main Leaderboard Table */}
          {entries.length > 0 ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Player</th>
                      {viewMode === 'global' ? (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quizzes</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Score</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Accuracy</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Time</th>
                        </>
                      ) : (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correct</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            {viewMode === 'live' ? 'Status' : 'Difficulty'}
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {entries.map((entry) => {
                      const isCurrentUser = currentUser && entry.user_id === currentUser.id;
                      return (
                        <tr 
                          key={`${entry.user_id}-${entry.quiz_session_id || entry.rank}`} 
                          className={`${isCurrentUser ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">
                                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : '🎯'}
                              </span>
                              <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full font-bold text-sm text-white ${
                                entry.rank === 1 ? 'bg-yellow-500' :
                                entry.rank === 2 ? 'bg-gray-400' :
                                entry.rank === 3 ? 'bg-orange-600' :
                                'bg-blue-500'
                              }`}>
                                {entry.rank}
                              </span>
                              {renderRankChangeIndicator(entry.user_id, entry.rank)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                {entry.full_name.charAt(0).toUpperCase()}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {entry.full_name}
                                  {isCurrentUser && <span className="ml-2 text-xs text-blue-600">(You)</span>}
                                </div>
                                <div className="text-sm text-gray-500">@{entry.username}</div>
                              </div>
                            </div>
                          </td>
                          {viewMode === 'global' ? (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{entry.total_quizzes}</div>
                                <div className="text-xs text-gray-500">{entry.total_questions} questions</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-gray-900">{(entry.avg_score || 0).toFixed(1)}%</span>
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-green-500 h-2 rounded-full" 
                                      style={{ width: `${Math.min(entry.avg_score || 0, 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{(entry.accuracy || 0).toFixed(1)}%</div>
                                <div className="text-xs text-gray-500">{entry.total_correct || 0} / {entry.total_questions || 0}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{formatTime(entry.avg_time || 0)}</div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-lg font-bold text-blue-600">{(entry.score || entry.weighted_score || 0).toFixed(1)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{entry.correct_count} / {entry.total_questions}</div>
                                <div className="text-xs text-gray-500">{entry.accuracy}% accuracy</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{formatTime(entry.time_taken || 0)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {viewMode === 'live' ? (
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    entry.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {entry.status === 'completed' ? '✓ Completed' : `⏳ ${entry.completed_questions}/${entry.total_questions}`}
                                  </span>
                                ) : (
                                  <div className="text-sm text-gray-600">{(entry.avg_difficulty_weight || 0).toFixed(1)}x</div>
                                )}
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {viewMode === 'live' ? 'No Active Players' : 'No Rankings Yet'}
              </h3>
              <p className="text-gray-600">
                {viewMode === 'live' 
                  ? 'No one is currently taking a quiz on this topic.'
                  : 'Be the first to complete a quiz and claim the top spot!'}
              </p>
            </div>
          )}

          {/* How Scoring Works */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <span className="mr-2">📊</span>
              How Scoring Works
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>✓ <strong>Score Formula:</strong> (correct_answers × difficulty_weight × 100) / time_in_minutes</li>
              <li>✓ <strong>Difficulty Weights:</strong> Beginner (1.0x), Intermediate (1.5x), Advanced (2.0x)</li>
              <li>✓ <strong>Global Rankings:</strong> Based on average score across all completed quizzes</li>
              <li>✓ <strong>Live Mode:</strong> See real-time rankings of players currently taking quizzes (updates every 5s)</li>
              <li>✓ Keep practicing to improve your score and climb the leaderboard! 🚀</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all"
            >
              📊 Back to Dashboard
            </button>
            <button
              onClick={() => navigate('/analytics')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all"
            >
              📈 View Your Analytics
            </button>
            <button
              onClick={() => navigate('/dashboard', { state: { startNewQuiz: true } })}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all"
            >
              🚀 Take Another Quiz
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
