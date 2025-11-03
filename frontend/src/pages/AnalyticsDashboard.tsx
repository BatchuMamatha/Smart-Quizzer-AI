import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BadgeShowcase from '../components/BadgeShowcase';
import BadgeProgress from '../components/BadgeProgress';
import PerformanceChart from '../components/PerformanceChart';
import TopicHeatmap from '../components/TopicHeatmap';
import WeeklyReport from '../components/WeeklyReport';
import RecommendationCard from '../components/RecommendationCard';
import { analyticsAPI, Recommendation } from '../lib/api';

const AnalyticsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'mastery' | 'recommendations'>('overview');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'overview' as const, label: '📊 Overview', icon: '📊' },
    { id: 'badges' as const, label: '🏆 Badges', icon: '🏆' },
    { id: 'mastery' as const, label: '📚 Topic Mastery', icon: '📚' },
    { id: 'recommendations' as const, label: '🤖 AI Insights', icon: '🤖' },
  ];

  const fetchRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await analyticsAPI.getRecommendations();
      setRecommendations(response.recommendations);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch recommendations when tab is active
  useEffect(() => {
    if (activeTab === 'recommendations' && recommendations.length === 0) {
      fetchRecommendations();
    }
  }, [activeTab, recommendations.length, fetchRecommendations]);

  const handleRecommendationAction = (recommendation: Recommendation) => {
    // Navigate to quiz creation with the recommended topic
    if (recommendation.topic) {
      navigate('/quiz', { state: { topic: recommendation.topic } });
    } else {
      navigate('/quiz');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your progress, achievements, and get personalized insights</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Weekly Report */}
              <WeeklyReport />

              {/* Performance Chart */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Trends</h2>
                <PerformanceChart days={30} />
              </div>

              {/* Badge Progress - Close to Completion */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Badge Progress</h2>
                <BadgeProgress />
              </div>
            </>
          )}

          {activeTab === 'badges' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <BadgeShowcase />
            </div>
          )}

          {activeTab === 'mastery' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Topic Mastery Analysis</h2>
              <TopicHeatmap />
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Learning Insights</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <p className="mt-2 text-gray-600">Loading recommendations...</p>
                </div>
              ) : recommendations.length > 0 ? (
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <RecommendationCard
                      key={index}
                      title={rec.type === 'focus_area' ? '🎯 Focus Area Identified' :
                             rec.type === 'practice_more' ? '📚 Practice Recommendation' :
                             rec.type === 'try_harder' ? '💪 Challenge Yourself' :
                             '✨ Keep It Up!'}
                      description={rec.message}
                      actionText={rec.topic ? `Start ${rec.topic} Quiz` : 'Start Quiz'}
                      onAction={() => handleRecommendationAction(rec)}
                      priority={rec.priority}
                      icon={rec.type === 'focus_area' ? '🎯' :
                            rec.type === 'practice_more' ? '📚' :
                            rec.type === 'try_harder' ? '💪' : '✨'}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎓</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No recommendations yet</h3>
                  <p className="text-gray-600">Complete some quizzes to get personalized insights!</p>
                  <button
                    onClick={() => navigate('/quiz')}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Start a Quiz
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
