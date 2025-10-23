import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
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
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
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

// API Methods
export const authAPI = {
  register: async (data: {
    username: string;
    email: string;
    password: string;
    full_name: string;
    skill_level: string;
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
};

export default api;