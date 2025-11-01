import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { quizAPI, Question, QuizSession } from '../lib/api';
import Header from '../components/Header';

interface QuizState {
  quizData: {
    quiz_session: QuizSession;
    questions: Question[];
  };
}

const Quiz: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizData } = (location.state as QuizState) || {};
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [showFlagDialog, setShowFlagDialog] = useState(false);
  const [flagReason, setFlagReason] = useState('');
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);

  useEffect(() => {
    if (!quizData) {
      navigate('/dashboard');
      return;
    }
    setStartTime(Date.now());
  }, [quizData, navigate]);

  if (!quizData) {
    return null;
  }

  const { quiz_session, questions } = quizData;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSubmit = async () => {
    if (!selectedAnswer) {
      alert('Please select an answer');
      return;
    }

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    try {
      const response = await quizAPI.submitAnswer(quiz_session.id, {
        question_id: currentQuestion.id,
        answer: selectedAnswer,
        time_taken: timeTaken,
      });

      setFeedback(response);
      setShowFeedback(true);
      setAnswers({ ...answers, [currentQuestion.id]: selectedAnswer });
      
      // Update completed questions count from the API response
      if (response.quiz_progress && response.quiz_progress.completed !== undefined) {
        console.log('Updating completed questions:', response.quiz_progress.completed);
        setCompletedQuestions(response.quiz_progress.completed);
      } else {
        console.log('No quiz_progress.completed in response:', response);
      }

      // Check if quiz is completed
      if (response.quiz_progress.is_completed) {
        // Quiz completed - results will be shown when navigating
      }
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to submit answer');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
      setFeedback(null);
      setStartTime(Date.now());
    } else {
      // Quiz completed, navigate to results
      navigate('/results', { state: { quizId: quiz_session.id } });
    }
  };

  const handleFlagQuestion = async () => {
    if (!flagReason.trim()) {
      alert('Please provide a reason for flagging this question');
      return;
    }

    try {
      await quizAPI.flagQuestion(currentQuestion.id, flagReason);
      alert('Question flagged successfully. Thank you for your feedback!');
      setShowFlagDialog(false);
      setFlagReason('');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to flag question');
    }
  };

  const handleSubmitFeedback = async () => {
    if (feedbackRating === 0) {
      alert('Please select a rating');
      return;
    }
    
    if (!feedbackText.trim()) {
      alert('Please provide some feedback');
      return;
    }

    try {
      await quizAPI.submitFeedback(currentQuestion.id, feedbackText, feedbackRating);
      alert('Thank you for your feedback! It helps us improve.');
      setShowFeedbackDialog(false);
      setFeedbackText('');
      setFeedbackRating(0);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to submit feedback');
    }
  };

  const getQuestionTypeDisplay = (question: Question) => {
    if (question.question_type === 'MCQ') {
      return (
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="answer"
                value={option.charAt(0)}
                checked={selectedAnswer === option.charAt(0)}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                disabled={showFeedback}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      );
    } else if (question.question_type === 'True/False') {
      return (
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="answer"
              value="True"
              checked={selectedAnswer === 'True'}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={showFeedback}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="text-sm text-gray-700">True</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="answer"
              value="False"
              checked={selectedAnswer === 'False'}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={showFeedback}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="text-sm text-gray-700">False</span>
          </label>
        </div>
      );
    } else {
      return (
        <textarea
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          disabled={showFeedback}
          placeholder="Enter your answer..."
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <Header 
        title="🧠 Smart Quiz Session" 
        subtitle={`📚 ${quiz_session.topic} | 🎯 ${quiz_session.skill_level} | Question ${currentQuestionIndex + 1} of ${questions.length}`}
        showBackButton={false}
      />

      <main className="relative max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Progress Bar */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex justify-between text-sm text-gray-600 mb-3">
              <span className="font-medium">📈 Progress</span>
              <span className="font-bold text-blue-600">
                {Math.round((completedQuestions / questions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div
                className="progress-bar h-3"
                style={{ 
                  width: `${(completedQuestions / questions.length) * 100}%`,
                  minWidth: completedQuestions === 0 ? '0%' : '2%' // Show at least 2% when there's progress
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>🔥 Keep going!</span>
              <span>{questions.length - completedQuestions} questions remaining</span>
            </div>
          </div>

          {/* Question Card */}
          <div className="question-card animate-fade-in-scale mb-8">
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                    📝 {currentQuestion.question_type}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-blue-100 text-green-800">
                    {currentQuestion.difficulty_level === 'Beginner' ? '🌱' : currentQuestion.difficulty_level === 'Intermediate' ? '🚀' : '🏆'} {currentQuestion.difficulty_level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-relaxed">
                  {currentQuestion.question_text}
                </h3>
              </div>

              {/* Answer Options */}
              <div className="mb-8">
                {getQuestionTypeDisplay(currentQuestion)}
              </div>

              {/* Feedback */}
              {showFeedback && feedback && (
                <div className={`${feedback.is_correct ? 'feedback-correct' : 'feedback-incorrect'} mb-6 animate-fade-in-up`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {feedback.is_correct ? (
                        <span className="text-green-600 text-2xl">✅</span>
                      ) : (
                        <span className="text-red-600 text-2xl">❌</span>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className={`text-lg font-bold mb-2 ${
                        feedback.is_correct ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {feedback.is_correct ? '🎉 Excellent!' : '📚 Let\'s Learn!'}
                      </h4>
                      {!feedback.is_correct && (
                        <div className="mb-3 p-3 bg-white bg-opacity-60 rounded-lg">
                          <p className="text-sm font-medium text-red-700">
                            🎯 Correct answer: <span className="font-bold">
                              {currentQuestion.question_type === 'MCQ' 
                                ? currentQuestion.options.find(opt => opt.charAt(0) === feedback.correct_answer) || feedback.correct_answer
                                : feedback.correct_answer
                              }
                            </span>
                          </p>
                        </div>
                      )}
                      <div className="mb-4 p-4 bg-white bg-opacity-80 rounded-lg">
                        <p className="text-gray-700 leading-relaxed">
                          💡 <span className="font-medium">Explanation:</span> {feedback.explanation}
                        </p>
                        
                        {/* Enhanced Feedback */}
                        {feedback.enhanced_feedback && (
                          <div className="mt-3 space-y-2">
                            {feedback.enhanced_feedback.result_message && (
                              <p className="text-sm font-medium text-blue-700">
                                {feedback.enhanced_feedback.result_message}
                              </p>
                            )}
                            
                            {feedback.enhanced_feedback.hint && (
                              <p className="text-sm text-orange-600 italic">
                                {feedback.enhanced_feedback.hint}
                              </p>
                            )}
                            
                            {feedback.enhanced_feedback.learning_tip && (
                              <p className="text-sm text-green-600">
                                {feedback.enhanced_feedback.learning_tip}
                              </p>
                            )}
                            
                            {/* Evaluation Method Indicator */}
                            {feedback.enhanced_feedback.evaluation_method !== 'basic' && (
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span>Evaluated using:</span>
                                <span className="font-medium capitalize">
                                  {feedback.enhanced_feedback.evaluation_method.replace(/_/g, ' ')}
                                </span>
                                {feedback.enhanced_feedback.confidence && (
                                  <span>
                                    ({Math.round(feedback.enhanced_feedback.confidence * 100)}% confidence)
                                  </span>
                                )}
                              </div>
                            )}
                            
                            {/* Semantic Analysis for Short Answers */}
                            {feedback.enhanced_feedback.semantic_score > 0 && (
                              <div className="text-xs text-purple-600">
                                Semantic similarity: {Math.round(feedback.enhanced_feedback.semantic_score * 100)}%
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                          <div className="font-bold text-blue-600">{feedback.quiz_progress.completed}/{feedback.quiz_progress.total}</div>
                          <div className="text-blue-800">Progress</div>
                        </div>
                        <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                          <div className="font-bold text-green-600">{feedback.quiz_progress.score_percentage.toFixed(1)}%</div>
                          <div className="text-green-800">Score</div>
                        </div>
                        {feedback.time_taken !== null && feedback.time_taken !== undefined && (
                          <div className="bg-white bg-opacity-60 rounded-lg p-3 text-center">
                            <div className="font-bold text-purple-600">{feedback.time_taken}s</div>
                            <div className="text-purple-800">Time Taken</div>
                          </div>
                        )}
                      </div>
                      
                      {/* Adaptive Learning Insights */}
                      {feedback.adaptive_insights && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                          <h5 className="text-sm font-bold text-blue-800 mb-3 flex items-center">
                            🧠 Adaptive Learning Insights
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Next Difficulty:</span>
                              <span className={`font-semibold px-2 py-1 rounded-full text-xs ${
                                feedback.adaptive_insights.next_difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                feedback.adaptive_insights.next_difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {feedback.adaptive_insights.next_difficulty.toUpperCase()}
                              </span>
                            </div>
                            
                            {feedback.adaptive_insights.difficulty_change && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Adjusted:</span>
                                <span className="font-semibold text-blue-700">
                                  {feedback.adaptive_insights.performance_trend > 0 ? '📈 Level Up!' : 
                                   feedback.adaptive_insights.performance_trend < 0 ? '📉 Adjusted Down' : '➡️ Stable'}
                                </span>
                              </div>
                            )}
                            
                            {feedback.adaptive_insights.consecutive_correct > 0 && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Streak:</span>
                                <span className="font-semibold text-green-700">
                                  🔥 {feedback.adaptive_insights.consecutive_correct} correct
                                </span>
                              </div>
                            )}
                            
                            <div className="flex justify-between">
                              <span className="text-gray-600">Confidence:</span>
                              <span className="font-semibold text-purple-700">
                                {Math.round(feedback.adaptive_insights.confidence_level * 100)}%
                              </span>
                            </div>
                          </div>
                          
                          {feedback.adaptive_insights.adaptation_reason && (
                            <div className="mt-2 text-xs text-gray-600 italic">
                              Reason: {feedback.adaptive_insights.adaptation_reason.replace(/_/g, ' ')}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="btn btn-secondary group"
                  >
                    <span className="mr-2">🏠</span>
                    Back to Dashboard
                    <span className="ml-2 transform group-hover:-translate-x-1 transition-transform">←</span>
                  </button>
                  
                  <button
                    onClick={() => setShowFlagDialog(true)}
                    className="btn btn-secondary group flex items-center justify-center"
                    title="Flag this question if it seems inappropriate or incorrect"
                  >
                    <span className="mr-2">🚩</span>
                    Flag Question
                  </button>

                  <button
                    onClick={() => setShowFeedbackDialog(true)}
                    className="btn btn-secondary group flex items-center justify-center"
                    title="Share your thoughts about this question"
                  >
                    <span className="mr-2">💬</span>
                    Feedback
                  </button>
                </div>
                
                {!showFeedback ? (
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={!selectedAnswer}
                    className="btn btn-primary btn-lg group"
                  >
                    <span className="mr-2">✅</span>
                    Submit Answer
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="btn btn-success btn-lg group"
                  >
                    {currentQuestionIndex < questions.length - 1 ? (
                      <>
                        <span className="mr-2">➡️</span>
                        Next Question
                        <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🎉</span>
                        View Results
                        <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Flag Dialog */}
          {showFlagDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in-scale">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🚩</span>
                  Flag Question
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Help us improve! Please tell us why this question needs review:
                </p>
                <textarea
                  value={flagReason}
                  onChange={(e) => setFlagReason(e.target.value)}
                  placeholder="e.g., Incorrect answer, unclear wording, inappropriate content..."
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-4"
                />
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => {
                      setShowFlagDialog(false);
                      setFlagReason('');
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFlagQuestion}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  >
                    <span className="mr-2">🚩</span>
                    Submit Flag
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Feedback Dialog */}
          {showFeedbackDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in-scale">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">💬</span>
                  Share Your Feedback
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Your feedback helps us create better questions!
                </p>
                
                {/* Rating Stars */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rate this question:
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setFeedbackRating(star)}
                        className="text-3xl focus:outline-none transition-transform hover:scale-110"
                      >
                        {star <= feedbackRating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share your thoughts about this question (optional)..."
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-4"
                />
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => {
                      setShowFeedbackDialog(false);
                      setFeedbackText('');
                      setFeedbackRating(0);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitFeedback}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <span className="mr-2">💬</span>
                    Submit Feedback
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Quiz;