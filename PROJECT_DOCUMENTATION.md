# Smart Quizzer AI - Technical Documentation# Smart Quizzer AI - Adaptive Quiz & Question Generator



## Document Information## Complete Project Documentation

- **Project**: Smart Quizzer AI - Adaptive Learning Platform

- **Version**: 1.0.0> **📅 Last Updated:** November 1, 2025  

- **Last Updated**: November 2025> **📌 Version:** 1.0.0  

- **Author**: Mamatha Bachu> **✅ Status:** Fully Functional - Local Development Ready  

- **Tech Stack**: Flask 3.0.0, React 18.2.0, SQLite, Google Gemini AI> **🔒 Security:** All default credentials removed for safety  

> **📖 Note:** This documentation reflects the current state of the project after recent security improvements and documentation cleanup.

---

---

## Table of Contents

## Table of Contents

1. [System Overview](#1-system-overview)1. [Project Overview](#project-overview)

2. [Architecture Design](#2-architecture-design)2. [Project Statement](#project-statement)

3. [Module Documentation](#3-module-documentation)3. [Project Outcomes](#project-outcomes)

4. [Database Schema](#4-database-schema)4. [System Architecture](#system-architecture)

5. [API Reference](#5-api-reference)5. [Technology Stack](#technology-stack)

6. [Frontend Components](#6-frontend-components)6. [Module Implementation](#module-implementation)

7. [AI & Machine Learning](#7-ai--machine-learning)7. [Database Schema](#database-schema)

8. [Workflows](#8-workflows)8. [API Documentation](#api-documentation)

9. [Security & Authentication](#9-security--authentication)9. [Features Implementation](#features-implementation)

10. [Testing](#10-testing)10. [Local Development Setup](#local-development-setup)

11. [Deployment](#11-deployment)11. [User Guide](#user-guide)

12. [Troubleshooting](#12-troubleshooting)12. [Admin Guide](#admin-guide)

13. [Development Timeline](#development-timeline)

---14. [Performance Optimizations](#performance-optimizations)

15. [Security Features](#security-features)

## 1. System Overview16. [Future Enhancements](#future-enhancements)

17. [Contributing](#contributing)

### 1.1 Project Description18. [License](#license)



Smart Quizzer AI is an adaptive learning platform that uses artificial intelligence to generate personalized quizzes, evaluate answers with semantic understanding, and track user progress through comprehensive analytics. The system employs Google Gemini AI for question generation, NLP models for answer evaluation, and adaptive algorithms for difficulty adjustment.---



### 1.2 Key Capabilities## 1. Project Overview



- **Automated Question Generation**: AI creates contextually relevant questions from custom content**Smart Quizzer AI** is an intelligent, adaptive quiz generation platform that creates personalized assessments from educational content. The system uses advanced NLP and AI techniques to generate dynamic quizzes that adapt to individual learner performance.

- **Adaptive Difficulty**: Real-time adjustment based on user performance

- **Intelligent Evaluation**: NLP-based semantic answer matching with detailed explanations### Key Highlights

- **Comprehensive Analytics**: Performance tracking, trend analysis, topic mastery visualization- 🤖 **AI-Powered Question Generation** using Google Gemini AI

- **Gamification**: 21-badge achievement system with progress tracking- 🎯 **Adaptive Learning Engine** that adjusts difficulty based on performance

- **Real-time Features**: WebSocket-based multiplayer quizzes and live leaderboards- 📚 **Multi-Format Content Support** (Text, PDF, DOCX, JSON, CSV)

- **Content Processing**: PDF, DOCX, TXT, and URL content extraction- 🌐 **Multi-Question Types** (MCQ, True/False, Fill-in-the-blank, Short Answer)

- 📊 **Real-time Analytics** and performance tracking

### 1.3 System Requirements- 🛡️ **Role-Based Access Control** (Admin/User separation)

- 🚀 **Optimized Performance** (4-5x faster question generation)

#### Backend Requirements- � **Enhanced Security** (No default credentials, JWT authentication)

- Python 3.13+- 🎤 **Audio Feedback** (Text-to-speech with live captions)

- Flask 3.0.0- 🚩 **Content Moderation** (Flag questions and submit feedback)

- SQLite 3.0+ (or PostgreSQL for production)

- Google Gemini API Key---

- 2GB RAM minimum, 4GB recommended

- 500MB disk space (excluding uploads)## 2. Project Statement



#### Frontend Requirements### Problem

- Node.js 16+Learning is not one-size-fits-all. Students and self-learners often struggle to find quizzes that align with their current understanding or preferred learning style. Existing quiz tools offer static, generic questions that do not adapt to individual performance or difficulty preferences.

- npm 8+

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)### Solution

- 1GB RAM minimumThis open-source project addresses the need for personalized, adaptive assessments by generating dynamic quizzes from any educational content (e.g., Wikipedia articles, open textbooks, course material). The system allows users to select difficulty levels and question types and adapts future questions based on performance history.



#### Network Requirements### Unique Value Propositions

- Internet connection for AI API calls1. **Dynamic Content-to-Quiz Conversion** - Upload any educational material and get instant quizzes

- Ports: 5000 (backend), 8080 (frontend)2. **Adaptive Difficulty Adjustment** - Real-time difficulty calibration based on user performance

- WebSocket support for real-time features3. **Advanced Answer Evaluation** - Semantic similarity matching for subjective answers

4. **Bloom's Taxonomy Integration** - Questions categorized by cognitive complexity

---5. **Performance Analytics** - Comprehensive insights into learning progress



## 2. Architecture Design---



### 2.1 High-Level Architecture## 3. Project Outcomes



```### ✅ Implemented Features

┌───────────────────────────────────────────────────────────┐

│                     Client Layer                           │#### Core Functionality

│  ┌─────────────────────────────────────────────────────┐  │- ✅ **Content Upload & Processing**

│  │          React Frontend (TypeScript)                │  │  - Upload text files, PDFs, or paste custom content

│  │  - 13 Pages  - 8 Components  - Tailwind CSS        │  │  - Automatic content parsing and segmentation

│  └─────────────────────────────────────────────────────┘  │  - NLP-based knowledge chunk extraction

└───────────────────────────┬───────────────────────────────┘

                            │ HTTP/HTTPS + WebSocket- ✅ **Dynamic Question Generation**

                            ▼  - Multiple Choice Questions (MCQ)

┌───────────────────────────────────────────────────────────┐  - True/False questions

│                   Application Layer                        │  - Fill-in-the-blank questions

│  ┌─────────────────────────────────────────────────────┐  │  - Short answer questions

│  │         Flask Application (app.py)                  │  │  - Batch generation for 4-5x faster performance

│  │  - 90+ REST API Endpoints                           │  │

│  │  - 10 WebSocket Event Handlers                      │  │- ✅ **Adaptive Learning System**

│  │  - JWT Authentication Middleware                    │  │  - Performance tracking across sessions

│  │  - Error Handling & Logging                         │  │  - Real-time difficulty adjustment

│  └─────────────────────────────────────────────────────┘  │  - Personalized question recommendations

└───────────────────────────┬───────────────────────────────┘  - Consecutive correct/incorrect tracking

                            │  - Response time analysis

            ┌───────────────┴──────────────┐

            ▼                              ▼- ✅ **User Management**

┌───────────────────────┐      ┌──────────────────────────┐  - Secure registration and login (JWT-based)

│   Business Logic      │      │   External Services      │  - User profiles with skill levels

│   ┌───────────────┐   │      │  ┌───────────────────┐  │  - Performance history tracking

│   │Question Gen   │   │      │  │ Google Gemini AI  │  │  - Role-based access control (User/Admin)

│   │Answer Eval    │   │      │  │ (Question Gen)    │  │

│   │Badge System   │   │      │  └───────────────────┘  │- ✅ **Admin Dashboard**

│   │Analytics Eng  │   │      │  ┌───────────────────┐  │  - User management interface

│   │Learning Paths │   │      │  │ Sentence-BERT     │  │  - Content moderation tools

│   │Multiplayer    │   │      │  │ (Semantic Match)  │  │  - Flagged question review system

│   │Leaderboard    │   │      │  └───────────────────┘  │  - Feedback collection and analysis

│   └───────────────┘   │      └──────────────────────────┘  - Platform statistics and analytics

└───────────┬───────────┘

            │- ✅ **Web Interface**

            ▼  - Responsive React-based UI

┌───────────────────────────────────────────────────────────┐  - Real-time quiz interface with instant feedback

│                    Data Access Layer                       │  - Progress tracking and visualization

│  ┌─────────────────────────────────────────────────────┐  │  - Detailed results and explanations

│  │         SQLAlchemy ORM (models.py)                  │  │  - Analytics dashboard with charts

│  │  - 15 Models with Relationships                     │  │

│  │  - Migration Support                                │  │- ✅ **Development Ready**

│  │  - Query Optimization                               │  │  - Automated setup scripts (Windows & Mac/Linux)

│  └─────────────────────────────────────────────────────┘  │  - Environment-based configuration

└───────────────────────────┬───────────────────────────────┘  - Database initialization with sample data

                            │  - Comprehensive documentation

                            ▼  - Local development optimized

┌───────────────────────────────────────────────────────────┐

│                    Database Layer                          │---

│  ┌─────────────────────────────────────────────────────┐  │

│  │         SQLite Database (smart_quizzer.db)          │  │## 4. System Architecture

│  │  - Users, QuizSessions, Questions                   │  │

│  │  - Badges, Analytics, Leaderboard                   │  │### High-Level Architecture

│  │  - Learning Paths, Multiplayer Data                 │  │

│  └─────────────────────────────────────────────────────┘  │```

└───────────────────────────────────────────────────────────┘┌─────────────────────────────────────────────────────────────────┐

```│                         Client Layer                             │

│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │

### 2.2 Technology Stack│  │ User Web App │  │ Admin Portal │  │ Mobile Ready │          │

│  │   (React)    │  │   (React)    │  │   (PWA)      │          │

#### Backend Technologies│  └──────────────┘  └──────────────┘  └──────────────┘          │

| Component | Technology | Version | Purpose |└─────────────────────────────────────────────────────────────────┘

|-----------|-----------|---------|---------|                              │

| Framework | Flask | 3.0.0 | Web application framework |                              ▼

| ORM | SQLAlchemy | 2.0.43 | Database abstraction |┌─────────────────────────────────────────────────────────────────┐

| Database | SQLite | 3.x | Data storage |│                      API Gateway / Nginx                         │

| Authentication | Flask-JWT-Extended | 4.6.0 | JWT token management |│                    (Load Balancer & Routing)                     │

| WebSocket | Flask-SocketIO | 5.3.6 | Real-time communication |└─────────────────────────────────────────────────────────────────┘

| Password Hash | Bcrypt | 4.1.2 | Secure password storage |                              │

| AI Engine | Google Gemini | 1.5 Flash | Question generation |                              ▼

| NLP | Sentence-Transformers | 2.7.0+ | Semantic analysis |┌─────────────────────────────────────────────────────────────────┐

| NLP | NLTK | 3.8.0+ | Text processing |│                    Application Layer (Flask)                     │

| PDF Processing | pdfplumber | 0.11.0+ | PDF text extraction |│  ┌──────────────────────────────────────────────────────────┐  │

| Document Parsing | python-docx | 1.1.0+ | DOCX processing |│  │              RESTful API Endpoints                        │  │

| Web Scraping | BeautifulSoup4 | 4.12.0+ | HTML parsing |│  │  • Authentication    • Quiz Management                    │  │

│  │  • User Profiles     • Content Upload                     │  │

#### Frontend Technologies│  │  • Admin Operations  • Analytics                          │  │

| Component | Technology | Version | Purpose |│  └──────────────────────────────────────────────────────────┘  │

|-----------|-----------|---------|---------|└─────────────────────────────────────────────────────────────────┘

| Framework | React | 18.2.0 | UI framework |                              │

| Language | TypeScript | 4.9.5 | Type safety |            ┌─────────────────┼─────────────────┐

| Styling | Tailwind CSS | 3.x | Utility-first CSS |            ▼                 ▼                 ▼

| Routing | React Router | 6.x | Client-side routing |┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐

| HTTP Client | Axios | 1.x | API communication |│  Business Logic │ │  AI/ML Layer    │ │  Data Layer     │

| Build Tool | Webpack | 5.x | Module bundler |│                 │ │                 │ │                 │

│ • Auth Service  │ │ • Gemini AI     │ │ • SQLite/       │

### 2.3 Design Patterns│ • Quiz Engine   │ │ • Question Gen  │ │   PostgreSQL    │

│ • Adaptive      │ │ • Difficulty    │ │ • User Data     │

#### Backend Patterns│   Learning      │ │   Classifier    │ │ • Quiz Sessions │

1. **MVC Pattern**: Models (models.py), Views (routes in app.py), Controllers (service layer)│ • Answer Eval   │ │ • Answer        │ │ • Questions     │

2. **Service Layer Pattern**: Separate business logic (badge_service, analytics_service, etc.)│ • Analytics     │ │   Evaluator     │ │ • Analytics     │

3. **Repository Pattern**: SQLAlchemy ORM abstracts database access└─────────────────┘ └─────────────────┘ └─────────────────┘

4. **Factory Pattern**: Database and Flask-SocketIO initialization```

5. **Decorator Pattern**: Route decorators, authentication decorators

### Component Architecture

#### Frontend Patterns

1. **Component-Based Architecture**: Reusable React components```

2. **Container/Presentational Pattern**: Smart containers, dumb componentsBackend (Python/Flask)

3. **Custom Hooks**: useEffect, useState, useCallback for state management├── app.py                          # Main Flask application

4. **Centralized API Client**: Single axios instance with interceptors├── models.py                       # Database models (SQLAlchemy)

├── auth.py                         # JWT authentication

---├── question_gen.py                 # AI question generator

├── answer_evaluator_simple.py     # Answer evaluation engine

## 3. Module Documentation├── content_processor.py            # Content parsing & segmentation

├── error_handler.py                # Centralized error handling

### Module 1: User Input & Topic Selection└── requirements.txt                # Python dependencies



**Files**: `frontend/src/pages/Dashboard.tsx`, `backend/app.py` (topic endpoints)Frontend (React/TypeScript)

├── src/

**Purpose**: Allows users to select quiz topics, configure quiz parameters, and start quiz sessions.│   ├── components/

│   │   └── ContentUpload.tsx       # Content upload component

**Key Features**:│   ├── pages/

- Topic selection from 20+ predefined topics│   │   ├── Login.tsx               # Authentication pages

- Custom quiz parameters (question count, difficulty, skill level)│   │   ├── Register.tsx

- Custom content upload (PDF, DOCX, TXT, URL)│   │   ├── Dashboard.tsx           # User dashboard

- Topic categories: Science, Technology, Mathematics, Arts, etc.│   │   ├── Quiz.tsx                # Quiz interface

│   │   ├── Results.tsx             # Results display

**Implementation Details**:│   │   ├── History.tsx             # Quiz history

```python│   │   ├── Analytics.tsx           # Performance analytics

# Backend: Topic Model│   │   ├── AdminDashboard.tsx      # Admin interface

class Topic(db.Model):│   │   └── ProfilePage.tsx         # User profile

    id = db.Column(db.Integer, primary_key=True)│   ├── lib/

    name = db.Column(db.String(100), unique=True, nullable=False)│   │   ├── api.ts                  # API client

    description = db.Column(db.Text)│   │   └── userManager.ts          # User state management

    category = db.Column(db.String(50))│   └── App.tsx                     # Main React app

    is_active = db.Column(db.Boolean, default=True)└── package.json

```

Deployment

**API Endpoints**:├── docker-compose.yml              # Multi-container orchestration

- `GET /api/topics` - Fetch all active topics├── backend/Dockerfile              # Backend container

├── frontend/Dockerfile             # Frontend container

**Workflow**:└── nginx.conf                      # Reverse proxy config

1. User navigates to Dashboard```

2. Frontend fetches topics from backend

3. User selects topic or uploads custom content### Data Flow Architecture

4. User configures quiz parameters

5. Frontend sends quiz start request```

6. Backend creates quiz session and generates questionsUser Action → Frontend → API Gateway → Flask Backend

                                           ↓

---                                    Authentication

                                           ↓

### Module 2: AI-Based Question Generation                                    Business Logic

                                           ↓

**Files**: `backend/question_gen.py`, `backend/content_processor.py`                    ┌──────────────────────┼──────────────────────┐

                    ▼                      ▼                      ▼

**Purpose**: Generates high-quality, contextually relevant questions using Google Gemini AI.            AI Processing           Database Query        Content Processing

            (Gemini AI)             (SQLAlchemy)          (NLP Pipeline)

**Key Components**:                    │                      │                      │

                    └──────────────────────┴──────────────────────┘

#### 2.1 Question Generator (`question_gen.py`)                                           ↓

```python                                    Response Formation

class QuestionGenerator:                                           ↓

    def __init__(self):                                    Frontend Update

        self.model = genai.GenerativeModel('gemini-1.5-flash')                                           ↓

        self.generation_config = {                                    User Interface

            'temperature': 0.7,```

            'top_p': 0.95,

            'max_output_tokens': 2048---

        }

    ## 5. Technology Stack

    def generate_questions(self, topic, difficulty, count):

        # AI prompt engineering for question generation### Backend Technologies

        # Includes Bloom's taxonomy levels| Technology | Purpose | Version |

        # Returns structured JSON with questions, options, answers|------------|---------|---------|

```| **Python** | Backend language | 3.9+ |

| **Flask** | Web framework | 2.3.0 |

#### 2.2 Content Processor (`content_processor.py`)| **SQLAlchemy** | ORM | 2.0.0 |

```python| **SQLite/PostgreSQL** | Database | - |

class ContentProcessor:| **Google Gemini AI** | Question generation | Latest |

    def extract_from_pdf(self, file_path):| **JWT** | Authentication | PyJWT 2.8.0 |

        # Uses pdfplumber for accurate text extraction| **spaCy** | NLP processing | 3.5.0 |

        # Handles multi-column layouts, tables| **NLTK** | Text analysis | 3.8 |

        | **Pandas** | Data analysis | 2.0.0 |

    def extract_from_docx(self, file_path):| **BCrypt** | Password hashing | 4.0.0 |

        # Extracts text from Word documents| **Requests** | HTTP client | 2.31.0 |

        

    def extract_from_url(self, url):### Frontend Technologies

        # Web scraping with BeautifulSoup| Technology | Purpose | Version |

        # Handles various HTML structures|------------|---------|---------|

```| **React** | UI library | 18.2.0 |

| **TypeScript** | Type safety | 5.0.0 |

**Question Types**:| **React Router** | Routing | 6.11.0 |

1. **Multiple Choice** (4 options)| **Axios** | HTTP client | 1.4.0 |

2. **True/False**| **Tailwind CSS** | Styling | 3.3.0 |

3. **Short Answer** (open-ended)| **Recharts** | Data visualization | 2.5.0 |



**Bloom's Taxonomy Levels**:### DevOps & Deployment

- **Remember**: Basic recall (Level 1)| Technology | Purpose |

- **Understand**: Comprehension (Level 2)|------------|---------|

- **Apply**: Application (Level 3)| **Docker** | Containerization |

- **Analyze**: Analysis (Level 4)| **Docker Compose** | Multi-container orchestration |

- **Evaluate**: Evaluation (Level 5)| **Nginx** | Reverse proxy & load balancing |

- **Create**: Synthesis (Level 6)| **Git** | Version control |



**API Endpoints**:### AI/ML Libraries

- `POST /api/questions/generate` - Generate questions from topic- **Google Generative AI** - Question generation

- `POST /api/questions/generate-from-pdf` - Generate from uploaded PDF- **Transformers (Hugging Face)** - Optional local models

- `POST /api/questions/generate-from-text` - Generate from pasted text- **Sentence Transformers** - Semantic similarity

- `POST /api/content/upload` - Upload file for processing- **NLTK/spaCy** - NLP preprocessing

- `POST /api/content/process-url` - Extract content from URL

---

---

## 6. Module Implementation

### Module 3: Difficulty Classification

### Module 1: User & Profile Management ✅

**Files**: `backend/question_gen.py` (DifficultyClassifier class)

#### Features Implemented

**Purpose**: Classifies question difficulty using multi-factor analysis for adaptive quiz generation.1. **User Registration**

   - Email-based signup

**Classification Algorithm**:   - Password strength validation

```python   - Secure password hashing (BCrypt)

class DifficultyClassifier:   - Duplicate user prevention

    def __init__(self):

        self.weights = {2. **User Authentication**

            'bloom_taxonomy': 0.40,  # 40% weight   - JWT-based token authentication

            'semantic_complexity': 0.30,  # 30% weight   - Secure login system

            'text_metrics': 0.20,  # 20% weight   - Token refresh mechanism

            'historical_data': 0.10  # 10% weight   - Session management

        }

    3. **User Profiles**

    def classify_difficulty(self, question_text, bloom_level, correct_rate=None):   - Personal information management

        # Factor 1: Bloom's Taxonomy mapping   - Skill level selection (Beginner/Intermediate/Advanced)

        bloom_score = self._bloom_to_score(bloom_level)   - Profile customization

           - Performance history tracking

        # Factor 2: Semantic complexity (sentence embeddings)

        semantic_score = self._semantic_complexity(question_text)4. **Role-Based Access Control**

           - User role (quiz taker)

        # Factor 3: Text metrics (readability, sentence length)   - Admin role (content moderator)

        text_score = self._text_complexity(question_text)   - Automatic route protection

           - Permission-based features

        # Factor 4: Historical performance data

        historical_score = self._historical_difficulty(correct_rate)#### API Endpoints

        ```

        # Weighted combinationPOST   /api/auth/register          # User registration

        final_score = (POST   /api/auth/login             # User login

            bloom_score * self.weights['bloom_taxonomy'] +GET    /api/auth/profile           # Get user profile

            semantic_score * self.weights['semantic_complexity'] +PUT    /api/auth/profile/skill-level  # Update skill level

            text_score * self.weights['text_metrics'] +```

            historical_score * self.weights['historical_data']

        )#### Database Schema

        ```sql

        # Map to difficulty levelCREATE TABLE users (

        if final_score < 0.33:    id INTEGER PRIMARY KEY,

            return 'Easy'    username VARCHAR(80) UNIQUE NOT NULL,

        elif final_score < 0.67:    email VARCHAR(120) UNIQUE NOT NULL,

            return 'Medium'    password_hash VARCHAR(128) NOT NULL,

        else:    full_name VARCHAR(100) NOT NULL,

            return 'Hard'    skill_level VARCHAR(20) DEFAULT 'Beginner',

```    role VARCHAR(20) DEFAULT 'user',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

**Difficulty Levels**:    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

- **Easy**: Beginner-friendly, basic recall);

- **Medium**: Intermediate, requires understanding```

- **Hard**: Advanced, analysis and synthesis

---

---

### Module 2: Content Ingestion & Parsing ✅

### Module 4: Adaptive Quiz Engine

#### Features Implemented

**Files**: `backend/app.py` (adaptive quiz logic)1. **Content Upload Methods**

   - Text paste (direct input)

**Purpose**: Dynamically adjusts question difficulty based on real-time user performance.   - PDF file upload

   - URL scraping (future enhancement)

**Adaptive Algorithm**:   - Multiple file format support

```python

def get_next_difficulty(current_difficulty, is_correct, consecutive_correct, consecutive_wrong):2. **Content Processing Pipeline**

    """   ```python

    Adaptive difficulty adjustment algorithm   Raw Content → Cleaning → Segmentation → Knowledge Chunks

       ```

    Rules:

    1. 3 consecutive correct → increase difficulty3. **NLP-Based Processing**

    2. 2 consecutive wrong → decrease difficulty   - Text normalization

    3. Perfect score (100%) → increase difficulty   - Sentence segmentation

    4. Low score (<50%) → decrease difficulty   - Paragraph extraction

    """   - Content summarization

    if consecutive_correct >= 3:   - Keyword extraction

        return upgrade_difficulty(current_difficulty)

    elif consecutive_wrong >= 2:4. **Content Validation**

        return downgrade_difficulty(current_difficulty)   - Minimum content length (10 characters)

    else:   - Maximum content size (10MB)

        return current_difficulty   - Format validation

```   - Encoding detection



**Adjustment Logic**:#### API Endpoints

1. **Track Performance**: Monitor correct/wrong answers in real-time```

2. **Calculate Streaks**: Count consecutive correct/incorrect answersPOST   /api/content/upload         # Upload custom content

3. **Apply Rules**: Use threshold-based rules for adjustmentPOST   /api/quiz/start             # Start quiz with content

4. **Generate Next Question**: Request question at adjusted difficulty```

5. **Update Session**: Store difficulty change in quiz session

#### Content Processor Architecture

**Performance Metrics**:```python

- Current score percentageclass ContentProcessor:

- Average time per question    def process_text(text: str) -> ProcessedContent:

- Difficulty distribution        # 1. Clean and normalize

- Streak length        cleaned = self.clean_text(text)

        

---        # 2. Segment into chunks

        chunks = self.segment_content(cleaned)

### Module 5: Answer Evaluation & Feedback        

        # 3. Extract metadata

**Files**: `backend/answer_evaluator_simple.py`        metadata = self.extract_metadata(chunks)

        

**Purpose**: Evaluates user answers using semantic similarity and provides detailed feedback.        # 4. Return processed content

        return ProcessedContent(chunks, metadata)

**Evaluation Engine**:```

```python

class AnswerEvaluator:---

    def __init__(self):

        self.model = SentenceTransformer('all-MiniLM-L6-v2')### Module 3: Question Generator Engine ✅

        self.similarity_threshold = 0.75  # 75% similarity for correctness

    #### Features Implemented

    def evaluate_answer(self, user_answer, correct_answer, question_type):1. **AI-Powered Generation**

        if question_type in ['MCQ', 'True/False']:   - Google Gemini AI integration

            # Exact match for structured questions   - Batch generation (5 questions in 1 API call)

            return user_answer.lower() == correct_answer.lower()   - Optimized for speed (4-5x faster)

           - Automatic retry mechanism

        elif question_type == 'Short Answer':

            # Semantic similarity for open-ended questions2. **Question Types**

            user_embedding = self.model.encode(user_answer)   - **Multiple Choice Questions (MCQ)**

            correct_embedding = self.model.encode(correct_answer)     - 4 options per question

                 - Plausible distractors

            similarity = cosine_similarity([user_embedding], [correct_embedding])[0][0]     - Single correct answer

               

            is_correct = similarity >= self.similarity_threshold   - **True/False Questions**

            confidence = similarity * 100     - Statement validation

                 - Clear true/false distinction

            return {   

                'is_correct': is_correct,   - **Fill-in-the-Blank**

                'confidence': confidence,     - Context-based blanks

                'similarity_score': similarity     - Word/phrase completion

            }   

```   - **Short Answer**

     - Open-ended responses

**Feedback Generation**:     - Semantic evaluation

1. **Immediate Feedback**: Show correct/incorrect status instantly

2. **Detailed Explanation**: AI-generated explanation for each question3. **Difficulty Classification**

3. **Semantic Analysis**: For short answers, show similarity percentage   - Bloom's Taxonomy integration

4. **Improvement Tips**: Suggestions based on mistake patterns   - 6 cognitive levels:

     - Remember (Basic)

**Grading Rules**:     - Understand (Basic)

- MCQ/True-False: Binary (correct/incorrect)     - Apply (Intermediate)

- Short Answer: Threshold-based (75%+ similarity = correct)     - Analyze (Intermediate)

- Partial Credit: Not currently supported (future enhancement)     - Evaluate (Advanced)

     - Create (Advanced)

---

4. **Question Quality Assurance**

### Module 6: User Profile & Progress Tracking   - Uniqueness checking

   - Difficulty validation

**Files**: `backend/models.py` (User, QuizSession), `backend/analytics_service.py`   - Content relevance scoring

   - Grammar checking

**Purpose**: Tracks user performance, generates analytics, and provides personalized insights.

#### Question Generation Pipeline

**User Model**:

```python```

class User(db.Model):Content Input

    id = db.Column(db.Integer, primary_key=True)    ↓

    username = db.Column(db.String(80), unique=True, nullable=False)AI Prompt Construction

    email = db.Column(db.String(120), unique=True, nullable=False)    ↓

    password_hash = db.Column(db.String(255), nullable=False)Gemini AI API Call

    full_name = db.Column(db.String(200))    ↓

    skill_level = db.Column(db.String(20), default='Beginner')  # Beginner/Intermediate/AdvancedResponse Parsing

    role = db.Column(db.String(20), default='user')  # user/admin    ↓

    created_at = db.Column(db.DateTime, default=datetime.utcnow)Difficulty Classification

        ↓

    # RelationshipsQuality Validation

    quiz_sessions = db.relationship('QuizSession', backref='user', lazy=True)    ↓

    badges = db.relationship('UserBadge', backref='user', lazy=True)Question Storage

    performance_trends = db.relationship('PerformanceTrend', backref='user', lazy=True)```

```

#### API Endpoints

**Analytics Features**:```

POST   /api/questions/generate     # Generate questions

#### 6.1 Performance TrendsPOST   /api/quiz/next              # Get adaptive next question

```python```

class PerformanceTrend(db.Model):

    id = db.Column(db.Integer, primary_key=True)#### Performance Optimizations

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))| Optimization | Impact |

    date = db.Column(db.Date, nullable=False)|--------------|--------|

    quizzes_taken = db.Column(db.Integer, default=0)| Batch generation | 60-80% faster |

    total_questions = db.Column(db.Integer, default=0)| Reduced retries (3→2) | 10-30s saved |

    correct_answers = db.Column(db.Integer, default=0)| Faster timeout (30s→15s) | 50% faster failures |

    average_score = db.Column(db.Float, default=0.0)| Higher temperature (0.7→0.9) | 1-3s per question |

    average_time_per_question = db.Column(db.Float, default=0.0)| Relaxed validation | 2-5s per question |

    topics_covered = db.Column(db.JSON)  # List of topics attempted

```**Total Speed Improvement: 4-5x faster** (75s → 15s for 5 questions)



#### 6.2 Topic Mastery---

- Tracks performance per topic

- Calculates mastery percentage (0-100%)### Module 4: Adaptive Learning Engine ✅

- Identifies strengths and weaknesses

- Visual heatmap representation#### Features Implemented

1. **Performance Tracking**

#### 6.3 Learning Streaks   - Question-by-question results

- Daily login streaks   - Accuracy calculation

- Quiz completion streaks   - Response time tracking

- Topic-specific streaks   - Consecutive correct/incorrect streaks

- Streak badges and rewards   - Performance trends over time



**API Endpoints**:2. **Adaptive Difficulty Adjustment**

- `GET /api/auth/profile` - Get user profile   ```python

- `GET /api/quiz/history` - Get quiz history   Performance Metrics → Difficulty Analysis → Next Level Recommendation

- `GET /api/analytics/trends?days=30` - Get performance trends   ```

- `GET /api/analytics/topic-mastery` - Get topic mastery data

- `GET /api/analytics/weekly-report` - Get weekly statistics3. **Adaptation Algorithm**

- `GET /api/analytics/recommendations` - Get AI recommendations   ```python

   def determine_next_difficulty(current_performance):

---       if accuracy >= 0.80 and confidence >= 0.7:

           return "promote_to_higher_difficulty"

### Module 7: Quiz Interface (Frontend)       elif accuracy <= 0.40:

           return "demote_to_easier_difficulty"

**Files**: `frontend/src/pages/Quiz.tsx`, `frontend/src/pages/Results.tsx`       else:

           return "maintain_current_difficulty"

**Purpose**: Interactive quiz-taking interface with real-time feedback and timer.   ```



**Quiz Flow**:4. **Metrics Tracked**

1. **Quiz Start**: Display first question   - Total questions attempted

2. **Question Display**: Show question text, options, timer   - Correct answers count

3. **Answer Selection**: User clicks answer   - Accuracy percentage

4. **Immediate Feedback**: Show correct/incorrect with explanation   - Average response time

5. **Next Question**: Load next question (adaptive difficulty)   - Difficulty progression

6. **Quiz Completion**: Show final results with detailed breakdown   - Learning curve analysis



**Key Components**:5. **Personalization Features**

```typescript   - User-specific difficulty profiles

interface QuizState {   - Question type preferences

    quizId: number;   - Topic mastery levels

    currentQuestionIndex: number;   - Weak area identification

    totalQuestions: number;

    questions: Question[];#### Adaptive Engine Architecture

    answers: UserAnswer[];

    score: number;```python

    timeRemaining: number;class AdaptiveQuizEngine:

    isCompleted: boolean;    # Core components

}    - user_performance_history

    - difficulty_ladder

function Quiz() {    - adaptation_sensitivity

    const [quizState, setQuizState] = useState<QuizState>(initialState);    

        # Key methods

    const handleAnswerSubmit = async (answer: string) => {    - initialize_user_profile()

        // Submit answer to backend    - record_answer()

        const result = await quizAPI.submitAnswer(quizId, questionId, answer);    - calculate_performance_metrics()

            - determine_next_difficulty()

        // Update score    - get_adaptive_question_recommendation()

        if (result.is_correct) {```

            setScore(score + 1);

        }#### Difficulty Transition Rules

        

        // Load next question (with adaptive difficulty)| Current Level | Accuracy | Action |

        loadNextQuestion();|---------------|----------|--------|

    };| Easy | ≥80% | Promote to Medium |

}| Easy | <40% | Stay at Easy |

```| Medium | ≥75% | Promote to Hard |

| Medium | <45% | Demote to Easy |

**Features**:| Hard | ≥70% | Stay at Hard |

- Timer per question (optional)| Hard | <50% | Demote to Medium |

- Progress bar

- Skip question option---

- Review answers before submission

- Detailed results page with explanations### Module 5: Web Interface + Quiz UI ✅



---#### Features Implemented

1. **Dashboard**

### Module 8: Admin Dashboard & Leaderboard   - User statistics overview

   - Recent quiz history

**Files**: `frontend/src/pages/AdminDashboard.tsx`, `backend/leaderboard_service.py`   - Topic selection

   - Quick start quiz options

**Purpose**: Provides admin tools for user management, content moderation, and system monitoring.   - Skill level configuration



**Admin Features**:2. **Quiz Interface**

   - Clean, responsive design

#### 8.1 User Management   - Real-time progress tracking

- View all registered users   - Question type indicators

- Update user skill levels   - Difficulty level display

- View user statistics   - Timer functionality

- Monitor user activity   - Instant feedback

   - Adaptive insights

#### 8.2 Flagged Questions Review

```python3. **Results Page**

class FlaggedQuestion(db.Model):   - Overall score display

    id = db.Column(db.Integer, primary_key=True)   - Question-by-question review

    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))   - Detailed explanations

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))   - Performance analysis

    reason = db.Column(db.Text, nullable=False)   - Recommendations

    status = db.Column(db.String(20), default='pending')  # pending/reviewed/resolved   - Social sharing options

    flagged_at = db.Column(db.DateTime, default=datetime.utcnow)

    resolved_at = db.Column(db.DateTime)4. **Analytics Dashboard**

    admin_notes = db.Column(db.Text)   - Performance trends (charts)

```   - Topic-wise breakdown

   - Difficulty analysis

Admin can:   - Time-based filters

- View all flagged questions   - Improvement tracking

- Review flag reasons   - Weak area identification

- Resolve or delete flagged questions

- Add admin notes5. **History Page**

   - Past quiz sessions

#### 8.3 Leaderboard System   - Score history

```python   - Topic distribution

class QuizLeaderboard(db.Model):   - Performance statistics

    id = db.Column(db.Integer, primary_key=True)   - Retry options

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    quiz_session_id = db.Column(db.Integer, db.ForeignKey('quiz_session.id'))#### UI Components

    topic = db.Column(db.String(100))

    score = db.Column(db.Float, nullable=False)```typescript

    total_questions = db.Column(db.Integer)// Key React Components

    correct_answers = db.Column(db.Integer)├── Dashboard.tsx           # Main user dashboard

    time_taken = db.Column(db.Integer)  # in seconds├── Quiz.tsx               # Interactive quiz interface

    difficulty_level = db.Column(db.String(20))├── Results.tsx            # Results with analytics

    completed_at = db.Column(db.DateTime, default=datetime.utcnow)├── History.tsx            # Quiz history list

```├── Analytics.tsx          # Performance charts

├── ContentUpload.tsx      # Custom content upload

**Leaderboard Features**:├── ProfilePage.tsx        # User profile editor

- Global leaderboard (all topics)└── AdminDashboard.tsx     # Admin management panel

- Topic-specific leaderboards```

- Time-based filtering (daily, weekly, monthly, all-time)

- Real-time updates via WebSocket#### Design Features

- User ranking and percentile- 🎨 **Modern UI** - Gradient backgrounds, smooth animations

- 📱 **Responsive Design** - Mobile-first approach

**Ranking Algorithm**:- ♿ **Accessibility** - ARIA labels, keyboard navigation

```python- 🌈 **Visual Feedback** - Color-coded results, progress bars

def calculate_leaderboard_score(quiz_session):- 🚀 **Performance** - Lazy loading, code splitting

    """- 🎯 **UX Optimization** - Minimal clicks, intuitive flow

    Score = (Correct% * 70) + (Difficulty Bonus * 20) + (Speed Bonus * 10)

    ---

    Difficulty Bonus:

    - Easy: 0 points### Module 6: Admin Dashboard & Feedback ✅

    - Medium: 10 points

    - Hard: 20 points#### Features Implemented

    1. **Admin Dashboard**

    Speed Bonus:   - Platform statistics overview

    - < 30 sec/question: 10 points   - User management

    - 30-60 sec/question: 5 points   - Content moderation

    - > 60 sec/question: 0 points   - Feedback review

    """   - Flagged question management

    correct_percentage = (quiz_session.correct_answers / quiz_session.total_questions) * 100

    2. **User Management**

    difficulty_bonus = {   - View all users

        'Easy': 0,   - User statistics

        'Medium': 10,   - Skill level updates

        'Hard': 20   - Activity monitoring

    }.get(quiz_session.difficulty_level, 0)

    3. **Content Moderation**

    avg_time = quiz_session.time_taken / quiz_session.total_questions   - Review flagged questions

    speed_bonus = 10 if avg_time < 30 else (5 if avg_time < 60 else 0)   - Delete inappropriate content

       - Resolve flags

    final_score = (correct_percentage * 0.7) + (difficulty_bonus * 0.2) + (speed_bonus * 0.1)   - Content quality assurance

    

    return final_score4. **Feedback System**

```   - Collect user feedback on questions

   - Rating system (1-5 stars)

---   - Comment collection

   - Feedback analysis

## 4. Database Schema

5. **Question Flagging**

### 4.1 Entity Relationship Diagram   - User-reported issues

   - Flag reasons (incorrect, unclear, inappropriate)

```   - Admin resolution workflow

User (1) ──────< (M) QuizSession   - Flag statistics

  │                     │

  │                     └───< (M) Question#### Admin Interface Tabs

  │

  ├────< (M) UserBadge ────> (1) Badge```

  │📊 Overview

  ├────< (M) PerformanceTrend   └── Total users, quizzes, questions

  │   └── Active users today

  ├────< (M) LearningPath ────< (M) LearningMilestone   └── Average quiz score

  │   └── Flagged questions count

  ├────< (M) QuizLeaderboard

  │👥 Users

  ├────< (M) FlaggedQuestion ────> (1) Question   └── User list with stats

  │   └── Skill level management

  └────< (M) QuestionFeedback ────> (1) Question   └── User activity logs



MultiplayerRoom (1) ──────< (M) MultiplayerParticipant ────> (1) User🚩 Moderation

```   └── Flagged questions review

   └── Question deletion

### 4.2 Table Schemas   └── Flag resolution

   └── Moderation history

#### User Table

```sql💬 Feedback

CREATE TABLE user (   └── User feedback collection

    id INTEGER PRIMARY KEY AUTOINCREMENT,   └── Rating analysis

    username VARCHAR(80) UNIQUE NOT NULL,   └── Comment review

    email VARCHAR(120) UNIQUE NOT NULL,   └── Feedback trends

    password_hash VARCHAR(255) NOT NULL,```

    full_name VARCHAR(200),

    skill_level VARCHAR(20) DEFAULT 'Beginner',#### API Endpoints

    role VARCHAR(20) DEFAULT 'user',```

    created_at DATETIME DEFAULT CURRENT_TIMESTAMPGET    /api/admin/stats            # Admin statistics

);GET    /api/admin/users            # All users

```PUT    /api/admin/users/:id/skill-level  # Update user

GET    /api/admin/flagged-questions  # Flagged questions

#### QuizSession TablePOST   /api/admin/resolve-flag/:id   # Resolve flag

```sqlDELETE /api/admin/question/:id      # Delete question

CREATE TABLE quiz_session (GET    /api/admin/feedback          # All feedback

    id INTEGER PRIMARY KEY AUTOINCREMENT,POST   /api/quiz/flag-question      # Flag a question

    user_id INTEGER NOT NULL,POST   /api/quiz/submit-feedback    # Submit feedback

    topic VARCHAR(100),```

    skill_level VARCHAR(20),

    custom_topic VARCHAR(200),---

    total_questions INTEGER DEFAULT 0,

    completed_questions INTEGER DEFAULT 0,## 7. Database Schema

    correct_answers INTEGER DEFAULT 0,

    score_percentage FLOAT DEFAULT 0.0,### Complete Entity Relationship Diagram

    status VARCHAR(20) DEFAULT 'active',

    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,```

    completed_at DATETIME,┌─────────────────────────────────────────────────────────────┐

    FOREIGN KEY (user_id) REFERENCES user(id)│                           USERS                              │

);├─────────────────────────────────────────────────────────────┤

```│ PK  id                 INTEGER                               │

│ UK  username           VARCHAR(80)                           │

#### Question Table│ UK  email              VARCHAR(120)                          │

```sql│     password_hash      VARCHAR(128)                          │

CREATE TABLE question (│     full_name          VARCHAR(100)                          │

    id INTEGER PRIMARY KEY AUTOINCREMENT,│     skill_level        VARCHAR(20) DEFAULT 'Beginner'        │

    quiz_session_id INTEGER NOT NULL,│     role               VARCHAR(20) DEFAULT 'user'            │

    question_text TEXT NOT NULL,│     created_at         DATETIME                              │

    question_type VARCHAR(20) NOT NULL,│     updated_at         DATETIME                              │

    options JSON,└─────────────────────────────────────────────────────────────┘

    correct_answer TEXT NOT NULL,                              │

    user_answer TEXT,                              │ 1:N

    explanation TEXT,                              ▼

    difficulty_level VARCHAR(20),┌─────────────────────────────────────────────────────────────┐

    bloom_level VARCHAR(20),│                      QUIZ_SESSIONS                           │

    time_taken INTEGER,├─────────────────────────────────────────────────────────────┤

    is_correct BOOLEAN,│ PK  id                 INTEGER                               │

    answered_at DATETIME,│ FK  user_id            INTEGER → users.id                    │

    FOREIGN KEY (quiz_session_id) REFERENCES quiz_session(id)│     topic              VARCHAR(100)                          │

);│     skill_level        VARCHAR(20)                           │

```│     custom_topic       TEXT                                  │

│     total_questions    INTEGER DEFAULT 5                     │

#### Badge Table│     completed_questions INTEGER DEFAULT 0                    │

```sql│     correct_answers    INTEGER DEFAULT 0                     │

CREATE TABLE badge (│     score_percentage   FLOAT DEFAULT 0.0                     │

    id INTEGER PRIMARY KEY AUTOINCREMENT,│     session_data       TEXT (JSON)                           │

    name VARCHAR(100) UNIQUE NOT NULL,│     status             VARCHAR(20) DEFAULT 'active'          │

    description TEXT,│     started_at         DATETIME                              │

    category VARCHAR(50),│     completed_at       DATETIME                              │

    criteria JSON,└─────────────────────────────────────────────────────────────┘

    icon VARCHAR(50),                              │

    points INTEGER DEFAULT 0,                              │ 1:N

    rarity VARCHAR(20) DEFAULT 'common',                              ▼

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP┌─────────────────────────────────────────────────────────────┐

);│                         QUESTIONS                            │

```├─────────────────────────────────────────────────────────────┤

│ PK  id                 INTEGER                               │

#### UserBadge Table│ FK  quiz_session_id    INTEGER → quiz_sessions.id           │

```sql│     question_text      TEXT                                  │

CREATE TABLE user_badge (│     question_type      VARCHAR(20)                           │

    id INTEGER PRIMARY KEY AUTOINCREMENT,│     options            TEXT (JSON)                           │

    user_id INTEGER NOT NULL,│     correct_answer     TEXT                                  │

    badge_id INTEGER NOT NULL,│     user_answer        TEXT                                  │

    earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,│     explanation        TEXT                                  │

    progress FLOAT DEFAULT 0.0,│     difficulty_level   VARCHAR(20)                           │

    FOREIGN KEY (user_id) REFERENCES user(id),│     is_correct         BOOLEAN                               │

    FOREIGN KEY (badge_id) REFERENCES badge(id)│     answered_at        DATETIME                              │

);│     time_taken         INTEGER (seconds)                     │

```│     evaluation_metadata TEXT (JSON)                          │

└─────────────────────────────────────────────────────────────┘

### 4.3 Relationships                              │

                              ├─────────────┐

- **One-to-Many**: User → QuizSessions, User → Badges, User → PerformanceTrends                              │ 1:N         │ 1:N

- **Many-to-Many**: User ↔ Badges (through UserBadge junction table)                              ▼             ▼

- **One-to-Many**: QuizSession → Questions┌─────────────────────────────┐  ┌──────────────────────────┐

- **One-to-Many**: User → LearningPaths → Milestones│   FLAGGED_QUESTIONS         │  │  QUESTION_FEEDBACK       │

├─────────────────────────────┤  ├──────────────────────────┤

---│ PK  id           INTEGER    │  │ PK  id        INTEGER    │

│ FK  question_id  INTEGER    │  │ FK  question_id INTEGER  │

## 5. API Reference│ FK  user_id      INTEGER    │  │ FK  user_id   INTEGER    │

│     reason       TEXT        │  │     rating    INTEGER    │

### 5.1 Authentication Endpoints│     status       VARCHAR(20) │  │     feedback_text TEXT   │

│     resolved_by  INTEGER     │  │     created_at DATETIME  │

#### POST /api/auth/register│     created_at   DATETIME    │  └──────────────────────────┘

**Description**: Register a new user account│     resolved_at  DATETIME    │

└─────────────────────────────┘

**Request Body**:```

```json

{### Key Relationships

  "username": "john_doe",- **Users** (1) → (N) **Quiz Sessions** - One user can have many quiz sessions

  "email": "john@example.com",- **Quiz Sessions** (1) → (N) **Questions** - One session contains multiple questions

  "full_name": "John Doe",- **Questions** (1) → (N) **Flagged Questions** - Questions can be flagged multiple times

  "password": "SecurePass123!",- **Questions** (1) → (N) **Question Feedback** - Questions can have multiple feedback entries

  "skill_level": "Beginner"

}### Indexes for Performance

``````sql

CREATE INDEX idx_users_username ON users(username);

**Response**:CREATE INDEX idx_users_email ON users(email);

```jsonCREATE INDEX idx_quiz_sessions_user ON quiz_sessions(user_id);

{CREATE INDEX idx_quiz_sessions_status ON quiz_sessions(status);

  "message": "User registered successfully",CREATE INDEX idx_questions_session ON questions(quiz_session_id);

  "user": {CREATE INDEX idx_flagged_status ON flagged_questions(status);

    "id": 1,```

    "username": "john_doe",

    "email": "john@example.com",---

    "skill_level": "Beginner"

  },## 8. API Documentation

  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",

  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."### Authentication APIs

}

```#### Register User

```http

#### POST /api/auth/loginPOST /api/auth/register

**Description**: Authenticate user and receive JWT tokensContent-Type: application/json



**Request Body**:Request:

```json{

{  "username": "john_doe",

  "username": "john_doe",  "email": "john@example.com",

  "password": "SecurePass123!"  "password": "SecurePass123!",

}  "full_name": "John Doe",

```  "skill_level": "Intermediate"

}

**Response**:

```jsonResponse (201):

{{

  "message": "Login successful",  "success": true,

  "user": {  "message": "User registered successfully",

    "id": 1,  "user": {

    "username": "john_doe",    "id": 1,

    "email": "john@example.com",    "username": "john_doe",

    "role": "user"    "email": "john@example.com",

  },    "full_name": "John Doe",

  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",    "skill_level": "Intermediate",

  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."    "role": "user"

}  }

```}

```

### 5.2 Quiz Endpoints

#### Login

#### POST /api/quiz/start```http

**Description**: Start a new quiz sessionPOST /api/auth/login

Content-Type: application/json

**Request Body**:

```jsonRequest:

{{

  "topic": "Python Programming",  "username": "john_doe",

  "num_questions": 10,  "password": "SecurePass123!"

  "difficulty": "Medium",}

  "skill_level": "Intermediate"

}Response (200):

```{

  "success": true,

**Response**:  "access_token": "eyJhbGciOiJIUzI1NiIs...",

```json  "user": {

{    "id": 1,

  "quiz_id": 42,    "username": "john_doe",

  "questions": [    "email": "john@example.com",

    {    "full_name": "John Doe",

      "id": 101,    "skill_level": "Intermediate",

      "question_text": "What is a decorator in Python?",    "role": "user"

      "question_type": "MCQ",  }

      "options": ["Option A", "Option B", "Option C", "Option D"],}

      "difficulty_level": "Medium",```

      "bloom_level": "Understand"

    }### Quiz APIs

  ],

  "total_questions": 10#### Start Quiz

}```http

```POST /api/quiz/start

Authorization: Bearer <token>

#### POST /api/quiz/{quiz_id}/answerContent-Type: application/json

**Description**: Submit an answer to a question

Request:

**Request Body**:{

```json  "topic": "Mathematics",

{  "skill_level": "Intermediate",

  "question_id": 101,  "num_questions": 5,

  "answer": "Option A"  "custom_topic": null  // Optional custom content

}}

```

Response (200):

**Response**:{

```json  "success": true,

{  "quiz_session": {

  "is_correct": true,    "id": 101,

  "correct_answer": "Option A",    "topic": "Mathematics",

  "explanation": "Decorators are a powerful feature in Python...",    "skill_level": "Intermediate",

  "score_percentage": 60.0,    "total_questions": 5,

  "next_question": {    "status": "active"

    "id": 102,  },

    "question_text": "..."  "questions": [

  }    {

}      "id": 1,

```      "question_text": "What is 2 + 2?",

      "question_type": "MCQ",

### 5.3 Analytics Endpoints      "options": ["3", "4", "5", "6"],

      "difficulty_level": "Beginner"

#### GET /api/analytics/trends?days=30    },

**Description**: Get performance trends over specified period    // ... more questions

  ]

**Response**:}

```json```

{

  "trends": [#### Submit Answer

    {```http

      "date": "2025-11-01",POST /api/quiz/:quiz_id/answer

      "quizzes_taken": 3,Authorization: Bearer <token>

      "average_score": 85.5,Content-Type: application/json

      "topics_covered": ["Python", "JavaScript"]

    }Request:

  ],{

  "current_streak": 7,  "question_id": 1,

  "improvement_trend": "improving"  "answer": "4",

}  "time_taken": 15

```}



#### GET /api/analytics/topic-masteryResponse (200):

**Description**: Get topic-wise mastery percentage{

  "is_correct": true,

**Response**:  "correct_answer": "4",

```json  "explanation": "2 + 2 equals 4...",

{  "enhanced_feedback": {

  "topic_mastery": [    "result_message": "Excellent!",

    {    "confidence": 1.0

      "topic": "Python Programming",  },

      "quizzes_taken": 15,  "adaptive_insights": {

      "average_score": 92.3,    "next_difficulty": "medium",

      "mastery_percentage": 92,    "performance_trend": "improving"

      "total_questions": 150,  },

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
