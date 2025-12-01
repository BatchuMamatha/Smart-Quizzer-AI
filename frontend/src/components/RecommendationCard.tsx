import React from 'react';

interface RecommendationCardProps {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
  priority: 'high' | 'medium' | 'low';
  icon?: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  actionText,
  onAction,
  priority,
  icon = '💡'
}) => {
  const priorityColors = {
    high: 'border-red-500 bg-red-50 dark:bg-red-900/20',
    medium: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
    low: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
  };

  const priorityTextColors = {
    high: 'text-red-700 dark:text-red-400',
    medium: 'text-yellow-700 dark:text-yellow-400',
    low: 'text-blue-700 dark:text-blue-400'
  };

  const priorityButtonColors = {
    high: 'bg-red-600 hover:bg-red-700',
    medium: 'bg-yellow-600 hover:bg-yellow-700',
    low: 'bg-blue-600 hover:bg-blue-700'
  };

  return (
    <div className={`border-l-4 ${priorityColors[priority]} rounded-lg p-4 mb-4 shadow-sm`}>
      <div className="flex items-start space-x-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${priorityTextColors[priority]} mb-2`}>
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            {description}
          </p>
          <button
            onClick={onAction}
            className={`${priorityButtonColors[priority]} text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium`}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
