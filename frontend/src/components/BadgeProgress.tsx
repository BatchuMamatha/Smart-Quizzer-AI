import React, { useEffect, useState } from 'react';
import { badgeAPI, BadgeProgress as BadgeProgressType } from '../lib/api';

const BadgeProgress: React.FC = () => {
  const [closeToCompletion, setCloseToCompletion] = useState<BadgeProgressType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      setLoading(true);
      const data = await badgeAPI.getBadgeProgress();
      setCloseToCompletion(data.close_to_completion);
    } catch (error) {
      console.error('Failed to load badge progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (closeToCompletion.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
        <p>🎯 No badges close to completion</p>
        <p className="text-sm mt-2">Keep taking quizzes to unlock new badges!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        🎯 Almost There! ({closeToCompletion.length})
      </h3>

      <div className="space-y-3">
        {closeToCompletion.map((progress) => (
          <div
            key={progress.badge.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              {/* Badge Icon */}
              <div className="text-4xl flex-shrink-0">{progress.badge.icon}</div>

              {/* Progress Info */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">
                    {progress.badge.name}
                  </h4>
                  <span className="text-sm font-medium text-indigo-600">
                    {Math.round(progress.progress_percentage)}%
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {progress.badge.description}
                </p>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${progress.progress_percentage}%` }}
                    ></div>
                  </div>

                  {/* Progress Text */}
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>
                      {progress.current_value} / {progress.required_value}
                    </span>
                    <span>
                      {progress.required_value - progress.current_value} more to go!
                    </span>
                  </div>
                </div>

                {/* Rarity and Points */}
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-medium capitalize">
                    {progress.badge.rarity}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                    ⭐ {progress.badge.points} points
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeProgress;
