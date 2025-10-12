/**
 * Audio Feedback Module for Smart Quizzer AI
 * Provides text-to-speech functionality for quiz feedback
 */

export interface AudioFeedbackOptions {
  rate?: number;    // Speech rate (0.1 to 10)
  pitch?: number;   // Speech pitch (0 to 2)
  volume?: number;  // Speech volume (0 to 1)
  voice?: string;   // Preferred voice name
  lang?: string;    // Language code (e.g., 'en-US')
}

export class AudioFeedbackManager {
  private synth: SpeechSynthesis;
  private defaultOptions: AudioFeedbackOptions;
  private isEnabled: boolean;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.synth = window.speechSynthesis;
    this.defaultOptions = {
      rate: 1.0,
      pitch: 1.0,
      volume: 0.8,
      lang: 'en-US'
    };
    this.isEnabled = true;
    this.loadVoices();

    // Listen for voices changed event
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices();
    }
  }

  private loadVoices(): void {
    this.voices = this.synth.getVoices();
  }

  private getPreferredVoice(): SpeechSynthesisVoice | null {
    // Prefer English voices, particularly female voices for friendlier feedback
    const preferredNames = [
      'Google UK English Female',
      'Microsoft Zira Desktop',
      'Google US English',
      'Microsoft David Desktop',
      'Alex'  // macOS default
    ];

    for (const voiceName of preferredNames) {
      const voice = this.voices.find(v => v.name.includes(voiceName));
      if (voice) return voice;
    }

    // Fallback to any English voice
    const englishVoice = this.voices.find(v => 
      v.lang.startsWith('en') && v.localService
    );
    
    return englishVoice || this.voices[0] || null;
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  public isAudioEnabled(): boolean {
    return this.isEnabled && 'speechSynthesis' in window;
  }

  public stop(): void {
    this.synth.cancel();
  }

  private cleanTextForSpeech(text: string): string {
    return text
      // Remove common emojis and special characters
      .replace(/[\u2600-\u26FF]/g, '')   // Miscellaneous Symbols
      .replace(/[\u2700-\u27BF]/g, '')   // Dingbats
      .replace(/[\uD800-\uDFFF]/g, '')   // Surrogate pairs (emojis)
      // Remove markdown-style formatting
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      // Clean up common quiz feedback symbols
      .replace(/[✅❌🎉📚💡🎯🧠🔍📝💭🔬🌍📜🧮]/g, '')
      // Clean up extra whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }

  public async speak(text: string, options: AudioFeedbackOptions = {}, onTextUpdate?: (text: string) => void): Promise<void> {
    if (!this.isAudioEnabled() || !text) return;

    // Stop any current speech
    this.stop();

    const cleanedText = this.cleanTextForSpeech(text);
    
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      
      // Apply options
      utterance.rate = options.rate ?? this.defaultOptions.rate!;
      utterance.pitch = options.pitch ?? this.defaultOptions.pitch!;
      utterance.volume = options.volume ?? this.defaultOptions.volume!;
      utterance.lang = options.lang ?? this.defaultOptions.lang!;

      // Set preferred voice
      const voice = this.getPreferredVoice();
      if (voice) {
        utterance.voice = voice;
      }

      // Live caption variables
      let currentWordIndex = 0;
      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      let displayedText = '';
      let fallbackInterval: NodeJS.Timeout | null = null;

      // Initialize with empty text
      if (onTextUpdate) {
        onTextUpdate('');
        displayedText = '';
      }

      // Enhanced word timing calculation
      const speechRate = utterance.rate;
      const baseWordsPerMinute = 150; // Average English speaking rate
      const adjustedWPM = baseWordsPerMinute * speechRate;
      const msPerWord = Math.max(200, (60 / adjustedWPM) * 1000); // Minimum 200ms per word

      // Handle word boundary events for live captions (when supported)
      utterance.onboundary = (event) => {
        if (event.name === 'word' && onTextUpdate && currentWordIndex < words.length) {
          const nextWord = words[currentWordIndex];
          displayedText += (displayedText ? ' ' : '') + nextWord;
          onTextUpdate(displayedText);
          currentWordIndex++;
        }
      };

      // Improved fallback timing for consistent caption display
      const startFallbackCaption = () => {
        if (onTextUpdate && currentWordIndex < words.length) {
          fallbackInterval = setInterval(() => {
            if (currentWordIndex < words.length) {
              const nextWord = words[currentWordIndex];
              displayedText += (displayedText ? ' ' : '') + nextWord;
              onTextUpdate(displayedText);
              currentWordIndex++;
            }
            
            if (currentWordIndex >= words.length && fallbackInterval) {
              clearInterval(fallbackInterval);
              fallbackInterval = null;
            }
          }, msPerWord);
        }
      };

      utterance.onstart = () => {
        if (onTextUpdate) {
          onTextUpdate(''); // Clear any previous text
          displayedText = '';
          currentWordIndex = 0;
          
          // Always start fallback timer for consistent display
          startFallbackCaption();
        }
      };

      utterance.onend = () => {
        if (fallbackInterval) {
          clearInterval(fallbackInterval);
          fallbackInterval = null;
        }
        
        if (onTextUpdate) {
          // Show complete text briefly then clear
          onTextUpdate(cleanedText);
          setTimeout(() => onTextUpdate(''), 3000);
        }
        resolve();
      };

      utterance.onerror = (event) => {
        console.warn('Speech synthesis error:', event);
        if (fallbackInterval) {
          clearInterval(fallbackInterval);
          fallbackInterval = null;
        }
        if (onTextUpdate) {
          onTextUpdate(''); // Clear text display on error
        }
        resolve(); // Don't reject, just resolve silently
      };

      this.synth.speak(utterance);
    });
  }

  public async speakFeedback(feedback: any, isCorrect: boolean): Promise<void> {
    if (!this.isAudioEnabled()) return;

    let speechText = '';

    // Main result message
    if (isCorrect) {
      const correctMessages = [
        "Excellent! That's correct!",
        "Great job! You got it right!",
        "Perfect! Well done!",
        "Outstanding! Correct answer!"
      ];
      speechText = correctMessages[Math.floor(Math.random() * correctMessages.length)];
    } else {
      speechText = "Not quite right, but let's learn from this. ";
    }

    // Add explanation if available
    if (feedback.explanation) {
      speechText += " " + feedback.explanation;
    }

    // Add enhanced feedback if available
    if (feedback.enhanced_feedback) {
      if (feedback.enhanced_feedback.hint) {
        speechText += " Here's a hint: " + feedback.enhanced_feedback.hint;
      }
      
      if (feedback.enhanced_feedback.learning_tip) {
        speechText += " " + feedback.enhanced_feedback.learning_tip;
      }
    }

    // Speak the feedback
    await this.speak(speechText, {
      rate: isCorrect ? 1.1 : 0.9, // Slightly faster for correct answers
      pitch: isCorrect ? 1.1 : 1.0, // Slightly higher pitch for positive feedback
    });
  }

  public generateQuizResultsText(results: any): string {
    const { summary, quiz_session } = results;
    const scorePercentage = Math.round(summary.score_percentage);
    const correctAnswers = summary.correct_answers;
    const totalQuestions = summary.total_questions;
    const timeTaken = summary.time_taken;

    let resultsText = `🎉 Congratulations! You have completed the **${quiz_session.topic}** quiz.\n\n`;

    // Overall performance
    resultsText += `📊 **Performance Summary:**\n`;
    resultsText += `• You answered **${correctAnswers} out of ${totalQuestions}** questions correctly\n`;
    resultsText += `• Your final score: **${scorePercentage}%**\n\n`;

    // Time performance
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    if (minutes > 0) {
      resultsText += `⏱️ **Time:** ${minutes} minutes and ${seconds} seconds\n\n`;
    } else {
      resultsText += `⏱️ **Time:** ${seconds} seconds\n\n`;
    }

    // Performance feedback based on score
    resultsText += `💭 **Feedback:**\n`;
    if (scorePercentage >= 90) {
      resultsText += "**Excellent work!** 🏆 You have mastered this topic and demonstrated exceptional understanding. Your performance shows strong knowledge and analytical skills.\n\n";
    } else if (scorePercentage >= 80) {
      resultsText += "**Great job!** 🥇 You have a very good understanding of this topic. You're performing at a high level with room for minor improvements.\n\n";
    } else if (scorePercentage >= 70) {
      resultsText += "**Good work!** 🥈 You have a solid foundation in this topic. Focus on reviewing the areas where you had difficulty to improve further.\n\n";
    } else if (scorePercentage >= 60) {
      resultsText += "**You're making progress!** 📈 You have grasped the basic concepts. Consider reviewing the material more thoroughly and practicing similar questions.\n\n";
    } else if (scorePercentage >= 50) {
      resultsText += "**You're on the right track** 📚 but there's significant room for improvement. Review the explanations provided and consider studying the topic more deeply.\n\n";
    } else {
      resultsText += "**This topic needs more attention.** 💪 Don't be discouraged - learning is a process! Review the correct answers and explanations, then try practicing again.\n\n";
    }

    // Difficulty level feedback
    resultsText += `🎯 **Level Assessment:**\n`;
    resultsText += `This quiz was set at **${quiz_session.skill_level}** level. `;
    
    if (scorePercentage >= 80) {
      if (quiz_session.skill_level === 'Beginner') {
        resultsText += "You're ready to try **intermediate** level questions! 🚀\n\n";
      } else if (quiz_session.skill_level === 'Intermediate') {
        resultsText += "You're ready for **advanced** level challenges! 🎓\n\n";
      } else {
        resultsText += "You've demonstrated **mastery** at the advanced level! 👑\n\n";
      }
    } else if (scorePercentage >= 60) {
      resultsText += "You're developing good skills at this level. 📖\n\n";
    } else {
      resultsText += "Consider practicing more at this level before advancing. 🔄\n\n";
    }

    // Learning recommendations
    resultsText += `📝 **Next Steps:**\n`;
    resultsText += "• Review the questions you missed and understand the explanations provided\n";
    resultsText += "• Regular practice will help you master this subject\n";
    resultsText += "• Use the detailed analysis for targeted improvement\n\n";

    // Encouraging closing
    resultsText += "Thank you for using **Smart Quizzer AI**. Keep learning and growing! 🌟";

    return resultsText;
  }

  public async speakQuizResults(results: any, onTextUpdate?: (text: string) => void): Promise<void> {
    if (!this.isAudioEnabled() || !results) return;

    const resultsText = this.generateQuizResultsText(results);
    
    // Convert formatted text to plain speech
    const cleanText = resultsText
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
      .replace(/[🎉📊⏱️💭🏆🥇🥈📈📚💪🎯🚀🎓👑📖🔄📝🌟•]/g, '') // Remove emojis
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Clean up extra spaces
      .trim();

    // Pass the callback directly for live captions
    await this.speak(cleanText, {
      rate: 0.9, // Slightly slower for better comprehension
      pitch: 1.0
    }, onTextUpdate);
  }

  public generateDetailedAnalysisText(results: any): string {
    const { questions } = results;
    const incorrectQuestions = questions.filter((q: any) => !q.is_correct);
    
    if (incorrectQuestions.length === 0) {
      return "🏆 **Perfect Score!**\n\nYou answered all questions correctly. This demonstrates excellent mastery of the subject! 🎉";
    }

    let analysisText = "📊 **Detailed Performance Analysis**\n\n";

    // Difficulty breakdown
    const difficultyStats: { [key: string]: { correct: number; total: number } } = {
      Beginner: { correct: 0, total: 0 },
      Intermediate: { correct: 0, total: 0 },
      Advanced: { correct: 0, total: 0 }
    };

    questions.forEach((q: any) => {
      const level = q.difficulty_level;
      if (difficultyStats[level]) {
        difficultyStats[level].total++;
        if (q.is_correct) {
          difficultyStats[level].correct++;
        }
      }
    });

    analysisText += "🎯 **Performance by Difficulty:**\n";
    for (const [level, stats] of Object.entries(difficultyStats)) {
      if (stats.total > 0) {
        const percentage = Math.round((stats.correct / stats.total) * 100);
        analysisText += `• **${level}**: ${percentage}% (${stats.correct}/${stats.total} correct)\n`;
      }
    }

    // Question type analysis
    const typeStats: { [key: string]: { correct: number; total: number } } = {};
    questions.forEach((q: any) => {
      const type = q.question_type;
      if (!typeStats[type]) {
        typeStats[type] = { correct: 0, total: 0 };
      }
      typeStats[type].total++;
      if (q.is_correct) {
        typeStats[type].correct++;
      }
    });

    analysisText += "\n📝 **Performance by Question Type:**\n";
    for (const [type, stats] of Object.entries(typeStats)) {
      if (stats.total > 0) {
        const percentage = Math.round((stats.correct / stats.total) * 100);
        analysisText += `• **${type}**: ${percentage}% accuracy\n`;
      }
    }

    // Areas for improvement
    if (incorrectQuestions.length > 0) {
      analysisText += `\n💡 **Areas for Improvement:**\n`;
      analysisText += `You had difficulty with **${incorrectQuestions.length} questions**. `;
      analysisText += "Focus on reviewing these concepts:\n";
      
      // Group incorrect questions by difficulty
      const incorrectByDifficulty: { [key: string]: number } = {};
      incorrectQuestions.forEach((q: any) => {
        const level = q.difficulty_level;
        incorrectByDifficulty[level] = (incorrectByDifficulty[level] || 0) + 1;
      });
      
      for (const [level, count] of Object.entries(incorrectByDifficulty)) {
        analysisText += `• ${count} ${level} level question${count > 1 ? 's' : ''}\n`;
      }
    }

    analysisText += "\n🎯 **Recommendation:** Review the explanations for missed questions and practice similar problems to strengthen your understanding.";

    return analysisText;
  }

  public async speakDetailedPerformanceAnalysis(results: any, onTextUpdate?: (text: string) => void): Promise<void> {
    if (!this.isAudioEnabled() || !results) return;

    const analysisText = this.generateDetailedAnalysisText(results);
    
    // Convert formatted text to plain speech
    const speechText = analysisText
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
      .replace(/[📊🏆🎉🎯📝💡•]/g, '') // Remove emojis
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Clean up extra spaces
      .trim();

    await this.speak(speechText, {
      rate: 0.85,
      pitch: 1.0
    }, onTextUpdate ? (text) => onTextUpdate(analysisText) : undefined);
  }

  public async speakAdaptiveInsights(insights: any): Promise<void> {
    if (!this.isAudioEnabled() || !insights) return;

    let insightsText = "Based on your performance, ";
    
    if (insights.next_difficulty) {
      insightsText += `the next question will be ${insights.next_difficulty} difficulty. `;
    }
    
    if (insights.performance_trend) {
      insightsText += `Your performance trend is ${insights.performance_trend}. `;
    }

    await this.speak(insightsText, { rate: 0.9 });
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }
}

// Export singleton instance
export const audioFeedback = new AudioFeedbackManager();

// Audio feedback configuration hook for React components
export const useAudioFeedback = () => {
  return {
    speak: audioFeedback.speak.bind(audioFeedback),
    speakFeedback: audioFeedback.speakFeedback.bind(audioFeedback),
    speakQuizResults: audioFeedback.speakQuizResults.bind(audioFeedback),
    speakDetailedPerformanceAnalysis: audioFeedback.speakDetailedPerformanceAnalysis.bind(audioFeedback),
    speakAdaptiveInsights: audioFeedback.speakAdaptiveInsights.bind(audioFeedback),
    setEnabled: audioFeedback.setEnabled.bind(audioFeedback),
    isEnabled: audioFeedback.isAudioEnabled.bind(audioFeedback),
    stop: audioFeedback.stop.bind(audioFeedback),
    getVoices: audioFeedback.getAvailableVoices.bind(audioFeedback)
  };
};