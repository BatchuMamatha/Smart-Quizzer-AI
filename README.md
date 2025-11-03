# Smart Quizzer AI 🎓# Smart Quizzer AI - Adaptive Learning Platform 🎓



An intelligent, adaptive quiz generation platform powered by AI that creates personalized learning experiences with real-time feedback, dynamic difficulty adjustment, and comprehensive analytics.An intelligent quiz generation platform powered by AI that creates personalized learning experiences with real-time feedback, adaptive difficulty adjustment, and comprehensive admin management tools.



[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

[![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)](https://flask.palletsprojects.com/)[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)

[![Python](https://img.shields.io/badge/Python-3.13-blue.svg)](https://python.org/)[![AI Powered](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)](https://ai.google.dev/)

[![AI Powered](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)](https://ai.google.dev/)[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)[![Production Ready](https://img.shields.io/badge/Production-Ready-success.svg)](https://github.com/BatchuMamatha/Smart-Quizzer-AI)



---## 📚 Documentation



## 📖 Table of Contents- **[SETUP.md](SETUP.md)** - Complete installation and setup guide

- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Technical documentation

- [Overview](#overview)- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Recent fixes and improvements

- [Key Features](#key-features)- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Comprehensive testing procedures

- [Technology Stack](#technology-stack)

- [Quick Start](#quick-start)## 🎯 Problem Statement

- [Project Structure](#project-structure)

- [Usage Guide](#usage-guide)Traditional quiz and assessment systems face several critical challenges:

- [System Architecture](#system-architecture)

- [API Documentation](#api-documentation)- **Static Content**: Fixed questions that don't adapt to individual learning needs

- [Future Enhancements](#future-enhancements)- **One-Size-Fits-All**: Same difficulty level for all users regardless of skill

- [Contributing](#contributing)- **Limited Feedback**: Basic correct/incorrect responses without detailed explanations

- [License](#license)- **Manual Content Creation**: Time-intensive process to create diverse questions

- **No Learning Analytics**: Lack of insights into student progress and performance

---- **Poor User Experience**: Outdated interfaces with limited interactivity



## 🎯 Overview## 💡 My Solution



**Smart Quizzer AI** is a modern, adaptive learning platform that leverages artificial intelligence to generate personalized quizzes, provide intelligent feedback, and track user progress. The system automatically adjusts question difficulty based on user performance, making it ideal for students, educators, and lifelong learners.**Smart Quizzer AI** addresses these problems with an intelligent, adaptive learning platform:



### Problem Statement###  **Quick Start**



Traditional assessment systems suffer from:**First-Time Setup (For You and Your Friends):**

- **Static content** that doesn't adapt to individual learning needs

- **One-size-fits-all** approach regardless of skill level1. **Clone the repository:**

- **Limited feedback** with basic correct/incorrect responses   ```bash

- **Manual content creation** that is time-intensive   git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

- **No analytics** to track learning progress   cd Smart-Quizzer-AI

- **Poor user experience** with outdated interfaces   ```



### Solution2. **Install backend dependencies:**

   ```bash

Smart Quizzer AI addresses these challenges with:   cd backend

- ✅ **AI-powered question generation** from custom content (PDFs, text, URLs)   pip install -r requirements.txt

- ✅ **Adaptive difficulty** that adjusts in real-time based on performance   ```

- ✅ **Intelligent answer evaluation** with detailed explanations

- ✅ **Comprehensive analytics** including performance trends and topic mastery3. **Set up environment variables:**

- ✅ **Gamification** with badges, achievements, and leaderboards   - Create `.env` file in `backend/` folder

- ✅ **Modern UI/UX** built with React and responsive design   - Add your Google API key: `GOOGLE_API_KEY=your_key_here`



---4. **Start the backend:**

   ```bash

## ✨ Key Features   python app.py

   ```

### 🤖 AI-Powered Quiz Generation   **✅ On first run, the database will auto-create with a default admin account!**

- **Google Gemini AI Integration**: Generates high-quality, contextually relevant questions

- **Multi-format Support**: Upload PDFs, Word documents, or paste text to create quizzes5. **Install and run frontend (new terminal):**

- **URL Processing**: Extract content from web pages for quiz generation   ```bash

- **Question Types**: Multiple Choice, True/False, and Short Answer questions   cd ../frontend

- **Bloom's Taxonomy**: Questions classified by cognitive levels (Remember, Understand, Apply, Analyze, Evaluate, Create)   npm install

   npm start

### 🎯 Adaptive Learning Engine   ```

- **Real-time Difficulty Adjustment**: Automatically increases/decreases difficulty based on performance

- **Personalized Learning Paths**: AI-recommended study paths with milestones6. **Login with default credentials:**

- **Skill Level Tracking**: Beginner, Intermediate, and Advanced classifications   - Navigate to `http://localhost:8080`

- **Smart Recommendations**: AI suggests focus areas based on performance analytics   - **Username**: `admin`

   - **Password**: `Admin@123`

### 📊 Advanced Analytics Dashboard   - ⚠️ **Important**: Change the password after first login!

- **Performance Trends**: Visual charts showing progress over time (7, 14, 30, 60, 90 days)

- **Topic Mastery Heatmap**: Color-coded visualization of strengths and weaknesses###  **Account Creation**

- **Weekly/Monthly Reports**: Detailed statistics on quizzes taken, average scores, and streaks

- **Learning Insights**: AI-generated recommendations for improvement**Default Admin Account (Auto-Created on First Run):**

- **Username**: `admin`

### 🏆 Gamification & Achievements- **Password**: `Admin@123`

- **21 Unique Badges**: From "First Steps" to "Quiz Legend"- **Role**: Administrator

  - Participation badges (First Quiz, Marathon Runner)- **Note**: The database and this account are automatically created the first time you run `python app.py`

  - Performance badges (Perfect Score, Consistency King)

  - Mastery badges (Subject Expert, Renaissance Scholar)**Creating Additional User Accounts:**

  - Streak badges (7-day, 30-day, 100-day streaks)- Navigate to the registration page at `http://localhost:8080/register`

- **Progress Tracking**: Visual indicators showing badge completion percentage- Fill in your details (username, email, full name, password)

- **User Rewards**: Unlock achievements as you learn- Select your skill level (Beginner, Intermediate, Advanced)

- Click "Create Account" to register

### 🌐 Real-time Multiplayer Quizzes- Start taking quizzes immediately after registration

- **Room Creation**: Create private quiz rooms with custom codes

- **Live Competition**: Compete with friends in real-time**Creating Additional Admin Accounts:**

- **WebSocket Integration**: Synchronized question delivery and answer submission- Login as the default admin

- **Leaderboard**: Real-time ranking during multiplayer sessions- Navigate to the admin panel

- **Chat Feature**: Communicate with other participants- Create new admin users with admin privileges



### 📈 Global Leaderboard System>  **Note**: After cloning from GitHub, simply run `python app.py` in the backend folder. The database and default admin account will be created automatically - no manual setup required!

- **Topic-specific Rankings**: See how you rank in different subjects

- **Global Standings**: Overall performance across all quizzes
- **Live Updates**: Real-time leaderboard refreshes via WebSockets
- **User Statistics**: View detailed stats for any user

### 📝 Content Management
- **Custom Content Upload**: PDF, DOCX, TXT file support
- **Advanced PDF Processing**: Extract text with pdfplumber for accurate parsing
- **Content Analysis**: AI analyzes uploaded content for quiz suitability
- **Multi-topic Support**: 20+ predefined topics across various domains

### 👤 User Features
- **Profile Management**: Update skill levels, view statistics
- **Quiz History**: Complete history of all quizzes taken with detailed results
- **Answer Explanations**: Detailed feedback for every question
- **Flag Questions**: Report incorrect or unclear questions
- **Question Feedback**: Provide ratings and comments

### 🛡️ Admin Dashboard
- **User Management**: View all users, update skill levels
- **Flagged Questions Review**: Review and resolve reported questions
- **Feedback Analysis**: Monitor user feedback on questions
- **System Statistics**: Total users, quizzes, questions, and performance metrics
- **Leaderboard Moderation**: Monitor and manage global rankings

---

## 🛠️ Technology Stack

### Backend
- **Framework**: Flask 3.0.0 (Python 3.13)
- **Database**: SQLite with SQLAlchemy 2.0.43 ORM
- **AI Engine**: Google Gemini AI for question generation and evaluation
- **NLP**: Sentence-Transformers, NLTK for semantic analysis
- **Real-time**: Flask-SocketIO for WebSocket connections
- **Authentication**: JWT-based authentication with Flask-JWT-Extended
- **Security**: Bcrypt for password hashing

### Frontend
- **Framework**: React 18.2.0 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Build Tool**: Create React App with Webpack

### AI & ML Components
- **Question Generation**: Google Gemini 1.5 Flash
- **Difficulty Classification**: Multi-factor analysis (Bloom's Taxonomy 40%, Semantic Complexity 30%, Text Metrics 20%, Historical Data 10%)
- **Answer Evaluation**: NLP-based semantic similarity with threshold-based grading
- **Content Processing**: PyPDF2, pdfplumber, python-docx, BeautifulSoup4

### Database Schema
15 interconnected models:
- User, QuizSession, Question, Topic
- Badge, UserBadge, PerformanceTrend
- LearningPath, LearningMilestone
- MultiplayerRoom, MultiplayerParticipant
- QuizLeaderboard, FlaggedQuestion, QuestionFeedback
- PasswordResetToken

---

## 🚀 Quick Start

### Prerequisites
- Python 3.13+ installed
- Node.js 16+ and npm installed
- Google Gemini API Key ([Get one here](https://ai.google.dev/))
- Git installed

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
cd Smart-Quizzer-AI
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo GOOGLE_API_KEY=your_api_key_here > .env
echo SECRET_KEY=your_secret_key_here >> .env
echo JWT_SECRET_KEY=your_jwt_secret_here >> .env

# Start backend server (auto-creates database on first run)
python app.py
```

**Note**: On first run, `app.py` automatically:
- Creates all database tables
- Initializes 21 achievement badges
- Creates default topics
- No manual database setup required!

#### 3. Frontend Setup
```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

#### 4. Access the Application
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000

#### 5. Create Your First Account
- Navigate to http://localhost:8080/register
- Fill in your details (username, email, full name, password)
- Select your skill level (Beginner/Intermediate/Advanced)
- Start taking quizzes!

### Quick Test
```bash
# Backend health check
curl http://localhost:5000/api/health

# Expected response: {"status": "healthy"}
```

---

## 📁 Project Structure

```
Smart-Quizzer-AI/
│
├── backend/                      # Flask backend
│   ├── app.py                   # Main Flask application (90+ API endpoints)
│   ├── models.py                # SQLAlchemy database models (15 models)
│   ├── auth.py                  # JWT authentication logic
│   ├── question_gen.py          # AI question generation service
│   ├── answer_evaluator_simple.py  # Answer evaluation engine
│   ├── content_processor.py     # PDF/document processing
│   ├── badge_service.py         # Achievement badge system
│   ├── analytics_service.py     # Performance analytics
│   ├── learning_path_service.py # Personalized learning paths
│   ├── leaderboard_service.py   # Global leaderboard logic
│   ├── multiplayer_service.py   # Real-time multiplayer features
│   ├── error_handler.py         # Centralized error handling
│   ├── requirements.txt         # Python dependencies
│   ├── instance/
│   │   └── smart_quizzer.db    # SQLite database
│   └── uploads/                 # User-uploaded files
│
├── frontend/                    # React frontend
│   ├── public/
│   │   ├── index.html          # HTML template
│   │   └── favicon.svg         # App icon
│   ├── src/
│   │   ├── index.tsx           # React entry point
│   │   ├── App.tsx             # Main app component
│   │   ├── pages/              # Page components (13 pages)
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Quiz.tsx
│   │   │   ├── Results.tsx
│   │   │   ├── History.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── ContentUploadPage.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── ResetPassword.tsx
│   │   ├── components/         # Reusable components (8 components)
│   │   │   ├── Header.tsx
│   │   │   ├── ContentUpload.tsx
│   │   │   ├── BadgeShowcase.tsx
│   │   │   ├── BadgeProgress.tsx
│   │   │   ├── PerformanceChart.tsx
│   │   │   ├── TopicHeatmap.tsx
│   │   │   ├── WeeklyReport.tsx
│   │   │   └── RecommendationCard.tsx
│   │   ├── lib/
│   │   │   ├── api.ts          # API client (TypeScript)
│   │   │   └── userManager.ts  # User session management
│   │   └── index.css           # Global styles (Tailwind)
│   ├── package.json            # Node dependencies
│   ├── tsconfig.json           # TypeScript config
│   └── tailwind.config.js      # Tailwind CSS config
│
├── LICENSE                      # MIT License
├── README.md                    # This file
├── PROJECT_DOCUMENTATION.md     # Detailed technical documentation
└── SETUP.md                     # Setup and deployment guide
```

---

## 📖 Usage Guide

### For Students

#### 1. Register an Account
- Navigate to http://localhost:8080/register
- Fill in username, email, full name, password
- Select skill level (Beginner/Intermediate/Advanced)
- Click "Create Account"

#### 2. Take a Quiz
- **From Dashboard**: Click "Custom Content Upload" or select a predefined topic
- **Choose Settings**: Select topic, number of questions (5-20), difficulty
- **Answer Questions**: Click answers, receive instant feedback
- **View Results**: See score, explanations, and performance analytics

#### 3. Track Progress
- **Quiz History**: View all past quizzes with detailed results
- **Analytics Dashboard**: Check performance trends, topic mastery
- **Badges**: See earned badges and progress toward new ones
- **Leaderboard**: Compare your rank with other users

#### 4. Custom Content
- **Upload Files**: PDF, DOCX, TXT (max 10MB)
- **Paste Text**: Enter custom text for quiz generation
- **Enter URL**: Extract content from web pages
- **Generate Quiz**: AI creates relevant questions from your content

### For Admins

#### 1. Access Admin Dashboard
- Login with admin account
- Navigate to Admin Dashboard from menu

#### 2. Monitor System
- **User Management**: View all users, update skill levels
- **Flagged Questions**: Review and resolve reported questions
- **Feedback Analysis**: Monitor user feedback on questions
- **Statistics**: View system-wide metrics

#### 3. Manage Content
- **Review Flags**: Approve or reject flagged questions
- **Delete Questions**: Remove problematic questions from database
- **View Leaderboard**: Monitor global rankings

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────┐
│   React Client  │
│   (Frontend)    │
└────────┬────────┘
         │ HTTP/WebSocket
         ▼
┌─────────────────────────────────────┐
│      Flask Backend (app.py)         │
│  ┌────────────┬──────────────────┐ │
│  │   REST     │    WebSocket     │ │
│  │    API     │    (SocketIO)    │ │
│  └─────┬──────┴──────┬───────────┘ │
│        │             │              │
│  ┌─────▼─────────────▼──────────┐  │
│  │   Business Logic Layer       │  │
│  │ ┌─────────────────────────┐  │  │
│  │ │ Question Gen (Gemini AI)│  │  │
│  │ │ Answer Evaluator (NLP)  │  │  │
│  │ │ Badge System            │  │  │
│  │ │ Analytics Engine        │  │  │
│  │ │ Learning Path AI        │  │  │
│  │ │ Multiplayer Manager     │  │  │
│  │ │ Leaderboard Service     │  │  │
│  │ └─────────────────────────┘  │  │
│  └──────────────┬───────────────┘  │
│                 │                   │
│  ┌──────────────▼───────────────┐  │
│  │   SQLAlchemy ORM Layer       │  │
│  └──────────────┬───────────────┘  │
└─────────────────┼───────────────────┘
                  │
         ┌────────▼─────────┐
         │  SQLite Database │
         │   (15 Models)    │
         └──────────────────┘
```

### Data Flow: Quiz Session

1. **User Request**: Frontend sends quiz start request with topic, difficulty, count
2. **Question Generation**: Backend calls Gemini AI to generate questions
3. **Difficulty Classification**: Each question analyzed for Bloom's level and complexity
4. **Storage**: Questions saved to database linked to quiz session
5. **Delivery**: Questions sent to frontend one at a time
6. **Answer Submission**: User answer sent to backend
7. **Evaluation**: NLP-based semantic analysis evaluates correctness
8. **Adaptive Logic**: Difficulty adjusted for next question based on performance
9. **Completion**: Quiz completed, results calculated, leaderboard updated
10. **Badge Award**: Check and award eligible badges
11. **Analytics Update**: Update performance trends and topic mastery

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Key Endpoints

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login (returns JWT)
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile/skill-level` - Update skill level
- `POST /auth/forgot-password` - Request password reset

#### Quiz Management
- `GET /topics` - Get all available topics
- `POST /quiz/start` - Start new quiz session
- `POST /quiz/{id}/answer` - Submit answer
- `POST /quiz/{id}/complete` - Complete quiz
- `GET /quiz/{id}/results` - Get quiz results
- `GET /quiz/history` - Get user quiz history

#### Content Processing
- `POST /content/upload` - Upload file for quiz generation
- `POST /content/process-url` - Extract content from URL
- `POST /questions/generate-from-pdf` - Generate questions from PDF
- `POST /questions/generate-from-text` - Generate questions from text

#### Analytics
- `GET /analytics/trends` - Get performance trends
- `GET /analytics/topic-mastery` - Get topic mastery data
- `GET /analytics/weekly-report` - Get weekly statistics
- `GET /analytics/recommendations` - Get AI recommendations

#### Badges
- `GET /badges/available` - Get all badge definitions
- `GET /user/badges` - Get user's earned badges
- `GET /user/badges/progress` - Get badge progress

#### Learning Paths
- `GET /learning-paths` - Get user's learning paths
- `POST /learning-paths` - Create custom learning path
- `POST /learning-paths/recommended` - Get AI-recommended path
- `GET /learning-paths/{id}/next-quiz` - Get next quiz in path

#### Multiplayer
- `GET /multiplayer/rooms` - List active rooms
- `POST /multiplayer/rooms` - Create new room
- `POST /multiplayer/rooms/{code}/join` - Join room
- `POST /multiplayer/rooms/{code}/start` - Start multiplayer quiz

#### Leaderboard
- `GET /leaderboard` - Get global leaderboard
- `GET /leaderboard/topic/{topic}` - Get topic-specific leaderboard
- `GET /leaderboard/user/{id}` - Get user's ranking

#### Admin
- `GET /admin/stats` - System statistics
- `GET /admin/users` - List all users
- `GET /admin/flagged-questions` - Get flagged questions
- `POST /admin/resolve-flag/{id}` - Resolve flagged question

### WebSocket Events

#### Leaderboard
- `join_leaderboard` - Subscribe to leaderboard updates
- `leave_leaderboard` - Unsubscribe from updates
- `leaderboard_update` - Real-time leaderboard changes

#### Multiplayer
- `multiplayer:join_room` - Join multiplayer room
- `multiplayer:leave_room` - Leave room
- `multiplayer:answer_submit` - Submit answer in real-time
- `multiplayer:next_question` - Request next question
- `multiplayer:game_end` - End multiplayer session
- `multiplayer:chat_message` - Send chat message

---

## 🔮 Future Enhancements

### Planned Features
- [ ] **Voice-based Quizzes**: Speech recognition for hands-free quiz taking
- [ ] **Mobile App**: React Native mobile application
- [ ] **Video Content Processing**: Generate quizzes from video transcripts
- [ ] **Team Competitions**: Group quizzes with team leaderboards
- [ ] **Certification System**: Award certificates for course completion
- [ ] **Offline Mode**: PWA support for offline quiz taking
- [ ] **Multi-language Support**: Internationalization (i18n)
- [ ] **Advanced AI Models**: Support for GPT-4, Claude integration
- [ ] **Social Features**: Friend system, challenge friends
- [ ] **Export Reports**: PDF export of performance analytics
- [ ] **Scheduled Quizzes**: Timed quiz releases for classes
- [ ] **API for Third-party Integration**: Public API for LMS integration

### Performance Optimizations
- [ ] Redis caching layer
- [ ] PostgreSQL migration for production
- [ ] CDN integration for static assets
- [ ] Question pre-generation and caching
- [ ] Database query optimization
- [ ] Frontend code splitting

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit changes**: `git commit -m 'Add AmazingFeature'`
4. **Push to branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Development Guidelines
- Follow PEP 8 for Python code
- Use TypeScript for frontend development
- Write unit tests for new features
- Update documentation for API changes
- Run linters before committing

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mamatha Bachu**
- GitHub: [@BatchuMamatha](https://github.com/BatchuMamatha)
- Repository: [Smart-Quizzer-AI](https://github.com/BatchuMamatha/Smart-Quizzer-AI)

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful question generation capabilities
- **Hugging Face** for sentence-transformers and NLP models
- **React** and **Flask** communities for excellent documentation
- **Contributors** who help improve this project

---

## 📞 Support

For issues, questions, or suggestions:
- **Open an Issue**: [GitHub Issues](https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues)
- **Documentation**: Check [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)
- **Setup Help**: See [SETUP.md](SETUP.md)

---

**Built with ❤️ using AI, React, and Flask**
