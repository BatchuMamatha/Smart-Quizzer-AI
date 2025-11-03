# Smart Quizzer AI 🎓

**An intelligent, AI-powered adaptive learning platform that generates personalized quizzes, evaluates answers semantically, and provides real-time performance analytics.****An intelligent quiz generation platform powered by AI that creates personalized learning experiences with real-time feedback, adaptive difficulty adjustment, and comprehensive analytics.**



[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

[![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)](https://flask.palletsprojects.com/)

[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://python.org/)

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg)](https://www.typescriptlang.org/)

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)



------



## 📚 Table of Contents## Contact



- [Overview](#overview)

- [Key Features](#key-features)

- [Technology Stack](#technology-stack)

- [Quick Start](#quick-start)

- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

Smart Quizzer AI revolutionizes the learning experience by combining artificial intelligence with adaptive assessment methodologies. The platform generates contextually relevant quiz questions from custom content, evaluates answers using natural language processing, and dynamically adjusts difficulty based on real-time user performance.

**Target Users**: Students, educators, self-learners, corporate training teams

**Core Value Proposition**:
- Transform any content (PDFs, documents, URLs) into interactive quizzes
- Get intelligent feedback beyond simple right/wrong answers
- Track learning progress with comprehensive analytics
- Compete globally through leaderboards and multiplayer modes

---

## Key Features

### 🤖 AI-Powered Question Generation
- **Google Gemini AI Integration**: Generates high-quality questions from uploaded content
- **Multiple Content Formats**: Supports PDF, DOCX, plain text, and web URLs
- **Bloom's Taxonomy Classification**: Questions categorized across six cognitive levels
- **Three Difficulty Tiers**: Easy, Medium, and Hard questions with intelligent classification
- **Diverse Question Types**: Multiple Choice, True/False, and Short Answer formats

### 📊 Adaptive Learning System
- **Real-Time Difficulty Adjustment**: Automatically scales question difficulty based on performance
- **Personalized Learning Paths**: AI-recommended study routes tailored to individual needs
- **Topic Mastery Tracking**: Detailed analytics showing proficiency levels per subject
- **Performance Visualization**: Interactive charts displaying progress trends over time
- **Weak Area Detection**: Automatic identification of knowledge gaps requiring focus

### 🎯 Intelligent Answer Evaluation
- **Semantic Similarity Matching**: Uses NLP (Sentence-Transformers) for context-aware grading
- **75% Similarity Threshold**: Accepts answers that demonstrate conceptual understanding
- **Contextual Feedback**: Provides detailed explanations for both correct and incorrect responses
- **Confidence Scoring**: 0-100% confidence metric for answer evaluation accuracy

### 🏆 Gamification & Engagement
- **21 Achievement Badges**: Rewards for various accomplishments (Quiz Starter, Streak Master, Marathon Runner, etc.)
- **Global Leaderboards**: Weekly, monthly, and all-time rankings across all users
- **Points & Rewards System**: Earn points for accuracy, speed, and consistent engagement
- **Skill Level Progression**: Advance from Beginner → Intermediate → Advanced

### 🌐 Real-Time Multiplayer
- **Live Quiz Rooms**: Compete with others in synchronized quiz sessions
- **WebSocket Technology**: Instant updates via Flask-SocketIO
- **Room Management**: Create private or public multiplayer sessions
- **Live Rankings**: Watch your position change in real-time

### 📈 Comprehensive Analytics
- **Performance Dashboard**: Visual representation of learning journey
- **Topic Heatmaps**: Color-coded proficiency levels across different subjects
- **Trend Analysis**: Daily, weekly, and monthly performance metrics
- **AI Recommendations**: Personalized suggestions for optimal learning paths
- **Weekly Reports**: Automated summaries of quiz activity and achievements

### 👨‍💼 Admin Control Panel
- **User Management**: View and manage all registered users
- **Content Moderation**: Review and approve user-generated questions
- **System Analytics**: Platform-wide statistics and usage metrics
- **Flagged Content Review**: Address reported questions and issues

---

## Technology Stack

### Backend Technologies

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Framework** | Flask | 3.0.0 | Web application framework |
| **Language** | Python | 3.9+ | Backend programming |
| **Database ORM** | SQLAlchemy | 2.0.43 | Database abstraction layer |
| **Dev Database** | SQLite | Built-in | Local development storage |
| **Prod Database** | PostgreSQL | 15+ (recommended) | Production data storage |
| **AI Engine** | Google Gemini AI | 1.5 Flash | Question generation |
| **NLP Model** | Sentence-Transformers | 2.7.0+ | Semantic answer evaluation |
| **Real-Time** | Flask-SocketIO | 5.3.6 | WebSocket communication |
| **Authentication** | JWT (Flask-JWT-Extended) | 4.6.0 | Token-based auth |
| **Password Security** | BCrypt | 4.1.2 | Password hashing |
| **PDF Processing** | PyPDF2 | 3.0.0+ | PDF text extraction |
| **DOCX Processing** | python-docx | 1.1.0+ | Word document parsing |
| **Web Scraping** | BeautifulSoup4 | 4.12.0+ | URL content extraction |

### Frontend Technologies

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Framework** | React | 18.2.0 | UI component library |
| **Language** | TypeScript | 4.9.5 | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 3.3.0 | Utility-first CSS framework |
| **Routing** | React Router | 6.4.0 | Client-side navigation |
| **HTTP Client** | Axios | 1.5.0 | API communication |
| **WebSocket Client** | Socket.IO Client | 4.8.1 | Real-time updates |
| **Charts** | Recharts | 2.8.0 | Data visualization |

### Development & Deployment

- **Version Control**: Git & GitHub
- **Package Managers**: pip (Python), npm (Node.js)
- **Containerization**: Docker & Docker Compose (optional)
- **Production Server**: Gunicorn with eventlet workers
- **Reverse Proxy**: Nginx (recommended)

---

## Quick Start

### Prerequisites

Before you begin, ensure you have:

- **Python 3.9 or higher** ([Download](https://www.python.org/downloads/))
- **Node.js 16 or higher** ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/downloads))
- **Google Gemini API Key** ([Get Free Key](https://aistudio.google.com/app/apikey))

### Installation (Windows, Mac, Linux)

#### 1. Clone the Repository

```bash
git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
cd Smart-Quizzer-AI
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows CMD:
venv\Scripts\activate.bat
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file (.env)
# Add the following variables:
SECRET_KEY=your-secret-key-min-32-chars
JWT_SECRET_KEY=your-jwt-secret-min-32-chars
GOOGLE_API_KEY=your-google-gemini-api-key
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=sqlite:///instance/smart_quizzer.db

# Initialize database and start server
python app.py
```

**Backend will run on**: `http://localhost:5000`

#### 3. Frontend Setup (New Terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file (.env)
# Add the following variable:
REACT_APP_API_URL=http://localhost:5000

# Start development server
npm start
```

**Frontend will run on**: `http://localhost:8080`

#### 4. Access the Application

Open your browser and navigate to **http://localhost:8080**

**For detailed setup instructions**, see [setup.md](setup.md)

---

## Project Structure

```
Smart-Quizzer-AI/
│
├── backend/                          # Flask Backend Application
│   ├── app.py                       # Main application (90+ API endpoints)
│   ├── models.py                    # Database models (15 SQLAlchemy models)
│   ├── auth.py                      # JWT authentication utilities
│   ├── question_gen.py              # AI question generation service
│   ├── answer_evaluator_simple.py   # NLP-based answer evaluation
│   ├── content_processor.py         # PDF/DOCX/URL content extraction
│   ├── badge_service.py             # Achievement badge system
│   ├── analytics_service.py         # Performance analytics engine
│   ├── learning_path_service.py     # Personalized learning paths
│   ├── leaderboard_service.py       # Global leaderboard management
│   ├── multiplayer_service.py       # Real-time multiplayer features
│   ├── error_handler.py             # Centralized error handling
│   ├── requirements.txt             # Python package dependencies
│   ├── migrate_db.py                # Database migration script
│   ├── setup_env.py                 # Environment setup helper
│   └── instance/
│       └── smart_quizzer.db        # SQLite database (auto-created)
│
├── frontend/                         # React Frontend Application
│   ├── public/
│   │   ├── index.html              # HTML entry point
│   │   └── favicon.svg             # Application icon
│   ├── src/
│   │   ├── pages/                   # Page components (13 pages)
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Quiz.tsx
│   │   │   ├── Results.tsx
│   │   │   ├── History.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── ContentUploadPage.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── AdminDashboard.tsx
│   │   ├── components/              # Reusable components (8 components)
│   │   │   ├── BadgeShowcase.tsx
│   │   │   ├── BadgeProgress.tsx
│   │   │   ├── ContentUpload.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── PerformanceChart.tsx
│   │   │   ├── RecommendationCard.tsx
│   │   │   ├── TopicHeatmap.tsx
│   │   │   └── WeeklyReport.tsx
│   │   ├── lib/
│   │   │   ├── api.ts              # Axios API client
│   │   │   └── userManager.ts      # User session management
│   │   ├── App.tsx                 # Main React application
│   │   ├── index.tsx               # React entry point
│   │   └── index.css               # Tailwind CSS configuration
│   ├── package.json                # Node.js dependencies
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tailwind.config.js          # Tailwind CSS settings
│   └── postcss.config.js           # PostCSS configuration
│
├── README.md                        # Project overview (this file)
├── setup.md                         # Detailed setup instructions
├── project_documentation.md         # Technical documentation
├── LICENSE                          # MIT License
└── .gitignore                       # Git ignore rules
```

---

## Documentation

📖 **Comprehensive Documentation Available**:

- **[setup.md](setup.md)** - Step-by-step installation and configuration guide for all platforms
- **[project_documentation.md](project_documentation.md)** - Detailed architecture, API reference, and development guidelines

**Quick Links**:
- [Backend API Documentation](project_documentation.md#api-reference)
- [Database Schema](project_documentation.md#database-schema)
- [Deployment Guide](setup.md#production-deployment)
- [Troubleshooting](setup.md#troubleshooting)

---

## Contributing

We welcome contributions from the community! Here's how you can help:

### Development Workflow

1. **Fork the repository** on GitHub
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Make your changes** following our coding standards
4. **Run tests**: 
   - Backend: `pytest`
   - Frontend: `npm test`
5. **Commit your changes**: `git commit -m 'Add AmazingFeature'`
6. **Push to branch**: `git push origin feature/AmazingFeature`
7. **Open a Pull Request** with a detailed description
---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Mamatha Bachu

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

See [LICENSE](LICENSE) file for full details.

---

## Contact

**Project Maintainer**: Mamatha Bachu

**GitHub Repository**: [github.com/BatchuMamatha/Smart-Quizzer-AI](https://github.com/BatchuMamatha/Smart-Quizzer-AI)

**For Support**:
- 🐛 Report bugs via [GitHub Issues](https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues)
- 💡 Request features via [GitHub Issues](https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues)
- 📧 General inquiries: Check repository discussions

---

## Acknowledgments

- **Google Gemini AI** for powering intelligent question generation
- **Hugging Face** for providing state-of-the-art NLP models
- **Flask** and **React** communities for excellent documentation and support
- All open-source contributors who made this project possible

---

**Made with ❤️ by Mamatha Bachu**

*Empowering learners worldwide through AI-driven adaptive assessments*

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**
