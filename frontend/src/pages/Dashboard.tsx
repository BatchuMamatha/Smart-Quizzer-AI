import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserManager } from '../lib/userManager';
import { topicsAPI, quizAPI, Topic, User } from '../lib/api';
import Header from '../components/Header';
import WelcomeModal from '../components/WelcomeModal';
// EmailVerificationBanner import removed - verification disabled
import QuizBookmarks from '../components/QuizBookmarks';
import { QuizBookmarksManager, QuizBookmark } from '../lib/quizBookmarks';
import { toast } from '../lib/toast';

const quizBookmarksManager = QuizBookmarksManager.getInstance();

// Default topics as fallback
const defaultTopics: Topic[] = [
  { id: 1, name: 'Mathematics', description: 'Mathematical concepts and problems', category: 'STEM', is_active: true },
  { id: 2, name: 'Science', description: 'Scientific principles and discoveries', category: 'STEM', is_active: true },
  { id: 3, name: 'History', description: 'Historical events and civilizations', category: 'Humanities', is_active: true },
  { id: 4, name: 'Literature', description: 'Literary works and analysis', category: 'Humanities', is_active: true },
  { id: 5, name: 'Geography', description: 'Physical and human geography', category: 'Social Studies', is_active: true },
  { id: 6, name: 'Computer Science', description: 'Programming and computing concepts', category: 'STEM', is_active: true },
  { id: 7, name: 'Physics', description: 'Physical laws and phenomena', category: 'STEM', is_active: true },
  { id: 8, name: 'Chemistry', description: 'Chemical reactions and properties', category: 'STEM', is_active: true },
  { id: 9, name: 'Biology', description: 'Living organisms and life processes', category: 'STEM', is_active: true },
  { id: 10, name: 'Economics', description: 'Economic principles and theories', category: 'Social Studies', is_active: true }
];

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | ''>('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [customTopic, setCustomTopic] = useState('');
  const [showCustomTopic, setShowCustomTopic] = useState(false);
  const [usingFallbackTopics, setUsingFallbackTopics] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Constants for validation
  const MIN_CUSTOM_TOPIC_LENGTH = 10;
  const MAX_CUSTOM_TOPIC_LENGTH = 10000;
  const [startingQuiz, setStartingQuiz] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const userManager = UserManager.getInstance();

  useEffect(() => {
    const currentUser = userManager.getCurrentUser();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setUser(currentUser);
    setSelectedSkillLevel(currentUser.skill_level);
    
    // Check if this is a first-time user (from registration)
    const isFirstTimeUser = (location.state as any)?.fromRegistration;
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (isFirstTimeUser && !hasSeenWelcome) {
      setShowWelcomeModal(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
    
    // Load topics function
    const loadTopics = async () => {
      try {
        const topicsData = await topicsAPI.getTopics();
        if (topicsData && topicsData.length > 0) {
          setTopics(topicsData);
          setUsingFallbackTopics(false);
        } else {
          // Use default topics if API returns empty or fails
          console.log('Using default topics as fallback');
          setTopics(defaultTopics);
          setUsingFallbackTopics(true);
        }
      } catch (error) {
        console.error('Error loading topics from API, using default topics:', error);
        // Use default topics as fallback
        setTopics(defaultTopics);
        setUsingFallbackTopics(true);
      } finally {
        setLoading(false);
      }
    };

    // Just load topics, don't try to fetch profile separately
    loadTopics();
  }, [navigate, userManager, location.state]);

  // Remove the separate loadTopics and loadUserProfile functions since they're now inside useEffect

  const handleStartQuiz = async () => {
    if (!selectedTopic || !selectedSkillLevel) {
      toast.warning('Selection Required', 'Please select a topic and skill level');
      return;
    }

    // Validate custom topic content if Custom is selected
    if (selectedTopic === 'Custom' && (!customTopic || customTopic.trim().length === 0)) {
      toast.warning('Content Required', 'Please enter custom topic content');
      return;
    }

    // Ensure minimum content length for custom topics
    if (selectedTopic === 'Custom' && customTopic.trim().length < MIN_CUSTOM_TOPIC_LENGTH) {
      toast.warning('Content Too Short', `Please enter at least ${MIN_CUSTOM_TOPIC_LENGTH} characters for custom topic content`);
      return;
    }

    // Ensure maximum content length for custom topics
    if (selectedTopic === 'Custom' && customTopic.trim().length > MAX_CUSTOM_TOPIC_LENGTH) {
      toast.warning('Content Too Long', `Maximum ${MAX_CUSTOM_TOPIC_LENGTH.toLocaleString()} characters allowed`);
      return;
    }

    setStartingQuiz(true);
    
    try {
      const quizPayload = {
        topic: selectedTopic === 'Custom' ? 'Custom Topic' : selectedTopic,
        skill_level: selectedSkillLevel,
        num_questions: numQuestions,
        custom_topic: selectedTopic === 'Custom' ? customTopic.trim() : undefined,
      };

      console.log('Starting quiz with payload:', quizPayload);
      
      const quizData = await quizAPI.startQuiz(quizPayload);
      
      navigate('/quiz', { state: { quizData } });
    } catch (error: any) {
      console.error('Quiz start error:', error);
      
      // Enhanced error handling
      let errorMessage = 'Failed to start quiz';
      
      // Handle rate limiting
      if (error.response?.status === 429) {
        const retryAfter = error.response?.data?.retry_after || 300;
        const minutes = Math.ceil(retryAfter / 60);
        errorMessage = error.response.data?.error || `Too many quiz attempts. Please wait ${minutes} minute${minutes > 1 ? 's' : ''} before trying again.`;
        toast.error('Rate Limit Exceeded', errorMessage, { duration: 7000 });
        return;
      }
      
      // Handle active session conflict
      if (error.response?.status === 409 && error.response?.data?.has_active_session) {
        const activeQuizTopic = error.response.data.active_quiz_topic || 'a quiz';
        const activeQuizId = error.response.data.active_quiz_id;
        
        if (window.confirm(
          `You already have an active quiz on "${activeQuizTopic}".\n\n` +
          `Would you like to resume it now?\n\n` +
          `Click OK to resume, or Cancel to stay on the dashboard.`
        )) {
          // Navigate to quiz page with resume state
          navigate('/quiz', { state: { resumeQuizId: activeQuizId } });
        }
        return;
      }
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      toast.error('Quiz Start Error', errorMessage);
    } finally {
      setStartingQuiz(false);
    }
  };

  const handleBookmarkQuiz = () => {
    if (!selectedTopic || !selectedSkillLevel) {
      toast.warning('Selection Required', 'Please select a topic and skill level to bookmark');
      return;
    }

    const bookmark = quizBookmarksManager.addBookmark(
      selectedTopic,
      selectedSkillLevel as 'Beginner' | 'Intermediate' | 'Advanced',
      numQuestions,
      selectedTopic === 'Custom' ? ['custom'] : []
    );

    if (bookmark) {
      toast.success(
        'Quiz Bookmarked!', 
        `${selectedTopic} \u2022 ${selectedSkillLevel} \u2022 ${numQuestions} questions`
      );
    }
  };

  const handleStartFromBookmark = (bookmark: QuizBookmark) => {
    setSelectedTopic(bookmark.topic);
    setSelectedSkillLevel(bookmark.skillLevel);
    setNumQuestions(bookmark.questionCount);
    setShowBookmarks(false);
    
    // Scroll to quiz setup
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="spinner-large mb-6"></div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading Dashboard</h3>
          <p className="text-gray-500 dark:text-gray-400">Preparing your personalized quiz experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <Header />

      <main className="relative max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Email Verification Banner - DISABLED */}
          {/* Email verification feature has been disabled */}
          
          {/* Fallback Topics Warning Banner */}
          {usingFallbackTopics && (
            <div className="mb-6 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg shadow-md animate-fade-in-up">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-semibold text-orange-800 mb-1">
                    Using Default Topics
                  </h3>
                  <p className="text-sm text-orange-700">
                    Unable to load topics from server. Showing cached default topics instead. 
                    Your quiz functionality is not affected, but some topics may be outdated.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 text-xs font-medium text-orange-800 hover:text-orange-900 underline"
                  >
                    🔄 Retry loading topics
                  </button>
                </div>
                <button
                  onClick={() => setUsingFallbackTopics(false)}
                  className="flex-shrink-0 ml-3 text-orange-400 hover:text-orange-600 transition-colors"
                  title="Dismiss warning"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Quiz Setup - Enhanced */}
            <div className="lg:col-span-2">
              <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 animate-fade-in-scale">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                    <span className="mr-3 text-3xl">🎓</span>
                    Start New Quiz
                  </h3>
                  <p className="text-gray-600">Create a personalized learning experience</p>
                </div>
                
                <div className="space-y-6">
                  {/* Topic Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <span className="mr-2 text-lg">📚</span>
                      Select Topic
                    </label>
                    <div className="relative">
                      <select
                        value={selectedTopic}
                        onChange={(e) => {
                          setSelectedTopic(e.target.value);
                          setShowCustomTopic(e.target.value === 'Custom');
                        }}
                        className="block w-full px-4 py-3 text-lg border border-gray-300 rounded-xl shadow-sm text-gray-900 bg-white cursor-pointer transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 pl-12"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 12px center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '16px 12px',
                          paddingRight: '40px',
                          appearance: 'none',
                          fontSize: '1.125rem'
                        }}
                      >
                        <option value="">🎯 Choose your learning topic...</option>
                        {topics.map((topic) => (
                          <option key={topic.id} value={topic.name}>
                            📖 {topic.name} - {topic.description}
                          </option>
                        ))}
                        <option value="Custom">✨ Custom Topic</option>
                      </select>
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-lg">📚</span>
                      </div>
                    </div>
                  </div>

                  {/* Custom Topic Input */}
                  {showCustomTopic && (
                    <div className="animate-fade-in-up">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                        <span className="flex items-center">
                          <span className="mr-2 text-lg">✍️</span>
                          Custom Topic Content
                        </span>
                        <span className={`text-xs font-normal ${
                          customTopic.length > MAX_CUSTOM_TOPIC_LENGTH 
                            ? 'text-red-600 font-semibold' 
                            : customTopic.length > MAX_CUSTOM_TOPIC_LENGTH * 0.9
                            ? 'text-orange-600'
                            : 'text-gray-500'
                        }`}>
                          {customTopic.length.toLocaleString()} / {MAX_CUSTOM_TOPIC_LENGTH.toLocaleString()} characters
                        </span>
                      </label>
                      <textarea
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        maxLength={MAX_CUSTOM_TOPIC_LENGTH}
                        placeholder="Enter the content you want to generate questions from..."
                        rows={4}
                        className={`block w-full px-4 py-3 text-base border rounded-xl shadow-sm placeholder-gray-500 text-gray-900 bg-white resize-none transition-all duration-200 focus:outline-none focus:ring-2 ${
                          customTopic.length > MAX_CUSTOM_TOPIC_LENGTH
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                      />
                      <div className="flex items-start justify-between mt-1">
                        <p className="text-xs text-gray-500">
                          💡 Tip: Paste any text content and our AI will create personalized quiz questions
                        </p>
                        {customTopic.length < MIN_CUSTOM_TOPIC_LENGTH && customTopic.length > 0 && (
                          <p className="text-xs text-orange-600">
                            ⚠️ Minimum {MIN_CUSTOM_TOPIC_LENGTH} characters required
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Skill Level */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <span className="mr-2 text-lg">🎯</span>
                      Skill Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setSelectedSkillLevel(level)}
                          className={`p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                            selectedSkillLevel === level
                              ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className="text-lg mb-1">
                            {level === 'Beginner' ? '🌱' : level === 'Intermediate' ? '🚀' : '🏆'}
                          </div>
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number of Questions */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <span className="mr-2 text-lg">🔢</span>
                      Number of Questions
                    </label>
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      {[3, 5, 7, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setNumQuestions(num)}
                          className={`p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                            numQuestions === num
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 shadow-md'
                              : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:border-green-300 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                          }`}
                        >
                          <div className="text-xl mb-1">{num}</div>
                          Questions
                        </button>
                      ))}
                    </div>
                    {/* Custom Input Option */}
                    <div className="flex items-center space-x-2">
                      <label htmlFor="custom-questions" className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Or enter custom:
                      </label>
                      <input
                        id="custom-questions"
                        type="number"
                        min="1"
                        max="20"
                        value={numQuestions}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 1;
                          setNumQuestions(Math.min(Math.max(value, 1), 20));
                        }}
                        className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 transition-all"
                        placeholder="1-20"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">questions</span>
                    </div>
                  </div>

                  {/* Start Quiz Button */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleStartQuiz}
                      disabled={startingQuiz || !selectedTopic || !selectedSkillLevel}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                    >
                      {startingQuiz ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                          🤖 Generating AI Questions...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span className="mr-2">🚀</span>
                          Start Quiz
                          <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      )}
                    </button>
                    
                    <button
                      onClick={handleBookmarkQuiz}
                      disabled={!selectedTopic || !selectedSkillLevel}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      title="Bookmark this quiz configuration"
                    >
                      ⭐
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile & Stats - Enhanced - Moved to top right */}
            <div className="space-y-6">
              {/* User Profile Card */}
              <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 animate-fade-in-scale" style={{animationDelay: '200ms'}}>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center">
                    <span className="mr-3 text-2xl">👤</span>
                    Your Profile
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center pb-4 border-b border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <span className="text-white text-2xl font-bold">
                        {user?.full_name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{user?.full_name}</h4>
                    <p className="text-sm text-gray-500">@{user?.username}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">📧 Email:</span>
                      <span className="text-sm font-medium text-gray-900">{user?.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">🎯 Skill Level:</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user?.skill_level === 'Beginner' ? '🌱' : user?.skill_level === 'Intermediate' ? '🚀' : '🏆'} {user?.skill_level}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">📅 Member Since:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => navigate('/content-upload')}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 group"
                    >
                      <span className="mr-2">📁</span>
                      Custom Content Upload
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    
                    <button
                      onClick={() => navigate('/history')}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 group"
                    >
                      <span className="mr-2">📈</span>
                      View Quiz History
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    
                    <button
                      onClick={() => navigate('/analytics')}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 group"
                    >
                      <span className="mr-2">📊</span>
                      Analytics Overview
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    
                    <button
                      onClick={() => setShowWelcomeModal(true)}
                      className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 group"
                      title="View the welcome tour again"
                    >
                      <span className="mr-2">🎉</span>
                      Welcome Tour
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* Saved Quizzes Section - Full width below main content */}
          <div className="mt-8">
            <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <span className="mr-3 text-3xl">⭐</span>
                    Saved Quizzes
                  </h3>
                  <p className="text-gray-600 mt-1">Quick access to your favorite quiz configurations</p>
                </div>
                <button
                  onClick={() => setShowBookmarks(!showBookmarks)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {showBookmarks ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showBookmarks && (
                <QuizBookmarks onStartQuiz={handleStartFromBookmark} />
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Welcome Modal for First-Time Users */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        userName={user?.full_name || user?.username}
      />
    </div>
  );
};

export default Dashboard;