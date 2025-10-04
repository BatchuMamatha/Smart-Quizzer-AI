import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserManager } from '../lib/userManager';
import { topicsAPI, quizAPI, Topic, User } from '../lib/api';

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
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [customTopic, setCustomTopic] = useState('');
  const [showCustomTopic, setShowCustomTopic] = useState(false);
  const [startingQuiz, setStartingQuiz] = useState(false);
  
  const navigate = useNavigate();
  const userManager = UserManager.getInstance();

  useEffect(() => {
    const currentUser = userManager.getCurrentUser();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setUser(currentUser);
    setSelectedSkillLevel(currentUser.skill_level);
    
    // Load topics function
    const loadTopics = async () => {
      try {
        const topicsData = await topicsAPI.getTopics();
        if (topicsData && topicsData.length > 0) {
          setTopics(topicsData);
        } else {
          // Use default topics if API returns empty or fails
          console.log('Using default topics as fallback');
          setTopics(defaultTopics);
        }
      } catch (error) {
        console.error('Error loading topics from API, using default topics:', error);
        // Use default topics as fallback
        setTopics(defaultTopics);
      } finally {
        setLoading(false);
      }
    };

    // Just load topics, don't try to fetch profile separately
    loadTopics();
  }, [navigate, userManager]);

  // Remove the separate loadTopics and loadUserProfile functions since they're now inside useEffect

  const handleStartQuiz = async () => {
    if (!selectedTopic || !selectedSkillLevel) {
      alert('Please select a topic and skill level');
      return;
    }

    // Validate custom topic content if Custom is selected
    if (selectedTopic === 'Custom' && (!customTopic || customTopic.trim().length === 0)) {
      alert('Please enter custom topic content');
      return;
    }

    // Ensure minimum content length for custom topics
    if (selectedTopic === 'Custom' && customTopic.trim().length < 10) {
      alert('Please enter at least 10 characters for custom topic content');
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
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      alert(`Quiz Start Error: ${errorMessage}`);
    } finally {
      setStartingQuiz(false);
    }
  };

  const handleLogout = () => {
    userManager.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="spinner-large mb-6"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Dashboard</h3>
          <p className="text-gray-500">Preparing your personalized quiz experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white bg-opacity-80 backdrop-blur-md shadow-lg border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl font-bold text-gradient mb-2">
                🧠 Smart Quizzer
              </h1>
              <p className="text-gray-600 font-medium">AI-Powered Learning Platform</p>
            </div>
            <div className="flex items-center space-x-4 animate-slide-in-right">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">Welcome back,</p>
                <p className="text-lg font-bold text-gradient">{user?.full_name}</p>
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                <span className="mr-2">👤</span>
                Update Profile
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                <span className="mr-2">👋</span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Quiz Setup - Enhanced */}
            <div className="lg:col-span-2">
              <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 animate-fade-in-scale">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                    <span className="mr-3 text-3xl">�</span>
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
                        className="block w-full px-4 py-3 text-base border border-gray-300 rounded-xl shadow-sm text-gray-900 bg-white cursor-pointer transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 pl-12"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 12px center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '16px 12px',
                          paddingRight: '40px',
                          appearance: 'none'
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <span className="mr-2 text-lg">✍️</span>
                        Custom Topic Content
                      </label>
                      <textarea
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        placeholder="Enter the content you want to generate questions from..."
                        rows={4}
                        className="block w-full px-4 py-3 text-base border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 text-gray-900 bg-white resize-none transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        💡 Tip: Paste any text content and our AI will create personalized quiz questions
                      </p>
                    </div>
                  )}

                  {/* Skill Level */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <span className="mr-2 text-lg">🎯</span>
                      Skill Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
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
                    <div className="grid grid-cols-4 gap-3">
                      {[3, 5, 7, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setNumQuestions(num)}
                          className={`p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                            numQuestions === num
                              ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:bg-green-50'
                          }`}
                        >
                          <div className="text-xl mb-1">{num}</div>
                          Questions
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Start Quiz Button */}
                  <button
                    onClick={handleStartQuiz}
                    disabled={startingQuiz || !selectedTopic || !selectedSkillLevel}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                  >
                    {startingQuiz ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                        🤖 Generating AI Questions...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="mr-2">🚀</span>
                        Start Quiz Adventure
                        <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Profile & Stats - Enhanced */}
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
                      <span className="mr-2">🧠</span>
                      Adaptive Analytics
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </div>


            </div>
          </div>


        </div>
      </main>
    </div>
  );
};

export default Dashboard;