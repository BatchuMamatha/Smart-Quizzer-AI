import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserManager } from '../lib/userManager';
import ContentUpload from '../components/ContentUpload';
import { quizAPI } from '../lib/api';
import Header from '../components/Header';

const ContentUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const userManager = UserManager.getInstance();
  const user = userManager.getCurrentUser();
  
  const [processedContent, setProcessedContent] = useState<string>('');
  const [contentMetadata, setContentMetadata] = useState<any>(null);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState(user?.skill_level || 'Intermediate');
  const [numQuestions, setNumQuestions] = useState(5);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [error, setError] = useState<string>('');

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
      navigate('/quiz', { state: { quizData } });
    } catch (error: any) {
      console.error('Quiz generation error:', error);
      let errorMessage = 'Failed to generate quiz from content';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <Header 
        title="📁 Custom Content Upload" 
        subtitle="Transform any content into personalized quizzes"
        showBackButton={true}
        backPath="/dashboard"
      />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start">
                  <span className="text-red-500 text-xl mr-3 mt-1">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">Error</h4>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quiz Generation Section */}
          <div className="space-y-6">
            {/* Quiz Settings */}
            <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3 text-2xl">⚙️</span>
                Quiz Settings
              </h3>

              <div className="space-y-4">
                {/* Skill Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎯 Difficulty Level
                  </label>
                  <div className="space-y-2">
                    {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedSkillLevel(level)}
                        className={`w-full p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          selectedSkillLevel === level
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300'
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🔢 Number of Questions
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[3, 5, 7, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => setNumQuestions(num)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          numQuestions === num
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-green-300'
                        }`}
                      >
                        <div className="text-lg font-bold">{num}</div>
                        <div className="text-xs">Questions</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Quiz Button */}
                <button
                  onClick={generateQuizFromContent}
                  disabled={!processedContent || isGeneratingQuiz}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isGeneratingQuiz ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                      🤖 Generating Quiz...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">🚀</span>
                      Generate Quiz from Content
                    </div>
                  )}
                </button>

                {!processedContent && (
                  <p className="text-xs text-gray-500 text-center">
                    💡 Upload content first to enable quiz generation
                  </p>
                )}
              </div>
            </div>

            {/* Content Preview */}
            {processedContent && contentMetadata && (
              <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3 text-2xl">📄</span>
                  Content Preview
                </h3>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 font-medium">Words:</span>
                      <p className="text-gray-800 font-bold">{contentMetadata.word_count || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Reading Time:</span>
                      <p className="text-gray-800 font-bold">{contentMetadata.reading_time || 'N/A'} min</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">First 200 characters:</p>
                    <p className="text-sm text-gray-800 line-clamp-3">
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