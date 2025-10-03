import React, { useState, useEffect } from 'react';
import { UserManager } from '../lib/userManager';
import api from '../lib/api';

interface AdaptiveAnalytics {
    current_difficulty: string;
    performance_metrics: {
        accuracy: number;
        confidence: number;
        trend: number;
        difficulty_performance: {
            easy: number;
            medium: number;
            hard: number;
        };
        consecutive_correct: number;
    };
    learning_insights: {
        learning_trend: string;
        confidence_level: string;
        strength_area: string;
        improvement_area: string;
    };
    session_stats: {
        total_questions: number;
        correct_answers: number;
        consecutive_correct: number;
        difficulty_changes: number;
    };
    progress_indicators: {
        learning_trend: string;
        confidence_level: string;
        strength_area: string;
        improvement_area: string;
    };
    difficulty_distribution: {
        easy_accuracy: number;
        medium_accuracy: number;
        hard_accuracy: number;
    };
    has_quiz_data?: boolean;
    message?: string;
}

const Analytics: React.FC = () => {
    const [analytics, setAnalytics] = useState<AdaptiveAnalytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if user is authenticated
        const userManager = UserManager.getInstance();
        const isAuth = userManager.isAuthenticated();
        const token = localStorage.getItem('access_token');
        const user = localStorage.getItem('user');
        
        console.log('Auth check:', {
            isAuthenticated: isAuth,
            hasToken: !!token,
            hasUser: !!user,
            tokenPreview: token ? token.substring(0, 20) + '...' : 'No token'
        });
        
        if (!isAuth || !token) {
            setError('Please log in to view analytics');
            setLoading(false);
            return;
        }
        
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            console.log('Fetching analytics with token:', token ? 'Token exists' : 'No token');
            const response = await api.get('/user/adaptive-analytics');
            console.log('Analytics response:', response.data);
            setAnalytics(response.data);
        } catch (err: any) {
            console.error('Analytics fetch error:', err);
            console.error('Error response:', err.response);
            
            if (err.response?.status === 401) {
                setError('Please log in to view analytics');
            } else if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('Failed to load analytics');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading adaptive analytics...</p>
                </div>
            </div>
        );
    }

    if (error || !analytics) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">📊</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Analytics Unavailable</h2>
                    <p className="text-gray-600 mb-4">
                        {error === 'Please log in to view analytics' ? 
                            'Please log in to view your adaptive learning analytics.' :
                            error || 'Take a quiz to start tracking your adaptive learning progress!'
                        }
                    </p>
                    <div className="space-x-4">
                        {error === 'Please log in to view analytics' ? (
                            <button
                                onClick={() => window.location.href = '/login'}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Log In
                            </button>
                        ) : (
                            <button
                                onClick={() => window.location.href = '/dashboard'}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Start a Quiz
                            </button>
                        )}
                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Chart data configurations
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'hard': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'improving': return '📈';
            case 'declining': return '📉';
            default: return '➡️';
        }
    };

    const getConfidenceIcon = (level: string) => {
        switch (level) {
            case 'high': return '🔥';
            case 'medium': return '⚡';
            default: return '💭';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        🧠 Adaptive Learning Analytics
                    </h1>
                    <p className="text-xl text-gray-600">
                        AI-powered insights into your learning progress
                    </p>
                    {analytics.has_quiz_data && (
                        <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            ✅ Real Data - Based on {analytics.session_stats.total_questions || 0} questions answered
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(analytics.current_difficulty)}`}>
                            {analytics.current_difficulty.toUpperCase()}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Current Difficulty</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600">
                            {analytics.session_stats.total_questions > 0 ? 
                                Math.round(analytics.performance_metrics.accuracy * 100) : 0}%
                        </div>
                        <p className="text-sm text-gray-600">
                            {analytics.session_stats.total_questions > 0 ? 'Overall Accuracy' : 'No Data Yet'}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-2xl mb-1">
                            {getTrendIcon(analytics.learning_insights.learning_trend)}
                        </div>
                        <div className="text-lg font-semibold capitalize text-gray-800">
                            {analytics.learning_insights.learning_trend}
                        </div>
                        <p className="text-sm text-gray-600">Learning Trend</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-2xl mb-1">
                            {getConfidenceIcon(analytics.learning_insights.confidence_level)}
                        </div>
                        <div className="text-lg font-semibold capitalize text-gray-800">
                            {analytics.learning_insights.confidence_level}
                        </div>
                        <p className="text-sm text-gray-600">Confidence Level</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Difficulty Performance */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            📊 Performance by Difficulty
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Easy</span>
                                <div className="flex-1 mx-4">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className="bg-green-500 h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${analytics.session_stats.total_questions > 0 ? 
                                                    analytics.difficulty_distribution.easy_accuracy * 100 : 0}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-green-600">
                                    {analytics.session_stats.total_questions > 0 ? 
                                        Math.round(analytics.difficulty_distribution.easy_accuracy * 100) : 0}%
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Medium</span>
                                <div className="flex-1 mx-4">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${analytics.session_stats.total_questions > 0 ? 
                                                    analytics.difficulty_distribution.medium_accuracy * 100 : 0}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-yellow-600">
                                    {analytics.session_stats.total_questions > 0 ? 
                                        Math.round(analytics.difficulty_distribution.medium_accuracy * 100) : 0}%
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Hard</span>
                                <div className="flex-1 mx-4">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className="bg-red-500 h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${analytics.session_stats.total_questions > 0 ? 
                                                    analytics.difficulty_distribution.hard_accuracy * 100 : 0}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-red-600">
                                    {analytics.session_stats.total_questions > 0 ? 
                                        Math.round(analytics.difficulty_distribution.hard_accuracy * 100) : 0}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            📈 Performance Metrics
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Accuracy</span>
                                <div className="flex-1 mx-4">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${analytics.session_stats.total_questions > 0 ? 
                                                    analytics.performance_metrics.accuracy * 100 : 0}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-blue-600">
                                    {analytics.session_stats.total_questions > 0 ? 
                                        Math.round(analytics.performance_metrics.accuracy * 100) : 0}%
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Confidence</span>
                                <div className="flex-1 mx-4">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${analytics.session_stats.total_questions > 0 ? 
                                                    analytics.performance_metrics.confidence * 100 : 0}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-purple-600">
                                    {analytics.session_stats.total_questions > 0 ? 
                                        Math.round(analytics.performance_metrics.confidence * 100) : 0}%
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Progress Trend</span>
                                <div className="flex-1 mx-4">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className={`h-3 rounded-full transition-all duration-500 ${
                                                analytics.performance_metrics.trend > 0 ? 'bg-green-500' : 
                                                analytics.performance_metrics.trend < 0 ? 'bg-red-500' : 'bg-gray-500'
                                            }`}
                                            style={{
                                                width: `${analytics.session_stats.total_questions > 0 ? 
                                                    Math.max(10, (analytics.performance_metrics.trend + 1) * 50) : 10}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <span className={`text-sm font-bold ${
                                    analytics.performance_metrics.trend > 0 ? 'text-green-600' : 
                                    analytics.performance_metrics.trend < 0 ? 'text-red-600' : 'text-gray-600'
                                }`}>
                                    {analytics.performance_metrics.trend > 0 ? '↗️' : 
                                     analytics.performance_metrics.trend < 0 ? '↘️' : '➡️'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Learning Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Adaptive Insights */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            🎯 Adaptive Learning Insights
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Strength Area:</span>
                                <span className="font-semibold text-green-600 capitalize">
                                    {analytics.learning_insights.strength_area} Difficulty
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Improvement Area:</span>
                                <span className="font-semibold text-orange-600 capitalize">
                                    {analytics.learning_insights.improvement_area} Difficulty
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Consecutive Correct:</span>
                                <span className="font-semibold text-blue-600">
                                    {analytics.performance_metrics.consecutive_correct} questions
                                </span>
                            </div>
                            {analytics.session_stats.difficulty_changes > 0 && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Difficulty Adjustments:</span>
                                    <span className="font-semibold text-purple-600">
                                        {analytics.session_stats.difficulty_changes} changes
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Session Statistics */}
                    {analytics.session_stats.total_questions > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                📋 Current Session Stats
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Questions:</span>
                                    <span className="font-semibold text-gray-800">
                                        {analytics.session_stats.total_questions}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Correct Answers:</span>
                                    <span className="font-semibold text-green-600">
                                        {analytics.session_stats.correct_answers}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Current Streak:</span>
                                    <span className="font-semibold text-blue-600">
                                        {analytics.session_stats.consecutive_correct}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{
                                            width: `${(analytics.session_stats.correct_answers / analytics.session_stats.total_questions) * 100}%`
                                        }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 text-center">
                                    Session Accuracy: {Math.round((analytics.session_stats.correct_answers / analytics.session_stats.total_questions) * 100)}%
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
                    >
                        Take Another Quiz
                    </button>
                    <button
                        onClick={fetchAnalytics}
                        className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Refresh Analytics
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Analytics;