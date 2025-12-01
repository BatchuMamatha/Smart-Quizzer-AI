import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserManager } from '../lib/userManager';
import ContentUpload from '../components/ContentUpload';
import { quizAPI } from '../lib/api';
import Header from '../components/Header';

const STORAGE_KEY = 'smartquizzer_content_draft';

interface ContentDraft {
  processedContent: string;
  contentMetadata: any;
  selectedSkillLevel: string;
  numQuestions: number;
  timestamp: number;
}

const ContentUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const userManager = UserManager.getInstance();
  const user = userManager.getCurrentUser();
  
  const [processedContent, setProcessedContent] = useState<string>('');
  const [contentMetadata, setContentMetadata] = useState<any>(null);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>(user?.skill_level || 'Intermediate');
  const [numQuestions, setNumQuestions] = useState(5);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [error, setError] = useState<string>('');
  const [hasDraft, setHasDraft] = useState(false);

  // Load draft from localStorage on component mount
  useEffect(() => {
    const loadDraft = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const draft: ContentDraft = JSON.parse(saved);
          
          // Check if draft is not too old (e.g., 7 days)
          const daysSinceCreation = (Date.now() - draft.timestamp) / (1000 * 60 * 60 * 24);
          if (daysSinceCreation > 7) {
            localStorage.removeItem(STORAGE_KEY);
            return;
          }

          setProcessedContent(draft.processedContent);
          setContentMetadata(draft.contentMetadata);
          setSelectedSkillLevel(draft.selectedSkillLevel as 'Beginner' | 'Intermediate' | 'Advanced');
          setNumQuestions(draft.numQuestions);
          setHasDraft(true);
        }
      } catch (error) {
        console.error('Failed to load draft:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    loadDraft();
  }, []);

  // Auto-save to localStorage whenever content changes
  useEffect(() => {
    if (processedContent && contentMetadata) {
      try {
        const draft: ContentDraft = {
          processedContent,
          contentMetadata,
          selectedSkillLevel,
          numQuestions,
          timestamp: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      } catch (error) {
        console.error('Failed to save draft:', error);
      }
    }
  }, [processedContent, contentMetadata, selectedSkillLevel, numQuestions]);

  const clearDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setProcessedContent('');
      setContentMetadata(null);
      setSelectedSkillLevel(user?.skill_level || 'Intermediate');
      setNumQuestions(5);
      setHasDraft(false);
      setError('');
    } catch (error) {
      console.error('Failed to clear draft:', error);
    }
  };

  const handleContentProcessed = (content: string, metadata: any) => {
    setProcessedContent(content);
    setContentMetadata(metadata);
    setError('');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setProcessedContent('');
    setContentMetadata(null);
  };

  const generateQuizFromContent = async () => {
    if (!processedContent) {
      setError('Please upload and process content first');
      return;
    }

    setIsGeneratingQuiz(true);
    setError('');

    try {
      const quizPayload = {
        topic: contentMetadata?.title || contentMetadata?.filename || 'Custom Uploaded Content',
        skill_level: selectedSkillLevel,
        num_questions: numQuestions,
        custom_topic: processedContent,
      };

      const quizData = await quizAPI.startQuiz(quizPayload);
      
      // Clear draft on successful quiz start
      clearDraft();
      
      navigate('/quiz', { state: { quizData } });
    } catch (error: any) {
      console.error('Quiz generation error:', error);
      
      let errorMessage = 'Failed to generate quiz from content';
      
      // Handle rate limiting
      if (error.response?.status === 429) {
        const retryAfter = error.response?.data?.retry_after || 300;
        const minutes = Math.ceil(retryAfter / 60);
        errorMessage = error.response.data?.error || `Too many quiz attempts. Please wait ${minutes} minute${minutes > 1 ? 's' : ''} before trying again.`;
        setError(`⏱️ Rate Limit: ${errorMessage}`);
        return;
      }
      
      // Handle active session conflict
      if (error.response?.status === 409 && error.response?.data?.has_active_session) {
        const activeQuizTopic = error.response.data.active_quiz_topic || 'a quiz';
        const activeQuizId = error.response.data.active_quiz_id;
        
        const shouldResume = window.confirm(
          `You already have an active quiz on "${activeQuizTopic}".\n\n` +
          `Would you like to resume it now?\n\n` +
          `Click OK to resume, or Cancel to continue editing your content.`
        );
        
        if (shouldResume) {
          navigate('/quiz', { state: { resumeQuizId: activeQuizId } });
        } else {
          setError(`Active quiz session detected: "${activeQuizTopic}". Please complete or abandon it before starting a new one.`);
        }
        return;
      }
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <Header 
        title="📁 Custom Content Upload" 
        subtitle="Transform any content into personalized quizzes"
      />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Draft Restored Banner */}
        {hasDraft && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <span className="text-blue-500 dark:text-blue-400 text-xl mr-3 mt-1">💾</span>
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Draft Restored</h4>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    Your previous content has been automatically restored. You can continue where you left off.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setHasDraft(false)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-2xl leading-none"
                title="Dismiss"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Content Upload Section */}
          <div className="lg:col-span-2">
            <ContentUpload
              onContentProcessed={handleContentProcessed}
              onError={handleError}
              className="mb-6"
            />

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-start">
                  <span className="text-red-500 dark:text-red-400 text-xl mr-3 mt-1">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-400 mb-1">Error</h4>
                    <p className="text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quiz Generation Section */}
          <div className="space-y-6">
            {/* Quiz Settings */}
            <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-lg border border-white dark:border-gray-700 border-opacity-30 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="mr-3 text-2xl">⚙️</span>
                Quiz Settings
              </h3>

              <div className="space-y-4">
                {/* Skill Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    🎯 Difficulty Level
                  </label>
                  <div className="space-y-2">
                    {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedSkillLevel(level)}
                        className={`w-full p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          selectedSkillLevel === level
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500'
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <span className="mr-2">
                            {level === 'Beginner' ? '🌱' : level === 'Intermediate' ? '🚀' : '🏆'}
                          </span>
                          {level}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Questions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    🔢 Number of Questions
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[3, 5, 7, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => setNumQuestions(num)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          numQuestions === num
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:border-green-300 dark:hover:border-green-500'
                        }`}
                      >
                        <div className="text-lg font-bold">{num}</div>
                        <div className="text-xs">Questions</div>
                      </button>
                    ))}
                  </div>
                  {/* Custom Input Option */}
                  <div className="flex items-center space-x-2">
                    <label htmlFor="custom-questions-upload" className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      Or enter custom:
                    </label>
                    <input
                      id="custom-questions-upload"
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

                {/* Generate Quiz Button */}
                <button
                  onClick={generateQuizFromContent}
                  disabled={!processedContent || isGeneratingQuiz}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                    !processedContent || isGeneratingQuiz
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {isGeneratingQuiz ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Generating Quiz...</span>
                    </>
                  ) : (
                    <>
                      <span>🎯</span>
                      <span>Generate Quiz</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Content Preview */}
            {processedContent && contentMetadata && (
              <div className="bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-lg border border-white dark:border-gray-700 border-opacity-30 rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <span className="mr-3 text-2xl">📄</span>
                    Content Preview
                  </h3>
                  <button
                    onClick={clearDraft}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium flex items-center"
                    title="Clear content and start fresh"
                  >
                    <span className="mr-1">🗑️</span>
                    Clear
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    💾 Auto-saved • Content persists across sessions
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Words:</span>
                      <p className="text-gray-800 dark:text-gray-200 font-bold">{contentMetadata.word_count || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Reading Time:</span>
                      <p className="text-gray-800 dark:text-gray-200 font-bold">{contentMetadata.reading_time || 'N/A'} min</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">First 200 characters:</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-3">
                      {processedContent.substring(0, 200)}
                      {processedContent.length > 200 && '...'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentUploadPage;