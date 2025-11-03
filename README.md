# Smart Quizzer AI - Adaptive Learning Platform 🎓

An intelligent quiz generation platform powered by AI that creates personalized learning experiences with real-time feedback, adaptive difficulty adjustment, and comprehensive admin management tools.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)
[![AI Powered](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)](https://ai.google.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![Production Ready](https://img.shields.io/badge/Production-Ready-success.svg)](https://github.com/BatchuMamatha/Smart-Quizzer-AI)

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Complete installation and setup guide
- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Technical documentation
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Recent fixes and improvements
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Comprehensive testing procedures

## 🎯 Problem Statement

Traditional quiz and assessment systems face several critical challenges:

- **Static Content**: Fixed questions that don't adapt to individual learning needs
- **One-Size-Fits-All**: Same difficulty level for all users regardless of skill
- **Limited Feedback**: Basic correct/incorrect responses without detailed explanations
- **Manual Content Creation**: Time-intensive process to create diverse questions
- **No Learning Analytics**: Lack of insights into student progress and performance
- **Poor User Experience**: Outdated interfaces with limited interactivity

## 💡 My Solution

**Smart Quizzer AI** addresses these problems with an intelligent, adaptive learning platform:

###  **Quick Start**

**First-Time Setup (For You and Your Friends):**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
   cd Smart-Quizzer-AI
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   - Create `.env` file in `backend/` folder
   - Add your Google API key: `GOOGLE_API_KEY=your_key_here`

4. **Start the backend:**
   ```bash
   python app.py
   ```
   **✅ On first run, the database will auto-create with a default admin account!**

5. **Install and run frontend (new terminal):**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

6. **Login with default credentials:**
   - Navigate to `http://localhost:8080`
   - **Username**: `admin`
   - **Password**: `Admin@123`
   - ⚠️ **Important**: Change the password after first login!

###  **Account Creation**

**Default Admin Account (Auto-Created on First Run):**
- **Username**: `admin`
- **Password**: `Admin@123`
- **Role**: Administrator
- **Note**: The database and this account are automatically created the first time you run `python app.py`

**Creating Additional User Accounts:**
- Navigate to the registration page at `http://localhost:8080/register`
- Fill in your details (username, email, full name, password)
- Select your skill level (Beginner, Intermediate, Advanced)
- Click "Create Account" to register
- Start taking quizzes immediately after registration

**Creating Additional Admin Accounts:**
- Login as the default admin
- Navigate to the admin panel
- Create new admin users with admin privileges

>  **Note**: After cloning from GitHub, simply run `python app.py` in the backend folder. The database and default admin account will be created automatically - no manual setup required!

