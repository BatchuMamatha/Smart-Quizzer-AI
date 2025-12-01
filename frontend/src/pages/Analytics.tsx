import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserManager } from '../lib/userManager';
import { quizAPI, analyticsAPI, Recommendation } from '../lib/api';
import Header from '../components/Header';
import BadgeShowcase from '../components/BadgeShowcase';
import PerformanceChart from '../components/PerformanceChart';
import WeeklyReport from '../components/WeeklyReport';
import RecommendationCard from '../components/RecommendationCard';

interface RealTimeStats {
    total_quizzes: number;
    average_score: number;
    questions_answered: number;
    best_topic: string;
    worst_topic: string;
}

const Analytics: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'recommendations'>('overview');
    const [stats, setStats] = useState<RealTimeStats | null>(null);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const tabs = [
        { id: 'overview' as const, label: 'Overview', icon: '📊' },
        { id: 'badges' as const, label: 'Badges', icon: '🏆' },
        { id: 'recommendations' as const, label: 'AI Insights', icon: '🤖' },
    ];

    const fetchRecommendations = useCallback(async () => {
        try {
            const response = await analyticsAPI.getRecommendations();
            setRecommendations(response.recommendations);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        }
    }, []);

    // Fetch recommendations when tab is active
    useEffect(() => {
        if (activeTab === 'recommendations' && recommendations.length === 0) {
            fetchRecommendations();
        }
    }, [activeTab, recommendations.length, fetchRecommendations]);

    useEffect(() => {
        const userManager = UserManager.getInstance();
        if (!userManager.isAuthenticated()) {
            setError('Please log in to view analytics');
            setLoading(false);
            return;
        }
        
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const history = await quizAPI.getHistory();
            
            if (history.length === 0) {
                setStats({
                    total_quizzes: 0,
                    average_score: 0,
                    questions_answered: 0,
                    best_topic: 'None',
                    worst_topic: 'None'
                });
                setLoading(false);
                return;
            }

            const completedQuizzes = history.filter(q => q.status === 'completed');
            const totalQuizzes = completedQuizzes.length;
            const averageScore = totalQuizzes > 0 ? 
                completedQuizzes.reduce((sum, quiz) => sum + quiz.score_percentage, 0) / totalQuizzes : 0;
            const questionsAnswered = completedQuizzes.reduce((sum, quiz) => sum + quiz.completed_questions, 0);
            
            // Topics analysis
            const topicScores: Record<string, number[]> = {};
            completedQuizzes.forEach(quiz => {
                const topic = quiz.custom_topic ? 'Custom Content' : quiz.topic;
                if (!topicScores[topic]) topicScores[topic] = [];
                topicScores[topic].push(quiz.score_percentage);
            });
            
            const topicAverages = Object.entries(topicScores).map(([topic, scores]) => ({
                topic,
                average: scores.reduce((sum, score) => sum + score, 0) / scores.length
            }));
            
            const bestTopic = topicAverages.length > 0 ? 
                topicAverages.reduce((best, current) => current.average > best.average ? current : best).topic : 'None';
            const worstTopic = topicAverages.length > 0 ? 
                topicAverages.reduce((worst, current) => current.average < worst.average ? current : worst).topic : 'None';
            
            setStats({
                total_quizzes: totalQuizzes,
                average_score: averageScore,
                questions_answered: questionsAnswered,
                best_topic: bestTopic,
                worst_topic: worstTopic
            });
            
        } catch (err: any) {
            console.error('Failed to load stats:', err);
            setError('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    const handleRecommendationAction = (recommendation: Recommendation) => {
        // Navigate to quiz creation with the recommended topic
        if (recommendation.topic) {
            navigate('/quiz', { state: { topic: recommendation.topic } });
        } else {
            navigate('/quiz');
        }
    };

    const exportToCSV = async () => {
        try {
            const history = await quizAPI.getHistory();
            
            if (history.length === 0) {
                alert('No data to export. Take some quizzes first!');
                return;
            }

            // Prepare CSV data
            const headers = ['Date', 'Topic', 'Skill Level', 'Score (%)', 'Questions', 'Correct Answers', 'Time (min)', 'Status'];
            const rows = history.map(quiz => [
                new Date(quiz.started_at).toLocaleDateString(),
                quiz.custom_topic ? 'Custom Content' : quiz.topic,
                quiz.skill_level,
                quiz.score_percentage.toFixed(1),
                quiz.num_questions || quiz.total_questions,
                quiz.completed_questions,
                ((quiz.time_taken || quiz.total_time_seconds) / 60).toFixed(1),
                quiz.status
            ]);

            // Create CSV content
            let csvContent = headers.join(',') + '\n';
            rows.forEach(row => {
                csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
            });

            // Add summary statistics
            csvContent += '\n\nSummary Statistics\n';
            csvContent += `Total Quizzes,${stats?.total_quizzes || 0}\n`;
            csvContent += `Average Score,${stats?.average_score.toFixed(1) || 0}%\n`;
            csvContent += `Questions Answered,${stats?.questions_answered || 0}\n`;
            csvContent += `Best Topic,${stats?.best_topic || 'N/A'}\n`;
            csvContent += `Worst Topic,${stats?.worst_topic || 'N/A'}\n`;

            // Create download link
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.setAttribute('href', url);
            link.setAttribute('download', `quiz_analytics_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Failed to export data:', error);
            alert('Failed to export data. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading analytics...</p>
                </div>
            </div>
        );
    }

    if (error && !stats) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">📊</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Analytics Unavailable</h2>
                    <p className="text-gray-600 mb-4">{error || 'Take a quiz to start tracking your progress!'}</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header 
                title="Learning Analytics" 
                subtitle="Track your progress and performance"
                showBackButton={true}
                backPath="/dashboard"
            />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex -mb-px overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
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
                    {activeTab === 'overview' && stats && (
                        <>
                            {/* Main Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                                    <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stats.total_quizzes}</div>
                                    <div className="text-gray-600 dark:text-gray-400 font-medium">Total Quizzes</div>
                                    <div className="text-3xl mt-2">📝</div>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                                    <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">{Math.round(stats.average_score)}%</div>
                                    <div className="text-gray-600 dark:text-gray-400 font-medium">Average Score</div>
                                    <div className="text-3xl mt-2">🎯</div>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                                    <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">{stats.questions_answered}</div>
                                    <div className="text-gray-600 dark:text-gray-400 font-medium">Questions Answered</div>
                                    <div className="text-3xl mt-2">💡</div>
                                </div>
                            </div>

                            {/* Performance Trends & Topic Insights */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📈 Performance Trends & Topic Insights</h2>
                                <WeeklyReport />
                            </div>

                            {/* Performance Chart */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Historical Performance</h2>
                                <PerformanceChart days={30} />
                            </div>

                            {/* Progress Visual */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📈 Your Overall Progress</h2>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">Overall Performance</span>
                                            <span className="text-gray-900 dark:text-white font-bold">{Math.round(stats.average_score)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-6">
                                            <div 
                                                className={`h-6 rounded-full ${
                                                    stats.average_score >= 80 ? 'bg-green-500' : 
                                                    stats.average_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                                style={{ width: `${stats.average_score}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-6 text-center">
                                    {stats.average_score >= 80 && (
                                        <div className="text-green-600 dark:text-green-400 font-semibold">
                                            <span className="text-2xl mr-2">🎉</span>
                                            Excellent Performance! Keep it up!
                                        </div>
                                    )}
                                    {stats.average_score >= 60 && stats.average_score < 80 && (
                                        <div className="text-yellow-600 dark:text-yellow-400 font-semibold">
                                            <span className="text-2xl mr-2">👍</span>
                                            Good Progress! Keep practicing!
                                        </div>
                                    )}
                                    {stats.average_score < 60 && stats.average_score > 0 && (
                                        <div className="text-orange-600 dark:text-orange-400 font-semibold">
                                            <span className="text-2xl mr-2">💪</span>
                                            Keep practicing! You're improving!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'badges' && (
                        <>
                            {/* Badge Showcase */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Badges</h2>
                                <BadgeShowcase />
                            </div>
                        </>
                    )}

                    {activeTab === 'recommendations' && (
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🤖 AI Learning Recommendations</h2>
                                {recommendations.length > 0 ? (
                                    <div className="space-y-4">
                                        {recommendations.map((rec, idx) => (
                                            <RecommendationCard 
                                                key={idx}
                                                title={rec.type === 'focus_area' ? '📖 Focus Area' : 
                                                       rec.type === 'practice_more' ? '📚 Practice More' :
                                                       rec.type === 'try_harder' ? '💪 Push Harder' : '🌟 Maintain'}
                                                description={rec.message}
                                                actionText={rec.topic ? `Learn ${rec.topic}` : 'Start Quiz'}
                                                priority={rec.priority}
                                                onAction={() => handleRecommendationAction(rec)}
                                                icon={rec.type === 'focus_area' ? '📖' : 
                                                      rec.type === 'practice_more' ? '📚' :
                                                      rec.type === 'try_harder' ? '💪' : '🌟'}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                        <p>📚 No recommendations yet. Complete more quizzes to get personalized insights!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="text-center space-x-4 mt-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg font-semibold"
                    >
                        🚀 Take Another Quiz
                    </button>
                    <button
                        onClick={() => navigate('/history')}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-semibold"
                    >
                        📜 View History
                    </button>
                    <button
                        onClick={exportToCSV}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-semibold"
                        title="Download your analytics data as CSV"
                    >
                        📥 Export to CSV
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all shadow-lg font-semibold"
                        title="Print analytics report"
                    >
                        🖨️ Print Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
