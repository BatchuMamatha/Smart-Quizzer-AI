import React, { useEffect, useState } from 'react';
import { analyticsAPI, TopicMastery } from '../lib/api';

const TopicHeatmap: React.FC = () => {
  const [topics, setTopics] = useState<TopicMastery[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMastery();
  }, []);

  const loadMastery = async () => {
    try {
      setLoading(true);
      const data = await analyticsAPI.getTopicMastery();
      setTopics(data.topics);
      setStrengths(data.strengths);
      setWeaknesses(data.weaknesses);
    } catch (error) {
      console.error('Failed to load topic mastery:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMasteryIcon = (level: string) => {
    switch (level) {
      case 'expert':
        return '🏆';
      case 'proficient':
        return '⭐';
      case 'developing':
        return '📚';
      default:
        return '🌱';
    }
  };

  const getMasteryLabel = (level: string) => {
    switch (level) {
      case 'expert':
        return 'Expert';
      case 'proficient':
        return 'Proficient';
      case 'developing':
        return 'Developing';
      default:
        return 'Beginner';
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
        <p>📊 No topic data available</p>
        <p className="text-sm mt-2">Complete quizzes to see your mastery!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-3">💪 Your Strengths</h3>
          {strengths.length > 0 ? (
            <ul className="space-y-2">
              {strengths.map((topic) => (
                <li key={topic} className="flex items-center gap-2 text-green-700">
                  <span className="text-green-500">✓</span>
                  <span className="font-medium">{topic}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-600 text-sm">Keep practicing to identify strengths!</p>
          )}
        </div>

        {/* Weaknesses */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="font-semibold text-orange-900 mb-3">📈 Areas to Improve</h3>
          {weaknesses.length > 0 ? (
            <ul className="space-y-2">
              {weaknesses.map((topic) => (
                <li key={topic} className="flex items-center gap-2 text-orange-700">
                  <span className="text-orange-500">!</span>
                  <span className="font-medium">{topic}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-orange-600 text-sm">Great! No weak areas identified.</p>
          )}
        </div>
      </div>

      {/* Topic Mastery Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Mastery Levels</h3>
        <div className="space-y-3">
          {topics.map((topic) => (
            <div
              key={topic.topic}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getMasteryIcon(topic.mastery_level)}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{topic.topic}</h4>
                    <p className="text-sm text-gray-500">
                      {topic.total_quizzes} {topic.total_quizzes === 1 ? 'quiz' : 'quizzes'} • {topic.total_questions} questions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold" style={{ color: topic.color }}>
                    {topic.avg_accuracy.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">{getMasteryLabel(topic.mastery_level)}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${topic.avg_accuracy}%`,
                      backgroundColor: topic.color,
                    }}
                  ></div>
                </div>
                {/* Mastery thresholds */}
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>0%</span>
                  <span className="text-red-400">60%</span>
                  <span className="text-yellow-400">80%</span>
                  <span className="text-green-400">90%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-3">Mastery Levels</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span>🏆</span>
            <div>
              <p className="font-medium text-gray-900">Expert</p>
              <p className="text-gray-500">90%+ accuracy</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐</span>
            <div>
              <p className="font-medium text-gray-900">Proficient</p>
              <p className="text-gray-500">80-89% accuracy</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>📚</span>
            <div>
              <p className="font-medium text-gray-900">Developing</p>
              <p className="text-gray-500">60-79% accuracy</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>🌱</span>
            <div>
              <p className="font-medium text-gray-900">Beginner</p>
              <p className="text-gray-500">&lt;60% accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicHeatmap;
