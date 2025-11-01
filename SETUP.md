# Smart Quizzer AI - Complete Setup Guide

This guide will help you set up Smart Quizzer AI on any laptop or environment from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Python 3.8 or higher** - [Download here](https://www.python.org/downloads/)
- **Node.js 16 or higher** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/downloads)

### Required API Keys
- **Google Gemini API Key** - [Get one free here](https://makersuite.google.com/app/apikey)

---

## 🚀 Quick Setup (Automated)

### Windows

```bash
# 1. Clone the repository
git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
cd Smart-Quizzer-AI

# 2. Run the automated setup script
setup.bat

# 3. Edit backend/.env and add your GEMINI_API_KEY
# (The file will be created automatically)

# 4. You're done! Follow the on-screen instructions to start the servers
```

### Linux / macOS

```bash
# 1. Clone the repository
git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
cd Smart-Quizzer-AI

# 2. Make setup script executable and run it
chmod +x setup.sh
./setup.sh

# 3. Edit backend/.env and add your GEMINI_API_KEY
# (The file will be created automatically)

# 4. You're done! Follow the on-screen instructions to start the servers
```

---

## 🔧 Manual Setup (Step-by-Step)

If you prefer to set up manually or the automated script fails, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
cd Smart-Quizzer-AI
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create .env file from template
cp .env.example .env
# On Windows: copy .env.example .env

# Edit .env and add your GEMINI_API_KEY
# Get one from: https://makersuite.google.com/app/apikey
```

**Minimum required in backend/.env:**
```env
GEMINI_API_KEY=your-actual-gemini-api-key-here
SECRET_KEY=your-secret-key-for-production
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install Node.js dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env
# On Windows: echo REACT_APP_API_URL=http://localhost:5000 > .env
```

### 4. Initialize Database

```bash
# From project root directory
python init_database.py

# This creates:
# - 5 Admin accounts
# - 15 User accounts
# - Topics for quizzes
```

### 5. Populate Sample Data (Optional but Recommended)

```bash
# From project root directory
python populate_quiz_data.py

# This adds:
# - 185 quiz sessions
# - 1,119 sample questions
# - Realistic user quiz history
```

---

## ▶️ Running the Application

You need to run both backend and frontend servers simultaneously.

### Start Backend Server

```bash
# Terminal 1 - Backend
cd backend
python app.py

# Server will start on http://localhost:5000
```

### Start Frontend Server

```bash
# Terminal 2 - Frontend (new terminal window)
cd frontend
npm start

# Application will open at http://localhost:3000
```

---

## 🐳 Docker Setup (Alternative)

If you prefer using Docker:

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access application at http://localhost:3000
# Backend API at http://localhost:5000
```

---

## 🌐 Environment Variables Reference

### Backend (.env)

```env
# REQUIRED
GEMINI_API_KEY=your-gemini-api-key-here
SECRET_KEY=your-secret-key-minimum-32-characters

# OPTIONAL
DATABASE_URL=sqlite:///smart_quizzer.db
DEBUG=False
FLASK_ENV=production

# EMAIL (for password reset - optional)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=your-email@gmail.com
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)

```env
# REQUIRED
REACT_APP_API_URL=http://localhost:5000

# OPTIONAL
PORT=3000
```

---

## 📦 Project Structure

```
Smart-Quizzer-AI/
├── backend/                    # Flask backend
│   ├── app.py                 # Main API server
│   ├── models.py              # Database models
│   ├── auth.py                # Authentication
│   ├── question_gen.py        # AI question generation
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── pages/             # All page components
│   │   ├── components/        # Reusable components
│   │   └── lib/               # Utilities and API
│   ├── package.json           # Node dependencies
│   └── .env                   # Frontend config
├── init_database.py           # Database initialization
├── populate_quiz_data.py      # Sample data generator
├── setup.bat                  # Windows setup script
├── setup.sh                   # Linux/Mac setup script
└── README.md                  # Main documentation
```

---

## 🚀 Production Deployment

For production deployment:

1. Set `DEBUG=False` in backend/.env
2. Set `FLASK_ENV=production` in backend/.env
3. Use a strong `SECRET_KEY` (generate with `python -c "import secrets; print(secrets.token_hex(32))"`)
4. Use a production database (PostgreSQL recommended)
5. Set up HTTPS with SSL certificates
6. Configure CORS properly for your domain
7. Use a process manager like PM2 or Supervisor
8. Set up reverse proxy with Nginx

See [README.md](README.md) for detailed production deployment guide.

---

**Last Updated**: November 2025  
**Version**: 1.0.0  
**Maintainer**: Mamatha Batchu
