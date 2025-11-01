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
###  **Account Creation**

After running the setup script, you can create your own accounts:

**Creating an Admin Account:**
- Admin accounts should be created through the database initialization script
- Run `python init_database.py` during initial setup
- The script will create default admin accounts
- Contact your system administrator for admin access credentials

**Creating a User Account:**
- Navigate to the registration page at `http://localhost:3000/register`
- Fill in your details (username, email, full name, password)
- Select your skill level (Beginner, Intermediate, Advanced)
- Click "Create Account" to register
- Start taking quizzes immediately after registration

>  **Note**: All users and admins can create their own accounts during setup.

