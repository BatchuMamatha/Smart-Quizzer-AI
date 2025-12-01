import React, { useState } from 'react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, userName }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: '🎉 Welcome to Smart Quizzer AI!',
      content: (
        <div className="text-center">
          <p className="text-lg mb-4">
            Hi {userName || 'there'}! We're excited to have you join our learning platform.
          </p>
          <p className="text-gray-600 mb-6">
            Let's take a quick tour to help you get started on your learning journey.
          </p>
          <div className="text-6xl mb-4">🧠</div>
        </div>
      ),
    },
    {
      title: '📝 Create Your First Quiz',
      content: (
        <div>
          <p className="text-gray-700 mb-4">
            Start by creating a quiz on any topic you want to learn:
          </p>
          <ul className="text-left space-y-3 mb-4">
            <li className="flex items-start">
              <span className="text-2xl mr-3">🎯</span>
              <div>
                <strong>Choose a topic</strong> - Select from pre-defined topics or create your own custom content
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">📊</span>
              <div>
                <strong>Select difficulty</strong> - Beginner, Intermediate, or Advanced
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🔢</span>
              <div>
                <strong>Pick question count</strong> - Choose how many questions you want
              </div>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '📁 Upload Custom Content',
      content: (
        <div>
          <p className="text-gray-700 mb-4">
            Want to study from your own materials? Upload them!
          </p>
          <ul className="text-left space-y-3 mb-4">
            <li className="flex items-start">
              <span className="text-2xl mr-3">📄</span>
              <div>
                <strong>PDF & DOCX</strong> - Upload documents directly
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🌐</span>
              <div>
                <strong>Web URLs</strong> - Extract content from websites
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">✍️</span>
              <div>
                <strong>Plain Text</strong> - Paste any text content
              </div>
            </li>
          </ul>
          <p className="text-sm text-gray-600">
            Our AI will generate relevant questions from your content!
          </p>
        </div>
      ),
    },
    {
      title: '📊 Track Your Progress',
      content: (
        <div>
          <p className="text-gray-700 mb-4">
            Monitor your learning journey with powerful analytics:
          </p>
          <ul className="text-left space-y-3 mb-4">
            <li className="flex items-start">
              <span className="text-2xl mr-3">📈</span>
              <div>
                <strong>Performance Charts</strong> - Visualize your improvement over time
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🏆</span>
              <div>
                <strong>Badges & Achievements</strong> - Earn rewards for your progress
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🤖</span>
              <div>
                <strong>AI Recommendations</strong> - Get personalized study suggestions
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">📜</span>
              <div>
                <strong>Quiz History</strong> - Review all your past quizzes
              </div>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '🚀 Ready to Begin!',
      content: (
        <div className="text-center">
          <p className="text-lg mb-4">
            You're all set to start your learning journey!
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 mb-2">
              <strong>Quick Tips:</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>⏱️ Quizzes have a 30-minute timer (you can pause anytime)</li>
              <li>🎤 Use audio feedback to hear explanations</li>
              <li>🏅 Compete on leaderboards with other learners</li>
              <li>🌙 Toggle dark mode for comfortable viewing</li>
            </ul>
          </div>
          <div className="text-5xl mb-4">🎓</div>
          <p className="text-gray-600">
            Click "Get Started" to create your first quiz!
          </p>
        </div>
      ),
    },
  ];

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-scale">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
          <div className="flex items-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-white' : 'bg-white bg-opacity-30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="min-h-[300px]">
            {steps[currentStep].content}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-b-2xl flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Step {currentStep + 1} of {steps.length}
          </div>
          
          <div className="flex space-x-3">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                ← Previous
              </button>
            )}
            
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Skip Tour
              </button>
            )}
            
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              {currentStep === steps.length - 1 ? '🎉 Get Started' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
