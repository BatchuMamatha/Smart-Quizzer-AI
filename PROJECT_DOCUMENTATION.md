# Smart Quizzer AI - Technical Documentation# Smart Quizzer AI - Project Documentation# Smart Quizzer AI - Technical Documentation# Smart Quizzer AI - Technical Documentation# Smart Quizzer AI - Technical Documentation# Smart Quizzer AI - Technical Documentation# Smart Quizzer AI - Adaptive Quiz & Question Generator



Comprehensive technical reference for developers, architects, and contributors.



---Comprehensive technical documentation for developers, architects, and contributors.



## 📋 Table of Contents



1. [System Overview](#1-system-overview)---**Comprehensive technical reference for developers, architects, and contributors**

2. [Architecture Design](#2-architecture-design)

3. [Backend Implementation](#3-backend-implementation)

4. [Frontend Implementation](#4-frontend-implementation)

5. [Database Schema](#5-database-schema)## 📋 Table of Contents

6. [API Reference](#6-api-reference)

7. [AI/ML Components](#7-aiml-components)

8. [Security & Authentication](#8-security--authentication)

9. [Real-Time Features](#9-real-time-features)1. [System Overview](#1-system-overview)This document provides in-depth technical information about the Smart Quizzer AI platform, including system architecture, implementation details, API reference, and development guidelines.**Comprehensive technical documentation for developers, architects, and contributors**

10. [Testing](#10-testing)

11. [Deployment](#11-deployment)2. [Architecture Design](#2-architecture-design)

12. [Development Guidelines](#12-development-guidelines)

3. [Backend Implementation](#3-backend-implementation)

---

4. [Frontend Implementation](#4-frontend-implementation)

## 1. System Overview

5. [Database Schema](#5-database-schema)---

### Project Description

6. [API Reference](#6-api-reference)

Smart Quizzer AI is an intelligent adaptive learning platform that leverages artificial intelligence to generate personalized quiz questions, evaluate answers semantically, and provide real-time performance analytics. The system combines Google Gemini AI for question generation with Sentence-Transformers for natural language processing.

7. [AI/ML Components](#7-aiml-components)

### Core Capabilities

8. [Security & Authentication](#8-security--authentication)

- **Content Processing**: Extract text from PDF, DOCX, URLs, and plain text

- **AI Question Generation**: Generate contextually relevant questions using Google Gemini 1.5 Flash9. [Real-Time Features](#9-real-time-features)## 📋 Table of ContentsThis document provides in-depth technical information about the Smart Quizzer AI platform, including architecture, implementation details, API reference, and development guidelines.**Comprehensive technical documentation for developers, architects, and contributors**

- **Semantic Answer Evaluation**: NLP-based answer grading with configurable similarity thresholds

- **Adaptive Learning**: Real-time difficulty adjustment based on user performance10. [Testing](#10-testing)

- **Gamification**: 21 achievement badges, points system, and global leaderboards

- **Real-Time Multiplayer**: WebSocket-powered live quiz competitions11. [Deployment](#11-deployment)

- **Analytics**: Comprehensive performance tracking, trend analysis, and AI recommendations

12. [Development Guidelines](#12-development-guidelines)

### Technology Philosophy

1. [System Architecture](#system-architecture)

- **Backend-Driven Logic**: Complex business logic (question generation, answer evaluation, adaptive algorithms) handled server-side

- **API-First Design**: RESTful endpoints with clear request/response contracts---

- **Real-Time Communication**: WebSocket (Socket.IO) for live features

- **Type Safety**: TypeScript frontend for compile-time error detection2. [Backend Implementation](#backend-implementation)

- **Security-First**: JWT authentication, input validation, CORS protection

## 1. System Overview

---

3. [Frontend Implementation](#frontend-implementation)---

## 2. Architecture Design

### Project Description

### High-Level System Architecture

4. [Database Schema](#database-schema)

```

┌─────────────────────────────────────────────────────────────┐Smart Quizzer AI is an intelligent adaptive learning platform that leverages artificial intelligence to generate personalized quiz questions, evaluate answers semantically, and provide real-time performance analytics. The system combines Google Gemini AI for question generation with Sentence-Transformers for natural language processing.

│                      Client Layer                            │

│  ┌──────────────────────────────────────────────────────┐   │5. [API Reference](#api-reference)

│  │  React SPA (TypeScript + Tailwind CSS)              │   │

│  │  • Pages: 13 routes (Login, Dashboard, Quiz, etc.)  │   │### Core Capabilities

│  │  • Components: 8 reusable UI components             │   │

│  │  • HTTP Client: Axios with JWT interceptors         │   │6. [AI/ML Components](#aiml-components)

│  │  • WebSocket: Socket.IO client for real-time        │   │

│  └──────────────────────────────────────────────────────┘   │- **Content Processing**: Extract text from PDF, DOCX, URLs, and plain text

└──────────────────┬──────────────────┬────────────────────────┘

                   │ REST API         │ WebSocket- **AI Question Generation**: Generate contextually relevant questions using Google Gemini 1.5 Flash7. [Security Implementation](#security-implementation)## 📋 Table of Contents---## Document Information## Complete Project Documentation

                   │ (HTTP/HTTPS)     │ (Socket.IO)

                   ▼                  ▼- **Semantic Answer Evaluation**: NLP-based answer grading with configurable similarity thresholds

┌─────────────────────────────────────────────────────────────┐

│                    Application Layer                         │- **Adaptive Learning**: Real-time difficulty adjustment based on user performance8. [Real-Time Features](#real-time-features)

│  ┌──────────────────────────────────────────────────────┐   │

│  │  Flask Application (Python 3.9+)                     │   │- **Gamification**: 21 achievement badges, points system, and global leaderboards

│  │  • Routes: 90+ REST API endpoints                    │   │

│  │  • WebSocket Events: Multiplayer room handlers       │   │- **Real-Time Multiplayer**: WebSocket-powered live quiz competitions9. [Testing Strategy](#testing-strategy)

│  │  • Middleware: JWT auth, CORS, error handling        │   │

│  │  • Services: 10 specialized service modules          │   │- **Analytics**: Comprehensive performance tracking, trend analysis, and AI recommendations

│  └──────────────────────────────────────────────────────┘   │

└────┬──────────┬──────────┬──────────┬──────────┬────────────┘10. [Deployment Architecture](#deployment-architecture)

     │          │          │          │          │

     ▼          ▼          ▼          ▼          ▼### Technology Philosophy

┌─────────┐ ┌───────┐ ┌────────┐ ┌────────┐ ┌──────────┐

│ Content │ │ AI    │ │  NLP   │ │ Badge  │ │ Learning │11. [Performance Optimization](#performance-optimization)1. [System Overview](#1-system-overview)

│Processor│ │ Gen   │ │ Eval   │ │Service │ │ Paths    │

│         │ │       │ │        │ │        │ │          │- **Backend-Driven Logic**: Complex business logic (question generation, answer evaluation, adaptive algorithms) handled server-side

│PDF/DOCX │ │Gemini │ │Sentence│ │21 Badge│ │Adaptive  │

│URL/Text │ │1.5    │ │-Trans  │ │ Types  │ │ Routes   │- **API-First Design**: RESTful endpoints with clear request/response contracts12. [Development Guidelines](#development-guidelines)

└─────────┘ └───────┘ └────────┘ └────────┘ └──────────┘

     │          │          │          │          │- **Real-Time Communication**: WebSocket (Socket.IO) for live features

     └──────────┴──────────┴──────────┴──────────┘

                           │- **Type Safety**: TypeScript frontend for compile-time error detection2. [Architecture Design](#2-architecture-design)

                           ▼

     ┌─────────────────────────────────────────────┐- **Security-First**: JWT authentication, input validation, CORS protection

     │         Data Persistence Layer              │

     │  ┌───────────────────────────────────────┐  │---

     │  │  SQLAlchemy ORM                       │  │

     │  │  • Models: 15 database tables         │  │---

     │  │  • Relationships: Defined via ORM     │  │

     │  │  • Migrations: Auto schema management │  │3. [Backend Implementation](#3-backend-implementation)## Table of Contents- **Project**: Smart Quizzer AI - Adaptive Learning Platform

     │  └───────────────────────────────────────┘  │

     └──────────────────┬──────────────────────────┘## 2. Architecture Design

                        ▼

     ┌─────────────────────────────────────────────┐## System Architecture

     │          Database Layer                     │

     │  • Development: SQLite (instance/db file)   │### High-Level System Architecture

     │  • Production: PostgreSQL (recommended)     │

     │  • Tables: 15 (Users, Quiz, Analytics...)   │4. [Frontend Implementation](#4-frontend-implementation)

     └─────────────────────────────────────────────┘

``````



### Data Flow Diagrams┌─────────────────────────────────────────────────────────────┐### High-Level Architecture Diagram



#### Question Generation Flow│                      Client Layer                            │



```│  ┌──────────────────────────────────────────────────────┐   │5. [Database Schema](#5-database-schema)

User uploads PDF

    ↓│  │  React SPA (TypeScript + Tailwind CSS)              │   │

Frontend: POST /api/content/upload (multipart/form-data)

    ↓│  │  • Pages: 13 routes (Login, Dashboard, Quiz, etc.)  │   │```

Backend: content_processor.py

    ├─ PDF → PyPDF2/pdfplumber.extract_text()│  │  • Components: 8 reusable UI components             │   │

    ├─ DOCX → python-docx.extract()

    ├─ URL → BeautifulSoup4.scrape()│  │  • HTTP Client: Axios with JWT interceptors         │   │┌─────────────────────────────────────────────────────────────┐6. [API Reference](#6-api-reference)

    └─ Text → Direct processing

    ↓│  │  • WebSocket: Socket.IO client for real-time        │   │

Extracted text (max 5000 chars)

    ↓│  └──────────────────────────────────────────────────────┘   ││                  Client Layer (Browser)                      │

question_gen.py: generate_questions(content, difficulty, count)

    ↓└──────────────────┬──────────────────┬────────────────────────┘

Google Gemini AI API (gemini-1.5-flash model)

    ├─ Prompt: "Generate {count} {difficulty} questions..."                   │ REST API         │ WebSocket│                                                              │7. [AI/ML Components](#7-aiml-components)1. [Project Overview](#1-project-overview)- **Version**: 1.0.0> **📅 Last Updated:** November 1, 2025  

    ├─ Temperature: 0.7 (balanced creativity)

    ├─ Output: JSON array of questions                   │ (HTTP/HTTPS)     │ (Socket.IO)

    └─ Classify by Bloom's Taxonomy

    ↓                   ▼                  ▼│  ┌────────────────────────────────────────────────────────┐ │

Question objects stored in database

    ↓┌─────────────────────────────────────────────────────────────┐

Frontend receives quiz session ID

    ↓│                    Application Layer                         ││  │         React Frontend (TypeScript)                     │ │8. [Security & Authentication](#8-security--authentication)

User starts quiz

```│  ┌──────────────────────────────────────────────────────┐   │



#### Answer Evaluation Flow│  │  Flask Application (Python 3.9+)                     │   ││  │  • 13 Page Components  • 8 Reusable Components         │ │



```│  │  • Routes: 90+ REST API endpoints                    │   │

User submits answer

    ↓│  │  • WebSocket Events: Multiplayer room handlers       │   ││  │  • Tailwind CSS  • React Router  • Axios HTTP          │ │9. [Testing](#9-testing)2. [Architecture](#2-architecture)

Frontend: POST /api/quiz/{session_id}/answer

    {question_id, answer_text}│  │  • Middleware: JWT auth, CORS, error handling        │   │

    ↓

Backend retrieves correct_answer from Question table│  │  • Services: 10 specialized service modules          │   ││  │  • Socket.IO Client  • Recharts                        │ │

    ↓

answer_evaluator_simple.py: evaluate_answer()│  └──────────────────────────────────────────────────────┘   │

    ↓

Question type check:└────┬──────────┬──────────┬──────────┬──────────┬────────────┘│  └────────────────────────────────────────────────────────┘ │10. [Deployment](#10-deployment)

├─ MCQ/True-False → Exact string match

└─ Short Answer → Semantic NLP matching     │          │          │          │          │

    ↓

For short answers:     ▼          ▼          ▼          ▼          ▼└──────────────────────────┬──────────────────────────────────┘

    Sentence-Transformers (all-MiniLM-L6-v2)

    ├─ Encode user_answer → 384-dim vector┌─────────┐ ┌───────┐ ┌────────┐ ┌────────┐ ┌──────────┐

    ├─ Encode correct_answer → 384-dim vector

    └─ Cosine similarity score (0.0 - 1.0)│ Content │ │ AI    │ │  NLP   │ │ Badge  │ │ Learning │                           │ HTTP/HTTPS + WebSocket (Socket.IO)11. [Performance Optimization](#11-performance-optimization)3. [Backend Documentation](#3-backend-documentation)- **Last Updated**: November 2025> **📌 Version:** 1.0.0  

    ↓

Compare to threshold (default 0.75):│Processor│ │ Gen   │ │ Eval   │ │Service │ │ Paths    │

├─ similarity >= 0.75 → Correct ✓

└─ similarity < 0.75 → Incorrect ✗│         │ │       │ │        │ │        │ │          │                           ▼

    ↓

Generate contextual feedback│PDF/DOCX │ │Gemini │ │Sentence│ │21 Badge│ │Adaptive  │

    ↓

Update PerformanceTrend, check badge eligibility│URL/Text │ │1.5    │ │-Trans  │ │ Types  │ │ Routes   │┌─────────────────────────────────────────────────────────────┐12. [Contributing Guidelines](#12-contributing-guidelines)

    ↓

Response: {is_correct, similarity, feedback, points, badges}└─────────┘ └───────┘ └────────┘ └────────┘ └──────────┘

```

     │          │          │          │          ││                   API Gateway Layer                          │

#### Adaptive Difficulty Flow

     └──────────┴──────────┴──────────┴──────────┘

```

User completes question                           ││                                                              │4. [Frontend Documentation](#4-frontend-documentation)

    ↓

Calculate recent performance (last 5 questions)                           ▼

    ↓

Compute accuracy_percentage = (correct / 5) * 100     ┌─────────────────────────────────────────────┐│  ┌────────────────────────────────────────────────────────┐ │

    ↓

Difficulty adjustment logic:     │         Data Persistence Layer              │

├─ accuracy >= 80% → Increase difficulty

├─ 50% <= accuracy < 80% → Maintain difficulty     │  ┌───────────────────────────────────────┐  ││  │           Flask Application (app.py)                    │ │---

└─ accuracy < 50% → Decrease difficulty

    ↓     │  │  SQLAlchemy ORM                       │  │

Select next question with adjusted difficulty

    ↓     │  │  • Models: 15 database tables         │  ││  │  • 90+ REST API Endpoints                               │ │

Deliver to user

```     │  │  • Relationships: Defined via ORM     │  │



---     │  │  • Migrations: Auto schema management │  ││  │  • WebSocket Event Handlers                             │ │5. [Database Schema](#5-database-schema)- **Author**: Mamatha Bachu> **✅ Status:** Fully Functional - Local Development Ready  



## 3. Backend Implementation     │  └───────────────────────────────────────┘  │



### Module Structure     └──────────────────┬──────────────────────────┘│  │  • JWT Authentication Middleware                        │ │



```                        ▼

backend/

├── app.py                      # Main Flask application (4041 lines)     ┌─────────────────────────────────────────────┐│  │  • CORS Configuration                                   │ │## 1. System Overview

├── models.py                   # Database models (15 tables)

├── auth.py                     # JWT authentication     │          Database Layer                     │

├── question_gen.py             # AI question generation

├── content_processor.py        # Content extraction     │  • Development: SQLite (instance/db file)   ││  │  • Error Handling & Logging                             │ │

├── answer_evaluator_simple.py  # NLP answer evaluation

├── badge_service.py            # Achievement system     │  • Production: PostgreSQL (recommended)     │

├── analytics_service.py        # Performance tracking

├── learning_path_service.py    # Adaptive learning     │  • Tables: 15 (Users, Quiz, Analytics...)   ││  └────────────────────────────────────────────────────────┘ │6. [API Reference](#6-api-reference)

├── multiplayer_service.py      # Real-time multiplayer

├── leaderboard_service.py      # Global rankings     └─────────────────────────────────────────────┘

├── error_handler.py            # Error handling

└── requirements.txt            # Dependencies```└──────────────────────────┬──────────────────────────────────┘

```



### Module 1: User Authentication

### Request Flow Examples                           │### 1.1 Project Purpose

**File**: `auth.py`



**Responsibilities**:

- User registration with BCrypt password hashing#### Question Generation Flow        ┌──────────────────┼──────────────────┬────────────────┐

- Login with JWT token generation

- Token validation middleware```

- Role-based access control (user/admin)

User uploads PDF        ▼                  ▼                  ▼                ▼7. [AI/ML Components](#7-aiml-components)- **Tech Stack**: Flask 3.0.0, React 18.2.0, SQLite, Google Gemini AI> **🔒 Security:** All default credentials removed for safety  

**Key Functions**:

```python    ↓

def init_jwt(app):

    """Initialize Flask-JWT-Extended"""Frontend: POST /api/content/upload (multipart/form-data)┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐

    

def generate_tokens(user_id):    ↓

    """Generate access token"""

    return create_access_token(Backend: content_processor.py│  Business   │  │  AI Services │  │ NLP Services │  │   Content    │Smart Quizzer AI is an adaptive learning platform that:

        identity=user_id,

        expires_delta=timedelta(days=1)    ├─ PDF → PyPDF2/pdfplumber.extract_text()

    )

    ├─ DOCX → python-docx.extract()│   Logic     │  │              │  │              │  │  Processors  │

@auth_required

def protected_route():    ├─ URL → BeautifulSoup4.scrape()

    """Decorator for authentication"""

```    └─ Text → Direct processing│             │  │ Google       │  │ Sentence-    │  │              │- Generates quiz questions from custom content using AI8. [Security](#8-security)



**Endpoints**:    ↓

- `POST /api/auth/register` - Create account

- `POST /api/auth/login` - Authenticate userExtracted text (max 5000 chars)│ • Quiz      │  │ Gemini AI    │  │ Transformers │  │ • PDF Parser │

- `GET /api/auth/profile` - Get user profile

    ↓

### Module 2: AI Question Generation

question_gen.py: generate_questions(content, difficulty, count)│   Engine    │  │ (Question    │  │ (Answer      │  │ • DOCX Parse │- Evaluates answers with semantic understanding using NLP

**File**: `question_gen.py`

    ↓

**Responsibilities**:

- Interface with Google Gemini AIGoogle Gemini AI API (gemini-1.5-flash model)│ • Adaptive  │  │  Generation) │  │  Evaluation) │  │ • URL Fetch  │

- Generate questions from content

- Classify by Bloom's Taxonomy    ├─ Prompt: "Generate {count} {difficulty} questions from content..."

- Multi-factor difficulty calculation

    ├─ Temperature: 0.7 (balanced creativity)│   Learning  │  │              │  │              │  │ • Beautiful  │- Adapts difficulty based on real-time user performance9. [Testing](#9-testing)> **📖 Note:** This documentation reflects the current state of the project after recent security improvements and documentation cleanup.

**Gemini AI Configuration**:

```python    ├─ Output: JSON array of questions

model = genai.GenerativeModel('gemini-1.5-flash')

generation_config = {    └─ Classify by Bloom's Taxonomy + Multi-factor difficulty│ • Badges    │  │ Bloom's Tax  │  │ Cosine       │  │   Soup4      │

    'temperature': 0.7,

    'top_p': 0.95,    ↓

    'top_k': 40,

    'max_output_tokens': 2048,Question objects stored in database│ • Analytics │  │ Multi-factor │  │ Similarity   │  │              │- Provides comprehensive analytics and personalized learning paths

}

```    ↓



**Difficulty Classification Algorithm**:Frontend receives quiz session ID│ • Learning  │  │ Difficulty   │  │ 75% Thresh   │  │              │

- Bloom's Taxonomy (40% weight)

- Semantic Complexity (30%)    ↓

- Text Metrics (20%)

- Historical Accuracy (10%)User starts quiz│   Paths     │  │              │  │              │  │              │- Gamifies learning through badges and leaderboards10. [Deployment](#10-deployment)



**Bloom's Taxonomy Levels**:```

- Remember (0.1)

- Understand (0.2)└─────────────┘  └──────────────┘  └──────────────┘  └──────────────┘

- Apply (0.4)

- Analyze (0.6)#### Answer Evaluation Flow

- Evaluate (0.8)

- Create (1.0)```        │



### Module 3: Answer EvaluationUser submits answer



**File**: `answer_evaluator_simple.py`    ↓        ▼



**NLP Model**: Sentence-Transformers `all-MiniLM-L6-v2`Frontend: POST /api/quiz/{session_id}/answer

- Embedding dimension: 384

- Inference time: ~10ms    {question_id, answer_text}┌─────────────────────────────────────────────────────────────┐### 1.2 Technology Stack11. [Performance](#11-performance)---

- Accuracy: 85-90%

    ↓

**Evaluation Logic**:

```pythonBackend retrieves correct_answer from Question table│                   Data Access Layer                          │

def evaluate_answer(user_answer, correct_answer, question_type):

    if question_type in ['MCQ', 'TrueFalse']:    ↓

        # Exact match

        is_correct = user_answer.lower().strip() == correct_answer.lower().strip()answer_evaluator_simple.py: evaluate_answer()│                                                              │

        return {'is_correct': is_correct, 'similarity': 1.0 if is_correct else 0.0}

        ↓

    elif question_type == 'ShortAnswer':

        # Semantic similarityQuestion type check:│  ┌────────────────────────────────────────────────────────┐ │

        user_emb = model.encode([user_answer])[0]

        correct_emb = model.encode([correct_answer])[0]├─ MCQ/True-False → Exact string match

        similarity = cosine_similarity([user_emb], [correct_emb])[0][0]

        threshold = float(os.getenv('SIMILARITY_THRESHOLD', '0.75'))└─ Short Answer → Semantic NLP matching│  │         SQLAlchemy ORM (models.py)                      │ │**Backend (Python)**12. [Contributing](#12-contributing)

        is_correct = similarity >= threshold

        return {    ↓

            'is_correct': is_correct,

            'similarity': float(similarity),For short answers:│  │  • 15 Database Models                                   │ │

            'confidence': float(similarity * 100),

            'feedback': generate_feedback(similarity)    Sentence-Transformers (all-MiniLM-L6-v2)

        }

```    ├─ Encode user_answer → 384-dim embedding vector│  │  • Relationships & Constraints                          │ │- Framework: Flask 3.0.0



**Similarity Thresholds**:    ├─ Encode correct_answer → 384-dim embedding vector

- 0.95-1.0: Excellent

- 0.85-0.94: Very good    └─ Cosine similarity score (0.0 - 1.0)│  │  • Migration Support                                    │ │

- 0.75-0.84: Good ✅ (Accepted)

- 0.60-0.74: Partial    ↓

- <0.60: Incorrect ❌

Compare to threshold (default 0.75):│  └────────────────────────────────────────────────────────┘ │- ORM: SQLAlchemy 2.0.43---

### Module 4: Content Processing

├─ similarity >= 0.75 → Correct ✓

**File**: `content_processor.py`

└─ similarity < 0.75 → Incorrect ✗└──────────────────────────┬──────────────────────────────────┘

**Supported Formats**:

1. **PDF**: PyPDF2 + pdfplumber    ↓

2. **DOCX**: python-docx

3. **URL**: BeautifulSoup4Generate contextual feedback:                           ▼- Database: SQLite (development), PostgreSQL (production)

4. **Plain Text**: Direct processing

├─ 0.95-1.0: "Excellent! Perfect understanding"

**Limits**:

- Max file size: 16 MB├─ 0.85-0.94: "Very good! Mostly correct"┌─────────────────────────────────────────────────────────────┐

- Max text length: 5000 characters

├─ 0.75-0.84: "Good! Captures main idea"

### Module 5: Badge System

└─ <0.75: "Incorrect. Review this topic"│                   Database Layer                             │- AI: Google Gemini 1.5 Flash---

**File**: `badge_service.py`

    ↓

**21 Achievement Badges**:

Update PerformanceTrend, check badge eligibility│                                                              │

| Badge | Criteria | Description |

|-------|----------|-------------|    ↓

| Quiz Starter | 1 quiz | First completion |

| Perfect Score | 100% accuracy | Perfect quiz |Response: {is_correct, similarity, feedback, points_earned, badges_unlocked}│  ┌────────────────────────────────────────────────────────┐ │- NLP: Sentence-Transformers (all-MiniLM-L6-v2)

| Streak Master | 5 consecutive days | Daily engagement |

| Marathon Runner | 50 quizzes | Long-term dedication |```

| Speed Demon | Avg <10s/question | Quick thinking |

| Topic Explorer | 5 different topics | Broad learning |│  │    SQLite (Development) / PostgreSQL (Production)       │ │

| Accuracy Pro | 90%+ average | Consistent excellence |

| Knowledge Seeker | 100 quizzes | High dedication |#### Adaptive Difficulty Flow

| Subject Master | 95%+ in topic | Topic expertise |

| Quiz Master | 500 quizzes | Ultimate dedication |```│  │  • Users & Authentication                               │ │- Real-time: Flask-SocketIO 5.3.6## Table of Contents

| Legend | All badges earned | Complete mastery |

User completes question

### Module 6: Analytics Service

    ↓│  │  • Quizzes & Questions                                  │ │

**File**: `analytics_service.py`

Calculate recent performance (last 5 questions)

**Tracked Metrics**:

- Quiz completion rate    ↓│  │  • Performance Analytics                                │ │- Authentication: JWT (PyJWT)

- Average accuracy per topic

- Performance trends over timeCompute accuracy_percentage = (correct_count / 5) * 100

- Time spent per question

- Difficulty progression    ↓│  │  • Badges & Achievements                                │ │

- Streak tracking

Difficulty adjustment logic:

**Visualizations**:

1. Performance line charts├─ accuracy >= 80% → Increase difficulty│  │  • Leaderboards & Multiplayer                           │ │- Password Hashing: BCrypt## 1. Project Overview

2. Topic heatmaps

3. Accuracy distributions│   (Easy → Medium → Hard)

4. Time analysis

├─ 50% <= accuracy < 80% → Maintain difficulty│  └────────────────────────────────────────────────────────┘ │

**Endpoints**:

- `GET /api/analytics/trends` - Performance trends└─ accuracy < 50% → Decrease difficulty

- `GET /api/analytics/topics` - Topic breakdown

- `GET /api/analytics/recommendations` - AI suggestions    (Hard → Medium → Easy)└─────────────────────────────────────────────────────────────┘



### Module 7: Learning Paths    ↓



**File**: `learning_path_service.py`Filter question bank by:```



**Path Generation Algorithm**:├─ New difficulty level

```python

def generate_learning_path(user_id):├─ Current topic**Frontend (TypeScript)**## Table of Contents

    # Analyze weak areas (< 70% mastery)

    weak_topics = get_topics_below_threshold(user_id, 70)└─ Not previously answered in this session

    

    # Prioritize by importance and gap    ↓### Request Flow Diagrams

    prioritized = sort_by_score(weak_topics)

    Select next question

    # Create milestones

    milestones = []    ↓- Framework: React 18.2.0

    for topic in prioritized[:5]:

        milestones.append({Deliver to user

            'topic': topic,

            'target_accuracy': topic.current + 20,```#### Quiz Generation Flow

            'recommended_quizzes': 10

        })

    

    return LearningPath.create(user_id, milestones)---- Language: TypeScript 4.9.5### 1.1 Purpose

```



### Module 8: Multiplayer Service

## 3. Backend Implementation```

**File**: `multiplayer_service.py`



**WebSocket Events**:

- `create_room` - Create quiz room### Module StructureUser Upload (PDF/DOCX/URL/Text)- Styling: Tailwind CSS 3.3.0

- `join_room` - Join room

- `start_quiz` - Begin synchronized quiz

- `submit_answer` - Real-time answer submission

- `update_leaderboard` - Live rankings```        ↓

- `end_quiz` - Finalize scores

backend/

---

├── app.py                      # Main Flask application (4041 lines)Frontend: POST /api/content/upload- Routing: React Router 6.4.01. [System Overview](#1-system-overview)1. [Project Overview](#project-overview)

## 4. Frontend Implementation

├── models.py                   # Database models (707 lines, 15 tables)

### Application Structure

├── auth.py                     # JWT authentication & authorization        ↓

```

frontend/src/├── question_gen.py             # AI question generation with Gemini

├── pages/                  # 13 page components

│   ├── Login.tsx├── content_processor.py        # PDF/DOCX/URL content extractionBackend: content_processor.py- HTTP Client: Axios 1.5.0

│   ├── Register.tsx

│   ├── Dashboard.tsx├── answer_evaluator_simple.py  # NLP-based answer evaluation

│   ├── ContentUploadPage.tsx

│   ├── Quiz.tsx├── badge_service.py            # Achievement/badge management        ├→ PDF: PyPDF2.extract_text()

│   ├── Results.tsx

│   ├── History.tsx├── analytics_service.py        # Performance tracking & trends

│   ├── Analytics.tsx

│   ├── AnalyticsDashboard.tsx├── learning_path_service.py    # Adaptive learning recommendations        ├→ DOCX: python-docx.extract()- WebSocket: Socket.IO Client 4.8.1Smart Quizzer AI is an adaptive learning platform that:

│   ├── Leaderboard.tsx

│   ├── ProfilePage.tsx├── multiplayer_service.py      # Real-time multiplayer logic

│   ├── AdminDashboard.tsx

│   └── ResetPassword.tsx├── leaderboard_service.py      # Global ranking system        └→ URL: BeautifulSoup4.scrape()

│

├── components/             # 8 reusable components├── error_handler.py            # Centralized error handling

│   ├── Header.tsx

│   ├── ContentUpload.tsx└── requirements.txt            # 28 Python dependencies        ↓

│   ├── BadgeShowcase.tsx

│   ├── BadgeProgress.tsx```

│   ├── PerformanceChart.tsx

│   ├── TopicHeatmap.tsxText Content (max 5000 chars)

│   ├── WeeklyReport.tsx

│   └── RecommendationCard.tsx### Module 1: User Authentication & Authorization

│

├── lib/        ↓**DevOps**- Generates quizzes from custom content using AI2. [Architecture Design](#2-architecture-design)2. [Project Statement](#project-statement)

│   ├── api.ts            # Axios HTTP client

│   └── userManager.ts    # Session management**File**: `auth.py`

│

├── App.tsx               # Main app with routingquestion_gen.py: generate_questions()

├── index.tsx             # Entry point

└── index.css             # Tailwind CSS**Responsibilities**:

```

- User registration with password hashing (BCrypt)        ↓- Containerization: Docker & Docker Compose

### State Management

- Login with JWT token generation

**Approach**: React Hooks

- `useState` - Component state- Token validation middlewareGoogle Gemini AI API

- `useEffect` - Side effects

- `useCallback` - Memoized functions- Role-based access control (user/admin)

- `useContext` - Global state

        ├→ Generate 5-20 questions- Version Control: Git- Evaluates answers with semantic understanding

### API Client

**Key Functions**:

**File**: `lib/api.ts`

```python        ├→ Apply Bloom's Taxonomy

```typescript

import axios from 'axios';def init_jwt(app):



const api = axios.create({    """Initialize Flask-JWT-Extended with app"""        ├→ Classify difficulty- Package Management: pip (Python), npm (Node.js)

  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',

  headers: {'Content-Type': 'application/json'},    

  timeout: 15000,

});def generate_tokens(user_id):        └→ Create answer options



// Request interceptor: Add JWT    """Generate access token for user"""

api.interceptors.request.use((config) => {

  const token = localStorage.getItem('access_token');    return create_access_token(identity=user_id, expires_delta=timedelta(days=1))        ↓- Adapts difficulty based on user performance3. [Module Documentation](#3-module-documentation)3. [Project Outcomes](#project-outcomes)

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;

});

@auth_requiredQuestion objects stored in database

// Response interceptor: Handle 401

api.interceptors.response.use(def protected_route():

  (response) => response,

  (error) => {    """Decorator for routes requiring authentication"""        ↓### 1.3 Project Structure

    if (error.response?.status === 401) {

      localStorage.clear();```

      window.location.href = '/login';

    }Frontend receives quiz session ID

    return Promise.reject(error);

  }**Endpoints**:

);

```- `POST /api/auth/register` - Create new user account        ↓- Provides analytics and personalized learning paths



### Routing- `POST /api/auth/login` - Authenticate and receive JWT token



**File**: `App.tsx`- `POST /api/auth/logout` - Invalidate token (client-side)User starts quiz



```typescript- `GET /api/auth/profile` - Get current user profile

<Router>

  <Routes>``````

    <Route path="/" element={<Login />} />

    <Route path="/register" element={<Register />} />### Module 2: AI Question Generation

    <Route path="/dashboard" element={<Dashboard />} />

    <Route path="/upload" element={<ContentUploadPage />} />

    <Route path="/quiz/:sessionId" element={<Quiz />} />

    <Route path="/results/:sessionId" element={<Results />} />**File**: `question_gen.py`

    <Route path="/history" element={<History />} />

    <Route path="/analytics" element={<AnalyticsDashboard />} />#### Answer Evaluation FlowSmart-Quizzer-AI/4. [Database Schema](#4-database-schema)4. [System Architecture](#system-architecture)

    <Route path="/leaderboard" element={<Leaderboard />} />

    <Route path="/profile" element={<ProfilePage />} />**Responsibilities**:

    <Route path="/admin" element={<AdminDashboard />} />

  </Routes>- Interface with Google Gemini AI API

</Router>

```- Generate questions from provided content



---- Classify questions by Bloom's Taxonomy```│



## 5. Database Schema- Multi-factor difficulty calculation



### Entity RelationshipsUser submits answer



```**Algorithm: Multi-Factor Difficulty Classification**:

User (1) ──────< (M) QuizSession

  │                      │```python        ↓├── backend/                          # Flask Backend Application### 1.2 Technology Stack

  │                      ├──< (M) PerformanceTrend

  │                      └──< (1) QuizLeaderboarddef classify_difficulty(question):

  │

  ├──────< (M) UserBadge >────── (1) Badge    # Factor 1: Bloom's Taxonomy (40% weight)Frontend: POST /api/quiz/{session_id}/answer

  │

  ├──────< (M) LearningPath >────< (M) LearningMilestone    bloom_levels = {

  │

  └──────< (M) MultiplayerParticipant >────── (1) MultiplayerRoom        'Remember': 0.1, 'Understand': 0.2, 'Apply': 0.4,        ↓│   ├── app.py                       # Main Flask app (90+ endpoints)



Topic (1) ──────< (M) Question        'Analyze': 0.6, 'Evaluate': 0.8, 'Create': 1.0

  │                      │

  │                      ├──< (M) QuizSession    }Backend retrieves correct answer from database

  │                      ├──< (M) FlaggedQuestion

  │                      └──< (M) QuestionFeedback    bloom_score = bloom_levels[question['bloom_level']]

```

            ↓│   ├── models.py                    # SQLAlchemy models (15 models)5. [API Reference](#5-api-reference)5. [Technology Stack](#technology-stack)

### Table Definitions

    # Factor 2: Semantic Complexity (30%)

#### 1. user

```sql    semantic_score = calculate_semantic_complexity(question_text)answer_evaluator_simple.py: evaluate_answer()

CREATE TABLE user (

    id INTEGER PRIMARY KEY AUTOINCREMENT,    

    username VARCHAR(80) UNIQUE NOT NULL,

    email VARCHAR(120) UNIQUE NOT NULL,    # Factor 3: Text Metrics (20%)        ↓│   ├── auth.py                      # JWT authentication utilities

    password_hash VARCHAR(256) NOT NULL,

    full_name VARCHAR(200),    text_score = calculate_text_complexity(question_text)

    skill_level VARCHAR(20) DEFAULT 'Beginner',

    role VARCHAR(20) DEFAULT 'user',    Question Type Check:

    total_points INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP    # Factor 4: Historical Accuracy (10% - if available)

);

```    historical_score = question.get('correct_rate', 0.5)├─ MCQ/True-False → Exact match comparison│   ├── question_gen.py              # AI question generation**Backend**



#### 2. quiz_session    

```sql

CREATE TABLE quiz_session (    # Weighted average└─ Short Answer → NLP semantic similarity

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,    final_score = (

    topic_id INTEGER,

    difficulty VARCHAR(20) DEFAULT 'Medium',        bloom_score * 0.40 +        ↓│   ├── answer_evaluator_simple.py   # NLP answer evaluation

    total_questions INTEGER DEFAULT 10,

    score INTEGER DEFAULT 0,        semantic_score * 0.30 +

    accuracy FLOAT DEFAULT 0.0,

    time_spent INTEGER DEFAULT 0,        text_score * 0.20 +Sentence-Transformers Model (all-MiniLM-L6-v2)

    completed BOOLEAN DEFAULT 0,

    completed_at DATETIME,        historical_score * 0.10

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE    )        ├→ Encode user answer → 384-dim vector│   ├── content_processor.py         # PDF/DOCX/URL processing- **Framework**: Flask 3.0.0 (Python 3.13)6. [Frontend Components](#6-frontend-components)6. [Module Implementation](#module-implementation)

);

```    



#### 3. question    if final_score < 0.33:        ├→ Encode correct answer → 384-dim vector

```sql

CREATE TABLE question (        return 'Easy'

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    topic_id INTEGER,    elif final_score < 0.67:        └→ Calculate cosine similarity (0-1)│   ├── badge_service.py             # Achievement badge system

    text TEXT NOT NULL,

    options JSON,        return 'Medium'

    correct_answer TEXT NOT NULL,

    explanation TEXT,    else:        ↓

    difficulty VARCHAR(20),

    bloom_level VARCHAR(50),        return 'Hard'

    question_type VARCHAR(50),

    times_used INTEGER DEFAULT 0,```Similarity vs Threshold (0.75):│   ├── analytics_service.py         # Performance analytics- **ORM**: SQLAlchemy 2.0.43

    correct_rate FLOAT DEFAULT 0.0,

    FOREIGN KEY (topic_id) REFERENCES topic(id)

);

```**Gemini AI Configuration**:├─ >= 0.75 → Correct (is_correct=True)



#### 4-15. Additional Tables```python

- `topic` - Quiz subjects

- `badge` - Achievement definitionsmodel = genai.GenerativeModel('gemini-1.5-flash')└─ < 0.75 → Incorrect (is_correct=False)│   ├── learning_path_service.py     # Personalized learning paths

- `user_badge` - User achievements

- `performance_trend` - Analytics datageneration_config = {

- `learning_path` - Personalized routes

- `learning_milestone` - Progress checkpoints    'temperature': 0.7,      # Balanced creativity/accuracy        ↓

- `multiplayer_room` - Real-time rooms

- `multiplayer_participant` - Room participants    'top_p': 0.95,          # Nucleus sampling

- `password_reset_token` - Password recovery

- `question_feedback` - User ratings    'top_k': 40,            # Top-k samplingGenerate contextual feedback│   ├── leaderboard_service.py       # Global leaderboard management- **Database**: SQLite (dev), PostgreSQL (prod)7. [AI & Machine Learning](#7-ai--machine-learning)7. [Database Schema](#database-schema)

- `flagged_question` - Reported questions

- `quiz_leaderboard` - Global rankings    'max_output_tokens': 2048,



---}        ↓



## 6. API Reference```



### Base URLUpdate user performance metrics│   ├── multiplayer_service.py       # Real-time multiplayer features

```

Development: http://localhost:5000**Endpoints**:

Production: https://your-domain.com

```- `POST /api/quiz/generate` - Generate quiz from content        ↓



### Authentication- `POST /api/content/upload` - Upload and process content



Protected endpoints require JWT:Check badge eligibility (badge_service.py)│   ├── error_handler.py             # Centralized error handling- **AI**: Google Gemini 1.5 Flash

```

Authorization: Bearer <access_token>### Module 3: Answer Evaluation

```

        ↓

### Key Endpoints

**File**: `answer_evaluator_simple.py`

#### POST /api/auth/register

Response sent to frontend with:│   ├── requirements.txt             # Python dependencies

Register new user.

**Responsibilities**:

**Request**:

```json- Evaluate user answers with NLP- is_correct

{

  "username": "johndoe",- Generate contextual feedback

  "email": "john@example.com",

  "password": "SecurePass123!",- Calculate confidence scores- similarity score│   └── instance/- **NLP**: Sentence-Transformers (all-MiniLM-L6-v2)8. [Workflows](#8-workflows)8. [API Documentation](#api-documentation)

  "full_name": "John Doe"

}

```

**NLP Model**: Sentence-Transformers `all-MiniLM-L6-v2`- confidence level

**Response (201)**:

```json- Embedding dimension: 384

{

  "message": "User registered successfully",- Inference speed: ~10ms per sentence- feedback message│       └── smart_quizzer.db        # SQLite database

  "user": {

    "id": 1,- Accuracy: 85-90% on semantic similarity benchmarks

    "username": "johndoe",

    "email": "john@example.com",- points earned

    "role": "user"

  }**Evaluation Logic**:

}

``````python- badges unlocked│- **Real-time**: Flask-SocketIO 5.4.1



#### POST /api/auth/logindef evaluate_answer(user_answer, correct_answer, question_type):



Authenticate user.    if question_type in ['MCQ', 'TrueFalse']:```



**Request**:        # Exact match for structured questions

```json

{        is_correct = user_answer.lower().strip() == correct_answer.lower().strip()├── frontend/                         # React Frontend Application

  "username": "johndoe",

  "password": "SecurePass123!"        return {

}

```            'is_correct': is_correct,#### Adaptive Difficulty Flow



**Response (200)**:            'similarity': 1.0 if is_correct else 0.0,

```json

{            'confidence': 100 if is_correct else 0│   ├── src/- **Authentication**: JWT (PyJWT 2.10.1)9. [Security & Authentication](#9-security--authentication)9. [Features Implementation](#features-implementation)

  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

  "user": {        }

    "id": 1,

    "username": "johndoe",    ```

    "total_points": 850

  }    elif question_type == 'ShortAnswer':

}

```        # Semantic similarity for open-ended questionsUser completes question│   │   ├── pages/                   # 13 page components



#### POST /api/quiz/start        user_embedding = model.encode([user_answer])[0]



Start quiz session.        correct_embedding = model.encode([correct_answer])[0]        ↓



**Request**:        

```json

{        similarity = cosine_similarity([user_embedding], [correct_embedding])[0][0]Calculate recent performance (last 5 questions)│   │   ├── components/              # 8 reusable components

  "topic_id": 1,

  "difficulty": "Medium",        threshold = float(os.getenv('SIMILARITY_THRESHOLD', '0.75'))

  "num_questions": 10

}                ↓

```

        is_correct = similarity >= threshold

**Response (201)**:

```json        Compute accuracy percentage│   │   ├── lib/

{

  "session_id": 42,        return {

  "topic": "Python Programming",

  "difficulty": "Medium",            'is_correct': is_correct,        ↓

  "first_question": {

    "id": 105,            'similarity': float(similarity),

    "text": "What is a list comprehension?",

    "options": ["A", "B", "C", "D"],            'confidence': float(similarity * 100),Difficulty adjustment logic:│   │   │   ├── api.ts              # API client (Axios)**Frontend**10. [Testing](#10-testing)10. [Local Development Setup](#local-development-setup)

    "question_type": "MCQ"

  }            'feedback': generate_feedback(similarity)

}

```        }├─ Accuracy >= 80% → Increase difficulty (Easy→Medium→Hard)



#### POST /api/quiz/{session_id}/answer```



Submit answer.├─ Accuracy 50-79% → Maintain current difficulty│   │   │   └── userManager.ts      # User session management



**Request**:**Similarity Score Interpretation**:

```json

{- **1.00**: Exact match└─ Accuracy < 50% → Decrease difficulty (Hard→Medium→Easy)

  "question_id": 105,

  "answer": "A way to create lists concisely"- **0.95-0.99**: Excellent understanding

}

```- **0.85-0.94**: Very good comprehension        ↓│   │   ├── App.tsx                 # Main React app- **Framework**: React 18.2.0



**Response (200)**:- **0.75-0.84**: Good, captures main idea ✅ (Accepted)

```json

{- **0.60-0.74**: Partial understandingSelect next question with adjusted difficulty

  "is_correct": true,

  "similarity": 0.89,- **<0.60**: Incorrect ❌

  "confidence": 89.3,

  "feedback": "Very good! Answer demonstrates understanding.",        ↓│   │   └── index.tsx               # React entry point

  "points_earned": 10,

  "badges_unlocked": ["Quiz Starter"],### Module 4: Content Processing

  "next_question": {...}

}Deliver question to user

```

**File**: `content_processor.py`

#### GET /api/analytics/trends

```│   ├── package.json                # Node dependencies- **Language**: TypeScript 4.9.511. [Deployment](#11-deployment)11. [User Guide](#user-guide)

Get performance trends.

**Responsibilities**:

**Query Parameters**:

- `days`: Number of days (default: 30)- Extract text from multiple file formats

- `topic_id`: Filter by topic (optional)

- Web scraping for URL content

**Response (200)**:

```json- Text cleaning and preprocessing---│   └── tsconfig.json               # TypeScript config

{

  "trends": [

    {

      "date": "2025-10-15",**Supported Formats**:

      "quizzes_taken": 3,

      "average_accuracy": 85.5,1. **PDF**: PyPDF2 + pdfplumber (dual extraction for better accuracy)

      "total_points": 120

    }2. **DOCX**: python-docx## Backend Implementation│- **Styling**: Tailwind CSS 3.4.17

  ],

  "summary": {3. **URL**: BeautifulSoup4 + requests

    "total_quizzes": 45,

    "overall_accuracy": 82.34. **Plain Text**: Direct processing

  }

}

```

**Content Size Limits**:### Main Application Structure (app.py)├── docker-compose.yml              # Multi-container orchestration

#### GET /api/leaderboard

- Maximum file upload: 16 MB

Get global rankings.

- Maximum text length for processing: 5000 characters

**Query Parameters**:

- `period`: weekly | monthly | all-time- Automatically truncates longer content

- `limit`: Number of entries (default: 50)

The Flask application serves as the central hub for all backend operations.├── README.md                       # Project overview- **Routing**: React Router 6.28.012. [Troubleshooting](#12-troubleshooting)12. [Admin Guide](#admin-guide)

**Response (200)**:

```json### Module 5: Badge & Achievement System

{

  "leaderboard": [

    {

      "rank": 1,**File**: `badge_service.py`

      "username": "toplearner",

      "total_points": 5420,**Key Components**:├── SETUP.md                        # Installation guide

      "average_accuracy": 94.2

    }**21 Achievement Badges**:

  ],

  "user_rank": 15

}

```| Badge Name | Criteria | Description |



---|------------|----------|-------------|```python├── PROJECT_DOCUMENTATION.md        # This file- **HTTP Client**: Axios 1.7.9



## 7. AI/ML Components| Quiz Starter | Complete 1 quiz | First quiz completion |



### Google Gemini AI| Perfect Score | 100% on any quiz | Perfect accuracy |from flask import Flask, request, jsonify



**Model**: `gemini-1.5-flash`| Streak Master | 5 consecutive days | Daily engagement |



**Purpose**: Question generation| Marathon Runner | 50 quizzes completed | Long-term dedication |from flask_cors import CORS└── LICENSE                         # MIT License



**Configuration**:| Speed Demon | Avg < 10s per question | Quick thinking |

- Temperature: 0.7

- Top-p: 0.95| Topic Explorer | Complete 5 different topics | Broad learning |from flask_socketio import SocketIO, emit, join_room

- Top-k: 40

- Max tokens: 2048| Accuracy Pro | 90%+ average accuracy | Consistent excellence |



**Rate Limits (Free Tier)**:| Comeback Kid | Improve score by 20%+ | Growth mindset |from models import db, User, QuizSession, Question, Badge```- **Build Tool**: Webpack 513. [Development Timeline](#development-timeline)

- 60 requests/minute

- 1,500 requests/day| Early Bird | Quiz before 8 AM | Morning learner |



### Sentence-Transformers| Night Owl | Quiz after 10 PM | Night learner |import google.generativeai as genai



**Model**: `all-MiniLM-L6-v2`| Weekend Warrior | 10 quizzes on weekends | Weekend dedication |



**Purpose**: Semantic similarity| Social Butterfly | 5 multiplayer games | Social learning |from sentence_transformers import SentenceTransformer



**Specs**:| Leaderboard King | Top 10 global rank | Competitive excellence |

- Embedding dimension: 384

- Max sequence: 256 tokens| Knowledge Seeker | 100 quizzes completed | Dedication |

- Inference: ~10ms

- Model size: ~90 MB| Subject Master | 95%+ in one topic | Topic expertise |

- Accuracy: 82.4% (STS benchmark)

| Adaptive Learner | Complete all difficulty levels | Versatility |# Initialize Flask app---

**Usage**:

```python| Feedback Champion | Provide 10 question feedbacks | Community contributor |

from sentence_transformers import SentenceTransformer

| Badge Collector | Earn 10 different badges | Achievement hunter |app = Flask(__name__)

model = SentenceTransformer('all-MiniLM-L6-v2')

embeddings = model.encode(["Text 1", "Text 2"])| Consistency Award | 30-day streak | Long-term commitment |

similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]

```| Quiz Master | 500 quizzes completed | Ultimate dedication |app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')



---| Legend | All other badges earned | Complete mastery |



## 8. Security & Authenticationapp.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')



### JWT Authentication**Badge Checking Logic**:



**Token Structure**:```pythonapp.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False## 2. Architecture Design**DevOps**---14. [Performance Optimizations](#performance-optimizations)

```json

{def check_badge_eligibility(user_id, event_type):

  "header": {"alg": "HS256", "typ": "JWT"},

  "payload": {    user = User.query.get(user_id)

    "identity": 1,

    "exp": 1730803200,    eligible_badges = []

    "iat": 1730716800

  }    # Enable CORS for frontend communication

}

```    for badge in Badge.query.all():



**Token Lifetime**: 24 hours        if badge.criteria_type == 'quiz_count':CORS(app, supports_credentials=True, resources={



### Password Security            if count_user_quizzes(user_id) >= badge.criteria_value:



**Algorithm**: BCrypt                award_badge(user_id, badge.id)    r"/api/*": {"origins": [os.getenv('CORS_ORIGINS', 'http://localhost:8080')]}### 2.1 High-Level Architecture- **Version Control**: Git

- Salt rounds: 12

- Auto-generated salt                eligible_badges.append(badge)



**Requirements**:        })

- Minimum 8 characters

- Uppercase + lowercase        elif badge.criteria_type == 'accuracy':

- At least one digit

- At least one special character            if calculate_average_accuracy(user_id) >= badge.criteria_value:



### CORS Configuration                award_badge(user_id, badge.id)



```python                eligible_badges.append(badge)# Initialize SocketIO for real-time features

CORS(app, resources={

    r"/api/*": {        

        "origins": ["http://localhost:8080"],

        "methods": ["GET", "POST", "PUT", "DELETE"],        # ... more criteria checkssocketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')```- **Package Management**: pip (backend), npm (frontend)15. [Security Features](#security-features)

        "allow_headers": ["Content-Type", "Authorization"],

        "supports_credentials": True    

    }

})    return eligible_badges

```

```

### Input Validation

# Initialize database┌─────────────────────────────────────────────────────────────┐

- File upload limit: 16 MB

- SQL injection prevention (SQLAlchemy ORM)### Module 6: Analytics & Performance Tracking

- XSS protection (input sanitization)

- CSRF protection (JWT tokens)db.init_app(app)



---**File**: `analytics_service.py`



## 9. Real-Time Features│                     Client Layer (Browser)                   │- **Environment**: python-dotenv



### WebSocket Implementation**Tracked Metrics**:



**Technology**: Flask-SocketIO + Socket.IO Client- Quiz completion rate# Initialize AI models



**Events**:- Average accuracy per topic



**Client → Server**:- Performance trends over timegenai.configure(api_key=os.getenv('GOOGLE_API_KEY'))│                                                              │

- `create_room`

- `join_room`- Time spent per question

- `submit_answer`

- `leave_room`- Difficulty progressionnlp_model = SentenceTransformer('all-MiniLM-L6-v2')



**Server → Client**:- Streak tracking

- `user_joined`

- `quiz_started````│  ┌────────────────────────────────────────────────────────┐ │## 1. System Overview16. [Future Enhancements](#future-enhancements)

- `answer_submitted`

- `leaderboard_update`**Visualizations Provided**:

- `quiz_ended`

1. **Performance Line Chart**: Daily/weekly/monthly trends

**Connection**:

```typescript2. **Topic Heatmap**: Color-coded proficiency matrix

import io from 'socket.io-client';

3. **Accuracy Distribution**: Histogram of scores**Startup Sequence**:│  │         React Frontend (TypeScript)                     │ │

const socket = io('http://localhost:5000', {

  auth: {token: localStorage.getItem('access_token')}4. **Time Analysis**: Average time per difficulty level

});

1. Load environment variables from `.env`

socket.on('connect', () => {

  console.log('Connected');**Endpoints**:

});

```- `GET /api/analytics/trends` - Performance trends2. Configure Flask with secret keys and database URI│  │  • 13 Pages  • 8 Components  • Tailwind CSS            │ │### 1.3 Project Structure



---- `GET /api/analytics/topics` - Topic-wise breakdown



## 10. Testing- `GET /api/analytics/recommendations` - AI-generated study suggestions3. Enable CORS for cross-origin requests



### Manual Testing



**Backend Tests**:### Module 7: Learning Path Service4. Initialize SocketIO for WebSocket support│  └────────────────────────────────────────────────────────┘ │

- API endpoint responses

- JWT authentication

- Database operations

- File uploads**File**: `learning_path_service.py`5. Connect to database (SQLite or PostgreSQL)

- AI question generation

- Answer evaluation



**Frontend Tests**:**Responsibilities**:6. Create all database tables if they don't exist└──────────────────────────┬──────────────────────────────────┘17. [Contributing](#contributing)

- Page rendering

- Routing navigation- Analyze user performance data

- Form submissions

- API calls- Identify knowledge gaps7. Insert default topics and badges

- WebSocket connections

- Chart visualizations- Generate personalized learning paths



---- Track milestone achievements8. Initialize AI models (Gemini AI, Sentence-Transformers)                           │ HTTP/HTTPS + WebSocket



## 11. Deployment



### Production Checklist**Path Generation Algorithm**:9. Start server on port 5000



- [ ] Set `FLASK_ENV=production````python

- [ ] Use PostgreSQL

- [ ] Strong SECRET_KEY and JWT_SECRET_KEYdef generate_learning_path(user_id):                           ▼```

- [ ] Configure CORS_ORIGINS

- [ ] Use Gunicorn    # Step 1: Analyze weak areas

- [ ] Set up HTTPS/SSL

- [ ] Configure firewall    weak_topics = get_topics_below_threshold(user_id, threshold=70)### API Endpoint Categories

- [ ] Set up monitoring

- [ ] Database backups    

- [ ] Test disaster recovery

    # Step 2: Prioritize by importance and difficulty┌─────────────────────────────────────────────────────────────┐

### Gunicorn

    prioritized = sort_by_score(weak_topics, 

```bash

gunicorn -w 4 \                                 factors=['mastery_gap', 'topic_importance'])**90+ Total Endpoints** organized into:

         -b 0.0.0.0:5000 \

         --worker-class eventlet \    

         --access-logfile logs/access.log \

         --error-logfile logs/error.log \    # Step 3: Create milestones│                     API Gateway Layer                        │Smart-Quizzer-AI/### 1.1 Project Description18. [License](#license)

         app:app

```    milestones = []



### Nginx    for topic in prioritized[:5]:  # Top 5 weak areas1. **Authentication** (5 endpoints)



```nginx        milestones.append({

server {

    listen 80;            'topic': topic,   - User registration, login, logout│                                                              │

    server_name yourdomain.com;

                'target_accuracy': topic.current_accuracy + 20,

    location /api/ {

        proxy_pass http://127.0.0.1:5000;            'recommended_quizzes': 10,   - Profile management

        proxy_set_header Host $host;

    }            'estimated_time': '2 weeks'

    

    location /socket.io/ {        })   - Password reset│  ┌────────────────────────────────────────────────────────┐ ││

        proxy_pass http://127.0.0.1:5000;

        proxy_http_version 1.1;    

        proxy_set_header Upgrade $http_upgrade;

        proxy_set_header Connection "upgrade";    return LearningPath.create(user_id, milestones)

    }

    ```

    location / {

        root /var/www/frontend/build;2. **Quiz Management** (15 endpoints)│  │           Flask Application (app.py)                    │ │

        try_files $uri /index.html;

    }### Module 8: Multiplayer Service

}

```   - Start quiz, get questions



---**File**: `multiplayer_service.py`



## 12. Development Guidelines   - Submit answers, complete quiz│  │  • 90+ REST API Endpoints                               │ │├── backend/                        # Flask backend application



### Code Style**Features**:



**Python (PEP 8)**:- Create and join quiz rooms   - Quiz history, results

- Line length: 100 chars

- Indentation: 4 spaces- Real-time synchronization

- Functions: `snake_case`

- Classes: `PascalCase`- Live leaderboard updates│  │  • 10+ WebSocket Event Handlers                         │ │



**TypeScript/React**:- Room state management

- ESLint enabled

- Prettier formatting3. **Content Processing** (8 endpoints)

- Functional components

- React Hooks**WebSocket Events**:



### Commit Messages- `create_room` - Create new multiplayer room   - Upload PDF/DOCX│  │  • JWT Authentication Middleware                        │ ││   ├── app.py                     # Main Flask app (90+ endpoints)



```- `join_room` - Join existing room

<type>(<scope>): <subject>

- `start_quiz` - Begin synchronized quiz   - Process URLs

<body>

- `submit_answer` - Submit answer with broadcast

<footer>

```- `update_leaderboard` - Real-time ranking updates   - Text input│  │  • Error Handling & Logging                             │ │



**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`- `end_quiz` - Finalize scores and winner



**Example**:

```

feat(quiz): Add adaptive difficulty---



Implemented real-time difficulty scaling.4. **Analytics** (10 endpoints)│  └────────────────────────────────────────────────────────┘ ││   ├── models.py                  # SQLAlchemy models (15 models)Smart Quizzer AI is an adaptive learning platform that uses artificial intelligence to generate personalized quizzes, evaluate answers with semantic understanding, and track user progress through comprehensive analytics. The system employs Google Gemini AI for question generation, NLP models for answer evaluation, and adaptive algorithms for difficulty adjustment.---



Closes #42## 4. Frontend Implementation

```

   - Performance trends

### Branching

### Application Structure

- `main` - Production

- `develop` - Development   - Topic mastery└──────────────────────────┬──────────────────────────────────┘

- `feature/*` - New features

- `fix/*` - Bug fixes```

- `hotfix/*` - Critical fixes

frontend/src/   - Recommendations

---

├── pages/                  # 13 page components

**Document Version**: 1.0  

**Last Updated**: November 4, 2025  │   ├── Login.tsx          # User authentication                           ││   ├── auth.py                    # Authentication utilities

**Maintainer**: Mamatha Bachu  

**Repository**: [github.com/BatchuMamatha/Smart-Quizzer-AI](https://github.com/BatchuMamatha/Smart-Quizzer-AI)│   ├── Register.tsx       # New user signup


│   ├── Dashboard.tsx      # Main user dashboard5. **Badges & Achievements** (6 endpoints)

│   ├── ContentUploadPage.tsx # Content upload interface

│   ├── Quiz.tsx           # Quiz-taking interface   - Available badges        ┌──────────────────┼──────────────────┬────────────────┐

│   ├── Results.tsx        # Quiz results display

│   ├── History.tsx        # Past quiz history   - User badges

│   ├── Analytics.tsx      # Performance analytics

│   ├── AnalyticsDashboard.tsx # Advanced analytics   - Progress tracking        ▼                  ▼                  ▼                ▼│   ├── error_handler.py           # Global error handling

│   ├── Leaderboard.tsx    # Global rankings

│   ├── ProfilePage.tsx    # User profile management

│   ├── AdminDashboard.tsx # Admin control panel

│   └── ResetPassword.tsx  # Password recovery6. **Leaderboard** (5 endpoints)┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐

│

├── components/             # 8 reusable components   - Global rankings

│   ├── Header.tsx         # Navigation header

│   ├── ContentUpload.tsx  # File upload component   - Topic-specific rankings│  Business   │  │  AI Services │  │ NLP Services │  │   External   ││   ├── content_processor.py       # PDF/DOCX/URL parsing

│   ├── BadgeShowcase.tsx  # Badge display

│   ├── BadgeProgress.tsx  # Badge progress tracker   - Time-based filters

│   ├── PerformanceChart.tsx # Chart visualization

│   ├── TopicHeatmap.tsx   # Topic mastery heatmap│   Logic     │  │              │  │              │  │   Services   │

│   ├── WeeklyReport.tsx   # Weekly summary

│   └── RecommendationCard.tsx # AI recommendations7. **Admin Operations** (12 endpoints)

│

├── lib/   - User management│             │  │ Google       │  │ Sentence-    │  │              ││   ├── question_gen.py            # AI question generation### 1.2 Key Capabilities## 1. Project Overview

│   ├── api.ts            # Axios HTTP client with interceptors

│   └── userManager.ts    # Local storage user management   - Content moderation

│

├── App.tsx               # Main app with routing   - System statistics│ • Quiz Eng  │  │ Gemini AI    │  │ Transformers │  │ • PDF Parse  │

├── index.tsx             # React entry point

└── index.css             # Tailwind CSS imports

```

8. **Multiplayer** (10 endpoints)│ • Adaptive  │  │ (Question    │  │ (Answer      │  │ • URL Fetch  ││   ├── answer_evaluator_simple.py # Answer evaluation logic

### State Management

   - Create/join rooms

**Approach**: Local component state with React Hooks

- `useState` for component-level state   - Start multiplayer quiz│   Learning  │  │  Generation) │  │  Evaluation) │  │ • Content    │

- `useEffect` for side effects and data fetching

- `useCallback` for memoized functions   - Live updates

- `useContext` for global state (user authentication)

│ • Badges    │  │              │  │              │  │   Process    ││   ├── analytics_service.py       # Performance analytics

### API Client Configuration

9. **Learning Paths** (10 endpoints)

**File**: `lib/api.ts`

   - Personalized paths│ • Analytics │  │              │  │              │  │              │

```typescript

import axios from 'axios';   - Milestone tracking



const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';   - Progress updates└─────────────┘  └──────────────┘  └──────────────┘  └──────────────┘│   ├── badge_service.py           # Achievement system



const api = axios.create({

  baseURL: API_BASE_URL,

  headers: {10. **User Profile** (9+ endpoints)        │

    'Content-Type': 'application/json',

  },    - Update preferences

  timeout: 15000,

});    - Skill level management        ▼│   ├── learning_path_service.py   # Learning path generation- **Automated Question Generation**: AI creates contextually relevant questions from custom content**Smart Quizzer AI** is an intelligent, adaptive quiz generation platform that creates personalized assessments from educational content. The system uses advanced NLP and AI techniques to generate dynamic quizzes that adapt to individual learner performance.



// Request interceptor: Add JWT token    - Activity history

api.interceptors.request.use(

  (config) => {┌─────────────────────────────────────────────────────────────┐

    const token = localStorage.getItem('access_token');

    if (token && config.headers) {### Database Models (models.py)

      config.headers.Authorization = `Bearer ${token}`;

    }│                     Data Access Layer                        ││   ├── multiplayer_service.py     # Multiplayer features

    return config;

  },**15 Interconnected Models**:

  (error) => Promise.reject(error)

);│                                                              │



// Response interceptor: Handle 401 errors#### Core Models

api.interceptors.response.use(

  (response) => response,│  ┌────────────────────────────────────────────────────────┐ ││   ├── migrate_db.py              # Database migration script- **Adaptive Difficulty**: Real-time adjustment based on user performance

  (error) => {

    if (error.response?.status === 401) {**1. User Model**

      localStorage.removeItem('access_token');

      localStorage.removeItem('user');```python│  │         SQLAlchemy ORM (models.py)                      │ │

      window.location.href = '/login';

    }class User(db.Model):

    return Promise.reject(error);

  }    __tablename__ = 'user'│  │  • 15 Models with Relationships                         │ ││   ├── setup_env.py               # Environment setup

);

    

export default api;

```    id = db.Column(db.Integer, primary_key=True)│  │  • Migration Support                                    │ │



### Routing Configuration    username = db.Column(db.String(80), unique=True, nullable=False)



**File**: `App.tsx`    email = db.Column(db.String(120), unique=True, nullable=False)│  │  • Query Optimization                                   │ ││   ├── requirements.txt           # Python dependencies- **Intelligent Evaluation**: NLP-based semantic answer matching with detailed explanations### Key Highlights



```typescript    password_hash = db.Column(db.String(256), nullable=False)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

    full_name = db.Column(db.String(200))│  └────────────────────────────────────────────────────────┘ │

function App() {

  return (    skill_level = db.Column(db.String(20), default='Beginner')

    <Router>

      <Routes>    role = db.Column(db.String(20), default='user')└──────────────────────────┬──────────────────────────────────┘│   └── instance/

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />    total_points = db.Column(db.Integer, default=0)

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/upload" element={<ContentUploadPage />} />    created_at = db.Column(db.DateTime, default=datetime.utcnow)                           ▼

        <Route path="/quiz/:sessionId" element={<Quiz />} />

        <Route path="/results/:sessionId" element={<Results />} />    

        <Route path="/history" element={<History />} />

        <Route path="/analytics" element={<AnalyticsDashboard />} />    # Relationships┌─────────────────────────────────────────────────────────────┐│       └── smart_quizzer.db       # SQLite database (auto-generated)- **Comprehensive Analytics**: Performance tracking, trend analysis, topic mastery visualization- 🤖 **AI-Powered Question Generation** using Google Gemini AI

        <Route path="/leaderboard" element={<Leaderboard />} />

        <Route path="/profile" element={<ProfilePage />} />    quiz_sessions = db.relationship('QuizSession', backref='user', cascade='all, delete-orphan')

        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>    badges = db.relationship('UserBadge', backref='user', cascade='all, delete-orphan')│                    Database Layer                            │

    </Router>

  );    

}

```    def set_password(self, password):│                                                              ││



---        self.password_hash = bcrypt.hashpw(



## 5. Database Schema            password.encode('utf-8'), │  ┌────────────────────────────────────────────────────────┐ │



### Entity Relationship Diagram            bcrypt.gensalt()



```        ).decode('utf-8')│  │         SQLite Database (smart_quizzer.db)              │ │├── frontend/                       # React frontend application- **Gamification**: 21-badge achievement system with progress tracking- 🎯 **Adaptive Learning Engine** that adjusts difficulty based on performance

User (1) ──────< (M) QuizSession

  │                      │    

  │                      ├──< (M) PerformanceTrend

  │                      │    def check_password(self, password):│  │  • Users, Quizzes, Questions                            │ │

  │                      └──< (1) QuizLeaderboard

  │        return bcrypt.checkpw(

  ├──────< (M) UserBadge >────── (1) Badge

  │            password.encode('utf-8'), │  │  • Badges, Analytics, Leaderboard                       │ ││   ├── public/

  ├──────< (M) LearningPath >────< (M) LearningMilestone

  │            self.password_hash.encode('utf-8')

  └──────< (M) MultiplayerParticipant >────── (1) MultiplayerRoom

        )│  │  • Learning Paths, Multiplayer Data                     │ │

Topic (1) ──────< (M) Question

  │                      │```

  │                      ├──< (M) QuizSession

  │                      ││  └────────────────────────────────────────────────────────┘ ││   │   ├── index.html            # HTML template- **Real-time Features**: WebSocket-based multiplayer quizzes and live leaderboards- 📚 **Multi-Format Content Support** (Text, PDF, DOCX, JSON, CSV)

  │                      ├──< (M) FlaggedQuestion

  │                      │**2. QuizSession Model**

  │                      └──────< (M) QuestionFeedback

```python└─────────────────────────────────────────────────────────────┘

User (1) ──────< (M) PasswordResetToken

User (1) ──────< (M) FlaggedQuestionclass QuizSession(db.Model):

User (1) ──────< (M) QuestionFeedback

```    __tablename__ = 'quiz_session'```│   │   └── favicon.svg           # App icon



### Table Definitions    



#### 1. user    id = db.Column(db.Integer, primary_key=True)

```sql

CREATE TABLE user (    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    username VARCHAR(80) UNIQUE NOT NULL,    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'))### 2.2 Request Flow│   ├── src/- **Content Processing**: PDF, DOCX, TXT, and URL content extraction- 🌐 **Multi-Question Types** (MCQ, True/False, Fill-in-the-blank, Short Answer)

    email VARCHAR(120) UNIQUE NOT NULL,

    password_hash VARCHAR(256) NOT NULL,    difficulty = db.Column(db.String(20), default='Medium')

    full_name VARCHAR(200),

    skill_level VARCHAR(20) DEFAULT 'Beginner',    total_questions = db.Column(db.Integer, default=10)

    role VARCHAR(20) DEFAULT 'user',

    total_points INTEGER DEFAULT 0,    score = db.Column(db.Integer, default=0)

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP    accuracy = db.Column(db.Float, default=0.0)#### Quiz Generation Flow│   │   ├── index.tsx             # React entry point

);

    time_spent = db.Column(db.Integer, default=0)

CREATE INDEX idx_user_email ON user(email);

CREATE INDEX idx_user_username ON user(username);    completed = db.Column(db.Boolean, default=False)

```

    completed_at = db.Column(db.DateTime)

#### 2. quiz_session

```sql    created_at = db.Column(db.DateTime, default=datetime.utcnow)```│   │   ├── App.tsx               # Main app component- 📊 **Real-time Analytics** and performance tracking

CREATE TABLE quiz_session (

    id INTEGER PRIMARY KEY AUTOINCREMENT,```

    user_id INTEGER NOT NULL,

    topic_id INTEGER,User Upload (PDF/Text/URL)

    difficulty VARCHAR(20) DEFAULT 'Medium',

    total_questions INTEGER DEFAULT 10,**3. Question Model**

    current_question_index INTEGER DEFAULT 0,

    score INTEGER DEFAULT 0,```python        ↓│   │   ├── index.css             # Global styles

    accuracy FLOAT DEFAULT 0.0,

    time_spent INTEGER DEFAULT 0,class Question(db.Model):

    completed BOOLEAN DEFAULT 0,

    completed_at DATETIME,    __tablename__ = 'question'Frontend sends to /api/content/upload

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,    

    FOREIGN KEY (topic_id) REFERENCES topic(id) ON DELETE SET NULL

);    id = db.Column(db.Integer, primary_key=True)        ↓│   │   ├── pages/                # Page components (13 pages)### 1.3 System Requirements- 🛡️ **Role-Based Access Control** (Admin/User separation)



CREATE INDEX idx_quiz_user ON quiz_session(user_id);    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'))

CREATE INDEX idx_quiz_completed ON quiz_session(completed);

```    text = db.Column(db.Text, nullable=False)Backend extracts text (content_processor.py)



#### 3. question    options = db.Column(db.JSON)  # For MCQ

```sql

CREATE TABLE question (    correct_answer = db.Column(db.Text, nullable=False)        ↓│   │   │   ├── Login.tsx

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    topic_id INTEGER,    explanation = db.Column(db.Text)

    text TEXT NOT NULL,

    options JSON,    difficulty = db.Column(db.String(20))Text sent to Google Gemini AI (question_gen.py)

    correct_answer TEXT NOT NULL,

    explanation TEXT,    bloom_level = db.Column(db.String(50))

    difficulty VARCHAR(20),

    bloom_level VARCHAR(50),    question_type = db.Column(db.String(50))        ↓│   │   │   ├── Register.tsx- 🚀 **Optimized Performance** (4-5x faster question generation)

    question_type VARCHAR(50),

    times_used INTEGER DEFAULT 0,    times_used = db.Column(db.Integer, default=0)

    correct_rate FLOAT DEFAULT 0.0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,    correct_rate = db.Column(db.Float, default=0.0)AI generates questions with difficulty classification

    FOREIGN KEY (topic_id) REFERENCES topic(id) ON DELETE SET NULL

);```



CREATE INDEX idx_question_topic ON question(topic_id);        ↓│   │   │   ├── Dashboard.tsx

CREATE INDEX idx_question_difficulty ON question(difficulty);

```**4. Badge Model**



#### 4. topic```pythonQuestions stored in database

```sql

CREATE TABLE topic (class Badge(db.Model):

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name VARCHAR(100) UNIQUE NOT NULL,    __tablename__ = 'badge'        ↓│   │   │   ├── Quiz.tsx#### Backend Requirements- � **Enhanced Security** (No default credentials, JWT authentication)

    description TEXT,

    icon VARCHAR(50),    

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);    id = db.Column(db.Integer, primary_key=True)Frontend receives question IDs

```

    name = db.Column(db.String(100), unique=True, nullable=False)

#### 5. badge

```sql    description = db.Column(db.Text)        ↓│   │   │   ├── Results.tsx

CREATE TABLE badge (

    id INTEGER PRIMARY KEY AUTOINCREMENT,    icon = db.Column(db.String(50))

    name VARCHAR(100) UNIQUE NOT NULL,

    description TEXT,    criteria_type = db.Column(db.String(50))Questions fetched one by one for quiz

    icon VARCHAR(50),

    criteria_type VARCHAR(50),    criteria_value = db.Column(db.Integer)

    criteria_value INTEGER,

    points INTEGER DEFAULT 100,    points = db.Column(db.Integer, default=100)```│   │   │   ├── History.tsx- Python 3.13+- 🎤 **Audio Feedback** (Text-to-speech with live captions)

    rarity VARCHAR(20),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP    rarity = db.Column(db.String(20))

);

``````



#### 6. user_badge

```sql

CREATE TABLE user_badge (#### Additional Models#### Answer Evaluation Flow│   │   │   ├── Analytics.tsx

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    badge_id INTEGER NOT NULL,

    earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,5. **Topic** - Quiz topics/subjects

    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,

    FOREIGN KEY (badge_id) REFERENCES badge(id) ON DELETE CASCADE6. **UserBadge** - Junction table for user achievements

);

7. **PerformanceTrend** - Daily/weekly performance metrics```│   │   │   ├── AnalyticsDashboard.tsx- Flask 3.0.0- 🚩 **Content Moderation** (Flag questions and submit feedback)

CREATE INDEX idx_user_badge_user ON user_badge(user_id);

```8. **LearningPath** - Personalized learning routes



#### 7. performance_trend9. **LearningMilestone** - Progress checkpointsUser submits answer

```sql

CREATE TABLE performance_trend (10. **MultiplayerRoom** - Real-time quiz rooms

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,11. **MultiplayerParticipant** - Room participants        ↓│   │   │   ├── ProfilePage.tsx

    topic_id INTEGER,

    date DATE NOT NULL,12. **QuizLeaderboard** - Rankings

    quizzes_taken INTEGER DEFAULT 0,

    average_accuracy FLOAT DEFAULT 0.0,13. **FlaggedQuestion** - User-reported issuesFrontend sends to /api/quiz/{id}/answer

    total_points INTEGER DEFAULT 0,

    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,14. **QuestionFeedback** - User ratings

    FOREIGN KEY (topic_id) REFERENCES topic(id) ON DELETE SET NULL

);15. **PasswordResetToken** - Password recovery        ↓│   │   │   └── ContentUploadPage.tsx- SQLite 3.0+ (or PostgreSQL for production)



CREATE INDEX idx_trend_user_date ON performance_trend(user_id, date);

```

### AI Question Generation (question_gen.py)Backend retrieves correct answer

#### 8-15. Additional Tables

- `password_reset_token` - Password recovery tokens

- `question_feedback` - User ratings on questions

- `flagged_question` - Reported problematic questions**Implementation**:        ↓│   │   ├── components/           # Reusable components (8 components)

- `quiz_leaderboard` - Global ranking entries

- `learning_path` - Personalized learning routes

- `learning_milestone` - Progress checkpoints

- `multiplayer_room` - Real-time quiz rooms```pythonSemantic similarity calculated (answer_evaluator_simple.py)

- `multiplayer_participant` - Room participants

import google.generativeai as genai

---

        ↓│   │   │   ├── ContentUpload.tsx- Google Gemini API Key---

## 6. API Reference

class QuestionGenerator:

### Base URL

```    def __init__(self):Score computed (0-1 similarity) vs threshold (0.75)

Development: http://localhost:5000

Production: https://your-domain.com        genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

```

        self.model = genai.GenerativeModel('gemini-1.5-flash')        ↓│   │   │   ├── BadgeProgress.tsx

### Authentication

        self.config = {

All protected endpoints require JWT token in header:

```            'temperature': 0.7,Feedback generated

Authorization: Bearer <access_token>

```            'top_p': 0.95,



### Endpoint Categories            'top_k': 40,        ↓│   │   │   ├── BadgeShowcase.tsx- 2GB RAM minimum, 4GB recommended



#### Authentication Endpoints            'max_output_tokens': 2048,



**POST /api/auth/register**        }User performance updated in database



Register new user account.    



Request:    def generate_questions(self, content, difficulty='Medium', count=5):        ↓│   │   │   ├── PerformanceChart.tsx

```json

{        """Generate quiz questions from content"""

  "username": "johndoe",

  "email": "john@example.com",        prompt = f"""Generate {count} quiz questions from this content.Analytics updated

  "password": "SecurePass123!",

  "full_name": "John Doe"        

}

```        Difficulty: {difficulty}        ↓│   │   │   ├── RecommendationCard.tsx- 500MB disk space (excluding uploads)## 2. Project Statement



Response (201 Created):        

```json

{        Requirements:Badges checked and awarded

  "message": "User registered successfully",

  "user": {        1. Questions must be directly related to content

    "id": 1,

    "username": "johndoe",        2. Include detailed explanations        ↓│   │   │   ├── TopicHeatmap.tsx

    "email": "john@example.com",

    "role": "user"        3. Classify using Bloom's Taxonomy

  }

}        4. Provide 4 options for MCQResponse sent to frontend

```

        

**POST /api/auth/login**

        Content: {content[:5000]}```│   │   │   └── WeeklyReport.tsx

User login with JWT token generation.

        

Request:

```json        Format as JSON array:

{

  "username": "johndoe",        [{{

  "password": "SecurePass123!"

}            "question": "Question text",#### Adaptive Difficulty Flow│   │   └── lib/

```

            "options": ["A", "B", "C", "D"],

Response (200 OK):

```json            "correct_answer": "Answer",

{

  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",            "explanation": "Explanation",

  "user": {

    "id": 1,            "bloom_level": "Remember|Understand|Apply|Analyze|Evaluate|Create"```│   │       ├── api.ts            # API client (Axios)#### Frontend Requirements### Problem

    "username": "johndoe",

    "email": "john@example.com",        }}]

    "role": "user",

    "total_points": 850        """User completes question

  }

}        

```

        response = self.model.generate_content(prompt, generation_config=self.config)        ↓│   │       └── userManager.ts    # User state management

#### Quiz Management Endpoints

        return self._parse_and_classify(response.text)

**POST /api/quiz/start**

    Performance metrics calculated (recent 5 questions)

Start new quiz session.

    def _classify_difficulty(self, questions):

Request:

```json        """Multi-factor difficulty classification"""        ↓│   ├── package.json              # Node dependencies- Node.js 16+Learning is not one-size-fits-all. Students and self-learners often struggle to find quizzes that align with their current understanding or preferred learning style. Existing quiz tools offer static, generic questions that do not adapt to individual performance or difficulty preferences.

{

  "topic_id": 1,        for q in questions:

  "difficulty": "Medium",

  "num_questions": 10            # Bloom's Taxonomy (40% weight)Accuracy percentage computed

}

```            bloom_score = self._bloom_to_score(q['bloom_level'])



Response (201 Created):                    ↓│   ├── tsconfig.json             # TypeScript config

```json

{            # Semantic complexity (30%)

  "session_id": 42,

  "topic": "Python Programming",            semantic_score = self._semantic_complexity(q['question'])Difficulty adjustment:

  "difficulty": "Medium",

  "total_questions": 10,            

  "first_question": {

    "id": 105,            # Text metrics (20%)  • 80%+ accuracy → Increase difficulty│   ├── tailwind.config.js        # Tailwind CSS config- npm 8+

    "text": "What is a list comprehension in Python?",

    "options": ["A way to create lists", "A loop structure", "A function", "A class"],            text_score = self._text_complexity(q['question'])

    "question_type": "MCQ"

  }              • 50%-80% → Maintain difficulty

}

```            # Historical data (10%)



**POST /api/quiz/{session_id}/answer**            hist_score = q.get('correct_rate', 0.5)  • <50% → Decrease difficulty│   └── postcss.config.js         # PostCSS config



Submit answer for current question.            



Request:            final_score = (        ↓

```json

{                bloom_score * 0.40 +

  "question_id": 105,

  "answer": "A way to create lists concisely"                semantic_score * 0.30 +Next question selected with new difficulty│- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)### Solution

}

```                text_score * 0.20 +



Response (200 OK):                hist_score * 0.10        ↓

```json

{            )

  "is_correct": true,

  "similarity": 0.89,            Question delivered to user├── README.md                       # Project overview

  "confidence": 89.3,

  "feedback": "Very good! Your answer demonstrates understanding.",            q['difficulty'] = 'Easy' if final_score < 0.33 else \

  "explanation": "List comprehensions provide a concise way to create lists in Python.",

  "points_earned": 10,                             'Medium' if final_score < 0.67 else 'Hard'```

  "badges_unlocked": ["Quiz Starter"],

  "next_question": {        

    "id": 106,

    "text": "Next question text...",        return questions├── SETUP.md                        # Installation guide- 1GB RAM minimumThis open-source project addresses the need for personalized, adaptive assessments by generating dynamic quizzes from any educational content (e.g., Wikipedia articles, open textbooks, course material). The system allows users to select difficulty levels and question types and adapts future questions based on performance history.

    "question_type": "ShortAnswer"

  }```

}

```### 2.3 Data Flow



#### Content Upload Endpoints**Bloom's Taxonomy Levels**:



**POST /api/content/upload**- **Remember** (0.1): Recall facts and basic concepts├── PROJECT_DOCUMENTATION.md        # This file



Upload content for quiz generation (multipart/form-data).- **Understand** (0.2): Explain ideas or concepts



Request (Form Data):- **Apply** (0.4): Use information in new situations```

- `file`: PDF or DOCX file (max 16MB)

- `content_type`: "pdf" | "docx" | "url" | "text"- **Analyze** (0.6): Draw connections among ideas

- `url`: (if content_type="url")

- `text_content`: (if content_type="text")- **Evaluate** (0.8): Justify a decision or stanceUser Registration → Password Hashing (BCrypt) → User Model → Database├── LICENSE                         # MIT License



Response (200 OK):- **Create** (1.0): Produce new or original work

```json

{

  "success": true,

  "extracted_text": "Content extracted from uploaded file...",### Answer Evaluation (answer_evaluator_simple.py)

  "text_length": 2543,

  "message": "Content processed successfully"User Login → Credential Validation → JWT Token Generation → Local Storage└── test_custom_content.py          # Backend tests

}

```**Semantic Similarity Implementation**:



#### Analytics Endpoints



**GET /api/analytics/trends?days=30&topic_id=1**```python



Get performance trends.from sentence_transformers import SentenceTransformerQuiz Start → Session Creation → Question Generation → Database Storage```#### Network Requirements### Unique Value Propositions



Response (200 OK):from sklearn.metrics.pairwise import cosine_similarity

```json

{

  "trends": [

    {class AnswerEvaluator:

      "date": "2025-10-15",

      "quizzes_taken": 3,    def __init__(self):Answer Submit → Evaluation (NLP) → Score Calculation → Performance Update

      "average_accuracy": 85.5,

      "total_points": 120        self.model = SentenceTransformer('all-MiniLM-L6-v2')

    },

    ...        self.threshold = float(os.getenv('SIMILARITY_THRESHOLD', '0.75'))

  ],

  "summary": {    

    "total_quizzes": 45,

    "overall_accuracy": 82.3,    def evaluate_answer(self, user_answer, correct_answer, question_type):Analytics Request → Database Query → Trend Calculation → Chart Data---- Internet connection for AI API calls1. **Dynamic Content-to-Quiz Conversion** - Upload any educational material and get instant quizzes

    "total_points": 1850

  }        """Evaluate user answer with NLP"""

}

```        



#### Leaderboard Endpoints        # Exact match for structured questions



**GET /api/leaderboard?period=weekly&limit=50**        if question_type in ['MCQ', 'TrueFalse']:Badge Check → Criteria Evaluation → Award Badge → Notification



Get global rankings.            is_correct = user_answer.lower().strip() == correct_answer.lower().strip()



Response (200 OK):            return {```

```json

{                'is_correct': is_correct,

  "leaderboard": [

    {                'similarity': 1.0 if is_correct else 0.0,## 2. Architecture- Ports: 5000 (backend), 8080 (frontend)2. **Adaptive Difficulty Adjustment** - Real-time difficulty calibration based on user performance

      "rank": 1,

      "username": "toplearner",                'confidence': 100 if is_correct else 0,

      "total_points": 5420,

      "quizzes_completed": 182,                'feedback': 'Correct!' if is_correct else 'Incorrect.'---

      "average_accuracy": 94.2

    },            }

    ...

  ],        

  "user_rank": 15,

  "period": "weekly"        # Semantic similarity for open-ended

}

```        elif question_type == 'ShortAnswer':## 3. Backend Implementation



#### Admin Endpoints            user_emb = self.model.encode([user_answer])[0]



**GET /api/admin/stats** (Admin only)            correct_emb = self.model.encode([correct_answer])[0]### 2.1 System Architecture- WebSocket support for real-time features3. **Advanced Answer Evaluation** - Semantic similarity matching for subjective answers



Get platform-wide statistics.            



Response (200 OK):            similarity = cosine_similarity([user_emb], [correct_emb])[0][0]### 3.1 Main Application (app.py)

```json

{            is_correct = similarity >= self.threshold

  "total_users": 1250,

  "total_quizzes": 8430,            

  "total_questions": 15600,

  "average_engagement": 3.4,            return {

  "most_popular_topic": "Python Programming"

}                'is_correct': is_correct,**Purpose**: Central Flask application handling all API endpoints and WebSocket events.

```

                'similarity': float(similarity),

---

                'confidence': float(similarity * 100),```4. **Bloom's Taxonomy Integration** - Questions categorized by cognitive complexity

## 7. AI/ML Components

                'feedback': self._generate_feedback(similarity)

### Google Gemini AI

            }**Key Components**:

**Model**: `gemini-1.5-flash`

    

**Purpose**: Question generation from content

    def _generate_feedback(self, similarity):┌─────────────────────────────────────────────────────────────┐

**Configuration**:

```python        if similarity >= 0.95:

generation_config = {

    'temperature': 0.7,        # Creativity vs accuracy balance            return "Excellent! Perfect understanding."```python

    'top_p': 0.95,            # Nucleus sampling

    'top_k': 40,              # Top-k sampling        elif similarity >= 0.85:

    'max_output_tokens': 2048,

}            return "Very good! Answer is mostly correct."from flask import Flask, request, jsonify│                        Frontend Layer                        │---5. **Performance Analytics** - Comprehensive insights into learning progress

```

        elif similarity >= 0.75:

**Rate Limits** (Free Tier):

- 60 requests per minute            return "Good! Captures the main idea."from flask_cors import CORS

- 1,500 requests per day

        elif similarity >= 0.60:

**Cost** (Paid Tier):

- Input: $0.0001 per 1000 characters            return "Partial credit. Review the concept."from flask_socketio import SocketIO, emit│  React 18 + TypeScript + Tailwind CSS (Port 8080)          │

- Output: $0.0002 per 1000 characters

        else:

### Sentence-Transformers

            return "Incorrect. Please study this topic more."from models import db, User, QuizSession, Question, Badge

**Model**: `all-MiniLM-L6-v2`

```

**Purpose**: Semantic similarity for answer evaluation

import google.generativeai as genai│  - Pages (13): Login, Dashboard, Quiz, Analytics, etc.     │

**Specifications**:

- Embedding dimension: 384**Similarity Scoring**:

- Max sequence length: 256 tokens

- Inference time: ~10ms per sentence- **1.0**: Exact match

- Model size: ~90 MB

- **0.95-0.99**: Excellent (near-perfect understanding)

**Performance**:

- Accuracy on STS benchmark: 82.41%- **0.85-0.94**: Very good# Initialize Flask app│  - Components (8): BadgeProgress, PerformanceChart, etc.    │

- Suitable for short texts (single sentences)

- Cosine similarity metric- **0.75-0.84**: Good ✅ (Threshold - Accepted as correct)



**Usage Pattern**:- **0.60-0.74**: Partial (Shows some understanding)app = Flask(__name__)

```python

from sentence_transformers import SentenceTransformer- **<0.60**: Incorrect ❌

from sklearn.metrics.pairwise import cosine_similarity

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')│  - API Client (Axios): HTTP requests + JWT auth            │## 2. Architecture Design---

model = SentenceTransformer('all-MiniLM-L6-v2')

---

# Encode texts

embeddings = model.encode([app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///instance/smart_quizzer.db')

    "Python is a programming language",

    "Python is used for coding"## Frontend Implementation

])

└─────────────────────────┬───────────────────────────────────┘

# Calculate similarity

similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]### Application Architecture

# Returns: 0.87 (high similarity)

```# Enable CORS



---**Technology Stack**:



## 8. Security & Authentication- React 18.2.0 (Function components + Hooks)CORS(app, supports_credentials=True, resources={                          │ HTTP/HTTPS (REST API)



### JWT Authentication- TypeScript 4.9.5 (Strict mode enabled)



**Token Structure**:- Tailwind CSS 3.3.0 (Utility-first styling)    r"/api/*": {"origins": ["http://localhost:8080"]}

```json

{- React Router 6.4.0 (Client-side routing)

  "header": {

    "alg": "HS256",- Axios (HTTP client with interceptors)})                          │ WebSocket (Multiplayer)

    "typ": "JWT"

  },- Socket.IO Client (WebSocket communication)

  "payload": {

    "identity": 1,  // user_id

    "exp": 1730803200,  // expiration timestamp

    "iat": 1730716800   // issued at timestamp### Project Structure

  },

  "signature": "..."# Initialize SocketIO for real-time features┌─────────────────────────┴───────────────────────────────────┐### 2.1 High-Level Architecture## 3. Project Outcomes

}

``````



**Token Lifetime**: 24 hourssrc/socketio = SocketIO(app, cors_allowed_origins="*")



**Storage**: Browser localStorage (frontend)├── pages/              # 13 Page Components



### Password Security│   ├── Login.tsx│                        Backend Layer                         │



**Hashing Algorithm**: BCrypt│   ├── Register.tsx



**Configuration**:│   ├── Dashboard.tsx# Initialize database

- Salt rounds: 12 (auto-generated)

- Cost factor automatically adjusted│   ├── Quiz.tsx



**Password Requirements**:│   ├── Results.tsxdb.init_app(app)│  Flask 3.0 + SQLAlchemy (Port 5000)                         │

- Minimum 8 characters

- At least one uppercase letter│   ├── History.tsx

- At least one lowercase letter

- At least one digit│   ├── Analytics.tsx

- At least one special character

│   ├── AnalyticsDashboard.tsx

### CORS Configuration

│   ├── ProfilePage.tsx# Create tables and initialize data│  - 90+ API Endpoints (REST)                                 │

```python

CORS(app, resources={│   ├── ContentUploadPage.tsx

    r"/api/*": {

        "origins": ["http://localhost:8080"],  # Frontend URL│   ├── Leaderboard.tsxwith app.app_context():

        "methods": ["GET", "POST", "PUT", "DELETE"],

        "allow_headers": ["Content-Type", "Authorization"],│   └── AdminDashboard.tsx

        "supports_credentials": True

    }│    db.create_all()│  - JWT Authentication                                       │```### ✅ Implemented Features

})

```├── components/         # 8 Reusable Components



### Input Validation│   ├── BadgeShowcase.tsx    initialize_default_data()



- File upload size limit: 16 MB│   ├── BadgeProgress.tsx

- SQL injection prevention via SQLAlchemy ORM

- XSS protection via input sanitization│   ├── ContentUpload.tsx```│  - CORS Enabled                                             │

- CSRF protection via JWT tokens

│   ├── Header.tsx

---

│   ├── PerformanceChart.tsx

## 9. Real-Time Features

│   ├── RecommendationCard.tsx

### WebSocket Implementation

│   ├── TopicHeatmap.tsx**Startup Sequence**:│  - SocketIO (Real-time)                                     │┌───────────────────────────────────────────────────────────┐

**Technology**: Flask-SocketIO + Socket.IO Client

│   └── WeeklyReport.tsx

**Events**:

│1. Load environment variables from `.env`

**Client → Server**:

- `create_room` - Create multiplayer room├── lib/               # Utilities & Services

- `join_room` - Join existing room

- `submit_answer` - Submit answer in real-time│   ├── api.ts         # Axios HTTP client2. Configure Flask app with secret keys└─────────────────────────┬───────────────────────────────────┘

- `leave_room` - Leave room

│   └── userManager.ts # Session management

**Server → Client**:

- `user_joined` - New participant notification│3. Enable CORS for frontend communication

- `quiz_started` - Quiz beginning signal

- `answer_submitted` - Answer broadcast├── App.tsx            # Main app with routing

- `leaderboard_update` - Live ranking changes

- `quiz_ended` - Quiz completion├── index.tsx          # React entry point4. Initialize SocketIO for WebSocket support                          ││                     Client Layer                           │#### Core Functionality



**Connection**:└── index.css          # Tailwind CSS

```typescript

import io from 'socket.io-client';```5. Connect to database (SQLite/PostgreSQL)



const socket = io('http://localhost:5000', {

  auth: {

    token: localStorage.getItem('access_token')### API Client (lib/api.ts)6. Create database tables if not exist        ┌─────────────────┼─────────────────┬─────────────────┐

  }

});



socket.on('connect', () => {**Axios Configuration with Interceptors**:7. Insert default topics and badges

  console.log('Connected to server');

});

```

```typescript8. Start server on port 5000        │                 │                 │                 ││  ┌─────────────────────────────────────────────────────┐  │- ✅ **Content Upload & Processing**

---

import axios, { AxiosInstance } from 'axios';

## 10. Testing



### Manual Testing Checklist

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

**Backend**:

- [ ] All API endpoints return correct status codes**API Endpoint Categories**:┌───────┴────────┐ ┌──────┴──────┐ ┌────────┴────────┐ ┌─────┴──────┐

- [ ] JWT authentication works properly

- [ ] Database operations complete successfully// Create axios instance

- [ ] File uploads process correctly

- [ ] AI question generation functionsconst api: AxiosInstance = axios.create({- Authentication (5 endpoints)

- [ ] Answer evaluation accuracy

  baseURL: API_BASE_URL,

**Frontend**:

- [ ] All pages render without errors  headers: {- Quiz Management (15 endpoints)│  Database      │ │  AI Services│ │  NLP Services   │ │  External  ││  │          React Frontend (TypeScript)                │  │  - Upload text files, PDFs, or paste custom content

- [ ] Routing navigation works

- [ ] Forms submit correctly    'Content-Type': 'application/json',

- [ ] API calls receive responses

- [ ] WebSocket connection establishes  },- Content Processing (8 endpoints)

- [ ] Charts and visualizations display

  timeout: 15000,

### Test User Accounts

});- Analytics (10 endpoints)│  Layer         │ │             │ │                 │ │  Services  │

Create test accounts with different roles:

```bash

# Regular user

python create_test_user.py --username testuser --role user// Request interceptor: Add JWT token- Badges & Achievements (6 endpoints)



# Admin userapi.interceptors.request.use(

python create_test_user.py --username admin --role admin

```  (config) => {- Leaderboard (5 endpoints)│                │ │  Google     │ │  Sentence-      │ │            ││  │  - 13 Pages  - 8 Components  - Tailwind CSS        │  │  - Automatic content parsing and segmentation



---    const token = localStorage.getItem('access_token');



## 11. Deployment    if (token && config.headers) {- Admin Operations (12 endpoints)



### Production Checklist      config.headers.Authorization = `Bearer ${token}`;



- [ ] Set `FLASK_ENV=production` in `.env`    }- Multiplayer (10 endpoints)│  SQLite/       │ │  Gemini     │ │  Transformers   │ │  PDF/DOCX  │

- [ ] Use PostgreSQL instead of SQLite

- [ ] Generate strong SECRET_KEY and JWT_SECRET_KEY    return config;

- [ ] Configure proper CORS_ORIGINS

- [ ] Use Gunicorn instead of Flask dev server  },- User Profile (8 endpoints)

- [ ] Set up HTTPS/SSL

- [ ] Configure firewall rules  (error) => Promise.reject(error)

- [ ] Set up monitoring and logging

- [ ] Create database backups);- Learning Paths (10 endpoints)│  PostgreSQL    │ │  1.5 Flash  │ │  (MiniLM-L6-v2) │ │  Parsing   ││  └─────────────────────────────────────────────────────┘  │  - NLP-based knowledge chunk extraction

- [ ] Test disaster recovery



### Gunicorn Configuration

// Response interceptor: Handle 401 errors

```bash

gunicorn -w 4 \api.interceptors.response.use(

         -b 0.0.0.0:5000 \

         --worker-class eventlet \  (response) => response,**Total: 90+ API endpoints**│                │ │             │ │                 │ │  URL Fetch │

         --access-logfile logs/access.log \

         --error-logfile logs/error.log \  (error) => {

         app:app

```    if (error.response?.status === 401) {



### Nginx Configuration      localStorage.removeItem('access_token');



```nginx      localStorage.removeItem('user');### 3.2 Database Models (models.py)│  15 Tables     │ │  Question   │ │  Answer         │ │            │└───────────────────────────┬───────────────────────────────┘

server {

    listen 80;      window.location.href = '/login';

    server_name yourdomain.com;

        }

    location /api/ {

        proxy_pass http://127.0.0.1:5000;    return Promise.reject(error);

        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;  }**15 Interconnected Models**:│                │ │  Generation │ │  Evaluation     │ │            │

    }

    );

    location /socket.io/ {

        proxy_pass http://127.0.0.1:5000;

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;// API methods

        proxy_set_header Connection "upgrade";

    }export const quizAPI = {#### User Model└────────────────┘ └─────────────┘ └─────────────────┘ └────────────┘                            │ HTTP/HTTPS + WebSocket- ✅ **Dynamic Question Generation**

    

    location / {  startQuiz: (topicId: number, difficulty: string, count: number) =>

        root /var/www/frontend/build;

        try_files $uri /index.html;    api.post('/api/quiz/start', { topic_id: topicId, difficulty, num_questions: count }),

    }

}  

```

  submitAnswer: (sessionId: number, questionId: number, answer: string) =>```python```

---

    api.post(`/api/quiz/${sessionId}/answer`, { question_id: questionId, answer }),

## 12. Development Guidelines

  class User(db.Model):

### Code Style

  completeQuiz: (sessionId: number) =>

**Python (PEP 8)**:

- Line length: 100 characters    api.post(`/api/quiz/${sessionId}/complete`),    __tablename__ = 'user'                            ▼  - Multiple Choice Questions (MCQ)

- Indentation: 4 spaces

- Function names: `snake_case`};

- Class names: `PascalCase`

- Constants: `UPPER_SNAKE_CASE`    



**TypeScript/React**:export default api;

- ESLint configuration enabled

- Prettier for formatting```    # Primary Key### 2.2 Request Flow

- Function components preferred

- Hooks for state management



### Commit Message Format### Key Page Components    id = db.Column(db.Integer, primary_key=True)



```

<type>(<scope>): <subject>

**Quiz Component** (pages/Quiz.tsx):    ┌───────────────────────────────────────────────────────────┐  - True/False questions

<body>



<footer>

``````typescript    # User Credentials



**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`const Quiz: React.FC = () => {



**Example**:  const { sessionId } = useParams<{ sessionId: string }>();    username = db.Column(db.String(80), unique=True, nullable=False)**Quiz Generation Flow**:

```

feat(quiz): Add adaptive difficulty adjustment  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);



Implemented real-time difficulty scaling based on user performance.  const [userAnswer, setUserAnswer] = useState('');    email = db.Column(db.String(120), unique=True, nullable=False)

Questions now adjust from Easy to Hard based on last 5 answers.

  const [feedback, setFeedback] = useState<any>(null);

Closes #42

```      password_hash = db.Column(db.String(256), nullable=False)1. User uploads content (PDF/URL) → Frontend sends to `/api/content/upload`│                   Application Layer                        │  - Fill-in-the-blank questions



### Branching Strategy  const handleSubmitAnswer = async () => {



- `main` - Production-ready code    const response = await quizAPI.submitAnswer(    

- `develop` - Development branch

- `feature/*` - New features      Number(sessionId),

- `fix/*` - Bug fixes

- `hotfix/*` - Critical production fixes      currentQuestion!.id,    # User Profile2. Backend extracts text → `content_processor.py`



### Pull Request Process      userAnswer



1. Create feature branch from `develop`    );    full_name = db.Column(db.String(200))

2. Make changes with clear commits

3. Test locally    

4. Open PR with description

5. Request code review    setFeedback(response.data.feedback);    skill_level = db.Column(db.String(20), default='Beginner')  # Beginner/Intermediate/Advanced3. Text sent to Google Gemini AI → `question_gen.py`│  ┌─────────────────────────────────────────────────────┐  │  - Short answer questions

6. Address feedback

7. Merge after approval    



---    // Auto-advance after 3 seconds    role = db.Column(db.String(20), default='user')  # user/admin



**Document Version**: 1.0      setTimeout(() => fetchNextQuestion(), 3000);

**Last Updated**: November 4, 2025  

**Maintainer**: Mamatha Bachu    };    total_points = db.Column(db.Integer, default=0)4. AI generates questions → Stored in database

**Repository**: [github.com/BatchuMamatha/Smart-Quizzer-AI](https://github.com/BatchuMamatha/Smart-Quizzer-AI)

  

  return (    

    <div className="quiz-container">

      {/* Question display */}    # Timestamps5. Frontend receives question IDs → Fetches questions one by one│  │         Flask Application (app.py)                  │  │  - Batch generation for 4-5x faster performance

      {/* Answer input (MCQ/ShortAnswer) */}

      {/* Submit button */}    created_at = db.Column(db.DateTime, default=datetime.utcnow)

      {/* Feedback display */}

    </div>    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  );

};    

```

    # Relationships**Answer Evaluation Flow**:│  │  - 90+ REST API Endpoints                           │  │

---

    quiz_sessions = db.relationship('QuizSession', backref='user', lazy=True, cascade='all, delete-orphan')

## Database Schema

    badges = db.relationship('UserBadge', backref='user', lazy=True, cascade='all, delete-orphan')1. User submits answer → `/api/quiz/{id}/answer`

### Entity Relationship Diagram

    performance_trends = db.relationship('PerformanceTrend', backref='user', lazy=True)

```

User (1) ──────< (M) QuizSession    learning_paths = db.relationship('LearningPath', backref='user', lazy=True)2. Backend retrieves correct answer from database│  │  - 10 WebSocket Event Handlers                      │  │- ✅ **Adaptive Learning System**

  │                      │

  │                      └──< (M) PerformanceTrend    

  │

  ├──────< (M) UserBadge >────── (1) Badge    # Methods3. Semantic similarity calculated → `answer_evaluator_simple.py`

  │

  └──────< (M) LearningPath >────< (M) LearningMilestone    def set_password(self, password):



Topic (1) ──────< (M) Question        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')4. Score computed (0-1) → Compared to threshold (0.7)│  │  - JWT Authentication Middleware                    │  │  - Performance tracking across sessions

  │

  └──────< (M) QuizSession    



MultiplayerRoom (1) ──────< (M) MultiplayerParticipant >────── (1) User    def check_password(self, password):5. Feedback generated → Returned to frontend



Question (1) ──────< (M) FlaggedQuestion        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

  │

  └──────< (M) QuestionFeedback    6. User performance updated → Analytics database│  │  - Error Handling & Logging                         │  │  - Real-time difficulty adjustment

```

    def to_dict(self):

### Table Definitions

        return {

#### user Table

            'id': self.id,

```sql

CREATE TABLE user (            'username': self.username,**Adaptive Difficulty Flow**:│  └─────────────────────────────────────────────────────┘  │  - Personalized question recommendations

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    username VARCHAR(80) UNIQUE NOT NULL,            'email': self.email,

    email VARCHAR(120) UNIQUE NOT NULL,

    password_hash VARCHAR(256) NOT NULL,            'full_name': self.full_name,1. User's recent performance calculated → Last 5 questions

    full_name VARCHAR(200),

    skill_level VARCHAR(20) DEFAULT 'Beginner',            'skill_level': self.skill_level,

    role VARCHAR(20) DEFAULT 'user',

    total_points INTEGER DEFAULT 0,            'role': self.role,2. Accuracy percentage computed└───────────────────────────┬───────────────────────────────┘  - Consecutive correct/incorrect tracking

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP            'total_points': self.total_points,

);

            'created_at': self.created_at.isoformat() if self.created_at else None3. Difficulty adjusted:

CREATE INDEX idx_user_email ON user(email);

CREATE INDEX idx_user_username ON user(username);        }

```

```   - 80%+ accuracy → Increase difficulty                            │  - Response time analysis

#### quiz_session Table



```sql

CREATE TABLE quiz_session (#### QuizSession Model   - 50%-80% → Maintain difficulty

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    topic_id INTEGER,

    difficulty VARCHAR(20) DEFAULT 'Medium',```python   - <50% → Decrease difficulty            ┌───────────────┴──────────────┐

    total_questions INTEGER DEFAULT 10,

    current_question_index INTEGER DEFAULT 0,class QuizSession(db.Model):

    score INTEGER DEFAULT 0,

    accuracy FLOAT DEFAULT 0.0,    __tablename__ = 'quiz_session'4. Next question selected with new difficulty

    time_spent INTEGER DEFAULT 0,

    completed BOOLEAN DEFAULT 0,    

    completed_at DATETIME,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,    id = db.Column(db.Integer, primary_key=True)            ▼                              ▼- ✅ **User Management**

    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,

    FOREIGN KEY (topic_id) REFERENCES topic(id) ON DELETE SET NULL    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

);

    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'))### 2.3 Database Architecture

CREATE INDEX idx_quiz_session_user ON quiz_session(user_id);

CREATE INDEX idx_quiz_session_created ON quiz_session(created_at);    

```

    # Quiz Configuration┌───────────────────────┐      ┌──────────────────────────┐  - Secure registration and login (JWT-based)

---

    difficulty = db.Column(db.String(20), default='Medium')  # Easy/Medium/Hard

## API Reference

    total_questions = db.Column(db.Integer, default=10)```

### Base URL

    current_question_index = db.Column(db.Integer, default=0)

```

Development: http://localhost:5000    ┌─────────────┐       ┌──────────────┐       ┌─────────────┐│   Business Logic      │      │   External Services      │  - User profiles with skill levels

Production: https://your-domain.com

```    # Results



### Authentication Endpoints    score = db.Column(db.Integer, default=0)│    User     │       │  QuizSession │       │  Question   │



#### POST /api/auth/register    accuracy = db.Column(db.Float, default=0.0)



Register new user account.    time_spent = db.Column(db.Integer, default=0)  # seconds│─────────────│       │──────────────│       │─────────────││   ┌───────────────┐   │      │  ┌───────────────────┐  │  - Performance history tracking



**Request Body**:    

```json

{    # Status│ id (PK)     │◄──────│ id (PK)      │       │ id (PK)     │

  "username": "john_doe",

  "email": "john@example.com",    completed = db.Column(db.Boolean, default=False)

  "password": "SecurePass123!",

  "full_name": "John Doe",    completed_at = db.Column(db.DateTime)│ username    │ 1   * │ user_id (FK) │       │ topic_id    ││   │Question Gen   │   │      │  │ Google Gemini AI  │  │  - Role-based access control (User/Admin)

  "skill_level": "Intermediate"

}    created_at = db.Column(db.DateTime, default=datetime.utcnow)

```

    │ email       │       │ topic_id (FK)│──────►│ text        │

**Response (201 Created)**:

```json    # Relationships

{

  "message": "User registered successfully",    answers = db.relationship('QuestionAnswer', backref='session', lazy=True)│ password    │       │ score        │ *   1 │ options     ││   │Answer Eval    │   │      │  │ (Question Gen)    │  │

  "user": {

    "id": 1,    trends = db.relationship('PerformanceTrend', backref='session', lazy=True)

    "username": "john_doe",

    "email": "john@example.com",```│ skill_level │       │ completed_at │       │ answer      │

    "skill_level": "Intermediate"

  }

}

```#### Question Model│ is_admin    │       │ difficulty   │       │ difficulty  ││   │Badge System   │   │      │  └───────────────────┘  │- ✅ **Admin Dashboard**



#### POST /api/auth/login



User login with JWT token generation.```python└─────────────┘       └──────────────┘       └─────────────┘



**Request Body**:class Question(db.Model):

```json

{    __tablename__ = 'question'      │                      ││   │Analytics Eng  │   │      │  ┌───────────────────┐  │  - User management interface

  "username": "john_doe",

  "password": "SecurePass123!"    

}

```    id = db.Column(db.Integer, primary_key=True)      │                      │



**Response (200 OK)**:    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'))

```json

{          │ 1                  * ││   │Learning Paths │   │      │  │ Sentence-BERT     │  │  - Content moderation tools

  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

  "user": {    # Question Content

    "id": 1,

    "username": "john_doe",    text = db.Column(db.Text, nullable=False)      ▼                      ▼

    "email": "john@example.com",

    "role": "user",    options = db.Column(db.JSON)  # For MCQ: ["Option A", "Option B", "Option C", "Option D"]

    "total_points": 1250

  }    correct_answer = db.Column(db.Text, nullable=False)┌─────────────┐       ┌──────────────┐│   │Multiplayer    │   │      │  │ (Semantic Match)  │  │  - Flagged question review system

}

```    explanation = db.Column(db.Text)



### Quiz Management Endpoints    │  UserBadge  │       │PerformTrend  │



#### POST /api/quiz/start    # Classification



Start new quiz session.    difficulty = db.Column(db.String(20))  # Easy/Medium/Hard│─────────────│       │──────────────││   │Leaderboard    │   │      │  └───────────────────┘  │  - Feedback collection and analysis



**Request Body**:    bloom_level = db.Column(db.String(50))  # Remember/Understand/Apply/Analyze/Evaluate/Create

```json

{    question_type = db.Column(db.String(50))  # MCQ/TrueFalse/ShortAnswer│ id (PK)     │       │ id (PK)      │

  "topic_id": 1,

  "difficulty": "Medium",    

  "num_questions": 10

}    # Quality Metrics│ user_id (FK)│       │ session_id   ││   └───────────────┘   │      └──────────────────────────┘  - Platform statistics and analytics

```

    times_used = db.Column(db.Integer, default=0)

**Response (201 Created)**:

```json    correct_rate = db.Column(db.Float, default=0.0)│ badge_id    │       │ accuracy     │

{

  "session_id": 42,    

  "topic": "Python Programming",

  "difficulty": "Medium",    # Timestamps│ earned_at   │       │ avg_time     │└───────────┬───────────┘

  "total_questions": 10,

  "first_question": {    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    "id": 105,

    "text": "What is a list comprehension in Python?",```└─────────────┘       │ topic_id     │

    "options": ["A", "B", "C", "D"],

    "question_type": "MCQ",

    "difficulty": "Medium"

  }#### Badge Model                      └──────────────┘            │- ✅ **Web Interface**

}

```



#### POST /api/quiz/{session_id}/answer```python```



Submit answer for current question.class Badge(db.Model):



**Request Body**:    __tablename__ = 'badge'            ▼  - Responsive React-based UI

```json

{    

  "question_id": 105,

  "answer": "A way to create lists concisely"    id = db.Column(db.Integer, primary_key=True)---

}

```    name = db.Column(db.String(100), unique=True, nullable=False)



**Response (200 OK)**:    description = db.Column(db.Text)┌───────────────────────────────────────────────────────────┐  - Real-time quiz interface with instant feedback

```json

{    icon = db.Column(db.String(50))  # trophy, star, medal, fire, crown

  "is_correct": true,

  "similarity": 0.87,    ## 3. Backend Documentation

  "confidence": 87.3,

  "feedback": "Very good! Your answer demonstrates understanding.",    # Achievement Criteria

  "explanation": "List comprehensions provide a concise way to create lists.",

  "points_earned": 10,    criteria_type = db.Column(db.String(50))  # quiz_count, accuracy, streak, perfect_score│                    Data Access Layer                       │  - Progress tracking and visualization

  "badges_unlocked": ["Quick Learner"],

  "next_question": {    criteria_value = db.Column(db.Integer)

    "id": 106,

    "text": "Next question...",    ### 3.1 Main Application (app.py)

    "question_type": "ShortAnswer"

  }    # Rewards

}

```    points = db.Column(db.Integer, default=100)│  ┌─────────────────────────────────────────────────────┐  │  - Detailed results and explanations



---    rarity = db.Column(db.String(20))  # Common, Rare, Epic, Legendary



## AI/ML Components```**Key Components**:



### Google Gemini AI Integration



**Model**: gemini-1.5-flash**Other Models**:│  │         SQLAlchemy ORM (models.py)                  │  │  - Analytics dashboard with charts



**Configuration**:- `Topic`: Quiz topics (Python, JavaScript, Data Structures, etc.)

```python

generation_config = {- `UserBadge`: Junction table for user achievements```python

    'temperature': 0.7,      # Creativity (0.0-1.0)

    'top_p': 0.95,          # Nucleus sampling- `PerformanceTrend`: Daily/weekly performance metrics

    'top_k': 40,            # Top-k sampling

    'max_output_tokens': 2048,- `LearningPath`: Personalized learning routes# Flask app initialization│  │  - 15 Models with Relationships                     │  │

}

```- `LearningMilestone`: Progress checkpoints in learning paths



**Rate Limits** (Free Tier):- `MultiplayerRoom`: Real-time quiz roomsapp = Flask(__name__)

- 60 requests per minute

- 1,500 requests per day- `MultiplayerParticipant`: Participants in multiplayer sessions



### Sentence-Transformers (NLP)- `QuizLeaderboard`: Global and topic-specific rankingsapp.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/smart_quizzer.db'│  │  - Migration Support                                │  │- ✅ **Development Ready**



**Model**: all-MiniLM-L6-v2- `FlaggedQuestion`: User-reported problematic questions



**Specifications**:- `QuestionFeedback`: User ratings and comments on questionsapp.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

- Embedding dimension: 384

- Inference time: ~10ms per sentence- `PasswordResetToken`: Password recovery tokens

- Accuracy: 85-90% on standard benchmarks

CORS(app, supports_credentials=True)│  │  - Query Optimization                               │  │  - Automated setup scripts (Windows & Mac/Linux)

**Usage**:

```python### 3.3 AI Question Generation (question_gen.py)

model = SentenceTransformer('all-MiniLM-L6-v2')

embeddings = model.encode(["Text 1", "Text 2"])socketio = SocketIO(app, cors_allowed_origins="*")

similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]

```**Purpose**: Generates contextually relevant questions using Google Gemini AI.



---│  └─────────────────────────────────────────────────────┘  │  - Environment-based configuration



## Security Implementation**Implementation**:



### Authentication & Authorization# Database initialization



**JWT (JSON Web Tokens)**:```python

- Access token lifetime: 24 hours

- Stored in browser localStorageimport google.generativeai as genaidb.init_app(app)└───────────────────────────┬───────────────────────────────┘  - Database initialization with sample data

- Included in Authorization header

- Validated on every protected endpointimport os



**Password Security**:with app.app_context():

- BCrypt hashing with salt

- Minimum 8 charactersclass QuestionGenerator:

- Must include: uppercase, lowercase, digit, special character

    def __init__(self):    db.create_all()                            │  - Comprehensive documentation

### CORS Configuration

        genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

```python

CORS(app, resources={        self.model = genai.GenerativeModel('gemini-1.5-flash')```

    r"/api/*": {

        "origins": [os.getenv('CORS_ORIGINS', 'http://localhost:8080')],        

        "methods": ["GET", "POST", "PUT", "DELETE"],

        "allow_headers": ["Content-Type", "Authorization"],        self.generation_config = {                            ▼  - Local development optimized

        "supports_credentials": True

    }            'temperature': 0.7,

})

```            'top_p': 0.95,**Startup Process**:



### Input Validation            'top_k': 40,



- Server-side validation for all inputs            'max_output_tokens': 2048,1. Load environment variables (`.env`)┌───────────────────────────────────────────────────────────┐

- SQL injection prevention via SQLAlchemy ORM

- XSS protection via input sanitization        }

- File upload size limits (16 MB)

    2. Initialize Flask app

---

    def generate_questions(self, content, difficulty='Medium', count=5, question_type='MCQ'):

## Real-Time Features

        """3. Configure CORS and SocketIO│                    Database Layer                          │---

### WebSocket Implementation (Flask-SocketIO)

        Generate quiz questions from content.

**Multiplayer Quiz Rooms**:

        4. Initialize database connection

```python

@socketio.on('join_room')        Args:

def handle_join_room(data):

    room_id = data['room_id']            content (str): Source content (max 5000 chars)5. Create tables if not exist│  ┌─────────────────────────────────────────────────────┐  │

    user_id = data['user_id']

                difficulty (str): Easy, Medium, or Hard

    join_room(room_id)

                count (int): Number of questions to generate6. Insert default topics and badges

    emit('user_joined', {

        'user_id': user_id,            question_type (str): MCQ, TrueFalse, or ShortAnswer

        'username': get_username(user_id)

    }, room=room_id)        7. Start server on port 5000│  │         SQLite Database (smart_quizzer.db)          │  │## 4. System Architecture



@socketio.on('submit_answer')        Returns:

def handle_answer(data):

    # Process answer            list: Generated questions with answers and explanations

    # Update leaderboard

    # Broadcast to room        """

    emit('leaderboard_update', leaderboard_data, room=data['room_id'])

```        ### 3.2 Models (models.py)│  │  - Users, QuizSessions, Questions                   │  │



---        prompt = f"""Generate {count} {question_type} quiz questions from the following content.



## Testing Strategy        



### Backend Tests (pytest)        Difficulty Level: {difficulty}



```python        Question Type: {question_type}#### 3.2.1 User Model│  │  - Badges, Analytics, Leaderboard                   │  │### High-Level Architecture

def test_user_registration(client):

    response = client.post('/api/auth/register', json={        

        'username': 'testuser',

        'email': 'test@example.com',        Requirements:

        'password': 'Test@123'

    })        1. Questions must be directly related to the content

    assert response.status_code == 201

    assert b'User registered successfully' in response.data        2. Include detailed explanations for each answer```python│  │  - Learning Paths, Multiplayer Data                 │  │

```

        3. Classify each question using Bloom's Taxonomy

### Frontend Tests (Jest + React Testing Library)

        4. For MCQ, provide 4 options with one correct answerclass User(db.Model):

```typescript

test('renders login page', () => {        5. Ensure questions are clear and unambiguous

  render(<Login />);

  expect(screen.getByText(/login/i)).toBeInTheDocument();            id = db.Column(db.Integer, primary_key=True)│  └─────────────────────────────────────────────────────┘  │```

});

```        Content:



---        {content[:5000]}    username = db.Column(db.String(80), unique=True, nullable=False)



## Deployment Architecture        



### Production Setup        Format your response as JSON array:    email = db.Column(db.String(120), unique=True, nullable=False)└───────────────────────────────────────────────────────────┘┌─────────────────────────────────────────────────────────────────┐



**Backend**:        [

- Gunicorn WSGI server (4+ workers)

- PostgreSQL database            {{    password_hash = db.Column(db.String(256), nullable=False)

- Nginx reverse proxy

- SSL/TLS encryption                "question": "Question text here",



**Frontend**:                "options": ["A", "B", "C", "D"],  // For MCQ only    skill_level = db.Column(db.String(20))  # Beginner/Intermediate/Advanced```│                         Client Layer                             │

- Optimized production build

- CDN for static assets                "correct_answer": "Correct answer here",

- Nginx static file server

                "explanation": "Detailed explanation",    is_admin = db.Column(db.Boolean, default=False)

### Docker Deployment

                "bloom_level": "Remember|Understand|Apply|Analyze|Evaluate|Create"

```yaml

version: '3.8'            }}    total_points = db.Column(db.Integer, default=0)│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │

services:

  backend:        ]

    build: ./backend

    ports: ["5000:5000"]        """    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    environment:

      - DATABASE_URL=postgresql://user:pass@db:5432/smart_quizzer        

  

  frontend:        try:    ### 2.2 Technology Stack│  │ User Web App │  │ Admin Portal │  │ Mobile Ready │          │

    build: ./frontend

    ports: ["80:80"]            response = self.model.generate_content(

  

  db:                prompt,    # Relationships

    image: postgres:15

    volumes: [postgres_data:/var/lib/postgresql/data]                generation_config=self.generation_config

```

            )    quiz_sessions = db.relationship('QuizSession', backref='user', lazy=True)│  │   (React)    │  │   (React)    │  │   (PWA)      │          │

---

            

## Performance Optimization

            # Parse JSON response    badges = db.relationship('UserBadge', backref='user', lazy=True)

### Backend Optimizations

- Database indexing on frequently queried columns            questions = self._parse_response(response.text)

- Query optimization with SQLAlchemy

- Caching with Redis (optional)                learning_paths = db.relationship('LearningPath', backref='user', lazy=True)#### Backend Technologies│  └──────────────┘  └──────────────┘  └──────────────┘          │

- API response compression

            # Classify difficulty

### Frontend Optimizations

- Code splitting with React.lazy()            questions = self._classify_difficulty(questions)```

- Component memoization with React.memo()

- Image optimization            

- Bundle size reduction

            return questions| Component | Technology | Version | Purpose |└─────────────────────────────────────────────────────────────────┘

---

            

## Development Guidelines

        except Exception as e:**Methods**:

### Code Standards

            print(f"Error generating questions: {str(e)}")

**Python (PEP 8)**:

- Line length: 100 characters            return []- `set_password(password)`: Hash password with SHA-256|-----------|-----------|---------|---------|                              │

- Type hints encouraged

- Docstrings for all functions    



**TypeScript**:    def _classify_difficulty(self, questions):- `check_password(password)`: Verify password

- ESLint configuration

- Strict mode enabled        """Classify question difficulty using multi-factor analysis"""

- Functional components preferred

        for q in questions:- `to_dict()`: Serialize to JSON| Framework | Flask | 3.0.0 | Web application framework |                              ▼

### Commit Message Format

            # Factor 1: Bloom's Taxonomy (40%)

```

<type>(<scope>): <subject>            bloom_score = self._bloom_to_score(q.get('bloom_level', 'Remember'))



<body>            



<footer>            # Factor 2: Semantic complexity (30%)#### 3.2.2 QuizSession Model| ORM | SQLAlchemy | 2.0.43 | Database abstraction |┌─────────────────────────────────────────────────────────────────┐

```

            semantic_score = self._calculate_semantic_complexity(q['question'])

**Example**:

```            

feat(analytics): add weekly performance reports

            # Factor 3: Text metrics (20%)

Implemented automated weekly summary emails with:

- Quiz completion statistics            text_score = self._calculate_text_complexity(q['question'])```python| Database | SQLite | 3.x | Data storage |│                      API Gateway / Nginx                         │

- Performance trends

- Badge achievements            



Closes #42            # Factor 4: Historical data (10%)class QuizSession(db.Model):

```

            historical_score = q.get('correct_rate', 0.5)

---

                id = db.Column(db.Integer, primary_key=True)| Authentication | Flask-JWT-Extended | 4.6.0 | JWT token management |│                    (Load Balancer & Routing)                     │

**Documentation Version**: 1.0.0  

**Last Updated**: November 2025              # Weighted combination

**Maintainer**: Mamatha Bachu  

**Repository**: [github.com/BatchuMamatha/Smart-Quizzer-AI](https://github.com/BatchuMamatha/Smart-Quizzer-AI)            final_score = (    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


                bloom_score * 0.40 +

                semantic_score * 0.30 +    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'))| WebSocket | Flask-SocketIO | 5.3.6 | Real-time communication |└─────────────────────────────────────────────────────────────────┘

                text_score * 0.20 +

                historical_score * 0.10    score = db.Column(db.Integer, default=0)

            )

                total_questions = db.Column(db.Integer, default=10)| Password Hash | Bcrypt | 4.1.2 | Secure password storage |                              │

            # Map to difficulty level

            if final_score < 0.33:    current_question_index = db.Column(db.Integer, default=0)

                q['difficulty'] = 'Easy'

            elif final_score < 0.67:    difficulty = db.Column(db.String(20), default='Medium')| AI Engine | Google Gemini | 1.5 Flash | Question generation |                              ▼

                q['difficulty'] = 'Medium'

            else:    completed = db.Column(db.Boolean, default=False)

                q['difficulty'] = 'Hard'

            completed_at = db.Column(db.DateTime)| NLP | Sentence-Transformers | 2.7.0+ | Semantic analysis |┌─────────────────────────────────────────────────────────────────┐

        return questions

```    created_at = db.Column(db.DateTime, default=datetime.utcnow)



**Performance Optimizations**:    | NLP | NLTK | 3.8.0+ | Text processing |│                    Application Layer (Flask)                     │

- Batch generation (5 questions per API call)

- Caching frequently requested topics    # Relationships

- Retry logic with exponential backoff

- Rate limiting (60 requests/minute for free tier)    answers = db.relationship('QuestionAnswer', backref='session', lazy=True)| PDF Processing | pdfplumber | 0.11.0+ | PDF text extraction |│  ┌──────────────────────────────────────────────────────────┐  │

- Reduced timeout (15 seconds)

- Optimized prompt engineering    trends = db.relationship('PerformanceTrend', backref='session', lazy=True)



**Speed Improvements**: 4-5x faster (75s → 15s for 5 questions)```| Document Parsing | python-docx | 1.1.0+ | DOCX processing |│  │              RESTful API Endpoints                        │  │



### 3.4 Answer Evaluation (answer_evaluator_simple.py)



**Purpose**: Evaluates user answers using semantic similarity (NLP).#### 3.2.3 Question Model| Web Scraping | BeautifulSoup4 | 4.12.0+ | HTML parsing |│  │  • Authentication    • Quiz Management                    │  │



**Implementation**:



```python```python│  │  • User Profiles     • Content Upload                     │  │

from sentence_transformers import SentenceTransformer

from sklearn.metrics.pairwise import cosine_similarityclass Question(db.Model):

import numpy as np

    id = db.Column(db.Integer, primary_key=True)#### Frontend Technologies│  │  • Admin Operations  • Analytics                          │  │

class AnswerEvaluator:

    def __init__(self):    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'))

        # Load pre-trained sentence transformer model

        self.model = SentenceTransformer('all-MiniLM-L6-v2')    text = db.Column(db.Text, nullable=False)| Component | Technology | Version | Purpose |│  └──────────────────────────────────────────────────────────┘  │

        self.similarity_threshold = 0.75  # 75% similarity required

        options = db.Column(db.JSON)  # Multiple choice options

    def evaluate_answer(self, user_answer, correct_answer, question_type):

        """    correct_answer = db.Column(db.Text, nullable=False)|-----------|-----------|---------|---------|└─────────────────────────────────────────────────────────────────┘

        Evaluate user answer against correct answer.

            explanation = db.Column(db.Text)

        Args:

            user_answer (str): User's submitted answer    difficulty = db.Column(db.String(20))  # Easy/Medium/Hard| Framework | React | 18.2.0 | UI framework |                              │

            correct_answer (str): Correct answer from database

            question_type (str): MCQ, TrueFalse, or ShortAnswer    bloom_level = db.Column(db.String(50))  # Remember/Understand/Apply/Analyze

        

        Returns:    question_type = db.Column(db.String(50))  # MCQ/TrueFalse/ShortAnswer| Language | TypeScript | 4.9.5 | Type safety |            ┌─────────────────┼─────────────────┐

            dict: {

                'is_correct': bool,    created_at = db.Column(db.DateTime, default=datetime.utcnow)

                'similarity': float (0-1),

                'confidence': float (0-100),```| Styling | Tailwind CSS | 3.x | Utility-first CSS |            ▼                 ▼                 ▼

                'feedback': str

            }

        """

        #### 3.2.4 Badge Model| Routing | React Router | 6.x | Client-side routing |┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐

        # Normalize inputs

        user_answer = user_answer.strip().lower()

        correct_answer = correct_answer.strip().lower()

        ```python| HTTP Client | Axios | 1.x | API communication |│  Business Logic │ │  AI/ML Layer    │ │  Data Layer     │

        # Exact match for structured questions

        if question_type in ['MCQ', 'TrueFalse']:class Badge(db.Model):

            is_correct = (user_answer == correct_answer)

            return {    id = db.Column(db.Integer, primary_key=True)| Build Tool | Webpack | 5.x | Module bundler |│                 │ │                 │ │                 │

                'is_correct': is_correct,

                'similarity': 1.0 if is_correct else 0.0,    name = db.Column(db.String(100), unique=True, nullable=False)

                'confidence': 100 if is_correct else 0,

                'feedback': 'Correct!' if is_correct else 'Incorrect.'    description = db.Column(db.Text)│ • Auth Service  │ │ • Gemini AI     │ │ • SQLite/       │

            }

            icon = db.Column(db.String(50))  # trophy, star, medal, etc.

        # Semantic similarity for open-ended questions

        elif question_type == 'ShortAnswer':    criteria_type = db.Column(db.String(50))  # quiz_count, accuracy, streak### 2.3 Design Patterns│ • Quiz Engine   │ │ • Question Gen  │ │   PostgreSQL    │

            # Check for exact match first

            if user_answer == correct_answer:    criteria_value = db.Column(db.Integer)

                return {

                    'is_correct': True,    points = db.Column(db.Integer, default=100)│ • Adaptive      │ │ • Difficulty    │ │ • User Data     │

                    'similarity': 1.0,

                    'confidence': 100,    rarity = db.Column(db.String(20))  # Common/Rare/Epic/Legendary

                    'feedback': 'Perfect match!'

                }```#### Backend Patterns│   Learning      │ │   Classifier    │ │ • Quiz Sessions │

            

            # Calculate semantic similarity

            user_embedding = self.model.encode([user_answer])[0]

            correct_embedding = self.model.encode([correct_answer])[0]**21 Default Badges**:1. **MVC Pattern**: Models (models.py), Views (routes in app.py), Controllers (service layer)│ • Answer Eval   │ │ • Answer        │ │ • Questions     │

            

            similarity = cosine_similarity([user_embedding], [correct_embedding])[0][0]- First Steps (1 quiz)

            is_correct = (similarity >= self.similarity_threshold)

            confidence = similarity * 100- Quiz Enthusiast (10 quizzes)2. **Service Layer Pattern**: Separate business logic (badge_service, analytics_service, etc.)│ • Analytics     │ │   Evaluator     │ │ • Analytics     │

            

            # Generate contextual feedback- Perfect Score (100% accuracy)

            feedback = self._generate_feedback(similarity, is_correct)

            - Streak Master (7-day streak)3. **Repository Pattern**: SQLAlchemy ORM abstracts database access└─────────────────┘ └─────────────────┘ └─────────────────┘

            return {

                'is_correct': is_correct,- Quiz Legend (100 quizzes)

                'similarity': float(similarity),

                'confidence': float(confidence),- And 16 more...4. **Factory Pattern**: Database and Flask-SocketIO initialization```

                'feedback': feedback

            }

    

    def _generate_feedback(self, similarity, is_correct):#### 3.2.5 Additional Models5. **Decorator Pattern**: Route decorators, authentication decorators

        """Generate contextual feedback based on similarity score"""

        if similarity >= 0.95:

            return "Excellent! Your answer is very accurate."

        elif similarity >= 0.85:**PerformanceTrend**: Tracks user performance over time### Component Architecture

            return "Very good! Your answer is mostly correct."

        elif similarity >= 0.75:**LearningPath**: Personalized learning routes

            return "Good answer! Captures the main idea."

        elif similarity >= 0.60:**LearningMilestone**: Path progress tracking#### Frontend Patterns

            return "Partially correct. Review the concept."

        else:**MultiplayerRoom**: Real-time quiz rooms

            return "Incorrect. Please study the topic more."

```**MultiplayerParticipant**: Room participants1. **Component-Based Architecture**: Reusable React components```



**Similarity Thresholds**:**QuizLeaderboard**: Global rankings

- **1.0**: Exact match

- **0.95-0.99**: Excellent answer**FlaggedQuestion**: Question moderation2. **Container/Presentational Pattern**: Smart containers, dumb componentsBackend (Python/Flask)

- **0.85-0.94**: Very good answer

- **0.75-0.84**: Good answer ✅ (Threshold)**QuestionFeedback**: User feedback

- **0.60-0.74**: Partially correct

- **<0.60**: Incorrect ❌**Topic**: Quiz topics3. **Custom Hooks**: useEffect, useState, useCallback for state management├── app.py                          # Main Flask application



---**PasswordResetToken**: Password recovery



## 4. Frontend Implementation4. **Centralized API Client**: Single axios instance with interceptors├── models.py                       # Database models (SQLAlchemy)



### 4.1 Application StructureSee `models.py` for complete schema.



**Entry Point**: `src/index.tsx`├── auth.py                         # JWT authentication



```typescript### 3.3 AI Question Generation (question_gen.py)

import React from 'react';

import ReactDOM from 'react-dom/client';---├── question_gen.py                 # AI question generator

import App from './App';

import './index.css';```python



const root = ReactDOM.createRoot(import google.generativeai as genai├── answer_evaluator_simple.py     # Answer evaluation engine

  document.getElementById('root') as HTMLElement

);



root.render(genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))## 3. Module Documentation├── content_processor.py            # Content parsing & segmentation

  <React.StrictMode>

    <App />model = genai.GenerativeModel('gemini-1.5-flash')

  </React.StrictMode>

);├── error_handler.py                # Centralized error handling

```

def generate_questions_ai(text, num_questions=10, difficulty='Medium'):

**Main App**: `src/App.tsx`

    """### Module 1: User Input & Topic Selection└── requirements.txt                # Python dependencies

```typescript

import React from 'react';    Generate quiz questions from content using Google Gemini AI

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';    

import Register from './pages/Register';

import Dashboard from './pages/Dashboard';    Args:

import Quiz from './pages/Quiz';

import Results from './pages/Results';        text (str): Source content**Files**: `frontend/src/pages/Dashboard.tsx`, `backend/app.py` (topic endpoints)Frontend (React/TypeScript)

import History from './pages/History';

import Analytics from './pages/Analytics';        num_questions (int): Number of questions to generate

import AnalyticsDashboard from './pages/AnalyticsDashboard';

import ProfilePage from './pages/ProfilePage';        difficulty (str): Easy/Medium/Hard├── src/

import AdminDashboard from './pages/AdminDashboard';

import ContentUploadPage from './pages/ContentUploadPage';    

import Leaderboard from './pages/Leaderboard';

import ResetPassword from './pages/ResetPassword';    Returns:**Purpose**: Allows users to select quiz topics, configure quiz parameters, and start quiz sessions.│   ├── components/

import { isAuthenticated } from './lib/userManager';

        list: Question dictionaries

function App() {

  return (    """│   │   └── ContentUpload.tsx       # Content upload component

    <Router>

      <Routes>    prompt = f"""

        {/* Public Routes */}

        <Route path="/login" element={<Login />} />    Generate {num_questions} quiz questions from this content.**Key Features**:│   ├── pages/

        <Route path="/register" element={<Register />} />

        <Route path="/reset-password" element={<ResetPassword />} />    Difficulty: {difficulty}

        

        {/* Protected Routes */}    - Topic selection from 20+ predefined topics│   │   ├── Login.tsx               # Authentication pages

        <Route path="/dashboard" element={

          isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />    Format:

        } />

        <Route path="/quiz/:sessionId" element={    1. Question text- Custom quiz parameters (question count, difficulty, skill level)│   │   ├── Register.tsx

          isAuthenticated() ? <Quiz /> : <Navigate to="/login" />

        } />    2. Answer

        <Route path="/results/:sessionId" element={

          isAuthenticated() ? <Results /> : <Navigate to="/login" />    3. Explanation- Custom content upload (PDF, DOCX, TXT, URL)│   │   ├── Dashboard.tsx           # User dashboard

        } />

        <Route path="/history" element={    4. Bloom's taxonomy level

          isAuthenticated() ? <History /> : <Navigate to="/login" />

        } />    5. Question type (MCQ/TrueFalse/ShortAnswer)- Topic categories: Science, Technology, Mathematics, Arts, etc.│   │   ├── Quiz.tsx                # Quiz interface

        <Route path="/analytics" element={

          isAuthenticated() ? <Analytics /> : <Navigate to="/login" />    

        } />

        <Route path="/analytics-dashboard" element={    Content:│   │   ├── Results.tsx             # Results display

          isAuthenticated() ? <AnalyticsDashboard /> : <Navigate to="/login" />

        } />    {text[:5000]}  # Limit to 5000 chars

        <Route path="/profile" element={

          isAuthenticated() ? <ProfilePage /> : <Navigate to="/login" />    """**Implementation Details**:│   │   ├── History.tsx             # Quiz history

        } />

        <Route path="/upload" element={    

          isAuthenticated() ? <ContentUploadPage /> : <Navigate to="/login" />

        } />    response = model.generate_content(prompt)```python│   │   ├── Analytics.tsx           # Performance analytics

        <Route path="/leaderboard" element={

          isAuthenticated() ? <Leaderboard /> : <Navigate to="/login" />    questions = parse_ai_response(response.text)

        } />

        <Route path="/admin" element={    return questions# Backend: Topic Model│   │   ├── AdminDashboard.tsx      # Admin interface

          isAuthenticated() ? <AdminDashboard /> : <Navigate to="/login" />

        } />```

        

        {/* Default Route */}class Topic(db.Model):│   │   └── ProfilePage.tsx         # User profile

        <Route path="/" element={<Navigate to="/dashboard" />} />

      </Routes>**Process**:

    </Router>

  );1. Configure Gemini API with key    id = db.Column(db.Integer, primary_key=True)│   ├── lib/

}

2. Create structured prompt with difficulty

export default App;

```3. Send content (max 5000 chars) to AI    name = db.Column(db.String(100), unique=True, nullable=False)│   │   ├── api.ts                  # API client



### 4.2 API Client (lib/api.ts)4. Parse JSON response



```typescript5. Validate question structure    description = db.Column(db.Text)│   │   └── userManager.ts          # User state management

import axios, { AxiosInstance } from 'axios';

6. Store in database

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    category = db.Column(db.String(50))│   └── App.tsx                     # Main React app

// Create axios instance

const api: AxiosInstance = axios.create({**Error Handling**:

  baseURL: API_BASE_URL,

  headers: {- API key missing → Return error message    is_active = db.Column(db.Boolean, default=True)└── package.json

    'Content-Type': 'application/json',

  },- Rate limit exceeded → Retry with exponential backoff

});

- Invalid response → Log error, return empty list```

// Request interceptor: Add JWT token to all requests

api.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem('access_token');### 3.4 Answer Evaluation (answer_evaluator_simple.py)Deployment

    if (token && config.headers) {

      config.headers.Authorization = `Bearer ${token}`;

    }

    return config;```python**API Endpoints**:├── docker-compose.yml              # Multi-container orchestration

  },

  (error) => Promise.reject(error)from sentence_transformers import SentenceTransformer

);

from sklearn.metrics.pairwise import cosine_similarity- `GET /api/topics` - Fetch all active topics├── backend/Dockerfile              # Backend container

// Response interceptor: Handle 401 errors

api.interceptors.response.use(

  (response) => response,

  (error) => {model = SentenceTransformer('all-MiniLM-L6-v2')├── frontend/Dockerfile             # Frontend container

    if (error.response?.status === 401) {

      localStorage.removeItem('access_token');

      localStorage.removeItem('user');

      window.location.href = '/login';def evaluate_answer(user_answer, correct_answer, threshold=0.7):**Workflow**:└── nginx.conf                      # Reverse proxy config

    }

    return Promise.reject(error);    """

  }

);    Evaluate answer using semantic similarity1. User navigates to Dashboard```



// API methods    

export const authAPI = {

  register: (data: any) => api.post('/api/auth/register', data),    Args:2. Frontend fetches topics from backend

  login: (username: string, password: string) =>

    api.post('/api/auth/login', { username, password }),        user_answer (str): User's submitted answer

  getProfile: () => api.get('/api/auth/profile'),

  updateSkillLevel: (skillLevel: string) =>        correct_answer (str): Correct answer from database3. User selects topic or uploads custom content### Data Flow Architecture

    api.put('/api/auth/profile/skill-level', { skill_level: skillLevel }),

};        threshold (float): Similarity threshold (0.0-1.0)



export const quizAPI = {    4. User configures quiz parameters

  startQuiz: (topicId: number, difficulty: string, count: number) =>

    api.post('/api/quiz/start', { topic_id: topicId, difficulty, num_questions: count }),    Returns:

  submitAnswer: (sessionId: number, questionId: number, answer: string) =>

    api.post(`/api/quiz/${sessionId}/answer`, { question_id: questionId, answer }),        dict: {5. Frontend sends quiz start request```

  completeQuiz: (sessionId: number) =>

    api.post(`/api/quiz/${sessionId}/complete`),            'is_correct': bool,

  getResults: (sessionId: number) =>

    api.get(`/api/quiz/${sessionId}/results`),            'similarity': float,6. Backend creates quiz session and generates questionsUser Action → Frontend → API Gateway → Flask Backend

  getHistory: () =>

    api.get('/api/quiz/history'),            'feedback': str

};

        }                                           ↓

export const analyticsAPI = {

  getTrends: (days: number, topicId?: number) =>    """

    api.get('/api/analytics/trends', { params: { days, topic_id: topicId } }),

  getTopicMastery: () =>    # Normalize inputs---                                    Authentication

    api.get('/api/analytics/topic-mastery'),

  getRecommendations: () =>    user_answer = user_answer.strip().lower()

    api.get('/api/analytics/recommendations'),

  getWeeklyReport: () =>    correct_answer = correct_answer.strip().lower()                                           ↓

    api.get('/api/analytics/weekly-report'),

};    



export const badgeAPI = {    # Exact match check### Module 2: AI-Based Question Generation                                    Business Logic

  getAvailable: () => api.get('/api/badges/available'),

  getUserBadges: () => api.get('/api/user/badges'),    if user_answer == correct_answer:

  getProgress: () => api.get('/api/user/badges/progress'),

};        return {                                           ↓



export const leaderboardAPI = {            'is_correct': True,

  getGlobal: (timeframe?: string) =>

    api.get('/api/leaderboard', { params: { timeframe } }),            'similarity': 1.0,**Files**: `backend/question_gen.py`, `backend/content_processor.py`                    ┌──────────────────────┼──────────────────────┐

  getByTopic: (topicId: number) =>

    api.get(`/api/leaderboard/topic/${topicId}`),            'feedback': 'Perfect match!'

};

        }                    ▼                      ▼                      ▼

export const adminAPI = {

  getStats: () => api.get('/api/admin/stats'),    

  getUsers: () => api.get('/api/admin/users'),

  getFlaggedQuestions: () => api.get('/api/admin/flagged-questions'),    # Semantic similarity**Purpose**: Generates high-quality, contextually relevant questions using Google Gemini AI.            AI Processing           Database Query        Content Processing

  resolveFlag: (flagId: number, action: string) =>

    api.post(`/api/admin/resolve-flag/${flagId}`, { action }),    embeddings = model.encode([user_answer, correct_answer])

};

    similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]            (Gemini AI)             (SQLAlchemy)          (NLP Pipeline)

export default api;

```    



### 4.3 Page Components    is_correct = similarity >= threshold**Key Components**:                    │                      │                      │



#### Quiz Component (pages/Quiz.tsx)    



```typescript    feedback = generate_feedback(similarity, is_correct)                    └──────────────────────┴──────────────────────┘

import React, { useState, useEffect, useCallback } from 'react';

import { useParams, useNavigate } from 'react-router-dom';    

import { quizAPI } from '../lib/api';

    return {#### 2.1 Question Generator (`question_gen.py`)                                           ↓

interface Question {

  id: number;        'is_correct': is_correct,

  text: string;

  options?: string[];        'similarity': float(similarity),```python                                    Response Formation

  question_type: string;

  difficulty: string;        'feedback': feedback

}

    }class QuestionGenerator:                                           ↓

const Quiz: React.FC = () => {

  const { sessionId } = useParams<{ sessionId: string }>();```

  const navigate = useNavigate();

      def __init__(self):                                    Frontend Update

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const [userAnswer, setUserAnswer] = useState('');**Similarity Thresholds**:

  const [feedback, setFeedback] = useState<any>(null);

  const [score, setScore] = useState(0);- 1.0: Exact match        self.model = genai.GenerativeModel('gemini-1.5-flash')                                           ↓

  const [currentIndex, setCurrentIndex] = useState(0);

  const [totalQuestions, setTotalQuestions] = useState(10);- 0.9-0.99: Excellent answer

  const [timeLeft, setTimeLeft] = useState(60);

  - 0.8-0.89: Very good answer        self.generation_config = {                                    User Interface

  const fetchNextQuestion = useCallback(async () => {

    try {- 0.7-0.79: Good answer (threshold)

      const response = await quizAPI.getNextQuestion(Number(sessionId));

      if (response.data.completed) {- 0.6-0.69: Partially correct            'temperature': 0.7,```

        navigate(`/results/${sessionId}`);

      } else {- <0.6: Incorrect

        setCurrentQuestion(response.data.question);

        setUserAnswer('');            'top_p': 0.95,

        setFeedback(null);

        setTimeLeft(60);### 3.5 Service Modules

      }

    } catch (error) {            'max_output_tokens': 2048---

      console.error('Error fetching question:', error);

    }#### Analytics Service (analytics_service.py)

  }, [sessionId, navigate]);

          }

  const handleSubmitAnswer = async () => {

    try {```python

      const response = await quizAPI.submitAnswer(

        Number(sessionId),def get_performance_trends(user_id, days=30, topic_id=None):    ## 5. Technology Stack

        currentQuestion!.id,

        userAnswer    """Get performance trends over time"""

      );

          # Query PerformanceTrend table    def generate_questions(self, topic, difficulty, count):

      setFeedback(response.data.feedback);

          # Calculate: accuracy, avg_time, topics_mastered

      if (response.data.is_correct) {

        setScore(score + 1);    # Return time-series data        # AI prompt engineering for question generation### Backend Technologies

      }

      

      setCurrentIndex(currentIndex + 1);

      def get_topic_mastery(user_id):        # Includes Bloom's taxonomy levels| Technology | Purpose | Version |

      setTimeout(() => {

        fetchNextQuestion();    """Calculate mastery level for each topic"""

      }, 3000);

    } catch (error) {    # Query quiz sessions by topic        # Returns structured JSON with questions, options, answers|------------|---------|---------|

      console.error('Error submitting answer:', error);

    }    # Calculate accuracy per topic

  };

      # Return heatmap data```| **Python** | Backend language | 3.9+ |

  useEffect(() => {

    fetchNextQuestion();

  }, [fetchNextQuestion]);

  def generate_recommendations(user_id):| **Flask** | Web framework | 2.3.0 |

  useEffect(() => {

    const timer = setInterval(() => {    """AI-generated study recommendations"""

      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));

    }, 1000);    # Analyze weak areas#### 2.2 Content Processor (`content_processor.py`)| **SQLAlchemy** | ORM | 2.0.0 |

    

    return () => clearInterval(timer);    # Suggest topics to improve

  }, [currentQuestion]);

      # Return personalized recommendations```python| **SQLite/PostgreSQL** | Database | - |

  return (

    <div className="quiz-container p-6 max-w-4xl mx-auto">```

      {/* Quiz Header */}

      <div className="flex justify-between items-center mb-6">class ContentProcessor:| **Google Gemini AI** | Question generation | Latest |

        <h1 className="text-3xl font-bold">Quiz</h1>

        <div className="flex gap-4">#### Badge Service (badge_service.py)

          <div className="text-lg">

            Question {currentIndex + 1} / {totalQuestions}    def extract_from_pdf(self, file_path):| **JWT** | Authentication | PyJWT 2.8.0 |

          </div>

          <div className="text-lg font-semibold">```python

            Score: {score}

          </div>def check_badge_eligibility(user_id):        # Uses pdfplumber for accurate text extraction| **spaCy** | NLP processing | 3.5.0 |

          <div className={`text-lg ${timeLeft < 10 ? 'text-red-500' : ''}`}>

            Time: {timeLeft}s    """Check if user earned new badges"""

          </div>

        </div>    user = User.query.get(user_id)        # Handles multi-column layouts, tables| **NLTK** | Text analysis | 3.8 |

      </div>

          earned_badges = []

      {currentQuestion && (

        <div className="question-card bg-white rounded-lg shadow-md p-6">            | **Pandas** | Data analysis | 2.0.0 |

          {/* Question Text */}

          <div className="question-text mb-6">    for badge in Badge.query.all():

            <p className="text-xl font-medium">{currentQuestion.text}</p>

            <span className="text-sm text-gray-500 mt-2 inline-block">        if badge.criteria_type == 'quiz_count':    def extract_from_docx(self, file_path):| **BCrypt** | Password hashing | 4.0.0 |

              Difficulty: {currentQuestion.difficulty}

            </span>            if user.quiz_sessions.count() >= badge.criteria_value:

          </div>

                          award_badge(user_id, badge.id)        # Extracts text from Word documents| **Requests** | HTTP client | 2.31.0 |

          {/* Answer Input */}

          {currentQuestion.question_type === 'MCQ' && (                earned_badges.append(badge)

            <div className="options space-y-3">

              {currentQuestion.options?.map((option, index) => (            

                <button

                  key={index}    return earned_badges

                  onClick={() => setUserAnswer(option)}

                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${```    def extract_from_url(self, url):### Frontend Technologies

                    userAnswer === option

                      ? 'border-blue-500 bg-blue-50'

                      : 'border-gray-300 hover:border-blue-300'

                  }`}#### Learning Path Service (learning_path_service.py)        # Web scraping with BeautifulSoup| Technology | Purpose | Version |

                >

                  {option}

                </button>

              ))}```python        # Handles various HTML structures|------------|---------|---------|

            </div>

          )}def create_learning_path(user_id, goal_topics):

          

          {currentQuestion.question_type === 'ShortAnswer' && (    """Create personalized learning path"""```| **React** | UI library | 18.2.0 |

            <textarea

              value={userAnswer}    # Analyze user's current level

              onChange={(e) => setUserAnswer(e.target.value)}

              className="w-full p-4 border-2 border-gray-300 rounded-lg"    # Determine prerequisites| **TypeScript** | Type safety | 5.0.0 |

              rows={4}

              placeholder="Type your answer here..."    # Generate milestone sequence

            />

          )}    # Return structured path**Question Types**:| **React Router** | Routing | 6.11.0 |

          

          {/* Submit Button */}

          <button

            onClick={handleSubmitAnswer}def update_milestone_progress(user_id, milestone_id):1. **Multiple Choice** (4 options)| **Axios** | HTTP client | 1.4.0 |

            disabled={!userAnswer || !!feedback}

            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold    """Update learning path progress"""

                     hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"

          >    # Mark milestone completed2. **True/False**| **Tailwind CSS** | Styling | 3.3.0 |

            Submit Answer

          </button>    # Unlock next milestone

          

          {/* Feedback */}    # Award points3. **Short Answer** (open-ended)| **Recharts** | Data visualization | 2.5.0 |

          {feedback && (

            <div className={`mt-6 p-4 rounded-lg ${```

              feedback.is_correct ? 'bg-green-100' : 'bg-red-100'

            }`}>

              <p className="font-semibold">

                {feedback.is_correct ? '✓ Correct!' : '✗ Incorrect'}#### Multiplayer Service (multiplayer_service.py)

              </p>

              <p className="text-sm mt-2">{feedback.feedback}</p>**Bloom's Taxonomy Levels**:### DevOps & Deployment

              {feedback.explanation && (

                <p className="text-sm mt-2 text-gray-700">```python

                  <strong>Explanation:</strong> {feedback.explanation}

                </p>@socketio.on('create_room')- **Remember**: Basic recall (Level 1)| Technology | Purpose |

              )}

            </div>def handle_create_room(data):

          )}

        </div>    """Create multiplayer quiz room"""- **Understand**: Comprehension (Level 2)|------------|---------|

      )}

    </div>    room_code = generate_room_code()

  );

};    room = MultiplayerRoom(- **Apply**: Application (Level 3)| **Docker** | Containerization |



export default Quiz;        room_code=room_code,

```

        created_by=data['user_id'],- **Analyze**: Analysis (Level 4)| **Docker Compose** | Multi-container orchestration |

---

        topic_id=data['topic_id']

## 5. Database Schema

    )- **Evaluate**: Evaluation (Level 5)| **Nginx** | Reverse proxy & load balancing |

### 5.1 Entity Relationship Diagram

    db.session.add(room)

```

User (1) ──────< (M) QuizSession    db.session.commit()- **Create**: Synthesis (Level 6)| **Git** | Version control |

  │                      │

  │                      └──< (M) PerformanceTrend    emit('room_created', {'room_code': room_code})

  │

  ├──────< (M) UserBadge >────── (1) Badge

  │

  └──────< (M) LearningPath >────< (M) LearningMilestone@socketio.on('join_room')



Topic (1) ──────< (M) Questiondef handle_join_room(data):**API Endpoints**:### AI/ML Libraries

  │

  └──────< (M) QuizSession    """Join existing room"""



MultiplayerRoom (1) ──────< (M) MultiplayerParticipant >────── (1) User    room = MultiplayerRoom.query.filter_by(room_code=data['room_code']).first()- `POST /api/questions/generate` - Generate questions from topic- **Google Generative AI** - Question generation



Question (1) ──────< (M) FlaggedQuestion    participant = MultiplayerParticipant(

  │

  └──────< (M) QuestionFeedback        room_id=room.id,- `POST /api/questions/generate-from-pdf` - Generate from uploaded PDF- **Transformers (Hugging Face)** - Optional local models

```

        user_id=data['user_id']

### 5.2 Table Definitions

    )- `POST /api/questions/generate-from-text` - Generate from pasted text- **Sentence Transformers** - Semantic similarity

#### user Table

    db.session.add(participant)

```sql

CREATE TABLE user (    join_room(data['room_code'])- `POST /api/content/upload` - Upload file for processing- **NLTK/spaCy** - NLP preprocessing

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    username VARCHAR(80) UNIQUE NOT NULL,    emit('user_joined', {'username': data['username']}, room=data['room_code'])

    email VARCHAR(120) UNIQUE NOT NULL,

    password_hash VARCHAR(256) NOT NULL,```- `POST /api/content/process-url` - Extract content from URL

    full_name VARCHAR(200),

    skill_level VARCHAR(20) DEFAULT 'Beginner',

    role VARCHAR(20) DEFAULT 'user',

    total_points INTEGER DEFAULT 0,------

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

## 4. Frontend Documentation---

CREATE INDEX idx_user_email ON user(email);

CREATE INDEX idx_user_username ON user(username);

```

### 4.1 Application Structure## 6. Module Implementation

#### quiz_session Table



```sql

CREATE TABLE quiz_session (**Entry Point**: `src/index.tsx`### Module 3: Difficulty Classification

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    topic_id INTEGER,

    difficulty VARCHAR(20) DEFAULT 'Medium',```tsx### Module 1: User & Profile Management ✅

    total_questions INTEGER DEFAULT 10,

    current_question_index INTEGER DEFAULT 0,import React from 'react';

    score INTEGER DEFAULT 0,

    accuracy FLOAT DEFAULT 0.0,import ReactDOM from 'react-dom/client';**Files**: `backend/question_gen.py` (DifficultyClassifier class)

    time_spent INTEGER DEFAULT 0,

    completed BOOLEAN DEFAULT 0,import App from './App';

    completed_at DATETIME,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,import './index.css';#### Features Implemented

    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,

    FOREIGN KEY (topic_id) REFERENCES topic(id) ON DELETE SET NULL

);

const root = ReactDOM.createRoot(document.getElementById('root')!);**Purpose**: Classifies question difficulty using multi-factor analysis for adaptive quiz generation.1. **User Registration**

CREATE INDEX idx_quiz_session_user ON quiz_session(user_id);

CREATE INDEX idx_quiz_session_topic ON quiz_session(topic_id);root.render(

CREATE INDEX idx_quiz_session_created ON quiz_session(created_at);

```  <React.StrictMode>   - Email-based signup



#### question Table    <App />



```sql  </React.StrictMode>**Classification Algorithm**:   - Password strength validation

CREATE TABLE question (

    id INTEGER PRIMARY KEY AUTOINCREMENT,);

    topic_id INTEGER,

    text TEXT NOT NULL,``````python   - Secure password hashing (BCrypt)

    options JSON,

    correct_answer TEXT NOT NULL,

    explanation TEXT,

    difficulty VARCHAR(20),**Main App**: `src/App.tsx`class DifficultyClassifier:   - Duplicate user prevention

    bloom_level VARCHAR(50),

    question_type VARCHAR(50),

    times_used INTEGER DEFAULT 0,

    correct_rate FLOAT DEFAULT 0.0,```tsx    def __init__(self):

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (topic_id) REFERENCES topic(id) ON DELETE SET NULLimport { BrowserRouter, Routes, Route } from 'react-router-dom';

);

import Login from './pages/Login';        self.weights = {2. **User Authentication**

CREATE INDEX idx_question_topic ON question(topic_id);

CREATE INDEX idx_question_difficulty ON question(difficulty);import Dashboard from './pages/Dashboard';

CREATE INDEX idx_question_type ON question(question_type);

```// ... other imports            'bloom_taxonomy': 0.40,  # 40% weight   - JWT-based token authentication



---



## 6. API Referencefunction App() {            'semantic_complexity': 0.30,  # 30% weight   - Secure login system



### Base URL  return (

```

http://localhost:5000/api    <BrowserRouter>            'text_metrics': 0.20,  # 20% weight   - Token refresh mechanism

```

      <Routes>

### Authentication Endpoints

        <Route path="/login" element={<Login />} />            'historical_data': 0.10  # 10% weight   - Session management

#### POST /api/auth/register

**Description**: Register new user account        <Route path="/register" element={<Register />} />



**Request Body**:        <Route path="/dashboard" element={<Dashboard />} />        }

```json

{        <Route path="/quiz/:topicId" element={<Quiz />} />

  "username": "john_doe",

  "email": "john@example.com",        <Route path="/results/:sessionId" element={<Results />} />    3. **User Profiles**

  "password": "SecurePass123!",

  "full_name": "John Doe",        <Route path="/analytics" element={<Analytics />} />

  "skill_level": "Intermediate"

}        {/* ... other routes */}    def classify_difficulty(self, question_text, bloom_level, correct_rate=None):   - Personal information management

```

      </Routes>

**Response** (201 Created):

```json    </BrowserRouter>        # Factor 1: Bloom's Taxonomy mapping   - Skill level selection (Beginner/Intermediate/Advanced)

{

  "message": "User registered successfully",  );

  "user": {

    "id": 1,}        bloom_score = self._bloom_to_score(bloom_level)   - Profile customization

    "username": "john_doe",

    "email": "john@example.com",```

    "skill_level": "Intermediate"

  }           - Performance history tracking

}

```### 4.2 API Client (lib/api.ts)



#### POST /api/auth/login        # Factor 2: Semantic complexity (sentence embeddings)

**Description**: User login with JWT token

```typescript

**Request Body**:

```jsonimport axios from 'axios';        semantic_score = self._semantic_complexity(question_text)4. **Role-Based Access Control**

{

  "username": "john_doe",

  "password": "SecurePass123!"

}const API_BASE_URL = 'http://localhost:5000';           - User role (quiz taker)

```



**Response** (200 OK):

```jsonconst api = axios.create({        # Factor 3: Text metrics (readability, sentence length)   - Admin role (content moderator)

{

  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  baseURL: API_BASE_URL,

  "user": {

    "id": 1,  headers: {        text_score = self._text_complexity(question_text)   - Automatic route protection

    "username": "john_doe",

    "email": "john@example.com",    'Content-Type': 'application/json',

    "role": "user"

  }  },           - Permission-based features

}

```});



### Quiz Management Endpoints        # Factor 4: Historical performance data



#### POST /api/quiz/start// Request interceptor (add JWT token)

**Description**: Start new quiz session

api.interceptors.request.use((config) => {        historical_score = self._historical_difficulty(correct_rate)#### API Endpoints

**Request Body**:

```json  const token = localStorage.getItem('access_token');

{

  "topic_id": 1,  if (token) {        ```

  "difficulty": "Medium",

  "num_questions": 10    config.headers.Authorization = `Bearer ${token}`;

}

```  }        # Weighted combinationPOST   /api/auth/register          # User registration



**Response** (201 Created):  return config;

```json

{});        final_score = (POST   /api/auth/login             # User login

  "session_id": 42,

  "topic": "Python Programming",

  "difficulty": "Medium",

  "total_questions": 10,// Response interceptor (handle errors)            bloom_score * self.weights['bloom_taxonomy'] +GET    /api/auth/profile           # Get user profile

  "first_question": {

    "id": 105,api.interceptors.response.use(

    "text": "What is a list comprehension?",

    "options": ["A way to create lists", "A type of function", "A class method", "A module"],  (response) => response,            semantic_score * self.weights['semantic_complexity'] +PUT    /api/auth/profile/skill-level  # Update skill level

    "question_type": "MCQ",

    "difficulty": "Medium"  (error) => {

  }

}    if (error.response?.status === 401) {            text_score * self.weights['text_metrics'] +```

```

      localStorage.removeItem('access_token');

#### POST /api/quiz/{session_id}/answer

**Description**: Submit answer for current question      window.location.href = '/login';            historical_score * self.weights['historical_data']



**Request Body**:    }

```json

{    return Promise.reject(error);        )#### Database Schema

  "question_id": 105,

  "answer": "A way to create lists"  }

}

```);        ```sql



**Response** (200 OK):

```json

{// API methods        # Map to difficulty levelCREATE TABLE users (

  "is_correct": true,

  "similarity": 1.0,export const authAPI = {

  "confidence": 100,

  "feedback": "Correct! Well done.",  login: (username: string, password: string) =>        if final_score < 0.33:    id INTEGER PRIMARY KEY,

  "explanation": "List comprehensions provide a concise way to create lists based on existing lists.",

  "points_earned": 10,    api.post('/api/auth/login', { username, password }),

  "next_question": {

    "id": 106,              return 'Easy'    username VARCHAR(80) UNIQUE NOT NULL,

    "text": "What is the difference between a list and tuple?",

    "question_type": "ShortAnswer"  register: (data: RegisterData) =>

  }

}    api.post('/api/auth/register', data),        elif final_score < 0.67:    email VARCHAR(120) UNIQUE NOT NULL,

```

  

### Analytics Endpoints

  getProfile: () =>            return 'Medium'    password_hash VARCHAR(128) NOT NULL,

#### GET /api/analytics/trends

**Description**: Get performance trends over time    api.get('/api/auth/profile'),



**Query Parameters**:};        else:    full_name VARCHAR(100) NOT NULL,

- `days` (optional): Number of days (default: 30)

- `topic_id` (optional): Filter by topic



**Response** (200 OK):export const quizAPI = {            return 'Hard'    skill_level VARCHAR(20) DEFAULT 'Beginner',

```json

{  startQuiz: (topicId: number, difficulty: string) =>

  "trends": [

    {    api.post('/api/quiz/start', { topic_id: topicId, difficulty }),```    role VARCHAR(20) DEFAULT 'user',

      "date": "2025-11-01",

      "accuracy": 75.5,  

      "avg_time": 35,

      "quizzes_taken": 3  submitAnswer: (sessionId: number, questionId: number, answer: string) =>    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    },

    {    api.post(`/api/quiz/${sessionId}/answer`, { question_id: questionId, answer }),

      "date": "2025-11-02",

      "accuracy": 82.3,  **Difficulty Levels**:    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

      "avg_time": 32,

      "quizzes_taken": 2  completeQuiz: (sessionId: number) =>

    }

  ],    api.post(`/api/quiz/${sessionId}/complete`),- **Easy**: Beginner-friendly, basic recall);

  "overall_accuracy": 78.5,

  "improvement": 6.8};

}

```- **Medium**: Intermediate, requires understanding```



**Total: 90+ API endpoints** available across all categories.export const analyticsAPI = {



For complete API documentation, see the code comments in `backend/app.py`.  getTrends: (days: number, topicId?: number) =>- **Hard**: Advanced, analysis and synthesis



---    api.get('/api/analytics/trends', { params: { days, topic_id: topicId } }),



## 7. AI/ML Components  ---



### 7.1 Google Gemini AI Integration  getTopicMastery: () =>



**Model**: gemini-1.5-flash      api.get('/api/analytics/topic-mastery'),---

**Purpose**: Question generation from content

  

**Configuration**:

```python  getRecommendations: () =>### Module 2: Content Ingestion & Parsing ✅

generation_config = {

    'temperature': 0.7,      # Creativity level    api.get('/api/analytics/recommendations'),

    'top_p': 0.95,          # Nucleus sampling

    'top_k': 40,            # Top-k sampling};### Module 4: Adaptive Quiz Engine

    'max_output_tokens': 2048,  # Max response length

}

```

export default api;#### Features Implemented

**Rate Limits** (Free Tier):

- 60 requests per minute```

- 1,500 requests per day

**Files**: `backend/app.py` (adaptive quiz logic)1. **Content Upload Methods**

### 7.2 Sentence-Transformers (NLP)

### 4.3 Key Pages

**Model**: all-MiniLM-L6-v2  

**Purpose**: Semantic similarity for answer evaluation   - Text paste (direct input)



**Specifications**:#### 4.3.1 Dashboard (pages/Dashboard.tsx)

- Embedding dimension: 384

- Inference time: ~10ms per sentence**Purpose**: Dynamically adjusts question difficulty based on real-time user performance.   - PDF file upload

- Accuracy: 85-90% on standard benchmarks

```tsx

**Usage**:

```pythonconst Dashboard: React.FC = () => {   - URL scraping (future enhancement)

from sentence_transformers import SentenceTransformer

  const [topics, setTopics] = useState<Topic[]>([]);

model = SentenceTransformer('all-MiniLM-L6-v2')

  const [recentSessions, setRecentSessions] = useState<QuizSession[]>([]);**Adaptive Algorithm**:   - Multiple file format support

# Encode sentences

embeddings = model.encode(["Text 1", "Text 2"])  



# Calculate similarity  useEffect(() => {```python

similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]

```    fetchTopics();



### 7.3 Difficulty Classification Algorithm    fetchRecentSessions();def get_next_difficulty(current_difficulty, is_correct, consecutive_correct, consecutive_wrong):2. **Content Processing Pipeline**



**Multi-Factor Analysis**:  }, []);



1. **Bloom's Taxonomy** (40% weight)      """   ```python

   - Remember: 0.1

   - Understand: 0.2  const fetchTopics = async () => {

   - Apply: 0.4

   - Analyze: 0.6    const response = await api.get('/api/topics');    Adaptive difficulty adjustment algorithm   Raw Content → Cleaning → Segmentation → Knowledge Chunks

   - Evaluate: 0.8

   - Create: 1.0    setTopics(response.data);



2. **Semantic Complexity** (30% weight)  };       ```

   - Sentence embedding dimensionality

   - Vocabulary sophistication  



3. **Text Metrics** (20% weight)  return (    Rules:

   - Readability score

   - Sentence length    <div className="dashboard">

   - Word complexity

      <h1>Select a Topic</h1>    1. 3 consecutive correct → increase difficulty3. **NLP-Based Processing**

4. **Historical Data** (10% weight)

   - User success rate on similar questions      <div className="topic-grid">



**Formula**:        {topics.map(topic => (    2. 2 consecutive wrong → decrease difficulty   - Text normalization

```

difficulty_score = (          <TopicCard key={topic.id} topic={topic} />

    bloom_score * 0.40 +

    semantic_score * 0.30 +        ))}    3. Perfect score (100%) → increase difficulty   - Sentence segmentation

    text_score * 0.20 +

    historical_score * 0.10      </div>

)

      <RecentActivity sessions={recentSessions} />    4. Low score (<50%) → decrease difficulty   - Paragraph extraction

if difficulty_score < 0.33: "Easy"

elif difficulty_score < 0.67: "Medium"    </div>

else: "Hard"

```  );    """   - Content summarization



---};



## 8. Security & Authentication```    if consecutive_correct >= 3:   - Keyword extraction



### 8.1 Password Security



**Hashing Algorithm**: BCrypt with salt#### 4.3.2 Quiz (pages/Quiz.tsx)        return upgrade_difficulty(current_difficulty)



```python

import bcrypt

```tsx    elif consecutive_wrong >= 2:4. **Content Validation**

# Hash password

hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())const Quiz: React.FC = () => {



# Verify password  const { sessionId } = useParams();        return downgrade_difficulty(current_difficulty)   - Minimum content length (10 characters)

is_valid = bcrypt.checkpw(password.encode('utf-8'), hashed)

```  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);



**Password Requirements**:  const [userAnswer, setUserAnswer] = useState('');    else:   - Maximum content size (10MB)

- Minimum 8 characters

- At least 1 uppercase letter  const [feedback, setFeedback] = useState<Feedback | null>(null);

- At least 1 lowercase letter

- At least 1 digit          return current_difficulty   - Format validation

- At least 1 special character

  const handleSubmitAnswer = async () => {

### 8.2 JWT Authentication

    const response = await quizAPI.submitAnswer(```   - Encoding detection

**Token Structure**:

```json      sessionId,

{

  "user_id": 1,      currentQuestion.id,

  "username": "john_doe",

  "role": "user",      userAnswer

  "exp": 1699999999,

  "iat": 1699913599    );**Adjustment Logic**:#### API Endpoints

}

```    



**Token Lifecycle**:    setFeedback(response.data.feedback);1. **Track Performance**: Monitor correct/wrong answers in real-time```

- Access token: 24 hours

- Refresh token: 30 days (if implemented)    



**Implementation**:    if (response.data.is_correct) {2. **Calculate Streaks**: Count consecutive correct/incorrect answersPOST   /api/content/upload         # Upload custom content

```python

from flask_jwt_extended import create_access_token, jwt_required      setScore(score + 1);



# Create token    }3. **Apply Rules**: Use threshold-based rules for adjustmentPOST   /api/quiz/start             # Start quiz with content

access_token = create_access_token(identity=user.id)

    

# Protected route

@app.route('/api/protected')    // Load next question after 3 seconds4. **Generate Next Question**: Request question at adjusted difficulty```

@jwt_required()

def protected():    setTimeout(() => {

    current_user_id = get_jwt_identity()

    return {'user_id': current_user_id}      fetchNextQuestion();5. **Update Session**: Store difficulty change in quiz session

```

    }, 3000);

### 8.3 CORS Configuration

  };#### Content Processor Architecture

```python

from flask_cors import CORS  



CORS(app, resources={  return (**Performance Metrics**:```python

    r"/api/*": {

        "origins": ["http://localhost:8080"],    <div className="quiz-container">

        "methods": ["GET", "POST", "PUT", "DELETE"],

        "allow_headers": ["Content-Type", "Authorization"],      <QuizHeader score={score} questionNumber={currentIndex} />- Current score percentageclass ContentProcessor:

        "supports_credentials": True

    }      <QuestionDisplay question={currentQuestion} />

})

```      <AnswerInput value={userAnswer} onChange={setUserAnswer} />- Average time per question    def process_text(text: str) -> ProcessedContent:



### 8.4 Input Validation      <button onClick={handleSubmitAnswer}>Submit</button>



**Server-side Validation** (example):      {feedback && <FeedbackDisplay feedback={feedback} />}- Difficulty distribution        # 1. Clean and normalize

```python

def validate_quiz_session(data):    </div>

    if 'topic_id' not in data:

        return False, "topic_id is required"  );- Streak length        cleaned = self.clean_text(text)

    

    if 'difficulty' not in data or data['difficulty'] not in ['Easy', 'Medium', 'Hard']:};

        return False, "Invalid difficulty level"

    ```        

    if 'num_questions' not in data or not (5 <= data['num_questions'] <= 20):

        return False, "num_questions must be between 5 and 20"

    

    return True, None#### 4.3.3 Analytics Dashboard (pages/AnalyticsDashboard.tsx)---        # 2. Segment into chunks

```



### 8.5 SQL Injection Prevention

```tsx        chunks = self.segment_content(cleaned)

**SQLAlchemy ORM** provides automatic protection through parameterized queries:

const AnalyticsDashboard: React.FC = () => {

```python

# Safe (parameterized)  const [activeTab, setActiveTab] = useState('overview');### Module 5: Answer Evaluation & Feedback        

user = User.query.filter_by(username=username).first()

  const [trends, setTrends] = useState<PerformanceTrend[]>([]);

# Safe (parameterized)

questions = Question.query.filter(Question.difficulty == difficulty).all()  const [topicMastery, setTopicMastery] = useState<TopicMastery[]>([]);        # 3. Extract metadata

```

  

---

  useEffect(() => {**Files**: `backend/answer_evaluator_simple.py`        metadata = self.extract_metadata(chunks)

## 9. Testing

    fetchTrends();

### 9.1 Backend Tests

    fetchTopicMastery();        

**Framework**: pytest

  }, []);

**File**: `test_custom_content.py`

  **Purpose**: Evaluates user answers using semantic similarity and provides detailed feedback.        # 4. Return processed content

```python

import pytest  return (

from app import app, db

from models import User, QuizSession    <div className="analytics-dashboard">        return ProcessedContent(chunks, metadata)



@pytest.fixture      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

def client():

    app.config['TESTING'] = True      **Evaluation Engine**:```

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'

          {activeTab === 'overview' && (

    with app.test_client() as client:

        with app.app_context():        <>```python

            db.create_all()

        yield client          <PerformanceChart trends={trends} />

        with app.app_context():

            db.drop_all()          <TopicHeatmap mastery={topicMastery} />class AnswerEvaluator:---



def test_user_registration(client):          <WeeklyReport />

    response = client.post('/api/auth/register', json={

        'username': 'testuser',        </>    def __init__(self):

        'email': 'test@example.com',

        'password': 'Test@123',      )}

        'full_name': 'Test User'

    })              self.model = SentenceTransformer('all-MiniLM-L6-v2')### Module 3: Question Generator Engine ✅

    assert response.status_code == 201

    assert b'User registered successfully' in response.data      {activeTab === 'badges' && (



def test_quiz_start(client):        <BadgeShowcase />        self.similarity_threshold = 0.75  # 75% similarity for correctness

    # First register and login

    client.post('/api/auth/register', json={      )}

        'username': 'testuser',

        'email': 'test@example.com',          #### Features Implemented

        'password': 'Test@123'

    })      {activeTab === 'recommendations' && (

    

    login_response = client.post('/api/auth/login', json={        <RecommendationList />    def evaluate_answer(self, user_answer, correct_answer, question_type):1. **AI-Powered Generation**

        'username': 'testuser',

        'password': 'Test@123'      )}

    })

    token = login_response.json['access_token']    </div>        if question_type in ['MCQ', 'True/False']:   - Google Gemini AI integration

    

    # Start quiz  );

    response = client.post('/api/quiz/start',

        headers={'Authorization': f'Bearer {token}'},};            # Exact match for structured questions   - Batch generation (5 questions in 1 API call)

        json={'topic_id': 1, 'difficulty': 'Medium', 'num_questions': 10}

    )```

    assert response.status_code == 201

    assert 'session_id' in response.json            return user_answer.lower() == correct_answer.lower()   - Optimized for speed (4-5x faster)

```

### 4.4 Reusable Components

**Run Tests**:

```bash           - Automatic retry mechanism

cd backend

pytest test_custom_content.py -v#### PerformanceChart (components/PerformanceChart.tsx)

```

        elif question_type == 'Short Answer':

### 9.2 Frontend Tests

```tsx

**Framework**: Jest + React Testing Library

interface PerformanceChartProps {            # Semantic similarity for open-ended questions2. **Question Types**

**Example Test** (`App.test.tsx`):

  days: number;

```typescript

import { render, screen } from '@testing-library/react';  topic?: number;            user_embedding = self.model.encode(user_answer)   - **Multiple Choice Questions (MCQ)**

import App from './App';

}

test('renders login page for unauthenticated user', () => {

  render(<App />);            correct_embedding = self.model.encode(correct_answer)     - 4 options per question

  const loginElement = screen.getByText(/login/i);

  expect(loginElement).toBeInTheDocument();const PerformanceChart: React.FC<PerformanceChartProps> = ({ days, topic }) => {

});

```  const [trends, setTrends] = useState<Trend[]>([]);                 - Plausible distractors



**Run Tests**:  

```bash

cd frontend  const loadTrends = useCallback(async () => {            similarity = cosine_similarity([user_embedding], [correct_embedding])[0][0]     - Single correct answer

npm test

```    const response = await analyticsAPI.getTrends(days, topic);



---    setTrends(response.data);               



## 10. Deployment  }, [days, topic]);



### 10.1 Production Checklist              is_correct = similarity >= self.similarity_threshold   - **True/False Questions**



**Backend**:  useEffect(() => {

- ✅ Set `FLASK_ENV=production`

- ✅ Disable debug mode (`FLASK_DEBUG=False`)    loadTrends();            confidence = similarity * 100     - Statement validation

- ✅ Use PostgreSQL instead of SQLite

- ✅ Generate strong `SECRET_KEY` and `JWT_SECRET_KEY`  }, [loadTrends]);

- ✅ Enable HTTPS (SSL/TLS)

- ✅ Configure Gunicorn with 4+ workers                   - Clear true/false distinction

- ✅ Set up reverse proxy (Nginx)

- ✅ Enable rate limiting  return (

- ✅ Configure logging

- ✅ Set up database backups    <div className="chart-container">            return {   



**Frontend**:      <LineChart data={trends} xAxis="date" yAxis="accuracy" />

- ✅ Run `npm run build`

- ✅ Configure production API URL    </div>                'is_correct': is_correct,   - **Fill-in-the-Blank**

- ✅ Enable minification

- ✅ Set up CDN for static assets  );

- ✅ Configure caching headers

- ✅ Enable HTTPS};                'confidence': confidence,     - Context-based blanks



### 10.2 Docker Deployment```



**Backend Dockerfile**:                'similarity_score': similarity     - Word/phrase completion



```dockerfile#### BadgeShowcase (components/BadgeShowcase.tsx)

FROM python:3.9-slim

            }   

WORKDIR /app

```tsx

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txtconst BadgeShowcase: React.FC = () => {```   - **Short Answer**



COPY . .  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);



EXPOSE 5000  const [availableBadges, setAvailableBadges] = useState<Badge[]>([]);     - Open-ended responses



CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "--worker-class", "eventlet", "app:app"]  

```

  useEffect(() => {**Feedback Generation**:     - Semantic evaluation

**Frontend Dockerfile**:

    fetchBadges();

```dockerfile

FROM node:16-alpine AS builder  }, []);1. **Immediate Feedback**: Show correct/incorrect status instantly



WORKDIR /app  

COPY package*.json ./

RUN npm install  return (2. **Detailed Explanation**: AI-generated explanation for each question3. **Difficulty Classification**

COPY . .

RUN npm run build    <div className="badge-showcase">



FROM nginx:alpine      <h2>Your Badges ({earnedBadges.length})</h2>3. **Semantic Analysis**: For short answers, show similarity percentage   - Bloom's Taxonomy integration

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf      <div className="badge-grid">

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]        {earnedBadges.map(badge => (4. **Improvement Tips**: Suggestions based on mistake patterns   - 6 cognitive levels:

```

          <BadgeCard key={badge.id} badge={badge} earned={true} />

**docker-compose.yml**:

        ))}     - Remember (Basic)

```yaml

version: '3.8'      </div>



services:      **Grading Rules**:     - Understand (Basic)

  backend:

    build: ./backend      <h3>Available Badges</h3>

    ports:

      - "5000:5000"      <div className="badge-grid">- MCQ/True-False: Binary (correct/incorrect)     - Apply (Intermediate)

    environment:

      - GOOGLE_API_KEY=${GOOGLE_API_KEY}        {availableBadges.map(badge => (

      - SECRET_KEY=${SECRET_KEY}

      - JWT_SECRET_KEY=${JWT_SECRET_KEY}          <BadgeCard key={badge.id} badge={badge} earned={false} />- Short Answer: Threshold-based (75%+ similarity = correct)     - Analyze (Intermediate)

      - DATABASE_URL=postgresql://user:pass@db:5432/smart_quizzer

    depends_on:        ))}

      - db

        </div>- Partial Credit: Not currently supported (future enhancement)     - Evaluate (Advanced)

  frontend:

    build: ./frontend    </div>

    ports:

      - "80:80"  );     - Create (Advanced)

    depends_on:

      - backend};

  

  db:```---

    image: postgres:15

    environment:

      - POSTGRES_USER=user

      - POSTGRES_PASSWORD=pass---4. **Question Quality Assurance**

      - POSTGRES_DB=smart_quizzer

    volumes:

      - postgres_data:/var/lib/postgresql/data

## 5. Database Schema### Module 6: User Profile & Progress Tracking   - Uniqueness checking

volumes:

  postgres_data:

```

### 5.1 Entity Relationship Diagram   - Difficulty validation

**Deploy**:

```bash

docker-compose up --build

``````**Files**: `backend/models.py` (User, QuizSession), `backend/analytics_service.py`   - Content relevance scoring



---User (1) ──── (M) QuizSession



## 11. Performance Optimization  │                  │   - Grammar checking



### 11.1 Backend Optimization  │                  │



**Database**:  │                  └──── (M) PerformanceTrend**Purpose**: Tracks user performance, generates analytics, and provides personalized insights.

- Use indexes on frequently queried columns

- Implement connection pooling  │

- Cache frequent queries with Redis

  ├──── (M) UserBadge ──── (1) Badge#### Question Generation Pipeline

**API**:

- Implement pagination for large result sets  │

- Use gzip compression for responses

- Enable HTTP caching headers  └──── (M) LearningPath ──── (M) LearningMilestone**User Model**:

- Batch AI requests (5 questions per call)



### 11.2 Frontend Optimization

Topic (1) ──── (M) Question```python```

**Code Splitting**:

```typescript  │

import React, { lazy, Suspense } from 'react';

  └──── (M) QuizSessionclass User(db.Model):Content Input

const Analytics = lazy(() => import('./pages/Analytics'));



function App() {

  return (MultiplayerRoom (1) ──── (M) MultiplayerParticipant ──── (1) User    id = db.Column(db.Integer, primary_key=True)    ↓

    <Suspense fallback={<div>Loading...</div>}>

      <Analytics />

    </Suspense>

  );Question (1) ──── (M) FlaggedQuestion    username = db.Column(db.String(80), unique=True, nullable=False)AI Prompt Construction

}

```  │



**Memoization**:  └──── (M) QuestionFeedback    email = db.Column(db.String(120), unique=True, nullable=False)    ↓

```typescript

import { useMemo, useCallback } from 'react';```



const MemoizedComponent = React.memo(({ data }) => {    password_hash = db.Column(db.String(255), nullable=False)Gemini AI API Call

  const processedData = useMemo(() => {

    return data.map(item => item * 2);### 5.2 Table Definitions

  }, [data]);

      full_name = db.Column(db.String(200))    ↓

  return <div>{processedData}</div>;

});**User Table**:

```

```sql    skill_level = db.Column(db.String(20), default='Beginner')  # Beginner/Intermediate/AdvancedResponse Parsing

---

CREATE TABLE user (

## 12. Contributing Guidelines

    id INTEGER PRIMARY KEY,    role = db.Column(db.String(20), default='user')  # user/admin    ↓

### 12.1 Development Workflow

    username VARCHAR(80) UNIQUE NOT NULL,

1. Fork the repository

2. Create feature branch: `git checkout -b feature/AmazingFeature`    email VARCHAR(120) UNIQUE NOT NULL,    created_at = db.Column(db.DateTime, default=datetime.utcnow)Difficulty Classification

3. Make changes

4. Run tests: `pytest` (backend), `npm test` (frontend)    password_hash VARCHAR(256) NOT NULL,

5. Commit: `git commit -m 'Add AmazingFeature'`

6. Push: `git push origin feature/AmazingFeature`    skill_level VARCHAR(20),        ↓

7. Open Pull Request

    is_admin BOOLEAN DEFAULT 0,

### 12.2 Code Standards

    total_points INTEGER DEFAULT 0,    # RelationshipsQuality Validation

**Python (PEP 8)**:

- Line length: 100 characters    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

- Use 4 spaces for indentation

- Docstrings for all functions);    quiz_sessions = db.relationship('QuizSession', backref='user', lazy=True)    ↓



**TypeScript**:```

- Use ESLint configuration

- Prefer functional components    badges = db.relationship('UserBadge', backref='user', lazy=True)Question Storage

- Use TypeScript strict mode

**QuizSession Table**:

### 12.3 Commit Message Format

```sql    performance_trends = db.relationship('PerformanceTrend', backref='user', lazy=True)```

```

<type>(<scope>): <subject>CREATE TABLE quiz_session (



<body>    id INTEGER PRIMARY KEY,```



<footer>    user_id INTEGER NOT NULL,

```

    topic_id INTEGER NOT NULL,#### API Endpoints

**Types**: feat, fix, docs, style, refactor, test, chore

    score INTEGER DEFAULT 0,

**Example**:

```    total_questions INTEGER DEFAULT 10,**Analytics Features**:```

feat(backend): add badge eligibility check

    current_question_index INTEGER DEFAULT 0,

Implemented automatic badge awarding when users complete quizzes.

Checks all 21 badges against user's statistics.    difficulty VARCHAR(20) DEFAULT 'Medium',POST   /api/questions/generate     # Generate questions



Closes #45    completed BOOLEAN DEFAULT 0,

```

    completed_at DATETIME,#### 6.1 Performance TrendsPOST   /api/quiz/next              # Get adaptive next question

---

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

**Documentation Version**: 1.0.0  

**Last Updated**: November 2025      FOREIGN KEY (user_id) REFERENCES user(id),```python```

**Maintained By**: Mamatha Bachu  

**GitHub**: https://github.com/BatchuMamatha/Smart-Quizzer-AI    FOREIGN KEY (topic_id) REFERENCES topic(id)


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
