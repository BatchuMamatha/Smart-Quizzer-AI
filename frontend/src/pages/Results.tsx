import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { quizAPI, QuizResultsResponse, Question } from '../lib/api';

interface ResultsState {
  quizId: number;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizId } = (location.state as ResultsState) || {};
  
  const [results, setResults] = useState<QuizResultsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!quizId) {
      navigate('/dashboard');
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await quizAPI.getResults(quizId);
        setResults(data);
      } catch (error: any) {
        console.error('Error fetching results:', error);
        setError(error.response?.data?.error || 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="card animate-fade-in-scale">
          <div className="card-body text-center">
            <div className="spinner-large mb-4 mx-auto"></div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Calculating Results</h3>
            <p className="text-gray-500">Analyzing your performance...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="card animate-fade-in-scale max-w-md w-full">
          <div className="card-body text-center">
            <span className="text-red-500 text-6xl mb-6 block">❌</span>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Results</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-primary"
            >
              <span className="mr-2">🏠</span>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { quiz_session, questions, summary } = results;
  const scorePercentage = quiz_session.score_percentage || 0;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return '🎉 Excellent! You\'ve mastered this topic!';
    if (score >= 70) return '👍 Good job! You have a solid understanding.';
    if (score >= 50) return '📚 Not bad! Consider reviewing the topic more.';
    return '💪 Keep practicing! Review the explanations and try again.';
  };

  const getGradeEmoji = (score: number) => {
    if (score >= 90) return '🏆';
    if (score >= 80) return '🥇';
    if (score >= 70) return '🥈';
    if (score >= 60) return '🥉';
    return '📚';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📊 Quiz Results
              </h1>
              <p className="text-sm text-gray-600">Smart Quizzer - AI Generated Quiz</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Topic: {quiz_session.topic}</p>
              <p className="text-xs text-gray-500">Level: {quiz_session.skill_level}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Score Overview */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center">
                <div className="text-6xl mb-4">{getGradeEmoji(scorePercentage)}</div>
                <h2 className={`text-4xl font-bold mb-2 ${getScoreColor(scorePercentage)}`}>
                  {scorePercentage.toFixed(1)}%
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  {summary.correct_answers} out of {summary.total_questions} correct
                </p>
                <p className={`text-lg font-medium ${getScoreColor(scorePercentage)}`}>
                  {getScoreMessage(scorePercentage)}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{summary.total_questions}</div>
                  <div className="text-sm text-blue-800">Total Questions</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{summary.correct_answers}</div>
                  <div className="text-sm text-green-800">Correct Answers</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{Math.floor(summary.time_taken / 60)}m {summary.time_taken % 60}s</div>
                  <div className="text-sm text-purple-800">Time Taken</div>
                </div>
              </div>
            </div>
          </div>

          {/* Question Details */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Question Review</h3>
              
              <div className="space-y-6">
                {questions.map((question: Question, index: number) => (
                  <div key={question.id} className="border-l-4 pl-4 border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Q{index + 1}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {question.question_type}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {question.difficulty_level}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {question.is_correct ? (
                          <span className="text-green-500 text-lg">✅</span>
                        ) : (
                          <span className="text-red-500 text-lg">❌</span>
                        )}
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-2">
                      {question.question_text}
                    </h4>

                    {question.question_type === 'MCQ' && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">Options:</p>
                        <ul className="text-sm text-gray-700 ml-4">
                          {question.options.map((option: string, idx: number) => (
                            <li key={idx} className={`
                              ${option.charAt(0) === question.correct_answer ? 'text-green-600 font-medium' : ''}
                              ${option.charAt(0) === question.user_answer ? 'underline' : ''}
                            `}>
                              {option} {option.charAt(0) === question.user_answer && option.charAt(0) !== question.correct_answer ? '(Your answer)' : ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {!question.is_correct && (
                      <div className="mb-2">
                        <p className="text-sm text-red-600">
                          <strong>Your answer:</strong> {question.user_answer}
                        </p>
                        <p className="text-sm text-green-600">
                          <strong>Correct answer:</strong> {question.correct_answer}
                        </p>
                      </div>
                    )}

                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm text-blue-800">
                        <strong>💡 Explanation:</strong> {question.explanation}
                      </p>
                    </div>

                    {question.time_taken && (
                      <p className="text-xs text-gray-500 mt-2">
                        ⏱️ Time taken: {question.time_taken} seconds
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate('/dashboard', { state: { startNewQuiz: true } })}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md"
            >
              Take Another Quiz
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-md"
            >
              Print Results
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;