import axios from 'axios';

// Use environment variable or fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token');
  
  // Only log in development mode
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 API Request:', {
      url: config.url,
      method: config.method,
      hasToken: !!token
    });
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  skill_level: 'Beginner' | 'Intermediate' | 'Advanced';
  role: 'user' | 'admin';
  created_at: string;
  quiz_count?: number;
  total_quizzes?: number;
  completed_quizzes?: number;
  average_score?: number;
}

export interface Topic {
  id: number;
  name: string;
  description: string;
  category: string;
  is_active: boolean;
}

export interface Question {
  id: number;
  quiz_session_id: number;
  question_text: string;
  question_type: 'MCQ' | 'True/False' | 'Short Answer';
  options: string[];
  user_answer?: string;
  explanation: string;
  difficulty_level: string;
  is_correct?: boolean;
  answered_at?: string;
  time_taken?: number;
  correct_answer?: string;
}

export interface QuizSession {
  id: number;
  user_id: number;
  topic: string;
  skill_level: string;
  custom_topic?: string;
  total_questions: number;
  completed_questions: number;
  correct_answers: number;
  score_percentage: number;
  status: 'active' | 'completed' | 'abandoned';
  started_at: string;
  completed_at?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  tokens: {
    access_token: string;
    token_type: string;
  };
}

export interface QuizStartResponse {
  quiz_session: QuizSession;
  questions: Question[];
}

export interface AnswerResponse {
  is_correct: boolean;
  correct_answer: string;
  explanation: string;
  time_taken: number;
  quiz_progress: {
    completed: number;
    total: number;
    score_percentage: number;
    is_completed: boolean;
  };
}

export interface QuizResultsResponse {
  quiz_session: QuizSession;
  questions: Question[];
  summary: {
    total_questions: number;
    correct_answers: number;
    score_percentage: number;
    time_taken: number;
  };
}

// Badge & Gamification Types
export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: 'milestone' | 'perfect_score' | 'speed' | 'streak' | 'daily_streak' | 'accuracy' | 'topic_master' | 'special';
  criteria_type: string;
  criteria_value: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  created_at: string;
}

export interface UserBadge {
  id: number;
  user_id: number;
  badge_id: number;
  earned_at: string;
  progress_data?: any;
  badge: Badge;
}

export interface BadgeProgress {
  badge: Badge;
  current_value: number;
  required_value: number;
  progress_percentage: number;
  is_close_to_completion: boolean;
}

// Analytics Types
export interface PerformanceTrend {
  id: number;
  user_id: number;
  date: string;
  topic?: string;
  quizzes_completed: number;
  accuracy_rate: number;
  avg_time_per_question: number;
  difficulty_distribution: any;
  daily_streak: number;
}

export interface TopicMastery {
  topic: string;
  total_quizzes: number;
  avg_accuracy: number;
  total_questions: number;
  mastery_level: 'expert' | 'proficient' | 'developing' | 'beginner';
  color: string;
}

export interface WeeklyReport {
  week_start: string;
  week_end: string;
  quizzes_completed: number;
  avg_accuracy: number;
  total_questions: number;
  correct_answers: number;
  accuracy_change: number;
  quiz_count_change: number;
  topic_breakdown: Record<string, any>;
  current_streak: number;
  improvement_trend: 'improving' | 'declining' | 'stable';
}

export interface Recommendation {
  type: 'focus_area' | 'practice_more' | 'try_harder' | 'maintain';
  message: string;
  topic?: string;
  priority: 'high' | 'medium' | 'low';
}

// Learning Path Types
export interface LearningMilestone {
  id: number;
  learning_path_id: number;
  name: string;
  description: string;
  order_index: number;
  topic: string;
  difficulty: string;
  required_accuracy: number;
  is_completed: boolean;
  completed_at?: string;
}

export interface LearningPath {
  id: number;
  user_id: number;
  name: string;
  description: string;
  topics: string[];
  difficulty_progression: string[];
  total_steps: number;
  completed_steps: number;
  current_position: number;
  progress_percentage: number;
  status: 'active' | 'paused' | 'completed';
  estimated_duration_days: number;
  created_at: string;
  completed_at?: string;
  milestones?: LearningMilestone[];
}

// Multiplayer Types
export interface MultiplayerParticipant {
  id: number;
  room_id: number;
  user_id: number;
  username: string;
  is_host: boolean;
  is_ready: boolean;
  score: number;
  rank: number;
  correct_answers: number;
  answers_submitted: number;
  joined_at: string;
}

export interface MultiplayerRoom {
  id: number;
  room_code: string;
  host_user_id: number;
  host_username?: string;
  topic: string;
  difficulty: string;
  max_players: number;
  current_players: number;
  question_count: number;
  time_limit_per_question: number;
  current_question_index: number;
  status: 'waiting' | 'in_progress' | 'completed';
  created_at: string;
  started_at?: string;
  ended_at?: string;
  participants?: MultiplayerParticipant[];
  is_participant?: boolean;
  is_host?: boolean;
  is_ready?: boolean;
}

