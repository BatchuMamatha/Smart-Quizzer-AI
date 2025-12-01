import React, { useEffect, useState } from 'react';
import { analyticsAPI, WeeklyReport as WeeklyReportType } from '../lib/api';

const WeeklyReport: React.FC = () => {
  const [report, setReport] = useState<WeeklyReportType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);
      const data = await analyticsAPI.getWeeklyReport();
      setReport(data);
    } catch (error) {
      console.error('Failed to load weekly report:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return '📈';
      case 'declining':
        return '📉';
      default:
        return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving':
        return 'text-green-600';
      case 'declining':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center text-gray-500 dark:text-gray-400">
        <p>📊 No weekly data available</p>
        <p className="text-sm mt-2">Complete quizzes this week to see your report!</p>
      </div>
    );
  }

  // Calculate average accuracy from correct answers and total questions
  const avgAccuracy = (report.avg_accuracy !== undefined && report.avg_accuracy !== null) 
    ? report.avg_accuracy 
    : (report.total_questions > 0 ? (report.correct_answers / report.total_questions) * 100 : 0);

  const accuracyChange = (report.accuracy_change !== undefined && report.accuracy_change !== null) 
    ? report.accuracy_change 
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📅 Weekly Performance Report</h2>
        <p className="text-indigo-100">
          {new Date(report.week_start).toLocaleDateString()} - {new Date(report.week_end).toLocaleDateString()}
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Quizzes Completed</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{report.quizzes_completed}</p>
          {(report.quiz_count_change ?? 0) !== 0 && (
            <p className={`text-sm font-medium ${getChangeColor(report.quiz_count_change ?? 0)}`}>
              {(report.quiz_count_change ?? 0) > 0 ? '+' : ''}
              {report.quiz_count_change ?? 0} from last week
            </p>
          )}
        </div>

        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Average Accuracy</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{avgAccuracy.toFixed(1)}%</p>
          {accuracyChange !== 0 && (
            <p className={`text-sm font-medium ${getChangeColor(accuracyChange)}`}>
              {accuracyChange > 0 ? '+' : ''}
              {accuracyChange.toFixed(1)}% from last week
            </p>
          )}
        </div>

        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Questions</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{report.total_questions ?? 0}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {report.correct_answers ?? 0} correct
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Current Streak</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{report.current_streak ?? 0} 🔥</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {(report.current_streak ?? 0) === 1 ? 'day' : 'days'}
          </p>
        </div>
      </div>

      {/* Improvement Trend */}
      <div className="px-6 pb-6">
        <div className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 ${
          (report.improvement_trend ?? 'stable') === 'improving' ? 'border-green-500' :
          (report.improvement_trend ?? 'stable') === 'declining' ? 'border-red-500' : 'border-gray-400'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getTrendIcon(report.improvement_trend ?? 'stable')}</span>
            <div>
              <p className={`font-semibold ${getTrendColor(report.improvement_trend ?? 'stable')}`}>
                {(report.improvement_trend ?? 'stable') === 'improving' && 'You\'re Improving!'}
                {(report.improvement_trend ?? 'stable') === 'declining' && 'Room for Improvement'}
                {(report.improvement_trend ?? 'stable') === 'stable' && 'Maintaining Performance'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {(report.improvement_trend ?? 'stable') === 'improving' && 'Keep up the great work! Your scores are trending upward.'}
                {(report.improvement_trend ?? 'stable') === 'declining' && 'Don\'t worry! Review your weak areas and practice more.'}
                {(report.improvement_trend ?? 'stable') === 'stable' && 'You\'re consistent! Try challenging yourself with harder topics.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Breakdown */}
      {(report.topic_breakdown && Object.keys(report.topic_breakdown).length > 0) && (
        <>
          {/* Visual Divider */}
          <div className="px-6 py-4">
            <div className="border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          
          <div className="px-6 pb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📚 Topic Performance Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(report.topic_breakdown).map(([topic, stats]: [string, any]) => {
                // Calculate average accuracy from the backend data structure
                // Backend returns: { count, correct, total }
                const avgAccuracy = (stats && stats.total && stats.total > 0) ? (stats.correct / stats.total) * 100 : 0;
                const quizCount = (stats && stats.count) || 0;
                
                return (
                  <div key={topic} className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-4 border border-indigo-100 dark:border-indigo-700">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-900 dark:text-white">{topic}</span>
                      <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {avgAccuracy.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${Math.min(avgAccuracy, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {quizCount} {quizCount === 1 ? 'quiz' : 'quizzes'} completed
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Motivational Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-700 dark:to-indigo-900/30 p-4 text-center">
        {report.quizzes_completed === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            🎯 Start a quiz this week to track your progress!
          </p>
        ) : report.quizzes_completed < 5 ? (
          <p className="text-gray-600 dark:text-gray-400">
            💪 Great start! Try to complete 5+ quizzes this week for better insights.
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            ⭐ Excellent dedication! You've completed {report.quizzes_completed} quizzes this week!
          </p>
        )}
      </div>
    </div>
  );
};

export default WeeklyReport;
