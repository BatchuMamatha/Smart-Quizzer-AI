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
      console.log('Performance trends data received:', data);
      setTrends(data.trends || []);
      setCurrentStreak(data.current_streak || 0);
    } catch (error) {
      console.error('Failed to load performance trends:', error);
      setTrends([]);
      setCurrentStreak(0);
    } finally {
      setLoading(false);
    }
  }, [days, topic]);

  useEffect(() => {
    loadTrends();
  }, [loadTrends]);

  const getMaxValue = () => {
    if (trends.length === 0) return 100;
    return 100; // Always use 100% as max since accuracy is percentage
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

        <div className="relative h-64 mb-4">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 w-12 pr-2">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          {/* Chart area - main bars container */}
          <div className="ml-14 h-full flex items-end justify-center gap-4 pr-2 bg-gray-50 rounded border border-gray-100">
            {trends.map((trend, index) => {
              const accuracyRate = trend.accuracy_rate || 0;
              const height = Math.max((accuracyRate / 100) * 100, 5); // Ensure minimum height for visibility
              const isGood = accuracyRate >= 70;
              const isExcellent = accuracyRate >= 90;

              return (
                <div key={trend.id || index} className="flex flex-col items-center h-full group pb-2" style={{ width: '60px' }}>
                  {/* Tooltip container */}
                  <div className="relative w-full h-full flex flex-col items-center justify-end">
                    {/* Tooltip - appears on hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                      <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                        <p className="font-semibold">{formatDate(trend.date)}</p>
                        <p>Accuracy: {accuracyRate.toFixed(1)}%</p>
                        <p>Quizzes: {trend.quizzes_completed}</p>
                        {trend.avg_time_per_question && (
                          <p>Avg Time: {trend.avg_time_per_question.toFixed(1)}s</p>
                        )}
                      </div>
                    </div>

                    {/* Bar */}
                    <div
                      className={`w-10 cursor-pointer transition-all duration-300 hover:opacity-100 opacity-75 ${
                        isExcellent
                          ? 'bg-gradient-to-t from-green-500 to-green-400'
                          : isGood
                          ? 'bg-gradient-to-t from-blue-500 to-blue-400'
                          : 'bg-gradient-to-t from-gray-400 to-gray-300'
                      } rounded-t hover:shadow-lg`}
                      style={{ 
                        height: `${height}%`,
                        minHeight: '8px'
                      }}
                      title={`${formatDate(trend.date)}: ${accuracyRate.toFixed(1)}%`}
                    />
                  </div>

                  {/* X-axis label */}
                  <div className="text-xs text-gray-600 mt-1 font-medium text-center w-full truncate">
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