export interface MultiplayerResults {
  room_code: string;
  topic: string;
  difficulty: string;
  total_questions: number;
  started_at?: string;
  ended_at?: string;
  results: Array<{
    rank: number;
    user_id: number;
    username: string;
    score: number;
    correct_answers: number;
    answers_submitted: number;
    accuracy: number;
  }>;
  winner?: any;
}

// API Methods
export const authAPI = {
  register: async (data: {
    username: string;
    email: string;
    password: string;
    full_name: string;
    skill_level: string;
    role?: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: {
    username: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  forgotPassword: async (data: {
    email: string;
  }): Promise<{
    success: boolean;
    message: string;
    user_exists: boolean;
    reset_token?: string;
  }> => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  verifyResetToken: async (data: {
    token: string;
  }): Promise<{
    valid: boolean;
    message: string;
    user?: {
      username: string;
      email: string;
    };
  }> => {
    const response = await api.post('/auth/verify-reset-token', data);
    return response.data;
  },

  resetPassword: async (data: {
    token: string;
    new_password: string;
  }): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },
};

export const topicsAPI = {
  getTopics: async (): Promise<Topic[]> => {
    const response = await api.get('/topics');
    return response.data;
  },
};

export const quizAPI = {
  startQuiz: async (data: {
    topic: string;
    skill_level: string;
    num_questions?: number;
    custom_topic?: string;
  }): Promise<QuizStartResponse> => {
    const response = await api.post('/quiz/start', data);
    return response.data;
  },

  submitAnswer: async (
    quizId: number,
    data: {
      question_id: number;
      answer: string;
      time_taken?: number;
    }
  ): Promise<AnswerResponse> => {
    const response = await api.post(`/quiz/${quizId}/answer`, data);
    return response.data;
  },

  getResults: async (quizId: number): Promise<QuizResultsResponse> => {
    const response = await api.get(`/quiz/${quizId}/results`);
    return response.data;
  },

  getHistory: async (): Promise<QuizSession[]> => {
    const response = await api.get('/quiz/history');
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get('/quiz/analytics');
    return response.data;
  },

  flagQuestion: async (questionId: number, reason: string): Promise<{ message: string }> => {
    const response = await api.post(`/flag/question/${questionId}`, { reason });
    return response.data;
  },

  submitFeedback: async (questionId: number, feedback_text: string, rating: number): Promise<{ message: string }> => {
    const response = await api.post(`/feedback/question/${questionId}`, { feedback_text, rating });
    return response.data;
  },

  getLeaderboard: async (params?: {
    topic?: string;
    skill_level?: string;
    limit?: number;
  }): Promise<{
    leaderboard: Array<{
      rank: number;
      user_id: number;
      username: string;
      full_name: string;
      total_quizzes: number;
      total_questions: number;
      total_correct: number;
      average_score: number;
      total_time: number;
      average_time: number;
      best_score: number;
      best_quiz_id: number | null;
      best_quiz_time: number;
      recent_quizzes: Array<{
        quiz_id: number;
        topic: string;
        score: number;
        time_taken: number;
        completed_at: string | null;
      }>;
    }>;
    total_users: number;
    current_user: {
      rank: number | null;
      stats: any;
    };
    filters: {
      topic: string | null;
      skill_level: string | null;
    };
  }> => {
    const response = await api.get('/leaderboard', { params });
    return response.data;
  },
};

// Badge API
export const badgeAPI = {
  getAvailableBadges: async (): Promise<{
    badges: Badge[];
    by_category: Record<string, Badge[]>;
    total_badges: number;
  }> => {
    const response = await api.get('/badges/available');
    return response.data;
  },

  getUserBadges: async (): Promise<{
    badges: UserBadge[];
    total_badges: number;
    total_points: number;
    user_id: number;
  }> => {
    const response = await api.get('/user/badges');
    return response.data;
  },

  getBadgeProgress: async (): Promise<{
    progress: BadgeProgress[];
    close_to_completion: BadgeProgress[];
    others: BadgeProgress[];
    total_available: number;
  }> => {
    const response = await api.get('/user/badges/progress');
    return response.data;
  },
};

// Analytics API
export const analyticsAPI = {
  getPerformanceTrends: async (params?: {
    days?: number;
    topic?: string;
  }): Promise<{
    trends: PerformanceTrend[];
    period_days: number;
    data_points: number;
    current_streak: number;
  }> => {
    const response = await api.get('/analytics/trends', { params });
    return response.data;
  },

  getTopicMastery: async (): Promise<{
    topics: TopicMastery[];
    strengths: string[];
    weaknesses: string[];
    best_topic: TopicMastery;
    weakest_topic: TopicMastery;
  }> => {
    const response = await api.get('/analytics/topic-mastery');
    return response.data;
  },

  getWeeklyReport: async (): Promise<WeeklyReport> => {
    const response = await api.get('/analytics/weekly-report');
    return response.data;
  },

  getMonthlyReport: async (): Promise<{
    total_days: number;
    active_days: number;
    activity_rate: number;
    weekly_breakdown: any[];
    best_day: any;
    worst_day: any;
    longest_streak: number;
  }> => {
    const response = await api.get('/analytics/monthly-report');
    return response.data;
  },

  getRecommendations: async (): Promise<{
    topic_mastery: Record<string, any>;
    question_type_performance: any[];
    difficulty_performance: any[];
    recommendations: Recommendation[];
  }> => {
    const response = await api.get('/analytics/recommendations');
    return response.data;
  },
};

// Learning Path API
export const learningPathAPI = {
  getLearningPaths: async (status?: string): Promise<{
    learning_paths: LearningPath[];
    total: number;
  }> => {
    const response = await api.get('/learning-paths', { params: { status } });
    return response.data;
  },

  createLearningPath: async (data: {
    name: string;
    topics: string[];
    difficulty_progression: string[];
    description?: string;
    estimated_duration_days?: number;
  }): Promise<LearningPath> => {
    const response = await api.post('/learning-paths', data);
    return response.data;
  },

  generateRecommendedPath: async (): Promise<LearningPath> => {
    const response = await api.post('/learning-paths/recommended');
    return response.data;
  },

  getLearningPathDetails: async (pathId: number): Promise<LearningPath> => {
    const response = await api.get(`/learning-paths/${pathId}`);
    return response.data;
  },

  getNextQuiz: async (pathId: number): Promise<{
    topic: string;
    difficulty: string;
    milestone_id: number;
    milestone_name: string;
    required_accuracy: number;
    order: number;
    total_steps: number;
  }> => {
    const response = await api.get(`/learning-paths/${pathId}/next-quiz`);
    return response.data;
  },

  pauseLearningPath: async (pathId: number): Promise<{ message: string }> => {
    const response = await api.put(`/learning-paths/${pathId}/pause`);
    return response.data;
  },

  resumeLearningPath: async (pathId: number): Promise<{ message: string }> => {
    const response = await api.put(`/learning-paths/${pathId}/resume`);
    return response.data;
  },

  deleteLearningPath: async (pathId: number): Promise<{ message: string }> => {
    const response = await api.delete(`/learning-paths/${pathId}`);
    return response.data;
  },
};

// Multiplayer API
export const multiplayerAPI = {
  getRooms: async (params?: {
    topic?: string;
    status?: string;
  }): Promise<{
    rooms: MultiplayerRoom[];
    total: number;
  }> => {
    const response = await api.get('/multiplayer/rooms', { params });
    return response.data;
  },

  createRoom: async (data: {
    topic: string;
    difficulty?: string;
    max_players?: number;
    question_count?: number;
    time_limit_per_question?: number;
  }): Promise<MultiplayerRoom> => {
    const response = await api.post('/multiplayer/rooms', data);
    return response.data;
  },

  getRoomDetails: async (roomCode: string): Promise<MultiplayerRoom> => {
    const response = await api.get(`/multiplayer/rooms/${roomCode}`);
    return response.data;
  },

  joinRoom: async (roomCode: string): Promise<{
    message: string;
    room: MultiplayerRoom;
  }> => {
    const response = await api.post(`/multiplayer/rooms/${roomCode}/join`);
    return response.data;
  },

  leaveRoom: async (roomCode: string): Promise<{ message: string }> => {
    const response = await api.post(`/multiplayer/rooms/${roomCode}/leave`);
    return response.data;
  },

  toggleReady: async (roomCode: string): Promise<{
    is_ready: boolean;
    message: string;
  }> => {
    const response = await api.post(`/multiplayer/rooms/${roomCode}/ready`);
    return response.data;
  },

  startGame: async (roomCode: string): Promise<{
    message: string;
    room: MultiplayerRoom;
  }> => {
    const response = await api.post(`/multiplayer/rooms/${roomCode}/start`);
    return response.data;
  },

  getResults: async (roomCode: string): Promise<MultiplayerResults> => {
    const response = await api.get(`/multiplayer/rooms/${roomCode}/results`);
    return response.data;
  },
};

// PDF Question Generation API
export const pdfAPI = {
  generateFromPDF: async (formData: FormData): Promise<{
    success: boolean;
    message: string;
    quiz_session_id: number;
    questions: Question[];
    metadata: any;
    pdf_filename: string;
  }> => {
    const response = await api.post('/questions/generate-from-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  generateFromText: async (data: {
    content: string;
    topic: string;
    num_questions?: number;
    difficulty?: string;
    question_types?: string[];
  }): Promise<{
    success: boolean;
    message: string;
    quiz_session_id: number;
    questions: Question[];
    metadata: any;
  }> => {
    const response = await api.post('/questions/generate-from-text', data);
    return response.data;
  },
};

export default api;