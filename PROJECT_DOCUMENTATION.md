# Smart Quizzer AI - Technical Documentation# Smart Quizzer AI - Technical Documentation# Smart Quizzer AI - Adaptive Quiz & Question Generator



**Comprehensive technical documentation for developers, architects, and contributors**



---## Document Information## Complete Project Documentation



## Table of Contents- **Project**: Smart Quizzer AI - Adaptive Learning Platform



1. [Project Overview](#1-project-overview)- **Version**: 1.0.0> **📅 Last Updated:** November 1, 2025  

2. [Architecture](#2-architecture)

3. [Backend Documentation](#3-backend-documentation)- **Last Updated**: November 2025> **📌 Version:** 1.0.0  

4. [Frontend Documentation](#4-frontend-documentation)

5. [Database Schema](#5-database-schema)- **Author**: Mamatha Bachu> **✅ Status:** Fully Functional - Local Development Ready  

6. [API Reference](#6-api-reference)

7. [AI/ML Components](#7-aiml-components)- **Tech Stack**: Flask 3.0.0, React 18.2.0, SQLite, Google Gemini AI> **🔒 Security:** All default credentials removed for safety  

8. [Security](#8-security)

9. [Testing](#9-testing)> **📖 Note:** This documentation reflects the current state of the project after recent security improvements and documentation cleanup.

10. [Deployment](#10-deployment)

11. [Performance](#11-performance)---

12. [Contributing](#12-contributing)

---

---

## Table of Contents

## 1. Project Overview

## Table of Contents

### 1.1 Purpose

1. [System Overview](#1-system-overview)1. [Project Overview](#project-overview)

Smart Quizzer AI is an adaptive learning platform that:

- Generates quizzes from custom content using AI2. [Architecture Design](#2-architecture-design)2. [Project Statement](#project-statement)

- Evaluates answers with semantic understanding

- Adapts difficulty based on user performance3. [Module Documentation](#3-module-documentation)3. [Project Outcomes](#project-outcomes)

- Provides analytics and personalized learning paths

4. [Database Schema](#4-database-schema)4. [System Architecture](#system-architecture)

### 1.2 Technology Stack

5. [API Reference](#5-api-reference)5. [Technology Stack](#technology-stack)

**Backend**

- **Framework**: Flask 3.0.0 (Python 3.13)6. [Frontend Components](#6-frontend-components)6. [Module Implementation](#module-implementation)

- **ORM**: SQLAlchemy 2.0.43

- **Database**: SQLite (dev), PostgreSQL (prod)7. [AI & Machine Learning](#7-ai--machine-learning)7. [Database Schema](#database-schema)

- **AI**: Google Gemini 1.5 Flash

- **NLP**: Sentence-Transformers (all-MiniLM-L6-v2)8. [Workflows](#8-workflows)8. [API Documentation](#api-documentation)

- **Real-time**: Flask-SocketIO 5.4.1

- **Authentication**: JWT (PyJWT 2.10.1)9. [Security & Authentication](#9-security--authentication)9. [Features Implementation](#features-implementation)



**Frontend**10. [Testing](#10-testing)10. [Local Development Setup](#local-development-setup)

- **Framework**: React 18.2.0

- **Language**: TypeScript 4.9.511. [Deployment](#11-deployment)11. [User Guide](#user-guide)

- **Styling**: Tailwind CSS 3.4.17

- **Routing**: React Router 6.28.012. [Troubleshooting](#12-troubleshooting)12. [Admin Guide](#admin-guide)

- **HTTP Client**: Axios 1.7.9

- **Build Tool**: Webpack 513. [Development Timeline](#development-timeline)



**DevOps**---14. [Performance Optimizations](#performance-optimizations)

- **Version Control**: Git

- **Package Management**: pip (backend), npm (frontend)15. [Security Features](#security-features)

- **Environment**: python-dotenv

## 1. System Overview16. [Future Enhancements](#future-enhancements)

### 1.3 Project Structure

17. [Contributing](#contributing)

```

Smart-Quizzer-AI/### 1.1 Project Description18. [License](#license)

│

├── backend/                        # Flask backend application

│   ├── app.py                     # Main Flask app (90+ endpoints)

│   ├── models.py                  # SQLAlchemy models (15 models)Smart Quizzer AI is an adaptive learning platform that uses artificial intelligence to generate personalized quizzes, evaluate answers with semantic understanding, and track user progress through comprehensive analytics. The system employs Google Gemini AI for question generation, NLP models for answer evaluation, and adaptive algorithms for difficulty adjustment.---

│   ├── auth.py                    # Authentication utilities

│   ├── error_handler.py           # Global error handling

│   ├── content_processor.py       # PDF/DOCX/URL parsing

│   ├── question_gen.py            # AI question generation### 1.2 Key Capabilities## 1. Project Overview

│   ├── answer_evaluator_simple.py # Answer evaluation logic

│   ├── analytics_service.py       # Performance analytics

│   ├── badge_service.py           # Achievement system

│   ├── learning_path_service.py   # Learning path generation- **Automated Question Generation**: AI creates contextually relevant questions from custom content**Smart Quizzer AI** is an intelligent, adaptive quiz generation platform that creates personalized assessments from educational content. The system uses advanced NLP and AI techniques to generate dynamic quizzes that adapt to individual learner performance.

│   ├── multiplayer_service.py     # Multiplayer features

│   ├── migrate_db.py              # Database migration script- **Adaptive Difficulty**: Real-time adjustment based on user performance

│   ├── setup_env.py               # Environment setup

│   ├── requirements.txt           # Python dependencies- **Intelligent Evaluation**: NLP-based semantic answer matching with detailed explanations### Key Highlights

│   └── instance/

│       └── smart_quizzer.db       # SQLite database (auto-generated)- **Comprehensive Analytics**: Performance tracking, trend analysis, topic mastery visualization- 🤖 **AI-Powered Question Generation** using Google Gemini AI

│

├── frontend/                       # React frontend application- **Gamification**: 21-badge achievement system with progress tracking- 🎯 **Adaptive Learning Engine** that adjusts difficulty based on performance

│   ├── public/

│   │   ├── index.html            # HTML template- **Real-time Features**: WebSocket-based multiplayer quizzes and live leaderboards- 📚 **Multi-Format Content Support** (Text, PDF, DOCX, JSON, CSV)

│   │   └── favicon.svg           # App icon

│   ├── src/- **Content Processing**: PDF, DOCX, TXT, and URL content extraction- 🌐 **Multi-Question Types** (MCQ, True/False, Fill-in-the-blank, Short Answer)

│   │   ├── index.tsx             # React entry point

│   │   ├── App.tsx               # Main app component- 📊 **Real-time Analytics** and performance tracking

│   │   ├── index.css             # Global styles

│   │   ├── pages/                # Page components (13 pages)### 1.3 System Requirements- 🛡️ **Role-Based Access Control** (Admin/User separation)

│   │   │   ├── Login.tsx

│   │   │   ├── Register.tsx- 🚀 **Optimized Performance** (4-5x faster question generation)

│   │   │   ├── Dashboard.tsx

│   │   │   ├── Quiz.tsx#### Backend Requirements- � **Enhanced Security** (No default credentials, JWT authentication)

│   │   │   ├── Results.tsx

│   │   │   ├── History.tsx- Python 3.13+- 🎤 **Audio Feedback** (Text-to-speech with live captions)

│   │   │   ├── Analytics.tsx

│   │   │   ├── AnalyticsDashboard.tsx- Flask 3.0.0- 🚩 **Content Moderation** (Flag questions and submit feedback)

│   │   │   ├── ProfilePage.tsx

│   │   │   └── ContentUploadPage.tsx- SQLite 3.0+ (or PostgreSQL for production)

│   │   ├── components/           # Reusable components (8 components)

│   │   │   ├── ContentUpload.tsx- Google Gemini API Key---

│   │   │   ├── BadgeProgress.tsx

│   │   │   ├── BadgeShowcase.tsx- 2GB RAM minimum, 4GB recommended

│   │   │   ├── PerformanceChart.tsx

│   │   │   ├── RecommendationCard.tsx- 500MB disk space (excluding uploads)## 2. Project Statement

│   │   │   ├── TopicHeatmap.tsx

│   │   │   └── WeeklyReport.tsx

│   │   └── lib/

│   │       ├── api.ts            # API client (Axios)#### Frontend Requirements### Problem

│   │       └── userManager.ts    # User state management

│   ├── package.json              # Node dependencies- Node.js 16+Learning is not one-size-fits-all. Students and self-learners often struggle to find quizzes that align with their current understanding or preferred learning style. Existing quiz tools offer static, generic questions that do not adapt to individual performance or difficulty preferences.

│   ├── tsconfig.json             # TypeScript config

│   ├── tailwind.config.js        # Tailwind CSS config- npm 8+

│   └── postcss.config.js         # PostCSS config

│- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)### Solution

├── README.md                       # Project overview

├── SETUP.md                        # Installation guide- 1GB RAM minimumThis open-source project addresses the need for personalized, adaptive assessments by generating dynamic quizzes from any educational content (e.g., Wikipedia articles, open textbooks, course material). The system allows users to select difficulty levels and question types and adapts future questions based on performance history.

├── PROJECT_DOCUMENTATION.md        # This file

├── LICENSE                         # MIT License

└── test_custom_content.py          # Backend tests

```#### Network Requirements### Unique Value Propositions



---- Internet connection for AI API calls1. **Dynamic Content-to-Quiz Conversion** - Upload any educational material and get instant quizzes



## 2. Architecture- Ports: 5000 (backend), 8080 (frontend)2. **Adaptive Difficulty Adjustment** - Real-time difficulty calibration based on user performance



### 2.1 System Architecture- WebSocket support for real-time features3. **Advanced Answer Evaluation** - Semantic similarity matching for subjective answers



```4. **Bloom's Taxonomy Integration** - Questions categorized by cognitive complexity

┌─────────────────────────────────────────────────────────────┐

│                        Frontend Layer                        │---5. **Performance Analytics** - Comprehensive insights into learning progress

│  React 18 + TypeScript + Tailwind CSS (Port 8080)          │

│  - Pages (13): Login, Dashboard, Quiz, Analytics, etc.     │

│  - Components (8): BadgeProgress, PerformanceChart, etc.    │

│  - API Client (Axios): HTTP requests + JWT auth            │## 2. Architecture Design---

└─────────────────────────┬───────────────────────────────────┘

                          │ HTTP/HTTPS (REST API)

                          │ WebSocket (Multiplayer)

┌─────────────────────────┴───────────────────────────────────┐### 2.1 High-Level Architecture## 3. Project Outcomes

│                        Backend Layer                         │

│  Flask 3.0 + SQLAlchemy (Port 5000)                         │

│  - 90+ API Endpoints (REST)                                 │

│  - JWT Authentication                                       │```### ✅ Implemented Features

│  - CORS Enabled                                             │

│  - SocketIO (Real-time)                                     │┌───────────────────────────────────────────────────────────┐

└─────────────────────────┬───────────────────────────────────┘

                          ││                     Client Layer                           │#### Core Functionality

        ┌─────────────────┼─────────────────┬─────────────────┐

        │                 │                 │                 ││  ┌─────────────────────────────────────────────────────┐  │- ✅ **Content Upload & Processing**

┌───────┴────────┐ ┌──────┴──────┐ ┌────────┴────────┐ ┌─────┴──────┐

│  Database      │ │  AI Services│ │  NLP Services   │ │  External  ││  │          React Frontend (TypeScript)                │  │  - Upload text files, PDFs, or paste custom content

│  Layer         │ │             │ │                 │ │  Services  │

│                │ │  Google     │ │  Sentence-      │ │            ││  │  - 13 Pages  - 8 Components  - Tailwind CSS        │  │  - Automatic content parsing and segmentation

│  SQLite/       │ │  Gemini     │ │  Transformers   │ │  PDF/DOCX  │

│  PostgreSQL    │ │  1.5 Flash  │ │  (MiniLM-L6-v2) │ │  Parsing   ││  └─────────────────────────────────────────────────────┘  │  - NLP-based knowledge chunk extraction

│                │ │             │ │                 │ │  URL Fetch │

│  15 Tables     │ │  Question   │ │  Answer         │ │            │└───────────────────────────┬───────────────────────────────┘

│                │ │  Generation │ │  Evaluation     │ │            │

└────────────────┘ └─────────────┘ └─────────────────┘ └────────────┘                            │ HTTP/HTTPS + WebSocket- ✅ **Dynamic Question Generation**

```

                            ▼  - Multiple Choice Questions (MCQ)

### 2.2 Request Flow

┌───────────────────────────────────────────────────────────┐  - True/False questions

**Quiz Generation Flow**:

1. User uploads content (PDF/URL) → Frontend sends to `/api/content/upload`│                   Application Layer                        │  - Fill-in-the-blank questions

2. Backend extracts text → `content_processor.py`

3. Text sent to Google Gemini AI → `question_gen.py`│  ┌─────────────────────────────────────────────────────┐  │  - Short answer questions

4. AI generates questions → Stored in database

5. Frontend receives question IDs → Fetches questions one by one│  │         Flask Application (app.py)                  │  │  - Batch generation for 4-5x faster performance



**Answer Evaluation Flow**:│  │  - 90+ REST API Endpoints                           │  │

1. User submits answer → `/api/quiz/{id}/answer`

2. Backend retrieves correct answer from database│  │  - 10 WebSocket Event Handlers                      │  │- ✅ **Adaptive Learning System**

3. Semantic similarity calculated → `answer_evaluator_simple.py`

4. Score computed (0-1) → Compared to threshold (0.7)│  │  - JWT Authentication Middleware                    │  │  - Performance tracking across sessions

5. Feedback generated → Returned to frontend

6. User performance updated → Analytics database│  │  - Error Handling & Logging                         │  │  - Real-time difficulty adjustment



**Adaptive Difficulty Flow**:│  └─────────────────────────────────────────────────────┘  │  - Personalized question recommendations

1. User's recent performance calculated → Last 5 questions

2. Accuracy percentage computed└───────────────────────────┬───────────────────────────────┘  - Consecutive correct/incorrect tracking

3. Difficulty adjusted:

   - 80%+ accuracy → Increase difficulty                            │  - Response time analysis

   - 50%-80% → Maintain difficulty

   - <50% → Decrease difficulty            ┌───────────────┴──────────────┐

4. Next question selected with new difficulty

            ▼                              ▼- ✅ **User Management**

### 2.3 Database Architecture

┌───────────────────────┐      ┌──────────────────────────┐  - Secure registration and login (JWT-based)

```

┌─────────────┐       ┌──────────────┐       ┌─────────────┐│   Business Logic      │      │   External Services      │  - User profiles with skill levels

│    User     │       │  QuizSession │       │  Question   │

│─────────────│       │──────────────│       │─────────────││   ┌───────────────┐   │      │  ┌───────────────────┐  │  - Performance history tracking

│ id (PK)     │◄──────│ id (PK)      │       │ id (PK)     │

│ username    │ 1   * │ user_id (FK) │       │ topic_id    ││   │Question Gen   │   │      │  │ Google Gemini AI  │  │  - Role-based access control (User/Admin)

│ email       │       │ topic_id (FK)│──────►│ text        │

│ password    │       │ score        │ *   1 │ options     ││   │Answer Eval    │   │      │  │ (Question Gen)    │  │

│ skill_level │       │ completed_at │       │ answer      │

│ is_admin    │       │ difficulty   │       │ difficulty  ││   │Badge System   │   │      │  └───────────────────┘  │- ✅ **Admin Dashboard**

└─────────────┘       └──────────────┘       └─────────────┘

      │                      ││   │Analytics Eng  │   │      │  ┌───────────────────┐  │  - User management interface

      │                      │

      │ 1                  * ││   │Learning Paths │   │      │  │ Sentence-BERT     │  │  - Content moderation tools

      ▼                      ▼

┌─────────────┐       ┌──────────────┐│   │Multiplayer    │   │      │  │ (Semantic Match)  │  │  - Flagged question review system

│  UserBadge  │       │PerformTrend  │

│─────────────│       │──────────────││   │Leaderboard    │   │      │  └───────────────────┘  │  - Feedback collection and analysis

│ id (PK)     │       │ id (PK)      │

│ user_id (FK)│       │ session_id   ││   └───────────────┘   │      └──────────────────────────┘  - Platform statistics and analytics

│ badge_id    │       │ accuracy     │

│ earned_at   │       │ avg_time     │└───────────┬───────────┘

└─────────────┘       │ topic_id     │

                      └──────────────┘            │- ✅ **Web Interface**

```

            ▼  - Responsive React-based UI

---

┌───────────────────────────────────────────────────────────┐  - Real-time quiz interface with instant feedback

## 3. Backend Documentation

│                    Data Access Layer                       │  - Progress tracking and visualization

### 3.1 Main Application (app.py)

│  ┌─────────────────────────────────────────────────────┐  │  - Detailed results and explanations

**Key Components**:

│  │         SQLAlchemy ORM (models.py)                  │  │  - Analytics dashboard with charts

```python

# Flask app initialization│  │  - 15 Models with Relationships                     │  │

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/smart_quizzer.db'│  │  - Migration Support                                │  │- ✅ **Development Ready**

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

CORS(app, supports_credentials=True)│  │  - Query Optimization                               │  │  - Automated setup scripts (Windows & Mac/Linux)

socketio = SocketIO(app, cors_allowed_origins="*")

│  └─────────────────────────────────────────────────────┘  │  - Environment-based configuration

# Database initialization

db.init_app(app)└───────────────────────────┬───────────────────────────────┘  - Database initialization with sample data

with app.app_context():

    db.create_all()                            │  - Comprehensive documentation

```

                            ▼  - Local development optimized

**Startup Process**:

1. Load environment variables (`.env`)┌───────────────────────────────────────────────────────────┐

2. Initialize Flask app

3. Configure CORS and SocketIO│                    Database Layer                          │---

4. Initialize database connection

5. Create tables if not exist│  ┌─────────────────────────────────────────────────────┐  │

6. Insert default topics and badges

7. Start server on port 5000│  │         SQLite Database (smart_quizzer.db)          │  │## 4. System Architecture



### 3.2 Models (models.py)│  │  - Users, QuizSessions, Questions                   │  │



#### 3.2.1 User Model│  │  - Badges, Analytics, Leaderboard                   │  │### High-Level Architecture



```python│  │  - Learning Paths, Multiplayer Data                 │  │

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)│  └─────────────────────────────────────────────────────┘  │```

    username = db.Column(db.String(80), unique=True, nullable=False)

    email = db.Column(db.String(120), unique=True, nullable=False)└───────────────────────────────────────────────────────────┘┌─────────────────────────────────────────────────────────────────┐

    password_hash = db.Column(db.String(256), nullable=False)

    skill_level = db.Column(db.String(20))  # Beginner/Intermediate/Advanced```│                         Client Layer                             │

    is_admin = db.Column(db.Boolean, default=False)

    total_points = db.Column(db.Integer, default=0)│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    ### 2.2 Technology Stack│  │ User Web App │  │ Admin Portal │  │ Mobile Ready │          │

    # Relationships

    quiz_sessions = db.relationship('QuizSession', backref='user', lazy=True)│  │   (React)    │  │   (React)    │  │   (PWA)      │          │

    badges = db.relationship('UserBadge', backref='user', lazy=True)

    learning_paths = db.relationship('LearningPath', backref='user', lazy=True)#### Backend Technologies│  └──────────────┘  └──────────────┘  └──────────────┘          │

```

| Component | Technology | Version | Purpose |└─────────────────────────────────────────────────────────────────┘

**Methods**:

- `set_password(password)`: Hash password with SHA-256|-----------|-----------|---------|---------|                              │

- `check_password(password)`: Verify password

- `to_dict()`: Serialize to JSON| Framework | Flask | 3.0.0 | Web application framework |                              ▼



#### 3.2.2 QuizSession Model| ORM | SQLAlchemy | 2.0.43 | Database abstraction |┌─────────────────────────────────────────────────────────────────┐



```python| Database | SQLite | 3.x | Data storage |│                      API Gateway / Nginx                         │

class QuizSession(db.Model):

    id = db.Column(db.Integer, primary_key=True)| Authentication | Flask-JWT-Extended | 4.6.0 | JWT token management |│                    (Load Balancer & Routing)                     │

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'))| WebSocket | Flask-SocketIO | 5.3.6 | Real-time communication |└─────────────────────────────────────────────────────────────────┘

    score = db.Column(db.Integer, default=0)

    total_questions = db.Column(db.Integer, default=10)| Password Hash | Bcrypt | 4.1.2 | Secure password storage |                              │

    current_question_index = db.Column(db.Integer, default=0)

    difficulty = db.Column(db.String(20), default='Medium')| AI Engine | Google Gemini | 1.5 Flash | Question generation |                              ▼

    completed = db.Column(db.Boolean, default=False)

    completed_at = db.Column(db.DateTime)| NLP | Sentence-Transformers | 2.7.0+ | Semantic analysis |┌─────────────────────────────────────────────────────────────────┐

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    | NLP | NLTK | 3.8.0+ | Text processing |│                    Application Layer (Flask)                     │

    # Relationships

    answers = db.relationship('QuestionAnswer', backref='session', lazy=True)| PDF Processing | pdfplumber | 0.11.0+ | PDF text extraction |│  ┌──────────────────────────────────────────────────────────┐  │

    trends = db.relationship('PerformanceTrend', backref='session', lazy=True)

```| Document Parsing | python-docx | 1.1.0+ | DOCX processing |│  │              RESTful API Endpoints                        │  │



#### 3.2.3 Question Model| Web Scraping | BeautifulSoup4 | 4.12.0+ | HTML parsing |│  │  • Authentication    • Quiz Management                    │  │



```python│  │  • User Profiles     • Content Upload                     │  │

class Question(db.Model):

    id = db.Column(db.Integer, primary_key=True)#### Frontend Technologies│  │  • Admin Operations  • Analytics                          │  │

    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'))

    text = db.Column(db.Text, nullable=False)| Component | Technology | Version | Purpose |│  └──────────────────────────────────────────────────────────┘  │

    options = db.Column(db.JSON)  # Multiple choice options

    correct_answer = db.Column(db.Text, nullable=False)|-----------|-----------|---------|---------|└─────────────────────────────────────────────────────────────────┘

    explanation = db.Column(db.Text)

    difficulty = db.Column(db.String(20))  # Easy/Medium/Hard| Framework | React | 18.2.0 | UI framework |                              │

    bloom_level = db.Column(db.String(50))  # Remember/Understand/Apply/Analyze

    question_type = db.Column(db.String(50))  # MCQ/TrueFalse/ShortAnswer| Language | TypeScript | 4.9.5 | Type safety |            ┌─────────────────┼─────────────────┐

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

```| Styling | Tailwind CSS | 3.x | Utility-first CSS |            ▼                 ▼                 ▼



#### 3.2.4 Badge Model| Routing | React Router | 6.x | Client-side routing |┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐



```python| HTTP Client | Axios | 1.x | API communication |│  Business Logic │ │  AI/ML Layer    │ │  Data Layer     │

class Badge(db.Model):

    id = db.Column(db.Integer, primary_key=True)| Build Tool | Webpack | 5.x | Module bundler |│                 │ │                 │ │                 │

    name = db.Column(db.String(100), unique=True, nullable=False)

    description = db.Column(db.Text)│ • Auth Service  │ │ • Gemini AI     │ │ • SQLite/       │

    icon = db.Column(db.String(50))  # trophy, star, medal, etc.

    criteria_type = db.Column(db.String(50))  # quiz_count, accuracy, streak### 2.3 Design Patterns│ • Quiz Engine   │ │ • Question Gen  │ │   PostgreSQL    │

    criteria_value = db.Column(db.Integer)

    points = db.Column(db.Integer, default=100)│ • Adaptive      │ │ • Difficulty    │ │ • User Data     │

    rarity = db.Column(db.String(20))  # Common/Rare/Epic/Legendary

```#### Backend Patterns│   Learning      │ │   Classifier    │ │ • Quiz Sessions │



**21 Default Badges**:1. **MVC Pattern**: Models (models.py), Views (routes in app.py), Controllers (service layer)│ • Answer Eval   │ │ • Answer        │ │ • Questions     │

- First Steps (1 quiz)

- Quiz Enthusiast (10 quizzes)2. **Service Layer Pattern**: Separate business logic (badge_service, analytics_service, etc.)│ • Analytics     │ │   Evaluator     │ │ • Analytics     │

- Perfect Score (100% accuracy)

- Streak Master (7-day streak)3. **Repository Pattern**: SQLAlchemy ORM abstracts database access└─────────────────┘ └─────────────────┘ └─────────────────┘

- Quiz Legend (100 quizzes)

- And 16 more...4. **Factory Pattern**: Database and Flask-SocketIO initialization```



#### 3.2.5 Additional Models5. **Decorator Pattern**: Route decorators, authentication decorators



**PerformanceTrend**: Tracks user performance over time### Component Architecture

**LearningPath**: Personalized learning routes

**LearningMilestone**: Path progress tracking#### Frontend Patterns

**MultiplayerRoom**: Real-time quiz rooms

**MultiplayerParticipant**: Room participants1. **Component-Based Architecture**: Reusable React components```

**QuizLeaderboard**: Global rankings

**FlaggedQuestion**: Question moderation2. **Container/Presentational Pattern**: Smart containers, dumb componentsBackend (Python/Flask)

**QuestionFeedback**: User feedback

**Topic**: Quiz topics3. **Custom Hooks**: useEffect, useState, useCallback for state management├── app.py                          # Main Flask application

**PasswordResetToken**: Password recovery

4. **Centralized API Client**: Single axios instance with interceptors├── models.py                       # Database models (SQLAlchemy)

See `models.py` for complete schema.

├── auth.py                         # JWT authentication

### 3.3 AI Question Generation (question_gen.py)

---├── question_gen.py                 # AI question generator

```python

import google.generativeai as genai├── answer_evaluator_simple.py     # Answer evaluation engine



genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))## 3. Module Documentation├── content_processor.py            # Content parsing & segmentation

model = genai.GenerativeModel('gemini-1.5-flash')

├── error_handler.py                # Centralized error handling

def generate_questions_ai(text, num_questions=10, difficulty='Medium'):

    """### Module 1: User Input & Topic Selection└── requirements.txt                # Python dependencies

    Generate quiz questions from content using Google Gemini AI

    

    Args:

        text (str): Source content**Files**: `frontend/src/pages/Dashboard.tsx`, `backend/app.py` (topic endpoints)Frontend (React/TypeScript)

        num_questions (int): Number of questions to generate

        difficulty (str): Easy/Medium/Hard├── src/

    

    Returns:**Purpose**: Allows users to select quiz topics, configure quiz parameters, and start quiz sessions.│   ├── components/

        list: Question dictionaries

    """│   │   └── ContentUpload.tsx       # Content upload component

    prompt = f"""

    Generate {num_questions} quiz questions from this content.**Key Features**:│   ├── pages/

    Difficulty: {difficulty}

    - Topic selection from 20+ predefined topics│   │   ├── Login.tsx               # Authentication pages

    Format:

    1. Question text- Custom quiz parameters (question count, difficulty, skill level)│   │   ├── Register.tsx

    2. Answer

    3. Explanation- Custom content upload (PDF, DOCX, TXT, URL)│   │   ├── Dashboard.tsx           # User dashboard

    4. Bloom's taxonomy level

    5. Question type (MCQ/TrueFalse/ShortAnswer)- Topic categories: Science, Technology, Mathematics, Arts, etc.│   │   ├── Quiz.tsx                # Quiz interface

    

    Content:│   │   ├── Results.tsx             # Results display

    {text[:5000]}  # Limit to 5000 chars

    """**Implementation Details**:│   │   ├── History.tsx             # Quiz history

    

    response = model.generate_content(prompt)```python│   │   ├── Analytics.tsx           # Performance analytics

    questions = parse_ai_response(response.text)

    return questions# Backend: Topic Model│   │   ├── AdminDashboard.tsx      # Admin interface

```

class Topic(db.Model):│   │   └── ProfilePage.tsx         # User profile

**Process**:

1. Configure Gemini API with key    id = db.Column(db.Integer, primary_key=True)│   ├── lib/

2. Create structured prompt with difficulty

3. Send content (max 5000 chars) to AI    name = db.Column(db.String(100), unique=True, nullable=False)│   │   ├── api.ts                  # API client

4. Parse JSON response

5. Validate question structure    description = db.Column(db.Text)│   │   └── userManager.ts          # User state management

6. Store in database

    category = db.Column(db.String(50))│   └── App.tsx                     # Main React app

**Error Handling**:

- API key missing → Return error message    is_active = db.Column(db.Boolean, default=True)└── package.json

- Rate limit exceeded → Retry with exponential backoff

- Invalid response → Log error, return empty list```



### 3.4 Answer Evaluation (answer_evaluator_simple.py)Deployment



```python**API Endpoints**:├── docker-compose.yml              # Multi-container orchestration

from sentence_transformers import SentenceTransformer

from sklearn.metrics.pairwise import cosine_similarity- `GET /api/topics` - Fetch all active topics├── backend/Dockerfile              # Backend container



model = SentenceTransformer('all-MiniLM-L6-v2')├── frontend/Dockerfile             # Frontend container



def evaluate_answer(user_answer, correct_answer, threshold=0.7):**Workflow**:└── nginx.conf                      # Reverse proxy config

    """

    Evaluate answer using semantic similarity1. User navigates to Dashboard```

    

    Args:2. Frontend fetches topics from backend

        user_answer (str): User's submitted answer

        correct_answer (str): Correct answer from database3. User selects topic or uploads custom content### Data Flow Architecture

        threshold (float): Similarity threshold (0.0-1.0)

    4. User configures quiz parameters

    Returns:

        dict: {5. Frontend sends quiz start request```

            'is_correct': bool,

            'similarity': float,6. Backend creates quiz session and generates questionsUser Action → Frontend → API Gateway → Flask Backend

            'feedback': str

        }                                           ↓

    """

    # Normalize inputs---                                    Authentication

    user_answer = user_answer.strip().lower()

    correct_answer = correct_answer.strip().lower()                                           ↓

    

    # Exact match check### Module 2: AI-Based Question Generation                                    Business Logic

    if user_answer == correct_answer:

        return {                                           ↓

            'is_correct': True,

            'similarity': 1.0,**Files**: `backend/question_gen.py`, `backend/content_processor.py`                    ┌──────────────────────┼──────────────────────┐

            'feedback': 'Perfect match!'

        }                    ▼                      ▼                      ▼

    

    # Semantic similarity**Purpose**: Generates high-quality, contextually relevant questions using Google Gemini AI.            AI Processing           Database Query        Content Processing

    embeddings = model.encode([user_answer, correct_answer])

    similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]            (Gemini AI)             (SQLAlchemy)          (NLP Pipeline)

    

    is_correct = similarity >= threshold**Key Components**:                    │                      │                      │

    

    feedback = generate_feedback(similarity, is_correct)                    └──────────────────────┴──────────────────────┘

    

    return {#### 2.1 Question Generator (`question_gen.py`)                                           ↓

        'is_correct': is_correct,

        'similarity': float(similarity),```python                                    Response Formation

        'feedback': feedback

    }class QuestionGenerator:                                           ↓

```

    def __init__(self):                                    Frontend Update

**Similarity Thresholds**:

- 1.0: Exact match        self.model = genai.GenerativeModel('gemini-1.5-flash')                                           ↓

- 0.9-0.99: Excellent answer

- 0.8-0.89: Very good answer        self.generation_config = {                                    User Interface

- 0.7-0.79: Good answer (threshold)

- 0.6-0.69: Partially correct            'temperature': 0.7,```

- <0.6: Incorrect

            'top_p': 0.95,

### 3.5 Service Modules

            'max_output_tokens': 2048---

#### Analytics Service (analytics_service.py)

        }

```python

def get_performance_trends(user_id, days=30, topic_id=None):    ## 5. Technology Stack

    """Get performance trends over time"""

    # Query PerformanceTrend table    def generate_questions(self, topic, difficulty, count):

    # Calculate: accuracy, avg_time, topics_mastered

    # Return time-series data        # AI prompt engineering for question generation### Backend Technologies



def get_topic_mastery(user_id):        # Includes Bloom's taxonomy levels| Technology | Purpose | Version |

    """Calculate mastery level for each topic"""

    # Query quiz sessions by topic        # Returns structured JSON with questions, options, answers|------------|---------|---------|

    # Calculate accuracy per topic

    # Return heatmap data```| **Python** | Backend language | 3.9+ |



def generate_recommendations(user_id):| **Flask** | Web framework | 2.3.0 |

    """AI-generated study recommendations"""

    # Analyze weak areas#### 2.2 Content Processor (`content_processor.py`)| **SQLAlchemy** | ORM | 2.0.0 |

    # Suggest topics to improve

    # Return personalized recommendations```python| **SQLite/PostgreSQL** | Database | - |

```

class ContentProcessor:| **Google Gemini AI** | Question generation | Latest |

#### Badge Service (badge_service.py)

    def extract_from_pdf(self, file_path):| **JWT** | Authentication | PyJWT 2.8.0 |

```python

def check_badge_eligibility(user_id):        # Uses pdfplumber for accurate text extraction| **spaCy** | NLP processing | 3.5.0 |

    """Check if user earned new badges"""

    user = User.query.get(user_id)        # Handles multi-column layouts, tables| **NLTK** | Text analysis | 3.8 |

    earned_badges = []

            | **Pandas** | Data analysis | 2.0.0 |

    for badge in Badge.query.all():

        if badge.criteria_type == 'quiz_count':    def extract_from_docx(self, file_path):| **BCrypt** | Password hashing | 4.0.0 |

            if user.quiz_sessions.count() >= badge.criteria_value:

                award_badge(user_id, badge.id)        # Extracts text from Word documents| **Requests** | HTTP client | 2.31.0 |

                earned_badges.append(badge)

            

    return earned_badges

```    def extract_from_url(self, url):### Frontend Technologies



#### Learning Path Service (learning_path_service.py)        # Web scraping with BeautifulSoup| Technology | Purpose | Version |



```python        # Handles various HTML structures|------------|---------|---------|

def create_learning_path(user_id, goal_topics):

    """Create personalized learning path"""```| **React** | UI library | 18.2.0 |

    # Analyze user's current level

    # Determine prerequisites| **TypeScript** | Type safety | 5.0.0 |

    # Generate milestone sequence

    # Return structured path**Question Types**:| **React Router** | Routing | 6.11.0 |



def update_milestone_progress(user_id, milestone_id):1. **Multiple Choice** (4 options)| **Axios** | HTTP client | 1.4.0 |

    """Update learning path progress"""

    # Mark milestone completed2. **True/False**| **Tailwind CSS** | Styling | 3.3.0 |

    # Unlock next milestone

    # Award points3. **Short Answer** (open-ended)| **Recharts** | Data visualization | 2.5.0 |

```



#### Multiplayer Service (multiplayer_service.py)

**Bloom's Taxonomy Levels**:### DevOps & Deployment

```python

@socketio.on('create_room')- **Remember**: Basic recall (Level 1)| Technology | Purpose |

def handle_create_room(data):

    """Create multiplayer quiz room"""- **Understand**: Comprehension (Level 2)|------------|---------|

    room_code = generate_room_code()

    room = MultiplayerRoom(- **Apply**: Application (Level 3)| **Docker** | Containerization |

        room_code=room_code,

        created_by=data['user_id'],- **Analyze**: Analysis (Level 4)| **Docker Compose** | Multi-container orchestration |

        topic_id=data['topic_id']

    )- **Evaluate**: Evaluation (Level 5)| **Nginx** | Reverse proxy & load balancing |

    db.session.add(room)

    db.session.commit()- **Create**: Synthesis (Level 6)| **Git** | Version control |

    emit('room_created', {'room_code': room_code})



@socketio.on('join_room')

def handle_join_room(data):**API Endpoints**:### AI/ML Libraries

    """Join existing room"""

    room = MultiplayerRoom.query.filter_by(room_code=data['room_code']).first()- `POST /api/questions/generate` - Generate questions from topic- **Google Generative AI** - Question generation

    participant = MultiplayerParticipant(

        room_id=room.id,- `POST /api/questions/generate-from-pdf` - Generate from uploaded PDF- **Transformers (Hugging Face)** - Optional local models

        user_id=data['user_id']

    )- `POST /api/questions/generate-from-text` - Generate from pasted text- **Sentence Transformers** - Semantic similarity

    db.session.add(participant)

    join_room(data['room_code'])- `POST /api/content/upload` - Upload file for processing- **NLTK/spaCy** - NLP preprocessing

    emit('user_joined', {'username': data['username']}, room=data['room_code'])

```- `POST /api/content/process-url` - Extract content from URL



------



## 4. Frontend Documentation---



### 4.1 Application Structure## 6. Module Implementation



**Entry Point**: `src/index.tsx`### Module 3: Difficulty Classification



```tsx### Module 1: User & Profile Management ✅

import React from 'react';

import ReactDOM from 'react-dom/client';**Files**: `backend/question_gen.py` (DifficultyClassifier class)

import App from './App';

import './index.css';#### Features Implemented



const root = ReactDOM.createRoot(document.getElementById('root')!);**Purpose**: Classifies question difficulty using multi-factor analysis for adaptive quiz generation.1. **User Registration**

root.render(

  <React.StrictMode>   - Email-based signup

    <App />

  </React.StrictMode>**Classification Algorithm**:   - Password strength validation

);

``````python   - Secure password hashing (BCrypt)



**Main App**: `src/App.tsx`class DifficultyClassifier:   - Duplicate user prevention



```tsx    def __init__(self):

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';        self.weights = {2. **User Authentication**

import Dashboard from './pages/Dashboard';

// ... other imports            'bloom_taxonomy': 0.40,  # 40% weight   - JWT-based token authentication



function App() {            'semantic_complexity': 0.30,  # 30% weight   - Secure login system

  return (

    <BrowserRouter>            'text_metrics': 0.20,  # 20% weight   - Token refresh mechanism

      <Routes>

        <Route path="/login" element={<Login />} />            'historical_data': 0.10  # 10% weight   - Session management

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />        }

        <Route path="/quiz/:topicId" element={<Quiz />} />

        <Route path="/results/:sessionId" element={<Results />} />    3. **User Profiles**

        <Route path="/analytics" element={<Analytics />} />

        {/* ... other routes */}    def classify_difficulty(self, question_text, bloom_level, correct_rate=None):   - Personal information management

      </Routes>

    </BrowserRouter>        # Factor 1: Bloom's Taxonomy mapping   - Skill level selection (Beginner/Intermediate/Advanced)

  );

}        bloom_score = self._bloom_to_score(bloom_level)   - Profile customization

```

           - Performance history tracking

### 4.2 API Client (lib/api.ts)

        # Factor 2: Semantic complexity (sentence embeddings)

```typescript

import axios from 'axios';        semantic_score = self._semantic_complexity(question_text)4. **Role-Based Access Control**



const API_BASE_URL = 'http://localhost:5000';           - User role (quiz taker)



const api = axios.create({        # Factor 3: Text metrics (readability, sentence length)   - Admin role (content moderator)

  baseURL: API_BASE_URL,

  headers: {        text_score = self._text_complexity(question_text)   - Automatic route protection

    'Content-Type': 'application/json',

  },           - Permission-based features

});

        # Factor 4: Historical performance data

// Request interceptor (add JWT token)

api.interceptors.request.use((config) => {        historical_score = self._historical_difficulty(correct_rate)#### API Endpoints

  const token = localStorage.getItem('access_token');

  if (token) {        ```

    config.headers.Authorization = `Bearer ${token}`;

  }        # Weighted combinationPOST   /api/auth/register          # User registration

  return config;

});        final_score = (POST   /api/auth/login             # User login



// Response interceptor (handle errors)            bloom_score * self.weights['bloom_taxonomy'] +GET    /api/auth/profile           # Get user profile

api.interceptors.response.use(

  (response) => response,            semantic_score * self.weights['semantic_complexity'] +PUT    /api/auth/profile/skill-level  # Update skill level

  (error) => {

    if (error.response?.status === 401) {            text_score * self.weights['text_metrics'] +```

      localStorage.removeItem('access_token');

      window.location.href = '/login';            historical_score * self.weights['historical_data']

    }

    return Promise.reject(error);        )#### Database Schema

  }

);        ```sql



// API methods        # Map to difficulty levelCREATE TABLE users (

export const authAPI = {

  login: (username: string, password: string) =>        if final_score < 0.33:    id INTEGER PRIMARY KEY,

    api.post('/api/auth/login', { username, password }),

              return 'Easy'    username VARCHAR(80) UNIQUE NOT NULL,

  register: (data: RegisterData) =>

    api.post('/api/auth/register', data),        elif final_score < 0.67:    email VARCHAR(120) UNIQUE NOT NULL,

  

  getProfile: () =>            return 'Medium'    password_hash VARCHAR(128) NOT NULL,

    api.get('/api/auth/profile'),

};        else:    full_name VARCHAR(100) NOT NULL,



export const quizAPI = {            return 'Hard'    skill_level VARCHAR(20) DEFAULT 'Beginner',

  startQuiz: (topicId: number, difficulty: string) =>

    api.post('/api/quiz/start', { topic_id: topicId, difficulty }),```    role VARCHAR(20) DEFAULT 'user',

  

  submitAnswer: (sessionId: number, questionId: number, answer: string) =>    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    api.post(`/api/quiz/${sessionId}/answer`, { question_id: questionId, answer }),

  **Difficulty Levels**:    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

  completeQuiz: (sessionId: number) =>

    api.post(`/api/quiz/${sessionId}/complete`),- **Easy**: Beginner-friendly, basic recall);

};

- **Medium**: Intermediate, requires understanding```

export const analyticsAPI = {

  getTrends: (days: number, topicId?: number) =>- **Hard**: Advanced, analysis and synthesis

    api.get('/api/analytics/trends', { params: { days, topic_id: topicId } }),

  ---

  getTopicMastery: () =>

    api.get('/api/analytics/topic-mastery'),---

  

  getRecommendations: () =>### Module 2: Content Ingestion & Parsing ✅

    api.get('/api/analytics/recommendations'),

};### Module 4: Adaptive Quiz Engine



export default api;#### Features Implemented

```

**Files**: `backend/app.py` (adaptive quiz logic)1. **Content Upload Methods**

### 4.3 Key Pages

   - Text paste (direct input)

#### 4.3.1 Dashboard (pages/Dashboard.tsx)

**Purpose**: Dynamically adjusts question difficulty based on real-time user performance.   - PDF file upload

```tsx

const Dashboard: React.FC = () => {   - URL scraping (future enhancement)

  const [topics, setTopics] = useState<Topic[]>([]);

  const [recentSessions, setRecentSessions] = useState<QuizSession[]>([]);**Adaptive Algorithm**:   - Multiple file format support

  

  useEffect(() => {```python

    fetchTopics();

    fetchRecentSessions();def get_next_difficulty(current_difficulty, is_correct, consecutive_correct, consecutive_wrong):2. **Content Processing Pipeline**

  }, []);

      """   ```python

  const fetchTopics = async () => {

    const response = await api.get('/api/topics');    Adaptive difficulty adjustment algorithm   Raw Content → Cleaning → Segmentation → Knowledge Chunks

    setTopics(response.data);

  };       ```

  

  return (    Rules:

    <div className="dashboard">

      <h1>Select a Topic</h1>    1. 3 consecutive correct → increase difficulty3. **NLP-Based Processing**

      <div className="topic-grid">

        {topics.map(topic => (    2. 2 consecutive wrong → decrease difficulty   - Text normalization

          <TopicCard key={topic.id} topic={topic} />

        ))}    3. Perfect score (100%) → increase difficulty   - Sentence segmentation

      </div>

      <RecentActivity sessions={recentSessions} />    4. Low score (<50%) → decrease difficulty   - Paragraph extraction

    </div>

  );    """   - Content summarization

};

```    if consecutive_correct >= 3:   - Keyword extraction



#### 4.3.2 Quiz (pages/Quiz.tsx)        return upgrade_difficulty(current_difficulty)



```tsx    elif consecutive_wrong >= 2:4. **Content Validation**

const Quiz: React.FC = () => {

  const { sessionId } = useParams();        return downgrade_difficulty(current_difficulty)   - Minimum content length (10 characters)

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const [userAnswer, setUserAnswer] = useState('');    else:   - Maximum content size (10MB)

  const [feedback, setFeedback] = useState<Feedback | null>(null);

          return current_difficulty   - Format validation

  const handleSubmitAnswer = async () => {

    const response = await quizAPI.submitAnswer(```   - Encoding detection

      sessionId,

      currentQuestion.id,

      userAnswer

    );**Adjustment Logic**:#### API Endpoints

    

    setFeedback(response.data.feedback);1. **Track Performance**: Monitor correct/wrong answers in real-time```

    

    if (response.data.is_correct) {2. **Calculate Streaks**: Count consecutive correct/incorrect answersPOST   /api/content/upload         # Upload custom content

      setScore(score + 1);

    }3. **Apply Rules**: Use threshold-based rules for adjustmentPOST   /api/quiz/start             # Start quiz with content

    

    // Load next question after 3 seconds4. **Generate Next Question**: Request question at adjusted difficulty```

    setTimeout(() => {

      fetchNextQuestion();5. **Update Session**: Store difficulty change in quiz session

    }, 3000);

  };#### Content Processor Architecture

  

  return (**Performance Metrics**:```python

    <div className="quiz-container">

      <QuizHeader score={score} questionNumber={currentIndex} />- Current score percentageclass ContentProcessor:

      <QuestionDisplay question={currentQuestion} />

      <AnswerInput value={userAnswer} onChange={setUserAnswer} />- Average time per question    def process_text(text: str) -> ProcessedContent:

      <button onClick={handleSubmitAnswer}>Submit</button>

      {feedback && <FeedbackDisplay feedback={feedback} />}- Difficulty distribution        # 1. Clean and normalize

    </div>

  );- Streak length        cleaned = self.clean_text(text)

};

```        



#### 4.3.3 Analytics Dashboard (pages/AnalyticsDashboard.tsx)---        # 2. Segment into chunks



```tsx        chunks = self.segment_content(cleaned)

const AnalyticsDashboard: React.FC = () => {

  const [activeTab, setActiveTab] = useState('overview');### Module 5: Answer Evaluation & Feedback        

  const [trends, setTrends] = useState<PerformanceTrend[]>([]);

  const [topicMastery, setTopicMastery] = useState<TopicMastery[]>([]);        # 3. Extract metadata

  

  useEffect(() => {**Files**: `backend/answer_evaluator_simple.py`        metadata = self.extract_metadata(chunks)

    fetchTrends();

    fetchTopicMastery();        

  }, []);

  **Purpose**: Evaluates user answers using semantic similarity and provides detailed feedback.        # 4. Return processed content

  return (

    <div className="analytics-dashboard">        return ProcessedContent(chunks, metadata)

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      **Evaluation Engine**:```

      {activeTab === 'overview' && (

        <>```python

          <PerformanceChart trends={trends} />

          <TopicHeatmap mastery={topicMastery} />class AnswerEvaluator:---

          <WeeklyReport />

        </>    def __init__(self):

      )}

              self.model = SentenceTransformer('all-MiniLM-L6-v2')### Module 3: Question Generator Engine ✅

      {activeTab === 'badges' && (

        <BadgeShowcase />        self.similarity_threshold = 0.75  # 75% similarity for correctness

      )}

          #### Features Implemented

      {activeTab === 'recommendations' && (

        <RecommendationList />    def evaluate_answer(self, user_answer, correct_answer, question_type):1. **AI-Powered Generation**

      )}

    </div>        if question_type in ['MCQ', 'True/False']:   - Google Gemini AI integration

  );

};            # Exact match for structured questions   - Batch generation (5 questions in 1 API call)

```

            return user_answer.lower() == correct_answer.lower()   - Optimized for speed (4-5x faster)

### 4.4 Reusable Components

           - Automatic retry mechanism

#### PerformanceChart (components/PerformanceChart.tsx)

        elif question_type == 'Short Answer':

```tsx

interface PerformanceChartProps {            # Semantic similarity for open-ended questions2. **Question Types**

  days: number;

  topic?: number;            user_embedding = self.model.encode(user_answer)   - **Multiple Choice Questions (MCQ)**

}

            correct_embedding = self.model.encode(correct_answer)     - 4 options per question

const PerformanceChart: React.FC<PerformanceChartProps> = ({ days, topic }) => {

  const [trends, setTrends] = useState<Trend[]>([]);                 - Plausible distractors

  

  const loadTrends = useCallback(async () => {            similarity = cosine_similarity([user_embedding], [correct_embedding])[0][0]     - Single correct answer

    const response = await analyticsAPI.getTrends(days, topic);

    setTrends(response.data);               

  }, [days, topic]);

              is_correct = similarity >= self.similarity_threshold   - **True/False Questions**

  useEffect(() => {

    loadTrends();            confidence = similarity * 100     - Statement validation

  }, [loadTrends]);

                   - Clear true/false distinction

  return (

    <div className="chart-container">            return {   

      <LineChart data={trends} xAxis="date" yAxis="accuracy" />

    </div>                'is_correct': is_correct,   - **Fill-in-the-Blank**

  );

};                'confidence': confidence,     - Context-based blanks

```

                'similarity_score': similarity     - Word/phrase completion

#### BadgeShowcase (components/BadgeShowcase.tsx)

            }   

```tsx

const BadgeShowcase: React.FC = () => {```   - **Short Answer**

  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);

  const [availableBadges, setAvailableBadges] = useState<Badge[]>([]);     - Open-ended responses

  

  useEffect(() => {**Feedback Generation**:     - Semantic evaluation

    fetchBadges();

  }, []);1. **Immediate Feedback**: Show correct/incorrect status instantly

  

  return (2. **Detailed Explanation**: AI-generated explanation for each question3. **Difficulty Classification**

    <div className="badge-showcase">

      <h2>Your Badges ({earnedBadges.length})</h2>3. **Semantic Analysis**: For short answers, show similarity percentage   - Bloom's Taxonomy integration

      <div className="badge-grid">

        {earnedBadges.map(badge => (4. **Improvement Tips**: Suggestions based on mistake patterns   - 6 cognitive levels:

          <BadgeCard key={badge.id} badge={badge} earned={true} />

        ))}     - Remember (Basic)

      </div>

      **Grading Rules**:     - Understand (Basic)

      <h3>Available Badges</h3>

      <div className="badge-grid">- MCQ/True-False: Binary (correct/incorrect)     - Apply (Intermediate)

        {availableBadges.map(badge => (

          <BadgeCard key={badge.id} badge={badge} earned={false} />- Short Answer: Threshold-based (75%+ similarity = correct)     - Analyze (Intermediate)

        ))}

      </div>- Partial Credit: Not currently supported (future enhancement)     - Evaluate (Advanced)

    </div>

  );     - Create (Advanced)

};

```---



---4. **Question Quality Assurance**



## 5. Database Schema### Module 6: User Profile & Progress Tracking   - Uniqueness checking



### 5.1 Entity Relationship Diagram   - Difficulty validation



```**Files**: `backend/models.py` (User, QuizSession), `backend/analytics_service.py`   - Content relevance scoring

User (1) ──── (M) QuizSession

  │                  │   - Grammar checking

  │                  │

  │                  └──── (M) PerformanceTrend**Purpose**: Tracks user performance, generates analytics, and provides personalized insights.

  │

  ├──── (M) UserBadge ──── (1) Badge#### Question Generation Pipeline

  │

  └──── (M) LearningPath ──── (M) LearningMilestone**User Model**:



Topic (1) ──── (M) Question```python```

  │

  └──── (M) QuizSessionclass User(db.Model):Content Input



MultiplayerRoom (1) ──── (M) MultiplayerParticipant ──── (1) User    id = db.Column(db.Integer, primary_key=True)    ↓



Question (1) ──── (M) FlaggedQuestion    username = db.Column(db.String(80), unique=True, nullable=False)AI Prompt Construction

  │

  └──── (M) QuestionFeedback    email = db.Column(db.String(120), unique=True, nullable=False)    ↓

```

    password_hash = db.Column(db.String(255), nullable=False)Gemini AI API Call

### 5.2 Table Definitions

    full_name = db.Column(db.String(200))    ↓

**User Table**:

```sql    skill_level = db.Column(db.String(20), default='Beginner')  # Beginner/Intermediate/AdvancedResponse Parsing

CREATE TABLE user (

    id INTEGER PRIMARY KEY,    role = db.Column(db.String(20), default='user')  # user/admin    ↓

    username VARCHAR(80) UNIQUE NOT NULL,

    email VARCHAR(120) UNIQUE NOT NULL,    created_at = db.Column(db.DateTime, default=datetime.utcnow)Difficulty Classification

    password_hash VARCHAR(256) NOT NULL,

    skill_level VARCHAR(20),        ↓

    is_admin BOOLEAN DEFAULT 0,

    total_points INTEGER DEFAULT 0,    # RelationshipsQuality Validation

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);    quiz_sessions = db.relationship('QuizSession', backref='user', lazy=True)    ↓

```

    badges = db.relationship('UserBadge', backref='user', lazy=True)Question Storage

**QuizSession Table**:

```sql    performance_trends = db.relationship('PerformanceTrend', backref='user', lazy=True)```

CREATE TABLE quiz_session (

    id INTEGER PRIMARY KEY,```

    user_id INTEGER NOT NULL,

    topic_id INTEGER NOT NULL,#### API Endpoints

    score INTEGER DEFAULT 0,

    total_questions INTEGER DEFAULT 10,**Analytics Features**:```

    current_question_index INTEGER DEFAULT 0,

    difficulty VARCHAR(20) DEFAULT 'Medium',POST   /api/questions/generate     # Generate questions

    completed BOOLEAN DEFAULT 0,

    completed_at DATETIME,#### 6.1 Performance TrendsPOST   /api/quiz/next              # Get adaptive next question

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES user(id),```python```

    FOREIGN KEY (topic_id) REFERENCES topic(id)

);class PerformanceTrend(db.Model):

```

    id = db.Column(db.Integer, primary_key=True)#### Performance Optimizations

**Question Table**:

```sql    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))| Optimization | Impact |

CREATE TABLE question (

    id INTEGER PRIMARY KEY,    date = db.Column(db.Date, nullable=False)|--------------|--------|

    topic_id INTEGER NOT NULL,

    text TEXT NOT NULL,    quizzes_taken = db.Column(db.Integer, default=0)| Batch generation | 60-80% faster |

    options JSON,

    correct_answer TEXT NOT NULL,    total_questions = db.Column(db.Integer, default=0)| Reduced retries (3→2) | 10-30s saved |

    explanation TEXT,

    difficulty VARCHAR(20),    correct_answers = db.Column(db.Integer, default=0)| Faster timeout (30s→15s) | 50% faster failures |

    bloom_level VARCHAR(50),

    question_type VARCHAR(50),    average_score = db.Column(db.Float, default=0.0)| Higher temperature (0.7→0.9) | 1-3s per question |

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (topic_id) REFERENCES topic(id)    average_time_per_question = db.Column(db.Float, default=0.0)| Relaxed validation | 2-5s per question |

);

```    topics_covered = db.Column(db.JSON)  # List of topics attempted



See `models.py` for complete schema with 15 tables.```**Total Speed Improvement: 4-5x faster** (75s → 15s for 5 questions)



### 5.3 Indexes



```sql#### 6.2 Topic Mastery---

CREATE INDEX idx_user_email ON user(email);

CREATE INDEX idx_quiz_session_user ON quiz_session(user_id);- Tracks performance per topic

CREATE INDEX idx_quiz_session_topic ON quiz_session(topic_id);

CREATE INDEX idx_question_topic ON question(topic_id);- Calculates mastery percentage (0-100%)### Module 4: Adaptive Learning Engine ✅

CREATE INDEX idx_question_difficulty ON question(difficulty);

CREATE INDEX idx_performance_trend_session ON performance_trend(session_id);- Identifies strengths and weaknesses

```

- Visual heatmap representation#### Features Implemented

---

1. **Performance Tracking**

## 6. API Reference

#### 6.3 Learning Streaks   - Question-by-question results

### 6.1 Authentication Endpoints

- Daily login streaks   - Accuracy calculation

#### POST /api/auth/register

- Quiz completion streaks   - Response time tracking

**Description**: Register new user account

- Topic-specific streaks   - Consecutive correct/incorrect streaks

**Request Body**:

```json- Streak badges and rewards   - Performance trends over time

{

  "username": "john_doe",

  "email": "john@example.com",

  "password": "SecurePassword123",**API Endpoints**:2. **Adaptive Difficulty Adjustment**

  "skill_level": "Intermediate"

}- `GET /api/auth/profile` - Get user profile   ```python

```

- `GET /api/quiz/history` - Get quiz history   Performance Metrics → Difficulty Analysis → Next Level Recommendation

**Response** (201 Created):

```json- `GET /api/analytics/trends?days=30` - Get performance trends   ```

{

  "message": "User registered successfully",- `GET /api/analytics/topic-mastery` - Get topic mastery data

  "user": {

    "id": 1,- `GET /api/analytics/weekly-report` - Get weekly statistics3. **Adaptation Algorithm**

    "username": "john_doe",

    "email": "john@example.com",- `GET /api/analytics/recommendations` - Get AI recommendations   ```python

    "skill_level": "Intermediate",

    "created_at": "2025-01-01T10:00:00Z"   def determine_next_difficulty(current_performance):

  }

}---       if accuracy >= 0.80 and confidence >= 0.7:

```

           return "promote_to_higher_difficulty"

**Errors**:

- 400: Username/email already exists### Module 7: Quiz Interface (Frontend)       elif accuracy <= 0.40:

- 422: Invalid input data

           return "demote_to_easier_difficulty"

#### POST /api/auth/login

**Files**: `frontend/src/pages/Quiz.tsx`, `frontend/src/pages/Results.tsx`       else:

**Description**: Login and receive JWT tokens

           return "maintain_current_difficulty"

**Request Body**:

```json**Purpose**: Interactive quiz-taking interface with real-time feedback and timer.   ```

{

  "username": "john_doe",

  "password": "SecurePassword123"

}**Quiz Flow**:4. **Metrics Tracked**

```

1. **Quiz Start**: Display first question   - Total questions attempted

**Response** (200 OK):

```json2. **Question Display**: Show question text, options, timer   - Correct answers count

{

  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",3. **Answer Selection**: User clicks answer   - Accuracy percentage

  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

  "user": {4. **Immediate Feedback**: Show correct/incorrect with explanation   - Average response time

    "id": 1,

    "username": "john_doe",5. **Next Question**: Load next question (adaptive difficulty)   - Difficulty progression

    "email": "john@example.com",

    "is_admin": false6. **Quiz Completion**: Show final results with detailed breakdown   - Learning curve analysis

  }

}

```

**Key Components**:5. **Personalization Features**

**Errors**:

- 401: Invalid credentials```typescript   - User-specific difficulty profiles

- 404: User not found

interface QuizState {   - Question type preferences

#### GET /api/auth/profile

    quizId: number;   - Topic mastery levels

**Description**: Get current user profile

    currentQuestionIndex: number;   - Weak area identification

**Headers**:

```    totalQuestions: number;

Authorization: Bearer {access_token}

```    questions: Question[];#### Adaptive Engine Architecture



**Response** (200 OK):    answers: UserAnswer[];

```json

{    score: number;```python

  "id": 1,

  "username": "john_doe",    timeRemaining: number;class AdaptiveQuizEngine:

  "email": "john@example.com",

  "skill_level": "Intermediate",    isCompleted: boolean;    # Core components

  "total_points": 1250,

  "badges_earned": 5,}    - user_performance_history

  "quizzes_completed": 23

}    - difficulty_ladder

```

function Quiz() {    - adaptation_sensitivity

### 6.2 Quiz Endpoints

    const [quizState, setQuizState] = useState<QuizState>(initialState);    

#### POST /api/quiz/start

        # Key methods

**Description**: Start new quiz session

    const handleAnswerSubmit = async (answer: string) => {    - initialize_user_profile()

**Request Body**:

```json        // Submit answer to backend    - record_answer()

{

  "topic_id": 1,        const result = await quizAPI.submitAnswer(quizId, questionId, answer);    - calculate_performance_metrics()

  "difficulty": "Medium",

  "num_questions": 10            - determine_next_difficulty()

}

```        // Update score    - get_adaptive_question_recommendation()



**Response** (201 Created):        if (result.is_correct) {```

```json

{            setScore(score + 1);

  "session_id": 42,

  "topic": "Python Programming",        }#### Difficulty Transition Rules

  "difficulty": "Medium",

  "total_questions": 10,        

  "first_question": {

    "id": 105,        // Load next question (with adaptive difficulty)| Current Level | Accuracy | Action |

    "text": "What is a list comprehension?",

    "options": ["A", "B", "C", "D"],        loadNextQuestion();|---------------|----------|--------|

    "question_type": "MCQ"

  }    };| Easy | ≥80% | Promote to Medium |

}

```}| Easy | <40% | Stay at Easy |



#### POST /api/quiz/{session_id}/answer```| Medium | ≥75% | Promote to Hard |



**Description**: Submit answer for current question| Medium | <45% | Demote to Easy |



**Request Body**:**Features**:| Hard | ≥70% | Stay at Hard |

```json

{- Timer per question (optional)| Hard | <50% | Demote to Medium |

  "question_id": 105,

  "answer": "A way to create lists concisely"- Progress bar

}

```- Skip question option---



**Response** (200 OK):- Review answers before submission

```json

{- Detailed results page with explanations### Module 5: Web Interface + Quiz UI ✅

  "is_correct": true,

  "similarity": 0.92,

  "feedback": "Excellent answer! Very accurate.",

  "explanation": "List comprehensions provide a concise way to create lists...",---#### Features Implemented

  "points_earned": 10,

  "next_question": {1. **Dashboard**

    "id": 106,

    "text": "What is the difference between a list and tuple?",### Module 8: Admin Dashboard & Leaderboard   - User statistics overview

    "options": null,

    "question_type": "ShortAnswer"   - Recent quiz history

  }

}**Files**: `frontend/src/pages/AdminDashboard.tsx`, `backend/leaderboard_service.py`   - Topic selection

```

   - Quick start quiz options

#### POST /api/quiz/{session_id}/complete

**Purpose**: Provides admin tools for user management, content moderation, and system monitoring.   - Skill level configuration

**Description**: Complete quiz session and get results



**Response** (200 OK):

```json**Admin Features**:2. **Quiz Interface**

{

  "session_id": 42,   - Clean, responsive design

  "score": 8,

  "total_questions": 10,#### 8.1 User Management   - Real-time progress tracking

  "accuracy": 80,

  "time_taken": 420,- View all registered users   - Question type indicators

  "difficulty": "Medium",

  "new_badges": [- Update user skill levels   - Difficulty level display

    {

      "id": 3,- View user statistics   - Timer functionality

      "name": "Quiz Master",

      "description": "Complete 10 quizzes"- Monitor user activity   - Instant feedback

    }

  ],   - Adaptive insights

  "recommendations": [

    "Focus on advanced Python topics",#### 8.2 Flagged Questions Review

    "Try Data Structures quiz next"

  ]```python3. **Results Page**

}

```class FlaggedQuestion(db.Model):   - Overall score display



### 6.3 Analytics Endpoints    id = db.Column(db.Integer, primary_key=True)   - Question-by-question review



#### GET /api/analytics/trends    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))   - Detailed explanations



**Description**: Get performance trends over time    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))   - Performance analysis



**Query Parameters**:    reason = db.Column(db.Text, nullable=False)   - Recommendations

- `days` (optional): Number of days (default: 30)

- `topic_id` (optional): Filter by topic    status = db.Column(db.String(20), default='pending')  # pending/reviewed/resolved   - Social sharing options



**Response** (200 OK):    flagged_at = db.Column(db.DateTime, default=datetime.utcnow)

```json

{    resolved_at = db.Column(db.DateTime)4. **Analytics Dashboard**

  "trends": [

    {    admin_notes = db.Column(db.Text)   - Performance trends (charts)

      "date": "2025-01-01",

      "accuracy": 75,```   - Topic-wise breakdown

      "avg_time": 35,

      "quizzes_taken": 3   - Difficulty analysis

    },

    {Admin can:   - Time-based filters

      "date": "2025-01-02",

      "accuracy": 82,- View all flagged questions   - Improvement tracking

      "avg_time": 32,

      "quizzes_taken": 2- Review flag reasons   - Weak area identification

    }

  ],- Resolve or delete flagged questions

  "overall_accuracy": 78.5,

  "improvement": 7- Add admin notes5. **History Page**

}

```   - Past quiz sessions



#### GET /api/analytics/topic-mastery#### 8.3 Leaderboard System   - Score history



**Description**: Get mastery level for each topic```python   - Topic distribution



**Response** (200 OK):class QuizLeaderboard(db.Model):   - Performance statistics

```json

{    id = db.Column(db.Integer, primary_key=True)   - Retry options

  "mastery": [

    {    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

      "topic_id": 1,

      "topic_name": "Python",    quiz_session_id = db.Column(db.Integer, db.ForeignKey('quiz_session.id'))#### UI Components

      "quizzes_taken": 15,

      "avg_accuracy": 85,    topic = db.Column(db.String(100))

      "mastery_level": "Advanced",

      "last_attempt": "2025-01-10T15:30:00Z"    score = db.Column(db.Float, nullable=False)```typescript

    },

    {    total_questions = db.Column(db.Integer)// Key React Components

      "topic_id": 2,

      "topic_name": "JavaScript",    correct_answers = db.Column(db.Integer)├── Dashboard.tsx           # Main user dashboard

      "quizzes_taken": 8,

      "avg_accuracy": 65,    time_taken = db.Column(db.Integer)  # in seconds├── Quiz.tsx               # Interactive quiz interface

      "mastery_level": "Intermediate",

      "last_attempt": "2025-01-08T10:20:00Z"    difficulty_level = db.Column(db.String(20))├── Results.tsx            # Results with analytics

    }

  ]    completed_at = db.Column(db.DateTime, default=datetime.utcnow)├── History.tsx            # Quiz history list

}

``````├── Analytics.tsx          # Performance charts



#### GET /api/analytics/recommendations├── ContentUpload.tsx      # Custom content upload



**Description**: Get AI-generated study recommendations**Leaderboard Features**:├── ProfilePage.tsx        # User profile editor



**Response** (200 OK):- Global leaderboard (all topics)└── AdminDashboard.tsx     # Admin management panel

```json

{- Topic-specific leaderboards```

  "recommendations": [

    {- Time-based filtering (daily, weekly, monthly, all-time)

      "title": "Improve JavaScript Skills",

      "description": "Your JavaScript accuracy is 65%. Focus on async/await patterns.",- Real-time updates via WebSocket#### Design Features

      "priority": "high",

      "action_text": "Start JavaScript Quiz",- User ranking and percentile- 🎨 **Modern UI** - Gradient backgrounds, smooth animations

      "topic_id": 2

    },- 📱 **Responsive Design** - Mobile-first approach

    {

      "title": "Try Advanced Topics",**Ranking Algorithm**:- ♿ **Accessibility** - ARIA labels, keyboard navigation

      "description": "You're excelling at Python. Ready for advanced challenges!",

      "priority": "medium",```python- 🌈 **Visual Feedback** - Color-coded results, progress bars

      "action_text": "Start Advanced Quiz",

      "topic_id": 1def calculate_leaderboard_score(quiz_session):- 🚀 **Performance** - Lazy loading, code splitting

    }

  ]    """- 🎯 **UX Optimization** - Minimal clicks, intuitive flow

}

```    Score = (Correct% * 70) + (Difficulty Bonus * 20) + (Speed Bonus * 10)



### 6.4 Badge Endpoints    ---



#### GET /api/badges/available    Difficulty Bonus:



**Description**: Get all available badges    - Easy: 0 points### Module 6: Admin Dashboard & Feedback ✅



**Response** (200 OK):    - Medium: 10 points

```json

{    - Hard: 20 points#### Features Implemented

  "badges": [

    {    1. **Admin Dashboard**

      "id": 1,

      "name": "First Steps",    Speed Bonus:   - Platform statistics overview

      "description": "Complete your first quiz",

      "icon": "trophy",    - < 30 sec/question: 10 points   - User management

      "criteria_type": "quiz_count",

      "criteria_value": 1,    - 30-60 sec/question: 5 points   - Content moderation

      "points": 50,

      "rarity": "Common"    - > 60 sec/question: 0 points   - Feedback review

    }

    // ... 20 more badges    """   - Flagged question management

  ]

}    correct_percentage = (quiz_session.correct_answers / quiz_session.total_questions) * 100

```

    2. **User Management**

#### GET /api/user/badges

    difficulty_bonus = {   - View all users

**Description**: Get user's earned badges

        'Easy': 0,   - User statistics

**Response** (200 OK):

```json        'Medium': 10,   - Skill level updates

{

  "earned_badges": [        'Hard': 20   - Activity monitoring

    {

      "badge_id": 1,    }.get(quiz_session.difficulty_level, 0)

      "name": "First Steps",

      "earned_at": "2025-01-01T10:30:00Z"    3. **Content Moderation**

    },

    {    avg_time = quiz_session.time_taken / quiz_session.total_questions   - Review flagged questions

      "badge_id": 3,

      "name": "Quiz Master",    speed_bonus = 10 if avg_time < 30 else (5 if avg_time < 60 else 0)   - Delete inappropriate content

      "earned_at": "2025-01-05T14:20:00Z"

    }       - Resolve flags

  ],

  "total_earned": 2,    final_score = (correct_percentage * 0.7) + (difficulty_bonus * 0.2) + (speed_bonus * 0.1)   - Content quality assurance

  "total_available": 21,

  "completion_percentage": 9.5    

}

```    return final_score4. **Feedback System**



### 6.5 Leaderboard Endpoints```   - Collect user feedback on questions



#### GET /api/leaderboard   - Rating system (1-5 stars)



**Description**: Get global leaderboard---   - Comment collection



**Query Parameters**:   - Feedback analysis

- `topic_id` (optional): Filter by topic

- `timeframe` (optional): weekly/monthly/all-time## 4. Database Schema



**Response** (200 OK):5. **Question Flagging**

```json

{### 4.1 Entity Relationship Diagram   - User-reported issues

  "leaderboard": [

    {   - Flag reasons (incorrect, unclear, inappropriate)

      "rank": 1,

      "user_id": 42,```   - Admin resolution workflow

      "username": "quiz_master",

      "total_points": 5420,User (1) ──────< (M) QuizSession   - Flag statistics

      "quizzes_completed": 78,

      "badges_earned": 18  │                     │

    },

    {  │                     └───< (M) Question#### Admin Interface Tabs

      "rank": 2,

      "user_id": 15,  │

      "username": "john_doe",

      "total_points": 4320,  ├────< (M) UserBadge ────> (1) Badge```

      "quizzes_completed": 65,

      "badges_earned": 12  │📊 Overview

    }

  ],  ├────< (M) PerformanceTrend   └── Total users, quizzes, questions

  "current_user_rank": 15,

  "total_users": 250  │   └── Active users today

}

```  ├────< (M) LearningPath ────< (M) LearningMilestone   └── Average quiz score



### 6.6 Content Upload Endpoints  │   └── Flagged questions count



#### POST /api/content/upload  ├────< (M) QuizLeaderboard



**Description**: Upload custom content for quiz generation  │👥 Users



**Request Body** (multipart/form-data):  ├────< (M) FlaggedQuestion ────> (1) Question   └── User list with stats

```

file: [PDF/DOCX file]  │   └── Skill level management

difficulty: "Medium"

num_questions: 10  └────< (M) QuestionFeedback ────> (1) Question   └── User activity logs

```



**Response** (201 Created):

```jsonMultiplayerRoom (1) ──────< (M) MultiplayerParticipant ────> (1) User🚩 Moderation

{

  "message": "Content processed successfully",```   └── Flagged questions review

  "questions_generated": 10,

  "topic_id": 15,   └── Question deletion

  "session_id": 50

}### 4.2 Table Schemas   └── Flag resolution

```

   └── Moderation history

**Complete API Reference**: 90+ endpoints documented at http://localhost:5000/api/docs

#### User Table

---

```sql💬 Feedback

## 7. AI/ML Components

CREATE TABLE user (   └── User feedback collection

### 7.1 Google Gemini Integration

    id INTEGER PRIMARY KEY AUTOINCREMENT,   └── Rating analysis

**Model**: gemini-1.5-flash

    username VARCHAR(80) UNIQUE NOT NULL,   └── Comment review

**Configuration**:

```python    email VARCHAR(120) UNIQUE NOT NULL,   └── Feedback trends

import google.generativeai as genai

    password_hash VARCHAR(255) NOT NULL,```

genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

model = genai.GenerativeModel('gemini-1.5-flash')    full_name VARCHAR(200),



generation_config = {    skill_level VARCHAR(20) DEFAULT 'Beginner',#### API Endpoints

    'temperature': 0.7,

    'top_p': 0.95,    role VARCHAR(20) DEFAULT 'user',```

    'top_k': 40,

    'max_output_tokens': 2048,    created_at DATETIME DEFAULT CURRENT_TIMESTAMPGET    /api/admin/stats            # Admin statistics

}

```);GET    /api/admin/users            # All users



**Use Cases**:```PUT    /api/admin/users/:id/skill-level  # Update user

1. Question generation from content

2. Answer explanation generationGET    /api/admin/flagged-questions  # Flagged questions

3. Study recommendations

4. Learning path creation#### QuizSession TablePOST   /api/admin/resolve-flag/:id   # Resolve flag



### 7.2 Sentence-Transformers (NLP)```sqlDELETE /api/admin/question/:id      # Delete question



**Model**: all-MiniLM-L6-v2CREATE TABLE quiz_session (GET    /api/admin/feedback          # All feedback



**Purpose**: Semantic similarity for answer evaluation    id INTEGER PRIMARY KEY AUTOINCREMENT,POST   /api/quiz/flag-question      # Flag a question



**Performance**:    user_id INTEGER NOT NULL,POST   /api/quiz/submit-feedback    # Submit feedback

- Embedding dimension: 384

- Inference time: ~10ms per sentence    topic VARCHAR(100),```

- Accuracy: 85-90% on standard benchmarks

    skill_level VARCHAR(20),

**Implementation**:

```python    custom_topic VARCHAR(200),---

from sentence_transformers import SentenceTransformer

    total_questions INTEGER DEFAULT 0,

model = SentenceTransformer('all-MiniLM-L6-v2')

    completed_questions INTEGER DEFAULT 0,## 7. Database Schema

def compute_similarity(text1, text2):

    embeddings = model.encode([text1, text2])    correct_answers INTEGER DEFAULT 0,

    similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]

    return similarity    score_percentage FLOAT DEFAULT 0.0,### Complete Entity Relationship Diagram

```

    status VARCHAR(20) DEFAULT 'active',

### 7.3 Adaptive Difficulty Algorithm

    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,```

```python

def adjust_difficulty(user_performance):    completed_at DATETIME,┌─────────────────────────────────────────────────────────────┐

    """

    Adjust question difficulty based on performance    FOREIGN KEY (user_id) REFERENCES user(id)│                           USERS                              │

    

    Performance thresholds:);├─────────────────────────────────────────────────────────────┤

    - 80%+ correct: Increase difficulty

    - 50-80%: Maintain difficulty  ```│ PK  id                 INTEGER                               │

    - <50%: Decrease difficulty

    """│ UK  username           VARCHAR(80)                           │

    recent_sessions = get_last_n_sessions(user_id, n=5)

    accuracy = calculate_average_accuracy(recent_sessions)#### Question Table│ UK  email              VARCHAR(120)                          │

    

    if accuracy >= 0.8:```sql│     password_hash      VARCHAR(128)                          │

        return increase_difficulty(current_difficulty)

    elif accuracy < 0.5:CREATE TABLE question (│     full_name          VARCHAR(100)                          │

        return decrease_difficulty(current_difficulty)

    else:    id INTEGER PRIMARY KEY AUTOINCREMENT,│     skill_level        VARCHAR(20) DEFAULT 'Beginner'        │

        return current_difficulty

    quiz_session_id INTEGER NOT NULL,│     role               VARCHAR(20) DEFAULT 'user'            │

def increase_difficulty(current):

    mapping = {'Easy': 'Medium', 'Medium': 'Hard', 'Hard': 'Hard'}    question_text TEXT NOT NULL,│     created_at         DATETIME                              │

    return mapping.get(current, 'Medium')

    question_type VARCHAR(20) NOT NULL,│     updated_at         DATETIME                              │

def decrease_difficulty(current):

    mapping = {'Easy': 'Easy', 'Medium': 'Easy', 'Hard': 'Medium'}    options JSON,└─────────────────────────────────────────────────────────────┘

    return mapping.get(current, 'Medium')

```    correct_answer TEXT NOT NULL,                              │



---    user_answer TEXT,                              │ 1:N



## 8. Security    explanation TEXT,                              ▼



### 8.1 Authentication    difficulty_level VARCHAR(20),┌─────────────────────────────────────────────────────────────┐



**JWT Implementation**:    bloom_level VARCHAR(20),│                      QUIZ_SESSIONS                           │

```python

import jwt    time_taken INTEGER,├─────────────────────────────────────────────────────────────┤

from datetime import datetime, timedelta

    is_correct BOOLEAN,│ PK  id                 INTEGER                               │

def create_access_token(user_id):

    payload = {    answered_at DATETIME,│ FK  user_id            INTEGER → users.id                    │

        'user_id': user_id,

        'exp': datetime.utcnow() + timedelta(hours=24),    FOREIGN KEY (quiz_session_id) REFERENCES quiz_session(id)│     topic              VARCHAR(100)                          │

        'iat': datetime.utcnow()

    });│     skill_level        VARCHAR(20)                           │

    token = jwt.encode(payload, os.getenv('JWT_SECRET_KEY'), algorithm='HS256')

    return token```│     custom_topic       TEXT                                  │



def verify_token(token):│     total_questions    INTEGER DEFAULT 5                     │

    try:

        payload = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=['HS256'])#### Badge Table│     completed_questions INTEGER DEFAULT 0                    │

        return payload['user_id']

    except jwt.ExpiredSignatureError:```sql│     correct_answers    INTEGER DEFAULT 0                     │

        return None

    except jwt.InvalidTokenError:CREATE TABLE badge (│     score_percentage   FLOAT DEFAULT 0.0                     │

        return None

```    id INTEGER PRIMARY KEY AUTOINCREMENT,│     session_data       TEXT (JSON)                           │



**Token Lifecycle**:    name VARCHAR(100) UNIQUE NOT NULL,│     status             VARCHAR(20) DEFAULT 'active'          │

- Access token: 24 hours

- Refresh token: 30 days    description TEXT,│     started_at         DATETIME                              │

- Automatic refresh on expiration

    category VARCHAR(50),│     completed_at       DATETIME                              │

### 8.2 Password Hashing

    criteria JSON,└─────────────────────────────────────────────────────────────┘

```python

import hashlib    icon VARCHAR(50),                              │



def hash_password(password):    points INTEGER DEFAULT 0,                              │ 1:N

    return hashlib.sha256(password.encode()).hexdigest()

    rarity VARCHAR(20) DEFAULT 'common',                              ▼

def verify_password(password, hash):

    return hash_password(password) == hash    created_at DATETIME DEFAULT CURRENT_TIMESTAMP┌─────────────────────────────────────────────────────────────┐

```

);│                         QUESTIONS                            │

**Recommendation**: Upgrade to bcrypt/argon2 for production

```├─────────────────────────────────────────────────────────────┤

### 8.3 CORS Configuration

│ PK  id                 INTEGER                               │

```python

from flask_cors import CORS#### UserBadge Table│ FK  quiz_session_id    INTEGER → quiz_sessions.id           │



CORS(app, ```sql│     question_text      TEXT                                  │

     supports_credentials=True,

     origins=['http://localhost:8080'],CREATE TABLE user_badge (│     question_type      VARCHAR(20)                           │

     methods=['GET', 'POST', 'PUT', 'DELETE'],

     allow_headers=['Content-Type', 'Authorization'])    id INTEGER PRIMARY KEY AUTOINCREMENT,│     options            TEXT (JSON)                           │

```

    user_id INTEGER NOT NULL,│     correct_answer     TEXT                                  │

### 8.4 Input Validation

    badge_id INTEGER NOT NULL,│     user_answer        TEXT                                  │

```python

from marshmallow import Schema, fields, validate    earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,│     explanation        TEXT                                  │



class UserRegistrationSchema(Schema):    progress FLOAT DEFAULT 0.0,│     difficulty_level   VARCHAR(20)                           │

    username = fields.Str(required=True, validate=validate.Length(min=3, max=80))

    email = fields.Email(required=True)    FOREIGN KEY (user_id) REFERENCES user(id),│     is_correct         BOOLEAN                               │

    password = fields.Str(required=True, validate=validate.Length(min=8))

    skill_level = fields.Str(validate=validate.OneOf(['Beginner', 'Intermediate', 'Advanced']))    FOREIGN KEY (badge_id) REFERENCES badge(id)│     answered_at        DATETIME                              │



# Usage);│     time_taken         INTEGER (seconds)                     │

schema = UserRegistrationSchema()

errors = schema.validate(request.json)```│     evaluation_metadata TEXT (JSON)                          │

if errors:

    return jsonify({'errors': errors}), 400└─────────────────────────────────────────────────────────────┘

```

### 4.3 Relationships                              │

### 8.5 SQL Injection Prevention

                              ├─────────────┐

**SQLAlchemy ORM** provides automatic protection:

```python- **One-to-Many**: User → QuizSessions, User → Badges, User → PerformanceTrends                              │ 1:N         │ 1:N

# Safe (parameterized)

user = User.query.filter_by(username=username).first()- **Many-to-Many**: User ↔ Badges (through UserBadge junction table)                              ▼             ▼



# Unsafe (avoid)- **One-to-Many**: QuizSession → Questions┌─────────────────────────────┐  ┌──────────────────────────┐

db.session.execute(f"SELECT * FROM user WHERE username='{username}'")

```- **One-to-Many**: User → LearningPaths → Milestones│   FLAGGED_QUESTIONS         │  │  QUESTION_FEEDBACK       │



---├─────────────────────────────┤  ├──────────────────────────┤



## 9. Testing---│ PK  id           INTEGER    │  │ PK  id        INTEGER    │



### 9.1 Backend Tests│ FK  question_id  INTEGER    │  │ FK  question_id INTEGER  │



**File**: `test_custom_content.py`## 5. API Reference│ FK  user_id      INTEGER    │  │ FK  user_id   INTEGER    │



```python│     reason       TEXT        │  │     rating    INTEGER    │

import unittest

from app import app, db### 5.1 Authentication Endpoints│     status       VARCHAR(20) │  │     feedback_text TEXT   │

from models import User, QuizSession

│     resolved_by  INTEGER     │  │     created_at DATETIME  │

class TestQuizAPI(unittest.TestCase):

    def setUp(self):#### POST /api/auth/register│     created_at   DATETIME    │  └──────────────────────────┘

        app.config['TESTING'] = True

        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'**Description**: Register a new user account│     resolved_at  DATETIME    │

        self.client = app.test_client()

        └─────────────────────────────┘

        with app.app_context():

            db.create_all()**Request Body**:```

    

    def test_user_registration(self):```json

        response = self.client.post('/api/auth/register', json={

            'username': 'testuser',{### Key Relationships

            'email': 'test@example.com',

            'password': 'testpass123'  "username": "john_doe",- **Users** (1) → (N) **Quiz Sessions** - One user can have many quiz sessions

        })

        self.assertEqual(response.status_code, 201)  "email": "john@example.com",- **Quiz Sessions** (1) → (N) **Questions** - One session contains multiple questions

    

    def test_quiz_start(self):  "full_name": "John Doe",- **Questions** (1) → (N) **Flagged Questions** - Questions can be flagged multiple times

        # Login first

        login_response = self.client.post('/api/auth/login', json={  "password": "SecurePass123!",- **Questions** (1) → (N) **Question Feedback** - Questions can have multiple feedback entries

            'username': 'testuser',

            'password': 'testpass123'  "skill_level": "Beginner"

        })

        token = login_response.json['access_token']}### Indexes for Performance

        

        # Start quiz``````sql

        response = self.client.post('/api/quiz/start',

            headers={'Authorization': f'Bearer {token}'},CREATE INDEX idx_users_username ON users(username);

            json={'topic_id': 1, 'difficulty': 'Medium'}

        )**Response**:CREATE INDEX idx_users_email ON users(email);

        self.assertEqual(response.status_code, 201)

        self.assertIn('session_id', response.json)```jsonCREATE INDEX idx_quiz_sessions_user ON quiz_sessions(user_id);

    

    def tearDown(self):{CREATE INDEX idx_quiz_sessions_status ON quiz_sessions(status);

        with app.app_context():

            db.drop_all()  "message": "User registered successfully",CREATE INDEX idx_questions_session ON questions(quiz_session_id);



if __name__ == '__main__':  "user": {CREATE INDEX idx_flagged_status ON flagged_questions(status);

    unittest.main()

```    "id": 1,```



**Run Tests**:    "username": "john_doe",

```bash

cd backend    "email": "john@example.com",---

python -m pytest test_custom_content.py -v

```    "skill_level": "Beginner"



### 9.2 Frontend Tests  },## 8. API Documentation



Create `frontend/src/App.test.tsx`:  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",



```typescript  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."### Authentication APIs

import { render, screen } from '@testing-library/react';

import App from './App';}



test('renders login page', () => {```#### Register User

  render(<App />);

  const loginElement = screen.getByText(/login/i);```http

  expect(loginElement).toBeInTheDocument();

});#### POST /api/auth/loginPOST /api/auth/register

```

**Description**: Authenticate user and receive JWT tokensContent-Type: application/json

**Run Tests**:

```bash

cd frontend

npm test**Request Body**:Request:

```

```json{

---

{  "username": "john_doe",

## 10. Deployment

  "username": "john_doe",  "email": "john@example.com",

### 10.1 Production Checklist

  "password": "SecurePass123!"  "password": "SecurePass123!",

**Backend**:

- [ ] Set `FLASK_ENV=production`}  "full_name": "John Doe",

- [ ] Use PostgreSQL instead of SQLite

- [ ] Enable HTTPS (SSL/TLS)```  "skill_level": "Intermediate"

- [ ] Configure Gunicorn with 4+ workers

- [ ] Set up reverse proxy (Nginx)}

- [ ] Enable rate limiting

- [ ] Configure logging**Response**:

- [ ] Set up database backups

- [ ] Monitor API usage```jsonResponse (201):



**Frontend**:{{

- [ ] Run `npm run build`

- [ ] Configure production API URL  "message": "Login successful",  "success": true,

- [ ] Enable minification

- [ ] Set up CDN for static assets  "user": {  "message": "User registered successfully",

- [ ] Configure caching headers

- [ ] Enable HTTPS    "id": 1,  "user": {



### 10.2 Docker Deployment    "username": "john_doe",    "id": 1,



**Backend Dockerfile**:    "email": "john@example.com",    "username": "john_doe",

```dockerfile

FROM python:3.13-slim    "role": "user"    "email": "john@example.com",



WORKDIR /app  },    "full_name": "John Doe",



COPY requirements.txt .  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",    "skill_level": "Intermediate",

RUN pip install --no-cache-dir -r requirements.txt

  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."    "role": "user"

COPY . .

}  }

EXPOSE 5000

```}

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "--worker-class", "eventlet", "app:app"]

``````



**Frontend Dockerfile**:### 5.2 Quiz Endpoints

```dockerfile

FROM node:16-alpine AS builder#### Login



WORKDIR /app#### POST /api/quiz/start```http

COPY package*.json ./

RUN npm install**Description**: Start a new quiz sessionPOST /api/auth/login

COPY . .

RUN npm run buildContent-Type: application/json



FROM nginx:alpine**Request Body**:

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf```jsonRequest:

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]{{

```

  "topic": "Python Programming",  "username": "john_doe",

**docker-compose.yml**:

```yaml  "num_questions": 10,  "password": "SecurePass123!"

version: '3.8'

  "difficulty": "Medium",}

services:

  backend:  "skill_level": "Intermediate"

    build: ./backend

    ports:}Response (200):

      - "5000:5000"

    environment:```{

      - GOOGLE_API_KEY=${GOOGLE_API_KEY}

      - DATABASE_URL=postgresql://user:pass@db:5432/smart_quizzer  "success": true,

    depends_on:

      - db**Response**:  "access_token": "eyJhbGciOiJIUzI1NiIs...",

  

  frontend:```json  "user": {

    build: ./frontend

    ports:{    "id": 1,

      - "80:80"

    depends_on:  "quiz_id": 42,    "username": "john_doe",

      - backend

    "questions": [    "email": "john@example.com",

  db:

    image: postgres:15    {    "full_name": "John Doe",

    environment:

      - POSTGRES_USER=user      "id": 101,    "skill_level": "Intermediate",

      - POSTGRES_PASSWORD=pass

      - POSTGRES_DB=smart_quizzer      "question_text": "What is a decorator in Python?",    "role": "user"

    volumes:

      - postgres_data:/var/lib/postgresql/data      "question_type": "MCQ",  }



volumes:      "options": ["Option A", "Option B", "Option C", "Option D"],}

  postgres_data:

```      "difficulty_level": "Medium",```



---      "bloom_level": "Understand"



## 11. Performance    }### Quiz APIs



### 11.1 Backend Optimization  ],



**Database Optimization**:  "total_questions": 10#### Start Quiz

- Use database indexes on frequently queried columns

- Implement connection pooling}```http

- Cache frequent queries with Redis

```POST /api/quiz/start

**API Optimization**:

- Implement pagination for large result setsAuthorization: Bearer <token>

- Use gzip compression for responses

- Enable HTTP caching headers#### POST /api/quiz/{quiz_id}/answerContent-Type: application/json



### 11.2 Frontend Optimization**Description**: Submit an answer to a question



**Code Splitting**:Request:

```tsx

import React, { lazy, Suspense } from 'react';**Request Body**:{



const Analytics = lazy(() => import('./pages/Analytics'));```json  "topic": "Mathematics",



function App() {{  "skill_level": "Intermediate",

  return (

    <Suspense fallback={<div>Loading...</div>}>  "question_id": 101,  "num_questions": 5,

      <Analytics />

    </Suspense>  "answer": "Option A"  "custom_topic": null  // Optional custom content

  );

}}}

```

```

**Memoization**:

```tsxResponse (200):

import { useMemo, useCallback } from 'react';

**Response**:{

const MemoizedComponent = React.memo(({ data }) => {

  const processedData = useMemo(() => {```json  "success": true,

    return data.map(item => item * 2);

  }, [data]);{  "quiz_session": {

  

  return <div>{processedData}</div>;  "is_correct": true,    "id": 101,

});

```  "correct_answer": "Option A",    "topic": "Mathematics",



---  "explanation": "Decorators are a powerful feature in Python...",    "skill_level": "Intermediate",



## 12. Contributing  "score_percentage": 60.0,    "total_questions": 5,



### 12.1 Development Workflow  "next_question": {    "status": "active"



1. **Fork Repository**    "id": 102,  },

2. **Create Feature Branch**: `git checkout -b feature/AmazingFeature`

3. **Make Changes**    "question_text": "..."  "questions": [

4. **Run Tests**: `pytest` (backend), `npm test` (frontend)

5. **Commit**: `git commit -m 'Add AmazingFeature'`  }    {

6. **Push**: `git push origin feature/AmazingFeature`

7. **Open Pull Request**}      "id": 1,



### 12.2 Code Standards```      "question_text": "What is 2 + 2?",



**Python (PEP 8)**:      "question_type": "MCQ",

- Line length: 100 characters

- Use 4 spaces for indentation### 5.3 Analytics Endpoints      "options": ["3", "4", "5", "6"],

- Docstrings for all functions

      "difficulty_level": "Beginner"

**TypeScript**:

- Use ESLint configuration#### GET /api/analytics/trends?days=30    },

- Prefer functional components

- Use TypeScript strict mode**Description**: Get performance trends over specified period    // ... more questions



### 12.3 Commit Message Format  ]



```**Response**:}

<type>(<scope>): <subject>

```json```

<body>

{

<footer>

```  "trends": [#### Submit Answer



**Types**: feat, fix, docs, style, refactor, test, chore    {```http



**Example**:      "date": "2025-11-01",POST /api/quiz/:quiz_id/answer

```

feat(backend): add badge eligibility check      "quizzes_taken": 3,Authorization: Bearer <token>



Implemented automatic badge awarding when users complete quizzes.      "average_score": 85.5,Content-Type: application/json

Checks all 21 badges against user's statistics.

      "topics_covered": ["Python", "JavaScript"]

Closes #45

```    }Request:



---  ],{



## Appendix  "current_streak": 7,  "question_id": 1,



### A. Environment Variables Reference  "improvement_trend": "improving"  "answer": "4",



| Variable | Required | Default | Description |}  "time_taken": 15

|----------|----------|---------|-------------|

| `GOOGLE_API_KEY` | ✅ | None | Google Gemini API key |```}

| `SECRET_KEY` | ✅ | None | Flask session encryption |

| `JWT_SECRET_KEY` | ✅ | None | JWT token signing |

| `DATABASE_URL` | ❌ | `sqlite:///instance/smart_quizzer.db` | Database connection |

| `FLASK_ENV` | ❌ | `production` | Environment mode |#### GET /api/analytics/topic-masteryResponse (200):

| `SIMILARITY_THRESHOLD` | ❌ | `0.7` | Answer matching threshold |

**Description**: Get topic-wise mastery percentage{

### B. API Rate Limits

  "is_correct": true,

- Google Gemini Free Tier: 60 requests/minute

- No rate limiting on internal API (implement as needed)**Response**:  "correct_answer": "4",



### C. Browser Support```json  "explanation": "2 + 2 equals 4...",



- Chrome 90+{  "enhanced_feedback": {

- Firefox 88+

- Safari 14+  "topic_mastery": [    "result_message": "Excellent!",

- Edge 90+

    {    "confidence": 1.0

### D. Dependencies

      "topic": "Python Programming",  },

See `backend/requirements.txt` and `frontend/package.json` for complete lists.

      "quizzes_taken": 15,  "adaptive_insights": {

---

      "average_score": 92.3,    "next_difficulty": "medium",

**Documentation Version**: 1.0.0  

**Last Updated**: November 2025        "mastery_percentage": 92,    "performance_trend": "improving"

**Maintained By**: Mamatha Bachu  

**GitHub**: https://github.com/BatchuMamatha/Smart-Quizzer-AI      "total_questions": 150,  },


      "correct_answers": 138  "quiz_progress": {

    }    "completed": 1,

  ]    "total": 5,

}    "score_percentage": 20.0,

```    "is_completed": false

  }

### 5.4 Badge Endpoints}

```

#### GET /api/badges/available

**Description**: Get all available badges#### Get Results

```http

**Response**:GET /api/quiz/:quiz_id/results

```jsonAuthorization: Bearer <token>

{

  "badges": [Response (200):

    {{

      "id": 1,  "quiz_session": {

      "name": "First Steps",    "id": 101,

      "description": "Complete your first quiz",    "topic": "Mathematics",

      "category": "participation",    "total_questions": 5,

      "criteria": {"quizzes_completed": 1},    "correct_answers": 4,

      "rarity": "common"    "score_percentage": 80.0,

    }    "status": "completed"

  ]  },

}  "questions": [

```    // All questions with answers and explanations

  ],

#### GET /api/user/badges  "summary": {

**Description**: Get user's earned badges    "total_questions": 5,

    "correct_answers": 4,

**Response**:    "score_percentage": 80.0,

```json    "time_taken": 180

{  }

  "earned_badges": [}

    {```

      "badge": {

        "name": "First Steps",### Admin APIs

        "description": "Complete your first quiz"

      },#### Get Admin Stats

      "earned_at": "2025-11-01T10:00:00",```http

      "progress": 100.0GET /api/admin/stats

    }Authorization: Bearer <admin_token>

  ],

  "total_earned": 5,Response (200):

  "total_available": 21{

}  "total_users": 150,

```  "total_quizzes": 1250,

  "total_questions": 6250,

---  "flagged_questions": 8,

  "active_users_today": 42,

## 6. Frontend Components  "avg_quiz_score": 73.5

}

### 6.1 Page Components```



#### Dashboard.tsx#### Get Flagged Questions

- Main landing page after login```http

- Quick stats overviewGET /api/admin/flagged-questions

- Topic selectionAuthorization: Bearer <admin_token>

- Recent quizzes

- Badge progressResponse (200):

{

#### Quiz.tsx  "flagged_questions": [

- Interactive quiz interface    {

- Question display with options      "id": 1,

- Timer (optional)      "question_id": 45,

- Progress bar      "question_text": "...",

- Submit button      "reason": "Incorrect answer",

      "status": "pending",

#### AnalyticsDashboard.tsx      "created_at": "2025-10-20T10:30:00Z"

- 4 tabs: Overview, Badges, Topic Mastery, AI Insights    }

- Performance charts  ]

- Weekly reports}

- Badge showcase```

- Topic heatmap

- AI recommendations### Error Responses



#### AdminDashboard.tsx```http

- System statistics400 Bad Request

- User management table{

- Flagged questions review  "error": "Invalid request parameters",

- Feedback analysis  "details": {...}

}

### 6.2 Reusable Components

401 Unauthorized

#### PerformanceChart.tsx{

```typescript  "error": "Authentication required"

interface PerformanceChartProps {}

  days?: number;  // 7, 14, 30, 60, 90

  topic?: string;403 Forbidden

}{

  "error": "Insufficient permissions"

// Displays line chart of performance trends}

// Uses D3.js or Recharts for visualization

```404 Not Found

{

#### TopicHeatmap.tsx  "error": "Resource not found"

```typescript}

// Color-coded grid showing topic mastery

// Green = High mastery (>80%)500 Internal Server Error

// Yellow = Medium mastery (50-80%){

// Red = Low mastery (<50%)  "error": "Internal server error",

```  "message": "..."

}

#### BadgeShowcase.tsx```

```typescript

// Grid display of all badges---

// Shows earned (colored) and locked (grayscale) badges

// Click to see badge details## 9. Features Implementation

```

### Feature: Dynamic Score Calculation ✅

---**Implementation**: Real-time score updates after each answer

```python

## 7. AI & Machine Learningdef calculate_score(self):

    if self.total_questions > 0:

### 7.1 Question Generation with Gemini AI        self.score_percentage = (self.correct_answers / self.total_questions) * 100

    else:

**Model**: Google Gemini 1.5 Flash        self.score_percentage = 0.0

```

**Configuration**:

```python### Feature: Batch Question Generation ✅

generation_config = {**Implementation**: Generate all questions in single API call

    'temperature': 0.7,  # Creativity level- **Speed**: 75 seconds → 15 seconds (5x faster)

    'top_p': 0.95,       # Nucleus sampling- **Method**: Single prompt with multiple question requests

    'top_k': 40,         # Top-k sampling- **Fallback**: Individual generation if batch fails

    'max_output_tokens': 2048

}### Feature: Role-Based Access Control ✅

```**Implementation**: Separate interfaces for admin and users

- Admins cannot take quizzes

**Prompt Engineering**:- Users cannot access admin panel

```python- Automatic route protection

prompt = f"""

Generate {num_questions} quiz questions about {topic} at {difficulty} difficulty level.### Feature: Adaptive Difficulty ✅

**Implementation**: Real-time difficulty adjustment

Requirements:- Track consecutive correct/incorrect answers

1. Include {mcq_count} Multiple Choice Questions with 4 options- Analyze response times

2. Include {tf_count} True/False questions- Calculate performance trends

3. Include {sa_count} Short Answer questions- Adjust difficulty based on metrics

4. Each question should align with Bloom's Taxonomy levels

5. Provide detailed explanations for each answer### Feature: Advanced Answer Evaluation ✅

**Implementation**: Semantic similarity for subjective answers

Format as JSON:- Keyword matching

{{- Semantic analysis

  "questions": [- Confidence scoring

    {{- Multiple evaluation methods

      "question_text": "...",

      "question_type": "MCQ|True/False|Short Answer",### Feature: Content Segmentation ✅

      "options": ["A", "B", "C", "D"] (for MCQ only),**Implementation**: Intelligent content chunking

      "correct_answer": "...",- Paragraph-based segmentation

      "explanation": "...",- Sentence boundary detection

      "bloom_level": "Remember|Understand|Apply|Analyze|Evaluate|Create",- Context preservation

      "difficulty_hint": "Easy|Medium|Hard"- Varied question generation

    }}

  ]---

}}

"""## 10. Local Development Setup

```

### Prerequisites

### 7.2 Answer Evaluation with NLP- Python 3.8+ installed

- Node.js 16+ installed

**Model**: Sentence-BERT (all-MiniLM-L6-v2)- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))



**Semantic Similarity Calculation**:### Quick Start (Automated)

```python

from sentence_transformers import SentenceTransformer**Windows:**

from sklearn.metrics.pairwise import cosine_similarity```bash

# 1. Clone repository

model = SentenceTransformer('all-MiniLM-L6-v2')git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

cd Smart-Quizzer-AI

user_embedding = model.encode(user_answer)

correct_embedding = model.encode(correct_answer)# 2. Run automated setup

setup.bat

similarity = cosine_similarity([user_embedding], [correct_embedding])[0][0]

# 3. Add your Gemini API key to backend/.env

# Threshold: 75% similarity = correct```

is_correct = similarity >= 0.75

```**Mac/Linux:**

```bash

**Advantages**:# 1. Clone repository

- Handles paraphrased answersgit clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

- Robust to spelling mistakescd Smart-Quizzer-AI

- Context-aware matching

- Works for technical and general content# 2. Run automated setup

chmod +x setup.sh

### 7.3 Adaptive Difficulty Algorithm./setup.sh



**Decision Tree**:# 3. Add your Gemini API key to backend/.env

``````

Current Performance

    │### Manual Setup

    ├── 3+ Consecutive Correct → Upgrade Difficulty

    │       Easy → Medium → Hard#### Backend Setup

    │```bash

    ├── 2+ Consecutive Wrong → Downgrade Difficultycd backend

    │       Hard → Medium → Easy

    │# Create virtual environment

    ├── Score > 80% → Increase Difficultypython -m venv venv

    │

    ├── Score < 50% → Decrease Difficulty# Activate virtual environment

    │# Windows: venv\Scripts\activate

    └── Otherwise → Maintain Current Difficulty# Mac/Linux: source venv/bin/activate

```

# Install dependencies

---pip install -r requirements.txt



## 8. Workflows# Initialize database

cd ..

### 8.1 User Registration Workflowpython init_database.py



```# Start backend server

1. User navigates to /registercd backend

2. Fills registration formpython app.py

3. Frontend validates input (client-side)```

4. POST /api/auth/register with user dataBackend runs on `http://localhost:5000`

5. Backend validates input (server-side)

6. Check if username/email already exists#### Frontend Setup

7. Hash password with bcrypt```bash

8. Create User record in databasecd frontend

9. Generate JWT access & refresh tokens

10. Return user data + tokens# Install dependencies

11. Frontend stores tokens in sessionStoragenpm install

12. Redirect to Dashboard

```# Start development server

npm start

### 8.2 Quiz Taking Workflow```

Frontend runs on `http://localhost:3000`

```

1. User selects topic from Dashboard### Testing the Application

2. Configures quiz parameters (count, difficulty)

3. POST /api/quiz/start1. **Backend Health Check**

4. Backend generates questions via Gemini AI   - Visit: http://localhost:5000/api/health

5. Questions classified for difficulty   - Expected: `{"status": "healthy"}`

6. Questions saved to database

7. First question returned to frontend2. **Frontend Access**

8. User answers question   - Visit: http://localhost:3000

9. POST /api/quiz/{id}/answer   - Should see login page

10. Backend evaluates answer (NLP for short answers)

11. Update quiz session with score3. **User Registration**

12. Apply adaptive difficulty algorithm   - Click "Register" and create an account

13. Return next question with adjusted difficulty   - Or run `python init_database.py` to create sample users

14. Repeat steps 8-13 until quiz complete

15. POST /api/quiz/{id}/complete4. **Take a Quiz**

16. Calculate final score   - Login with your account

17. Update leaderboard   - Select a topic and difficulty

18. Check and award badges   - Start your first quiz!

19. Return detailed results

20. Redirect to Results page### Troubleshooting

```

#### Port Already in Use

### 8.3 Badge Awarding Workflow```bash

# Find and kill process on port 5000 (backend)

```# Windows: netstat -ano | findstr :5000

1. User completes quiz# Mac/Linux: lsof -ti:5000 | xargs kill -9

2. POST /api/quiz/{id}/complete triggers badge check

3. badge_service.check_and_award_badges(user_id)# Find and kill process on port 3000 (frontend)

4. For each badge definition:# Windows: netstat -ano | findstr :3000

   a. Fetch user statistics# Mac/Linux: lsof -ti:3000 | xargs kill -9

   b. Evaluate badge criteria```

   c. If criteria met:

      - Create UserBadge record#### Module Not Found Errors

      - Set earned_at timestamp```bash

      - Emit WebSocket event (badge_earned)# Reinstall backend dependencies

5. Return list of newly earned badgescd backend

6. Frontend displays badge notificationpip install -r requirements.txt

7. Update user profile with new badge count

```# Reinstall frontend dependencies

cd frontend

### 8.4 Leaderboard Update Workflowrm -rf node_modules package-lock.json

npm install

``````

1. User completes quiz

2. Calculate leaderboard score:#### Database Errors

   score = (correct% * 70) + (difficulty_bonus * 20) + (speed_bonus * 10)```bash

3. Create QuizLeaderboard entry# Reinitialize database

4. Emit WebSocket event: leaderboard_updatecd backend

5. All connected clients receive updaterm -rf instance/smart_quizzer.db  # Delete old database

6. Frontend re-fetches leaderboard datacd ..

7. Update UI with new rankingspython init_database.py  # Create fresh database

8. Highlight user's position change```

```

#### API Connection Issues

---- Ensure backend is running on port 5000

- Check frontend API URL in `.env` or code

## 9. Security & Authentication- Verify CORS settings in `backend/app.py`

- Clear browser cache and cookies

### 9.1 JWT Authentication

---

**Token Structure**:

```json## 11. User Guide

{

  "header": {### Getting Started

    "alg": "HS256",

    "typ": "JWT"#### 1. Registration

  },1. Navigate to the registration page

  "payload": {2. Fill in your details:

    "sub": "user_id",   - Username (unique)

    "username": "john_doe",   - Email

    "role": "user",   - Password (min 8 characters)

    "exp": 1730000000,   - Full name

    "iat": 1729000000   - Skill level (Beginner/Intermediate/Advanced)

  },3. Click "Register"

  "signature": "..."

}#### 2. Taking a Quiz

```

**Standard Quiz:**

**Token Types**:1. Log in to your account

- **Access Token**: Short-lived (1 hour), used for API requests2. On the dashboard, select:

- **Refresh Token**: Long-lived (30 days), used to obtain new access tokens   - Topic (Mathematics, Science, History, etc.)

   - Skill level

**Authentication Flow**:   - Number of questions (1-20)

```3. Click "Start Quiz"

1. User logs in with credentials4. Answer questions one by one

2. Backend validates credentials5. View instant feedback after each answer

3. Generate access token (1 hour expiry)6. Complete all questions

4. Generate refresh token (30 days expiry)7. View detailed results

5. Return both tokens to frontend

6. Frontend stores tokens in sessionStorage**Custom Content Quiz:**

7. Include access token in Authorization header for all requests1. Navigate to "Content Upload"

8. On token expiry, use refresh token to get new access token2. Paste text or upload PDF

```3. Select difficulty level

4. Choose number of questions

### 9.2 Password Security5. Click "Generate Quiz"

6. Take the quiz as usual

**Hashing Algorithm**: Bcrypt with salt rounds = 12

#### 3. Viewing Results

```python- Overall score percentage

from bcrypt import hashpw, gensalt, checkpw- Question-by-question breakdown

- Correct/incorrect indicators

# Password hashing during registration- Detailed explanations

password_hash = hashpw(password.encode('utf-8'), gensalt(12))- Performance insights

- Adaptive recommendations

# Password verification during login

is_valid = checkpw(password.encode('utf-8'), stored_hash)#### 4. Tracking Progress

```**Quiz History:**

- View all past quizzes

**Password Requirements**:- Filter by topic, date, or score

- Minimum 8 characters- Retry previous quizzes

- At least 1 uppercase letter- Track improvement over time

- At least 1 lowercase letter

- At least 1 digit**Analytics Dashboard:**

- At least 1 special character- Performance trends (charts)

- Topic-wise analysis

### 9.3 API Security- Difficulty progression

- Time-based filters

**CORS Configuration**:- Weak area identification

```python

CORS(app, resources={#### 5. Profile Management

    r"/api/*": {- Update personal information

        "origins": ["http://localhost:8080"],- Change skill level

        "methods": ["GET", "POST", "PUT", "DELETE"],- View statistics

        "allow_headers": ["Content-Type", "Authorization"]- Manage preferences

    }

})### Tips for Best Results

```1. ✅ Choose appropriate skill level

2. ✅ Read questions carefully

**Rate Limiting** (Future Enhancement):3. ✅ Take your time

- 100 requests per minute per IP4. ✅ Review explanations

- 1000 requests per hour per user5. ✅ Track your progress

6. ✅ Practice regularly

**Input Validation**:7. ✅ Use custom content for specific topics

- All user inputs sanitized

- SQL injection prevention via ORM---

- XSS prevention via HTML escaping

## 12. Admin Guide

---

### Admin Login

## 10. Testing- Username: `admin`

- Default password: (set during setup)

### 10.1 Unit Testing- Automatically redirected to admin dashboard



**Backend Tests** (pytest):### Admin Capabilities

```python

# test_question_gen.py#### 1. Platform Overview

def test_generate_questions():- Total users count

    generator = QuestionGenerator()- Total quizzes taken

    questions = generator.generate_questions("Python", "Medium", 5)- Total questions generated

    - Active users today

    assert len(questions) == 5- Average quiz score

    assert all(q['question_type'] in ['MCQ', 'True/False', 'Short Answer'] - Flagged questions count

               for q in questions)

#### 2. User Management

# test_answer_evaluator.py**View Users:**

def test_evaluate_mcq():- List all registered users

    evaluator = AnswerEvaluator()- User statistics (quiz count, average score)

    result = evaluator.evaluate_answer("Option A", "Option A", "MCQ")- User details (email, skill level, join date)

    

    assert result is True**Manage Users:**

- Update user skill levels

def test_evaluate_short_answer():- View user activity

    evaluator = AnswerEvaluator()- Monitor user progress

    result = evaluator.evaluate_answer(

        "Python is a programming language",#### 3. Content Moderation

        "Python is a high-level programming language",

        "Short Answer"**Flagged Questions:**

    )- Review user-reported questions

    - View flag reasons

    assert result['is_correct'] is True- Check question details

    assert result['similarity_score'] >= 0.75- Resolve flags

```- Delete inappropriate questions



**Frontend Tests** (Jest + React Testing Library):**Actions:**

```typescript- Mark as resolved

// Quiz.test.tsx- Delete question

describe('Quiz Component', () => {- Ignore flag

  it('renders question text correctly', () => {- View flagging user

    render(<Quiz />);

    expect(screen.getByText(/What is Python/i)).toBeInTheDocument();#### 4. Feedback Management

  });**View Feedback:**

  - All user feedback

  it('submits answer on button click', async () => {- Ratings (1-5 stars)

    render(<Quiz />);- Comments

    const button = screen.getByText(/Submit Answer/i);- Associated questions

    fireEvent.click(button);

    **Analyze Feedback:**

    await waitFor(() => {- Average ratings

      expect(mockSubmitAnswer).toHaveBeenCalled();- Common issues

    });- Improvement areas

  });- User satisfaction

});

```### Admin Best Practices

1. ✅ Review flagged content daily

### 10.2 Integration Testing2. ✅ Monitor feedback trends

3. ✅ Track platform statistics

**API Integration Tests**:4. ✅ Respond to user concerns

```python5. ✅ Ensure question quality

def test_quiz_flow():6. ✅ Remove inappropriate content promptly

    # 1. Login

    login_response = client.post('/api/auth/login', json={---

        'username': 'testuser',

        'password': 'testpass'## 13. Development Timeline

    })

    token = login_response.json['access_token']### Week-wise Implementation

    

    # 2. Start quiz#### **Milestone 1: Weeks 1–3** ✅

    quiz_response = client.post('/api/quiz/start', **User & Profile System + Content Upload**

        headers={'Authorization': f'Bearer {token}'},

        json={'topic': 'Python', 'num_questions': 5}**Completed:**

    )- ✅ User registration with email/password

    quiz_id = quiz_response.json['quiz_id']- ✅ JWT-based authentication

    - ✅ User profile management

    # 3. Submit answers- ✅ Skill level selection

    for question in quiz_response.json['questions']:- ✅ Content upload module (text/PDF)

        client.post(f'/api/quiz/{quiz_id}/answer',- ✅ Profile editor UI

            headers={'Authorization': f'Bearer {token}'},- ✅ Content parsing and chunking

            json={'question_id': question['id'], 'answer': 'Option A'}

        )**Technologies Used:**

    - Flask + SQLAlchemy

    # 4. Complete quiz- React + TypeScript

    results = client.post(f'/api/quiz/{quiz_id}/complete',- JWT authentication

        headers={'Authorization': f'Bearer {token}'}- BCrypt password hashing

    )

    **Deliverables:**

    assert results.status_code == 200- Functional login/signup ✅

    assert 'score_percentage' in results.json- Profile editor UI ✅

```- Content input and parsing ✅



### 10.3 Manual Testing Checklist---



- [ ] User registration with valid/invalid inputs#### **Milestone 2: Weeks 4–5** ✅

- [ ] User login with correct/incorrect credentials**Core Quiz Generator Engine**

- [ ] Quiz creation from predefined topics

- [ ] Quiz creation from uploaded PDF**Completed:**

- [ ] Answer submission for all question types- ✅ Google Gemini AI integration

- [ ] Adaptive difficulty adjustment- ✅ Multiple question types (MCQ, True/False, Fill-in-the-blank, Short Answer)

- [ ] Badge awarding after quiz completion- ✅ Difficulty classification using Bloom's taxonomy

- [ ] Leaderboard updates- ✅ Distractor generation for MCQs

- [ ] Analytics dashboard data display- ✅ Answer evaluation engine

- [ ] Admin dashboard functionality- ✅ Batch generation optimization

- [ ] WebSocket real-time updates

- [ ] Mobile responsiveness**Technologies Used:**

- Google Generative AI

---- spaCy for NLP

- NLTK for text processing

## 11. Deployment- Custom difficulty classifier



### 11.1 Local Development Setup**Deliverables:**

- Working question generator ✅

**Backend**:- 4 question types implemented ✅

```bash- Auto-difficulty labeling ✅

cd backend- Batch generation (4-5x faster) ✅

python -m venv venv

source venv/bin/activate  # or venv\Scripts\activate on Windows---

pip install -r requirements.txt

python app.py#### **Milestone 3: Weeks 6–7** ✅

```**Adaptive Engine + Quiz Interface**



**Frontend**:**Completed:**

```bash- ✅ Adaptive learning engine

cd frontend- ✅ Performance tracking

npm install- ✅ Real-time difficulty adjustment

npm start- ✅ Interactive quiz UI

```- ✅ Live scoring and progress tracking

- ✅ Instant feedback system

### 11.2 Production Deployment (Recommended)- ✅ Results visualization



**Backend** (Gunicorn + Nginx):**Technologies Used:**

```bash- React with TypeScript

# Install Gunicorn- Recharts for visualization

pip install gunicorn- Pandas for analytics

- Custom adaptation algorithm

# Run with Gunicorn

gunicorn -w 4 -b 0.0.0.0:5000 app:app**Deliverables:**

- Quiz UI with real-time feedback ✅

# Nginx configuration- Adaptive difficulty system ✅

server {- Performance-based recommendations ✅

    listen 80;- Analytics dashboard ✅

    server_name yourdomain.com;

    ---

    location /api {

        proxy_pass http://localhost:5000;#### **Milestone 4: Week 8** ✅

        proxy_set_header Host $host;**Admin Panel + Deployment + Documentation**

        proxy_set_header X-Real-IP $remote_addr;

    }**Completed:**

}- ✅ Admin dashboard (4 tabs)

```- ✅ User management interface

- ✅ Content moderation tools

**Frontend** (Build for production):- ✅ Feedback collection system

```bash- ✅ Question flagging mechanism

npm run build- ✅ Docker containerization

# Serve build/ directory with Nginx or Apache- ✅ Docker Compose configuration

```- ✅ Nginx setup

- ✅ Complete documentation

**Database** (PostgreSQL migration):

```python**Technologies Used:**

# Update app.py- React admin components

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@localhost/smart_quizzer'- Docker & Docker Compose

```- Nginx reverse proxy

- Comprehensive docs

### 11.3 Environment Variables

**Deliverables:**

**.env file**:- Admin dashboard with moderation ✅

```- Cloud-ready deployment ✅

# Backend- Complete documentation ✅

GOOGLE_API_KEY=your_gemini_api_key_here- Demo-ready platform ✅

SECRET_KEY=your_secret_key_here

JWT_SECRET_KEY=your_jwt_secret_key_here---

DATABASE_URL=sqlite:///instance/smart_quizzer.db

FLASK_ENV=production### Overall Project Status: ✅ **100% COMPLETE**



# Email (optional)---

SMTP_SERVER=smtp.gmail.com

SMTP_PORT=587## 14. Performance Optimizations

SMTP_USERNAME=your_email@gmail.com

SMTP_PASSWORD=your_app_password### Question Generation Optimization

```

#### Before Optimization

---```

5 questions = 5 API calls × 15 seconds = 75 seconds

## 12. Troubleshooting```



### 12.1 Common Issues#### After Optimization

```

#### Issue: "GOOGLE_API_KEY not found"5 questions = 1 batch API call = 15 seconds

**Solution**: Create `.env` file in backend/ directory with:Speed improvement: 5x faster (80% reduction)

``````

GOOGLE_API_KEY=your_api_key_here

```#### Optimization Techniques Applied



#### Issue: "Module not found" errors1. **Batch Generation**

**Solution**: Reinstall dependencies:   - Generate all questions in single API call

```bash   - 60-80% faster than sequential generation

cd backend   - Fallback to individual generation if needed

pip install -r requirements.txt --force-reinstall

```2. **Reduced Retries**

   - Changed from 3 → 2 retry attempts

#### Issue: Database errors on first run   - Saves 10-30 seconds in error scenarios

**Solution**: Delete `instance/smart_quizzer.db` and restart:

```bash3. **Faster Timeouts**

rm backend/instance/smart_quizzer.db   - Reduced from 30s → 15s per API call

python backend/app.py   - Quicker failure detection

```

4. **Optimized AI Parameters**

#### Issue: Frontend compilation errors   ```python

**Solution**: Clear cache and reinstall:   temperature: 0.7 → 0.9  # Faster, more varied

```bash   maxOutputTokens: 1000 → 800  # Less processing

cd frontend   ```

rm -rf node_modules package-lock.json

npm install5. **Relaxed Validation**

npm start   - Skip strict checks on first attempt

```   - Validate only on retries

   - Accept questions faster

#### Issue: WebSocket connection fails

**Solution**: Ensure Flask-SocketIO is installed and CORS is configured:### Database Optimizations

```python

socketio = SocketIO(app, cors_allowed_origins="*")1. **Indexes**

```   ```sql

   CREATE INDEX idx_users_username ON users(username);

### 12.2 Logging   CREATE INDEX idx_quiz_sessions_user ON quiz_sessions(user_id);

   CREATE INDEX idx_questions_session ON questions(quiz_session_id);

**Backend Logs**:   ```

```python

import logging2. **Query Optimization**

   - Use `filter_by()` for simple queries

logging.basicConfig(   - Join optimization for related data

    level=logging.INFO,   - Pagination for large datasets

    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',

    handlers=[3. **Connection Pooling**

        logging.FileHandler('smart_quizzer.log'),   - Reuse database connections

        logging.StreamHandler()   - Reduce connection overhead

    ]

)### Frontend Optimizations

```

1. **Code Splitting**

**Check logs**:   - Lazy load components

```bash   - Reduce initial bundle size

tail -f backend/smart_quizzer.log

```2. **Caching**

   - Cache API responses

### 12.3 Performance Monitoring   - LocalStorage for user data



**Database Query Optimization**:3. **Optimistic Updates**

```python   - Update UI before API response

# Enable SQLAlchemy query logging   - Better perceived performance

app.config['SQLALCHEMY_ECHO'] = True

---

# Use indexes for frequently queried columns

class User(db.Model):## 15. Security Features

    __tablename__ = 'user'

    __table_args__ = (### Authentication Security

        db.Index('idx_username', 'username'),1. ✅ **Password Hashing** - BCrypt with salt

        db.Index('idx_email', 'email'),2. ✅ **JWT Tokens** - Secure token-based auth

    )3. ✅ **Token Expiration** - Automatic session timeout

```4. ✅ **HTTPS Ready** - SSL/TLS support



**API Response Time Monitoring**:### Authorization Security

```python1. ✅ **Role-Based Access Control** - User/Admin separation

@app.before_request2. ✅ **Route Protection** - Authenticated routes only

def before_request():3. ✅ **API Endpoint Protection** - Token verification

    g.start_time = time.time()4. ✅ **Permission Checks** - Role-based permissions



@app.after_request### Data Security

def after_request(response):1. ✅ **SQL Injection Prevention** - SQLAlchemy ORM

    if hasattr(g, 'start_time'):2. ✅ **XSS Protection** - React automatic escaping

        elapsed = time.time() - g.start_time3. ✅ **CSRF Protection** - Token-based

        logger.info(f"Request took {elapsed:.2f}s")4. ✅ **Input Validation** - Server-side validation

    return response

```### Application Security

1. ✅ **Error Handling** - Centralized error management

---2. ✅ **Rate Limiting** - API rate limits

3. ✅ **CORS Configuration** - Restricted origins

## Appendix A: Badge Definitions4. ✅ **Environment Variables** - Secure config



| Badge Name | Category | Criteria | Rarity |---

|------------|----------|----------|--------|

| First Steps | Participation | Complete 1 quiz | Common |## 16. Future Enhancements

| Marathon Runner | Participation | Complete 100 quizzes | Legendary |

| Perfect Score | Performance | Score 100% on any quiz | Rare |### Planned Features

| Consistency King | Performance | Maintain 80%+ score for 10 quizzes | Epic |1. 🔄 **OAuth Integration** - Social login with Google, GitHub, Microsoft

| Subject Expert | Mastery | Achieve 90%+ average in any topic | Rare |2. 🌐 **Multilingual Support** - Generate questions in multiple languages

| Renaissance Scholar | Mastery | Complete quizzes in 10+ different topics | Epic |3. 📱 **Mobile App** - Native iOS/Android applications

| 7-Day Streak | Streak | Take quizzes for 7 consecutive days | Uncommon |4. 🎮 **Gamification** - Badges, leaderboards, achievements system

| 30-Day Streak | Streak | Take quizzes for 30 consecutive days | Rare |5. 👥 **Collaborative Quizzes** - Real-time multiplayer quiz battles

| Speed Demon | Speed | Complete 10 quizzes with <30s avg per question | Rare |6. 📊 **Advanced Analytics** - Machine learning-based performance insights

| Night Owl | Activity | Complete 50 quizzes between 10 PM - 6 AM | Epic |7. 🔊 **Enhanced Voice Support** - Voice-activated quiz taking

8. 🎨 **Custom Themes** - Dark mode and personalized color schemes

---9. 📧 **Email Notifications** - Scheduled quiz reminders and result summaries

10. 💾 **Export Results** - PDF reports and CSV data export

## Appendix B: API Error Codes11. 🤝 **Peer Learning** - Study groups and shared quizzes

12. 🏆 **Certification** - Complete learning paths with certificates

| Code | Message | Description |13. 📚 **Content Marketplace** - Share and download quiz content

|------|---------|-------------|14. 🔍 **Advanced Search** - Search across all quizzes and questions

| 200 | Success | Request completed successfully |15. 📈 **Progress Milestones** - Achievement tracking and rewards

| 201 | Created | Resource created successfully |

| 400 | Bad Request | Invalid input parameters |### Technical Improvements

| 401 | Unauthorized | Missing or invalid authentication token |1. **PostgreSQL Migration** - Production-grade database

| 403 | Forbidden | User doesn't have permission |2. **Redis Caching** - Performance improvement

| 404 | Not Found | Requested resource doesn't exist |3. **WebSocket Support** - Real-time features

| 409 | Conflict | Resource already exists (e.g., duplicate username) |4. **GraphQL API** - Alternative to REST

| 422 | Unprocessable Entity | Validation error |5. **Microservices** - Service-based architecture

| 429 | Too Many Requests | Rate limit exceeded |6. **Kubernetes** - Container orchestration

| 500 | Internal Server Error | Server-side error |7. **CI/CD Pipeline** - Automated deployment

| 503 | Service Unavailable | External service (AI) temporarily unavailable |8. **Automated Testing** - Unit, integration, E2E tests



------



## Appendix C: Database Migration Scripts## 17. Contributing



**Initial Migration** (Auto-executed on first run):### How to Contribute

```python1. Fork the repository

def initialize_database():2. Create a feature branch (`git checkout -b feature/AmazingFeature`)

    with app.app_context():3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

        db.create_all()4. Push to the branch (`git push origin feature/AmazingFeature`)

        5. Open a Pull Request

        # Create default topics

        topics = [### Development Setup

            Topic(name='Python Programming', category='Technology', is_active=True),```bash

            Topic(name='Data Science', category='Technology', is_active=True),# Clone repository

            # ... 18 more topicsgit clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

        ]cd Smart-Quizzer-AI

        db.session.bulk_save_objects(topics)

        # Backend setup

        # Initialize badgescd backend

        badge_service.initialize_badges()python -m venv venv

        

        db.session.commit()# Activate virtual environment

```# Windows: venv\Scripts\activate

# Mac/Linux: source venv/bin/activate

**Schema Update** (when adding new features):

```bashpip install -r requirements.txt

# Using Flask-Migrate (recommended)

flask db init# Initialize database

flask db migrate -m "Add new feature"cd ..

flask db upgradepython init_database.py

```

# Start backend

---cd backend

python app.py

**Document Version**: 1.0.0  

**Last Updated**: November 2025  # Frontend setup (new terminal)

**Status**: Production Ready  cd frontend

npm install

For additional support, consult README.md or open a GitHub issue.npm start

```

### Code Standards
- Follow PEP 8 for Python
- Use ESLint for JavaScript/TypeScript
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation

---

## 18. License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2025 Smart Quizzer AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Contact & Support

- **Project Repository**: https://github.com/BatchuMamatha/Smart-Quizzer-AI
- **Issues**: https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues
- **Author**: Batchu Mamatha ([@BatchuMamatha](https://github.com/BatchuMamatha))

---

## Acknowledgments

- Google Gemini AI for intelligent question generation
- React community for modern frontend framework
- Flask community for lightweight backend framework
- Open source community for valuable tools and libraries
- All contributors and testers who helped improve this project

---

**Built with ❤️ by Batchu Mamatha**

*Last Updated: November 1, 2025*
*Version: 1.0.0*
*Status: Fully Functional - Local Development Ready ✅*
