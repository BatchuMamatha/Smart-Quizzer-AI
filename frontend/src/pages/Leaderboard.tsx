import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizAPI } from '../lib/api';
import Header from '../components/Header';

interface LeaderboardEntry {
  rank: number;
  user_id: number;
  username: string;
  full_name: string;
  total_quizzes: number;
  total_questions: number;
  total_correct: number;
  average_score: number;
  total_time: number;
  average_time: number;
  best_score: number;
  best_quiz_id: number | null;
  best_quiz_time: number;
  recent_quizzes: Array<{
    quiz_id: number;
    topic: string;
    score: number;
    time_taken: number;
    completed_at: string | null;
  }>;
}

interface LeaderboardData {
  leaderboard: LeaderboardEntry[];
  total_users: number;
  current_user: {
    rank: number | null;
    stats: LeaderboardEntry | null;
  };
  filters: {
    topic: string | null;
    skill_level: string | null;
  };
}

const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [skillLevelFilter, setSkillLevelFilter] = useState('');
  const [limit, setLimit] = useState(10);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [topicFilter, skillLevelFilter, limit]);

  // Auto-refresh every 30 seconds if enabled
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, topicFilter, skillLevelFilter, limit]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params: any = { limit };
      if (topicFilter) params.topic = topicFilter;
      if (skillLevelFilter) params.skill_level = skillLevelFilter;

      const data = await quizAPI.getLeaderboard(params);
      setLeaderboardData(data);
      setLastUpdated(new Date());
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

  const getRankBadgeColor = (rank: number): string => {
    if (rank === 1) return 'bg-yellow-500 text-white';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-orange-600 text-white';
    return 'bg-blue-500 text-white';
  };

  const getRankIcon = (rank: number): string => {
    if (rank === 1) return '🏆';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🎯';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Header 
        title="🏆 Leaderboard" 
        subtitle="See how you rank against other quiz masters!"
        showBackButton={true}
        backPath="/dashboard"
      />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded"
              />
              Auto-refresh (30s)
            </label>
          </div>
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>

        {/* Current User Stats Card */}
        {leaderboardData?.current_user?.stats && (
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Your Ranking</h3>
                <p className="text-3xl font-bold">
                  #{leaderboardData.current_user.rank}
                  <span className="text-lg ml-2">of {leaderboardData.total_users} players</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Average Score</p>
                <p className="text-3xl font-bold">
                  {leaderboardData.current_user.stats.average_score.toFixed(1)}%
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
              <div>
                <p className="text-sm opacity-90">Total Quizzes</p>
                <p className="text-xl font-semibold">
                  {leaderboardData.current_user.stats.total_quizzes}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-90">Questions Answered</p>
                <p className="text-xl font-semibold">
                  {leaderboardData.current_user.stats.total_questions}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-90">Avg. Time</p>
                <p className="text-xl font-semibold">
                  {formatTime(leaderboardData.current_user.stats.average_time)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic
              </label>
              <input
                type="text"
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                placeholder="Filter by topic..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill Level
              </label>
              <select
                value={skillLevelFilter}
                onChange={(e) => setSkillLevelFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Show Top
              </label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="10">Top 10</option>
                <option value="25">Top 25</option>
                <option value="50">Top 50</option>
                <option value="100">Top 100</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Leaderboard Table */}
        {leaderboardData && leaderboardData.leaderboard.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quizzes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Best Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Accuracy
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboardData.leaderboard.map((entry) => (
                    <tr
                      key={entry.user_id}
                      className={`hover:bg-gray-50 transition-colors ${
                        entry.user_id === leaderboardData.current_user.stats?.user_id
                          ? 'bg-blue-50 hover:bg-blue-100'
                          : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{getRankIcon(entry.rank)}</span>
                          <span
                            className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${getRankBadgeColor(
                              entry.rank
                            )} font-bold text-sm`}
                          >
                            {entry.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                            {entry.full_name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {entry.full_name}
                            </div>
                            <div className="text-sm text-gray-500">@{entry.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{entry.total_quizzes}</div>
                        <div className="text-xs text-gray-500">
                          {entry.total_questions} questions
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-semibold text-gray-900">
                            {entry.average_score.toFixed(1)}%
                          </div>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${entry.average_score}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600">
                          {entry.best_score.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatTime(entry.best_quiz_time)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatTime(entry.average_time)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {entry.total_questions > 0
                            ? ((entry.total_correct / entry.total_questions) * 100).toFixed(1)
                            : '0.0'}
                          %
                        </div>
                        <div className="text-xs text-gray-500">
                          {entry.total_correct} / {entry.total_questions}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Rankings Yet
            </h3>
            <p className="text-gray-600">
              Be the first to complete a quiz and claim the top spot!
            </p>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📊 How Rankings Work
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Rankings are based on <strong>average score</strong> across all completed quizzes</li>
            <li>• In case of a tie, the player with <strong>faster average time</strong> ranks higher</li>
            <li>• Only <strong>completed quizzes</strong> count towards your ranking</li>
            <li>• Keep practicing to improve your score and climb the leaderboard! 🚀</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
