import React, { useEffect, useState, useCallback } from 'react';
import { analyticsAPI, PerformanceTrend } from '../lib/api';

interface PerformanceChartProps {
  days?: number;
  topic?: string;
}


const PerformanceChart: React.FC<PerformanceChartProps> = ({ days = 30, topic }) => {
  const [trends, setTrends] = useState<PerformanceTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStreak, setCurrentStreak] = useState(0);

  const loadTrends = useCallback(async () => {
    try {
      setLoading(true);
      const data = await analyticsAPI.getPerformanceTrends({ days, topic });
      setTrends(data.trends);
      setCurrentStreak(data.current_streak);
    } catch (error) {
      console.error('Failed to load performance trends:', error);
    } finally {
      setLoading(false);
    }
  }, [days, topic]);

  useEffect(() => {
    loadTrends();
  }, [loadTrends]);

  const getMaxValue = () => {
    if (trends.length === 0) return 100;
    return Math.max(...trends.map((t) => t.accuracy_rate), 100);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (trends.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
        <p>📊 No performance data yet</p>
        <p className="text-sm mt-2">Complete some quizzes to see your trends!</p>
      </div>
    );
  }

  const maxValue = getMaxValue();
  const avgAccuracy = trends.reduce((sum, t) => sum + t.accuracy_rate, 0) / trends.length;
  const totalQuizzes = trends.reduce((sum, t) => sum + t.quizzes_completed, 0);

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <p className="text-blue-100 text-sm">Avg Accuracy</p>
          <p className="text-3xl font-bold">{avgAccuracy.toFixed(1)}%</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
          <p className="text-green-100 text-sm">Total Quizzes</p>
          <p className="text-3xl font-bold">{totalQuizzes}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <p className="text-purple-100 text-sm">Current Streak</p>
          <p className="text-3xl font-bold">{currentStreak} 🔥</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {topic ? `${topic} Performance` : 'Overall Performance'}
        </h3>

        <div className="relative h-64">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          {/* Chart area */}
          <div className="ml-12 h-full flex items-end gap-1">
            {trends.map((trend, index) => {
              const height = (trend.accuracy_rate / maxValue) * 100;
              const isGood = trend.accuracy_rate >= 70;
              const isExcellent = trend.accuracy_rate >= 90;

              return (
                <div key={trend.id} className="flex-1 flex flex-col items-center group">
                  {/* Bar */}
                  <div className="w-full relative" style={{ height: '90%' }}>
                    <div className="absolute bottom-0 w-full flex flex-col items-center">
                      <div
                        className={`w-full rounded-t transition-all duration-300 relative ${
                          isExcellent
                            ? 'bg-gradient-to-t from-green-500 to-green-400'
                            : isGood
                            ? 'bg-gradient-to-t from-blue-500 to-blue-400'
                            : 'bg-gradient-to-t from-gray-400 to-gray-300'
                        } hover:opacity-80`}
                        style={{ height: `${height}%` }}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          <div className="bg-gray-900 text-white text-xs rounded-lg p-2 whitespace-nowrap shadow-lg">
                            <p className="font-semibold">{formatDate(trend.date)}</p>
                            <p>Accuracy: {trend.accuracy_rate.toFixed(1)}%</p>
                            <p>Quizzes: {trend.quizzes_completed}</p>
                            {trend.avg_time_per_question && (
                              <p>Avg Time: {trend.avg_time_per_question.toFixed(1)}s</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* X-axis label */}
                  <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                    {formatDate(trend.date)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-t from-green-500 to-green-400"></div>
            <span className="text-gray-600">Excellent (90%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-t from-blue-500 to-blue-400"></div>
            <span className="text-gray-600">Good (70-89%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-t from-gray-400 to-gray-300"></div>
            <span className="text-gray-600">Needs Work (&lt;70%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
