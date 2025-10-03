# Smart Quizzer AI

An intelligent, adaptive quiz generation platform powered by AI that creates personalized learning experiences with advanced answer evaluation and real-time analytics.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.8+-blue.svg)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.x-yellow.svg)](https://python.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3+-cyan.svg)](https://tailwindcss.com/)
[![AI Powered](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)](https://ai.google.dev/)

## 🚀 Latest Features & Enhancements

### ✨ Enhanced Answer Evaluation System (NEW!)
- **Multi-Method Evaluation**: Exact match, keyword overlap, numerical analysis, and enhanced text analysis
- **Confidence Scoring**: 0-100% confidence levels for answer accuracy assessment
- **Intelligent Feedback**: AI-generated explanations, learning tips, and improvement hints
- **Question Type Specialization**: Optimized evaluation for MCQ, True/False, and Short Answer questions
- **Evaluation Transparency**: Shows which evaluation method was used and confidence levels

### 📊 Advanced Analytics Dashboard (NEW!)
- **Real User Performance Data**: Live analytics showing actual user performance metrics
- **Adaptive Learning Insights**: Performance trends, accuracy rates, and confidence tracking
- **Difficulty Progression**: Visual representation of user skill development over time
- **Personalized Recommendations**: AI-suggested difficulty levels based on performance history
- **Learning Pattern Analysis**: Identifies strengths and areas for improvement

### 🤖 Intelligent Question Generation (ENHANCED)
- **Context-Aware AI**: Google Gemini AI creates questions tailored to user skill level
- **Uniqueness Guarantee**: Advanced duplicate detection prevents question repetition
- **Dynamic Difficulty**: Real-time adjustment based on user performance and confidence
- **Comprehensive Question Types**: MCQ, True/False, Short Answer with intelligent evaluation

## 🎯 Core Features

### 🤖 AI-Powered Question Generation
- **Google Gemini AI Integration**: Dynamic, intelligent question creation
- **Adaptive Content**: Questions tailored to user skill level and performance
- **Topic Flexibility**: Support for predefined subjects and custom topics
- **Question Uniqueness**: Advanced algorithms prevent duplicate questions
- **Multi-Format Support**: MCQ, True/False, Short Answer with specialized evaluation

### 🧠 Enhanced Answer Evaluation System
- **Multi-Method Analysis**: 
  - Exact match detection for precise answers
  - Keyword overlap analysis for partial credit
  - Numerical analysis for mathematical responses
  - Enhanced text analysis for comprehensive evaluation
- **Confidence Scoring**: 0-100% confidence levels with detailed feedback
- **Learning-Focused Feedback**:
  - Personalized explanations for incorrect answers
  - Targeted learning tips and improvement suggestions
  - Contextual hints for better understanding
- **Evaluation Transparency**: Clear indication of evaluation methods used

### 📊 Advanced Analytics & Performance Tracking
- **Real-Time Analytics Dashboard**:
  - Live performance metrics and accuracy tracking
  - Confidence level progression over time
  - Learning trend analysis and pattern recognition
- **Adaptive Learning Insights**:
  - Performance-based difficulty recommendations
  - Personalized learning path suggestions
  - Skill development tracking across topics
- **Comprehensive Reporting**:
  - Detailed quiz history with evaluation metadata
  - Performance comparisons across different topics
  - Learning progress visualization

### 🎚️ Adaptive Learning Engine
- **Real-Time Difficulty Adjustment**: Questions adapt based on user performance
- **Multi-Factor Analysis**: Combines accuracy, confidence, and response patterns
- **Bloom's Taxonomy Integration**: Cognitive level-based question classification
- **Performance Prediction**: AI predicts optimal difficulty for maximum learning
- **Streak Tracking**: Consecutive correct answers and learning momentum

### 🔐 Secure Authentication & User Management
- **JWT-Based Security**: Token-based authentication with bcrypt encryption
- **User Profiles**: Comprehensive skill level and performance tracking
- **Session Management**: Automatic token handling and secure logout
- **Demo Mode**: Quick testing without registration

### 🎨 Modern User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-Time Feedback**: Instant evaluation results with detailed explanations
- **Intuitive Interface**: Clean, modern design with smooth animations
- **Accessibility**: WCAG-compliant design for inclusive learning

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern JavaScript library with hooks and concurrent features
- **TypeScript** - Static typing for enhanced development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router** - Declarative client-side routing
- **Axios** - Promise-based HTTP client for API communication

### Backend
- **Python 3.x** - High-level programming language
- **Flask 2.3** - Lightweight and flexible web framework
- **SQLite** - Serverless, file-based database
- **SQLAlchemy** - Python SQL toolkit and Object-Relational Mapping
- **JWT Extended** - JSON Web Token authentication library
- **Google Gemini AI** - Advanced AI for intelligent question generation
- **bcrypt** - Secure password hashing

### AI & Analytics
- **Google Gemini AI** - Natural language processing and question generation
- **Enhanced Text Analysis** - Custom algorithms for answer evaluation
- **Bloom's Taxonomy Engine** - Cognitive level classification system
- **Performance Analytics** - Real-time learning pattern analysis

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
   cd Smart-Quizzer-AI
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   
   # Set up environment variables (IMPORTANT!)
   python setup_env.py
   # OR manually copy .env.example to .env and add your API keys
   
   python app.py
   ```
   Backend will run on `http://localhost:5000`

3. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend will run on `http://localhost:3000`

### Environment Setup

**IMPORTANT: Secure your API keys!**

1. **Automated Setup (Recommended):**
   ```bash
   cd backend
   python setup_env.py
   ```

2. **Manual Setup:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env file and add your API keys
   ```

3. **Required Environment Variables:**
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   SECRET_KEY=your_secure_secret_key_here
   DATABASE_URL=sqlite:///smart_quizzer.db
   ```

**Get your Gemini API key:** https://makersuite.google.com/app/apikey

**Security Note:** Never commit your `.env` file to version control!

## Usage

### Getting Started
1. Register a new account or use demo login
2. Choose a topic from predefined subjects or create custom content
3. Select difficulty level (Beginner/Intermediate/Advanced)
4. Take the quiz with real-time feedback
5. View results with detailed explanations and performance analytics

### Available Topics & Subjects
- **Mathematics** - Algebra, geometry, calculus, statistics with intelligent numerical evaluation
- **Science** - Physics, chemistry, biology with enhanced conceptual understanding
- **History** - World history, civilizations, events with context-aware evaluation
- **Literature** - Literary analysis, comprehension, critical thinking
- **Geography** - Physical and human geography with spatial reasoning
- **Custom Topics** - User-generated content with AI-powered question creation

### Enhanced Dashboard Features
- **Performance Overview**: Real-time accuracy, confidence, and learning trends
- **Advanced Analytics**: 
  - Skill progression tracking across multiple topics
  - Confidence level analysis and improvement recommendations
  - Learning pattern recognition and adaptive suggestions
- **Detailed Quiz History**: 
  - Complete evaluation metadata for each question
  - Performance comparison across different difficulty levels
  - Learning insights and areas for improvement
- **Adaptive Recommendations**: 
  - AI-suggested difficulty levels based on performance
  - Personalized learning paths for skill development
  - Topic-specific strengths and weaknesses analysis

## 🏗️ Architecture

```
React Frontend (TypeScript + Tailwind CSS + Enhanced Analytics)
                    ↕ HTTP/JSON + Real-time Feedback
Flask Backend (Python + SQLAlchemy + JWT Auth + Gemini AI + Enhanced Evaluation)
                    ↕ ORM + Performance Tracking
SQLite Database (Users, Quiz Sessions, Questions, Topics, Evaluation Metadata)
                    ↕ AI Integration
Google Gemini AI (Question Generation + Content Analysis + Difficulty Assessment)
```

## 📁 Project Structure

```
Smart-Quizzer-AI/
├── backend/                           # Flask backend
│   ├── app.py                        # Main Flask application with enhanced APIs
│   ├── auth.py                       # JWT authentication logic
│   ├── models.py                     # Database models with evaluation metadata
│   ├── question_gen.py               # AI question generation engine
│   ├── answer_evaluator_simple.py   # Enhanced answer evaluation system
│   ├── migrate_db.py                 # Database migration utilities
│   ├── requirements.txt              # Python dependencies
│   ├── setup_env.py                  # Environment setup script
│   ├── .env.example                  # Environment template
│   └── instance/
│       └── smart_quizzer.db          # SQLite database (excluded from git)
├── frontend/                          # React frontend
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   ├── pages/                    # Main page components
│   │   │   ├── Dashboard.tsx         # Enhanced dashboard with analytics
│   │   │   ├── Quiz.tsx              # Quiz interface with detailed feedback
│   │   │   ├── Analytics.tsx         # Advanced analytics dashboard
│   │   │   └── ...
│   │   ├── lib/                      # Utilities and API clients
│   │   └── App.tsx                   # Main App component with routing
│   ├── public/                       # Static assets
│   ├── package.json                  # Node.js dependencies
│   └── tailwind.config.js            # Tailwind configuration
├── .gitignore                        # Git ignore rules (includes .env and *.db)
├── LICENSE                           # MIT License
└── README.md                         # This comprehensive documentation
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration with password hashing
- `POST /api/auth/login` - User login with JWT token generation
- `GET /api/auth/profile` - Get authenticated user profile

### Quiz Management
- `GET /api/topics` - Get available topics and subjects
- `POST /api/quiz/start` - Start new quiz with AI-generated questions
- `POST /api/quiz/{id}/answer` - Submit answer with enhanced evaluation and feedback
- `GET /api/quiz/{id}/results` - Get comprehensive quiz results with analytics
- `GET /api/quiz/history` - Get detailed quiz history with evaluation metadata

### Advanced Analytics & Learning
- `GET /api/user/adaptive-analytics` - Get comprehensive learning analytics and performance insights
- `POST /api/user/difficulty-recommendation` - Get AI-powered difficulty recommendations
- `GET /api/health` - System health check and status monitoring

### Enhanced Features in API Responses
- **Detailed Evaluation Metadata**: Confidence scores, evaluation methods, answer analysis
- **Learning Insights**: Personalized feedback, improvement suggestions, learning tips
- **Performance Tracking**: Real-time analytics, accuracy trends, confidence progression
- **Adaptive Recommendations**: Dynamic difficulty suggestions based on user performance

## 🧠 Enhanced Answer Evaluation System

The Smart Quizzer AI features a sophisticated answer evaluation system that goes beyond simple correct/incorrect assessment:

### 🔍 Multi-Method Evaluation
- **Exact Match Detection**: Perfect answer matching with case-insensitive comparison
- **Keyword Overlap Analysis**: Partial credit based on key concept recognition
- **Numerical Analysis**: Specialized evaluation for mathematical and scientific answers
- **Enhanced Text Analysis**: Advanced text processing for comprehensive understanding

### 📊 Intelligent Feedback Generation
- **Confidence Scoring**: 0-100% confidence levels with detailed justification
- **Personalized Explanations**: AI-generated explanations tailored to user's answer
- **Learning Tips**: Contextual suggestions for improvement and deeper understanding
- **Targeted Hints**: Specific guidance for areas needing attention

### 🎯 Question Type Specialization
- **Multiple Choice Questions (MCQ)**: Optimized for option-based evaluation
- **True/False Questions**: Boolean logic with reasoning analysis
- **Short Answer Questions**: Advanced text analysis with partial credit assessment
- **Numerical Questions**: Mathematical evaluation with tolerance and unit handling

### 📈 Evaluation Transparency
- **Method Indicator**: Clear indication of which evaluation method was used
- **Confidence Display**: Visual representation of evaluation confidence
- **Detailed Metadata**: Complete evaluation breakdown for learning insights

## 📊 Advanced Analytics & Performance Tracking

### Real-Time Performance Dashboard
- **Live Analytics**: Real-time updates of user performance metrics
- **Accuracy Tracking**: Detailed accuracy rates across different topics and difficulty levels
- **Confidence Progression**: Visual representation of user confidence growth over time
- **Learning Trends**: Pattern analysis and performance trend identification

### Adaptive Learning Insights
- **Performance Predictions**: AI-powered predictions for optimal difficulty levels
- **Skill Gap Analysis**: Identification of strengths and areas for improvement
- **Learning Path Recommendations**: Personalized suggestions for skill development
- **Topic Mastery Tracking**: Progress monitoring across different subjects

### Comprehensive Reporting
- **Detailed Quiz History**: Complete records with evaluation metadata
- **Performance Comparisons**: Cross-topic and cross-difficulty analysis
- **Learning Progress Visualization**: Charts and graphs showing improvement over time
- **Export Capabilities**: Data export for external analysis and reporting

## 🚀 Implementation Highlights

### ✅ What's Currently Implemented

#### 🔧 Backend Infrastructure
- ✅ **Flask API Server** - Complete RESTful API with JWT authentication
- ✅ **SQLite Database** - User management, quiz sessions, questions, and evaluation metadata
- ✅ **Google Gemini AI Integration** - Dynamic question generation with context awareness
- ✅ **Enhanced Answer Evaluation** - Multi-method evaluation with confidence scoring
- ✅ **Adaptive Learning Engine** - Real-time difficulty adjustment and performance tracking
- ✅ **Database Migration Tools** - Schema updates and data migration utilities
- ✅ **Security Features** - Password hashing, JWT tokens, input validation

#### 🎨 Frontend Application
- ✅ **React TypeScript App** - Modern, responsive user interface
- ✅ **Authentication System** - Login, registration, and session management
- ✅ **Interactive Quiz Interface** - Real-time feedback and enhanced evaluation display
- ✅ **Advanced Analytics Dashboard** - Performance tracking and learning insights
- ✅ **Responsive Design** - Mobile-friendly interface with Tailwind CSS
- ✅ **Real-time Updates** - Live performance metrics and instant feedback

#### 🤖 AI & Analytics Features
- ✅ **Intelligent Question Generation** - AI-powered questions with uniqueness guarantee
- ✅ **Enhanced Answer Evaluation** - Multi-method analysis with detailed feedback
- ✅ **Performance Analytics** - Real user data with accuracy and confidence tracking
- ✅ **Adaptive Recommendations** - AI-suggested difficulty levels and learning paths
- ✅ **Learning Pattern Analysis** - Skill development tracking and trend analysis

#### 📊 Data & Analytics
- ✅ **Real User Performance Data** - Live analytics replacing demo data
- ✅ **Comprehensive Evaluation Metadata** - Detailed answer analysis and scoring
- ✅ **Learning Progress Tracking** - Skill development and improvement monitoring
- ✅ **Performance Visualization** - Charts and graphs for learning insights

### 🔧 Technical Features
- ✅ **Database Schema Management** - Migration tools for schema updates
- ✅ **Error Handling & Fallbacks** - Robust error management and recovery
- ✅ **Security Best Practices** - Environment variable protection and secure coding
- ✅ **Git Integration** - Proper version control with sensitive data protection
- ✅ **Documentation** - Comprehensive README and code documentation

### 📈 Recent Enhancements (Latest Updates)
- 🆕 **Enhanced Answer Evaluation System** - Advanced text analysis and confidence scoring
- 🆕 **Real-time Analytics Dashboard** - Live performance data and learning insights
- 🆕 **Database Migration Tools** - Schema update utilities and data management
- 🆕 **Improved Error Handling** - Better fallback mechanisms and user feedback
- 🆕 **Security Enhancements** - Protected environment variables and data security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices for frontend development
- Use Python PEP 8 style guide for backend code
- Write meaningful commit messages with emoji prefixes
- Add comprehensive tests for new features
- Update documentation for any API or feature changes
- Ensure security best practices for sensitive data handling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Batchu Mamatha** - *Project Creator & Lead Developer* - [@BatchuMamatha](https://github.com/BatchuMamatha)

## 🙏 Acknowledgments

- **Google Gemini AI** - For powerful and intelligent question generation capabilities
- **React Community** - For excellent documentation and development resources
- **Flask Team** - For the lightweight and flexible web framework
- **Tailwind CSS** - For beautiful, utility-first styling framework
- **SQLAlchemy** - For robust database ORM and management tools
- **Open Source Community** - For the amazing tools and libraries that make this project possible

## 🆘 Support & Documentation

If you encounter any issues or have questions, please:

1. **Check the Documentation** - Review this README and inline code comments
2. **Search Existing Issues** - Look through GitHub issues for similar problems
3. **Create a Detailed Issue** - Provide comprehensive information about the problem
4. **Join Discussions** - Participate in GitHub discussions for general questions

### Getting Help
- 📧 **Email Support**: Create an issue on GitHub for fastest response
- 💬 **Community**: Join GitHub discussions for collaborative problem-solving
- 📖 **Documentation**: Comprehensive guides available in the repository
- 🐛 **Bug Reports**: Use GitHub issues with detailed reproduction steps

---

## 🎯 Project Status

**Current Version**: v2.0.0 - Enhanced Analytics & Evaluation  
**Status**: ✅ **Fully Operational** - All core features implemented and tested  
**Last Updated**: October 3, 2025  
**Performance**: Optimized for real-time learning and analytics  

### 📊 Feature Completion Status
- 🟢 **Core Quiz System**: 100% Complete
- 🟢 **AI Question Generation**: 100% Complete  
- 🟢 **Enhanced Answer Evaluation**: 100% Complete
- 🟢 **Advanced Analytics**: 100% Complete
- 🟢 **User Authentication**: 100% Complete
- 🟢 **Responsive UI**: 100% Complete
- 🟢 **Database Management**: 100% Complete

---

**🎓 Built for transforming learning experiences through intelligent AI and comprehensive analytics**