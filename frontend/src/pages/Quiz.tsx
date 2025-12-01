import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { quizAPI, Question, QuizSession } from '../lib/api';
import Header from '../components/Header';
import InlineTimer from '../components/InlineTimer';
import { toast } from '../lib/toast';

interface QuizState {
  quizData: {
    quiz_session: QuizSession;
    questions: Question[];
  };
}

// Default quiz duration: 30 minutes
const DEFAULT_QUIZ_DURATION_SECONDS = 30 * 60;

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
  
  // Timer states with pause/resume support
  const [timerDuration, setTimerDuration] = useState(DEFAULT_QUIZ_DURATION_SECONDS);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [autoSubmitFailed, setAutoSubmitFailed] = useState(false);
  const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);

  useEffect(() => {
    const initializeTimer = async () => {
      if (!quizData || !quizData.quiz_session || !quizData.quiz_session.id) return;
      
      try {
        // Try to sync timer with backend first
        const timerStatus = await quizAPI.getTimerStatus(quizData.quiz_session.id);
        
        if (timerStatus.is_started && !timerStatus.is_expired) {
          // Timer already started on backend, use remaining time
          setTimerDuration(timerStatus.time_remaining_seconds || DEFAULT_QUIZ_DURATION_SECONDS);
          setIsPaused(timerStatus.is_paused || false);
          setTimerStarted(true);
        } else if (!timerStatus.is_started) {
          // Start new timer on backend
          const result = await quizAPI.startTimer(quizData.quiz_session.id, {
            time_limit_seconds: DEFAULT_QUIZ_DURATION_SECONDS,
          });
          
          if (result.success) {
            setTimerDuration(DEFAULT_QUIZ_DURATION_SECONDS);
            setIsPaused(false);
            setTimerStarted(true);
          }
        } else if (timerStatus.is_expired) {
          // Timer already expired, auto-submit
          await handleTimerExpired();
          return;
        }
      } catch (error) {
        console.error('Timer initialization error:', error);
        // Fallback to local timer
        setTimerDuration(DEFAULT_QUIZ_DURATION_SECONDS);
        setIsPaused(false);
        setTimerStarted(true);
      }
    };

    if (!quizData) {
      navigate('/dashboard');
      return;
    }
    setStartTime(Date.now());
    
    // Start the timer for the quiz
    initializeTimer();
  }, [quizData, navigate]);

  // Add beforeunload event listener to warn about page refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!quizCompleted && !isAutoSubmitting) {
        e.preventDefault();
        e.returnValue = ''; // Modern browsers require this
        return ''; // Some browsers show this message
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [quizCompleted, isAutoSubmitting]);

  // Custom navigation blocking for internal navigation
  useEffect(() => {
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const interceptNavigation = (originalMethod: typeof window.history.pushState) => {
      return function (this: History, ...args: Parameters<typeof window.history.pushState>) {
        if (!quizCompleted && !isAutoSubmitting) {
          setPendingNavigation(() => () => originalMethod.apply(this, args));
          setShowNavigationWarning(true);
          return;
        }
        return originalMethod.apply(this, args);
      };
    };

    window.history.pushState = interceptNavigation(originalPushState);
    window.history.replaceState = interceptNavigation(originalReplaceState);

    const handlePopState = (e: PopStateEvent) => {
      if (!quizCompleted && !isAutoSubmitting) {
        e.preventDefault();
        window.history.pushState(null, '', window.location.href);
        setPendingNavigation(() => () => window.history.back());
        setShowNavigationWarning(true);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handlePopState);
    };
  }, [quizCompleted, isAutoSubmitting]);

  // Handle navigation to results when quiz is completed
  useEffect(() => {
    if (quizCompleted && quizData?.quiz_session?.id) {
      navigate('/results', { state: { quizId: quizData.quiz_session.id } });
    }
  }, [quizCompleted, quizData?.quiz_session?.id, navigate]);

  const handleTimerExpired = async () => {
    if (isAutoSubmitting || !quizData || !quizData.quiz_session || !quizData.quiz_session.id) return;
    
    setIsAutoSubmitting(true);
    console.log('⏱️ Timer expired! Auto-submitting quiz...');
    
    try {
      const result = await quizAPI.autoSubmitQuiz(quizData.quiz_session.id);
      
      console.log('✅ Quiz auto-submitted:', result);
      
      // Show a notification before redirecting
      toast.info(
        "Time's Up!", 
        `Quiz auto-submitted. Score: ${result.quiz_session.score_percentage.toFixed(1)}% (${result.summary.correct_answers}/${result.summary.total_questions} correct)`,
        { duration: 6000 }
      );
      
      // Mark quiz as completed (navigation will happen in useEffect)
      setQuizCompleted(true);
    } catch (error: any) {
      console.error('Error auto-submitting quiz:', error);
      setAutoSubmitFailed(true);
      toast.error(
        'Auto-submit Failed', 
        'You can now manually submit your quiz or continue answering questions.',
        { duration: 7000 }
      );
    } finally {
      setIsAutoSubmitting(false);
    }
  };

  const handlePauseTimer = async () => {
    if (!quizData || !quizData.quiz_session || !quizData.quiz_session.id || isPaused) return;
    
    try {
      const result = await quizAPI.pauseTimer(quizData.quiz_session.id);
      setIsPaused(true);
      setTimerDuration(result.time_remaining_seconds);
      console.log('⏸️ Timer paused');
    } catch (error) {
      console.error('Error pausing timer:', error);
      toast.error('Timer Error', 'Failed to pause timer. Please try again.');
    }
  };

  const handleResumeTimer = async () => {
    if (!quizData || !quizData.quiz_session || !quizData.quiz_session.id || !isPaused) return;
    
    try {
      const result = await quizAPI.resumeTimer(quizData.quiz_session.id);
      setIsPaused(false);
      setTimerDuration(result.time_remaining_seconds);
      console.log('▶️ Timer resumed');
    } catch (error) {
      console.error('Error resuming timer:', error);
      toast.error('Timer Error', 'Failed to resume timer. Please try again.');
    }
  };

  if (!quizData || !quizData.questions || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  const { quiz_session, questions } = quizData;
  const currentQuestion = questions[currentQuestionIndex];

  // Additional safety check for current question
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Question Not Found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Unable to load the current question.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleAnswerSubmit = async () => {
    if (!selectedAnswer) {
      toast.warning('Answer Required', 'Please select an answer before submitting');
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
      toast.error('Submission Failed', error.response?.data?.error || 'Failed to submit answer. Please try again.');
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
      // Quiz completed, mark as completed (navigation will happen in useEffect)
      setQuizCompleted(true);
    }
  };

  const handleFlagQuestion = async () => {
    if (!flagReason.trim()) {
      toast.warning('Reason Required', 'Please provide a reason for flagging this question');
      return;
    }

    try {
      await quizAPI.flagQuestion(currentQuestion.id, flagReason);
      toast.success('Question Flagged', 'Thank you for your feedback! Our team will review it.');
      setShowFlagDialog(false);
      setFlagReason('');
    } catch (error: any) {
      toast.error('Failed to Flag', error.response?.data?.error || 'Could not flag question. Please try again.');
    }
  };

  const handleSubmitFeedback = async () => {
    if (feedbackRating === 0) {
      toast.warning('Rating Required', 'Please select a rating before submitting');
      return;
    }
    
    if (!feedbackText.trim()) {
      toast.warning('Feedback Required', 'Please provide some feedback');
      return;
    }

    try {
      await quizAPI.submitFeedback(currentQuestion.id, feedbackText, feedbackRating);
      toast.success('Feedback Submitted', 'Thank you! Your feedback helps us improve.');
      setShowFeedbackDialog(false);
      setFeedbackText('');
      setFeedbackRating(0);
    } catch (error: any) {
      toast.error('Feedback Error', error.response?.data?.error || 'Failed to submit feedback. Please try again.');
    }
  };

  const handleManualSubmitQuiz = async () => {
    if (!quizData || !quizData.quiz_session || !quizData.quiz_session.id) return;
    
    if (!window.confirm('⚠️ Are you sure you want to submit your quiz now? This will end the quiz and calculate your final score.')) {
      return;
    }

    setIsAutoSubmitting(true);
    
    try {
      const result = await quizAPI.autoSubmitQuiz(quizData.quiz_session.id);
      
      console.log('✅ Quiz manually submitted:', result);
      
      // Show results
      toast.success(
        'Quiz Complete!', 
        `Score: ${result.quiz_session.score_percentage.toFixed(1)}% (${result.summary.correct_answers}/${result.summary.total_questions} correct)`,
        { duration: 6000 }
      );
      
      // Mark quiz as completed to allow navigation
      setQuizCompleted(true);
      
      // Redirect to results page
      navigate('/results', { state: { quizId: quizData.quiz_session.id } });
    } catch (error: any) {
      console.error('Error manually submitting quiz:', error);
      toast.error(
        'Submission Failed', 
        'Failed to submit quiz. Please try again or contact support.',
        { duration: 7000 }
      );
    } finally {
      setIsAutoSubmitting(false);
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
              <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
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
            <span className="text-sm text-gray-700 dark:text-gray-300">True</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="answer"
              value="False"
              checked={selectedAnswer === 'False'}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={showFeedback}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">False</span>
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
          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-500 dark:placeholder-gray-400"
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation Warning Dialog */}
      {showNavigationWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Leave Quiz?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Are you sure you want to leave? Your quiz progress will be lost and the quiz will not be saved.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowNavigationWarning(false);
                  setPendingNavigation(null);
                }}
                className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <span className="mr-2">↩️</span>
                Stay on Quiz
              </button>
              <button
                onClick={() => {
                  setQuizCompleted(true);
                  setShowNavigationWarning(false);
                  if (pendingNavigation) {
                    pendingNavigation();
                  }
                  setPendingNavigation(null);
                }}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <span className="mr-2">🚪</span>
                Leave Quiz
              </button>
            </div>
          </div>
        </div>
      )}

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

          {/* Auto-Submit Failed Warning Banner */}
          {autoSubmitFailed && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg animate-fade-in-up">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-bold text-red-800 mb-1">
                    Auto-Submit Failed
                  </h3>
                  <p className="text-sm text-red-700 mb-3">
                    The quiz timer has expired but automatic submission failed. You can continue answering questions or manually submit your quiz now.
                  </p>
                  <button
                    onClick={handleManualSubmitQuiz}
                    disabled={isAutoSubmitting}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isAutoSubmitting ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">📤</span>
                        Submit Quiz Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Paused Banner */}
          {isPaused && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg shadow-lg animate-fade-in-up">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⏸️</span>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-bold text-yellow-800 mb-1">
                    Quiz Paused
                  </h3>
                  <p className="text-sm text-yellow-700">
                    The timer is currently paused. Click the "Resume" button to continue your quiz.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Question Card */}
          <div className="question-card animate-fade-in-scale mb-8">
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                  📝 {currentQuestion.question_type}
                </span>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-blue-100 text-green-800">
                    {currentQuestion.difficulty_level === 'Beginner' ? '🌱' : currentQuestion.difficulty_level === 'Intermediate' ? '🚀' : '🏆'} {currentQuestion.difficulty_level}
                  </span>
                  {timerStarted && (
                    <div className="flex items-center gap-2">
                      <InlineTimer
                        initialSeconds={timerDuration}
                        onTimeUp={handleTimerExpired}
                        isPaused={isPaused}
                      />
                      <button
                        onClick={isPaused ? handleResumeTimer : handlePauseTimer}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isPaused
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                        }`}
                        title={isPaused ? 'Resume Timer' : 'Pause Timer'}
                      >
                        {isPaused ? '▶️ Resume' : '⏸️ Pause'}
                      </button>
                    </div>
                  )}
                </div>
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
                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                          <h5 className="text-sm font-bold text-blue-800 dark:text-blue-400 mb-3 flex items-center">
                            🧠 Adaptive Learning Insights
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Next Difficulty:</span>
                              <span className={`font-semibold px-2 py-1 rounded-full text-xs ${
                                feedback.adaptive_insights.next_difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' :
                                feedback.adaptive_insights.next_difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400' :
                                'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'
                              }`}>
                                {feedback.adaptive_insights.next_difficulty.toUpperCase()}
                              </span>
                            </div>
                            
                            {feedback.adaptive_insights.difficulty_change && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Adjusted:</span>
                                <span className="font-semibold text-blue-700 dark:text-blue-400">
                                  {feedback.adaptive_insights.performance_trend > 0 ? '📈 Level Up!' : 
                                   feedback.adaptive_insights.performance_trend < 0 ? '📉 Adjusted Down' : '➡️ Stable'}
                                </span>
                              </div>
                            )}
                            
                            {feedback.adaptive_insights.consecutive_correct > 0 && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Streak:</span>
                                <span className="font-semibold text-green-700 dark:text-green-400">
                                  🔥 {feedback.adaptive_insights.consecutive_correct} correct
                                </span>
                              </div>
                            )}
                            
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                              <span className="font-semibold text-purple-700 dark:text-purple-400">
                                {Math.round(feedback.adaptive_insights.confidence_level * 100)}%
                              </span>
                            </div>
                          </div>
                          
                          {feedback.adaptive_insights.adaptation_reason && (
                            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 italic">
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